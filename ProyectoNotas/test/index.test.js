import request from 'supertest';
import app from '../src/app.js'; // Ajusta la ruta de acuerdo a tu estructura

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
});
