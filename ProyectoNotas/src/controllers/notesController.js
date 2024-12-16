import fs from 'fs';
import path, { dirname } from 'path';
import { logger } from '../utils/logger.js';
import { fileURLToPath } from 'url';
import multer from 'multer';
import archiver from 'archiver';

// Obtener el directorio actual (__dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ruta de la carpeta 'notes'
const notesDir = path.join(__dirname, '..', 'notes');

// Verificar si el directorio 'notes' existe
if (!fs.existsSync(notesDir)) {
  fs.mkdirSync(notesDir);
}

// Configuración de multer para subida de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, notesDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.endsWith('.note')) {
      return cb(new Error('Solo se permiten archivos con extensión .note'), false);
    }
    cb(null, true);
  }
}).array('files'); // Permite múltiples archivos

// Obtener todas las notas
export const getNotes = (req, res, next) => {
  try {
    const files = fs.readdirSync(notesDir).filter(file => file.endsWith('.note'));
    let notes = files.map(file => ({ name: file.replace('.note', '') }));

    // Aplicar filtros
    const { filter = {}, page = 1, pageSize = 10 } = req.query;

    if (filter.title) {
      notes = notes.filter(note => note.name.includes(filter.title));
    }

    if (filter.dateRange) {
      const { startDate, endDate } = filter.dateRange;
      const start = new Date(startDate);
      const end = new Date(endDate);

      notes = notes.filter(note => {
        const stats = fs.statSync(path.join(notesDir, `${note.name}.note`));
        const creationDate = new Date(stats.birthtime);
        return creationDate >= start && creationDate <= end;
      });
    }

    // Paginación
    const totalNotes = notes.length;
    const totalPages = Math.ceil(totalNotes / pageSize);
    const paginatedNotes = notes.slice((page - 1) * pageSize, page * pageSize);

    res.json({
      notes: paginatedNotes,
      totalNotes,
      totalPages,
      currentPage: Number(page),
      pageSize: Number(pageSize)
    });
  } catch (err) {
    logger.error(`Error al obtener notas: ${err.message}`);
    next(err);
  }
};

// Crear una nueva nota
export const createNote = (req, res, next) => {
  const { name, content } = req.body;

  if (!name || !content) {
    return res.status(400).json({ error: 'Nombre y contenido son requeridos.' });
  }

  const filePath = path.join(notesDir, `${name}.note`);
  if (fs.existsSync(filePath)) {
    return res.status(400).json({ error: 'La nota ya existe.' });
  }

  fs.writeFile(filePath, content, err => {
    if (err) {
      logger.error(`Error al crear la nota: ${err.message}`);
      return next(err);
    }
    res.status(201).json({ message: 'Nota creada con éxito.', name });
  });
};

// Actualizar una nota existente
export const updateNote = (req, res, next) => {
  const { name } = req.params;
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: 'El contenido es requerido.' });
  }

  const filePath = path.join(notesDir, `${name}.note`);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Nota no encontrada.' });
  }

  fs.writeFile(filePath, content, err => {
    if (err) {
      logger.error(`Error al actualizar la nota: ${err.message}`);
      return next(err);
    }
    res.json({ message: 'Nota actualizada con éxito.', name });
  });
};

// Eliminar una nota
export const deleteNote = (req, res, next) => {
  const { name } = req.params;
  const filePath = path.join(notesDir, `${name}.note`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Nota no encontrada.' });
  }

  fs.unlink(filePath, err => {
    if (err) {
      logger.error(`Error al eliminar la nota: ${err.message}`);
      return next(err);
    }
    res.json({ message: 'Nota eliminada con éxito.', name });
  });
};

// Subir archivos
export const uploadNotes = (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No se han subido archivos.' });
  }

  res.status(200).json({
    message: `${req.files.length} archivo(s) subido(s) con éxito.`,
    files: req.files.map(file => file.originalname)
  });
};

// Exportar notas seleccionadas como ZIP
export const exportNotes = (req, res, next) => {
  const { filenames } = req.query;

  if (!filenames) {
    return res.status(400).json({ error: 'No se especificaron archivos para exportar.' });
  }

  const files = filenames.split(',');
  const archive = archiver('zip', { zlib: { level: 9 } });
  res.attachment('notes.zip');

  archive.pipe(res);

  files.forEach(file => {
    const filePath = path.join(notesDir, `${file}.note`);
    if (fs.existsSync(filePath)) {
      archive.file(filePath, { name: `${file}.note` });
    } else {
      logger.warn(`Archivo no encontrado: ${file}`);
    }
  });

  archive.finalize();
};
