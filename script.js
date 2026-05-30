/* ─── LOADER ─── */
(function () {
  const loader = document.getElementById('loader');
  const loaderInitials = document.getElementById('loaderInitials');
  const loaderProgress = document.getElementById('loaderProgress');

  // Show initials
  setTimeout(() => loaderInitials.classList.add('show') || (loaderInitials.style.opacity = '1', loaderInitials.style.transform = 'translateY(0)'), 100);
  // Animate bar
  setTimeout(() => { loaderProgress.style.width = '100%'; }, 200);
  // Hide loader
  setTimeout(() => {
    loader.classList.add('hidden');
    initAnimations();
  }, 1800);
})();

/* ─── CURSOR GLOW ─── */
const cursorGlow = document.getElementById('cursorGlow');
if (window.innerWidth >= 768) {
  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  });
}

/* ─── SCROLL PROGRESS ─── */
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = (scrollTop / docHeight) * 100;
  document.getElementById('scroll-progress').style.width = pct + '%';
});

/* ─── HAMBURGER ─── */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ─── ACTIVE NAV ON SCROLL ─── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));

/* ─── INIT ANIMATIONS (after loader) ─── */
function initAnimations() {
  // Hero elements
  setTimeout(() => document.getElementById('heroBadge').classList.add('show'), 100);
  setTimeout(() => document.getElementById('heroName').classList.add('show'), 250);
  setTimeout(() => {
    document.getElementById('heroTyped').classList.add('show');
    startTyping();
  }, 450);
  setTimeout(() => document.getElementById('heroSub').classList.add('show'), 600);
  setTimeout(() => document.getElementById('heroActions').classList.add('show'), 750);
  setTimeout(() => document.getElementById('heroSocials').classList.add('show'), 900);
  setTimeout(() => document.getElementById('heroMetrics').classList.add('show'), 1050);

  // Reveal observer
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // Skills stagger
  const skillObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      document.querySelectorAll('.skill-card').forEach((card, i) => {
        setTimeout(() => card.classList.add('visible'), i * 60);
      });
      skillObserver.disconnect();
    }
  }, { threshold: 0.15 });

  const skillsGrid = document.getElementById('skillsGrid');
  if (skillsGrid) skillObserver.observe(skillsGrid);
}

/* ─── TYPED TEXT ─── */
const typedRoles = [
  'Full-Stack Developer',
  'Data Science Enthusiast',
  'Computer Vision Engineer',
  'React & Node.js Developer',
  'Power BI Analyst',
  'ECE Student 🎓'
];

let roleIdx = 0, charIdx = 0, isDeleting = false;

function startTyping() {
  const el = document.getElementById('typedText');
  if (!el) return;

  const current = typedRoles[roleIdx];

  if (!isDeleting) {
    el.textContent = current.substring(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      isDeleting = true;
      setTimeout(startTyping, 1800);
      return;
    }
  } else {
    el.textContent = current.substring(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % typedRoles.length;
    }
  }

  setTimeout(startTyping, isDeleting ? 55 : 90);
}

/* ─── LIGHTBOX ─── */
function openLightbox(src) {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  img.src = src;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
document.getElementById('lightbox').addEventListener('click', (e) => {
  if (e.target === document.getElementById('lightbox')) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

/* ─── CONTACT FORM ─── */
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.form-submit');
  const success = document.getElementById('formSuccess');

  btn.textContent = 'Sending...';
  btn.disabled = true;

  // Simulate sending (replace with real endpoint if needed)
  setTimeout(() => {
    btn.style.display = 'none';
    success.style.display = 'block';
    e.target.reset();
  }, 1200);
}

/* ─── SMOOTH SCROLL NAV LINKS ─── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
