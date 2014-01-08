"use strict";
define({	
    loading:{
    	framework: 	'正在加载 Openbiz 框架',
    	cubi: 		'正在加载 Cubi 应用程序',
    	done: 		'全部加载完成！'
    },
    validation:{
		required: "该字段为必填项目",
		remote: "Please fix this field.",
		email: "请输入有效的电子邮件地址",
		url: "请输入有效的网址URL",
		date: "请输入有效的日期",
		dateISO: "请输入有效的日期 (ISO格式).",
		number: "请输入有效的数字",
		digits: "只允许输入数字",
		creditcard: "请输入有效的信用卡号",
		equalTo: "请再次输入相同的内容",
		maxlength: $.validator.format("Please enter no more than {0} characters."),
		minlength: $.validator.format("Please enter at least {0} characters."),
		rangelength: $.validator.format("Please enter a value between {0} and {1} characters long."),
		range: $.validator.format("Please enter a value between {0} and {1}."),
		max: $.validator.format("Please enter a value less than or equal to {0}."),
		min: $.validator.format("Please enter a value greater than or equal to {0}.")
	}
});