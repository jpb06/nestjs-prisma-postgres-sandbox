/* eslint-disable @typescript-eslint/no-var-requires */
const { pathsToModuleNameMapper } = require('ts-jest');

const {
  compilerOptions: { paths: tsconfigPaths },
} = require('./tsconfig');

module.exports = {
  roots: ['<rootDir>/src/'],
  logHeapUsage: true,
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(tsconfigPaths, { prefix: '<rootDir>/src' }),
  },
  transform: {
    '^.+\\.ts$': '@swc/jest',
  },
  collectCoverageFrom: ['**/*.ts'],
  coveragePathIgnorePatterns: ['/tests-related/', '.dto\\.ts'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  coverageReporters: ['json-summary', 'text', 'lcov'],
};
