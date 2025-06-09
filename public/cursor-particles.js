// Cursor Particle Effect
(function() {
    // Configuration with defaults
    const config = {
        particleCount: 20,
        sizeRange: { min: 2, max: 5 },
        colors: [
            '#FFB3BA', // Pastel pink
            '#BAFFC9', // Pastel green
            '#BAE1FF', // Pastel blue
            '#FFFFBA', // Pastel yellow
            '#FFE4BA'  // Pastel orange
        ],
        followDelay: 0.2,
        containerClass: 'cursor-particles-container'
    };

    // Create container
    const container = document.createElement('div');
    container.className = config.containerClass;
    Object.assign(container.style, {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: '9999'
    });

    // Particle class
    class Particle {
        constructor() {
            this.element = document.createElement('div');
            this.size = Math.random() * (config.sizeRange.max - config.sizeRange.min) + config.sizeRange.min;
            this.color = config.colors[Math.floor(Math.random() * config.colors.length)];
            
            Object.assign(this.element.style, {
                position: 'absolute',
                width: `${this.size}px`,
                height: `${this.size}px`,
                backgroundColor: this.color,
                borderRadius: '50%',
                pointerEvents: 'none',
                transition: `transform ${config.followDelay}s ease-out`
            });

            container.appendChild(this.element);
            this.reset();
        }

        reset() {
            this.x = 0;
            this.y = 0;
            this.element.style.transform = 'translate(-50%, -50%)';
            this.element.style.opacity = '0';
        }

        update(x, y) {
            this.x = x;
            this.y = y;
            this.element.style.transform = `translate(${x}px, ${y}px)`;
            this.element.style.opacity = '1';
        }
    }

    // Main effect class
    class CursorParticles {
        constructor() {
            this.particles = [];
            this.mouseX = 0;
            this.mouseY = 0;
            this.isInitialized = false;
        }

        init() {
            if (this.isInitialized) return;
            
            // Create particles
            for (let i = 0; i < config.particleCount; i++) {
                this.particles.push(new Particle());
            }

            // Add container to body
            document.body.appendChild(container);

            // Add event listeners
            document.addEventListener('mousemove', this.handleMouseMove.bind(this));
            document.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
            document.addEventListener('mouseenter', this.handleMouseEnter.bind(this));

            this.isInitialized = true;
        }

        handleMouseMove(e) {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;

            // Update particles with staggered delay
            this.particles.forEach((particle, index) => {
                const delay = (index / this.particles.length) * config.followDelay;
                setTimeout(() => {
                    particle.update(this.mouseX, this.mouseY);
                }, delay * 1000);
            });
        }

        handleMouseLeave() {
            this.particles.forEach(particle => particle.reset());
        }

        handleMouseEnter() {
            this.handleMouseMove({ clientX: this.mouseX, clientY: this.mouseY });
        }
    }

    // Initialize effect
    const cursorParticles = new CursorParticles();
    cursorParticles.init();
})(); 