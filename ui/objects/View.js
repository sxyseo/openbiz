"use strict";
define(function(){
	return Backbone.View.extend({
		app:null,
		name:null,
		locale:{},
		subviews:[],
		renderedSubviews:{},
		parent:null,
		_dataId:null,
		$el:null,
		el:null,
		initialize:function(){			
			this.renderedSubviews={};
			if(typeof this.app == 'string'){						
				this.app = openbiz.apps[this.app];		
				this.initLocale();
			}
			if(typeof this.model == 'function')this.model = new this.model();		
			if(typeof this.template == 'string')this.template = _.template(this.template);		
			if(typeof this.metadata == 'string')this.metadata = openbiz.MetadataParser.call(this,this.metadata)
			return this;
		},
		undelegateEvents:function(){
			if(typeof this.renderedSubviews=='object'){
				for(var viewName in this.renderedSubviews){
					var subView = this.renderedSubviews[viewName];
					subView.undelegateEvents();
				}
			}
			Backbone.View.prototype.undelegateEvents.apply(this,arguments);
			return this;
		},
		delegateEvents:function(){
			Backbone.View.prototype.delegateEvents.apply(this,arguments);
			if(typeof this.renderedSubviews=='object'){
				for(var viewName in this.renderedSubviews){
					var subView = this.renderedSubviews[viewName];
					subView.delegateEvents();
					if(typeof subView["_bindEvents"] == "function"){
						subView._bindEvents();
					}
				}
			}
			return this;
		},
		initLocale:function(){			
			if(this.name && this.module && this.app ){
				if(this.app.locale.hasOwnProperty(this.module) &&
                    this.app.locale[this.module].hasOwnProperty(this.name) )
					this.locale = this.app.locale[this.module][this.name];				
				this.locale.loading = this.app.locale.loading;
				this.locale.app = this.app.locale.app;
                this.locale.breadcrumb = this.app.locale.breadcrumb;
			}			
			this.locale.appUrl 	= this.app.appUrl;
			this.locale.baseUrl = this.app.baseUrl;
			return this;
		},
		switchView:function(viewName){
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
	    	$(self.el).fadeOut(function(){
				self.undelegateEvents();
				if(self.app.views.isRenderred(viewName)){
					self.app.views.get(viewName).undelegateEvents();
				}
	            self.app.views.render(viewName,args,function(view){
	            	var viewHTML = $(view.$el);
	            		            	
	                self.$el.replaceWith(viewHTML);
	                view.delegateEvents();
	                try{
		                self.on('hidden.bs.modal',function(){
		                	view.undelegateEvents();
		                });
	            	}catch(e){};
	                openbiz.ui.update($(self.$el));
	                if(typeof callback =='function'){
	                    callback();
	                }
	            });
			});	
		},
		addSubView:function(viewName){
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
			if(self.app.views.isRenderred(viewName)){
				self.app.views.get(viewName).undelegateEvents();
			}
			self.app.views.render(viewName,args,function(view){
				view.delegateEvents();
				openbiz.ui.update($(view.el));
				if(typeof callback =='function'){
					callback();
				}
			});
		},
		popupPickerView:function(viewName,onPickedRecordCallBack){			
			if(this.app==null)return;
	    	var callback,args=[],self=this;;
	    	
	    	var viewArr = viewName.split(".");
	    	var viewPath = "./modules/"+viewArr[0]+"/views/"+viewArr[1];
	    	var parentView = openbiz.session.currentView;
	    	parentView.undelegateEvents();
	    	if(self.app.views.isRenderred(viewName)){
				self.app.views.get(viewName).undelegateEvents();
			}
            self.app.views.render(viewName,args,function(view){
            	
            	var $modal = $(view.$el.children()[0]);

	            view.parent = parentView;
	            view.onPickedRecord = onPickedRecordCallBack;
                $modal.modal();
                $modal.on('shown.bs.modal',function(){
                	view.$el = $modal;
                	view.delegateEvents();
            	});  
                $modal.on('hidden.bs.modal',function(){
                	view.undelegateEvents();
                	openbiz.session.currentView=parentView;
                	parentView.delegateEvents();
                });
                openbiz.ui.update($modal);
                if(typeof callback =='function'){
                    callback();
                }
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
	    	var parentView = openbiz.session.currentView;
	    	parentView.undelegateEvents();
	    	if(self.app.views.isRenderred(viewName)){
				self.app.views.get(viewName).undelegateEvents();
			}
            self.app.views.render(viewName,args,function(view){
            	var $modal = $(view.$el.children()[0]);          	
	            view.parent = parentView;
                $modal.modal();
                $modal.on('shown.bs.modal',function(){      
                	view.$el = $modal;          	
                	view.delegateEvents();
            	});                
                $modal.on('hidden.bs.modal',function(){
                	view.undelegateEvents();
                	openbiz.session.currentView=parentView;
                	parentView.delegateEvents();
                });
                openbiz.ui.update($modal);
                if(typeof callback =='function'){
                    callback();
                }
            });
		},
		render:function(){			
			var output={
				locale:this.locale
			}
			this.$el = $(this.template(output));
			$(this.el).html(this.$el);
        	openbiz.ui.update($(this.el));
			this.renderSubviews();
 	        return this;
	    },
	    renderSubviews:function(){
	    	var self = this;
	    	if(typeof this.metadata.subviews=='undefined') return;
	    	for(var i =0;i<this.metadata.subviews.length;i++){
	    		var subviewConfig = this.metadata.subviews[i];
	    		var viewConfig = subviewConfig.view.split(".");
	    		var viewFile = "modules/"+viewConfig[0]+"/views/"+viewConfig[1];
	    		this.app.require([viewFile],function(viewClass){
	    			var view = new viewClass();
	    			view.parent =self;
				    if(self._dataId != null)
				    {
					    view.render(self._dataId);
				    }else{
					    view.render();
				    }
	    			self.renderedSubviews[view.metadata.name]=view;
	    		});
	    	}
	    },
		_canDisplayView:function(){
			if(typeof this.metadata.permission == 'undefined' || this.metadata.permission == null){
				return true;
			}
			return openbiz.session.me.hasPermission(this.metadata.permission);
		},
		_renderNoPermissionView:function(){
			//render 403 page
			console.log("no permission");
			this.app = openbiz.apps.cubi;
			this.switchView('common.NoPermissionView');
		}

	});
});