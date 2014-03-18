"use strict";
define(['../objects/View'],function(view){
	return view.extend({
		initialize:function(){
			openbiz.View.prototype.initialize.apply(this);
			return this;
		}
	});
});