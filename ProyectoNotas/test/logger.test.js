import logger from '../config/winston.js';
import { expect, jest } from '@jest/globals';

describe('Logger Export Tests', () => {
  it('should export a logger object', () => {
    expect(logger).toBeDefined();
    expect(typeof logger.info).toBe('function');
    expect(typeof logger.warn).toBe('function');
    expect(typeof logger.error).toBe('function');
  });

  it('should allow calling logger.info', () => {
    console.log = jest.fn(); // Mock de console.log
    logger.info('Test info log');

    expect(console.log).toHaveBeenCalled();
  });

  it('should allow calling logger.warn', () => {
    console.warn = jest.fn(); // Mock de console.warn
    logger.warn('Test warn log');

    expect(console.warn).toHaveBeenCalled();
  });

  it('should allow calling logger.error', () => {
    console.error = jest.fn(); // Mock de console.error
    logger.error('Test error log');

    expect(console.error).toHaveBeenCalled();
  });
});
