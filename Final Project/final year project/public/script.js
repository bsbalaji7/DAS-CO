const display = document.getElementById('chat-display');
const input = document.getElementById('user-input');
const btn = document.getElementById('send-btn');

async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    // Add User Message to UI
    appendMessage(text, 'user-msg');
    input.value = '';

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text })
        });
        
        const data = await response.json();
        appendMessage(data.reply, 'bot-msg');
    } catch (err) {
        appendMessage("ERROR: CONNECTION LOST", 'bot-msg');
    }
}

function appendMessage(text, className) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${className}`;
    msgDiv.innerText = text;
    display.appendChild(msgDiv);
    display.scrollTop = display.scrollHeight;
}

btn.addEventListener('click', sendMessage);
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});