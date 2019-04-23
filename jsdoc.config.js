module.exports = {
  tags: {
    allowUnknownTags: true,
    dictionaries: ['jsdoc', 'closure']
  },
  source: {
    include: ['./src/admin/client/'],
    exclude: ['./src/admin/client/**/__test__/'],
    includePattern: '.+\\.js(doc)?$',
    excludePattern: '(^|\\/|\\\\)_'
  },
  plugins: ['plugins/markdown'],
  templates: {
    cleverLinks: false,
    monospaceLinks: false
  },
  opts: {
    destination: './docs/'
  }
};
