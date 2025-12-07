// INITIAL THEME SETUP
(function () {
  const storedTheme = localStorage.getItem('theme');
  const prefersDark =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;
  const html = document.documentElement;

  if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }
})();

// Theme toggle button
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-toggle-icon');
const themeText = document.getElementById('theme-toggle-text');

function updateThemeToggleUI() {
  const isDark = document.documentElement.classList.contains('dark');
  if (isDark) {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    if (themeText) themeText.textContent = 'Light';
  } else {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
    if (themeText) themeText.textContent = 'Dark';
  }
}

updateThemeToggleUI();

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const html = document.documentElement;
    const isDarkNow = html.classList.toggle('dark');
    localStorage.setItem('theme', isDarkNow ? 'dark' : 'light');
    updateThemeToggleUI();
  });
}

// Scroll reveal using IntersectionObserver
const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => observer.observe(el));
} else {
  // Fallback: show all
  revealElements.forEach((el) => el.classList.add('reveal-visible'));
}

// Footer year
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
