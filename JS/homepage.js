/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   GetRich – Finance101  
   Homepage Interactive JavaScript
   Micro-interactions, Animations, AI Chat
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

// ━━━ INTERSECTION OBSERVER FOR SCROLL ANIMATIONS ━━━
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with animate-on-scroll class
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
});

// ━━━ COUNTER ANIMATION FOR STATS ━━━
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// Start counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                animateCounter(counter);
            });
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.stat-counters');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// ━━━ AI CHATBOT INTERACTION ━━━
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const chatMessages = document.getElementById('chatMessages');
const typingIndicator = document.getElementById('typingIndicator');

// Predefined AI responses for demo
const aiResponses = [
    "That's a great question! Let me help you with that. The key is to start small and build consistency.",
    "I understand your concern. Many young adults face similar challenges. Here's what I recommend...",
    "Excellent! You're on the right track. Let me break this down into actionable steps for you.",
    "Based on your situation, here are some personalized tips that could work well for you.",
    "That's a common misconception. Let me clarify that with a more accurate perspective.",
    "Great thinking! I can help you create a plan that fits your lifestyle and goals.",
];

function showTypingIndicator() {
    if (typingIndicator) {
        typingIndicator.style.display = 'flex';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

function hideTypingIndicator() {
    if (typingIndicator) {
        typingIndicator.style.display = 'none';
    }
}

function addUserMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user';
    messageDiv.innerHTML = `
        <div class="message-avatar">😊</div>
        <div class="message-content">${message}</div>
    `;
    chatMessages.insertBefore(messageDiv, typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addBotMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot';
    messageDiv.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content">${message}</div>
    `;
    chatMessages.insertBefore(messageDiv, typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getRandomResponse() {
    return aiResponses[Math.floor(Math.random() * aiResponses.length)];
}

function sendMessage() {
    const message = chatInput.value.trim();
    
    if (message === '') return;
    
    // Add user message
    addUserMessage(message);
    chatInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Simulate AI response delay
    setTimeout(() => {
        hideTypingIndicator();
        addBotMessage(getRandomResponse());
    }, 1500 + Math.random() * 1000); // Random delay between 1.5-2.5 seconds
}

if (sendBtn) {
    sendBtn.addEventListener('click', sendMessage);
}

if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

// ━━━ FEATURE CARD TILT EFFECT ━━━
document.addEventListener('DOMContentLoaded', () => {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
});

// ━━━ SMOOTH SCROLL FOR ANCHOR LINKS ━━━
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ━━━ ADD GLOW EFFECT ON BUTTON CLICK ━━━
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.cta-button, .chat-send-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
});

// Add ripple animation CSS dynamically
const style = document.createElement('style');
style.textContent = `
    .cta-button, .chat-send-btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ━━━ PAGE LOAD ANIMATION ━━━
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });
});

// ━━━ PARALLAX EFFECT FOR GRADIENT SHAPES ━━━
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;
});

function animateShapes() {
    const shapes = document.querySelectorAll('.gradient-shape');
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        const x = mouseX * 50 * speed;
        const y = mouseY * 50 * speed;
        
        shape.style.transform = `translate(${x}px, ${y}px)`;
    });
    
    requestAnimationFrame(animateShapes);
}

// Start parallax animation
animateShapes();

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ENHANCED HOMEPAGE FEATURES
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

// ━━━ FAQ ACCORDION FUNCTIONALITY ━━━
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
});

// ━━━ ENHANCED COUNTER ANIMATION FOR ACHIEVEMENTS ━━━
function animateAchievementCounter(element, target) {
    const duration = 2500;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// Start achievement counter animation when section is visible
const achievementObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                animateAchievementCounter(counter, target);
            });
        }
    });
}, { threshold: 0.3 });

document.addEventListener('DOMContentLoaded', () => {
    const achievementSection = document.querySelector('.achievements-grid');
    if (achievementSection) {
        achievementObserver.observe(achievementSection);
    }
});

// ━━━ ROADMAP STEP ANIMATION ━━━
document.addEventListener('DOMContentLoaded', () => {
    const roadmapSteps = document.querySelectorAll('.roadmap-step');
    
    roadmapSteps.forEach((step, index) => {
        // Stagger animations
        step.style.animationDelay = `${index * 0.15}s`;
    });
});

// ━━━ TESTIMONIAL CAROUSEL (Optional - can be expanded for scrolling) ━━━
document.addEventListener('DOMContentLoaded', () => {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    // Add staggered animation
    testimonialCards.forEach((card, index) => {
        card.style.animation = `fadeUp 0.8s ease-out ${index * 0.1}s backwards`;
    });
});

// ━━━ BEFORE/AFTER COMPARISON ANIMATION ━━━
document.addEventListener('DOMContentLoaded', () => {
    const comparisonTable = document.querySelector('.comparison-table');
    
    if (comparisonTable) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const rows = entry.target.querySelectorAll('.comparison-row');
                    rows.forEach((row, index) => {
                        row.style.animation = `fadeUp 0.6s ease-out ${index * 0.1}s backwards`;
                    });
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(comparisonTable);
    }
});

// ━━━ INTERACTIVE FEATURES ━━━

// Add scroll-based animations for stats counters
const updateStatCounters = () => {
    const statCounters = document.querySelectorAll('.stat-number');
    
    statCounters.forEach(counter => {
        const rect = counter.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible && !counter.classList.contains('animated')) {
            counter.classList.add('animated');
            const target = parseInt(counter.getAttribute('data-target'));
            animateCounter(counter);
        }
    });
};

window.addEventListener('scroll', updateStatCounters);
document.addEventListener('DOMContentLoaded', updateStatCounters);

// ━━━ ACHIEVEMENT CARD HOVER EFFECT ━━━
document.addEventListener('DOMContentLoaded', () => {
    const achievementCards = document.querySelectorAll('.achievement-card');
    
    achievementCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
});

console.log('🚀 GetRich – Finance101 loaded successfully!');
console.log('💡 Premium fintech experience ready.');
console.log('✨ Enhanced homepage features activated!');
