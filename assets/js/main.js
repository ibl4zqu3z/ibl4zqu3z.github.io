(function () {
  function initHomeHero() {
    const seqs = [
      {cmd:'nmap -sV -sC 192.168.1.0/24',out:[
        '<span style="color:#555">Starting Nmap 7.94 — scan report</span>',
        '<span style="color:#ff5555">22/tcp  open  ssh     OpenSSH 8.9</span>',
        '<span style="color:#ff1a1a">80/tcp  open  http    nginx 1.24</span>',
        '<span style="color:#555">443/tcp open  https   Apache 2.4</span>'
      ]},
      {cmd:'python3 exploit.py --target api.target.com',out:[
        '<span style="color:#555">[*] Initialising connection...</span>',
        '<span style="color:#ff5555">[+] Auth bypass discovered!</span>',
        '<span style="color:#555">[*] Extracting sensitive data...</span>',
        '<span style="color:#ff1a1a">[✓] Done. Report saved → report.pdf</span>'
      ]},
      {cmd:'gobuster dir -u https://target.com -w big.txt',out:[
        '<span style="color:#555">====================================</span>',
        '<span style="color:#ff1a1a">/admin</span>   <span style="color:#555">(Status: 200) [Size: 4821]</span>',
        '<span style="color:#ff5555">/api/v1</span>  <span style="color:#555">(Status: 301)</span>',
        '<span style="color:#ff1a1a">/backup</span>  <span style="color:#555">(Status: 403) [Size: 289]</span>'
      ]}
    ];

    const heroIdentity = document.getElementById('heroIdentity');
    if (heroIdentity) {
      const heroNames = ['Isaac Blázquez', 'ibl4zqu3z'];
      const scan = heroIdentity.querySelector('.glitch-scan');
      let heroIndex = 0;

      const setHeroLabel = (value) => {
        heroIdentity.setAttribute('data-glitch', value);
        if (scan) {
          const textNode = heroIdentity.childNodes[0];
          if (textNode && textNode.nodeType === Node.TEXT_NODE) {
            textNode.nodeValue = value;
          } else {
            heroIdentity.insertBefore(document.createTextNode(value), scan);
          }
        } else {
          heroIdentity.textContent = value;
        }
      };

      const swapHeroIdentity = () => {
        const current = heroNames[heroIndex];
        const next = heroNames[(heroIndex + 1) % heroNames.length];
        heroIdentity.classList.add('glitching');
        heroIdentity.setAttribute('data-glitch', current);
        setTimeout(() => { setHeroLabel(next); }, 170);
        setTimeout(() => {
          heroIdentity.classList.remove('glitching');
          heroIndex = (heroIndex + 1) % heroNames.length;
        }, 430);
      };

      setInterval(swapHeroIdentity, 4200);
    }

    const ce = document.getElementById('typedCmd');
    const oe = document.getElementById('termOutput');
    if (ce && oe) {
      let si = 0, ci = 0, oi = 0, ph = 'typing';
      function tick() {
        const s = seqs[si];
        if (ph === 'typing') {
          if (ci < s.cmd.length) {
            ce.innerHTML = s.cmd.slice(0, ++ci);
            setTimeout(tick, 50 + Math.random() * 45);
          } else {
            ph = 'output';
            oi = 0;
            setTimeout(tick, 550);
          }
        } else if (ph === 'output') {
          if (oi < s.out.length) {
            const l = document.createElement('div');
            l.className = 't-output';
            l.innerHTML = s.out[oi++];
            oe.appendChild(l);
            setTimeout(tick, 340);
          } else {
            ph = 'clear';
            setTimeout(tick, 2800);
          }
        } else {
          oe.innerHTML = '';
          ce.innerHTML = '';
          ci = 0;
          si = (si + 1) % seqs.length;
          ph = 'typing';
          setTimeout(tick, 400);
        }
      }
      tick();
    }
  }

  function initPostsSlider() {
    document.querySelectorAll('[data-slider="blog"]').forEach((slider) => {
      const viewport = slider.querySelector('.posts-slider__viewport');
      const track = slider.querySelector('.posts-slider__track');
      const items = Array.from(slider.querySelectorAll('.posts-slider__item'));
      const prevBtn = slider.querySelector('[data-slider-prev]');
      const nextBtn = slider.querySelector('[data-slider-next]');
      const dotsWrap = slider.querySelector('[data-slider-dots]');
      if (!viewport || !track || !items.length || !prevBtn || !nextBtn || !dotsWrap) return;

      let index = 0;
      let visible = 3;
      let maxIndex = 0;
      let autoplayId = null;

      const getVisibleCount = () => {
        if (window.innerWidth < 768) return 1;
        if (window.innerWidth < 992) return 2;
        return 3;
      };

      const buildDots = () => {
        dotsWrap.innerHTML = '';
        for (let i = 0; i <= maxIndex; i += 1) {
          const dot = document.createElement('button');
          dot.type = 'button';
          dot.className = 'posts-slider__dot' + (i === index ? ' is-active' : '');
          dot.setAttribute('aria-label', `Ir a la posición ${i + 1}`);
          dot.addEventListener('click', () => {
            index = i;
            update();
            restartAutoplay();
          });
          dotsWrap.appendChild(dot);
        }
      };

      const updateDots = () => {
        dotsWrap.querySelectorAll('.posts-slider__dot').forEach((dot, dotIndex) => {
          dot.classList.toggle('is-active', dotIndex === index);
        });
      };

      const updateButtons = () => {
        prevBtn.disabled = index <= 0;
        nextBtn.disabled = index >= maxIndex;
      };

      const update = () => {
        visible = getVisibleCount();
        maxIndex = Math.max(items.length - visible, 0);
        if (index > maxIndex) index = maxIndex;

        const itemWidth = items[0].getBoundingClientRect().width;
        const trackStyles = window.getComputedStyle(track);
        const gap = parseFloat(trackStyles.columnGap || trackStyles.gap || 0);
        const offset = index * (itemWidth + gap);

        track.style.transform = `translateX(-${offset}px)`;
        updateButtons();

        const existingDots = dotsWrap.querySelectorAll('.posts-slider__dot').length;
        if (existingDots !== maxIndex + 1) {
          buildDots();
        } else {
          updateDots();
        }
      };

      const next = () => {
        index = index >= maxIndex ? 0 : index + 1;
        update();
      };

      const prev = () => {
        index = index <= 0 ? maxIndex : index - 1;
        update();
      };

      const startAutoplay = () => {
        stopAutoplay();
        autoplayId = window.setInterval(next, 4800);
      };

      const stopAutoplay = () => {
        if (autoplayId) {
          window.clearInterval(autoplayId);
          autoplayId = null;
        }
      };

      const restartAutoplay = () => startAutoplay();

      nextBtn.addEventListener('click', () => { next(); restartAutoplay(); });
      prevBtn.addEventListener('click', () => { prev(); restartAutoplay(); });
      slider.addEventListener('mouseenter', stopAutoplay);
      slider.addEventListener('mouseleave', startAutoplay);
      window.addEventListener('resize', update);

      update();
      startAutoplay();
    });
  }

  function initReveal() {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver((entries) => entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 90);
        io.unobserve(entry.target);
      }
    }), { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
  }

  function initBlogPagination() {
    const grid = document.getElementById('postsGrid');
    const pagination = document.getElementById('blogPagination');
    if (!grid || !pagination) return;

    const cards = Array.from(grid.querySelectorAll('.post-card'));
    const searchInput = document.getElementById('blogSearchInput');
    const resultsState = document.getElementById('blogResultsState');
    const postsPerPage = parseInt(grid.dataset.postsPerPage || '6', 10);
    let filteredCards = cards.slice();
    let totalPages = Math.max(1, Math.ceil(filteredCards.length / postsPerPage));
    let currentPage = 1;

    function scrollToPosts() {
      const top = grid.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({ top, behavior: 'smooth' });
    }

    function button(label, className, handler, disabled, ariaLabel) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = className;
      btn.textContent = label;
      if (ariaLabel) btn.setAttribute('aria-label', ariaLabel);
      if (disabled) btn.disabled = true;
      btn.addEventListener('click', handler);
      return btn;
    }

    function updateResultsState() {
      const hasResults = filteredCards.length > 0;
      if (resultsState) {
        resultsState.hidden = hasResults;
      }
      pagination.style.display = hasResults && totalPages > 1 ? '' : 'none';
    }

    function renderPagination() {
      pagination.innerHTML = '';
      if (filteredCards.length === 0 || totalPages <= 1) return;

      pagination.appendChild(button('‹', 'page-nav-btn', function () {
        renderPage(currentPage - 1);
        scrollToPosts();
      }, currentPage === 1, 'Página anterior'));

      for (let page = 1; page <= totalPages; page += 1) {
        const pageBtn = button(String(page), 'page-number-btn' + (page === currentPage ? ' is-active' : ''), function () {
          renderPage(page);
          scrollToPosts();
        }, false, 'Ir a la página ' + page);
        pageBtn.setAttribute('aria-current', page === currentPage ? 'page' : 'false');
        pagination.appendChild(pageBtn);
      }

      pagination.appendChild(button('›', 'page-nav-btn', function () {
        renderPage(currentPage + 1);
        scrollToPosts();
      }, currentPage === totalPages, 'Página siguiente'));
    }

    function renderPage(page) {
      currentPage = Math.max(1, Math.min(page, totalPages));
      const start = (currentPage - 1) * postsPerPage;
      const end = start + postsPerPage;

      cards.forEach((card) => card.classList.add('is-hidden'));
      filteredCards.forEach((card, index) => {
        card.classList.toggle('is-hidden', index < start || index >= end);
      });

      updateResultsState();
      renderPagination();
    }

    function applyFilter(query) {
      const term = (query || '').trim().toLowerCase();
      filteredCards = cards.filter((card) => {
        if (!term) return true;
        return (card.dataset.search || card.textContent || '').toLowerCase().includes(term);
      });
      totalPages = Math.max(1, Math.ceil(filteredCards.length / postsPerPage));
      renderPage(1);
    }

    if (searchInput) {
      searchInput.addEventListener('input', function () {
        applyFilter(this.value);
      });
      searchInput.addEventListener('search', function () {
        applyFilter(this.value);
      });
    }

    applyFilter(searchInput ? searchInput.value : '');
  }

  function initTagArchive() {
    const grid = document.getElementById('tagArchiveGrid');
    const pagination = document.getElementById('tagArchivePagination');
    if (!grid || !pagination) return;

    const cards = Array.from(grid.querySelectorAll('.post-card'));
    const searchInput = document.getElementById('tagArchiveSearchInput');
    const resultsState = document.getElementById('tagArchiveResultsState');
    const title = document.getElementById('tagArchiveTitle');
    const summary = document.getElementById('tagArchiveSummary');
    const tagLinks = Array.from(document.querySelectorAll('[data-tag-filter]'));
    const postsPerPage = parseInt(grid.dataset.postsPerPage || '6', 10);
    const params = new URLSearchParams(window.location.search);

    let selectedTag = (params.get('tag') || '').trim().toLowerCase();
    let selectedLabel = 'Todas las etiquetas';
    let filteredCards = cards.slice();
    let totalPages = Math.max(1, Math.ceil(filteredCards.length / postsPerPage));
    let currentPage = 1;

    function getTagLabel(slug) {
      if (!slug) return 'Todas las etiquetas';
      const activeLink = tagLinks.find((link) => (link.dataset.tagFilter || '').toLowerCase() === slug);
      return activeLink ? (activeLink.dataset.tagLabel || activeLink.textContent || 'Etiqueta').trim() : slug;
    }

    function syncTagLinks() {
      tagLinks.forEach((link) => {
        const isActive = (link.dataset.tagFilter || '').toLowerCase() === selectedTag;
        link.classList.toggle('is-active', isActive);
        link.classList.toggle('active', isActive);
        if (isActive) {
          link.setAttribute('aria-current', 'page');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    }

    function updateHeader() {
      selectedLabel = getTagLabel(selectedTag);
      if (title) {
        title.textContent = selectedTag ? 'Etiqueta: ' + selectedLabel : 'Todas las etiquetas';
      }
      if (summary) {
        summary.textContent = selectedTag
          ? 'Mostrando únicamente las entradas que usan la etiqueta “' + selectedLabel + '”.'
          : 'Selecciona una etiqueta para ver únicamente las entradas asociadas a ella.';
      }
      syncTagLinks();
    }

    function scrollToPosts() {
      const top = grid.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({ top, behavior: 'smooth' });
    }

    function button(label, className, handler, disabled, ariaLabel) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = className;
      btn.textContent = label;
      if (ariaLabel) btn.setAttribute('aria-label', ariaLabel);
      if (disabled) btn.disabled = true;
      btn.addEventListener('click', handler);
      return btn;
    }

    function updateResultsState() {
      const hasResults = filteredCards.length > 0;
      if (resultsState) {
        resultsState.hidden = hasResults;
      }
      pagination.style.display = hasResults && totalPages > 1 ? '' : 'none';
    }

    function renderPagination() {
      pagination.innerHTML = '';
      if (filteredCards.length === 0 || totalPages <= 1) return;

      pagination.appendChild(button('‹', 'page-nav-btn', function () {
        renderPage(currentPage - 1);
        scrollToPosts();
      }, currentPage === 1, 'Página anterior'));

      for (let page = 1; page <= totalPages; page += 1) {
        const pageBtn = button(String(page), 'page-number-btn' + (page === currentPage ? ' is-active' : ''), function () {
          renderPage(page);
          scrollToPosts();
        }, false, 'Ir a la página ' + page);
        pageBtn.setAttribute('aria-current', page === currentPage ? 'page' : 'false');
        pagination.appendChild(pageBtn);
      }

      pagination.appendChild(button('›', 'page-nav-btn', function () {
        renderPage(currentPage + 1);
        scrollToPosts();
      }, currentPage === totalPages, 'Página siguiente'));
    }

    function renderPage(page) {
      currentPage = Math.max(1, Math.min(page, totalPages));
      const start = (currentPage - 1) * postsPerPage;
      const end = start + postsPerPage;

      cards.forEach((card) => card.classList.add('is-hidden'));
      filteredCards.forEach((card, index) => {
        card.classList.toggle('is-hidden', index < start || index >= end);
      });

      updateResultsState();
      renderPagination();
    }

    function applyFilter() {
      const term = (searchInput && searchInput.value ? searchInput.value : '').trim().toLowerCase();
      filteredCards = cards.filter((card) => {
        const haystack = (card.dataset.search || card.textContent || '').toLowerCase();
        const tagList = (card.dataset.tags || '').toLowerCase().split('|').filter(Boolean);
        const matchesSearch = !term || haystack.includes(term);
        const matchesTag = !selectedTag || tagList.includes(selectedTag);
        return matchesSearch && matchesTag;
      });
      totalPages = Math.max(1, Math.ceil(filteredCards.length / postsPerPage));
      updateHeader();
      renderPage(1);
    }

    if (searchInput) {
      searchInput.addEventListener('input', applyFilter);
      searchInput.addEventListener('search', applyFilter);
    }

    tagLinks.forEach((link) => {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        const tagValue = (this.dataset.tagFilter || '').trim().toLowerCase();
        const nextUrl = new URL(window.location.href);
        if (tagValue) {
          nextUrl.searchParams.set('tag', tagValue);
        } else {
          nextUrl.searchParams.delete('tag');
        }
        history.replaceState({}, '', nextUrl);
        selectedTag = tagValue;
        applyFilter();
        scrollToPosts();
      });
    });

    updateHeader();
    applyFilter();
  }

  function initCategoryArchive() {
    const grid = document.getElementById('categoryArchiveGrid');
    const pagination = document.getElementById('categoryArchivePagination');
    if (!grid || !pagination) return;

    const cards = Array.from(grid.querySelectorAll('.post-card'));
    const resultsState = document.getElementById('categoryArchiveResultsState');
    const title = document.getElementById('categoryArchiveTitle');
    const summary = document.getElementById('categoryArchiveSummary');
    const categoryLinks = Array.from(document.querySelectorAll('[data-category-filter]'));
    const postsPerPage = parseInt(grid.dataset.postsPerPage || '6', 10);
    const params = new URLSearchParams(window.location.search);

    let selectedCategory = (params.get('category') || '').trim().toLowerCase();
    let filteredCards = cards.slice();
    let totalPages = Math.max(1, Math.ceil(filteredCards.length / postsPerPage));
    let currentPage = 1;

    function getCategoryLabel(key) {
      if (!key) return 'Todas las categorías';
      const activeLink = categoryLinks.find((link) => (link.dataset.categoryFilter || '').toLowerCase() === key);
      return activeLink ? (activeLink.dataset.categoryLabel || activeLink.textContent || 'Categoría').trim() : key;
    }

    function syncCategoryLinks() {
      categoryLinks.forEach((link) => {
        const matchesLink = (link.dataset.categoryFilter || '').toLowerCase() === selectedCategory;
        const shouldActivate = !!selectedCategory && matchesLink;
        link.classList.toggle('is-active', shouldActivate);
        link.classList.toggle('active', shouldActivate);
        if (shouldActivate) {
          link.setAttribute('aria-current', 'page');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    }

    function updateHeader() {
      const selectedLabel = getCategoryLabel(selectedCategory);
      if (title) {
        title.textContent = selectedCategory ? 'Categoría: ' + selectedLabel : 'Todas las categorías';
      }
      if (summary) {
        summary.textContent = selectedCategory
          ? 'Mostrando únicamente las entradas que pertenecen a la categoría “' + selectedLabel + '”.'
          : 'Selecciona una categoría en el panel lateral para ver únicamente las entradas asociadas a ella.';
      }
      syncCategoryLinks();
    }

    function scrollToPosts() {
      const top = grid.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({ top, behavior: 'smooth' });
    }

    function button(label, className, handler, disabled, ariaLabel) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = className;
      btn.textContent = label;
      if (ariaLabel) btn.setAttribute('aria-label', ariaLabel);
      if (disabled) btn.disabled = true;
      btn.addEventListener('click', handler);
      return btn;
    }

    function updateResultsState() {
      const hasResults = filteredCards.length > 0;
      if (resultsState) resultsState.hidden = hasResults;
      pagination.style.display = hasResults && totalPages > 1 ? '' : 'none';
    }

    function renderPagination() {
      pagination.innerHTML = '';
      if (filteredCards.length === 0 || totalPages <= 1) return;

      pagination.appendChild(button('‹', 'page-nav-btn', function () {
        renderPage(currentPage - 1);
        scrollToPosts();
      }, currentPage === 1, 'Página anterior'));

      for (let page = 1; page <= totalPages; page += 1) {
        const pageBtn = button(String(page), 'page-number-btn' + (page === currentPage ? ' is-active' : ''), function () {
          renderPage(page);
          scrollToPosts();
        }, false, 'Ir a la página ' + page);
        pageBtn.setAttribute('aria-current', page === currentPage ? 'page' : 'false');
        pagination.appendChild(pageBtn);
      }

      pagination.appendChild(button('›', 'page-nav-btn', function () {
        renderPage(currentPage + 1);
        scrollToPosts();
      }, currentPage === totalPages, 'Página siguiente'));
    }

    function renderPage(page) {
      currentPage = Math.max(1, Math.min(page, totalPages));
      const start = (currentPage - 1) * postsPerPage;
      const end = start + postsPerPage;

      cards.forEach((card) => card.classList.add('is-hidden'));
      filteredCards.forEach((card, index) => {
        card.classList.toggle('is-hidden', index < start || index >= end);
      });

      updateResultsState();
      renderPagination();
    }

    function applyFilter() {
      filteredCards = cards.filter((card) => {
        const cardCategory = (card.dataset.category || '').toLowerCase();
        return !selectedCategory || cardCategory === selectedCategory;
      });
      totalPages = Math.max(1, Math.ceil(filteredCards.length / postsPerPage));
      updateHeader();
      renderPage(1);
    }

    categoryLinks.forEach((link) => {
      link.addEventListener('click', function (event) {
        const href = this.getAttribute('href') || '';
        if (!href.includes('/categorias.html')) return;
        event.preventDefault();
        const categoryValue = (this.dataset.categoryFilter || '').trim().toLowerCase();
        const nextUrl = new URL(window.location.href);
        if (categoryValue) {
          nextUrl.searchParams.set('category', categoryValue);
        } else {
          nextUrl.searchParams.delete('category');
        }
        history.replaceState({}, '', nextUrl);
        selectedCategory = categoryValue;
        applyFilter();
        scrollToPosts();
      });
    });

    updateHeader();
    applyFilter();
  }

  function initContactEmail() {
    const output = document.getElementById('emailOutput');
    const revealBtn = document.getElementById('revealEmailBtn');
    const copyBtn = document.getElementById('copyEmailBtn');
    if (!output || !revealBtn || !copyBtn) return;

    const encoded = [110,101,107,51,125,118,114,52,125,71,119,117,104,115,104,105,106,102,110,107,41,100,104,106];
    const key = 7;
    const decodeEmail = () => encoded.map(value => String.fromCharCode(value ^ key)).join('');

    const revealEmail = () => {
      const email = decodeEmail();
      output.textContent = email;
      output.classList.remove('is-hidden');
      output.classList.add('is-visible');
      return email;
    };

    revealBtn.addEventListener('click', () => {
      revealEmail();
      revealBtn.textContent = 'Correo visible';
      revealBtn.disabled = true;
    });

    copyBtn.addEventListener('click', async () => {
      const email = revealEmail();
      try {
        await navigator.clipboard.writeText(email);
        copyBtn.textContent = 'Copiado';
      } catch (error) {
        copyBtn.textContent = 'No se pudo copiar';
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initHomeHero();
    initPostsSlider();
    initReveal();
    initBlogPagination();
    initTagArchive();
    initCategoryArchive();
    initContactEmail();
  });
})();
