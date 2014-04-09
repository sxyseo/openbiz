"use strict";
define(function(){
	return {
	    defaults:{
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

							//不知道如何判断当前为select
							if($(popupElem).find("option").length > 0){
								popupElem = $(elem).parent().find(".bootstrap-select");
							}

							if(ParsleyField.isRadioOrCheckbox){
								popupElem = elem.closest(".iCheck");
							}

							var prevMsg = $(popupElem).attr("data-content");								
							$(popupElem).attr("data-content",msgStr);
							// if(!$(popupElem).attr('placement')){
							// 	$(popupElem).attr('placement','auto');
							// }

							if(prevMsg!=msgStr || $(popupElem).attr('popover-state')=='hidden'){
								$(popupElem).popover({	
										html:false,
										placement:'auto',
						    			trigger: 'manual',
						    			animation:false							    			
						    		}).popover('show')
									.on('shown.bs.popover',function(){
										$(this).attr('popover-state','shown');
									})
									.on('hidden.bs.popover',function(){
										$(this).attr('popover-state','hidden');
									});
						    }		

						    $(popupElem).off('click.validator keyup.validator');
						    $(popupElem).on('click.validator keyup.validator',function(){
						    	if($(popupElem).parent().find('.popover').length==0){
						    		$(popupElem).popover('show');
						    	}
						    });
						    $(popupElem).off('mouseenter.validator focusin.validator');
						    $(popupElem).on('mouseenter.validator focusin.validator',function(){
						    	if($(popupElem).parent().find('.popover').length==0){
						    		$(popupElem).popover('show');
						    	}
						    });
						    $(popupElem).off('mouseleave.validator focusout.validator');
						    $(popupElem).on('mouseleave.validator focusout.validator',function(){
						    	$(popupElem).popover('hide');
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
				    }else{
			    		$(elem).removeClass("parsley-error");
			    		$(elem).addClass("parsley-success");
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
	};
})