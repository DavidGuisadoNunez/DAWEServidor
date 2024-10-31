const http = require('http');
const url = require('url');

// Función para manejar las diferentes rutas
const requestHandler = (req, res) => {
    const { pathname, query } = url.parse(req.url, true);
    
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
            const name = query.name || 'invitado'; // Obtiene el parámetro name
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`<h1>Hello ${name}!</h1>`); // Saludo con el nombre proporcionado
            break;
        case '/fizzbuzz':
            const number = parseInt(query.number) || 10; // Obtiene el número del query string
            const fizzbuzzResult = [];
            for (let i = 1; i <= number; i++) {
                if (i % 3 === 0 && i % 5 === 0) {
                    fizzbuzzResult.push("FizzBuzz");
                } else if (i % 3 === 0) {
                    fizzbuzzResult.push("Fizz");
                } else if (i % 5 === 0) {
                    fizzbuzzResult.push("Buzz");
                } else {
                    fizzbuzzResult.push(i);
                }
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(fizzbuzzResult)); // Respuesta en formato JSON
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>Página no encontrada</h1>');
            break;
    }
};

// Crear el servidor
const server = http.createServer(requestHandler);

// Escuchar en el puerto 3005
const PORT = 3005;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});