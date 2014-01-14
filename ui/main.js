"use strict";

if(typeof openbizUrl == 'undefined') openbizUrl = '/lib/openbiz';

requirejs.config({
	config:{
		i18n:{
			locale: 'zh-cn' //force to use this locale for test translation
		}
	},
	paths:{
		'bootstrap'	: 'vendor/bootstrap/js/bootstrap.min',
		'underscore': 'vendor/underscore/underscore-min',
		'jquery' 	: 'vendor/jquery/jquery-1.10.2.min',
		'jquery.mmenu' : 'vendor/plugins/mmenu/jquery.mmenu',
		'jquery.ui' : 'vendor/jquery-ui/jquery.ui.min',
		'modernizr' : 'vendor/modernizr/modernizr',
		'chart' 	: 'vendor/plugins/chart/chart',
		'EasyPieChart' 	: 'vendor/plugins/chart/ori/easypiechart.min',
		'throbber'	: 'vendor/throbber/throbber',
		'hammer'	: 'vendor/hammer/hammer',
		'form' 		: 'vendor/plugins/form/ori/form',
		'datetime' 	: 'vendor/plugins/datetime/datetime',
		'holder'	: 'vendor/plugins/holder/holder',
		'cookie'	: 'vendor/plugins/cookie/jquery.cookie',
        'openbiz'	: 'openbiz',
 		'backbone'	: 'vendor/backbone/backbone-min',
		'i18n'		: openbizUrl+'/vendor/require/plugins/i18n',
		'text'		: openbizUrl+'/vendor/require/plugins/text',
		'respond'	: 'vendor/bootstrap/libs/respond.js/1.3.0/respond.min',
		'html5shiv'	: 'vendor/bootstrap/libs/html5shiv/3.7.0/html5shiv',
		'openbiz.custom' : 'vendor/openbiz/openbiz.custom',
		'parsley'   : 'vendor/openbiz/openbiz.parsley'
	},
	shim:{
		'backbone':{
			deps: [	'underscore', 
					'jquery'],
			exports: 'Backbone'
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
		'openbiz.custom':{
			deps: [ "holder","throbber","jquery.ui","jquery.mmenu",
					"modernizr","form",'parsley',"chart","datetime","cookie"]
		}
	}
});

define(['backbone','hammer','bootstrap','throbber'],
	function(Backbone,Hammer){
		window.Hammer = Hammer; //kick the thing back to global		
		//solve conflict 
		var bootstrapButton = $.fn.button.noConflict();
		$.fn.tbButton = bootstrapButton;

		// trigger event for onEnvironmentLoaded			
		if( typeof openbizEventsDelegate =='object' && 
			typeof openbizEventsDelegate.onEnvironmentLoaded =='function' ){
			openbizEventsDelegate.onEnvironmentLoaded.apply(this);
		}
		require(['openbiz'],function(openbiz,locale){
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
		});
		
	}
);
