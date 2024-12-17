import errorHandler from '../middlewares/errorHandler.js';
import logger from '../utils/logger.js';
import { jest, expect } from '@jest/globals';

jest.mock('../utils/logger.js', () => ({
  error: jest.fn(),
}));

describe('Error Handler Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    jest.clearAllMocks();
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    next = jest.fn();
  });

  it('should log the error and send a 500 response by default', () => {
    const error = new Error('Internal Server Error');

    errorHandler(error, req, res, next);

    expect(logger.error).toHaveBeenCalledWith('[500] Internal Server Error');
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      code: 500,
      message: 'Internal Server Error',
    });
  });

  it('should use the error status if provided', () => {
    const error = { status: 404, message: 'Not Found' };

    errorHandler(error, req, res, next);

    expect(logger.error).toHaveBeenCalledWith('[404] Not Found');
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({
      code: 404,
      message: 'Not Found',
    });
  });

  it('should handle missing error message gracefully', () => {
    const error = { status: 400 };

    errorHandler(error, req, res, next);

    expect(logger.error).toHaveBeenCalledWith('[400] undefined');
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      code: 400,
      message: undefined,
    });
  });
});
