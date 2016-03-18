'use strict'

// Require all modules we need
const metalsmith    = require('metalsmith'),
      markdown      = require('metalsmith-markdown'),
      layouts       = require('metalsmith-layouts'),
      less          = require('metalsmith-less'),
      browsersync   = require('metalsmith-browser-sync'),
      permalinks    = require('metalsmith-permalinks'),
      collections   = require('metalsmith-collections'),
      define        = require('metalsmith-define'),
      date          = require('metalsmith-build-date'),
      uglify        = require('metalsmith-uglify'),
      multiLanguage = require('metalsmith-multi-language'),
      Handlebars    = require('handlebars'),
       _            = require('lodash')

Handlebars.registerHelper('ifCond', (v1, v2, options) => {
  if(v1 === v2)
    return options.fn(this)
  return options.inverse(this)
})

Handlebars.registerHelper('limit', function (arr, limit) {
  if (!_.isArray(arr)) { return []; } // remove this line if you don't want the lodash/underscore dependency
  return arr.slice(0, limit);
});

// And run Metalsmith in a currend directory
metalsmith(__dirname)
  // Get sources
  .source('src')
  // Add metadata
  .use(define(require('./config/metadata')))
  // Convert LESS to CSS
  .use(less(require('./config/less')))
  // Convert markdown posts to HTML pages
  .use(markdown(require('./config/markdown')))
  // Set up multilanguage
  .use(multiLanguage({
    default: 'en',
    locales: ['en', 'fr']
  }))
  // And make collections for jobs and members
  .use(collections(require('./config/collections')))
  .use(date())
  // Make permalinks (use `/about` instead of `/about.html`)
  .use(permalinks(require('./config/permalinks')))
  // Render layouts
  .use(layouts(require('./config/layouts')))
  // Set `dist` folder as destination
  .destination('dist')
  // Minify JS code
  .use(uglify())
  // Use browsersync for local watch of all files
  .use(browsersync(require('./config/browsersync')))
  // And do a final build
  .build(err => {
    console.log(err);
    if (err) throw err
  })
