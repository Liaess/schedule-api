module.exports = {
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  coverageDirectory: '../coverage',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)s$': [
      'ts-jest',
      { isolatedModules: false, tsconfig: 'tsconfig.json' },
    ],
  },
  collectCoverageFrom: [
    '**/*.(t|j)s',
    '!**/*.spec.(t|j)s',
    '!**/main.ts',
    '!**/*entity.(t|j)s',
    '!**/*dto.(t|j)s',
    '!**/dto/*.(t|j)s',
    '!**/*module.(t|j)s',
    '!**/*model.(t|j)s',
    '!**/models/*.(t|j)s',
    '!**/*mock*.(t|j)s',
    '!**/mocks/*.(t|j)s',
    '!**/*enum.(t|j)s',
    '!**/entities/*.(t|j)s',
    '!**/interfaces/*.(t|j)s',
    '!**/exceptions/*.(t|j)s',
    '!**/migrations/*.(t|j)s',
    '!**/config/*.(t|j)s',
  ],
  moduleNameMapper: {
    '^@auth/(.*)$': '<rootDir>/auth/$1',
    '^@mail/(.*)$': '<rootDir>/mail/$1',
    '^@config/(.*)$': '<rootDir>/config/$1',
    '^@constants/(.*)$': '<rootDir>/constants/$1',
    '^@users/(.*)$': '<rootDir>/users/$1',
    '^@/(.*)': '<rootDir>/$1',
  },
};
