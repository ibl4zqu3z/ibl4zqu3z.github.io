---
layout: "post"

title: "Writeup Mr Robot 1"
excerpt: "Resolución migrada de Mr Robot 1, centrada en enumeración web, WordPress, obtención de acceso y escalada de privilegios en laboratorio."

permalink: "/blog/writeups/writeup-mr-robot-1/"
slug: "writeup-mr-robot-1"
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
  - "linux"
  - "writeup"
  - "privilege-escalation"

post_title: "Writeup Mr Robot 1"
description: "Writeup de la máquina Mr Robot 1 de VulnHub, estructurado por fases de reconocimiento, explotación y post-explotación."

nav: blog

featured: true
featured_badge: "Writeup"
featured_lines:
  - "VulnHub / WordPress / Linux"
  - "enumeración / credenciales / shell"
  - "privilege escalation / flags"

reading_time: "5 min de lectura"
date: 2025-03-11 10:00:00 +0100

toc_html: |
  <a href="#contexto">Contexto</a>
  <a href="#reconocimiento">Reconocimiento</a>
  <a href="#enumeracion-web">Enumeración web</a>
  <a href="#explotacion">Explotación</a>
  <a href="#escalada-de-privilegios">Escalada de privilegios</a>
  <a href="#lecciones">Lecciones</a>
---

Mr Robot 1 es una máquina clásica de VulnHub orientada a practicar enumeración web, WordPress, fuerza bruta controlada, obtención de shell y escalada de privilegios en Linux.

El objetivo del writeup no es memorizar comandos, sino seguir una secuencia ordenada: descubrir superficie, formular hipótesis, validar resultados y documentar evidencias.

## Contexto {#contexto}

La máquina simula un entorno vulnerable inspirado en la serie Mr. Robot. El enfoque principal está en el servicio web y en la gestión deficiente de credenciales.

## Reconocimiento {#reconocimiento}

Primero se identifica la IP objetivo dentro de la red de laboratorio y se enumeran puertos expuestos.

Aspectos clave:

- descubrir hosts activos;
- enumerar puertos TCP;
- detectar versiones de servicios;
- revisar banners y tecnologías.

## Enumeración web {#enumeracion-web}

El servicio web contiene información suficiente para orientar la explotación. En esta fase conviene revisar:

- `robots.txt`;
- rutas ocultas;
- formularios de login;
- CMS utilizado;
- usuarios potenciales.

WordPress introduce una vía de enumeración específica: usuarios, plugins, temas y credenciales débiles.

## Explotación {#explotacion}

Una vez identificados usuarios y una posible vía de autenticación, se valida el acceso al panel y se busca una forma controlada de obtener ejecución en el sistema.

En laboratorios de este tipo, el abuso de temas o plantillas de WordPress es una vía frecuente para convertir acceso administrativo en ejecución de código.

## Escalada de privilegios {#escalada-de-privilegios}

Con acceso inicial al sistema, la prioridad cambia:

- estabilizar shell;
- identificar usuario actual;
- revisar permisos;
- buscar binarios con SUID;
- comprobar versiones y rutas de escalada.

La escalada se obtiene al encontrar una debilidad local explotable dentro del entorno de laboratorio.

## Lecciones {#lecciones}

Mr Robot 1 refuerza varias ideas:

- la enumeración web es determinante;
- WordPress mal configurado puede ser puerta de entrada;
- las credenciales débiles siguen siendo críticas;
- una shell inicial rara vez es el final;
- la post-explotación debe documentarse con precisión.
