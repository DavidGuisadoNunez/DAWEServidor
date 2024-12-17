import request from 'supertest';
import app from '../src/app.js';
import { describe, expect, it } from '@jest/globals';

describe('Notas API', () => {
  it('debe obtener todas las notas', async () => {
    const response = await request(app).get('/api/notes');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('debe crear una nueva nota', async () => {
    const newNote = { name: 'Nota1', content: 'Contenido de prueba' };
    const response = await request(app).post('/api/notes').send(newNote);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Nota creada con éxito');
  });

  it('debe devolver un error al crear una nota sin contenido', async () => {
    const newNote = { name: 'Nota2' }; // Falta contenido
    const response = await request(app).post('/api/notes').send(newNote);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Nombre y contenido son requeridos');
  });

  it('debe devolver un error 404 para una nota que no existe', async () => {
    const response = await request(app).get('/api/notes/notaInexistente');
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Nota no encontrada');
  });

  it('debe actualizar una nota existente', async () => {
    const updatedNote = { name: 'Nota1 Actualizada', content: 'Contenido actualizado' };
    const response = await request(app).put('/api/notes/1').send(updatedNote);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Nota actualizada con éxito');
  });

  it('debe devolver un error al actualizar una nota que no existe', async () => {
    const updatedNote = { name: 'Nota Inexistente', content: 'Contenido' };
    const response = await request(app).put('/api/notes/notaInexistente').send(updatedNote);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Nota no encontrada');
  });

  it('debe eliminar una nota existente', async () => {
    const response = await request(app).delete('/api/notes/1');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Nota eliminada con éxito');
  });

  it('debe devolver un error al eliminar una nota que no existe', async () => {
    const response = await request(app).delete('/api/notes/notaInexistente');
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Nota no encontrada');
  });
});

it('debe devolver un error al crear una nota sin contenido', async () => {
  const newNote = { name: 'Nota2' }; // Falta contenido
  const response = await request(app).post('/api/notes').send(newNote);
  expect(response.status).toBe(400);
  expect(response.body.error).toBe('Nombre y contenido son requeridos');
});

it('debe devolver un error 404 para una nota que no existe', async () => {
  const response = await request(app).get('/api/notes/notaInexistente');
  expect(response.status).toBe(404);
  expect(response.body.error).toBe('Nota no encontrada');
});
