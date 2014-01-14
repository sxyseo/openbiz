"use strict";
define( ["objects/Router"], function(router){
	return router.extend({				
		_middlewaresRegExps : {},
		_middlewaresCallbacks : {},
		middlewares:{			
		},
		routes:{
			""	: "middlewares"
		},
		route: function(route, name, callback) {
	        var router = this;	        
	       	var fragment = Backbone.history.getHash();	        
	        var stack = [];
	        for(var routeTest in this._middlewaresRegExps)
	        {	        
	        	if(this._middlewaresRegExps[routeTest].test(fragment)){
                    stack.push(this[this._middlewaresCallbacks[routeTest]]);
	        	}
	        }

            var done = function(){
	        	router.navigate(fragment, {trigger: true, replace: true});
	        };
	        if(stack.length){
		        var hopCounter = 0 ;
		        var nextHop = function()
		        {
                    hopCounter++;
                    if(hopCounter >= stack.length){
                        done.call(router);
		        	}else{
		        		stack[hopCounter].call(router,nextHop);
		        	}
                };
				stack[hopCounter].call(router,nextHop);
			}else{
				done.call(router);
			}
	        
	    },
		constructor:function(){
			for(var route in this.middlewares){
				this._middlewaresRegExps[route] = this._routeToRegExp(route);
				this._middlewaresCallbacks[route] = this.middlewares[route];
			}
            router.prototype.initialize.apply(this,arguments);
			router.apply(this, arguments);
		}
	});
});