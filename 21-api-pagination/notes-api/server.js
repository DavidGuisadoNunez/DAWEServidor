import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Endpoint para obtener la lista de notas
app.get('/notes', async (req, res) => {
    try {
        // Parámetros de consulta
        const { sort, filter, page = 1, limit = 10 } = req.query;

        // Validación de parámetros
        const validSortValues = ['asc', 'desc'];
        if (sort && !validSortValues.includes(sort)) {
            return res.status(400).json({ error: 'Invalid sort parameter' });
        }

        if (isNaN(page) || page <= 0) {
            return res.status(400).json({ error: 'Invalid page parameter' });
        }

        if (isNaN(limit) || limit <= 0) {
            return res.status(400).json({ error: 'Invalid limit parameter' });
        }

        // Leer archivos de la carpeta /notes
        const notesDir = path.join(path.resolve(), 'notes');
        const files = fs.readdirSync(notesDir);

        // Leer contenido de cada archivo
        let notes = files.map(file => {
            const content = fs.readFileSync(path.join(notesDir, file), 'utf-8');
            return { name: file, content };
        });

        // Filtro: Buscar por nombre
        if (filter) {
            if (filter) {
                notes = notes.filter(note => note.name.toLowerCase().includes(filter.toLowerCase()));
            }
        }

        // Ordenación: Por nombre ascendente o descendente
        if (sort) {
            notes = notes.sort((a, b) => {
                if (sort === 'asc') return a.name.localeCompare(b.name);
                if (sort === 'desc') return b.name.localeCompare(a.name);
                return 0;
            });
        }

        // Paginado
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + parseInt(limit);
        const paginatedNotes = notes.slice(startIndex, endIndex);

        // Respuesta al cliente
        res.json({
            page: parseInt(page),
            limit: parseInt(limit),
            total: notes.length,
            data: paginatedNotes,
        });
    } catch (error) {
        console.error('Error fetching notes data:', error.message);
        res.status(500).json({ error: 'Error fetching notes data' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
