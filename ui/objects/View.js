"use strict";
define(function(){
	return Backbone.View.extend({
		app:null,
		name:null,
		locale:{},
		initialize:function(){
			if(typeof this.app == 'string')this.app = openbiz.apps[this.app];		
			if(typeof this.model == 'function')this.model = new this.model();	
			this.initLocale();
			return this;
		},
		initLocale:function(){
			if(this.name && this.app ){
				if(this.app.locale.hasOwnProperty(this.name))
					this.locale = this.app.locale[this.name];				
				this.locale.loading = this.app.locale.loading;
			}			
			this.locale.appUrl 	= this.app.appUrl;
			this.locale.baseUrl = this.app.baseUrl;
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
					openbiz.ui.update();
					$(self.el).fadeIn();
				})
			});	
		} 
	});
});