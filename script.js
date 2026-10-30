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


// --- CONTACT FORM (mailto fallback — works on Netlify with no backend) ---
document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const name    = document.getElementById("name").value.trim();
  const email   = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  const submitBtn = this.querySelector('button[type="submit"]');
  submitBtn.innerText = "Opening mail…";

  // Open user's mail client pre-filled — works without any server
  const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
  const body    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:shakeelnaqvi35@gmail.com?subject=${subject}&body=${body}`;

  setTimeout(() => {
    submitBtn.innerText = "Send";
    this.reset();
  }, 1500);
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
