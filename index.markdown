---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

# layout: home

layout: default
title: Inicio
---

<!-- HERO (pegar al principio de index.html, antes del resto de secciones) -->
<section class="hero hero--bleed">
  <div class="container">
    <div class="hero__inner">
      <h1 class="hero__title">
        Hola! Soy  <span class="text-accent">Isaac Blázquez</span><br>
        (a.k.a. <span class="text-accent">ibl4zqu3z</span>)<br>
        <span class="text-accent">Pentester</span> y <span class="text-accent">Hacker ético</span>
      </h1>

      <p class="hero__lead">
        Te ayudo a fortalecer la seguridad de sistemas y aplicaciones a través de técnicas avanzadas de pentesting.
      </p>
      <div class="hero__actions">
        <a class="btn btn-accent btn-lg cta-band__btn" href="{{ '/quien-soy/' | relative_url }}">Conoce más de mi<span class="cta-band__arrow" aria-hidden="true">›</span>
        </a>
      </div>
    </div>
  </div>
</section>

<!-- Pegar justo debajo del HERO en index.html -->
<section class="cta-band">
  <div class="container">
    <div class="cta-band__box">
      <div class="cta-band__text">
        <div class="cta-band__line">¿Necesitas un pentester?</div>
        <div class="cta-band__line">¿Buscas formación en<br class="d-none d-md-inline"> ciberseguridad?</div>
      </div>
      <div class="cta-band__action">
        <a class="btn btn-accent btn-lg cta-band__btn" href="{{ '/contacto/' | relative_url }}">
          Contáctame hoy mismo <span class="cta-band__arrow" aria-hidden="true">›</span>
        </a>
      </div>
    </div>
  </div>
</section>



{% assign featured_posts = site.posts | where: "featured", true %}

