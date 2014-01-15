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
	    	if(self.app.views.currentView!=null && viewArr[0]!='system'){
	    		$(self.app.views.currentView.el).fadeOut(function(){
                    self.app.views.render(viewName,function(view){
                        $(view.el).fadeIn(function(){
                            if(typeof callback =='function'){
                                callback();
                            }
                        });
                    });
				});
	    	}else{
                self.app.views.render(viewName,function(view){
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