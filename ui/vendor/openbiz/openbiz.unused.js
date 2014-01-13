define(function(){
   return function(){

       // mailBox.html
       //////////     MAIL  COLLAPSE     //////////
       $(".mail-collapse").off('click');
       $(".mail-collapse").on('click',function(){
           $("#main").toggleClass( "in" );
       });

       //////////     MAIL FAVOURITE      //////////
       $("a.mail-favourite").off('click');
       $("a.mail-favourite").on('click',function(){
           $(this).toggleClass( "active" );
           var star=$(this).find(".fa");
       });

       //map.html
       //////////     MAP GOOGLE      //////////
       $(".mapTools").off('click');
       $(".mapTools").on('click',function(){
           $("#mapSetting").toggleClass( "active" );
       });
       $(".map-control-min").off('click');
       $(".map-control-min").on('click',function(){
           $("#mapControl").toggleClass( "active" );
           $(this).find("i").toggleClass( "fa-chevron-down" );
           $(this).find("i").toggleClass( "fa-chevron-up" );
       });




       //calendar.html
       $(".slide-trash").off('click');
       $(".slide-trash").on('click',function(){
           $("#slide-trash").toggleClass( "active" );
       });

       //chartOther.html
       $('.knob_save').off('click');
       $('.knob_save').on('click', function() {
           alert("Save  "+$("#add_item").val()+" Item");
       });
   }
});