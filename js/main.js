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

function renderExperience() {
  const main = document.getElementById('main-content');
  if (!main || !portfolioData) return;

  const { experience } = portfolioData;

  const expSection = document.createElement('section');
  expSection.id = 'experience';
  expSection.className = 'section';
  expSection.innerHTML = `
    <div class="container">
      <div class="section-title-wrap">
        <span class="section-badge">Career Track</span>
        <h2 class="section-title">Professional Experience</h2>
        <p class="section-subtitle">Real-world AI engineering, domain-specific LLM dataset curation, and edge IoT deployment.</p>
      </div>

      <div class="experience-timeline">
        ${experience.map(item => `
          <div class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-card">
              <div class="timeline-header">
                <div>
                  <div class="timeline-role">${item.role}</div>
                  <div class="timeline-company">${item.company}</div>
                </div>
                <div class="timeline-meta">
                  <span class="timeline-period-badge">📅 ${item.period}</span>
                  <span>📍 ${item.location}</span>
                </div>
              </div>

              <ul class="timeline-list">
                ${item.highlights.map(hl => `<li>${hl}</li>`).join('')}
              </ul>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  main.appendChild(expSection);
}

function renderPatentAndResearch() {
  const main = document.getElementById('main-content');
  if (!main || !portfolioData) return;

  const prSection = document.createElement('section');
  prSection.id = 'patent';
  prSection.className = 'section';
  prSection.innerHTML = `
    <div class="container">
      <div class="section-title-wrap">
        <span class="section-badge">Intellectual Property & Discovery</span>
        <h2 class="section-title">Patent & Research Innovations</h2>
        <p class="section-subtitle">Pioneering applied deep learning solutions with official patent recognition and peer-reviewed scientific contributions.</p>
      </div>

      <!-- Granted Patent Spotlight Card -->
      <div class="spotlight-card">
        <div class="spotlight-header">
          <span class="patent-granted-badge">
            <span>🛡️</span> Granted Patent
          </span>
          <span class="highlights-tag">Agricultural Tech Innovation</span>
        </div>

        <h3 class="spotlight-title">Automated Spraying System</h3>
        <p class="spotlight-desc">
          An intelligent automated agricultural system designed to optimize pesticide and fertilizer dispensing using real-time crop disease detection. By pairing a DenseNetV2 deep neural network running directly on a Raspberry Pi 4 edge device with precision actuator controls, the system dynamically targets diseased areas rather than blanket spraying.
        </p>

        <div class="spotlight-metrics-row">
          <div class="spotlight-metric-item">
            <span class="spotlight-metric-number">+20%</span>
            <span class="spotlight-metric-text">Automation Efficiency Gain</span>
          </div>
          <div class="spotlight-metric-item">
            <span class="spotlight-metric-number">92%</span>
            <span class="spotlight-metric-text">Crop Disease Detection Accuracy</span>
          </div>
          <div class="spotlight-metric-item">
            <span class="spotlight-metric-number">Edge IoT</span>
            <span class="spotlight-metric-text">Deployed on Raspberry Pi 4</span>
          </div>
        </div>
      </div>

      <div id="research-publication-container">
        <!-- Published Research Paper Card -->
        <div class="research-card">
          <div class="research-header">
            <span class="publication-badge">
              <span>📚</span> Peer-Reviewed Publication
            </span>
            <span class="citation-counter">
              <span>🌟</span> 3+ Citations
            </span>
          </div>

          <h3 class="research-title">
            Towards Automated Crop Protection: Fusion of DenseNet121-ResNet50 model for Disease Detection and Pest Recognition
          </h3>

          <div class="research-mentors">
            <strong>Advisory / Mentorship:</strong> Under the guidance of Dr. Anil Kumar Yadav and Mr. Shiv Shankar Prasad Shukla
          </div>

          <p class="research-abstract">
            This study proposes a high-performing hybrid convolutional neural network fusion architecture. By combining DenseNet121’s tight feature reuse with ResNet50’s residual gradient flow, the pipeline achieves robust multi-class plant leaf disease classification and pest identification even under severe field conditions, occlusions, and dynamic illumination.
          </p>

          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <span class="skill-pill">DenseNet121</span>
            <span class="skill-pill">ResNet50</span>
            <span class="skill-pill">Ensemble Deep Learning</span>
            <span class="skill-pill">Computer Vision</span>
            <span class="skill-pill">IoT Edge Compute</span>
          </div>
        </div>
      </div>
    </div>
  `;

  main.appendChild(prSection);
}

function renderProjects() {
  const main = document.getElementById('main-content');
  if (!main) return;

  const projectsSection = document.createElement('section');
  projectsSection.id = 'projects';
  projectsSection.className = 'section';
  projectsSection.innerHTML = `
    <div class="container">
      <div class="section-title-wrap">
        <span class="section-badge">Engineering Portfolio</span>
        <h2 class="section-title">Featured Projects & Systems</h2>
        <p class="section-subtitle">Real-world full-stack architectures, LLM prompt engineering, and cloud services.</p>
      </div>

      <div id="projects-container">
        <!-- Rendered by js/projects.js -->
      </div>
    </div>
  `;

  main.appendChild(projectsSection);
  initProjectsSection();
}

