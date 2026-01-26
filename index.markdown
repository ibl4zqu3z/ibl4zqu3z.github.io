---
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




{% assign all_posts = site.posts | sort: "date" | reverse %}
{% assign featured_posts = all_posts | where: "featured", true %}

{% if all_posts.size > 0 %}

  {%- comment -%}
  DESTACADO (3 tarjetas) por categoría:
  1) Superior: writeups
  2) Inferior izq: guias
  3) Inferior der: casos-de-estudio
  Prioriza featured dentro de cada categoría y hace fallback al último post de la categoría.
  Si una categoría no tiene posts, rellena con el post más reciente disponible no usado.
  {%- endcomment -%}

  {% assign list = featured_posts | where_exp: "p", "p.categories contains 'writeups'" %}
  {% if list.size == 0 %}
    {% assign list = all_posts | where_exp: "p", "p.categories contains 'writeups'" %}
  {% endif %}
  {% assign hero_post = list | first %}
  {% if hero_post == nil %}
    {% assign hero_post = all_posts | first %}
  {% endif %}

  {% assign used = "" %}
  {% assign used = used | append: hero_post.url | append: "|" %}

  {% assign list = featured_posts | where_exp: "p", "p.categories contains 'guias'" %}
  {% if list.size == 0 %}
    {% assign list = all_posts | where_exp: "p", "p.categories contains 'guias'" %}
  {% endif %}
  {% assign post_guias = nil %}
  {% for p in list %}
    {% assign token = p.url | append: "|" %}
    {% if used contains token %}{% continue %}{% endif %}
    {% assign post_guias = p %}
    {% assign used = used | append: p.url | append: "|" %}
    {% break %}
  {% endfor %}

  {% assign list = featured_posts | where_exp: "p", "p.categories contains 'casos-de-estudio'" %}
  {% if list.size == 0 %}
    {% assign list = all_posts | where_exp: "p", "p.categories contains 'casos-de-estudio'" %}
  {% endif %}
  {% assign post_casos = nil %}
  {% for p in list %}
    {% assign token = p.url | append: "|" %}
    {% if used contains token %}{% continue %}{% endif %}
    {% assign post_casos = p %}
    {% assign used = used | append: p.url | append: "|" %}
    {% break %}
  {% endfor %}

  {% if post_guias == nil %}
    {% for p in all_posts %}
      {% assign token = p.url | append: "|" %}
      {% if used contains token %}{% continue %}{% endif %}
      {% assign post_guias = p %}
      {% assign used = used | append: p.url | append: "|" %}
      {% break %}
    {% endfor %}
  {% endif %}

  {% if post_casos == nil %}
    {% for p in all_posts %}
      {% assign token = p.url | append: "|" %}
      {% if used contains token %}{% continue %}{% endif %}
      {% assign post_casos = p %}
      {% assign used = used | append: p.url | append: "|" %}
      {% break %}
    {% endfor %}
  {% endif %}

  <section class="mb-4">

      <div class="home-block__head">
      <h2 class="home-block__title"><span class="home-block__slash">/</span> Destacado <span class="home-block__slash">/</span></h2>
      <a class="btn btn-ghost home-block__btn" href="{{ '/blog/' | relative_url }}">
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

      {% assign p = post_guias %}
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

      {% assign p = post_casos %}
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
      {% assign months = "enero,febrero,marzo,abril,mayo,junio,julio,agosto,septiembre,octubre,noviembre,diciembre" | split: "," %}
      {% assign count = 0 %}
      {% for post in all_posts %}
        {% if post.categories contains 'writeups' %}
          {% assign token = post.url | append: "|" %}
          {% if used contains token %}{% continue %}{% endif %}

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

          {% assign used = used | append: post.url | append: "|" %}
          {% assign count = count | plus: 1 %}
          {% if count == 2 %}{% break %}{% endif %}
        {% endif %}
      {% endfor %}
    </div>
  </div>
</section>

<!-- Sección: Guías (pegar en index.html donde corresponda) -->
<section class="home-block">
  <div class="container">
    <div class="home-block__head">
      <h2 class="home-block__title"><span class="home-block__slash">/</span> Guías <span class="home-block__slash">/</span></h2>
      <a class="btn btn-ghost home-block__btn" href="{{ '/Writeups/' | relative_url }}">
        <span class="home-block__chev" aria-hidden="true">›</span> Ver más
      </a>
    </div>
    <div class="row g-4">
      {% assign months = "enero,febrero,marzo,abril,mayo,junio,julio,agosto,septiembre,octubre,noviembre,diciembre" | split: "," %}
      {% assign count = 0 %}
      {% for post in all_posts %}
        {% if post.categories contains 'guias' %}
          {% assign token = post.url | append: "|" %}
          {% if used contains token %}{% continue %}{% endif %}

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

          {% assign used = used | append: post.url | append: "|" %}
          {% assign count = count | plus: 1 %}
          {% if count == 2 %}{% break %}{% endif %}
        {% endif %}
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
      {% assign months = "enero,febrero,marzo,abril,mayo,junio,julio,agosto,septiembre,octubre,noviembre,diciembre" | split: "," %}
      {% assign count = 0 %}
      {% for post in all_posts %}
        {% if post.categories contains 'casos-de-estudio' %}
          {% assign token = post.url | append: "|" %}
          {% if used contains token %}{% continue %}{% endif %}

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

          {% assign used = used | append: post.url | append: "|" %}
          {% assign count = count | plus: 1 %}
          {% if count == 2 %}{% break %}{% endif %}
        {% endif %}
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

{% endif %}
