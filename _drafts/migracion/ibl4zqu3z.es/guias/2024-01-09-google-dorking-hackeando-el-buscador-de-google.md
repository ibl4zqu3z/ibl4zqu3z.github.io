---
layout: "post"

title: "Google Dorking, hackeando el buscador de Google"
excerpt: "Guía de operadores de Google Dorking para afinar búsquedas, localizar información expuesta y trabajar OSINT con criterio ético."

permalink: "/blog/guias/google-dorking-hackeando-el-buscador-de-google/"
slug: "google-dorking-hackeando-el-buscador-de-google"
cover_image:

category: "guias"
category_label: "Guías"
primary_category_anchor: "guias"
categories:
  - "guias"
kicker: "Guías"
kicker_secondary: "OSINT"
tags:
  - "google-dorking"
  - "osint"
  - "reconocimiento"
  - "buscadores"
  - "dorks"

post_title: "Google Dorking, hackeando el buscador de Google"
description: "Introducción práctica al Google Dorking, operadores básicos, intermedios y avanzados para búsquedas OSINT y reconocimiento pasivo."

nav: blog

featured: true
featured_badge: "OSINT"
featured_lines:
  - "site / inurl / intitle"
  - "filetype / allintext / cache"
  - "búsqueda avanzada con criterio ético"

reading_time: "5 min de lectura"
date: 2024-01-09 10:00:00 +0100

toc_html: |
  <a href="#que-es-dorking">Qué es Dorking</a>
  <a href="#nivel-basico">Nivel básico</a>
  <a href="#nivel-intermedio">Nivel intermedio</a>
  <a href="#nivel-avanzado">Nivel avanzado</a>
  <a href="#uso-responsable">Uso responsable</a>
---

Google Dorking consiste en usar operadores avanzados de búsqueda para obtener resultados más precisos. En seguridad ofensiva y OSINT permite localizar información pública que, por mala configuración o exposición accidental, puede revelar superficie de ataque.

No es una técnica intrusiva por sí misma. El riesgo aparece cuando la información localizada se usa fuera de un marco legal o sin autorización.

## Qué es Dorking {#que-es-dorking}

Un dork es una consulta avanzada que fuerza al buscador a limitar resultados por dominio, título, URL, tipo de archivo o contenido interno.

Ejemplos de usos legítimos:

- localizar documentos públicos expuestos;
- revisar información indexada de una organización propia;
- detectar directorios abiertos;
- identificar páginas antiguas o copias cacheadas;
- preparar una fase de reconocimiento pasivo.

## Nivel básico {#nivel-basico}

Búsquedas básicas:

```text
palabra clave
"frase exacta"
palabra1 AND palabra2
palabra1 OR palabra2
palabra1 -palabra2
```

Estas consultas ayudan a reducir ruido y a eliminar resultados irrelevantes.

## Nivel intermedio {#nivel-intermedio}

Operadores útiles:

```text
site:dominio.com palabra
inurl:admin
intitle:index.of
filetype:pdf
intext:"confidential"
```

Aplicados de forma responsable, permiten auditar qué está indexando Google sobre un dominio propio o autorizado.

## Nivel avanzado {#nivel-avanzado}

Operadores combinados:

```text
site:example.com filetype:pdf "password"
site:example.com intitle:index.of backup
site:example.com inurl:login
```

También pueden usarse operadores como `cache:`, `before:`, `after:` o búsquedas agrupadas con paréntesis para construir consultas más precisas.

## Uso responsable {#uso-responsable}

El objetivo no es explotar, sino identificar exposición pública. Un buen informe debe incluir:

- consulta utilizada;
- URL afectada;
- tipo de información expuesta;
- impacto;
- recomendación de desindexación o restricción.

Medidas de mitigación habituales:

- revisar `robots.txt`, sin confiar en él como control de seguridad;
- proteger rutas sensibles con autenticación;
- eliminar backups accesibles;
- aplicar cabeceras y controles de cache;
- solicitar eliminación del índice cuando proceda.
