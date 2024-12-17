import request from 'supertest';
import jest from 'jest';
import { expect } from '@jest/globals';
import express from 'express';
import app from '../app.js';
import errorHandlerMiddleware from '../middlewares/errorHandlerMiddleware.js';

jest.mock('swagger-ui-express');
jest.mock('../routes/notesRoutes.js', () => express.Router());
jest.mock('../middlewares/globalsMiddlewares.js');

describe('Express App Configuration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    describe('Dummy Test', () => {
      it('should pass', () => {
        expect(true).toBe(true);
      });
    });
  });

  describe('Middlewares', () => {
    it('should apply global middlewares correctly', async () => {
      const res = await request(app).get('/api/notes');
      expect(res.status).not.toBe(500); // Se espera que el middleware funcione sin errores
    });

    it('should apply CORS middleware', async () => {
      const res = await request(app).get('/api/notes');
      expect(res.header['access-control-allow-origin']).toBe('*');
    });

    it('should log requests using requestLogger', async () => {
      console.log = jest.fn(); // Mock del console.log usado en el logger
      await request(app).get('/api/notes');
      expect(console.log).toHaveBeenCalled(); // Verifica que se registre la petición
    });

    it('should parse JSON and URL-encoded bodies', async () => {
      const jsonResponse = await request(app)
        .post('/api/notes')
        .send({ key: 'value' })
        .set('Content-Type', 'application/json');

      expect(jsonResponse.status).not.toBe(500);

      const urlEncodedResponse = await request(app)
        .post('/api/notes')
        .send('key=value')
        .set('Content-Type', 'application/x-www-form-urlencoded');

      expect(urlEncodedResponse.status).not.toBe(500);
    });
  });

  describe('Routes', () => {
    it('should return 404 for unknown routes', async () => {
      const res = await request(app).get('/unknown-route');
      expect(res.status).toBe(404);
      const errorRoute = express.Router();
      errorRoute.get('/error', (req, _, next) => {
        const error = new Error('Test error');
        error.status = 500;
        next(error);
      });
      errorRoute.get('/error', (req, res, next) => {
        const error = new Error('Test error');
        error.status = 500;
        next(error);
      });

      app.use('/test-error', errorRoute);
      app.use(errorHandlerMiddleware);

      const errorRes = await request(app).get('/test-error');
      expect(errorRes.status).toBe(500);
      expect(errorRes.body).toEqual({
        error: 'Internal Server Error',
        details: 'Test error',
      });
    });
  });

  describe('Swagger UI', () => {
    it('should load Swagger documentation', async () => {
      const res = await request(app).get('/openapi/doc');
      expect(res.status).toBe(200);
    });
  });
});
