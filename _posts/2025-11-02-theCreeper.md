---
title: "The Creeper: El primer virus informatico de la historia"
header:
  teaser: /assets/images/casos-de-estudio/creeper.png
excerpt_separator: "<!--more-->"
categories:
  - casos-de-estudio
---

Cuando hablamos de ciberseguridad, malware y ataques informáticos, solemos pensar en ransomware como WannaCry, exploits sofisticados tipo zero-day o troyanos bancarios capaces de vaciar cuentas en segundos. Sin embargo, todo comenzó con un experimento inofensivo, casi anecdótico, que sentó las bases de todo lo que hoy conocemos sobre la propagación automática de código malicioso: hablamos de Creeper, el primer virus informático de la historia.

El nacimiento de Creeper en los años 70
A comienzos de los años 70, la computación estaba en pañales. No existía Internet como la conocemos, pero sí ARPANET, una red experimental creada por el Departamento de Defensa de los Estados Unidos que conectaba universidades, centros de investigación y algunos sistemas militares.

En ese contexto, Bob Thomas, ingeniero de la empresa BBN Technologies, quiso explorar una idea revolucionaria: ¿podría un programa moverse por la red de un ordenador a otro por sí solo?

La respuesta fue sí. Así nació Creeper.

Este pequeño programa fue diseñado para ejecutarse en mainframes PDP-10 que corrían el sistema TENEX. Su comportamiento era muy simple, pero para la época fue algo totalmente disruptivo: Creeper se copiaba a través de la red utilizando el protocolo RSH (Remote Shell), se ejecutaba en el sistema remoto y, antes de abandonarlo, se borraba del equipo anterior. Una especie de nómada digital que iba dejando su huella sin causar daño.

Y su mensaje era claro, directo y casi burlón:

I'M THE CREEPER. CATCH ME IF YOU CAN!
¿Era Creeper realmente un virus?
Técnicamente, Creeper era un gusano. A diferencia de los virus tradicionales que se adjuntan a otros archivos ejecutables, los gusanos son capaces de replicarse y propagarse por sí solos. En este caso, Creeper no necesitaba un «huésped» para infectar la máquina. Era autónomo.

Además, su diseño incluía un elemento curioso para la época: eliminaba su rastro en la máquina de origen antes de propagarse, por lo que no dejaba copias residuales ni buscaba multiplicarse sin control.

Aunque no dañaba sistemas ni robaba información, Creeper fue una alerta temprana: la posibilidad de que un código pudiera moverse solo por una red abierta era real. Y lo más inquietante es que nadie sabía cómo detenerlo… hasta que alguien lo logró.

Reaper: el primer «antivirus» de la historia
La anécdota de Creeper no estaría completa sin hablar de Reaper, el programa creado poco después para rastrear y eliminar instancias de Creeper de los sistemas afectados.

Reaper fue, en efecto, el primer software antivirus del que se tiene constancia. Imitaba la conducta de Creeper para propagarse, pero su propósito era el opuesto: detectar, neutralizar y limpiar los sistemas infectados. Una batalla entre software autónomo había comenzado.

Esto nos lleva a una reflexión importante: desde su nacimiento, la ciberseguridad ha sido una carrera entre ataque y defensa. Lo que comenzó como una prueba técnica, terminó anticipando décadas de conflicto digital.

¿Qué relevancia tiene Creeper para el pentesting actual?
Aunque pueda parecer un fósil tecnológico, Creeper tiene mucho que enseñarnos desde la perspectiva del pentesting y el hacking ético.

Su funcionamiento básico comparte principios que hoy siguen vigentes en entornos reales:

Movimiento lateral automatizado: el uso de RSH en Creeper es análogo a cómo un pentester moderno puede usar herramientas como Evil-WinRM, psExec, WinRM, o incluso ssh con claves comprometidas para saltar entre sistemas.
Escaneo de red: antes de propagarse, Creeper necesitaba identificar sistemas alcanzables. Esto recuerda al uso de herramientas como nmap, masscan o ping sweep en fases de enumeración activa.
Ejecución remota de código: una vez encontrado un objetivo, Creeper se copiaba y se ejecutaba. Hoy, esto podría hacerse mediante exploits RCE, ejecución de payloads con Metasploit, o incluso con reverse shells.
Persistencia efímera: Creeper no dejaba rastro. En pentesting real, esto se asocia a ataques que buscan evitar la detección o limpieza tras uso.
Curiosidades y legado
El nombre “Creeper” proviene de un personaje de dibujos animados de Scooby-Doo.
El mensaje “Catch me if you can” fue una especie de broma interna, pero años después inspiraría incluso títulos de películas.
Creeper fue desarrollado mucho antes de que existieran antivirus, firewalls o la mínima conciencia sobre seguridad informática.
Su creador, Bob Thomas, no tenía intención de hacer daño. Era solo un experimento de replicación de código… que encendió una mecha que aún no se apaga.
Creeper no fue una amenaza. No cifraba archivos, no espiaba a nadie, no borraba discos ni instalaba puertas traseras. Pero sembró una idea. Una idea que ha evolucionado hasta convertirse en uno de los mayores desafíos tecnológicos de nuestra era: el malware.

Como pentester, investigador o simplemente apasionado de la seguridad, entender cómo empezó todo es más que una lección de historia: es una forma de afilar nuestra visión crítica, técnica y estratégica.

Hoy, cuando diseñamos un exploit o simulamos una intrusión, hay una parte de Creeper en cada payload, en cada pivoteo, en cada técnica de evasión.