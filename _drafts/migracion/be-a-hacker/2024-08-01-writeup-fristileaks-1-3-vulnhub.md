---
layout: "post"
source_origin: "be-a-hacker.es"
migration_status: "reescrito"
author: "Isaac Blázquez"
language: "es"
title: "Writeup FristiLeaks 1.3 - VulnHub"
post_title: "Writeup FristiLeaks 1.3 - VulnHub"
description: "Resolución estructurada de FristiLeaks 1.3 de VulnHub, con enumeración web, acceso inicial y escalada de privilegios en laboratorio."
excerpt: "Walkthrough de FristiLeaks 1.3 centrado en reconocimiento, análisis de rutas, credenciales y escalada en Linux."
category: "writeups"
category_label: "Writeups"
primary_category_anchor: "writeups"
categories:
  - "writeups"
kicker: "Writeups"
kicker_secondary: "VulnHub"
tags:
  - "vulnhub"
  - "ctf"
  - "linux"
  - "web"
  - "privilege-escalation"
series: "VulnHub"
platform: "VulnHub"
machine: "FristiLeaks 1.3"
os: "Linux"
difficulty: "Media"
slug: "writeup-fristileaks-1-3-vulnhub"
permalink: "/blog/writeups/vulnhub/fristileaks-1-3/"
original_url: "https://be-a-hacker.es/fristileaks-ctf-walkthrough"
original_date: "2024-08-01"
reading_time: "10 min de lectura"
---

FristiLeaks 1.3 es una máquina de VulnHub orientada a practicar reconocimiento web, análisis manual, obtención de acceso inicial y escalada de privilegios. La resolución exige observar detalles que no siempre aparecen en un escaneo automático.

El entorno debe ejecutarse en laboratorio propio o autorizado.

## 1. Descubrimiento

Identificación de la IP:

```bash
sudo netdiscover -r 192.168.56.0/24
```

Escaneo inicial:

```bash
nmap -sV -sC -oA scans/fristileaks 192.168.56.102
```

El resultado permite centrar la enumeración sobre los servicios expuestos.

## 2. Enumeración web

Cuando aparece un servicio web, se revisa manualmente:

- página principal;
- código fuente;
- rutas comunes;
- comentarios;
- imágenes;
- formularios;
- mensajes de error.

Complemento con fuzzing:

```bash
ffuf -u http://192.168.56.102/FUZZ -w /usr/share/wordlists/dirb/common.txt
```

## 3. Análisis de pistas

FristiLeaks incluye pistas que obligan a mirar más allá del contenido visible. En máquinas CTF, imágenes, rutas ocultas o textos aparentemente decorativos pueden contener información útil.

Puntos a revisar:

```bash
exiftool imagen.png
strings archivo
curl -i http://192.168.56.102/ruta
```

## 4. Acceso inicial

Tras identificar el punto de entrada, se valida de forma controlada. El objetivo es obtener una shell limitada y continuar con enumeración local.

Listener:

```bash
nc -lvnp 4444
```

Estabilización:

```bash
python3 -c 'import pty; pty.spawn("/bin/bash")'
```

## 5. Enumeración local

```bash
whoami
id
hostname
uname -a
ls -la /home
sudo -l
find / -perm -4000 -type f 2>/dev/null
```

También se revisan ficheros de usuario, scripts, permisos de escritura y tareas programadas.

## 6. Movimiento hacia usuario

En esta fase interesa comprobar si hay credenciales reutilizadas, scripts ejecutables o permisos delegados.

Ejemplos de revisión:

```bash
find /home -type f -readable 2>/dev/null
find / -writable -type d 2>/dev/null
```

## 7. Escalada a root

La escalada se basa en correlacionar permisos, binarios y configuraciones. No basta con ejecutar un checklist; hay que entender qué puede ejecutar cada usuario y bajo qué contexto.

## 8. Lecciones

FristiLeaks refuerza tres ideas:

- la enumeración web manual sigue siendo crítica;
- las pistas del entorno importan;
- la escalada depende más de permisos y contexto que de exploits automáticos.

Un buen writeup debe mostrar el razonamiento, no solo el resultado.
