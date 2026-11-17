/**
 * Navigation Module
 * Renders the responsive header and handles mobile drawer, active states, and scroll spying.
 */

function renderHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  header.innerHTML = `
    <div class="nav-container">
      <a href="#hero" class="brand-logo" aria-label="Yashashvi Srivastava Homepage">
        <span class="brand-monogram">Y</span>
        <span>Yashashvi<span class="brand-text-accent">.dev</span></span>
      </a>

      <nav class="nav-menu" id="nav-menu" aria-label="Main Navigation">
        <a href="#about" class="nav-link">About</a>
        <a href="#skills" class="nav-link">Skills</a>
        <a href="#experience" class="nav-link">Experience</a>
        <a href="#patent" class="nav-link">Patent & Research</a>
        <a href="#projects" class="nav-link">Projects</a>
        <a href="#terminal" class="nav-link">Terminal</a>
        <a href="#contact" class="nav-link">Contact</a>
      </nav>

      <div class="nav-actions">
        <button id="theme-toggle" class="theme-toggle-btn" aria-label="Toggle dark/light theme" title="Toggle theme">
          <span class="theme-icon">🌙</span>
        </button>
        <a href="#contact" class="btn btn-primary" style="display: none;" id="nav-cta-btn">Let's Talk</a>
        <button class="mobile-nav-toggle" id="mobile-nav-toggle" aria-label="Toggle navigation menu" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  `;

  setupNavInteractions();
}

function setupNavInteractions() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', isOpen);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Scroll spy for active link highlight
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 100;
    const sections = document.querySelectorAll('section[id]');

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(l => l.classList.remove('active'));
        if (activeLink) activeLink.classList.add('active');
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', renderHeader);


/* Scroll Progress & Scroll to Top Button */

function initScrollHelpers() {
  const progressBar = document.getElementById('scroll-progress');
  
  // Inject scroll-to-top button
  const scrollBtn = document.createElement('button');
  scrollBtn.id = 'scroll-to-top';
  scrollBtn.className = 'scroll-to-top-btn';
  scrollBtn.setAttribute('aria-label', 'Scroll to top of page');
  scrollBtn.innerHTML = '↑';
  document.body.appendChild(scrollBtn);

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;

    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    if (scrollTop > 400) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });
}

document.addEventListener('DOMContentLoaded', initScrollHelpers);
