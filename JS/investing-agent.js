// Enhanced chat styling with teal theme, money bag icon, hover effects, and improved message styling

.chat-container {
    background-color: #008080; /* Teal background */
    border-radius: 8px;
    padding: 10px;
    max-width: 400px;
    margin: auto;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.chat-message {
    background-color: #ffffff; /* White background for messages */
    border-radius: 5px;
    padding: 8px;
    margin: 5px 0;
    display: flex;
    align-items: center;
    transition: background-color 0.3s;
}

.chat-message:hover {
    background-color: #e0f2f1; /* Light teal on hover */
}

.chat-message .icon {
    margin-right: 10px;
    font-size: 20px;
}

.chat-message .message {
    color: #333;
    font-size: 14px;
    line-height: 1.5;
}

/* Adding money bag icon */
.icon:before {
    content: '\1F4B0'; /* Unicode for money bag */
}