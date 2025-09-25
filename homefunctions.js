/*
SLSU COLLEGE OF INDUSTRIAL TECHNOLOGY - HOMEPAGE JAVASCRIPT
=========================================================
Interactive functionality for college department website
Handles mobile menu, animations, forms, and slideshow
*/

/* ========================================
MOBILE MENU FUNCTIONALITY
   ======================================== */

// Initialize mobile hamburger menu functionality
function initializeMobileMenu() {
    // Get menu button and navigation elements from HTML
    const menuToggle = document.getElementById('menuToggle');     // Hamburger button
    const navigation = document.getElementById('navigation');     // Navigation menu
    
    // Exit if elements don't exist (safety check)
    if (!menuToggle || !navigation) {
        console.warn('Menu elements not found');
        return;
    }

    // Add click event to hamburger button
    menuToggle.addEventListener('click', function() {
        // Toggle 'active' class on both button and menu
        this.classList.toggle('active');           // 'this' refers to menuToggle
        navigation.classList.toggle('active');     // Show/hide navigation
        
        // Update accessibility attribute for screen readers
        const isExpanded = this.classList.contains('active');
        this.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when clicking on navigation links
    const navLinks = document.querySelectorAll('.nav a');    // Get all navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Remove active classes to close menu
            menuToggle.classList.remove('active');
            navigation.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Close menu when clicking outside (better user experience)
    document.addEventListener('click', function(event) {
        // Check if click was inside menu or on toggle button
        const isClickInsideMenu = navigation.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        // Close menu if clicked outside and menu is open
        if (!isClickInsideMenu && !isClickOnToggle && navigation.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navigation.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

/* ========================================
SCROLL-TRIGGERED ANIMATIONS
   ======================================== */

// Initialize animations that trigger when scrolling
function initializeScrollAnimations() {
    // Configuration for when animations should trigger
    const observerOptions = {
        threshold: 0.1,                    // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px'    // Trigger 50px before element enters viewport
    };

    // Create intersection observer to watch for elements entering viewport
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {              // If element is now visible
                entry.target.classList.add('visible'); // Add 'visible' class for CSS animation
                observer.unobserve(entry.target);      // Stop watching this element (one-time animation)
            }
        });
    }, observerOptions);

    // Find all elements with animation class and start watching them
    const animateElements = document.querySelectorAll('.animate-text');
    animateElements.forEach(element => {
        observer.observe(element);                   // Start watching each element
    });

    console.log(`Observing ${animateElements.length} elements for scroll animations`);
}

/* ========================================
SMOOTH SCROLLING NAVIGATION
   ======================================== */

// Add smooth scrolling to internal anchor links
function initializeSmoothScrolling() {
    // Find all links that point to sections on same page (starting with #)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();                          // Prevent default jump behavior
            
            const targetId = this.getAttribute('href');  // Get target section ID
            const target = document.querySelector(targetId); // Find target element
            
            if (target) {
                const headerOffset = 80;                 // Account for fixed header height
                const elementPosition = target.getBoundingClientRect().top; // Get element position
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset; // Calculate scroll position

                // Smoothly scroll to calculated position
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'                   // Enable smooth scrolling
                });
            }
        });
    });
}

/* ========================================
DYNAMIC HEADER EFFECTS
   ======================================== */

// Change header appearance based on scroll position
function initializeHeaderEffects() {
    const header = document.querySelector('.header');   // Get header element
    
    // Exit if header doesn't exist
    if (!header) {
        console.warn('Header element not found');
        return;
    }

    // Use throttling to improve scroll performance
    let ticking = false;                                // Throttling flag
    
    function updateHeader() {
        const scrollY = window.scrollY;                 // Current scroll position
        
        if (scrollY > 100) {                           // If scrolled down more than 100px
            // Make header more prominent
            header.style.background = 'rgba(255, 255, 255, 0.98)'; // More opaque
            header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)'; // Darker shadow
        } else {                                       // If near top of page
            // Lighter header appearance
            header.style.background = 'rgba(255, 255, 255, 0.95)'; // More transparent
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)'; // Lighter shadow
        }
        
        ticking = false;                               // Reset throttling flag
    }

    // Add scroll event listener with throttling
    window.addEventListener('scroll', function() {
        if (!ticking) {                                // Only run if not already running
            requestAnimationFrame(updateHeader);       // Schedule update for next frame
            ticking = true;                           // Set throttling flag
        }
    });
}

