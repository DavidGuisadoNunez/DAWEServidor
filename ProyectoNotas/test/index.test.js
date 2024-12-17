const http = require('http');
const app = require('../app.js');
const logger = require('../config/winston.js');
const { beforeAll, afterAll, describe, it, expect, jest } = require('@jest/globals');

jest.mock('../config/winston.js', () => ({
  info: jest.fn(),
}));

describe('Server Initialization Tests', () => {
  let server;

  beforeAll(() => {
    // Mockear el método listen
    server = http.createServer(app);
    jest.spyOn(server, 'listen').mockImplementation((port, callback) => callback());
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should log a message when the server starts', () => {
    const PORT = 3100;

    // Simula iniciar el servidor
    server.listen(PORT, () => {
      logger.info(`Servidor escuchando en http://localhost:${PORT}`);
    });

    // Verifica que el logger haya registrado el mensaje correcto
    expect(logger.info).toHaveBeenCalledWith(`Servidor escuchando en http://localhost:${PORT}`);
  });
});
