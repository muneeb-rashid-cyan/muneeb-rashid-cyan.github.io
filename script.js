/* ═══════════════════════════════════════════════════════════════
   MUNEEB RASHID — PORTFOLIO JAVASCRIPT
   Features:
     • Neural Network Particle Canvas Background
     • Typewriter / Dynamic Text Effect
     • Custom AOS (Animate On Scroll)
     • Animated Number Counters
     • Progress Bar Animations
     • Sticky Navbar with Active Section Highlighting
     • Mobile Menu Toggle
     • Contact Form Handler
     • Back-to-Top Button
     • Smooth Scroll
   ═══════════════════════════════════════════════════════════════ */

'use strict';

/* ═══════════════════════════════════════════════════
   1. NEURAL NETWORK PARTICLE CANVAS
   ═══════════════════════════════════════════════════ */
class NeuralCanvas {
  constructor(canvasId) {
    this.canvas  = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx     = this.canvas.getContext('2d');
    this.nodes   = [];
    this.mouse   = { x: -9999, y: -9999 };
    this.raf     = null;

    // Config
    this.CONFIG = {
      nodeCount:        90,
      nodeRadius:       1.8,
      nodeSpeed:        0.35,
      connectionDist:   140,
      mouseRepelDist:   120,
      mouseRepelForce:  0.04,
      cyan:             'rgba(0, 212, 255',
      purple:           'rgba(124, 58, 237',
    };

    this._resize();
    this._spawnNodes();
    this._bindEvents();
    this._loop();
  }

  _resize() {
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width  = window.innerWidth  * dpr;
    this.canvas.height = window.innerHeight * dpr;
    this.canvas.style.width  = window.innerWidth  + 'px';
    this.canvas.style.height = window.innerHeight + 'px';
    this.ctx.scale(dpr, dpr);
    this.W = window.innerWidth;
    this.H = window.innerHeight;
  }

  _spawnNodes() {
    this.nodes = [];
    for (let i = 0; i < this.CONFIG.nodeCount; i++) {
      this.nodes.push({
        x:   Math.random() * this.W,
        y:   Math.random() * this.H,
        vx:  (Math.random() - 0.5) * this.CONFIG.nodeSpeed,
        vy:  (Math.random() - 0.5) * this.CONFIG.nodeSpeed,
        r:   Math.random() * this.CONFIG.nodeRadius + 0.8,
        hue: Math.random() > 0.5 ? 'cyan' : 'purple',
      });
    }
  }

  _bindEvents() {
    window.addEventListener('resize', () => {
      this._resize();
      this._spawnNodes();
    });
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
    window.addEventListener('mouseleave', () => {
      this.mouse.x = -9999;
      this.mouse.y = -9999;
    });
  }

  _loop() {
    this.ctx.clearRect(0, 0, this.W, this.H);
    this._updateNodes();
    this._drawConnections();
    this._drawNodes();
    this.raf = requestAnimationFrame(() => this._loop());
  }

  _updateNodes() {
    const { mouseRepelDist, mouseRepelForce } = this.CONFIG;
    this.nodes.forEach(n => {
      // Mouse repulsion
      const dx = n.x - this.mouse.x;
      const dy = n.y - this.mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < mouseRepelDist) {
        const force = (1 - dist / mouseRepelDist) * mouseRepelForce;
        n.vx += (dx / dist) * force;
        n.vy += (dy / dist) * force;
      }

      // Velocity damping
      n.vx *= 0.99;
      n.vy *= 0.99;

      // Clamp speed
      const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
      const maxSpeed = this.CONFIG.nodeSpeed * 2;
      if (speed > maxSpeed) {
        n.vx = (n.vx / speed) * maxSpeed;
        n.vy = (n.vy / speed) * maxSpeed;
      }

      n.x += n.vx;
      n.y += n.vy;

      // Bounce off walls
      if (n.x < 0)       { n.x = 0;       n.vx *= -1; }
      if (n.x > this.W)  { n.x = this.W;  n.vx *= -1; }
      if (n.y < 0)       { n.y = 0;       n.vy *= -1; }
      if (n.y > this.H)  { n.y = this.H;  n.vy *= -1; }
    });
  }

  _drawConnections() {
    const { connectionDist, cyan, purple } = this.CONFIG;
    const nodes = this.nodes;

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a  = nodes[i];
        const b  = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d  = Math.sqrt(dx * dx + dy * dy);

        if (d < connectionDist) {
          const alpha = (1 - d / connectionDist) * 0.35;
          const color = a.hue === 'cyan' ? cyan : purple;

          this.ctx.beginPath();
          this.ctx.strokeStyle = `${color}, ${alpha})`;
          this.ctx.lineWidth   = 0.7;
          this.ctx.moveTo(a.x, a.y);
          this.ctx.lineTo(b.x, b.y);
          this.ctx.stroke();
        }
      }
    }
  }

  _drawNodes() {
    const { cyan, purple } = this.CONFIG;
    this.nodes.forEach(n => {
      const color = n.hue === 'cyan' ? cyan : purple;

      // Glow
      this.ctx.beginPath();
      const grad = this.ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 3);
      grad.addColorStop(0, `${color}, 0.3)`);
      grad.addColorStop(1, `${color}, 0)`);
      this.ctx.fillStyle = grad;
      this.ctx.arc(n.x, n.y, n.r * 3, 0, Math.PI * 2);
      this.ctx.fill();

      // Core dot
      this.ctx.beginPath();
      this.ctx.fillStyle = `${color}, 0.85)`;
      this.ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }

  destroy() {
    cancelAnimationFrame(this.raf);
  }
}

