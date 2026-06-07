---
layout: "post"

title: "Mi experiencia realizando el examen de eJPTv2"
excerpt: "Experiencia personal preparando y realizando el examen eJPTv2, con foco en organización, enumeración, gestión del tiempo y lecciones aprendidas."

permalink: "/blog/guias/mi-experiencia-realizando-el-examen-de-ejptv2/"
slug: "mi-experiencia-realizando-el-examen-de-ejptv2"
cover_image:

category: "guias"
category_label: "Guías"
primary_category_anchor: "guias"
categories:
  - "guias"
kicker: "Guías"
kicker_secondary: "Certificación"
tags:
  - "ejptv2"
  - "certificaciones"
  - "pentesting"
  - "ine"
  - "preparacion"
  - "laboratorio"

post_title: "Mi experiencia realizando el examen de eJPTv2"
description: "Relato técnico de preparación, ejecución y aprendizajes del examen eJPTv2, orientado a quienes preparan su primera certificación práctica de pentesting."

nav: blog

featured: true
featured_badge: "Experiencia"
featured_lines:
  - "eJPTv2 / laboratorio / pivoting"
  - "enumeración / notas / gestión del tiempo"
  - "lecciones aprendidas para pentesting"

reading_time: "5 min de lectura"
date: 2025-03-11 10:00:00 +0100

toc_html: |
  <a href="#preparacion-para-el-examen">Preparación para el examen</a>
  <a href="#consejos-durante-el-examen">Consejos durante el examen</a>
  <a href="#el-dia-del-examen">El día del examen</a>
  <a href="#el-pentesting-de-las-maquinas">El pentesting de las máquinas</a>
  <a href="#lecciones-aprendidas">Lecciones aprendidas</a>
---

El examen eJPTv2 es una certificación práctica centrada en demostrar habilidades reales de pentesting dentro de un entorno controlado. No se trata de memorizar definiciones, sino de enumerar, explotar, documentar y responder preguntas a partir de evidencias.

La experiencia sirve para entender cómo organizar una prueba técnica larga: preparar herramientas, tomar notas, gestionar tiempos, mantener una metodología clara y evitar quedarse bloqueado en un único objetivo.

## Preparación para el examen {#preparacion-para-el-examen}

La preparación debe combinar teoría y práctica. La teoría aporta lenguaje, metodología y comprensión de las fases del pentesting. La práctica aporta velocidad, criterio y tolerancia al bloqueo.

Puntos de preparación relevantes:

- revisar el temario oficial antes de empezar;
- practicar reconocimiento y enumeración con Nmap, Gobuster, Nikto e Hydra;
- resolver laboratorios controlados de Linux y Windows;
- documentar comandos, evidencias y resultados;
- dibujar la red y mantener inventario de hosts, usuarios, contraseñas y servicios.

El error habitual es estudiar herramientas aisladas. El examen exige encadenar resultados: una credencial descubierta en una máquina puede ser útil más adelante; un puerto aparentemente secundario puede abrir la ruta hacia otra red.

## Consejos durante el examen {#consejos-durante-el-examen}

La gestión del tiempo es tan importante como la técnica. Antes de profundizar en una máquina, conviene leer todas las preguntas y anotar pistas explícitas: usuarios, servicios, rangos internos, posibles contraseñas o tecnologías mencionadas.

Recomendaciones operativas:

- no invertir horas en una sola vía sin comprobar alternativas;
- lanzar tareas largas durante descansos;
- validar cada respuesta antes de enviarla;
- conservar capturas y salidas relevantes;
- separar notas generales de notas por máquina;
- reutilizar usuarios y claves entre objetivos cuando el entorno lo permita.

El examen no está diseñado como un CTF con soluciones rebuscadas. Funciona mejor con una mentalidad de auditoría: enumerar, correlacionar y comprobar.

## El día del examen {#el-dia-del-examen}

Antes de comenzar, conviene actualizar el sistema, preparar carpetas, comprobar conectividad y leer la documentación del laboratorio. Una vez iniciado el entorno, el primer objetivo debe ser construir una visión global: hosts activos, puertos abiertos, servicios principales y posibles rutas de explotación.

La primera sesión debe centrarse en recopilar contexto. Después, se priorizan los objetivos que resuelven preguntas concretas o que pueden dar acceso a nuevas credenciales.

Una buena estrategia consiste en repartir las preguntas por máquina. Esto evita trabajar a ciegas y permite saber qué falta: una clave, un usuario, una escalada de privilegios, un acceso a base de datos o un pivote hacia una red interna.

## El pentesting de las máquinas {#el-pentesting-de-las-maquinas}

La experiencia original incluyó escenarios variados: Windows con WordPress, Windows con servidor web, Linux con Drupal, una máquina con SMB y objetivos adicionales con pocos servicios.

El patrón técnico común fue:

- enumeración inicial de red;
- identificación de servicios;
- revisión web y búsqueda de rutas;
- fuerza bruta controlada cuando el contexto lo justificaba;
- explotación de servicios mal configurados;
- extracción y reutilización de credenciales;
- escalada de privilegios;
- pivoting hacia una red interna.

Lo importante no es memorizar una explotación concreta, sino entender la lógica: cada hallazgo debe convertirse en una hipótesis comprobable.

## Lecciones aprendidas {#lecciones-aprendidas}

Las lecciones principales son claras:

- la enumeración ordenada reduce tiempo perdido;
- la documentación evita repetir pruebas;
- las credenciales deben comprobarse siempre;
- los descansos forman parte de la estrategia;
- no todo requiere privilegios máximos para responder correctamente;
- una metodología sencilla y constante supera a la improvisación.

Para quien empieza en pentesting, eJPTv2 es una buena primera certificación práctica porque obliga a trabajar con una mentalidad cercana a una evaluación real.
