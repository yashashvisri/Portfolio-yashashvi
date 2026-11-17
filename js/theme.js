/**
 * Theme Management Module
 * Supports automatic system preference, user toggling, and localStorage persistence.
 */

(function () {
  const THEME_KEY = 'portfolio_theme';
  const html = document.documentElement;

  // Determine initial theme
  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);

    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#090d16' : '#f8fafc');
    }

    // Update toggle icons
    const icons = document.querySelectorAll('.theme-icon');
    icons.forEach(icon => {
      icon.textContent = theme === 'dark' ? '🌙' : '☀️';
    });
  }

  // Initialize immediately to prevent flash
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  // Bind click event once DOM is ready
  window.addEventListener('DOMContentLoaded', () => {
    applyTheme(getPreferredTheme());

    document.addEventListener('click', (e) => {
      const toggle = e.target.closest('#theme-toggle');
      if (!toggle) return;

      const current = html.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });

    // Listen to OS theme changes if user hasn't explicitly set one
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(THEME_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  });
})();
