// Quick Mobile Menu Fix
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", (e) => {
            e.preventDefault();
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
            
            // Prevent body scroll
            if (navMenu.classList.contains("active")) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "auto";
            }
        });

        // Close menu when clicking links
        document.querySelectorAll(".nav-menu a").forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
                document.body.style.overflow = "auto";
            });
        });

        // Close menu when clicking outside
        document.addEventListener("click", (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
                document.body.style.overflow = "auto";
            }
        });
    }
});

// Add mobile menu CSS
const mobileCSS = document.createElement("style");
mobileCSS.textContent = 
@media (max-width: 768px) {
    .hamburger {
        display: flex !important;
        z-index: 1002;
    }
    
    .nav-menu {
        position: fixed !important;
        left: -100% !important;
        top: 70px !important;
        flex-direction: column !important;
        background: white !important;
        width: 100% !important;
        height: calc(100vh - 70px) !important;
        transition: left 0.3s ease !important;
        z-index: 1000 !important;
        padding: 2rem 0 !important;
        box-shadow: 0 10px 27px rgba(0,0,0,0.1) !important;
    }
    
    .nav-menu.active {
        left: 0 !important;
    }
    
    .nav-menu li {
        margin: 1rem 0 !important;
    }
    
    .nav-menu a {
        font-size: 1.2rem !important;
        padding: 1rem 2rem !important;
        display: block !important;
        width: 100% !important;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px) !important;
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0 !important;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px) !important;
    }
}
;
document.head.appendChild(mobileCSS);
