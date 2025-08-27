// ===========================
// Portfolio Interactive JavaScript
// HyeSeung Lee (Soon) - Modern Portfolio
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeScrollAnimations();
    initializeParallaxEffects();
    initializeSkillBars();
    initializeWorkflowInteractions();
    initializeCounterAnimations();
    initializeContactForm();
    initializeTypewriterEffect();
    initializeScrollIndicator();
    initializeSmoothScrolling();
    initializeProjectCardClicks();
    initializeInteractiveRoadmap();
});

// ===========================
// Navigation Management
// ===========================
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Active link highlighting
    updateActiveNavLink();
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ===========================
// Scroll Animations
// ===========================
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.section-title, .section-subtitle, .about-text, .about-image, ' +
        '.project-card, .skills-category, .contact-info, .contact-form-container'
    );
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Special handling for project cards
                if (entry.target.classList.contains('project-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 200;
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, delay);
                }
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ===========================
// Parallax Effects
// ===========================
function initializeParallaxEffects() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.parallax;
            const yPos = -(scrolled * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// ===========================
// Workflow Animation System
// ===========================
function initializeSkillBars() {
    const workflowStages = document.querySelectorAll('.workflow-stage');
    const workflowImpact = document.querySelector('.workflow-impact');
    
    const workflowObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stage = entry.target;
                const stageIndex = Array.from(workflowStages).indexOf(stage);
                
                // Staggered animation for workflow stages
                setTimeout(() => {
                    stage.classList.add('animate');
                    
                    // Add special entrance animations
                    const icon = stage.querySelector('.stage-icon');
                    const examples = stage.querySelector('.stage-examples');
                    
                    if (icon) {
                        setTimeout(() => {
                            icon.style.animation = 'workflowPulse 2s ease-out';
                        }, 800);
                    }
                    
                }, stageIndex * 300);
                
                workflowObserver.unobserve(stage);
            }
        });
    }, { threshold: 0.3 });
    
    // Impact section observer
    const impactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Animate impact numbers with counter effect
                const impactNumbers = entry.target.querySelectorAll('.impact-number');
                impactNumbers.forEach((number, index) => {
                    const targetValue = number.textContent.replace(/\D/g, ''); // Extract number
                    const hasPlus = number.textContent.includes('+');
                    
                    setTimeout(() => {
                        animateCounter(number, parseInt(targetValue), hasPlus);
                    }, index * 200);
                });
                
                impactObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    workflowStages.forEach(stage => {
        workflowObserver.observe(stage);
    });
    
    if (workflowImpact) {
        impactObserver.observe(workflowImpact);
    }
}

function animateCounter(element, target, hasPlus) {
    let current = 0;
    const increment = Math.ceil(target / 60); // 60 frames for smooth animation
    const duration = 1500;
    const stepTime = duration / (target / increment);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (hasPlus ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = current + (hasPlus ? '+' : '');
        }
    }, stepTime);
}

// Enhanced workflow interactions
function initializeWorkflowInteractions() {
    const workflowStages = document.querySelectorAll('.workflow-stage');
    
    workflowStages.forEach(stage => {
        // Add click interaction for mobile
        stage.addEventListener('click', () => {
            // Remove active class from all stages
            workflowStages.forEach(s => s.classList.remove('active'));
            // Add active class to clicked stage
            stage.classList.add('active');
        });
        
        // Enhanced hover effects
        stage.addEventListener('mouseenter', () => {
            const techItems = stage.querySelectorAll('.tech-item');
            techItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.transform = 'translateY(-3px) scale(1.05)';
                    item.style.background = getStageColor(stage.dataset.stage);
                    item.style.color = 'white';
                }, index * 50);
            });
        });
        
        stage.addEventListener('mouseleave', () => {
            const techItems = stage.querySelectorAll('.tech-item');
            techItems.forEach(item => {
                item.style.transform = '';
                item.style.background = '';
                item.style.color = '';
            });
        });
    });
}

function getStageColor(stage) {
    const colors = {
        'concept': '#3B82F6',
        'design': '#A855F7', 
        'code': '#22C55E',
        'test': '#F97316',
        'deploy': '#EF4444'
    };
    return colors[stage] || '#FF7B4C';
}

