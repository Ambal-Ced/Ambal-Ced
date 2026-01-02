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
            to_email: 'justineambal3254@gmail.com' // Your email
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
                alert('Sorry, there was an error sending your message. Please try again or contact me directly at justineambal3254@gmail.com');
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

// Logo wave bounce animation on hover with character transformation
document.addEventListener('DOMContentLoaded', () => {
    const logo = document.getElementById('logo');
    const logoText = document.getElementById('logoText');
    const logoDot = logo?.querySelector('.logo-dot');
    
    if (!logo) {
        console.error('Logo element not found');
        return;
    }
    
    if (!logoText) {
        console.error('Logo text element not found');
        return;
    }
    
    if (logo && logoText) {
        const originalText = 'JustineA';
        const altText = 'AmbalCed';
        const originalDot = '.';
        let isTransformed = false;
        
        const createCharacterSpans = (text, includeDot = false) => {
            logoText.innerHTML = '';
            for (let i = 0; i < text.length; i++) {
                const span = document.createElement('span');
                span.textContent = text[i];
                logoText.appendChild(span);
            }
            if (includeDot && logoDot) {
                logoDot.textContent = originalDot;
            }
        };
        
        // Initialize with original text
        createCharacterSpans(originalText, true);
        
        const transformToAlt = (callback) => {
            const spans = logoText.querySelectorAll('span');
            const charDelay = 100; // 100ms delay between each character change
            const totalDelay = 8 * charDelay; // Total time for all characters to change
            
            // Transform each character sequentially
            // JustineA -> AmbalCed
            setTimeout(() => { if (spans[0]) spans[0].textContent = 'A'; }, 0 * charDelay); // J -> A
            setTimeout(() => { if (spans[1]) spans[1].textContent = 'm'; }, 1 * charDelay); // u -> m
            setTimeout(() => { if (spans[2]) spans[2].textContent = 'b'; }, 2 * charDelay); // s -> b
            setTimeout(() => { if (spans[3]) spans[3].textContent = 'a'; }, 3 * charDelay); // t -> a
            setTimeout(() => { if (spans[4]) spans[4].textContent = 'l'; }, 4 * charDelay); // i -> l
            setTimeout(() => { if (spans[5]) spans[5].textContent = 'C'; }, 5 * charDelay); // n -> C
            setTimeout(() => { if (spans[6]) spans[6].textContent = 'e'; }, 6 * charDelay); // e -> e
            setTimeout(() => { if (spans[7]) spans[7].textContent = 'd'; }, 7 * charDelay); // A -> d
            
            if (callback) {
                setTimeout(callback, totalDelay);
            }
        };
        
        const transformToOriginal = (callback) => {
            const spans = logoText.querySelectorAll('span');
            const charDelay = 100; // 100ms delay between each character change
            const totalDelay = 8 * charDelay; // Total time for all characters to change
            
            // Transform each character sequentially
            // AmbalCed -> JustineA
            setTimeout(() => { if (spans[0]) spans[0].textContent = 'J'; }, 0 * charDelay); // A -> J
            setTimeout(() => { if (spans[1]) spans[1].textContent = 'u'; }, 1 * charDelay); // m -> u
            setTimeout(() => { if (spans[2]) spans[2].textContent = 's'; }, 2 * charDelay); // b -> s
            setTimeout(() => { if (spans[3]) spans[3].textContent = 't'; }, 3 * charDelay); // a -> t
            setTimeout(() => { if (spans[4]) spans[4].textContent = 'i'; }, 4 * charDelay); // l -> i
            setTimeout(() => { if (spans[5]) spans[5].textContent = 'n'; }, 5 * charDelay); // C -> n
            setTimeout(() => { if (spans[6]) spans[6].textContent = 'e'; }, 6 * charDelay); // e -> e
            setTimeout(() => { if (spans[7]) spans[7].textContent = 'A'; }, 7 * charDelay); // d -> A
            
            if (callback) {
                setTimeout(callback, totalDelay);
            }
        };
        
        const resetToOriginal = () => {
            createCharacterSpans(originalText, true);
        };
        
        const createParticle = (x, y, type) => {
            const particle = document.createElement('div');
            particle.className = `particle ${type}`;
            
            const size = 4 + Math.random() * 6;
            
            if (type === 'circle') {
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.borderRadius = '50%';
                particle.style.background = '#000';
            } else if (type === 'box') {
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.background = '#000';
            } else if (type === 'triangle') {
                particle.style.width = '0';
                particle.style.height = '0';
                particle.style.borderLeft = `${size/2}px solid transparent`;
                particle.style.borderRight = `${size/2}px solid transparent`;
                particle.style.borderBottom = `${size}px solid #000`;
                particle.style.background = 'transparent';
            }
            
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.position = 'fixed';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '10000';
            
            document.body.appendChild(particle);
            return particle;
        };
        
        const createConfetti = (jPosition, dotPosition, letterPositions) => {
            // Create confetti particles all over the screen with different colors
            const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#E74C3C', '#3498DB', '#2ECC71', '#9B59B6', '#E67E22', '#1ABC9C'];
            const particleCount = 150; // More particles for confetti effect
            const particles = [];
            
            // Get the center position of the logo text (where particles should converge)
            const logoRect = logo.getBoundingClientRect();
            const centerX = logoRect.left + logoRect.width / 2;
            const centerY = logoRect.top + logoRect.height / 2;
            
            // Generate particles over 2 seconds
            const generationDuration = 2000; // 2 seconds
            const particlesPerInterval = Math.ceil(particleCount / (generationDuration / 50)); // Generate every 50ms
            let generatedCount = 0;
            let particlesReachedCenter = 0;
            
            // Create circle when particles start moving (after 1 second)
            setTimeout(() => {
                createFormingCircle(centerX, centerY, jPosition, dotPosition, letterPositions);
            }, 1000);
            
            // Track when all particles have reached center
            const checkAllParticlesReached = () => {
                particlesReachedCenter++;
            };
            
            const generateParticles = setInterval(() => {
                const batchSize = Math.min(particlesPerInterval, particleCount - generatedCount);
                
                for (let i = 0; i < batchSize; i++) {
                    const particle = document.createElement('div');
                    particle.className = 'confetti-particle';
                    
                    // Random size
                    const size = 6 + Math.random() * 8;
                    
                    // Random shape (circle, box, or triangle)
                    const shapeType = Math.floor(Math.random() * 3);
                    const color = colors[Math.floor(Math.random() * colors.length)];
                    
                    if (shapeType === 0) {
                        // Circle
                        particle.style.width = `${size}px`;
                        particle.style.height = `${size}px`;
                        particle.style.borderRadius = '50%';
                        particle.style.background = color;
                    } else if (shapeType === 1) {
                        // Box
                        particle.style.width = `${size}px`;
                        particle.style.height = `${size}px`;
                        particle.style.background = color;
                    } else {
                        // Triangle
                        particle.style.width = '0';
                        particle.style.height = '0';
                        particle.style.borderLeft = `${size/2}px solid transparent`;
                        particle.style.borderRight = `${size/2}px solid transparent`;
                        particle.style.borderBottom = `${size}px solid ${color}`;
                        particle.style.background = 'transparent';
                    }
                    
                    // Random position across the entire screen
                    const startX = Math.random() * window.innerWidth;
                    const startY = Math.random() * window.innerHeight;
                    
                    particle.style.left = `${startX}px`;
                    particle.style.top = `${startY}px`;
                    particle.style.position = 'fixed';
                    particle.style.pointerEvents = 'none';
                    particle.style.zIndex = '10000';
                    particle.style.opacity = '1';
                    
                    document.body.appendChild(particle);
                    particles.push(particle);
                    
                    // Calculate distance to center
                    const deltaX = centerX - startX;
                    const deltaY = centerY - startY;
                    
                    // After 1 second of being static, move to center
                    setTimeout(() => {
                        // Fast animation to center
                        particle.animate([
                            { 
                                transform: `translate(0, 0)`, 
                                opacity: 1 
                            },
                            { 
                                transform: `translate(${deltaX}px, ${deltaY}px)`, 
                                opacity: 0 
                            }
                        ], {
                            duration: 400, // Fast movement (400ms)
                            easing: 'ease-in',
                            fill: 'forwards'
                        }).onfinish = () => {
                            // Remove particle after reaching center
                            if (particle.parentNode) {
                                particle.parentNode.removeChild(particle);
                            }
                            // Track that this particle reached center
                            checkAllParticlesReached();
                        };
                    }, 1000); // Wait 1 second before moving
                }
                
                generatedCount += batchSize;
                
                // Stop generating after 2 seconds
                if (generatedCount >= particleCount) {
                    clearInterval(generateParticles);
                }
            }, 50); // Generate particles every 50ms
            
            return particles;
        };
        
        const createFormingCircle = (centerX, centerY, jPosition, dotPosition, letterPositions) => {
            // Prevent multiple circle creations
            if (document.querySelector('.forming-circle')) {
                return document.querySelector('.forming-circle');
            }
            
            // Get header height to limit size
            const header = document.querySelector('.navbar');
            const headerHeight = header ? header.offsetHeight : 80;
            const maxSize = headerHeight * 0.8; // 80% of header height
            
            // Get the color of the dot
            const dotElement = document.querySelector('.logo-dot');
            const dotColor = dotElement ? getComputedStyle(dotElement).color : '#00d084'; // Fallback to primary color
            
            // Create a filled circle element
            const circle = document.createElement('div');
            circle.className = 'forming-circle';
            circle.style.position = 'fixed';
            circle.style.left = `${centerX}px`;
            circle.style.top = `${centerY}px`;
            circle.style.width = '0px';
            circle.style.height = '0px';
            circle.style.borderRadius = '50%';
            circle.style.backgroundColor = dotColor;
            circle.style.transform = 'translate(-50%, -50%)';
            circle.style.zIndex = '9999';
            circle.style.pointerEvents = 'none';
            circle.style.transition = 'none';
            
            document.body.appendChild(circle);
            
            // Grow circle while particles converge (400ms)
            // Circle grows to maxSize (limited by header height)
            // Start growing when particles start moving (after 1 second)
            setTimeout(() => {
                circle.animate([
                    { 
                        width: '0px', 
                        height: '0px',
                        opacity: 0
                    },
                    { 
                        width: `${maxSize}px`, 
                        height: `${maxSize}px`,
                        opacity: 1
                    }
                ], {
                    duration: 400,
                    easing: 'ease-out',
                    fill: 'forwards'
                });
            }, 1000); // Start when particles start moving
            
            // After circle forms, transition to gear
            setTimeout(() => {
                transitionCircleToGear({ element: circle, size: maxSize, centerX, centerY }, centerX, centerY, jPosition, dotPosition, letterPositions);
            }, 400); // After circle finishes growing
            
            return { element: circle, size: maxSize, centerX, centerY };
        };
        
        const transitionCircleToGear = (circleData, centerX, centerY, jPosition, dotPosition, letterPositions) => {
            if (!circleData || !circleData.element) return;
            
            const circle = circleData.element;
            const gearSize = circleData.size;
            
            // Get the color of the dot
            const dotElement = document.querySelector('.logo-dot');
            const dotColor = dotElement ? getComputedStyle(dotElement).color : '#00d084'; // Fallback to primary color
            
            // Create gear SVG using dot color
            const gearSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            gearSVG.setAttribute('width', gearSize);
            gearSVG.setAttribute('height', gearSize);
            gearSVG.setAttribute('viewBox', '0 0 100 100');
            gearSVG.style.position = 'fixed';
            gearSVG.style.left = `${centerX}px`;
            gearSVG.style.top = `${centerY}px`;
            gearSVG.style.transform = 'translate(-50%, -50%)';
            gearSVG.style.zIndex = '10001'; // Above text (z-index 2)
            gearSVG.style.pointerEvents = 'none';
            gearSVG.className = 'gear-svg';
            gearSVG.style.opacity = '0';
            
            // Create a more recognizable settings/gear icon
            // Outer gear with teeth
            const outerGear = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            const center = 50;
            const outerRadius = 42;
            const innerRadius = 30;
            const teeth = 8;
            const toothDepth = 8;
            const toothWidth = 3;
            
            let gearPath = '';
            for (let i = 0; i < teeth * 2; i++) {
                const angle = (i * Math.PI) / teeth;
                let radius;
                if (i % 2 === 0) {
                    // Outer point (tooth)
                    radius = outerRadius;
                } else {
                    // Inner point (between teeth)
                    radius = innerRadius;
                }
                const x = center + radius * Math.cos(angle);
                const y = center + radius * Math.sin(angle);
                gearPath += `${i === 0 ? 'M' : 'L'} ${x} ${y} `;
            }
            gearPath += 'Z';
            
            outerGear.setAttribute('d', gearPath);
            outerGear.setAttribute('fill', dotColor);
            outerGear.setAttribute('stroke', dotColor);
            outerGear.setAttribute('stroke-width', '1');
            gearSVG.appendChild(outerGear);
            
            // Inner circle (center hole)
            const centerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            centerCircle.setAttribute('cx', '50');
            centerCircle.setAttribute('cy', '50');
            centerCircle.setAttribute('r', '12');
            centerCircle.setAttribute('fill', '#FFFFFF'); // White center
            centerCircle.setAttribute('stroke', dotColor);
            centerCircle.setAttribute('stroke-width', '2');
            gearSVG.appendChild(centerCircle);
            
            // Add small inner circle for depth
            const innerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            innerCircle.setAttribute('cx', '50');
            innerCircle.setAttribute('cy', '50');
            innerCircle.setAttribute('r', '6');
            innerCircle.setAttribute('fill', dotColor);
            gearSVG.appendChild(innerCircle);
            
            document.body.appendChild(gearSVG);
            
            // Hide circle and show gear with transition
            circle.animate([
                { opacity: 1 },
                { opacity: 0 }
            ], {
                duration: 300,
                easing: 'ease-in-out',
                fill: 'forwards'
            });
            
            gearSVG.animate([
                { opacity: 0, transform: 'translate(-50%, -50%) scale(0.9)' },
                { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' }
            ], {
                duration: 300,
                easing: 'ease-out',
                fill: 'forwards'
            });
            
            // Remove circle after transition
            setTimeout(() => {
                if (circle.parentNode) {
                    circle.parentNode.removeChild(circle);
                }
            }, 300);
            
            // Ensure gear position is set correctly before starting animations
            gearSVG.style.left = `${centerX}px`;
            gearSVG.style.top = `${centerY}px`;
            
            // Start spinning the gear after 0.8s
            setTimeout(() => {
                // Start continuous spinning animation using transform
                // Store animation reference for later cancellation
                gearSVG._spinAnimation = gearSVG.animate([
                    { transform: 'translate(-50%, -50%) rotate(0deg)' },
                    { transform: 'translate(-50%, -50%) rotate(360deg)' }
                ], {
                    duration: 2000,
                    iterations: Infinity,
                    easing: 'linear'
                });
                
                // After 0.8s of spinning, move gear to J position, then to dot position
                setTimeout(() => {
                    if (jPosition && dotPosition) {
                        // Get current position (should be centerX, centerY)
                        const currentLeft = parseFloat(gearSVG.style.left) || centerX;
                        const currentTop = parseFloat(gearSVG.style.top) || centerY;
                        
                        // Move to J position first - animate left and top while maintaining transform
                        const moveToJ = gearSVG.animate([
                            { 
                                left: `${currentLeft}px`,
                                top: `${currentTop}px`
                            },
                            { 
                                left: `${jPosition.x}px`,
                                top: `${jPosition.y}px`
                            }
                        ], {
                            duration: 600,
                            easing: 'ease-in-out',
                            fill: 'forwards'
                        });
                        
                        // Update position after animation completes
                        moveToJ.onfinish = () => {
                            gearSVG.style.left = `${jPosition.x}px`;
                            gearSVG.style.top = `${jPosition.y}px`;
                        };
                        
                        // Stop at J position for 0.4s, then move to dot position with text generation
                        setTimeout(() => {
                            // Generate "JustineA" at original positions while gear moves to dot position
                            generateTextAtPositions(gearSVG, jPosition, dotPosition, letterPositions);
                            
                            // Move to dot position slowly
                            const moveToDot = gearSVG.animate([
                                { 
                                    left: `${jPosition.x}px`,
                                    top: `${jPosition.y}px`
                                },
                                { 
                                    left: `${dotPosition.x}px`,
                                    top: `${dotPosition.y}px`
                                }
                            ], {
                                duration: 1000, // Slow movement
                                easing: 'ease-in-out',
                                fill: 'forwards'
                            });
                            
                            moveToDot.onfinish = () => {
                                gearSVG.style.left = `${dotPosition.x}px`;
                                gearSVG.style.top = `${dotPosition.y}px`;
                                
                                // Wait 1 second after reaching dot position, then stop spinning
                                setTimeout(() => {
                                    // Stop spinning animation
                                    if (gearSVG._spinAnimation) {
                                        gearSVG._spinAnimation.cancel();
                                        gearSVG._spinAnimation = null;
                                    }
                                    
                                    // Also try to stop any transform animations
                                    const animations = gearSVG.getAnimations();
                                    animations.forEach(anim => {
                                        if (anim.animationName && anim.animationName.includes('rotate')) {
                                            anim.cancel();
                                        }
                                    });
                                    
                                    // Ensure transform is reset (no rotation)
                                    gearSVG.style.transform = 'translate(-50%, -50%)';
                                    
                                    // Then compress gear to dot
                                    compressGearToDot(gearSVG, dotPosition);
                                }, 1000); // 1 second after reaching dot position
                            };
                        }, 400); // 0.4s pause at J position
                    }
                }, 800);
            }, 800); // 0.8s after all particles reach center
        };
        
        const generateTextAtPositions = (gearSVG, startPosition, endPosition, letterPositions) => {
            const logoText = document.getElementById('logoText');
            
            if (!logoText || !letterPositions || letterPositions.length === 0) return;
            
            // Calculate movement duration (same as gear movement)
            const moveDuration = 1000;
            const letterDelay = moveDuration / letterPositions.length; // Spread letters across movement duration
            
            // Create letters at their original positions one by one as gear moves
            letterPositions.forEach((pos, index) => {
                setTimeout(() => {
                    const letterSpan = document.createElement('span');
                    letterSpan.textContent = pos.letter;
                    letterSpan.style.position = 'fixed';
                    letterSpan.style.left = `${pos.x}px`;
                    letterSpan.style.top = `${pos.y}px`;
                    letterSpan.style.transform = 'translate(-50%, -50%)';
                    letterSpan.style.zIndex = '10000'; // Below gear (z-index 1)
                    letterSpan.style.pointerEvents = 'none';
                    letterSpan.style.fontSize = getComputedStyle(logoText).fontSize;
                    letterSpan.style.fontWeight = getComputedStyle(logoText).fontWeight;
                    letterSpan.style.color = getComputedStyle(logoText).color;
                    letterSpan.style.fontFamily = getComputedStyle(logoText).fontFamily;
                    letterSpan.style.opacity = '0';
                    letterSpan.style.transform = 'translate(-50%, -50%) scale(0.8)';
                    letterSpan.className = 'restored-letter';
                    
                    document.body.appendChild(letterSpan);
                    
                    // Animate letter appearing
                    letterSpan.animate([
                        { 
                            opacity: 0, 
                            transform: 'translate(-50%, -50%) scale(0.8)' 
                        },
                        { 
                            opacity: 1, 
                            transform: 'translate(-50%, -50%) scale(1)' 
                        }
                    ], {
                        duration: 300,
                        easing: 'ease-out',
                        fill: 'forwards'
                    });
                }, index * letterDelay);
            });
            
            // After gear reaches dot position, transfer letters to logo
            setTimeout(() => {
                // Transfer letters to logo text
                logoText.innerHTML = '';
                letterPositions.forEach(pos => {
                    const span = document.createElement('span');
                    span.textContent = pos.letter;
                    span.style.display = 'inline-block';
                    logoText.appendChild(span);
                });
                
                // Remove temporary letter spans
                document.querySelectorAll('.restored-letter').forEach(span => {
                    if (span.parentNode) {
                        span.parentNode.removeChild(span);
                    }
                });
            }, moveDuration + 200);
        };
        
        const compressGearToDot = (gearSVG, dotPosition) => {
            const logoDot = document.querySelector('.logo-dot');
            const logo = document.getElementById('logo');
            if (!logoDot || !logo) return;
            
            // Get gear size and position
            const currentSize = parseFloat(gearSVG.getAttribute('width')) || 80;
            const currentLeft = parseFloat(gearSVG.style.left) || dotPosition.x;
            const currentTop = parseFloat(gearSVG.style.top) || dotPosition.y;
            
            // Get the color of the dot
            const dotElement = document.querySelector('.logo-dot');
            const dotColor = dotElement ? getComputedStyle(dotElement).color : '#00d084';
            
            // Wait 0.5s after gear stops, then generate circle on top of gear
            setTimeout(() => {
                // Create a circle element
                const circle = document.createElement('div');
                circle.style.position = 'fixed';
                circle.style.left = `${currentLeft}px`;
                circle.style.top = `${currentTop}px`;
                circle.style.width = '0px';
                circle.style.height = '0px';
                circle.style.borderRadius = '50%';
                circle.style.backgroundColor = dotColor;
                circle.style.transform = 'translate(-50%, -50%)';
                circle.style.zIndex = '10002'; // Above gear (z-index 3)
                circle.style.pointerEvents = 'none';
                circle.style.opacity = '1';
                circle.className = 'gear-overlay-circle';
                
                document.body.appendChild(circle);
                
                // Circle starts small and grows to gear size
                circle.animate([
                    { 
                        width: '0px',
                        height: '0px',
                        opacity: 0
                    },
                    { 
                        width: `${currentSize}px`,
                        height: `${currentSize}px`,
                        opacity: 1
                    }
                ], {
                    duration: 600,
                    easing: 'ease-out',
                    fill: 'forwards'
                }).onfinish = () => {
                    // Once circle reaches gear size, gear disappears immediately
                    gearSVG.style.opacity = '0';
                    setTimeout(() => {
                        if (gearSVG.parentNode) {
                            gearSVG.parentNode.removeChild(gearSVG);
                        }
                    }, 100);
                    
                    // Then circle becomes smaller to 1px and disappears
                    circle.animate([
                        { 
                            width: `${currentSize}px`,
                            height: `${currentSize}px`,
                            opacity: 1
                        },
                        { 
                            width: '1px',
                            height: '1px',
                            opacity: 0
                        }
                    ], {
                        duration: 400,
                        easing: 'ease-in',
                        fill: 'forwards'
                    }).onfinish = () => {
                        // Remove circle after it shrinks
                        if (circle.parentNode) {
                            circle.parentNode.removeChild(circle);
                        }
                        
                        // Show dot
                        logoDot.style.opacity = '1';
                        logoDot.style.visibility = 'visible';
                        
                        // Always reset the special animation flag when animation completes
                        isSpecialAnimationRunning = false;
                        
                        // Check if user is still hovering
                        if (isHovering) {
                            // Restart from bouncing animation
                            setTimeout(() => {
                                // Reset text to JustineA
                                const logoText = document.getElementById('logoText');
                                if (logoText) {
                                    const originalText = 'JustineA';
                                    logoText.innerHTML = '';
                                    for (let i = 0; i < originalText.length; i++) {
                                        const span = document.createElement('span');
                                        span.textContent = originalText[i];
                                        logoText.appendChild(span);
                                    }
                                }
                                
                                // Reset states
                                isTransformed = false;
                                swapCount = 0;
                                
                                // Start bouncing
                                logo.classList.add('bouncing');
                                
                                // Update hover start time
                                logo._hoverStartTime = Date.now();
                                
                                // Restart the cycle
                                startHoverCycle();
                            }, 500);
                        } else {
                            // If not hovering, ensure all states are reset for next hover
                            isTransformed = false;
                            swapCount = 0;
                            // Clear any intervals
                            if (logo._swapInterval) {
                                clearInterval(logo._swapInterval);
                                logo._swapInterval = null;
                            }
                            // Remove any animation classes
                            logo.classList.remove('bouncing', 'shaking', 'exploding', 'recompressing', 'spinning-box-center', 'sliding');
                        }
                    };
                };
            }, 500); // 0.5s after gear stops spinning
        };
        
        const generateLettersFromGear = (centerX, centerY, gearSVG) => {
            const text = 'JustineA'; // No dot
            const letters = text.split('');
            const logoText = document.getElementById('logoText');
            const logo = document.getElementById('logo');
            
            if (!logoText || !logo) return;
            
            // Clear existing content
            logoText.innerHTML = '';
            logoText.style.opacity = '1';
            
            // Get initial position (where gear is - start from left)
            const gearRect = gearSVG.getBoundingClientRect();
            const startX = gearRect.left + gearRect.width / 2;
            const startY = gearRect.top + gearRect.height / 2;
            
            // Get final position (where logo should be - end on right)
            const logoRect = logo.getBoundingClientRect();
            const finalX = logoRect.left + logoRect.width / 2;
            const finalY = logoRect.top + logoRect.height / 2;
            
            // Calculate distance to travel
            const travelDistance = finalX - startX;
            const letterSpacing = 20; // Approximate spacing between letters
            const totalTextWidth = letters.length * letterSpacing;
            
            // Create container for letters (positioned below gear)
            const letterContainer = document.createElement('div');
            letterContainer.style.position = 'fixed';
            letterContainer.style.left = `${startX}px`;
            letterContainer.style.top = `${startY + 40}px`; // Below the gear
            letterContainer.style.transform = 'translate(-50%, -50%)';
            letterContainer.style.zIndex = '10000';
            letterContainer.style.pointerEvents = 'none';
            letterContainer.style.display = 'flex';
            letterContainer.style.alignItems = 'center';
            letterContainer.style.fontSize = getComputedStyle(logoText).fontSize;
            letterContainer.style.fontWeight = getComputedStyle(logoText).fontWeight;
            letterContainer.style.color = getComputedStyle(logoText).color;
            letterContainer.style.fontFamily = getComputedStyle(logoText).fontFamily;
            letterContainer.style.whiteSpace = 'nowrap';
            letterContainer.style.flexDirection = 'row-reverse'; // Right to left
            
            document.body.appendChild(letterContainer);
            
            // Move gear from left to right
            const moveDuration = letters.length * 200 + 400; // Duration based on letter count
            gearSVG.animate([
                { 
                    left: `${startX}px`,
                    transform: 'translate(-50%, -50%) rotate(0deg)'
                },
                { 
                    left: `${finalX}px`,
                    transform: 'translate(-50%, -50%) rotate(360deg)'
                }
            ], {
                duration: moveDuration,
                easing: 'linear',
                fill: 'forwards'
            });
            
            // Create letters one by one from right to left as gear moves
            letters.forEach((letter, index) => {
                setTimeout(() => {
                    const letterSpan = document.createElement('span');
                    letterSpan.textContent = letter;
                    letterSpan.style.display = 'inline-block';
                    letterSpan.style.opacity = '0';
                    letterSpan.style.transform = 'translateX(-10px)';
                    letterSpan.style.marginLeft = '2px';
                    letterSpan.style.marginRight = '2px';
                    
                    // Insert at the beginning (right side) since we're using row-reverse
                    letterContainer.insertBefore(letterSpan, letterContainer.firstChild);
                    
                    // Animate letter appearing
                    letterSpan.animate([
                        { 
                            opacity: 0, 
                            transform: 'translateX(-10px) scale(0.8)' 
                        },
                        { 
                            opacity: 1, 
                            transform: 'translateX(0px) scale(1)' 
                        }
                    ], {
                        duration: 300,
                        easing: 'ease-out',
                        fill: 'forwards'
                    });
                }, index * 200); // 200ms delay between each letter
            });
            
            // Move letter container along with gear
            letterContainer.animate([
                { 
                    left: `${startX}px`
                },
                { 
                    left: `${finalX}px`
                }
            ], {
                duration: moveDuration,
                easing: 'linear',
                fill: 'forwards'
            });
            
            // After gear reaches final position, transfer letters to logo
            setTimeout(() => {
                // Transfer letters to logo text
                logoText.innerHTML = '';
                letters.forEach(letter => {
                    const span = document.createElement('span');
                    span.textContent = letter;
                    span.style.display = 'inline-block';
                    logoText.appendChild(span);
                });
                
                // Remove temporary container
                if (letterContainer.parentNode) {
                    letterContainer.parentNode.removeChild(letterContainer);
                }
                
                // Hide gear
                gearSVG.style.opacity = '0';
                setTimeout(() => {
                    if (gearSVG.parentNode) {
                        gearSVG.parentNode.removeChild(gearSVG);
                    }
                }, 300);
            }, moveDuration + 200); // After movement completes + buffer
        };
        
        const explodeCharacter = (charElement, index, totalChars) => {
            if (!charElement) return;
            
            const rect = charElement.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Create 15-20 particles per character
            const particleCount = 15 + Math.floor(Math.random() * 6);
            const particleTypes = ['circle', 'box', 'triangle'];
            const particles = [];
            
            for (let i = 0; i < particleCount; i++) {
                const type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
                const particle = createParticle(centerX, centerY, type);
                particles.push(particle);
                
                // Random direction and distance
                const angle = Math.random() * Math.PI * 2;
                const distance = 300 + Math.random() * 400;
                const targetX = centerX + Math.cos(angle) * distance;
                const targetY = centerY + Math.sin(angle) * distance;
                
                // Animate particle flying out
                particle.animate([
                    { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                    { transform: `translate(${targetX - centerX}px, ${targetY - centerY}px) scale(0)`, opacity: 0 }
                ], {
                    duration: 1000 + Math.random() * 500,
                    easing: 'ease-out',
                    fill: 'forwards'
                });
            }
            
            return particles;
        };
        
        const compressParticles = (particles, targetX, targetY) => {
            particles.forEach((particle, index) => {
                const rect = particle.getBoundingClientRect();
                const startX = rect.left + rect.width / 2;
                const startY = rect.top + rect.height / 2;
                
                setTimeout(() => {
                    particle.animate([
                        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                        { transform: `translate(${targetX - startX}px, ${targetY - startY}px) scale(0)`, opacity: 0 }
                    ], {
                        duration: 800,
                        easing: 'ease-in',
                        fill: 'forwards'
                    }).onfinish = () => {
                        particle.remove();
                    };
                }, index * 10);
            });
        };
        
        const startSpecialAnimation = () => {
            // Prevent multiple calls
            if (isSpecialAnimationRunning && logo.classList.contains('shaking')) {
                return;
            }
            
            // Clear any existing intervals
            if (logo._swapInterval) {
                clearInterval(logo._swapInterval);
                logo._swapInterval = null;
            }
            
            // Stop bouncing
            logo.classList.remove('bouncing');
            
            // Ensure text is JustineA before starting special animation
            if (isTransformed) {
                // If it's AmbalCed, transform back to JustineA first
                transformToOriginal(() => {
                    isTransformed = false;
                    // Then start the special animation sequence
                    startSpecialAnimationSequence();
                });
            } else {
                // Already JustineA, start the sequence
                startSpecialAnimationSequence();
            }
        };
        
        const startSpecialAnimationSequence = () => {
            // JustineA bounces once (1 second bounce cycle)
            logo.classList.add('bouncing');
            setTimeout(() => {
                logo.classList.remove('bouncing');
                
                // Stop for 0.5s
                setTimeout(() => {
                    // Start shaking for 2.5s
                    logo.classList.add('shaking');
                    
                    setTimeout(() => {
                        // Stop shaking
                        logo.classList.remove('shaking');
                        
                        // Character by character pop (disappear from left to right)
                        const spans = logoText.querySelectorAll('span');
                        const dot = logoDot;
                        const allElements = [...spans, dot];
                        
                        // Ensure text container stays visible for remaining characters
                        logoText.style.opacity = '1';
                        if (logoDot) logoDot.style.opacity = '1';
                        
                        // Store positions of all letters and dot for gear movement
                        let jPosition = null;
                        let dotPosition = null;
                        const letterPositions = []; // Store all letter positions
                        
                        // Pop each character one by one from left to right
                        // Each character pops while the rest remain visible
                        allElements.forEach((element, index) => {
                            if (!element) return;
                            
                            setTimeout(() => {
                                // Check if element still exists and hasn't been popped
                                if (element.style.opacity === '0') return;
                                
                                // Get position before hiding
                                const rect = element.getBoundingClientRect();
                                const centerX = rect.left + rect.width / 2;
                                const centerY = rect.top + rect.height / 2;
                                
                                // Store position of J (first character, index 0)
                                if (index === 0) {
                                    jPosition = { x: centerX, y: centerY };
                                }
                                
                                // Store position of dot (last element)
                                if (element === dot) {
                                    dotPosition = { x: centerX, y: centerY };
                                }
                                
                                // Store position of each letter (not dot)
                                if (element !== dot) {
                                    letterPositions.push({ x: centerX, y: centerY, letter: element.textContent });
                                }
                                
                                // Create particles for this character when it pops
                                explodeCharacter(element, index, allElements.length);
                                
                                // Hide only this character (make it disappear) but maintain position
                                // Store original width before hiding to maintain spacing
                                const originalWidth = element.offsetWidth || parseFloat(getComputedStyle(element).width);
                                element.style.opacity = '0';
                                element.style.visibility = 'hidden';
                                // Keep width to maintain position of remaining characters
                                element.style.width = originalWidth + 'px';
                                element.style.display = 'inline-block';
                                element.style.minWidth = originalWidth + 'px';
                            }, index * 150); // 150ms delay between each character pop
                        });
                    
                    // After all characters have popped, create confetti effect
                    setTimeout(() => {
                        // Create confetti particles all over the screen
                        // The circle formation is handled inside createConfetti
                        // Pass J, dot positions, and all letter positions for gear movement
                        createConfetti(jPosition, dotPosition, letterPositions);
                    }, allElements.length * 150 + 500); // Wait for all pops to complete
                    }, 2500); // Shake duration 2.5s
                }, 500); // Brief pause 0.5s
            }, 1000); // Bounce once 1s
        };
        
        let isHovering = false;
        let isSpecialAnimationRunning = false;
        let swapCount = 0; // Track swaps: 0=JustineA initial, 1=AmbalCed first, 2=JustineA, 3=AmbalCed second
        
        const performSwap = () => {
            if (isSpecialAnimationRunning) return;
            
            if (isTransformed) {
                // Currently AmbalCed, transform to JustineA
                transformToOriginal(() => {
                    swapCount++;
                    isTransformed = false; // Now it's JustineA
                    // After transformation completes, bounce for 2 seconds
                    setTimeout(() => {
                        if (logo.classList.contains('bouncing') && !isSpecialAnimationRunning) {
                            // Check if AmbalCed has shown twice (swapCount = 3 means we're back to JustineA after 2nd AmbalCed)
                            if (swapCount >= 3 && !isTransformed) {
                                // Ensure text is JustineA before starting special animation
                                createCharacterSpans(originalText, true);
                                isTransformed = false;
                                // Start special animation (text is JustineA now)
                                isSpecialAnimationRunning = true;
                                startSpecialAnimation();
                            } else {
                                // Continue normal cycle
                                performSwap();
                            }
                        }
                    }, 2000); // Bounce for 2 seconds after transformation
                });
            } else {
                // Currently JustineA, transform to AmbalCed
                transformToAlt(() => {
                    swapCount++;
                    isTransformed = true; // Now it's AmbalCed
                    // After transformation completes, bounce for 2 seconds
                    setTimeout(() => {
                        if (logo.classList.contains('bouncing') && !isSpecialAnimationRunning) {
                            performSwap();
                        }
                    }, 2000); // Bounce for 2 seconds after transformation
                });
            }
        };
        
        const startHoverCycle = () => {
            if (isSpecialAnimationRunning) return;
            
            swapCount = 0;
            isTransformed = false;
            logo._hoverStartTime = Date.now();
            
            // Start bouncing immediately
            logo.classList.add('bouncing');
            
            // After 2 seconds, transform to AmbalCed
            setTimeout(() => {
                if (logo.classList.contains('bouncing') && !isSpecialAnimationRunning && isHovering) {
                    performSwap();
                }
            }, 2000);
        };
        
        const stopHoverCycle = () => {
            // If special animation is running, don't interrupt it
            if (isSpecialAnimationRunning) {
                return;
            }
            
            // Clear swap interval
            if (logo._swapInterval) {
                clearInterval(logo._swapInterval);
                logo._swapInterval = null;
            }
            
            logo.classList.remove('bouncing', 'shaking', 'exploding', 'recompressing', 'spinning-box-center', 'sliding');
            isTransformed = false;
            
            resetToOriginal();
        };
        
        // Use a single mouseenter/mouseleave on the logo element
        logo.addEventListener('mouseenter', (e) => {
            e.stopPropagation();
            if (isHovering || isSpecialAnimationRunning) return;
            isHovering = true;
            startHoverCycle();
        });
        
        logo.addEventListener('mouseleave', (e) => {
            e.stopPropagation();
            // Only stop if special animation is not running
            if (!isSpecialAnimationRunning) {
                isHovering = false;
                stopHoverCycle();
            }
        });
        
        // Also add to logo-container for better hover detection
        const logoContainer = logo.querySelector('.logo-container');
        if (logoContainer) {
            logoContainer.addEventListener('mouseenter', (e) => {
                e.stopPropagation();
                if (isHovering || isSpecialAnimationRunning) return;
                isHovering = true;
                startHoverCycle();
            });
            
            logoContainer.addEventListener('mouseleave', (e) => {
                e.stopPropagation();
                if (isSpecialAnimationRunning) return; // Don't stop if special animation is running
                isHovering = false;
                stopHoverCycle();
            });
        }
    }
});


// Certificate data and lightbox functionality
const certificates = [
    { src: 'certificate/c1.jpg', number: 'Certificate 1' },
    { src: 'certificate/c2.jpg', number: 'Certificate 2' },
    { src: 'certificate/c3.jpg', number: 'Certificate 3' },
    { src: 'certificate/c4.jpg', number: 'Certificate 4' },
    { src: 'certificate/c5.jpg', number: 'Certificate 5' },
    { src: 'certificate/c6.jpg', number: 'Certificate 6' },
    { src: 'certificate/c7.jpg', number: 'Certificate 7' },
    { src: 'certificate/c8.jpg', number: 'Certificate 8' },
    { src: 'certificate/c9.jpg', number: 'Certificate 9' },
    { src: 'certificate/c10.jpg', number: 'Certificate 10' },
    { src: 'certificate/c11.jpg', number: 'Certificate 11' },
    { src: 'certificate/c12.jpg', number: 'Certificate 12' },
    { src: 'certificate/c13.jpg', number: 'Certificate 13' },
    { src: 'certificate/c15.jpg', number: 'Certificate 14' },
    { src: 'certificate/c14.jpg', number: 'Certificate 15' }
];

let currentImageIndex = 0;

// Generate certificate cards
document.addEventListener('DOMContentLoaded', function() {
    const certificatesGrid = document.getElementById('certificatesGrid');
    if (certificatesGrid) {
        certificates.forEach((cert, index) => {
            const card = document.createElement('div');
            card.className = 'certificate-card';
            card.setAttribute('data-index', index);
            card.innerHTML = `
                <div class="certificate-image-wrapper">
                    <img src="${cert.src}" alt="${cert.number}" loading="lazy">
                </div>
                <div class="certificate-info">
                    <div class="certificate-number">${cert.number}</div>
                    <div class="certificate-view-text">
                        <i class="fas fa-expand"></i>
                        <span>Click to view full size</span>
                    </div>
                </div>
            `;
            card.addEventListener('click', () => openLightbox(index));
            certificatesGrid.appendChild(card);
        });
    }
});

// Lightbox functionality
const lightboxModal = document.getElementById('lightboxModal');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const lightboxCounter = document.getElementById('lightboxCounter');

function openLightbox(index) {
    currentImageIndex = index;
    updateLightboxImage();
    if (lightboxModal) {
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    if (lightboxModal) {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function updateLightboxImage() {
    if (lightboxImage && lightboxCounter) {
        lightboxImage.src = certificates[currentImageIndex].src;
        lightboxImage.alt = certificates[currentImageIndex].number;
        lightboxCounter.textContent = `${currentImageIndex + 1} / ${certificates.length}`;
    }
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + certificates.length) % certificates.length;
    updateLightboxImage();
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % certificates.length;
    updateLightboxImage();
}

// Lightbox event listeners
document.addEventListener('DOMContentLoaded', function() {
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevImage);
    if (lightboxNext) lightboxNext.addEventListener('click', showNextImage);

    if (lightboxModal) {
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                closeLightbox();
            }
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightboxModal || !lightboxModal.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        }
    });
});

