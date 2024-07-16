async function sendInitialPrompt() {
    const info = document.getElementById('info').value;
    const response = await fetch('/start_chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ info })
    });
    const data = await response.json();
    document.getElementById('chatMessages').innerHTML = `<p><strong>GPT:</strong> ${data.message}</p>`;
    document.getElementById('questionnaireForm').style.display = 'none';
    document.getElementById('chatContainer').style.display = 'block';
}

async function sendMessage() {
    const userMessage = document.getElementById('userMessage').value;
    const response = await fetch('/send_message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userMessage })
    });
    const data = await response.json();
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
    chatMessages.innerHTML += `<p><strong>GPT:</strong> ${data.message}</p>`;
    document.getElementById('userMessage').value = '';
}
