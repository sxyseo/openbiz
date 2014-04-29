"use strict";
define(['./Element'],function(object){
	return object.extend({
		_fields:[],
		collection:null,
		getConfig:function(obj,column,recordActions,callback){
			var self = this;
			var modelPath = metadata.model.split(".");
			var path = "modules/"+modelPath[0]+"/models/"+modelPath[1];
			this.parent.app.require([path],function(Model){
				self.collection = new Model();
				self.collection.fetch({success:function(){
					var async = require('async');
					async.mapSeries(self.collection.models,function(model,cb){
						var column = model.attributes;
						if(self._canDisplayColumn(column)){
							var type = column['type'];
							if(typeof  type == 'undefined' || type == null){
								type = 'text';
							}
							var element = new openbiz.elements.columns[type];
							element.getConfig(self,column,self._getRecordActions(),function(field){
								cb(null,field);
							});
						}
					},function(err,results){
						if(!err){
							callback(results);
						}else{
							callback([]);
						}
					})
				},error:function(){
					callback([]);
				}});
			});
		},
		_canDisplayColumn:function(column){
			if(typeof column.permission != 'undefined' && column.permission)
				return openbiz.session.me.hasPermission(column.permission);
			return true;
		},
	});
});