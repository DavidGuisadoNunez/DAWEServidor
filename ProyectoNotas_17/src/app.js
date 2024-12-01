import express from 'express';
import dotenv from 'dotenv';
import { logger } from './utils/logger.js';
import notesRoutes from './routes/notesRoutes.js';

// Cargar las variables de entorno
dotenv.config();

const app = express();

// Middleware de JSON
app.use(express.json());

// Middleware de logger
app.use((req, res, next) => {
    logger.info(`Request: ${req.method} ${req.originalUrl}`);
    next();
});

// Rutas
app.use('/api/notes', notesRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
    logger.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
});

export default app;
