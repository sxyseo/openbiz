define(['../objects/Object'],function(object){
    return function(){
        return object.extend({
            _app:null,
            _renderred:{},
            _inited:{},
            currentView:null,
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
            render:function(viewName,callback){
                var self = this;
                var viewArr = viewName.split(".");
                var viewPath = "./modules/"+viewArr[0]+"/views/"+viewArr[1];
                this._app.require([viewPath],function(targetView){
                    var view = new targetView();
                    if(viewArr[0]!='system') self.currentView = view;
                    view.render();
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