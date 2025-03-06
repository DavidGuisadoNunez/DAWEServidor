import { sendEmail } from '../../../src/utils/mailer.js';
import transporter from '../../../src/config/mailer.js';
import { jest, describe, it, expect, beforeAll } from '@jest/globals';

describe('Mailer Utility', () => {
  beforeAll(() => {
    // Mock manual de transporter.sendMail
    transporter.sendMail = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debe enviar un correo correctamente', async () => {
    const mockInfo = { messageId: '12345' };
    transporter.sendMail.mockResolvedValue(mockInfo);

    const result = await sendEmail(
      'test@example.com',
      'Asunto de prueba',
      'Texto de prueba',
      '<p>HTML de prueba</p>'
    );

    expect(transporter.sendMail).toHaveBeenCalledWith({
      from: process.env.MAIL_FROM,
      to: 'test@example.com',
      subject: 'Asunto de prueba',
      text: 'Texto de prueba',
      html: '<p>HTML de prueba</p>',
    });

    expect(result).toEqual(mockInfo);
  });

  it('debe manejar errores al enviar un correo', async () => {
    const mockError = new Error('Fallo en el envío');
    transporter.sendMail.mockRejectedValue(mockError);

    await expect(
      sendEmail('test@example.com', 'Asunto', 'Texto', '<p>HTML</p>')
    ).rejects.toThrow('Fallo en el envío');

    expect(transporter.sendMail).toHaveBeenCalledTimes(1);
  });
});
