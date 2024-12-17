import logger from '../utils/logger.js';
import jest from 'jest-mock';
import { logDate, logMDW } from '../middleware/loggerMiddleware.js';
import { expect } from '@jest/globals';

describe('Middleware Logger Tests', () => {
  let req, res, next;

  beforeEach(() => {
    jest.clearAllMocks();
    req = { path: '/test' }; // Simula la petición
    res = {}; // Simula la respuesta
    next = jest.fn(); // Mock para next()
  });

  describe('logDate middleware', () => {
    it('should log the current date and request path', () => {
      logDate(req, res, next);

      expect(logger.info).toHaveBeenCalledWith(
        expect.stringMatching(/^(\[.*\]) \/test$/)
      );
      expect(next).toHaveBeenCalled(); // Verifica que next() fue llamado
    });
  });

  describe('logMDW middleware', () => {
    it('should log a warning message', () => {
      logMDW(req, res, next);

      expect(logger.warn).toHaveBeenCalledWith('middleware');
      expect(next).toHaveBeenCalled(); // Verifica que next() fue llamado
    });
  });
});
