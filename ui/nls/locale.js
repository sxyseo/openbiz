<<<<<<< HEAD
"use strict";
define({
	'root':{
	    loading:{
	    	system: 	'Loading system resources',
	    	framework: 	'Loading Openbiz framework',
	    	cubi: 		'Loading Cubi Application',
	    	done: 		'Loading ... Done!',
            text:       'Loading...'
	    },
	    validation : {
	        defaultMessage: "This value seems to be invalid."
	      , type: {
	            email:      "This value should be a valid email."
	          , url:        "This value should be a valid url."
	          , urlstrict:  "This value should be a valid url."
	          , number:     "This value should be a valid number."
	          , digits:     "This value should be digits."
	          , dateIso:    "This value should be a valid date (YYYY-MM-DD)."
	          , alphanum:   "This value should be alphanumeric."
	          , phone:      "This value should be a valid phone number."
	        }
	      , notnull:        "This value should not be null."
	      , notblank:       "This value should not be blank."
	      , required:       "This value is required."
	      , regexp:         "This value seems to be invalid."
	      , min:            "This value should be greater than or equal to %s."
	      , max:            "This value should be lower than or equal to %s."
	      , range:          "This value should be between %s and %s."
	      , minlength:      "This value is too short. It should have %s characters or more."
	      , maxlength:      "This value is too long. It should have %s characters or less."
	      , rangelength:    "This value length is invalid. It should be between %s and %s characters long."
	      , mincheck:       "You must select at least %s choices."
	      , maxcheck:       "You must select %s choices or less."
	      , rangecheck:     "You must select between %s and %s choices."
	      , equalto:        "This value should be the same."
	    },
	    datagrid:{
	    	indicator: 		"Display {{startPos}} to {{endPos}} items, Total {{total} records",
	    	search: 		"Search"
	    },
	    uploader:{
	      btnAddFiles: 		"Add files...",
	      btnStartUpload: 	"Start upload",
	      btnCancelUpload: 	"Cancel upload",
	      btnDelete: 	 	"Delete",
	      btnStart: 	 	"Start",
	      btnCancel: 	 	"Cancel",
	      labelProcessing:    "Processing..."
	    }
	},
	'en-us': true,
	'zh-cn': true
});
=======
"use strict";
define({
	'root':{
		loading:'Loading ...',
        app:{
          name:'Openbiz Cubi Platform',
          description:"A openbiz based application, provides basically user, account, models and permission contronls."
        },
        common:{
            deleteConfirmationTitle: "Data delete confirmation",
            deleteConfirmationMessage: "<h2><%= record %></h2> <br/> \
                        You are about to delete this record: <br/> \
                        Are you sure?",
            savedNotificationTitle: "Data notification",
            savedNotificationMessage: "<h2>Data has been saved</h2>"
        },
        menu:{
            title:'Account',
            menuApplications    :'Applications',
            menuMembers         :'Members',
            menuInvitations     :'Invitations',
            menuProfile         :'Profile'
        },
        account:{
            invitationsListView:{
                viewTitle: '<span>Invitations</span> Management',
                viewDescription: 'Openbiz Cubi Application Platform 4.0',
                actionInviteUser:'Invite User',
                fieldToken:"Token",
                fieldUser:"User",
                fieldEmail:"Email",
                fieldExpriyDate:"ExpriyDate",
                fieldActions:"Action",
                recordActionDetail:"Detail",
                recordActionDelete:"Delete"
            },
            invitationsDetailView:{
                viewTitle: 'User Inviataion',
                actionDelete:"Delete",
                actionBack:"Back to list",
                labelDetails: "Details",
                labelRoles: "Roles",
                fieldName:"Name",
                fieldEmail:"Email",
                fieldMobile:"Mobile",
                fieldExpiry:"Expiry"
            },
            invitationsNewPermissionView:{
                viewTitle: "Setup permission for new user",
                done: "Done"
            },
            invitationsNewView:{
                viewTitle: 'Add a New Invitation',
                title: 'Title',
                titleMr:    'Mr.',
                titleMs:    'Ms.',
                name: 'Name',
                firstName : 'First Name',
                lastName : 'Last Name',
                nameFormat: ['firstName','lastName'],
                phone: 'Phone',
                mobile: 'Mobile',
                mobileNumber: 'Mobile Number',
                phoneDefaultCountryCode: '+1',
                phoneCountryCode: 'Country Code',
                phoneAreaCode: 'Area Code',
                phoneNumber: 'Phone Number',
                email: 'Email',
                next: 'Next',
                validation:{
                    needAgreement: 'You need to check this agreement before continue',
                    passwordNotMatch:'The password is not matched',
                    emailDuplicated: 'The email address has been registered by other user',
                    emailNotInvitable: 'The email address is already assicated with account'
                }
            },
            profileView:{
                viewTitle: '<span>Company</span> Profile',
                viewDescription: 'Openbiz Cubi Application Platform 4.0',
                labelCompanyName: 'Company Name',
                labelPhoneNumber: 'Phone Number',
                labelAddress: 'Address',
                labelWebsite: 'Website',
                phoneDefaultCountryCode: '+1',
                phoneCountryCode: 'Country Code',
                phoneAreaCode: 'Area Code',
                phoneNumber: 'Phone Number',
                addressCountry: 'Country',
                addressDefaultCountry: 'USA',
                addressProvince: 'Province',
                addressCity: 'City',
                addressStreet: 'Street',
                addressZipcode: 'Zipcode',
                actionSave:'Save',
                validation:{                    
                    companyNotUnique: 'The company has been taken'
                }
            },
	        membersListView:{
                actionAddUser:"Add User",
		        viewTitle:'Account members',
                fieldName:"Name",
                fieldEmail:"Email",
                fieldRole:"Role",
                fieldAction:"Action",
                recordActionEdit:"Edit",
                recordActionRemove:"Remove"
	        },
            membersNewView:{
                viewTitle: 'Add a New Member',
                title: 'Title',
                titleMr:    'Mr.',
                titleMs:    'Ms.',
                name: 'Name',
                firstName : 'First Name',
                lastName : 'Last Name',
                nameFormat: ['firstName','lastName'],
                mobile: 'Mobile',
                mobileNumber: 'Mobile Number',
                phoneDefaultCountryCode: '+1',
                phoneCountryCode: 'Country Code',
                phoneAreaCode: 'Area Code',
                phoneNumber: 'Phone Number',
                email: 'Email',
                password: 'Password',
                passwordPlaceholder: 'At leaset 6 charactors',
                repeatPassword: 'Repeat Password',
                repeatPasswordPlaceholder: 'Repeat password',
                create: 'Create',
                validation:{
                    passwordNotMatch:'The password is not matched',
                    emailDuplicated: 'The email address has been registered by other user',
                    emailNotInvitable: 'The email address is already assicated with account'
                },
                addUserErrorTitle:"错误",
                addUserErrorMessage:"创建用户失败"
            },
            membersEditView:{
                viewTitle:'Update permission for user',
                actionUpdate:'Update'
            }
        },
        user:{
            loginView:{
                viewTitle: '<span>Wel</span>come',
                viewDescription: 'Openbiz Cubi Application Platform 4.0',
                email: 'Email',
                password: 'Password',
                signIn: 'Sign In',
                or: 'or',
                remember: 'Remember',
                forgetPassword: 'Forget Password?',
                createAccount: 'Create Account',
                signing: 'Signing in',
                copyright: '&copy; 2014 Openbiz LLC',
                validation:{
                    incorrectPassword: "Email or password is incorrect"
                }
            },
            forgetPasswordView:{
                viewTitle: '<span>Reset</span> Password',
                viewDescription: 'Openbiz Cubi Application Platform 4.0',
                pleaseInputEmail: 'Please fill in yout email address in below field. Our system will send you an email with a link to allow your to reset your password.',
                email: 'Email',
                sendRequest: 'Send Request',
                or: 'or',
                goToLogin: 'Go to Login',
                copyright: '&copy; 2014 Openbiz LLC'
            },
            registerView:{
                viewTitle: '<span>Create</span> New Account',
                viewDescription: 'Openbiz Cubi Application Platform 4.0',
                copyright: '&copy; 2014 Openbiz LLC',
                createAccountButton: 'Create Account',
                alreadyHaveAccount: 'Already have an account? ',
                goToLogin: 'Go to Login',
                title: 'Title',
                titleMr: 	'Mr.',
                titleMiss: 	'Miss',
                titleMrs: 	'Mrs',
                titleMs: 	'Ms.',
                name: 'Name',
                firstName : 'First Name',
                lastName : 'Last Name',
                nameFormat: ['firstName','lastName'],
                company: 'Company',
                phone: 'Phone',
                mobile: 'Mobile',
                mobileNumber: 'Mobile Number',
                phoneDefaultCountryCode: '+1',
                phoneCountryCode: 'Country Code',
                phoneAreaCode: 'Area Code',
                phoneNumber: 'Phone Number',
                email: 'Email',
                password: 'Password',
                passwordPlaceholder: 'At leaset 6 charactors',
                repeatPassword: 'Repeat',
                repeatPasswordPlaceholder: 'Repeat password',
                agreeWith: 'I have read and agreed with ',
                termOfUse: 'term of use',
                signing: 'Signing up',
                validation:{
                    needAgreement: 'You need to check this agreement before continue',
                    passwordNotMatch:'The password is not matched',
                    emailDuplicated: 'The email address has been registered by other user'
                }
            },
            dashboardView:{

            }
        },
        system:{
            headerView:{
                hi: 'Hi',
                help: 'Help',
                signout: 'Sign Out',
                profile: 'Profile',
                changePassword: 'Change Password'
            },
            navView:{
                hi: 'Hi'
            },
            menuView:{
                title: "Dashboard"
            }
        },
        me:{
	        userProfileView:{
				viewTitle:'<strong>My</strong> Profile'
	        },
            userChangePasswordView:{
                viewTitle:'<strong>Change</strong> Password',
               
                fieldOldPassword:'Old Password',
                placeholderOldPassword:'Old Password',

                fieldNewPassword:'New Password',                
                placeholderNewPassword:'New Password',

                fieldRepeatPassword:'Repeat Password',                
                placeholderRepeatPassword:'Repeat Password',

                passwordChangedTitle:"Your password has successful changed",
                passwordChangedMessage:"Your password has successful changed, <br/>You will need to re-login to make effects",
                validation:{
                    passwordNotMatch:'The password is not matched',
                    incorrectPassword: "The password is incorrect"
                }
            },
            userProfileEditView:{
                viewTitle:'<strong>My</strong> Profile',
                nameFormat: ['firstName','lastName'],
                fieldFirstName:'First Name',
                placeholderFirstName:'First Name',

                fieldLastName:'Last Name',                
                placeholderLastName:'Last Name',

                fieldBirthday:'Birthday',                
                placeholderBirthday:'Birthday',

                fieldCompany:'Company',                
                placeholderCompany:'Company',

                fieldDepartment:'Department',                
                placeholderDepartment:'Department',

                fieldPosition:'Position',                
                placeholderPosition:'Position',
                fieldTitle:"称呼",
                "selectionTitleMr.":    'Mr.',
                "selectionTitleMs.":    'Ms.'
            },
            setupWizardView:{
                viewName:'Setup Wizard',
                viewTitle: '<strong>Account</strong> Setup Wizard',
                twoTitle: ' Welcome to setup your account',
                howSetUpTitle: 'How would you like to setup your account ? ',
                setNewCompany: 'I want to create a new company account',
                joinCompany: 'I want to join a company account',
                tableTitle: 'Please review below form to create a new company account',
                companyName: 'Company Name',
                nextstep: 'Next Step',
                phoneDefaultCountryCode: '+1',
                phoneCountryCode: 'Country Code',
                phoneAreaCode: 'Area Code',
                phoneNumber: 'Phone Number',
                addressCountry: 'Country',
                addressDefaultCountry: 'USA',
                addressProvince: 'Province',
                addressCity: 'City',
                addressStreet: 'Street',
                addressZipcode: 'Zipcode',
                webSite: 'Website',
                invitationCodePlaceHolder: 'ACCT-XXXX-XXXXXX',
                joinCompanyTitle: "Please ask your company's administrator for the invitation code. Normally it will send to by email or SMS.",
                companyCode: 'Company Invitation Code',
                done: 'Done',
                validation:{
                    tokenInvalid: 'The token code is invalid',
                    companyNotUnique: 'The company has been taken'
                },
                setupWizardAppSelectorForm:{
                    viewTitle: 'Awesome!',
                    twoTitle: 'Welcome to start your new company',
                    role: 'Your Role',
                    phone: 'Phone',
                    website: 'Website',
                    application: 'Applications',
                    done: 'done',
                    appMessage: 'Please select applications for your company',
                    inviteUsers: 'Invite Users'
                },
                setupWizardUserInvitationForm:{
                    viewTitle: 'Build your team now!',
                    twoTitle: 'Now its time to invite your team members join your company account',
                    users: 'Users',
                    invitations: 'Invitations',
                    done: 'Done',
                    addUser: 'Add User',
                    name: 'Name',
                    email: 'Email',
                    role: 'Role',
                    action: 'Action',
                    invitationCode: 'Invitation Code',
                    noUserMessage: 'Please click "Add User" button to start add or invite your colleagues '
                },
                setupWizardAccountDetailForm:{
                    viewTitle: 'Awesome!',
                    twoTitle: 'Welcome to join the company',
                    company: 'Company',
                    role: 'Your Role',
                    phone: 'Phone',
                    website: 'Website',
                    applications: 'Applications',
                    done: 'Done',
                    name: 'Name'
                },
                userAddModalView: {
                    viewTitle: 'Add a New User',
                    addUser: 'Create New User',
                    joinUser: 'Invite Colleague to Join',
                    title: 'Title',
                    titleMr: 'Mr',
                    titleMs: 'Ms',
                    name: 'Name',
                    firstName : 'First Name',
                    lastName : 'Last Name',
                    mobile: 'Mobile',
                    mobileNumber: 'Mobile Number',
                    phoneDefaultCountryCode: '+1',
                    phoneCountryCode: 'Country Code',
                    phoneAreaCode: 'Area Code',
                    phoneNumber: 'Phone Number',
                    email: 'Email',
                    password: 'Password',
                    passwordPlaceholder: 'At leaset 6 charactors',
                    repeatPassword: 'Repeat',
                    repeatPasswordPlaceholder: 'Repeat password',
                    done: '完成',
                    next: 'Next',
                    validation:{
                        needAgreement: 'You need to check this agreement before continue',
                        passwordNotMatch:'The password is not matched',
                        emailDuplicated: 'The email address has been registered by other user',
                        emailNotInvitable: 'The email address is already assicated with account'
                    }
                },
                addUserView:{
                    viewTitle: '<span>Create</span> New Account',
                    viewDescription: 'Openbiz Cubi Application Platform 4.0',
                    copyright: '&copy; 2014 Openbiz LLC',
                    createAccountButton: 'Create Account',
                    alreadyHaveAccount: 'Already have an account? ',
                    goToLogin: 'Go to Login',
                    title: 'Title',
                    titleMr: 	'Mr.',
                    titleMiss: 	'Miss',
                    titleMrs: 	'Mrs',
                    titleMs: 	'Ms.',
                    name: 'Name',
                    firstName : 'First Name',
                    lastName : 'Last Name',
                    nameFormat: ['firstName','lastName'],
                    company: 'Company',
                    phone: 'Phone',
                    mobile: 'Mobile',
                    mobileNumber: 'Mobile Number',
                    phoneDefaultCountryCode: '+1',
                    phoneCountryCode: 'Country Code',
                    phoneAreaCode: 'Area Code',
                    phoneNumber: 'Phone Number',
                    email: 'Email',
                    password: 'Password',
                    passwordPlaceholder: 'At leaset 6 charactors',
                    repeatPassword: 'Repeat',
                    repeatPasswordPlaceholder: 'Repeat password',
                    agreeWith: 'I have read and agreed with ',
                    termOfUse: 'term of use',
                    signing: 'Signing up',
                    validation:{
                        needAgreement: 'You need to check this agreement before continue',
                        passwordNotMatch:'The password is not matched',
                        emailDuplicated: 'The email address has been registered by other user',
                        emailNotInvitable: 'The email address is already assicated with account'
                    }
                },
                userPermissionView:{
                    viewTitle: 'Setup permission for new user',
                    done: 'Done'
                }
            }
        },
        breadcrumb:{
            home:'Home',
            myAccount:'My Account',
            me:'Me',            
            profile:'Profile',            
            account:'Account',
            members:'Members',
            invitations:"Invitations",
            company:"Company Profile"
        }
	},
	'en-us': true,
	'zh-cn': true
});
>>>>>>> df20f5b3b4b2a9db6e4d17a78482bea46826e662