{% if site.posts.size > 0 %}
  {% if featured_posts.size > 0 %}
    {% assign hero_post = featured_posts[0] %}
  {% else %}
    {% assign hero_post = site.posts[0] %}
  {% endif %}

  {% assign used = "" %}
  {% assign used = used | append: hero_post.url | append: "|" %}

  {% assign secondary_featured = featured_posts | slice: 1, 2 %}
  {% assign filler_needed = 2 | minus: secondary_featured.size %}

  <section class="mb-4">

      <div class="home-block__head">
      <h2 class="home-block__title"><span class="home-block__slash">/</span> Destacado <span class="home-block__slash">/</span></h2>
      <a class="btn btn-ghost home-block__btn" href="{{ '/casos-de-estudio/' | relative_url }}">
        <span class="home-block__chev" aria-hidden="true">›</span> Ver más
      </a>
    </div>

    <article class="card border overflow-hidden">
      {% assign hero_img = hero_post.image
        | default: hero_post.featured_image
        | default: hero_post.thumbnail
        | default: hero_post.header.teaser
        | default: hero_post.header.image
      %}

      {% if hero_img %}
        <a href="{{ hero_post.url | relative_url }}" class="d-block">
          <img
            src="{{ hero_img | relative_url }}"
            alt="{{ hero_post.title | escape }}"
            class="w-100 home-hero-img"
            loading="lazy"
          >
        </a>
      {% endif %}

      <div class="card-body">
        <div class="d-flex flex-wrap gap-2 align-items-center mb-2">
          <span class="text-muted small">{{ hero_post.date | date: "%Y-%m-%d" }}</span>
          {% for c in hero_post.categories %}
            <span class="badge text-bg-dark border">{{ c }}</span>
          {% endfor %}
        </div>

        <h2 class="h4 mb-2">
          <a class="link-underline link-underline-opacity-0" href="{{ hero_post.url | relative_url }}">
            {{ hero_post.title }}
          </a>
        </h2>

        <div class="text-muted">
          {{ hero_post.excerpt | strip_html | truncate: 260 }}
        </div>
      </div>
    </article>
  </section>

  <section class="mb-5">
    <div class="row g-3">

      {% for p in secondary_featured %}
        {% assign used = used | append: p.url | append: "|" %}

        {% assign img = p.image
          | default: p.featured_image
          | default: p.thumbnail
          | default: p.header.teaser
          | default: p.header.image
        %}

        <div class="col-12 col-lg-6">
          <article class="card border overflow-hidden h-100">
            {% if img %}
              <a href="{{ p.url | relative_url }}" class="d-block">
                <img
                  src="{{ img | relative_url }}"
                  alt="{{ p.title | escape }}"
                  class="w-100 home-teaser-img"
                  loading="lazy"
                >
              </a>
            {% endif %}
            <div class="card-body">
              <div class="text-muted small mb-2">{{ p.date | date: "%Y-%m-%d" }}</div>
              <h3 class="h5 mb-2">
                <a class="link-underline link-underline-opacity-0" href="{{ p.url | relative_url }}">
                  {{ p.title }}
                </a>
              </h3>
              <div class="text-muted">
                {{ p.excerpt | strip_html | truncate: 180 }}
              </div>
            </div>
          </article>
        </div>
      {% endfor %}

      {% if filler_needed > 0 %}
        {% assign filler_count = 0 %}
        {% for p in site.posts %}
          {% assign token = p.url | append: "|" %}
          {% if used contains token %}{% continue %}{% endif %}

          {% assign filler_count = filler_count | plus: 1 %}
          {% assign used = used | append: p.url | append: "|" %}

          {% assign img = p.image
            | default: p.featured_image
            | default: p.thumbnail
            | default: p.header.teaser
            | default: p.header.image
          %}

          <div class="col-12 col-lg-6">
            <article class="card border overflow-hidden h-100">
              {% if img %}
                <a href="{{ p.url | relative_url }}" class="d-block">
                  <img
                    src="{{ img | relative_url }}"
                    alt="{{ p.title | escape }}"
                    class="w-100 home-teaser-img"
                    loading="lazy"
                  >
                </a>
              {% endif %}
              <div class="card-body">
                <div class="text-muted small mb-2">{{ p.date | date: "%Y-%m-%d" }}</div>
                <h3 class="h5 mb-2">
                  <a class="link-underline link-underline-opacity-0" href="{{ p.url | relative_url }}">
                    {{ p.title }}
                  </a>
                </h3>
                <div class="text-muted">
                  {{ p.excerpt | strip_html | truncate: 180 }}
                </div>
              </div>
            </article>
          </div>

          {% if filler_count == filler_needed %}{% break %}{% endif %}
        {% endfor %}
      {% endif %}

    </div>
  </section>


<!-- Sección: Writeups (pegar en index.html donde corresponda) -->
<section class="home-block">
  <div class="container">
    <div class="home-block__head">
      <h2 class="home-block__title"><span class="home-block__slash">/</span> Writeups <span class="home-block__slash">/</span></h2>
      <a class="btn btn-ghost home-block__btn" href="{{ '/Writeups/' | relative_url }}">
        <span class="home-block__chev" aria-hidden="true">›</span> Ver más
      </a>
    </div>

    <div class="row g-4">
      {% assign items = site.posts | where_exp: "p", "p.categories contains 'writeups'" | slice: 0, 2 %}
      {% assign months = "enero,febrero,marzo,abril,mayo,junio,julio,agosto,septiembre,octubre,noviembre,diciembre" | split: "," %}

      {% for post in items %}
        {% assign img = post.image
          | default: post.featured_image
          | default: post.thumbnail
          | default: post.header.teaser
          | default: post.header.image
        %}

        {% assign m_idx = post.date | date: "%-m" | minus: 1 %}
        {% assign m_name = months[m_idx] %}

        <div class="col-12 col-lg-6">
          <article class="tile">
            {% if img %}
              <a class="tile__media" href="{{ post.url | relative_url }}">
                <img class="tile__img" src="{{ img | relative_url }}" alt="{{ post.title | escape }}" loading="lazy">
              </a>
            {% endif %}

            <div class="tile__body">
              <span class="tile__date">{{ m_name }} {{ post.date | date: "%-d, %Y" }}</span>

              <h3 class="tile__title">
                <a class="tile__link" href="{{ post.url | relative_url }}">{{ post.title }}</a>
              </h3>
            </div>
          </article>
        </div>
      {% endfor %}
    </div>
  </div>
