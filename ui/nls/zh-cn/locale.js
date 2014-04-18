"use strict";
define({	
    loading:{
    	framework: 	'正在加载 Openbiz 框架',
    	cubi: 		'正在加载 Cubi 应用程序',
    	done: 		'全部加载完成！',
        text:       '加载中...'
    },
    validation:{
        defaultMessage: "该项信息填写不正确。"
      , type: {
            email:      "请填写有效的电子邮件地址。"
          , url:        "请填写有效的网址。"
          , urlstrict:  "请填写有效的网址。"
          , number:     "此项数据只能填写数字。"
          , digits:     "此项数据只能填写整数。"
          , dateIso:    "请填写有效的日期格式 (YYYY-MM-DD)。"
          , alphanum:   "此项数据只能填写字母。"
          , phone:      "请填写有效的电话号码。"
        }
      , notnull:        "此项不能为空。"
      , notblank:       "此项不能为空白。"
      , required:       "此项为必填项。"
      , regexp:         "此项信息填写不正确。"
      , min:            "此项数值应当大于或等于 %s 。"
      , max:            "此项数值应当小于或等于 %s 。"
      , range:          "此项数值应当在 %s 和 %s 之间。"
      , minlength:      "此项填写数据过短，至少应当大于或等于 %s 个字符。"
      , maxlength:      "此项填写数据过长，最多应当小于或等于 %s 个字符。"
      , rangelength:    "此项数据长度无效，有效长度为在 %s 到 %s 个字符。"
      , mincheck:       "此项少输入 %s 个字符。"
      , maxcheck:       "此项最多输入 %s 个字符"
      , rangecheck:     "请输入 %s 至 %s 个字符。"
      , equalto:        "此项数值应当相等。"
    },
    datagrid:{
        indicator:    "显示第 {{startPos}} 到 {{endPos}} 条, 共计 {{total}} 条记录"
    }
});