/* Secret Garden Lab — interactive enhancements */

// Animated stat counters
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current).toLocaleString();
      if (current >= target) clearInterval(timer);
    }, 16);
  });
}

// Trigger counters when stats bar scrolls into view
const statsBar = document.querySelector('.stats-bar');
if (statsBar) {
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      animateCounters();
      observer.disconnect();
    }
  }, { threshold: 0.5 });
  observer.observe(statsBar);
}

// Randomly twitch dial needles
document.querySelectorAll('.dial-needle').forEach(needle => {
  setInterval(() => {
    const base = parseFloat(getComputedStyle(needle.closest('.dial').querySelector('svg')).getPropertyValue('--pct') || 0.5);
    const jitter = (Math.random() - 0.5) * 0.04;
    const pct = Math.max(0.05, Math.min(0.95, base + jitter));
    needle.style.transform = `rotate(${pct * 270 - 135}deg)`;
  }, 700 + Math.random() * 600);
});

// Random glitch flicker on hero title span
const heroSpan = document.querySelector('.hero-title span');
if (heroSpan) {
  heroSpan.dataset.text = heroSpan.textContent;
  setInterval(() => {
    if (Math.random() < 0.15) {
      heroSpan.style.transform = `translateX(${(Math.random()-0.5)*4}px)`;
      setTimeout(() => { heroSpan.style.transform = ''; }, 80);
    }
  }, 400);
}

// Keyboard easter egg: typing "SECRET" triggers a flash
let keyBuffer = '';
document.addEventListener('keydown', e => {
  keyBuffer = (keyBuffer + e.key.toUpperCase()).slice(-6);
  if (keyBuffer === 'SECRET') {
    document.body.style.transition = 'background 0.1s';
    document.body.style.background = '#e50000';
    setTimeout(() => { document.body.style.background = ''; }, 150);
    setTimeout(() => { document.body.style.background = '#e50000'; }, 250);
    setTimeout(() => { document.body.style.background = ''; }, 350);
  }
});

// Contact form submission feedback
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.btn');
    const original = btn.textContent;
    btn.textContent = '✓ TRANSMISSION RECEIVED';
    btn.style.background = '#00aa66';
    btn.style.borderColor = '#00aa66';
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      btn.style.borderColor = '';
    }, 3000);
  });
}
