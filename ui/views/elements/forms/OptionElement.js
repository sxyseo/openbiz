"use strict";
define(['../../../objects/Object'],function(object){
	return object.extend({
		collection:null,
		metadata:null,
		parent:null,
		_selector:null,
		_modelType:null,
		_dataSource:null,
		init:function(metadata,parent){
			this.metadata = metadata;
			this.parent = parent;
			return this;
		},
		_parseModel:function(callback){
			var self = this;
			this._dataSource = this.metadata.dataSource;
			this._modelType = this._dataSource.type;
			if(this._modelType == "internal"){
				this.collection = this._dataSource.model.split(",");
				callback();
			}else{
				//self.app.require(['modules/system/models/AppCollection'],function(AppCollection)
				var modelPath = this._dataSource.model.split(".");
				var path = "modules/"+modelPath[0]+"/models/"+modelPath[1];
				this.parent.app.require([path],function(Model){
					self.collection = new Model();
					callback();
				});
			}
		},
		getType:function(){
			return this.metadata.type;
		},
		getValue:function(){
			return null;
		},
		setDefaultValue:function(){

		}
	});
});