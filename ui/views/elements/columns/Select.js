"use strict";
define(['./Element'],function(element){
	return element.extend({
		getConfig:function(obj,column){
			var field = element.prototype.getConfig.call(this,obj,column);
			field.cell = Backgrid.SelectCell.extend({
				optionValues: [["Male", "m"], ["Female", "f"]]
			});//todo : change optionValues
			return field;
		}
	});
});