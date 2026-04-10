# MigraciÃ³n de tu web actual a Jekyll

## Lo que ya ha hecho este script
- Ha retirado el contenido de ejemplo de `jekyll new` y lo ha guardado en una carpeta `_starter_backup_YYYYMMDD_HHMMSS`.
- Ha creado `_includes`, `_layouts`, `_posts`, `_drafts`, `assets/css`, `assets/js`, `assets/img` y `blog/`.
- Ha generado `_config.yml`, `.gitignore`, layouts base, includes base y una portada simple para `/blog/`.
- No ha tocado tus HTML reales salvo los ficheros demo tÃ­picos de Jekyll.

## CÃ³mo integrar tu web actual sin romper nada
1. Copia tu CSS real a `assets/css/`.
2. Copia tu JS real a `assets/js/`.
3. Copia tus imÃ¡genes a `assets/img/`.
4. Extrae el `<head>` comÃºn a `_includes/head.html`.
5. Extrae navbar y footer a `_includes/navbar.html` y `_includes/footer.html`.
6. Pasa la estructura base a `_layouts/default.html`.
7. Convierte tus pÃ¡ginas de contenido a Jekyll aÃ±adiendo front matter y dejando solo el contenido especÃ­fico dentro de cada archivo.

## Nota importante
Si una pÃ¡gina HTML tuya ya contiene `<!doctype html>`, `<html>`, `<head>` y `<body>`, no le aÃ±adas `layout: default` sin refactorizarla antes. Primero extrae la estructura comÃºn al layout.

## Prueba local
Desde la raÃ­z del proyecto:

```powershell
bundle install
bundle exec jekyll serve --baseurl=""
```

Sitio local: `http://localhost:4000`
