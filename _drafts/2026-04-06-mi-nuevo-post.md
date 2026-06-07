---
layout: post
title: "Título SEO del post | ibl4zqu3z"
post_title: "Título visible del post"
description: "Descripción breve para SEO y tarjetas."
permalink: /mi-nuevo-post.html
category_label: "Guías"
primary_category_anchor: guias
categories:
  - guias
tags:
  - pentesting
  - web
featured: false
cover_image: /assets/img/blog/mi-nuevo-post/cover.webp
thumb_image: /assets/img/blog/mi-nuevo-post/thumb.webp
reading_time: "8 min de lectura"
date: 2026-04-06 12:00:00 +02:00
excerpt: "Resumen corto del artículo para cards y listados."

toc_html: |
  <a href="#descripcion">Descripción</a>
  <a href="#resolucion-de-la-maquina">Resolución de la máquina</a>
  <a href="#fase-de-fingerprinting-reconocimiento-reconnaissance">Fase de Fingerprinting / Reconocimiento (Reconnaissance)</a>
  <a href="#fase-de-footprinting-exploracion-scanning">Fase de Footprinting / Exploración (Scanning)</a>
  <a href="#post-explotacion">Post Explotación</a>

---

## Introducción

Aquí escribes el contenido en **Markdown**.

## Lista

- Punto 1
- Punto 2
- Punto 3

## post-explotacion

```python
def main():
    print("Hola")
```


{% capture ejemplo_python %}def main():
    print("Hola")
{% endcapture %}
{% include code-window.html
  title="petición.txt"
  code=ejemplo_python %}