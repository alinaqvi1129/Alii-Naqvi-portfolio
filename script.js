var typed = new Typed(".typing", {
  strings:[
    "Frontend Developer",
    "Java Developer",
    "Machine Learning Learner"
  ],
  typeSpeed:100,
  backSpeed:50,
  loop:true
});


// --- BACKEND INTEGRATION ---
const API_BASE = 'http://localhost:5000';

// 1. Ping Server Status
fetch(`${API_BASE}/api/ping`)
  .then(res => res.json())
  .then(data => {
    if (data.status === 'online') {
      const dot = document.querySelector('.status-dot');
      const text = document.querySelector('.status-text');
      if (dot && text) {
        dot.classList.add('online');
        text.innerText = 'Online';
      }
    }
  })
  .catch(err => console.log('Server is offline or not running locally.'));

// 2. Fetch and Load Likes
fetch(`${API_BASE}/api/likes`)
  .then(res => res.json())
  .then(likes => {
    document.querySelectorAll('.like-btn').forEach(btn => {
      const projectId = btn.getAttribute('data-project-id');
      if (likes[projectId]) {
        btn.querySelector('.like-count').innerText = likes[projectId];
      }
    });
  })
  .catch(err => console.log('Could not fetch likes.'));

// 3. Handle Like Button Clicks
document.querySelectorAll('.like-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    if (this.classList.contains('liked')) return;

    this.classList.add('liked');
    const projectId = this.getAttribute('data-project-id');
    const countSpan = this.querySelector('.like-count');
    countSpan.innerText = parseInt(countSpan.innerText) + 1; // optimistic UI update

    fetch(`${API_BASE}/api/likes/${projectId}`, { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          countSpan.innerText = data.likes; // confirm actual count from server
        }
      })
      .catch(err => console.log('Failed to post like'));
  });
});

