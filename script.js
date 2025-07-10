// Lichtspielzeit Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for navigation links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 8px 32px rgba(232, 181, 184, 0.25)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 8px 32px rgba(232, 181, 184, 0.15)';
        }
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .product-card, .freebie-form, .contact-form-container');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Form handling
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Create email content
            let emailContent = '';
            if (this.classList.contains('email-form')) {
                // Freebie form
                emailContent = `Freebie-Anfrage von ${name} (${email})`;
                showSuccessMessage('Vielen Dank! Du erhältst dein Freebie in Kürze per E-Mail. 💌');
            } else {
                // Contact form
                emailContent = `Kontaktanfrage von ${name} (${email}): ${message}`;
                showSuccessMessage('Vielen Dank für deine Nachricht! Ich melde mich bald bei dir. 💕');
            }
            
            // Create mailto link
            const mailtoLink = `mailto:mail@lichtspielzeit.de?subject=${encodeURIComponent('Lichtspielzeit Anfrage')}&body=${encodeURIComponent(emailContent)}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Reset form
            this.reset();
        });
    });

    // Product purchase buttons
    const purchaseButtons = document.querySelectorAll('.product-card .btn-primary');
    purchaseButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.price').textContent;
            
            // Create purchase email
            const emailContent = `Kaufanfrage für: ${productName} (${productPrice})
            
Bitte sende mir die Zahlungsinformationen zu.

Vielen Dank!`;
            
            const mailtoLink = `mailto:mail@lichtspielzeit.de?subject=${encodeURIComponent(`Kaufanfrage: ${productName}`)}&body=${encodeURIComponent(emailContent)}`;
            
            window.location.href = mailtoLink;
            
            showSuccessMessage(`Kaufanfrage für "${productName}" wurde gesendet! Du erhältst bald die Zahlungsinformationen. 🛍️`);
        });
    });

    // Add sparkle effect to buttons on hover
    const buttons = document.querySelectorAll('.btn-primary');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            createSparkles(this);
        });
    });

    // Floating elements animation enhancement
    const floatingElements = document.querySelectorAll('.floating-star, .floating-heart, .floating-moon');
    floatingElements.forEach((element, index) => {
        // Add random movement
        setInterval(() => {
            const randomX = Math.random() * 20 - 10;
            const randomY = Math.random() * 20 - 10;
            element.style.transform += ` translate(${randomX}px, ${randomY}px)`;
        }, 3000 + index * 500);
    });
});

// Modal functions
function showImprint() {
    document.getElementById('impressum-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function showPrivacy() {
    document.getElementById('datenschutz-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

// Success message function
function showSuccessMessage(message) {
    // Create success notification
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">✨</span>
            <span class="notification-text">${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(45deg, #e8b4b8, #ffd700);
        color: white;
        padding: 20px;
        border-radius: 15px;
        box-shadow: 0 8px 32px rgba(232, 181, 184, 0.3);
        z-index: 3000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Sparkle effect function
function createSparkles(element) {
    const sparkleCount = 6;
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('span');
        sparkle.innerHTML = '✨';
        sparkle.style.cssText = `
            position: absolute;
            pointer-events: none;
            font-size: 12px;
            color: #ffd700;
            z-index: 1000;
            animation: sparkleFloat 1s ease-out forwards;
        `;
        
        const x = rect.left + Math.random() * rect.width;
        const y = rect.top + Math.random() * rect.height;
        
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1000);
    }
}

// Add sparkle animation CSS
const sparkleCSS = `
@keyframes sparkleFloat {
    0% {
        opacity: 1;
        transform: translateY(0) scale(0);
    }
    50% {
        opacity: 1;
        transform: translateY(-20px) scale(1);
    }
    100% {
        opacity: 0;
        transform: translateY(-40px) scale(0);
    }
}
`;

const style = document.createElement('style');
style.textContent = sparkleCSS;
document.head.appendChild(style);

// Add notification styles
const notificationCSS = `
.notification-content {
    display: flex;
    align-items: center;
    gap: 10px;
}

.notification-icon {
    font-size: 1.2rem;
}

.notification-text {
    line-height: 1.4;
}
`;

const notificationStyle = document.createElement('style');
notificationStyle.textContent = notificationCSS;
document.head.appendChild(notificationStyle);

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close modals with Escape key
    if (e.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal[style*="block"]');
        openModals.forEach(modal => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Set initial opacity
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
});

// Performance optimization: Lazy loading for non-critical elements
if ('IntersectionObserver' in window) {
    const lazyElements = document.querySelectorAll('.floating-elements');
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                lazyObserver.unobserve(entry.target);
            }
        });
    });
    
    lazyElements.forEach(el => {
        el.style.opacity = '0.6';
        lazyObserver.observe(el);
    });
}

