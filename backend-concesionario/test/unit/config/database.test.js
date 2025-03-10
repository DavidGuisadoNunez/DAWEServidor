import mongoose from 'mongoose';
import connectDB from '../../../src/config/database.js';
import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';

describe('Database Connection', () => {
  beforeAll(async () => {
    try {
      await connectDB();
    } catch (error) {
      console.error('⚠️ Error en la conexión a MongoDB durante el test:', error);
    }
  });

  test('Debe conectar con MongoDB correctamente', async () => {
    expect(mongoose.connection.readyState).toBe(1); // 1 significa "Conectado"
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
