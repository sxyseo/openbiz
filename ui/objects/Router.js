"use strict";
define(function(){
	return Backbone.Router.extend({
		app:null,
		views:{},
		rendered:{},
		initialize:function(){
			if(typeof this.app == 'string')this.app = openbiz.apps[this.app];
			return this;
		},
	    renderView:function(viewName){
	    	if(this.app==null)return;
	    	var viewArr = viewName.split(".");
	    	var viewPath = "./modules/"+viewArr[0]+"/views/"+viewArr[1];	    	
	    	this.app.require([viewPath],function(targetView){
				var view = new targetView();
				view.render();
			});
	    }
	});
});