import express from 'express';
import * as authController from '../controllers/authController.js';

const router = express.Router();

/**
 * Rutas de autenticación
 */
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh-token', authController.refreshToken);

export default router;
