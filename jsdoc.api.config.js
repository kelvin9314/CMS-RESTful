module.exports = {
  tags: {
    allowUnknownTags: true,
    dictionaries: ['jsdoc', 'closure']
  },
  source: {
    include: [
      'src/api/controllers/functions',
      'src/api/controllers',
      'src/api/models/db.js',
      'src/api/server.js',
      'src/api/libs'
    ],
    includePattern: '.+\\.js(doc)?$',
    excludePattern: '(^|\\/|\\\\)_'
  },
  plugins: ['plugins/markdown'],
  templates: {
    cleverLinks: false,
    monospaceLinks: false
  },
  opts: {
    template: 'node_modules/docdash',
    encoding: 'utf8',
    destination: './docs/api/',
    readme: 'readme.md'
  }
};
