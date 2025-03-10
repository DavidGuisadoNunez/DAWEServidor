import express from 'express';
import * as authController from '../controllers/authController.js';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * Rutas de autenticación
 */
router.post('/register', authMiddleware, adminMiddleware, authController.register);
router.post('/login', authController.login);
router.post('/refresh-token', authMiddleware, authController.refreshToken);

export default router;
