import fs from 'fs';
import fsPromises from 'fs/promises';
import request from 'supertest';
import { jest, expect } from '@jest/globals';
import { app } from '../server.js'; // Importa tu servidor Express
import * as notesController from '../controllers/notesController.js';

jest.mock('fs');
jest.mock('fs/promises');

// Mock para logger
jest.mock('../config/winston.js', () => ({
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
}));

describe('Notes Controller Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /notes', () => {
    it('should return a list of notes with pagination', async () => {
      fsPromises.readdir.mockResolvedValue(['note1.note', 'note2.note']);
      fsPromises.readFile.mockResolvedValue('Content');
      fsPromises.stat.mockResolvedValue({
        birthtime: new Date('2024-01-01'),
        mtime: new Date('2024-02-01'),
        size: 100,
      });

      const res = await request(app).get('/notes').query({ page: 1, limit: 2 });

      expect(res.status).toBe(200);
      expect(res.body.notes).toHaveLength(2);
      expect(res.body.totalNotes).toBe(2);
    });

    it('should return 400 if invalid sortBy parameter is provided', async () => {
      const res = await request(app).get('/notes').query({ sortBy: 'invalidField' });

      expect(res.status).toBe(400);
      expect(res.body.error).toBeDefined();
    });
  });

  describe('POST /notes', () => {
    it('should create a new note successfully', async () => {
      fs.existsSync.mockReturnValue(false);
      fs.writeFileSync.mockImplementation(() => {});

      const res = await request(app).post('/notes').send({ name: 'test', content: 'test content' });

      expect(res.status).toBe(201);
      expect(res.body.message).toBe('Nota creada con éxito.');
    });

    it('should return 400 if note already exists', async () => {
      fs.existsSync.mockReturnValue(true);

      const res = await request(app).post('/notes').send({ name: 'test', content: 'test content' });

      expect(res.status).toBe(400);
      expect(res.body.error).toBeDefined();
    });

    it('should return 400 if name or content is missing', async () => {
      const res = await request(app).post('/notes').send({});

      expect(res.status).toBe(400);
      expect(res.body.error).toBeDefined();
    });
  });

  describe('PUT /notes/:name', () => {
    it('should update a note successfully', async () => {
      fs.existsSync.mockReturnValue(true);
      fs.writeFileSync.mockImplementation(() => {});

      const res = await request(app).put('/notes/test').send({ content: 'updated content' });

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Nota actualizada con éxito.');
    });

    it('should return 404 if the note does not exist', async () => {
      fs.existsSync.mockReturnValue(false);

      const res = await request(app).put('/notes/nonexistent').send({ content: 'updated content' });

      expect(res.status).toBe(404);
      expect(res.body.error).toBeDefined();
    });
  });

  describe('DELETE /notes/:name', () => {
    it('should delete a note successfully', async () => {
      fs.existsSync.mockReturnValue(true);
      fs.unlinkSync.mockImplementation(() => {});

      const res = await request(app).delete('/notes/test');

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Nota eliminada con éxito.');
    });

    it('should return 404 if the note does not exist', async () => {
      fs.existsSync.mockReturnValue(false);

      const res = await request(app).delete('/notes/nonexistent');

      expect(res.status).toBe(404);
      expect(res.body.error).toBeDefined();
    });
  });

  describe('POST /upload', () => {
    it('should upload files successfully', async () => {
      const files = [{ originalname: 'file1.note' }];

      const req = { files };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      notesController.upload(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: '1 archivo(s) subido(s) con éxito.',
        files: ['file1.note'],
      });
    });
  });

  describe('GET /export', () => {
    it('should export specified notes as a zip file', async () => {
      fs.existsSync.mockReturnValue(true);
      const res = await request(app).get('/export').query({ filenames: 'file1,file2' });

      expect(res.status).toBe(200);
    });
  });
});
