"use strict";
define(['./Element'],function(element){
	return element.extend({
		getConfig:function(obj,column,recordActions,callback){
			var field = openbiz.Element.prototype.getConfig.call(this,obj,column);
			field.cell = BackGrid.UriCell.extend({
				render: function () {
					this.$el.empty();
					var rawValue = this.model.get("_id");
					var formattedValue = this.formatter.fromRaw(rawValue, this.model);
					this.$el.append($("<a>", {
						tabIndex: -1,
						href: "#!/backend/" + obj.app + column.url.split(":")[0] + rawValue,
						title: ""
					}).text(this.model.get("name")));
					this.delegateEvents();
					return this;
				}
			});
			callback(field);
		}
	});
});