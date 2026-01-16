// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// INVESTING AI AGENT - Interactive Features
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const style = document.createElement("style");
  style.innerHTML = `
    /* Floating button - GetRich themed */
    .flowise-chatbot-button {
      background: linear-gradient(135deg, #2dd4bf, #06b6d4) !important;
      box-shadow: 0 12px 30px rgba(45, 212, 191, 0.25), 0 0 20px rgba(45, 212, 191, 0.15) !important;
      border-radius: 50% !important;
      border: 2px solid rgba(255, 255, 255, 0.1) !important;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }

    .flowise-chatbot-button:hover {
      box-shadow: 0 15px 40px rgba(45, 212, 191, 0.35), 0 0 30px rgba(124, 124, 255, 0.2) !important;
      transform: scale(1.08) !important;
    }

    /* Custom icon styling */
    .flowise-chatbot-button svg {
      filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.3)) !important;
    }

    /* Hide default SVG and add custom content */
    .flowise-chatbot-button::before {
      content: "💰" !important;
      font-size: 20px !important;
    }

    .flowise-chatbot-button svg {
      display: none !important;
    }

    /* Chat container */
    .flowise-chatbot-container {
      background: linear-gradient(160deg, #020617, #0f172a, #1e293b) !important;
      border-radius: 18px !important;
      overflow: hidden !important;
      font-family: Inter, system-ui, sans-serif !important;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5) !important;
      border: 1px solid rgba(45, 212, 191, 0.1) !important;
    }

    /* Header */
    .flowise-chatbot-header {
      background: linear-gradient(135deg, #0f172a, #020617) !important;
      color: #e2e8f0 !important;
      font-weight: 600 !important;
      letter-spacing: 0.3px;
      border-bottom: 1px solid rgba(45, 212, 191, 0.1) !important;
    }

    /* Bot message */
    .flowise-chatbot-message.bot {
      background: rgba(15, 23, 42, 0.9) !important;
      color: #e5e7eb !important;
      border-radius: 14px !important;
    }

    /* User message */
    .flowise-chatbot-message.user {
      background: linear-gradient(135deg, #2dd4bf, #14b8a6) !important;
      color: #020617 !important;
      border-radius: 14px !important;
      font-weight: 500;
    }

    /* Input area */
    .flowise-chatbot-input {
      background: #020617 !important;
      border-top: 1px solid rgba(148,163,184,0.15) !important;
    }

    .flowise-chatbot-input textarea {
      background: #020617 !important;
      color: #e5e7eb !important;
      border-radius: 12px !important;
      border: 1px solid rgba(148,163,184,0.25) !important;
    }

    /* Send button */
    .flowise-chatbot-send {
      background: linear-gradient(135deg, #2dd4bf, #14b8a6) !important;
      color: #020617 !important;
      border-radius: 12px !important;
      transition: all 0.3s ease !important;
    }

    .flowise-chatbot-send:hover {
      box-shadow: 0 0 15px rgba(45, 212, 191, 0.4) !important;
    }

    /* Remove Flowise branding */
    .flowise-chatbot-footer {
      display: none !important;
    }
  `;
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
// 2. AI INVESTMENT GUIDE CHATBOT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const investingGuideResponses = {
    investing: [
        "Investing means putting your money into assets (stocks, bonds, real estate) to make it grow over time. It's how wealth compounds—your money makes money!",
        "The stock market isn't gambling—it's ownership. When you buy a stock, you own a tiny piece of a company. As it grows, your piece becomes more valuable.",
        "Investing early is the ultimate cheat code. $100/month starting at 18 = $1M+ by 65 with 7% returns. Start NOW. Seriously."
    ],
    stocks: [
        "Stocks = ownership in companies. When you buy Apple stock, you literally own a tiny percentage of Apple. If Apple makes money, you make money.",
        "Stock prices go up and down daily, but historically they've averaged ~10% yearly returns. The secret? Time in market > timing the market. Stay invested.",
        "Individual stocks are risky because you're betting on one company. Better: diversify with index funds or ETFs that own hundreds of companies."
    ],
    etf: [
        "ETFs (Exchange-Traded Funds) are baskets of stocks bundled together. Instead of picking 50 stocks, buy 1 ETF that holds them all. Instant diversification!",
        "Popular beginner ETFs: VOO (tracks S&P 500), VTI (entire US market), VXUS (international). Low fees, automatic diversification. Perfect for starting out.",
        "ETF returns historically average 8-10% yearly. Boring is beautiful. Set it and forget it. Let compound interest do the heavy lifting."
    ],
    bonds: [
        "Bonds are loans you give to companies or governments. They pay you interest predictably. Lower returns than stocks (~3-5%) but much safer.",
        "Why bonds? Stability. In your 20s-40s: 80/20 stocks/bonds. In your 50s-60s: 60/40 stocks/bonds. As you age, safety becomes more important.",
        "Bond ladder: Buy bonds maturing at different times (2yr, 5yr, 10yr). When one matures, buy another at the end. Predictable income stream."
    ],
    crypto: [
        "Cryptocurrency is digital money (Bitcoin, Ethereum, etc.). Extremely volatile, high reward/high risk. Don't invest more than you can afford to lose.",
        "Crypto pros: 24/7 trading, decentralized, borderless. Crypto cons: Unregulated, scams everywhere, extreme price swings. 5-10% of portfolio max for beginners.",
        "Bitcoin is 'digital gold'—limited supply, deflationary. Ethereum enables apps. Most others? Speculative. Do your research. DYOR (Do Your Own Research)."
    ],
    risk: [
        "Risk tolerance = how much price swings stress you. Can't sleep over a 20% drop? Conservative portfolio (stocks/bonds mix). Love volatility? Aggressive.",
        "Young + long timeline = can be aggressive. You have time to recover from crashes. At 18-25: 90% stocks, 10% bonds is reasonable. Age 30+: dial it back.",
        "Diversification kills risk without killing returns. Don't put eggs in one basket. Stocks + bonds + crypto + real estate. Spread it around."
    ],
    compound: [
        "Compound interest = 'interest on interest.' Einstein called it the 8th wonder of world. $100 → $109 (10% year 1) → $119 (10% year 2). Snowball effect!",
        "The math: $1000 at 8% yearly = $1080 year 1, $1166 year 2, $1586 year 5, $4661 year 30. Time is your superpower. Start early, stay consistent.",
        "This is why starting at 18 vs 28 = $500K+ difference by retirement. 10 years of compound interest is worth years of saving. Don't sleep on it."
    ],
    diversify: [
        "Diversification = don't put all eggs in one basket. Own stocks, bonds, maybe real estate, maybe crypto. If one crashes, others survive.",
        "Asset allocation matters more than picking winners. A boring portfolio (80% index funds, 20% bonds) beats 90% of professional investors. Seriously.",
        "Rebalance annually. If stocks did great and now it's 85% of portfolio, sell some stocks, buy bonds to get back to 80/20. Lock in gains, maintain risk."
    ],
    default: [
        "I'm here to help with investing fundamentals, risk tolerance, diversification, and building wealth. What would you like to learn?",
        "Remember: investing isn't about getting rich quick—it's about getting rich for sure. Compound interest + time + consistency = generational wealth.",
        "Start small. Invest consistently. Diversify. Ignore noise. Stay the course. That's literally the winning formula. You've got this."
    ]
};

function getInvestingGuideResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    if (message.includes('investing') || message.includes('invest')) {
        return investingGuideResponses.investing[Math.floor(Math.random() * investingGuideResponses.investing.length)];
    } else if (message.includes('stock')) {
        return investingGuideResponses.stocks[Math.floor(Math.random() * investingGuideResponses.stocks.length)];
    } else if (message.includes('etf') || message.includes('fund')) {
        return investingGuideResponses.etf[Math.floor(Math.random() * investingGuideResponses.etf.length)];
    } else if (message.includes('bond')) {
        return investingGuideResponses.bonds[Math.floor(Math.random() * investingGuideResponses.bonds.length)];
    } else if (message.includes('crypto') || message.includes('bitcoin') || message.includes('ethereum')) {
        return investingGuideResponses.crypto[Math.floor(Math.random() * investingGuideResponses.crypto.length)];
    } else if (message.includes('risk') || message.includes('aggressive') || message.includes('conservative')) {
        return investingGuideResponses.risk[Math.floor(Math.random() * investingGuideResponses.risk.length)];
    } else if (message.includes('compound') || message.includes('interest') || message.includes('growth')) {
        return investingGuideResponses.compound[Math.floor(Math.random() * investingGuideResponses.compound.length)];
    } else if (message.includes('diversi')) {
        return investingGuideResponses.diversify[Math.floor(Math.random() * investingGuideResponses.diversify.length)];
    }
    
    return investingGuideResponses.default[Math.floor(Math.random() * investingGuideResponses.default.length)];
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. CHAT INPUT HANDLING
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const investChatInput = document.getElementById('investChatInput');
const investSendBtn = document.getElementById('investSendBtn');
const investChatMessages = document.getElementById('investChatMessages');

