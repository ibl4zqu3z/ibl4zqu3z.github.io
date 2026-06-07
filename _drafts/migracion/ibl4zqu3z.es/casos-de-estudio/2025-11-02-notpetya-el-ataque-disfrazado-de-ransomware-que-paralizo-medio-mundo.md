---
layout: "post"

title: "NotPetya: el ataque disfrazado de ransomware que paralizó medio mundo"
excerpt: "Caso de estudio sobre notpetya y sus implicaciones técnicas, defensivas y organizativas."

permalink: "/blog/casos-de-estudio/notpetya-el-ataque-disfrazado-de-ransomware-que-paralizo-medio-mundo/"
slug: "notpetya-el-ataque-disfrazado-de-ransomware-que-paralizo-medio-mundo"
cover_image:

category: "casos-de-estudio"
category_label: "Casos de estudio"
primary_category_anchor: "articulos"
categories:
  - "casos-de-estudio"
kicker: "Casos de estudio"
kicker_secondary: "NotPetya"
tags:
  - "notpetya"
  - "ransomware"
  - "wiper"
  - "supply-chain"
  - "eternalblue"
  - "casos"

post_title: "NotPetya: el ataque disfrazado de ransomware que paralizó medio mundo"
description: "Análisis del caso NotPetya: el ataque disfrazado de ransomware que paralizó medio mundo, con contexto, impacto y lecciones defensivas aplicables a ciberseguridad."

nav: blog

featured: true
featured_badge: "Ransomware"
featured_lines:
  - "NotPetya / caso histórico"
  - "impacto / vectores / consecuencias"
  - "lecciones defensivas y mitigación"

reading_time: "5 min de lectura"
date: 2025-11-02 10:00:00 +0100

toc_html: |
  <a href="#que-es-notpetya">Qué es NotPetya</a>
  <a href="#actualizacion-envenenada">Actualización envenenada</a>
  <a href="#propagacion">Propagación</a>
  <a href="#impacto">Impacto</a>
  <a href="#lecciones-defensivas">Lecciones defensivas</a>
---

NotPetya apareció en 2017 aparentando ser ransomware, pero su finalidad real era destructiva. A diferencia de ransomware orientado al cobro, no existía un mecanismo viable de recuperación: era un wiper disfrazado.

## Qué es NotPetya {#que-es-notpetya}

NotPetya se parecía a Petya por su comportamiento de cifrado, pero su diseño impedía recuperar los datos. Su objetivo inicial se centró en Ucrania, aunque terminó afectando a empresas globales.

## Actualización envenenada {#actualizacion-envenenada}

El punto de entrada fue un ataque de cadena de suministro contra el software MeDoc. Una actualización legítima sirvió como vehículo de distribución, lo que multiplicó su alcance.

## Propagación {#propagacion}

Una vez dentro, combinaba varias técnicas:

- explotación de EternalBlue;
- uso de credenciales obtenidas de memoria;
- movimiento lateral con herramientas administrativas;
- cifrado del MBR y archivos;
- pantalla falsa de rescate.

## Impacto {#impacto}

El impacto fue global: Maersk, Merck, FedEx TNT y otras organizaciones sufrieron interrupciones severas. Las pérdidas se estimaron en miles de millones.

## Lecciones defensivas {#lecciones-defensivas}

Medidas clave:

- evaluar riesgos de proveedores;
- segmentar redes;
- limitar privilegios;
- aplicar MS17-010;
- deshabilitar SMBv1;
- proteger credenciales en memoria;
- ensayar recuperación ante wipers.

NotPetya recuerda que no todo ransomware busca cobrar. Algunos incidentes persiguen destruir.
