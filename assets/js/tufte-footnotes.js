// Transform kramdown footnotes into margin notes (Proportional Web style).
// Wide viewports: notes sit in the right margin, aligned with their
// reference, with JS-resolved overlaps. Narrow viewports: notes render
// inline right after the paragraph that references them (styled with an
// ornament in tufte-footnotes.css). Keep the 1340px breakpoint in sync
// with the CSS.
document.addEventListener('DOMContentLoaded', function() {
    const footnoteSection = document.querySelector('.footnotes');
    if (!footnoteSection) return;

    const footnoteLinks = document.querySelectorAll('a.footnote');
    const footnoteList = footnoteSection.querySelector('ol');
    const paperContainer = document.querySelector('.paper-container');

    if (!footnoteList || footnoteLinks.length === 0 || !paperContainer) return;

    function isNarrow() {
        return window.innerWidth < 1340;
    }

    const sidenotes = [];

    footnoteLinks.forEach(function(link, index) {
        const footnoteId = link.getAttribute('href').substring(1);
        const footnoteContent = document.getElementById(footnoteId);
        if (!footnoteContent) return;

        // Footnote text without the back-reference link
        const footnoteText = footnoteContent.cloneNode(true);
        const backRef = footnoteText.querySelector('.reversefootnote');
        if (backRef) backRef.remove();

        const sidenote = document.createElement('aside');
        sidenote.className = 'sidenote';
        sidenote.innerHTML = footnoteText.innerHTML;

        // Place the note after the block that references it, so the
        // inline (narrow-viewport) presentation lands in reading order
        const host = link.closest('p, li, blockquote, figcaption, table') || paperContainer;
        host.insertAdjacentElement('afterend', sidenote);
        sidenotes.push(sidenote);

        // Clicking the reference brings the note into view
        link.addEventListener('click', function(e) {
            e.preventDefault();
            sidenote.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    });

    // Hide the original footnotes section
    footnoteSection.style.display = 'none';

    function updatePositions() {
        if (isNarrow()) {
            // Inline flow: clear any absolute positioning from a resize
            sidenotes.forEach(function(sidenote) {
                sidenote.style.position = '';
                sidenote.style.left = '';
                sidenote.style.top = '';
            });
            return;
        }

        const paperRect = paperContainer.getBoundingClientRect();
        const paperTop = window.scrollY + paperRect.top;
        const positions = [];

        footnoteLinks.forEach(function(link, index) {
            const sidenote = sidenotes[index];
            if (sidenote) {
                const linkRect = link.getBoundingClientRect();
                const linkTop = linkRect.top + window.scrollY;
                const preferredTop = linkTop - paperTop - 10;
                positions.push({ sidenote: sidenote, actualTop: preferredTop });
            }
        });

        // Resolve overlaps top-down
        positions.sort((a, b) => a.actualTop - b.actualTop);
        for (let i = 0; i < positions.length; i++) {
            for (let j = 0; j < i; j++) {
                const previousBottom = positions[j].actualTop +
                    positions[j].sidenote.offsetHeight + 10;
                if (positions[i].actualTop < previousBottom) {
                    positions[i].actualTop = previousBottom;
                }
            }
            positions[i].sidenote.style.position = 'absolute';
            // The wrapper's side padding means the text ends ~75px inside
            // the container, so a negative offset still clears the text
            positions[i].sidenote.style.left = 'calc(100% - 15px)';
            positions[i].sidenote.style.top = `${positions[i].actualTop}px`;
        }
    }

    updatePositions();

    let ticking = false;
    function requestUpdate() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updatePositions();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestUpdate);
    window.addEventListener('resize', requestUpdate);
});
