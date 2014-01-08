"use strict";

if(typeof openbizUrl == 'undefined') openbizUrl = '/lib/openbiz';

requirejs.config({
	config:{
		i18n:{
			locale: 'zh-cn' //force to use this locale for test translation
		}
	},
	paths:{
		'bootstrap'	: 'vendor/bootstrap/js/bootstrap',
		'underscore': 'vendor/underscore/underscore-min',
		'jquery' 	: 'vendor/jquery/jquery-1.10.2.min',
		'jquery.validate' 		: 'vendor/jquery/validation/jquery.validate.min',
		'jquery.validate-addon' : 'vendor/jquery/validation/additional-methods.min',
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
		'jquery.validate':{
			deps: ['jquery']
		},
		'jquery.validate-addon':{
			deps: ['jquery.validate']
		},
		'bootstrap':{
			deps: ["jquery"],
			exports: 'jQuery'	
		}
	}
});

define(['backbone','bootstrap','jquery.validate-addon'],
	function(Backbone){
		// trigger event for onEnvironmentLoaded
		if( typeof openbizEventsDelegate =='object' && 
			typeof openbizEventsDelegate.onEnvironmentLoaded =='function' ){
			openbizEventsDelegate.onEnvironmentLoaded.apply(this);
		}
		require(['openbiz','i18n!./nls/locale'],function(openbiz,locale){
			openbiz.locale = locale;
			//setup jquery plugins		
			$.validator.messages = 	locale.validation;			
			$.validator.setDefaults({					
			    highlight: function(element) {
			    	$(element).closest('.form-group').removeClass('has-success');
			        $(element).closest('.form-group').addClass('has-error');			    
			    },
			    unhighlight: function(element) {
			    	$(element).attr('data-validation','valid');
			    	$(element).popover('hide');
			    	if($(element).closest('.form-group').find("[data-validation='invalid']").length==0){
				        $(element).closest('.form-group').removeClass('has-error');		
				        $(element).closest('.form-group').addClass('has-success');	        			        
			    	}		    	
			    },
			    showErrors: function(errorMap, errorList) {			    				    	
			    	for(var i in errorList)
			    	{			    		
			    		$(errorList[i].element)
			    		.attr('data-validation','invalid')
			    		.attr('data-content',errorList[i].message)
			    		.popover({
			    			placement:'auto'
			    		})
			    		.popover('show');
			    	}
			    	this.defaultShowErrors();
			    },
			    errorPlacement:function(){
			    	//here do nothing, we use popover to show errors
			    }
			});			

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
