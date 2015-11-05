"use strict";
define(['../../../objects/Object',
	'text!./Gallery.html'
],
	function(object,templateData){
		return object.extend({
			_metadata:null,
			_parent:null,
			_model:null,
			_selector:null,
			init:function(metadata,parent,model){
				this._metadata 	= metadata;
				this._parent 	= parent;
				this._model 	= model;
				this._selector = "div.field-"+metadata.name.toLowerCase();

				if (parent.$el.find(this._selector).length == 0) return; //ignore it, if it doesn't mount on UI
				if (parent.$el.find(this._selector).children().length>0) return; //ignore it, if has custom template

				if(typeof metadata.permission!='undefined'){
					if(typeof openbiz.session.me=='undefined' || !openbiz.session.me.hasPermission(metadata.permission)){
						return ;
					}
				}
				var self = this;

				if(metadata.dataSource.type == "model")
				{
					var modelPath = metadata.model.split(".");
					var path = "modules/"+modelPath[0]+"/models/"+modelPath[1];
					this.parent.app.require([path],function(Model){
						var model = new Model();
						model.fetch({success:function(){
                            self.renderGrid(model.attributes);
						}});
					});
				}
				else{
					self.renderGrid(metadata.dataSource.model);
				}
				return this;
			},
			renderGrid:function(options){
				var data = this._model.get(this._metadata.field);
				if(!_.isUndefined(data))
					options.data = data;
				$(this._selector).handsontable(options);
			},
			getValue:function(){
				var data = $(this._selector).handsontable('getData');
				console.log(data);
				debugger;
				return data;
			}
		})
	});