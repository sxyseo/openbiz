"use strict";
define(['./Element'],function(element){
	return element.extend({
		getConfig:function(obj,column){
			var field = openbiz.Element.prototype.getConfig.call(this,obj,column);
			field.cell = openbiz.Grid.UriCell.extend({
				render: function () {
					this.$el.empty();
					var rawValue = this.model.get("_id");

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
						href: "#!/backend"+ (obj.app.name=='cubi'?'':'/'+obj.app.name) + column.url.split(":")[0] + rawValue,
						title: ""
					}).text(value));
					this.delegateEvents();
					return this;
				}
			});
			return field;
		}
	});
});