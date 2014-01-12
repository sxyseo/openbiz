"use strict";
define(function(){
	return Backbone.Router.extend({
		app:null,
		views:{},
		rendered:{},
		currentView:null,
		initialize:function(){
			if(typeof this.app == 'string')this.app = openbiz.apps[this.app];
			return this;
		},
	    renderView:function(viewName){
	    	if(this.app==null)return;
			$(window).off('resize');
	    	var self = this;
	    	var viewArr = viewName.split(".");
	    	var viewPath = "./modules/"+viewArr[0]+"/views/"+viewArr[1];
	    	if(self.currentView!=null && viewArr[0]!='system'){
	    		$(self.currentView.el).fadeOut(function(){
		    		self.app.require([viewPath],function(targetView){
						var view = new targetView();
						if(viewArr[0]!='system') self.currentView = view;
						view.render();
						$(view.el).fadeIn();				
					});
				});
	    	}else{
	    		this.app.require([viewPath],function(targetView){
					var view = new targetView();
					if(viewArr[0]!='system') self.currentView = view;
					$(view.el).hide();
					view.render();
					$(view.el).fadeIn();
				});
	    	}
	    	
	    }
	});
});