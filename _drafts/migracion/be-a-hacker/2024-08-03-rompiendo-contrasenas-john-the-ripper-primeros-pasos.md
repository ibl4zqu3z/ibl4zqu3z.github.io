---
layout: "post"

title: "Rompiendo contraseñas con John the Ripper: primeros pasos"
excerpt: "Uso básico de John the Ripper con diccionarios, reglas y revisión de resultados en un entorno controlado."

permalink: "/blog/guias/rompiendo-contrasenas-john-the-ripper-primeros-pasos/"
slug: "rompiendo-contrasenas-john-the-ripper-primeros-pasos"
cover_image:

category: "guias"
category_label: "Guías"
primary_category_anchor: "guias"
categories:
  - "guias"
kicker: "Guías"
kicker_secondary: "Cracking"
tags:
  - "john-the-ripper"
  - "rockyou"
  - "hashes"
  - "password-cracking"
  - "laboratorio"

post_title: "Rompiendo contraseñas con John the Ripper: primeros pasos"
description: "Guía práctica de primeros pasos con John the Ripper para auditar hashes en entornos de laboratorio y comprender ataques con diccionario."

nav: blog

featured: true
featured_badge: "Guía práctica"
featured_lines:
  - "john / wordlists / reglas básicas"
  - "hash cracking / primeras pruebas"
  - "interpretación de resultados"

reading_time: "8 min de lectura"
date: 2024-08-03 10:00:00 +0100

toc_html: |
  <a href="#preparar-el-laboratorio">Preparar el laboratorio</a>
  <a href="#ataque-con-diccionario">Ataque con diccionario</a>
  <a href="#ver-contrasenas-recuperadas">Ver contraseñas recuperadas</a>
  <a href="#aplicar-reglas">Aplicar reglas</a>
  <a href="#identificar-formato">Identificar formato</a>
  <a href="#ejemplo-de-estructura-de-informe">Ejemplo de estructura de informe</a>
  <a href="#buenas-practicas">Buenas prácticas</a>
  <a href="#conclusion">Conclusión</a>
---

Esta guía muestra los primeros pasos con John the Ripper en un entorno controlado. El objetivo es entender el flujo básico de auditoría de contraseñas: preparar hashes, elegir modo de ataque, ejecutar John y revisar resultados.

No debe usarse contra credenciales, hashes o sistemas sin autorización.

## Preparar el laboratorio {#preparar-el-laboratorio}

Crea una carpeta de trabajo:

```bash
mkdir -p ~/labs/john
cd ~/labs/john
```

El flujo básico requiere:

- un archivo con hashes;
- un diccionario;
- John the Ripper instalado.

En Kali Linux suele venir instalado. Si no:

```bash
sudo apt update
sudo apt install john -y
```

## Ataque con diccionario {#ataque-con-diccionario}

Ejemplo básico:

```bash
john --wordlist=/usr/share/wordlists/rockyou.txt hashes.txt
```

John toma cada palabra del diccionario, calcula el hash correspondiente y compara el resultado con los hashes objetivo.

## Ver contraseñas recuperadas {#ver-contrasenas-recuperadas}

```bash
john --show hashes.txt
```

La salida permite documentar qué hashes han sido recuperados y cuáles no.

## Aplicar reglas {#aplicar-reglas}

Las reglas permiten transformar palabras del diccionario:

```bash
john --wordlist=/usr/share/wordlists/rockyou.txt --rules hashes.txt
```

Esto permite probar variantes como mayúsculas, números al final o sustituciones comunes.

## Identificar formato {#identificar-formato}

En algunos casos John detecta el formato automáticamente. En otros, conviene indicarlo:

```bash
john --format=raw-md5 hashes.txt
```

Para listar formatos disponibles:

```bash
john --list=formats
```

## Ejemplo de estructura de informe {#ejemplo-de-estructura-de-informe}

```text
Hash auditado: usuario1
Método: diccionario + reglas
Diccionario: rockyou.txt
Resultado: recuperado
Tiempo: 00:00:04
Riesgo: contraseña débil basada en palabra común
```

## Buenas prácticas {#buenas-practicas}

- Trabaja siempre con autorización.
- No publiques hashes reales.
- No incluyas contraseñas reales en informes públicos.
- Usa ejemplos sintéticos en artículos.
- Documenta metodología sin exponer datos sensibles.

## Conclusión {#conclusion}

John the Ripper es una herramienta sencilla de empezar a usar, pero su valor está en interpretar el resultado. Recuperar una contraseña no es el final: lo importante es explicar por qué era débil y cómo corregir el problema.
