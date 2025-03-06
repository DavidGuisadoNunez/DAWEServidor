import bcrypt from 'bcryptjs';
import User from '../../../src/models/User.js';
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from '../../../src/services/userService.js';
import { jest, describe, it, expect, beforeEach } from '@jest/globals';

// Mock de dependencias
jest.mock('../../../src/models/User.js');
jest.mock('bcryptjs');

describe('UserService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('debe crear un usuario nuevo', async () => {
      const mockUserData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'securepassword',
      };

      User.findOne.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue('hashedPassword');
      User.prototype.save = jest.fn().mockResolvedValue(mockUserData);

      const result = await createUser(mockUserData);

      expect(User.findOne).toHaveBeenCalledWith({ email: mockUserData.email });
      expect(bcrypt.hash).toHaveBeenCalledWith(mockUserData.password, 10);
      expect(User.prototype.save).toHaveBeenCalled();
      expect(result).toEqual(mockUserData);
    });

    it('debe lanzar error si el email ya está registrado', async () => {
      User.findOne.mockResolvedValue({ email: 'john@example.com' });

      await expect(createUser({ email: 'john@example.com', password: '123456' }))
        .rejects.toThrow('El email ya está registrado');
    });
  });

  describe('getAllUsers', () => {
    it('debe devolver todos los usuarios sin contraseña', async () => {
      const mockUsers = [
        { _id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
        { _id: '2', firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com' }
      ];

      User.find.mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUsers), // Corrige el error del select()
      });

      const result = await getAllUsers();

      expect(User.find).toHaveBeenCalled();
      expect(result).toEqual(mockUsers);
    });
  });

  describe('getUserById', () => {
    it('debe obtener un usuario por ID', async () => {
      const mockUser = { _id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com' };

      User.findById.mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUser),
      });

      const result = await getUserById('1');

      expect(User.findById).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockUser);
    });

    it('debe lanzar error si el usuario no existe', async () => {
      User.findById.mockReturnValue({
        select: jest.fn().mockResolvedValue(null),
      });

      await expect(getUserById('invalid-id'))
        .rejects.toThrow('Usuario no encontrado');
    });
  });

  describe('updateUser', () => {
    it('debe actualizar un usuario existente', async () => {
      const mockUpdatedUser = { _id: '1', firstName: 'John Updated', lastName: 'Doe', email: 'john@example.com' };

      User.findByIdAndUpdate.mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUpdatedUser),
      });

      const result = await updateUser('1', { firstName: 'John Updated' });

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith('1', { firstName: 'John Updated' }, { new: true });
      expect(result).toEqual(mockUpdatedUser);
    });

    it('debe lanzar error si el usuario no existe', async () => {
      User.findByIdAndUpdate.mockReturnValue({
        select: jest.fn().mockResolvedValue(null),
      });

      await expect(updateUser('invalid-id', { firstName: 'John Updated' }))
        .rejects.toThrow('Usuario no encontrado');
    });
  });

  describe('deleteUser', () => {
    it('debe eliminar un usuario existente', async () => {
      const mockUser = { _id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com' };

      User.findByIdAndDelete.mockResolvedValue(mockUser);

      const result = await deleteUser('1');

      expect(User.findByIdAndDelete).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockUser);
    });

    it('debe lanzar error si el usuario no existe', async () => {
      User.findByIdAndDelete.mockResolvedValue(null);

      await expect(deleteUser('invalid-id'))
        .rejects.toThrow('Usuario no encontrado');
    });
  });
});
