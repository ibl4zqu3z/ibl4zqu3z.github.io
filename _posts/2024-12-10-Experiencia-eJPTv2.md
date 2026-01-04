---
title: "Mi experiencia realizando el examen de eJPTv2"
featured: true
header:
  image: /assets/images/posts/exp_eJPTv2/eJPTv2_experience.jpg
  teaser: /assets/images/posts/exp_eJPTv2/eJPTv2_experience.jpg
excerpt_separator: "<!--more-->"
show_date: true
toc: true
toc_sticky: true
share: true
related: true
categories:
  - guias
tags:
  - eJPTv2
collection: writeups
---

Hace un tiempo decidí presentarme al examen de eJPTv2 para obtener la certificación, y os quiero compartir mi experiencia con el proceso, desde la preparación hasta la obtención de la certificacion de eJPTv2, un examen de certificación ofrecido por eLearnSecurity. 

<!--more-->

El examen de eJPTv2 es un desafío práctico en el que se requiere realizar una serie de tareas dentro de un entorno realista pero simulado, para demostrar las habilidades para realizar un pentesting. Esto incluye obtener acceso a un sistema, identificar vulnerabilidades, explotar servicios, y realizar post-explotación e incluso pivoting a una red interna.

## Preparación para el examen

Mi camino hacia el examen de eJPTv2 comenzó con el estudio de la teoría y la práctica ofrecida por INE.

Ya habia trabajado en algunos proyectos relacionados con pentesting, pero sabía que necesitaba adaptar mis conocimientos a las herramientas adecuadas para tener éxito en el examen. 

Aquí están algunos de los pasos clave que seguí durante mi preparación:

1. **Revisión de los temas del examen:**
   Lo primero que hice fue leer cuidadosamente el temario oficial del examen. eJPTv2 cubre una amplia gama de temas, desde la recopilación de información hasta la explotación de vulnerabilidades y la post-explotación. 
   
   Los temas principales incluyen:
   - Reconocimiento y enumeración de servicios
   - Vulnerabilidades comunes y ataques a aplicaciones
   - Herramientas de pentesting como Nmap, Gobuster, Nikto y Hydra
   - Técnicas de post-explotación y escalada de privilegios

2. **Cursos y materiales recomendados:**
   Decidí invertir tiempo (y dinero) en los cursos de eLearnSecurity, específicamente en el curso de eJPTv2. Este curso tiene muchas horas de video y mucha cantidad de informacion que comprender y sobre todo practicar en sus laboratorios. Ademas estudie modulos en la Academia de HackTheBox, en concreto el path de pentesting completo. Añadiendole el modulo de Wordpress que no recuerdo si esta dentro.

3. **Práctica en entornos controlados:**
   Además del curso, me hice máquinas de VulnHub (las podeis ver resueltas en este blog). En ellas pude aplicar lo aprendido en un entorno controlado y con escenarios que simulaban vulnerabilidades reales. Practiqué con máquinas de diferentes niveles de dificultad para mejorar mi capacidad de identificación de vulnerabilidades y explotación.


## Consejos durante el examen

- **Uso eficiente del tiempo:**
  - El examen tiene un límite de tiempo (48 horas), por lo que es vital gestionar bien tu tiempo. **Toma descansos** al menos cada 4 horas, para comer algo, estirar las piernas, etc.
  - **Leete todas las preguntas antes de comenzar a contestar**. En estas preguntas te puedes encontrar que te dan usuarios para algunas máquinas, o te proponen claves posibles. Apuntalas y usalas.
  - No te quedes demasiado tiempo atascado en una tarea, si algo no funciona, pasa a otro objetivo y regresa a ello más tarde si es necesario.
  - **Aprovecha los momentos de descanso para lanzar ataques largos** contra servicios. Por ejemplo si vas a parar 1 hora para estirar las piernas, comer y descansar un poco, lanza un ataque de diccionario a algun servicio como ssh o ftp con diccionarios grandes que sepas que van a tardar un rato en completarse.
  - No hace falta llegar a ser root de todas las máquinas pero tampoco es complicado conseguirlo, son máquinas sencillas.
  
