import * as authService from '../services/authService.js';
import ApiError from '../utils/errorHandler.js';

/**
 * Registro de usuario
 */
export const register = async (req, res) => {
  try {
    const requesterRole = req.user?.role || 'user'; // Si no hay usuario, es "user"
    const { user, token } = await authService.registerUser(req.body, requesterRole);
    res.status(201).json({ success: true, data: { user, token } });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Login de usuario
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await authService.loginUser(email, password);

    // Guardar el Refresh Token en la base de datos
    user.refreshToken = refreshToken;
    await user.save();

    res.status(200).json({ success: true, data: { user, accessToken, refreshToken } });
  } catch (error) {
    next(new ApiError(401, 'Credenciales incorrectas'));
  }
};
