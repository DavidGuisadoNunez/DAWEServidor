import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import config from '../config.js';

const SECRET_MESSAGE_HASH = config.security.SECRET_MESSAGE_HASH;
const JWT_SECRET = config.security.JWT_SECRET;

// Middleware para validar tokens y roles
const validateTokenMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No hay Token' });
    }

    // Decodificar el token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Validar mensaje secreto
    if (!decoded.message || !decoded.role) {
      return res.status(401).json({ error: 'Token inválido: falta información' });
    }

    const isValid = await bcrypt.compare(decoded.message, SECRET_MESSAGE_HASH);
    if (!isValid) {
      return res.status(401).json({ error: 'Acceso no autorizado: mensaje inválido' });
    }

    // Adjuntar rol al objeto `req` para usarlo en las rutas
    req.userRole = decoded.role;

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Token inválido' });
    }
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Middleware para roles específicos
const requireRole = (role) => (req, res, next) => {
  if (req.userRole !== role) {
    return res.status(403).json({ error: 'Acceso prohibido: rol insuficiente' });
  }
  next();
};

export { validateTokenMiddleware as default, requireRole };
