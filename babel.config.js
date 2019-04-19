const presets = [
  [
    '@babel/preset-env',
    {
      targets: {
        node: 'current'
      }
    }
  ],
  'react-app'
];
const plugins = ['transform-object-rest-spread'];

if (process.env.ENV === 'production') {
  plugins.push('transform-remove-console');
}

module.exports = { presets, plugins };
