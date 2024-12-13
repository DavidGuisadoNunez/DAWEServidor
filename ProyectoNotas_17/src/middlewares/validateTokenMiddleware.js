import jwt from 'jsonwebtoken';
import config from '../config.js';

const JWT_SECRET = config.security.JWT_SECRET;

// Middleware para validar tokens
const validateTokenMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: 'No hay Token' });
        }

        // Decodificar el token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Adjuntar información decodificada al objeto `req` para usarlo en las rutas
        req.user = decoded;
        
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Token inválido' });
        }
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

export { validateTokenMiddleware as default };
