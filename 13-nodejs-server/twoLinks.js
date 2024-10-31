const http = require('http');
const url = require('url');

// Función para manejar las diferentes rutas
const requestHandler = (req, res) => {
    const pathname = url.parse(req.url).pathname;

    // Responder según la URL
    switch (pathname) {
        case '/':
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('<h1>Página de inicio</h1>');
            break;
        case '/about':
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('<h1>Acerca de</h1>');
            break;
        case '/contact':
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('<h1>Contacto</h1>');
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>Página no encontrada</h1>');
            break;
    }
};

// Crear el servidor
const server = http.createServer(requestHandler);

// Escuchar en el puerto 3002
const PORT = 3002;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});