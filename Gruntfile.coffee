'use strict'
module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    watch:
      coffee:
        files: ['Gruntfile.coffee', 'Resources/public/coffee/**/*.coffee']
        tasks: ['coffee']
      test:
        files: ['src/Display.coffee', 'spec/specs.coffee']
        tasks: ['test']

    coffee:
      compile:
        options:
          sourceMap: false
          join: true
        files:
          'dist/all.js': ['src/Display.coffee', 'spec/*.coffee']
      module:
        options:
          join: true
        files:
          'dist/module.js': ['src/Display.coffee', 'src/module.coffee']

    jasmine:
      all:
        src: ['node_modules/underscore/underscore.js']
        options:
          specs: 'dist/all.js'


  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-jasmine'

  grunt.registerTask 'default', ['test']
  grunt.registerTask 'test', ['coffee', 'jasmine']