---
layout: "post"

title: "John the Ripper: qué es y por qué es importante"
excerpt: "John the Ripper permite auditar la resistencia de hashes y contraseñas en laboratorios y evaluaciones autorizadas."

permalink: "/blog/guias/john-the-ripper-que-es-y-por-que-es-importante/"
slug: "john-the-ripper-que-es-y-por-que-es-importante"
cover_image:

category: "guias"
category_label: "Guías"
primary_category_anchor: "guias"
categories:
  - "guias"
kicker: "Guías"
kicker_secondary: "John the Ripper"
tags:
  - "john-the-ripper"
  - "password-cracking"
  - "hashes"
  - "credenciales"
  - "pentesting"

post_title: "John the Ripper: qué es y por qué es importante"
description: "Introducción a John the Ripper, su papel en auditorías de contraseñas y conceptos básicos de cracking en entornos controlados."

nav: blog

featured: true
featured_badge: "Cracking"
featured_lines:
  - "john the ripper / hashes"
  - "auditoría de contraseñas / formatos"
  - "validación de debilidad real"

reading_time: "6 min de lectura"
date: 2024-08-03 10:00:00 +0100

toc_html: |
  <a href="#que-problema-resuelve">Qué problema resuelve</a>
  <a href="#hash-no-es-cifrado">Hash no es cifrado</a>
  <a href="#tipos-de-uso">Tipos de uso</a>
  <a href="#modos-habituales">Modos habituales</a>
  <a href="#ver-resultados">Ver resultados</a>
  <a href="#valor-defensivo">Valor defensivo</a>
  <a href="#recomendaciones">Recomendaciones</a>
---

John the Ripper es una herramienta utilizada para auditar contraseñas mediante el análisis de hashes. En pentesting y laboratorios CTF, permite comprobar la resistencia real de contraseñas frente a diccionarios, reglas y ataques de fuerza bruta.

Debe utilizarse únicamente sobre hashes propios, muestras de laboratorio o entornos autorizados.

## Qué problema resuelve {#que-problema-resuelve}

Cuando se obtiene un hash durante una auditoría, ese hash no suele revelar directamente la contraseña. John intenta recuperar la contraseña original probando candidatos y comparando el resultado del algoritmo.

Esto permite responder preguntas como:

- ¿las contraseñas son débiles?
- ¿se reutilizan patrones predecibles?
- ¿las políticas de contraseña son suficientes?
- ¿el algoritmo de hash es adecuado?

## Hash no es cifrado {#hash-no-es-cifrado}

Un hash es una función unidireccional. No se descifra. Se prueban candidatos hasta encontrar uno que produzca el mismo resultado.

```text
candidato → función hash → comparación con hash objetivo
```

## Tipos de uso {#tipos-de-uso}

John puede trabajar con:

- hashes Unix;
- hashes Windows;
- ZIP protegidos;
- documentos ofimáticos;
- claves SSH;
- formatos extraídos con herramientas auxiliares.

## Modos habituales {#modos-habituales}

### Diccionario

Prueba palabras de una lista:

```bash
john --wordlist=rockyou.txt hashes.txt
```

### Reglas

Aplica transformaciones sobre el diccionario:

```bash
john --wordlist=rockyou.txt --rules hashes.txt
```

### Incremental

Prueba combinaciones de forma más amplia:

```bash
john --incremental hashes.txt
```

## Ver resultados {#ver-resultados}

```bash
john --show hashes.txt
```

## Valor defensivo {#valor-defensivo}

John no sirve solo para atacar. En una auditoría defensiva permite medir exposición real:

- contraseñas recuperadas;
- tiempo hasta recuperación;
- patrones débiles;
- usuarios afectados;
- recomendaciones de política.

## Recomendaciones {#recomendaciones}

Para reducir riesgo:

- usar MFA;
- evitar contraseñas reutilizadas;
- aplicar longitud mínima suficiente;
- usar gestores de contraseñas;
- almacenar contraseñas con algoritmos robustos como bcrypt, scrypt o Argon2;
- revisar exposición de hashes.

John the Ripper es útil porque convierte una debilidad teórica en evidencia medible.
