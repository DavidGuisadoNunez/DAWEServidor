import express from 'express';
import cors from 'cors';
import userRoutes from './src/routes/userRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import morganMiddleware from './src/middlewares/loggerMiddleware.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morganMiddleware);

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

export default app;
