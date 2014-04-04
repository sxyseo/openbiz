"use strict";
define(['./FormView'],function(view){
	return view.extend({
		jsonEditor:null,
		parseRecordForDisplay:function(record){},
		parseRecordForSave:function(record){},
		render:function(){
			var self = this;
			$(window).off('resize');
			if(this._canDisplayView())
			{
				this.beforeRender();				
				var output={
					locale:this.locale,
					record:this.model
				}
				$(this.el).html(this.template(output));
				if(this.model!=null){
					this.model.fetch({success:function(){
						self.initEditor.call(self);
						self.afterRender.call(self);		
					}})
				}
				
			}
			else
			{
				this._renderNoPermissionView();
			}
			openbiz.ui.update($(this.el));
		},
		initEditor:function(){
			var options = {
			    mode: 'tree',
			    modes: ['code', 'form', 'text', 'tree', 'view'], // allowed modes
			    error: function (err) {
			      alert(err.toString());
			    }
			};
			this.jsonEditor =  new jsoneditor.JSONEditor($(this.el).find('.openbiz-json-editor').get(0),options,this.model.toJSON());
		}
	});
});