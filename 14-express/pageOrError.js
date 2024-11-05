import express from 'express';
const app = express();
const PORT = 3003;

// Ruta para la página principal
app.get('/page', (req, res) => {
    res.status(200).send('<h1>Página web</h1><p>Bienvenido a la página web.</p>');
});

// Ruta para la página de error 404 específica
app.get('/error', (req, res) => {
    res.status(404).send('<h1>Error 404</h1><p>La página que estás buscando no existe.</p>');
});

// Ruta para manejar cualquier otra página no encontrada
app.use((req, res) => {
    res.status(404).send('<h1>Página no encontrada</h1>');
});

// Escuchar en el puerto 3003
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
