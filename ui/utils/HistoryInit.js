"use strict";
define(function(){
    return function(){
        if(Backbone.History.prototype._openbizInited != true){
            Backbone.History.prototype._loadUrl = Backbone.History.prototype.loadUrl;
            _.extend(Backbone.History.prototype,{
                _openbizInited:true,
                middlewares:[],
                middleware:function(route, callback) {
                    this.middlewares.push({route: route, callback: callback});
                },
                loadUrl: function(fragment) {
                    fragment = this.fragment = this.getFragment(fragment);
                    var matchedMiddlewares = [],hasRouteMatched = false;

                    _.any(this.handlers, function(handler) {
                        if(handler.route.test(fragment)){
                            hasRouteMatched = true;
                        }
                    });
                    _.any(this.middlewares, function(middlewares) {
                        if (middlewares.route.test(fragment)) {
                            matchedMiddlewares.push(middlewares.callback);
                        }
                    });
                    if(matchedMiddlewares.length>0 && hasRouteMatched){
                        this.processMiddlewares(fragment,matchedMiddlewares);
                    }else{
                        this._loadUrl.call(this,fragment);
                    }
                },
                processMiddlewares:function(fragment,middlewares){
                    var history = this;
                    var done = function(fragment){
                        history._loadUrl.call(history,fragment);
                    };
                    if(middlewares.length){
                        var hopCounter = 0 ;
                        var nextHop = function()
                        {
                            hopCounter++;
                            if(hopCounter >= middlewares.length){
                                done.call(history,fragment);
                            }else{
                                middlewares[hopCounter](fragment,nextHop);
                            }
                        };
                        middlewares[hopCounter](fragment,nextHop);
                    }else{
                        done.call(history,fragment);
                    }
                }
            });
        }
    }
});