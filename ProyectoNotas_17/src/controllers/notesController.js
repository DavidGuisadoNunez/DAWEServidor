import fs from 'fs';
import path from 'path';

// Directorio donde se almacenan las notas
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const notesDir = path.join(__dirname, '..', 'notes');

// Obtener todas las notas
export const getNotes = (req, res) => {
    fs.readdir(notesDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Error al leer las notas' });
        }
        const notes = files.filter(file => file.endsWith('.note')).map(file => file.replace('.note', ''));
        res.json(notes);
    });
};

// Obtener una nota específica
export const getNote = (req, res) => {
    const noteName = req.params.name;
    const filePath = path.join(notesDir, `${noteName}.note`);
    
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(404).json({ error: 'Nota no encontrada' });
        }
        res.json({ name: noteName, content: data });
    });
};

// Crear una nueva nota
export const createNote = (req, res) => {
    const { name, content } = req.body;
    if (!name || !content) {
        return res.status(400).json({ error: 'Nombre y contenido son requeridos' });
    }

    const filePath = path.join(notesDir, `${name}.note`);
    
    fs.writeFile(filePath, content, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error al guardar la nota' });
        }
        res.status(201).json({ message: 'Nota creada con éxito' });
    });
};

// Actualizar una nota existente
export const updateNote = (req, res) => {
    const noteName = req.params.name;
    const { content } = req.body;
    if (!content) {
        return res.status(400).json({ error: 'Contenido es requerido' });
    }

    const filePath = path.join(notesDir, `${noteName}.note`);
    
    fs.writeFile(filePath, content, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error al actualizar la nota' });
        }
        res.json({ message: 'Nota actualizada con éxito' });
    });
};

// Eliminar una nota
export const deleteNote = (req, res) => {
    const noteName = req.params.name;
    const filePath = path.join(notesDir, `${noteName}.note`);

    fs.unlink(filePath, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error al eliminar la nota' });
        }
        res.json({ message: 'Nota eliminada con éxito' });
    });
};