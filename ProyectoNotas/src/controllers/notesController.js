import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import archiver from 'archiver';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const notesDir = path.join(__dirname, '..', 'notes');

// Crear carpeta "notes" si no existe
if (!fs.existsSync(notesDir)) {
  fs.mkdirSync(notesDir);
}

export const getNotes = async (req, res, next) => {
  try {
    const {
      filter = {},
      page = 1,
      limit = 5,
      sortBy = 'createdAt',
      order = 'asc',
    } = req.query;

    // Validar parámetros de paginación y orden
    const currentPage = Math.max(Number(page) || 1, 1);
    const size = Math.max(Number(limit) || 5, 1);
    const validSortFields = ['createdAt', 'updatedAt', 'title', 'size'];
    const sortOrder = order.toLowerCase() === 'desc' ? -1 : 1;

    // Verificar que sortBy sea un campo válido
    if (!validSortFields.includes(sortBy)) {
      return res.status(400).json({
        error: `El parámetro 'sortBy' debe ser uno de: ${validSortFields.join(', ')}`,
      });
    }

    // Leer archivos
    const files = (await fsPromises.readdir(notesDir)).filter((file) =>
      file.endsWith('.note')
    );

    // Crear array de notas con metadatos
    let notes = await Promise.all(
      files.map(async (file) => {
        const content = await fsPromises.readFile(
          path.join(notesDir, file),
          'utf-8'
        );
        const stats = await fsPromises.stat(path.join(notesDir, file));

        return {
          name: file.replace('.note', ''),
          content,
          createdAt: stats.birthtime,
          updatedAt: stats.mtime,
          size: stats.size,
        };
      })
    );

    // Aplicar filtros
    if (filter.title) {
      notes = notes.filter((note) => note.name.includes(filter.title));
    }

    if (filter.content) {
      notes = notes.filter((note) => note.content.includes(filter.content));
    }

    if (filter.dateRange) {
      const { startDate, endDate } = filter.dateRange;
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (!isNaN(start) && !isNaN(end)) {
        notes = notes.filter((note) => {
          const creationDate = new Date(note.createdAt);
          return creationDate >= start && creationDate <= end;
        });
      }
    }

    // Ordenar notas
    notes.sort((a, b) => {
      if (sortBy === 'title') {
        return a.name.localeCompare(b.name) * sortOrder;
      }
      return (a[sortBy] - b[sortBy]) * sortOrder;
    });

    // Paginación
    const totalNotes = notes.length;
    const totalPages = Math.ceil(totalNotes / size);
    const paginatedNotes = notes.slice(
      (currentPage - 1) * size,
      currentPage * size
    );

    // Respuesta
    res.json({
      notes: paginatedNotes,
      totalNotes,
      totalPages,
      currentPage,
      limit: size,
      sortBy,
      order,
    });
  } catch (err) {
    console.error(`Error al obtener notas: ${err.message}`);
    next(err);
  }
};

export const createNote = (req, res, next) => {
  const { name, content } = req.body;

  if (!name || !content) {
    return res.status(400).json({ error: 'Nombre y contenido son requeridos.' });
  }

  const filePath = path.join(notesDir, `${name}.note`);

  if (fs.existsSync(filePath)) {
    return res.status(400).json({ error: 'La nota ya existe.' });
  }

  fs.writeFileSync(filePath, content);
  res.status(201).json({ message: 'Nota creada con éxito.', name });
};

export const updateNote = (req, res, next) => {
  const { name } = req.params;
  const { content } = req.body;

  const filePath = path.join(notesDir, `${name}.note`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Nota no encontrada.' });
  }

  fs.writeFileSync(filePath, content);
  res.json({ message: 'Nota actualizada con éxito.', name });
};

export const deleteNote = (req, res, next) => {
  const { name } = req.params;
  const filePath = path.join(notesDir, `${name}.note`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Nota no encontrada.' });
  }

  fs.unlinkSync(filePath);
  res.json({ message: 'Nota eliminada con éxito.', name });
};

export const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, notesDir),
    filename: (req, file, cb) => cb(null, file.originalname)
  }),
  fileFilter: (req, file, cb) => {
    if (!file.originalname.endsWith('.note')) {
      return cb(new Error('Solo se permiten archivos con extensión .note'), false);
    }
    cb(null, true);
  }
}).array('files');

export const uploadNotes = (req, res) => {
  res.status(200).json({
    message: `${req.files.length} archivo(s) subido(s) con éxito.`,
    files: req.files.map(file => file.originalname)
  });
};

export const exportNotes = (req, res) => {
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
    }
  });

  archive.finalize();
};

export const downloadFile = (req, res) => {
  const { filename } = req.params;

  // Construir la ruta completa del archivo
  const filePath = path.join(notesDir, filename);

  // Verificar si el archivo existe
  if (fs.existsSync(filePath)) {
    const fileExtension = path.extname(filename).toLowerCase();
    if (fileExtension === '.note') {
      res.download(filePath, filename, err => {
        if (err) {
          console.error('Error downloading file:', err);
          res.status(500).send('Error downloading file');
        }
      });
    } else {
      res.status(400).send('Invalid file format');
    }
  } else {
    res.status(404).send('File not found');
  }
};
