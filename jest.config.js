const { transformTsPaths } = require('ts-paths-transform');

const {
  compilerOptions: { paths: tsconfigPaths },
} = require('./tsconfig');

module.exports = {
  roots: ['<rootDir>'],
  logHeapUsage: true,
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: transformTsPaths(tsconfigPaths, {
    prefix: '<RootDir>/../../',
    debug: true,
  }),
  transform: {
    '^.+\\.ts$': '@swc/jest',
  },
  collectCoverageFrom: ['**/*.ts'],
  coveragePathIgnorePatterns: ['/tests-related/', '.dto\\.ts'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  coverageReporters: ['json-summary', 'text', 'lcov'],
};
