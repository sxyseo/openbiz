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
			this.metadata = openbiz.MetadataParser.call(this,this.metadata)
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
			var recordActions = this._getRecordActions();
			for (var i in recordActions){
				var recordAction = recordActions[i];
				if(typeof recordAction.function != 'undefined' && recordAction.function)
				{
					var key = recordAction.event + " ." + "rec-act-"+recordAction.name.toLowerCase();
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
			if(this._canDisplayView())
			{
				this.beforeRender();
				var output={
					locale:this.locale,
					record:this.model
				}
				$(this.el).html(this.template(output));
				this._renderDataGridConfig()._bindEvents();
				this.afterRender();
			}
			else
			{
				this._renderNoPermissionView();
			}
			openbiz.ui.update($(this.el));

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
						var element = new openbiz.elements.columns[type];
						field = element.getConfig(this,column,this._getRecordActions());
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
			var self = this;
			this.collection.fetch({
				success:function(){

				}
			});
			return this;
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