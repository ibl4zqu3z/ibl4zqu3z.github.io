---
layout: "post"

title: "Fristileaks - VulnHub"
excerpt: "Writeup de FristiLeaks 1.3 con reconocimiento, enumeración web, descubrimiento de credenciales, subida de archivo y escalada de privilegios en laboratorio."

permalink: "/blog/writeups/fristileaks-vulnhub/"
slug: "fristileaks-vulnhub"
cover_image:

category: "writeups"
category_label: "Writeups"
primary_category_anchor: "writeups"
categories:
  - "writeups"
kicker: "Writeups"
kicker_secondary: "VulnHub"
tags:
  - "vulnhub"
  - "fristileaks"
  - "linux"
  - "writeup"
  - "web"
  - "privilege-escalation"

post_title: "Fristileaks - VulnHub"
description: "Resolución técnica de FristiLeaks 1.3, máquina VulnHub, estructurada por fases de reconocimiento, explotación web y post-explotación."

nav: blog

featured: true
featured_badge: "Writeup"
featured_lines:
  - "FristiLeaks / Apache / PHP"
  - "robots.txt / base64 / upload"
  - "shell / escalada / flag"

reading_time: "5 min de lectura"
date: 2024-11-28 10:00:00 +0100

toc_html: |
  <a href="#descripcion">Descripción</a>
  <a href="#reconocimiento">Reconocimiento</a>
  <a href="#exploracion-web">Exploración web</a>
  <a href="#explotacion">Explotación</a>
  <a href="#post-explotacion">Post-explotación</a>
  <a href="#lecciones">Lecciones</a>
---

FristiLeaks 1.3 es una máquina vulnerable de VulnHub diseñada para resolverse en pocas horas. Permite practicar enumeración web, análisis de código fuente, abuso de subida de ficheros y escalada local.

## Descripción {#descripcion}

Datos de la máquina original:

- nombre: FristiLeaks 1.3;
- formato: OVA;
- sistema: Linux;
- enfoque: web, credenciales y escalada local.

## Reconocimiento {#reconocimiento}

La máquina muestra una IP, pero se valida igualmente mediante descubrimiento de red. Después se enumeran puertos y servicios.

Resultado clave:

- puerto 80/TCP abierto;
- Apache 2.2.15 sobre CentOS;
- PHP 5.3.3;
- `robots.txt` con rutas interesantes.

## Exploración web {#exploracion-web}

La revisión de `robots.txt` revela rutas como `/cola`, `/sisi` y `/beer`. La navegación manual y el análisis de código fuente permiten detectar comentarios, cadenas codificadas y referencias útiles.

Una de las pistas relevantes está relacionada con contenido en Base64 incrustado en HTML. Al decodificarlo, se obtiene una imagen que aporta información para el acceso al panel.

## Explotación {#explotacion}

Tras validar credenciales, se accede a una zona con subida de archivos. El objetivo del laboratorio es convertir esa funcionalidad en ejecución controlada dentro del servidor.

Flujo conceptual:

1. identificar restricción de extensiones;
2. comprobar cómo procesa el servidor los archivos subidos;
3. subir un payload de laboratorio adaptado;
4. invocarlo desde el navegador;
5. obtener acceso inicial.

## Post-explotación {#post-explotacion}

Con acceso inicial, se estabiliza la shell y se revisa el sistema:

- usuario actual;
- versión de kernel;
- permisos de escritura;
- binarios disponibles;
- posibles vías de escalada.

La escalada final se apoya en una debilidad local del kernel vulnerable en el entorno de laboratorio. Tras elevar privilegios, se localiza la flag en el sistema.

## Lecciones {#lecciones}

FristiLeaks destaca por varias razones:

- no dar por válida una IP sin comprobarla;
- leer `robots.txt` y código fuente;
- decodificar pistas antes de explotar;
- entender restricciones de subida;
- separar explotación web de escalada local;
- documentar cada evidencia.
