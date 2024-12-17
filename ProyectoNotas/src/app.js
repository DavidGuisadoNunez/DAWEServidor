import express from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import yaml from 'js-yaml';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import notesRoutes from './routes/notesRoutes.js';
import {
  corsMiddleware,
  jsonMiddleware,
  urlencodedMiddleware,
  parseQueryMiddleware,
  notFoundMiddleware,
  errorHandlerMiddleware
} from './middlewares/globalsMiddlewares.js';

const swaggerProyectoNotasAPI = yaml.load(fs.readFileSync(path.resolve('src/openapi/Swagger_ProyectoNotas_API.yaml'), 'utf8'));

dotenv.config();

const app = express();

// Configurar CORS
app.use(corsMiddleware);

// Middleware globales
app.use(jsonMiddleware);
app.use(urlencodedMiddleware);

// Middleware para parsear parámetros anidados
app.use(parseQueryMiddleware);

// Rutas principales
app.use('/api/notes', notesRoutes);

app.use('/openapi/doc', swaggerUi.serve, swaggerUi.setup(swaggerProyectoNotasAPI));

// Middleware para manejar rutas no encontradas
app.use(notFoundMiddleware);

// Middleware de manejo de errores
app.use(errorHandlerMiddleware);

export default app;
