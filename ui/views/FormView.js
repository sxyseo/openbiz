"use strict";
define(['../objects/View'],function(view){
	return view.extend({
		metadata:null,
		model:null,
		_formEL:'.recordForm',
		initialize:function(){
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
			openbiz.ui.update($(this.el));
			if(this._canDisplayView())
			{
				this.beforeRender();
				$(this.el).html(this.template(this.locale));
				this._bindEvents();
				this.afterRender();
			}
			else
			{
				this._renderNoPermissionView();
			}
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
			var recordId = $(event.currentTarget).attr('record-id');
			var recordName = $(event.currentTarget).attr('record-name');
			bootbox.confirm({
				title: this.locale.deleteConfirmationTitle ? this.locale.deleteConfirmationTitle: this.app.locale.common.deleteConfirmationTitle,
				message:_.template(this.locale.deleteConfirmationMessage ? this.locale.deleteConfirmationMessage: this.app.locale.common.deleteConfirmationMessage,{record:recordName}),
				callback:function(result){
					if(result){
						self.beforeDeleteRecord();
						self.collection.get(recordId).destroy({success:function(){
							self.collection.fetch();
						}});
						self.afterDeleteRecord();
					}
				}
			});
		},
		saveRecord:function(event){
			event.preventDefault();
			var record = {};
//			for(var i in)

			this.model.save(record,{success:function(){

			}});
		},
		_validateForm:function(){
			return $(this.el).find(this._formEL).parsley('validate');
		}
	});
});