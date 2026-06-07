---
layout: "post"

title: "Obtención de información en ciberseguridad"
excerpt: "La obtención de información permite entender un objetivo antes de evaluar riesgos. Esta guía ordena fuentes, técnicas y límites éticos."

permalink: "/blog/guias/obtencion-informacion-ciberseguridad/"
slug: "obtencion-informacion-ciberseguridad"
cover_image:

category: "guias"
category_label: "Guías"
primary_category_anchor: "guias"
categories:
  - "guias"
kicker: "Guías"
kicker_secondary: "Reconocimiento"
tags:
  - "reconocimiento"
  - "information-gathering"
  - "osint"
  - "pentesting"
  - "metodologia"

post_title: "Obtención de información en ciberseguridad"
description: "Introducción a la fase de obtención de información en auditorías de seguridad, diferenciando reconocimiento pasivo, activo y validación de superficie."

nav: blog

featured: true
featured_badge: "Metodología"
featured_lines:
  - "information gathering / alcance"
  - "fuentes públicas / superficie inicial"
  - "decisiones técnicas antes de explotar"

reading_time: "7 min de lectura"
date: 2024-07-28 10:00:00 +0100

toc_html: |
  <a href="#objetivo-de-la-fase">Objetivo de la fase</a>
  <a href="#reconocimiento-pasivo">Reconocimiento pasivo</a>
  <a href="#reconocimiento-activo">Reconocimiento activo</a>
  <a href="#de-datos-a-hipotesis">De datos a hipótesis</a>
  <a href="#herramientas-habituales">Herramientas habituales</a>
  <a href="#criterio-etico-y-legal">Criterio ético y legal</a>
  <a href="#resultado-esperado">Resultado esperado</a>
---

La obtención de información es la primera fase técnica de cualquier evaluación de seguridad. Antes de buscar vulnerabilidades, el pentester necesita entender qué activos existen, qué servicios están expuestos, qué tecnologías se usan y qué relaciones hay entre dominios, direcciones IP, aplicaciones y usuarios.

Un reconocimiento bien hecho reduce ruido, evita pruebas innecesarias y permite priorizar mejor.

## Objetivo de la fase {#objetivo-de-la-fase}

El objetivo no es acumular datos sin criterio. El objetivo es construir una visión útil del entorno:

- activos identificados;
- dominios y subdominios;
- rangos de red;
- servicios expuestos;
- tecnologías detectadas;
- posibles puntos de entrada;
- dependencias externas;
- usuarios, correos o patrones públicos.

## Reconocimiento pasivo {#reconocimiento-pasivo}

El reconocimiento pasivo obtiene información sin interactuar directamente con la infraestructura objetivo. Se apoya en fuentes públicas, motores de búsqueda, registros DNS, repositorios, certificados, metadatos y plataformas OSINT.

Ejemplos:

- consultas WHOIS;
- DNS públicos;
- certificados TLS;
- buscadores;
- repositorios públicos;
- redes sociales profesionales;
- filtraciones conocidas;
- Shodan, Censys o FOFA.

## Reconocimiento activo {#reconocimiento-activo}

El reconocimiento activo implica interacción directa con el objetivo. Puede incluir escaneos de puertos, peticiones HTTP, enumeración de servicios o consultas específicas.

Ejemplos:

```bash
nmap -sV -sC -oA scan-inicial 192.168.56.10
```

Esta fase debe estar siempre autorizada. Aunque solo sea enumeración, genera tráfico y puede activar alertas.

## De datos a hipótesis {#de-datos-a-hipotesis}

La información útil debe convertirse en hipótesis técnicas:

```text
Puerto 80 abierto  → revisar tecnología web
Puerto 445 abierto → revisar exposición SMB
Subdominio admin   → analizar autenticación
Versión antigua    → validar CVEs conocidas
```

Sin esta traducción, el reconocimiento se convierte en una lista sin valor operativo.

## Herramientas habituales {#herramientas-habituales}

- Nmap para puertos y servicios.
- httpx para fingerprinting web.
- Amass o Subfinder para subdominios.
- WhatWeb o Wappalyzer para tecnologías.
- Shodan para exposición indexada.
- theHarvester para correos y dominios.
- Recon-ng para automatizar recolección OSINT.

## Criterio ético y legal {#criterio-etico-y-legal}

La obtención de información debe ejecutarse dentro del alcance autorizado. El hecho de que un dato sea público no implica que pueda usarse sin criterio. En auditorías reales, la autorización, el alcance y las ventanas de prueba deben quedar definidos antes de cualquier interacción activa.

## Resultado esperado {#resultado-esperado}

El entregable de esta fase debe incluir:

- activos identificados;
- superficie expuesta;
- tecnologías relevantes;
- servicios prioritarios;
- riesgos preliminares;
- próximos pasos de validación.

Una buena fase de reconocimiento no busca encontrarlo todo. Busca encontrar lo suficiente para tomar decisiones técnicas correctas.
