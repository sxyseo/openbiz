"use strict";
define(['./Element'],function(element){
	return element.extend({
		getConfig:function(obj,column,recordActions){
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
								var displayName = 'recordAction'+recordAction.name.charAt(0).toUpperCase() + recordAction.name.slice(1);
								if(self._hasPermission(recordAction.permission))
								{
									var text = self._getEnableText(recordAction["name"],model);
									switch(recordAction.type.toLowerCase()){
										case "link":
										{
											var url = recordAction.url.replace(":id","{{ id }}");
											url = "#!/backend/"+obj.app.name+url
											html = html + "<a href='"+url+"' class='btn btn-default'"+text+">"+obj.locale[displayName]+"</a>"+"&nbsp";
											break;
										}
										case "button":
										{
											var className = "rec-act-"+recordAction.name.toLowerCase();
											html = html + "<a href='#' record-id='{{ id }}' class='btn btn-default "+ className+"'"+text+">"+obj.locale[displayName]+"</a>"+"&nbsp";
											break;
										}
										default:
										{
											break;
										}
									}
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
		_getEnableText:function(action,model){
			var approval = model.get("_approval")
			var text = "";
			if(approval && approval.hasOwnProperty("approvalStatus")){
				 var status = approval.approvalStatus;
				if(action == "edit"){
					if(status == "approved" ){
						text = " disabled='disabled'";
					}
				}else if(action == "delete"){
					if(status == "approved" || status == "rejected"){
						text = " disabled='disabled'";
					}
				}
			}
			return text;
		},
		_hasPermission:function(permission){
			if(typeof permission != 'undefined' && permission){
				return openbiz.session.me.hasPermission(permission);
			}
			return true;
		}
	});
});