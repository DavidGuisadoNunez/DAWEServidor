const http = require('http');

const server = http.createServer((req, res) => {
    res.statusCode = 200; // Código de estado HTTP 200 OK
    res.setHeader('Content-Type', 'text/html'); // Tipo de contenido HTML

    // Contenido HTML de la respuesta
    const htmlContent = `
        <html>
            <head>
                <title>Página de Ejemplo</title>
            </head>
            <body>
                <h1>Hello World!</h1>
                <p>Bienvenido a mi servidor Node.js.</p>
            </body>
        </html>
    `;

    res.end(htmlContent); // Finaliza la respuesta con el contenido HTML
});

// Escucha en el puerto 3001
server.listen(3001, () => {
    console.log('Servidor corriendo en http://localhost:3001/');
});