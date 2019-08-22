module.exports = {
    setupFilesAfterEnv: ['jest-extended'],
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    transform: {
      '^.+\\.ts$': 'ts-jest'
    },
    testRegex: '(/__tests__/.*|(\\.|/)(e2e|spec))\\.(js|ts)$',
    moduleFileExtensions: ['ts', 'js'],
    verbose: true,
    coverageReporters: ['html','text-summary']
  };
  