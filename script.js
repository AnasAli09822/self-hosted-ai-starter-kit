// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Global variables
let heroScene, heroCamera, heroRenderer;
let solutionsScene, solutionsCamera, solutionsRenderer;
let ctaScene, ctaCamera, ctaRenderer;
let particles = [];
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeLoading();
    initializeHero3D();
    initializeSolutions3D();
    initializeCTA3D();
    initializeScrollAnimations();
    initializeTestimonialCarousel();
    initializePlatformAnimations();
    initializeTemplateFlips();
    initializeTiltEffects();
    initializeParticles();
    initializeNavigation();
    
    // Remove loading class after everything is initialized
    setTimeout(() => {
        document.body.classList.add('loading');
    }, 500);
});

// Loading Animation
function initializeLoading() {
    const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => observer.observe(el));
}

// Hero 3D Animation
function initializeHero3D() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    
    // Scene setup
    heroScene = new THREE.Scene();
    heroCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    heroRenderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    heroRenderer.setSize(window.innerWidth, window.innerHeight);
    heroRenderer.setClearColor(0x000000, 0);
    
    // Create floating geometric shapes
    const geometries = [
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.SphereGeometry(0.7, 8, 6),
        new THREE.ConeGeometry(0.7, 1.5, 8),
        new THREE.OctahedronGeometry(0.8)
    ];
    
    const materials = [
        new THREE.MeshBasicMaterial({ 
            color: 0x667eea, 
            transparent: true, 
            opacity: 0.6,
            wireframe: true 
        }),
        new THREE.MeshBasicMaterial({ 
            color: 0x764ba2, 
            transparent: true, 
            opacity: 0.4,
            wireframe: true 
        }),
        new THREE.MeshBasicMaterial({ 
            color: 0x06b6d4, 
            transparent: true, 
            opacity: 0.5,
            wireframe: true 
        })
    ];
    
    const meshes = [];
    
    for (let i = 0; i < 15; i++) {
        const geometry = geometries[Math.floor(Math.random() * geometries.length)];
        const material = materials[Math.floor(Math.random() * materials.length)];
        const mesh = new THREE.Mesh(geometry, material);
        
        mesh.position.x = (Math.random() - 0.5) * 20;
        mesh.position.y = (Math.random() - 0.5) * 20;
        mesh.position.z = (Math.random() - 0.5) * 20;
        
        mesh.rotation.x = Math.random() * Math.PI;
        mesh.rotation.y = Math.random() * Math.PI;
        
        mesh.userData = {
            originalPosition: mesh.position.clone(),
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.02,
                y: (Math.random() - 0.5) * 0.02,
                z: (Math.random() - 0.5) * 0.02
            }
        };
        
        heroScene.add(mesh);
        meshes.push(mesh);
    }
    
    heroCamera.position.z = 15;
    
    // Animation loop
    function animateHero() {
        requestAnimationFrame(animateHero);
        
        meshes.forEach(mesh => {
            mesh.rotation.x += mesh.userData.rotationSpeed.x;
            mesh.rotation.y += mesh.userData.rotationSpeed.y;
            mesh.rotation.z += mesh.userData.rotationSpeed.z;
            
            // Floating motion
            mesh.position.y = mesh.userData.originalPosition.y + Math.sin(Date.now() * 0.001 + mesh.position.x) * 0.5;
        });
        
        heroRenderer.render(heroScene, heroCamera);
    }
    
    animateHero();
}

