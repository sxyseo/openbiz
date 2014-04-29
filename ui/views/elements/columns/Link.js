"use strict";
define(['./Element'],function(element){
	return element.extend({
		getConfig:function(obj,column,recordActions,callback){
			var field = openbiz.Element.prototype.getConfig.call(this,obj,column);
			field.cell = openbiz.Grid.UriCell.extend({
				render: function () {
					this.$el.empty();
					var self = this;
					var parsedURL = column.url.replace(/.*\/?\:([^\/]*).*?/gi,function(s,value){
						var attrArray = value.split('.');
						var data = (typeof self.model[attrArray[0]]!='undefined')?self.model[attrArray[0]]:self.model.get(attrArray[0]);
						for(var i =1; i<attrArray.length; i++){
							var indexName = attrArray[i];
							data = data[indexName];
						}
						return s.replace(":"+value, data );
					});
					var attr = this.column.get("name");
					var attrArray = attr.split('.');
					var data = this.model.get(attrArray[0]);
					var value = data;
					for(var i =1; i<attrArray.length; i++){
						var indexName = attrArray[i];
						value = value[indexName];
					}
					this.$el.append($("<a>", {
						tabIndex: -1,
						href: "#!/backend"+ (obj.app.name=='cubi'?'':'/'+obj.app.name) + parsedURL,
						title: ""
					}).text(value));
					this.delegateEvents();
					return this;
				}
			});
			callback(field);
		}
	});
});