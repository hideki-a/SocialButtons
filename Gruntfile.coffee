'use strict'

module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')

    uglify:
      options:
        banner: '/*! <%= pkg.name %> -v<%= pkg.version %> <%= pkg.author %> | ' +
                '<%= pkg.license %> */\n'
      dist:
        files: 'dist/socialbuttons.min.js': ['src/socialbuttons.js']

    jshint:
      all: [
        'Gruntfile.js'
        'src/*.js'
      ]
      options:
        curly: true
        eqeqeq: true
        eqnull: true
        browser: true
        globals: {}

  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-jshint'

  grunt.registerTask 'default', [
    'jshint'
    'uglify'
  ]
  
  return;