// ─── BACKEND URL ─────────────────────────────────────────────
// Use the current page origin when served from the backend.
// Fallback to localhost for local development when the page is opened from file://.
const BACKEND_URL = window.location.origin !== 'null'
  ? window.location.origin
  : 'http://localhost:3000';

// ─── SET ADMIN LINK TO BACKEND /admin ────────────────────────
document.getElementById('adminLink').href = BACKEND_URL + '/admin';

// ─── THEME SWITCHER ──────────────────────────────────────────
const themeButtons = document.querySelectorAll('.theme-btn');
const body = document.body;

const savedTheme = localStorage.getItem('portfolio-theme') || 'ocean';
body.setAttribute('data-theme', savedTheme);
themeButtons.forEach(btn => {
  btn.classList.toggle('active', btn.dataset.theme === savedTheme);
});

themeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const theme = btn.dataset.theme;
    body.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
    themeButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// ─── PROFILE PHOTO (saved by admin panel) ────────────────────
const savedPhoto = localStorage.getItem('profile-photo');
if (savedPhoto) {
  const img = document.getElementById('profilePhoto');
  const placeholder = document.getElementById('photoPlaceholder');
  img.src = savedPhoto;
  img.style.display = 'block';
  placeholder.style.display = 'none';
}

// ─── LOAD PROFILE FROM BACKEND ───────────────────────────────
fetch(`${BACKEND_URL}/api/profile`)
  .then(res => res.json())
  .then(data => {
    // Update contact info dynamically from backend
    if (data.email) {
      document.getElementById('displayEmail').textContent  = data.email;
      document.getElementById('contactEmail').textContent  = data.email;
    }
    if (data.phone) {
      document.getElementById('displayPhone').textContent  = data.phone;
      document.getElementById('contactPhone').textContent  = data.phone;
    }
  })
  .catch(() => console.log('Profile endpoint not reachable yet.'));

// ─── LOAD PROJECTS FROM BACKEND ──────────────────────────────
fetch(`${BACKEND_URL}/api/projects`)
  .then(res => res.json())
  .then(data => {
    const grid = document.getElementById('projectsGrid');
    grid.innerHTML = data.projects.map(p => `
      <div class="project-card">
        <div class="project-tag">${p.category}</div>
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <div class="project-tech">
          ${p.technologies.map(t => `<span>${t}</span>`).join('')}
        </div>
      </div>
    `).join('');

    const msg = document.getElementById('apiMessage');
    msg.textContent = `✓ ${data.count} projects loaded from backend API`;
    msg.classList.add('visible');
  })
  .catch(() => {
    // Fallback: show static projects if backend not connected yet
    document.getElementById('projectsGrid').innerHTML = `
      <div class="project-card">
        <div class="project-tag">Machine Learning</div>
        <h3>Crop Yield Prediction</h3>
        <p>Random Forest model predicting crop yields across Tanzania. 91% accuracy.</p>
        <div class="project-tech"><span>Python</span><span>Scikit-learn</span><span>Pandas</span></div>
      </div>
      <div class="project-card">
        <div class="project-tag">Data Visualization</div>
        <h3>COVID-19 East Africa Dashboard</h3>
        <p>Interactive Power BI dashboard across 6 East African countries.</p>
        <div class="project-tech"><span>Power BI</span><span>Python</span><span>REST API</span></div>
      </div>
      <div class="project-card">
        <div class="project-tag">NLP</div>
        <h3>Swahili Sentiment Analysis</h3>
        <p>NLP model for Swahili social media sentiment classification.</p>
        <div class="project-tech"><span>NLTK</span><span>TensorFlow</span><span>Python</span></div>
      </div>
      <div class="project-card">
        <div class="project-tag">Statistics</div>
        <h3>Student Performance Analysis</h3>
        <p>Regression and hypothesis testing on EASTC student performance data.</p>
        <div class="project-tech"><span>R</span><span>SPSS</span><span>Excel</span></div>
      </div>
    `;
  });

// ─── NAVBAR SCROLL EFFECT ────────────────────────────────────
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  navbar.style.padding = window.scrollY > 50 ? '0.8rem 4rem' : '1.2rem 4rem';
});

// ─── MOBILE NAV TOGGLE ───────────────────────────────────────
document.getElementById('navToggle').addEventListener('click', () => {
  const links = document.querySelector('.nav-links');
  const isOpen = links.style.display === 'flex';
  links.style.display = isOpen ? 'none' : 'flex';
  if (!isOpen) {
    Object.assign(links.style, {
      flexDirection: 'column',
      position: 'absolute',
      top: '70px',
      right: '2rem',
      background: 'var(--bg-card)',
      padding: '1rem 1.5rem',
      borderRadius: '12px',
      border: '1px solid var(--border)',
      gap: '1rem'
    });
  }
});

// ─── SECTION REVEAL ON SCROLL ────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(sec => {
  Object.assign(sec.style, {
    opacity: '0',
    transform: 'translateY(30px)',
    transition: 'opacity 0.7s ease, transform 0.7s ease'
  });
  observer.observe(sec);
});