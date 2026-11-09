(function () {
    'use strict';

    var data = window.PORTFOLIO;
    if (!data) return;

    var workGrid = document.getElementById('zine-work');
    var stackGrid = document.getElementById('zine-stack');
    var filters = document.getElementById('zine-filters');
    var currentFilter = 'all';
    var rotations = ['-1.2deg', '0.9deg', '-0.4deg', '1.1deg', '-0.8deg', '0.5deg'];

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function createClip(project, number, index) {
        var clip = document.createElement('article');
        clip.className = 'clip clip-' + project.sector + (project.featured ? ' clip--wide' : '');
        clip.style.setProperty('--rot', project.featured ? '-0.6deg' : rotations[index % rotations.length]);
        clip.style.setProperty('--delay', (index * 40) + 'ms');

        var link = project.link
            ? '<a class="clip-link" href="' + escapeHtml(project.link) + '" target="_blank" rel="noopener">Read the clip <span aria-hidden="true">↗</span></a>'
            : '<span class="clip-link is-private">Private · ask for the story</span>';

        clip.innerHTML =
            '<span class="tape" aria-hidden="true"></span>' +
            '<div class="clip-head">' +
                '<span class="clip-no">' + String(number).padStart(2, '0') + '</span>' +
                '<span class="clip-sector">' + escapeHtml(project.label) + '</span>' +
            '</div>' +
            '<h3>' + escapeHtml(project.title) + '</h3>' +
            '<p>' + escapeHtml(project.desc) + '</p>' +
            link;

        return clip;
    }

    function renderWork() {
        if (!workGrid) return;
        workGrid.innerHTML = '';

        data.projects.forEach(function (project, index) {
            if (currentFilter !== 'all' && project.sector !== currentFilter) return;
            workGrid.appendChild(createClip(project, index + 1, workGrid.children.length));
        });
    }

    function renderStack() {
        if (!stackGrid) return;
        stackGrid.innerHTML = '';

        data.stack.forEach(function (group) {
            var supply = document.createElement('section');
            supply.className = 'supply';
            supply.innerHTML =
                '<h3>' + escapeHtml(group.title) + '</h3>' +
                '<ul>' +
                    group.items.map(function (item) {
                        return '<li>' + escapeHtml(item) + '</li>';
                    }).join('') +
                '</ul>';
            stackGrid.appendChild(supply);
        });
    }

    if (filters) {
        filters.addEventListener('click', function (event) {
            var button = event.target.closest('.tab');
            if (!button) return;

            currentFilter = button.dataset.filter;
            Array.prototype.forEach.call(filters.querySelectorAll('.tab'), function (tab) {
                var active = tab === button;
                tab.classList.toggle('is-active', active);
                tab.setAttribute('aria-pressed', String(active));
            });
            renderWork();
        });
    }

    var year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    renderWork();
    renderStack();
})();
