"use strict";
define(['./Object'],function(object){
	return object.extend({
		models:{},
		views:{},
		router:null,
		init:function(){			
			if(this.router!=null){				
				new this.router();
			}		
		},
		load:function(){
			this._loadModels();
			this._loadViews();
			this._loadRoutes();
		},
		_loadRoutes:function(){
			this.trigger("Loading","Routes");
		},
		_loadViews:function(){
			this.trigger("Loading","Views");
		},
		_loadModels:function(){
			this.trigger("Loading","Models");
		}
	});	
});