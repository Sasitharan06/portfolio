import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ============================================
   THREE.JS — COSMIC PARTICLE SCENE
   ============================================ */

// Scene Setup
const canvas = document.getElementById('bg-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 30;

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;

// ---- STARS (particles) ----
const starsGeometry = new THREE.BufferGeometry();
const starCount = 5000;
const starPositions = new Float32Array(starCount * 3);
const starSizes = new Float32Array(starCount);

for (let i = 0; i < starCount; i++) {
  starPositions[i * 3] = (Math.random() - 0.5) * 200;
  starPositions[i * 3 + 1] = (Math.random() - 0.5) * 200;
  starPositions[i * 3 + 2] = (Math.random() - 0.5) * 200;
  starSizes[i] = Math.random() * 2 + 0.5;
}

starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
starsGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));

const starsMaterial = new THREE.PointsMaterial({
  color: 0xaaaaff,
  size: 0.15,
  sizeAttenuation: true,
  transparent: true,
  opacity: 0.8,
  blending: THREE.AdditiveBlending,
});

const stars = new THREE.Points(starsGeometry, starsMaterial);
scene.add(stars);

// ---- NEBULA particles (larger, colored) ----
const nebulaGeometry = new THREE.BufferGeometry();
const nebulaCount = 800;
const nebulaPositions = new Float32Array(nebulaCount * 3);
const nebulaColors = new Float32Array(nebulaCount * 3);

for (let i = 0; i < nebulaCount; i++) {
  nebulaPositions[i * 3] = (Math.random() - 0.5) * 120;
  nebulaPositions[i * 3 + 1] = (Math.random() - 0.5) * 120;
  nebulaPositions[i * 3 + 2] = (Math.random() - 0.5) * 80;

  // Random purple/cyan/pink colors
  const colorChoice = Math.random();
  if (colorChoice < 0.33) {
    nebulaColors[i * 3] = 0.42; nebulaColors[i * 3 + 1] = 0.39; nebulaColors[i * 3 + 2] = 1.0; // Purple
  } else if (colorChoice < 0.66) {
    nebulaColors[i * 3] = 0.0; nebulaColors[i * 3 + 1] = 0.83; nebulaColors[i * 3 + 2] = 1.0; // Cyan
  } else {
    nebulaColors[i * 3] = 1.0; nebulaColors[i * 3 + 1] = 0.42; nebulaColors[i * 3 + 2] = 0.62; // Pink
  }
}

nebulaGeometry.setAttribute('position', new THREE.BufferAttribute(nebulaPositions, 3));
nebulaGeometry.setAttribute('color', new THREE.BufferAttribute(nebulaColors, 3));

const nebulaMaterial = new THREE.PointsMaterial({
  size: 0.4,
  sizeAttenuation: true,
  transparent: true,
  opacity: 0.3,
  vertexColors: true,
  blending: THREE.AdditiveBlending,
});

const nebula = new THREE.Points(nebulaGeometry, nebulaMaterial);
scene.add(nebula);

// ---- FLOATING 3D OBJECTS ----
const floatingObjects = [];

// Torus Knot (Hero section)
const torusKnotGeom = new THREE.TorusKnotGeometry(1.5, 0.4, 100, 24);
const torusKnotMat = new THREE.MeshStandardMaterial({
  color: 0x6c63ff,
  emissive: 0x2a1f7a,
  roughness: 0.3,
  metalness: 0.8,
  wireframe: true,
});
const torusKnot = new THREE.Mesh(torusKnotGeom, torusKnotMat);
torusKnot.position.set(18, 3, -35);
scene.add(torusKnot);
floatingObjects.push(torusKnot);

// Icosahedron
const icoGeom = new THREE.IcosahedronGeometry(1, 0);
const icoMat = new THREE.MeshStandardMaterial({
  color: 0x00d4ff,
  emissive: 0x004455,
  roughness: 0.4,
  metalness: 0.7,
  wireframe: true,
});
const ico = new THREE.Mesh(icoGeom, icoMat);
ico.position.set(-20, -8, -40);
scene.add(ico);
floatingObjects.push(ico);

