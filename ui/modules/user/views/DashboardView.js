"use strict";
define(['text!templates/user/dashboardView.html',
		'../models/User'],
	function(templateData,model){
	return openbiz.View.extend({
		app: 'cubi',
        module:'user',
		name: 'dashboardView',
		el: '#main',
		model:model,
		events:{},	
		subviews:{},	
		initialize:function(){			
			openbiz.View.prototype.initialize.call(this); 			
	        this.template = _.template(templateData);
    	},
		render:function(){			
	        $(this.el).html(this.template(this.locale));
	        $(window).off('resize');
        	openbiz.ui.update($(this.el));
 	        return this;
	    }
	});
});