module.exports = {
  tags: {
    allowUnknownTags: true,
    dictionaries: ['jsdoc', 'closure']
  },
  source: {
    include: ['src/api/controllers/functions/', 'src/api/controllers/', 'src/api/models/', 'src/api/server.js'],
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
