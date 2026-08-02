/* ========================================
   SOSHIDA · Live Interactive Portfolio
   Real-time Data Updates & Animations
   ======================================== */

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

// ====== LIVE DATA UPDATES ======
function generateRandomChange() {
    const change = (Math.random() * 10 - 3).toFixed(1);
    const isUp = change >= 0;
    return { value: `${isUp ? '↑' : '↓'} ${Math.abs(change)}%`, isUp };
}

function updateLiveStats() {
    const stats = {
        users: { el: 'liveUsers', base: 12.4, unit: 'K' },
        retention: { el: 'liveRetention', base: 87.2, unit: '%' },
        rating: { el: 'liveRating', base: 4.8, unit: '★' },
        sessions: { el: 'liveSessions', base: 3.2, unit: 'K' }
    };

    Object.values(stats).forEach(stat => {
        const el = document.getElementById(stat.el);
        if (!el) return;
        const change = (Math.random() * 2 - 1) * 0.5;
        let newVal = stat.base + change;
        if (stat.el === 'liveRating') {
            newVal = Math.max(3.5, Math.min(5, newVal));
            el.textContent = newVal.toFixed(1) + '★';
        } else if (stat.el === 'liveRetention') {
            newVal = Math.max(70, Math.min(95, newVal));
            el.textContent = newVal.toFixed(1) + '%';
        } else if (stat.el === 'liveUsers') {
            newVal = Math.max(10, Math.min(15, newVal));
            el.textContent = newVal.toFixed(1) + 'K';
        } else if (stat.el === 'liveSessions') {
            newVal = Math.max(2.5, Math.min(4.5, newVal));
            el.textContent = newVal.toFixed(1) + 'K';
        }
    });

    // Update change indicators
    const changes = document.querySelectorAll('.dash-stat-change');
    changes.forEach(el => {
        const isUp = Math.random() > 0.3;
        const val = (Math.random() * 8 + 0.5).toFixed(1);
        el.className = `dash-stat-change ${isUp ? 'up' : 'down'}`;
        el.textContent = `${isUp ? '↑' : '↓'} ${val}%`;
    });

    // Update chart bars dynamically
    document.querySelectorAll('.chart-bar').forEach(bar => {
        const newHeight = Math.floor(Math.random() * 60 + 30);
        bar.style.height = newHeight + '%';
    });
}

// Update every 3 seconds
setInterval(updateLiveStats, 3000);

// ====== LIVE ACTIVITY FEED ======
const activities = [
    { text: 'New user onboarded', dot: 'online' },
    { text: 'Design system updated', dot: '' },
    { text: 'Feedback submitted', dot: 'online' },
    { text: 'New component added', dot: '' },
    { text: 'User reached milestone', dot: 'online' },
    { text: 'System health check passed', dot: '' },
    { text: 'New session started', dot: 'online' },
    { text: 'Feature request logged', dot: '' }
];

function getTimeAgo() {
    const times = ['Just now', '1m ago', '2m ago', '5m ago', '8m ago', '12m ago', '18m ago', '25m ago'];
    return times[Math.floor(Math.random() * times.length)];
}

function updateActivityFeed() {
    const list = document.getElementById('activityList');
    if (!list) return;
    
    // Remove oldest and add new
    const items = list.querySelectorAll('.activity-item');
    if (items.length >= 5) {
        items[items.length - 1].remove();
    }
    
    const activity = activities[Math.floor(Math.random() * activities.length)];
    const item = document.createElement('div');
    item.className = 'activity-item';
    item.style.animation = 'slideIn 0.5s ease';
    item.innerHTML = `
        <span class="activity-dot ${activity.dot}"></span>
        <span class="activity-text">${activity.text}</span>
        <span class="activity-time">${getTimeAgo()}</span>
    `;
    list.prepend(item);
    
    // Update count
    const count = document.getElementById('activityCount');
    if (count) {
        const total = list.querySelectorAll('.activity-item').length;
        count.textContent = `${total} updates`;
    }
}

// Update activity every 8 seconds
setInterval(updateActivityFeed, 8000);

