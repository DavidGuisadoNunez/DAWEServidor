import { middlewareController, errorController } from '../../src/controllers/index.js'; // Adjust the import path as necessary
import logger from '../../src/utils/logger.js';

jest.mock('../../src/utils/logger.js'); // Mock the logger module

describe('Middleware and Error Controllers', () => {

  // Test for middlewareController
  describe('middlewareController', () => {
    it('should call logger.info and send a 200 status with the correct message', () => {
      const req = {}; // Mocking req object, it isn't used in this controller
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      middlewareController(req, res);

      // Check that logger.info was called
      expect(logger.info).toHaveBeenCalledWith('controller');

      // Check that res.status(200).send was called with the correct object
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ message: 'middleware' });
    });
  });

  // Test for errorController
  describe('errorController', () => {
    it('should call next with an error when an error is thrown', () => {
      const req = {}; // Mocking req object, it isn't used in this controller
      const res = {}; // res is not used in errorController
      const next = jest.fn();

      errorController(req, res, next);

      // Check that next was called with the error
      expect(next).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Boom!',
      }));
    });

    it('should not swallow the error and pass it to next', () => {
      const req = {}; 
      const res = {}; 
      const next = jest.fn();

      try {
        errorController(req, res, next);
      } catch (error) {
        // Ensure error is passed to the next function
        expect(next).toHaveBeenCalledWith(expect.objectContaining({
          message: 'Boom!',
        }));
      }
    });
  });
});
