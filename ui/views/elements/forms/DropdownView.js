"use strict";
define(['./OptionElement'],function(element){
	return element.extend({
		_selector:null,
		init:function(metadata,parent,model){
			var defautValue = model.get(metadata.field);
			openbiz.OptionElement.prototype.init.call(this,metadata,parent);
			var self = this;
			this._parseModel(function(){
				self._selector = "record-"+self.metadata.name.toLowerCase();				
				var data = "<label class='control-label' >"+ parent.locale[self.metadata.fieldName] +"</label>";
				var select = "<select class='selectpicker form-control' parsley-required='true' parsley-error-container='div#select-com-error'>";
				if(typeof metadata.placeholder!="undefined"){
					var title = parent.locale["placeholder"+metadata.name.charAt(0).toUpperCase()+metadata.name.slice(1)];
					select += "<option value=''>"+title+"</option>";
				}

				if(self._modelType == "internal"){
					for(var i = 0; i < self.collection.length; i++){
						var display = self.collection[i];
						if(display == defautValue){
							select += "<option value='"+display+"' selected='selected' data-value-field='"+display+"' data-display-field='"+display+"'>"+display+"</option>";
						}
						else{
							select += "<option value='"+display+"' data-value-field='"+display+"' data-display-field='"+display+"'>"+display+"</option>";
						}
					}
					select += "</select><div id='select-com-error'></div>";
					$(self.parent.el).find("."+self._selector).append(data+select);
					$('.selectpicker').selectpicker();
				}else if(self._modelType == "model"){
					self.collection.fetch({
						success:function(){							
							for(var i = 0; i < self.collection.models.length; i++){
								var model = self.collection.models[i];
								var display =  self._parseField(model,self._dataSource.displayField);
								var value = self._parseField(model,self._dataSource.valueField);
								if(value == defautValue){
									select += "<option value="+display+" selected='selected' data-value-field='"+value+"' data-display-field='"+display+"'>"+display+"</option>";
								}
								else{
									select += "<option value="+display+" data-value-field='"+value+"' data-display-field='"+display+"'>"+display+"</option>";
								}
							}
							select += "</select><div id='select-com-error'></div>";
							if(self.parent._isModal){
								self.parent.$el.find("."+self._selector).append(data+select);
							}
							else{
								$(self.parent.el).find("."+self._selector).append(data+select);
							}

							$('.selectpicker').selectpicker();
						}
					});
				}
			});
			return this;
		},
		getValue:function(){
			var sel =  "."+this._selector + " option[value='"+$("."+this._selector).find(".selected").text()+"']";
			var value = $(sel).attr('data-value-field');
			return value;
		}
	});
});

