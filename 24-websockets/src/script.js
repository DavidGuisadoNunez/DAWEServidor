const SERVER_IP = "10.200.33.156"; // Reemplázala por tu IP real
const socket = io(`http://${SERVER_IP}:3000`); // Conectar al servidor en la IP específica

let user = "";

// Elementos del DOM
const usernameContainer = document.getElementById("username-container");
const usernameInput = document.getElementById("usernameInput");
const joinChatButton = document.getElementById("joinChat");

const chatContainer = document.getElementById("chat-container");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const messagesDiv = document.getElementById("messages");

// Cuando el usuario introduce su nombre
joinChatButton.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    if (username) {
        user = username;
        usernameContainer.style.display = "none";
        chatContainer.style.display = "block";
    } else {
        alert("Por favor, ingresa un nombre de usuario.");
    }
});

// Recibir mensaje del servidor y mostrarlo en pantalla
socket.on("chatMessage", (formattedMessage) => {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.textContent = formattedMessage;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Auto-scroll al final
});

// Enviar mensaje al servidor
sendButton.addEventListener("click", sendMessage);
messageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});

function sendMessage() {
    const message = messageInput.value.trim();
    if (message && user) {
        socket.emit("chatMessage", { user, message });
        messageInput.value = "";
        messageInput.focus();
    }
}
