module.exports = function(grunt) {

  // Load the plugin that provides the tasks.
  grunt.loadNpmTasks('grunt-ngdocs');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    ngdocs: {
      options: {
        dest: 'docs',
        html5Mode: false,
        title: "MyWebClass Project Documentation"
      },
      devguide: {
        src: ['content/devguide/*.ngdoc'],
        title: 'Developer Guide'
      }
    },

    copy: {
      main: {
        src: 'img/**/*',
        dest: 'docs/'
      }
    },

    connect: {
      options: {
        keepalive: true,
        base: 'docs'
      },
      server: { }
    },

    clean: ['docs']
  });

  // Default task(s).
  grunt.registerTask('default', ['clean', 'ngdocs', 'copy', 'connect']);

};
