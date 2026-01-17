---
layout: post
title: "Caso de estudio (simulado): acceso a datos de otros usuarios por fallo de permisos (IDOR)"
categories:
  - casos-de-estudio
#tags: [pentesting, web, owasp, idor, broken-access-control]
header:
  image: /assets/images/casos-de-estudio/caso-a-idor.png
  teaser: /assets/images/casos-de-estudio/caso-a-idor.png
excerpt: "Ejercicio en laboratorio: cambiando un identificador en una petición, un usuario autenticado podía ver información de otros usuarios."
---

**TDeso:** ejercicio de pentesting en **entorno controlado**. Identificadores, rutas y evidencias **anonimizados**. El objetivo es mostrar metodología, documentación y remediación con un caso realista y reproducible en laboratorio.

---

## 1) Qué se estaba evaluando
Se evaluó un portal web con zona privada para usuarios registrados. El portal permitía:
- iniciar sesión,
- consultar datos del perfil,
- acceder a documentos asociados a la cuenta (por ejemplo: facturas, justificantes, informes o descargas).

El objetivo del ejercicio fue comprobar si el sistema aplicaba correctamente **controles de autorización**: un usuario autenticado solo debe poder acceder a **sus propios** recursos y nunca a recursos de terceros.

**Criterio de éxito**
- Verificar que el servidor valida permisos en cada operación sensible (lectura/descarga).
- Identificar accesos indebidos, cuantificar impacto y proponer corrección verificable.

---

## 2) Alcance
**En alcance**
- Zona privada del portal (usuario autenticado).
- Flujos: login, navegación interna, listado de documentos, acceso/descarga de documento.
- Pruebas de control de acceso sobre recursos de usuario.

**Fuera de alcance**
- Denegación de servicio.
- Ingeniería social/phishing.
- Ataques físicos o sobre infraestructura externa no vinculada al portal.

**Supuestos del laboratorio**
- Dos cuentas de prueba con datos distintos: `Usuario A` y `Usuario B`.
- Documentos de prueba asociados a cada cuenta para validar el aislamiento (multi-usuario).

---

## 3) Reglas del ejercicio
Reglas definidas para simular un entorno profesional y evitar efectos colaterales:

- **No integridad:** no se modifica ni elimina información.
- **No masivo:** se evita automatizar enumeración o descarga (evidencia mínima suficiente).
- **No persistencia:** no se introducen backdoors ni cambios permanentes.
- **Evidencia controlada:** se documenta con capturas y trazas mínimas (anonimizadas).
- **Trazabilidad:** cada evidencia va asociada a fecha, prueba y resultado.

Estas reglas ayudan a diferenciar una auditoría seria de un “CTF”: el objetivo es **demostrar riesgo** con el mínimo impacto.

---

## 4) Metodología
Se siguió una secuencia típica de pruebas de aplicación web orientada a autorización:

### 4.1 Reconocimiento funcional
- Se recorrieron menús y pantallas para identificar qué objetos maneja el portal (perfil, documentos, descargas).
- Se localizaron puntos donde se consulta un recurso por identificador (por ejemplo, abrir un documento desde un listado).

### 4.2 Observación de tráfico (proxy)
- Se interceptaron peticiones del navegador para entender cómo el portal solicita recursos.
- Se identificó el patrón de acceso a documento: una ruta del tipo `/documentos/{id}`.

### 4.3 Pruebas de autorización (control de acceso)
Se aplicó una regla muy concreta:

> Si `Usuario A` puede acceder a un recurso de `Usuario B` cambiando un identificador, hay un fallo de control de acceso a nivel de objeto (IDOR).

La prueba se ejecutó en dos pasos:
1) Confirmar acceso legítimo de `Usuario A` a su documento (baseline).
2) Cambiar el identificador para apuntar a un documento que pertenece a `Usuario B` y observar resultado.

### 4.4 Documentación y remediación
- Se asignó severidad.
- Se describió impacto realista.
- Se propuso corrección verificable (no genérica).
- Se definió retest como condición de cierre.

---

## 5) Cronología (estructura profesional)
**Día 1 — Reconocimiento y mapeo**
- Inventario de funcionalidades en zona privada.
- Identificación de recursos críticos: documentos y descargas.
- Localización de rutas relevantes y patrón de acceso.

**Día 2 — Ejecución de pruebas**
- Baselines por usuario (A y B).
- Pruebas cruzadas de autorización.
- Captura de evidencias mínimas.

**Día 3 — Informe y plan de remediación**
- Redacción de hallazgos con evidencia y explicación técnica.
- Priorización.
- Recomendaciones y criterios de verificación.
- Preparación de retest.

---

