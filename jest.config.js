module.exports = {
  setupFiles: ['<rootDir>/src/__test__/setupTest.js'],
  verbose: true,
  collectCoverageFrom: [
    '<rootDir>/src/__test__/**/*.{js,jsx}',
    '!**/node_modules/**'
  ],
  testMatch: ['<rootDir>/src/__test__/**/?(*.)(spec|test).js?(x)'],
  testEnvironment: 'node',
  testURL: 'http://localhost',
  transform: {
    '^.+\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.(scss|css)$': '<rootDir>/config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|css|scss|json)$)':
      '<rootDir>/config/jest/fileTransform.js'
  },
  transformIgnorePatterns: ['/node_modules/'],
  moduleFileExtensions: ['js', 'jsx']
};
