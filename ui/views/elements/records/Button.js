"use strict";
define(['../../../objects/Object'],function(element){
	return element.extend({
		init:function(obj,metadata,model){
			if(typeof metadata.permission!='undefined'){
				if(typeof openbiz.session.me=='undefined' || !openbiz.session.me.hasPermission(metadata.permission)){							
					return ;
				}
			}
			var displayName = 'recordAction'+metadata.name.charAt(0).toUpperCase() + metadata.name.slice(1);
			var isEnabled = this._getEnableText(metadata["name"],model,obj.model!=null?true:false);
			var label = obj.locale[displayName]?obj.locale[displayName]: metadata.displayName;

			var className = "rec-act-"+metadata.name.toLowerCase();
			if(typeof metadata.className!='undefined' && metadata.className!="" ){
				className += " "+metadata.className;
				if(className.indexOf("btn-")==-1)className += " btn-default";
			}else{
				className += " btn-default";
			}											
			var html =  "<a href='#' record-id='{{ id }}' class='btn  "+ className+"'"+isEnabled+">"+label+"</a>"+"&nbsp";
			
			return html;
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
		}
	});
});