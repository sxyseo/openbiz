"use strict";
define(['./Element'],function(element){
	return element.extend({
		getConfig:function(obj,column,recordActions){
			var self = this;
			var field = openbiz.Element.getConfig.call(this,obj,column);
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
									var className = "rec-act-"+recordAction["name"].toLowerCase();
									html = html + "<a href='#' record-id='{{ id }}' record-name='{{ id }}'  class='btn btn-default "+ className+"'>"+recordAction["displayName"]+"</a>"+"&nbsp";
								}
							}
							html = html + "</div>";
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
			return field;
		},
		_hasPermission:function(permission){
			if(typeof permission != 'undefined' && permission){
				return openbiz.session.me.hasPermission(permission);
			}
			return true;
		}
	});
});