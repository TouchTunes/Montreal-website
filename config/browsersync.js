'use strict'

module.exports = {
  // Serve `dist` folder content
  server: {
    baseDir:   'dist',
    index:     'index.html'
  },
  // Use `/home` as a default path
  startPath: '/home/',
  // And watch following folders for changes
  files: ['src/**/*.*', 'layouts/**/*.html']
}
