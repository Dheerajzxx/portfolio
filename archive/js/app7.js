(function () {
    'use strict';

    var data = window.PORTFOLIO;
    if (!data) return;

    var workGrid = document.getElementById('bento-work');
    var stackGrid = document.getElementById('bento-stack');
    var filterWrap = document.getElementById('bento-filters');
    var currentFilter = 'all';

    var sectorClass = {
        government: 'bg-government',
        ecommerce: 'bg-ecommerce',
        healthcare: 'bg-healthcare',
        events: 'bg-events'
    };

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function projectCard(project, index, allowFeature) {
        var featured = allowFeature && project.featured;
        var card = document.createElement('article');
        card.className = 'tile project-tile ' + (sectorClass[project.sector] || '') + (featured ? ' is-featured' : '');
        card.style.setProperty('--delay', (index * 45) + 'ms');

        var link = project.link
            ? '<a class="project-link" href="' + escapeHtml(project.link) + '" target="_blank" rel="noopener">View project <span aria-hidden="true">↗</span></a>'
            : '<span class="project-link is-muted">Case study on request</span>';

        card.innerHTML =
            '<div class="project-top">' +
                '<span class="sector-chip">' + escapeHtml(project.label) + '</span>' +
                '<span class="env">' + (project.link ? 'Live' : 'Private') + '</span>' +
            '</div>' +
            '<h3>' + escapeHtml(project.title) + '</h3>' +
            '<p>' + escapeHtml(project.desc) + '</p>' +
            link;

        return card;
    }

    function renderWork() {
        if (!workGrid) return;
        var projects = data.projects.filter(function (project) {
            return currentFilter === 'all' || project.sector === currentFilter;
        });

        workGrid.innerHTML = '';
        projects.forEach(function (project, index) {
            workGrid.appendChild(projectCard(project, index, currentFilter === 'all'));
        });
    }

    function renderStack() {
        if (!stackGrid) return;
        stackGrid.innerHTML = '';
        data.stack.forEach(function (group, index) {
            var tile = document.createElement('section');
            tile.className = 'tile stack-tile stack-' + ((index % 4) + 1);
            tile.innerHTML =
                '<h3>' + escapeHtml(group.title) + '</h3>' +
                '<ul class="tags">' +
                    group.items.map(function (item) {
                        return '<li>' + escapeHtml(item) + '</li>';
                    }).join('') +
                '</ul>';
            stackGrid.appendChild(tile);
        });
    }

    if (filterWrap) {
        filterWrap.addEventListener('click', function (event) {
            var button = event.target.closest('.filter');
            if (!button) return;

            currentFilter = button.dataset.filter;
            Array.prototype.forEach.call(filterWrap.querySelectorAll('.filter'), function (item) {
                var active = item === button;
                item.classList.toggle('is-active', active);
                item.setAttribute('aria-pressed', String(active));
            });
            renderWork();
        });
    }

    function pad(value) {
        return String(value).padStart(2, '0');
    }

    function clockParts() {
        var now = new Date();
        return {
            hours: pad(now.getHours()),
            minutes: pad(now.getMinutes()),
            seconds: pad(now.getSeconds())
        };
    }

    var topClock = document.getElementById('top-clock');
    var localClock = document.getElementById('local-clock');

    function updateClock() {
        var time = clockParts();
        if (topClock) topClock.textContent = time.hours + ':' + time.minutes;
        if (localClock) localClock.textContent = time.hours + ':' + time.minutes + ':' + time.seconds;
    }

    updateClock();
    window.setInterval(updateClock, 1000);

    var copyButton = document.querySelector('.copy-btn');
    if (copyButton) {
        copyButton.addEventListener('click', function () {
            var email = copyButton.dataset.copy;
            var label = copyButton.querySelector('.copy-label');
            var original = label.textContent;

            function done(message) {
                label.textContent = message;
                copyButton.classList.add('is-copied');
                window.setTimeout(function () {
                    label.textContent = original;
                    copyButton.classList.remove('is-copied');
                }, 1800);
            }

            function fallbackCopy() {
                var field = document.createElement('textarea');
                field.value = email;
                field.setAttribute('readonly', '');
                field.style.position = 'fixed';
                field.style.opacity = '0';
                document.body.appendChild(field);
                field.select();
                var ok = false;
                try {
                    ok = document.execCommand('copy');
                } catch (error) {
                    ok = false;
                }
                document.body.removeChild(field);
                done(ok ? 'Copied!' : 'Copy failed');
            }

            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(email).then(function () {
                    done('Copied!');
                }).catch(fallbackCopy);
            } else {
                fallbackCopy();
            }
        });
    }

    var year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    renderWork();
    renderStack();
})();
