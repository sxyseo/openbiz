"use strict";
define(['../../../objects/Object',
		'text!./Label.html'
		],
		function(object,templateData){
	return object.extend({
		init:function(metadata,parent,model){
			var selector = "div.field-"+metadata.name.toLowerCase();
			if (parent.$el.find(selector).length == 0) return; //ignore it, if it doesn't mount on UI
			if (parent.$el.find(selector).children().length>0) return; //ignore it, if has custom template

			if(typeof metadata.permission!='undefined'){
				if(typeof openbiz.session.me=='undefined' || !openbiz.session.me.hasPermission(metadata.permission)){							
					return ;
				}
			}
			var template = _.template(templateData);
			var localeKey = 'field'+metadata.name.charAt(0).toUpperCase()+metadata.name.slice(1);
			
			metadata.displayName = parent.locale[localeKey]?parent.locale[localeKey]:metadata.displayName			
			metadata.className = metadata.className?metadata.className.replace(/\./g," "):'';
			metadata.icon = metadata.icon?metadata.icon.replace(/\./g," "):"";
			if(!metadata.field) metadata.displayValue = "";
//			debugger;
			if(metadata.field.indexOf("{{")!=-1){
				metadata.displayValue =  _.template(metadata.field,
													{record:model},
													{interpolate: /\{\{(.+?)\}\}/g});
			}else{
				metadata.displayValue = model[metadata.field]?model[metadata.field]:model.get(metadata.field);
			}			

			parent.$el.find(selector).replaceWith($(template(metadata)).addClass("field-"+metadata.name.toLowerCase()));			
		}
	})
});