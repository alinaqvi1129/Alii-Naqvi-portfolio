/**
 * blog-listing.js — Renders the blog card grid and tag filter on blog.html
 */

(function () {
  'use strict';

  let activeTag = 'All';

  // ── Build tag filter buttons ──────────────────────────────────────────────
  function renderTags() {
    const container = document.getElementById('tag-filter');
    if (!container) return;
    const tags = getAllTags();
    container.innerHTML = tags.map(tag => `
      <button
        class="tag-pill ${tag === activeTag ? 'active' : ''}"
        data-tag="${tag}"
        aria-pressed="${tag === activeTag}"
      >${tag}</button>
    `).join('');

    container.querySelectorAll('.tag-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        activeTag = btn.dataset.tag;
        renderTags();
        renderGrid();
      });
    });
  }

  // ── Build post cards ─────────────────────────────────────────────────────
  function renderGrid() {
    const grid  = document.getElementById('blog-grid');
    const empty = document.getElementById('blog-empty');
    if (!grid) return;

    const posts = activeTag === 'All'
      ? getAllPosts()
      : getAllPosts().filter(p => p.tags.includes(activeTag));

    if (posts.length === 0) {
      grid.innerHTML = '';
      empty.style.display = 'flex';
      return;
    }
    empty.style.display = 'none';

    grid.innerHTML = posts.map((post, i) => `
      <a href="blog-post.html?id=${post.id}" class="blog-card" data-aos="fade-up" data-aos-delay="${(i % 3) * 100}">
        <div class="blog-card-cover">
          <img src="${post.cover}" alt="${post.title}" loading="lazy"
               onerror="this.parentElement.classList.add('blog-card-cover--fallback'); this.style.display='none';">
          <div class="blog-card-cover-fallback-icon"><i class="fas fa-newspaper"></i></div>
        </div>
        <div class="blog-card-body">
          <div class="blog-card-tags">
            ${post.tags.map(t => `<span class="blog-tag">${t}</span>`).join('')}
          </div>
          <h3 class="blog-card-title">${post.title}</h3>
          <p class="blog-card-subtitle">${post.subtitle}</p>
          <div class="blog-card-meta">
            <span><i class="fas fa-calendar-alt"></i> ${post.date}</span>
            <span><i class="fas fa-clock"></i> ${post.readTime}</span>
          </div>
        </div>
        <div class="blog-card-footer">
          Read Article <i class="fas fa-arrow-right"></i>
        </div>
      </a>
    `).join('');

    // Re-init AOS for dynamically added elements
    if (typeof AOS !== 'undefined') AOS.refresh();
  }

  // ── Newsletter helper ─────────────────────────────────────────────────────
  window.subscribeNewsletter = function () {
    const emailEl = document.getElementById('newsletter-email');
    const btn     = document.getElementById('newsletter-btn');
    const email   = (emailEl?.value || '').trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      emailEl.style.borderColor = '#ef4444';
      setTimeout(() => emailEl.style.borderColor = '', 2000);
      return;
    }

    // mailto fallback — works without a backend
    const subject = encodeURIComponent('Newsletter subscription from portfolio blog');
    const body    = encodeURIComponent(`Please add ${email} to the newsletter list.`);
    window.location.href = `mailto:shakeelnaqvi35@gmail.com?subject=${subject}&body=${body}`;

    btn.textContent = '✓ Done!';
    btn.style.background = '#10b981';
    setTimeout(() => {
      btn.textContent = 'Subscribe';
      btn.style.background = '';
      emailEl.value = '';
    }, 3000);
  };

  // ── Init ──────────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    renderTags();
    renderGrid();
    AOS.init({ duration: 800, once: true, offset: 40 });
  });

})();
