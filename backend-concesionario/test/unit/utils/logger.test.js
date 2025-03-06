import logger from '../../../src/utils/logger.js';
import winston from '../../../src/config/winston.js';
import { jest, describe, it, expect, beforeAll, afterEach } from '@jest/globals';

describe('Logger', () => {
  beforeAll(() => {
    // Mock manual de winston
    winston.info = jest.fn();
    winston.error = jest.fn();
    winston.warn = jest.fn();
    winston.debug = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debe exportar el objeto logger', () => {
    expect(logger).toBeDefined();
  });

  it('debe llamar a info correctamente', () => {
    logger.info('Mensaje de prueba');
    expect(winston.info).toHaveBeenCalledWith('Mensaje de prueba');
  });

  it('debe llamar a error correctamente', () => {
    logger.error('Error de prueba');
    expect(winston.error).toHaveBeenCalledWith('Error de prueba');
  });

  it('debe llamar a warn correctamente', () => {
    logger.warn('Advertencia de prueba');
    expect(winston.warn).toHaveBeenCalledWith('Advertencia de prueba');
  });

  it('debe llamar a debug correctamente', () => {
    logger.debug('Debug de prueba');
    expect(winston.debug).toHaveBeenCalledWith('Debug de prueba');
  });
});
