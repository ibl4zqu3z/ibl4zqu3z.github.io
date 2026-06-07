---
layout: "post"
source_origin: "be-a-hacker.es"
migration_status: "reescrito"
author: "Isaac Blázquez"
language: "es"
title: "Attacking SAM - Walkthrough HTB Academy"
post_title: "Attacking SAM - Walkthrough HTB Academy"
description: "Resolución metodológica del módulo Attacking SAM de HTB Academy, centrada en conceptos de hashes locales de Windows y auditoría en laboratorio."
excerpt: "Walkthrough de laboratorio sobre SAM, hashes locales y validación de credenciales en un entorno controlado de HTB Academy."
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
  - "windows"
  - "sam"
  - "password-attacks"
  - "credential-access"
series: "HTB Academy"
platform: "HTB Academy"
module: "Password Attacks"
lab: "Attacking SAM"
os: "Windows"
difficulty: "Intermedia"
slug: "attacking-sam-htb-academy"
permalink: "/blog/writeups/htb-academy/attacking-sam/"
original_url: "https://be-a-hacker.es/attacking-sam-walkthroughs-htb-questions"
original_date: "2024-08-06"
reading_time: "8 min de lectura"
---

Attacking SAM es un laboratorio de HTB Academy centrado en el análisis de credenciales locales de Windows. El objetivo de esta entrada es explicar el razonamiento técnico y el flujo de trabajo dentro de un entorno autorizado.

No se deben aplicar estas técnicas sobre sistemas reales sin permiso explícito.

## Contexto técnico

En Windows, la base SAM almacena información relacionada con cuentas locales. Durante una auditoría, el acceso a material de credenciales permite evaluar impacto post-explotación, reutilización de contraseñas y debilidades de política.

Conceptos clave:

- cuentas locales;
- hashes NTLM;
- privilegios necesarios;
- protección de ficheros del sistema;
- impacto de credenciales reutilizadas.

## Objetivo del laboratorio

El laboratorio busca responder:

- dónde se almacenan los hashes locales;
- qué permisos son necesarios para acceder a ellos;
- cómo interpretar el material extraído;
- cómo validar contraseñas en un entorno controlado;
- qué mitigaciones reducen el impacto.

## Flujo de trabajo

1. Confirmar acceso al entorno de laboratorio.
2. Identificar privilegios del usuario.
3. Revisar contexto local.
4. Localizar material de credenciales según el escenario.
5. Extraer evidencias permitidas por el laboratorio.
6. Analizar hashes offline.
7. Documentar riesgo y mitigación.

## Enumeración inicial

En Windows interesa revisar:

```cmd
whoami
whoami /priv
hostname
net user
net localgroup administrators
```

Esto permite saber si el usuario tiene privilegios suficientes para continuar.

## Análisis de hashes

En un laboratorio, los hashes obtenidos pueden auditarse offline con herramientas como John the Ripper o Hashcat. La finalidad es comprobar si las contraseñas son resistentes frente a ataques de diccionario y reglas.

```bash
john --format=NT --wordlist=wordlist.txt hashes.txt
john --show hashes.txt
```

## Evidencias a documentar

- usuario comprometido;
- privilegios disponibles;
- hashes recuperados o no recuperados;
- tiempo de recuperación;
- patrón de contraseña;
- impacto potencial;
- recomendaciones defensivas.

## Mitigaciones

- aplicar contraseñas largas y únicas;
- evitar reutilización entre cuentas locales;
- usar LAPS o Windows LAPS;
- limitar privilegios administrativos;
- proteger credenciales con controles de endpoint;
- monitorizar acceso a material sensible.

## Conclusión

El valor del laboratorio no está en extraer hashes, sino en entender qué significa ese acceso dentro de una cadena de ataque. Una contraseña local débil puede convertirse en movimiento lateral si se reutiliza en varios sistemas.
