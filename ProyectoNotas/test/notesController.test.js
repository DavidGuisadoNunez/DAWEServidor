import { expect } from 'chai';
import sinon from 'sinon';
import request from 'supertest';
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import app from '../src/app.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const notesDir = path.join(__dirname, '..', 'src', 'notes');

describe('Notes Controller', () => {
  before(() => {
    if (!fs.existsSync(notesDir)) {
      fs.mkdirSync(notesDir);
    }
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('GET /api/notes', () => {
    it('should return a list of notes', async () => {
      sinon.stub(fsPromises, 'readdir').resolves(['note1.note', 'note2.note']);
      sinon.stub(fsPromises, 'readFile').resolves('content');
      sinon.stub(fsPromises, 'stat').resolves({
        birthtime: new Date(),
        mtime: new Date(),
        size: 100
      });

      const res = await request(app)
        .get('/api/notes')
        .set('Authorization', 'Bearer your_token_here'); // Add authentication header if required

      expect(res.status).to.equal(200);
      expect(res.body.notes).to.have.lengthOf(2);
    });

    it('should return 400 if sortBy is invalid', async () => {
      const res = await request(app)
        .get('/api/notes?sortBy=invalidField')
        .set('Authorization', 'Bearer your_token_here'); // Add authentication header if required

      expect(res.status).to.equal(400);
      expect(res.body.error).to.equal('El parámetro \'sortBy\' debe ser uno de: createdAt, updatedAt, title, size');
    });
  });

  describe('POST /api/notes', () => {
    it('should create a new note', async () => {
      const note = { name: 'note1', content: 'content1' };

      sinon.stub(fs, 'existsSync').returns(false);
      sinon.stub(fs, 'writeFileSync').returns();

      const res = await request(app).post('/api/notes').send(note);

      expect(res.status).to.equal(201);
      expect(res.body.message).to.equal('Nota creada con éxito.');
    });

    it('should return 400 if note already exists', async () => {
      const note = { name: 'note1', content: 'content1' };

      sinon.stub(fs, 'existsSync').returns(true);

      const res = await request(app).post('/api/notes').send(note);

      expect(res.status).to.equal(400);
      expect(res.body.error).to.equal('La nota ya existe.');
    });
  });

  describe('PUT /api/notes/:name', () => {
    it('should update an existing note', async () => {
      const note = { content: 'updated content' };

      sinon.stub(fs, 'existsSync').returns(true);
      sinon.stub(fs, 'writeFileSync').returns();

      const res = await request(app).put('/api/notes/note1').send(note);

      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal('Nota actualizada con éxito.');
    });

    it('should return 404 if note does not exist', async () => {
      const note = { content: 'updated content' };

      sinon.stub(fs, 'existsSync').returns(false);

      const res = await request(app).put('/api/notes/note1').send(note);

      expect(res.status).to.equal(404);
      expect(res.body.error).to.equal('Nota no encontrada.');
    });
  });

  describe('DELETE /api/notes/:name', () => {
    it('should delete an existing note', async () => {
      sinon.stub(fs, 'existsSync').returns(true);
      sinon.stub(fs, 'unlinkSync').returns();

      const res = await request(app).delete('/api/notes/note1');

      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal('Nota eliminada con éxito.');
    });

    it('should return 404 if note does not exist', async () => {
      sinon.stub(fs, 'existsSync').returns(false);

      const res = await request(app).delete('/api/notes/note1');

      expect(res.status).to.equal(404);
      expect(res.body.error).to.equal('Nota no encontrada.');
    });
  });

  describe('POST /api/notes/upload', () => {
    it('should upload files', async () => {
      const res = await request(app)
        .post('/api/notes/upload')
        .attach('files', Buffer.from('content'), 'note1.note');

      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal('1 archivo(s) subido(s) con éxito.');
    });
  });

  describe('GET /api/notes/download/:filename', () => {
    it('should download a file', async () => {
      sinon.stub(fs, 'existsSync').returns(true);
      sinon.stub(fs, 'createReadStream').returns({
        pipe: sinon.stub()
      });

      const res = await request(app).get('/api/notes/download/note1.note');

      expect(res.status).to.equal(200);
    });

    it('should return 404 if file does not exist', async () => {
      sinon.stub(fs, 'existsSync').returns(false);

      const res = await request(app).get('/api/notes/download/note1.note');

      expect(res.status).to.equal(404);
      expect(res.body).to.equal('File not found');
    });
  });
});