// ====== PROJECT DATA ======
const projectData = {
    1: {
        title: 'Staffing Platform Redesign',
        tag: 'Enterprise',
        description: 'Complete mobile-first redesign of a global staffing platform serving 500+ enterprise clients across 30 countries.',
        challenge: 'The legacy platform was desktop-only with complex workflows that didn\'t translate well to mobile.',
        solution: 'Designed a responsive mobile experience with card-based layouts, swipe actions, and progressive disclosure.',
        states: [
            { icon: '📱', label: 'Mobile First', desc: 'Responsive design' },
            { icon: '🔄', label: 'Real-time', desc: 'Live updates' },
            { icon: '📊', label: 'Analytics', desc: 'Dashboard view' },
            { icon: '🔔', label: 'Notifications', desc: 'Push alerts' }
        ],
        results: '40% faster task completion. 35% reduction in user errors. 4.6/5 satisfaction.'
    },
    2: {
        title: 'Atoms Design System',
        tag: 'Design System',
        description: 'Comprehensive design system powering 4 products with 50+ reusable components and 200+ design tokens.',
        challenge: 'Inconsistent UI across multiple teams and products led to developer inefficiency.',
        solution: 'Built a Figma library with variants, design tokens, and comprehensive documentation with light/dark mode.',
        states: [
            { icon: '🎨', label: 'Default', desc: 'Base state' },
            { icon: '🖱️', label: 'Hover', desc: 'Interactive' },
            { icon: '👆', label: 'Active', desc: 'Press state' },
            { icon: '🚫', label: 'Disabled', desc: 'Inactive' }
        ],
        results: '50% faster handoff. 90% reusability. 4.8/5 team satisfaction.'
    },
    3: {
        title: 'Talent Intelligence Platform',
        tag: 'AI/ML',
        description: 'AI-powered recruitment platform with intelligent candidate matching, predictive analytics, and automation.',
        challenge: 'Recruiters overwhelmed with applications needed an intelligent system to surface the best candidates.',
        solution: 'Designed an AI-driven interface with smart filtering, candidate scoring, and visual analytics.',
        states: [
            { icon: '🤖', label: 'AI Matching', desc: 'Smart recommendations' },
            { icon: '📊', label: 'Analytics', desc: 'Data insights' },
            { icon: '🎯', label: 'Scoring', desc: 'Candidate ranking' },
            { icon: '⚡', label: 'Automation', desc: 'Auto-screening' }
        ],
        results: '70% faster screening. 85% accuracy. 4.9/5 satisfaction.'
    },
    4: {
        title: 'Smart Workspace Hub',
        tag: 'Innovation',
        description: 'Hybrid workspace management platform connecting remote teams with IoT integration and real-time tracking.',
        challenge: 'Companies struggled to manage hybrid work models with fragmented tools.',
        solution: 'Created an integrated platform with real-time occupancy tracking, smart booking, and collaboration tools.',
        states: [
            { icon: '🏢', label: 'Occupancy', desc: 'Live tracking' },
            { icon: '📅', label: 'Booking', desc: 'Desk/room' },
            { icon: '📡', label: 'IoT', desc: 'Sensor data' },
            { icon: '👥', label: 'Teams', desc: 'Collaboration' }
        ],
        results: '60% better utilization. 45% fewer conflicts. 4.7/5 rating.'
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
        <h4 style="margin: 1.5rem 0 0.75rem; color: #F8FAFC; font-size: 1rem;">Key Features</h4>
        <div class="modal-states">
            ${data.states.map(s => `
                <div class="state-card">
                    <span>${s.icon}</span>
                    <strong>${s.label}</strong>
                    <small>${s.desc}</small>
                </div>
            `).join('')}
        </div>
        <p><strong>Results:</strong> ${data.results}</p>
        <div style="margin-top: 1.5rem; display: flex; gap: 1rem; flex-wrap: wrap;">
            <button class="btn-primary" onclick="closeModal()" style="padding:0.6rem 1.5rem;font-size:0.9rem;">Close</button>
            <button class="btn-secondary" onclick="closeModal()" style="padding:0.6rem 1.5rem;font-size:0.9rem;">View Full Case →</button>
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
console.log('%cProduct Design Engineer · Live Portfolio', 'font-size: 14px; color: #94A3B8;');
console.log('%c📊 Live Data | 🎨 50+ Components | ♿ 100% Accessible', 'font-size: 12px; color: #7C3AED;');

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

document.querySelectorAll('.project-card, .color-swatch, .contact-item, .insight-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
});