</section>




<!-- Sección: Blog (pegar en index.html donde corresponda) -->
<section class="home-block">
  <div class="container">
    <div class="home-block__head">
      <h2 class="home-block__title"><span class="home-block__slash">/</span> Blog <span class="home-block__slash">/</span></h2>
      <a class="btn btn-ghost home-block__btn" href="{{ '/blog/' | relative_url }}">
        <span class="home-block__chev" aria-hidden="true">›</span> Ver más
      </a>
    </div>

    <div class="row g-4">
      {% assign items = site.posts | slice: 0, 2 %}
      {% assign months = "enero,febrero,marzo,abril,mayo,junio,julio,agosto,septiembre,octubre,noviembre,diciembre" | split: "," %}

      {% for post in items %}
        {% assign img = post.image
          | default: post.featured_image
          | default: post.thumbnail
          | default: post.header.teaser
          | default: post.header.image
        %}

        {% assign m_idx = post.date | date: "%-m" | minus: 1 %}
        {% assign m_name = months[m_idx] %}

        <div class="col-12 col-lg-6">
          <article class="tile">
            {% if img %}
              <a class="tile__media" href="{{ post.url | relative_url }}">
                <img class="tile__img" src="{{ img | relative_url }}" alt="{{ post.title | escape }}" loading="lazy">
              </a>
            {% endif %}

            <div class="tile__body">
              <span class="tile__date">{{ m_name }} {{ post.date | date: "%-d, %Y" }}</span>

              <h3 class="tile__title">
                <a class="tile__link" href="{{ post.url | relative_url }}">{{ post.title }}</a>
              </h3>
            </div>
          </article>
        </div>
      {% endfor %}
    </div>
  </div>
</section>



<!-- Sección: Casos de estudio (pegar en index.html donde corresponda) -->
<section class="home-block">
  <div class="container">
    <div class="home-block__head">
      <h2 class="home-block__title"><span class="home-block__slash">/</span> Casos de estudio <span class="home-block__slash">/</span></h2>
      <a class="btn btn-ghost home-block__btn" href="{{ '/casos-de-estudio/' | relative_url }}">
        <span class="home-block__chev" aria-hidden="true">›</span> Ver más
      </a>
    </div>
    <div class="row g-4">
      {% assign items = site.posts | where_exp: "p", "p.categories contains 'casos-de-estudio'" | slice: 0, 2 %}
      {% assign months = "enero,febrero,marzo,abril,mayo,junio,julio,agosto,septiembre,octubre,noviembre,diciembre" | split: "," %}
      {% for post in items %}
        {% assign img = post.image
          | default: post.featured_image
          | default: post.thumbnail
          | default: post.header.teaser
          | default: post.header.image
        %}

        {% assign m_idx = post.date | date: "%-m" | minus: 1 %}
        {% assign m_name = months[m_idx] %}

        <div class="col-12 col-lg-6">
          <article class="tile">
            {% if img %}
              <a class="tile__media" href="{{ post.url | relative_url }}">
                <img class="tile__img" src="{{ img | relative_url }}" alt="{{ post.title | escape }}" loading="lazy">
              </a>
            {% endif %}

            <div class="tile__body">
              <span class="tile__date">{{ m_name }} {{ post.date | date: "%-d, %Y" }}</span>

              <h3 class="tile__title">
                <a class="tile__link" href="{{ post.url | relative_url }}">{{ post.title }}</a>
              </h3>
            </div>
          </article>
        </div>
      {% endfor %}
    </div>
  </div>
</section>

<!-- CTA final (pegar al final de quien-soy/index.html) -->
<section class="cta-final">
  <div class="container">
    <div class="cta-final__box">
      <h2 class="cta-final__title">
        ¿Necesitas mejorar la seguridad de tu empresa o aprender más sobre ciberseguridad?
      </h2>

      <p class="cta-final__subtitle">Estaré encantado de atenderte</p>

      <div class="cta-final__actions">
        <a class="btn btn-accent btn-lg cta-final__btn" href="{{ '/contacto/' | relative_url }}">
          Contáctame hoy mismo
        </a>
      </div>
    </div>
  </div>
