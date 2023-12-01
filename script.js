document.addEventListener("DOMContentLoaded", function () {
    const messagesContainer = document.getElementById("messages");
    const messageInput = document.getElementById("message-input");
    const userNameInput = document.getElementById("user-name-input");
    const sendButton = document.getElementById("send-button");
    const clearButton = document.getElementById("clear-button");
    const micButton = document.getElementById("mic-button");

    let recognizing = false;
    const recognition = new webkitSpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = function (event) {
        const transcript = event.results[event.results.length - 1][0].transcript;
        messageInput.value = transcript;
    };

    micButton.addEventListener("click", function () {
        if (recognizing) {
            recognition.stop();
            micButton.textContent = "Start Mic";
        } else {
            recognition.start();
            micButton.textContent = "Stop Mic";
        }
        recognizing = !recognizing;
    });

    sendButton.addEventListener("click", function () {
        const messageText = messageInput.value.trim();
        const userName = userNameInput.value.trim();
        if (userName !== "" && messageText !== "") {
            const userMessage = `<strong>${userName}</strong>: ${messageText}`;
            const botResponse = `<strong>ChatBot</strong>: ${handleUserMessage(messageText)}`;

            appendMessage(userMessage);
            appendMessage(botResponse);

            messageInput.value = "";
            userNameInput.value = "";
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    });

    clearButton.addEventListener("click", function () {
        messagesContainer.innerHTML = "";
    });

    function appendMessage(message) {
        const li = document.createElement("li");
        li.innerHTML = message;
        messagesContainer.appendChild(li);
    }

    function handleUserMessage(userInput) {
        userInput = userInput.toLowerCase();
        if (userInput.includes("hello")) {
            return `Hello ${userNameInput.value} How can I help you?`;
        } else if (userInput.includes("how are you")) {
            return "I'm just a chatbot, but thanks for asking!";
        } else {
            return "I'm sorry, I didn't understand that. Can you please be more specific?";
        }
    }
});
