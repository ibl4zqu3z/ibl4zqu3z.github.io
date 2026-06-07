---
layout: "post"
source_origin: "be-a-hacker.es"
migration_status: "reescrito"
author: "Isaac Blázquez"
language: "es"
title: "Shodan: el buscador de dispositivos conectados"
post_title: "Shodan: el buscador de dispositivos conectados"
description: "Introducción práctica a Shodan para localizar exposición de servicios, banners y dispositivos conectados desde una perspectiva OSINT."
excerpt: "Shodan permite consultar servicios expuestos indexados en Internet. Esta guía explica su uso defensivo y su valor en reconocimiento pasivo."
category: "guias"
category_label: "Guías"
primary_category_anchor: "guias"
categories:
  - "guias"
kicker: "Guías"
kicker_secondary: "Shodan"
tags:
  - "shodan"
  - "osint"
  - "exposicion"
  - "reconocimiento"
  - "internet"
series: "Herramientas ofensivas"
slug: "shodan-buscador-dispositivos-conectados"
permalink: "/blog/guias/shodan-buscador-dispositivos-conectados/"
original_url: "https://be-a-hacker.es/shodan-el-buscador-de-dispositivos-conectados"
original_date: "2024-07-31"
reading_time: "7 min de lectura"
---

Shodan es un motor de búsqueda especializado en servicios y dispositivos expuestos a Internet. A diferencia de un buscador tradicional, no indexa principalmente páginas web, sino banners, puertos, protocolos, certificados y metadatos de servicios conectados.

Desde una perspectiva defensiva, Shodan permite entender qué parte de una organización está visible públicamente.

## Qué puede mostrar Shodan

Shodan puede indexar información como:

- dirección IP;
- puerto;
- servicio;
- banner;
- versión;
- certificado TLS;
- geolocalización aproximada;
- proveedor cloud;
- organización asociada;
- tecnologías detectadas.

## Búsquedas básicas

Ejemplos de filtros:

```text
org:"Nombre de organización"
hostname:ejemplo.com
ssl.cert.subject.cn:ejemplo.com
port:3389 country:ES
product:OpenSSH
```

Estas consultas ayudan a localizar exposición, pero no sustituyen una validación técnica.

## Casos de uso defensivo

Shodan puede ayudar a detectar:

- paneles administrativos expuestos;
- RDP o SSH accesibles desde Internet;
- dispositivos IoT mal configurados;
- certificados antiguos;
- servicios olvidados;
- tecnologías obsoletas;
- superficies cloud no inventariadas.

## Uso en pentesting

En la fase de reconocimiento, Shodan permite contrastar información pasiva antes de interactuar con el objetivo.

Ejemplo de flujo:

1. Buscar dominios y certificados.
2. Identificar IPs y servicios.
3. Agrupar por tecnología.
4. Priorizar exposición crítica.
5. Validar dentro del alcance autorizado.

## Limitaciones

Shodan no siempre muestra el estado actual. Sus resultados dependen del momento del último escaneo. Un servicio puede haber cambiado, cerrado o actualizado.

Por eso, cualquier hallazgo debe confirmarse después con herramientas propias y dentro del alcance.

## Riesgo típico

Una exposición típica sería:

```text
Servicio: RDP
Puerto: 3389
Exposición: Internet
Riesgo: acceso remoto publicado
Acción: validar necesidad, restringir origen, aplicar MFA o VPN
```

## Conclusión

Shodan no es solo una herramienta ofensiva. También es útil para inventario externo, revisión de exposición y detección temprana de servicios publicados por error.

La clave está en usarlo para reducir incertidumbre, no para sustituir la validación técnica.
