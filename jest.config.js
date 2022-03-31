/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  clearMocks: true,
  roots: ['<rootDir>'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
  globalSetup: '<rootDir>/tests/global-setup.ts',
  setupFilesAfterEnv: ['jest-extended', '<rootDir>/tests/setup.ts'],
  setupFiles: ['<rootDir>/tests/setup-env.ts'],
};