- **Piensa que no es un CTF** 
  - **No es un CTF**, no vas buscando pensar "out-the-box". Es un entorno realista, piensa que puede ser una empresa. No vayas a lo rebuscado o a un ataque muy elaborado.
  - Hazte un **listado de usuarios y claves** que vayas recopilando entre máquinas para probarlas en las siguientes máquinas. Incluso prueba a que las claves sean tan debiles que uses como diccionario de claves los nombres de los usuarios. 
  - Monta una carpeta en tu máquina atacante y la sirves en la red con un servidor web. Será tu "carpeta compartida" con los usuarios, las claves, y lo que te haga falta. 
  
- **Comprueba los resultados**
  - Si te preguntan por la clave de acceso de un usuario y la sacas rompiendo un hash, comprueba que puedes acceder con ese usuario y clave. 

- **Documentación:**
  Asegúrate de tomar notas detalladas de cada paso que realices. Yo hacia captura de pantalla y copia de comando ejecutado y resultado obtenido. La documentación es crucial para asegurarte de que no te pierdas detalles importantes durante el examen.

  - **Usa alguna herramienta para dibujar la red.** 
    - Yo use **draw.io** y fui colocando los diferentes elementos para obtener una visualizacion de la red con informacion que fui añadiendo durante el examen

    ![alt text](/assets/images/posts/exp_eJPTv2/image.png)

  - **Usa una aplicacion para toma de notas.** 
    - Yo use **Visual Studio** con ficheros en markdown y usando algunos pluggins para dar formato al codigo que copiaba y pegaba. Tambien puedes usar **Obsidian** o **Notion**, etc. Da igual cual uses pero que te sientas muy comodo usandola.
    - Para cada máquina descubierta en la red fui creando un fichero para tomar notas de esa máquina. Y ademas tenia un fichero general para notas sobre la red, el entorno o informacion general que afectara a todas las máquinas.

## El día del examen

Aunque no tenía pensado presentarme ese día, finalmente decidí hacerlo. 

No me sentía completamente preparado, pero fue mi **esposa** quien me dijo que, conociéndome, nunca estaría listo, ya que siempre quiero estar más y más preparado. Ese comentario me hizo pensar que era el momento adecuado para dar el paso, que no perdia nada por intentarlo y que no habia mejor oportunidad que unos dias sin trabajar para poder dedicar esas horas a obtener la certificacion.

El día comenzó con una jornada de trabajo por la mañana. Después de salir del trabajo alrededor de las 15:00 h, almorcé y me tomé un descanso en el sofá de casa para relajarme. Fue en ese momento cuando tomé la decisión de que finalmente me presentaría al examen. 

Sobre las 6 de la tarde, cafe en mano, encendí mi PC y me aseguré de que el sistema operativo estuviera completamente actualizado, evitando que una actualización pendiente pudiera ralentizar mi conexión durante el examen.

Antes de iniciar el examen, leí detenidamente los dos documentos informativos (eJPT Lab Guidelines updated y final Letter of Engagement eJPT) para asegurarme de comprender todo el procedimiento y las instrucciones clave. Una vez que me sentí listo, hice clic en "Iniciar examen" y accedí al entorno de laboratorio, el cual tardó unos 5 minutos en cargar.

El examen lo comencé a las **19:00 h**, y desde ese momento me dediqué completamente a explorar la red y las máquinas disponibles. Durante las primeras horas, me tomé mi tiempo para enumerar cada máquina de la red una por una, asegurándome de obtener toda la información posible de cada una antes de pasar a la siguiente. Cuando encontré una máquina que requería un escaneo mas exhaustivo lo dejaba lanzado y, pasaba a la siguiente máquina para no perder tiempo mientras se llevaba a cabo. Esto me permitió aprovechar cada minuto del examen y mantener un ritmo constante sin interrupciones innecesarias.

A las **23:00 h**, decidí tomar mi primer descanso para cenar y despejar un poco la mente. Me sentia muy motivado por los avances conseguidos. Llevaba unas 15 preguntas completadas. Sobre las **00:30 h** volví al examen con energías renovadas.

