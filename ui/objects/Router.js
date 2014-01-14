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
	    renderView:function(viewName,callback){
	    	if(this.app==null)return;
			$(window).off('resize');
	    	var self = this;
	    	var viewArr = viewName.split(".");
	    	var viewPath = "./modules/"+viewArr[0]+"/views/"+viewArr[1];
	    	if(self.currentView!=null && viewArr[0]!='system'){
	    		$(self.currentView.el).fadeOut(function(){
	    			//self.currentView.undelegateEvents();
		    		self.app.require([viewPath],function(targetView){
						var view = new targetView();
						if(viewArr[0]!='system') self.currentView = view;
						view.render();
						openbiz.views._renderred[viewName] = view;
						openbiz.views._inited[viewName] = false;
						$(view.el).fadeIn(function(){
							if(typeof callback =='function'){
								callback();
							}
						});				
					});
				});
	    	}else{
	    		this.app.require([viewPath],function(targetView){
					var view = new targetView();
					if(viewArr[0]!='system') self.currentView = view;
					$(view.el).hide();
					view.render();
					openbiz.views._renderred[viewName] = view;
					openbiz.views._inited[viewName] = false;
					$(view.el).fadeIn(function(){
						if(typeof callback =='function'){
							callback();
						}
					});	
				});
	    	}
	    },
        removeView:function(viewName){
            var view = openbiz.views.get(viewName);
            if(view =! null){
                openbiz.views._renderred.remove(view);
                $(view.el).html("");
            }
        }
	});
});