---
title: "Generador de contraseñas seguras en Python"
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
## Propósito

Proyecto orientado a construir un generador de contraseñas seguras en Python usando primitivas adecuadas para seguridad y no simples funciones pseudoaleatorias pensadas para casos no sensibles.

## Donde ver el proyecto

[https://github.com/ibl4zqu3z/secure-password-generator](https://github.com/ibl4zqu3z/secure-password-generator)

## Qué demuestra

- Uso de `secrets` para generación robusta.
- Diseño de políticas configurables: longitud mínima, inclusión de mayúsculas, minúsculas, dígitos y caracteres especiales.
- Validación de fortaleza para evitar salidas débiles o poco realistas.
- Presentación limpia en modo CLI, como base para versiones posteriores con interfaz web o API.

## Casos de uso

- Demostración de fundamentos de desarrollo seguro en Python.
- Utilidad simple para uso personal o formativo.
- Base para una futura integración en herramientas internas o paneles de administración.

## Enfoque técnico

El proyecto se apoya en una lógica separada entre generación, validación y salida. 

Eso permite mantener el código legible, ampliable y fácil de testear. 
