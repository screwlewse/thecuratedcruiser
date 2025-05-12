// Navigation scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('nav-shadow');
    } else {
        navbar.classList.remove('nav-shadow');
    }
});

// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Pricing tabs
const expressTab = document.getElementById('express-tab');
const fullTab = document.getElementById('full-tab');
const expressContent = document.getElementById('express-content');
const fullContent = document.getElementById('full-content');

expressTab.addEventListener('click', () => {
    expressTab.classList.add('active');
    fullTab.classList.remove('active');
    expressContent.classList.add('active');
    fullContent.classList.remove('active');
});

fullTab.addEventListener('click', () => {
    fullTab.classList.add('active');
    expressTab.classList.remove('active');
    fullContent.classList.add('active');
    expressContent.classList.remove('active');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});