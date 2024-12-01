export default {
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageThreshold: {
      global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
      },
  },
  transform: {
    '^.+\\.js$': 'babel-jest',  // Transforma todos los archivos JS con Babel
  },
  moduleFileExtensions: ['js', 'json', 'node'],  // Asegura que Jest reconozca archivos JS como módulos ES
  transformIgnorePatterns: [
    '/node_modules/(?!your-esm-module|another-esm-module).+\\.js$',  // Permite transformar módulos ESM específicos de node_modules si es necesario
  ],
};
