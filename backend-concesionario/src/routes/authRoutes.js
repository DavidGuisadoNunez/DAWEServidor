import express from 'express';
import * as authController from '../controllers/authController.js';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware.js';
import * as authService from '../services/authService.js';

const router = express.Router();

router.post('/register', authMiddleware, adminMiddleware, authController.register);
router.post('/login', authController.login);
router.post('/refresh-token', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const { accessToken } = await authService.refreshAccessToken(refreshToken);
    res.status(200).json({ success: true, data: { accessToken } });
  } catch (error) {
    res.status(403).json({ success: false, message: error.message });
  }
});

export default router;
