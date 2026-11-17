/**
 * Projects Showcase Module
 * Handles loading, rendering, interactive filtering, and modal detail inspection.
 */

let allProjects = [];

async function initProjectsSection() {
  try {
    const res = await fetch('data/projects.json');
    if (!res.ok) throw new Error('Could not load projects.json');
    allProjects = await res.json();
    renderProjectsMarkup();
  } catch (err) {
    console.error('Error in initProjectsSection:', err);
  }
}

function renderProjectsMarkup() {
  const container = document.getElementById('projects-container');
  if (!container) return;

  container.innerHTML = `
    <div class="projects-filter-bar">
      <button class="filter-btn active" data-filter="all">All Systems (${allProjects.length})</button>
      <button class="filter-btn" data-filter="genai">Generative AI & LLMs</button>
      <button class="filter-btn" data-filter="fullstack">Full-Stack & Cloud</button>
    </div>

    <div class="bento-projects-grid" id="projects-grid">
      ${renderProjectCards(allProjects)}
    </div>
  `;

  setupProjectFilters();
}

function renderProjectCards(list) {
  return list.map((p, idx) => {
    const isFeatured = idx === 0 ? 'featured-span' : '';
    return `
      <div class="project-bento-card ${isFeatured}" data-category="${p.category}">
        <div class="project-card-top">
          <div class="project-badge-row">
            <span class="project-category-tag">${p.categoryLabel}</span>
            <span class="project-feature-badge">${p.badge}</span>
          </div>

          <h3 class="project-card-title">${p.title}</h3>
          <p class="project-card-desc">${p.shortDescription}</p>

          <div class="project-metrics-pills">
            ${p.metrics.map(m => `
              <div class="project-metric-pill-item">
                <div class="p-metric-val">${m.value}</div>
                <div class="p-metric-lbl">${m.label}</div>
              </div>
            `).join('')}
          </div>

          <div class="project-tags-wrap">
            ${p.tags.map(t => `<span class="project-tech-tag">${t}</span>`).join('')}
          </div>
        </div>

        <div class="project-footer-actions">
          <button class="btn btn-outline btn-details" onclick="openProjectModal('${p.id}')">
            <span>Inspect System Details</span>
            <span>🔎</span>
          </button>
          <div style="display: flex; gap: 0.5rem;">
            <a href="${p.links.github}" target="_blank" rel="noopener noreferrer" class="social-icon-btn" title="View Source">
              <span>Code ↗</span>
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function setupProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const grid = document.getElementById('projects-grid');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      const filtered = filter === 'all' 
        ? allProjects 
        : allProjects.filter(p => p.category === filter);

      if (grid) {
        grid.innerHTML = renderProjectCards(filtered);
      }
    });
  });
}


/* Modal Dialog Management */

function openProjectModal(projectId) {
  const project = allProjects.find(p => p.id === projectId);
  if (!project) return;

  let modalBackdrop = document.getElementById('project-modal-backdrop');
  if (!modalBackdrop) {
    modalBackdrop = document.createElement('div');
    modalBackdrop.id = 'project-modal-backdrop';
    modalBackdrop.className = 'modal-backdrop';
    modalBackdrop.innerHTML = `
      <div class="modal-card" id="project-modal-card" role="dialog" aria-modal="true">
        <!-- Content injected dynamically -->
      </div>
    `;
    document.body.appendChild(modalBackdrop);

    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeProjectModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeProjectModal();
    });
  }

  const modalCard = document.getElementById('project-modal-card');
  modalCard.innerHTML = `
    <div class="modal-header">
      <div>
        <span class="project-category-tag">${project.categoryLabel}</span>
        <h3 class="modal-title" style="margin-top: 0.25rem;">${project.title}</h3>
      </div>
      <button class="modal-close-btn" onclick="closeProjectModal()" aria-label="Close dialog">&times;</button>
    </div>

    <div>
      <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.35rem;">System Architecture & Overview</h4>
      <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6;">${project.fullDescription}</p>
    </div>

    <div>
      <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">Key Performance Metrics</h4>
      <div class="project-metrics-pills">
        ${project.metrics.map(m => `
          <div class="project-metric-pill-item">
            <div class="p-metric-val">${m.value}</div>
            <div class="p-metric-lbl">${m.label}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <div>
      <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">Engineering Highlights</h4>
      <ul class="modal-highlights-list">
        ${project.highlights.map(h => `<li>${h}</li>`).join('')}
      </ul>
    </div>

    <div>
      <h4 style="font-size: 0.85rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 0.5rem;">Technologies Used</h4>
      <div class="project-tags-wrap">
        ${project.tags.map(t => `<span class="project-tech-tag">${t}</span>`).join('')}
      </div>
    </div>

    <div style="display: flex; justify-content: flex-end; gap: 0.75rem; padding-top: 1rem; border-top: 1px solid var(--border-color);">
      <button class="btn btn-outline" onclick="closeProjectModal()">Close</button>
      <a href="${project.links.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">View GitHub Repository ↗</a>
    </div>
  `;

  modalBackdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  const modalBackdrop = document.getElementById('project-modal-backdrop');
  if (modalBackdrop) {
    modalBackdrop.classList.remove('open');
  }
  document.body.style.overflow = '';
}