// Resume download functionality
document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('downloadResumeBtn');
    
    if (downloadBtn && typeof JSZip !== 'undefined') {
        downloadBtn.addEventListener('click', async function() {
            try {
                const originalText = downloadBtn.innerHTML;
                downloadBtn.disabled = true;
                downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing Download...';
                
                const zip = new JSZip();
                
                const [resumeResponse, profsumResponse] = await Promise.all([
                    fetch('logo_resource/resume.jpg'),
                    fetch('logo_resource/profsum.jpg')
                ]);
                
                const resumeBlob = await resumeResponse.blob();
                const profsumBlob = await profsumResponse.blob();
                
                zip.file('Justine_Cedrick_R_Ambal_Resume.jpg', resumeBlob);
                zip.file('Justine_Cedrick_R_Ambal_Professional_Summary.jpg', profsumBlob);
                
                const zipBlob = await zip.generateAsync({ type: 'blob' });
                
                const link = document.createElement('a');
                link.href = URL.createObjectURL(zipBlob);
                link.download = 'Justine_Cedrick_R_Ambal_Resume_Package.zip';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                URL.revokeObjectURL(link.href);
                
                downloadBtn.disabled = false;
                downloadBtn.innerHTML = originalText;
            } catch (error) {
                console.error('Error creating zip file:', error);
                alert('Error downloading resume. Please try again.');
                downloadBtn.disabled = false;
                downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download Resume';
            }
        });
    }

    // Resume flip functionality
    const flipContainer = document.getElementById('resumeFlipContainer');
    if (flipContainer) {
        let clickCount = 0;
        let clickTimer = null;

        flipContainer.addEventListener('click', function() {
            clickCount++;
            
            if (clickCount === 1) {
                clickTimer = setTimeout(function() {
                    clickCount = 0;
                }, 300);
            } else if (clickCount === 2) {
                clearTimeout(clickTimer);
                clickCount = 0;
                flipContainer.classList.toggle('flipped');
            }
        });
    }
});

