import { jest, expect } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import notesRouter from '../routes/notesRouter.js';
import validateTokenMiddleware from '../middlewares/validateTokenMiddleware.js';
import * as notesController from '../controllers/notesController.js';

jest.mock('../middlewares/validateTokenMiddleware.js');
jest.mock('../controllers/notesController.js');

const app = express();
app.use(express.json());
app.use('/notes', notesRouter);

describe('Notes Routes Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    validateTokenMiddleware.mockImplementation((req, res, next) => next()); // Simula validación correcta
  });

  describe('GET /notes/', () => {
    it('should call getNotes controller', async () => {
      notesController.getNotes.mockImplementation((req, res) =>
        res.status(200).json({ notes: [] })
      );

      const res = await request(app).get('/notes/');
      expect(res.status).toBe(200);
      expect(notesController.getNotes).toHaveBeenCalled();
    });
  });

  describe('POST /notes/', () => {
    it('should call createNote controller', async () => {
      const mockNote = { name: 'test', content: 'test content' };
      notesController.createNote.mockImplementation((req, res) =>
        res.status(201).json({ message: 'Nota creada con éxito' })
      );

      const res = await request(app).post('/notes/').send(mockNote);
      expect(res.status).toBe(201);
      expect(notesController.createNote).toHaveBeenCalled();
    });
  });

  describe('PUT /notes/:name', () => {
    it('should call updateNote controller', async () => {
      notesController.updateNote.mockImplementation((req, res) =>
        res.status(200).json({ message: 'Nota actualizada con éxito' })
      );

      const res = await request(app)
        .put('/notes/test')
        .send({ content: 'updated content' });
      expect(res.status).toBe(200);
      expect(notesController.updateNote).toHaveBeenCalled();
    });
  });

  describe('DELETE /notes/:name', () => {
    it('should call deleteNote controller', async () => {
      notesController.deleteNote.mockImplementation((req, res) =>
        res.status(200).json({ message: 'Nota eliminada con éxito' })
      );

      const res = await request(app).delete('/notes/test');
      expect(res.status).toBe(200);
      expect(notesController.deleteNote).toHaveBeenCalled();
    });
  });

  describe('POST /notes/upload', () => {
    it('should call uploadNotes controller', async () => {
      notesController.uploadNotes.mockImplementation((req, res) =>
        res.status(200).json({ message: 'Archivos subidos con éxito' })
      );

      const res = await request(app)
        .post('/notes/upload')
        .attach('files', Buffer.from('content'), 'file1.note');
      expect(res.status).toBe(200);
      expect(notesController.uploadNotes).toHaveBeenCalled();
    });
  });

  describe('GET /notes/download/:filename', () => {
    it('should call downloadFile controller', async () => {
      notesController.downloadFile.mockImplementation((req, res) =>
        res.status(200).send('File content')
      );

      const res = await request(app).get('/notes/download/file1.note');
      expect(res.status).toBe(200);
      expect(notesController.downloadFile).toHaveBeenCalled();
    });
  });

  describe('Invalid Routes', () => {
    it('should return 404 for undefined routes', async () => {
      const res = await request(app).get('/notes/nonexistent');
      expect(res.status).toBe(404);
      expect(res.text).toBe('Not Found');
    });
  });
});
