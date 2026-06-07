---
layout: "post"
source_origin: "be-a-hacker.es"
migration_status: "reescrito"
author: "Isaac Blázquez"
language: "es"
title: "Técnicas de reconocimiento activo"
post_title: "Técnicas de reconocimiento activo"
description: "Guía sobre reconocimiento activo en pentesting: escaneo de puertos, fingerprinting, enumeración de servicios y control del ruido generado."
excerpt: "El reconocimiento activo interactúa con el objetivo para confirmar servicios, versiones y superficie real. Esta guía ordena técnicas y precauciones."
category: "guias"
category_label: "Guías"
primary_category_anchor: "guias"
categories:
  - "guias"
kicker: "Guías"
kicker_secondary: "Reconocimiento"
tags:
  - "reconocimiento-activo"
  - "nmap"
  - "enumeracion"
  - "fingerprinting"
  - "pentesting"
series: "Reconocimiento en pentesting"
slug: "tecnicas-reconocimiento-activo"
permalink: "/blog/guias/tecnicas-reconocimiento-activo/"
original_url: "https://be-a-hacker.es/tecnicas-de-reconocimiento-activo"
original_date: "2024-07-29"
reading_time: "7 min de lectura"
---

El reconocimiento activo consiste en interactuar directamente con sistemas, aplicaciones o servicios para confirmar qué existe realmente. A diferencia del reconocimiento pasivo, esta fase genera tráfico hacia el objetivo y debe realizarse únicamente con autorización.

Su valor está en validar hipótesis: puertos abiertos, servicios, versiones, rutas, tecnologías y comportamientos.

## Diferencia frente al reconocimiento pasivo

```text
Pasivo → observa fuentes externas sin tocar el objetivo.
Activo → envía tráfico al objetivo para obtener respuestas.
```

Ambos enfoques son complementarios. El pasivo ayuda a construir el mapa inicial. El activo confirma qué superficie está viva y cómo responde.

## Escaneo inicial

Un escaneo rápido permite ubicar servicios principales:

```bash
nmap -sS --top-ports 1000 -oA scans/inicial 192.168.56.10
```

Después se profundiza sobre los puertos detectados:

```bash
nmap -sV -sC -p 22,80,443 -oA scans/servicios 192.168.56.10
```

## Enumeración de servicios

Cada servicio requiere tratamiento específico:

- HTTP/HTTPS: rutas, cabeceras, tecnologías, métodos, paneles.
- SMB: shares, permisos, versión.
- SSH: banner, autenticación permitida.
- FTP: anonymous login, escritura, versión.
- DNS: transferencia de zona, registros.

La enumeración debe ser dirigida, no indiscriminada.

## Fingerprinting web

Herramientas útiles:

```bash
whatweb http://objetivo.local
httpx -title -tech-detect -status-code -list hosts.txt
```

Revisar:

- código de estado;
- título;
- cabeceras;
- cookies;
- framework;
- servidor;
- rutas visibles;
- comportamiento ante errores.

## Control del ruido

El reconocimiento activo puede activar IDS, WAF o alertas. En auditorías reales conviene ajustar:

- velocidad;
- número de hilos;
- ventanas de prueba;
- user-agent;
- alcance de IPs;
- profundidad de fuzzing.

Ejemplo con menor agresividad:

```bash
nmap -sV --scan-delay 300ms -T2 -oA scans/lento 192.168.56.10
```

## Evidencias

Documenta cada hallazgo con:

```text
Activo: 192.168.56.10
Puerto: 80/tcp
Servicio: Apache
Versión: 2.4.x
Evidencia: captura Nmap + cabecera HTTP
Riesgo preliminar: revisar rutas y versión
```

## Resultado esperado

Al finalizar, debes tener una lista priorizada de servicios y aplicaciones que pasan a la fase de análisis técnico. El reconocimiento activo no es explotación. Es la base para saber dónde profundizar.
