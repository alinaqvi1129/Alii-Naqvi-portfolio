/**
 * blog-post.js — Renders a single blog post on blog-post.html
 * Reads the ?id= URL parameter, finds the post in blogs.js, renders it.
 */

(function () {
  'use strict';

  // ── Get post id from URL ──────────────────────────────────────────────────
  const params = new URLSearchParams(window.location.search);
  const postId = params.get('id');

  // ── Configure marked ─────────────────────────────────────────────────────
  marked.setOptions({
    breaks: true,
    gfm: true,
    highlight: function (code, lang) {
      if (typeof Prism !== 'undefined' && lang && Prism.languages[lang]) {
        return Prism.highlight(code, Prism.languages[lang], lang);
      }
      return code;
    }
  });

  // ── Render the post ───────────────────────────────────────────────────────
  function renderPost() {
    const post = getPostById(postId);

    if (!post) {
      document.getElementById('post-header').innerHTML = `
        <div class="post-not-found">
          <i class="fas fa-file-circle-question"></i>
          <h2>Post not found</h2>
          <p>The post you're looking for doesn't exist or has been removed.</p>
          <a href="blog.html" class="btn" style="margin-top:20px;display:inline-block">← Back to Blog</a>
        </div>`;
      return;
    }

    // Update page title and meta
    document.getElementById('post-page-title').textContent = `${post.title} — Ali Naqvi`;
    document.getElementById('post-meta-desc').setAttribute('content', post.subtitle);

    // ── Header ──────────────────────────────────────────────────────────────
    document.getElementById('post-header').innerHTML = `
      <div class="post-tags">
        ${post.tags.map(t => `<span class="blog-tag">${t}</span>`).join('')}
      </div>
      <h1 class="post-title">${post.title}</h1>
      <p class="post-subtitle">${post.subtitle}</p>
      <div class="post-meta">
        <img src="assets/1000024092.webp" alt="Ali Naqvi" class="post-author-avatar">
        <div class="post-meta-info">
          <span class="post-author-name">Ali Naqvi</span>
          <span class="post-meta-details">
            <i class="fas fa-calendar-alt"></i> ${post.date}
            &nbsp;·&nbsp;
            <i class="fas fa-clock"></i> ${post.readTime}
          </span>
        </div>
      </div>
    `;

    // ── Cover image ──────────────────────────────────────────────────────────
    const coverWrap = document.getElementById('post-cover-wrap');
    const img = new Image();
    img.src = post.cover;
    img.alt = post.title;
    img.className = 'post-cover-img';
    img.onerror = () => coverWrap.classList.add('post-cover-wrap--hidden');
    coverWrap.appendChild(img);

    // ── Body (Markdown → HTML) ───────────────────────────────────────────────
    const bodyEl = document.getElementById('post-body');
    bodyEl.innerHTML = marked.parse(post.body.trim());

    // Re-run Prism on the freshly inserted HTML
    if (typeof Prism !== 'undefined') Prism.highlightAll();

    // ── Share buttons ────────────────────────────────────────────────────────
    const url   = window.location.href;
    const title = encodeURIComponent(post.title);

    document.getElementById('share-x').onclick = () => {
      window.open(`https://twitter.com/intent/tweet?text=${title}&url=${encodeURIComponent(url)}`, '_blank');
    };
    document.getElementById('share-linkedin').onclick = () => {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    };
    document.getElementById('share-copy').onclick = () => {
      navigator.clipboard.writeText(url).then(() => {
        const btn = document.getElementById('share-copy');
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.innerHTML = '<i class="fas fa-link"></i> Copy Link';
          btn.classList.remove('copied');
        }, 2000);
      });
    };

    // ── More posts ────────────────────────────────────────────────────────────
    const morePosts = getAllPosts().filter(p => p.id !== post.id).slice(0, 3);
    const moreGrid  = document.getElementById('more-posts-grid');
    moreGrid.innerHTML = morePosts.map(p => `
      <a href="blog-post.html?id=${p.id}" class="more-post-card">
        <div class="more-post-cover">
          <img src="${p.cover}" alt="${p.title}" loading="lazy"
               onerror="this.parentElement.classList.add('mpc-fallback'); this.style.display='none';">
          <div class="mpc-fallback-icon"><i class="fas fa-newspaper"></i></div>
        </div>
        <div class="more-post-info">
          <div class="blog-card-tags" style="margin-bottom:6px">
            ${p.tags.slice(0,2).map(t => `<span class="blog-tag">${t}</span>`).join('')}
          </div>
          <h4>${p.title}</h4>
          <span class="more-post-meta"><i class="fas fa-calendar-alt"></i> ${p.date} &nbsp;·&nbsp; <i class="fas fa-clock"></i> ${p.readTime}</span>
        </div>
      </a>
    `).join('');
  }

  document.addEventListener('DOMContentLoaded', renderPost);

})();
