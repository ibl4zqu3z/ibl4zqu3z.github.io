---
layout: "post"
source_origin: "be-a-hacker.es"
migration_status: "reescrito"
author: "Isaac Blázquez"
language: "es"
title: "Writeup Mr Robot 1 - VulnHub"
post_title: "Writeup Mr Robot 1 - VulnHub"
description: "Resolución estructurada de la máquina Mr Robot 1 de VulnHub, con reconocimiento, explotación web y escalada de privilegios en entorno controlado."
excerpt: "Walkthrough de Mr Robot 1 centrado en metodología: enumeración, acceso inicial, credenciales y escalada de privilegios."
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
  - "wordpress"
  - "privilege-escalation"
series: "VulnHub"
platform: "VulnHub"
machine: "Mr Robot 1"
os: "Linux"
difficulty: "Media"
slug: "writeup-mr-robot-1-vulnhub"
permalink: "/blog/writeups/vulnhub/mr-robot-1/"
original_url: "https://be-a-hacker.es/mr-robot-ctf-walkthrough"
original_date: "2024-07-28"
reading_time: "10 min de lectura"
---

Mr Robot 1 es una máquina vulnerable de VulnHub pensada para practicar enumeración web, análisis de WordPress, búsqueda de credenciales y escalada de privilegios en Linux. El objetivo de este writeup es documentar el razonamiento y no limitarse a una secuencia de comandos.

Todo el proceso debe ejecutarse únicamente en laboratorio propio o entorno autorizado.

## 1. Identificación del objetivo

Una vez desplegada la máquina en la misma red de laboratorio, el primer paso es identificar su dirección IP.

```bash
sudo netdiscover -r 192.168.56.0/24
```

Con el objetivo localizado, se lanza un escaneo inicial:

```bash
nmap -sS -sV -sC -oA scans/mrrobot-inicial 192.168.56.101
```

El resultado debe orientar los siguientes pasos: servicios web, puertos abiertos y posibles versiones relevantes.

## 2. Enumeración web

Si existe HTTP o HTTPS, se revisa la web manualmente antes de automatizar.

Puntos a comprobar:

- rutas visibles;
- `robots.txt`;
- tecnologías detectadas;
- formularios;
- paneles de login;
- comentarios HTML;
- ficheros públicos.

```bash
whatweb http://192.168.56.101
```

Después se puede complementar con fuerza bruta de directorios:

```bash
ffuf -u http://192.168.56.101/FUZZ -w /usr/share/wordlists/dirb/common.txt
```

## 3. WordPress y usuarios

Si se detecta WordPress, el siguiente paso es revisar rutas típicas y enumerar información pública.

```bash
wpscan --url http://192.168.56.101 --enumerate u,p,t
```

La prioridad no es lanzar pruebas a ciegas, sino confirmar usuarios, plugins, temas y vectores realistas.

## 4. Credenciales y acceso inicial

En esta máquina suele aparecer una relación entre diccionarios, usuarios y contraseñas. La validación debe hacerse contra el panel correspondiente y documentando cada evidencia.

Una vez obtenido acceso administrativo o capacidad de escritura, el objetivo es conseguir ejecución controlada de código en el laboratorio.

## 5. Reverse shell

En un entorno CTF, una vía habitual es modificar un punto ejecutable del CMS para obtener una shell reversa.

Listener local:

```bash
nc -lvnp 4444
```

Tras recibir conexión, se estabiliza la shell:

```bash
python3 -c 'import pty; pty.spawn("/bin/bash")'
export TERM=xterm
```

## 6. Escalada de privilegios

La escalada empieza por enumerar:

```bash
whoami
id
uname -a
sudo -l
find / -perm -4000 -type f 2>/dev/null
```

Se revisan binarios SUID, permisos incorrectos, credenciales locales, tareas programadas y versiones vulnerables.

## 7. Evidencias

El writeup debe documentar:

- IP objetivo;
- puertos abiertos;
- rutas relevantes;
- credenciales obtenidas;
- vector de acceso;
- usuario comprometido;
- método de escalada;
- flags o pruebas de control.

## 8. Lecciones

Mr Robot 1 es útil porque fuerza a encadenar varias fases: reconocimiento, enumeración web, análisis de WordPress, credenciales y Linux privilege escalation. La máquina no se resuelve solo con una herramienta; se resuelve entendiendo la superficie y priorizando hallazgos.
