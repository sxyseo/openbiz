<<<<<<< HEAD
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
        indicator:    "显示第 {{startPos}} 到 {{endPos}} 条, 共计 {{total}} 条记录",
        search:       "查询"
    },
    uploader:{
        btnAddFiles:    "添加文件",
        btnStartUpload:   "开始上传",
        btnCancelUpload:  "取消上传",
        btnDelete:    "删除",
        btnStart:     "上传",
        btnCancel:    "取消",
        labelProcessing:    "处理中..."
    }
=======
"use strict";
define({	   
    loading:'数据加载中 ...',
    app:{
        name:'Openbiz Cubi 应用平台',
        description:"Openbiz 的基础应用平台，提供用户管理，企业账户等通用功能",
        roles:{
            "cubi-admin"            :"Cubi 系统管理员",
            "cubi-user"             :"Cubi 普通用户",
            "cubi-account-manager"  :"Cubi 账户管理员",
            "cubi-account-member"   :"Cubi 账户成员"
        }
    },
    common:{
            deleteConfirmationTitle: "数据删除确认",
            deleteConfirmationMessage: "<h2><%= record %></h2> <br/> \
                        你即将删除这条数据: <br/> \
                        是否确认此操作?",
            savedNotificationTitle: "提示",
            savedNotificationMessage: "<h2>数据已经保存成功</h2>"
    },
    menu:{
        title               :'公司账户设置',
        menuApplications    :'应用程序管理',
        menuMembers         :'公司用户管理',
        menuInvitations     :'用户邀请管理',
        menuProfile         :'企业档案管理'
    },
    account:{
            invitationsListView:{
                viewTitle: '<span>用户邀请</span>管理',
                viewDescription: 'Openbiz Cubi Application Platform 4.0',             
                actionInviteUser:'邀请用户',
                fieldToken:"邀请码",
                fieldUser:"用户",
                fieldEmail:"电子邮件",
                fieldExpriyDate:"失效日期",
                fieldActions:"操作",
                recordActionDetail:"详情",
                recordActionDelete:"删除"
            },
            invitationsDetailView:{
                viewTitle: '用户邀请',
                actionDelete:"删除",
                actionBack:"返回列表",
                labelDetails: "详情",
                labelRoles: "角色",
                fieldName:"姓名",
                fieldEmail:"电子邮件",
                fieldMobile:"手机号码",
                fieldExpiry:"到期日期"
            },
            invitationsNewPermissionView:{
                viewTitle: "设置新用户权限",
                done: "完成"
            },
            invitationsNewView:{
                viewTitle: '邀请新用户',
                title: '性别',
                titleMr:    '先生',
                titleMs:    '女士',
                name: '名称',
                firstName : '姓',
                lastName : '名',
                nameFormat: ['姓','名'],
                phone: '手机',
                mobile: '电话',
                mobileNumber: '号码',
                phoneDefaultCountryCode: '+1',
                phoneCountryCode: '国家区号',
                email: '邮箱',
                next: '下一步',
                validation:{
                    emailDuplicated: '此邮箱地址已经邀请过',
                    emailNotInvitable: '请输入邮箱的邮箱地址'
                }
            },
            profileView:{
                viewTitle: '<span>公司</span> 档案管理',   
                labelCompanyName: '公司名称',
                labelPhoneNumber: '电话号码',
                labelAddress: '地址',
                labelWebsite: '网站',             
                phoneDefaultCountryCode: '+86',
                phoneCountryCode: '国家编码',
                phoneAreaCode: '区号',
                phoneNumber: '电话号码',
                addressCountry: '国家',
                addressDefaultCountry: '中国',
                addressProvince: '省份',
                addressCity: '城市',
                addressStreet: '街道',
                addressZipcode: '区号',                
                actionSave:'保存',
                validation:{                    
                    companyNotUnique: '这个公司名称已经被他人占用'
                }
            },
            membersListView:{
                actionAddUser:"添加用户",
                viewTitle:'公司用户管理',
                fieldName:"名字",
                fieldEmail:"电子邮件",
                fieldRole:"角色",
                fieldAction:"操作",
                recordActionEdit:"编辑",
                recordActionRemove:"删除",
            },
            membersNewView:{
                viewTitle: '添加新用户',
                title: '性别',
                titleMr: '先生',
                titleMs: '女士',
                name: '名称',
                firstName : '姓',
                lastName : '名',
                nameFormat: ['姓','名'],
                mobile: '电话',
                mobileNumber: '电话号码',
                phoneDefaultCountryCode: '+1',
                phoneCountryCode: '国家区号',
                phoneAreaCode: '地区区号',
                phoneNumber: '手机号码',
                email: '邮箱',
                password: '密码',
                passwordPlaceholder: '至少6个字符',
                repeatPassword: '重复密码',
                repeatPasswordPlaceholder: '重复密码',
                create: '创建',
                validation:{
                    passwordNotMatch:'两次密码不一致',
                    emailDuplicated: '此邮箱地址已经邀请过',
                    emailNotInvitable: '请输入邮箱的邮箱地址'
                },
                addUserErrorTitle:"错误",
                addUserErrorMessage:"创建用户失败"
            },
            membersEditView:{
                viewTitle:'更新用户权限',
                actionUpdate:'更新',
            }

        },    
    user:{
        loginView:{
            viewTitle: '<span>欢迎</span>登录',
            email: '电子邮件',
            password: '登录密码',
            signIn: '登录',
            or: '或者',
            remember: '记住我的账户',
            forgetPassword: '忘记密码?',
            createAccount: '创建新账户',
            signing: '登录中...',
            copyright: '&copy; 2014 Openbiz LLC',
            validation:{
                incorrectPassword: "您输入的用户名或密码可能不正确"
            }
        },
        forgetPasswordView:{
            viewTitle: '<span>找回</span>密码',
            pleaseInputEmail: '请在下面的输入框内填写您的电子邮件地址，我们的系统将会自动发给你一封带有密码重置连接的电子邮件，请注意查收。',
            email: '电子邮件',
            or: '或者',
            sendRequest: '发送请求',
            copyright: '&copy; 2014 Openbiz LLC',
            goToLogin: '返回登陆页面'
        },
        registerView:{
            viewTitle: '<span>创建</span>新的账户',
            createAccountButton: '创建账户',
            alreadyHaveAccount: '已经有账户了么? ',
            goToLogin: '返回登录',
            title: '称呼',
            titleMr:    '先生',
            titleMiss:  '小姐',
            titleMrs:   '夫人',
            titleMs:    '女士',
            name: '姓名',
            firstName : '名字',
            lastName : '姓氏',
            nameFormat: ['lastName','firstName'],
            company: '公司',
            phone: '电话',
            mobile: '手机',
            mobileNumber: '手机号码',
            phoneDefaultCountryCode: '+86',
            phoneCountryCode: '国家编码',
            phoneAreaCode: '区号',
            phoneNumber: '电话号码',
            email: '电子邮件',
            password: '密码',
            repeatPassword: '重复密码',
            agreeWith: '我已经阅读并且认同',
            termOfUse: '使用条款',
            signing: '创建中...',
            validation:{
                needAgreement: '您需要同意本协议才可以继续',
                passwordNotMatch:'两次密码输入不一致',
                emailDuplicated: '该邮件地址已经被其他用户注册'
            }
        }
    },
    system:{
        headerView:{
            hi: '欢迎',
            help: '帮助',
            signout: '退出登录',
            profile: '我的个人资料',
            changePassword: '修改密码'
        },
        navView:{
            hi: '欢迎'
        },
        menuView:{
            title: "首页"
        }
    },
    me:{
        userProfileView:{
                viewTitle:'<strong>我的</strong>个人资料'
            },
         userChangePasswordView:{
                viewTitle:'<strong>修改</strong>密码',
               
                fieldOldPassword:'老的密码',
                placeholderOldPassword:'老的密码',

                fieldNewPassword:'新的密码',                
                placeholderNewPassword:'新的密码',

                fieldRepeatPassword:'再次确认密码',                
                placeholderRepeatPassword:'再次确认密码',

                passwordChangedTitle:"您的密码已经被成功修改",
                passwordChangedMessage:"您的密码已经被成功修改<br/>您将需要重新登录系统来确认改变。",

                validation:{
                    passwordNotMatch:'两次密码输入不一致',
                    incorrectPassword: '密码输入有误'
                }
            },
        userProfileEditView:{
                nameFormat: ['lastName','firstName'],
                fieldFirstName:'名字',
                placeholderFirstName:'名字',
                fieldLastName:'姓氏',                
                placeholderLastName:'姓氏',
                fieldBirthday:'生日',                
                placeholderBirthday:'生日',
                fieldCompany:'公司',                
                placeholderCompany:'公司',
                fieldDepartment:'部门',                
                placeholderDepartment:'部门',
                fieldPosition:'职位',                
                placeholderPosition:'职位',
                fieldTitle:"称呼",
                saveSuccessedTitle:"个人资料修改",
                saveSuccessedMessage:"您的个人资料已经被成功修改。",
                "selectionTitleMr.":    '先生',
                "selectionTitleMs.":    '女士' 
            },
        setupWizardView:{
            viewName:'设置向导',
            viewTitle: '<strong>账户</strong> 设置向导',
            twoTitle: '欢迎设置您的账户',
            howSetUpTitle: '你想怎么设置自己的帐户？',
            setNewCompany: '我想创建一个新的公司帐户',
            joinCompany: '我想加入一个公司帐户',
            tableTitle: '请填写以下表格来创建一个新的公司帐户',
            companyName: '公司名称',
            nextstep: '下一步',
            phoneDefaultCountryCode: '+1',
            phoneCountryCode: '国家编号',
            phoneAreaCode: '区域编号',
            phoneNumber: '电话号码',
            addressCountry: '国家',
            addressDefaultCountry: 'CN',
            addressProvince: '省份',
            addressCity: '城市',
            addressStreet: '街道地址',
            addressZipcode: '邮编',
            webSite: '网址',
            invitationCodePlaceHolder: 'ACCT-XXXX-XXXXXX',
            joinCompanyTitle: '请向您公司的管理员邀请码。通常情况下，它会发送到通过电子邮件或短信。',
            companyCode: '有效的邀请码',
            done: '完成',
            validation:{
                tokenInvalid: '无效的邀请码',
                companyNotUnique: '此公司已存在'
            },
            setupWizardAppSelectorForm:{
                viewTitle: '真棒!',
                twoTitle: '欢迎您创建一个新公司',
                role: '角色',
                phone: '电话',
                website: '网址',
                application: '应用',
                done: '完成',
                appMessage: '请选择适合您公司的应用',
                inviteUsers: '邀请用户'
            },
            setupWizardAccountDetailForm:{
                viewTitle: '真棒!',
                twoTitle: '欢迎加入新公司',
                company: '公司',
                role: '角色',
                phone: '电话',
                website: '网址',
                applications: '应用',
                done: '完成',
                name: '名称'
            },
            setupWizardUserInvitationForm:{
                viewTitle: '开始组建你的团队!',
                twoTitle: '现在就邀请你的团队成员加入你的公司账户',
                users: '用户',
                invitations: '邀请码',
                done: '完成',
                addUser: '添加用户',
                name: '姓名',
                email: '邮箱',
                role: '角色',
                action: '操作',
                invitationCode: '邀请码',
                noUserMessage: '请点击“添加用户”按钮，开始添加或邀请您的同事'
            },
            userAddModalView: {
                viewTitle: '添加新用户',
                addUser: '创建新用户',
                joinUser: '邀请好友加入',
                title: '性别',
                titleMr: '先生',
                titleMs: '女士',
                name: '姓名',
                firstName : '姓',
                lastName : '名字',
                mobile: '电话',
                mobileNumber: '电话号码',
                phoneDefaultCountryCode: '+1',
                phoneCountryCode: '国家编号',
                email: '邮箱',
                password: '密码',
                passwordPlaceholder: '至少6个字符',
                repeatPassword: '重复密码',
                repeatPasswordPlaceholder: '重复密码',
                done: '完成',
                next: '下一步',
                validation:{
                    needAgreement: '请先同意协议',
                    passwordNotMatch:'两次密码不匹配',
                    emailDuplicated: '此邮箱地址已经注册',
                    emailNotInvitable: 'The email address is already assicated with account'
                }
            },
            addUserView:{
                viewTitle: '<span>创建</span>新的账户',
                createAccountButton: '创建账户',
                alreadyHaveAccount: '已经有账户了么? ',
                goToLogin: '返回登录',
                title: '称呼',
                titleMr:    '先生',
                titleMiss:  '小姐',
                titleMrs:   '夫人',
                titleMs:    '女士',
                name: '姓名',
                firstName : '名字',
                lastName : '姓氏',
                nameFormat: ['lastName','firstName'],
                company: '公司',
                phone: '电话',
                mobile: '手机',
                mobileNumber: '手机号码',
                phoneDefaultCountryCode: '+86',
                phoneCountryCode: '国家编码',
                phoneAreaCode: '区号',
                phoneNumber: '电话号码',
                email: '电子邮件',
                password: '密码',
                repeatPassword: '重复密码',
                agreeWith: '我已经阅读并且认同',
                termOfUse: '使用条款',
                signing: '创建中...',
                validation:{
                    needAgreement: '您需要同意本协议才可以继续',
                    passwordNotMatch:'两次密码输入不一致',
                    emailDuplicated: '该邮件地址已经被其他用户注册',
                    emailNotInvitable: '该邮件地址已关联，不能重复邀请'
                }
            },
            userPermissionView:{
                viewTitle: '设置新用户权限',
                done: '完成'
            }
        }
    },
    breadcrumb:{
        home:'首页',
        me:'我的账户',
        myAccount:'我的账户',
        profile:'资料管理',
        account:'账户管理',
        members:'公司用户管理',
        invitations:"用户邀请管理",
        company:"公司档案"
    }
>>>>>>> df20f5b3b4b2a9db6e4d17a78482bea46826e662
});