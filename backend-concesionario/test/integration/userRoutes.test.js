import request from 'supertest';
import mongoose from 'mongoose';
import User from '../../src/models/User.js';
import { jest, beforeAll, afterAll, describe, test, expect } from '@jest/globals';

// Cargar la aplicación Express dinámicamente
let app;
beforeAll(async () => {
  const module = await import('../../app.js');
  app = module.default;
});

// Aumentar el timeout de Jest para evitar fallos por tiempo de espera
jest.setTimeout(30000);

describe('User Routes Integration Tests', () => {
  let userToken = '';
  let testUserId = '';

  beforeAll(async () => {
    try {
      await User.deleteMany({});

      // Crear usuario de prueba con los campos requeridos
      const newUser = new User({
        firstName: 'Test',
        lastName: 'User',
        email: 'testuser@example.com',
        password: 'securepassword',
      });
      const savedUser = await newUser.save();
      testUserId = savedUser._id.toString();

      // Obtener token de autenticación
      const authResponse = await request(app)
        .post('/api/auth/login')
        .send({ email: 'testuser@example.com', password: 'securepassword' });

      userToken = authResponse.body.token;
    } catch (error) {
      console.error('Error en beforeAll:', error);
    }
  }, 20000);

  afterAll(async () => {
    try {
      await User.deleteMany({});
      await mongoose.connection.close();
    } catch (error) {
      console.error('Error en afterAll:', error);
    }
  });

  test('🔵 Crear un usuario', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        firstName: 'Nuevo',
        lastName: 'Usuario',
        email: 'nuevo.usuario@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty('_id');
  });

  test('🟢 Obtener todos los usuarios (protegido)', async () => {
    const response = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  test('🟢 Obtener un usuario por ID (protegido)', async () => {
    const response = await request(app)
      .get(`/api/users/${testUserId}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('_id', testUserId);
  });

  test('🔴 Eliminar usuario (solo admin)', async () => {
    const response = await request(app)
      .delete(`/api/users/${testUserId}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.status).toBe(403); // Código 403 si no es admin
  });
});
