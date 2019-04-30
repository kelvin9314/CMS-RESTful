module.exports = {
  tags: {
    allowUnknownTags: true,
    dictionaries: ['jsdoc', 'closure']
  },
  source: {
    include: ['./src/admin/client/containers/home/', './src/admin/client/components/'],
    includePattern: '.+\\.js?(x)',
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
    destination: './docs/adminClient/',
    readme: 'readme.md'
  }
};
