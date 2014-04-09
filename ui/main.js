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
		'ace' 		: 'vendor/ace/ace',
		'jsonlint'  : 'vendor/jsonlint/jsonlint'
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

        'bootstrap-paginator':{
          deps: [ "bootstrap"]
        },        
		'jqueryform':{
			deps: [ "jquery"]
		},
		'openbiz.custom':{
          deps: [ "jquery.ui","bootstrap-paginator"]
        }
	}
});

define(['backbone-pageable','hammer','openbiz',"async","moment","ace","jsonlint","jsoneditor",'bootstrap','throbber','backgrid-paginator','backgrid-filter',"jqueryform"],
	function(Backbone,Hammer,openbiz,async,moment,ace,jsonlint,jsoneditor){
		window.Hammer = Hammer; //kick the thing back to global				
		window.async = async;
		window.moment = moment;
		window.jsoneditor = jsoneditor;
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
