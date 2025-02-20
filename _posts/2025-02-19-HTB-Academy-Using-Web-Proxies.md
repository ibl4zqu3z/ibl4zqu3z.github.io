---
layout: post
title: "Walkthrough: Usando Web Proxies"
date:  19-02-2026
categories: [Walkthroughs, HTB Academy]
tags: [Burp Suite, ZAP]
image: "assets/images/HTB_Academy_Using_Web_Proxies/Skills_Assessment/featured_image_module.png"
alt: portada de Walkthrough Usando Web Proxies
---

En este post, te guiaré a través del módulo **Using Web Proxies** de la plataforma **Hack The Box Academy**, resolviendo paso a paso todas las preguntas planteadas en el módulo y completando el Skill Assessment final.

Este módulo es esencial para cualquier persona interesada en seguridad web, ya que introduce el uso de proxies como **Burp Suite** y **ZAP**, unas herramientas que son claves en el pentesting de aplicaciones web. A lo largo del walkthrough, veras cómo interceptar y modificar solicitudes HTTP, analizar tráfico en aplicaciones web y automatizar pruebas de seguridad.

Si estás siguiendo el plan de estudios de HTB Academy o simplemente quieres reforzar tus conocimientos en el uso de proxies web, este walkthrough te será de gran utilidad. ¡Vamos a ello! 🚀

## Interceptando peticiones web

**Intente interceptar la solicitud de ping en el servidor que se muestra arriba y cambie los datos de la publicación de manera similar a lo que hicimos en esta sección. Cambie el comando para que lea 'flag.txt'**

Abro navegador y navego a la direccion de la maquina objetivo. Obteniendo la siguiente pantalla.

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/02_02/image.png)

Inicio Burp Suite 

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/02_02/image-1.png)

A continuacion accedo a la pestaña Proxy y activo, si no lo esta, la interceptacion de solicitudes mediante el boton `Intercept is on`

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/02_02/image-2.png)

De vuelta al navegador abro la extension foxyproxy selecciono BURP para enlazar la navegacion hacia Burp Suite.

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/02_02/image-3.png)

Lanzo una peticion mediante el boton ping de la pagina web y compruebo que en Burp captura la peticion.

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/02_02/image-4.png)

A continuacion modifico la peticion que he capturado antes de que fuera enviada al servidor. Añado al valor `ip=1` el comando `ls` para que se ejecute seguidamente 

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/02_02/image-5.png)

Pulso el boton forward en burp para dejar seguir la peticion y ver la respuesta en la web.

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/02_02/image-6.png)

Veo que se ejecuta tanto el ping como el listado de ficheros por lo que puedo inyectar comandos.

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/02_02/image-7.png)

Para acabar extraigo con el comando `cat` el contenido del archivo `flag.txt`

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/02_02/image-9.png)

## Repitiendo peticiones

**Intente utilizar la repetición de solicitudes para poder probar comandos rápidamente. Con eso, intente buscar la otra bandera.**

En primer lugar capturo la solicitud de la pagina al hacer click en el boton `ping`

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/02_05/image-0.png)

Paso la solicitud al modulo repeater para poder realizar envios de la solicitud cambiando parametros o contenido del mismo.

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/02_05/image.png)

Una vez en el modulo repeater comienzo enviando los comandos `pwd;ls -lisah` inyectados en la solicitud de ping. Con esto obtengo el ping y a continuacion se ejecuta el comando pwd que me muestra la ruta actual donde se esta ejecutando el codigo y el contenido se muestra con el comando `ls -lisah`

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/02_05/image-1.png)

Vuelvo a cambiar los comandos inyectados para cambiar el directorio donde quiero listar el contenido `pwd;ls -lisah /`. Y con esto obtengo el contenido de la raiz de la maquina. Veo que existe un fichero flag.txt 

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/02_05/image-2.png)

Inyecto ahora el comando `cat /flag.txt` y obtengo la flag buscada.

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/02_05/image-3.png)


## Codificar y descodificar

**La cadena que se encuentra en el archivo adjunto se ha codificado varias veces con distintos codificadores. Intente utilizar las herramientas de decodificación que analizamos para decodificarla y obtener la bandera.**

Descargo el fichero zip.

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/02_06/image.png)

Extraigo el contenido y lo visualizo.

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/02_06/image-1.png)

Abro Burp Suite y accedo al modulo **`Decoder`**

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/02_06/image-2.png)

Pego la cadena codificada en el area de texto. Al acabar en un `=` supongo que puede haberse codificado en base64. Mediante el menu lateral donde indica **`Decode as ...`** marco el valor Base64.

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/02_06/image-3.png)

De nuevo parece ser base64, asi que uso el menu lateral y voy descodificando


![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/02_06/image-4.png)


