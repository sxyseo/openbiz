"use strict";
define(['./Element'],function(element){
	return element.extend({
		getConfig:function(obj,column,recordActions,callback){
			var self = this;
			var field = openbiz.Element.prototype.getConfig.call(this,obj,column);
			{
				if(recordActions.length > 0){
					field.cell = openbiz.Grid.UriCell.extend({
						render:function(){
							this.$el.empty();
							var model = this.model;
							var value = model.get("_id");
							var html = "<div class='tooltip-area'>";
							for (var i in recordActions){
								var recordAction = recordActions[i];
								
								if(self._hasPermission(recordAction.permission))
								{									
									if(openbiz.elements.records.hasOwnProperty(recordAction.type.toLowerCase())){
										var recordElement = new openbiz.elements.records[recordAction.type.toLowerCase()];
										html += recordElement.init(obj,recordAction,model);
									}									
								}
							}
							html += "</div>";
							this.$el.html( _.template(
								html,
								{id:value},
								{interpolate: /\{\{(.+?)\}\}/g}) );
							this.delegateEvents();
							return this;
						}
					});
				}
			}
			callback(field);
		},
		_hasPermission:function(permission){
			if(typeof permission != 'undefined' && permission){
				return openbiz.session.me.hasPermission(permission);
			}
			return true;
		}
	});
});