// 5. Contact form via backend instead of EmailJS
document.getElementById("contact-form").addEventListener("submit", function(e){
  e.preventDefault();

  const submitBtn = this.querySelector('button[type="submit"]');
  const ogText = submitBtn.innerText;
  submitBtn.innerText = "Sending...";

  fetch(`${API_BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value
    })
  })
  .then(res => {
    if (res.ok) {
      alert("Message sent successfully via Backend!");
      this.reset();
    } else {
      alert("Failed to send message via Backend.");
    }
  })
  .catch(error => {
    alert("Server error. Make sure your local Node server is running!");
    console.log(error);
  })
  .finally(() => {
    submitBtn.innerText = ogText;
  });
});


const toggle = document.getElementById("darkToggle");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  toggle.checked = true;
}

// Toggle change
toggle.addEventListener("change", () => {
  if (toggle.checked) {
    document.body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
  }
});

// Mobile menu toggle
const menuIcon = document.getElementById("menu-icon");
const navLinks = document.getElementById("nav-links");

menuIcon.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Close menu when a link is clicked
const links = document.querySelectorAll(".nav-links a");
links.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// Initialize Animate on Scroll (AOS)
AOS.init({
  duration: 1000,
  once: true,
  offset: 50
});

/* ================= BACK TO TOP BUTTON ================= */
const backToTopBtn = document.getElementById("backToTop");

if (backToTopBtn) {
  window.addEventListener("scroll", () => {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      backToTopBtn.style.display = "block";
    } else {
      backToTopBtn.style.display = "none";
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ================= PARTICLES BACKGROUND ================= */
if (typeof particlesJS !== "undefined" && document.getElementById("particles-js")) {
  particlesJS("particles-js", {
    "particles": {
      "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
      "color": { "value": "#6366f1" },
      "shape": { "type": "circle" },
      "opacity": { "value": 0.5, "random": false },
      "size": { "value": 3, "random": true },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#6366f1",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 6,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": { "enable": true, "mode": "grab" },
        "onclick": { "enable": true, "mode": "push" },
        "resize": true
      },
      "modes": {
        "grab": { "distance": 140, "line_linked": { "opacity": 1 } },
        "push": { "particles_nb": 4 }
      }
    },
    "retina_detect": true
  });
}

/* ================= ANIMATED STATS COUNTER ================= */
const statNumbers = document.querySelectorAll('.stat-number');

const countUp = (el) => {
  const target = parseInt(el.getAttribute('data-target'));
  const duration = 1500;
  const step = Math.ceil(duration / target);
  let current = 0;
  const timer = setInterval(() => {
    current++;
    el.textContent = current;
    if (current >= target) {
      el.textContent = target + (target >= 5 ? '+' : '');
      clearInterval(timer);
    }
  }, step);
};

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      countUp(entry.target);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(num => statsObserver.observe(num));

/* ================= FIX LIKE BTN INSIDE ANCHOR ================= */
document.querySelectorAll('.like-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
  }, true);
});

/* =================================================================
   AI CHAT WIDGET
   ================================================================= */
(function () {

  // ── Config ──
  const CP_API    = 'http://127.0.0.1:5000/chat';
  const CP_HEALTH = 'http://127.0.0.1:5000/health';

  // ── State ──
  let cpHistory  = [];
  let cpBusy     = false;

  // ── Elements ──
  const fab        = document.getElementById('chat-fab');
  const panel      = document.getElementById('chat-panel');
  const overlay    = document.getElementById('chat-overlay');
  const closeBtn   = document.getElementById('cp-close');
  const clearBtn   = document.getElementById('cp-clear');
  const msgs       = document.getElementById('cp-messages');
  const input      = document.getElementById('cp-input');
  const sendBtn    = document.getElementById('cp-send');
  const dotEl      = document.getElementById('cp-dot');
  const statusEl   = document.getElementById('cp-status-text');
  const offlineEl  = document.getElementById('cp-offline');
  const fabIcon    = document.getElementById('chat-fab-icon');

  // ── Open / Close ──
  function openPanel() {
    panel.classList.add('open');
    overlay.classList.add('show');
    document.body.classList.add('chat-open');
    fabIcon.className = 'fas fa-xmark';
    input.focus();
  }

  function closePanel() {
    panel.classList.remove('open');
    overlay.classList.remove('show');
    document.body.classList.remove('chat-open');
    fabIcon.className = 'fas fa-comment-dots';
  }

  fab.addEventListener('click', () =>
    panel.classList.contains('open') ? closePanel() : openPanel()
  );
  closeBtn.addEventListener('click', closePanel);
  overlay.addEventListener('click', closePanel);

  // ── Health check ──
  async function cpHealthCheck() {
    try {
      const res = await fetch(CP_HEALTH, { signal: AbortSignal.timeout(3000) });
      if (res.ok) { setOnline(true); } else { setOnline(false); }
    } catch { setOnline(false); }
  }

  function setOnline(online) {
    if (online) {
      dotEl.classList.add('online');
      statusEl.textContent = 'Online · Mistral AI';
      offlineEl.classList.remove('show');
    } else {
      dotEl.classList.remove('online');
      statusEl.textContent = 'Offline — run chatbot_server.py';
      offlineEl.classList.add('show');
    }
  }

  cpHealthCheck();
  setInterval(cpHealthCheck, 30000);

  // ── Helpers ──
  function getTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function scrollBottom() {
    msgs.scrollTop = msgs.scrollHeight;
  }

  function hideWelcome() {
    const w = document.getElementById('cp-welcome');
    if (w) {
      w.style.transition = 'opacity 0.22s, transform 0.22s';
      w.style.opacity = '0';
      w.style.transform = 'scale(0.95)';
      setTimeout(() => w && w.remove(), 230);
    }
  }

  // ── Render message ──
  function renderMsg(role, text, isError = false) {
    const isUser = role === 'user';
    const wrap = document.createElement('div');
    wrap.className = `cp-msg ${isUser ? 'user' : 'bot'}`;

    const av = document.createElement('div');
    av.className = 'cp-msg-av';
    av.innerHTML = isUser ? '<i class="fas fa-user"></i>' : '🤖';
    av.setAttribute('aria-hidden', 'true');

    const col = document.createElement('div');
    col.style.cssText = 'display:flex;flex-direction:column;gap:3px';

    const bubble = document.createElement('div');
    bubble.className = 'cp-bubble' + (isError ? ' error' : '');
    if (isUser) {
      bubble.textContent = text;
    } else {
      bubble.innerHTML = typeof marked !== 'undefined'
        ? marked.parse(text)
        : text.replace(/\n/g, '<br>');
    }

    const time = document.createElement('div');
    time.className = 'cp-msg-time';
    time.textContent = getTime();

    col.appendChild(bubble);
    col.appendChild(time);
    wrap.appendChild(av);
    wrap.appendChild(col);
    msgs.appendChild(wrap);
    scrollBottom();
    return wrap;
  }

  // ── Typing indicator ──
  function showTyping() {
    const el = document.createElement('div');
    el.className = 'cp-typing';
    el.id = 'cp-typing';
    el.innerHTML = `
      <div class="cp-msg-av" aria-hidden="true" style="background:linear-gradient(135deg,#6366f1,#8b5cf6)">🤖</div>
      <div class="cp-typing-dots"><span></span><span></span><span></span></div>`;
    msgs.appendChild(el);
    scrollBottom();
  }

  function hideTyping() {
    const el = document.getElementById('cp-typing');
    if (el) el.remove();
  }

  // ── Send ──
  async function cpSend(text) {
    text = text.trim();
    if (!text || cpBusy) return;

    hideWelcome();
    cpBusy = true;
    sendBtn.disabled = true;
    input.value = '';
    input.style.height = 'auto';

    renderMsg('user', text);
    cpHistory.push({ role: 'user', content: text });
    showTyping();

    try {
      const res = await fetch(CP_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: cpHistory.slice(-20) }),
        signal: AbortSignal.timeout(60000)
      });

      hideTyping();

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        renderMsg('bot', `⚠️ Error ${res.status}: ${err.error || res.statusText}`, true);
        setOnline(false);
        return;
      }

      const data  = await res.json();
      const reply = data.response || '*(empty)*';
      renderMsg('bot', reply);
      cpHistory.push({ role: 'assistant', content: reply });
      setOnline(true);

    } catch (err) {
      hideTyping();
      if (err.name === 'TimeoutError') {
        renderMsg('bot', '⏱️ Timed out. Try again.', true);
      } else {
        renderMsg('bot', '🔌 Cannot reach backend. Run `chatbot_server.py`.', true);
        setOnline(false);
      }
    } finally {
      cpBusy = false;
      sendBtn.disabled = false;
      input.focus();
    }
  }

  // ── Suggestion chips (global so inline onclick works) ──
  window.cpSendSuggestion = function (text) {
    openPanel();
    cpSend(text);
  };

  // ── Clear ──
  clearBtn.addEventListener('click', () => {
    msgs.innerHTML = '';
    cpHistory = [];
    const w = document.createElement('div');
    w.className = 'cp-welcome';
    w.id = 'cp-welcome';
    w.innerHTML = `
      <div class="cp-welcome-icon">✨</div>
      <p class="cp-welcome-title">Hi, I'm Ali's AI!</p>
      <p class="cp-welcome-sub">Powered by <strong>Mistral AI</strong>.<br>Ask me anything!</p>
      <div class="cp-chips">
        <button class="cp-chip" onclick="cpSendSuggestion('Explain ML in simple terms')">🧠 Explain ML</button>
        <button class="cp-chip" onclick="cpSendSuggestion('Write a Python hello world')">🐍 Python code</button>
        <button class="cp-chip" onclick="cpSendSuggestion('What skills should a CS student learn?')">💡 CS tips</button>
      </div>`;
    msgs.appendChild(w);
  });

  // ── Input events ──
  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 110) + 'px';
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      cpSend(input.value);
    }
  });

  sendBtn.addEventListener('click', () => cpSend(input.value));

})();