// Solutions Network 3D Animation
function initializeSolutions3D() {
    const canvas = document.getElementById('solutions-canvas');
    if (!canvas) return;
    
    solutionsScene = new THREE.Scene();
    solutionsCamera = new THREE.PerspectiveCamera(75, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000);
    solutionsRenderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    solutionsRenderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    solutionsRenderer.setClearColor(0x000000, 0);
    
    // Create connecting lines between nodes
    const lineMaterial = new THREE.LineBasicMaterial({ 
        color: 0x667eea, 
        transparent: true, 
        opacity: 0.3 
    });
    
    const nodes = [
        { x: -3, y: 2, z: 0 },
        { x: 3, y: 2, z: 0 },
        { x: -3, y: -2, z: 0 },
        { x: 3, y: -2, z: 0 }
    ];
    
    const lines = [];
    
    // Create lines between all nodes
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const geometry = new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(nodes[i].x, nodes[i].y, nodes[i].z),
                new THREE.Vector3(nodes[j].x, nodes[j].y, nodes[j].z)
            ]);
            
            const line = new THREE.Line(geometry, lineMaterial);
            solutionsScene.add(line);
            lines.push(line);
        }
    }
    
    // Create pulsing node spheres
    const nodeSpheres = [];
    nodes.forEach((node, index) => {
        const geometry = new THREE.SphereGeometry(0.2, 16, 16);
        const material = new THREE.MeshBasicMaterial({ 
            color: [0x667eea, 0xf093fb, 0x4facfe, 0xff9a9e][index],
            transparent: true,
            opacity: 0.8
        });
        
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(node.x, node.y, node.z);
        sphere.userData.originalScale = sphere.scale.clone();
        
        solutionsScene.add(sphere);
        nodeSpheres.push(sphere);
    });
    
    solutionsCamera.position.z = 8;
    
    // Animation loop
    function animateSolutions() {
        requestAnimationFrame(animateSolutions);
        
        const time = Date.now() * 0.001;
        
        // Animate node spheres
        nodeSpheres.forEach((sphere, index) => {
            const scale = 1 + Math.sin(time * 2 + index) * 0.3;
            sphere.scale.setScalar(scale);
        });
        
        // Animate line opacity
        lines.forEach((line, index) => {
            line.material.opacity = 0.2 + Math.sin(time * 3 + index) * 0.2;
        });
        
        solutionsRenderer.render(solutionsScene, solutionsCamera);
    }
    
    animateSolutions();
}

// CTA Particle Animation
function initializeCTA3D() {
    const canvas = document.getElementById('cta-canvas');
    if (!canvas) return;
    
    ctaScene = new THREE.Scene();
    ctaCamera = new THREE.PerspectiveCamera(75, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000);
    ctaRenderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    ctaRenderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    ctaRenderer.setClearColor(0x000000, 0);
    
    // Create floating particles
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 100;
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 20;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
        color: 0x4facfe,
        size: 0.1,
        transparent: true,
        opacity: 0.6
    });
    
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    ctaScene.add(particleSystem);
    
    ctaCamera.position.z = 10;
    
    // Animation loop
    function animateCTA() {
        requestAnimationFrame(animateCTA);
        
        const time = Date.now() * 0.0005;
        
        // Rotate particle system
        particleSystem.rotation.y = time;
        particleSystem.rotation.x = time * 0.5;
        
        // Update particle positions
        const positions = particleSystem.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
            positions[i + 1] += Math.sin(time + positions[i]) * 0.01;
        }
        particleSystem.geometry.attributes.position.needsUpdate = true;
        
        ctaRenderer.render(ctaScene, ctaCamera);
    }
    
    animateCTA();
}

