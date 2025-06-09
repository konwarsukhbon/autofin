// Background Effects System
(function() {
    // Configuration
    const config = {
        parallaxIntensity: 0.05,
        scrollThreshold: 100,
        ctaSelector: 'a[href="/dashboard"], a[href="/knowmorepage"]',
        debounceTime: 16 // ~60fps
    };

    class BackgroundEffects {
        constructor() {
            this.init();
        }

        init() {
            // Create background container
            this.createBackgroundContainer();
            
            // Initialize effects
            this.initParallax();
            this.initScrollEffects();
            this.initCTAHover();
            
            // Add event listeners
            this.addEventListeners();
        }

        createBackgroundContainer() {
            this.bgContainer = document.createElement('div');
            this.bgContainer.className = 'interactive-bg';
            document.body.appendChild(this.bgContainer);
            
            // Fade in background
            requestAnimationFrame(() => {
                this.bgContainer.style.opacity = '1';
            });
        }

        initParallax() {
            this.parallaxLayers = document.querySelectorAll('.parallax-layer-1, .parallax-layer-2');
        }

        initScrollEffects() {
            this.scrollElements = document.querySelectorAll('.scroll-fade');
            this.updateScrollEffects();
        }

        initCTAHover() {
            this.ctaElements = document.querySelectorAll(config.ctaSelector);
            this.ctaElements.forEach(cta => {
                cta.classList.add('cta-hover-effect');
            });
        }

        addEventListeners() {
            // Mouse move for parallax
            document.addEventListener('mousemove', this.debounce(this.handleMouseMove.bind(this)));
            
            // Scroll for fade effects
            window.addEventListener('scroll', this.debounce(this.handleScroll.bind(this)));
            
            // CTA hover effects
            this.ctaElements.forEach(cta => {
                cta.addEventListener('mousemove', this.handleCTAHover.bind(this));
            });
        }

        handleMouseMove(e) {
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            // Calculate parallax offset
            const offsetX = (clientX - centerX) * config.parallaxIntensity;
            const offsetY = (clientY - centerY) * config.parallaxIntensity;
            
            // Apply parallax effect
            this.parallaxLayers.forEach((layer, index) => {
                const intensity = index === 0 ? 1 : 0.5;
                layer.style.transform = `translate(${offsetX * intensity}px, ${offsetY * intensity}px)`;
            });
        }

        handleScroll() {
            this.updateScrollEffects();
        }

        updateScrollEffects() {
            const scrollY = window.scrollY;
            
            this.scrollElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementBottom = element.getBoundingClientRect().bottom;
                
                if (elementTop < window.innerHeight && elementBottom > 0) {
                    const opacity = 1 - (Math.abs(elementTop) / window.innerHeight);
                    element.style.opacity = Math.max(0, Math.min(1, opacity));
                }
            });
        }

        handleCTAHover(e) {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
            e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
        }

        debounce(func) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, config.debounceTime);
            };
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => new BackgroundEffects());
    } else {
        new BackgroundEffects();
    }
})(); 