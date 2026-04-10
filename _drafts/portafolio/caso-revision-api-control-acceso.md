---
title: "Caso representativo · Revisión de API y control de acceso en plataforma B2B"
portfolio_kind_label: "Trabajo"
portfolio_kind_slug: "trabajo"
status_label: "Caso anonimizado"
year_label: "2026"
scope_label: "API / integración"
excerpt: "Trabajo orientado a validación de exposición en API, consistencia de autorización entre endpoints y análisis de impacto sobre operaciones y datos entre cuentas."
featured: true
order: 20
tools:
  - Burp Suite
  - Postman
  - Análisis manual
  - OWASP API Security
summary_points:
  - Revisión centrada en API y separación entre tenants
  - Comparativa de respuestas, permisos y errores de validación
  - Priorización según impacto técnico y de negocio
cover_badge: "API Security"
cover_lines:
  - tenant separation / authz / object access
  - response diff / scope review / evidence
  - business impact / technical validation
links:
  - label: "Contactar"
    url: "/contacto.html"
  - label: "Servicio de pentesting"
    url: "/servicio_pentesting.html"
---
## Contexto

Caso representativo de revisión de API en entorno B2B con cuentas separadas, operaciones autenticadas y consumo de recursos internos vía endpoints expuestos a frontend y paneles operativos.

## Objetivo

Determinar si la plataforma aplica correctamente autorización a nivel de objeto, de función y de contexto entre cuentas o perfiles con capacidades distintas.

## Líneas principales de validación

- Enumeración de endpoints y parámetros clave.
- Relación entre objetos, identificadores y contexto de cuenta.
- Consistencia entre lectura, edición y exportación.
- Comparativa de respuestas con distintos roles y sesiones.
- Encadenamiento posible entre errores de autorización y fuga de datos.

## Valor que aporta al portafolio

Este tipo de ficha permite mostrar criterio técnico más allá del uso de herramientas: modelado del negocio, interpretación de permisos, reducción de falsos positivos y documentación de impacto verificable.
