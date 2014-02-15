"use strict";
define(function(){
	return Backbone.View.extend({
		app:null,
		name:null,
		locale:{},
		initialize:function(){
			if(typeof this.app == 'string'){						
				this.app = openbiz.apps[this.app];		
				this.initLocale();
			}
			if(typeof this.model == 'function')this.model = new this.model();				
			return this;
		},
		initLocale:function(){
			if(this.name && this.module && this.app ){
				if(this.app.locale.hasOwnProperty(this.module) &&
                    this.app.locale[this.module].hasOwnProperty(this.name) )
					this.locale = this.app.locale[this.module][this.name];
				this.locale.loading = this.app.locale.loading;
                this.locale.breadcrumb = this.app.locale.breadcrumb;
			}			
			this.locale.appUrl 	= this.app.appUrl;
			this.locale.baseUrl = this.app.baseUrl;
			return this;
		},
		switchView:function(viewName,args){
			if(this.app==null)return;
			var self=this;
	    	var viewArr = viewName.split(".");
	    	var viewPath = "./modules/"+viewArr[0]+"/views/"+viewArr[1];
	    	$(self.el).fadeOut(function(){
				this.app.require([viewPath],function(targetView){
					self.undelegateEvents();
					var view = new targetView(args);
					view.render();
					openbiz.views._renderred[viewName] = view;
					openbiz.views._inited[viewName] = false;
					openbiz.ui.update($(self.el));
					$(self.el).fadeIn();
				})
			});	
		},
		popupView:function(viewName){
			if(this.app==null)return;
	    	var callback,args=[],self=this;;
	    	switch(arguments.length){
	    		case 2:
	    			if(typeof arguments[1]=='function'){
	    				callback = arguments[1];	
	    			}else if(typeof arguments[1]=='object'){
	    				args = arguments[1];
	    			}
	    			break;
	    		case 3:
	    			args = arguments[1];
	    			callback = arguments[2];
	    			break;
	    	}
	    	var viewArr = viewName.split(".");
	    	var viewPath = "./modules/"+viewArr[0]+"/views/"+viewArr[1];
	    	if(self.app.views.isRenderred(viewName)){
				self.app.views.get(viewName).undelegateEvents();
			}
            self.app.views.render(viewName,args,function(view){
            	var $modal = $(view.$el);
                $modal.modal();
                $modal.on('hidden.bs.modal',function(){
                	view.undelegateEvents();
                });
                openbiz.ui.update($modal);
                if(typeof callback =='function'){
                    callback();
                }
            });
		}
	});
});