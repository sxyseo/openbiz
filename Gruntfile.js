var path = require('path');

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jsdoc: {
      dist: {
        src: [
            'app/**/*.js'
        ],
        dest: 'doc'
      }
    },
    jade: {
      compile: {
        options: {
          pretty: false,
          data: {
            debug: false,
          }
        },
        files: [
          {
            expand: true, 
            cwd: 'ui/',
            src: "**/*.jade",
            dest: "ui/",
            ext: ".html",
          }
        ]
      }
    },
    requirejs: {
      "openbiz-ui-css":{
        options:{
          cssIn: "ui/vendor/openbiz/openbiz.css",
          out: "ui/vendor/openbiz/openbiz.min.css",                    
          preserveLicenseComments:false,
          baseUrl: "./ui",
          useStrict: true,
        }
      },
      "openbiz-ui": {
        options: {
          preserveLicenseComments:false,
          baseUrl: "./ui",
          useStrict: true,          
          name: "main",
          out: "ui/main.min.js",          
          paths:{
            'bootstrap' : 'vendor/bootstrap/js/bootstrap.min',    
            'underscore': 'vendor/underscore/underscore-min',
            'jquery'  : 'vendor/jquery/jquery-1.10.2.min',
            'jquery.mmenu' : 'vendor/plugins/mmenu/jquery.mmenu',
            'jquery.ui' : 'vendor/jquery-ui/jquery.ui.min',
	         'jqueryform' 	: 'vendor/jquery-form/jquery.form.min',
	         'modernizr' : 'vendor/modernizr/modernizr',
            'chart'   : 'vendor/plugins/chart/chart',
            'EasyPieChart'  : 'vendor/plugins/chart/ori/easypiechart.min',
            'throbber'  : 'vendor/throbber/throbber',
            'hammer'  : 'vendor/hammer/hammer',
            'form'    : 'vendor/plugins/form/form',
            'datetime'  : 'vendor/plugins/datetime/datetime',
            'holder'  : 'vendor/plugins/holder/holder',
            'cookie'  : 'vendor/plugins/cookie/jquery.cookie',
            'openbiz' : 'openbiz',
            'backbone'  : 'vendor/backbone/backbone-min',
            'backgrid'  : 'vendor/backgrid/backgrid',
            'backgrid-paginator': 'vendor/backgrid/extensions/paginator/backgrid-paginator',
            'backgrid-filter' : 'vendor/backgrid/extensions/filter/backgrid-filter',
            'backbone-pageable' : 'vendor/backbone-pageable/backbone-pageable.min',
            'i18n'    : 'vendor/require/plugins/i18n',
            'text'    : 'vendor/require/plugins/text',
            'respond' : 'vendor/bootstrap/libs/respond.js/1.3.0/respond.min',
            'html5shiv' : 'vendor/bootstrap/libs/html5shiv/3.7.0/html5shiv',
            'openbiz.custom' : 'vendor/openbiz/openbiz.custom',
            'parsley'   : 'vendor/openbiz/openbiz.parsley',
            'bootbox'   : 'vendor/bootbox/bootbox.min',
            'bootstrap-paginator' : 'vendor/paginator/bootstrap-paginator.min',
          },
          shim:{
            'backbone':{
              deps: [ 'underscore', 
                  'jquery.ui'],
              exports: 'Backbone'
            },   
            "backbone-paginator":{
              deps: [ 'backbone'],          
            }, 
               
               
            "backgrid":{
              exports: "Backgrid",
               deps: [ 'underscore','jquery','backbone' ]     
            }, 
            "backgrid-paginator":{          
               deps: [ 'backgrid' ]     
            }, 
            "backgrid-filter":{
              deps: [ 'backgrid'],          
            },


            'underscore':{
              exports: '_'
            },
            'jquery.validate':{
              deps: ['jquery']
            },
            'jquery.validate-addon':{
              deps: ['jquery.validate']
            },
            'chart':{
              deps: ['EasyPieChart']
            },
            'bootstrap':{
              deps: ["jquery"],
              exports: ['jQuery']
            },
            'throbber':{
              exports: 'Throbber'
            },
            'openbiz':{
              deps: [ 'underscore','jquery','backbone','openbiz.custom' ]
            },               
            'jquery.ui':{
              deps: [ "jquery","holder","throbber","jquery.mmenu","bootbox",
                  "modernizr","form",'parsley',"chart","EasyPieChart","datetime","cookie"]
            },
            'openbiz.custom':{
              deps: [ "jquery.ui","bootstrap-paginator"]
            }
          }
        }
      }
    },
    clean: {
      html: {
        src: [
          'ui/**/*.html'
        ]
      }      
    }
  });


  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.registerTask('default', ['build']);
  grunt.registerTask('build', ['requirejs','jade','jsdoc']);
};
