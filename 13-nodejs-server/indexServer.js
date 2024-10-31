const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Establecer la ruta del archivo HTML
    const filePath = path.join(__dirname, 'index.html');

    // Leer el archivo HTML
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            // Manejar el error
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error interno del servidor');
            return;
        }

        // Enviar el contenido HTML como respuesta
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
});

// Escuchar en el puerto 3006
const PORT = 3006;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});