/* ========================================
HERO BUTTON FUNCTIONALITY
   ======================================== */

// Make hero section buttons functional
function initializeHeroButtons() {
    // Get both hero buttons
    const exploreBtn = document.querySelector('.hero-buttons .btn.primary');    // "Explore Programs" button
    const facultyBtn = document.querySelector('.hero-buttons .btn.secondary');  // "Meet the Faculty" button
    
    // Exit if buttons don't exist
    if (!exploreBtn || !facultyBtn) {
        console.warn('Hero buttons not found');
        return;
    }

    // "Explore Programs" button functionality
    exploreBtn.addEventListener('click', function() {
        const programsSection = document.querySelector('#programs'); // Find programs section
        if (programsSection) {
            scrollToSection(programsSection);           // Smooth scroll to section
            addButtonFeedback(this);                   // Visual feedback
        }
    });

    // "Meet the Faculty" button functionality
    facultyBtn.addEventListener('click', function() {
        const facultySection = document.querySelector('#faculty'); // Find faculty section
        if (facultySection) {
            scrollToSection(facultySection);            // Smooth scroll to section
            addButtonFeedback(this);                   // Visual feedback
        }
    });

    console.log('Hero buttons initialized successfully');
}

// Helper function to scroll to a section
function scrollToSection(section) {
    const headerOffset = 80;                           // Account for fixed header
    const elementPosition = section.getBoundingClientRect().top; // Get element position
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset; // Calculate scroll position

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'                             // Smooth scrolling
    });
}

// Helper function to add visual feedback to button clicks
function addButtonFeedback(button) {
    button.style.transform = 'scale(0.95)';            // Slightly shrink button
    setTimeout(() => {
        button.style.transform = '';                   // Return to normal size
    }, 150);                                          // After 150ms
}

/* ========================================
PARALLAX EFFECTS
   ======================================== */

// Add subtle parallax effect to hero section
function initializeParallaxEffects() {
    // Get hero elements for parallax
    const heroContent = document.querySelector('.hero-content');
    const heroBackground = document.querySelector('.hero-bg');
    
    // Exit if elements don't exist
    if (!heroContent || !heroBackground) {
        console.warn('Hero elements not found for parallax effect');
        return;
    }

    let ticking = false;                               // Throttling flag
    
    function updateParallax() {
        const scrolled = window.pageYOffset;           // Current scroll position
        const viewportHeight = window.innerHeight;     // Browser window height
        
        // Only apply parallax when hero section is visible
        if (scrolled < viewportHeight) {
            const parallaxContent = scrolled * 0.5;    // Move content slower than scroll
            const parallaxBackground = scrolled * 0.3;  // Move background even slower
            
            // Apply transforms to create parallax effect
            heroContent.style.transform = `translateY(${parallaxContent}px)`;
            heroBackground.style.transform = `translateY(${parallaxBackground}px)`;
        }
        
        ticking = false;                               // Reset throttling flag
    }

    // Add scroll listener with throttling
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);     // Schedule update for next frame
            ticking = true;                           // Set throttling flag
        }
    });
}

/* ========================================
TYPING ANIMATION
   ======================================== */

// Create typewriter effect for hero title
function typeWriter(element, text, speed = 80) {
    // Exit if parameters are invalid
    if (!element || !text) return;
    
    let i = 0;                                        // Current character index
    element.textContent = '';                         // Clear existing text
    element.style.borderRight = '2px solid white';   // Add blinking cursor effect
    
    function type() {
        if (i < text.length) {                        // If more characters to type
            element.textContent += text.charAt(i);    // Add next character
            i++;                                      // Move to next character
            setTimeout(type, speed);                  // Schedule next character
        } else {                                      // If typing complete
            setTimeout(() => {
                element.style.borderRight = 'none';   // Remove cursor after delay
            }, 1000);
        }
    }
    
    type();                                          // Start typing animation
}

