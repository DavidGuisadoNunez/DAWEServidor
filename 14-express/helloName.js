import express from 'express';
const app = express();
const PORT = 3014;

// Middleware para manejar la ruta de saludo
app.get('/greet', (req, res) => {
    const name = req.query.name || 'invitado'; // Obtiene el parámetro name, o usa 'invitado' si no se proporciona
    res.status(200).send(`<h1>Hello ${name}!</h1>`); // Saludo con el nombre proporcionado
});

// Ruta para la página principal
app.get('/page', (req, res) => {
    res.status(200).send(`<h1>Página web</h1><p>Bienvenido a la página web.</p>`);
});

// Ruta para manejar el error 404
app.get('/error', (req, res) => {
    res.status(404).send('<h1>Error 404</h1><p>La página que estás buscando no existe.</p>');
});

// Ruta para manejar cualquier otra página no encontrada
app.use((req, res) => {
    res.status(404).send('<h1>Página no encontrada</h1>');
});

// Escuchar en el puerto 3004
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});