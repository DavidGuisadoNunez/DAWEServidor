import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../../../src/models/User.js';
import { describe, beforeAll, afterAll, test, expect } from '@jest/globals';

dotenv.config();

describe('User Model Unit Tests', () => {
  beforeAll(async () => {
    if (!process.env.MONGO_URI) {
      throw new Error('❌ Error: MONGO_URI no está definido en el archivo .env');
    }

    await mongoose.connect(process.env.MONGO_URI);
    await User.deleteMany();
  }, 20000); // Timeout 20s

  afterAll(async () => {
    await User.deleteMany();
    await mongoose.connection.close();
  }, 20000);

  test('✅ Debe crear un usuario válido', async () => {
    const user = new User({
      firstName: 'David',
      lastName: 'Guisado',
      email: 'david@example.com',
      password: 'securePass123',
    });

    const savedUser = await user.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.email).toBe('david@example.com');
  });

  test('❌ No debe crear un usuario con email inválido', async () => {
    const user = new User({
      firstName: 'David',
      lastName: 'Guisado',
      email: 'invalid-email', // No es un email válido
      password: 'securePass123',
    });

    await expect(user.validate()).rejects.toThrow(/El email ingresado no es válido/);
  });

  test('❌ No debe crear un usuario con password menor a 6 caracteres', async () => {
    const user = new User({
      firstName: 'David',
      lastName: 'Guisado',
      email: 'user5@example.com',
      password: '123', // Menos de 6 caracteres
    });

    await expect(user.validate()).rejects.toThrow(/La contraseña debe tener al menos 6 caracteres/);
  });

  test('❌ No debe crear un usuario con email duplicado', async () => {
    const user1 = new User({
      firstName: 'David',
      lastName: 'Guisado',
      email: 'duplicate@example.com',
      password: 'securePass123',
    });

    const user2 = new User({
      firstName: 'Otro',
      lastName: 'Usuario',
      email: 'duplicate@example.com', // Mismo email
      password: 'securePass123',
    });

    await user1.save();
    await expect(user2.save()).rejects.toThrow();
  });
});
