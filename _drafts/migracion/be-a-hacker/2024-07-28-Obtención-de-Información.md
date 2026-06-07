---
title: "Obtención de Información en Ciberseguridad"
header:
  teaser: /assets/images/guias/obtencion_informacion.jpg
excerpt_separator: "<!--more-->"
categories:
  - guias
---


La obtención de información, también conocida como reconocimiento o recon, es una fase esencial y fundamental en el proceso de pentesting y ciberseguridad ofensiva. Este paso preliminar implica la recopilación de datos detallados y relevantes sobre un objetivo antes de realizar cualquier intento de ataque o intervención. El objetivo es armarse con la mayor cantidad de información posible para planificar y ejecutar acciones futuras de manera más efectiva y con menos riesgo.

## ¿Qué es la Obtención de Información?

En términos simples, la obtención de información es el proceso de recopilar datos sobre un objetivo. Estos datos pueden incluir una amplia gama de elementos, desde direcciones IP y nombres de dominio hasta detalles sobre la infraestructura de red, tecnologías utilizadas, personal clave y políticas de seguridad. La fase de reconocimiento puede ser tan superficial o profunda como se desee, dependiendo de los objetivos específicos de la operación de pentesting.

La obtención de información se divide principalmente en dos categorías: reconocimiento pasivo y reconocimiento activo.

### Reconocimiento Pasivo

El reconocimiento pasivo es la recolección de datos sin interactuar directamente con el sistema o red del objetivo. Esta forma de reconocimiento es menos intrusiva y conlleva un menor riesgo de detección, ya que se basa en fuentes de información públicas y abiertas. Algunos métodos comunes de reconocimiento pasivo incluyen:

- **WHOIS y Consultas de DNS**: Herramientas como WHOIS permiten obtener información sobre los propietarios de nombres de dominio, fechas de registro y detalles de contacto. Las consultas de DNS pueden revelar detalles sobre servidores de correo, servidores web y otros servicios.

- **Búsquedas en Motores de Búsqueda (Google Dorks)**: Utilizando operadores avanzados de búsqueda en motores como Google, se pueden encontrar documentos, listas de usuarios y otras informaciones sensibles expuestas accidentalmente en la web.

- **Revisión de Redes Sociales y Medios Públicos**: Las redes sociales, blogs y foros pueden contener una gran cantidad de información sobre una organización o individuo, incluidos detalles sobre la estructura interna, tecnología utilizada y empleados clave.

- **Shodan y Otros Motores de Búsqueda de Dispositivos**: Shodan es un motor de búsqueda que indexa dispositivos conectados a Internet, permitiendo a los usuarios buscar routers, cámaras de seguridad y otros dispositivos que puedan estar expuestos.

El reconocimiento pasivo es una forma de «espionaje» no invasiva que permite a los atacantes construir un perfil detallado del objetivo sin levantar sospechas.

### Reconocimiento Activo

En contraste, el reconocimiento activo implica interactuar directamente con el sistema o la red del objetivo. Esta forma de obtención de información es más riesgosa porque puede desencadenar alertas de seguridad. Sin embargo, también proporciona datos más precisos y detallados. Algunos métodos de reconocimiento activo incluyen:

- **Escaneo de Puertos**: Herramientas como Nmap se utilizan para escanear puertos en un sistema o red, identificando cuáles están abiertos y qué servicios están escuchando en esos puertos. Esto puede revelar información crucial sobre qué aplicaciones y sistemas operativos están en uso.

- **Enumeración de Servicios y Versiones**: Una vez que se identifican los puertos abiertos, se pueden realizar consultas adicionales para determinar qué versiones de software están en uso, lo que puede ayudar a identificar vulnerabilidades específicas.

- **Ping y Traceroute**: Estas herramientas pueden ser utilizadas para mapear la red y descubrir la topología de la misma, así como para identificar sistemas activos y sus relaciones.

- **Ataques de Fuerza Bruta y Pruebas de Contraseñas**: Aunque más intrusivos, estos métodos pueden revelar credenciales débiles o por defecto, proporcionando acceso directo a sistemas y redes.

Puedes saber mas del reconocimiento activo en la entrada: [Tecnicas de reconocimiento activo](2024-07-29-Tecnicas-de-reconocimiento-activo.md)
  
## Importancia del Reconocimiento en Ciberseguridad

La fase de reconocimiento es crítica porque proporciona la base para todas las acciones subsecuentes en un ejercicio de pentesting o ataque cibernético. Una buena recolección de información permite a los pentesters:

- **Identificar Superficies de Ataque**: Conocer qué sistemas y servicios están disponibles y cómo están configurados ayuda a identificar posibles puntos de entrada y áreas de vulnerabilidad.

- **Planificación y Preparación**: Basándose en la información recopilada, los pentesters pueden planificar sus ataques de manera más eficiente, seleccionando las técnicas y herramientas más apropiadas para el entorno específico del objetivo.

- **Reducción de Riesgos**: Entender la infraestructura del objetivo permite minimizar los riesgos de detección y respuesta, especialmente cuando se utilizan técnicas de evasión.

## Consideraciones Éticas y Legales

Es crucial que cualquier actividad de reconocimiento se realice dentro de un marco legal y ético. El reconocimiento, especialmente el activo, puede ser considerado intrusivo y, en muchos casos, ilegal si se realiza sin el consentimiento del propietario del sistema o red objetivo. Por lo tanto, siempre se debe obtener la autorización adecuada y respetar las leyes y regulaciones locales e internacionales.

## Herramientas Comunes para el Reconocimiento

Algunas de las herramientas más utilizadas en la fase de reconocimiento incluyen:

- Nmap: Para escaneo de puertos y servicios.
- Metasploit: Para pruebas de penetración más avanzadas y reconocimiento activo.
- Maltego: Para análisis de relaciones y recolección de información pública.
- Recon-ng: Una plataforma de reconocimiento web que facilita la recolección de información de fuentes públicas.