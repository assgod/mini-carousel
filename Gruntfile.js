module.exports = function( grunt )
{
  "use strict"
  var configBridge = grunt.file.readJSON('./grunt/configBridge.json', { encoding: 'utf8' });
  grunt.initConfig({
    pkg: grunt.file.readJSON( "package.json" ),
    banner: '/* Mini-carousel v<%= pkg.version %> (<%= pkg.homepage %>)*/',
    concat: {
      options: {
        banner: '<%= banner %>'
      },
      minijs: {
        src: [
          'src/js/wrap-start.js',
          'src/js/swiper-intro.js',
          'src/js/core.js',
          'src/js/effects.js',
          //'src/js/lazy-load.js',
          //'src/js/scrollbar.js',
          'src/js/controller.js',
          //'src/js/hashnav.js',
          //'src/js/keyboard.js',
          'src/js/mousewheel.js',
          //'src/js/parallax.js',
          //'src/js/plugins.js',
          'src/js/emitter.js',
          //'src/js/a11y.js',
          'src/js/init.js',
          'src/js/swiper-outro.js',
          'src/js/swiper-proto.js',
          'src/js/dom.js',
          'src/js/dom-plugins.js',
          'src/js/wrap-end.js',
          'src/js/amd.js'
        ],
        dest: 'dist/js/<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
        preserveComments: 'some',
        banner: '<%= banner %>'
      },
      min: {
        src: '<%= concat.minijs.dest %>',
        dest: 'dist/js/<%= pkg.name %>.min.js'
      }
    },

    less: {
      compileCore: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: '<%= pkg.name %>.css.map',
          sourceMapFilename: 'dist/css/<%= pkg.name %>.css.map'
        },
        src: 'src/less/swiper.less',
        dest: 'dist/css/<%= pkg.name %>.css'
      }
    },

    autoprefixer: {
      options: {
        browsers: configBridge.config.autoprefixerBrowsers
      },
      core: {
        options: {
          map: true
        },
        src: 'dist/css/<%= pkg.name %>.css'
      }
    },

    csslint: {
      options: {
        csslintrc: 'src/less/.csslintrc'
      },
      dist: [
        'dist/css/<%= pkg.name %>.css'
      ]
    },

    cssmin: {
      options: {
        // TODO: disable `zeroUnits` optimization once clean-css 3.2 is released
        compatibility: 'ie8',
        keepSpecialComments: '*',
        advanced: false
      },
      minifyCore: {
        src: 'dist/css/<%= pkg.name %>.css',
        dest: 'dist/css/<%= pkg.name %>.min.css'
      }
    }
  });

  require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
  require('time-grunt')(grunt);
  grunt.registerTask('default',[
    'concat',
    'uglify',
    'less',
    'autoprefixer',
    'csslint',
    'cssmin'
  ])

}
