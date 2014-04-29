"use strict";
define(['./Element'],function(element){
	return element.extend({
		getConfig:function(obj,column,recordActions,callback){
			var field = openbiz.Element.prototype.getConfig.call(this,obj,column);
			field.cell = 'string';
			callback(field);
		}
	});
});