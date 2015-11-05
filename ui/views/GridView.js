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
					locale:this.locale
				}
				this.$el.html($(this.template(output)))
				$(this.el).html(this.$el.html());
				this._renderDataGridConfig()._bindEvents();
				for(var i in this._actions){
					var action = this._actions[i];
					if(openbiz.elements.forms.hasOwnProperty(action.type)){
						var element = new openbiz.elements.forms[action.type];
						element.init(action,this,this.model);
					}
				}
				this.afterRender();
			}
			else
			{
				this._renderNoPermissionView();
			}
			openbiz.ui.update(this.$el);
		},
		_renderDataGridConfig:function(){
			var self = this;
			var columnConfigs = this._getColumnsConfig();
			var async = require('async');
			async.mapSeries(columnConfigs,function(column,cb){
				if(self._canDisplayColumn(column)){
					var type = column['type'];
					if(typeof  type == 'undefined' || type == null){
						type = 'text';
					}
					if(self.elements[type]){
						var element = new self.elements[type];
						element.getConfig(self,column,self._getRecordActions(),function(field){
							cb(null,field);
						});
					}
					else{
						var element = new openbiz.elements.columns[type];
						element.getConfig(self,column,self._getRecordActions(),function(field){
							cb(null,field);
						});
					}
				}
			},function(err,results){
				if(!err){
					var columns = [];
					for(var i in results){
						var result = results[i];
						if(_.isObject(result)){
							columns.push(result);
						}
						else if (_.isArray(result)){
							columns = columns.contact(result);
						}
					}

					if(self._getFilterConfig()){
						var filter = new Backgrid.Extension.ServerSideFilter({
							collection: self.collection,
							name: "query",
							placeholder: ""
						});

						self.$el.find(self._dataGridEL).append(filter.render().el);
						self.$el.find(self._dataGridEL).append("<hr>");
					}
					var grid = new Backgrid.Grid({
						columns:columns,
						collection: self.collection,
						className: 'backgrid table table-striped table-bordered text-center datatable table-hover',
						emptyText: self.metadata.gridEmptyText
					});

					self.$el.find(self._dataGridEL).append(grid.render().el);

					if(self._getPaginatorConfig()){
						var paginator = new Backgrid.Extension.Paginator({
							windowSize: 10,
							slideScale: 0.5,
							goBackFirstOnSort: true,
							collection: self.collection,
							className:'openbiz-paginator'
						});
						self.$el.find(self._dataGridEL).append(paginator.render().el);
					}
					self.collection.fetch({
						success:function(){

						}
					});
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
		pickRecord:function(event){
			event.preventDefault();
			var recordId = $(event.currentTarget).attr('record-id');				
			var record = this.collection.get(recordId);
			this.$el.modal('hide');
			if(typeof this.onPickedRecord=='function'){
				this.onPickedRecord.call(this.parent,record);					
			}
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
					    var model = self.collection.get(recordId);
					    model.urlRoot = self.collection.url;
					    model.destroy({success:function(){
                            self.collection.fetch();
                        },error:function(model, response){
						    self.collection.fetch();
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
					    }});
                        self.afterDeleteRecord();   
		    		}
		    	}
	    	});
	    }
	});
});