---
layout: "post"
source_origin: "be-a-hacker.es"
migration_status: "reescrito"
author: "Isaac Blázquez"
language: "es"
title: "Credential Hunting in Linux - Walkthrough HTB Academy"
post_title: "Credential Hunting in Linux - Walkthrough HTB Academy"
description: "Resolución metodológica del laboratorio Credential Hunting in Linux de HTB Academy, centrada en búsqueda de credenciales en sistemas Linux autorizados."
excerpt: "Walkthrough de laboratorio sobre identificación de credenciales expuestas en Linux, ficheros sensibles y documentación de impacto."
category: "writeups"
category_label: "Writeups"
primary_category_anchor: "writeups"
categories:
  - "writeups"
kicker: "Writeups"
kicker_secondary: "HTB Academy"
tags:
  - "hackthebox"
  - "htb-academy"
  - "linux"
  - "credential-hunting"
  - "post-exploitation"
series: "HTB Academy"
platform: "HTB Academy"
module: "Credential Hunting"
lab: "Credential Hunting in Linux"
os: "Linux"
difficulty: "Intermedia"
slug: "credential-hunting-linux-htb-academy"
permalink: "/blog/writeups/htb-academy/credential-hunting-linux/"
original_url: "https://be-a-hacker.es/credential-hunting-in-linux-walkthroughs-htb-questions"
original_date: "2024-08-22"
reading_time: "8 min de lectura"
---

Credential Hunting in Linux es un laboratorio de HTB Academy orientado a localizar credenciales expuestas en sistemas Linux. Esta entrada presenta una metodología de búsqueda en entorno autorizado, útil para CTFs, laboratorios y auditorías internas con alcance definido.

## Objetivo

El objetivo es encontrar material sensible que permita demostrar impacto:

- contraseñas en texto plano;
- claves privadas;
- tokens;
- configuraciones con secretos;
- historiales de comandos;
- backups olvidados;
- variables de entorno;
- credenciales en aplicaciones.

## Enumeración inicial

Antes de buscar credenciales, se entiende el contexto:

```bash
whoami
id
hostname
pwd
ls -la
cat /etc/passwd
```

Después se revisan usuarios y directorios:

```bash
ls -la /home
find /home -type f -readable 2>/dev/null
```

## Lugares comunes

Rutas habituales de interés:

```text
/home/*/.bash_history
/home/*/.ssh/
/var/www/
/opt/
/etc/
/tmp/
/backups/
```

En aplicaciones web, los ficheros de configuración suelen contener credenciales de base de datos o tokens.

## Búsqueda por patrones

```bash
grep -RniE "password|passwd|pwd|secret|token|key" /home /var/www /opt 2>/dev/null
```

Conviene revisar falsos positivos y contexto. No todo lo que contiene “password” es una credencial útil.

## Claves SSH

```bash
find / -name "id_rsa" -o -name "id_ed25519" 2>/dev/null
```

Si aparece una clave, hay que comprobar permisos, propietario y si está protegida por passphrase.

## Historiales

Los historiales pueden contener comandos con credenciales o rutas de interés:

```bash
cat ~/.bash_history 2>/dev/null
```

También pueden existir historiales de MySQL, Python, Redis u otras herramientas.

## Variables de entorno

```bash
env
printenv
```

En contenedores y aplicaciones modernas, las variables de entorno son una fuente frecuente de secretos.

## Documentación

No basta con encontrar una contraseña. Hay que documentar:

- ubicación;
- usuario propietario;
- permiso de lectura;
- tipo de secreto;
- posible uso;
- impacto;
- mitigación.

## Mitigaciones

- eliminar secretos de código y backups;
- usar gestores de secretos;
- aplicar permisos mínimos;
- limpiar historiales;
- rotar credenciales expuestas;
- monitorizar acceso a ficheros sensibles.

## Conclusión

El credential hunting en Linux combina técnica y contexto. La clave está en buscar de forma ordenada, validar impacto y evitar tratar cualquier cadena como una credencial real sin confirmación.