Continué trabajando hasta las **3:00 h** de la madrugada, hora en la que decidí irme a la cama. Para ese momento, había respondido **18 preguntas de las 35** que debía completar, lo que me dejó un buen margen de trabajo para el día siguiente. 

Decidí descansar unas 6 horas, por lo que puse el despertador para despertarme alrededor de las **9:00 h** de la mañana. Tras un desayuno y un buen café cargado, volví al examen para continuar con los siguientes objetivos.

### El segundo día.

La mañana comenzó con un repaso de las preguntas que ya había contestado y una revisión de las que aún necesitaba responder. Una vez repasado y organizadas las notas del dia anterior retome el examen con la siguiente máquina de la cual tenía que obtener credenciales de acceso y contestar a una pregunta sobre el metodo necesario para escalar privilegios en esta máquina, pero no conseguía completar este paso. 

A pesar de esto, continué con el ataque a las **máquinas 4, 5 y 6**, lanzando ataques mientras seguía intentando encontrar una forma de escalar privilegios en la máquina 3. Estaba decidido a no dejarme vencer, pero esto consumió gran parte de la mañana. Fue un proceso frustrante, ya que me sentía estancado. La escalada de privilegios es algo que he practicado mucho y en esta máquina me estaba siendo imposible encontrar la forma. Esto me suponia no llegar a contestar a algunas preguntas de esta máquina y era algo que no podía permitirme.

Fue entonces cuando decidí ir a **almorzar** y descansar un poco antes de continuar. Necesitaba despejar mi mente para poder regresar al examen con nuevas energías. Tras el descanso, regresé al examen y repasé nuevamente las preguntas que había contestado hasta ese momento.

Llegado este punto Opté por cambiar mi enfoque a una forma más estratégica. Repartí las preguntas entre las máquinas para saber qué necesitaba encontrar en cada una de ellas para poder contestar correctamente. 

Consegui una lista que comenzaba asi:

- Necesitaba escalar privilegios en la máquina 3.
- Necesitaba la credencial root de la base de datos de la maquina 3.
- Necesitaba encontrar la máquina de pivote a la red interna.
- etc.

Tenia que encontrar una **credencial root** para acceder a **MySQL**. Aunque tenia un usuario con muy pocos privilegios, tenía acceso a la base de datos, así que pensé que sería sencillo obtener la clave. Al acceder a la base de datos, vi que el **usuario root** compartía el hash de la contraseña con el usuario de la base de datos que usaba para acceder. Esto indicaba que la clave debía ser la misma, ya que el hash era idéntico. 

Sin embargo, al aplicar la técnica de comprobar cada respuesta probando las credenciales obtenidas, no me permitió el acceso. Sabía que esto no tenía sentido, ya que un hash idéntico debería implicar la misma clave. Para no perder demasiado tiempo, decidí dejar este paso para mas adelante.

Algo no estaba bien asi que decidi tomar un descanso y cafe antes de seguir.

La siguiente máquina la resolví relativamente fácil. Utilicé un par de ataques a las credenciales y exploté un servicio SMB, lo que me permitió acceder al sistema y encontrar las respuestas a las preguntas relacionadas con esa máquina. Esto me dio algo de confianza y me permitió avanzar rápidamente.

Volvi a la máquina donde estaba atascado y tras varias horas de pruebas y exploración, logré un avance importante. Conseguí las **credenciales de usuario** necesarias para acceder a la máquina **por SSH** usando un diccionario creado por mi usando todos los ususarios y claves de las respuestas de las preguntas del examen.

Al ingresar con este nuevo usuario, descubrí que podía realizar la escalada de privilegios debido a una mala configuración de permisos **sudo** en el sistema. Esta vulnerabilidad me permitió finalmente escalar privilegios y completar el acceso a la máquina, lo que fue un alivio enorme.