function addChatMessage(text, isBot = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isBot ? 'bot' : 'user'}`;
    
    if (isBot) {
        messageDiv.innerHTML = `
            <div class="message-avatar">📈</div>
            <div class="message-content">${text}</div>
        `;
    } else {
        messageDiv.innerHTML = `<div class="message-content">${text}</div>`;
    }
    
    investChatMessages.appendChild(messageDiv);
    investChatMessages.scrollTop = investChatMessages.scrollHeight;
}

function handleInvestChatSubmit() {
    const userMessage = investChatInput.value.trim();
    if (!userMessage) return;
    
    // Add user message
    addChatMessage(userMessage, false);
    investChatInput.value = '';
    
    // Simulate typing and add bot response
    setTimeout(() => {
        const botResponse = getInvestingGuideResponse(userMessage);
        addChatMessage(botResponse, true);
    }, 500);
}

investSendBtn?.addEventListener('click', handleInvestChatSubmit);
investChatInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleInvestChatSubmit();
    }
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. RISK PROFILE SLIDER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const riskSlider = document.getElementById('riskSlider');
const conservativeProfile = document.getElementById('conservativeProfile');
const balancedProfile = document.getElementById('balancedProfile');
const aggressiveProfile = document.getElementById('aggressiveProfile');

if (riskSlider && conservativeProfile && balancedProfile && aggressiveProfile) {
    const showProfile = (value) => {
        conservativeProfile.style.display = 'none';
        balancedProfile.style.display = 'none';
        aggressiveProfile.style.display = 'none';

        // Map smooth slider (0-100) into 3 buckets
        if (value <= 33) {
            conservativeProfile.style.display = 'block';
        } else if (value <= 66) {
            balancedProfile.style.display = 'block';
        } else {
            aggressiveProfile.style.display = 'block';
        }
    };

    // Initialize the profiles based on the starting slider position
    showProfile(parseInt(riskSlider.value, 10));

    riskSlider.addEventListener('input', (e) => {
        const value = parseInt(e.target.value, 10);
        showProfile(value);
    });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 6. INVESTMENT CALCULATOR
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function initCalculator() {
    const initialInput = document.getElementById('initialInvestment');
    const monthlyInput = document.getElementById('monthlyContribution');
    const returnInput = document.getElementById('returnRate');
    const timeframeInput = document.getElementById('timeframe');
    
    const initialValue = document.getElementById('initialValue');
    const monthlyValue = document.getElementById('monthlyValue');
    const returnValue = document.getElementById('returnValue');
    const timeframeValue = document.getElementById('timeframeValue');
    
    const totalInvested = document.getElementById('totalInvested');
    const futureValue = document.getElementById('futureValue');
    const investmentGains = document.getElementById('investmentGains');
    const calcInsight = document.getElementById('calcInsight');
    
    function calculateInvestment() {
        const initial = parseFloat(initialInput.value) || 0;
        const monthly = parseFloat(monthlyInput.value) || 0;
        const rate = parseFloat(returnInput.value) / 100 || 0;
        const years = parseFloat(timeframeInput.value) || 1;
        const months = years * 12;
        const monthlyRate = rate / 12;
        
        // Update display values
        initialValue.textContent = initial.toLocaleString();
        monthlyValue.textContent = monthly.toLocaleString();
        returnValue.textContent = (rate * 100).toFixed(1);
        timeframeValue.textContent = years;
        
        // Calculate future value with monthly contributions
        let fv = 0;
        if (monthlyRate > 0) {
            fv = initial * Math.pow(1 + monthlyRate, months) + 
                 monthly * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
        } else {
            fv = initial + (monthly * months);
        }
        
        const totalInv = initial + (monthly * months);
        const gains = fv - totalInv;
        
        // Update results
        totalInvested.textContent = '$' + totalInv.toLocaleString('en-US', { maximumFractionDigits: 0 });
        futureValue.textContent = '$' + fv.toLocaleString('en-US', { maximumFractionDigits: 0 });
        investmentGains.textContent = '+$' + gains.toLocaleString('en-US', { maximumFractionDigits: 0 });
        
        const gainPercent = ((gains / totalInv) * 100).toFixed(0);
        calcInsight.innerHTML = `By investing $${initial.toLocaleString()} upfront and $${monthly.toLocaleString()}/month for ${years} years at ${(rate*100).toFixed(1)}% returns, you'll earn $${gains.toLocaleString('en-US', { maximumFractionDigits: 0 })} in pure gains—that's ${gainPercent}% profit!`;
    }
    
    // Event listeners
    initialInput?.addEventListener('input', calculateInvestment);
    monthlyInput?.addEventListener('input', calculateInvestment);
    returnInput?.addEventListener('input', calculateInvestment);
    timeframeInput?.addEventListener('input', calculateInvestment);
    
    // Initial calculation
    calculateInvestment();
}

document.addEventListener('DOMContentLoaded', initCalculator);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 7. PARALLAX SHAPES
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
// 8. BACK NAVIGATION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const backButton = document.querySelector('.back-button');
backButton?.addEventListener('click', (e) => {
    // Smooth transition handled by browser default
});







