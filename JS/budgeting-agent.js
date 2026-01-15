/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   GetRich – Finance101  
   Budgeting Page Interactive JavaScript
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

// ━━━ SCROLL ANIMATIONS ━━━
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

// ━━━ BUDGET STAT COUNTER ANIMATION ━━━
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = '$' + Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = '$' + target.toLocaleString();
        }
    };
    
    updateCounter();
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const counters = entry.target.querySelectorAll('.stat-value');
            counters.forEach(counter => {
                animateCounter(counter);
            });
        }
    });
}, { threshold: 0.3 });

document.addEventListener('DOMContentLoaded', () => {
    const dashboard = document.querySelector('.budget-dashboard-grid');
    if (dashboard) {
        statsObserver.observe(dashboard);
    }
});

// ━━━ AI CHATBOT ━━━
const budgetChatInput = document.getElementById('budgetChatInput');
const budgetSendBtn = document.getElementById('budgetSendBtn');
const budgetChatMessages = document.getElementById('budgetChatMessages');

const budgetResponses = {
    keywords: {
        'income': [
            "Great! Let's work with that. First, calculate your after-tax monthly income. Then we'll split it: 50% needs, 30% wants, 20% savings. 📊",
            "Income is step one! Now let's build a budget that works for YOU. What are your biggest monthly expenses?"
        ],
        'rent': [
            "Rent should ideally be 25-30% of your income. If it's higher, consider roommates or location changes long-term. 🏠",
            "Housing is often the biggest expense. Can you negotiate utilities included? Or find a cheaper area?"
        ],
        'food': [
            "Food budget tip: meal prep on Sundays saves $200+/month. Cook in batches, pack lunches, limit eating out to 2x/week. 🍕",
            "The average youth spends $400-600/month on food. Cook at home more = huge savings!"
        ],
        'save': [
            "Start by automating 20% of income to savings. Even if it's just $100/month—that's $1,200/year! 💰",
            "Pay yourself first! Set up auto-transfer on payday. You won't miss what you don't see."
        ],
        'track': [
            "Use apps like Mint, YNAB, or a simple spreadsheet. Review every Friday. Awareness = control. 📱",
            "Track for 30 days without changing behavior. You'll be shocked where money goes!"
        ],
        'debt': [
            "Focus on high-interest debt first. Minimum payments on everything, extra on highest rate. Then snowball! 💳",
            "Budget should include: minimum debt payments + extra toward one debt. Don't take on NEW debt while paying off old."
        ]
    },
    default: [
        "That's a smart budgeting question! The key is realistic planning and consistent tracking. What specific area do you want to improve? 💡",
        "Let's tackle that together. Budgeting is about progress, not perfection. Tell me more about your situation. 🎯",
        "Great question! Every budget is unique. What's your monthly income, and what are you spending the most on? 📊"
    ]
};

function getKeywordResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    for (const [keyword, responses] of Object.entries(budgetResponses.keywords)) {
        if (lowerMessage.includes(keyword)) {
            return responses[Math.floor(Math.random() * responses.length)];
        }
    }
    
    return budgetResponses.default[Math.floor(Math.random() * budgetResponses.default.length)];
}

function addBudgetUserMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user';
    messageDiv.innerHTML = `
        <div class="message-avatar">😊</div>
        <div class="message-content">${message}</div>
    `;
    budgetChatMessages.appendChild(messageDiv);
    budgetChatMessages.scrollTop = budgetChatMessages.scrollHeight;
}

function addBudgetBotMessage(message) {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot';
    typingDiv.innerHTML = `
        <div class="message-avatar">💰</div>
        <div class="typing-indicator">
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
        </div>
    `;
    budgetChatMessages.appendChild(typingDiv);
    budgetChatMessages.scrollTop = budgetChatMessages.scrollHeight;
    
    setTimeout(() => {
        typingDiv.innerHTML = `
            <div class="message-avatar">💰</div>
            <div class="message-content">${message}</div>
        `;
        budgetChatMessages.scrollTop = budgetChatMessages.scrollHeight;
    }, 1200 + Math.random() * 800);
}

function sendBudgetMessage() {
    const message = budgetChatInput.value.trim();
    
    if (message === '') return;
    
    addBudgetUserMessage(message);
    budgetChatInput.value = '';
    
    const response = getKeywordResponse(message);
    addBudgetBotMessage(response);
}

if (budgetSendBtn) {
    budgetSendBtn.addEventListener('click', sendBudgetMessage);
}

if (budgetChatInput) {
    budgetChatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendBudgetMessage();
        }
    });
}

// ━━━ BUDGET SLIDER INTERACTIVITY ━━━
document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('.budget-slider');
    const remainingAmount = document.getElementById('remainingAmount');
    const totalBudget = 3500;
    
    sliders.forEach(slider => {
        slider.addEventListener('input', function() {
            const value = parseInt(this.value);
            const amountDisplay = this.parentElement.querySelector('.planner-amount');
            amountDisplay.textContent = '$' + value;
            
            // Calculate remaining
            let total = 0;
            sliders.forEach(s => {
                total += parseInt(s.value);
            });
            
            const remaining = totalBudget - total;
            if (remainingAmount) {
                remainingAmount.textContent = '$' + remaining.toLocaleString();
                
                // Change color based on remaining
                if (remaining < 0) {
                    remainingAmount.style.color = '#EF4444';
                } else if (remaining < 500) {
                    remainingAmount.style.color = '#FCD34D';
                } else {
                    remainingAmount.style.background = 'var(--gradient-primary)';
                    remainingAmount.style.webkitBackgroundClip = 'text';
                    remainingAmount.style.webkitTextFillColor = 'transparent';
                }
            }
        });
    });
});

// ━━━ SPENDING CARD ANIMATIONS ━━━
document.addEventListener('DOMContentLoaded', () => {
    const spendingCards = document.querySelectorAll('.spending-card');
    
    const spendingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                
                const progressFill = entry.target.querySelector('.spending-fill');
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
    
    spendingCards.forEach(card => spendingObserver.observe(card));
});

// ━━━ PAGE LOAD ANIMATION ━━━
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });
});

// ━━━ PARALLAX SHAPES ━━━
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

console.log('💰 Budgeting Page loaded successfully!');
