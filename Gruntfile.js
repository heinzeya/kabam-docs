module.exports = function(grunt) {

  // Load the plugin that provides the tasks.
  grunt.loadNpmTasks('grunt-ngdocs');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    ngdocs: {
      options: {
        dest: 'docs',
        html5Mode: true,
        title: "Developer's Guide"
      },
      tutorial: {
        src: ['content/misc/*.ngdoc'],
        title: 'Developer\' Guide'
      }
    },

    connect: {
      options: {
        keepalive: true
      },
      server: { }
    },

    clean: ['docs']
  });

  // Default task(s).
  grunt.registerTask('default', ['clean', 'ngdocs', 'connect']);

};
