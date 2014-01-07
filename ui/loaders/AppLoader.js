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
		    		paths:{
		    			'i18n'	: openbiz.baseUrl+'/vendor/require/plugins/i18n',
						'text'	: openbiz.baseUrl+'/vendor/require/plugins/text',
		    		}
		    	});	    	
		    	appRequire(['./main'],function(app){
		    		console.log(app);

		    		var appNames = appName.split('/');
		    		var appRealName = appNames[appNames.length-1];
			    	openbiz.apps[appRealName] = app;
		    		loadedApps.push(app);
		    		if(loadedApps.length == apps.length){
		    			callback(loadedApps);
		    		}
		    	});	
	    	}
	    }
	}
});