/* ═══════════════════════════════════════════════════
   2. TYPEWRITER EFFECT
   ═══════════════════════════════════════════════════ */
class TypeWriter {
  constructor(elementId, phrases, opts = {}) {
    this.el      = document.getElementById(elementId);
    if (!this.el) return;

    this.phrases     = phrases;
    this.typeSpeed   = opts.typeSpeed   || 80;
    this.deleteSpeed = opts.deleteSpeed || 45;
    this.pauseAfter  = opts.pauseAfter  || 2000;
    this.pauseBefore = opts.pauseBefore || 500;

    this.currentPhrase = 0;
    this.currentChar   = 0;
    this.isDeleting    = false;

    this._tick();
  }

  _tick() {
    const phrase = this.phrases[this.currentPhrase];

    if (this.isDeleting) {
      this.el.textContent = phrase.substring(0, this.currentChar - 1);
      this.currentChar--;
    } else {
      this.el.textContent = phrase.substring(0, this.currentChar + 1);
      this.currentChar++;
    }

    let delay = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

    if (!this.isDeleting && this.currentChar === phrase.length) {
      // Pause at end
      delay = this.pauseAfter;
      this.isDeleting = true;
    } else if (this.isDeleting && this.currentChar === 0) {
      // Move to next phrase
      this.isDeleting = false;
      this.currentPhrase = (this.currentPhrase + 1) % this.phrases.length;
      delay = this.pauseBefore;
    }

    setTimeout(() => this._tick(), delay);
  }
}

/* ═══════════════════════════════════════════════════
   3. ANIMATE ON SCROLL (custom lightweight AOS)
   ═══════════════════════════════════════════════════ */
class ScrollAnimator {
  constructor() {
    this.elements = document.querySelectorAll('[data-aos]');
    this.observer = null;
    this._init();
  }

  _init() {
    const options = {
      root:       null,
      rootMargin: '0px 0px -80px 0px',
      threshold:  0.1,
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el    = entry.target;
          const delay = parseInt(el.dataset.aosDelay || 0);
          setTimeout(() => el.classList.add('aos-animate'), delay);
          // Don't unobserve — keep it for the duration of the session
        }
      });
    }, options);

    this.elements.forEach(el => this.observer.observe(el));
  }
}

/* ═══════════════════════════════════════════════════
   4. ANIMATED NUMBER COUNTERS
   ═══════════════════════════════════════════════════ */
class CounterAnimator {
  constructor() {
    this.counters  = document.querySelectorAll('[data-count]');
    this.animated  = new WeakSet();
    this._observe();
  }

  _observe() {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animated.has(entry.target)) {
          this.animated.add(entry.target);
          this._animate(entry.target);
        }
      });
    }, { threshold: 0.5 });

    this.counters.forEach(el => obs.observe(el));
  }

  _animate(el) {
    const target   = parseInt(el.dataset.count);
    const duration = 1800;
    const step     = 16;
    const steps    = duration / step;
    const increment = target / steps;
    let current    = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current);
      }
    }, step);
  }
}

/* ═══════════════════════════════════════════════════
   5. PROGRESS BAR ANIMATOR
   ═══════════════════════════════════════════════════ */
class ProgressAnimator {
  constructor() {
    this.bars     = document.querySelectorAll('.progress-fill');
    this.animated = new WeakSet();
    this._observe();
  }

  _observe() {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.animated.has(entry.target)) {
          this.animated.add(entry.target);
          const width = entry.target.dataset.width;
          // Small delay so the transition is visible
          requestAnimationFrame(() => {
            entry.target.style.width = width + '%';
          });
        }
      });
    }, { threshold: 0.3 });

    this.bars.forEach(bar => obs.observe(bar));
  }
}

/* ═══════════════════════════════════════════════════
   6. NAVBAR — Scroll behavior + Active section
   ═══════════════════════════════════════════════════ */
class Navbar {
  constructor() {
    this.navbar    = document.getElementById('navbar');
    this.navLinks  = document.querySelectorAll('.nav-link');
    this.sections  = document.querySelectorAll('section[id]');
    this.scrollY   = 0;
    this._bind();
    this._onScroll(); // Run once immediately
  }

  _bind() {
    window.addEventListener('scroll', () => this._onScroll(), { passive: true });
  }

