"use strict";
define(['../../../objects/Object',
		'text!./Gallery.html'
		],
		function(object,templateData){
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
			var localeKey = 'field'+metadata.name.charAt(0).toUpperCase()+metadata.name.slice(1);
			
			metadata.displayName = parent.locale[localeKey]?parent.locale[localeKey]:metadata.displayName
			metadata.url = "#!/backend/"+parent.app.name+metadata.url;
			metadata.url = metadata.url.replace(/.*\/?\:([^\/]*).*?/gi,function(s,value){		
						return s.replace(":"+value, (typeof model[value]!='undefined')?model[value]:model.get(value) );																		
					});			
			metadata.className = metadata.className?metadata.className.replace(/\./g," "):'btn-default';
			metadata.icon = metadata.icon?metadata.icon.replace(/\./g," "):"";
			metadata.selector = ".field-"+metadata.name.toLowerCase();
			var files = this._model.get(this._metadata.field);
			metadata.images=[];
	       	for(var i in files){
	       		metadata.images.push({
	       			title:files[i].metadata.originalFilename,
	       			href:files[i].metadata.fileInfo.url,
	       			thumbnail:files[i].metadata.fileInfo.thumbnailUrl
	       		});
	       	}	

			parent.$el.find(selector).replaceWith($(template(metadata)).addClass("field-"+metadata.name.toLowerCase()));			
			this.loadData();

			return this;
		},
		loadData:function(){
			var selector = "div.field-"+this._metadata.name.toLowerCase();
			this._parent.$el.find(selector+" div.links a").on('click', function (event) {
		        // Get the container id from the data-gallery attribute:
		        var id = $(this).data('gallery'),
		            widget = $(id+" .blueimp-gallery"),
		            container = (widget.length && widget) ||
		                $(Gallery.prototype.options.container),
		            callbacks = {
		                onopen: function () {
		                    container
		                        .data('gallery', this)
		                        .trigger('open');
		                },
		                onopened: function () {
		                    container.trigger('opened');
		                },
		                onslide: function () {
		                    container.trigger('slide', arguments);
		                },
		                onslideend: function () {
		                    container.trigger('slideend', arguments);
		                },
		                onslidecomplete: function () {
		                    container.trigger('slidecomplete', arguments);
		                },
		                onclose: function () {
		                    container.trigger('close');
		                },
		                onclosed: function () {
		                    container
		                        .trigger('closed')
		                        .removeData('gallery');
		                }
		            },
		            options = $.extend(
		                // Retrieve custom options from data-attributes
		                // on the Gallery widget:
		                container.data(),
		                {
		                    container: container[0],
		                    index: this,
		                    event: event
		                },
		                callbacks
		            ),
		            // Select all links with the same data-gallery attribute:
		            links = $('[data-gallery="' + id + '"]');
		        if (options.filter) {
		            links = links.filter(options.filter);
		        }
		        return new blueimp.Gallery(links, options);
		    });
			// blueimp.Gallery(this._metadata.images, {
		 //        container: selector+" div.blueimp-gallery",
		 //        carousel: false
		 //    });
		}
	})
});