define(function(){
    return function(elem) {

        if(typeof elem =='undefined'){
            elem = $('body');
        }

        $("nav#menu a").not(".mm-subclose,.mm-subopen").click(function(event){
            window.location.href = $(this).attr('href');
        })

        $(elem).find('.iCheckColor li').off('click.openbizCustom');
        $(elem).find('.iCheckColor li').on('click.openbizCustom',function(){
            var self = $(this);
            if (!self.hasClass('active')) {
                self.siblings().removeClass('active');
                var color = self.attr('class');
                $(elem).find('.iCheck').each(function(i) {
                    $(this).data("color",color)
                });
                $(elem).find('.iCheck input').iCheck('destroy');
                createiCheck();
                self.addClass('active');
            };
        });

        //////////     MOBILE CHECK    //////////
        var iOS = /(iPad|iPhone|iPod)/g.test( navigator.userAgent );
        var android = /mobile|android/i.test (navigator.userAgent);

        if(iOS || android){
            $("html").addClass("isMobile");
            if(iOS) { $(".form-control").css("-webkit-appearance","caret"); }
            $("select.input-sm,select.input-lg ").css("line-height","1.3");
        }


        //////////     CAPLET COLOR    //////////
        var cepletColor=(openbiz.colorSetting);
        $.inColor= function(value, obj) {
            var foundVal;
            $.each(obj, function(key, val) {
                if (value === key) {
                    foundVal =  val;
                    return;
                }
            });
            return foundVal;
        };
        $.fillColor= function(obj) {
            var inColor=$.inColor(obj.data("color") || obj.data("toolscolor")  , cepletColor);
            var codeColor= inColor || obj.data("color") || obj.data("toolscolor") ;
            return codeColor;
        };
        $.rgbaColor=function( hex, opacity) {
            var bigint = parseInt(hex.replace("#",""), 16),
                r = (bigint >> 16) & 255,
                g = (bigint >> 8) & 255,
                b = bigint & 255;
            if(opacity || opacity<=1){
                return "rgba("+r + "," + g + "," + b+","+ ( opacity || 1 )+")";
            }else{
                return "rgb("+r + "," + g + "," + b+")";
            }
        }



        //////////     TIME AGO  FUNCTION   //////////
        var zeropad = function(num) {
            return ((num < 10) ? '0' : '') + num;
        };
        var iso8601 = function(date) {
            return date.getUTCFullYear() + "-" + zeropad(date.getUTCMonth() + 1) + "-" + zeropad(date.getUTCDate()) + "T" + zeropad(date.getUTCHours()) + ":" + zeropad(date.getUTCMinutes()) + ":" + zeropad(date.getUTCSeconds()) + "Z";
        };
        function prepareDynamicDates() {
            $('time.timeago.lasted').attr("datetime", iso8601(new Date()));
        }
        //////////     TIME AGO    //////////
        prepareDynamicDates();        
        $(elem).find('time.timeago').timeago();
        



        //////////     TEXTAREA  AUTO SIZE    //////////    
        $(elem).find('textarea[data-height="auto"]').autosize();
        $(elem).find(".widget-write-post textarea").limit({  limit: 20 });
    

        //////////     SELETE PICKseER    //////////
        $(elem).find('.selectpicker').selectpicker();

        //////////     INPUT MAXLENGTH    //////////
        $(elem).find("input[maxlength] , textarea[maxlength] ").each(function() {
            var self = $(this);
            self.maxlength({ bornIn:"#main" });
        });

        //////////     PRETTY PRINT CODE    //////////
        addEventListener('load', function (event) { prettyPrint() }, false);


        //////////     TAB DROP    //////////
        $(elem).find('[data-provide="tabdrop"]').tabdrop();

        //Map Collapse
        $(elem).find('a[data-toggle="collapse"]').off('click.openbizCustom');
        $(elem).find('a[data-toggle="collapse"]').on('click.openbizCustom',function(){
            var caret=$(this).find(".collapse-caret");
            caret.toggleClass( "fa-angle-down" );
            caret.toggleClass( "fa-angle-up" );
        });

        //////////     WIDGET IM      //////////
        $(elem).find("a.im-delete , a.im-action").off('click.openbizCustom');
        $(elem).find("a.im-delete , a.im-action").on('click.openbizCustom',function(){
            var self = $(this);
            imClose(self,self.closest('section'));
            self.closest('section').toggleClass( "push-in" );
        });

        $(elem).find("a.im-confirm").off('click.openbizCustom');
        $(elem).find("a.im-confirm").on('click.openbizCustom',function(){
            var aClick=$(this), confirm=aClick.data("confirm"), parents=aClick.closest('li');
            var imWrapper=aClick.closest("ul");
            var confirmClose=function(){
                parents.fadeOut(400,function(){
                    $(this).remove();
                    setTimeout(function () { imClose(aClick,imWrapper) }, 200);
                });
            }
            if(confirm=="yes" || confirm=="accept"){
                confirmClose();
            }
            if(confirm=="actionNow"){
                alert("Your Action Complete !!")
                confirmClose();
            }
            if(confirm=="no" ){
                parents.find("section").toggleClass( "push-in" );
            }
        });
        var imClose=(function (el , wrapper) {
            if(el.hasClass("im-delete") || el.hasClass("im-action") ){
                el.parents('ul').find('li section').not(wrapper).removeClass("push-in");
            }
            if(el.hasClass("im-confirm")){
                var  nLi=wrapper.find('li').length;
                if(!nLi){
                    wrapper.append('<li class="empty"><i class="fa fa-inbox fa-4x"></i><h5>No Result.</h5></li>');
                }
            }
        });

        //////////     DATA  COLOR  CHANGE    //////////
        $(elem).find('label[data-color]').each(function(i) {
            var label=$(this);
            label.css("border-top-color", $.fillColor(label) );
        });
        $(elem).find('.label[data-color] ,  .badge[data-color] ').each(function(i) {
            var label=$(this);
            label.css("background-color", $.fillColor(label) );
        });
        $(elem).find('.alert[data-color]').each(function(i) {
            var alerts=$(this);
            alerts.css({ "background-color":$.fillColor(alerts),"color":"#FFF" });
        });
        $(elem).find('.panel-heading[data-color]').each(function(){
            var heading=$(this);
            headingColor=$.fillColor(heading) ;
            heading.css("background-color", headingColor );
            heading.find("h2").css("color","#FFF");
            heading.find("label").css({ "background-color":$.xcolor.darken( headingColor , 1 , 13),"color":"#FFF"});
        });
        $(elem).find('.progress-bar[data-color]').each(function(i) {
            var progress=$(this);
            progress.css("background-color", $.fillColor(progress) );
        });
        $(elem).find('.well[data-color]').each(function(i) {
            var well=$(this);
            well.css({"background-color":$.fillColor(well),"color": well.data("fcolor") || "#FFF" });
        });
        $(elem).find('.btn[data-color]').each(function(i) {
            var btn=$(this);
            btn.css({"background-color":$.fillColor(btn),"border-color": $.fillColor(btn) ,"color": btn.data("fcolor") || "#FFF" });
        });
        $(elem).find('.avatar-link[data-color]').each(function(i) {
            var elLink=$(this), btn=elLink.find(".btn"),
                elLinkColor=$.fillColor(elLink);
            btn.each(function(i) {
                $(this).css({ "background-color": elLinkColor , "border-left-color": $.xcolor.darken( elLinkColor , 1 , 13) });
            });
        });
        $(elem).find('.widget-im .im-thumbnail[data-color]').each(function(i) {
            var thumbnail=$(this),
                thumbnailColor=$.fillColor(thumbnail);
            thumbnail.css({ "background-color": thumbnailColor , "border-color": thumbnailColor });
            thumbnail.find("i").css({"color": thumbnail.data("btn-fcolor") || $.xcolor.darken( thumbnailColor , 3 , 13) });
        });
        $(elem).find('[data-btn-group="monochromatic"]').each(function(i) {
            var group=$(this),fontColor, btn=$(this).find(".btn"),
                color=$.inColor($(this).data("btn-color"), cepletColor);
            btn.each(function(i) {
                if(group.data("btn-step")==="lighten"){
                    btncolor=$.xcolor.lighten( color || group.data("btn-color") || "#CCC", i == 0 ? i :  i+1 , group.data("btn-color-step") || 9);
                }else{
                    btncolor= $.xcolor.darken( color || group.data("btn-color") || "#AAA",  i == 0 ? i :  i+1  ,group.data("btn-color-step") || 13) ;
                }
                $(this).css({"background-color": btncolor,"border-color":btncolor ,"color": group.data("btn-fcolor") || "#FFF" });

            });
        });
        $(elem).find('.modal[data-header-color]').each(function(i) {
            var modal=$(this), header=$(this).find(".modal-header"),
                color=$.inColor($(this).data("header-color"), cepletColor);
            headerColor= color || modal.data("header-color") || "#FFF";
            borderColor= $.xcolor.darken( headerColor , 1 , 13) ;
            header.css({"background-color": headerColor ,"border-bottom-width": "5px" ,"border-color":borderColor ,"color": modal.data("header-fcolor") || "#FFF" });
        });

        //Global function
        //////////     PROGRESS BAR      //////////
        $(elem).find('.progress-bar').progressbar({ display_text: 'tooltip' });


        //Global function
        //////////     TOOLTIP AND POPOVER     //////////
        $(elem).find('.tooltip-area .btn').tooltip();
        $(elem).find('.tooltip-area a[data-toggle="tooltip"]').tooltip();
        $(elem).find('.popover-area [data-toggle="popover"]').popover();
        $(elem).find('.popover-area-hover [data-toggle="popover"]').popover({ trigger:"hover" });

        //////////     TIME LINE  MARK RE SIZE    //////////
        $(elem).find(".widget-timeline li").each(function(i) {
            var data = $(this).data();
            if(data.color){
                $(this).css({"border-color": data.color ,"color": data.fcolor || "#FFF" });
                $(this).find("section").css({"background-color": data.color });
            }
        });
        $(elem).find("div.mark").not(".bgimg").each(function() {
            var data = $(this).data();
            if(data.color){
                $(this).css({"background-color": data.color ,"line-height": parseInt($(this).height()+20)+"px" });
            }
        });



        //////////     CORNER FLIP    //////////
        $(elem).find(".corner-flip").each(function(i) {
            $(this).append('<div class="flip" />');
        });



        //////////     HORIZONTAL FORM  AUTO GENERENT COLUMN       //////////
        $(elem).find(".form-horizontal").each(function() {
            var form=$(this) ,data=$(this).data(), colClass= "col-"+( data.col || "md" ), coldiv="" ,
                colOffset=colClass+"-offset-", labelClass=colClass +"-"+( data.collabel || "2" );
            if(data.collabel){
                coldiv=12-parseInt(data.collabel);
            }
            var divClass=colClass +"-"+( coldiv || "10" );
            $(this).find(".form-group").each(function(i) {
                $div=$(this).find("div").eq(0);
                $label=$(this).find("label.control-label");
                if($(this).hasClass("offset")){
                    $div.addClass(colOffset+(data.collabel || "2"));
                }
                if(data.alignlabel){
                    $label.css("text-align",data.alignlabel);
                }
                if(data.label){
                    form.addClass('labelcustomize');
                    $text=$label.html();
                    $label.html("").append('<span class="'+data.label+'">'+$text+'</span>');
                    $label.find("span.icon").css({"border-color": data.colorlabel || "#EEE" });
                }
                if(!$(this).hasClass("none")){
                    $label.addClass(labelClass);
                    $div.addClass(divClass);
                }
            });
            if(data.label=="icon"){
                form.append('<div class="icon '+labelClass+' '+data.alignlabel+'" />')
                form.find("div.icon").css({"border-color": data.colorlabel || "#EEE" });
            }
        });



        //////////     ICHECK     //////////
        var createiCheck = (function() {
            $('.iCheck').each(function(i) {
                var  data=$(this).data() ,
                    input=$(this).find("input") ,
                    li=$(this).find("li") ,
                    index="cp"+i ,
                    insert_text,
                    iCheckColor = [ "black", "red","green","blue","aero","grey","orange","yellow","pink","purple"],
                    callCheck=data.style || "flat";
                if(data.color && data.style !=="polaris" && data.style !=="futurico" ){
                    hasColor= jQuery.inArray(data.color, iCheckColor);
                    if(hasColor !=-1 && hasColor < iCheckColor.length){
                        callCheck=callCheck+"-"+data.color;
                    }
                }
                input.each(function(i) {
                    var self = $(this), label=$(this).next(), label_text=label.html();
                    self.attr("id","iCheck-"+index+"-"+i);
                    if(data.style=="line"){
                        insert_text='<div class="icheck_line-icon"></div><span>'+label_text+'</span>';
                        label.remove();
                        self.iCheck({ checkboxClass: 'icheckbox_'+callCheck, radioClass: 'iradio_'+callCheck, insert:insert_text  });
                    }else{
                        label.attr("for","iCheck-"+index+"-"+i);
                    }
                });
                if(data.style!=="line"){
                    input.iCheck({ checkboxClass: 'icheckbox_'+callCheck, radioClass: 'iradio_'+callCheck });
                }else{
                    li.addClass("line");
                }
            });
        });
        createiCheck();



        $(elem).find('.ios-switch .switch').each(function(i) {
            $(this).addClass("ios");
        });
        $(elem).find('.ios').each(function(i,elem){
            if(!$(elem).hasClass('has-switch')){
                $(elem).bootstrapSwitch();
            }
        })
        $(elem).find('.ios').bootstrapSwitch('setOnLabel', '');
        $(elem).find('.ios').bootstrapSwitch('setOffLabel', '');


//////////     ICHECK     //////////
        $(elem).find(".ios-switch input:checkbox").change(function(){
            var targetLabel=$(this).parents('li').find("label span")		;
            if( $(this).is(':checked')){
                targetLabel.text("ON");
            }else{
                targetLabel.text("OFF");
            }
        });


///     ///////     COLOR PICKER     //////////
        $(elem).find('[data-provide="colorpicker"]').each(function(i) {
            var id="color_"+i, $this=$(this).attr("id",id), data=$(this).data(),
                submit_btn=data.inline ? 0:1;
            if(data.addon && $this.is("input")){
                $('#'+id).next().css("width",$(this).outerHeight());
            }
            $this.colpick({
                bornIn:"#main",
                flat: data.inline || false,
                submit: submit_btn,
                layout: data.layout || 'hex',
                color: $this.val() || $.xcolor.random(),
                colorScheme: data.theme || "gray",
                onChange:function(hsb,hex,rgb) {
                    $('#'+id).val('#'+hex);
                    if(data.addon){
                        $('#'+id).css({'border-color':'#'+hex });
                        $('#'+id).next().css({'background-color':'#'+hex , 'border-color':'#'+hex });
                    }
                },
                onSubmit:function(hsb,hex,rgb,el) {
                    $(el).val('#'+hex);
                    $(el).colpickHide();
                }
            });
        });





        //////////     DATE TIME PICKER     //////////
        $('.form_datetime').datetimepicker({
            bornIn:"#main",
	        maskInput: true,
	        minView:2,
	        weekStart:1,
	        language:"cn",
	        autoclose: true,
	        todayBtn: true,
	        pickerPosition: "bottom-left"
        });

        //////////     PANEL  TOOLS     //////////
        $(elem).find(".panel-tools[data-toolscolor]").each(function(i) {
            var tools=$(this),
                data=$(this).data(),
                btn=$(this).find(".btn"),
                step="";
            data.colorStep  = data.colorStep || true;
            if(tools.prev().hasClass("panel-heading") && !tools.hasClass("panel-tools-mini") ){
                tools.prev().css("border","none");
            }
            if(data.toolscolor){
                tools.css({"background-color":$.fillColor(tools) }) ;
                tools.parent().find(".panel-body .table thead > tr > th").css("border-bottom-color", $.fillColor(tools) );
            }
            btn.each(function(i) {
                $(this).css("background-color",$.xcolor.darken( $.fillColor(tools) , data.colorStep==false? 1:i+1 ,15))	;
            });
        });
        $(elem).find('.panel-tools .btn-collapse').off('click.openbizCustom');
        $(elem).find('.panel-tools .btn-collapse').on('click.openbizCustom', function () {
            var btn=$(this), panelBody=btn.closest(".panel").find(".panel-body");
            btn.toggleClass("in");
            btn.find("i").toggleClass( "fa-sort-amount-desc" );
            btn.find("i").toggleClass( "fa-sort-amount-asc" );
            if ($(this).hasClass("in")) {
                panelBody.slideUp();
            } else {
                panelBody.slideDown();
            }
        });

        $(elem).find('.panel-tools .btn-reload').off('click.openbizCustom');
        $(elem).find('.panel-tools .btn-reload').on('click.openbizCustom', function () {
            var  btn=$(this), panelBody=btn.closest(".panel").find(".panel-body"),
                overlay=$('<div class="load-overlay"><div><div class="c1"></div><div class="c2"></div><div class="c3"></div><div class="c4"></div></div><span>Loading...</span></div>');
            btn.removeClass("btn-panel-reload").addClass("disabled")
            panelBody.append(overlay);
            overlay.css('opacity',1).fadeIn();
            setTimeout(function () {
                btn.removeClass("disabled").addClass("btn-panel-reload") ;
                panelBody.find(overlay).fadeOut("slow",function(){ $(this).remove() });
            }, 5000);
        });

        $(elem).find(".panel-tools").off('click.openbizCustom');
        $(elem).find(".panel-tools").on('click.openbizCustom',".btn-close",function(){
            var panel=$(this).closest('.panel'), tools=$(this).closest('.panel-tools');
            console.log(tools)
            var confirmGroup=$('<div class="pt-confirm-group">'+'<div class=" btn-group btn-group-justified">'+'<a class="btn btn-inverse close-confirm" href="javascript:void(0)" data-confirm="accept">Yes</a>'+'<a class="btn btn-theme btn-close" href="javascript:void(0)">No.</a>'+'</div>'+'</div>');
            var blockClose=$('<div class="blockerClose">');
            tools.toggleClass( "push-in");
            if(tools.hasClass("push-in")){
                tools.append(confirmGroup);
                panel.toggleClass( "push-in");
                blockClose.appendTo("#content");
                blockClose.css({ "height":$("#content").outerHeight() }).fadeTo(400,0.5);
                console.log($("#content").outerHeight())
            }else{
                $(".blockerClose").fadeOut(200,function(){ $(this).remove() });
                setTimeout(function () {
                    tools.find(".pt-confirm-group").remove();
                    panel.toggleClass( "push-in") ;
                }, 500);
            }
        });
        $(elem).find(".panel-tools").on('click.openbizCustom','.close-confirm',function(){
            $(this).closest('.panel').fadeOut(500,function(){
                $(this).remove();
                $(".blockerClose").fadeOut(200,function(){ $(this).remove() });
            });
        });
        $(elem).find('#content').off('click.openbizCustom');
        $(elem).find('#content').on('click.openbizCustom' ,'.blockerClose', function() {
            var el=$(this);
            el.fadeOut(200,function(){ $(this).remove() });
            $(".panel-tools.push-in").toggleClass("push-in",function(){
                var tools=$(this);
                setTimeout(function () {
                    tools.find(".pt-confirm-group").remove();
                    tools.closest('.panel').removeClass("push-in");
                }, 500);
            });
        });



//////////     FLOT  CHART     //////////
        var bars = false,
            lines = true,
            pie=false;
        var createFlot=function($chageType , $change){
            var el=$("table"+($change ? $change:".flot-chart"));
            el.each(function() {
                var colors = [], data = $(this).data(),
                    gridColor=data.tickColor || "rgba(0,0,0,0.2)";
                $(this).find("thead th:not(:first)").each(function() {
                    colors.push($(this).css("color"));
                });
                if($chageType){
                    bars = $chageType.indexOf("bars") != -1;
                    lines = $chageType.indexOf("lines") != -1;
                    pie = $chageType.indexOf("pie") != -1;
                    $(this).next(".chart_flot").hide();
                }else{
                    if(data.type){
                        bars = data.type.indexOf("bars") != -1;
                        lines = data.type.indexOf("lines") != -1;
                        pie = data.type.indexOf("pie") != -1;
                    }
                }
                $(this).graphTable({ series: 'columns', position: data.position || 'after',  width: data.width, height: data.height, colors: colors },
                    {
                        series: { stack: data.stack ,    pie: { show: pie , innerRadius: data.innerRadius || 0,  stroke: {  shadow: data.pieStyle=="shadow" ? true:false } , label:{ show:data.pieLabel } }, bars: { show: bars , barWidth: data.barWidth || 0.5, fill: data.fill || 1, align: "center" } ,lines: { show: lines  , fill:0.1 , steps: data.steps } },
                        xaxis: { mode: "categories", tickLength: 0 },
                        yaxis: { tickColor: gridColor ,max:data.yaxisMax,
                            tickFormatter: function number(x) {  var num; if (x >= 1000) { num=(x/1000)+"k"; }else{ num=x; } return num; }
                        },
                        grid: { borderWidth: {top: 0, right: 0, bottom: 1, left: 1},color : gridColor },
                        tooltip: data.toolTip=="show" ? true:false  ,
                        tooltipOpts: { content: (pie ? "%p.0%, %s":"<b>%s</b> :  %y")  }
                    });
            });
        }
// Create Flot Chart
        createFlot();

        $(elem).find(".chart-change .btn").off('click.openbizCustom');
        $(elem).find(".chart-change .btn").on('click.openbizCustom',function(e){
            var el=$(this),data=el.data();
            el.closest(".chart-change").find(".btn").toggleClass("active");
            createFlot(data.changeType,data.forId);
        });

        $(elem).find(".label-flot-custom").each(function () {
            var el=$(this), data=el.data() ,colors = [] ,lable=[] , li="";
            $(data.flotId).find("thead th:not(:first)").each(function() {
                colors.push($(this).css("color"));
                lable.push($(this).text());
            });
            for(var i=0;i<lable.length;i++){
                li += '<li><span style="background-color:'+ colors[i] +'"></span>'+ lable[i] +" ( "+$(data.flotId).find("tbody td").eq(i).text()+' ) </li> ';
            }
            el.append("<ul>"+li+"</ul>");
            if($(data.flotId).prev(".label-flot-custom-title")){
                var height=$(data.flotId).next(".chart_flot").css("height");
                $(data.flotId).prev(".label-flot-custom-title").css({"height":height, "line-height":height });
            }
        });



        //////////     KNOB  CHART     //////////
        $(elem).find('.knob').each(function () {
            var thisKnob = $(this) , $data = $(this).data();
            $data.fgColor=$.fillColor( thisKnob ) || "#F37864";
            thisKnob.knob($data);
            if ( $data.animate ) {
                $({  value: 0 }).animate({   value: this.value }, {
                    duration: 1000, easing: 'swing',
                    step: function () { thisKnob.val(Math.ceil(this.value)).trigger('change'); }
                });
            }
        });

        $(elem).find(".showcase-chart-knob").each(function () {
            var color='', ico=$(this).find("h5 i"),  $label=$(this).find("span"), $knob=$(this).find("input");
            $label.each(function (i) {
                if (i == 0) {
                    color = $knob.attr("data-color")  || '#87CEEB' ;
                }else{
                    color=$knob.attr("data-bgColor")  || '#CCC';
                }
                $(this).find("i").css("color", color );
                $(this).find("a small").css("color", color );
            });
            ico.css("margin-left",Math.ceil(-1*(ico.width()/2)));
        });



        //////////     SPARKLINE CHART     //////////
        $(elem).find('.sparkline[data-type="bar"]').each(function () {
            if($(this).find('canvas').length) return;	//prevent repeat binding
            var thisSpark=$(this) , $data = $(this).data();
            $data.barColor = $.fillColor( thisSpark ) || "#6CC3A0";
            $data.minSpotColor = false;
            thisSpark.sparkline($data.data || "html", $data);
        });
        $(elem).find('.sparkline[data-type="pie"]').each(function () {
            if($(this).find('canvas').length) return;	//prevent repeat binding
            var thisSpark=$(this) , $data = $(this).data();
            $data.barColor = $.fillColor( thisSpark ) || "#6CC3A0";
            $data.minSpotColor = false;
            thisSpark.sparkline($data.data || "html", $data);
        });
        var sparklineCreate = function($resize) {
            $('.sparkline[data-type="line"]').each(function () {
                if($(this).find('canvas').length) return;	//prevent repeat binding
                var thisSpark=$(this) , $data = $(this).data();
                $data.lineColor = $.fillColor( thisSpark ) || "#F37864";
                $data.fillColor = $.rgbaColor( ($.fillColor( thisSpark ) || "#F37864") , 0.1 );
                $data.width = $data.width || "100%";
                $data.lineWidth = $data.lineWidth || 3;
                $(this).sparkline($data.data || "html", $data);
                if($data.compositeForm){
                    var thisComposite=$($data.compositeForm);
                    $comData=thisComposite.data();
                    $comData.composite = true;
                    $comData.lineWidth = $data.lineWidth || 3;
                    $comData.lineColor = $.fillColor( thisComposite ) || "#F37864";
                    $comData.fillColor = $.rgbaColor( ($.fillColor( thisComposite ) || "#6CC3A0") , 0.1 );
                    $(this).sparkline($comData.data , $comData);
                }
            });
        }
        var sparkResize;
        $(window).resize(function(e) {
            clearTimeout(sparkResize);
            sparkResize = setTimeout(sparklineCreate(true), 500);
        });
        sparklineCreate();
        $('.label-sparkline span[data-color]').each(function(i) {
            var label=$(this);
            label.css("background-color", $.fillColor(label) );
        });



        //////////     EASY PIE CHART     //////////
        $(elem).find('.avatar-chart').easyPieChart({
            lineCap: "butt",
            trackColor:'#2E2E31',
            barColor: openbiz.colorSetting['theme-inverse'],
            scaleColor:false,
            size: 118,
            lineWidth:5
            , onStep: function(from, to, percent) {
                $(this.el).find('.percent').text(Math.round(percent));
            }
        });
        $(elem).find('.easy-c').easyPieChart({
            lineCap: "butt",
            trackColor:'#EEE',
            barColor: "#F19F34",
            scaleColor:false,
            size:138,
            lineWidth:15
            ,onStep: function(from, to, percent) {
                $(this.el).find('.percent').text(Math.round(percent));
            }
        });
        $(elem).find('.easy-chart').each(function () {
            var thisEasy=$(this) , $data = $(this).data();
            $data.barColor = $.fillColor( thisEasy ) || "#6CC3A0";
            $data.size = $data.size || 119;
            $data.trackColor = $data.trackColor  || "#EEE";
            $data.lineCap = $data.lineCap  || "butt";
            $data.lineWidth = $data.lineWidth  || 20;
            $data.scaleColor = $data.scaleColor || false,
                $data.onStep = function(from, to, percent) {
                    $(this.el).find('.percent').text(Math.round(percent));
                }
            thisEasy.find('.percent').css({"line-height": $data.size+"px"});
            thisEasy.easyPieChart($data);
        });

        $(elem).find('.js_update').off('click.openbizCustom');
        $(elem).find('.js_update').on('click.openbizCustom', function() {
            $('.easy-chart').each(function () {
                var chart = window.chart = $(this).data('easyPieChart');
                chart.update(Math.random()*100);
            });
        });


    }
});
