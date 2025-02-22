---
layout: post
title: "Walkthrough: Web Requests"
date:  19-02-2026
categories: [Walkthroughs, HTB Academy]
tags: [Curl]
image: "assets/images/HTB_Academy_Web_Requests/featured_image_Web_Requests.png"
alt: portada de Walkthrough Peticiones Web
---

En este post, te guiaré a través del módulo **Web Requests** de la plataforma **Hack The Box Academy**, resolviendo paso a paso todas las preguntas planteadas en el módulo.

Este módulo es esencial para cualquier persona interesada en seguridad web, ya que introduce el uso de la herramienta **curl**, muy util para el pentesting de aplicaciones web. A lo largo del walkthrough, veras cómo usar curl con credenciales y con cookies capturadas reusandolas para nuestros propositos, analizar aplicaciones web y realizar pruebas de seguridad.

Si estás siguiendo el plan de estudios de HTB Academy este walkthrough te será de gran utilidad. ¡Vamos a ello! 🚀


**Para obtener la bandera, comience el ejercicio anterior, luego use cURL para descargar el archivo devuelto por '/download.php' en el servidor que se muestra arriba.**

Compruebo conexion con la maquina objetivo 94.237.56.156:36946

```sh
ping -c2 94.237.56.156
```

![alt text](../assets/images/HTB_Academy_Web_Requests/image.png)

Descargo con el mismo nombre que este en la maquina remota el archivo download.php.

Compruebo su descarga y su contenido obteniendo la bandera

```shell
curl -O 94.237.56.156:36946/download.php 
ls
cat download.php
``` 

![alt text](../assets/images/HTB_Academy_Web_Requests/image-1.png)

**¿Cuál es el método HTTP utilizado al interceptar la solicitud? (distingue entre mayúsculas y minúsculas)**

Realizo una solicitud a la maquina objetivo activando `-v` para ver mas en detalle las acciones del comando `curl`

![alt text](../assets/images/HTB_Academy_Web_Requests/image-2.png)

**Envíe una solicitud GET al servidor anterior y lea los encabezados de respuesta para encontrar la versión de Apache que se ejecuta en el servidor, luego envíela como respuesta. (formato de respuesta: XYZZ)**

Realizo una solicitud a la maquina objetivo activando `-v` para ver mas en detalle las acciones del comando `curl`

![alt text](../assets/images/HTB_Academy_Web_Requests/image-3.png)

El servidor anterior carga la bandera después de que se carga la página. Utilice la pestaña Red en las herramientas de desarrollo del navegador para ver qué solicitudes realiza la página y encontrar la solicitud a la bandera.

![alt text](../assets/images/HTB_Academy_Web_Requests/image-4.png)

![alt text](../assets/images/HTB_Academy_Web_Requests/image-5.png)

![alt text](../assets/images/HTB_Academy_Web_Requests/image-6.png)

**El ejercicio anterior parece no funcionar, ya que devuelve resultados incorrectos. Utilice las herramientas de desarrollo del navegador para ver cuál es la solicitud que envía cuando realizamos una búsqueda y utilice cURL para buscar "flag" y obtener la bandera.**

> Autenticarse en la maquina con usuario “ admin ” y contraseña “ admin ”

Accedo via navegador a la maquina y solicita unas credenciales que nos da el ejercicio.

![alt text](../assets/images/HTB_Academy_Web_Requests/image-8.png)

Introduzco las credenciales y llego a la pagina de la aplicacion web alojada en la maquina.

![alt text](../assets/images/HTB_Academy_Web_Requests/image-7.png)

Abro las herramientas de desarrollo del navegador

![alt text](../assets/images/HTB_Academy_Web_Requests/image-9.png)

Recargo la pagina para ver las solicitudes.

![alt text](../assets/images/HTB_Academy_Web_Requests/image-10.png)

Hago una consulta para ver la solicitud al servidor.

![alt text](../assets/images/HTB_Academy_Web_Requests/image-11.png)

Si miro la respuesta me indica que use CURL

![alt text](../assets/images/HTB_Academy_Web_Requests/image-12.png)

Abro una terminal para hacer uso de curl

Como necesito acceder a la aplicacion con credenciales `admin:admin` hago una primera consulta para obtener el valor del campo `Authorization`

```sh
curl -v http://admin:admin@83.136.248.62:59533/
```

![alt text](../assets/images/HTB_Academy_Web_Requests/image-13.png)

Obtengo:

```sh
Authorization: Basic YWRtaW46YWRtaW4=
```

Ahora con el comando curl realizo el GET a la aplicacion web, pero buscare "flag" en vez del nombre de una ciudad, tal y como indica el enunciado. 

Obtengo la flag

![alt text](../assets/images/HTB_Academy_Web_Requests/image-14.png)

**Obtenga una cookie de sesión a través de un inicio de sesión válido y luego use la cookie con cURL para buscar la bandera a través de una solicitud JSON POST a '/search.php'**

> Autenticarse encon usuario “ admin ” y contraseña “ admin ”


Para obtener una cookie de sesión a través de un inicio de sesión válido abro el navegador y accedo a la web que sirve la maquina

![alt text](../assets/images/HTB_Academy_Web_Requests/image-15.png)

me solicita usuario y clave que nos facilita la pregunta. admin:admin

![alt text](../assets/images/HTB_Academy_Web_Requests/image-16.png)

Antes de acceder abro las herramientas de desarrollador para ver las solicitudes y respuestas que se producen. 

![alt text](../assets/images/HTB_Academy_Web_Requests/image-17.png)

Pulso en Login

![alt text](../assets/images/HTB_Academy_Web_Requests/image-18.png)

Ahora accedo a la pestaña Almacenamiento y encuentro una cookie establecida

![alt text](../assets/images/HTB_Academy_Web_Requests/image-19.png)

![alt text](../assets/images/HTB_Academy_Web_Requests/image-20.png)

```sh
PHPSESSID:"gl7bgoair8tdntq6f6rdjoq8q1"
```

Ahora usare curl para buscar la bandera desde una solicitud JSON POST a la pagina /search.php del servidor. 

para saber el JSON necesario hago una consulta real

![alt text](../assets/images/HTB_Academy_Web_Requests/image-21.png)

El codigo JSON es:

```json
{"search":"madrid"}
```

Creo la peticion curl quedando el siguiente comando:

```sh
curl -X POST -d '{"search":"flag"}' -b 'PHPSESSID=gl7bgoair8tdntq6f6rdjoq8q1' -H 'Content-Type: application/json' http://94.237.56.156:55740/search.php
```

Y obtengo la flag solicitada.

![alt text](../assets/images/HTB_Academy_Web_Requests/image-22.png)


**Primero, intenta actualizar el nombre de cualquier ciudad para que sea "bandera". Luego, elimina cualquier ciudad. Una vez hecho esto, busca una ciudad llamada "bandera" para obtener la bandera**

```sh
curl http://94.237.55.96:44406/api.php/city/Walsall -X PUT -d '{"city_name":"flag"}' -H 'Content-Type: application/json'
```

![alt text](../assets/images/HTB_Academy_Web_Requests/image-23.png)

Borar cualquier ciudad.

```sh
curl http://94.237.55.96:44406/api.php/city/London -X DELETE
```

![alt text](../assets/images/HTB_Academy_Web_Requests/image-24.png)

Consultar la ciudad flag

```sh
curl http://94.237.55.96:44406/api.php/city/flag
```

![alt text](../assets/images/HTB_Academy_Web_Requests/image-25.png)

Obtengo la flag.