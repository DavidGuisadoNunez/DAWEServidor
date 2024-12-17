import requestLogger from '../middlewares/requestLogger.js';
import jest from 'jest-mock';
import logger from '../utils/logger.js';
import { expect } from '@jest/globals';

jest.mock('../utils/logger.js', () => ({
  info: jest.fn(),
}));

describe('Request Logger Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    jest.clearAllMocks();
    req = {
      method: 'GET',
      url: '/test',
      body: { key: 'value' },
      query: { page: '1' },
      params: { id: '123' },
    };
    res = {};
    next = jest.fn();
  });

  it('should log the request details and call next()', () => {
    requestLogger(req, res, next);

    const expectedMessage = `Request: GET /test - Body: ${JSON.stringify(req.body)} - Query: ${JSON.stringify(req.query)} - Params: ${JSON.stringify(req.params)}`;

    expect(logger.info).toHaveBeenCalledWith(expectedMessage);
    expect(next).toHaveBeenCalled();
  });

  it('should handle empty request data gracefully', () => {
    req = {
      method: 'POST',
      url: '/empty',
      body: {},
      query: {},
      params: {},
    };

    requestLogger(req, res, next);

    const expectedMessage = 'Request: POST /empty - Body: {} - Query: {} - Params: {}';

    expect(logger.info).toHaveBeenCalledWith(expectedMessage);
    expect(next).toHaveBeenCalled();
  });
});
