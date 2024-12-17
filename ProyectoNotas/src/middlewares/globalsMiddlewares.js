import cors from 'cors';
import express from 'express';
import qs from 'qs';

// Configurar CORS para permitir cualquier origen temporalmente
export const corsMiddleware = cors({
  origin: '*', // Permite solicitudes de cualquier origen (útil en desarrollo)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'] // Cabeceras permitidas
});

// Middleware globales
export const jsonMiddleware = express.json();
export const urlencodedMiddleware = express.urlencoded({ extended: true });

// Middleware para parsear parámetros anidados
export const parseQueryMiddleware = (req, res, next) => {
  req.query = qs.parse(req.query);
  next();
};

// Middleware para manejar rutas no encontradas
export const notFoundMiddleware = (req, res) => {
  res.status(404).json({ error: 'Not Found' });
};

// Middleware de manejo de errores
export const errorHandlerMiddleware = (err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
};
