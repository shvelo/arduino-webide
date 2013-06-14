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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jade');


  grunt.registerTask('default', ['less', 'jade']);
};