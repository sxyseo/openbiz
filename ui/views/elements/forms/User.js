"use strict";
define(['./Text',
	'text!./User.html'
],
	function(object,templateData){
		return object.extend({
			_templateData : templateData
		})
	});