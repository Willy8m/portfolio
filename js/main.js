// This file runs entirely in the visitor's browser. No server, no build step —
// just plain JavaScript that manipulates the HTML/CSS we already wrote.

// --------------------------------------------------------------------------
// 1. FOOTER YEAR
// Small but a nice habit: never hardcode a year you'll forget to update.
// --------------------------------------------------------------------------
document.getElementById('year').textContent = new Date().getFullYear();

// --------------------------------------------------------------------------
// 2. THEME TOGGLE
// Supports a light/dark switch with persistence across visits.
// --------------------------------------------------------------------------
const themeToggle = document.getElementById('themeToggle');
const themeLabel = themeToggle.querySelector('.theme-toggle__label');
const prefersLightScheme = window.matchMedia('(prefers-color-scheme: light)');
const storedTheme = localStorage.getItem('portfolio-theme');

function applyTheme(theme) {
  const isLight = theme === 'light';
  document.body.classList.toggle('light-theme', isLight);
  document.documentElement.style.colorScheme = isLight ? 'light' : 'dark';
  themeToggle.classList.toggle('is-active', isLight);
  themeToggle.setAttribute('aria-pressed', String(isLight));
  themeToggle.setAttribute('title', isLight ? 'Switch to dark mode' : 'Switch to light mode');
  themeLabel.textContent = isLight ? 'On' : 'Off';
  document.querySelector('meta[name="theme-color"]').setAttribute('content', isLight ? '#f7f4ee' : '#10151c');
}

if (storedTheme) {
  applyTheme(storedTheme);
} else {
  applyTheme(prefersLightScheme.matches ? 'light' : 'dark');
}

themeToggle.addEventListener('click', () => {
  const nextTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light';
  localStorage.setItem('portfolio-theme', nextTheme);
  applyTheme(nextTheme);
});

// --------------------------------------------------------------------------
// 3. MOBILE NAV TOGGLE
// The hamburger button adds/removes a CSS class; the actual show/hide
// behaviour lives in style.css (.nav__links.is-open). JS just flips the switch.
// --------------------------------------------------------------------------
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

// Close the mobile menu automatically after tapping a link
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', false);
  });
});

// --------------------------------------------------------------------------
// 4. SCROLL PROGRESS BAR + RIDGE-LINE DRAWING
// Both driven by the same number: how far down the page you've scrolled,
// as a percentage (0 to 100).
// --------------------------------------------------------------------------
const scrollProgress = document.getElementById('scrollProgress');
const ridgePath = document.getElementById('ridgePath');

// getTotalLength() asks the browser "how many pixels long is this squiggly
// line, if you straightened it out?" We need that number to set up the
// dash-based reveal trick.
const ridgeLength = ridgePath.getTotalLength();
ridgePath.style.strokeDasharray = ridgeLength;
ridgePath.style.strokeDashoffset = ridgeLength; // fully hidden at first

function updateScrollEffects() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;

  // Update the top progress bar's width
  scrollProgress.style.width = `${scrollPercent * 100}%`;

  // Reveal the ridge line a bit faster than full-page scroll, so it's
  // fully drawn by the time you've scrolled past the hero section (roughly
  // the first ~60% of one screen height).
  const heroScrollWindow = window.innerHeight * 0.6;
  const ridgeProgress = Math.min(scrollTop / heroScrollWindow, 1);
  ridgePath.style.strokeDashoffset = ridgeLength * (1 - ridgeProgress);
}

// 'scroll' fires very frequently, so listen with { passive: true } —
// tells the browser we won't block scrolling, which keeps things smooth.
window.addEventListener('scroll', updateScrollEffects, { passive: true });
updateScrollEffects(); // run once immediately, in case the page loads pre-scrolled

// --------------------------------------------------------------------------
// 5. FADE-IN-ON-SCROLL (IntersectionObserver)
// Rather than checking scroll position manually for every element (slow,
// fiddly math), IntersectionObserver lets the browser tell us efficiently
// when an element enters the viewport.
// --------------------------------------------------------------------------
const revealTargets = document.querySelectorAll(
  '.about__grid, .skills__grid, .work__grid, .trail__timeline, .contact__inner'
);
revealTargets.forEach((el) => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // only animate once
      }
    });
  },
  { threshold: 0.15 } // fire when 15% of the element is visible
);

revealTargets.forEach((el) => observer.observe(el));
