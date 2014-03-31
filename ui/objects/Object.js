"use strict";
define(function(){
	var object = function(attributes, options) {
		var attrs = attributes || {};
		options || (options = {});
		this.cid = _.uniqueId('o');
		this.initialize.apply(this, arguments);
	};

	_.extend(object.prototype,Backbone.Events,{
		initialize:function(){}
	});

	object.extend = Backbone.Model.extend;

	return object;
});