  _onScroll() {
    this.scrollY = window.scrollY;

    // Sticky style
    if (this.scrollY > 60) {
      this.navbar.classList.add('scrolled');
    } else {
      this.navbar.classList.remove('scrolled');
    }

    // Active section highlight
    let current = '';
    this.sections.forEach(section => {
      const sectionTop    = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      if (this.scrollY >= sectionTop && this.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    this.navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
}

/* ═══════════════════════════════════════════════════
   7. MOBILE MENU
   ═══════════════════════════════════════════════════ */
class MobileMenu {
  constructor() {
    this.hamburger  = document.getElementById('hamburger');
    this.menu       = document.getElementById('mobileMenu');
    this.mobileLinks= document.querySelectorAll('.mobile-link');
    this.isOpen     = false;
    this._bind();
  }

  _bind() {
    this.hamburger.addEventListener('click', () => this._toggle());
    this.mobileLinks.forEach(link => {
      link.addEventListener('click', () => this._close());
    });
    // Close on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) this._close();
    });
  }

  _toggle() {
    this.isOpen ? this._close() : this._open();
  }

  _open() {
    this.isOpen = true;
    this.hamburger.classList.add('open');
    this.menu.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  _close() {
    this.isOpen = false;
    this.hamburger.classList.remove('open');
    this.menu.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/* ═══════════════════════════════════════════════════
   8. BACK TO TOP BUTTON
   ═══════════════════════════════════════════════════ */
class BackToTop {
  constructor() {
    this.btn = document.getElementById('backToTop');
    if (!this.btn) return;
    this._bind();
  }

  _bind() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        this.btn.classList.add('visible');
      } else {
        this.btn.classList.remove('visible');
      }
    }, { passive: true });

    this.btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ═══════════════════════════════════════════════════
   9. CONTACT FORM
   ═══════════════════════════════════════════════════ */
class ContactForm {
  constructor() {
    this.form = document.getElementById('contactForm');
    if (!this.form) return;
    this._bind();
  }

  _bind() {
    this.form.addEventListener('submit', (e) => this._onSubmit(e));
  }

  _onSubmit(e) {
    e.preventDefault();

    const name    = this.form.querySelector('#name').value.trim();
    const email   = this.form.querySelector('#email').value.trim();
    const subject = this.form.querySelector('#subject').value.trim();
    const message = this.form.querySelector('#message').value.trim();

    if (!name || !email || !subject || !message) return;

    // Build mailto link
    const body = encodeURIComponent(
      `Hi Muneeb,\n\n${message}\n\nBest regards,\n${name}\n${email}`
    );
    const mailtoURL = `mailto:muneebcyan@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    window.location.href = mailtoURL;

    // Visual feedback
    const btn = this.form.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = '';
      this.form.reset();
    }, 3000);
  }
}

/* ═══════════════════════════════════════════════════
   10. SMOOTH SCROLL for anchor links
   ═══════════════════════════════════════════════════ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const offset = 72; // navbar height
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ═══════════════════════════════════════════════════
   11. PROJECT CARD — Tilt effect on hover
   ═══════════════════════════════════════════════════ */
function initCardTilt() {
  const cards = document.querySelectorAll('.project-card-inner');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ═══════════════════════════════════════════════════
   12. TIMELINE ITEM — Stagger animation
   ═══════════════════════════════════════════════════ */
function initTimelineStagger() {
  const items = document.querySelectorAll('.timeline-item');
  items.forEach((item, idx) => {
    if (!item.hasAttribute('data-aos-delay')) {
      item.setAttribute('data-aos-delay', idx * 100);
    }
  });
}

/* ═══════════════════════════════════════════════════
   INIT — Wait for DOM
   ═══════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  // Neural Network Canvas
  const neural = new NeuralCanvas('particleCanvas');

  // Typewriter for hero dynamic text
  new TypeWriter('dynamicText', [
    'AI Engineer',
    'Generative AI Specialist',
    'MLOps Architect',
    'LLM Engineer',
    'Computer Vision Expert',
    'RAG Pipeline Builder',
    'Multi-Cloud AI Engineer',
  ], {
    typeSpeed:   75,
    deleteSpeed: 40,
    pauseAfter:  2200,
    pauseBefore: 400,
  });

  // Scroll animations
  new ScrollAnimator();
  new CounterAnimator();
  new ProgressAnimator();

  // UI components
  new Navbar();
  new MobileMenu();
  new BackToTop();
  new ContactForm();

  // Helpers
  initSmoothScroll();
  initCardTilt();
  initTimelineStagger();

  // Immediately animate elements visible on load (hero section)
  requestAnimationFrame(() => {
    document.querySelectorAll('.hero [data-aos]').forEach(el => {
      const delay = parseInt(el.dataset.aosDelay || 0);
      setTimeout(() => el.classList.add('aos-animate'), delay);
    });
  });

  // Destroy canvas on page hide to free memory (mobile tabs)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      neural.destroy && neural.destroy();
    }
  });
});
