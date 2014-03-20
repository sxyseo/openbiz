"use strict";
define(['./Element'],function(element){
	return element.extend({
		getConfig:function(obj,column){
			var field = element.prototype.getConfig.call(this,obj,column);
			{
				if(this._recordActions.length > 0){
					field.cell = BackGrid.UriCell.extend({
						render:function(){
							this.$el.empty();
							var model = this.model;
							var value = model.get("_id");
							var html = "<div class='tooltip-area'>";
							for (var rac in this._recordActions){
								var recordAction = this._recordActions[rac];

								if(openbiz.session.me.hasPermission(recordAction['permission']))
								{
									var className = "rec-act-"+recordAction["name"].toLowerCase();
									html = html + "<a href='#' record-id='{{ id }}' class='btn btn-default"+ className+"'>"+recordAction["displayName"]+"</a>+"&nbsp;""
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
		}
	});
});