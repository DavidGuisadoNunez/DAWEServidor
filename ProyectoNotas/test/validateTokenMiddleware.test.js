import jwt from 'jsonwebtoken';
import jest from 'jest';
import validateTokenMiddleware from '../middlewares/validateTokenMiddleware.js';
import { expect } from '@jest/globals';

jest.mock('jsonwebtoken');

describe('validateTokenMiddleware Tests', () => {
  let req, res, next;

  beforeEach(() => {
    req = { headers: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  it('should return 401 if no token is provided', async () => {
    req.headers.authorization = '';

    await validateTokenMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'No hay Token' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 401 if token is invalid', async () => {
    req.headers.authorization = 'Bearer invalidToken';
    jwt.verify.mockImplementation(() => {
      throw new jwt.JsonWebTokenError('invalid token');
    });

    await validateTokenMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Token inválido' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 500 for other server errors', async () => {
    req.headers.authorization = 'Bearer someToken';
    jwt.verify.mockImplementation(() => {
      throw new Error('Some server error');
    });

    await validateTokenMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error en el servidor' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next and attach decoded user to req if token is valid', async () => {
    req.headers.authorization = 'Bearer validToken';
    const mockDecoded = { id: '123', email: 'test@example.com' };

    jwt.verify.mockReturnValue(mockDecoded);

    await validateTokenMiddleware(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith('validToken', expect.any(String));
    expect(req.user).toEqual(mockDecoded);
    expect(next).toHaveBeenCalled();
  });
});
