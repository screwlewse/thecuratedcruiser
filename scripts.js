// Curated Cruiser - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // ===== SMOOTH SCROLLING FOR NAVIGATION =====
    const navLinks = document.querySelectorAll('a[href^="#"]');

    // Add click event to each link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Get the target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Calculate position to scroll to
                const targetPosition = targetSection.offsetTop;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;

                // Smooth scroll animation
                let startTime = null;
                const duration = 1000; // Duration in milliseconds

                function animation(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const progress = Math.min(timeElapsed / duration, 1);
                    const ease = easeInOutCubic(progress);

                    window.scrollTo(0, startPosition + distance * ease);

                    if (timeElapsed < duration) {
                        requestAnimationFrame(animation);
                    }
                }

                // Easing function for smooth animation
                function easeInOutCubic(t) {
                    return t < 0.5
                        ? 4 * t * t * t
                        : 1 - Math.pow(-2 * t + 2, 3) / 2;
                }

                requestAnimationFrame(animation);

                // Update URL hash without jumping
                history.pushState(null, null, targetId);
            }
        });
    });

    // ===== SECTION ANIMATIONS =====
    // Fade-in sections as they come into view
    const sections = document.querySelectorAll('section');

    // Intersection Observer for section animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        root: null,
        threshold: 0.2,
        rootMargin: "0px"
    });

    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });

    // ===== MOBILE MENU TOGGLE =====
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when a link is clicked
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // ===== PRICING TABS =====
    const expressTabs = document.getElementById('express-tab');
    const fullTabs = document.getElementById('full-tab');
    const expressContent = document.getElementById('express-content');
    const fullContent = document.getElementById('full-content');

    if (expressTabs && fullTabs && expressContent && fullContent) {
        expressTabs.addEventListener('click', () => {
            expressTabs.classList.add('bg-accent');
            expressTabs.classList.remove('bg-dark');
            fullTabs.classList.remove('bg-accent');
            fullTabs.classList.add('bg-dark');
            expressContent.classList.remove('hidden');
            expressContent.classList.add('active');
            fullContent.classList.add('hidden');
            fullContent.classList.remove('active');
        });

        fullTabs.addEventListener('click', () => {
            fullTabs.classList.add('bg-accent');
            fullTabs.classList.remove('bg-dark');
            expressTabs.classList.remove('bg-accent');
            expressTabs.classList.add('bg-dark');
            fullContent.classList.remove('hidden');
            fullContent.classList.add('active');
            expressContent.classList.add('hidden');
            expressContent.classList.remove('active');
        });
    }

    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});