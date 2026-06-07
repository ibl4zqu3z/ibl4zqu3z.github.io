---
layout: "post"
source_origin: "be-a-hacker.es"
migration_status: "reescrito"
author: "Isaac Blázquez"
language: "es"
title: "Nmap para hacking ético"
post_title: "Nmap para hacking ético"
description: "Guía práctica de Nmap para reconocimiento, detección de servicios, versiones, sistemas operativos y primeras fases de pentesting."
excerpt: "Uso de Nmap para mapear superficie, detectar servicios y preparar una evaluación técnica con evidencias reproducibles."
category: "guias"
category_label: "Guías"
primary_category_anchor: "guias"
categories:
  - "guias"
kicker: "Guías"
kicker_secondary: "Nmap"
tags:
  - "nmap"
  - "reconocimiento"
  - "enumeracion"
  - "puertos"
  - "servicios"
  - "pentesting"
series: "Herramientas ofensivas"
slug: "nmap-para-hacking-etico"
permalink: "/blog/guias/nmap-para-hacking-etico/"
original_url: "https://be-a-hacker.es/nmap-para-hacking-etico"
original_date: "2024-07-30"
reading_time: "8 min de lectura"
---

Nmap es una de las herramientas esenciales en reconocimiento técnico. Permite descubrir puertos abiertos, identificar servicios, estimar sistemas operativos y obtener una primera imagen de la superficie expuesta.

Su valor no está solo en lanzar escaneos. Está en interpretar los resultados y convertirlos en decisiones de auditoría.

## Escaneo básico

```bash
nmap 192.168.56.10
```

Este comando comprueba los puertos TCP más comunes. Es útil para una primera aproximación, pero limitado.

## Detección de servicios y scripts por defecto

```bash
nmap -sV -sC -oA scans/basico 192.168.56.10
```

Opciones:

- `-sV`: intenta detectar versiones de servicios.
- `-sC`: ejecuta scripts seguros por defecto.
- `-oA`: guarda resultados en varios formatos.

## Escaneo de todos los puertos

```bash
nmap -p- --min-rate 5000 -oA scans/todos-puertos 192.168.56.10
```

Después, se profundiza sobre los puertos encontrados:

```bash
nmap -sV -sC -p 22,80,445 -oA scans/detalle 192.168.56.10
```

## Detección de sistema operativo

```bash
sudo nmap -O 192.168.56.10
```

La detección de sistema operativo es aproximada. Debe cruzarse con banners, TTL, servicios y comportamiento.

## UDP

UDP suele olvidarse, pero puede exponer DNS, SNMP, NTP o servicios internos.

```bash
sudo nmap -sU --top-ports 50 -oA scans/udp 192.168.56.10
```

Los escaneos UDP son más lentos y deben planificarse.

## NSE: Nmap Scripting Engine

NSE permite ejecutar scripts de enumeración y comprobación.

```bash
nmap --script vuln -p 80 192.168.56.10
```

En auditorías reales, usa scripts con criterio. No todos son inocuos y algunos pueden generar tráfico agresivo.

## Plantilla práctica de trabajo

```bash
mkdir -p scans
nmap -sS --top-ports 1000 -oA scans/01-top 192.168.56.10
nmap -p- --min-rate 5000 -oA scans/02-full 192.168.56.10
nmap -sV -sC -p PUERTOS -oA scans/03-versiones 192.168.56.10
```

## Interpretación

Ejemplo:

```text
80/tcp  open  http   Apache httpd 2.4.x
445/tcp open  smb    Samba smbd
```

Siguientes pasos:

- HTTP → revisar aplicación, rutas, tecnologías.
- SMB → enumerar shares, permisos y versión.
- SSH → revisar política de acceso, banner y credenciales si el alcance lo permite.

## Buenas prácticas

- Guarda siempre resultados.
- No escanees fuera del alcance.
- Documenta fecha, IP y comando.
- Ajusta intensidad según entorno.
- No confundas detección con vulnerabilidad confirmada.

Nmap ayuda a construir el mapa. La validación técnica empieza después.
