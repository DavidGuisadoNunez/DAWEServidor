import express from 'express';
import * as userController from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', userController.createUser);
router.get('/', authMiddleware, userController.getAllUsers); // Protegida
router.get('/:id', authMiddleware, userController.getUserById); // Protegida
router.put('/:id', authMiddleware, userController.updateUser); // Protegida
router.delete('/:id', authMiddleware, userController.deleteUser);

export default router;
