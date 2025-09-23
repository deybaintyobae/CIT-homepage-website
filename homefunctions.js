/*
INDUSTRIAL TECHNOLOGGY HOMEPAGE JAVASCRIPT
=====================================

This JavaScript file handles all interactive features and animations for the homepage.

Features:
- Mobile menu toggle functionality
- Scroll-triggered animations using Intersection Observer API
- Smooth scrolling navigation
- Dynamic header background changes
- Form validation and submission handling
- Parallax effects for hero section
- Typing animation for hero title
- Enhanced hover effects for cards
- Performance optimized with modern APIs

Dependencies: None (Vanilla JavaScript)
Browser Support: Modern browsers (ES6+)
*/

// ===========================================
// MOBILE MENU FUNCTIONALITY
// ===========================================

/**
 * Initialize mobile menu toggle functionality
 * Handles hamburger menu animation and navigation visibility
 */
function initializeMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navigation = document.getElementById('navigation');
    
    // Check if elements exist before adding event listeners
    if (!menuToggle || !navigation) {
        console.warn('Menu elements not found');
        return;
    }

    // Toggle menu visibility and hamburger animation
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navigation.classList.toggle('active');
        
        // Add accessibility attributes
        const isExpanded = this.classList.contains('active');
        this.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when clicking on navigation links
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navigation.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Close menu when clicking outside (accessibility improvement)
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = navigation.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnToggle && navigation.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navigation.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// ===========================================
// SCROLL ANIMATIONS
// ===========================================

/**
 * Initialize scroll-triggered animations using Intersection Observer
 * Provides better performance than scroll event listeners
 */
function initializeScrollAnimations() {
    // Intersection Observer configuration
    const observerOptions = {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px' // Trigger 50px before element enters viewport
    };

    // Create observer for scroll animations
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class to trigger CSS animations
                entry.target.classList.add('visible');
                
                // Unobserve the element for performance (one-time animation)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with animate-text class
    const animateElements = document.querySelectorAll('.animate-text');
    animateElements.forEach(element => {
        observer.observe(element);
    });

    console.log(`Observing ${animateElements.length} elements for scroll animations`);
}

// ===========================================
// SMOOTH SCROLLING NAVIGATION
// ===========================================

/**
 * Add smooth scrolling behavior to navigation links
 * Handles internal anchor links with offset for fixed header
 */
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerOffset = 80; // Account for fixed header height
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                // Smooth scroll to target
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===========================================
// DYNAMIC HEADER EFFECTS
// ===========================================

/**
 * Change header appearance based on scroll position
 * Creates more prominent header background when scrolling
 */