// Octahedron
const octGeom = new THREE.OctahedronGeometry(0.8, 0);
const octMat = new THREE.MeshStandardMaterial({
  color: 0xff6b9d,
  emissive: 0x5a1030,
  roughness: 0.3,
  metalness: 0.6,
  wireframe: true,
});
const oct = new THREE.Mesh(octGeom, octMat);
oct.position.set(16, -12, -45);
scene.add(oct);
floatingObjects.push(oct);

// Dodecahedron
const dodecGeom = new THREE.DodecahedronGeometry(0.7, 0);
const dodecMat = new THREE.MeshStandardMaterial({
  color: 0x00ffa3,
  emissive: 0x004d31,
  roughness: 0.4,
  metalness: 0.7,
  wireframe: true,
});
const dodec = new THREE.Mesh(dodecGeom, dodecMat);
dodec.position.set(-15, 10, -38);
scene.add(dodec);
floatingObjects.push(dodec);

// Torus
const torusGeom = new THREE.TorusGeometry(1, 0.25, 16, 40);
const torusMat = new THREE.MeshStandardMaterial({
  color: 0xffd700,
  emissive: 0x4d4100,
  roughness: 0.35,
  metalness: 0.8,
  wireframe: true,
});
const torus = new THREE.Mesh(torusGeom, torusMat);
torus.position.set(5, 15, -42);
scene.add(torus);
floatingObjects.push(torus);

// ---- LIGHTING ----
const ambientLight = new THREE.AmbientLight(0x333366, 1.5);
scene.add(ambientLight);

const pointLight1 = new THREE.PointLight(0x6c63ff, 3, 60);
pointLight1.position.set(10, 10, 10);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0x00d4ff, 2, 50);
pointLight2.position.set(-10, -10, 5);
scene.add(pointLight2);

const pointLight3 = new THREE.PointLight(0xff6b9d, 1.5, 40);
pointLight3.position.set(0, 15, -5);
scene.add(pointLight3);

// ---- MOUSE PARALLAX ----
let mouseX = 0, mouseY = 0;
let targetMouseX = 0, targetMouseY = 0;

document.addEventListener('mousemove', (e) => {
  targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

// ---- SCROLL-DRIVEN CAMERA ----
let scrollProgress = 0;

window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress = scrollTop / scrollHeight;

  // Update scroll progress bar
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    progressBar.style.width = (scrollProgress * 100) + '%';
  }
});

// ---- ANIMATION LOOP ----
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const elapsed = clock.getElapsedTime();

  // Smooth mouse follow
  mouseX += (targetMouseX - mouseX) * 0.05;
  mouseY += (targetMouseY - mouseY) * 0.05;

  // Camera subtle parallax
  camera.position.x = mouseX * 1.5;
  camera.position.y = -mouseY * 1;
  camera.lookAt(0, 0, -20);

  // Move camera deeper into space on scroll (subtle)
  camera.position.z = 30 - scrollProgress * 5;
  camera.rotation.z = scrollProgress * 0.1;

  // Rotate stars slowly
  stars.rotation.y = elapsed * 0.02;
  stars.rotation.x = elapsed * 0.01;

  // Nebula drift
  nebula.rotation.y = -elapsed * 0.015;
  nebula.rotation.z = elapsed * 0.008;

  // Floating objects animation
  floatingObjects.forEach((obj, i) => {
    obj.rotation.x = elapsed * (0.1 + i * 0.05);
    obj.rotation.y = elapsed * (0.15 + i * 0.03);
    obj.position.y += Math.sin(elapsed * 0.5 + i * 1.2) * 0.003;
  });

  // Color shift lights based on scroll
  const hue1 = (scrollProgress * 0.5) % 1;
  const hue2 = (scrollProgress * 0.5 + 0.33) % 1;
  pointLight1.color.setHSL(hue1, 0.8, 0.5);
  pointLight2.color.setHSL(hue2, 0.7, 0.5);

  renderer.render(scene, camera);
}

animate();

// ---- RESIZE ----
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});


/* ============================================
   SCROLL ANIMATIONS (Intersection Observer)
   ============================================ */

