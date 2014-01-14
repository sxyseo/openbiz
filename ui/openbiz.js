"use strict";
define(["objects/Object",
		"objects/Module",
		"objects/Application",
		"objects/Router",
		"objects/MiddleWareRouter",
		"objects/View",		
		"loaders/TemplateLoader",
		"loaders/AppLoader",
		"utils/MobileDetection",
		"utils/BrowserDetection",
		"utils/Validator",
		"utils/HistoryInit",
		'openbiz.custom',
		'i18n!./nls/locale'
		],
	function(Object,
		Module,
		Application,		
		Router,
		MiddleWareRouter,
		View,		
		TemplateLoader,
		AppLoader,
		MobileDetection,
		BrowserDetection,
		Validator,
		historyInit,
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
			View   : 	 View,
			MiddleWareRouter:MiddleWareRouter
		},			
		utils:{
			MobileDetection: MobileDetection,
			BrowserDetection: BrowserDetection
		},		
		ui:{
			update: updateUI
		},	
        views:{
            isRenderred:function(viewName){
                if(openbiz.views.get(viewName) != null){
                    return true;
                }
                return false;
            },
            get:function(viewName){
                 if(openbiz.views._renderred[viewName] == null || typeof openbiz.views._renderred[viewName] == 'undefined'){
                    return null;
                 }
                 var obj= openbiz.views._renderred[viewName];
                return obj;
            },
            _renderred:{},
            isInited:function(viewName){
                if(openbiz.views._inited[viewName] == true)
                    return true;
                return false;
            },
            _inited:{}
        },
		baseUrl:openbizUrl,
		//shortcut alias
		Application: Application,
		Module: Module,
		Object: Object,
		Router: Router,
		MiddleWareRouter:MiddleWareRouter,
		View: 	View,
		isMobile: MobileDetection,
		Browser: BrowserDetection,
		loadApps: AppLoader.load,	
		validator: Validator,
		historyInit: historyInit,
		init:function(){
			this.historyInit();
			this.validator.defaults.messages=locale.validation,
			this.validator.init();
		}
	}
});