![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/02_06/image-5.png)


![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/02_06/image-6.png)

Tras esta decodificacion aparecen caracteres `%` que me indican que puede ser codificacion URL.


![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/02_06/image-7.png)

Pruebo a decodificar esta ultima vez con URL y aparece la flag buscada.


![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/02_06/image-8.png)


## Herramientas y Proxies

**Intente ejecutar 'auxiliary/scanner/http/http_put' en Metasploit en cualquier sitio web, mientras enruta el tráfico a través de Burp. Una vez que vea las solicitudes enviadas, ¿cuál es la última línea de la solicitud?**

Activo la interceptacion de contenido en Burp Suite.

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/02_07/image.png)

Cargo Metasploit y busco el modulo `auxiliary/scanner/http/http_put` y lo cargo.

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/02_07/image-1.png)

Muestro las opciones necesarias para ver sus valores 

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/02_07/image-2.png)

Elijo usar `wikipedia.org` para realizar la tarea. Realizo un ping de un solo eco para obtener la IP del servidor de wikipedia



![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/02_07/image-3.png)

Vuelvo a Metasploit y defino los valores que necesita el modulo para funcionar.

```sh
set PROXIES HTTP:127.0.0.1:8080
set RHOSTS 185.15.59.224
set RPORT 80
```

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/02_07/image-4.png)

Ejecuto el modulo con run y obtengo en Burp una solicitud y en ella esta la linea que nos solicita el ejercicio.

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/02_07/image-5.png)


## Burp Intruder

**Utilice Burp Intruder para buscar archivos '.html' en el directorio /admin y encontrar un archivo que contenga la bandera.**

Navego hasta el directorio `/admin`

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/03_01/image.png)

Compruebo en Burp Suite que he capturado la solicitud y la envio a intruder para trabajar con ella.

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/03_01/image-1.png)

Una vez en el modulo intruder defino un ataque de tipo Sniper

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/03_01/image-2.png)

Como tengo que buscar los archivos `.html` pero desconozco los nombres, defino un payload `$1$` Seguido de la extension `.html`

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/03_01/image-3.png)

Para realizar el ataque cargo en los valores de payload el archivo `seclists/Discovery/Web-Content/common.txt`

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/03_01/image-4.png)

Tambien puedo añadir que marque con una bandera aquellos resultados que coincidan con expresiones y añado `200 OK`

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/03_01/image-5.png)

Lanzo el ataque.

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/03_01/image-6.png)

Una vez ejecutado veo que una de las solicitudes (la numero 145) devuelve una respuesta con una longitud mayor que las demas, ademas de que el Status code es de valor 200 lo que indica que es valida.

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/03_01/image-7.png)

Me llevo esta peticion a repeater y cancelo el ataque en curso

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/03_01/image-8.png)

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/03_01/image-9.png)

Una vez en el modulo repeater envio la solicitud y obtengo la respuesta.

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/03_01/image-10.png)

Compruebo el contenido de la respuesta y obtengo la flag solicitada.

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/03_01/image-11.png)

## Fuzzer con ZAP

**El directorio que encontramos arriba establece la cookie en el hash md5 del nombre de usuario, como podemos ver en la cookie md5 de la solicitud del usuario (invitado). Visita '/skills/' para obtener una solicitud con una cookie, luego intenta usar ZAP Fuzzer para analizar la cookie para diferentes nombres de usuario con hash md5 para obtener la bandera. Usa la lista de palabras "top-usernames-shortlist.txt" de Seclists.**

Lanzo ZAP, en este caso trabajare con la version 2.14.0 aunque ya existen versiones superiores.

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/03_02/image.png)

Selecciono Manual Explore

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/03_02/image-2.png)

Defino los valores y pulso Launch Browser

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/03_02/image-3.png)

Aparece un HUD de ZAP para darnos un tutorial que descarto pulsando en `Continue to your target`

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/03_02/image-4.png)

Recargo la pagina de nuevo

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/03_02/image-5.png)

Y en ZAP veo que en la siguiente recarga se ha definido una cookie.


![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/03_02/image-6.png)

Marco la cookie y mediante el menu contextual la envio a fuzzer haciendo click en `Fuzz ...`

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/03_02/image-7.png)

Una vez en fuzzer voy a cargar los payloads que serviran para hacer fuzzing

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/03_02/image-8.png)

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/03_02/image-9.png)

Pulso en Añadir y obtengo una ventana donde cargar el contenido.

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/03_02/image-10.png)

Segun me indica el ejercicio debo usar la lista `top-usernames-shortlist.txt`. uso el comando `locate` para localizar la ruta exacta.

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/03_02/image-11.png)

Visualizo el contenido y lo copio.

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/03_02/image-12.png)

Pego el contenido en el payload de fuzzer

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/03_02/image-13.png)

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/03_02/image-14.png)

