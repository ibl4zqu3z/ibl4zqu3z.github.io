---
title: "Caso representativo · Auditoría web autenticada sobre aplicación interna"
portfolio_kind_label: "Trabajo"
portfolio_kind_slug: "trabajo"
status_label: "Caso anonimizado"
year_label: "2026"
scope_label: "Aplicación web interna"
excerpt: "Caso representativo enfocado en revisión autenticada, validación manual de control de acceso, exposición de funcionalidades sensibles y priorización de hallazgos por impacto."
featured: true
order: 10
tools:
  - Burp Suite
  - OWASP Testing Guide
  - Validación manual
  - Reporting técnico
summary_points:
  - Revisión autenticada centrada en autorización y lógica funcional
  - Hallazgos priorizados por impacto y remediación
  - Caso presentado sin datos sensibles del cliente
cover_badge: "Trabajo representativo"
cover_lines:
  - auth / roles / business logic
  - idor / access control / evidence
  - technical report / remediation
links:
  - label: "Contactar"
    url: "/contacto.html"
  - label: "Ver servicios"
    url: "/servicio_pentesting.html"
---
## Contexto

Ficha representativa de un trabajo de auditoría web autenticada planteada para enseñar enfoque, metodología y tipo de entregable. El objetivo no es exponer datos de cliente, sino mostrar cómo se estructura una revisión real cuando hay usuarios, roles, flujos internos y lógica de negocio.

## Objetivo

Validar exposición funcional, debilidades de autorización, errores de control de acceso horizontal y vertical, y puntos donde una funcionalidad aparentemente legítima puede convertirse en un vector de impacto real.

## Qué se revisó

- Inventario funcional del área autenticada.
- Flujos de alta, consulta, edición y exportación.
- Controles de acceso entre perfiles.
- Parámetros directos a objetos internos.
- Validación manual de impacto y reproducibilidad.

## Enfoque de trabajo

Se parte de navegación funcional normal, captura de peticiones legítimas y modelado del comportamiento esperado según rol. A partir de ahí se contrastan respuestas, se prueban variaciones controladas y se documenta si el fallo es puntual, sistemático o encadenable con otros hallazgos.

## Entregable

El resultado se presenta en formato de informe técnico orientado a remediación, con evidencia reproducible, contexto del hallazgo, riesgo real y propuestas de corrección priorizadas.
