/**
 * Setup for Grunt automated testing
 * Resource: https://gruntjs.com/getting-started
 */
const terser = require('terser');
module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // Resource: https://gruntjs.com/configuring-tasks#building-the-files-object-dynamically
    terser: {
      dynamic_mappings: {
        // Grunt will search for "**/*.js" under "lib/" when the "uglify" task
        // runs and build the appropriate src-dest file mappings then, so you
        // don't need to update the Gruntfile when files are added or removed.
        files: [
          {
            expand: true, // Enable dynamic expansion.
            cwd: 'source/', // Src matches are relative to this path.
            src: ['**/*.js'], // Actual pattern(s) to match.
            dest: 'deploy/', // Destination path prefix.
            ext: '.min.js', // Dest filepaths will have this extension.
            extDot: 'first', // Extensions in filenames begin after the first dot
          },
        ],
      },
    },
    cssmin: {
      target: {
        files: [
          {
            expand: true, // Enable dynamic expansion.
            cwd: 'source/', // Src matches are relative to this path.
            src: ['**/*.css'], // Actual pattern(s) to match.
            dest: 'deploy/', // Destination path prefix.
            ext: '.min.css', // Dest filepaths will have this extension.
            extDot: 'first', // Extensions in filenames begin after the first dot
          },
        ],
      },
    },
    htmlmin: {
      target: {
        options: {
          // Target options
          removeComments: true,
          collapseWhitespace: true,
        },
        files: [
          {
            expand: true, // Enable dynamic expansion.
            cwd: 'source/', // Src matches are relative to this path.
            src: ['**/*.html'], // Actual pattern(s) to match.
            dest: 'deploy/', // Destination path prefix.
            ext: '.min.html', // Dest filepaths will have this extension.
            extDot: 'first', // Extensions in filenames begin after the first dot
          },
        ],
      },
    },
    gitadd: {
      task: {
        options: {
          force: true,
        },
        files: {
          cwd: 'deploy/',
          src: ['**/*'],
        },
      },
    },
    gitcommit: {
      your_target: {
        options: {
          // Target-specific options go here.
          message: 'Grunt committed minimized files',
        },
        files: {
          // Specify the files you want to commit
          cwd: 'deploy/',
          src: ['**/*'],
        },
      },
    },
    gitpush: {
      your_target: {
        options: {
          // Target-specific options go here.
          remote: 'origin',
          branch: 'deploy',
        },
      },
    },
  });

  // Load the plugin that provides the "cssmin" and "htmlmin" tasks.
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-git');

  // Reference: https://github.com/gruntjs/grunt-contrib-uglify/issues/522
  grunt.registerMultiTask(
    'terser',
    'Parse, mangle & compress source code files.',
    function () {
      var done = this.async();
      Promise.all(
        this.files.map((file) => {
          return new Promise((resolve, reject) => {
            let contents = grunt.file.read(file.src);
            terser.minify(contents, this.options()).then((result) => {
              grunt.file.write(file.dest, result.code);
              resolve();
            }, reject);
          });
        })
      ).then(done, (error) => {
        console.error(error);
        done();
      });
    }
  );
  grunt.registerTask('default', ['terser', 'cssmin', 'htmlmin']);
};
