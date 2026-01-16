/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    GetRich – Finance101  
    Saving Page Interactive JavaScript
    Progress Trackers, Habit Management, Animations
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

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
});

// ━━━ EMERGENCY FUND TRACKER ANIMATION ━━━
document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.getElementById('fundProgress');
    
    if (progressBar) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                    
                    // Animate from 0 to current progress
                    let width = 0;
                    const targetWidth = 50; // 50% as per HTML
                    const duration = 2000;
                    const increment = targetWidth / (duration / 16);
                    
                    const animate = () => {
                        width += increment;
                        if (width < targetWidth) {
                            progressBar.style.width = width + '%';
                            requestAnimationFrame(animate);
                        } else {
                            progressBar.style.width = targetWidth + '%';
                        }
                    };
                    
                    animate();
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(progressBar.parentElement);
    }
});

// ━━━ GOAL CARDS PROGRESS ANIMATION ━━━
document.addEventListener('DOMContentLoaded', () => {
    const goalCards = document.querySelectorAll('.goal-card');
    
    const goalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                
                const progressFill = entry.target.querySelector('.goal-progress-fill');
                if (progressFill) {
                    const targetWidth = progressFill.style.width;
                    progressFill.style.width = '0%';
                    
                    setTimeout(() => {
                        progressFill.style.width = targetWidth;
                    }, 200);
                }
            }
        });
    }, { threshold: 0.3 });
    
    goalCards.forEach(card => goalObserver.observe(card));
});

// ━━━ HABIT TOGGLE FUNCTION ━━━
function toggleHabit(habitElement) {
    habitElement.classList.toggle('completed');
    
    // Play subtle success animation
    if (habitElement.classList.contains('completed')) {
        // Add a subtle scale animation
        habitElement.style.transform = 'scale(1.02)';
        setTimeout(() => {
            habitElement.style.transform = '';
        }, 300);
        
        // Increase streak (for demo purposes)
        const streakElement = habitElement.querySelector('.habit-streak');
        if (streakElement) {
            const currentStreak = parseInt(streakElement.textContent.match(/\d+/)[0]);
            streakElement.textContent = `🔥 ${currentStreak + 1} days`;
        }
    }
}

// Make toggle function available globally
window.toggleHabit = toggleHabit;

// ━━━ GOAL CARD INTERACTION ━━━
document.addEventListener('DOMContentLoaded', () => {
    const goalCards = document.querySelectorAll('.goal-card');
    
    goalCards.forEach(card => {
        card.addEventListener('click', function() {
            const goalType = this.getAttribute('data-goal');
            const goalTitle = this.querySelector('h3').textContent;
            
            // Show notification (simple alert for demo, could be a modal)
            showNotification(`Great! You're working on your ${goalTitle}. Keep up the momentum! 💪`);
        });
    });
});

// ━━━ NOTIFICATION SYSTEM ━━━
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'custom-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: linear-gradient(135deg, #4FD1C5 0%, #7C7CFF 100%);
        color: white;
        padding: 1rem 2rem;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        z-index: 9999;
        animation: slideInRight 0.4s ease-out;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease-out';
        setTimeout(() => notification.remove(), 400);
    }, 3000);
}

// Add notification animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// ━━━ SAVING CARD HOVER EFFECTS ━━━
document.addEventListener('DOMContentLoaded', () => {
    const savingCards = document.querySelectorAll('.saving-card');
    
    savingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
});

// ━━━ SMOOTH SCROLL FOR BACK BUTTON ━━━
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

animateShapes();

// ━━━ SIMULATE PROGRESS UPDATES ━━━
function simulateProgressUpdate() {
    const currentSaved = document.getElementById('currentSaved');
    const currentAmount = document.getElementById('currentAmount');
    const fundProgress = document.getElementById('fundProgress');
    
    if (currentSaved && currentAmount && fundProgress) {
        // Simulate saving $50 (for demo purposes)
        let saved = 2500;
        const goal = 5000;
        
        setInterval(() => {
            saved += 50;
            if (saved > goal) saved = goal;
            
            const percentage = (saved / goal) * 100;
            currentSaved.textContent = `$${saved.toLocaleString()}`;
            currentAmount.textContent = `$${saved.toLocaleString()}`;
            fundProgress.style.width = `${percentage}%`;
        }, 30000); // Update every 30 seconds for demo
    }
}

// Uncomment to enable auto-progress simulation
// simulateProgressUpdate();