Ya habían pasado algo mas de **24 horas** desde que inicié el examen y en este momento ya tenia 3 máquinas pero no tenia aun localizada la máquina que me daria paso a la red interna. Tenia contestadas casi la totalidad de las preguntas, pero aun me quedaban 3 máquinas de la red y dos de ellas ni las habia tocado y para colmo tenían muy pocos servicios abiertos, lo que hacia mas complicada su explotacion.

Decidi centrarme en la máquina que ya tenia explorada para completar su explotacion. Consegui hacerme con la máquina al cabo de una hora y al enumerar localmente la máquina encontre que esta máquina tenia el acceso a al red interna. 

Realice el pivoting a la red interna, comprobe la red y enumere cada máquina que encontre alli. Esto me llevo en total 2 horas mas. Ahora ya tenia todas las preguntas contestadas y solo tenia que comprobar mis respuestas y enviar el examen. 

En total tarde aproximadamente 30 horas en entregar mi examen completo y revisado. 

## El Pentesting de las máquinas

### Máquina 1: **Windows con WordPress instalado**

La primera máquina que encontré fue una máquina con **Windows** y **WordPress** instalado. Mi primer paso fue intentar acceder al servicio **RDP** (Remote Desktop Protocol) utilizando un ataque de fuerza bruta con **Hydra**. Tras realizar el ataque, obtuve acceso exitoso a la máquina.

Una vez dentro, empecé a explorar el sistema y encontré las credenciales de la base de datos de **WordPress**. Con esta información, utilicé **JohnTheRipper** para romper el hash de la contraseña de administrador de **WordPress**. Después de un tiempo, logré obtener las credenciales de administrador de **WordPress**, lo que me permitió tener acceso completo al panel de administración del sitio.

Para complementar la información y realizar una enumeración más detallada, decidí usar la herramienta **WPScan**, especializada en la enumeración de vulnerabilidades en sitios WordPress. Con **WPScan**, pude identificar una serie de vulnerabilidades adicionales y configuraciones del sitio que me ayudaron a responder a todas las preguntas relacionadas con esta máquina.

Con las credenciales de administrador de **WordPress**, pude realizar varias acciones dentro del sitio, como modificar configuraciones y obtener información adicional sobre la máquina. Esto me permitió completar los objetivos del examen relacionados con la máquina número 1.

### Máquina 2: **Windows con servidor web**

La segunda máquina era un sistema operativo **Windows** que corría un **servidor web**. Al realizar una exploración exhaustiva del servidor web con **nmap**, encontré que tenía un formulario accesible públicamente donde se podía ejecutar código. Este formulario estaba diseñado de manera que permitía a los usuarios introducir comandos que el servidor ejecutaría, lo que me dio una oportunidad para explotar la máquina.

Aprovechando esta vulnerabilidad, decidí inyectar un comando que agregara un nuevo usuario al sistema con privilegios para acceder a **RDP**. Esto me permitió crear un nuevo usuario con permisos adecuados para conectarme al servidor a través de **Remote Desktop Protocol (RDP)**. Después de agregar el usuario y configurar el acceso, utilicé **RDP** para conectarme a la máquina de manera remota y obtener acceso completo al sistema.

Una vez dentro de la máquina, realicé una post-explotación local, comenzando con la enumeración de la máquina. Utilicé herramientas estándar como **whoami**, **netstat**, y otros comandos para obtener más información sobre el sistema, usuarios activos, servicios en ejecución, y otros datos clave del sistema comprometido.

La post-explotación me permitió conocer más sobre la configuración interna de la máquina y cómo sus servicios estaban configurados, lo que me ayudó a obtener información adicional para completar las preguntas relacionadas con la máquina 2.

### Máquina 3: **Linux con Drupal instalado**

La tercera máquina que encontré era un sistema **Linux** con **Drupal** instalado. Al realizar un escaneo con **nmap** para identificar los servicios disponibles, observé que el puerto 80 estaba abierto, lo que indicaba que había un servidor web activo. Utilicé **Nikto** para realizar una evaluación de vulnerabilidades en el servidor web y **Dirb** para buscar directorios ocultos que pudieran contener archivos de configuración interesantes.

