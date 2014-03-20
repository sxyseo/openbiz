"use strict";
define(['./Element'],function(element){
	return element.extend({
		getConfig:function(obj,column){
			var field = element.getConfig.call(this,obj,column);
			field.cell = 'string';
			return field;
		}
	});
});