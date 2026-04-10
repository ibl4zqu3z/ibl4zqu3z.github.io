# Migración de tu web HTML a Jekyll

## Qué contiene esta carpeta

Esta estructura ya deja tu web preparada para funcionar como proyecto Jekyll manteniendo tus páginas HTML y convirtiendo el blog a un flujo real de Jekyll:

- `_layouts/default.html`: layout base común.
- `_layouts/post.html`: layout reutilizable para entradas.
- `_includes/`: head, navbar, footer y scripts globales.
- `_data/site.yml`: datos reutilizables de marca, footer y redes.
- `assets/css/custom.css`: tu CSS principal migrado.
- `assets/js/main.js`: JS global unificado.
- `index.html`, `about.html`, `blog.html`, `contacto.html`, `servicios*.html`, `curso*.html`, `faq.html`, `cookies.html`, `privacidad.html`, `aviso-legal.html`: páginas ya preparadas con front matter.
- `_posts/2026-04-03-como-validar-un-idor-paso-a-paso.html`: primera entrada real migrada desde tu plantilla.

## Dónde poner cada fichero

Copia **todo el contenido** de esta carpeta en la raíz de tu proyecto Jekyll.

En tu caso real:

```text
C:\Users\isaac\Documents\MIS_GITHUBS\ibl4zqu3z_2026\
```

La raíz final debe quedar así:

```text
ibl4zqu3z_2026/
├── _config.yml
├── Gemfile
├── index.html
├── about.html
├── blog.html
├── contacto.html
├── servicios.html
├── servicio_pentesting.html
├── servicio_consultoria.html
├── servicio_formacion.html
├── curso_concienciacion.html
├── curso_introduccion_ciberseguridad.html
├── curso_101_hacking_etico_redisenado.html
├── faq.html
├── cookies.html
├── privacidad.html
├── aviso-legal.html
├── _data/
├── _includes/
├── _layouts/
├── _posts/
└── assets/
```

## Paso a paso en Windows

### 1. Entra en la carpeta del proyecto

```powershell
cd C:\Users\isaac\Documents\MIS_GITHUBS\ibl4zqu3z_2026
```

### 2. Sustituye el contenido inicial de `jekyll new`

Si esa carpeta todavía contiene los ficheros generados por defecto por `jekyll new`, sustitúyelos por los de esta migración.

### 3. Instala dependencias

```powershell
bundle install
```

### 4. Arranca el servidor local

```powershell
bundle exec jekyll serve --livereload --baseurl ""
```

### 5. Abre el navegador

```text
http://127.0.0.1:4000/
```

## Corrección para Ruby 3.3 en Windows

Si `bundle install` falla al compilar `wdm`, no es un problema de tu web ni de Jekyll.
El problema es la gema `wdm` que se usa en Windows para vigilar cambios, y en Ruby 3.3 suele fallar si se intenta instalar la versión antigua `0.1.1`.

Esta migración ya deja el `Gemfile` corregido:

- usa `platforms :windows` en lugar de `:mingw`, `:x64_mingw`, `:mswin`
- elimina `wdm` como dependencia obligatoria
- deja `wdm 0.2.0` solo como opción si más adelante la necesitas

Si ya ejecutaste `bundle install` con el Gemfile anterior, haz esto:

```powershell
del Gemfile.lock
bundle install
```

Si PowerShell no encuentra `del`, usa:

```powershell
Remove-Item Gemfile.lock -ErrorAction SilentlyContinue
bundle install
```

Después arranca así:

```powershell
bundle exec jekyll serve --livereload --baseurl ""
```

## Cómo publicar nuevas entradas del blog

Crea un fichero nuevo dentro de `_posts/` con este formato de nombre:

```text
AAAA-MM-DD-slug-del-post.html
```

Ejemplo:

```text
_posts/2026-04-05-validacion-bola-en-apis.html
```

## Plantilla mínima para una nueva entrada

```html
---
title: "Título SEO completo | ibl4zqu3z"
post_title: "Título visible de la entrada"
description: "Descripción SEO de la entrada"
nav: blog
category_label: "Guías"
primary_category_anchor: guias
categories:
  - guias
reading_time: "8 min de lectura"
date: 2026-04-05 00:00:00 +02:00
excerpt: "Resumen corto para home, blog y cards."
featured: false
kicker: "Guías"
tags:
  - Etiqueta 1
  - Etiqueta 2
toc_html: |
  <a href="#bloque-1">1. Bloque 1</a>
  <a href="#bloque-2">2. Bloque 2</a>
---

<p>Contenido HTML o Markdown del post.</p>
```

