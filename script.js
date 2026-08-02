// ============================================================
// SOSHIDA · Portfolio Interactive Features
// ============================================================

// ====== NAVIGATION ======
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        if (scrollY >= section.offsetTop - 100) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
});

// ====== PARTICLES ======
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    const colors = ['#2563EB', '#7C3AED', '#EC4899', '#F59E0B', '#22C55E'];
    for (let i = 0; i < 40; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 6 + 2;
        Object.assign(p.style, {
            width: size + 'px',
            height: size + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animationDuration: (Math.random() * 25 + 10) + 's',
            animationDelay: (Math.random() * 10) + 's',
            background: colors[Math.floor(Math.random() * colors.length)],
            opacity: Math.random() * 0.3 + 0.05
        });
        container.appendChild(p);
    }
}
createParticles();

// ====== STAT COUNTER ======
function animateStats() {
    document.querySelectorAll('.stat-number').forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        if (!target) return;
        let current = 0;
        const steps = 60;
        const increment = target / steps;
        let step = 0;
        const timer = setInterval(() => {
            step++;
            current = Math.min(current + increment, target);
            if (step >= steps) { current = target; clearInterval(timer); }
            stat.textContent = Math.round(current) + (target === 100 ? '%' : '+');
        }, 2000 / steps);
    });
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.disconnect();
        }
    });
}, { threshold: 0.2 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ====== LIVE CLOCK ======
function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
    const el = document.getElementById('liveTime');
    if (el) el.textContent = `🕐 ${time}`;
}
updateClock();
setInterval(updateClock, 1000);

// ====== PROJECT DATA ======
const projectData = {
    1: {
        title: 'Customer Churn Prediction',
        tag: 'Machine Learning',
        description: 'End-to-end ML pipeline predicting customer churn for telecom companies.',
        challenge: 'Data imbalance (15% churn rate), feature heterogeneity, model interpretability.',
        solution: 'Used Random Forest with class weighting, SHAP for explainability, deployed as Flask API.',
        results: '84% accuracy, 91% ROC AUC, 85% recall. Identified month-to-month contracts as top churn driver.'
    },
    2: {
        title: 'Dengue Outbreak Prediction',
        tag: 'Geospatial ML',
        description: 'Predicting dengue outbreaks using satellite imagery and climate data.',
        challenge: 'Integrating multi-source data, spatial autocorrelation, temporal lag detection.',
        solution: 'Used LSTM for time-series, spatial cross-validation, SMOTE for imbalance.',
        results: '82% accuracy, 3-4 weeks early warning. Rainfall strongest predictor at 35% importance.'
    },
    3: {
        title: 'COVID-19 Spread Analysis',
        tag: 'Analytics',
        description: 'Interactive dashboard analyzing mobility patterns and COVID-19 transmission.',
        challenge: 'Data sparsity, reporting delays, spatial heterogeneity.',
        solution: 'Used interpolation, county-level random effects, SHAP for feature importance.',
        results: 'Analyzed 3,000+ counties, identified social distancing effectiveness.'
    },
    4: {
        title: 'Satellite QA/QC Pipeline',
        tag: 'Satellite Imagery',
        description: 'Automated quality assurance pipeline for satellite imagery.',
        challenge: 'Geometric accuracy, radiometric consistency, cloud cover detection.',
        solution: 'Built Python pipeline with Rasterio for validation and anomaly detection.',
        results: 'Comprehensive QA/QC system for satellite imagery processing.'
    }
};

// ====== PROJECT MODAL ======
function openProject(id) {
    const modal = document.getElementById('projectModal');
    const body = document.getElementById('modalBody');
    const data = projectData[id];
    if (!data) return;

    body.innerHTML = `
        <h2>${data.title}</h2>
        <span class="modal-tag">${data.tag}</span>
        <p><strong>Overview:</strong> ${data.description}</p>
        <p><strong>Challenge:</strong> ${data.challenge}</p>
        <p><strong>Solution:</strong> ${data.solution}</p>
        <p><strong>Results:</strong> ${data.results}</p>
        <div style="margin-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
            <button class="btn-primary" onclick="closeModal()" style="padding:0.6rem 1.5rem;font-size:0.9rem;">Close</button>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('projectModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

document.getElementById('projectModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// ====== CONTACT FORM ======
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('✨ Thanks for reaching out! I\'ll get back to you within 24 hours.');
    e.target.reset();
});

// ====== CONSOLE BRANDING ======
console.log('%c✦ SOSHIDA ✦', 'font-size: 28px; font-weight: 900; color: #2563EB;');
console.log('%cProduct Design Engineer · Complete Portfolio', 'font-size: 14px; color: #94A3B8;');
console.log('%c📊 4 Projects | 🤖 5 ML Models | 🗺️ Geospatial Expert', 'font-size: 12px; color: #7C3AED;');

// ====== SCROLL REVEAL ======
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 80);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card, .ml-card, .geo-card, .pixxel-card, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
});
