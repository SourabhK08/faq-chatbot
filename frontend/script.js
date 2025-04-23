// frontend/script.js

// Function to send message to server and display the bot's response
function sendMessage() {
    const userMessage = document.getElementById("user-input").value;
    
    if (userMessage.trim() === "") return;

    // Display user's message
    displayMessage(userMessage, "user");

    // Clear input field
    document.getElementById("user-input").value = "";

    // Send request to the backend (Node.js API)
    fetch('http://localhost:3000/get-response', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: userMessage })
    })
    .then(response => response.json())
    .then(data => {
        // Display bot's response
        if (data.response) {
            displayMessage(data.response, "bot");
        } else {
            displayMessage("Sorry, I couldn't get a response.", "bot");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        displayMessage("Sorry, I couldn't get a response.", "bot");
    });
}

// Function to display messages in the chat box
function displayMessage(message, sender) {
    const chatBox = document.getElementById("chat-box");

    const messageDiv = document.createElement("div");
    messageDiv.classList.add(sender === "user" ? "user-message" : "bot-message");
    messageDiv.textContent = message;

    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;  // Scroll to the bottom
}
