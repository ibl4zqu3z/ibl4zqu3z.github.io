---
layout: "post"

title: "Writeup ICA 1"
excerpt: "Resolución migrada de ICA 1 en formato writeup, orientada a metodología de enumeración, explotación inicial y escalada de privilegios."

permalink: "/blog/writeups/writeup-ica-1/"
slug: "writeup-ica-1"
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
  - "ica-1"
  - "linux"
  - "writeup"
  - "enumeracion"
  - "privilege-escalation"

post_title: "Writeup ICA 1"
description: "Writeup de ICA 1 con estructura por fases de pentesting para laboratorio CTF autorizado."

nav: blog

featured: true
featured_badge: "Writeup"
featured_lines:
  - "VulnHub / Linux / CTF"
  - "enumeración / explotación / post-explotación"
  - "metodología reproducible"

reading_time: "5 min de lectura"
date: 2025-03-11 10:00:00 +0100

toc_html: |
  <a href="#contexto">Contexto</a>
  <a href="#reconocimiento">Reconocimiento</a>
  <a href="#enumeracion">Enumeración</a>
  <a href="#explotacion">Explotación</a>
  <a href="#post-explotacion">Post-explotación</a>
  <a href="#lecciones">Lecciones</a>
---

ICA 1 es una máquina de laboratorio orientada a practicar las fases básicas de una prueba de intrusión: reconocimiento, enumeración, explotación y escalada de privilegios.

La entrada publicada en el sitio antiguo aparece como ficha de writeup. Esta versión deja preparado el contenido en formato Markdown para completarlo o ampliarlo con capturas, comandos y evidencias.

## Contexto {#contexto}

El objetivo es comprometer la máquina dentro de un entorno controlado y obtener las evidencias del laboratorio. No debe extrapolarse a sistemas reales sin autorización.

## Reconocimiento {#reconocimiento}

La fase inicial debe responder tres preguntas:

- qué IP tiene el objetivo;
- qué puertos expone;
- qué servicios y versiones se ejecutan.

La salida de reconocimiento debe guardarse en ficheros para poder volver a ella durante el análisis.

## Enumeración {#enumeracion}

Con los servicios identificados, se profundiza en cada uno:

- revisión web;
- banners;
- rutas ocultas;
- servicios de autenticación;
- posibles credenciales;
- versiones vulnerables.

La enumeración debe conducir a una hipótesis concreta de explotación.

## Explotación {#explotacion}

La explotación debe hacerse de forma controlada, confirmando cada supuesto. La prioridad es obtener una primera ejecución o acceso válido sin romper el entorno.

Una vez logrado acceso inicial, se documenta:

- vector utilizado;
- usuario obtenido;
- permisos;
- evidencia de acceso.

## Post-explotación {#post-explotacion}

La post-explotación local se centra en elevar privilegios y encontrar flags o ficheros relevantes.

Comprobaciones habituales:

- permisos sudo;
- binarios SUID;
- tareas programadas;
- credenciales reutilizadas;
- archivos de configuración;
- versiones de kernel y servicios.

## Lecciones {#lecciones}

ICA 1 debe quedar como writeup metodológico: menos ruido, más evidencias, explicación clara de por qué cada paso aporta información y cómo se encadena hasta el objetivo final.
