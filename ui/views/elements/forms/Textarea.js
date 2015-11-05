"use strict";
define(['./Text',
		'text!./Textarea.html'
		],
		function(object,templateData){
	return object.extend({
		_templateData : templateData
	})
});