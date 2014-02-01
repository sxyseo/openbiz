'use strict';
var path = require('path'),
	express = require('express'),
	fs = require('fs');

module.exports = function(app){
	return {
		context:app,
		libUrl:null,
		_libPath: path.join(__dirname,'ui'),
		loadToRoute:function(routePrefix)
		{			
			this.libUrl = routePrefix;
			this.context.get(routePrefix+'/main.js',this.getOpenbizUI());
			this.context.use(routePrefix,express.static(this._libPath));
			return this;
		},
		getOpenbizUI:function(){
			var self = this;
			return function(req,res){
				switch(process.env.NODE_ENV){
				  case "development":
				  default:
				    var uiFile = "main.js"
				    //var uiFile = "main.min.js"
				    break;
				  case "production":  
				    var uiFile = "main.min.js"
				    break;
				}
				var uiData = fs.readFileSync(path.join(__dirname,'ui',uiFile));
				uiData = "var openbizUrl = '"+self.libUrl+"';\n" + uiData;
				res.set('Content-Type','application/javascript');
				res.send(200,uiData);
			}
		}
	};
}