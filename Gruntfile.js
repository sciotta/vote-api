'use strict';

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-api-benchmark');
  grunt.loadNpmTasks('grunt-express-server');

  grunt.initConfig({
    mochaTest: {
      options: {
        reporter: 'spec'
      },
      src: ['api/**/*.spec.js']
    },
    api_benchmark: {
      myApi: {
        options: {
          output: 'output_folder'
        },
        files: {
          'report.html': 'config.json',
          'export.json': 'config.json'
        }
      }
    },
    express:{
      options: {
        port: process.env.PORT || 9900
      },
      dev: {
        options: {
          script: 'server.js',
          debug: true,
          node_env: 'benchmark'
        }
      }
    }
});

  grunt.registerTask('default', 'mochaTest');
  grunt.registerTask('benchmark', ['express', 'api_benchmark']);
};