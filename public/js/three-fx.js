/**
 * Tejanjali 3D Visual Effects Engine
 * A subtle, highly-optimized Three.js layer for the artist portfolio.
 */
class TejanjaliFX {
    constructor() {
        this.canvas = document.getElementById('webgl-canvas');
        if (!this.canvas) return;

        // Check for reduced motion preference
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Configuration defaults (can be overridden by API)
        this.config = {
            enabled: true,
            heroParticles: true,
            parallax: true,
            quality: 'Auto' // Auto, Low, Medium, High
        };

        this.initialized = false;
        this.mouseX = 0;
        this.mouseY = 0;
        this.targetX = 0;
        this.targetY = 0;
        
        // Wait for config from the main app or initialize immediately with defaults
        document.addEventListener('contentLoaded', (e) => {
            const data = e.detail;
            if (data.fx_enabled === '0') this.config.enabled = false;
            if (data.fx_hero === '0') this.config.heroParticles = false;
            if (data.fx_parallax === '0') this.config.parallax = false;
            if (data.fx_quality) this.config.quality = data.fx_quality;
            
            this.init();
        });

        // Fallback init in case event is missed
        setTimeout(() => { if (!this.initialized) this.init(); }, 1500);
    }

    init() {
        if (this.initialized || !this.config.enabled) return;
        this.initialized = true;

        if (this.prefersReducedMotion) {
            console.log("Three.js FX: Reduced motion enabled. Disabling heavy WebGL.");
            return;
        }

        // Scene Setup
        this.scene = new THREE.Scene();
        // Very subtle fog to blend into the #09080d background
        this.scene.fog = new THREE.FogExp2(0x09080d, 0.002);

        // Camera Setup
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
        this.camera.position.z = 400;

        // Renderer Setup
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: this.canvas, 
            alpha: true, 
            antialias: false,
            powerPreference: "high-performance"
        });
        
        // Quality Scaling
        let pixelRatio = window.devicePixelRatio;
        if (this.config.quality === 'Low' || window.innerWidth < 768) {
            pixelRatio = 1;
        } else if (this.config.quality === 'Medium') {
            pixelRatio = Math.min(window.devicePixelRatio, 1.5);
        }
        
        this.renderer.setPixelRatio(pixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        // Build Effects
        if (this.config.heroParticles) {
            this.buildParticleWave();
        }

        // Event Listeners
        window.addEventListener('resize', this.onWindowResize.bind(this), { passive: true });
        
        if (this.config.parallax) {
            document.addEventListener('mousemove', this.onDocumentMouseMove.bind(this), { passive: true });
        }

        // Start Loop
        this.animate();
        
        // Fade in canvas gracefully
        this.canvas.style.transition = "opacity 2s ease-in-out";
        this.canvas.style.opacity = "1";
    }

    buildParticleWave() {
        // Amount of particles based on quality/device
        const particleCount = (window.innerWidth < 768 || this.config.quality === 'Low') ? 800 : 2500;
        
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const scales = new Float32Array(particleCount);

        const rangeX = 1500;
        const rangeZ = 1000;

        for (let i = 0; i < particleCount; i++) {
            const x = (Math.random() - 0.5) * rangeX;
            const y = (Math.random() - 0.5) * 300 - 100;
            const z = (Math.random() - 0.5) * rangeZ;

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            scales[i] = Math.random();
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

        // Create a circular particle texture procedurally
        const canvas = document.createElement('canvas');
        canvas.width = 32; canvas.height = 32;
        const context = canvas.getContext('2d');
        const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, 'rgba(255,255,255,1)');
        gradient.addColorStop(1, 'rgba(255,255,255,0)');
        context.fillStyle = gradient;
        context.fillRect(0, 0, 32, 32);
        const texture = new THREE.CanvasTexture(canvas);

        const material = new THREE.PointsMaterial({
            color: 0xF2E9DC, // Warm Ivory
            size: 4,
            map: texture,
            transparent: true,
            opacity: 0.4,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    onDocumentMouseMove(event) {
        this.mouseX = (event.clientX - window.innerWidth / 2);
        this.mouseY = (event.clientY - window.innerHeight / 2);
    }

    onWindowResize() {
        if (!this.camera || !this.renderer) return;
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.render();
    }

    render() {
        const time = Date.now() * 0.00005;

        // Parallax easing
        if (this.config.parallax) {
            this.targetX = this.mouseX * 0.05;
            this.targetY = this.mouseY * 0.05;
            this.camera.position.x += (this.targetX - this.camera.position.x) * 0.02;
            this.camera.position.y += (-this.targetY - this.camera.position.y) * 0.02;
            this.camera.lookAt(this.scene.position);
        }

        // Animate particles
        if (this.particles) {
            const positions = this.particles.geometry.attributes.position.array;
            
            let i = 0;
            for (let ix = 0; ix < 100; ix++) {
                for (let iy = 0; iy < (positions.length / 300); iy++) {
                    const idx = (ix * Math.floor(positions.length / 300) + iy) * 3;
                    if (idx < positions.length) {
                        // Create a subtle flowing wave effect
                        positions[idx + 1] += Math.sin((ix + time * 10) * 0.3) * 0.2;
                    }
                }
            }
            this.particles.geometry.attributes.position.needsUpdate = true;
            
            // Slow rotation of the entire system
            this.particles.rotation.y = time * 0.5;
        }

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Only load Three.js dynamically to avoid blocking initial render
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = () => {
        window.tejanjaliFX = new TejanjaliFX();
    };
    document.body.appendChild(script);
});
