"use strict";
define(['./OptionElement'],function(element){
	return element.extend({
		_selector:null,
		init:function(metadata,parent,model){
			var defautValue = model.get(metadata.field);
			openbiz.OptionElement.prototype.init.call(this,metadata,parent);
			var self = this;
			this._parseModel(function(){
				self._selector = "field-"+self.metadata.name.toLowerCase();
				var data = "<div class='form-group'><label class='control-label'>"+ parent.locale[self.metadata.fieldName] +"</label>";
				var div = "<ul class='iCheckColor'>";
				if(self._modelType == "internal"){
					for(var i = 0; i < self.collection.length; i++){
						var display = self.collection[i];
						div += "<li name='"+self.metadata.name+"' style=\"background-color:#"+display+"\" data-value=\""+display+"\" class=\"color-"+display+"\" ></li>";
					}
					div += "</ul></div>";
					$(self.parent.el).find("."+self._selector).append(data+div);
					self._setDefaultValue(defautValue);
					self._update();
				}else if(self._modelType == "model"){
					self.collection.fetch({
						success:function(){
							for(var i = 0; i < self.collection.models.length; i++){
								var model = self.collection.models[i];
								var display =  self._parseField(model,self._dataSource.displayField);
								var value = self._parseField(model,self._dataSource.valueField);
								div += "<li name='"+self.metadata.name+"' style=\"background-color:#"+value+"\" data-value=\""+value+"\" class=\"color-"+display+"\" ></li>";
							}
							div += "</ul></div>";
							$(self.parent.el).find("."+self._selector).append(data+div);
							self._setDefaultValue(defautValue);
							self._update();
						}
					});
				}
			});
			return this;
		},
		_setDefaultValue:function(value){
			if(value == null || typeof value != "undefined")
			{
				if(this._modelType == "internal"){
					value = this.collection[0];
				}else{
					var model = this.collection.models[0];
					value = this._parseField(model,this._dataSource.displayField);
				}
			}
			var sel = "input:radio[name='"+this.metadata.name+"'][data-display-field='"+value+"']";
			$("."+this._selector).find(sel).attr('checked', 'true');
		},
		getValue:function(){
			return $("."+this._selector).find('.active').attr('data-value')
		},
		_update:function(){

			var createiCheck = (function() {
				$('ul.iCheckColor').each(function(i) {
					var  data=$(this).data() ,
						input=$(this).find("input") ,
						li=$(this).find("li") ,
						index="cp"+i ,
						insert_text,
						iCheckColor = [ "black", "red","green","blue","aero","grey","orange","yellow","pink","purple"],
						callCheck=data.style || "flat";
					if(data.color && data.style !=="polaris" && data.style !=="futurico" ){
						var hasColor= jQuery.inArray(data.color, iCheckColor);
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
			var self =this;
			var elem = $(self.parent.el).find("."+self._selector);
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
		}
	});
});