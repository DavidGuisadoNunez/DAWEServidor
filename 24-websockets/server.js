const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Permitir cualquier origen (puedes restringirlo si es necesario)
        methods: ["GET", "POST"]
    }
});

app.use(express.static(path.join(__dirname, "public"))); // Servir archivos estáticos

io.on("connection", (socket) => {
    console.log(`Usuario conectado: ${socket.id}`);

    socket.on("chatMessage", ({ user, message }) => {
        const formattedMessage = `${user}: ${message}`;
        io.emit("chatMessage", formattedMessage);
    });

    socket.on("disconnect", () => {
        console.log(`Usuario desconectado: ${socket.id}`);
    });
});

// Ahora escucha en 0.0.0.0 para aceptar conexiones en cualquier IP
const PORT = 3000;
const HOST = "0.0.0.0";

server.listen(PORT, HOST, () => {
    console.log(`Servidor corriendo en http://${HOST}:${PORT}`);
});
