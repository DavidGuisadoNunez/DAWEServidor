import fs from 'fs';
import path from 'path';
import { logger } from '../utils/logger.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Obtener el directorio actual (equivalente a __dirname en CommonJS)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Definir la ruta a la carpeta de notas
const notesDir = path.join(__dirname, '..', 'notes');  // Usa __dirname ahora que lo definimos

// Obtener todas las notas
export const getNotes = (req, res, next) => {
    fs.readdir(notesDir, (err, files) => {
        if (err) {
            logger.error(`Error al leer las notas: ${err}`);
            return next(err); // Pasa el error al middleware de manejo de errores
        }
        const notes = files.filter(file => file.endsWith('.note')).map(file => file.replace('.note', ''));
        res.json(notes);
    });
};

// Crear una nueva nota
export const createNote = (req, res, next) => {
    const { name, content } = req.body;

    if (!name || !content) {
        return res.status(400).json({ error: 'Nombre y contenido son requeridos' });
    }

    const filePath = path.join(notesDir, `${name}.note`);

    fs.writeFile(filePath, content, (err) => {
        if (err) {
            logger.error(`Error al guardar la nota: ${err}`);
            return next(err);
        }
        res.status(201).json({ message: 'Nota creada con éxito' });
    });
};

// Actualizar una nota existente
export const updateNote = (req, res, next) => {
    const { name } = req.params;
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ error: 'Contenido es requerido' });
    }

    const filePath = path.join(notesDir, `${name}.note`);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({ error: 'Nota no encontrada' });
        }
        fs.writeFile(filePath, content, (err) => {
            if (err) {
                return next(err);
            }
            res.json({ message: 'Nota actualizada con éxito' });
        });
    });
};

// Eliminar una nota
export const deleteNote = (req, res, next) => {
    const { name } = req.params;
    const filePath = path.join(notesDir, `${name}.note`);

    fs.unlink(filePath, (err) => {
        if (err) {
            return next(err);
        }
        res.json({ message: 'Nota eliminada con éxito' });
    });
};
