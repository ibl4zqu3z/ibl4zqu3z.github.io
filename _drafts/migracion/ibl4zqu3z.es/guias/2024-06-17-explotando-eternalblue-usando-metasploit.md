---
layout: "post"

title: "Explotando EternalBlue usando Metasploit"
excerpt: "Guía conceptual para entender EternalBlue en laboratorio, su impacto histórico y las medidas defensivas asociadas a MS17-010."

permalink: "/blog/guias/explotando-eternalblue-usando-metasploit/"
slug: "explotando-eternalblue-usando-metasploit"
cover_image:

category: "guias"
category_label: "Guías"
primary_category_anchor: "guias"
categories:
  - "guias"
kicker: "Guías"
kicker_secondary: "Metasploit"
tags:
  - "eternalblue"
  - "metasploit"
  - "ms17-010"
  - "smb"
  - "laboratorio"
  - "vulnerabilidades"

post_title: "Explotando EternalBlue usando Metasploit"
description: "Artículo migrado sobre EternalBlue y Metasploit, reestructurado con enfoque de laboratorio autorizado, análisis de riesgo y mitigación."

nav: blog

featured: true
featured_badge: "Laboratorio"
featured_lines:
  - "MS17-010 / SMBv1 / laboratorio"
  - "validación controlada / Metasploit"
  - "parcheo / segmentación / hardening"

reading_time: "5 min de lectura"
date: 2024-06-17 10:00:00 +0100

toc_html: |
  <a href="#contexto-de-eternalblue">Contexto de EternalBlue</a>
  <a href="#preparacion-del-laboratorio">Preparación del laboratorio</a>
  <a href="#validacion-controlada">Validación controlada</a>
  <a href="#evidencias">Evidencias</a>
  <a href="#mitigacion">Mitigación</a>
---

EternalBlue es el nombre asociado a la explotación de una vulnerabilidad crítica en SMBv1 corregida por Microsoft en el boletín MS17-010. Su impacto histórico quedó marcado por incidentes como WannaCry y NotPetya.

Este contenido debe entenderse únicamente dentro de un laboratorio autorizado. La explotación de sistemas ajenos es ilegal.

## Contexto de EternalBlue {#contexto-de-eternalblue}

SMB permite compartir archivos, impresoras y otros recursos en entornos Windows. La vulnerabilidad MS17-010 permitió ejecución remota de código en sistemas sin parchear.

Su peligrosidad se explica por tres factores:

- afectaba a un servicio muy extendido;
- podía explotarse remotamente;
- facilitaba propagación lateral dentro de redes internas.

## Preparación del laboratorio {#preparacion-del-laboratorio}

Un laboratorio seguro debe estar aislado, sin acceso a redes de terceros y con máquinas vulnerables creadas expresamente para la práctica.

Elementos mínimos:

- una máquina atacante;
- una máquina Windows vulnerable;
- red privada de laboratorio;
- snapshots para restaurar estado;
- documentación de cada prueba.

## Validación controlada {#validacion-controlada}

La validación no consiste en lanzar una herramienta y aceptar el resultado. Debe comprobarse:

- versión del sistema;
- exposición de SMB;
- estado de parcheo;
- alcance de red;
- posible impacto.

Metasploit puede ayudar a reproducir una explotación en laboratorio, pero el valor real está en entender por qué el sistema es vulnerable y cómo corregirlo.

## Evidencias {#evidencias}

Un informe debe recoger:

- host afectado;
- puerto y servicio expuesto;
- referencia MS17-010;
- evidencia de vulnerabilidad;
- impacto potencial;
- recomendación priorizada.

La evidencia debe ser suficiente para remediar, no para facilitar abuso fuera del entorno autorizado.

## Mitigación {#mitigacion}

Medidas defensivas:

- aplicar parches de seguridad;
- deshabilitar SMBv1;
- segmentar redes internas;
- limitar tráfico SMB entre segmentos;
- revisar credenciales privilegiadas;
- monitorizar intentos de explotación.

EternalBlue sigue siendo relevante como lección: una vulnerabilidad conocida, si no se corrige, puede convertirse en un incidente global.
