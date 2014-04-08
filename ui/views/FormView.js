"use strict";
define(['../objects/View'],function(view){
	return view.extend({
		metadata:null,
		model:null,
		_formEL:'.record-form',
		_fields:null,
		_element:{},
		initialize:function(){	
			this._fields=null;
			this.template = _.template(this.template);
		 	this.model = new this.model();
			this.metadata = openbiz.MetadataParser.call(this,this.metadata);
			this._getFields();
			openbiz.View.prototype.initialize.apply(this);
			return this;
		},
		_bindEvents:function(){
			this.undelegateEvents();
			var actions = this._getActions();
			for (var i in actions){
				var action = actions[i];
				var key = action.event + " ." + "act-"+action.name.toLowerCase();
				this.events[key] = action.function;
			}
			this.delegateEvents();
			return this;
		},
		beforeRender:function(){},
		afterRender:function(){},
		render:function(){
			$(window).off('resize');
			if(this._canDisplayView())
			{
				this.beforeRender();				
				var output={
					locale:this.locale,
					record:this.model
				}
				$(this.el).html(this.template(output));
				this._bindEvents();
				for(var i in this._fields){
					var field = this._fields[i];
					if(openbiz.elements.forms.hasOwnProperty(field.type)){
						var element = new openbiz.elements.forms[field.type];
						this._element[field.field] = element.init(field,this,this.model.get(field.field));
					}
				}
				this.afterRender();
			}
			else
			{
				this._renderNoPermissionView();
			}
			openbiz.ui.update($(this.el));
		},
		_getActions:function(){
			if(! this._actions){
				this._actions = this.metadata.actions;
			}
			return this._actions;
		},
		beforeDeleteRecord:function(){},
		deleteRecordSuccess:function(){},
		deleteRecordError:function(){

		},
		deleteRecord:function(event){
			event.preventDefault();
			var self = this;
			bootbox.confirm({
				title: this.locale.deleteConfirmationTitle ? this.locale.deleteConfirmationTitle: this.app.locale.common.deleteConfirmationTitle,
				message:_.template(this.locale.deleteConfirmationMessage ? this.locale.deleteConfirmationMessage: this.app.locale.common.deleteConfirmationMessage,{record:""}),
				callback:function(result){
					if(result){
						self.beforeDeleteRecord();
						self.model.destroy({success:function(){
							self.deleteRecordSuccess();
						},error:function(){
							bootbox.alert({
								title: self.app.locale.common.deleteRecordErrorTitle,
								message:self.app.locale.common.deleteRecordErrorMessage
							});
							self.deleteRecordError();
						}});
					}
				}
			});
		},
		saveRecordSuccess:function(){},
		saveRecordError:function(){},
		saveRecord:function(event){
			if(!this.validateForm())return;
			event.preventDefault();
			var self = this;
			this.saveRecordWithCallback(function(success){
				if(success){
					self.saveRecordSuccess();
				}else{
					self.saveRecordError();
				}
			});
		},
		saveRecordWithCallback:function(callback){
			var record = {};
			var fields = this._getFields();

			for(var i in fields)
			{
				var field = fields[i];
				var selector = "[name="+"'"+field.selector+"']";

				switch(field.type){
					case 'text':
						this._parseAttr(record,field.field,$(selector).val());
						break;
					case 'textarea':
						this._parseAttr(record,field.field,$(selector).val());
						break;
					case 'dropdown':
						var value = this._element[field.field].getValue();
						this._parseAttr(record,field.field,value);
						break;
					case 'date':
						this._parseAttr(record,field.field,new Date($(selector).val().replace(/-/g,"/")));
						break;
					case 'radio':
						var value = this._element[field.field].getValue();
						this._parseAttr(record,field.field,value);
						break;
				}
			}
			var self = this;
			this.model.save(record,{success:function(){
				callback(true);
			},error:function(){
				bootbox.alert({
					title: self.app.locale.common.saveRecordErrorTitle,
					message:self.app.locale.common.saveRecordErrorMessage
				});
				callback(false);
			}});
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
		},
		_getFields:function(){
			if(!this._fields)
			{
				var formFields = [];
				for (var key in this.metadata.fields){
					var field = this.metadata.fields[key];
					field.selector = "record-"+field.name.toLowerCase();
					formFields.push(field);
				}
				this._fields = formFields;
			}
			return this._fields;
		},
		validateForm:function(){
			var result = $(this.el).find(this._formEL).parsley('validate');
			if(result === null){
				result = true;
			}
			return result;
		}
	});
});