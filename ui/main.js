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
		'backbone'	: 'vendor/backbone/backbone-min',
		'i18n'		: openbizUrl+'/vendor/require/plugins/i18n',
		'text'		: openbizUrl+'/vendor/require/plugins/text',
		'respond'	: 'vendor/bootstrap/libs/respond.js/1.3.0/respond.min',
		'html5shiv'	: 'vendor/bootstrap/libs/html5shiv/3.7.0/html5shiv',
		'openbiz'	: 'openbiz'
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
		'bootstrap':{
			deps: ["jquery"],
			exports: 'jQuery'	
		}
	}
});

define(['backbone','i18n!./nls/locale','bootstrap'],
	function(Backbone,locale){
		// trigger event for onEnvironmentLoaded
		if( typeof openbizEventsDelegate =='object' && 
			typeof openbizEventsDelegate.onEnvironmentLoaded =='function' ){
			openbizEventsDelegate.onEnvironmentLoaded.apply(this);
		}
		require(['openbiz'],function(openbiz){			
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
