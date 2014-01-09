"use strict";
define(["objects/Object",
		"objects/Module",
		"objects/Application",
		"objects/Router",
		"loaders/TemplateLoader",
		"loaders/AppLoader",
		"utils/MobileDetection",
		"utils/BrowserDetection",
		'i18n!./nls/locale'
		],
	function(Object,
		Module,
		Application,
		Router,
		TemplateLoader,
		AppLoader,
		MobileDetection,
		BrowserDetection,
		locale
		){		
	return {
		apps:{},
		session:{},
		locale:locale,
		loaders:{
			TemplateLoader : TemplateLoader,
			AppLoader : AppLoader
		},
		objects:{
			Object : 	 Object,
			Application: Application,
			Module : 	 Module,
			Router : 	 Router
		},			
		utils:{
			MobileDetection: MobileDetection,
			BrowserDetection: BrowserDetection
		},		
		baseUrl:openbizUrl,
		//shortcut alias
		Application: Application,
		Module: Module,
		Object: Object,
		Router: Router,
		isMobile: MobileDetection,
		Browser: BrowserDetection,
		loadApps: AppLoader.load,
		init:function(){
			//setup jquery plugins		
			$.validator.messages = 	locale.validation;			
			$.validator.setDefaults({				
			    highlight: function(element) {
			    	$(element).closest('.form-group').removeClass('has-success');
			        $(element).closest('.form-group').addClass('has-error');			    
			    },
			    unhighlight: function(element) {
			    	if($(element).hasClass('ignore-validation'))return;
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
		}
	}
});