// Projects mobile interaction
document.addEventListener('DOMContentLoaded', function () {
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (!isTouchDevice) return;

    const featuredCards = Array.from(document.querySelectorAll('.projects-grid .project-card'));
    const otherCards = Array.from(document.querySelectorAll('.other-projects-grid .other-project-card'));

    function resetCards(cards, shouldResumeOrbit = false) {
        cards.forEach(card => {
            card.classList.remove('mobile-flipped');
            if (shouldResumeOrbit) {
                card.style.animationPlayState = '';
            }
        });
    }

    function setupCardInteractions(cards, { orbiting = false } = {}) {
        cards.forEach(card => {
            card.addEventListener('click', function (event) {
                if (!window.matchMedia('(hover: none)').matches) return;
                if (event.target.closest('a')) return;

                const alreadyFlipped = card.classList.contains('mobile-flipped');

                resetCards(cards, orbiting);

                if (!alreadyFlipped) {
                    card.classList.add('mobile-flipped');
                    if (orbiting) {
                        card.style.animationPlayState = 'paused';
                    }
                }
            });
        });
    }

    setupCardInteractions(featuredCards, { orbiting: true });
    setupCardInteractions(otherCards, { orbiting: false });

    document.addEventListener('click', function (event) {
        if (!window.matchMedia('(hover: none)').matches) return;
        if (event.target.closest('.project-card, .other-project-card')) return;
        resetCards(featuredCards, true);
        resetCards(otherCards, false);
    });
});

