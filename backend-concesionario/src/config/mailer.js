import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Configuración del transporte SMTP con MailHog
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false, // No usamos SSL en MailHog
  auth: null, // MailHog no requiere autenticación
});

export default transporter;
