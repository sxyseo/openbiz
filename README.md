<<<<<<< HEAD
<<<<<<< HEAD
Openbiz Startup
===============

What is it?
--------------------
The demo for how to start up with Openbiz framework. 
You can use it as a blank project template, and starts to build your own application based on it.
it is not a npm package, it an express based application

How to use it?
----------------------
You can clone the project and start to build and test your own module on it .

How to install (deploy)
-------------------------
You can follow below commands to install the openbiz development environment into your computer.
```sh
#clone this project as your project's root folder
git clone https://github.com/openbiz/openbiz-startup.git

#go into the project folder
cd openbiz-startup

#install openbiz environment
./install-openbiz.sh

#now its ready to run!
node app
```

Open your browser to go to [http://localhost:8080](http://localhost:8080).
if you have saw page loaded, means its running.


What's next ?
---------------------------------
Actually now you have already deployed the environment on your computer. 
You may want to do below things:
* Open your browser to register an openbiz account locally and experience the UI interactive experience.
* Try to use appbuilder to automatic generate an openbiz base application and see how cool is it. 
* if you want to discover more, welcome to follow us and join discussion.

How to update openbiz libs
---------------------------
For your own project, indeed you can use git pull to update, 
But for fetch the nightly update openbiz code we have build this script which make it easy for you.
```sh
./update-openbiz.sh
```

How to generate applications
-----------------------------
We have linked openbiz-appbuilder into your project folder.
```sh
#To check if appbuilder is executable
./appbuilder --help
```

We have some ready to use metadata for you to test.
You can follow below to generate an web app in a second.
```sh
#generate an app by using apps/demo/metadata/demo.json metadata file
./appbuilder -c apps/demo/metadata/demo.json -o ./apps/demo -a ./app.js -v -f

#After the app been generated, Don't forget to restart your express to reload it.
node app
```

For more info about how to use appbuilder please reference to openbiz-appbuilder page.

How to manual load your apps
-------------------------------
There are 2 places you should looks at, one is about backend another is fronted ,
To load your app on server side , you should append below line to your /app.js
Lets say your app is called "demo". below code will load the backend API route listen at /api/demo/*
and the frontend will be accessable via http://yourhost/apps/demo
```javascript
require('./apps/demo')(openbiz).loadAppToRoute('/api/demo')
		.loadUIToRoute('/apps/demo');
```
So far your just made the app's frontend accessable but you didn't tell openbiz to load it on user's browsers.
below code will register your app to the frontend.

Please find and open /public/website/app-init.js
```javascript
//You will see something like below, 
openbiz.loadApps(['apps/cubi'/*MORE_APPS*/],function(apps){...}
```
Now you can add your app's entry point after Cubi, 
the loading order is mattered and all openbiz's app has to load after openbiz-cubi.
```javascript
openbiz.loadApps(['apps/cubi','apps/demo'/*MORE_APPS*/],function(apps){...}
```

Folder Structures
-----------------------------
- apps/ 		---- you applications should goes here
- certs/ 		---- the cert files for HTTPS encryption
- public/ 		---- if your project need to build with website, in this folder you can put non-app stuff
- config.js 	---- all your project configurable setting should defines in this file.
- app.js 		---- the main entry point of your project
- appbuilder 	---- a shortcut for launch openbiz appbuilder
- install-openbiz.sh 	---- the installer script
- update-openbiz.sh 	---- the script for update openbiz libs
=======
Openbiz Application Framework
=============================
Openbiz Framework is node.js server-side application framework.

What is Openbiz
---------------------
It is based on express.js framework as web server. openbiz provides an application archecture to build a large enterprise level application.

Difference than other frameworks, Openbiz is focus on designing large scalable applications, it supports custom apps and modules concept as namespaces,
That makes it can easy to handle a CRM or ERP large system. Also as a tradination of Openbiz history, we are still working on free developers time.

So base on Openbiz to build your own business application, we are doing more than just let coding few and implement much. We are targeting to let you code nearly nothing.
All you need to do for build your application is just think and clear about your data schema, and Openbiz can handle rest of CRUD logic, and dynamic modules loading for you.


Key Features
---------------------------
* Easy to use Object inheritance support.
* Apps and modules namespaces support for you own app.
* Design for Big Data engine and supports mongoose.js as data model.
* Built in smart data controller and URL router can automatic implememnt CRUD logic.
* It has Openbiz-Appbuilder as a ready to use command line tool for generate code.
* It has Openbiz-Cubi as a ready to use user and permission backend system.

Quick View
----------------------------
If you are a node.js developer as me, I believe you must have these hard time to write ton of CRUD logic for each of your data model in controllers,
and have to manually map them into your app routes. So normally if you just done your data model, the work is just begin, but with openbiz we make it almost close to complete.
Let's see some samples.

Let's say you already have a mongoose based data model called Account.js, Then your AccountController.js would be just simple like below, then all CRUD logic will automaticaly created:

AccountController.js
```javascript
module.exports = function(app){
    return app.openbiz.ModelController.extend({
        _model: app.getModel('Account')
    });
}
```
routes.js
```javascript
module.exports = function(app){
    var modelController = app.getController('AccountController');
    var routePrefix = '/accounts';
    var permission = 'cubi-user';
    var routes = app.openbiz.ModelRouter.getDefaultRoutes(routePrefix, modelController, permission);
    //maybe you want to add some more custom route rules here.
    return routes;
}
```

Then just that coupon of code you will get all ready to use feature like below:
```
// lets say you have mount the entire app under /api/* routes
post    /api/accounts               //for create a new account entity
get     /api/accounts/:id           //for get a account entity by ID
put     /api/accounts/:id           //for update account properties
delete  /api/accounts/:id           //for delete specified account
post    /api/accounts/search        //for search account by specified request payload
```

The real example code you can get at openbiz-cubi project. For more details please follow our documents.


Installation
---------------
via [npm](http://www.npmjs.org):
```sh
cd /your-project-root-folder/
npm install openbiz
```


Get Started
----------------------
First, you need to have some [node.js](http://www.nodejs.org) and [express.js](http://www.expressjs.com) background.
if you need helps, I suggest you go to look at their offical documents. Trust me it wouldn't be hard.  :-)

### load the module
```javascript
//app is an instance of express.js app
//setup the database connection
var config = {
    db:{
        uri: 'localhost/myOpenbiz'
    }
};
//init openbiz system
var openbiz = require('openbiz')(app,config);
```

### load a openbiz based application
```javascript
//then you can load your app into openbiz,
//normall you would need openbiz-cubi as a user & role management backend.
var cubi    = require('openbiz-cubi')(openbiz).loadToRoute('/api');
```

### start to build your own app

Credits
----------------------
Written and maintained by [hellojixian].

Thanks to: [zhangdong,sunjianlong]

License
----------------------
Copyright (c) 2013, Openbiz Cubi Framework
All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice, this
  list of conditions and the following disclaimer in the documentation and/or
  other materials provided with the distribution.

* Neither the name of the {organization} nor the names of its
  contributors may be used to endorse or promote products derived from
  this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
>>>>>>> 997f1398396683d7ad667b1b360ce74c7c7fcf6f
=======
openbiz-ui
==========

Openbiz UI libs on browser side
>>>>>>> 1196908712e898671cfd72ee5575091f7d5b0304