## 6) Hallazgo principal
### F-01 — Acceso a recursos de otros usuarios cambiando un identificador (IDOR)
**Tipo**
- Broken Access Control / IDOR (Insecure Direct Object Reference).

**Qué ocurre**
El servidor permite solicitar un documento mediante un identificador incluido en la URL. La aplicación asume que, si el usuario está autenticado, puede acceder al documento solicitado, pero **no valida** que ese documento pertenezca a ese usuario.

En un entorno multiusuario, esto es un fallo crítico de lógica: la autorización debe comprobarse siempre en servidor.

**Evidencia (anonimizada)**
Acceso legítimo (Usuario A a su documento):


GET /documentos/1204
Cookie: session=<...>

Resultado observado:
- `200 OK`
- Documento asociado a `Usuario B`

**Cómo se validó que pertenecía a otro usuario (sin datos sensibles)**
- Comparación del nombre/etiqueta del documento en el listado de Usuario B.
- Confirmación de metadatos no sensibles (por ejemplo, “documento de cuenta B” en el entorno de laboratorio).
- Se evitó descargar o almacenar información personal real.

**Impacto simulado**
- Acceso a documentos ajenos: facturas, informes, justificantes, direcciones o identificadores internos.
- Ruptura de confidencialidad y potencial incumplimiento de protección de datos si el portal es real.
- Posibilidad de exposición escalada si el identificador es secuencial (enumeración).

**Condiciones que aumentan el impacto**
- Identificadores predecibles (secuenciales).
- Ausencia de controles anti-abuso (rate limiting / bloqueo).
- Respuestas distintas que faciliten enumeración (por ejemplo, 200 vs 404).

**Severidad**
Alta.
Justificación:
- Requiere usuario autenticado, pero el abuso es simple.
- Afecta a confidencialidad de terceros.
- En sistemas reales suele implicar riesgo regulatorio y reputacional.

---

## 7) Causa raíz (explicación técnica clara)
El fallo no está en el navegador ni en el “frontend”. Está en el servidor:

- El servidor resuelve el documento por `id`.
- Devuelve el documento sin comprobar que `documento.user_id == usuario_autenticado.id`.

Esta comprobación es obligatoria en cualquier endpoint que recupere recursos de usuario.

---

## 8) Recomendación (directa y verificable)
### 8.1 Corrección imprescindible (servidor)
En el controlador de acceso a documentos:
- Buscar el documento por `id`.
- Validar ownership:
  - si no pertenece al usuario autenticado, devolver `404` o `403`.

Punto clave: la validación debe hacerse **siempre**, aunque el documento no sea accesible desde la interfaz.

### 8.2 Medidas de refuerzo
- Usar identificadores no predecibles si procede (UUID) para dificultar enumeración.
- Registro de auditoría:
  - intentos repetidos de acceso a documentos inexistentes/no autorizados.
- Pruebas automatizadas:
  - test que asegure que `Usuario A` no puede acceder a recursos de `Usuario B`.

### 8.3 Criterio de aceptación de la corrección
El endpoint debe cumplir:
- `Usuario A` solicita `/documentos/{id_de_B}` → `403/404`.
- `Usuario A` solicita `/documentos/{id_de_A}` → `200`.
- Respuesta consistente para evitar filtrado por “diferencias” de error.

---

## 9) Entregables del ejercicio (simulación completa)
**1) Alcance y reglas (1–2 páginas)**
- qué se prueba, qué no, restricciones, fechas, contactos (roles anonimizados).

**2) Registro de evidencias**
- capturas recortadas y trazas mínimas de las peticiones.
- identificadores enmascarados.
- descripción de cada evidencia: qué prueba y qué concluye.

**3) Informe ejecutivo**
- explicación en lenguaje no técnico.
- impacto y prioridad.
- acciones recomendadas y plazos.

**4) Informe técnico**
- hallazgo con detalle (F-01).
- reproducción a alto nivel.
- causa raíz.
- recomendación exacta.
- criterios de verificación.

**5) Plan de remediación**
- acciones inmediatas (parche del endpoint).
- refuerzos (tests, logging).
- retest planificado.

---

## 10) Plan de retest (cierre profesional)
Una vez aplicado el parche:
- repetir la misma prueba con `Usuario A` y `Usuario B`.
- verificar respuesta uniforme `403/404` ante acceso indebido.
- confirmar que no se rompe el acceso legítimo.
- documentar resultado como “cerrado” o “parcialmente cerrado”.

---

## 11) Lecciones aprendidas
- Autenticación no equivale a autorización.
- Los controles de acceso deben validarse en servidor, no en la interfaz.
- Un fallo lógico simple puede tener impacto alto cuando el recurso contiene datos de terceros.
- La corrección debe acompañarse de pruebas automatizadas para evitar regresiones.
