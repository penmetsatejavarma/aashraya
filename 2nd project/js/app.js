/* ============================================================
   SURAKSHA CIRCLE – app.js
   Global: toast notifications, modals, language toggle, header
   ============================================================ */

/* ---------- Toast System ---------- */
function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = {
    success: 'fa-circle-check',
    warning: 'fa-triangle-exclamation',
    error: 'fa-circle-xmark',
    info: 'fa-circle-info'
  };

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="fas ${icons[type]}"></i>
    <span class="toast-message">${message}</span>
    <button class="toast-close" onclick="this.parentElement.classList.add('toast-exit'); setTimeout(() => this.parentElement.remove(), 300);">
      <i class="fas fa-xmark"></i>
    </button>
  `;

  container.appendChild(toast);

  // Auto dismiss after 4 seconds
  setTimeout(() => {
    if (toast.parentElement) {
      toast.classList.add('toast-exit');
      setTimeout(() => toast.remove(), 300);
    }
  }, 4000);
}

/* ---------- Modal System ---------- */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Close modal on overlay click
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const activeModal = document.querySelector('.modal-overlay.active');
    if (activeModal) {
      activeModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
});

/* ---------- Language Toggle ---------- */
function getLanguage() {
  return localStorage.getItem('suraksha-lang') || 'en';
}

function setLanguage(lang) {
  localStorage.setItem('suraksha-lang', lang);
  applyLanguage(lang);
}

function applyLanguage(lang) {
  // Update toggle buttons
  document.querySelectorAll('.lang-toggle button').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.lang === lang) btn.classList.add('active');
  });

  // Apply translations
  if (lang === 'te' && typeof teluguTranslations !== 'undefined') {
    document.querySelectorAll('[data-translate]').forEach(el => {
      const key = el.dataset.translate;
      if (teluguTranslations[key]) {
        el.textContent = teluguTranslations[key];
      }
    });
  } else {
    document.querySelectorAll('[data-translate]').forEach(el => {
      const key = el.dataset.translate;
      el.textContent = key;
    });
  }
}

/* ---------- Profile Dropdown ---------- */
function initProfileDropdown() {
  const avatar = document.querySelector('.profile-avatar');
  const dropdown = document.querySelector('.dropdown-menu');

  if (avatar && dropdown) {
    avatar.addEventListener('click', function(e) {
      e.stopPropagation();
      dropdown.classList.toggle('active');
    });

    document.addEventListener('click', function() {
      dropdown.classList.remove('active');
    });
  }
}

/* ---------- Scroll Fade-In Observer ---------- */
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.fade-on-scroll').forEach(el => observer.observe(el));
}

/* ---------- Sidebar Toggle ---------- */
function initSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const toggleBtn = document.querySelector('.sidebar-toggle-btn');

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', function() {
      sidebar.classList.toggle('collapsed');
    });
  }
}

/* ---------- Animated Count Up ---------- */
function animateCountUp(element, target, duration = 1000) {
  let start = 0;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(easeOut * target);

    element.textContent = current.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target.toLocaleString();
    }
  }

  requestAnimationFrame(update);
}

/* ---------- Role-based redirect ---------- */
function redirectToDashboard(role) {
  const routes = {
    'senior': 'senior.html',
    'caregiver': 'caregiver.html',
    'volunteer': 'volunteer.html',
    'admin': 'admin.html'
  };
  window.location.href = routes[role] || 'senior.html';
}

/* ---------- Logout ---------- */
function logout() {
  localStorage.removeItem('suraksha-role');
  window.location.href = 'index.html';
}

/* ---------- Global Init ---------- */
document.addEventListener('DOMContentLoaded', function() {
  // Init language
  const lang = getLanguage();
  applyLanguage(lang);

  // Bind language toggle buttons
  document.querySelectorAll('.lang-toggle button').forEach(btn => {
    btn.addEventListener('click', function() {
      setLanguage(this.dataset.lang);
    });
  });

  // Init global features
  initProfileDropdown();
  initScrollAnimations();
  initSidebar();
});
