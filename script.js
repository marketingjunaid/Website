/* =============================================
   script.js — M. Junaid Ashraf Personal Website
   ============================================= */

'use strict';

/* ---- Navbar: scroll effect + active link ---- */
const navbar  = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

function onScroll() {
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveLink();
}

function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';

  sections.forEach(section => {
    const sectionTop    = section.offsetTop - 120;
    const sectionBottom = sectionTop + section.offsetHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---- Mobile nav toggle ---- */
const navToggle   = document.getElementById('navToggle');
const navLinksList = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinksList.classList.toggle('open');
});

// Close menu on link click
navLinksList.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinksList.classList.remove('open');
  });
});

/* ---- Hero fade-in on load ---- */
window.addEventListener('load', () => {
  document.querySelectorAll('.fade-in').forEach(el => {
    el.classList.add('visible');
  });
});

/* ---- Scroll reveal (Intersection Observer) ---- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger cards within the same parent
        const siblings = entry.target.parentElement.querySelectorAll('.reveal');
        let delay = 0;
        siblings.forEach((sib, idx) => {
          if (sib === entry.target) delay = idx;
        });
        entry.target.style.transitionDelay = `${Math.min(delay * 0.07, 0.35)}s`;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

/* ---- Lead Magnet Form ---- */
const leadForm    = document.getElementById('leadForm');
const leadSuccess = document.getElementById('leadSuccess');

if (leadForm) {
  leadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = leadForm.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    // Simulate async action
    setTimeout(() => {
      leadForm.style.display = 'none';
      leadSuccess.classList.add('visible');
    }, 700);
  });
}

/* ---- Contact Form ---- */
const contactForm    = document.getElementById('contactForm');
const contactSuccess = document.getElementById('contactSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    setTimeout(() => {
      contactForm.style.display = 'none';
      contactSuccess.classList.add('visible');
    }, 700);
  });
}

/* ---- Smooth scroll polyfill for in-page links ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