console.log('💰 Saving Page loaded successfully!');

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SAVINGS CALCULATOR
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const monthlyAmountSlider = document.getElementById('monthlyAmount');
const timeframeSlider = document.getElementById('timeframe');
const interestRateSlider = document.getElementById('interestRate');

const monthlyValue = document.getElementById('monthlyValue');
const timeValue = document.getElementById('timeValue');
const rateValue = document.getElementById('rateValue');

const futureValue = document.getElementById('futureValue');
const totalInvested = document.getElementById('totalInvested');
const interestEarned = document.getElementById('interestEarned');
const resultInsight = document.getElementById('resultInsight');

function calculateFutureValue(monthly, years, rate) {
    const months = years * 12;
    const monthlyRate = rate / 100 / 12;
    
    if (rate === 0) {
        return monthly * months;
    }
    
    const futureVal = monthly * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
    return Math.round(futureVal);
}

function updateCalculator() {
    const monthly = parseInt(monthlyAmountSlider.value);
    const years = parseInt(timeframeSlider.value);
    const rate = parseFloat(interestRateSlider.value);
    
    // Update display values
    monthlyValue.textContent = `$${monthly}`;
    timeValue.textContent = `${years} year${years > 1 ? 's' : ''}`;
    rateValue.textContent = `${rate}%`;
    
    // Calculate values
    const future = calculateFutureValue(monthly, years, rate);
    const invested = monthly * years * 12;
    const interest = future - invested;
    const interestPercentage = Math.round((interest / invested) * 100);
    
    // Update results
    futureValue.textContent = `$${future.toLocaleString()}`;
    totalInvested.textContent = `$${invested.toLocaleString()}`;
    interestEarned.textContent = `$${interest.toLocaleString()}`;
    
    // Update insight
    if (interest > 0) {
        resultInsight.textContent = `🎯 By saving $${monthly}/month for ${years} year${years > 1 ? 's' : ''}, you'll earn $${interest.toLocaleString()} in interest! That's ${interestPercentage}% free money.`;
    } else {
        resultInsight.textContent = `💰 You'll save $${invested.toLocaleString()} total. Consider investing to earn interest!`;
    }
}

if (monthlyAmountSlider && timeframeSlider && interestRateSlider) {
    monthlyAmountSlider.addEventListener('input', updateCalculator);
    timeframeSlider.addEventListener('input', updateCalculator);
    interestRateSlider.addEventListener('input', updateCalculator);
    
    // Initial calculation
    updateCalculator();
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CHALLENGE FUNCTIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function startChallenge(challengeType) {
    const messages = {
        '52week': '🏆 52-Week Challenge activated! Start with $1 this week. Good luck!',
        'no-spend': '🔥 No-Spend Weekend challenge accepted! Plan some fun free activities.',
        'latte': '☕ Latte Factor challenge started! Time to brew at home and save big.',
        'roundup': '💎 Round-Up Saver activated! Every penny counts towards your goals.'
    };
    
    showNotification(messages[challengeType] || 'Challenge started! You got this! 💪');
}

window.startChallenge = startChallenge;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TIPS CAROUSEL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function scrollCarousel(direction) {
    const carousel = document.getElementById('tipsCarousel');
    if (!carousel) return;
    
    const cardWidth = carousel.querySelector('.tip-card').offsetWidth + 32; // card width + gap
    carousel.scrollBy({
        left: direction * cardWidth,
        behavior: 'smooth'
    });
}

window.scrollCarousel = scrollCarousel;

// Create carousel dots
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('tipsCarousel');
    const dotsContainer = document.getElementById('carouselDots');
    
    if (carousel && dotsContainer) {
        const tipCards = carousel.querySelectorAll('.tip-card');
        
        tipCards.forEach((card, index) => {
            const dot = document.createElement('div');
            dot.className = 'carousel-dot';
            if (index === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                const cardWidth = card.offsetWidth + 32;
                carousel.scrollTo({
                    left: cardWidth * index,
                    behavior: 'smooth'
                });
            });
            
            dotsContainer.appendChild(dot);
        });
        
        // Update active dot on scroll
        carousel.addEventListener('scroll', () => {
            const scrollLeft = carousel.scrollLeft;
            const cardWidth = tipCards[0].offsetWidth + 32;
            const currentIndex = Math.round(scrollLeft / cardWidth);
            
            dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        });
    }
});
