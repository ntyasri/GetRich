// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DEBT & CREDIT AI AGENT - Interactive Features
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. SCROLL ANIMATIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. AI DEBT COACH CHATBOT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const debtCoachResponses = {
    credit: [
        "Credit is your financial reputation. It affects your ability to borrow money at favorable rates. Think of it as your financial trustworthiness score.",
        "Credit scores range from 300-850. Above 750 is excellent, 700-750 is good. Every point matters when you're applying for loans.",
        "Your payment history (35%) is the biggest factor in your score. One late payment can drop it 100+ points. Set autopay and never miss again."
    ],
    score: [
        "Your credit score is calculated from: 35% payment history, 30% credit utilization, 15% credit age, 10% credit mix, and 10% hard inquiries.",
        "A higher credit score means lower interest rates on loans and credit cards. A 0.5% difference can save you tens of thousands on a mortgage.",
        "You get one free credit report annually at AnnualCreditReport.com. Check for errors and dispute them immediately if found."
    ],
    debt: [
        "Debt isn't bad—it's a tool. Good debt (student loans, mortgages) builds wealth. Bad debt (high-interest credit cards) destroys it. Focus on paying off bad debt first.",
        "Don't ignore debt. It grows with interest, gets sold to collectors, and destroys your credit. Face it head-on: make a list, prioritize, and attack it.",
        "If you're drowning in debt, consider: (1) Negotiating with creditors, (2) Debt consolidation loans, or (3) Credit counseling services. Don't be ashamed—get help."
    ],
    payoff: [
        "Two proven strategies: Debt Avalanche (attack highest interest first = save most money) and Debt Snowball (pay smallest balance first = motivational wins). Pick what keeps you going.",
        "Budget aggressively. Every $100 extra per month toward debt saves months of payments. Cut subscriptions, side gigs, anything to accelerate payoff.",
        "The average American has $6,200 in credit card debt. If you pay only minimums at 18% APR, it takes 30+ years. Paying $200/month clears it in 3 years."
    ],
    interest: [
        "Interest is the price of borrowing money. High interest (18% credit cards) is wealth-destroying. Low interest (5% student loans) can be strategic.",
        "Compound interest works against you in debt. $3,000 credit card debt at 18% APR becomes $15,000+ in 5 years if you only pay minimums. Terrifying, right?",
        "This is why paying interest rates of 0-5% is better than 15-25%. Lower rates = more of your payment goes to principal vs. interest wasted."
    ],
    habits: [
        "Build credit slowly: (1) Get a secured card, (2) Use it monthly, (3) Pay full balance, (4) Wait 6 months, (5) Upgrade to regular card. Patience builds empire.",
        "Keep credit cards open even after paying them off. Closing them hurts your credit age and available credit ratio. Set them to auto-pay a small monthly charge.",
        "Avoid these credit killers: missing payments, maxing cards, closing accounts, too many new cards at once, and co-signing for others' debt."
    ],
    loans: [
        "Types of debt: Credit cards (unsecured, high interest), auto loans (secured, lower interest), student loans (federal/private, varying rates), mortgages (secured, lowest rates).",
        "Never borrow more than you can afford to repay. Default leads to lawsuits, wage garnishment, and destroyed credit for 7 years. It's not worth it.",
        "Personal loans can consolidate high-interest debt. Rates are usually 6-36% depending on credit. It's a reset button if used wisely."
    ],
    default: [
        "I'm here to help with credit scores, debt strategies, interest rates, and building financial confidence. What's your specific question?",
        "Remember: you're not alone in this. Millions of young adults navigate debt. The fact that you're learning puts you ahead of most. Let's crush this together.",
        "Financial literacy is a superpower. Every debt paid off, every on-time payment, every credit check—you're building a stronger future."
    ]
};

function getDebtCoachResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    if (message.includes('credit') || message.includes('score')) {
        return debtCoachResponses.credit[Math.floor(Math.random() * debtCoachResponses.credit.length)];
    } else if (message.includes('how') && (message.includes('score') || message.includes('calculate'))) {
        return debtCoachResponses.score[Math.floor(Math.random() * debtCoachResponses.score.length)];
    } else if (message.includes('debt') || message.includes('owe')) {
        return debtCoachResponses.debt[Math.floor(Math.random() * debtCoachResponses.debt.length)];
    } else if (message.includes('pay') || message.includes('payoff') || message.includes('strategy')) {
        return debtCoachResponses.payoff[Math.floor(Math.random() * debtCoachResponses.payoff.length)];
    } else if (message.includes('interest') || message.includes('rate') || message.includes('apr')) {
        return debtCoachResponses.interest[Math.floor(Math.random() * debtCoachResponses.interest.length)];
    } else if (message.includes('habit') || message.includes('improve') || message.includes('build')) {
        return debtCoachResponses.habits[Math.floor(Math.random() * debtCoachResponses.habits.length)];
    } else if (message.includes('loan') || message.includes('borrow') || message.includes('consolidat')) {
        return debtCoachResponses.loans[Math.floor(Math.random() * debtCoachResponses.loans.length)];
    }
    
    return debtCoachResponses.default[Math.floor(Math.random() * debtCoachResponses.default.length)];
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. CHAT INPUT HANDLING
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const debtChatInput = document.getElementById('debtChatInput');
const debtSendBtn = document.getElementById('debtSendBtn');
const debtChatMessages = document.getElementById('debtChatMessages');

function addChatMessage(text, isBot = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isBot ? 'bot' : 'user'}`;
    
    if (isBot) {
        messageDiv.innerHTML = `
            <div class="message-avatar">💳</div>
            <div class="message-content">${text}</div>
        `;
    } else {
        messageDiv.innerHTML = `<div class="message-content">${text}</div>`;
    }
    
    debtChatMessages.appendChild(messageDiv);
    debtChatMessages.scrollTop = debtChatMessages.scrollHeight;
}

function handleDebtChatSubmit() {
    const userMessage = debtChatInput.value.trim();
    if (!userMessage) return;
    
    // Add user message
    addChatMessage(userMessage, false);
    debtChatInput.value = '';
    
    // Simulate typing and add bot response
    setTimeout(() => {
        const botResponse = getDebtCoachResponse(userMessage);
        addChatMessage(botResponse, true);
    }, 500);
}

debtSendBtn?.addEventListener('click', handleDebtChatSubmit);
debtChatInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleDebtChatSubmit();
    }
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. PARALLAX SHAPES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const shapes = document.querySelectorAll('.gradient-shape');

document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    shapes.forEach((shape, index) => {
        const offset = 50 + (index * 20);
        const x = (mouseX / window.innerWidth) * offset - offset / 2;
        const y = (mouseY / window.innerHeight) * offset - offset / 2;
        
        shape.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 5. BACK NAVIGATION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const backButton = document.querySelector('.back-button');
backButton?.addEventListener('click', (e) => {
    // Smooth transition handled by browser default
});
