// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
  updateActiveNav();
});

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = navbar.offsetHeight + 8;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
      document.getElementById('main-nav').classList.remove('open');
    }
  });
});

// ── SCROLL SPY ──
const spySections = [
  { id: 'inicio',      nav: 'nav-inicio' },
  { id: 'beneficios',  nav: 'nav-beneficios' },
  { id: 'testimonios', nav: 'nav-testimonios' },
  { id: 'demo',        nav: 'nav-demo' },
  { id: 'precios',     nav: 'nav-precios' },
  { id: 'acerca',      nav: 'nav-acerca' },
  { id: 'equipo',      nav: 'nav-equipo' },
  { id: 'faq',         nav: 'nav-faq' },
  { id: 'contacto',    nav: 'nav-contacto' },
];

function updateActiveNav() {
  const scrollY = window.scrollY + navbar.offsetHeight + 40;
  let current = spySections[0].nav;
  spySections.forEach(({ id, nav }) => {
    const el = document.getElementById(id);
    if (el && el.offsetTop <= scrollY) current = nav;
  });
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const activeEl = document.getElementById(current);
  if (activeEl) activeEl.classList.add('active');
}

// ── HAMBURGER ──
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('main-nav').classList.toggle('open');
});

// ── FAQ ACCORDION ──
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.faq-question').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      b.nextElementSibling.classList.remove('open');
    });
    if (!isOpen) {
      btn.setAttribute('aria-expanded', 'true');
      btn.nextElementSibling.classList.add('open');
    }
  });
});

// ── CONTACT FORM ──
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('btn-submit');
  btn.textContent = 'Enviando...';
  btn.disabled = true;
  setTimeout(() => {
    document.getElementById('form-success').classList.add('show');
    e.target.reset();
    btn.textContent = 'Envía un mensaje';
    btn.disabled = false;
    setTimeout(() => document.getElementById('form-success').classList.remove('show'), 5000);
  }, 1200);
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', updateActiveNav);
