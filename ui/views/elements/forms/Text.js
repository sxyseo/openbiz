"use strict";
define(['../../../objects/Object',
		'text!./Text.html'
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
			var labelLocaleKey = 'field'+metadata.name.charAt(0).toUpperCase()+metadata.name.slice(1);
			var placeholderLocaleKey = 'field'+metadata.name.charAt(0).toUpperCase()+metadata.name.slice(1);
			
			metadata.displayName = parent.locale[labelLocaleKey]?parent.locale[labelLocaleKey]:metadata.displayName;		
			metadata.className = metadata.className?metadata.className.replace(/\./g," "):'';
			metadata.icon = metadata.icon?metadata.icon.replace(/\./g," "):"";			
			metadata.placeholder = parent.locale[placeholderLocaleKey]?parent.locale[placeholderLocaleKey]:metadata.placeholder;		
			metadata.elemName = "record-"+metadata.name.toLowerCase();
			if(!metadata.displayValue) metadata.displayValue = metadata.field;
			if(metadata.displayValue.indexOf("{{")!=-1){
				metadata.displayValue =  _.template(metadata.displayValue,
													{record:model},
													{
														evaluate    : /\{%([\s\S]+?)%\}/g,
														interpolate : /\{\{([\s\S]+?)\}\}/g,
														escape      : /\{-([\s\S]+?)\}/g
													});
			}else{
				if(metadata.displayValue.indexOf('.')==-1){
					metadata.displayValue = model[metadata.displayValue]?model[metadata.displayValue]:model.get(metadata.displayValue);
				}else{
					  var attrArray = metadata.displayValue.split('.');
				      var data = model.get(attrArray[0]);
				      var value = data;
					  for(var i =1; i<attrArray.length; i++){
				        var indexName = attrArray[i];
				        value = value[indexName];
				      }  
				      metadata.displayValue = value;
				}
			}	

			parent.$el.find(selector).replaceWith($(template(metadata)).addClass("field-"+metadata.name.toLowerCase()));			
			
			if(metadata.readonly==true) parent.$el.find(selector).find("input[name='"+metadata.elemName+"']").attr('readonly','readonly');
			if(metadata.required==true) parent.$el.find(selector).find("input[name='"+metadata.elemName+"']").attr('required','required');
			if(metadata.disabled==true) parent.$el.find(selector).find("input[name='"+metadata.elemName+"']").attr('disabled','disabled');

			return this;
		}
	})
});