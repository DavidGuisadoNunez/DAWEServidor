import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, '❌ El email ingresado no es válido'] // Validación de formato de email
    },
    password: {
      type: String,
      required: true,
      minlength: [6, '❌ La contraseña debe tener al menos 6 caracteres'] // Validación de longitud
    },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    refreshToken: { type: String } // Guardamos el refresh token
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
