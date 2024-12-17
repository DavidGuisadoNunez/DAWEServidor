import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import qs from 'qs'; // Para parámetros anidados
import notesRoutes from './routes/notesRoutes.js';
import fs from 'fs';
import yaml from 'js-yaml';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
const swaggerProyectoNotasAPI = yaml.load(fs.readFileSync(path.resolve('src/openapi/Swagger_ProyectoNotas_API.yaml'), 'utf8'));

dotenv.config();

const app = express();

// Configurar CORS para permitir cualquier origen temporalmente
app.use(cors({
  origin: '*', // Permite solicitudes de cualquier origen (útil en desarrollo)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'] // Cabeceras permitidas
}));

// Middleware globales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para parsear parámetros anidados
app.use((req, res, next) => {
  req.query = qs.parse(req.query);
  next();
});

// Rutas principales
app.use('/api/notes', notesRoutes);

app.use('/openapi/doc', swaggerUi.serve, swaggerUi.setup(swaggerProyectoNotasAPI));

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

export default app;
