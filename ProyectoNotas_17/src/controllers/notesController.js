import fs from 'fs';
import path, { dirname } from 'path';
import { logger } from '../utils/logger.js';
import { fileURLToPath } from 'url';

import multer from 'multer';
import archiver from 'archiver';

// Obtener el directorio actual (equivalente a __dirname en CommonJS)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Definir la ruta a la carpeta de notas
const notesDir = path.join(__dirname, '..', 'notes');

// Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, notesDir);  // Guardar los archivos en la carpeta 'notes'
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);  // Usar el nombre original del archivo
  }
});

// Inicializar multer
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.endsWith('.note')) {
      return cb(new Error('Solo se permiten archivos .note'), false); // Filtrar solo archivos .note
    }
    cb(null, true);
  }
});

// Obtener todas las notas
export const getNotes = (req, res, next) => {
  fs.readdir(notesDir, (err, files) => {
    if (err) {
      logger.error(`Error al leer las notas: ${err}`);
      return next(err);
    }
    const notes = files.filter(file => file.endsWith('.note')).map(file => file.replace('.note', ''));

    // Aplicar filtros
    const { filter } = req.query;
    let filteredNotes = notes;

    // Filtro por título
    if (filter && filter.title) {
      filteredNotes = filteredNotes.filter(note => note.includes(filter.title));
    }

    // Filtro por fecha de creación
    if (filter && filter.dateRange) {
      const { startDate, endDate } = filter.dateRange;
      const start = new Date(startDate);
      const end = new Date(endDate);

      filteredNotes = filteredNotes.filter(note => {
        const stats = fs.statSync(path.join(notesDir, `${note}.note`));
        const creationDate = new Date(stats.birthtime);
        return creationDate >= start && creationDate <= end;
      });
    }

    // Paginación
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const totalNotes = filteredNotes.length;
    const totalPages = Math.ceil(totalNotes / pageSize);

    const paginatedNotes = filteredNotes.slice((page - 1) * pageSize, page * pageSize);

    res.json({
      notes: paginatedNotes,
      totalNotes,
      totalPages,
      currentPage: page,
      pageSize
    });
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

// Subir uno o varios archivos .note
export const uploadNotes = (req, res, next) => {
  const files = req.files;
  if (!files || files.length === 0) {
    return res.status(400).json({ error: 'No se han subido archivos' });
  }

  // Verificar si los archivos ya existen
  files.forEach(file => {
    const filePath = path.join(notesDir, file.originalname);
    if (fs.existsSync(filePath)) {
      return res.status(400).json({ error: `El archivo ${file.originalname} ya existe` });
    }
  });

  // Mover los archivos a la carpeta 'notes'
  files.forEach(file => {
    const filePath = path.join(notesDir, file.originalname);
    fs.renameSync(file.path, filePath);
  });

  res.status(200).json({
    message: `${files.length} archivos subidos con éxito`,
    files: files.map(file => file.originalname)
  });
};

// Exportar notas seleccionadas como un archivo ZIP
export const exportNotes = (req, res, next) => {
  const { filenames, title, startDate, endDate } = req.query;
  const files = filenames ? filenames.split(',') : [];

  if (files.length === 0) {
    return res.status(400).json({ error: 'No se especificaron archivos para exportar' });
  }

  // Filtros de exportación
  let filteredFiles = files;

  // Filtro por título
  if (title) {
    filteredFiles = filteredFiles.filter(file => file.includes(title));
  }

  // Filtro por rango de fechas
  if (startDate || endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    filteredFiles = filteredFiles.filter(file => {
      const stats = fs.statSync(path.join(notesDir, `${file}.note`));
      const creationDate = new Date(stats.birthtime);
      return (!startDate || creationDate >= start) && (!endDate || creationDate <= end);
    });
  }

  // Verificar que los archivos existen
  const filePaths = filteredFiles.map(file => path.join(notesDir, `${file}.note`));
  const nonExistentFiles = filePaths.filter(filePath => !fs.existsSync(filePath));

  if (nonExistentFiles.length > 0) {
    return res.status(404).json({ error: `Los archivos no existen: ${nonExistentFiles.join(', ')}` });
  }

  // Crear un archivo comprimido ZIP con los archivos seleccionados
  const archive = archiver('zip', { zlib: { level: 9 } });

  res.attachment('notes.zip');
  archive.pipe(res);

  // Agregar los archivos al archivo comprimido
  filePaths.forEach(filePath => {
    archive.file(filePath, { name: path.basename(filePath) });
  });

  archive.finalize();
};
