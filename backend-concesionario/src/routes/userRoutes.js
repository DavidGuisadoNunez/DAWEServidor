import express from 'express';
import * as userController from '../controllers/userController.js';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', userController.createUser);
router.get('/', authMiddleware, userController.getAllUsers); // Protegida
router.get('/:id', authMiddleware, userController.getUserById); // Protegida
router.put('/:id', authMiddleware, userController.updateUser); // Protegida
router.delete('/:id', authMiddleware, adminMiddleware, userController.deleteUser); // Solo admin

export default router;
