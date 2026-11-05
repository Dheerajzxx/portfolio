const data = window.PORTFOLIO;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Render work rows ---------- */

const workList = document.getElementById('work-list');

workList.innerHTML = data.projects.map((project, index) => {
    const number = String(index + 1).padStart(2, '0');
    const arrow = project.link
        ? `<a class="row-arrow" href="${project.link}" target="_blank" rel="noopener" aria-label="Visit ${project.title}">↗</a>`
        : '<span class="row-arrow is-muted" aria-hidden="true">—</span>';

    return `
        <article class="work-row" style="--delay: ${Math.min(index * 60, 420)}ms">
            <span class="row-num">${number}</span>
            <div class="row-body">
                <h3>${project.title}</h3>
                <p>${project.desc}</p>
            </div>
            <span class="row-sector">${project.label}</span>
            ${arrow}
        </article>
    `;
}).join('');

/* ---------- Render stack ---------- */

document.getElementById('stack-list').innerHTML = data.stack.map(category => `
    <div class="stack-row">
        <h3>${category.title}</h3>
        <ul class="tags">
            ${category.items.map(item => `<li>${item}</li>`).join('')}
        </ul>
    </div>
`).join('');

/* ---------- Scroll progress + hero parallax ---------- */

const progressBar = document.getElementById('progress-bar');
const heroTitle = document.querySelector('.hero-title');
let ticking = false;

function onScroll() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    progressBar.style.transform = `scaleX(${ratio})`;

    if (!reducedMotion && window.scrollY < window.innerHeight) {
        heroTitle.style.transform = `translate3d(0, ${window.scrollY * 0.08}px, 0)`;
    }
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(onScroll);
}, { passive: true });

onScroll();

/* ---------- Reveal work rows ---------- */

if ('IntersectionObserver' in window) {
    const rowObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('in');
            rowObserver.unobserve(entry.target);
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });

    document.querySelectorAll('.work-row').forEach(row => rowObserver.observe(row));
}

/* ---------- Animated counters ---------- */

function animateCounter(element) {
    const target = Number(element.dataset.count);
    const suffix = element.dataset.suffix || '';

    if (reducedMotion) {
        element.textContent = target + suffix;
        return;
    }

    const duration = 1200;
    const start = performance.now();

    function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        element.textContent = Math.round(target * eased) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
}

const statsBlock = document.querySelector('.stats');
if (statsBlock && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            statsBlock.querySelectorAll('[data-count]').forEach(animateCounter);
            statsObserver.unobserve(statsBlock);
        });
    }, { threshold: 0.4 });

    statsObserver.observe(statsBlock);
} else if (statsBlock) {
    statsBlock.querySelectorAll('[data-count]').forEach(animateCounter);
}

/* ---------- Custom cursor ---------- */

const finePointer = window.matchMedia('(pointer: fine)').matches;

if (finePointer && !reducedMotion) {
    const cursor = document.getElementById('cursor');
    const dot = cursor.querySelector('.cursor-dot');
    const ring = cursor.querySelector('.cursor-ring');
    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPosition = { x: pointer.x, y: pointer.y };

    document.body.classList.add('has-cursor');

    window.addEventListener('mousemove', event => {
        pointer.x = event.clientX;
        pointer.y = event.clientY;
        dot.style.transform = `translate(${pointer.x}px, ${pointer.y}px) translate(-50%, -50%)`;
    }, { passive: true });

    document.addEventListener('mouseover', event => {
        const interactive = event.target.closest('a, button, .work-row');
        cursor.classList.toggle('is-hover', Boolean(interactive));
    });

    (function followCursor() {
        ringPosition.x += (pointer.x - ringPosition.x) * 0.16;
        ringPosition.y += (pointer.y - ringPosition.y) * 0.16;
        ring.style.transform = `translate(${ringPosition.x}px, ${ringPosition.y}px) translate(-50%, -50%)`;
        requestAnimationFrame(followCursor);
    })();
}

/* ---------- Magnetic button ---------- */

document.querySelectorAll('.btn-magnet').forEach(button => {
    if (reducedMotion || !finePointer) return;

    button.addEventListener('mousemove', event => {
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        button.style.transform = `translate(${x * 0.22}px, ${y * 0.28}px)`;
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = '';
    });
});

document.getElementById('year').textContent = new Date().getFullYear();
