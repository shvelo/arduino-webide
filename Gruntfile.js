module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      compile: {
        options: {
          paths: ["web/style"]
        },
        files: {
          "web/style/app.css": "web/style/app.less"
        }
      }
    },
    jade: {
      compile: {
        options: {
          debug: false,
          pretty: true
        },
        files: {
          "web/index.html": "web/index.html.jade"
        }
      }
    },
    watch: {
      files: ['web/index.html.jade', 'web/style/app.less'],
      tasks: ['default']
    },
    parallel: {
      preview: {
        tasks: [
          {
            grunt: true,
            args: "server"
          }, {
            grunt: true,
            args: "watch"
          }
        ]
      },
      chrome: {
        tasks: [
          {
            grunt: true,
            args: "server"
          }, {
            grunt: true,
            args: "watch"
          }, {
            grunt: true,
            args: "chrome"
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-parallel');

  grunt.registerTask('default', ['less', 'jade']);

  grunt.registerTask('server', "Run a server", function() {
    this.async();
    require('./server.js');
  });

  grunt.registerTask('preview', ['default', 'parallel:preview']);

  grunt.registerTask('chrome', "Run as Chrome packaged app", function(){
    grunt.util.spawn({
      cmd: "google-chrome",
      args: ["--app=http://localhost:8080"]
    })
  });

  grunt.registerTask('run-chrome', ['default', 'parallel:chrome']);
};