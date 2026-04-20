// ========== NAVBAR SCROLL ==========
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
  updateActiveNav();
});

// ========== SMOOTH SCROLL for nav links ==========
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = document.getElementById('navbar').offsetHeight;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    }
  });
});

// ========== SCROLL SPY ==========
const sections = [
  { id: 'inicio',   nav: 'nav-inicio' },
  { id: 'precios',  nav: 'nav-precios' },
  { id: 'acerca',   nav: 'nav-acerca' },
  { id: 'contacto', nav: 'nav-contacto' },
];

function updateActiveNav() {
  const scrollY = window.scrollY + 100;
  let current = sections[0].nav;
  sections.forEach(({ id, nav }) => {
    const el = document.getElementById(id);
    if (el && el.offsetTop <= scrollY) current = nav;
  });
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const active = document.getElementById(current);
  if (active) active.classList.add('active');
}

// ========== FAQ ACCORDION ==========
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    // close all
    document.querySelectorAll('.faq-question').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      b.nextElementSibling.classList.remove('open');
    });
    // open clicked if it was closed
    if (!expanded) {
      btn.setAttribute('aria-expanded', 'true');
      btn.nextElementSibling.classList.add('open');
    }
  });
});

// ========== HAMBURGER MENU ==========
const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('nav');
hamburger.addEventListener('click', () => nav.classList.toggle('open'));

// ========== CONTACT FORM ==========
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('btn-submit');
  btn.textContent = 'Enviando...';
  btn.disabled = true;
  setTimeout(() => {
    document.getElementById('form-success').classList.add('show');
    document.getElementById('contact-form').reset();
    btn.textContent = 'Enviar mensaje';
    btn.disabled = false;
  }, 1200);
}

// ========== INTERSECTION OBSERVER (fade-in on scroll) ==========
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.benefit-card, .testimonial-card, .pricing-card, .team-card, .faq-item, .contact-item')
  .forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.benefit-card, .testimonial-card, .pricing-card, .team-card, .faq-item, .contact-item')
    .forEach(el => {
      el.classList.add('visible');
    });
});

// Add visible style once
const style = document.createElement('style');
style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);
