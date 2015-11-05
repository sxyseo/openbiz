"use strict";
define(function(templateData){
	return Backbone.Model.extend({
		url: null,
		idAttribute: "_id",
		defualts:{
			username:null,
			contact:{},			
			account:{},
			roles:[]
		},
		createAccount:function(account,callback){
			var self = this;
			$.ajax({
				type 		: "POST",
				dataType 	: "json",
				contentType : "application/json",
				url  		: this.url+'/create-account',
				data 		: JSON.stringify(account),
				complete 	: function(jqXHR,textStatus){
					switch(jqXHR.status){
						case 201:
							self.fetch({success:function(){
								callback(true);
							}})							
							break;
						default:
							callback(false);
							break;
					}
				}
			});
		},
		joinAccount:function(token,callback){
			var self = this;
			$.ajax({
				type 		: "POST",
				dataType 	: "json",
				contentType : "application/json",
				url  		: this.url+'/join-account',
				data 		: JSON.stringify({"token":token}),
				complete 	: function(jqXHR,textStatus){
					switch(jqXHR.status){
						case 200:							
							self.fetch({success:function(){
								callback(true,jqXHR.responseJSON);		
							}})					
							break;
						case 403:
							callback(false);
							break;
						default:
							callback(false);
							break;
					}
				}
			});
		},	
		hasPermission:function(permission){
			for(var role in this.get('roles')){
				for(var perm in this.get('roles')[role]){
					if(this.get('roles')[role][perm] === permission){
						return true;
					}
				}
			}
			return false;
		},
		constructor:function(){			
			this.url = openbiz.apps.cubi.appUrl+'/me';
			Backbone.Model.apply(this, arguments);
			this.on('sync',function(model,resp,options){				
				openbiz.session.me = model;
			});
			this.on('destroy',function(model,resp,options){
				delete openbiz.session.me;
			});
		}
	});
})