/**
 * Contact Form Module
 * Handles client-side validation, user feedback toasts, and mailto redirection.
 */

function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !subject || !message) {
      showToast('Please fill in all fields before sending.', 'error');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showToast('Please provide a valid email address.', 'error');
      return;
    }

    // Success response: Open mailto link as direct fall-through
    const submitBtn = document.getElementById('contact-submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Opening Email Client...</span> ✉️';
    submitBtn.disabled = true;

    showToast('Message composed! Launching email client...', 'success');

    setTimeout(() => {
      const mailtoUrl = `mailto:yashashvisrivastava674@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hi Yashashvi,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
      window.location.href = mailtoUrl;

      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      form.reset();
    }, 1200);
  });
}

function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✅' : '⚠️'}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 4000);
}