// Scroll Animations with GSAP
function initializeScrollAnimations() {
    // Hero content animation
    gsap.from('.hero-content', {
        duration: 1.5,
        y: 100,
        opacity: 0,
        ease: "power3.out",
        delay: 0.5
    });
    
    // Platform icons staggered animation
    gsap.from('.platform-icon', {
        duration: 0.8,
        scale: 0,
        rotation: 180,
        ease: "back.out(1.7)",
        stagger: 0.2,
        scrollTrigger: {
            trigger: '.social-platforms',
            start: 'top 80%'
        }
    });
    
    // Solution cards animation
    gsap.from('.solution-card', {
        duration: 1,
        y: 100,
        opacity: 0,
        rotationX: 45,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
            trigger: '.solution-cards',
            start: 'top 80%'
        }
    });
    
    // Benefits animation
    gsap.from('.benefit-item', {
        duration: 0.8,
        x: -100,
        opacity: 0,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
            trigger: '.benefits-list',
            start: 'top 80%'
        }
    });
    
    // Template cards animation
    gsap.from('.template-card', {
        duration: 1,
        scale: 0.8,
        opacity: 0,
        rotationY: 45,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
            trigger: '.templates-grid',
            start: 'top 80%'
        }
    });
    
    // Solution nodes animation
    gsap.from('.solution-node', {
        duration: 1.2,
        scale: 0,
        opacity: 0,
        ease: "elastic.out(1, 0.5)",
        stagger: 0.2,
        scrollTrigger: {
            trigger: '.solution-nodes',
            start: 'top 80%'
        }
    });
    
    // Journey steps animation
    gsap.utils.toArray('.journey-step').forEach((step, index) => {
        gsap.from(step, {
            duration: 1,
            y: 100,
            opacity: 0,
            ease: "power3.out",
            scrollTrigger: {
                trigger: step,
                start: 'top 85%'
            }
        });
    });
}

// Testimonial Carousel
function initializeTestimonialCarousel() {
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const dots = document.querySelectorAll('.dot');
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.toggle('active', i === index);
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentTestimonial = index;
    }
    
    function nextTestimonial() {
        const next = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(next);
    }
    
    function prevTestimonial() {
        const prev = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(prev);
    }
    
    if (nextBtn) nextBtn.addEventListener('click', nextTestimonial);
    if (prevBtn) prevBtn.addEventListener('click', prevTestimonial);
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showTestimonial(index));
    });
    
    // Auto-play carousel
    setInterval(nextTestimonial, 5000);
}

// Platform Icons Animation
function initializePlatformAnimations() {
    const platforms = document.querySelectorAll('.platform-icon');
    
    platforms.forEach((platform, index) => {
        platform.addEventListener('mouseenter', () => {
            gsap.to(platform, {
                duration: 0.3,
                scale: 1.2,
                rotationY: 360,
                ease: "power2.out"
            });
            
            // Add ripple effect
            createRipple(platform);
        });
        
        platform.addEventListener('mouseleave', () => {
            gsap.to(platform, {
                duration: 0.3,
                scale: 1,
                rotationY: 0,
                ease: "power2.out"
            });
        });
        
        // Staggered entrance animation
        gsap.from(platform, {
            duration: 0.8,
            scale: 0,
            rotation: 180,
            ease: "back.out(1.7)",
            delay: index * 0.2
        });
    });
}

// Template Card Flip Effects
function initializeTemplateFlips() {
    const templateCards = document.querySelectorAll('.template-card');
    
    templateCards.forEach(card => {
        let isFlipped = false;
        
        card.addEventListener('click', () => {
            if (!isFlipped) {
                gsap.to(card.querySelector('.card-front'), {
                    duration: 0.6,
                    rotationY: 180,
                    ease: "power2.inOut"
                });
                
                gsap.to(card.querySelector('.card-back'), {
                    duration: 0.6,
                    rotationY: 0,
                    ease: "power2.inOut"
                });
                
                isFlipped = true;
            } else {
                gsap.to(card.querySelector('.card-front'), {
                    duration: 0.6,
                    rotationY: 0,
                    ease: "power2.inOut"
                });
                
                gsap.to(card.querySelector('.card-back'), {
                    duration: 0.6,
                    rotationY: -180,
                    ease: "power2.inOut"
                });
                
                isFlipped = false;
            }
        });
    });
}

// 3D Tilt Effects
function initializeTiltEffects() {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * -10;
            const rotateY = (x - centerX) / centerX * 10;
            
            gsap.to(element, {
                duration: 0.3,
                rotationX: rotateX,
                rotationY: rotateY,
                transformPerspective: 1000,
                ease: "power2.out"
            });
        });
        
        element.addEventListener('mouseleave', () => {
            gsap.to(element, {
                duration: 0.5,
                rotationX: 0,
                rotationY: 0,
                ease: "power2.out"
            });
        });
    });
}

