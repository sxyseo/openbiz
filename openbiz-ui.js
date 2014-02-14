'use strict';
var path = require('path'),
	express = require('express'),
	fs = require('fs'),
	crypto = require('crypto'),
	caches = [];

module.exports = function(app){
	return {
		context:app,
		libUrl:null,
		_libPath: path.join(__dirname,'ui'),
		loadToRoute:function(routePrefix)
		{			
			this.libUrl = routePrefix;
			this.context.get(routePrefix+'/main.js',this.getOpenbizUI());
			this.context.get(routePrefix+'/vendor/openbiz/openbiz.css',this.getOpenbizCSS());
			this.context.use(routePrefix,express.static(this._libPath));
			return this;
		},
		getOpenbizUI:function(){
			var self = this;
			return function(req,res){
				if(caches.hasOwnProperty('main.js') && process.env.NODE_ENV=='production'){					
					res.set('Content-Type','application/javascript');
					res.send(200,caches['main.js']);
				}else{
					switch(process.env.NODE_ENV){
					  case "development":
					  default:
					    var uiFile = "main.js"
					    break;
					  case "production":  
					    var uiFile = "main.min.js"
					    break;
					}
					var uiData = fs.readFileSync(path.join(__dirname,'ui',uiFile));
					uiData = "var openbizUrl = '"+self.libUrl+"';\n" + uiData;
					caches['main.js'] = uiData;
					res.set('Content-Type','application/javascript');
					res.send(200,uiData);
				}
			}
		},
		getOpenbizCSS:function(){
			var self = this;
			return function(req,res){
				if(caches.hasOwnProperty('openbiz.css') && process.env.NODE_ENV=='production'){
					res.set('Content-Type','text/css');
					res.send(200,caches['openbiz.css']);
				}else{
					switch(process.env.NODE_ENV){
					  case "development":
					  default:
					    var uiFile = "openbiz.css"
					    break;
					  case "production":  
					    var uiFile = "openbiz.min.css"
					    break;
					}
					var uiData = fs.readFileSync(path.join(__dirname,'ui',"vendor","openbiz",uiFile));
					caches['openbiz.css'] = uiData;
					res.set('Content-Type','text/css');
					res.send(200,uiData);
				}
			}
		}
	};
}