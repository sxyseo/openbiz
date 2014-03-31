"use strict";
define(['./OptionElement'],function(element){
	return element.extend({
		_selector:null,
		init:function(metadata,parent,defautValue){
			openbiz.OptionElement.prototype.init.call(this,metadata,parent);
			var self = this;

			this._parseModel(function(){
				self._selector = "record-"+self.metadata.name.toLowerCase();
				var data = "<label class='control-label'>"+self.metadata.displayName+"</label>";
				var select = "<select class='selectpicker form-control' data-size='7'>";

				if(self._modelType == "internal"){
					for(var i = 0; i < self.collection.length; i++){
						var display = self.collection[i];
						if(display == defautValue){
							select += "<option value="+i+" selected='selected'>"+display+"</option>";
						}
						else{
							select += "<option value="+i+">"+display+"</option>";
						}
					}
					select += "</select>";
					$(self.parent.el).find("."+self._selector).append(data+select);
					$('.selectpicker').selectpicker();
				}else if(self._modelType == "model"){
					self.collection.fetch({
						success:function(){
							for(var i = 0; i < self.collection.models.length; i++){
								var model = self.collection.models[i];
								var display = model.get(self._dataSource.path);
								if(display == defautValue){
									select += "<option value="+i+" selected='selected'>"+display+"</option>";
								}
								else{
									select += "<option value="+i+">"+display+"</option>";
								}
							}
							select += "</select></div>";
							$(self.parent.el).find("."+self._selector).append(data+select);
							$('.selectpicker').selectpicker();
						}
					});
				}
			});
			return this;
		},
		getValue:function(){
			return $("."+this._selector).find(".filter-option").text();
		}
	});
});

