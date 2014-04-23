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
									var isEnabled = self._getEnableText(recordAction["name"],obj.model!=null?obj.model:model,obj.model!=null?true:false);
									var label = obj.locale[displayName]?obj.locale[displayName]: recordAction.displayName;
									switch(recordAction.type.toLowerCase()){
										case "link":
										{
											var url = recordAction.url.replace(":id","{{ id }}");											
											var className;
											if(typeof recordAction.className!='undefined' && recordAction.className!=""){
												className = recordAction.className;
												if(className.indexOf("btn-")==-1)className += " btn-default";
											}else{
												className = "btn-default";
											}
											url = "#!/backend"+ (obj.app.name=='cubi'?'':'/'+obj.app.name)+url;
											html = html + "<a href='"+url+"' class='btn  "+className+" '"+isEnabled+">"+label+"</a>"+"&nbsp";
											break;
										}
										case "button":
										{
											var className = "rec-act-"+recordAction.name.toLowerCase();
											if(typeof recordAction.className!='undefined' && recordAction.className!="" ){
												className += " "+recordAction.className;
												if(className.indexOf("btn-")==-1)className += " btn-default";
											}else{
												className += " btn-default";
											}											
											html = html + "<a href='#' record-id='{{ id }}' class='btn  "+ className+"'"+isEnabled+">"+label+"</a>"+"&nbsp";
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
		_getEnableText:function(action,model,isSubDoc){
			if(_.isUndefined(model.get("_metadata")))
				return "";
			var state = model.get("_metadata").state
			var text = "";

			if(action == "edit"){
				if(state.writable == false){
					text = " disabled='disabled'";
				}
			}else if(action == "delete"){
				if(state.deletable==false){
					text = " disabled='disabled'";
				}
				if(isSubDoc){
					if(state.writable == false){
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