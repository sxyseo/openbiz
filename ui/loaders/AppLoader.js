"use strict";
define(function(){
	return {			    
	    load:function(apps, callback){
	    	var loadedApps=[];
	    	for(var i in apps){
	    		var appName=apps[i];
		    	var appRequire = requirejs.config({
		    		baseUrl:'/'+appName,
		    		context:appName,
		    		config:{
						i18n:{
							locale: 'zh-cn' //force to use this locale for test translation
						}
					},
		    		paths:{
		    			'i18n'	: openbiz.baseUrl+'/vendor/require/plugins/i18n',
						'text'	: openbiz.baseUrl+'/vendor/require/plugins/text',
		    		}
		    	});	    	
		    	appRequire(['./main'],function(app){
			    	openbiz.apps[app.name] = app;
			    	openbiz.apps[app.name].require = appRequire;
		    		loadedApps.push(app);
		    		if(loadedApps.length == apps.length){
		    			callback(loadedApps);
		    		}
		    	});	
	    	}
	    }
	}
});