"use strict";
define(function(){
	return {			    
	    load:function(apps, callback){
	    	var loadedApps=[];	    	
	    	apps.forEach(function(appName){
		    	var appRequire = requirejs.config({
		    		baseUrl:'/'+appName,
		    		context:appName,
		    		waitSeconds:0,
		    		config:{
						i18n:{
							locale: 'zh-cn' //force to use this locale for test translation
						}
					},
		    		paths:{
		    			'i18n'	: openbiz.baseUrl+'/vendor/require/plugins/i18n',
						'text'	: openbiz.baseUrl+'/vendor/require/plugins/text'
		    		}
		    	});	    	
		    	appRequire(['./main'],function(app){		    		
			    	app.require = appRequire;
			    	app.views = new app.views();
			    	app.views._app = app;
			    	openbiz.apps[app.name] = app;			    	
		    		loadedApps.push(app);
		    		if(loadedApps.length == apps.length){
		    			callback(loadedApps);
		    		}
		    	});	
	    	});
	    }
	}
});