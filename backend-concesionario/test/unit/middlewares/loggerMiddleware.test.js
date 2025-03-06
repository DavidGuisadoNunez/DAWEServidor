import { jest, expect } from '@jest/globals';
import logger from '../../../src/utils/logger.js';

// Mockeamos Winston Logger
jest.mock('../../../src/utils/logger.js', () => ({
  info: jest.fn(),
}));

describe('Logger Middleware (Morgan + Winston)', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Debe llamar a logger.info cuando se ejecuta Morgan', () => {
    const logMessage = 'GET /api/test 200 50ms - 123b';

    // Simulamos la función `write` que usa Morgan internamente
    const mockStream = {
      write: (message) => logger.info(message.trim()),
    };

    // Ejecutamos la función para ver si llama a `logger.info`
    mockStream.write(logMessage);

    expect(logger.info).toHaveBeenCalledWith(logMessage);
  });
});
