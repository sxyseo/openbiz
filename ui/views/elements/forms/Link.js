"use strict";
define(['../../../objects/Object',
		'text!./Link.html'
		],
		function(object,templateData){
	return object.extend({
		init:function(metadata,parent,model){
			var selector = "div.act-"+metadata.name.toLowerCase();
			
			if (parent.$el.find(selector).length == 0) return; //ignore it, if it doesn't mount on UI
			if (parent.$el.find(selector).children().length>0) return; //ignore it, if has custom template

			if(typeof metadata.permission!='undefined'){
				if(typeof openbiz.session.me=='undefined' || !openbiz.session.me.hasPermission(metadata.permission)){							
					return ;
				}
			}
			var template = _.template(templateData);
			var localeKey = 'action'+metadata.name.charAt(0).toUpperCase()+metadata.name.slice(1);
			
			metadata.displayName = parent.locale[localeKey]?parent.locale[localeKey]:metadata.displayName
			metadata.url = "#!/backend/"+parent.app.name+metadata.url;
			metadata.url = metadata.url.replace(/.*\/?\:([^\/]*).*?/gi,function(s,value){		
						return s.replace(":"+value, (typeof model[value]!='undefined')?model[value]:model.get(value) );																		
					});			
			metadata.className = metadata.className?metadata.className.replace(/\./g," "):'btn-default';
			metadata.icon = metadata.icon?metadata.icon.replace(/\./g," "):"";
			
			parent.$el.find(selector).replaceWith($(template(metadata)).addClass("act-"+metadata.name.toLowerCase()));			

			return this;
		}
	})
});