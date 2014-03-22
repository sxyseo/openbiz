"use strict";
define(['../objects/View'],function(view){
	return view.extend({
		_columnsConfig:null,
		_filterConfig:null,
		_paginatorConfig:null,
		_actions:null,
		metadata:null,
		_recordActions:null,
		_dataGridEL:'.data-grid',
		collection:null,
		elements:{}, 
		initialize:function(){
			this.template = _.template(this.template);
		 	this.collection = new this.collection();
			openbiz.View.prototype.initialize.apply(this);
			return this;
		},
		_bindEvents:function(){
			this.undelegateEvents();
			var actions = this._getActions();
			for (var i in actions){
				var action = actions[i];
				var key = action.event + " ." + action.className;
				this.events[key] = action.function;
			}
			var recordActions = this._getRecordActions();
			for (var i in recordActions){
				var recordAction = recordActions[i];
				if(typeof recordAction.function != 'undefined' && recordAction.function)
				{
					var selector = "rec-act-"+recordAction["name"].toLowerCase();
					var key = recordAction.event + " ." + selector;
					this.events[key] = recordAction.function;
				}
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
				this._renderDataGridConfig()._bindEvents();
				this.afterRender();
			}
			else
			{
				this._renderNoPermissionView();
			}
		},
		_renderDataGridConfig:function(){
			var columns = [];
			var columnConfigs = this._getColumnsConfig();
			for (var i in columnConfigs){
				var column = columnConfigs[i];
				if(this._canDisplayColumn(column)){
					var type = column['type'];
					if(typeof  type == 'undefined' || type == null){
						type = 'text';
					}
					var field;
					if(this.elements[type]){
						field = this.elements[type].getConfig(this,column,this._getRecordActions());
					}
					else{
						field = openbiz.elements.columns[type].getConfig(this,column,this._getRecordActions());
					}
					if(field != null){
						columns.push(field);
					}
				}
			}
			if(this._getFilterConfig()){
				var filter = new Backgrid.Extension.ServerSideFilter({
					collection: this.collection,
					name: "query",
					placeholder: ""
				});
				$(this.el).find(this._dataGridEL).append(filter.render().el);
			}
			var grid = new Backgrid.Grid({
				columns:columns,
				collection: this.collection,
				className: 'backgrid table table-striped table-bordered text-center',
				emptyText: this.metadata.gridEmptyText
			});
			$(this.el).find(this._dataGridEL).append(grid.render().el);
			if(this._getPaginatorConfig()){
				var paginator = new Backgrid.Extension.Paginator({
					windowSize: 10,
					slideScale: 0.5,
					goBackFirstOnSort: true,
					collection: this.collection,
					className:'pagination'
				});
				$(this.el).find(this._dataGridEL).append(paginator.render().el);
			}
			this.collection.fetch();
			return this;
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
		_canDisplayColumn:function(column){
			if(typeof column.permission != 'undefined' && column.permission)
				return openbiz.session.me.hasPermission(column.permission);
			return true;
		},
		_getRecordActions:function(){
			if(! this._recordActions){
				this._recordActions = this.metadata.recordActions;
			}
			return this._recordActions;
		},
		_getActions:function(){

			if(! this._actions){
				this._actions = this.metadata.actions;
			}
			return this._actions;
		},
		_getColumnsConfig:function(){
			if(! this._columnsConfig){
				this._columnsConfig = this.metadata.fields;
			}
			return this._columnsConfig;
		},
		_getFilterConfig:function(){
			if(! this._filterConfig){
				this._filterConfig = this.metadata.filter;
			}
			return this._filterConfig;
		},
		_getPaginatorConfig:function(){
			if(! this._paginatorConfig){
				this._paginatorConfig = this.metadata.paginator;
			}
			return this._paginatorConfig;
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
	    }
	});
});