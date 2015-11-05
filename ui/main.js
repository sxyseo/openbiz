<<<<<<< HEAD
"use strict";

if(typeof openbizUrl == 'undefined') openbizUrl = '/lib/openbiz';

requirejs.config({
	config:{
		i18n:{
			locale: 'zh-cn' //force to use this locale for test translation
		}
	},
	waitSeconds:0,
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
		'form' 		: 'vendor/plugins/form/ori/form',
		'datetime' 	: 'vendor/plugins/datetime/datetime',
		'holder'	: 'vendor/plugins/holder/holder',
		'cookie'	: 'vendor/plugins/cookie/jquery.cookie',
        'openbiz'	: 'openbiz',
 		'backbone'	: 'vendor/backbone/backbone-min',
 		'backgrid'	: 'vendor/backgrid/backgrid',
 		'backgrid-paginator': 'vendor/backgrid/extensions/paginator/backgrid-paginator',
 		'backgrid-filter'	: 'vendor/backgrid/extensions/filter/backgrid-filter',
 		'backbone-pageable'	: 'vendor/backbone-pageable/backbone-pageable',
		'i18n'		: openbizUrl+'/vendor/require/plugins/i18n',
		'text'		: openbizUrl+'/vendor/require/plugins/text',
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
		'ace/worker/worker' 	: 'vendor/ace/ace/worker/worker',			
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
		'blueimp-gallery-indicator' 		: 'vendor/gallery/js/blueimp-gallery-indicator',
		"bootstrap-typeahead" :"vendor/twitter-bootstrap-typeahead/bootstrap-typeahead",
		"handsontable":"vendor/handsontable/jquery.handsontable.full"
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
				"jquery.ui",
				"jquery.ui.widget"
			]
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
          deps: [ "jquery.ui","jquery.ui.widget","jquery.fileupload-ui","bootstrap-paginator"]
        },
		'bootstrap-typeahead':{
			  deps: [ "jquery","bootstrap"]
		},
		'handsontable':{
			deps:["jquery"]
		}
	}
});


define(['backbone-pageable','hammer','openbiz',"async","moment","ace","jsonlint","jsoneditor","blueimp-gallery",'throbber','blueimp-gallery-indicator','bootstrap','throbber','backgrid-paginator','backgrid-filter',"jqueryform","jquery.fileupload-ui","bootstrap-typeahead","handsontable"],
	function(Backbone,Hammer,openbiz,async,moment,ace,jsonlint,jsoneditor,gallery,throbber){ 
 
		window.Hammer = Hammer; //kick the thing back to global				
		window.async = async;
		window.moment = moment;
		window.jsoneditor = jsoneditor;
		window.blueimp = {Gallery:gallery};
		window.Throbber = throbber;

		// // trigger event for onEnvironmentLoaded			
		// if( typeof openbizEventsDelegate =='object' && 
		// 	typeof openbizEventsDelegate.onEnvironmentLoaded =='function' ){
		// 	openbizEventsDelegate.onEnvironmentLoaded.apply(this);
		// }
			openbiz.init();		
			if(openbiz.Browser.isIE(8,'lte')){
				//load patches for fucking <= IE8
				require(["html5shiv","respond"]);
			}

			var appRouter = new openbiz.Router();
			window.openbiz = openbiz;

			// trigger event for onOpenbizLoaded
			if( typeof openbizEventsDelegate =='object' && 
				typeof openbizEventsDelegate.onOpenbizLoaded =='function' ){
				openbizEventsDelegate.onOpenbizLoaded.apply(this);
			}else{
				Backbone.history.start();
			}
		
		
	}
);
=======
"use strict";
define(['i18n!./nls/locale',
		'./modules/common/main',
		'./modules/system/main',
		'./modules/user/main',
		'./modules/me/main', 
		'./modules/account/main',
		'./menu/main',
		 ],
	function(locale, common, system,
			user, me, account, menu){
	return openbiz.Application.extend({
		name 	: 'cubi',
		appUrl 	: REPLACE_APPURL,
		baseUrl : REPLACE_BASEURL,
		modules:{
			common: new common(),
			system: new system(),
			user: new user(),
			me: new me(),
			account: new account()
		},
		init:function(){			
			//this.modules['common'].init();
			for(var i in this.modules){				
				if(i =='common') continue;
				this.modules[i].init();				
			}			
		},
		locale: locale,
		menu: menu
	});
});
>>>>>>> df20f5b3b4b2a9db6e4d17a78482bea46826e662
