import express from 'express';
import multer from 'multer';
import validateTokenMiddleware from '../middlewares/validateTokenMiddleware.js';
import { getNotes, createNote, updateNote, deleteNote, uploadNotes } from '../controllers/notesController.js';

const router = express.Router();

// Configuración de multer para manejar múltiples archivos
const upload = multer({ dest: 'uploads/' }).array('files');

// Rutas protegidas
router.get('/', validateTokenMiddleware, getNotes);
router.post('/', validateTokenMiddleware, createNote);
router.put('/:name', validateTokenMiddleware, updateNote);
router.delete('/:name', validateTokenMiddleware, deleteNote);
router.use((req, res) => {
  res.status(404).send('Not Found');
});

// Ruta para subir archivos
router.post('/upload', validateTokenMiddleware, upload, uploadNotes);

export default router;
