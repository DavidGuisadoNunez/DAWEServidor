module.exports = {
  scripts: {
    test: 'jest --coverage'
  },
  jest: {
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
    testMatch: [
      '/tests//.[jt]s?(x)',
      '**/?(.)+(spec|test).[tj]s?(x)'
    ]
  }
};
