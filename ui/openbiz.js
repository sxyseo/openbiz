"use strict";
define(["objects/Object",
		"objects/Module",
		"objects/Application",
		"objects/Router",
		"objects/MiddleWareRouter",
		"objects/View",
		"objects/Menu",
		"views/FormView",
		"views/GridView",
		"loaders/TemplateLoader",
		"loaders/AppLoader",
		"utils/MobileDetection",
		"utils/BrowserDetection",
		"utils/Validator",
		"utils/HistoryInit",
		"utils/MetadataParser",
		'miscs/colorSetting',
		'openbiz.custom',
		'i18n!./nls/locale',
		'views/elements/columns/Element',
		'views/elements/columns/Link',
		'views/elements/columns/Text',
		'views/elements/columns/RecordAction',
		"views/elements/forms/OptionElement"
],
	function(Object,
		Module,
		Application,		
		Router,
		MiddleWareRouter,
		View,
		Menu,
		FormView,
		GridView,		
		TemplateLoader,
		AppLoader,
		MobileDetection,
		BrowserDetection,
		Validator,
		historyInit,
		MetadataParser,
		colorSetting,
		updateUI,
		locale,
		element,
		link,
		text,
		recordAction,
		optionElement
		){		
	return {
		apps:{},
		loadedApps:[],
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
			Menu   : 	 Menu,
			MiddleWareRouter:MiddleWareRouter
		},			
		utils:{
			MobileDetection: MobileDetection,
			BrowserDetection: BrowserDetection,
			MetadataParser: MetadataParser
		},		
		ui:{
			update: updateUI,
            loader:$('<div class="load-overlay"><div><div class="c1"></div><div class="c2"></div><div class="c3"></div><div class="c4"></div></div><span>'+ locale.loading.text +'</span></div>')
		},
		elements:{
			columns:{
				link:link,
				text:text,
				recordActions:recordAction
			},
			forms:{

			}
		},
		Element:element,
		OptionElement:optionElement,
		baseUrl:openbizUrl,
		//shortcut alias
		Application: Application,
		Module: Module,
		Object: Object,
		Router: Router,
		MiddleWareRouter:MiddleWareRouter,
		View: 	View,
		Menu: 	Menu,
		Grid: Backgrid,
		FormView: FormView,
		GridView: GridView,
		isMobile: MobileDetection,
		Browser: BrowserDetection,
		loadApps: AppLoader.load,	
		validator: Validator,
		historyInit: historyInit,
		MetadataParser: MetadataParser,
		init:function(){
			this.historyInit();
			this.validator.defaults.messages=locale.validation,
			this.validator.init();
		},
		colorSetting:colorSetting
	}
});