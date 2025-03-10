/**
 * Middleware para verificar el token JWT
 */
export const authMiddleware = (req, res, next) => {
  if (req.path === '/api/auth/register') {  // 🔹 Permitir el registro sin token
    return next();
  }

  const token = req.header('Authorization');
  if (!token) {
    return res.status(403).json({ success: false, message: 'Acceso denegado. No hay token' });
  }

  next();
};

/**
 * Middleware para verificar si el usuario es admin
 */
export const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Acceso denegado. Se requieren permisos de administrador' });
  }
  next();
};
