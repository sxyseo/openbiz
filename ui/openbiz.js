"use strict";
define(["objects/Object",
		"objects/Module",
		"objects/Application",
		"objects/Router",
		"objects/View",
		"loaders/TemplateLoader",
		"loaders/AppLoader",
		"utils/MobileDetection",
		"utils/BrowserDetection",
		'openbiz.custom',
		'i18n!./nls/locale'
		],
	function(Object,
		Module,
		Application,
		Router,
		View,
		TemplateLoader,
		AppLoader,
		MobileDetection,
		BrowserDetection,
		updateUI,
		locale
		){		
	return {
		apps:{},
		session:{},
		locale:locale,
		loaders:{
			TemplateLoader : TemplateLoader,
			AppLoader : AppLoader
		},
		objects:{
			Object : 	 Object,
			Application: Application,
			Module : 	 Module,
			Router : 	 Router,
			View   : 	 View
		},			
		utils:{
			MobileDetection: MobileDetection,
			BrowserDetection: BrowserDetection
		},		
		ui:{
			update: updateUI
		},	
        views:{
            renderred:{},
            inited:{}    
        },
		baseUrl:openbizUrl,
		//shortcut alias
		Application: Application,
		Module: Module,
		Object: Object,
		Router: Router,
		View: 	View,
		isMobile: MobileDetection,
		Browser: BrowserDetection,
		loadApps: AppLoader.load,	
		validator:{
			defaults:{
				messages:locale.validation,
				showErrors:false,
				validateIfUnchanged:true,
				listeners:{
					onFieldError:function(elem, constraints, ParsleyField){
						openbiz.validator.elementCounter++;
						ParsleyField.manageValidationResult();
						$(elem).attr('data-validation-result','invalid');
						var showErrorPopup = function(){
							var message = $("#"+ParsleyField.hash);							
							if(message.get(0)){							
								var msgStr =message.find('li').last().text();	
								message.hide();
								var popupElem = elem;
								if(ParsleyField.isRadioOrCheckbox){
									popupElem = elem.closest(".iCheck");
								}
								$(popupElem).attr("data-content",msgStr);
								// if(!$(popupElem).attr('placement')){
								// 	$(popupElem).attr('placement','auto');
								// }
								$(popupElem).popover({	
											html:false,
											placement:'auto',
							    			trigger: 'manual'							    			
							    		})
							    		.popover('show');
							    $(popupElem).off('click');
							    $(popupElem).on('click',function(){
							    	$(popupElem).popover('toggle');
							    });
							    // console.log(elem.attr('id'));
							    // console.log(3000 - openbiz.validator.elementCounter*100);
							    if(!$(popupElem).attr('popover-dismiss-time')){
								    var popOverDismiss = 3000 - openbiz.validator.elementCounter*100;
								    $(popupElem).attr('popover-dismiss-time',popOverDismiss);								    
								    setTimeout(function(){
								    	$(popupElem).popover('hide');
								    },popOverDismiss);
								}
							}else{
								setTimeout(showErrorPopup,5);
							}
								
						}
						var highlightError = function(){
							if($(elem).closest(".input-group").length){		
						    	$(elem).removeClass("parsley-error");			    	
						    	$(elem).closest(".input-group").removeClass("parsley-success");
						    	$(elem).closest(".input-group").addClass("parsley-error");			    									
						    }							
						}
						highlightError();
						showErrorPopup();
					    		    
					},
					onFieldSuccess:function(elem, constraints, ParsleyField){
						for(var i in constraints){
							if(constraints[i].valid==false) return;
						}
						var popupElem = elem;
						if(ParsleyField.isRadioOrCheckbox){
							popupElem = elem.closest(".iCheck");
							elem.closest(".iCheck").find("input").attr('data-validation-result','valid');
						}
						$(popupElem).attr('data-content','');
						$(popupElem).popover('hide');	
						$(elem).attr('data-validation-result','valid');
						if($(elem).closest(".input-group").length){
							if($(elem).closest(".input-group").find("input[data-validation-result='invalid']").length==0){
								$(elem).removeClass("parsley-success");
					    		$(elem).closest(".input-group").removeClass("parsley-error");
					    		$(elem).closest(".input-group").addClass("parsley-success");
					    	}
					    }
					}
				}
			},
			init:function(){
				$.fn.parsley.defaults.showErrors = this.defaults.showErrors;
				$.fn.parsley.defaults.validateIfUnchanged = this.defaults.validateIfUnchanged;
				$.fn.parsley.defaults.messages = this.defaults.messages;
				$.fn.parsley.defaults.listeners.onFieldError = this.defaults.listeners.onFieldError;
				$.fn.parsley.defaults.listeners.onFieldSuccess = this.defaults.listeners.onFieldSuccess;
			}
		},
		init:function(){
			this.validator.init();
		}
	}
});