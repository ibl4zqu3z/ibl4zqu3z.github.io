---
layout: "post"
source_origin: "be-a-hacker.es"
migration_status: "reescrito"
author: "Isaac Blázquez"
language: "es"
title: "Técnicas de reconocimiento pasivo"
post_title: "Técnicas de reconocimiento pasivo"
description: "Guía práctica sobre reconocimiento pasivo, fuentes OSINT y recopilación de información sin interacción directa con el objetivo."
excerpt: "Fuentes, técnicas y metodología para realizar reconocimiento pasivo antes de una auditoría o laboratorio de pentesting."
category: "guias"
category_label: "Guías"
primary_category_anchor: "guias"
categories:
  - "guias"
kicker: "Guías"
kicker_secondary: "OSINT"
tags:
  - "osint"
  - "reconocimiento-pasivo"
  - "dns"
  - "subdominios"
  - "pentesting"
series: "Reconocimiento en pentesting"
slug: "tecnicas-reconocimiento-pasivo"
permalink: "/blog/guias/tecnicas-reconocimiento-pasivo/"
original_url: "https://be-a-hacker.es/tecnicas-de-reconocimiento-pasivo"
original_date: "2024-07-28"
reading_time: "7 min de lectura"
---

El reconocimiento pasivo consiste en obtener información de un objetivo sin interactuar directamente con sus sistemas. Es una fase útil para reducir exposición, identificar activos y preparar pruebas posteriores con menos ruido.

En auditorías reales, esta fase suele ser la primera porque permite entender el entorno sin generar tráfico directo contra la infraestructura evaluada.

## Fuentes principales

Las fuentes más habituales son:

- motores de búsqueda;
- registros DNS;
- certificados TLS;
- repositorios públicos;
- perfiles profesionales;
- documentos publicados;
- servicios indexados por terceros;
- filtraciones públicas;
- metadatos en archivos.

## Dominios y subdominios

La enumeración de subdominios permite descubrir aplicaciones, paneles, entornos antiguos y servicios olvidados.

Herramientas útiles:

```bash
subfinder -d ejemplo.com -o subdominios.txt
amass enum -passive -d ejemplo.com -o amass.txt
```

Después, conviene normalizar y eliminar duplicados:

```bash
cat subdominios.txt amass.txt | sort -u > dominios-finales.txt
```

## Certificados TLS

Los certificados pueden revelar subdominios, nombres internos o activos que no aparecen enlazados desde la web principal.

Fuentes habituales:

- crt.sh;
- Certificate Transparency logs;
- Censys;
- SecurityTrails.

## Buscadores y dorks

Google, Bing o DuckDuckGo pueden localizar rutas, documentos, paneles, errores indexados o archivos sensibles.

Ejemplos de búsqueda:

```text
site:ejemplo.com filetype:pdf
site:ejemplo.com intitle:index.of
site:ejemplo.com inurl:admin
```

Estos operadores deben usarse con criterio y siempre dentro del marco autorizado.

## Repositorios públicos

GitHub, GitLab o Bitbucket pueden revelar:

- nombres de proyectos;
- rutas internas;
- endpoints;
- claves expuestas por error;
- patrones de tecnología;
- documentación técnica.

El objetivo no es explotar, sino identificar exposición y riesgo.

## Metadatos

Documentos PDF, Word o imágenes pueden contener nombres de usuario, rutas locales, versiones de software o datos de organización.

Herramienta básica:

```bash
exiftool documento.pdf
```

## Resultado del reconocimiento pasivo

El resultado debe ser una matriz útil:

```text
Activo        Fuente        Evidencia        Riesgo preliminar
api.ejemplo   crt.sh        certificado TLS  API pública
vpn.ejemplo   buscador      página login     acceso remoto
```

La clave está en convertir datos dispersos en superficie evaluable.
