// script.js
document.addEventListener('DOMContentLoaded', function() {
    // --- Smooth entrance animation for cards (stagger) ---
    const cards = document.querySelectorAll('.card');
    
    // Add a small staggered fade-in for cards (they already have fadeSlide on container)
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        // Stagger delay based on index
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 150 + (index * 100));
    });

    // --- Interactive skill pills: subtle click feedback ---
    const skillPills = document.querySelectorAll('.skill-pill');
    skillPills.forEach(pill => {
        pill.addEventListener('click', function(e) {
            // Create a tiny ripple effect
            const originalBg = this.style.backgroundColor;
            this.style.backgroundColor = '#d4b8f0';
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.backgroundColor = originalBg || '';
                this.style.transform = '';
            }, 200);
            
            // Optional: show skill in console (for fun)
            console.log(`Skill clicked: ${this.textContent.trim()}`);
        });
    });

    // --- Contact links: add a subtle "copied" feedback for email/phone ---
    const contactLinks = document.querySelectorAll('.contact-links a');
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // If it's a mailto or tel, we can show a small toast-like feedback
            if (href && (href.startsWith('mailto:') || href.startsWith('tel:'))) {
                e.preventDefault(); // prevent default to show feedback
                const originalText = this.innerHTML;
                const icon = this.querySelector('i');
                const textNode = this.childNodes[1]; // get text node after icon
                
                // Show feedback
                this.style.background = '#e8ddf5';
                this.style.borderColor = '#b294d1';
                
                // Change icon temporarily
                if (icon) {
                    const originalIcon = icon.className;
                    icon.className = 'fas fa-check-circle';
                    icon.style.color = '#4f2d73';
                    
                    setTimeout(() => {
                        icon.className = originalIcon;
                        icon.style.color = '';
                        this.style.background = '';
                        this.style.borderColor = '';
                    }, 1200);
                }
                
                // For email, we could copy to clipboard
                if (href.startsWith('mailto:')) {
                    const email = href.replace('mailto:', '');
                    navigator.clipboard?.writeText(email).then(() => {
                        // Show a tiny tooltip-like message
                        showFloatingMessage('📧 Email copied!', this);
                    }).catch(() => {});
                } else if (href.startsWith('tel:')) {
                    const phone = href.replace('tel:', '');
                    navigator.clipboard?.writeText(phone).then(() => {
                        showFloatingMessage('📱 Phone copied!', this);
                    }).catch(() => {});
                }
            }
        });
    });

    // --- Helper: floating message near element ---
    function showFloatingMessage(text, anchorElement) {
        // Remove any existing floating messages
        const existing = document.querySelector('.floating-toast');
        if (existing) existing.remove();
        
        const rect = anchorElement.getBoundingClientRect();
        const toast = document.createElement('div');
        toast.className = 'floating-toast';
        toast.textContent = text;
        toast.style.position = 'fixed';
        toast.style.bottom = (window.innerHeight - rect.top + 16) + 'px';
        toast.style.left = (rect.left + rect.width/2 - 60) + 'px';
        toast.style.background = '#2d1d44';
        toast.style.color = 'white';
        toast.style.padding = '0.4rem 1rem';
        toast.style.borderRadius = '40px';
        toast.style.fontSize = '0.8rem';
        toast.style.fontWeight = '600';
        toast.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
        toast.style.zIndex = '999';
        toast.style.backdropFilter = 'blur(4px)';
        toast.style.border = '1px solid rgba(255,255,255,0.1)';
        toast.style.pointerEvents = 'none';
        toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(8px)';
        
        document.body.appendChild(toast);
        
        // Trigger animation
        requestAnimationFrame(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        });
        
        // Auto remove after 2s
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(8px)';
            setTimeout(() => toast.remove(), 400);
        }, 1800);
    }

    // --- Project items: add hover highlight effect ---
    const projectItems = document.querySelectorAll('.project-list li');
    projectItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(123, 75, 154, 0.04)';
            this.style.borderRadius = '8px';
            this.style.paddingLeft = '0.6rem';
            this.style.transition = 'all 0.2s ease';
        });
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
            this.style.paddingLeft = '';
        });
    });

    // --- Experience items: toggle extra details on click (optional playful) ---
    const expItems = document.querySelectorAll('.exp-item');
    expItems.forEach(item => {
        item.style.cursor = 'default';
        // Add a subtle double-click to expand (just for fun)
        item.addEventListener('dblclick', function() {
            const desc = this.querySelector('.exp-desc');
            if (desc) {
                if (desc.style.maxHeight) {
                    desc.style.maxHeight = null;
                    desc.style.opacity = '0.6';
                    setTimeout(() => { desc.style.opacity = ''; }, 300);
                } else {
                    desc.style.maxHeight = desc.scrollHeight + 'px';
                    desc.style.transition = 'max-height 0.4s ease, opacity 0.3s ease';
                    desc.style.opacity = '1';
                }
            }
        });
    });

    // --- Add a subtle parallax effect on card hover (optional) ---
    const portfolioContainer = document.querySelector('.portfolio');
    document.addEventListener('mousemove', function(e) {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        // Only apply a very subtle tilt to the container
        portfolioContainer.style.transform = `perspective(1200px) rotateX(${y * 0.3}deg) rotateY(${x * 0.3}deg)`;
        portfolioContainer.style.transition = 'transform 0.1s ease';
    });

    // Reset transform on mouse leave
    document.addEventListener('mouseleave', function() {
        portfolioContainer.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
        portfolioContainer.style.transition = 'transform 0.5s ease';
    });

    // --- Small feature: dynamic year in footer ---
    const footerSpan = document.querySelector('.footer-note span:last-child');
    if (footerSpan) {
        const currentYear = new Date().getFullYear();
        // Only update if it contains '2026' or similar
        if (footerSpan.textContent.includes('2026')) {
            footerSpan.textContent = `karachi · ${currentYear}`;
        }
    }

    // --- Console greeting (personal touch) ---
    console.log('🌟 Minahil Portfolio');
    console.log('📧 minahil4864@gmail.com');
    console.log('🚀 Built with Inter, GSAP-ready & love.');

    // --- Optional: track which skills are most hovered (just for fun) ---
    const skillHoverCount = {};
    skillPills.forEach(pill => {
        const name = pill.textContent.trim();
        skillHoverCount[name] = 0;
        pill.addEventListener('mouseenter', function() {
            skillHoverCount[name]++;
            // console.log(`🔥 ${name} hovered ${skillHoverCount[name]} times`);
        });
    });

    // --- Add a small "back to top" style indicator (just visual) ---
    // We'll add a subtle scroll progress ring in the corner? Not necessary, keep minimal.
    console.log('✨ Portfolio ready — enjoy!');
});