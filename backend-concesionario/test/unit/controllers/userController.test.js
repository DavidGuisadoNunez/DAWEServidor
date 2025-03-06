import * as userController from '../../../src/controllers/userController.js';
import * as userService from '../../../src/services/userService.js';
import User from '../../../src/models/User.js';
import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';

// Mock de userService y User
jest.mock('../../../src/services/userService.js');
jest.mock('../../../src/models/User.js');

describe('User Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {}, params: {}, query: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('debe crear un usuario correctamente', async () => {
      req.body = { firstName: 'John', email: 'john@example.com', password: '123456' };
      const mockUser = { id: '1', ...req.body };

      userService.createUser.mockResolvedValue(mockUser);

      await userController.createUser(req, res);

      expect(userService.createUser).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ success: true, data: mockUser });
    });

    it('debe manejar errores y retornar 400', async () => {
      req.body = { firstName: 'John' }; // Falta email y password
      userService.createUser.mockRejectedValue(new Error('Datos inválidos'));

      await userController.createUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Datos inválidos' });
    });
  });

  describe('getAllUsers', () => {
    it('debe obtener usuarios con paginación', async () => {
      req.query = { page: '1', limit: '2' };
      const mockUsers = [{ id: '1', email: 'a@example.com' }, { id: '2', email: 'b@example.com' }];

      User.countDocuments.mockResolvedValue(10);
      User.find.mockImplementation(() => ({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue(mockUsers)
      }));

      await userController.getAllUsers(req, res);

      expect(User.countDocuments).toHaveBeenCalled();
      expect(User.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: mockUsers,
        pagination: expect.objectContaining({ total: 10, page: 1, limit: 2, totalPages: 5 })
      });
    });

    it('debe manejar errores internos con status 500', async () => {
      User.find = jest.fn().mockImplementation(() => ({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockRejectedValue(new Error('Error interno'))
      }));

      await userController.getAllUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Error obteniendo usuarios',
        error: 'Error interno'
      });
    });
  });

  describe('getUserById', () => {
    it('debe devolver un usuario si existe', async () => {
      req.params.id = '1';
      const mockUser = { id: '1', email: 'john@example.com' };

      User.findById.mockResolvedValue(mockUser);

      await userController.getUserById(req, res, next);

      expect(User.findById).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: true, data: mockUser });
    });

    it('debe retornar 404 si el usuario no existe', async () => {
      req.params.id = '1';
      User.findById.mockResolvedValue(null);

      await userController.getUserById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Usuario no encontrado' });
    });
  });

  describe('updateUser', () => {
    it('debe actualizar un usuario y devolver 200', async () => {
      req.params.id = '1';
      req.body = { firstName: 'Updated' };
      const mockUser = { id: '1', ...req.body };

      userService.updateUser.mockResolvedValue(mockUser);

      await userController.updateUser(req, res);

      expect(userService.updateUser).toHaveBeenCalledWith('1', req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: true, data: mockUser });
    });

    it('debe manejar errores y retornar 404', async () => {
      req.params.id = '99';
      userService.updateUser.mockRejectedValue(new Error('Usuario no encontrado'));

      await userController.updateUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Usuario no encontrado' });
    });
  });

  describe('deleteUser', () => {
    it('debe eliminar un usuario y devolver 200', async () => {
      req.params.id = '1';
      const mockUser = { id: '1', email: 'john@example.com' };

      User.findByIdAndDelete.mockResolvedValue(mockUser);

      await userController.deleteUser(req, res, next);

      expect(User.findByIdAndDelete).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: true, message: 'Usuario eliminado' });
    });

    it('debe retornar 404 si el usuario no existe', async () => {
      req.params.id = '99';
      User.findByIdAndDelete.mockResolvedValue(null);

      await userController.deleteUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Usuario no encontrado' });
    });
  });
});
