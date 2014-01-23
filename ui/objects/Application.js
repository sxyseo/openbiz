"use strict";
define(['./Object','../services/ViewService'],function(object,ViewService){	
    return object.extend({
        name:null,
        appUrl:null,
        baseUrl:null,
        modules:{},
        views:ViewService
	})
});