// Initialize typing effect for hero title
function initializeTypingEffect() {
    const heroTitle = document.querySelector('.hero-title'); // Get hero title element
    
    // Exit if title doesn't exist
    if (!heroTitle) {
        console.warn('Hero title not found for typing effect');
        return;
    }
    
    const originalText = heroTitle.textContent;       // Store original text
    
    // Start typing effect after short delay
    setTimeout(() => {
        typeWriter(heroTitle, originalText, 80);      // 80ms between characters
    }, 500);
}

/* ========================================
ENHANCED CARD INTERACTIONS
   ======================================== */

// Add hover effects to interactive cards
function initializeCardInteractions() {
    // Find all card elements
    const cards = document.querySelectorAll('.about-card, .program-card, .faculty-card, .research-item');
    
    cards.forEach(card => {
        // Mouse enter effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';      // Lift and slightly enlarge
            this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.15)';  // Larger shadow
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'; // Smooth animation
        });
        
        // Mouse leave effect
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';            // Return to normal
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';   // Normal shadow
        });
        
        // Mouse down effect (when clicking)
        card.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-6px) scale(1.01)';      // Slightly less lift
        });
        
        // Mouse up effect (when releasing click)
        card.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';      // Return to hover state
        });
    });
    
    console.log(`Enhanced interactions added to ${cards.length} cards`);
}

/* ========================================
FORM HANDLING
   ======================================== */

// Handle contact form submission with validation
function initializeFormHandling() {
    const contactForm = document.querySelector('.contact-form form'); // Get contact form
    
    // Exit if form doesn't exist
    if (!contactForm) {
        console.warn('Contact form not found');
        return;
    }

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();                            // Prevent default form submission
        
        // Get form input elements
        const nameInput = this.querySelector('input[type="text"]');
        const emailInput = this.querySelector('input[type="email"]');
        const messageTextarea = this.querySelector('textarea');
        const submitBtn = this.querySelector('button[type="submit"]');
        
        // Get form data
        const name = nameInput.value.trim();           // Remove whitespace
        const email = emailInput.value.trim();
        const message = messageTextarea.value.trim();
        
        // Clear any previous error states
        clearFormErrors([nameInput, emailInput, messageTextarea]);
        
        // Validation
        let isValid = true;                           // Form validity flag
        
        // Validate name field
        if (!name) {
            showFieldError(nameInput, 'Name is required');
            isValid = false;
        }
        
        // Validate email field
        if (!email) {
            showFieldError(emailInput, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showFieldError(emailInput, 'Please enter a valid email');
            isValid = false;
        }
        
        // Validate message field
        if (!message) {
            showFieldError(messageTextarea, 'Message is required');
            isValid = false;
        }
        
        // Exit if form is not valid
        if (!isValid) return;
        
        // Simulate form submission process
        const originalText = submitBtn.textContent;    // Store original button text
        
        // Update button to show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        
        // Simulate API call delay
        setTimeout(() => {
            // Show success state
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = '#10b981';    // Green success color
            submitBtn.style.opacity = '1';
            
            // Show success message to user
            showSuccessMessage('Thank you! Your message has been sent successfully.');
            
            // Reset form after delay
            setTimeout(() => {
                this.reset();                         // Clear form fields
                submitBtn.textContent = originalText;  // Reset button text
                submitBtn.disabled = false;           // Re-enable button
                submitBtn.style.background = '';      // Reset button color
            }, 2000);
        }, 1000);                                     // 1 second delay
    });
}

// Validate email format using regular expression
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Email validation pattern
    return emailRegex.test(email);                    // Return true if valid
}

// Show error message for form field
function showFieldError(field, message) {
    // Style field to show error
    field.style.borderColor = '#1e40af';              // Blue error border
    field.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.1)'; // Red shadow
    
    // Remove existing error message if present
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Create and add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#1e40af';                 // Blue error text
    errorDiv.style.fontSize = '0.875rem';             // Small font
    errorDiv.style.marginTop = '5px';                 // Space above message
    errorDiv.textContent = message;                   // Error message text
    
    // Insert error message after the field
    field.parentNode.insertBefore(errorDiv, field.nextSibling);
}

