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


       //dashboard.html
       //////////     CAPLET CLOCK    //////////
       $('div#clock').capletClock();

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

       //////////     COLOR PALET     //////////
       $('#colorpalette1').colorPalette().off('selectColor');
       $('#colorpalette1').colorPalette().on('selectColor', function(e) {
           $('#selected-color1').val(e.color);
           $('#selected-color1').parent().find(".ico").css("color", e.color );
       });
       //////////     COLOR PALET  IN  ADD EVENT CALENDAR    //////////
       var cc_color= new Array();
       $.each(cepletColor, function(key,val) {
           cc_color.push(val) //put color for ceplet color
       });
       $('#colorpalette_events').colorPalette({ colors:[cc_color] }).off('selectColor');
       $('#colorpalette_events').colorPalette({ colors:[cc_color] }).on('selectColor', function(e) {
           var data=$(this).data();
           $(data.returnColor).val(e.color);
           $(this).parents(".input-group").find(".ico").css("color", e.color );
       });


       //////////     DATE TIME RANG      //////////
       $.('#daterange').daterangepicker();
       $('#reportrange').daterangepicker({
               startDate: moment().subtract('days', 29),
               endDate: moment(),
               minDate: '01/01/2012',
               maxDate: '12/31/2014',
               dateLimit: { days: 60 },
               /*parentEl:"#main",*/
               timePicker: false,
               timePickerIncrement: 1,
               timePicker12Hour: true,
               ranges: {
                   'Today': [moment(), moment()],
                   'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
                   'Last 7 Days': [moment().subtract('days', 6), moment()],
                   'This Month': [moment().startOf('month'), moment().endOf('month')],
                   'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
               },
               opens: 'left',
               buttonClasses: ['btn-sm'],
               applyClass: 'btn-inverse',
               cancelClass: 'btn-inverse',
               format: 'MM/DD/YYYY',
               separator: ' to ',
               locale: {
                   fromLabel: 'From',
                   toLabel: 'To',
                   customRangeLabel: 'Custom Range',
                   daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr','Sa'],
                   monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                   firstDay: 1
               }
           },
           function(start, end) {
               console.log("Callback has been called!");
               $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
           }
       );
       $('#reportrange span').html(moment().subtract('days', 29).format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));

   }
});