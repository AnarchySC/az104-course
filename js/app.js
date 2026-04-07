// ============================================
// AZ-104 Course - Interactive Functionality
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initTaskToggles();
  initHints();
  initProgress();
});

// Tab switching
function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.closest('.tab-container');
      group.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      group.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab).classList.add('active');
    });
  });
}

// Collapsible task blocks
function initTaskToggles() {
  document.querySelectorAll('.task-header').forEach(header => {
    header.addEventListener('click', () => {
      header.closest('.task-block').classList.toggle('open');
    });
  });
  // Open first task by default
  const first = document.querySelector('.tab-content.active .task-block');
  if (first) first.classList.add('open');
}

// Hint reveal
function initHints() {
  document.querySelectorAll('.hint').forEach(hint => {
    hint.addEventListener('click', () => hint.classList.toggle('revealed'));
  });
}

// Progress tracking with localStorage
function initProgress() {
  const pageId = document.body.dataset.module || 'index';
  document.querySelectorAll('.completion-check').forEach(cb => {
    const key = `az104_${pageId}_${cb.dataset.task}`;
    cb.checked = localStorage.getItem(key) === 'true';
    cb.addEventListener('change', () => {
      localStorage.setItem(key, cb.checked);
      updateProgressBar(pageId);
    });
  });
  updateProgressBar(pageId);
}

function updateProgressBar(pageId) {
  const checks = document.querySelectorAll('.completion-check');
  if (!checks.length) return;
  const done = [...checks].filter(c => c.checked).length;
  const pct = Math.round((done / checks.length) * 100);
  const bar = document.querySelector('.progress-bar');
  if (bar) bar.style.width = pct + '%';
  const label = document.querySelector('.progress-label');
  if (label) label.textContent = `${done}/${checks.length} completed`;
}

// Global progress for index page
function getOverallProgress() {
  let total = 0, done = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('az104_')) {
      total++;
      if (localStorage.getItem(key) === 'true') done++;
    }
  }
  return total ? Math.round((done / total) * 100) : 0;
}
