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