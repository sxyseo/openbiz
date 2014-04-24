"use strict";
define(['./Text',
	'text!./Password.html'
],
	function(object,templateData){
		return object.extend({
			_templateData : templateData
		});
	})