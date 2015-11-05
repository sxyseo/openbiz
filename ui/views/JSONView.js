"use strict";
define(['./FormView'],function(view){
	return view.extend({
		jsonEditor:null,
		transform:{},		
		parseRecordToDisplay:function(record){
			return record;
		},
		parseDisplayToRecord:function(record){
			return record;
		},
		render:function(){
			var self = this;
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
				this.transformLocale();
				if(this.model!=null){
					this.model.fetch({success:function(){
						self.initEditor.call(self);
						self.afterRender.call(self);		
					}})
				}else{
					self.initEditor.call(self);
					self.afterRender.call(self);	
				}				
			}
			else
			{
				this._renderNoPermissionView();
			}
			openbiz.ui.update($(this.el));
		},
		transformLocale:function(){
			if(!this.locale.hasOwnProperty('transform'))return;
			for(var key in this.locale.transform){
				this.transform[key]={
					name:key,
					display:this.locale.transform[key]
				};
			}
		},
		initEditor:function(){
			var options = {
			    mode: this.metadata.mode?this.metadata.mode:'tree',
			    modes: this.metadata.modes?this.metadata.modes:['code', 'form', 'text', 'tree', 'view'], // allowed modes
			    error: function (err) {
			      alert(err.toString());
			    }
			};
			var data = {};
			if(this.model!=null)data = this.model.toJSON();
			data = this.parseRecordToDisplay(data);
			this.jsonEditor =  new jsoneditor.JSONEditor($(this.el).find('.openbiz-json-editor').get(0),options,data);
		},
		saveRecord:function(){
			var self = this;
			var data = this.jsonEditor.get();
			data = this.parseDisplayToRecord(data);
			if(this.model==null)return;			
			this.model.attributes= data;
			this.model.save(data,{
				success:function(){
					bootbox.alert({
						title: self.locale.saveRecordTitle ? self.locale.saveRecordTitle: self.app.locale.common.saveRecordTitle,
						message:_.template(self.locale.saveRecordMessage ? self.locale.saveRecordMessage: self.app.locale.common.saveRecordMessage,{})
					});
				}
		});
			
		}
	});
});