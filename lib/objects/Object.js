/**
 * @class Object
 * @classdesc
 * The base Class implementation (does nothing).
 *
 * It's a very very basic level of openbiz class. All openbiz subclasses are extended from it.
 *
 * Compare with the default native way to manage Javascript class inheritance, You don't need to deal with that very complicated way to extend your class.
 * So this class provides a way to easily call its parent class methods, and defined a constrator method for each of it's inherited classes.
 *
 * @example
 * // if you want to inherit a class that based on this class ,
 * // the code would be easy as below
 * var myClass = openbiz.objects.Controller.extend({
 *      //myClass's new properties
 * });
 *
 * //When you use it , please don't forget to instance it.
 * var myInstance = new myClass();
 *
 * @example
 * // if you want to class your parent class methods you can do like below.
 * var myModdule = openbiz.objects.Module.extend({
 *      beforeLoadModule:function(){
 *          this._super();  //call parent method
 *          // then do some my logic here
 *          console.log('I am going to load it!');
 *      }
 * });
 *
 *
 * @returns {openbiz.objects.Object}
 * @memberof openbiz.objects
 * @author Jixian Wang <jixian@openbiz.me>
 * @version 4.0.0
 * @copyright {@link http://www.openbiz.me|Openbiz LLC}
 * @license {@link http://opensource.org/licenses/BSD-3-Clause|BSD License}
 */

/* Managed JavaScript Inheritance
 * Based on John Resig's Simple JavaScript Inheritance http://ejohn.org/blog/simple-javascript-inheritance/
 * MIT Licensed.
 */

var cc = cc || {};

