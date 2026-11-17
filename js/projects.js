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