const animateElements = document.querySelectorAll('[data-animate]');

const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

animateElements.forEach((el, index) => {
  el.style.transitionDelay = `${index % 4 * 0.12}s`;
  observer.observe(el);
});


/* ============================================
   GSAP — SECTION SCROLL ANIMATIONS
   ============================================ */

// Hero parallax on scroll
gsap.to('.hero-content', {
  scrollTrigger: {
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1,
  },
  y: -100,
  opacity: 0,
  scale: 0.9,
});

// Section titles slide in
gsap.utils.toArray('.section-title').forEach((title) => {
  gsap.from(title, {
    scrollTrigger: {
      trigger: title,
      start: 'top 85%',
      end: 'top 60%',
      scrub: 1,
    },
    x: -60,
    opacity: 0,
  });
});

// Project cards stagger
gsap.utils.toArray('.project-card').forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: 'top 88%',
    },
    y: 60,
    opacity: 0,
    rotateX: 10,
    duration: 0.8,
    delay: i * 0.15,
    ease: 'power3.out',
  });
});

// Skill tags pop in
gsap.utils.toArray('.skill-tag').forEach((tag, i) => {
  gsap.from(tag, {
    scrollTrigger: {
      trigger: tag,
      start: 'top 90%',
    },
    scale: 0,
    opacity: 0,
    duration: 0.4,
    delay: i * 0.03,
    ease: 'back.out(2)',
  });
});

// Contact cards float up
gsap.utils.toArray('.contact-card').forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: 'top 88%',
    },
    y: 50,
    opacity: 0,
    duration: 0.6,
    delay: i * 0.1,
    ease: 'power3.out',
  });
});


/* ============================================
   TYPING EFFECT
   ============================================ */

const typedElement = document.getElementById('typed-text');
const phrases = [
  'AI & ML Enthusiast',
  'Full-Stack Developer',
  'MERN Stack Intern',
  'Computer Vision Explorer',
  '1300+ SkillRack Problems',
  '300+ LeetCode Problems',
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 80;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typedElement.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 40;
  } else {
    typedElement.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 80;
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    isDeleting = true;
    typingSpeed = 2000; // Pause at end
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingSpeed = 400; // Pause before next
  }

  setTimeout(typeEffect, typingSpeed);
}

typeEffect();


/* ============================================
   3D TILT EFFECT ON PROJECT CARDS
   ============================================ */

document.querySelectorAll('[data-tilt]').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / centerY * -8;
    const rotateY = (x - centerX) / centerX * 8;

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
  });
});


/* ============================================
   NAVBAR ACTIVE LINK HIGHLIGHT
   ============================================ */

const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = '#6c63ff';
        }
      });
    }
  });
}, { threshold: 0.3 });

sections.forEach((section) => navObserver.observe(section));


/* ============================================
   SMOOTH SCROLL FOR NAV LINKS
   ============================================ */

navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});


/* ============================================
   CONTACT FORM HANDLER (Web3Forms API)
   ============================================ */

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('.btn-submit');
    const btnText = submitBtn.querySelector('span');
    const originalText = btnText.textContent;

    // Show loading state
    btnText.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
    formStatus.textContent = '';
    formStatus.className = 'form-status';

    try {
      const formData = new FormData(contactForm);
      const jsonData = Object.fromEntries(formData);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(jsonData),
      });

      const result = await response.json();

      if (result.success) {
        formStatus.textContent = '✅ Message sent successfully! I\'ll get back to you soon.';
        formStatus.className = 'form-status success';
        contactForm.reset();
      } else {
        formStatus.textContent = '❌ Something went wrong. Please try again.';
        formStatus.className = 'form-status error';
      }
    } catch (error) {
      formStatus.textContent = '❌ Network error. Please check your connection.';
      formStatus.className = 'form-status error';
    }

    // Reset button
    btnText.textContent = originalText;
    submitBtn.disabled = false;
    submitBtn.style.opacity = '1';

    // Clear status after 5 seconds
    setTimeout(() => {
      formStatus.textContent = '';
      formStatus.className = 'form-status';
    }, 5000);
  });
}