No fue suficiente para obtener acceso directo. Fue entonces cuando decidí utilizar **Metasploit** con el exploit **Drupalgeddon2**, una vulnerabilidad crítica en Drupal que había sido publicada en 2018. **Drupalgeddon2** es un **remote code execution (RCE)** exploit que afecta a las versiones vulnerables de Drupal (7.x y 8.x), y permite a un atacante ejecutar código arbitrario en el servidor sin necesidad de autenticación. Esta vulnerabilidad fue catalogada como **CVE-2018-7600** y es conocida por permitir a los atacantes comprometer un sitio web de Drupal con facilidad si no se aplican las actualizaciones de seguridad.

El **exploit Drupalgeddon2** funciona aprovechando un fallo en el sistema de manejo de las solicitudes HTTP en Drupal, permitiendo a los atacantes ejecutar comandos en el servidor. Para usarlo, cargué el **exploit** en **Metasploit**, configuré los parámetros correctos como la dirección IP de la máquina objetivo y el puerto, y ejecuté el ataque.

Tras ejecutar el exploit, logré obtener acceso al servidor con un usuario con muy pocos privilegios pero suficientes para conseguir explorar ficheros de configuracion del servidor de drupal y obtener credenciales de la base de datos. Con estas credenciales accedi a la base de datos y obtuve usuarios y hashes de passwords tanto para drupal como para la base de datos. 

Con **JohnTheRipper** y **hashcat** consegui las claves de cada uno de los usuarios de drupal usando como diccionario de claves y usuarios un diccionario personal usando las claves y usuarios que aparecian en las respuestas del examen.

Para la obtencion del usuario root tuve que acceder por **SSH** a la máquina con uno de los usuarios que habia obtenido y desde ahi pude elevar privilegios a root abusando de una mala configuracion de los permisos de sudo para un binario. 

Una vez tuve el usuario root de la máquina solo me quedo comprobar cada clave obtenida de la máquina y anotarlo todo.

### máquina 4: **La máquina SMB**

La máquina 4 fue un desafío interesante. El primer paso fue realizar la enumeración del servicio SMB en busca de usuarios y recursos expuestos. Durante esta fase, identifiqué varios usuarios que estaban accesibles, lo que me permitió dirigir mis siguientes pasos hacia un ataque más enfocado.

Una vez identificados los usuarios, procedí a realizar un ataque de fuerza bruta con Hydra. Utilizando los usuarios descubiertos en la enumeración SMB, lancé el ataque para intentar adivinar las contraseñas asociadas. Después de un tiempo, conseguí acceder al sistema con éxito utilizando las credenciales correctas.

Con acceso a la máquina, utilicé el módulo psexec de Metasploit para ejecutar comandos de forma remota en el sistema. Gracias a este módulo, obtuve acceso con privilegios de NT AUTHORITY\SYSTEM, lo que me dio control total sobre la máquina.

Durante la enumeración local de la máquina, descubrí que tenía dos interfaces de red. Este detalle me llevó a intentar pivotar hacia la otra red utilizando la máquina comprometida como un punto de acceso. Al realizar este pivoting, logré explorar la red interna, lo que me permitió completar las preguntas relacionadas con la máquina y avanzar en el examen.

Este proceso fue crucial para acceder a la red interna, y el uso de pivoting me permitió cumplir con los requisitos del examen relacionados con esta máquina.

### Maquina 5 y 6

Estas maquinas tenian muy pocos servicios abiertos y al poco tiempo me di cuenta que estaban de relleno a modo de "rabbit hole"

## Lecciones aprendidas

Las lecciones más importantes son:

- La importancia de una buena enumeración y recopilación de información.
- El valor de tener una sólida comprensión de las herramientas de pentesting y saber cuándo usarlas.
- La necesidad de ser paciente y meticuloso durante el proceso de explotación.

En conclusión, el examen de eJPTv2 fue una experiencia desafiante pero gratificante. Me permitió poner en práctica mis habilidades de pentesting en un entorno realista aplicando mis conocimientos y habilidades. 
 
Para aquellos interesados en comenzar una carrera en pentesting, recomiendo encarecidamente este examen como un primer paso.
