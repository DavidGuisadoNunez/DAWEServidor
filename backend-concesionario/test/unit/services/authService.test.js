import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../../src/models/User.js';
import { registerUser, loginUser, refreshAccessToken } from '../../../src/services/authService.js';
import { jest, describe, it, expect, beforeEach } from '@jest/globals';

// Mock de dependencias
jest.mock('../../../src/models/User.js');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('registerUser', () => {
    it('debe registrar un usuario nuevo', async () => {
      const mockUserData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'securepassword',
        role: 'user',
      };

      User.findOne.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue('hashedPassword');
      User.prototype.save = jest.fn().mockResolvedValue();
      jwt.sign.mockReturnValue('mockToken');

      const result = await registerUser(mockUserData);

      expect(User.findOne).toHaveBeenCalledWith({ email: mockUserData.email });
      expect(bcrypt.hash).toHaveBeenCalledWith(mockUserData.password, 10);
      expect(User.prototype.save).toHaveBeenCalled();
      expect(jwt.sign).toHaveBeenCalled();
      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('token', 'mockToken');
    });

    it('debe lanzar error si el email ya está registrado', async () => {
      User.findOne.mockResolvedValue({ email: 'john@example.com' });

      await expect(registerUser({ email: 'john@example.com', password: '123456' }))
        .rejects.toThrow('El email ya está registrado');
    });
  });

  describe('loginUser', () => {
    it('debe autenticar a un usuario y devolver tokens', async () => {
      const mockUser = {
        _id: 'mockUserId',
        email: 'john@example.com',
        password: 'hashedPassword',
        role: 'user',
      };

      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('mockAccessToken');

      const result = await loginUser(mockUser.email, 'securepassword');

      expect(User.findOne).toHaveBeenCalledWith({ email: mockUser.email });
      expect(bcrypt.compare).toHaveBeenCalledWith('securepassword', mockUser.password);
      expect(jwt.sign).toHaveBeenCalled();
      expect(result).toHaveProperty('accessToken', 'mockAccessToken');
    });

    it('debe lanzar error si el usuario no existe', async () => {
      User.findOne.mockResolvedValue(null);

      await expect(loginUser('unknown@example.com', 'password'))
        .rejects.toThrow('Usuario no encontrado');
    });

    it('debe lanzar error si la contraseña es incorrecta', async () => {
      const mockUser = { email: 'john@example.com', password: 'hashedPassword' };

      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(false);

      await expect(loginUser(mockUser.email, 'wrongpassword'))
        .rejects.toThrow('Contraseña incorrecta');
    });
  });

  describe('refreshAccessToken', () => {
    it('debe generar un nuevo token de acceso si el refresh token es válido', async () => {
      const mockUser = { _id: 'mockUserId', role: 'user', refreshToken: 'validRefreshToken' };

      User.findOne.mockResolvedValue(mockUser);
      jwt.verify.mockReturnValue({ userId: mockUser._id });
      jwt.sign.mockReturnValue('newAccessToken');

      const result = await refreshAccessToken('validRefreshToken');

      expect(User.findOne).toHaveBeenCalledWith({ refreshToken: 'validRefreshToken' });
      expect(jwt.verify).toHaveBeenCalledWith('validRefreshToken', process.env.JWT_REFRESH_SECRET);
      expect(jwt.sign).toHaveBeenCalled();
      expect(result).toHaveProperty('accessToken', 'newAccessToken');
    });

    it('debe lanzar error si el refresh token es inválido', async () => {
      User.findOne.mockResolvedValue(null);

      await expect(refreshAccessToken('invalidToken'))
        .rejects.toThrow('Refresh token inválido');
    });

    it('debe lanzar error si el refresh token ha expirado', async () => {
      const mockUser = { refreshToken: 'expiredToken' };

      User.findOne.mockResolvedValue(mockUser);
      jwt.verify.mockImplementation(() => { throw new Error('Token expirado'); });

      await expect(refreshAccessToken('expiredToken'))
        .rejects.toThrow('Refresh token expirado o inválido');
    });
  });
});
