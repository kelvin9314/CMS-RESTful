module.exports = {
  env: {
    es6: true,
    browser: true,
    'jest/globals': true
  },
  parser: 'babel-eslint',
  extends: [
    'eslint:recommended',
    'airbnb',
    'prettier',
    'prettier/react',
    'jest-enzyme',
    'plugin:jest/recommended'
  ],
  plugins: ['prettier', 'jest', 'react', 'jsx-a11y', 'import','html'],
  rules: {
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx']
      }
    ],
    'react/prop-types': 0,
    'react/display-name': 0,
    'react/no-unused-state': 'off',
    'space-before-function-paren': 'off',
    'operator-linebreak': ['error', 'before'],
    'func-names': 'off'
  },
  globals: {
    window: true,
    document: true,
    localStorage: true,
    FormData: true,
    FileReader: true,
    Blob: true,
    navigator: true
  }
};
