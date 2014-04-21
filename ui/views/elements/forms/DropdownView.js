"use strict";
define(['./OptionElement',
		'text!./DropdownView.html'],
	function(element,templateData){
	return element.extend({
		_selector:null,
		_parent:null,
		init:function(metadata,parent,model){
			openbiz.OptionElement.prototype.init.call(this,metadata,parent);
			var selector = "div.field-"+metadata.name.toLowerCase();
			this._selector = selector;
			this._parent = parent;
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
			metadata.multiple = metadata.multiple?metadata.multiple:false;
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
				if(metadata.required==true) parent.$el.find(selector).find("select").attr('parsley-required','true');
				if(metadata.multiple==true) {
					parent.$el.find(selector).find("select").attr('multiple','multiple');
					parent.$el.find(selector).find("select").attr('title',metadata.placeholder);					
				}				
				parent.$el.find(selector).find("select").val(metadata.displayValue)
				parent.$el.find(selector).find("select").selectpicker();

			}
			metadata.selections = [];
			var self = this;

			this._parseModel(function(){
				if(self._modelType != "model"){
					//internal
					for(var i = 0; i < self.collection.length; i++){
						metadata.selections.push({
							value:self.collection[i],
							display:self.collection[i]
						});				
					}
					renderElement();
				}else{
					//model
					self.collection.fetch({
						success:function(){	
							for(var i = 0; i < self.collection.models.length; i++){
								var model = self.collection.models[i];
								metadata.selections.push({
									value: self._parseField(model,self._dataSource.valueField),
									display: self._parseField(model,self._dataSource.displayField)
								});									
							}
							renderElement();
						}
					})
				}
			})

			return this;
		},
		reload:function(metadata,parent,model){
			return this.init(metadata,parent,model);
		},
		getValue:function(){			
			return this._parent.$el.find(this._selector + ' select').val();
		}
	});
});

