"use strict";
define(['./Text',
		'text!./Uploader.html',
		'text!./Uploader-upload.html',
		'text!./Uploader-download.html'
		],
		function(object,templateData,templateUploadData, templateDownloadData){
	return object.extend({
		_metadata:null,
		_parent:null,
		_model:null,
		init:function(metadata,parent,model){
			this._metadata 	= metadata;
			this._parent 	= parent;
			this._model 	= model;
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

			parent.$el.find(selector).replaceWith($(template(metadata)).addClass("field-"+metadata.name.toLowerCase()));			
			this.initUploader();
			return this;
		},
		initUploader:function(){
			var selector = "div.field-"+this._metadata.name.toLowerCase();
			var uploadTemplateId =  this._metadata.elemName + "-upload-template";
			var downloadTemplateId =  this._metadata.elemName + "-download-template";
			var dom = $('<script/>').attr("id",uploadTemplateId).attr('type','text/x-tmpl');
			dom.get(0).innerHTML = _.template(templateUploadData)();
			this._parent.$el.find(selector).append(dom);			

			var dom = $('<script/>').attr("id",downloadTemplateId).attr('type','text/x-tmpl');
			dom.get(0).innerHTML = _.template(templateDownloadData)();
			this._parent.$el.find(selector).append(dom);			
			this._parent.$el.find(selector).fileupload({
		        // Uncomment the following to send cross-domain cookies:
		        //xhrFields: {withCredentials: true},
		        url: this._metadata.server?this._metadata.server:"",
		        uploadTemplateId: uploadTemplateId,
			    downloadTemplateId: downloadTemplateId,
			    autoUpload:this._metadata.autoUpload?this._metadata.autoUpload:false,
			    disableImageResize: /Android(?!.*Chrome)|Opera/
			        .test(window.navigator.userAgent),
			    maxFileSize: this._metadata.maxFileSize?this._metadata.maxFileSize:5000000,
			    acceptFileTypes: this._metadata.acceptFileTypes?new RegExp("(\.|\/)("+this._metadata.acceptFileTypes.join("|")+")$",'i'):/(\.|\/)(gif|jpe?g|png)$/i
		    });
			this.loadExistingData();
		},
		loadExistingData:function(){
			var selector = "div.field-"+this._metadata.name.toLowerCase();
	       	var files = this._model.get(this._metadata.field);
	       	var filesOutput = [];
	       	for(var i in files){
	       		filesOutput.push(files[i].metadata.fileInfo);
	       	}
	       	var uploader = this._parent.$el.find(selector).get(0);
	        $(uploader).fileupload('option','done').call(uploader, $.Event('done'), {result: {files:filesOutput}});
		},
		getValue:function(){
			var selector = "div.field-"+this._metadata.name.toLowerCase();
			var files=[];
			this._parent.$el.find(selector).find('tbody.files tr').each(function(i, e) {				
			    files.push($(e).find('td p.name a').attr("data-file-id"));			    
			});
			return files;
		}
	})
});