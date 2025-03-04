import * as authService from '../services/authService.js';
import ApiError from '../utils/errorHandler.js';
import { sendEmail } from '../utils/mailer.js';

/**
 * Registro de usuario
 */
export const register = async (req, res, next) => {
  try {
    const { firstName, email, password } = req.body;

    if (!firstName || !email || !password) {
      return next(new ApiError(400, 'Todos los campos son obligatorios'));
    }

    const user = await authService.registerUser(req.body);

    // Enviar email de bienvenida
    await sendEmail(
      email,
      'Bienvenido a Guisauto 🚗',
      `Hola ${firstName}, gracias por registrarte en Guisauto.`,
      `<h1>Hola ${firstName}!</h1><p>Gracias por registrarte en <strong>Guisauto</strong>. Disfruta de nuestros servicios de alquiler de vehículos.</p>`
    );

    res.status(201).json({ success: true, data: user });
  } catch (error) {
    next(new ApiError(500, 'Error en el registro de usuario'));
  }
};

/**
 * Login de usuario
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ApiError(400, 'Email y contraseña son obligatorios'));
    }

    const { user, accessToken, refreshToken } = await authService.loginUser(email, password);

    // Guardar el Refresh Token en la base de datos
    user.refreshToken = refreshToken;
    await user.save();

    res.status(200).json({ success: true, data: { user, accessToken, refreshToken } });
  } catch (error) {
    next(new ApiError(401, 'Credenciales incorrectas'));
  }
};
