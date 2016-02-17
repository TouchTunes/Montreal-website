'use strict'

module.exports = {
  // Jobs should work as collection - they have a link and a separate page
  articles: {
    pattern: 'jobs/en/*.md',
    sortBy: 'date',
    reverse: true
  },
  fr_jobs: {
    pattern: 'jobs/fr/*.md',
    sortBy: 'date',
    reverse: true
  }
}
