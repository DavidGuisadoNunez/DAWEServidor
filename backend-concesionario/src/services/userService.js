import User from '../models/User.js';
import bcrypt from 'bcryptjs';

/**
 * Crear un nuevo usuario
 */
export const createUser = async (userData) => {
  const { firstName, lastName, email, password } = userData;

  // Verificar si el usuario ya existe
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('El email ya está registrado');
  }

  // Hashear la contraseña antes de guardarla
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  return await newUser.save();
};

/**
 * Obtener todos los usuarios
 */
export const getAllUsers = async () => {
  return await User.find().select('-password'); // Excluir la contraseña
};

/**
 * Obtener un usuario por ID
 */
export const getUserById = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  return user;
};

/**
 * Actualizar un usuario
 */
export const updateUser = async (userId, updatedData) => {
  const user = await User.findByIdAndUpdate(userId, updatedData, { new: true }).select('-password');
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  return user;
};

/**
 * Eliminar un usuario
 */
export const deleteUser = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    throw new Error('Usuario no encontrado');
  }
  return user;
};
