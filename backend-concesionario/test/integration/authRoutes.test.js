import request from 'supertest';
import express from 'express';
import authRoutes from '../../src/routes/authRoutes.js';
import * as authController from '../../src/controllers/authController.js';
import * as authService from '../../src/services/authService.js';

// Aplicación de Express para pruebas
const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

jest.mock('../../src/controllers/authController.js');
jest.mock('../../src/services/authService.js');

beforeAll(() => {
  jest.mock('../../src/middlewares/authMiddleware.js', () => ({
    authMiddleware: jest.fn((req, res, next) => next()),
    adminMiddleware: jest.fn((req, res, next) => next()),
  }));
});

describe('Auth Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/auth/register', () => {
    it('debe registrar un usuario si el admin está autenticado', async () => {
      authController.register.mockImplementation(async (req, res) => {
        res.status(201).json({ success: true, data: { id: 'mockUserId' } });
      });

      const response = await request(app)
        .post('/api/auth/register')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          password: 'securepassword',
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('id', 'mockUserId');
    });
  });

  describe('POST /api/auth/login', () => {
    it('debe autenticar al usuario y devolver tokens', async () => {
      authController.login.mockImplementation(async (req, res) => {
        res.status(200).json({
          success: true,
          data: {
            accessToken: 'mockAccessToken',
            refreshToken: 'mockRefreshToken',
          },
        });
      });

      const response = await request(app).post('/api/auth/login').send({
        email: 'john@example.com',
        password: 'securepassword',
      });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('accessToken', 'mockAccessToken');
      expect(response.body.data).toHaveProperty('refreshToken', 'mockRefreshToken');
    });
  });

  describe('POST /api/auth/refresh-token', () => {
    it('debe refrescar el token si el refresh token es válido', async () => {
      authService.refreshAccessToken.mockResolvedValue({
        accessToken: 'newAccessToken',
      });

      const response = await request(app).post('/api/auth/refresh-token').send({
        refreshToken: 'validRefreshToken',
      });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('accessToken', 'newAccessToken');
    });

    it('debe devolver un error si el refresh token es inválido', async () => {
      authService.refreshAccessToken.mockRejectedValue(new Error('Refresh token inválido'));

      const response = await request(app).post('/api/auth/refresh-token').send({
        refreshToken: 'invalidToken',
      });

      expect(response.status).toBe(403);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Refresh token inválido');
    });
  });
});
