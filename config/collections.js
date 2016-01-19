'use strict'

module.exports = {
  // Jobs should work as collection - they have a link and a separate page
  articles: {
    pattern: 'jobs/*.md',
    sortBy: 'date',
    reverse: true
  }
}

module.exports = {
  articles: {
    pattern: 'tech/*.md',
    sortBy: 'order',
    reverse: false
  }
}