## Qué partes tienes que revisar antes de publicar

1. `_config.yml`
   - Cambiar `url` por tu dominio real o tu `github.io`.

2. `_data/site.yml`
   - Revisar descripción, enlaces sociales y CTA global.

3. `privacidad.html` y `aviso-legal.html`
   - Completar los campos legales pendientes.

4. `contacto.html`
   - Confirmar que quieres mantener el email ofuscado actual.

## Cómo subirlo a GitHub

```powershell
git add .
git commit -m "Migración de web estática a Jekyll"
git push origin main
```

## Nota práctica

Las páginas siguen conservando nombres `.html` para no romper la navegación que ya tenías.
El blog ya no depende de editar tarjetas a mano: la home, la página `blog.html` y las relacionadas del post leen automáticamente el contenido de `_posts/`.


## Nota sobre URLs .html

Este paquete fuerza `permalink` en cada página para que Jekyll genere rutas exactas como `/about.html` y no carpetas tipo `/about/index.html`.


## Categorías del blog

Las tres categorías principales del blog tienen ya su propia página:

- `/writeups.html`
- `/casos-de-estudio.html`
- `/guias.html`

Para que un post aparezca en una de esas páginas, usa estos valores en el front matter:

```yaml
category_label: "Writeups"
primary_category_anchor: writeups
categories:
  - writeups
```

```yaml
category_label: "Casos de estudio"
primary_category_anchor: casos-de-estudio
categories:
  - casos-de-estudio
```

```yaml
category_label: "Guías"
primary_category_anchor: guias
categories:
  - guias
```

`primary_category_anchor` es la categoría principal que usa la web para breadcrumbs, relacionadas y archivos por categoría.


## Portadas de posts: cómo hacer que se vean

Las plantillas del blog y del post ya admiten imágenes reales. Para que aparezcan, añade en el front matter del post:

```yaml
cover_image: /assets/img/blog/mi-slug/cover.webp
thumb_image: /assets/img/blog/mi-slug/thumb.webp
```

- `cover_image`: portada grande del slider y del post
- `thumb_image`: miniatura para grids, relacionadas y listados
- si `thumb_image` no existe, se reutiliza `cover_image`
- si no defines ninguna, el tema usa el fondo decorativo de reserva


## Archivo dinámico de categorías

- Las categorías fijas `Writeups`, `Casos de estudio` y `Guías` siguen teniendo sus páginas propias.
- Cualquier otra categoría nueva detectada por `primary_category_anchor` se mostrará automáticamente en el bloque lateral de categorías.
- Esas categorías dinámicas se pueden consultar en `categorias.html?category=<slug>`.


## Portafolio

La web incluye una sección independiente del blog basada en una colección de Jekyll.

### Estructura

```text
_portfolio/
  caso-auditoria-web-autenticada.md
  caso-revision-api-control-acceso.md
  proyecto-web-pentest-checklist.md
  proyecto-plantilla-informe-pentesting.md
```

### Página principal

- `portafolio.html` muestra el listado general.
- cada elemento publica su propia URL automáticamente.

### Crear un nuevo elemento del portafolio

Crea un fichero nuevo dentro de `_portfolio/` con este esquema mínimo:

```yaml
---
title: "Título del trabajo o proyecto"
portfolio_kind_label: "Trabajo"
portfolio_kind_slug: "trabajo"
status_label: "Publicado"
year_label: "2026"
scope_label: "Web / API / Infra / Proyecto propio"
excerpt: "Resumen breve del elemento."
order: 50
featured: false
tools:
  - Burp Suite
  - OWASP
summary_points:
  - Punto clave 1
  - Punto clave 2
links:
  - label: "Contactar"
    url: "/contacto.html"
---

## Contexto

Contenido del trabajo o proyecto.
```

### URLs generadas

La colección publica con este patrón:

```text
/portafolio/nombre-del-fichero.html
```


## Portafolio destacado en la portada

Para mostrar proyectos destacados en la página inicial, añade `home_featured: true` en los elementos de `_portfolio/`.
