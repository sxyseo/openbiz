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
				var div = "<ul data-color='red' class='iCheck'>";
				if(self._modelType == "internal"){
					for(var i = 0; i < self.collection.length; i++){
						var value = self.collection[i];
						var localeKey="selection"+self.metadata.name.charAt(0).toUpperCase()+self.metadata.name.slice(1) +display;
						var display = parent.locale[localeKey]?parent.locale[localeKey]:self.collection[i];
						div += "<li class='pull-left' style='margin-right: 10px'><input type='radio' name='"+self.metadata.name+"' data-value='"+value+"'/><label>"+display+"</label></li>";
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
								div += "<li class='pull-left' style='margin-right: 10px'><input type='radio' name='"+self.metadata.name+"'  data-value='"+value+"'/><label>"+display+"</label></li>";
							}
							div += "</ul></div>";
							self.parent.$el.find("."+self._selector).append(data+div);
							
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
					value = this._parseField(model,self._dataSource.valueField);
				}
			}
			var sel = "input:radio[name='"+this.metadata.name+"'][da='"+value+"']";
			$("."+this._selector).find(sel).attr('checked', 'true');
		},
		getValue:function(){
			var sel = "input:radio[name='"+this.metadata.name+"']:checked";
			return $("."+this._selector).find(sel).attr('data-value');
		},
		_update:function(){
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
		}
	});
});

