const projects = [
    {
        sector: 'government',
        label: 'Government',
        title: 'Qatar Land Portal (QREC)',
        desc: 'Architected the public user panel, admin engine and resilient operational APIs. Automated the deployment pipeline with streamlined GitHub Actions CI/CD workflows.',
        link: 'https://land.qrec.gov.qa/login',
        featured: true
    },
    {
        sector: 'government',
        label: 'Government',
        title: 'Rytu Setu Infrastructure',
        desc: 'Built a performant Node.js and Express backend on PostgreSQL, paired with a Next.js 16 control dashboard.',
        link: 'https://rytusetu.in'
    },
    {
        sector: 'government',
        label: 'Government',
        title: 'BBMP Lakes & Parks',
        desc: 'Mapped local infrastructure modules with Google Maps integrations for public asset visualisation.',
        link: 'https://bbmpgov.org'
    },
    {
        sector: 'ecommerce',
        label: 'E-commerce',
        title: 'Jawata Tech Marketplace',
        desc: 'Full-stack accessories rental platform with deposit vaults, digital contracts and complex installment checkout flows.',
        link: 'https://scriblette.com'
    },
    {
        sector: 'ecommerce',
        label: 'E-commerce',
        title: 'Dance Beat Academy',
        desc: 'Booking engine with checkout flows, a dynamic class calendar and custom gifting pipelines.',
        link: 'https://dancebeatacademy.com'
    },
    {
        sector: 'ecommerce',
        label: 'E-commerce',
        title: 'Nearshack Ecosystem',
        desc: 'Cross-functional buyer, seller and delivery apps connected to a central administrative dashboard.',
        link: null
    },
    {
        sector: 'healthcare',
        label: 'Healthcare & AI',
        title: 'ComplyAssist Tax Engine',
        desc: 'AI-driven Virtual CA workspace that parses raw business asset logs and surfaces upcoming tax liabilities instantly.',
        link: 'https://complyassist.io'
    },
    {
        sector: 'healthcare',
        label: 'Healthcare & AI',
        title: 'Medikonet Architecture',
        desc: 'Hospital management system covering pharmacy automation, real-time diagnostic logs and patient records.',
        link: null
    },
    {
        sector: 'healthcare',
        label: 'Healthcare & AI',
        title: 'PrismH & Tree Canopy',
        desc: 'Offline-capable PWA for field teams with task synchronisation and map tracing, built for ARTPARK.',
        link: 'https://artpark.ai'
    },
    {
        sector: 'events',
        label: 'Events',
        title: 'BIFFES Film Festival',
        desc: 'High-traffic platform for thousands of registrations, secure payments, QR identity cards and low-latency scanner APIs.',
        link: 'https://biffes.org',
        featured: true
    },
    {
        sector: 'events',
        label: 'Events',
        title: 'Awwsummm Platform',
        desc: 'Microservices handling instant seat processing, concurrent transactional locks and rapid barcode ticket distribution.',
        link: 'https://awwsummm.com'
    },
    {
        sector: 'events',
        label: 'Events',
        title: 'Kannada Sahithya Parishattu',
        desc: 'Integrated portal for regional member registrations, meeting scheduling and structured fee collection.',
        link: null
    }
];

const sectorColor = {
    government: 'var(--gov)',
    ecommerce: 'var(--ecom)',
    healthcare: 'var(--health)',
    events: 'var(--events)'
};

const grid = document.getElementById('project-grid');
const filterBar = document.getElementById('filters');

function projectCard(project, index) {
    const isLink = Boolean(project.link);
    const action = isLink
        ? `<a class="card-link" href="${project.link}" target="_blank" rel="noopener">Visit live site <span aria-hidden="true">↗</span></a>`
        : `<span class="card-link is-muted">Internal product</span>`;

    return `
        <article class="project-card${project.featured ? ' is-featured' : ''}" style="--sector: ${sectorColor[project.sector]}; animation-delay: ${index * 45}ms">
            <div class="card-top">
                <span class="card-sector"><span class="dot" aria-hidden="true"></span>${project.label}</span>
                <span class="card-env">Production</span>
            </div>
            <h3 class="card-title">${project.title}</h3>
            <p class="card-desc">${project.desc}</p>
            <div class="card-foot">${action}</div>
        </article>
    `;
}

function renderProjects(filter = 'all') {
    const visible = filter === 'all'
        ? projects
        : projects.filter(project => project.sector === filter);

    grid.innerHTML = visible.map(projectCard).join('');
}

function setFilter(filter, button) {
    filterBar.querySelectorAll('.filter').forEach(btn => {
        const isActive = btn === button;
        btn.classList.toggle('is-active', isActive);
        btn.setAttribute('aria-pressed', String(isActive));
    });
    renderProjects(filter);
}

filterBar.addEventListener('click', event => {
    const button = event.target.closest('.filter');
    if (!button) return;
    setFilter(button.dataset.filter, button);
});

renderProjects();

/* Header state on scroll */
const header = document.getElementById('site-header');
const syncHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
syncHeader();
window.addEventListener('scroll', syncHeader, { passive: true });

/* Reveal on scroll */
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
        });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });

    revealItems.forEach(item => revealObserver.observe(item));
} else {
    revealItems.forEach(item => item.classList.add('is-visible'));
}

/* Highlight the section currently in view */
const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
const sections = navLinks
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

if ('IntersectionObserver' in window && sections.length) {
    const navObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            navLinks.forEach(link => {
                link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
            });
        });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

    sections.forEach(section => navObserver.observe(section));
}

document.getElementById('year').textContent = new Date().getFullYear();
