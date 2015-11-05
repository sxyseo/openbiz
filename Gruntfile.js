<<<<<<< HEAD
var path = require('path');

module.exports = function(grunt) {
<<<<<<< HEAD
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jsdoc: {
      dist: {
        src: [
            'lib/**/*.js',
            'README.md'
        ],
        options:
        {
            destination: 'doc',
            configure:'doc/conf.json',
            template:'doc/template'
        }
      }
    }
  });


  grunt.loadNpmTasks('grunt-jsdoc');

  grunt.registerTask('default', ['build']);
  grunt.registerTask('build', ['jsdoc']);
=======
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
						debug: false
					}
				},
				files: [
					{
						expand: true,
						cwd: 'ui/',
						src: "**/*.jade",
						dest: "ui/",
						ext: ".html"
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
					useStrict: true
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
						'bootstrap'	: 'vendor/bootstrap/js/bootstrap.min',
						'underscore': 'vendor/underscore/underscore-min',
						'jquery' 	: 'vendor/jquery/jquery-1.10.2.min',
						'jquery.mmenu' : 'vendor/plugins/mmenu/jquery.mmenu',
						'jquery.ui' : 'vendor/jquery-ui/jquery.ui.min',
						'jquery.ui.widget' : 'vendor/jquery-ui/jquery.ui.widget',
						'jqueryform' 	: 'vendor/jquery-form/jquery.form.min',		
						'modernizr' : 'vendor/modernizr/modernizr',
						'chart' 	: 'vendor/plugins/chart/ori/chart',
						'EasyPieChart' 	: 'vendor/plugins/chart/ori/easypiechart.min',
						'throbber'	: 'vendor/throbber/throbber',
						'hammer'	: 'vendor/hammer/hammer',
						'form' 		: 'vendor/plugins/form/form',
						'datetime' 	: 'vendor/plugins/datetime/datetime',
						'holder'	: 'vendor/plugins/holder/holder',
						'cookie'	: 'vendor/plugins/cookie/jquery.cookie',
				        'openbiz'	: 'openbiz',
				 		'backbone'	: 'vendor/backbone/backbone-min',
				 		'backgrid'	: 'vendor/backgrid/backgrid',
				 		'backgrid-paginator': 'vendor/backgrid/extensions/paginator/backgrid-paginator',
				 		'backgrid-filter'	: 'vendor/backgrid/extensions/filter/backgrid-filter',
				 		'backbone-pageable'	: 'vendor/backbone-pageable/backbone-pageable',
						'i18n'    : 'vendor/require/plugins/i18n',
						'text'    : 'vendor/require/plugins/text',
						'respond'	: 'vendor/bootstrap/libs/respond.js/1.3.0/respond.min',
						'html5shiv'	: 'vendor/bootstrap/libs/html5shiv/3.7.0/html5shiv',
						'openbiz.custom' : 'vendor/openbiz/openbiz.custom',
						'parsley'   : 'vendor/openbiz/openbiz.parsley',
						'async'   	: 'vendor/async/async',
						'bootbox'   : 'vendor/bootbox/bootbox.min',
						'bootstrap-paginator'	: 'vendor/paginator/bootstrap-paginator.min',
						'moment' 	: 'vendor/moment/moment-with-langs.min',
						'jsoneditor': 'vendor/jsoneditor/jsoneditor-min',
						'jsonlint'  : 'vendor/jsonlint/jsonlint',
						
						'ace' 					: 'vendor/ace/ace',		
						'ace/mode/json' 		: 'vendor/ace/mode-json',	
						'ace/ext/searchbox' 	: 'vendor/ace/searchbox',	
						'ace/theme/jsoneditor' 	: 'vendor/ace/theme-jsoneditor',	
						'ace/theme/textmate' 	: 'vendor/ace/theme-textmate',
						'ace/worker/worker' 	: 'vendor/ace/worker-json',			
						'ace/worker/worker_client' 	: 'vendor/ace/worker-json',	

						'jquery.fileupload' 		 : 'vendor/fileupload/js/jquery.fileupload',
						'jquery.fileupload-video' 	 : 'vendor/fileupload/js/jquery.fileupload-video',
						'jquery.fileupload-validate' : 'vendor/fileupload/js/jquery.fileupload-validate',
						'jquery.fileupload-ui' 		 : 'vendor/fileupload/js/jquery.fileupload-ui',
						'jquery.fileupload-process'  : 'vendor/fileupload/js/jquery.fileupload-process',
						'jquery.fileupload-audio'	 : 'vendor/fileupload/js/jquery.fileupload-audio',
						'jquery.fileupload-image'	 : 'vendor/fileupload/js/jquery.fileupload-image',
						'jquery.fileupload-jquery-ui': 'vendor/fileupload/js/jquery.fileupload-jquery-ui',
						'load-image' : 'vendor/fileupload/js/load-image',
						'load-image-ios' : 'vendor/fileupload/js/load-image-ios',
						'load-image-meta' : 'vendor/fileupload/js/load-image-meta',
						'load-image-exif' : 'vendor/fileupload/js/load-image-exif',
						'tmpl' : 'vendor/fileupload/js/tmpl',
						'canvas-to-blob' : 'vendor/fileupload/js/canvas-to-blob.min',

						'jquery.blueimp-gallery' : 'vendor/gallery/js/jquery.blueimp-gallery',
						'blueimp-gallery' 		: 'vendor/gallery/js/blueimp-gallery',		
						'blueimp-helper' 		: 'vendor/gallery/js/blueimp-helper',
						'blueimp-gallery-indicator' 		: 'vendor/gallery/js/blueimp-gallery-indicator'
						"bootstrap-typeahead" :"vendor/twitter-bootstrap-typeahead/bootstrap-typeahead",
					},
					shim:{
						'backbone':{
				          deps: [ 'underscore', 
				              'jquery.ui'],
				          exports: 'Backbone'
				        },   
				        "backbone-paginator":{
				          deps: [ 'backbone']
				        }, 

				        //support for jQuery fileupload - start
				        'load-image-ios':{
				        	deps:['load-image']
				        },
				        'load-image-meta':{
				        	deps:['load-image']
				        },
				        'load-image-exif':{
				        	deps:['load-image']
				        },
				        "jquery.fileupload":{		  
						   deps: [ 	
						   		"jquery",
								"jquery.ui",
								"jquery.ui.widget"
							]
				        },    
				        "jquery.fileupload-ui":{
				        	exports: ['jQuery']
				        },
				        "jquery.fileupload-process":{          
						  exports: ['jQuery'],
						  deps: ['jquery.fileupload']	  
				        },
				         "jquery.fileupload-validate":{        
						  exports: ['jQuery'],
						  deps:['jquery.fileupload-process']
				        }, 
				         "jquery.fileupload-audio":{
				          deps:['jquery.fileupload-validate'],
				          exports: ['jQuery','loadImage']
				        },
						//support for jQuery fileupload - end

						"jquery.blueimp-gallery":{
							deps:['jquery'],
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
				        'ace':{
				          exports: 'ace'
				        },
				        'jsonlint':{
				          exports: 'jsonlint'
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
				        'jquery.ui.widget':{
				        	deps: [ "jquery.ui"]
				        },
				        'bootstrap-paginator':{
				          deps: [ "bootstrap"]
				        },        
						'jqueryform':{
							deps: [ "jquery"]
						},
						'openbiz.custom':{
				          deps: [ "jquery.ui","jquery.ui.widget","jquery.fileupload-ui","bootstrap-paginator","jquery.blueimp-gallery"],
				          exports: ['jQuery']
				        },
						'bootstrap-typeahead':{
							deps: [ "jquery","bootstrap"]
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
>>>>>>> 1196908712e898671cfd72ee5575091f7d5b0304
};
=======
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
						ext: ".html"
					}
				]
			}
		},
		requirejs: {
			cubi: {
				options: {
					preserveLicenseComments:false,
					baseUrl: "./ui",
					useStrict: true,
					name: "main",
					out: "ui/main.min.js",
					paths:{
						'i18n'    : 'vendor/require/plugins/i18n',
						'text'    : 'vendor/require/plugins/text'
					},
					shim:{
						'modules/account/main':{
							deps: [
								//models
								'modules/account/models/User',
								'modules/account/models/UserCollection',
								'modules/account/models/Account',
								'modules/account/models/Invitation',
								'modules/account/models/InvitationCollection',
								//views
								'modules/account/views/ApplicationsDetailView',
								'modules/account/views/ApplicationsListView',
								'modules/account/views/ApplicationsView',
								'modules/account/views/BillingView',
								'modules/account/views/InvitationsDetailView',
								'modules/account/views/InvitationsListView',
								'modules/account/views/InvitationsNewPermissionView',
								'modules/account/views/InvitationsNewView',
								'modules/account/views/MembersEditView',
								'modules/account/views/MembersListView',
								'modules/account/views/ProfileView',
							]
						},
						'modules/system/main':{
							deps: [
								//models
								'modules/system/models/App',
								'modules/system/models/AppCollection',
								//views
								'modules/system/views/LayoutView',
								'modules/system/views/ContactRightView',
								'modules/system/views/MenuView',
								'modules/system/views/NavView',
								'modules/system/views/HeaderView',
							]
						},
						'modules/user/main':{
							deps: [
								//models
								'modules/user/models/User',
								//views
								'modules/user/views/DashboardView',
								'modules/user/views/ForgetPasswordView',
								'modules/user/views/LoginView',
								'modules/user/views/RegisterView'
							]
						},
						'modules/me/main':{
							deps: [
								//models
								'modules/me/models/Me',
								//views
								'modules/me/views/SetupWizardView',
								'modules/me/views/UserProfileView'

							]
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
>>>>>>> df20f5b3b4b2a9db6e4d17a78482bea46826e662
