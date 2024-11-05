import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3006;

// Definir __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware para servir el archivo HTML en la ruta raíz
app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'index.html');
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(500).send('Error interno del servidor');
        }
    });
});

// Escuchar en el puerto 3006
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});