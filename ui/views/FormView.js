"use strict";
define(['../objects/View'],function(view){
	return view.extend({
		metadata:null,
		model:null,
		_formEL:'.record-form',
		_fields:null,
		initialize:function(){						
			this.template = _.template(this.template);
		 	this.model = new this.model();
			this.metadata = openbiz.MetadataParser.call(this,this.metadata);
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
				var output = this.locale;
				output.record = this.model;
				$(this.el).html(this.template(output));
				this._bindEvents();
				this.afterRender();
			}
			else
			{
				this._renderNoPermissionView();
			}
			openbiz.ui.update($(this.el));
		},
		_renderNoPermissionView:function(){
			//render 403 page
		},
		_canDisplayView:function(){
			if(typeof this.metadata.permission == 'undefined' || this.metadata.permission == null){
				return true;
			}
			return openbiz.session.me.hasPermission(this.metadata.permission);
		},
		_getActions:function(){
			if(! this._actions){
				this._actions = this.metadata.actions;
			}
			return this._actions;
		},
		beforeDeleteRecord:function(){},
		afterDeleteRecord:function(){},
		deleteRecord:function(event){
			event.preventDefault();
			var self = this;
			bootbox.confirm({
				title: this.locale.deleteConfirmationTitle ? this.locale.deleteConfirmationTitle: this.app.locale.common.deleteConfirmationTitle,
				message:_.template(this.locale.deleteConfirmationMessage ? this.locale.deleteConfirmationMessage: this.app.locale.common.deleteConfirmationMessage,{record:recordName}),
				callback:function(result){
					if(result){
						self.beforeDeleteRecord();
						self.collection.destroy({success:function(){
//							self.collection.fetch();
						}});
						self.afterDeleteRecord();
					}
				}
			});
		},
		saveRecord:function(event){
			if(!this._validateForm())return;
			event.preventDefault();
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
					case 'select':
						this._parseAttr(record,field.field,$(selector).find("option:selected").text());
						break;
					case 'date':
						this._parseAttr(record,field.field,new Date($(selector).val().replace(/-/g,"/")));
						break;
				}
			}
			//@TODO: test
			record["bandId"] = "SGASDGSD151";
			this.model.save(record,{success:function(){

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
		_validateForm:function(){
			var result = $(this.el).find(this._formEL).parsley('validate');
			if(result == null){
				result = true;
			}
			return result;
		}
	});
});