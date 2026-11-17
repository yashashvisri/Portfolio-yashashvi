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

function renderHighlights() {
  const container = document.getElementById('hero-highlights-container');
  if (!container || !portfolioData) return;

  container.innerHTML = `
    <div class="hero-highlights-box">
      <div class="highlights-header">
        <span class="highlights-title">Key Engineering Credentials</span>
        <span class="highlights-tag">Verified</span>
      </div>

      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-value gradient-text">8.67</div>
          <div class="metric-label">CGPA / 10</div>
          <div class="metric-sub">Top 10% of class, VIT Bhopal</div>
        </div>

        <div class="metric-card">
          <div class="metric-value">1 Patent</div>
          <div class="metric-label">Granted Patent</div>
          <div class="metric-sub">Automated Spraying System</div>
        </div>

        <div class="metric-card">
          <div class="metric-value">Published</div>
          <div class="metric-label">Deep Learning Paper</div>
          <div class="metric-sub">DenseNet + ResNet Fusion (3+ Citations)</div>
        </div>

        <div class="metric-card">
          <div class="metric-value">99%</div>
          <div class="metric-label">Cloud API Uptime</div>
          <div class="metric-sub">Render &bull; 300+ Daily Requests</div>
        </div>
      </div>

      <div class="highlights-footer">
        <span>📍 Based in India</span>
        <span class="highlights-tag">Open to Opportunities</span>
      </div>
    </div>
  `;
}

function renderAbout() {
  const main = document.getElementById('main-content');
  if (!main || !portfolioData) return;

  const { basics, education } = portfolioData;
  const edu = education[0];

  const aboutSection = document.createElement('section');
  aboutSection.id = 'about';
  aboutSection.className = 'section';
  aboutSection.innerHTML = `
    <div class="container">
      <div class="section-title-wrap">
        <span class="section-badge">Background & Education</span>
        <h2 class="section-title">Engineering Intelligence, Designing Impact</h2>
        <p class="section-subtitle">A blend of academic rigor, applied AI research, and end-to-end full stack development.</p>
      </div>

      <div class="about-grid">
        <div class="about-card">
          <h3 class="text-xl font-bold" style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary);">About Me</h3>
          <div class="about-bio-text">
            <p>
              I am an AI/ML Engineer and undergraduate in Computer Science with a specialization in Artificial Intelligence & Machine Learning at <strong>VIT Bhopal University</strong>.
            </p>
            <p>
              My expertise spans the entire machine learning lifecycle—from curating proprietary datasets and fine-tuning Large Language Models for domain-specific tasks to architecting real-time computer vision models on edge IoT devices (Raspberry Pi 4) and building responsive, resilient web applications with FastAPI, Flask, and React.
            </p>
            <p>
              As a published researcher and patent recipient in automated precision agriculture, I thrive at the intersection of deep theoretical research and production-grade software engineering.
            </p>
          </div>
        </div>

        <div class="about-card">
          <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary);">Academic Foundation</h3>
          <div class="edu-timeline-card">
            <div class="edu-title">${edu.degree}</div>
            <div class="edu-institution">${edu.institution}</div>
            <div class="edu-meta">
              <span>📅 ${edu.startDate} – ${edu.endDate}</span>
              <span>📍 Bhopal, India</span>
            </div>
            <div style="margin-top: 0.5rem; display: flex; flex-wrap: wrap; gap: 0.5rem;">
              <span class="edu-badge">⭐ ${edu.score}</span>
              <span class="edu-badge">🏆 Top 10% of Class</span>
            </div>
            <p style="font-size: 0.875rem; color: var(--text-secondary); margin-top: 0.5rem;">
              Specialized coursework in Deep Learning, Computer Vision, Artificial Intelligence, Natural Language Processing, and Distributed Systems.
            </p>
          </div>

          <div style="padding: 1.25rem; background: var(--bg-accent); border: 1px solid var(--border-color); border-radius: var(--radius-lg);">
            <div style="font-weight: 700; font-size: 0.95rem; color: var(--text-primary); margin-bottom: 0.35rem;">🤝 Leadership & Mentorship</div>
            <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">
              Led an R&D team of 10+ members and conducted technical workshops on IoT and ML integration, fostering collaborative learning and innovation.
            </p>
          </div>
        </div>
      </div>
    </div>
  `;

  main.appendChild(aboutSection);
}

function renderSkills() {
  const main = document.getElementById('main-content');
  if (!main || !portfolioData) return;

  const { skills } = portfolioData;

  const skillsSection = document.createElement('section');
  skillsSection.id = 'skills';
  skillsSection.className = 'section';
  skillsSection.innerHTML = `
    <div class="container">
      <div class="section-title-wrap">
        <span class="section-badge">Technical Repertoire</span>
        <h2 class="section-title">Skills & Tooling Matrix</h2>
        <p class="section-subtitle">A battle-tested stack for machine learning, deep learning research, and modern web application engineering.</p>
      </div>

      <div class="skills-grid">
        <!-- Category 1: AI & ML -->
        <div class="skill-category-card">
          <div class="skill-category-header">
            <div class="skill-cat-icon">🧠</div>
            <div class="skill-cat-title">AI & Deep Learning</div>
          </div>
          <div class="skill-pills-list">
            ${skills.ai_ml.map(s => `<span class="skill-pill">${s}</span>`).join('')}
          </div>
        </div>

        <!-- Category 2: Programming Languages -->
        <div class="skill-category-card">
          <div class="skill-category-header">
            <div class="skill-cat-icon">💻</div>
            <div class="skill-cat-title">Languages</div>
          </div>
          <div class="skill-pills-list">
            ${skills.languages.map(s => `<span class="skill-pill">${s}</span>`).join('')}
          </div>
        </div>

        <!-- Category 3: Web & Cloud Frameworks -->
        <div class="skill-category-card">
          <div class="skill-category-header">
            <div class="skill-cat-icon">⚡</div>
            <div class="skill-cat-title">Web & Cloud Backend</div>
          </div>
          <div class="skill-pills-list">
            ${skills.web_frameworks.map(s => `<span class="skill-pill">${s}</span>`).join('')}
          </div>
        </div>

        <!-- Category 4: Hardware & DevOps -->
        <div class="skill-category-card">
          <div class="skill-category-header">
            <div class="skill-cat-icon">🛠️</div>
            <div class="skill-cat-title">IoT, Hardware & DevOps</div>
          </div>
          <div class="skill-pills-list">
            ${skills.tools_hardware.map(s => `<span class="skill-pill">${s}</span>`).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  main.appendChild(skillsSection);
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
