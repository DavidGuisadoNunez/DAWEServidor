const http = require('http');
const url = require('url');

// Función para manejar las diferentes rutas
const requestHandler = (req, res) => {
    const { pathname, query } = url.parse(req.url, true);
    const name = query.name || 'invitado'; // Obtiene el parámetro name, o usa 'invitado' si no se proporciona

    // Responder según la URL
    switch (pathname) {
        case '/page':
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`<h1>Página web</h1><p>Bienvenido a la página web.</p>`);
            break;
        case '/error':
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>Error 404</h1><p>La página que estás buscando no existe.</p>');
            break;
        case '/greet':
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`<h1>Hello ${name}!</h1>`); // Saludo con el nombre proporcionado
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>Página no encontrada</h1>');
            break;
    }
};

// Crear el servidor
const server = http.createServer(requestHandler);

// Escuchar en el puerto 3004
const PORT = 3004;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});