"use strict";
define(['./Element'],function(element){
	return element.extend({
		getConfig:function(obj,column){
			var field = openbiz.Element.getConfig.call(this,obj,column);
			field.cell = openbiz.Grid.UriCell.extend({
				render: function () {
					this.$el.empty();
					var rawValue = this.model.get("_id");
					var formattedValue = this.formatter.fromRaw(rawValue, this.model);
					this.$el.append($("<a>", {
						tabIndex: -1,
						href: "#!/backend" + column.url.split(":")[0] + rawValue,
						title: ""
					}).text(this.model.get(this.column.get("name"))));
					this.delegateEvents();
					return this;
				}
			});
			return field;
		}
	});
});