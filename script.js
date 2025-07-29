// Particle Animation - DISABLED
/*
const canvas = document.getElementById('particle-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Create particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 3000;

const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

// Create material
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.005,
    color: '#ffffff',
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

// Create mesh
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

camera.position.z = 3;

// Mouse interaction
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Animation
function animate() {
    requestAnimationFrame(animate);
    
    particlesMesh.rotation.y += 0.001;
    particlesMesh.rotation.x += 0.0005;
    
    // Mouse interaction
    particlesMesh.rotation.y += mouseX * 0.0005;
    particlesMesh.rotation.x += mouseY * 0.0005;
    
    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
*/

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href'))?.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Reveal on scroll with Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
document.addEventListener('DOMContentLoaded', () => {
    const elementsToObserve = document.querySelectorAll('.feature-card, .service-card-large, .contact-card, .practice-card');
    elementsToObserve.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class for styling
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar on scroll
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Menu Toggle Function with improved handling
function toggleMenu() {
    const menuOverlay = document.getElementById('menuOverlay');
    const body = document.body;
    const isActive = menuOverlay.classList.contains('active');
    
    if (!isActive) {
        // Opening menu
        menuOverlay.classList.add('active');
        body.classList.add('menu-open');
        // Store current scroll position
        const scrollY = window.scrollY;
        body.style.top = `-${scrollY}px`;
    } else {
        // Closing menu
        menuOverlay.classList.remove('active');
        body.classList.remove('menu-open');
        // Restore scroll position
        const scrollY = parseInt(body.style.top || '0') * -1;
        body.style.top = '';
        window.scrollTo(0, scrollY);
    }
    
    // Toggle hamburger menu if it exists
    const hamburger = document.querySelector('.hamburger-menu');
    if (hamburger) {
        hamburger.classList.toggle('active');
    }
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    const menuOverlay = document.getElementById('menuOverlay');
    const menuButton = document.querySelector('.menu-button');
    const hamburger = document.querySelector('.hamburger-menu');
    
    // Check if menu is open and click is outside menu elements
    if (menuOverlay.classList.contains('active')) {
        if (!menuOverlay.contains(e.target) && 
            !menuButton?.contains(e.target) && 
            !hamburger?.contains(e.target)) {
            toggleMenu();
        }
    }
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const menuOverlay = document.getElementById('menuOverlay');
        if (menuOverlay.classList.contains('active')) {
            toggleMenu();
        }
    }
});

// Ensure menu doesn't interfere with page load
document.addEventListener('DOMContentLoaded', () => {
    const menuOverlay = document.getElementById('menuOverlay');
    if (menuOverlay) {
        menuOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled * 0.001);
    }
    
    if (scrollIndicator) {
        scrollIndicator.style.opacity = 1 - (scrolled * 0.01);
    }
});

// Add hover effect to cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.feature-card, .service-card-large, .contact-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.setProperty('--mouse-x', `${x}px`);
            this.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});

 