"use strict";
define(['./Text',
	'text!./Currency.html'
],
	function(object,templateData){
		return object.extend({
			_templateData : templateData
		})
	});