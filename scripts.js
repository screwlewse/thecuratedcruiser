// Utility Functions
const getElement = (selector) => document.querySelector(selector);
const getAllElements = (selector) => document.querySelectorAll(selector);

// Pure Functions for Calculations and Transformations
const calculateScrollOffset = (target, headerOffset = 80) => {
  const elementPosition = target.getBoundingClientRect().top;
  return elementPosition + window.pageYOffset - headerOffset;
};

const determineButtonText = (isExpanded) =>
  isExpanded ? "Show Less" : "Show More";

const findMaxHeight = (elements) => {
  return Array.from(elements).reduce((maxHeight, element) => {
    // Reset height to get natural height
    element.style.height = "auto";
    const elementHeight = element.offsetHeight;
    return Math.max(maxHeight, elementHeight);
  }, 0);
};

// Navigation Scroll Effect
const handleNavbarScrollEffect = () => {
  const navbar = getElement("#navbar");
  const toggleNavbarShadow = () => {
    navbar.classList.toggle("nav-shadow", window.scrollY > 50);
  };
  window.addEventListener("scroll", toggleNavbarShadow);
};

// Mobile Menu Toggle
const initializeMobileMenu = () => {
  const menuToggle = getElement("#menu-toggle");
  const navLinks = getElement("#nav-links");
  const toggleMobileMenu = () => {
    navLinks.classList.toggle("active");
  };
  const closeMobileMenuOnLinkClick = (event) => {
    if (event.target.tagName === "A") {
      navLinks.classList.remove("active");
    }
  };
  menuToggle.addEventListener("click", toggleMobileMenu);
  navLinks.addEventListener("click", closeMobileMenuOnLinkClick);
};

// Smooth Scrolling
const initializeSmoothScrolling = () => {
  const smoothScroll = (event) => {
    event.preventDefault();
    const targetSelector = event.currentTarget.getAttribute("href");
    const target = getElement(targetSelector);
    if (target) {
      const offsetPosition = calculateScrollOffset(target);
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };
  getAllElements('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", smoothScroll);
  });
};

// Service Details Toggle
const initializeServiceDetailsToggle = () => {
  const toggleServiceDetails = (event) => {
    event.preventDefault();
    const button = event.currentTarget;
    const targetId = button.getAttribute("data-target");
    const targetList = getElement(`#${targetId}`);
    // Toggle expanded state
    targetList.classList.toggle("expanded");
    // Update button text based on current state
    button.textContent = determineButtonText(
      targetList.classList.contains("expanded"),
    );
  };
  getAllElements(".toggle-details").forEach((button) => {
    button.addEventListener("click", toggleServiceDetails);
  });
};

// Card Height Equalization
const equalizeCardHeights = () => {
  const grids = getAllElements(".pricing-grid");
  grids.forEach((grid) => {
    const cards = grid.querySelectorAll(".pricing-card");
    const maxHeight = findMaxHeight(cards);
    // Set all cards to the maximum height
    cards.forEach((card) => {
      card.style.height = `${maxHeight}px`;
    });
  });
};

// Initialize all event listeners and setup functions
const initializePageInteractions = () => {
  handleNavbarScrollEffect();
  initializeMobileMenu();
  initializeSmoothScrolling();
  initializeServiceDetailsToggle();
  // Run card height equalization
  equalizeCardHeights();
  window.addEventListener("resize", equalizeCardHeights);
};

// DOM Content Loaded Listener
document.addEventListener("DOMContentLoaded", initializePageInteractions);
