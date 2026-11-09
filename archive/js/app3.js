const data = window.PORTFOLIO;
const grid = document.getElementById('glass-grid');
const filterBar = document.getElementById('glass-filters');

const sectorTheme = {
    government: { bg: 'rgba(61, 110, 163, 0.14)', fg: '#3d6ea3' },
    ecommerce: { bg: 'rgba(47, 125, 91, 0.14)', fg: '#2f7d5b' },
    healthcare: { bg: 'rgba(135, 87, 166, 0.14)', fg: '#8757a6' },
    events: { bg: 'rgba(168, 117, 28, 0.16)', fg: '#8a5e10' }
};

function workCard(project, index) {
    const theme = sectorTheme[project.sector] || sectorTheme.government;
    const action = project.link
        ? `<a class="card-link" href="${project.link}" target="_blank" rel="noopener">Visit live site <span aria-hidden="true">↗</span></a>`
        : '<span class="card-link is-muted">Internal product</span>';

    return `
        <article class="work-card${project.featured ? ' is-featured' : ''}" style="animation-delay: ${index * 45}ms">
            <div class="card-top">
                <span class="chip" style="--chip-bg: ${theme.bg}; --chip-fg: ${theme.fg};">
                    <span class="chip-dot" aria-hidden="true"></span>${project.label}
                </span>
                <span class="env">Production</span>
            </div>
            <h3>${project.title}</h3>
            <p>${project.desc}</p>
            ${action}
        </article>
    `;
}

function renderWork(filter = 'all') {
    const visible = filter === 'all'
        ? data.projects
        : data.projects.filter(project => project.sector === filter);
    grid.innerHTML = visible.map(workCard).join('');
}

filterBar.addEventListener('click', event => {
    const button = event.target.closest('.filter');
    if (!button) return;

    filterBar.querySelectorAll('.filter').forEach(item => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
    });

    renderWork(button.dataset.filter);
});

renderWork();

const stackGrid = document.getElementById('glass-stack');
stackGrid.innerHTML = data.stack.map(category => `
    <article class="stack-card">
        <h3>${category.title}</h3>
        <ul class="tags">
            ${category.items.map(item => `<li>${item}</li>`).join('')}
        </ul>
    </article>
`).join('');

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    revealItems.forEach(item => observer.observe(item));
} else {
    revealItems.forEach(item => item.classList.add('is-visible'));
}

document.getElementById('year').textContent = new Date().getFullYear();
