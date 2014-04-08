"use strict";
define(function(){
	return Backbone.View.extend({	
		menu: null,	
        menuRoot: 'nav#menu',      
        menuPermission:null,      
        menuACL:[],
        updateMenu:function(menuHtml){
            var menuData = $(document).data('menu');
            var menu = $(this.menuRoot);
            var container = menu.parent();
            menu.remove();
            container.append("<nav id='menu' />");                                                
            $(this.menuRoot).html(menuData);

            menuHtml = $(menuHtml).addClass(this.menu).get(0);
            if($(menuData).find('li.'+this.menu).length == 0){
                //append it                
                $(this.menuRoot).find('ul.system-menu').append(menuHtml);
            }else{
                //rerender                    
                $(this.menuRoot).find('ul.system-menu').find('li.'+this.menu).replaceWith(menuHtml);
            }                     
            $(document).data('menu',$(this.menuRoot).html()); //save it before init menu     
            $(this.menuRoot).mmenu({
                searchfield   :  true,
                slidingSubmenus : true
            },
            {
                pageSelector:'div#wrapper'
            }).on( "closing.mm", function(){
                console.log("closing me ");
                    // var highest=$(this).find("ul.mm-highest");
                    // highest.find(".mm-subclose").trigger('click');
                    // setTimeout(function () { closeSub() }, 200);
                    // function closeSub(){
                    //     var nav=$('nav#menu');
                    //     if(nav.hasClass("mm-vertical")){
                    //         nav.find("li").each(function(i) {
                    //             $(this).removeClass("mm-opened");
                    //         });
                    //     }else{
                    //         nav.find("ul").each(function(i) {
                    //             if(i==0){
                    //                 $(this).removeClass("mm-subopened , mm-hidden").addClass("mm-current");
                    //             }else{
                    //                 $(this).removeClass("mm-opened , mm-subopened , mm-current  , mm-highest").addClass("mm-hidden");
                    //             }
                    //         });
                    //     }
                    // }
                }); 
                        
        },
        initialize:function(){
            if(typeof this.app == 'string'){                 
                this.app = openbiz.apps[this.app];      
                this.initLocale();
            }
            return this;
        },
        initLocale:function(){
            if(this.name && this.module && this.app ){
                if(this.app.locale.hasOwnProperty(this.module) &&
                    this.app.locale[this.module].hasOwnProperty(this.name) )
                    this.locale = this.app.locale[this.module][this.name];
                this.locale.loading = this.app.locale.loading;
                this.locale.breadcrumb = this.app.locale.breadcrumb;
            }           
            return this;
        },
        processACL:function(aclArray){
            for(var i=0;i<aclArray.length;i++){
                if(! openbiz.session.me.hasPermission(aclArray[i]) ){        
                    $('nav#menu .'+aclArray[i]).remove();
                }
            }
            return this;
        },
        render:function(){            
            if( openbiz.session.me.hasPermission(this.menuPermission) || this.menuPermission==null){                
                if(typeof this.app != 'undefined')
                {
                    var locale = this.app.locale.menu;
                }else{
                    var locale = {}; 
                }
                var menuHtml = this.template(locale); 
                this.updateMenu(menuHtml);                                   
                this.processACL(this.menuACL);
            }
            return this;
        }
	});
});