// Clear error states from form fields
function clearFormErrors(fields) {
    fields.forEach(field => {
        // Reset field styling
        field.style.borderColor = '#e5e7eb';           // Reset border color
        field.style.boxShadow = '';                    // Remove shadow
        
        // Remove error message if present
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    });
}

// Show success message notification
function showSuccessMessage(message) {
    // Create success notification element
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.style.cssText = `
        position: fixed;                              /* Fixed positioning */
        top: 100px;                                  /* Position from top */
        right: 20px;                                 /* Position from right */
        background: #10b981;                         /* Green background */
        color: white;                                /* White text */
        padding: 15px 20px;                          /* Internal padding */
        border-radius: 10px;                         /* Rounded corners */
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); /* Shadow */
        z-index: 1001;                              /* Above other content */
        transform: translateX(400px);               /* Start off-screen */
        transition: transform 0.3s ease;            /* Smooth animation */
    `;
    successDiv.textContent = message;                 // Success message text
    
    document.body.appendChild(successDiv);            // Add to page
    
    // Slide notification into view
    setTimeout(() => {
        successDiv.style.transform = 'translateX(0)';  // Move to visible position
    }, 100);
    
    // Remove notification after delay
    setTimeout(() => {
        successDiv.style.transform = 'translateX(400px)'; // Slide out
        setTimeout(() => {
            document.body.removeChild(successDiv);    // Remove from page
        }, 300);                                      // After animation completes
    }, 3000);                                        // Show for 3 seconds
}

/* ========================================
SLIDESHOW FUNCTIONALITY
   ======================================== */

// Slideshow variables
let slideIndex = 1;                                  // Current slide (1-based)
let slideInterval;                                   // Auto-advance timer

// Initialize slideshow functionality
function initSlideshow() {
    showSlide(slideIndex);                           // Show first slide
    startAutoSlide();                                // Start auto-advance
}

// Start automatic slide advancement
function startAutoSlide() {
    slideInterval = setInterval(() => {
        changeSlide(1);                              // Go to next slide
    }, 3000);                                       // Every 3 seconds
}

// Stop automatic slide advancement
function stopAutoSlide() {
    clearInterval(slideInterval);                    // Clear timer
}

// Restart automatic slide advancement
function restartAutoSlide() {
    stopAutoSlide();                                 // Stop current timer
    startAutoSlide();                                // Start new timer
}

// Change slide by n positions (1 for next, -1 for previous)
function changeSlide(n) {
    showSlide(slideIndex += n);                      // Update and show slide
    restartAutoSlide();                              // Reset auto-advance timer
}

// Go to specific slide number
function currentSlide(n) {
    showSlide(slideIndex = n);                       // Set and show slide
    restartAutoSlide();                              // Reset auto-advance timer
}

// Display the specified slide
function showSlide(n) {
    const slides = document.getElementsByClassName('slide');        // Get all slides
    const indicators = document.getElementsByClassName('indicator'); // Get all indicators
    
    // Handle wrap-around for slide numbers
    if (n > slides.length) {                         // If past last slide
        slideIndex = 1;                              // Go to first slide
    }
    if (n < 1) {                                    // If before first slide
        slideIndex = slides.length;                  // Go to last slide
    }
    
    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');        // Remove active class
    }
    
    // Remove active class from all indicators
    for (let i = 0; i < indicators.length; i++) {
        indicators[i].classList.remove('active');    // Remove active class
    }
    
    // Show current slide and indicator
    slides[slideIndex - 1].classList.add('active');      // Show current slide (convert to 0-based)
    indicators[slideIndex - 1].classList.add('active');  // Highlight current indicator
}

/* ========================================
PERFORMANCE OPTIMIZATIONS
   ======================================== */

