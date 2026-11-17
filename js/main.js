/**
 * Main Application Module
 * Orchestrates portfolio rendering, data binding, and interactive components.
 */

let portfolioData = null;

async function loadPortfolioData() {
  try {
    const res = await fetch('data/profile.json');
    if (!res.ok) throw new Error('Failed to load profile.json');
    portfolioData = await res.json();
    initApp();
  } catch (err) {
    console.error('Error loading portfolio data:', err);
  }
}

function initApp() {
  if (!portfolioData) return;
  renderHero();
  renderHighlights();
  renderAbout();
  renderSkills();
  renderExperience();
  renderPatentAndResearch();
  renderProjects();
  renderTerminalSection();
  renderContact();
  renderFooter();
  
  // Re-run animation observers
  setupScrollAnimations();
}

function renderHero() {
  const main = document.getElementById('main-content');
  if (!main || !portfolioData) return;

  const { basics, education } = portfolioData;
  const edu = education[0];

  const heroHTML = `
    <section id="hero" class="hero-section">
      <div class="container hero-grid">
        <div class="hero-content">
          <div class="hero-status-pill">
            <span class="status-indicator"></span>
            <span>Available for New Roles &bull; ${edu.degree} (${edu.specialization})</span>
          </div>

          <h1 class="hero-title">
            Hi, I'm <span class="gradient-text">${basics.name}</span>.
            <br>Building Intelligent Systems.
          </h1>

          <p class="hero-subtitle">
            AI/ML Engineer & Full-Stack Developer specializing in Generative AI, Large Language Models, Computer Vision, and scalable cloud APIs. Published researcher and granted patent holder.
          </p>

          <div class="hero-cta-group">
            <a href="#projects" class="btn btn-primary">
              <span>Explore Projects</span>
              <span>&rarr;</span>
            </a>
            <a href="#contact" class="btn btn-outline">Get in Touch</a>
            <a href="mailto:${basics.email}" class="btn btn-outline" title="Email directly">
              <span>📧 Email</span>
            </a>
          </div>

          <div class="hero-social-links">
            <a href="${basics.linkedin}" target="_blank" rel="noopener noreferrer" class="social-icon-btn">
              <span>💼 LinkedIn</span>
            </a>
            <a href="${basics.github}" target="_blank" rel="noopener noreferrer" class="social-icon-btn">
              <span>🐙 GitHub</span>
            </a>
            <a href="tel:${basics.phone}" class="social-icon-btn">
              <span>📞 ${basics.phone}</span>
            </a>
          </div>
        </div>

        <div id="hero-highlights-container">
          <!-- Quick metric highlight cards injected in next commit -->
        </div>
      </div>
    </section>
  `;

  main.innerHTML = heroHTML;
}

function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', loadPortfolioData);