// ===========================
// Counter Animations
// ===========================
function initializeCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current);
                    }
                }, 16);
                
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// ===========================
// Contact Form Handling
// ===========================
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = form.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        try {
            // Simulate form submission
            await simulateFormSubmission(data);
            
            // Show success message
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            form.reset();
            
        } catch (error) {
            // Show error message
            showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
        } finally {
            // Reset button state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });
    
    // Form validation and styling
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateInput);
        input.addEventListener('input', clearValidation);
    });
}

function validateInput(e) {
    const input = e.target;
    const value = input.value.trim();
    
    // Remove existing validation classes
    input.classList.remove('valid', 'invalid');
    
    // Email validation
    if (input.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value && !emailRegex.test(value)) {
            input.classList.add('invalid');
            return false;
        }
    }
    
    // Required field validation
    if (input.hasAttribute('required') && !value) {
        input.classList.add('invalid');
        return false;
    }
    
    if (value) {
        input.classList.add('valid');
    }
    
    return true;
}

function clearValidation(e) {
    e.target.classList.remove('invalid');
}

async function simulateFormSubmission(data) {
    // Simulate API call delay
    return new Promise((resolve) => {
        setTimeout(resolve, 1500);
    });
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">
                ${type === 'success' ? '✓' : '!'}
            </span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        padding: 16px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        transform: translateX(400px);
        transition: transform 0.3s ease-in-out;
        ${type === 'success' ? 'background: #10B981;' : 'background: #EF4444;'}
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// ===========================
// Typewriter Effect
// ===========================
function initializeTypewriterEffect() {
    const typewriterElement = document.querySelector('.typing-animation');
    if (!typewriterElement) return;
    
    const text = 'HyeSeung Lee';
    let index = 0;
    
    // Clear initial content
    typewriterElement.textContent = '';
    
    // Start typing after initial delay
    setTimeout(() => {
        function typeWriter() {
            if (index < text.length) {
                typewriterElement.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 150);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    typewriterElement.style.borderRight = 'none';
                }, 2000);
            }
        }
        typeWriter();
    }, 1000);
}

// ===========================
// Scroll Indicator
// ===========================
function initializeScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;
    
    // Hide scroll indicator when scrolling starts
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.transform = 'translateX(-50%) translateY(20px)';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.transform = 'translateX(-50%) translateY(0)';
        }
    });
    
    // Smooth scroll to next section when clicked
    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.getElementById('about');
        aboutSection.scrollIntoView({ behavior: 'smooth' });
    });
}

// ===========================
// Smooth Scrolling
// ===========================
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}


// ===========================
// Project Card Interactions
// ===========================
function initializeProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Add tilt effect on mouse move
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        // Reset transform on mouse leave
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
        
        // Add click animation
        card.addEventListener('click', (e) => {
            // Don't animate if clicking on links
            if (e.target.closest('.project-link')) return;
            
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
        });
    });
}

// ===========================
// Button Ripple Effect
// ===========================
function initializeButtonRipples() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// ===========================
// Performance Optimizations
// ===========================
function initializePerformanceOptimizations() {
    // Lazy load images
    if ('IntersectionObserver' in window) {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Throttle scroll events
    let isScrolling = false;
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                // Handle scroll-dependent updates here
                isScrolling = false;
            });
            isScrolling = true;
        }
    });
}

// ===========================
// Keyboard Navigation
// ===========================
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // ESC key closes mobile menu
        if (e.key === 'Escape') {
            const hamburger = document.getElementById('hamburger');
            const navMenu = document.getElementById('nav-menu');
            
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
        
        // Arrow keys for section navigation
        if (e.key === 'ArrowDown' && e.ctrlKey) {
            e.preventDefault();
            scrollToNextSection();
        }
        
        if (e.key === 'ArrowUp' && e.ctrlKey) {
            e.preventDefault();
            scrollToPreviousSection();
        }
    });
}

