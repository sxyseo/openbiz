"use strict";
define(['../../../objects/Object'],function(object){
	return object.extend({
		getConfig:function(obj,column){
			var field = {};
			if(typeof column.field != 'undefined' && column.field){
				field.name = column.field;
			}
			else{
				if(typeof column.method != 'undefined' && column.method){
					field.method = column.method;
				}
			}
			if(typeof column.displayName != 'undefined' && column.displayName){
				var localeKey = 'field'+column.name.charAt(0).toUpperCase() + column.name.slice(1);;
				field.label = obj.locale[localeKey]?obj.locale[localeKey]: column.displayName;
			}
			if(typeof column.className != 'undefined' && column.className){
				field.className = column.className;
			}
			if(typeof column.className != 'undefined' && column.className){
				field.className = column.className;
			}
			if(typeof column.sortable != 'undefined' && column.sortable){
				field.sortable = column.sortable;
			}
			else{
				field.sortable = false;
			}
			if(typeof column.editable != 'undefined' && column.editable){
				field.editable = column.editable;
			}
			else{
				field.editable = false;
			}
			return field;
		}
	});
});