import express from 'express';
import cors from 'cors';
import userRoutes from './src/routes/userRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import morganMiddleware from './src/middlewares/loggerMiddleware.js';
import notFoundMiddleware from './src/middlewares/notFoundMiddleware.js';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { initializeDirectories } from './src/loaders/initializeDirectories.js';

const app = express();

initializeDirectories();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morganMiddleware);

// Rutas de la API
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Cargar y configurar Swagger desde src/openapi/
const swaggerPath = path.join(process.cwd(), 'src/openapi/Swagger_Guisauto_API.yaml');
const swaggerDocument = YAML.load(swaggerPath);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware para rutas no encontradas
app.use(notFoundMiddleware);

export default app;
