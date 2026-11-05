const data = window.PORTFOLIO;
const grid = document.getElementById('brutal-grid');
const filterBar = document.getElementById('brutal-filters');

function workCard(project) {
    const action = project.link
        ? `<a class="card-link" href="${project.link}" target="_blank" rel="noopener">Visit live ↗</a>`
        : '<span class="card-link is-muted">Internal build</span>';

    return `
        <article class="work-card card-${project.sector}${project.featured ? ' is-featured' : ''}">
            <div class="card-top">
                <span class="chip">${project.label}</span>
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

document.getElementById('brutal-stack').innerHTML = data.stack.map(category => `
    <article class="stack-card">
        <h3>${category.title}</h3>
        <ul class="tags">
            ${category.items.map(item => `<li>${item}</li>`).join('')}
        </ul>
    </article>
`).join('');

document.getElementById('year').textContent = new Date().getFullYear();
