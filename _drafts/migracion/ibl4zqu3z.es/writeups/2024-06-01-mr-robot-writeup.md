---
layout: "post"

title: "Mr. Robot Writeup"
excerpt: "Ficha antigua de Mr. Robot con secuencia de vídeo y fases principales: fingerprinting, exploración, explotación y escalada."

permalink: "/blog/writeups/mr-robot-writeup/"
slug: "mr-robot-writeup"
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
  - "mr-robot"
  - "wordpress"
  - "writeup"
  - "video"
  - "duplicado"

post_title: "Mr. Robot Writeup"
description: "Entrada antigua de Mr. Robot Writeup, útil como ficha de vídeo o para fusionar con el writeup nuevo Mr Robot 1."

nav: blog

featured: true
featured_badge: "Writeup"
featured_lines:
  - "Mr Robot / VulnHub"
  - "WordPress / shell / escalada"
  - "entrada antigua / revisar fusión"

reading_time: "5 min de lectura"
date: 2024-06-01 10:00:00 +0100

toc_html: |
  <a href="#resumen">Resumen</a>
  <a href="#fases-del-video">Fases del vídeo</a>
  <a href="#recomendacion-editorial">Recomendación editorial</a>
---

Esta entrada antigua funciona como ficha de vídeo o resumen de resolución. Presenta la máquina Mr. Robot como un laboratorio de nivel principiante/intermedio con WordPress, fuerza bruta controlada, shell y escalada de privilegios.

## Resumen {#resumen}

La entrada original resume una resolución con:

- enumeración de directorios;
- identificación de WordPress;
- abuso del panel para obtener ejecución;
- conversión de mini shell en reverse shell interactiva;
- elevación de privilegios.

## Fases del vídeo {#fases-del-video}

La ficha incluye marcas temporales:

- introducción;
- comprobación de hash;
- fingerprinting y reconocimiento;
- footprinting y exploración;
- explotación;
- mini shell PHP;
- reverse shell;
- elevación de privilegios.

## Recomendación editorial {#recomendacion-editorial}

Existe una entrada nueva titulada `Writeup Mr Robot 1`. Para evitar duplicidades, conviene elegir una de estas estrategias:

1. convertir esta entrada en ficha de vídeo enlazada desde el writeup principal;
2. fusionar ambas entradas;
3. mantener la nueva como URL canónica.

URL canónica recomendada:

```text
/blog/writeups/writeup-mr-robot-1/
```
