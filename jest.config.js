module.exports = {
  setupFiles: ['<rootDir>/src/__test__/setupTest.js', 'core-js'],
  testMatch: ['**/__test__/**/?*.test.js?(x)'],
  verbose: true,
  // collectCoverage: true,
  // collectCoverageFrom: ['**/*.{js,jsx}'],
  testEnvironment: 'node',
  testURL: 'http://localhost',
  transform: {
    '^.+\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.(scss|css)$': '<rootDir>/config/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|css|scss|json)$)': '<rootDir>/config/jest/fileTransform.js'
  },
  transformIgnorePatterns: ['/node_modules/'],
  moduleFileExtensions: ['js', 'jsx']
};
