"use strict";
define(["objects/Object",
		"objects/Module",
		"objects/Application",
		"objects/Router",
		"objects/View",
		"loaders/TemplateLoader",
		"loaders/AppLoader",
		"utils/MobileDetection",
		"utils/BrowserDetection",
		"utils/Validator",
		'openbiz.custom',
		'i18n!./nls/locale'
		],
	function(Object,
		Module,
		Application,
		Router,
		View,
		TemplateLoader,
		AppLoader,
		MobileDetection,
		BrowserDetection,
		Validator,
		updateUI,
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
			Router : 	 Router,
			View   : 	 View
		},			
		utils:{
			MobileDetection: MobileDetection,
			BrowserDetection: BrowserDetection
		},		
		ui:{
			update: updateUI
		},	
        views:{
            renderred:{},
            inited:{}    
        },
		baseUrl:openbizUrl,
		//shortcut alias
		Application: Application,
		Module: Module,
		Object: Object,
		Router: Router,
		View: 	View,
		isMobile: MobileDetection,
		Browser: BrowserDetection,
		loadApps: AppLoader.load,	
		validator: Validator,
		init:function(){
			this.validator.defaults.messages=locale.validation,
			this.validator.init();
		}
	}
});