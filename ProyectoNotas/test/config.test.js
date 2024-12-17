import jest, { expect } from 'jest';

jest.mock('dotenv', () => ({
  config: jest.fn(),
}));

describe('Configuration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env = {}; // Limpia las variables de entorno antes de cada prueba
  });

  it('should load PORT from environment variables', () => {
    process.env.PORT = '4000';

    const loadedConfig = require('../config.js').default;

    expect(loadedConfig.app.PORT).toBe('4000');
  });

  it('should use default PORT if environment variable is not set', () => {
    const loadedConfig = require('../config.js').default;

    expect(loadedConfig.app.PORT).toBe(3000);
  });

  it('should load JWT_SECRET from environment variables', () => {
    process.env.JWT_SECRET = 'testsecret';

    const loadedConfig = require('../config.js').default;

    expect(loadedConfig.security.JWT_SECRET).toBe('testsecret');
  });

  it('should return undefined for JWT_SECRET if not set', () => {
    const loadedConfig = require('../config.js').default;

    expect(loadedConfig.security.JWT_SECRET).toBeUndefined();
  });
});
