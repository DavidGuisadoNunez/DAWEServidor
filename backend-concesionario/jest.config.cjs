module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/test/unit/**/*.test.js', '**/test/integration/**/*.test.js'],
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  collectCoverage: true,
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/swagger.js',                  // Excluye Swagger
    '!src/config/database.js',          // Excluye la configuración de la DB
    '!src/config/winston.js',           // Excluye la configuración de logs
    '!src/loaders/initializeDirectories.js',  // Excluye inicialización de directorios
    '!src/middlewares/notFoundMiddleware.js', // Excluye el middleware 404
    '!src/utils/logger.js'              // Excluye el logger
  ],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
