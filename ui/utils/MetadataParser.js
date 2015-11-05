"use strict";
define(function(){
	return function( metadataString )
	{
		var self = this;
	    var metadata = JSON.parse(metadataString,function(key,value){
			if(typeof value=='string'){
				var template = _.template(value);
				value = template({ self:self,openbiz:openbiz });
			}
			return value;
		});
	    return metadata;
	}
});