document.addEventListener("DOMContentLoaded", function () {
    const chatForm = document.getElementById("chat-form");
    const userInput = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");

    function sendMessage() {
        let userMessage = userInput.value.trim();
        if (userMessage === "") return;

        chatBox.innerHTML += `<div class="user-message"><b>You:</b> ${userMessage}</div>`;
        userInput.value = "";

        fetch("/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage })
        })
        .then(response => response.json())
        .then(data => {
            let botReply = data.reply || "Error communicating with server.";
            chatBox.innerHTML += `<div class="bot-message"><b>Bot:</b> ${botReply}</div>`;
            chatBox.scrollTop = chatBox.scrollHeight;
        })
        .catch(error => {
            chatBox.innerHTML += `<div class="bot-message"><b>Bot:</b> Error communicating with server.</div>`;
        });
    }

    chatForm.addEventListener("submit", function (event) {
        event.preventDefault();
        sendMessage();
    });

    document.getElementById("send-button").addEventListener("click", sendMessage);
});
