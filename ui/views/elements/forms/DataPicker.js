"use strict";
define(['../../../objects/Object',
		'text!./DataPicker.html'
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
			if(!metadata.field) metadata.displayValue = "";
			if(metadata.field.indexOf("{{")!=-1){
				metadata.displayValue =  _.template(metadata.field,
													{record:model},
													{
														evaluate    : /\{%([\s\S]+?)%\}/g,
														interpolate : /\{\{([\s\S]+?)\}\}/g,
														escape      : /\{-([\s\S]+?)\}/g
													});
			}else{
				if(metadata.field.indexOf('.')==-1){
					metadata.displayValue = model[metadata.field]?model[metadata.field]:model.get(metadata.field);
				}else{
					  var attrArray = metadata.field.split('.');
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

			this.bindEvents(metadata,parent);
		},
		bindEvents:function(metadata,parent){	
			var selector = "div.field-"+metadata.name.toLowerCase();	
				
			if(typeof metadata.pickerView=='undefined' || metadata.pickerView==null) return;
			if(typeof metadata.pickerCallback=='undefined' || metadata.pickerCallback==null) return;
			if(typeof parent[metadata.pickerCallback]!='function') return;	
			if(typeof parent['popupPickerView']!='function') return; //parent not support popupPickerView function

			var showPickerPopup = function(event){
				event.preventDefault();				
				parent.popupPickerView(metadata.pickerView,parent[metadata.pickerCallback]);
			}

			parent.$el.find(selector).find("input[name='"+metadata.elemName+"']").on("focus", showPickerPopup);
			parent.$el.find(selector).find("button."+metadata.elemName+"-pick").on("click", showPickerPopup);
		}
	})
});