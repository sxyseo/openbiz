"use strict";
define(function(){
	return Backbone.View.extend({	
		menu: null,	
        menuRoot: 'nav#menu',            
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
                    var highest=$(this).find("ul.mm-highest");
                    highest.find(".mm-subclose").trigger('click');
                    setTimeout(function () { closeSub() }, 200);
                    function closeSub(){
                        var nav=$('nav#menu');
                        if(nav.hasClass("mm-vertical")){
                            nav.find("li").each(function(i) {
                                $(this).removeClass("mm-opened");
                            });
                        }else{
                            nav.find("ul").each(function(i) {
                                if(i==0){
                                    $(this).removeClass("mm-subopened , mm-hidden").addClass("mm-current");
                                }else{
                                    $(this).removeClass("mm-opened , mm-subopened , mm-current  , mm-highest").addClass("mm-hidden");
                                }
                            });
                        }
                    }
                }); 
                        
        },
        processACL:function(aclArray){
            for(var i=0;i<aclArray.length;i++){
                if(! openbiz.session.me.hasPermission(aclArray[i]) ){
                    $(this.el).find('.'+aclArray[i]).remove();
                }
            }
            return this;
        }
	});
});