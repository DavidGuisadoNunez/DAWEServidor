import * as authController from '../../../src/controllers/authController.js';
import * as authService from '../../../src/services/authService.js';
import ApiError from '../../../src/utils/errorHandler.js';
import { sendEmail } from '../../../src/utils/mailer.js';
import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';

// Mock de `authService` y `sendEmail`
jest.mock('../../../src/services/authService.js');
jest.mock('../../../src/utils/mailer.js');

describe('Auth Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('debe retornar error 400 si faltan campos obligatorios', async () => {
      req.body = { firstName: 'John', email: '' }; // Falta la contraseña

      await authController.register(req, res, next);

      expect(next).toHaveBeenCalledWith(new ApiError(400, 'Todos los campos son obligatorios'));
    });

    it('debe registrar un usuario y enviar email de bienvenida', async () => {
      req.body = { firstName: 'John', email: 'john@example.com', password: '123456' };
      const mockUser = { id: '1', firstName: 'John', email: 'john@example.com' };

      authService.registerUser.mockResolvedValue(mockUser);
      sendEmail.mockResolvedValue(true);

      await authController.register(req, res, next);

      expect(authService.registerUser).toHaveBeenCalledWith(req.body);
      expect(sendEmail).toHaveBeenCalledWith(
        'john@example.com',
        'Bienvenido a Guisauto 🚗',
        expect.any(String),
        expect.any(String)
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ success: true, data: mockUser });
    });

    it('debe manejar errores internos y llamar a next con ApiError', async () => {
      req.body = { firstName: 'John', email: 'john@example.com', password: '123456' };
      authService.registerUser.mockRejectedValue(new Error('Error interno'));

      await authController.register(req, res, next);

      expect(next).toHaveBeenCalledWith(new ApiError(500, 'Error en el registro de usuario'));
    });
  });

  describe('login', () => {
    it('debe retornar error 400 si faltan email o contraseña', async () => {
      req.body = { email: 'john@example.com', password: '' };

      await authController.login(req, res, next);

      expect(next).toHaveBeenCalledWith(new ApiError(400, 'Email y contraseña son obligatorios'));
    });

    it('debe hacer login y devolver tokens', async () => {
      req.body = { email: 'john@example.com', password: '123456' };
      const mockUser = { id: '1', email: 'john@example.com', save: jest.fn() };
      const mockTokens = { accessToken: 'access123', refreshToken: 'refresh123' };

      authService.loginUser.mockResolvedValue({ user: mockUser, ...mockTokens });

      await authController.login(req, res, next);

      expect(authService.loginUser).toHaveBeenCalledWith('john@example.com', '123456');
      expect(mockUser.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: { user: mockUser, accessToken: 'access123', refreshToken: 'refresh123' }
      });
    });

    it('debe manejar credenciales incorrectas con ApiError', async () => {
      req.body = { email: 'john@example.com', password: 'wrongpass' };
      authService.loginUser.mockRejectedValue(new Error('Credenciales incorrectas'));

      await authController.login(req, res, next);

      expect(next).toHaveBeenCalledWith(new ApiError(401, 'Credenciales incorrectas'));
    });
  });
});
