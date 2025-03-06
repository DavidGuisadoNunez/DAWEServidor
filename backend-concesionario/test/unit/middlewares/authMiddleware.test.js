import { authMiddleware, adminMiddleware } from '../../../src/middlewares/authMiddleware.js';
import jwt from 'jsonwebtoken';
import { jest, expect } from '@jest/globals';

// Mockeamos `jsonwebtoken`
jest.mock('jsonwebtoken');

describe('Auth Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = { header: jest.fn() };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('authMiddleware', () => {
    it('Debe permitir el acceso si el token es válido', () => {
      const mockToken = 'valid.token.here';
      const decodedToken = { userId: '12345', role: 'user' };

      req.header.mockReturnValue(`Bearer ${mockToken}`);
      jwt.verify.mockReturnValue(decodedToken);

      authMiddleware(req, res, next);

      expect(jwt.verify).toHaveBeenCalledWith(mockToken, process.env.JWT_SECRET);
      expect(req.user).toEqual(decodedToken);
      expect(next).toHaveBeenCalled();
    });

    it('Debe rechazar el acceso si no hay token', () => {
      req.header.mockReturnValue(null);

      authMiddleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Acceso denegado. No hay token' });
      expect(next).not.toHaveBeenCalled();
    });

    it('Debe rechazar el acceso si el token es inválido', () => {
      const mockToken = 'invalid.token';
      req.header.mockReturnValue(`Bearer ${mockToken}`);
      jwt.verify.mockImplementation(() => { throw new Error('Token inválido'); });

      authMiddleware(req, res, next);

      expect(jwt.verify).toHaveBeenCalledWith(mockToken, process.env.JWT_SECRET);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Token inválido' });
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('adminMiddleware', () => {
    it('Debe permitir el acceso si el usuario es admin', () => {
      req.user = { role: 'admin' };

      adminMiddleware(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it('Debe rechazar el acceso si el usuario no es admin', () => {
      req.user = { role: 'user' };

      adminMiddleware(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Acceso denegado. Se requieren permisos de administrador' });
      expect(next).not.toHaveBeenCalled();
    });
  });
});
