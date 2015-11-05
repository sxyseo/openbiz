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
			var fieldName = 'field'+metadata.name.charAt(0).toUpperCase() + metadata.name.slice(1);
			this.metadata["fieldName"] = fieldName;
			this.parent = parent;
			return this;
		},
		_parseModel:function(callback){
			var self = this;
			this._dataSource = this.metadata.dataSource;
			this._modelType = this._dataSource.type;
			if(this._modelType == "internal"){
				this.collection = this._dataSource.model;
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
		_parseField:function(model,field){
			var attrArray = field.split('.');
			var data = model.get(attrArray[0]);
			var value = data;
			for(var i =1; i<attrArray.length; i++){
				var indexName = attrArray[i];
				value = value[indexName];
			}
			return value;
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