</section>



<!-- 
  <section class="mb-5">
    <div class="row g-3">
      <div class="col-12 col-lg-4">
        <article class="card border overflow-hidden h-100">
          <img src="{{ '/assets/images/sections/IMAGE_WRITEUPS.png' | relative_url }}" alt="Writeups" class="w-100 home-section-img">
          <div class="card-body d-flex flex-column">
            <div class="text-muted mb-3">
              Writeups técnicos reproducibles: enumeración, explotación, post-explotación y remediación.
            </div>
            <div class="mt-auto d-flex justify-content-center">
              <a class="btn btn-accent px-4" href="{{ '/writeups/' | relative_url }}">Ver más</a>
            </div>
          </div>
        </article>
      </div>
      <div class="col-12 col-lg-4">
        <article class="card border overflow-hidden h-100">
          <img src="{{ '/assets/images/sections/IMAGE_GUIAS.png' | relative_url }}" alt="Guías" class="w-100 home-section-img">
          <div class="card-body d-flex flex-column">
            <div class="text-muted mb-3">
              Guías paso a paso: tooling, técnicas y laboratorios con foco práctico.
            </div>
            <div class="mt-auto d-flex justify-content-center">
              <a class="btn btn-accent px-4" href="{{ '/guias/' | relative_url }}">Ver más</a>
            </div>
          </div>
        </article>
      </div>
      <div class="col-12 col-lg-4">
        <article class="card border overflow-hidden h-100">
          <img src="{{ '/assets/images/sections/IMAGE_CASOS_ESTUDIO.png' | relative_url }}" alt="Casos de estudio" class="w-100 home-section-img">
          <div class="card-body d-flex flex-column">
            <div class="text-muted mb-3">
              Casos de estudio: análisis técnico, cronología, impacto, respuesta y lecciones aprendidas.
            </div>
            <div class="mt-auto d-flex justify-content-center">
              <a class="btn btn-accent px-4" href="{{ '/casos-de-estudio/' | relative_url }}">Ver más</a>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>

  
  
  <section class="mb-4">
    <div class="d-flex align-items-center justify-content-between mb-3">
      <h2 class="h4 mb-0">Más recientes</h2>
      <a class="link-underline link-underline-opacity-0" href="{{ '/blog/' | relative_url }}">Ir al blog</a>
    </div>

    <div class="row g-3">
      {% assign shown = 0 %}
      {% for p in site.posts %}
        {% assign token = p.url | append: "|" %}
        {% if used contains token %}{% continue %}{% endif %}

        {% assign shown = shown | plus: 1 %}

        {% assign img = p.image
          | default: p.featured_image
          | default: p.thumbnail
          | default: p.header.teaser
          | default: p.header.image
        %}

        <div class="col-12 col-lg-6">
          <article class="card border overflow-hidden h-100">
            {% if img %}
              <a href="{{ p.url | relative_url }}" class="d-block">
                <img
                  src="{{ img | relative_url }}"
                  alt="{{ p.title | escape }}"
                  class="w-100 home-teaser-img"
                  loading="lazy"
                >
              </a>
            {% endif %}
            <div class="card-body">
              <div class="text-muted small mb-2">{{ p.date | date: "%Y-%m-%d" }}</div>
              <h3 class="h5 mb-2">
                <a class="link-underline link-underline-opacity-0" href="{{ p.url | relative_url }}">
                  {{ p.title }}
                </a>
              </h3>
              <div class="text-muted">
                {{ p.excerpt | strip_html | truncate: 180 }}
              </div>
            </div>
          </article>
        </div>

        {% if shown == 6 %}{% break %}{% endif %}
      {% endfor %}
    </div>
  </section>

{% else %}
  <div class="card border">
    <div class="card-body">
      <div class="h4 mb-2">Sin entradas</div>
      <div class="text-muted">Crea posts en _posts/ para que la home muestre contenido.</div>
    </div>
  </div>
{% endif %}

-->