// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll(".nav-menu a").forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll("a[href^=\"#\"]").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = "rgba(255, 255, 255, 0.95)";
            navbar.style.backdropFilter = "blur(10px)";
        } else {
            navbar.style.background = "#fff";
            navbar.style.backdropFilter = "none";
        }
    }
});

// Form submission handling
const contactForm = document.querySelector(".contact-form form");
if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();
        
        // Get form data
        const name = this.querySelector("input[type=\"text\"]").value;
        const email = this.querySelector("input[type=\"email\"]").value;
        const phone = this.querySelector("input[type=\"tel\"]").value;
        const service = this.querySelector("select").value;
        const message = this.querySelector("textarea").value;
        
        // Basic validation
        if (!name || !email || !service) {
            alert("Please fill in all required fields.");
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector("button[type=\"submit\"]");
        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert("Thank you for your message! We will get back to you within 24 hours.");
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("loaded");
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll(".service-card, .value-card, .achievement-item, .choose-item, .team-member-detail, .stat-item, .service-detail, .benefit-item, .link-item");
    animatedElements.forEach(el => {
        el.classList.add("loading");
        observer.observe(el);
    });
});

// Counter animation for statistics
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + (element.textContent.includes("+") ? "+" : "");
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (element.textContent.includes("+") ? "+" : "");
        }
    }
    
    updateCounter();
}

// Animate counters when they come into view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target.querySelector(".stat-number");
            if (counter && !entry.target.classList.contains("animated")) {
                entry.target.classList.add("animated");
                const text = counter.textContent;
                const number = parseInt(text.replace(/\D/g, ""));
                
                if (number) {
                    animateCounter(counter, number);
                }
            }
        }
    });
}, { threshold: 0.5 });

document.addEventListener("DOMContentLoaded", () => {
    const stats = document.querySelectorAll(".stat-item");
    stats.forEach(stat => {
        counterObserver.observe(stat);
    });
});

// Add loading states and improve UX
document.addEventListener("DOMContentLoaded", () => {
    // Add loading class to body initially
    document.body.classList.add("loading");
    
    // Remove loading class after page is fully loaded
    window.addEventListener("load", () => {
        document.body.classList.remove("loading");
        document.body.classList.add("loaded");
    });
});

// Service card hover effects
document.addEventListener("DOMContentLoaded", () => {
    const serviceCards = document.querySelectorAll(".service-card");
    
    serviceCards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            card.style.transform = "translateY(-10px) scale(1.02)";
        });
        
        card.addEventListener("mouseleave", () => {
            card.style.transform = "translateY(0) scale(1)";
        });
    });
});

// Add click tracking for analytics (placeholder)
function trackEvent(eventName, element) {
    console.log(Event tracked: , element);
    // Here you would typically send data to your analytics service
}

// Track button clicks
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn")) {
        trackEvent("button_click", e.target.textContent);
    }
});

// Track form interactions
document.addEventListener("focus", (e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.tagName === "SELECT") {
        trackEvent("form_focus", e.target.name || e.target.type);
    }
});

// Add keyboard navigation support
document.addEventListener("keydown", (e) => {
    // Close mobile menu with Escape key
    if (e.key === "Escape" && navMenu && navMenu.classList.contains("active")) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }
});

// Performance optimization: Lazy load images (if any are added later)
function lazyLoadImages() {
    const images = document.querySelectorAll("img[data-src]");
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove("lazy");
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
document.addEventListener("DOMContentLoaded", lazyLoadImages);

// Add error handling for form validation
function validateForm(form) {
    const errors = [];
    const inputs = form.querySelectorAll("input[required], select[required], textarea[required]");
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            errors.push(${input.placeholder || input.name} is required);
            input.classList.add("error");
        } else {
            input.classList.remove("error");
        }
    });
    
    // Email validation
    const emailInput = form.querySelector("input[type=\"email\"]");
    if (emailInput && emailInput.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            errors.push("Please enter a valid email address");
            emailInput.classList.add("error");
        }
    }
    
    return errors;
}

// Add CSS for error states and mobile menu animation
const style = document.createElement("style");
style.textContent = 
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #ef4444;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
    
    .loading {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease;
    }
    
    .loaded {
        opacity: 1;
        transform: translateY(0);
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    /* Consistent hover effects */
    .service-card:hover,
    .value-card:hover,
    .achievement-item:hover,
    .choose-item:hover,
    .link-item:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }
    
    /* Consistent button styles */
    .btn {
        transition: all 0.3s ease;
    }
    
    .btn:hover {
        transform: translateY(-2px);
    }
    
    /* Consistent icon colors */
    .service-icon,
    .value-icon,
    .achievement-icon,
    .choose-icon,
    .link-item i {
        transition: all 0.3s ease;
    }
    
    .service-card:hover .service-icon,
    .value-card:hover .value-icon,
    .achievement-item:hover .achievement-icon,
    .choose-item:hover .choose-icon,
    .link-item:hover i {
        transform: scale(1.1);
    }
;
document.head.appendChild(style);
