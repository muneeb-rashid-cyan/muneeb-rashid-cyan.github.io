'use strict';

// All content and project disclosures work without JavaScript.
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#primary-nav');
const mobile = window.matchMedia('(max-width: 650px)');

function closeMenu(returnFocus = false) {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.querySelector('span').textContent = '+';
  nav.hidden = mobile.matches;
  if (returnFocus) menuButton.focus();
}
function syncMenu() {
  const focusedInside = nav.contains(document.activeElement);
  menuButton.hidden = !mobile.matches;
  closeMenu(mobile.matches && focusedInside);
}
syncMenu();
mobile.addEventListener('change', syncMenu);
menuButton.addEventListener('click', () => {
  const opening = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(opening));
  menuButton.querySelector('span').textContent = opening ? '−' : '+';
  nav.hidden = !opening;
});
nav.addEventListener('click', event => {
  const link = event.target.closest('a[href^="#"]');
  if (!link || !mobile.matches) return;
  closeMenu();
  const target = document.querySelector(link.getAttribute('href'));
  if (target) {
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && mobile.matches && !nav.hidden) closeMenu(true);
});
document.addEventListener('click', event => {
  if (mobile.matches && !nav.hidden && !event.target.closest('.site-header')) closeMenu();
});
document.addEventListener('focusin', event => {
  if (mobile.matches && !nav.hidden && !event.target.closest('.site-header')) closeMenu();
});

const filters = document.querySelector('.project-filters');
const cards = [...document.querySelectorAll('.project-card')];
filters.hidden = false;
filters.addEventListener('click', event => {
  const button = event.target.closest('[data-filter]');
  if (!button) return;
  filters.querySelectorAll('button').forEach(filter => {
    const active = filter === button;
    filter.classList.toggle('active', active);
    filter.setAttribute('aria-pressed', String(active));
  });
  cards.forEach(card => {
    card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
  });
  const count = cards.filter(card => !card.hidden).length;
  document.querySelector('#filter-status').textContent = `${count} ${count === 1 ? 'project' : 'projects'} shown.`;
});

const copyButton = document.querySelector('.copy-email');
const copyStatus = document.querySelector('#copy-status');
if (navigator.clipboard && window.isSecureContext) {
  copyButton.hidden = false;
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('muneebcyan@gmail.com');
      copyStatus.textContent = 'Email address copied.';
    } catch {
      copyStatus.textContent = 'Copy unavailable. Select muneebcyan@gmail.com or use the email link.';
    }
  });
}

if ('IntersectionObserver' in window) {
  // Content starts visible; animation never gates access to the portfolio.
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const reveal = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      if (!motion.matches) entry.target.classList.add('reveal-in');
      reveal.unobserve(entry.target);
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.project-card, .expertise-card, .experience-row').forEach(item => reveal.observe(item));
  const links = [...nav.querySelectorAll('a[href^="#"]')];
  const visible = new Set();
  const sections = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.isIntersecting ? visible.add(entry.target.id) : visible.delete(entry.target.id));
    const active = links.find(link => visible.has(link.hash.slice(1)));
    links.forEach(link => {
      if (link === active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-15% 0px -45% 0px', threshold: 0 });
  links.forEach(link => {
    const section = document.querySelector(link.hash);
    if (section) sections.observe(section);
  });
}
document.querySelector('#year').textContent = new Date().getFullYear();
