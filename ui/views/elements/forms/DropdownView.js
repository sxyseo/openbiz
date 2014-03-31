"use strict";
define(['./OptionElement'],function(element){
	return element.extend({
		_selector:null,
		init:function(metadata,parent,defautValue){
			openbiz.OptionElement.init.call(this,metadata,parent);
			var self = this;
			this._parseModel(function(){
				self._selector = "record-"+self.metadata.name.toLowerCase();
				var data = "<div class='form-group'><label class='control-label'>"+self.metadata.displayName+"</label>";
				var select = "<select class='selectpicker form-control' style='display: none;'>";
				var dropdown = "<div class='btn-group bootstrap-select form-control' style='display: none'></div>"
				if(self._modelType == "internal"){
					for(var i = 0; i < self.collection.length; i++){
						var display = self.collection[i];
						select += "<option value="+i+">"+display+"</option>";
					}
					select += "</select>";
					dropdown += "</div>";
					$(self.parent.el).find("."+self._selector).append(data+select+dropdown);
					self._setDefaultValue(defautValue);
				}else if(self._modelType == "model"){
					self.collection.fetch({
						success:function(){
							for(var i = 0; i < self.collection.models.length; i++){
								var model = self.collection.models[i];
								var display = model.get(self._dataSource.path);
								select += "<option value="+i+">"+display+"</option>";
							}
							select += "</select>";
							dropdown += "</div>";
							$(self.parent.el).find("."+self._selector).append(data+select+dropdown);
							self._setDefaultValue(defautValue);
						}
					});
				}
			});
			return this;
		},
		_setDefaultValue:function(value){
			if(value != null && typeof value != "undefined")
				$("."+this._selector).find(".filter-option").text(value);
		},
		getValue:function(){
			return $("."+this._selector).find(".filter-option").text();
		}
	});
});

