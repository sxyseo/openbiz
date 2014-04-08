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
	    	var callback,args=[];
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
			$(window).off('resize');
	    	var self = this;
            var viewArr = viewName.split(".");
            var viewPath = "./modules/"+viewArr[0]+"/views/"+viewArr[1];
	    	if(openbiz.session.currentView!=null && viewArr[0]!='system'){	 
	    		openbiz.session.currentView.undelegateEvents();
	    		$(openbiz.session.currentView.el).fadeOut(function(){
	    			if(self.app.views.isRenderred(viewName)){
	    				self.app.views.get(viewName).undelegateEvents();
	    			}
                    self.app.views.render(viewName,args,function(view){
                        $(view.el).fadeIn(function(){
                            if(typeof callback =='function'){
                                callback();
                            }
                        });
                    });
				});
	    	}else{
	    		if(self.app.views.isRenderred(viewName)){
	    			self.app.views.get(viewName).undelegateEvents();
	    		}
                self.app.views.render(viewName,args,function(view){                	
                    $(view.el).fadeIn(function(){
                        if(typeof callback =='function'){
                            callback();
                        }
                    });
                });
	    	}
	    }
	});
});