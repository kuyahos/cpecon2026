/**
 * CPECON 2026 - Interactive Scripts
 * Futuristic Black & White Theme with Scroll Robot Animation
 */

document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // NAVIGATION
    // ============================================
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(255, 255, 255, 0.05)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.9)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 70; // Navbar height
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });

    // ============================================
    // SCROLL ROBOT ANIMATION
    // ============================================
    const robot = document.getElementById('scrollRobot');
    
    if (robot) {
        let lastScrollY = window.scrollY;
        let robotRotation = 0;
        let robotScale = 1;
        let isInViewport = false;

        // Check if robot is in viewport
        function checkRobotInViewport() {
            const rect = robot.getBoundingClientRect();
            isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
        }

        // Robot animation on scroll
        function animateRobot() {
            if (!isInViewport) return;

            const scrollY = window.scrollY;
            const scrollDelta = scrollY - lastScrollY;
            
            // Calculate robot rotation based on scroll direction
            robotRotation += scrollDelta * 0.5;
            
            // Add subtle floating animation
            const floatOffset = Math.sin(Date.now() / 500) * 5;
            
            // Scale effect based on scroll velocity
            const targetScale = 1 + Math.abs(scrollDelta) * 0.002;
            robotScale += (targetScale - robotScale) * 0.1;
            
            // Apply transforms
            robot.style.transform = `
                translateY(${floatOffset}px) 
                rotateY(${robotRotation}deg) 
                scale(${Math.min(robotScale, 1.1)})
            `;
            
            // Reset scale gradually
            robotScale += (1 - robotScale) * 0.05;
            
            lastScrollY = scrollY;
        }

        // Continuous animation loop
        function robotAnimationLoop() {
            animateRobot();
            requestAnimationFrame(robotAnimationLoop);
        }

        // Initialize robot animation
        checkRobotInViewport();
        robotAnimationLoop();

        // Update viewport check on scroll
        window.addEventListener('scroll', checkRobotInViewport, { passive: true });

        // Enhanced robot interaction on hover
        robot.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s ease';
            this.style.transform += ' scale(1.1)';
        });

        robot.addEventListener('mouseleave', function() {
            this.style.transition = 'transform 0.3s ease';
        });
    }

    // ============================================
    // FAQ ACCORDION
    // ============================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            
            // Add click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });

    // ============================================
    // COUNTER ANIMATION
    // ============================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersStarted = false;

    function startCounters() {
        if (countersStarted) return;
        
        const statsSection = document.querySelector('.about-stats');
        if (!statsSection) return;
        
        const rect = statsSection.getBoundingClientRect();
        if (rect.top > window.innerHeight || rect.bottom < 0) return;
        
        countersStarted = true;
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            function updateCounter() {
                current += step;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target + '+';
                }
            }
            
            updateCounter();
        });
    }

    window.addEventListener('scroll', startCounters, { passive: true });
    startCounters(); // Check on load

    // ============================================
    // SCROLL REVEAL ANIMATIONS
    // ============================================
    const revealElements = document.querySelectorAll('.about-card, .faq-item, .stat-item, .section-header');

    function revealOnScroll() {
        revealElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight * 0.85 && rect.bottom > 0;
            
            if (isVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Initialize reveal elements
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    window.addEventListener('scroll', revealOnScroll, { passive: true });
    revealOnScroll(); // Check on load

    // ============================================
    // PARALLAX EFFECTS
    // ============================================
    const heroBg = document.querySelector('.hero-bg');
    
    if (heroBg) {
        window.addEventListener('scroll', function() {
            const scrollY = window.scrollY;
            heroBg.style.transform = `translateY(${scrollY * 0.3}px)`;
        }, { passive: true });
    }

    // ============================================
    // GLITCH TEXT EFFECT ENHANCEMENT
    // ============================================
    const glitchElements = document.querySelectorAll('.glitch');
    
    glitchElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.animation = 'glitch-1 0.3s infinite';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
    });

    // ============================================
    // BUTTON RIPPLE EFFECT
    // ============================================
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                left: ${x}px;
                top: ${y}px;
                width: 100px;
                height: 100px;
                margin-left: -50px;
                margin-top: -50px;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // ============================================
    // TYPING EFFECT FOR HERO SUBTITLE
    // ============================================
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        heroSubtitle.style.opacity = '1';
        
        let charIndex = 0;
        function typeText() {
            if (charIndex < text.length) {
                heroSubtitle.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeText, 50);
            }
        }
        
        // Start typing after a short delay
        setTimeout(typeText, 500);
    }

    // ============================================
    // ORBIT RING SPEED BASED ON SCROLL
    // ============================================
    const orbitRings = document.querySelectorAll('.orbit-ring');
    
    if (orbitRings.length > 0) {
        let scrollSpeed = 0;
        
        window.addEventListener('scroll', function() {
            scrollSpeed = Math.abs(window.scrollY - lastScrollY);
            
            orbitRings.forEach((ring, index) => {
                const baseSpeed = 15 + (index * 5);
                const newSpeed = Math.max(2, baseSpeed - scrollSpeed * 0.1);
                ring.style.animationDuration = `${newSpeed}s`;
            });
        }, { passive: true });
    }

    // ============================================
    // PARTICLE GENERATION
    // ============================================
    const particlesContainer = document.querySelector('.particles');
    
    if (particlesContainer) {
        // Add more dynamic particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            const size = Math.random() * 3 + 1;
            const left = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 10 + 10;
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
                border-radius: 50%;
                left: ${left}%;
                animation: particleFloat ${duration}s linear ${delay}s infinite;
            `;
            
            particlesContainer.appendChild(particle);
        }
        
        // Add particle animation
        const particleStyle = document.createElement('style');
        particleStyle.textContent = `
            @keyframes particleFloat {
                0% {
                    transform: translateY(100vh) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) rotate(720deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(particleStyle);
    }

    // ============================================
    // KEYBOARD NAVIGATION
    // ============================================
    document.addEventListener('keydown', function(e) {
        // ESC to close FAQ items
        if (e.key === 'Escape') {
            faqItems.forEach(item => item.classList.remove('active'));
        }
    });

    // ============================================
    // PERFORMANCE: Pause animations when tab is hidden
    // ============================================
    document.addEventListener('visibilitychange', function() {
        const animatedElements = document.querySelectorAll('.robot, .orbit-ring, .particles');
        
        if (document.hidden) {
            animatedElements.forEach(el => {
                el.style.animationPlayState = 'paused';
            });
        } else {
            animatedElements.forEach(el => {
                el.style.animationPlayState = 'running';
            });
        }
    });

    // ============================================
    // CONSOLE EASTER EGG
    // ============================================
    console.log('%c CPECON 2026 ', 'background: #000; color: #fff; font-size: 24px; font-weight: bold; padding: 10px 20px;');
    console.log('%c ARISE AND LEVEL UP! ', 'background: #fff; color: #000; font-size: 16px; font-weight: bold; padding: 5px 10px;');
    console.log('%c Organized by ICpEP.SE - CatSU ', 'color: #666; font-size: 12px;');
    console.log('%c Visit us: https://www.facebook.com/Icpep.seCatSu ', 'color: #fff; font-size: 11px; text-decoration: underline;');
});