function initializeHeaderEffects() {
    const header = document.querySelector('.header');
    
    if (!header) {
        console.warn('Header element not found');
        return;
    }

    // Throttle scroll events for better performance
    let ticking = false;
    
    function updateHeader() {
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            // Scrolled down - make header more prominent
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
        } else {
            // At top - lighter header
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
        
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
}

// ===========================================
// HERO BUTTON FUNCTIONALITY
// ===========================================

/**
 * Initialize hero button click handlers
 * Makes the Call-to-Action buttons functional with smooth navigation
 */
function initializeHeroButtons() {
    const exploreBtn = document.querySelector('.hero-buttons .btn.primary');
    const facultyBtn = document.querySelector('.hero-buttons .btn.secondary');
    
    if (!exploreBtn || !facultyBtn) {
        console.warn('Hero buttons not found');
        return;
    }

    // "Explore Programs" button - navigate to programs section
    exploreBtn.addEventListener('click', function() {
        const programsSection = document.querySelector('#programs');
        if (programsSection) {
            const headerOffset = 80;
            const elementPosition = programsSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        }
    });

    // "Meet the Faculty" button - navigate to faculty section
    facultyBtn.addEventListener('click', function() {
        const facultySection = document.querySelector('#faculty');
        if (facultySection) {
            const headerOffset = 80;
            const elementPosition = facultySection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        }
    });

    console.log('Hero buttons initialized successfully');
}

// ===========================================
// PARALLAX EFFECTS
// ===========================================

/**
 * Add subtle parallax effect to hero section
 * Creates depth and visual interest during scroll
 */
function initializeParallaxEffects() {
    const heroContent = document.querySelector('.hero-content');
    const heroBackground = document.querySelector('.hero-bg');
    
    if (!heroContent || !heroBackground) {
        console.warn('Hero elements not found for parallax effect');
        return;
    }

    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const viewportHeight = window.innerHeight;
        
        // Only apply parallax when hero is visible
        if (scrolled < viewportHeight) {
            const parallaxContent = scrolled * 0.5;
            const parallaxBackground = scrolled * 0.3;
            
            heroContent.style.transform = `translateY(${parallaxContent}px)`;
            heroBackground.style.transform = `translateY(${parallaxBackground}px)`;
        }
        
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

// ===========================================
// TYPING ANIMATION
// ===========================================

/**
 * Create typewriter effect for hero title
 * Adds engaging animation on page load
 */
function typeWriter(element, text, speed = 80) {
    if (!element || !text) return;
    
    let i = 0;
    element.textContent = '';
    element.style.borderRight = '2px solid white'; // Cursor effect
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                element.style.borderRight = 'none';
            }, 1000);
        }
    }
    
    type();
}

/**
 * Initialize typing effect for hero title
 */
function initializeTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    
    if (!heroTitle) {
        console.warn('Hero title not found for typing effect');
        return;
    }
    
    const originalText = heroTitle.textContent;
    
    // Start typing effect after page loads
    setTimeout(() => {
        typeWriter(heroTitle, originalText, 80);
    }, 500);
}

// ===========================================
// ENHANCED CARD INTERACTIONS
// ===========================================

/**
 * Add enhanced hover effects to interactive cards
 * Provides better user feedback and engagement
 */
function initializeCardInteractions() {
    const cards = document.querySelectorAll('.about-card, .program-card, .faculty-card, .research-item');
    
    cards.forEach(card => {
        // Enhanced hover enter effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)';
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        // Reset on hover leave
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
        
        // Add subtle click animation
        card.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-6px) scale(1.01)';
        });
        
        card.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
    });
    
    console.log(`Enhanced interactions added to ${cards.length} cards`);
}

// ===========================================
// FORM HANDLING
// ===========================================

/**
 * Handle contact form submission with validation
 * Provides user feedback and form validation
 */
function initializeFormHandling() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (!contactForm) {
        console.warn('Contact form not found');
        return;
    }

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form elements
        const nameInput = this.querySelector('input[type="text"]');
        const emailInput = this.querySelector('input[type="email"]');
        const messageTextarea = this.querySelector('textarea');
        const submitBtn = this.querySelector('button[type="submit"]');
        
        // Get form data
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageTextarea.value.trim();
        
        // Clear previous error states
        clearFormErrors([nameInput, emailInput, messageTextarea]);
        
        // Validation
        let isValid = true;
        
        if (!name) {
            showFieldError(nameInput, 'Name is required');
            isValid = false;
        }
        
        if (!email) {
            showFieldError(emailInput, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showFieldError(emailInput, 'Please enter a valid email');
            isValid = false;
        }
        
        if (!message) {
            showFieldError(messageTextarea, 'Message is required');
            isValid = false;
        }
        
        if (!isValid) return;
        
        // Simulate form submission
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        
        // Simulate API call delay
        setTimeout(() => {
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = '#10b981';
            submitBtn.style.opacity = '1';
            
            // Show success message
            showSuccessMessage('Thank you! Your message has been sent successfully.');
            
            // Reset form after delay
            setTimeout(() => {
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 2000);
        }, 1000);
    });
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show error for form field
 */
