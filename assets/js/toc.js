// Floating table of contents in the left margin. Opt in with `toc: true`.
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('.toc');
    const content = document.querySelector('.post-content');
    if (!nav || !content) return;

    const headings = Array.from(content.querySelectorAll('h2, h3'));
    if (headings.length < 2) {
        nav.remove();
        return;
    }

    const list = document.createElement('ol');
    list.className = 'toc-list';
    const entries = [];

    headings.forEach(function(heading, index) {
        if (!heading.id) {
            heading.id = 'toc-heading-' + index;
        }

        const item = document.createElement('li');
        item.className = 'toc-item toc-item--' + heading.tagName.toLowerCase();

        // Some posts carry a hand-rolled back-to-top link in the heading
        // ([&crarr;](#toc)); drop in-page links before reading the text
        const text = heading.cloneNode(true);
        text.querySelectorAll('a[href^="#"]').forEach(function(a) { a.remove(); });

        const link = document.createElement('a');
        link.href = '#' + heading.id;
        link.textContent = text.textContent.replace(/\s+/g, ' ').trim();
        link.addEventListener('click', function(e) {
            e.preventDefault();
            heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
            history.replaceState(null, '', '#' + heading.id);
        });

        item.appendChild(link);
        list.appendChild(item);
        entries.push({ heading: heading, item: item });
    });

    nav.appendChild(list);

    let current = null;

    function updateActive() {
        const line = window.scrollY + window.innerHeight / 3;
        let active = entries[0];

        for (let i = 0; i < entries.length; i++) {
            const top = entries[i].heading.getBoundingClientRect().top + window.scrollY;
            if (top <= line) {
                active = entries[i];
            } else {
                break;
            }
        }

        if (active === current) return;
        if (current) current.item.classList.remove('toc-item--active');
        active.item.classList.add('toc-item--active');
        current = active;
    }

    updateActive();

    let ticking = false;
    window.addEventListener('scroll', function() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function() {
            updateActive();
            ticking = false;
        });
    });
    window.addEventListener('resize', updateActive);
});
