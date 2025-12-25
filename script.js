// Typing Animation
const typedTextSpan = document.querySelector('.typed-text');
const texts = ['Web Developer', 'Designer', 'Problem Solver', 'Creative Thinker'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentText = texts[textIndex];
    if (isDeleting) {
        typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(type, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 100 : 200);
    }
}

// Start typing animation when page loads
window.onload = () => {
    if (typedTextSpan) {
        type();
    }
    if (typeof animateSkills === 'function') {
        animateSkills();
    }
};

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close all FAQ items
        faqItems.forEach(faqItem => faqItem.classList.remove('active'));
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Skills Animation
function animateSkills() {
    const skillBars = document.querySelectorAll('.progress');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// Intersection Observer for scroll animations
const sections = document.querySelectorAll('.section');
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            if (entry.target.id === 'skills') {
                animateSkills();
            }
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Form Submission with EmailJS
// To set up EmailJS:
// 1. Go to https://www.emailjs.com/ and create a free account
// 2. Create an email service (Gmail, Outlook, etc.)
// 3. Create an email template with variables: {{from_name}}, {{from_email}}, {{subject}}, {{message}}
// 4. Get your Public Key, Service ID, and Template ID from the dashboard
// 5. Replace the values below with your actual IDs

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    // Initialize EmailJS with your Public Key
    // Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS Public Key
    emailjs.init('YOUR_PUBLIC_KEY');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const inputs = contactForm.querySelectorAll('input, textarea');
        const formData = {
            from_name: inputs[0].value, // Name field
            from_email: inputs[1].value, // Email field
            subject: inputs[2].value, // Subject field
            message: inputs[3].value, // Message textarea
            to_email: 'justineambal32@gmail.com' // Your email
        };
        
        // Disable submit button during sending
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // Send email using EmailJS
        // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual IDs
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
            .then(() => {
                // Success
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            })
            .catch((error) => {
                // Error
                console.error('EmailJS Error:', error);
                alert('Sorry, there was an error sending your message. Please try again or contact me directly at justineambal32@gmail.com');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            });
    });
}

// 3D Carousel Functionality
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    let isFlipped = false;

    items.forEach((item, index) => {
        item.addEventListener('click', () => {
            if (isFlipped) return;
            
            // Stop carousel animation
            carousel.classList.add('paused');
            
            // First, center the clicked card
            const rotation = -72 * index;
            carousel.style.transform = `rotateY(${rotation}deg)`;
            
            // After centering, hide others and flip
            setTimeout(() => {
                // Hide other cards with fade out
                items.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.style.opacity = '0';
                        otherItem.style.pointerEvents = 'none';
                    }
                });
                
                // Move card to center and flip
                setTimeout(() => {
                    item.classList.add('active');
                    isFlipped = true;
                }, 300);
            }, 500);

            // Handle clicking outside to reset
            const handleReset = (e) => {
                if (!item.contains(e.target)) {
                    // First flip back
                    item.classList.remove('active');
                    
                    // After flip animation, show other cards and reset
                    setTimeout(() => {
                        items.forEach(otherItem => {
                            otherItem.style.opacity = '1';
                            otherItem.style.pointerEvents = 'auto';
                        });
                        carousel.style.transform = '';
                        carousel.classList.remove('paused');
                        isFlipped = false;
                    }, 500);
                    
                    document.removeEventListener('click', handleReset);
                }
            };

            // Add click listener with delay
            setTimeout(() => {
                document.addEventListener('click', handleReset);
            }, 1000);
        });
    });
});

// Maintenance modal behavior — show on every visit
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('maintenance-modal');
    if (!modal) return;
    const backdrop = modal.querySelector('.maintenance-backdrop');
    const closeBtn = modal.querySelector('.maintenance-close');
    const okBtn = modal.querySelector('.maintenance-ok');

    function openModal() {
        if (modal.classList.contains('open')) return;
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        // prevent background scroll when modal open
        document.body.style.overflow = 'hidden';
        localStorage.setItem('maintenanceModalLastShown', Date.now().toString());
    }

    function closeModal() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    // Close handlers
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (okBtn) okBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);

    // Show immediately on each load
    openModal();

    // Reopen every hour (3600000 ms)
    const ONE_HOUR = 60 * 60 * 1000;
    setInterval(() => {
        const lastShown = Number(localStorage.getItem('maintenanceModalLastShown')) || 0;
        if (Date.now() - lastShown >= ONE_HOUR) {
            openModal();
        }
    }, ONE_HOUR);
});
