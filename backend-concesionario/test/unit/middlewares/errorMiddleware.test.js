import { jest, expect } from '@jest/globals';

import errorMiddleware from '../../../src/middlewares/errorMiddleware.js';
import logger from '../../../src/utils/logger.js';

// Mockeamos el logger
jest.mock('../../../src/utils/logger.js', () => ({
  error: jest.fn(),
}));

describe('Error Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = { method: 'GET', originalUrl: '/test-route' };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Debe devolver el mensaje y código de estado si se proporciona un error con statusCode', () => {
    const error = { statusCode: 404, message: 'Recurso no encontrado' };

    errorMiddleware(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Recurso no encontrado' });
    expect(logger.error).toHaveBeenCalledWith('❌ [GET] /test-route | 404 - Recurso no encontrado');
  });

  it('Debe devolver 500 y el mensaje de error por defecto si no se proporciona statusCode', () => {
    const error = new Error('Algo salió mal');

    errorMiddleware(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Algo salió mal' });
    expect(logger.error).toHaveBeenCalledWith('❌ [GET] /test-route | 500 - Algo salió mal');
  });
});
