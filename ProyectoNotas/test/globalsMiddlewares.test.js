import request from 'supertest';
import express from 'express';
import { expect } from '@jest/globals';
import {
  corsMiddleware,
  jsonMiddleware,
  urlencodedMiddleware,
  parseQueryMiddleware,
  notFoundMiddleware,
  errorHandlerMiddleware,
} from '../middlewares/globalMiddlewares.js';

describe('Global Middlewares Tests', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(corsMiddleware);
    app.use(jsonMiddleware);
    app.use(urlencodedMiddleware);
    app.use(parseQueryMiddleware);
  });

  describe('CORS Middleware', () => {
    it('should allow requests from any origin', async () => {
      app.get('/test-cors', (req, res) => res.json({ success: true }));

      const res = await request(app).get('/test-cors');
      expect(res.status).toBe(200);
      expect(res.headers['access-control-allow-origin']).toBe('*');
    });
  });

  describe('JSON Middleware', () => {
    it('should parse JSON request bodies', async () => {
      app.post('/test-json', (req, res) => res.json(req.body));

      const res = await request(app)
        .post('/test-json')
        .send({ key: 'value' })
        .set('Content-Type', 'application/json');

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ key: 'value' });
    });
  });

  describe('URL-Encoded Middleware', () => {
    it('should parse URL-encoded request bodies', async () => {
      app.post('/test-urlencoded', (req, res) => res.json(req.body));

      const res = await request(app)
        .post('/test-urlencoded')
        .send('key=value')
        .set('Content-Type', 'application/x-www-form-urlencoded');

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ key: 'value' });
    });
  });

  describe('Parse Query Middleware', () => {
    it('should parse nested query parameters', async () => {
      app.get('/test-query', (req, res) => res.json(req.query));

      const res = await request(app).get('/test-query?key[subkey]=value');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ key: { subkey: 'value' } });
    });
  });

  describe('Not Found Middleware', () => {
    it('should return 404 for unknown routes', async () => {
      app.use(notFoundMiddleware);

      const res = await request(app).get('/nonexistent-route');
      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: 'Not Found' });
    });
  });

  describe('Error Handler Middleware', () => {
    it('should handle errors and return 500', async () => {
      app.get('/error', (req, res, next) => {
        const error = new Error('Test Error');
        next(error);
      });
      app.use(errorHandlerMiddleware);

      const res = await request(app).get('/error');
      expect(res.status).toBe(500);
      expect(res.body).toEqual({
        error: 'Internal Server Error',
        details: 'Test Error',
      });
    });
  });
});
