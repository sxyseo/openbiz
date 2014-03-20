"use strict";
define(['./Element'],function(element){
	return element.extend({
		getConfig:function(obj,column){
			var field = element.prototype.getConfig.call(this,obj,column);
			field.cell = "boolean";
			return field;
		}
	});
});