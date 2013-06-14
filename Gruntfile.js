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
    watch: {
      files: ['web/style/app.less'],
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
      chromePreview: {
        tasks: [
          {
            grunt: true,
            args: "server"
          }, {
            grunt: true,
            args: "watch"
          }, {
            grunt: true,
            args: "chrome-base"
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
            args: "chrome-base"
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-parallel');

  grunt.registerTask('default', ['less']);

  grunt.registerTask('server', "Run a server", function() {
    this.async();
    require('./server.js');
  });

  grunt.registerTask('preview', ['default', 'parallel:preview']);

  grunt.registerTask('chrome-base', "Run as Chrome app", function(){
    var cmd;
    args = " --app=http://localhost:4000"
    var execSync;
    try {
      execSync = require("exec-sync");
    } catch(er) {
      execSync = null;
    }

    if(execSync != null) {
      if(execSync("which google-chrome") == "") {
        if(execSync("which chromium") == "") {
          grunt.log.writeln("Neither Chrome or Chromium are found!");
          return false;
        } else {
          cmd = "chromium";
        }
      } else {
        cmd = "google-chrome";
      }
    } else {
      cmd = "google-chrome";
    }
  }

  var exec = require('child_process').exec;

  exec(cmd + args, function(){});
});

  grunt.registerTask('chrome', ['parallel:chrome']);

  grunt.registerTask('chrome-preview', ['default', 'parallel:chromePreview']);
};