"use strict";
define(['../../../objects/Object','text!./customFieldsEditView.html'],function(object,templateData){
	return object.extend({
		collection:null,
		_fields:[],
		_element:{},
		parent:null,
		init:function(metadata,parent,model){
			this.parent = parent;
			var self = this;
			var modelPath = metadata.model.split(".");
			var path = "modules/"+modelPath[0]+"/models/"+modelPath[1];
			this.parent.app.require([path],function(Model){
				self.collection = new Model();
				self.collection.fetch({success:function(){

					for (var i in self.collection.models){
						var field = self.collection.models[i].attributes;
						field.type = field.dataType;
						field.selector = "field-"+field.name.toLowerCase();
						field.elemName = "record-"+metadata.name.toLowerCase();
						self._fields.push(field);
					}
					var output = {
						fields:self._fields,
						selector:"field-"+metadata.name.toLowerCase()
					}
					var selector = "div.field-"+metadata.name.toLowerCase();
					var template = _.template(templateData);
					var html = template(output);
					parent.$el.find(selector).replaceWith($(html));
					self._renderFields();
					openbiz.ui.update(self.parent.$el);
				}});
 			});
			return this;
		},
		_renderFields:function(){
			for(var i in this._fields){
				var field = this._fields[i];
				if(openbiz.elements.forms.hasOwnProperty(field.type)){
					var element = new openbiz.elements.forms[field.type];
					this._element[field.field] = element.init(field,this.parent,this.parent.model);
				}
			}
		},
		getValue:function(){
			var record = {};
			var fields = this._fields
			for(var i in fields)
			{
				var field = fields[i];
				var selector = "[name="+"'"+field.elemName+"']";

				if(typeof this._element[field.field] != 'undefined' && typeof this._element[field.field].getValue=='function'){
					var value = this._element[field.field].getValue();
					this._parseAttr(record,field.field,value);
				}else{
					this._parseAttr(record,field.field,$(selector).val());
				}
			}
			return record;
		},
		_parseAttr:function(record,attrArray,value){
			if(typeof attrArray=='string') attrArray=attrArray.split('.');
			if(attrArray.length==1)
			{
				record[attrArray[0]]=value;
				return record;
			}else{
				var key = attrArray[0]
				if(!record.hasOwnProperty(key))record[key]={};
				attrArray.shift();
				return this._parseAttr(record[key],attrArray,value);
			}
		}
	});
});