// Particle System for Hero
function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 50; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: radial-gradient(circle, rgba(79, 172, 254, 0.8) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
    `;
    
    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    container.appendChild(particle);
    
    // Animate particle
    gsap.to(particle, {
        duration: Math.random() * 3 + 2,
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 200,
        opacity: 0,
        scale: Math.random() * 2,
        ease: "power2.out",
        repeat: -1,
        repeatRefresh: true
    });
}

// Ripple Effect
function createRipple(element) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
        transform: translate(-50%, -50%) scale(0);
        pointer-events: none;
        z-index: 1;
    `;
    
    element.appendChild(ripple);
    
    gsap.to(ripple, {
        duration: 0.6,
        scale: 2,
        opacity: 0,
        ease: "power2.out",
        onComplete: () => ripple.remove()
    });
}

// Navigation
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: target,
                        offsetY: 80
                    },
                    ease: "power2.inOut"
                });
            }
        });
    });
}

// CTA Button Interactions
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function() {
        // Add click animation
        gsap.to(this, {
            duration: 0.1,
            scale: 0.95,
            ease: "power2.out",
            yoyo: true,
            repeat: 1
        });
        
        // Create success ripple
        createSuccessRipple(this);
        
        // Here you would typically handle the actual CTA action
        console.log('CTA clicked - redirect to signup/demo');
    });
    
    button.addEventListener('mouseenter', function() {
        gsap.to(this, {
            duration: 0.3,
            scale: 1.05,
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
            ease: "power2.out"
        });
    });
    
    button.addEventListener('mouseleave', function() {
        gsap.to(this, {
            duration: 0.3,
            scale: 1,
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
            ease: "power2.out"
        });
    });
});

function createSuccessRipple(element) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(16, 185, 129, 0.6) 0%, transparent 70%);
        transform: translate(-50%, -50%) scale(0);
        pointer-events: none;
        z-index: 10;
    `;
    
    element.appendChild(ripple);
    
    gsap.to(ripple, {
        duration: 0.8,
        scale: 4,
        opacity: 0,
        ease: "power2.out",
        onComplete: () => ripple.remove()
    });
}

// Resize handling
window.addEventListener('resize', () => {
    // Update canvas sizes
    if (heroRenderer) {
        heroCamera.aspect = window.innerWidth / window.innerHeight;
        heroCamera.updateProjectionMatrix();
        heroRenderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    if (solutionsRenderer) {
        const canvas = document.getElementById('solutions-canvas');
        solutionsCamera.aspect = canvas.offsetWidth / canvas.offsetHeight;
        solutionsCamera.updateProjectionMatrix();
        solutionsRenderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    }
    
    if (ctaRenderer) {
        const canvas = document.getElementById('cta-canvas');
        ctaCamera.aspect = canvas.offsetWidth / canvas.offsetHeight;
        ctaCamera.updateProjectionMatrix();
        ctaRenderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    }
    
    // Refresh ScrollTrigger
    ScrollTrigger.refresh();
});

// Performance optimization
let ticking = false;

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateAnimations);
        ticking = true;
    }
}

function updateAnimations() {
    // Update any performance-sensitive animations here
    ticking = false;
}

// Intersection Observer for performance
const performanceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        } else {
            entry.target.classList.remove('in-view');
        }
    });
}, { 
    threshold: 0.1,
    rootMargin: '50px'
});

// Observe all animated elements
document.querySelectorAll('.solution-card, .template-card, .platform-icon, .benefit-item').forEach(el => {
    performanceObserver.observe(el);
});

// Error handling
window.addEventListener('error', function(e) {
    console.log('Animation error caught:', e.error);
    // Graceful fallback for any animation errors
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (heroRenderer) {
        heroRenderer.dispose();
    }
    if (solutionsRenderer) {
        solutionsRenderer.dispose();
    }
    if (ctaRenderer) {
        ctaRenderer.dispose();
    }
});