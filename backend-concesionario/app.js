import express from 'express';
import cors from 'cors';
import userRoutes from './src/routes/userRoutes.js';
import authRoutes from './src/routes/authRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Middleware para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Ruta no encontrada' });
});

console.log('📌 Rutas registradas en Express:');
app._router.stack.forEach((r) => {
  if (r.route && r.route.path) {
    console.log(`✔ ${r.route.path}`);
  }
});

export default app;
