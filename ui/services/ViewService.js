define(['../objects/Object'],function(object){
    return function(){
        return object.extend({
            _app:null,
            _renderred:{},
            _inited:{},
            currentView:null,
            reset:function(){
                this._renderred ={};
                this._inited = {};
            },
            isRenderred:function(viewName){
                if(this.get(viewName) != null){
                    return true;
                }
                return false;
            },
            get:function(viewName){
                if(this._renderred[viewName] == null || typeof this._renderred[viewName] == 'undefined'){
                    return null;
                }
                return this._renderred[viewName];
            },
            render:function(viewName){
                var self = this;
                var callback,args=[];
                switch(arguments.length){
                    case 2:
                        if(typeof arguments[1]=='function'){
                            callback = arguments[1];    
                        }else if(typeof arguments[1]=='object'){
                            args = arguments[1];
                        }
                        break;
                    case 3:
                        args = arguments[1];
                        callback = arguments[2];
                        break;
                }
                var viewArr = viewName.split(".");
                var viewPath = "./modules/"+viewArr[0]+"/views/"+viewArr[1];
                this._app.require([viewPath],function(targetView){
                    var view = new targetView();
                    if(viewArr[0]!='system') self.currentView = view;
                    view.render.apply(view,args);
                    self._renderred[viewName] = view;
                    self._inited[viewName] = false;
                    if(typeof callback =='function'){
                        callback(view);
                    }
                });
            },
            isInited:function(viewName){
                if(this._inited[viewName] == true)
                    return true;
                return false;
            }
        })
    }
});