// Active navigation state based on scroll position
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    function updateActiveNav() {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            // Handle combined sections
            if (href === '#about' && (current === 'about' || current === 'contact')) {
                link.classList.add('active');
            } else if (href === '#skills' && (current === 'skills' || current === 'projects')) {
                link.classList.add('active');
            } else if (href === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();
});

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 20;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Sidebar text slide animation
document.addEventListener('DOMContentLoaded', function() {
    const sidebarNav = document.getElementById('sidebarNav');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    if (!sidebarNav || navLinks.length === 0) return;
    
    let hideTimeout = null;
    let isHovering = false;
    
    // Wrap each letter in spans for individual animation
    function wrapLettersInSpans() {
        navLinks.forEach(link => {
            if (link.querySelector('.nav-text')) return; // Already wrapped
            
            const text = link.textContent.trim();
            link.textContent = '';
            link.innerHTML = '';
            
            // Add text container
            const textContainer = document.createElement('span');
            textContainer.className = 'nav-text';
            textContainer.style.cssText = 'display: inline-block; padding-left: 12px;';
            
            // Wrap each letter
            for (let i = 0; i < text.length; i++) {
                const span = document.createElement('span');
                span.className = 'nav-letter';
                span.textContent = text[i];
                span.style.cssText = 'display: inline-block; transition: transform 0.3s ease, opacity 0.3s ease;';
                textContainer.appendChild(span);
            }
            
            link.appendChild(textContainer);
        });
    }
    
    // Hide text - slide right to left, letters disappear one by one
    function hideText() {
        if (isHovering) return;
        
        navLinks.forEach(link => {
            const letters = link.querySelectorAll('.nav-letter');
            const totalLetters = letters.length;
            
            // Calculate when to start shrinking background (when first letter starts disappearing)
            const totalDuration = totalLetters * 30;
            const shrinkStart = totalDuration * 0.3; // Start shrinking at 30% of animation
            
            // Start shrinking background
            setTimeout(() => {
                if (link.classList.contains('active')) {
                    link.classList.add('hiding');
                }
            }, shrinkStart);
            
            letters.forEach((letter, index) => {
                setTimeout(() => {
                    letter.style.transform = 'translateX(-100%)';
                    letter.style.opacity = '0';
                }, (totalLetters - index - 1) * 30); // Start from right, disappear as they reach diamond
            });
        });
    }
    
    // Show text - slide left to right, letters appear one by one
    function showText() {
        navLinks.forEach(link => {
            const letters = link.querySelectorAll('.nav-letter');
            
            // Remove hiding class to expand background
            link.classList.remove('hiding');
            
            letters.forEach((letter, index) => {
                letter.style.transform = 'translateX(0)';
                letter.style.opacity = '1';
                letter.style.transitionDelay = `${index * 30}ms`;
            });
        });
        
        // Reset transition delay after animation
        setTimeout(() => {
            navLinks.forEach(link => {
                const letters = link.querySelectorAll('.nav-letter');
                letters.forEach(letter => {
                    letter.style.transitionDelay = '0ms';
                });
            });
        }, 500);
    }
    
    // Initialize - wrap letters in spans
    wrapLettersInSpans();
    
    // Handle mouse leave - start 2 second timer
    sidebarNav.addEventListener('mouseleave', function() {
        isHovering = false;
        
        if (hideTimeout) {
            clearTimeout(hideTimeout);
        }
        
        hideTimeout = setTimeout(() => {
            hideText();
        }, 2000);
    });
    
    // Handle mouse enter - show text immediately
    sidebarNav.addEventListener('mouseenter', function() {
        isHovering = true;
        
        if (hideTimeout) {
            clearTimeout(hideTimeout);
            hideTimeout = null;
        }
        
        showText();
    });
});
