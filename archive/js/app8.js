(function () {
    'use strict';

    var data = window.PORTFOLIO;
    var output = document.getElementById('output');
    var form = document.getElementById('prompt-form');
    var input = document.getElementById('command-input');
    var screen = document.getElementById('screen');
    var hints = document.getElementById('hints');

    if (!data || !output || !form || !input) return;

    var history = [];
    var historyIndex = 0;
    var sectorLabels = {
        government: 'Government',
        ecommerce: 'E-commerce',
        healthcare: 'Healthcare & AI',
        events: 'Events'
    };

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function scrollBottom() {
        window.requestAnimationFrame(function () {
            output.scrollTop = output.scrollHeight;
        });
    }

    function addLine(text, className) {
        var line = document.createElement('div');
        line.className = 'out-line' + (className ? ' ' + className : '');
        line.textContent = text === '' ? '\u00A0' : text;
        output.appendChild(line);
        scrollBottom();
        return line;
    }

    function addBlock(html) {
        var block = document.createElement('div');
        block.className = 'out-block';
        block.innerHTML = html;
        output.appendChild(block);
        scrollBottom();
        return block;
    }

    function addDivider() {
        var divider = document.createElement('div');
        divider.className = 'divider';
        output.appendChild(divider);
    }

    var banner = [
        '  ____  _  __',
        ' |  _ \\| |/ /',
        ' | | | | \' /',
        ' | |_| | . \\',
        ' |____/|_|\\_\\'
    ].join('\n');

    function addBanner() {
        var pre = document.createElement('pre');
        pre.className = 'ascii';
        pre.textContent = banner;
        output.appendChild(pre);
        scrollBottom();
    }

    function echoCommand(command) {
        var line = document.createElement('div');
        line.className = 'cmd-line';

        var prompt = document.createElement('span');
        prompt.className = 'cmd-prompt';
        prompt.textContent = 'dheeraj@portfolio:~$';

        var text = document.createElement('span');
        text.className = 'cmd-text';
        text.textContent = command;

        line.appendChild(prompt);
        line.appendChild(text);
        output.appendChild(line);
        scrollBottom();
    }

    function renderHelp() {
        var rows = [
            ['about', 'who I am'],
            ['work [sector]', 'all projects, or filter by sector'],
            ['stack', 'tools and technologies'],
            ['contact', 'email, phone and links'],
            ['open <n>', 'open project n from the work list'],
            ['ls', 'list sections'],
            ['banner', 'show the intro again'],
            ['date', 'current date and time'],
            ['clear', 'clear the screen']
        ];

        addBlock(
            '<p class="block-title">Available commands</p>' +
            '<div class="kv">' +
                rows.map(function (row) {
                    return '<div class="kv-row"><span class="kv-key">' + row[0] + '</span><span class="kv-val">' + row[1] + '</span></div>';
                }).join('') +
            '</div>'
        );
        addLine('Sectors: government · ecommerce · healthcare · events', 'dim');
        addLine('Tip: press ↑ / ↓ to browse command history.', 'dim');
    }

    function renderAbout() {
        var profile = data.profile;
        addLine('Dheeraj Kumar — Full Stack Developer', 'strong');
        addLine(profile.summary);
        addBlock(
            '<div class="kv">' +
                '<div class="kv-row"><span class="kv-key">Location</span><span class="kv-val">' + escapeHtml(profile.location) + '</span></div>' +
                '<div class="kv-row"><span class="kv-key">Experience</span><span class="kv-val">5+ years</span></div>' +
                '<div class="kv-row"><span class="kv-key">Focus</span><span class="kv-val">Laravel · Node.js · Vue / Nuxt · Next.js · React</span></div>' +
                '<div class="kv-row"><span class="kv-key">Availability</span><span class="kv-val">' + escapeHtml(profile.availability) + ' — full-time or select freelance</span></div>' +
                '<div class="kv-row"><span class="kv-key">Email</span><span class="kv-val"><a href="mailto:' + escapeHtml(profile.email) + '">' + escapeHtml(profile.email) + '</a></span></div>' +
            '</div>'
        );
        addLine('Also comfortable with AI-assisted workflows: Claude Code, agents, strict e2e testing.', 'dim');
    }

    function renderWork(argument) {
        var filter = argument || 'all';
        if (filter !== 'all' && !sectorLabels[filter]) {
            addLine('Unknown sector: ' + filter, 'error');
            addLine('Try: work government | ecommerce | healthcare | events', 'dim');
            return;
        }

        var projects = data.projects
            .map(function (project, index) {
                return { project: project, number: index + 1 };
            })
            .filter(function (entry) {
                return filter === 'all' || entry.project.sector === filter;
            });

        addLine(
            'WORK — ' + (filter === 'all' ? 'all ' + projects.length + ' projects' : sectorLabels[filter] + ' · ' + projects.length + ' projects'),
            'accent strong'
        );

        var items = projects.map(function (entry) {
            var project = entry.project;
            var link = project.link
                ? '<a class="res-link" href="' + escapeHtml(project.link) + '" target="_blank" rel="noopener">' + escapeHtml(project.link.replace(/^https?:\/\//, '')) + ' ↗</a>'
                : '<span class="res-link is-private">Private — case study on request</span>';

            return '<div class="res-item">' +
                '<div class="res-meta"><span class="res-num">' + String(entry.number).padStart(2, '0') + '</span><span class="res-sector">' + escapeHtml(project.label) + '</span></div>' +
                '<div class="res-title">' + escapeHtml(project.title) + '</div>' +
                '<p class="res-desc">' + escapeHtml(project.desc) + '</p>' +
                link +
            '</div>';
        }).join('');

        addBlock('<div class="res-list">' + items + '</div>');
        addLine('Tip: type open <n> to launch a project link.', 'dim');
    }

    function renderStack() {
        var groups = data.stack.map(function (group) {
            return '<div class="stack-group">' +
                '<div class="stack-title">' + escapeHtml(group.title) + '</div>' +
                '<div class="tag-list">' +
                    group.items.map(function (item) {
                        return '<span class="tag">' + escapeHtml(item) + '</span>';
                    }).join('') +
                '</div>' +
            '</div>';
        }).join('');

        addBlock('<p class="block-title">Stack</p>' + groups);
        addLine('Plus: GitHub Actions, CI/CD, Google Maps, Razorpay, Twilio, Socket.IO.', 'dim');
    }

    function renderContact() {
        var profile = data.profile;
        addBlock(
            '<p class="block-title">Contact</p>' +
            '<div class="kv">' +
                '<div class="kv-row"><span class="kv-key">Email</span><span class="kv-val"><a href="mailto:' + escapeHtml(profile.email) + '">' + escapeHtml(profile.email) + '</a></span></div>' +
                '<div class="kv-row"><span class="kv-key">Phone</span><span class="kv-val"><a href="' + escapeHtml(profile.phoneHref) + '">' + escapeHtml(profile.phone) + '</a></span></div>' +
                '<div class="kv-row"><span class="kv-key">LinkedIn</span><span class="kv-val"><a href="' + escapeHtml(profile.linkedin) + '" target="_blank" rel="noopener">linkedin.com ↗</a></span></div>' +
                '<div class="kv-row"><span class="kv-key">Location</span><span class="kv-val">' + escapeHtml(profile.location) + '</span></div>' +
                '<div class="kv-row"><span class="kv-key">Status</span><span class="kv-val">' + escapeHtml(profile.availability) + ' — full-time / selective freelance</span></div>' +
            '</div>'
        );
        addLine('Fastest reply: email. Usually within a day.', 'dim');
    }

    function renderSections() {
        addBlock(
            '<p class="block-title">Sections</p>' +
            '<div class="section-list">' +
                '<span><strong>about/</strong> profile</span>' +
                '<span><strong>work/</strong> 12 projects</span>' +
                '<span><strong>stack/</strong> toolkit</span>' +
                '<span><strong>contact/</strong> details</span>' +
            '</div>'
        );
    }

    function openProject(argument) {
        if (!argument) {
            addLine('Usage: open <n> — e.g. open 1', 'warn');
            return;
        }

        var number = parseInt(argument, 10);
        if (isNaN(number) || number < 1 || number > data.projects.length) {
            addLine('No project #' + argument + '. Valid range: 1–' + data.projects.length + '.', 'error');
            return;
        }

        var project = data.projects[number - 1];
        addLine('[' + String(number).padStart(2, '0') + '] ' + project.title, 'strong');
        addLine(project.desc);

        if (!project.link) {
            addLine('This project has no public link — case study available on request.', 'warn');
            return;
        }

        addBlock('<a class="res-link" href="' + escapeHtml(project.link) + '" target="_blank" rel="noopener">' + escapeHtml(project.link) + ' ↗</a>');
        addLine('Opening in a new tab…', 'accent');

        var opened = window.open(project.link, '_blank', 'noopener');
        if (!opened) {
            addLine('If the tab was blocked, use the link above.', 'dim');
        }
    }

    function runCommand(raw) {
        var command = raw.trim();
        echoCommand(command);
        if (!command) return;

        history.push(command);
        historyIndex = history.length;

        var parts = command.split(/\s+/);
        var name = parts[0].toLowerCase();
        var argument = parts.slice(1).join(' ').toLowerCase();

        switch (name) {
            case 'help':
            case '?':
            case 'commands':
                renderHelp();
                break;
            case 'about':
            case 'whoami':
                renderAbout();
                break;
            case 'work':
            case 'projects':
                renderWork(argument);
                break;
            case 'stack':
            case 'skills':
                renderStack();
                break;
            case 'contact':
            case 'email':
                renderContact();
                break;
            case 'open':
                openProject(argument);
                break;
            case 'ls':
            case 'sections':
                renderSections();
                break;
            case 'banner':
                addBanner();
                addLine('Dheeraj Kumar — Full Stack Developer · 5+ years', 'accent');
                break;
            case 'date':
                addLine(new Date().toLocaleString('en-GB', {
                    dateStyle: 'medium',
                    timeStyle: 'medium'
                }), 'dim');
                break;
            case 'clear':
            case 'cls':
                output.innerHTML = '';
                break;
            case 'sudo':
                addLine('dheeraj is not in the sudoers file. This incident has been logged.', 'error');
                addLine('…just kidding. But nice try.', 'dim');
                break;
            case 'coffee':
                addLine('HTTP 418 — I\'m a teapot. But I can still ship your project.', 'warn');
                break;
            case 'exit':
            case 'logout':
                addLine('Session stays open — this portfolio has no exit strategy.', 'warn');
                break;
            default:
                addLine('zsh: command not found: ' + name, 'error');
                addLine('Type help for available commands.', 'dim');
        }
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        var value = input.value;
        input.value = '';
        runCommand(value);
        input.focus();
    });

    input.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowUp') {
            event.preventDefault();
            if (!history.length) return;
            historyIndex = Math.max(0, historyIndex - 1);
            input.value = history[historyIndex] || '';
            input.setSelectionRange(input.value.length, input.value.length);
        } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            if (!history.length) return;
            historyIndex = Math.min(history.length, historyIndex + 1);
            input.value = historyIndex === history.length ? '' : history[historyIndex];
            input.setSelectionRange(input.value.length, input.value.length);
        } else if (event.key === 'Escape') {
            input.value = '';
        } else if (event.key.toLowerCase() === 'l' && (event.ctrlKey || event.metaKey)) {
            event.preventDefault();
            output.innerHTML = '';
        }
    });

    if (hints) {
        hints.addEventListener('click', function (event) {
            var button = event.target.closest('button[data-cmd]');
            if (!button) return;
            runCommand(button.dataset.cmd);
            input.focus();
        });
    }

    screen.addEventListener('click', function (event) {
        if (event.target.closest('a, button')) return;
        input.focus();
    });

    addLine('Last login: ' + new Date().toLocaleString('en-GB', {
        dateStyle: 'medium',
        timeStyle: 'short'
    }) + ' on ttys001', 'dim');
    addBanner();
    addLine('Dheeraj Kumar — Full Stack Developer', 'accent strong');
    addLine('5+ years · Laravel / Node / Vue / Nuxt / Next.js / React', 'strong');
    addLine(data.profile.summary);
    addLine('');
    addLine('Type help to explore, or use a shortcut below.', 'dim');
    addLine('[ready] interactive portfolio v1.0', 'accent');

    if (window.matchMedia('(pointer: fine)').matches && window.innerWidth > 760) {
        window.setTimeout(function () {
            input.focus();
        }, 250);
    }
})();
