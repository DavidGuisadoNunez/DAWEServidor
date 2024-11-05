import express from 'express';
const app = express();
const PORT = 3002;

// Ruta para la página de inicio
app.get('/', (req, res) => {
    res.status(200).send('<h1>Página de inicio</h1>');
});

// Ruta para la página de "Acerca de"
app.get('/about', (req, res) => {
    res.status(200).send('<h1>Acerca de</h1>');
});

// Ruta para la página de "Contacto"
app.get('/contact', (req, res) => {
    res.status(200).send('<h1>Contacto</h1>');
});

// Ruta para manejar las páginas no encontradas
app.use((req, res) => {
    res.status(404).send('<h1>Página no encontrada</h1>');
});

// Escuchar en el puerto 3002
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});