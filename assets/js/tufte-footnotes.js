// Transform footnotes into Tufte-style sidenotes outside the paper
document.addEventListener('DOMContentLoaded', function() {
    // Only run on post pages that have footnotes
    const footnoteSection = document.querySelector('.footnotes');
    if (!footnoteSection) return;
    
    const footnoteLinks = document.querySelectorAll('a.footnote');
    const footnoteList = footnoteSection.querySelector('ol');
    const paperContainer = document.querySelector('.paper-container');
    
    if (!footnoteList || footnoteLinks.length === 0 || !paperContainer) return;
    
    let currentVisibleSidenote = null;
    let overlay = null;
    
    // Check if we're on mobile
    function isMobile() {
        return window.innerWidth <= 1200;
    }
    
    // Create overlay for mobile
    function createOverlay() {
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'sidenote-overlay';
            document.body.appendChild(overlay);
            
            // Click overlay to close
            overlay.addEventListener('click', closeMobileSidenote);
        }
        return overlay;
    }
    
    // Close mobile sidenote
    function closeMobileSidenote() {
        if (currentVisibleSidenote) {
            currentVisibleSidenote.classList.remove('visible');
            if (overlay) overlay.classList.remove('visible');
            currentVisibleSidenote = null;
            
            // Re-enable scrolling
            document.body.style.overflow = '';
        }
    }
    
    // Show mobile sidenote
    function showMobileSidenote(sidenote) {
        closeMobileSidenote(); // Close any existing one
        
        currentVisibleSidenote = sidenote;
        const overlayEl = createOverlay();
        
        // Disable scrolling
        document.body.style.overflow = 'hidden';
        
        // Show overlay and sidenote
        overlayEl.classList.add('visible');
        sidenote.classList.add('visible');
    }
    
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
            <button class="sidenote-close" aria-label="Close footnote">×</button>
            <span class="sidenote-number">${index + 1}</span>
            ${footnoteText.innerHTML}
        `;
        
        // Insert sidenote into the paper container (so it can be positioned relative to it)
        paperContainer.appendChild(sidenote);
        
        // Add close button functionality
        const closeBtn = sidenote.querySelector('.sidenote-close');
        closeBtn.addEventListener('click', closeMobileSidenote);
        
        // Handle footnote link clicks
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (isMobile()) {
                showMobileSidenote(sidenote);
            } else {
                // Desktop: smooth scroll to sidenote
                sidenote.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });
    
    // Hide the original footnotes section
    footnoteSection.style.display = 'none';
    
    // Position sidenotes function (desktop only)
    function updatePositions() {
        if (isMobile()) return; // Don't position on mobile
        
        const paperRect = paperContainer.getBoundingClientRect();
        const paperTop = window.scrollY + paperRect.top;
        const sidenotes = paperContainer.querySelectorAll('.sidenote');
        const positions = [];
        
        // First pass: calculate preferred positions
        footnoteLinks.forEach(function(link, index) {
            const sidenote = sidenotes[index];
            if (sidenote) {
                const linkRect = link.getBoundingClientRect();
                const linkTop = linkRect.top + window.scrollY;
                
                // Position relative to paper container
                const relativeTop = linkTop - paperTop;
                const preferredTop = relativeTop - 10;
                
                positions.push({
                    sidenote: sidenote,
                    preferredTop: preferredTop,
                    actualTop: preferredTop,
                    index: index
                });
            }
        });
        
        // Second pass: resolve overlaps
        positions.sort((a, b) => a.preferredTop - b.preferredTop);
        
        for (let i = 0; i < positions.length; i++) {
            const current = positions[i];
            
            // Check for overlap with previous sidenotes
            for (let j = 0; j < i; j++) {
                const previous = positions[j];
                const previousBottom = previous.actualTop + previous.sidenote.offsetHeight + 10; // 10px gap
                
                if (current.actualTop < previousBottom) {
                    current.actualTop = previousBottom;
                }
            }
            
            // Apply positioning
            current.sidenote.style.position = 'absolute';
            current.sidenote.style.left = `calc(100% + 20px)`;
            current.sidenote.style.top = `${current.actualTop}px`;
        }
    }
    
    // Initial positioning
    updatePositions();
    
    // Update positions on scroll/resize
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
    window.addEventListener('resize', function() {
        requestUpdate();
        
        // Close mobile sidenote if switching to desktop
        if (!isMobile() && currentVisibleSidenote) {
            closeMobileSidenote();
        }
    });
    
    // Handle escape key to close mobile sidenote
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && currentVisibleSidenote) {
            closeMobileSidenote();
        }
    });
});