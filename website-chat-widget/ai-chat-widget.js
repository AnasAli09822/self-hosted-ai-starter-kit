(function() {
    'use strict';

    const AIChatWidget = {
        // Default configuration
        config: {
            apiEndpoint: '',
            botName: 'AI Assistant',
            welcomeMessage: 'Hello! How can I help you today?',
            placeholder: 'Type your message...',
            primaryColor: '#007bff',
            secondaryColor: '#f8f9fa',
            position: 'bottom-right',
            zIndex: 9999,
            sessionId: null
        },

        // Internal state
        isOpen: false,
        isMinimized: true,
        sessionId: null,
        conversationHistory: [],

        // Initialize the chat widget
        init: function(options) {
            // Merge options with default config
            this.config = Object.assign(this.config, options);
            
            // Generate session ID
            this.sessionId = this.generateSessionId();
            this.config.sessionId = this.sessionId;

            // Create and inject the widget
            this.createWidget();
            this.bindEvents();
            
            // Load conversation history if exists
            this.loadConversationHistory();
        },

        // Generate unique session ID
        generateSessionId: function() {
            return 'chat_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        },

        // Create the widget HTML structure
        createWidget: function() {
            const widgetHTML = `
                <div id="ai-chat-widget" style="
                    position: fixed;
                    ${this.config.position.includes('bottom') ? 'bottom: 20px;' : 'top: 20px;'}
                    ${this.config.position.includes('right') ? 'right: 20px;' : 'left: 20px;'}
                    z-index: ${this.config.zIndex};
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                ">
                    <!-- Chat Toggle Button -->
                    <div id="chat-toggle-btn" style="
                        width: 60px;
                        height: 60px;
                        background: ${this.config.primaryColor};
                        border-radius: 50%;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                        transition: all 0.3s ease;
                    ">
                        <svg id="chat-icon" width="24" height="24" fill="white" viewBox="0 0 24 24">
                            <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                        </svg>
                        <svg id="close-icon" width="24" height="24" fill="white" viewBox="0 0 24 24" style="display: none;">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                    </div>

                    <!-- Chat Window -->
                    <div id="chat-window" style="
                        position: absolute;
                        bottom: 70px;
                        right: 0;
                        width: 350px;
                        height: 500px;
                        background: white;
                        border-radius: 12px;
                        box-shadow: 0 8px 24px rgba(0,0,0,0.15);
                        display: none;
                        flex-direction: column;
                        overflow: hidden;
                    ">
                        <!-- Chat Header -->
                        <div id="chat-header" style="
                            background: ${this.config.primaryColor};
                            color: white;
                            padding: 16px;
                            font-weight: 600;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                        ">
                            <div style="display: flex; align-items: center;">
                                <div style="
                                    width: 8px;
                                    height: 8px;
                                    background: #4ade80;
                                    border-radius: 50%;
                                    margin-right: 8px;
                                "></div>
                                ${this.config.botName}
                            </div>
                            <button id="minimize-btn" style="
                                background: none;
                                border: none;
                                color: white;
                                cursor: pointer;
                                font-size: 18px;
                                padding: 0;
                            ">−</button>
                        </div>

                        <!-- Chat Messages Container -->
                        <div id="chat-messages" style="
                            flex: 1;
                            overflow-y: auto;
                            padding: 16px;
                            background: ${this.config.secondaryColor};
                        ">
                            <!-- Welcome message -->
                            <div class="message bot-message" style="
                                margin-bottom: 12px;
                                display: flex;
                                align-items: flex-start;
                            ">
                                <div style="
                                    background: white;
                                    padding: 12px 16px;
                                    border-radius: 18px 18px 18px 4px;
                                    max-width: 80%;
                                    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
                                    font-size: 14px;
                                    line-height: 1.4;
                                ">
                                    ${this.config.welcomeMessage}
                                </div>
                            </div>
                        </div>

                        <!-- Chat Input -->
                        <div id="chat-input-container" style="
                            padding: 16px;
                            background: white;
                            border-top: 1px solid #e5e7eb;
                        ">
                            <div style="
                                display: flex;
                                align-items: center;
                                background: ${this.config.secondaryColor};
                                border-radius: 24px;
                                padding: 8px 16px;
                            ">
                                <input type="text" id="chat-input" placeholder="${this.config.placeholder}" style="
                                    flex: 1;
                                    border: none;
                                    background: none;
                                    outline: none;
                                    font-size: 14px;
                                    padding: 8px 0;
                                ">
                                <button id="send-btn" style="
                                    background: ${this.config.primaryColor};
                                    border: none;
                                    color: white;
                                    width: 32px;
                                    height: 32px;
                                    border-radius: 50%;
                                    cursor: pointer;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    margin-left: 8px;
                                ">
                                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Inject widget into the page
            document.body.insertAdjacentHTML('beforeend', widgetHTML);
        },

        // Bind event listeners
        bindEvents: function() {
            const toggleBtn = document.getElementById('chat-toggle-btn');
            const minimizeBtn = document.getElementById('minimize-btn');
            const sendBtn = document.getElementById('send-btn');
            const chatInput = document.getElementById('chat-input');

            // Toggle chat window
            toggleBtn.addEventListener('click', () => {
                this.toggleChat();
            });

            // Minimize chat
            minimizeBtn.addEventListener('click', () => {
                this.minimizeChat();
            });

            // Send message
            sendBtn.addEventListener('click', () => {
                this.sendMessage();
            });

            // Enter key to send message
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        },

        // Toggle chat window
        toggleChat: function() {
            const chatWindow = document.getElementById('chat-window');
            const chatIcon = document.getElementById('chat-icon');
            const closeIcon = document.getElementById('close-icon');

            if (this.isOpen) {
                chatWindow.style.display = 'none';
                chatIcon.style.display = 'block';
                closeIcon.style.display = 'none';
                this.isOpen = false;
            } else {
                chatWindow.style.display = 'flex';
                chatIcon.style.display = 'none';
                closeIcon.style.display = 'block';
                this.isOpen = true;
                
                // Focus on input
                document.getElementById('chat-input').focus();
            }
        },

        // Minimize chat
        minimizeChat: function() {
            this.toggleChat();
        },

        // Send message
        sendMessage: function() {
            const chatInput = document.getElementById('chat-input');
            const message = chatInput.value.trim();

            if (!message) return;

            // Add user message to chat
            this.addMessage(message, 'user');
            
            // Clear input
            chatInput.value = '';

            // Send to API
            this.sendToAPI(message);
        },

        // Add message to chat interface
        addMessage: function(message, sender) {
            const messagesContainer = document.getElementById('chat-messages');
            const isBot = sender === 'bot';
            
            const messageHTML = `
                <div class="message ${isBot ? 'bot-message' : 'user-message'}" style="
                    margin-bottom: 12px;
                    display: flex;
                    ${isBot ? 'align-items: flex-start;' : 'align-items: flex-end; justify-content: flex-end;'}
                ">
                    <div style="
                        background: ${isBot ? 'white' : this.config.primaryColor};
                        color: ${isBot ? '#333' : 'white'};
                        padding: 12px 16px;
                        border-radius: ${isBot ? '18px 18px 18px 4px' : '18px 18px 4px 18px'};
                        max-width: 80%;
                        box-shadow: 0 1px 2px rgba(0,0,0,0.1);
                        font-size: 14px;
                        line-height: 1.4;
                        word-wrap: break-word;
                    ">
                        ${message}
                    </div>
                </div>
            `;

            messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;

            // Save to conversation history
            this.conversationHistory.push({
                message: message,
                sender: sender,
                timestamp: new Date().toISOString()
            });

            // Save to localStorage
            this.saveConversationHistory();
        },

        // Send message to API
        sendToAPI: function(message) {
            // Show typing indicator
            this.showTypingIndicator();

            const payload = {
                message: message,
                session_id: this.sessionId,
                visitor_id: this.sessionId,
                visitor_name: 'Website Visitor',
                page_url: window.location.href,
                user_agent: navigator.userAgent,
                timestamp: Date.now()
            };

            fetch(this.config.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            })
            .then(response => response.json())
            .then(data => {
                this.hideTypingIndicator();
                
                if (data.success && data.response) {
                    this.addMessage(data.response, 'bot');
                } else {
                    this.addMessage('Sorry, I\'m having trouble responding right now. Please try again.', 'bot');
                }
            })
            .catch(error => {
                console.error('Chat API Error:', error);
                this.hideTypingIndicator();
                this.addMessage('Sorry, I\'m having trouble connecting. Please try again.', 'bot');
            });
        },

        // Show typing indicator
        showTypingIndicator: function() {
            const messagesContainer = document.getElementById('chat-messages');
            const typingHTML = `
                <div id="typing-indicator" class="message bot-message" style="
                    margin-bottom: 12px;
                    display: flex;
                    align-items: flex-start;
                ">
                    <div style="
                        background: white;
                        padding: 12px 16px;
                        border-radius: 18px 18px 18px 4px;
                        max-width: 80%;
                        box-shadow: 0 1px 2px rgba(0,0,0,0.1);
                        font-size: 14px;
                        line-height: 1.4;
                    ">
                        <div style="display: flex; align-items: center;">
                            <span style="margin-right: 8px;">AI Assistant is typing</span>
                            <div style="display: flex; gap: 2px;">
                                <div style="width: 4px; height: 4px; background: #999; border-radius: 50%; animation: typing 1.4s infinite ease-in-out;"></div>
                                <div style="width: 4px; height: 4px; background: #999; border-radius: 50%; animation: typing 1.4s infinite ease-in-out 0.2s;"></div>
                                <div style="width: 4px; height: 4px; background: #999; border-radius: 50%; animation: typing 1.4s infinite ease-in-out 0.4s;"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <style>
                    @keyframes typing {
                        0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
                        30% { transform: translateY(-10px); opacity: 1; }
                    }
                </style>
            `;

            messagesContainer.insertAdjacentHTML('beforeend', typingHTML);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        },

        // Hide typing indicator
        hideTypingIndicator: function() {
            const typingIndicator = document.getElementById('typing-indicator');
            if (typingIndicator) {
                typingIndicator.remove();
            }
        },

        // Save conversation history to localStorage
        saveConversationHistory: function() {
            localStorage.setItem('ai_chat_history_' + this.sessionId, JSON.stringify(this.conversationHistory));
        },

        // Load conversation history from localStorage
        loadConversationHistory: function() {
            const saved = localStorage.getItem('ai_chat_history_' + this.sessionId);
            if (saved) {
                this.conversationHistory = JSON.parse(saved);
                // Optionally restore messages to UI
            }
        }
    };

    // Expose to global scope
    window.AIChatWidget = AIChatWidget;

})();