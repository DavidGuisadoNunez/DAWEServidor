import * as userService from '../services/userService.js';
import User from '../models/User.js';

/**
 * Crear un nuevo usuario
 */
export const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * Obtener todos los usuarios
 */
export const getAllUsers = async (req, res) => {
  try {
    // Parámetros de paginación
    const page = parseInt(req.query.page) || 1; // Página actual (por defecto 1)
    const limit = parseInt(req.query.limit) || 10; // Cantidad de resultados por página (por defecto 10)
    const skip = (page - 1) * limit; // Saltar registros previos

    // Parámetros de filtro (pueden incluir email, role, firstName, etc.)
    const filters = {};
    if (req.query.email) filters.email = { $regex: req.query.email, $options: 'i' };
    if (req.query.role) filters.role = req.query.role;
    if (req.query.firstName) filters.firstName = { $regex: req.query.firstName, $options: 'i' };
    if (req.query.lastName) filters.lastName = { $regex: req.query.lastName, $options: 'i' };

    // Obtener total de usuarios filtrados
    const totalUsers = await User.countDocuments(filters);

    // Obtener usuarios paginados y filtrados
    const users = await User.find(filters).skip(skip).limit(limit);

    res.status(200).json({
      success: true,
      data: users,
      pagination: {
        total: totalUsers,
        page,
        limit,
        totalPages: Math.ceil(totalUsers / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error obteniendo usuarios', error: error.message });
  }
};

/**
 * Obtener un usuario por ID
 */
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

/**
 * Actualizar un usuario
 */
export const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

/**
 * Eliminar un usuario
 */
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }
    res.status(200).json({ success: true, message: 'Usuario eliminado' });
  } catch (error) {
    next(error);
  }
};
