"use strict";
define(function(){
    return openbiz.Router.extend({		
        app: openbiz.apps.{{APP_NAME}}?openbiz.apps.{{APP_NAME}}:'{{APP_NAME}}',
        routes:{
          {% for(var i=0;i<ROUTES.length;i++){ var route = ROUTES[i]; %}"!/backend{{route.URL}}"    : "{{route.FUNCTION}}"{% if(i<(ROUTES.length-1)){ %},{% } %}
          {% } %}
        },
        initialize:function(){          
            openbiz.Router.prototype.initialize.call(this);
        },              
        {% for(var i=0;i<ROUTES.length;i++){ var route = ROUTES[i]; %}{{route.FUNCTION}}:function({{route.PARAMETERS}}){
            this.renderView("{{MODULE_NAME}}.{{route.VIEW_NAME}}"{% if(route.PARAMETERS!=''){ %},arguments{% } %});
        }{% if(i<(ROUTES.length-1)){ %},{% } %}
        {%}%}
    });
});