import transporter from '../config/mailer.js';

export const sendEmail = async (to, subject, text, html) => {
  try {
    const mailOptions = {
      from: process.env.MAIL_FROM,
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`📧 Correo enviado a ${to}: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error('❌ Error al enviar el correo:', error);
    throw error;
  }
};
