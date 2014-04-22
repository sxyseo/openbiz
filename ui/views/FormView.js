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

				this.$el.html($(this.template(output)))
				$(this.el).html(this.$el.html());
				this._renderFields();
				this._renderElements();
				this._bindEvents();
				this.afterRender();
			}
			else
			{
				this._renderNoPermissionView();
			}
 			openbiz.ui.update(this.$el);
  		},
		_renderFields:function(){
			for(var i in this._fields){
				var field = this._fields[i];
				if(openbiz.elements.forms.hasOwnProperty(field.type)){
					var element = new openbiz.elements.forms[field.type];
					this._element[field.field] = element.init(field,this,this.model);
				}
			}
		},
		_renderElements:function(){
			this._getActions();
			for(var i in this._actions){
				var action = this._actions[i];
				if(openbiz.elements.forms.hasOwnProperty(action.type)){
					var element = new openbiz.elements.forms[action.type];
					element.init(action,this,this.model);
				}
			}
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
			var currentActionName = $(event.currentTarget).attr('data-action-name');
			var self = this;
			bootbox.confirm({
				title: this.locale.deleteConfirmationTitle ? this.locale.deleteConfirmationTitle: this.app.locale.common.deleteConfirmationTitle,
				message:_.template(this.locale.deleteConfirmationMessage ? this.locale.deleteConfirmationMessage: this.app.locale.common.deleteConfirmationMessage,{record:""}),
				callback:function(result){
					if(result){
						self.beforeDeleteRecord();
						self.model.destroy({success:function(){
							self.deleteRecordSuccess();
							for (var i in self.metadata.actions){
								var actionElem = self.metadata.actions[i];
								if(actionElem.name==currentActionName){
									if(typeof actionElem.gotoURL!='undefined'){
										var url = "!/backend/"+self.app.name +actionElem.gotoURL.replace(":id",self.model.id);
										self.undelegateEvents();
										Backbone.history.navigate(url, {trigger: true, replace: true});
									}
									break;
								}
							}
						},error:function(model, response){
							if(response.status == 403){
								bootbox.alert({
									title: self.app.locale.common.deleteRecordErrorTitle,
									message:self.app.locale.common.noPermissionErrorMessage
								});
							}
							else{
								bootbox.alert({
									title: self.app.locale.common.deleteRecordErrorTitle,
									message:self.app.locale.common.deleteRecordErrorMessage
								});
							}
							self.deleteRecordError();
						}});
					}
				}
			});
		},
		saveRecordSuccess:function(){},
		saveRecordError:function(){},
		beforeSaveRecord:function(record){return record},
		saveRecord:function(event){
			if(!this.validateForm())return;
			event.preventDefault();
			var currentActionName = $(event.currentTarget).attr('data-action-name');			
			var self = this;
			this.saveRecordWithCallback(function(success){
				if(success){
					self.saveRecordSuccess();
					for (var i in self.metadata.actions){
						var actionElem = self.metadata.actions[i];
						if(actionElem.name==currentActionName){
							if(typeof actionElem.gotoURL!='undefined'){
								var url = "!/backend/"+self.app.name +actionElem.gotoURL.replace(":id",self.model.id);
								self.undelegateEvents();
								Backbone.history.navigate(url, {trigger: true, replace: true});
							}
							break;
						}
					}
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
				if(typeof this._element[field.field] != 'undefined' && typeof this._element[field.field].getValue=='function'){
					var value = this._element[field.field].getValue();
					this._parseAttr(record,field.field,value);
				}else{
					this._parseAttr(record,field.field,$(selector).val());
				}
			}
			var self = this;
			record = this.beforeSaveRecord(record);
			this.model.save(record,{success:function(){
				callback(true);
			},error:function(model, response){
				if(response.status == 403){
					bootbox.alert({
						title: self.app.locale.common.saveRecordErrorTitle,
						message:self.app.locale.common.noPermissionErrorMessage
					});
				}else{
					bootbox.alert({
						title: self.app.locale.common.saveRecordErrorTitle,
						message:self.app.locale.common.saveRecordErrorMessage
					});
				}
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
			 
			var result = this.$el.find(this._formEL).parsley('validate');
			if(result === null){
				result = true;
			}
			return result;
			 
		}
	});
});