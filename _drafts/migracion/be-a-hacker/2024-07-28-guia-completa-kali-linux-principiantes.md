---
layout: "post"
source_origin: "be-a-hacker.es"
migration_status: "reescrito"
author: "Isaac Blázquez"
language: "es"
title: "Guía completa de Kali Linux para principiantes"
post_title: "Guía completa de Kali Linux para principiantes"
description: "Guía práctica para instalar Kali Linux en un entorno controlado, entender su función en pentesting y preparar un laboratorio seguro para aprendizaje."
excerpt: "Instalación, uso en máquina virtual, primeros pasos y criterios básicos para trabajar con Kali Linux sin afectar el sistema principal."
category: "guias"
category_label: "Guías"
primary_category_anchor: "guias"
categories:
  - "guias"
kicker: "Guías"
kicker_secondary: "Linux"
tags:
  - "kali-linux"
  - "linux"
  - "laboratorio"
  - "virtualbox"
  - "pentesting"
  - "principiantes"
series: "Fundamentos de laboratorio"
slug: "guia-completa-kali-linux-principiantes"
permalink: "/blog/guias/guia-completa-kali-linux-principiantes/"
original_url: "https://be-a-hacker.es/guia-completa-de-kali-linux-para-principiantes"
original_date: "2024-07-28"
reading_time: "8 min de lectura"
---

Kali Linux es una distribución basada en Debian orientada a pruebas de penetración, análisis forense, auditorías técnicas y aprendizaje de seguridad ofensiva. No debe entenderse como un sistema operativo mágico, sino como una distribución que agrupa herramientas ya preparadas para trabajar en laboratorios controlados.

Para empezar con criterio, lo más recomendable es instalar Kali en una máquina virtual. Esto evita modificar el sistema principal, permite hacer pruebas sin impacto real y facilita restaurar el entorno cuando una configuración se rompe.

## Cuándo usar Kali Linux

Kali tiene sentido cuando necesitas un entorno específico para:

- practicar reconocimiento y enumeración;
- analizar servicios expuestos;
- probar herramientas de pentesting;
- montar laboratorios CTF;
- documentar procedimientos técnicos;
- reproducir escenarios de auditoría en un entorno autorizado.

No es necesario usar Kali como sistema principal. Para aprendizaje y práctica, una máquina virtual es suficiente.

## Requisitos mínimos

Para una instalación básica:

- 4 GB de RAM asignada a la máquina virtual;
- 2 CPU virtuales;
- 25 GB de disco;
- conexión de red NAT para pruebas generales;
- VirtualBox, VMware Workstation Player o similar.

En laboratorios más exigentes conviene aumentar RAM y almacenamiento.

## Instalación en máquina virtual

El flujo recomendado es:

1. Descargar la imagen oficial desde Kali.
2. Crear una máquina virtual nueva.
3. Asignar memoria, CPU y disco.
4. Configurar red en NAT para empezar.
5. Instalar el sistema o importar la imagen preconstruida.
6. Actualizar paquetes.

```bash
sudo apt update
sudo apt full-upgrade -y
```

Tras la actualización, reinicia la máquina virtual.

## Primeros ajustes útiles

Después de instalar Kali:

```bash
mkdir -p ~/labs ~/tools ~/notes ~/wordlists
```

Estructura básica de trabajo:

```text
~/labs       # máquinas, CTFs y entornos de práctica
~/tools      # herramientas externas
~/notes      # apuntes y evidencias
~/wordlists  # diccionarios y listas de prueba
```

También conviene crear snapshots antes de instalar herramientas externas o modificar configuraciones sensibles.

## Red de laboratorio

Para empezar:

- NAT: navegación y actualizaciones.
- Red interna: laboratorios aislados.
- Adaptador puente: solo cuando entiendas el impacto y el entorno esté autorizado.

La red interna es la mejor opción para practicar con máquinas vulnerables sin exponerlas a la red doméstica.

## Errores frecuentes

Un error habitual es ejecutar herramientas sin entender qué hacen. Kali facilita el acceso a muchas utilidades, pero el valor real está en interpretar los resultados.

Antes de lanzar escaneos o pruebas:

- define el objetivo;
- confirma autorización;
- limita el alcance;
- guarda evidencias;
- documenta comandos y resultados.

## Flujo básico de aprendizaje

Una progresión lógica:

1. Terminal Linux.
2. Redes básicas.
3. Nmap.
4. Servicios comunes.
5. Web básica.
6. Explotación controlada.
7. Escalada de privilegios.
8. Reporting.

Kali es solo el entorno. La metodología sigue siendo lo importante.