function renderTerminalSection() {
  const main = document.getElementById('main-content');
  if (!main) return;

  const termSection = document.createElement('section');
  termSection.id = 'terminal';
  termSection.className = 'section';
  termSection.innerHTML = `
    <div class="container">
      <div class="section-title-wrap">
        <span class="section-badge">Interactive Console</span>
        <h2 class="section-title">Developer Terminal</h2>
        <p class="section-subtitle">Prefer the command line? Query Yashashvi's portfolio credentials and systems directly.</p>
      </div>

      <div class="terminal-box" id="terminal-box">
        <div class="terminal-header-bar">
          <div class="terminal-dots">
            <span class="terminal-dot red"></span>
            <span class="terminal-dot yellow"></span>
            <span class="terminal-dot green"></span>
          </div>
          <div class="terminal-tab-title">
            <span>bash &bull; yashashvi@portfolio: ~</span>
          </div>
          <div style="font-size: 0.75rem; color: #64748b;">CLI v1.0</div>
        </div>

        <div class="terminal-body" id="terminal-body">
          <div id="terminal-output-container"></div>
          <div class="terminal-input-row">
            <span class="terminal-prompt">guest@yashashvi:~$</span>
            <input type="text" id="terminal-input" class="terminal-input" autocomplete="off" spellcheck="false" placeholder="Type 'help' and press Enter..." aria-label="Terminal command input">
          </div>
        </div>
      </div>
    </div>
  `;

  main.appendChild(termSection);
  initTerminal();
}

function renderContact() {
  const main = document.getElementById('main-content');
  if (!main || !portfolioData) return;

  const { basics } = portfolioData;

  const contactSection = document.createElement('section');
  contactSection.id = 'contact';
  contactSection.className = 'section';
  contactSection.innerHTML = `
    <div class="container">
      <div class="section-title-wrap">
        <span class="section-badge">Get In Touch</span>
        <h2 class="section-title">Let's Connect & Collaborate</h2>
        <p class="section-subtitle">Whether exploring AI/ML engineering roles, research inquiries, or technical projects—my inbox is always open.</p>
      </div>

      <div class="contact-grid">
        <div class="contact-info-card">
          <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary);">Direct Channels</h3>
          <p style="font-size: 0.925rem; color: var(--text-secondary); line-height: 1.6;">
            Feel free to reach out directly via email, phone, or LinkedIn. I typically respond within 24 hours.
          </p>

          <div class="contact-channels-list">
            <a href="mailto:${basics.email}" class="contact-channel-item">
              <div class="contact-channel-icon">📧</div>
              <div>
                <div class="contact-channel-label">Email</div>
                <div class="contact-channel-val">${basics.email}</div>
              </div>
            </a>

            <a href="tel:${basics.phone}" class="contact-channel-item">
              <div class="contact-channel-icon">📞</div>
              <div>
                <div class="contact-channel-label">Phone</div>
                <div class="contact-channel-val">${basics.phone}</div>
              </div>
            </a>

            <a href="${basics.linkedin}" target="_blank" rel="noopener noreferrer" class="contact-channel-item">
              <div class="contact-channel-icon">💼</div>
              <div>
                <div class="contact-channel-label">LinkedIn</div>
                <div class="contact-channel-val">yashashvi-srivastava</div>
              </div>
            </a>

            <a href="${basics.github}" target="_blank" rel="noopener noreferrer" class="contact-channel-item">
              <div class="contact-channel-icon">🐙</div>
              <div>
                <div class="contact-channel-label">GitHub</div>
                <div class="contact-channel-val">@yashashvisri</div>
              </div>
            </a>
          </div>
        </div>

        <div class="contact-form-box">
          <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary);">Send a Message</h3>
          <form id="portfolio-contact-form" novalidate>
            <div class="form-group">
              <label for="contact-name" class="form-label">Your Name</label>
              <input type="text" id="contact-name" class="form-input" placeholder="e.g. Alex Johnson" required>
            </div>

            <div class="form-group" style="margin-top: 1rem;">
              <label for="contact-email" class="form-label">Your Email</label>
              <input type="email" id="contact-email" class="form-input" placeholder="e.g. alex@example.com" required>
            </div>

            <div class="form-group" style="margin-top: 1rem;">
              <label for="contact-subject" class="form-label">Subject</label>
              <input type="text" id="contact-subject" class="form-input" placeholder="e.g. AI Engineering Opportunity / Collaboration" required>
            </div>

            <div class="form-group" style="margin-top: 1rem;">
              <label for="contact-message" class="form-label">Message</label>
              <textarea id="contact-message" class="form-textarea" placeholder="Hello Yashashvi, I'd like to discuss..." required></textarea>
            </div>

            <div style="margin-top: 1.5rem;">
              <button type="submit" id="contact-submit-btn" class="btn btn-primary" style="width: 100%;">
                <span>Send Message</span>
                <span>🚀</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;

  main.appendChild(contactSection);
  initContactForm();
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
