/* script.js */
// Helper: lazy-load hero video once document is ready
window.addEventListener('DOMContentLoaded', () => {
  const video = document.querySelector('.hero-video');
  if (video && video.querySelector('source[data-src]')) {
    const source = video.querySelector('source[data-src]');
    source.src = source.dataset.src;
    video.load();
  }
});

// 1. Animate channel icons sequentially (GSAP)
window.addEventListener('load', () => {
  const icons = gsap.utils.toArray('.channel-icon');
  gsap.set(icons, { y: 30, scale: 0.5 });
  gsap.to(icons, {
    y: 0,
    scale: 1,
    opacity: 1,
    duration: 0.6,
    ease: 'back.out(1.7)',
    stagger: 0.15,
    scrollTrigger: {
      trigger: '.channels',
      start: 'top 80%'
    }
  });
});

// 2. Parallax effect for problem section
if (window.ScrollTrigger) {
  gsap.to('.parallax-bg', {
    backgroundPosition: '50% 100%',
    ease: 'none',
    scrollTrigger: {
      trigger: '.parallax-bg',
      start: 'top bottom',
      scrub: true
    }
  });
}

// 3. 3D tilt effect for cards
function initTilt() {
  const tiltEls = document.querySelectorAll('[data-tilt]');
  tiltEls.forEach((el) => {
    el.addEventListener('mousemove', (e) => handleTilt(e, el));
    el.addEventListener('mouseleave', () => resetTilt(el));
  });
}
function handleTilt(e, el) {
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left; // 0 to width
  const y = e.clientY - rect.top; // 0 to height
  const midX = rect.width / 2;
  const midY = rect.height / 2;
  const maxAngle = 10; // deg
  const rotY = ((midX - x) / midX) * maxAngle;
  const rotX = ((midY - y) / midY) * maxAngle;
  el.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
}
function resetTilt(el) {
  el.style.transform = 'rotateX(0deg) rotateY(0deg)';
}
initTilt();

// 4. Testimonials Carousel (basic)
function initCarousel() {
  const items = document.querySelectorAll('#testimonial-carousel .carousel-item');
  if (!items.length) return;
  let idx = 0;
  setInterval(() => {
    items[idx].classList.remove('active');
    idx = (idx + 1) % items.length;
    items[idx].classList.add('active');
  }, 5000);
}
initCarousel();

// 5. Particles with Three.js (simple)
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas || !window.THREE) return;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const particles = new THREE.Geometry();
  const particleCount = 500;
  for (let i = 0; i < particleCount; i++) {
    const px = (Math.random() - 0.5) * 100;
    const py = (Math.random() - 0.5) * 100;
    const pz = (Math.random() - 0.5) * 100;
    particles.vertices.push(new THREE.Vector3(px, py, pz));
  }
  const particleMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 1 });
  const particleSystem = new THREE.Points(particles, particleMaterial);
  scene.add(particleSystem);

  camera.position.z = 40;

  function animate() {
    requestAnimationFrame(animate);
    particleSystem.rotation.y += 0.0005;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}
initParticles();