// Add staggered animation delays for better visual flow
function initializeStaggeredAnimations() {
    const textElements = document.querySelectorAll('.animate-text'); // Get animated elements
    
    // Add progressive delays to create staggered effect
    textElements.forEach((element, index) => {
        element.style.transitionDelay = `${index * 0.1}s`;          // 0.1s delay per element
    });
    
    console.log(`Staggered animations applied to ${textElements.length} elements`);
}

// Preload critical resources (placeholder for future enhancements)
function preloadResources() {
    console.log('Resources preloaded successfully');
}

/* ========================================
ACCESSIBILITY ENHANCEMENTS
   ======================================== */

// Add keyboard navigation support
function initializeKeyboardNavigation() {
    // Handle escape key to close mobile menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {                    // If escape key pressed
            const menuToggle = document.getElementById('menuToggle');
            const navigation = document.getElementById('navigation');
            
            // Close menu if it's open
            if (navigation && navigation.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navigation.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.focus();                  // Return focus to menu button
            }
        }
    });
}

// Initialize focus management for better accessibility
function initializeFocusManagement() {
    // Add keyboard navigation class when user tabs
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation'); // Add class for CSS styling
        }
    });
    
    // Remove keyboard navigation class when user clicks
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Add CSS for keyboard focus indicators
    const style = document.createElement('style');
    style.textContent = `
        .keyboard-navigation *:focus {
            outline: 2px solid #1e40af !important;      /* Blue focus outline */
            outline-offset: 2px !important;             /* Space around outline */
        }
    `;
    document.head.appendChild(style);                    // Add styles to page
}

/* ========================================
MAIN INITIALIZATION FUNCTIONS
   ======================================== */

// Initialize all functionality when DOM is ready
function initializeApplication() {
    console.log('Initializing College Department Homepage...');
    
    try {
        // Core functionality - essential features
        initializeMobileMenu();                      // Mobile hamburger menu
        initializeScrollAnimations();                // Scroll-triggered animations
        initializeSmoothScrolling();                 // Smooth anchor link scrolling
        initializeHeaderEffects();                   // Dynamic header styling
        initializeHeroButtons();                     // Hero section button functionality
        
        // Visual enhancements - improved user experience
        initializeParallaxEffects();                 // Parallax scrolling effects
        initializeCardInteractions();                // Enhanced card hover effects
        initializeStaggeredAnimations();             // Staggered animation timing
        
        // Form functionality - user interaction
        initializeFormHandling();                    // Contact form validation and submission
        
        // Slideshow functionality - announcements
        initSlideshow();                            // Initialize announcement slideshow
        
        // Accessibility features - better for all users
        initializeKeyboardNavigation();              // Keyboard support
        initializeFocusManagement();                 // Focus indicators
        
        // Performance optimizations
        preloadResources();                          // Preload critical resources
        
        console.log('Application initialized successfully!');
        
    } catch (error) {
        console.error('Error initializing application:', error);
    }
}

// Initialize page load effects after everything is loaded
function initializePageLoadEffects() {
    initializeTypingEffect();                        // Hero title typing animation
}

/* ========================================
EVENT LISTENERS - PAGE LOAD
   ======================================== */

// Initialize when DOM content is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApplication);
} else {
    initializeApplication();                         // DOM already ready
}

// Initialize page load effects when fully loaded
window.addEventListener('load', initializePageLoadEffects);

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('Page hidden - optimizing performance');
        stopAutoSlide();                             // Pause slideshow when page hidden
    } else {
        console.log('Page visible - resuming normal operation');
        startAutoSlide();                            // Resume slideshow when page visible
    }
});

/* ========================================
SLIDESHOW EVENT HANDLERS
   ======================================== */

// Pause slideshow on hover
const slideshowContainer = document.querySelector('.slideshow-container');
if (slideshowContainer) {
    slideshowContainer.addEventListener('mouseenter', stopAutoSlide);    // Pause on hover
    slideshowContainer.addEventListener('mouseleave', startAutoSlide);   // Resume when not hovering
}

/* ========================================
ERROR HANDLING
   ======================================== */

// Global error handler for JavaScript errors
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // In production, you might want to send this to an error reporting service
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
    e.preventDefault();                              // Prevent default browser behavior
});