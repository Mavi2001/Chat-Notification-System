const chatMessages = document.getElementById('chat-messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// Function to generate a random message sender
function getRandomSender() {
    const senders = ['Rakshita', 'Rashmi', 'Mavi', 'Nittyansh'];
    return senders[Math.floor(Math.random() * senders.length)];
}

// Function to add a message to the chat
function addMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatMessages.appendChild(messageElement);
    
    // Show a notification for unseen messages
    // if (document.hidden) {
    //     showNotification(sender, message);
    // }
    showNotification(sender, message);
}

// Function to show a notification
function showNotification(sender, message) {
    if (Notification.permission === 'granted') {
        const notification = new Notification(`${sender} says:`, {
            body: message,
            icon: 'notification.png' // You can replace this with your own icon
        });
        
        notification.onclick = function () {
            // Handle notification click here
        };
    }
}

// Request permission for notifications
if (Notification.permission !== 'granted') {
    Notification.requestPermission();
}

// Event listener for the send button
sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message.trim() !== '') {
        const sender = getRandomSender();
        addMessage(sender, message);
        messageInput.value = '';
    }
});

// Event listener for sending a message with Enter key
messageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendButton.click();
    }
});

// Listen for visibility change to handle notifications
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        document.title = 'Random Message Sender';
    }
});
