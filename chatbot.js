// chatbot.js - Non-Obstructive Pet Assistant
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const closeChatbot = document.querySelector('.close-chatbot');
    const sendBtn = document.querySelector('.send-btn');
    const chatInput = document.querySelector('.chatbot-input input');
    const chatMessages = document.querySelector('.chatbot-messages');

    // Initial welcome message
    setTimeout(() => {
        typeResponse("Woof! 🐾 I'm Buddy. Need help with pet adoption or city policies?");
    }, 1500);

    // Toggle chat visibility
    chatbotToggle.addEventListener('click', toggleChat);
    closeChatbot.addEventListener('click', toggleChat);

    // Send message
    sendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => e.key === 'Enter' && sendMessage());

    function toggleChat() {
        chatbotContainer.classList.toggle('active');
        chatbotToggle.classList.toggle('active');
        if (chatbotContainer.classList.contains('active')) {
            chatInput.focus();
        }
    }

    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;
        
        addMessage(message, 'user');
        chatInput.value = '';
        
        setTimeout(() => {
            const response = generateResponse(message);
            typeResponse(response);
        }, 500);
    }

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add(`${sender}-message`);
        messageDiv.innerHTML = `<p>${text}</p><span class="message-time">${getCurrentTime()}</span>`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function typeResponse(text) {
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'typing-indicator';
        typingIndicator.innerHTML = '<span></span><span></span><span></span>';
        chatMessages.appendChild(typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        setTimeout(() => {
            chatMessages.removeChild(typingIndicator);
            addMessage(text, 'bot');
        }, 1000 + Math.random() * 1000);
    }

    function generateResponse(message) {
        const lowerMsg = message.toLowerCase();
        
        const responses = {
            greetings: ["Woof! Hello! 🐶 Ask me about pet adoption or city policies", 
                       "Buddy at your service! How can I help?"],
            volunteer: "Volunteers can help with:\n• Feeding programs\n• Adoption events\n• Fostering animals\nWhich interests you?",
            adopt: "Available pets:\n• Proxy (3 months dog)\n• Misty (1.5yr cat)\n• Rocky (4 months dog)\nSee our Adoption page for details!",
            donate: "We accept:\n• Online donations\n• Pet supplies\n• Medical sponsorships\nThank you! ❤️",
            emergency: "🚨 Call our 24/7 rescue: +91 344234324\nProvide:\n1. Location\n2. Animal condition\n3. Your contact",
            default: ["Check our website sections for more info", 
                     "I'm still learning! Try asking about volunteering or adoptions"]
        };

        if (/hello|hi|hey/.test(lowerMsg)) return randomChoice(responses.greetings);
        if (/volunteer|help|join/.test(lowerMsg)) return responses.volunteer;
        if (/adopt|pet|dog|cat/.test(lowerMsg)) return responses.adopt;
        if (/donate|support/.test(lowerMsg)) return responses.donate;
        if (/emergency|hurt|injured/.test(lowerMsg)) return responses.emergency;
        
        return randomChoice(responses.default);
    }

    // Helper functions
    function getCurrentTime() {
        return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    function randomChoice(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    // Inactivity timer for tips
    const petTips = [
        "💡 Keep water bowls outside for street animals in summer!",
        "❤️ Remember: Adopt don't shop!",
        "⚠️ Chocolate is toxic for dogs! 🍫🚫"
    ];

    let tipTimeout = setTimeout(() => {
        typeResponse(randomChoice(petTips));
    }, 120000);

    chatInput.addEventListener('input', () => {
        clearTimeout(tipTimeout);
        tipTimeout = setTimeout(() => {
            typeResponse(randomChoice(petTips));
        }, 120000);
    });
});