//
function ClassManager(){
    //tells own name
    return arguments.callee.name || (arguments.callee.toString()).match(/^function ([^(]+)/)[1];
}
ClassManager.id=(0|(Math.random()*998));
ClassManager.compileSuper=function(func, name, id){
    //make the func to a string
    var str = func.toString();
    //find parameters
    var pstart = str.indexOf('(');
    var pend = str.indexOf(')');
    var params = str.substring(pstart+1, pend);
    params = params.trim();

    //find function body
    var bstart = str.indexOf('{');
    var bend = str.lastIndexOf('}');
    var str = str.substring(bstart+1, bend);

    //now we have the content of the function, replace this._super
    //find this._super
    while(str.indexOf('this._super')!= -1)
    {
        var sp = str.indexOf('this._super');
        //find the first '(' from this._super)
        var bp = str.indexOf('(', sp);

        //find if we are passing params to super
        var bbp = str.indexOf(')', bp);
        var superParams = str.substring(bp+1, bbp);
        superParams = superParams.trim();
        var coma = superParams? ',':'';

        //find name of ClassManager
        var Cstr = arguments.callee.ClassManager();

        //replace this._super
        str = str.substring(0, sp)+  Cstr+'['+id+'].'+name+'.call(this'+coma+str.substring(bp+1);
    }
    return Function(params, str);
};
ClassManager.compileSuper.ClassManager = ClassManager;
ClassManager.getNewID=function(){
    return this.id++;
};


(function () {
    var initializing = false, fnTest = /\b_super\b/;
    var releaseMode =  null;
    if(releaseMode) {
        console.log("release Mode");
    }


    cc.Class = function () {
    };

    /**
     * Create a new Class that inherits from this Class.
     * for an example you can refer to {@link objects/Application.js}
     * @memberof openbiz.objects.Object
     * @function extend
     * @param {object} properties - The properties of new object
     * @return {openbiz.objects.Object}
     * @example
     * // create a new empty object and inherit from openbiz.Objbect
     * var myObject = openbiz.Object.extend();
     * var myObjectInstance = new myObject();
     *
     * @example
     * // create a new object and inherit from openbiz.Objbect with some initialize properties
     * var myObject = openbiz.Object.extend({
     *    propertyA : defaultValue1,
     *    propertyB : defaultValue2,
     *    methodA : function(){
     *      //some logic here
     *    }
     * });
     * var myObjectInstance = new myObject();
     * @see {@link objects/Application.js}
     * @static
     */
    cc.Class.extend = function (prop) {
        /**
         * This method to call parent's method
         * @function _super
         * @memberof openbiz.objects.Object
         * @instance
         */
        var _super = this.prototype;

        // Instantiate a base Class (but only create the instance,
        // don't run the init constructor)
        var prototype = Object.create(_super);

        var classId = ClassManager.getNewID();
        ClassManager[classId] = _super;
        // Copy the properties over onto the new prototype. We make function
        // properties non-eumerable as this makes typeof === 'function' check
        // unneccessary in the for...in loop used 1) for generating Class()
        // 2) for cc.clone and perhaps more. It is also required to make
        // these function properties cacheable in Carakan.
        var desc = { writable: true, enumerable: false, configurable: true };
        for (var name in prop) {
            if(releaseMode && typeof prop[name] == "function" && typeof _super[name] == "function" && fnTest.test(prop[name])) {
                desc.value = ClassManager.compileSuper(prop[name], name, classId);
                Object.defineProperty(prototype, name, desc);
            } else if(typeof prop[name] == "function" && typeof _super[name] == "function" && fnTest.test(prop[name])){
                desc.value = (function (name, fn) {
                    return function () {
                        var tmp = this._super;

                        // Add a new ._super() method that is the same method
                        // but on the super-Class
                        this._super = _super[name];

                        // The method only need to be bound temporarily, so we
                        // remove it when we're done executing
                        var ret = fn.apply(this, arguments);
                        this._super = tmp;

                        return ret;
                    };
                })(name, prop[name]);
                Object.defineProperty(prototype, name, desc);
            } else if(typeof prop[name] == "function") {
                desc.value = prop[name];
                Object.defineProperty(prototype, name, desc);
            } else{
                prototype[name] = prop[name];
            }
        }

        // The dummy Class constructor. The properties are initialized in
        // the constructor in advance so that the hidden class an instance
        // of this belongs is stable. We need to create this constructor on
        // the fly with "new Function" intead of doing
        //
        //     function Class () {
        //       for (var p in this)
        //         this[p] = this[p];
        //     }
        //
        // because using keyed assignment (this[x] = y instead of this.x = y)
        // to append new proeprties is almost certainly going to make an object
        // turn into dictionary mode in V8.
        //
        // See https://github.com/oupengsoftware/v8/wiki/Dictionary-mode-%28English%29#wiki-append-property
        //
        // for principles under the hood.
        /*var functionBody = releaseMode? "": "this._super=null;";
        for (var p in prototype) {
            functionBody += "this." + p + "=this." + p + ";";
        }
        if (prototype.ctor)
            functionBody += "this.ctor.apply(this,arguments)";
        var Class = new Function(functionBody);*/

        // The dummy Class constructor
        function Class() {
            // All construction is actually done in the init method
            /**
             * This method is the constructor of this class.
             * @function ctor
             * @memberof openbiz.objects.Object
             * @virtual
             */
            if (this.ctor)
                this.ctor.apply(this, arguments);
        }

        Class.id = classId;
        // desc = { writable: true, enumerable: false, configurable: true,
        //          value: XXX }; Again, we make this non-enumerable.
        desc.value = classId;
        Object.defineProperty(prototype, '__pid', desc);

        // Populate our constructed prototype object
        Class.prototype = prototype;

        // Enforce the constructor to be what we expect
        desc.value = Class;
        Object.defineProperty(Class.prototype, 'constructor', desc);

        // And make this Class extendable
        Class.extend = arguments.callee;

        //add implementation method
        Class.implement = function (prop) {
            for (var name in prop) {
                prototype[name] = prop[name];
            }
        };
        return Class;
    };

    Function.prototype.bind = Function.prototype.bind || function (bind) {
        var self = this;
        return function () {
            var args = Array.prototype.slice.call(arguments);
            return self.apply(bind || null, args);
        };
    };

})();

//
// Another way to subclass: Using Google Closure.
// The following code was copied + pasted from goog.base / goog.inherits
//
cc.inherits = function (childCtor, parentCtor) {
    function tempCtor() {}
    tempCtor.prototype = parentCtor.prototype;
    childCtor.superClass_ = parentCtor.prototype;
    childCtor.prototype = new tempCtor();
    childCtor.prototype.constructor = childCtor;

    // Copy "static" method, but doesn't generate subclasses.
//  for( var i in parentCtor ) {
//      childCtor[ i ] = parentCtor[ i ];
//  }
};
cc.base = function(me, opt_methodName, var_args) {
    var caller = arguments.callee.caller;
    if (caller.superClass_) {
        // This is a constructor. Call the superclass constructor.
        ret =  caller.superClass_.constructor.apply( me, Array.prototype.slice.call(arguments, 1));
        return ret;
    }

    var args = Array.prototype.slice.call(arguments, 2);
    var foundCaller = false;
    for (var ctor = me.constructor;
        ctor; ctor = ctor.superClass_ && ctor.superClass_.constructor) {
        if (ctor.prototype[opt_methodName] === caller) {
            foundCaller = true;
        } else if (foundCaller) {
            return ctor.prototype[opt_methodName].apply(me, args);
        }
    }

    // If we did not find the caller in the prototype chain,
    // then one of two things happened:
    // 1) The caller is an instance method.
    // 2) This method was not called by the right caller.
    if (me[opt_methodName] === caller) {
        return me.constructor.prototype[opt_methodName].apply(me, args);
    } else {
        throw Error(
                    'cc.base called from a method of one name ' +
                    'to a method of a different name');
    }
};

cc.concatObjectProperties = function(dstObject, srcObject){
    if(!dstObject)
        dstObject = {};

    for(var selKey in srcObject){
        dstObject[selKey] = srcObject[selKey];
    }
    return dstObject;
};

module.exports= cc.Class;