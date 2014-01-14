"use strict";
define( ["objects/Router"], function(router){
	return router.extend({				
		_middlewaresRegExps : {},
		_middlewaresCallbacks : {},
		middlewares:{			
		},		
		_bindRoutes:function(){
			openbiz.Router.prototype._bindRoutes.apply(this, arguments);
			this._bindMiddlewares.call(this);
		},
		_bindMiddlewares:function(){
			if (!this.middlewares) return;
		      this.middlewares = _.result(this, 'middlewares');
		      var route, routes = _.keys(this.middlewares);
		      while ((route = routes.pop()) != null) {
		        this.middleware(route, this.middlewares[route]);
		      }
		},
		middleware:function(route, name, callback){
		      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
		      if (_.isFunction(name)) {
		        callback = name;
		        name = '';
		      }
		      if (!callback) callback = this[name];
		      var router = this;
		      Backbone.history.middleware(route, function(fragment,next) {
		        var args = router._extractParameters(route, fragment);
		        if(callback) { 
		        	args.unshift(next);
		        	callback.apply(router,args);
		        }
		        router.trigger.apply(router, ['route-middleware:' + name].concat(args));
		        router.trigger('route-middleware', name, args);
		        Backbone.history.trigger('route-middleware', router, name, args);
		      });
		      return this;
		},
		loadUrl: function(fragment) {
	      fragment = Backbone.history.getFragment(fragment);
	      var matchCounter = 0;
	      return _.any(Backbone.history.handlers, function(handler) {	      	
	        if (handler.route.test(fragment)) {	        	
	        	if(matchCounter>=1){
		          handler.callback(fragment);
		          return true;
		      	}
		      	matchCounter++;
	        }
	      });
	    },	    
		constructor:function(){					
			for(var route in this.middlewares){
				this._middlewaresRegExps[route] = this._routeToRegExp(route);
				this._middlewaresCallbacks[route] = this.middlewares[route];
			}					
			router.apply(this);		                  									
		}
	});
});