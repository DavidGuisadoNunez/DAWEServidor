const http = require('http');
const url = require('url');

// Función para manejar las diferentes rutas
const requestHandler = (req, res) => {
    const pathname = url.parse(req.url).pathname;

    // Responder según la URL
    switch (pathname) {
        case '/page':
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('<h1>Página web</h1><p>Bienvenido a la página web.</p>');
            break;
        case '/error':
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>Error 404</h1><p>La página que estás buscando no existe.</p>');
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>Página no encontrada</h1>');
            break;
    }
};

// Crear el servidor
const server = http.createServer(requestHandler);

// Escuchar en el puerto 3003
const PORT = 3003;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});