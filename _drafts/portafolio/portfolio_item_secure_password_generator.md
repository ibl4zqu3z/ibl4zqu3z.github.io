---
title: "portfolio_item_secure_password_generator"
portfolio_kind_label: "Proyecto"
portfolio_kind_slug: "proyecto"
status_label: "Proyecto propio"
year_label: "2026"
scope_label: "Python / automatización / seguridad"
excerpt: "Herramienta en Python para generar contraseñas seguras con políticas configurables, validación de fortaleza y salida lista para uso práctico o demostración de portafolio."
featured: true
home_featured: true
order: 10
tools:
  - Python
  - CLI
  - secrets
  - Seguridad
summary_points:
  - Generación con aleatoriedad criptográficamente segura
  - Políticas configurables de longitud y complejidad
  - Proyecto útil para demostrar buenas prácticas en Python
cover_badge: "Python"
cover_lines:
  - secure randomness / policy based generation
  - length / charset / validation
  - practical script / reusable tool
links:
  - label: "Ver portafolio"
    url: "/portafolio.html"
  - label: "Contactar"
    url: "/contacto.html"
---

# Secure Password & Passphrase Generator

**Tipo:** herramienta CLI en Python  
**Repositorio:** secure-password-generator

## Resumen
Herramienta de línea de comandos para generar contraseñas y passphrases seguras usando aleatoriedad criptográficamente segura, con políticas configurables, exclusión de caracteres ambiguos y estimación teórica de entropía.

## Qué demuestra este proyecto
- Uso de `secrets` en lugar de `random` para material sensible.
- Generación de contraseñas con cumplimiento real de política:  longitud mínima, inclusión de mayúsculas, minúsculas, dígitos y caracteres especiales.
- Soporte para passphrases basadas en wordlist local.
- Arquitectura modular separando CLI y lógica de negocio.
- Validación de configuración y tests unitarios.

## Funcionalidades clave
- Longitud configurable.
- Inclusión o exclusión de mayúsculas, minúsculas, dígitos y símbolos.
- Exclusión opcional de caracteres ambiguos.
- Generación de varias salidas en una misma ejecución.
- Passphrases con número de palabras, separador, capitalización y sufijos configurables.
- Estimación de entropía para contraseñas y passphrases.
