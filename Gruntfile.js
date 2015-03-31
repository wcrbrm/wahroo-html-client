module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          // target.css file: source.less file
          "dist/operator.css": "less/bundle-operator.less"
        }
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {

          'dist/operator.min.js': [
              "js/operator.js",
              "js/app/filters.js",
              "js/app/gallery.js",
              "js/app/booking.js",
              "html/**/*.model.js",
              "html/**/*.ctrl.js"
          ]

        }
      }
    },

    watch: {
      styles: {
        files: ['less/*.less','less/**/*.less', 'Gruntfile.js' ],
        tasks: ['less']
      },

      js : {
        files: ['js/*.js',  'js/**/*.js', "html/**/*.js", 'Gruntfile.js'],
        tasks: ['uglify']
      }
    }
  });

//  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', [ 'uglify', "less" ]);
};