function scrollToNextSection() {
    const sections = Array.from(document.querySelectorAll('.section, .hero'));
    const currentScrollY = window.scrollY + 100;
    
    const nextSection = sections.find(section => {
        return section.offsetTop > currentScrollY;
    });
    
    if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToPreviousSection() {
    const sections = Array.from(document.querySelectorAll('.section, .hero')).reverse();
    const currentScrollY = window.scrollY + 100;
    
    const prevSection = sections.find(section => {
        return section.offsetTop < currentScrollY;
    });
    
    if (prevSection) {
        prevSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// ===========================
// Initialize All Features
// ===========================
// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAllFeatures);
} else {
    initializeAllFeatures();
}

function initializeAllFeatures() {
    initializeProjectCards();
    initializeButtonRipples();
    initializePerformanceOptimizations();
    initializeKeyboardNavigation();
}

// ===========================
// CSS Animation Keyframes (Dynamic)
// ===========================
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .form-group input.valid,
    .form-group textarea.valid {
        border-color: #10B981;
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
    }
    
    .form-group input.invalid,
    .form-group textarea.invalid {
        border-color: #EF4444;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
    
    .notification {
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    
    .notification-icon {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
    }
`;

document.head.appendChild(style);

// ===========================
// Project Card Click Navigation
// ===========================
function initializeProjectCardClicks() {
    const projectCards = document.querySelectorAll('.project-card');
    
    // Define the mapping between project data attributes and their corresponding pages
    const projectPages = {
        'carbonbusters': 'IndieCade.html',
        'goodbits': 'GoodBits.html',
        'impact': 'Impact.html'
    };
    
    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Prevent navigation if clicking on project links
            if (e.target.closest('.project-link')) {
                return;
            }
            
            const projectType = this.getAttribute('data-project');
            const targetPage = projectPages[projectType];
            
            if (targetPage) {
                window.location.href = targetPage;
            }
        });
        
        // Add visual feedback for clickable cards
        card.addEventListener('mouseenter', function() {
            this.style.transform = this.style.transform.replace('translateY(-10px)', '') + ' translateY(-15px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace('translateY(-15px)', '');
        });
    });
}

// ===========================
// Interactive Roadmap
// ===========================
function initializeInteractiveRoadmap() {
    const character = document.getElementById('roadmapCharacter');
    const stages = document.querySelectorAll('.roadmap-stage');
    const stageDetails = document.getElementById('stageDetails');
    const detailsClose = document.getElementById('detailsClose');
    
    if (!character || !stages.length || !stageDetails) return;
    
    // Stage data
    const stageData = {
        concept: {
            title: 'Concept',
            description: 'Every project starts with understanding the problem and envisioning the solution',
            technologies: ['Research', 'User Stories', 'Problem Analysis'],
            examples: [
                '🌍 Climate action through gaming',
                '🏛️ LGBTQ+ community engagement', 
                '🎮 Interactive storytelling'
            ]
        },
        design: {
            title: 'Design',
            description: 'Architecting user experiences and system structures that solve real problems',
            technologies: ['UX/UI Design', 'System Architecture', 'Wireframing'],
            examples: [
                '🎨 Game mechanics for behavior change',
                '📐 Accessible library interface',
                '🖼️ Visual novel flow design'
            ]
        },
        code: {
            title: 'Code',
            description: 'Bringing designs to life with clean, efficient, and scalable code',
            technologies: ['C#', 'Python', 'Godot Engine', 'HTML/CSS', 'JavaScript'],
            examples: [
                '⚡ Graph algorithms for city simulation',
                '🐍 Ren\'Py scripting for narratives',
                '🌐 Responsive web development'
            ]
        },
        test: {
            title: 'Test',
            description: 'Ensuring quality through rigorous testing and user feedback integration',
            technologies: ['User Testing', 'Debugging', 'Performance Analysis'],
            examples: [
                '🎯 Game balance testing',
                '♿ Accessibility validation',
                '📊 Performance optimization'
            ]
        },
        deploy: {
            title: 'Deploy',
            description: 'Launching solutions that make a real impact in the world',
            technologies: ['Version Control', 'Project Management', 'Launch Strategy'],
            examples: [
                '🚀 IndieCade game submission',
                '💝 Increased library donations',
                '🎭 Interactive story experiences'
            ]
        }
    };
    
    let isDragging = false;
    let currentStage = null;
    
    // Drag functionality
    character.addEventListener('mousedown', startDrag);
    character.addEventListener('touchstart', startDrag);
    
    function startDrag(e) {
        isDragging = true;
        character.style.transition = 'none';
        
        const moveHandler = (e) => {
            if (!isDragging) return;
            
            const clientX = e.clientX || e.touches[0].clientX;
            const clientY = e.clientY || e.touches[0].clientY;
            const containerRect = character.parentElement.getBoundingClientRect();
            
            const x = clientX - containerRect.left - 24; // Half character width
            const y = clientY - containerRect.top - 24; // Half character height
            
            // Keep character within bounds
            const maxX = containerRect.width - 48;
            const maxY = containerRect.height - 48;
            
            character.style.left = Math.max(0, Math.min(x, maxX)) + 'px';
            character.style.top = Math.max(0, Math.min(y, maxY)) + 'px';
            character.style.transform = 'none';
            
            // Check for stage collision
            checkStageCollision(clientX, clientY);
        };
        
        const endHandler = () => {
            isDragging = false;
            character.style.transition = 'all 0.3s ease';
            document.removeEventListener('mousemove', moveHandler);
            document.removeEventListener('mouseup', endHandler);
            document.removeEventListener('touchmove', moveHandler);
            document.removeEventListener('touchend', endHandler);
        };
        
        document.addEventListener('mousemove', moveHandler);
        document.addEventListener('mouseup', endHandler);
        document.addEventListener('touchmove', moveHandler);
        document.addEventListener('touchend', endHandler);
        
        e.preventDefault();
    }
    
    function checkStageCollision(mouseX, mouseY) {
        stages.forEach(stage => {
            const stageRect = stage.getBoundingClientRect();
            const stageCenterX = stageRect.left + stageRect.width / 2;
            const stageCenterY = stageRect.top + stageRect.height / 2;
            
            const distance = Math.sqrt(
                Math.pow(mouseX - stageCenterX, 2) + Math.pow(mouseY - stageCenterY, 2)
            );
            
            const circle = stage.querySelector('.stage-circle');
            if (distance < 60) { // Collision threshold
                if (currentStage !== stage) {
                    // Remove active class from all stages
                    stages.forEach(s => s.querySelector('.stage-circle').classList.remove('active'));
                    
                    // Add active class to current stage
                    circle.classList.add('active');
                    currentStage = stage;
                    
                    // Show stage details
                    showStageDetails(stage.dataset.stage);
                }
            } else {
                circle.classList.remove('active');
                if (currentStage === stage) {
                    currentStage = null;
                }
            }
        });
    }
    
    function showStageDetails(stageName) {
        const data = stageData[stageName];
        if (!data) return;
        
        // Update content
        document.getElementById('detailsTitle').textContent = data.title;
        document.getElementById('detailsDescription').textContent = data.description;
        
        // Update technologies
        const techList = document.getElementById('techList');
        techList.innerHTML = '';
        data.technologies.forEach(tech => {
            const span = document.createElement('span');
            span.className = 'tech-tag';
            span.textContent = tech;
            techList.appendChild(span);
        });
        
        // Update examples
        const exampleList = document.getElementById('exampleList');
        exampleList.innerHTML = '';
        data.examples.forEach(example => {
            const div = document.createElement('div');
            div.className = 'example-item';
            div.textContent = example;
            exampleList.appendChild(div);
        });
        
        // Show details popup
        stageDetails.classList.add('show');
    }
    
    function hideStageDetails() {
        stageDetails.classList.remove('show');
        stages.forEach(s => s.querySelector('.stage-circle').classList.remove('active'));
        currentStage = null;
    }
    
    // Close button functionality
    detailsClose.addEventListener('click', hideStageDetails);
    
    // Click outside to close
    stageDetails.addEventListener('click', (e) => {
        if (e.target === stageDetails) {
            hideStageDetails();
        }
    });
    
    // Stage click functionality (alternative to drag)
    stages.forEach(stage => {
        stage.addEventListener('click', () => {
            showStageDetails(stage.dataset.stage);
        });
    });
    
    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideStageDetails();
        }
    });
}

// ===========================
// Debug Console Info
// ===========================
console.log('%c🚀 HyeSeung Lee Portfolio Loaded Successfully!', 'color: #FF7B4C; font-size: 16px; font-weight: bold;');
console.log('%c✨ Interactive features initialized', 'color: #10B981; font-size: 12px;');
console.log('%c📧 Contact: leehs001024@gmail.com', 'color: #6366F1; font-size: 12px;');