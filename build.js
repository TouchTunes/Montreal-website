'use strict'

const metalsmith  = require('metalsmith'),
      markdown    = require('metalsmith-markdown'),
      layouts     = require('metalsmith-layouts'),
      less        = require('metalsmith-less'),
      gulpsmith   = require('gulpsmith'),
      browsersync = require('metalsmith-browser-sync'),
      // browserify = require('metalsmith-browserify'),
      permalinks  = require('metalsmith-permalinks'),
      collections = require('metalsmith-collections'),
      define      = require('metalsmith-define'),
      // paginate    = require('metalsmith-pagination'),
      // snippets    = require('metalsmith-snippet'),
      date        = require('metalsmith-build-date'),
      uglify      = require('metalsmith-uglify')

console.log('dirname => ', __dirname)

metalsmith(__dirname)
  .source('src')
  .use(define(require('./config/metadata')))
  // .use(collections(require('./config/collections')))
  // .use(paginate(require('./config/pagination')))
  .use(less(require('./config/less')))
  .use(markdown(require('./config/markdown')))
  .use(date())
  // .use(snippets(require('./config/snippets')))
  .use(permalinks(require('./config/permalinks')))
  .use(layouts(require('./config/layouts')))
  // .use(browserify(require('./config/browserify')))
  .destination('dist')
  .use(uglify())
  .use(browsersync(require('./config/browsersync')))
  .build(err => {
    if (err) throw err
  })