A continuacion marco un procesado para añadir un procesado de las cadenas anteriores a MD5 

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/03_02/image-15.png)


![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/03_02/image-16.png)

A continuacion pulso sobre `Start Fuzzer` y al poco tiempo compruebo que la posicion 8 da una respuesta con un tamaño diferente al resto de solicitudes.


![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/03_02/image-17.png)

Compruebo el contenido de la respuesta y obtengo la flag.


![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/03_02/image-18.png)


## Zap Scanner

**Ejecute ZAP Scanner en el objetivo anterior para identificar directorios y vulnerabilidades potenciales. Una vez que encuentre la vulnerabilidad de alto nivel, intente usarlo para leer la bandera en '/flag.txt'**

Abro ZAP y ejecuto una exploracion manual

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/04_02/image.png)

Lanzo el navegador a la maquina objetivo.

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/04_02/image-1.png)

En el historico de solicitudes marco la solicitud y mediante el boton derecho selecciono `Attack > Spider ...`

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/04_02/image-5.png)

Esto abre una ventana del alcance del ataque y marco el punto inicial con la IP y puerto de la maquina

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/04_02/image-6.png)

Ejecuto el ataque

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/04_02/image-7.png)

Veo que existe una pagina con nivel medio de alerta que puede permitir ejecucion de codigo inyectado.

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/04_02/image-8.png)

Con el boton derecho la llevo al navegador.

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/04_02/image-9.png)

Inyecto codigo directamente en la barra de direcciones del navegador para comprobar si es atacable dandome un resultado positivo.

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/04_02/image-10.png)

Solicito mediante inyeccion de codigo el listado de ficheros de la raiz de la maquina y veo que existe un fichero llamado flag.txt

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/04_02/image-11.png)

Usando la inyeccion de codigo visualizo el contenido del fichero y obtengo la flag.

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/04_02/image-12.png)


## Skills Assessment - Uso de proxies Web

- Maquina objetivo: 94.237.59.40:47073

### Pregunta 1: 
**La pagina /lucky.php tiene un boton que parece estar desactivado. Intenta activarlo y haz click para obtener la flag.**

En primer lugar accedo a BurpSuite y activo la intereceptacion de solicitudes y abro el navegador web para activar la extension foxiproxy con Burp

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/Skills_Assessment/image.png)

Navego hasta la pagina que me han indicado : `http://94.237.59.40:47073/lucky.php` y una vez capturada la peticion la envio a Repeater para trabajar con la solicitud.

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/Skills_Assessment/image-1.png)

Envio la solicitud y compruebo la respuesta obtenida. Veo que existe un formulario con un boton desabilitado como nos indica la pregunta.

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/Skills_Assessment/image-4.png)

Vuelvo al navegador y con las herramientas de desarrollador incluidas en el navegador edito el codigo para quitar el atributo `disabled=''` permitiendome de esta forma hacer uso del boton

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/Skills_Assessment/image-8.png)

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/Skills_Assessment/image-9.png)

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/Skills_Assessment/image-10.png)

Ahora el boton es funcional y al hacer click capturo una peticion de la pagina con `getflag=true`

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/Skills_Assessment/image-5.png)

Envio esta solicitud a repeater para trabajar con ella.

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/Skills_Assessment/image-11.png)

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/Skills_Assessment/image-6.png)

Desde repeater realizo el envio y compruebo la respuesta.

Como parece ser un boton tipo "*loteria*" lo ejecuto varias veces ( en mi caso fueron 10 veces) y de esta forma obtuve la flag solicitada.

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/Skills_Assessment/image-34.png)

### Pregunta 2: 
La pagina /admin.php usa una cookie que ha sido codificada varias veces. Intenta descodificarla hasta obtener un valor de 31 caracteres. Envia el valor como respuesta.

Navego hasta la pagina `http://94.237.59.40:47073/admin.php`

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/Skills_Assessment/image-12.png)

En BurpSuite veo que he capturado la peticion. Continuo para obtener la respuesta que define una cookie. 

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/Skills_Assessment/image-13.png)

Copio esta cookie y voy a la pestaña Decoder donde pego el contenido y lo decodifico primero como ASCII y a continuacion como Base64, obteniendo la cadena de 31 caracteres que solicitaba la pregunta.

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/Skills_Assessment/image-35.png)

### Pregunta 3:

**Una vez que decodifique la cookie de la pregunta anterior, notará que solo tiene 31 caracteres, lo que parece ser un hash md5 al que le falta el último carácter. Por lo tanto, intente realizar un fuzzing del último carácter de la cookie md5 decodificada con todos los caracteres alfanuméricos, mientras codifica cada solicitud con los métodos de codificación que identificó anteriormente. (Puede usar la lista de palabras "alphanum-case.txt" de Seclist para la carga útil)**

