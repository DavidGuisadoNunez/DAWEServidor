import dotenv from 'dotenv';
import transporter from '../../../src/config/mailer.js';
import { describe, test, expect } from '@jest/globals';
dotenv.config();

describe('Mailer Configuration', () => {
  test('Debe estar configurado correctamente', async () => {
    console.log('MAIL_HOST:', process.env.MAIL_HOST); // Debug
    console.log('MAIL_PORT:', process.env.MAIL_PORT); // Debug

    expect(process.env.MAIL_HOST).toBeDefined();
    expect(process.env.MAIL_PORT).toBeDefined();

    const mailPort = Number(process.env.MAIL_PORT);
    expect(mailPort).not.toBeNaN(); // Asegura que es un número válido

    expect(transporter.options).toHaveProperty('host', process.env.MAIL_HOST);
    expect(transporter.options).toHaveProperty('port', mailPort);
    expect(transporter.options).toHaveProperty('secure', false);
  });

  test('Debe poder generar un mensaje de prueba', async () => {
    const testMessage = {
      from: 'test@example.com',
      to: 'recipient@example.com',
      subject: 'Test Email',
      text: 'Este es un correo de prueba',
    };

    const result = await transporter.sendMail(testMessage);

    expect(result).toHaveProperty('messageId');
  });
});
