import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

/**
 * Registrar un nuevo usuario
 */
export const registerUser = async (userData, requesterRole = 'user') => {
  const { firstName, lastName, email, password, role } = userData;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('El email ya está registrado');
  }

  // Hashear la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  // Si quien crea el usuario es un admin, puede asignar el rol. Si no, se pone "user".
  const assignedRole = requesterRole === 'admin' && role ? role : 'user';

  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role: assignedRole,
  });

  await newUser.save();

  // Generar un token JWT
  const token = jwt.sign(
    { userId: newUser._id, role: newUser.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return { user: newUser, token };
};

/**
 * Login de usuario
 */
export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Contraseña incorrecta');
  }

  // Generar Access Token (JWT)
  const accessToken = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' } // Expira en 1 hora
  );

  // Generar Refresh Token
  const refreshToken = jwt.sign(
    { userId: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' } // Expira en 7 días
  );

  return { user, accessToken, refreshToken };
};

export const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new Error('No hay refresh token');
  }

  const user = await User.findOne({ refreshToken });
  if (!user) {
    throw new Error('Refresh token inválido');
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const newAccessToken = jwt.sign(
      { userId: decoded.userId, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return { accessToken: newAccessToken };
  } catch (error) {
    throw new Error('Refresh token expirado o inválido');
  }
};
