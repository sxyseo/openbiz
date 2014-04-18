"use strict";
define(['./OptionElement',
		'text!./DropdownView.html'],
	function(element,templateData){
	return element.extend({
		_selector:null,
		n_init:function(metadata,parent,model){
			openbiz.OptionElement.prototype.init.call(this,metadata,parent);
			var selector = "div.field-"+metadata.name.toLowerCase();
			if (parent.$el.find(selector).length == 0) return; //ignore it, if it doesn't mount on UI
			if (parent.$el.find(selector).children().length>0) return; //ignore it, if has custom template

			if(typeof metadata.permission!='undefined'){
				if(typeof openbiz.session.me=='undefined' || !openbiz.session.me.hasPermission(metadata.permission)){							
					return ;
				}
			}
			var template = _.template(templateData);
			var labelLocaleKey = 'field'+metadata.name.charAt(0).toUpperCase()+metadata.name.slice(1);
			var placeholderLocaleKey = 'field'+metadata.name.charAt(0).toUpperCase()+metadata.name.slice(1);
			
			metadata.displayName = parent.locale[labelLocaleKey]?parent.locale[labelLocaleKey]:metadata.displayName;		
			metadata.className = metadata.className?metadata.className.replace(/\./g," "):'';
			metadata.icon = metadata.icon?metadata.icon.replace(/\./g," "):"";			
			metadata.placeholder = parent.locale[placeholderLocaleKey]?parent.locale[placeholderLocaleKey]:metadata.placeholder;		
			metadata.elemName = "record-"+metadata.name.toLowerCase();
			if(!metadata.displayValue) metadata.displayValue = metadata.field;
			if(metadata.displayValue.indexOf("{{")!=-1){
				metadata.displayValue =  _.template(metadata.displayValue,
													{record:model},
													{
														evaluate    : /\{%([\s\S]+?)%\}/g,
														interpolate : /\{\{([\s\S]+?)\}\}/g,
														escape      : /\{-([\s\S]+?)\}/g
													});
			}else{
				if(metadata.displayValue.indexOf('.')==-1){
					metadata.displayValue = model[metadata.displayValue]?model[metadata.displayValue]:model.get(metadata.displayValue);
				}else{
					  var attrArray = metadata.displayValue.split('.');
				      var data = model.get(attrArray[0]);
				      var value = data;
					  for(var i =1; i<attrArray.length; i++){
				        var indexName = attrArray[i];
				        value = value[indexName];
				      }  
				      metadata.displayValue = value;
				}
			}	

			var renderElement = function(){
				parent.$el.find(selector).replaceWith($(template(metadata)).addClass("field-"+metadata.name.toLowerCase()));
				parent.$el.find(selector).find("select").selectpicker();
			}
			metadata.options = [];
			var self = this;

			this._parseModel(function(){
				if(self._modelType != "model"){
					//internal
					for(var i = 0; i < self.collection.length; i++){
						metadata.options.push({
							value:self.collection[i]
						});				
					}
					renderElement();
				}else{
					//model
					self.collection.fetch({
						success:function(){	
							for(var i = 0; i < self.collection.models.length; i++){
								var model = self.collection.models[i];
								metadata.options.push({
									value: self._parseField(model,self._dataSource.valueField),
									display: self._parseField(model,self._dataSource.displayField)
								});									
							}
							renderElement();
						}
					})
				}
			})
		},
		init:function(metadata,parent,model){
			var defautValue = model.get(metadata.field);
			openbiz.OptionElement.prototype.init.call(this,metadata,parent);
			var self = this;
			this._parseModel(function(){
				self._selector = "field-"+self.metadata.name.toLowerCase();								
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
			var value = $(sel).attr('value');
			return value;
		}
	});
});

