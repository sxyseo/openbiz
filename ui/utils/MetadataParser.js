"use strict";
define(function(){
	return function( metadataString )
	{
	    var metadata = JSON.parse(metadataString,function(key,value){		
			if(typeof value=='string'){
				var template = _.template(value);	
				value = template({ openbiz:this });
			}
			return value;
		});
	    return metadata;
	}
});