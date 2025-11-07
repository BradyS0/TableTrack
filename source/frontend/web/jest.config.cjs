/** @type {import('jest').Config} */
module.exports = {
  transform: {},

  testEnvironment: 'jsdom',

  testMatch: ['<rootDir>/test/**/*.test.js'],

  setupFilesAfterEnv: ['<rootDir>/test/setup-jest-dom.js'],

  moduleDirectories: ['node_modules', 'js'],

  collectCoverage: true,
  collectCoverageFrom: [
    'js/components/*.js',
    'js/logic/*.js',
    '!js/**/*.test.js',
  ],

  verbose: true,
};