Busco la lista de palabras `alphanum-case.txt` en el sistema para poder usarla

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/Skills_Assessment/image-18.png)

Necesito hacer mi propia lista de palabras que incluya la cookie decodificada anteriormente y añadir por detras una de las palabras de la lista de `alphanum-case.txt`. 

Comienzo limpiando la lista de palabras de posibles caracteres iniciales. Para ello uso el comando `sed` con la expresion regular: `s/\x1b\[[0-9;]*m//g`

- **s/**: Indica que se va a hacer una sustitución.
- **\x1b\[**: Es una secuencia de escape que representa el carácter de escape `\x1b` (que es ESC en ASCII) seguido de `[` (correspondiente a los códigos de colores ANSI).
- **[0-9;]***: Esto busca cualquier secuencia de números y puntos y coma (que suelen estar en los códigos de control ANSI que definen colores y estilos de texto).
- **m**: Indica el final de la secuencia de escape ANSI que configura los colores.
- **//**: Reemplaza la secuencia encontrada por nada (es decir, la elimina).
- **g**: Significa "global", es decir, que la sustitución se hará en todas las ocurrencias dentro de cada línea.

Esto se lo paso a un bucle while que por cada linea que exista hara un echo del valor de la cookie añadiendole la linea y todo lo ira escribiendo en un fichero llamado `migalleta.txt`

```shell
sed 's/\x1b\[[0-9;]*m//g' /usr/share/seclists/Fuzzing/alphanum-case.txt | while read -r line; do echo "3dac93b8cd250aa8c1a36fffc79a17a$line"; done > migalleta.txt
```

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/Skills_Assessment/image-19.png)

Envio al modulo intruder la solicitud capturada

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/Skills_Assessment/image-16.png)

En intruder defino un ataque de tipo Sniper y en el valor de la cookie voy a insertar cada linea del fichero migalleta.txt. Para ello añado un punto de payload llamado "migalleta"

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/Skills_Assessment/image-17.png)

En el payload cargo el fichero migalleta.txt

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/Skills_Assessment/image-20.png)

Y en el procesado del payload tengo que codificar los valores de forma inversa a lo que realice en la pregunta anterior para decodificar la cookie para que admita la cookie del ataque. Por ello hago una codificacion de base64 y luego una codificacion de Hexadecimal ASCII

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/Skills_Assessment/image-21.png)

Lanzo el ataque y espero a que termine. 

Para revisar cada una de las respuestas puedo hacer doble click en la primera respuesta del ataque.

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/Skills_Assessment/image-22.png)

Selecciono la pestaña Response y elijo vista Render obteniendo una vista de como seria la respuesta de la pagina para cada valor del ataque.

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/Skills_Assessment/image-24.png)

Voy pulsando Siguiente para comprobar todas las respuestas al ataque y obtengo la flag.

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/Skills_Assessment/image-25.png)

### Pregunta 4:

**Estás usando la herramienta 'auxiliary/scanner/http/coldfusion_locale_traversal' dentro de Metasploit, pero no te está funcionando correctamente. Decide capturar la solicitud enviada por Metasploit para poder verificarla manualmente y repetirla. Una vez que capturas la solicitud, ¿cuál es el directorio 'XXXXX' al que se llama en '/XXXXX/administrator/..'?**

Realizo lo que indica la pregunta.

Abro metasploit 

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/Skills_Assessment/image-26.png)

Cargo el modulo 'auxiliary/scanner/http/coldfusion_locale_traversal'

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/Skills_Assessment/image-28.png)

Reviso las opciones que son necesarias para el uso del modulo.

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/Skills_Assessment/image-29.png)

Defino los valores

```sh
set RHOSTS 94.237.59.40
set RPORT 47073
set PROXIES HTTP:127.0.0.1:8080
```

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/Skills_Assessment/image-30.png)

Ejecuto con `exploit`

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/Skills_Assessment/image-31.png)

En BurpSuite compruebo que se ha capturado la solicitud y me da el valor solicitado de la pregunta.

![alt text](../assets/images/HTB_Academy_Using_Web_Proxies/Skills_Assessment/image-33.png)


Dominar el uso de proxies web no solo facilita la identificación de vulnerabilidades, sino que también nos permite entender mejor el funcionamiento de las aplicaciones que analizamos. Si este módulo te ha resultado interesante, te recomiendo seguir explorando técnicas más avanzadas, como la manipulación de tokens, el replay de peticiones y la automatización con Burp Suite Extensions.

Espero que este walkthrough te haya sido útil. Si tienes dudas, comentarios o quieres compartir tu experiencia, ¡déjamelo saber! Nos vemos en el próximo desafío. 🚀🔥







