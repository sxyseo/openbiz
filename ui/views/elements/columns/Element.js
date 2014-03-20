"use strict";
define(['../../../objects/Object'],function(object){
	return object.extend({
		getConfig:function(obj,column){
			var field = {};
			if(typeof column.field != 'undefined' && column.field){
				field.name = column.field;
			}
			if(typeof column.displayName != 'undefined' && column.displayName){
				field.label = column.displayName;
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