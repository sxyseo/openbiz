"use strict";
define(function(){
	return Backbone.View.extend({
		app:null,
		initialize:function(){
			if(typeof this.app == 'string')this.app = openbiz.apps[this.app];		
			if(typeof this.model == 'function')this.model = new this.model();	
			return this;
		},
		switchView:function(viewName){
			if(this.app==null)return;
			var self=this;
	    	var viewArr = viewName.split(".");
	    	var viewPath = "./modules/"+viewArr[0]+"/views/"+viewArr[1];
	    	$(self.el).fadeOut(function(){
				this.app.require([viewPath],function(targetView){
					self.undelegateEvents();
					var view = new targetView();
					view.render();
					$(self.el).fadeIn();
				})
			});	
		} 
	});
});