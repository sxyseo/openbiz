"use strict";
define({
	'root':{
	    loading:{
	    	system: 	'Loading system resources',
	    	framework: 	'Loading Openbiz framework',
	    	cubi: 		'Loading Cubi Application',
	    	done: 		'Loading ... Done!',
            text:       'Loading...'
	    },
	    validation : {
	        defaultMessage: "This value seems to be invalid."
	      , type: {
	            email:      "This value should be a valid email."
	          , url:        "This value should be a valid url."
	          , urlstrict:  "This value should be a valid url."
	          , number:     "This value should be a valid number."
	          , digits:     "This value should be digits."
	          , dateIso:    "This value should be a valid date (YYYY-MM-DD)."
	          , alphanum:   "This value should be alphanumeric."
	          , phone:      "This value should be a valid phone number."
	        }
	      , notnull:        "This value should not be null."
	      , notblank:       "This value should not be blank."
	      , required:       "This value is required."
	      , regexp:         "This value seems to be invalid."
	      , min:            "This value should be greater than or equal to %s."
	      , max:            "This value should be lower than or equal to %s."
	      , range:          "This value should be between %s and %s."
	      , minlength:      "This value is too short. It should have %s characters or more."
	      , maxlength:      "This value is too long. It should have %s characters or less."
	      , rangelength:    "This value length is invalid. It should be between %s and %s characters long."
	      , mincheck:       "You must select at least %s choices."
	      , maxcheck:       "You must select %s choices or less."
	      , rangecheck:     "You must select between %s and %s choices."
	      , equalto:        "This value should be the same."
	    },
	    datagrid:{
	    	indicator: 		"Display {{startPos}} to {{endPos}} items, Total {{total} records",
	    	search: 		"Search"
	    },
	    uploader:{
	      btnAddFiles: 		"Add files...",
	      btnStartUpload: 	"Start upload",
	      btnCancelUpload: 	"Cancel upload",
	      btnDelete: 	 	"Delete",
	      btnStart: 	 	"Start",
	      btnCancel: 	 	"Cancel",
	      labelProcessing:    "Processing..."
	    }
	},
	'en-us': true,
	'zh-cn': true
});
