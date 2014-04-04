"use strict";
define(['../ChartView'],function(view){
	return view.extend({
		render:function(){
			var self = this;
			this.beforeRender();
			var output={
				locale:this.locale,
				record:this.model
			}
			$(this.el).html(this.template(output));		

			this.model.fetch({
				success:function(){
					var data = self.model.toJSON();
					data = self.localizeData.call(self,data);					
					self.renderChart.call(self,data);
					self.afterRender();
				}
			})
		},
		renderChart:function(data){	
			var labelFormatter = function(label, series){
				return "<div style='font-size:10pt; text-align:center; padding:2px; color:white;'>" + label + "<br/>" + Math.round(series.percent) + "%</div>";
			}			
			$(this.el).find(".openbiz-chart").plot(data,{
				series:{
					pie:{
						show:true,
						radius:1,
						label:{							
							show:this.metadata.showLabel==true?"show":"auto",
							radius:1,
							formatter: labelFormatter,
							background: { 
			                    opacity: 0.8,
			                }						
						}
					},					
				},
				grid: {
			        hoverable: this.metadata.hoverable?this.metadata.hoverable:true,
			        clickable: this.metadata.clickable?this.metadata.clickable:true,
			    },
				legend: {
			        show: this.metadata.showLegend?this.metadata.showLegend:true
			    }
			});
		},
		localizeData:function(data){
			var localizedData=[];
			for(var i=0;i<this.metadata.fields.length;i++){
				var field = this.metadata.fields[i];
				var localeKey = "field"+field.name.charAt(0).toUpperCase()+field.name.slice(1);
				var record = {
					label:this.locale[localeKey],
					data:data[field.field]
				}
				if(field.color) record.color = field.color;
				localizedData.push(record);
			}
			return localizedData;
		}
	});
});