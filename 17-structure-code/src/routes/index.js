import express from 'express';
import { middlewareController, errorController } from '../controllers/index.js';
import { logMDW } from '../middlewares/logger-middleware.js';

const router = express.Router();

router.get('/middleware', logMDW, middlewareController);
router.get('/error', errorController);
router.get('/ping', (req, res) => {
  res.send('pong');
});

router.get('/fibonacci/:number', (req, res) => {
  const number = parseInt(req.params.number, 10);
  if (isNaN(number) || number < 0) {
    return res.status(400).send('Invalid number');
  }

  // Implementación iterativa para evitar problemas de rendimiento
  const fibonacci = (n) => {
    if (n === 0) return 0;
    if (n === 1) return 1;
    let prev = 0; let current = 1;
    for (let i = 2; i <= n; i++) {
      const next = prev + current;
      prev = current;
      current = next;
    }
    return current;
  };
  res.send({ result: fibonacci(number) });
});

export default router;