function showFieldError(field, message) {
    field.style.borderColor = '#1e40af';
    field.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.1)';
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#1e40af';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '5px';
    errorDiv.textContent = message;
    
    field.parentNode.insertBefore(errorDiv, field.nextSibling);
}

/**
 * Clear form field errors
 */
function clearFormErrors(fields) {
    fields.forEach(field => {
        field.style.borderColor = '#e5e7eb';
        field.style.boxShadow = '';
        
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    });
}

/**
 * Show success message
 */
function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 1001;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    successDiv.textContent = message;
    
    document.body.appendChild(successDiv);
    
    // Slide in
    setTimeout(() => {
        successDiv.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        successDiv.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(successDiv);
        }, 300);
    }, 3000);
}

// ===========================================
// PERFORMANCE OPTIMIZATIONS
// ===========================================

/**
 * Add staggered animation delays for better visual flow
 */
function initializeStaggeredAnimations() {
    // Add loading animation delay for staggered effect
    const textElements = document.querySelectorAll('.animate-text');
    textElements.forEach((element, index) => {
        element.style.transitionDelay = `${index * 0.1}s`;
    });
    
    console.log(`Staggered animations applied to ${textElements.length} elements`);
}

/**
 * Preload critical resources
 */
function preloadResources() {
    // Preload hero background image if using external images
    // This is a placeholder for actual image preloading if needed
    console.log('Resources preloaded successfully');
}

// ===========================================
// ACCESSIBILITY ENHANCEMENTS
// ===========================================

/**
 * Add keyboard navigation support
 */
function initializeKeyboardNavigation() {
    // Handle escape key to close mobile menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const menuToggle = document.getElementById('menuToggle');
            const navigation = document.getElementById('navigation');
            
            if (navigation && navigation.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navigation.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.focus(); // Return focus to menu button
            }
        }
    });
}

/**
 * Initialize focus management for better accessibility
 */
function initializeFocusManagement() {
    // Add visible focus indicators for keyboard users
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Add CSS for keyboard navigation
    const style = document.createElement('style');
    style.textContent = `
        .keyboard-navigation *:focus {
            outline: 2px solid #1e40af !important;
            outline-offset: 2px !important;
        }
    `;
    document.head.appendChild(style);
}

// ===========================================
// INITIALIZATION
// ===========================================

/**
 * Initialize all functionality when DOM is ready
 */
function initializeApplication() {
    console.log('Initializing College Department Homepage...');
    
    try {
        // Core functionality
        initializeMobileMenu();
        initializeScrollAnimations();
        initializeSmoothScrolling();
        initializeHeaderEffects();
        initializeHeroButtons();
        
        // Visual enhancements
        initializeParallaxEffects();
        initializeCardInteractions();
        initializeStaggeredAnimations();
        
        // Form handling
        initializeFormHandling();
        
        // Accessibility
        initializeKeyboardNavigation();
        initializeFocusManagement();
        
        // Performance
        preloadResources();
        
        console.log('Application initialized successfully!');
        
    } catch (error) {
        console.error('Error initializing application:', error);
    }
}

/**
 * Initialize typing effect after page load
 */
function initializePageLoadEffects() {
    initializeTypingEffect();
}

// ===========================================
// EVENT LISTENERS
// ===========================================

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApplication);
} else {
    initializeApplication();
}

// Initialize page load effects after everything is loaded
window.addEventListener('load', initializePageLoadEffects);

// Handle page visibility changes (performance optimization)
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden - pause non-essential animations
        console.log('Page hidden - optimizing performance');
    } else {
        // Page is visible - resume animations
        console.log('Page visible - resuming normal operation');
    }
});

// ===========================================
// ERROR HANDLING
// ===========================================

// Global error handler
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // In production, you might want to send this to an error reporting service
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
    e.preventDefault(); // Prevent the default browser behavior
});

// Export functions for testing (if using modules)
// export { initializeApplication, initializeMobileMenu, initializeScrollAnimations };