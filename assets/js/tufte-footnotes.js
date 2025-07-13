// Transform footnotes into Tufte-style sidenotes outside the paper
document.addEventListener('DOMContentLoaded', function() {
    // Only run on post pages that have footnotes
    const footnoteSection = document.querySelector('.footnotes');
    if (!footnoteSection) return;
    
    const footnoteLinks = document.querySelectorAll('a.footnote');
    const footnoteList = footnoteSection.querySelector('ol');
    const paperContainer = document.querySelector('.paper-container');
    
    if (!footnoteList || footnoteLinks.length === 0 || !paperContainer) return;
    
    // Process each footnote
    footnoteLinks.forEach(function(link, index) {
        const footnoteId = link.getAttribute('href').substring(1); // Remove #
        const footnoteContent = document.getElementById(footnoteId);
        
        if (!footnoteContent) return;
        
        // Get the footnote text (remove the back-reference link)
        const footnoteText = footnoteContent.cloneNode(true);
        const backRef = footnoteText.querySelector('.reversefootnote');
        if (backRef) backRef.remove();
        
        // Create sidenote element
        const sidenote = document.createElement('div');
        sidenote.className = 'sidenote';
        sidenote.innerHTML = `
            <span class="sidenote-number">${index + 1}</span>
            ${footnoteText.innerHTML}
        `;
        
        // Insert sidenote into the paper container (so it can be positioned relative to it)
        paperContainer.appendChild(sidenote);
        
        // Remove click functionality from footnote link
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Optional: smooth scroll to sidenote
            sidenote.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    });
    
    // Hide the original footnotes section
    footnoteSection.style.display = 'none';
    
    // Position sidenotes function
    function updatePositions() {
        const paperRect = paperContainer.getBoundingClientRect();
        const paperTop = window.scrollY + paperRect.top;
        
        footnoteLinks.forEach(function(link, index) {
            const sidenote = paperContainer.querySelectorAll('.sidenote')[index];
            if (sidenote) {
                const linkRect = link.getBoundingClientRect();
                const linkTop = linkRect.top + window.scrollY;
                
                // Position relative to paper container
                const relativeTop = linkTop - paperTop;
                
                // Position to the right of the paper with some spacing
                sidenote.style.position = 'absolute';
                sidenote.style.left = `calc(100% + 20px)`;
                sidenote.style.top = `${relativeTop - 10}px`;
            }
        });
    }
    
    // Initial positioning
    updatePositions();
    
    // Update positions on scroll/resize
    let ticking = false;
    function requestUpdate() {
        if (!ticking) {
            requestAnimationFrame(updatePositions);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestUpdate);
    window.addEventListener('resize', requestUpdate);
});