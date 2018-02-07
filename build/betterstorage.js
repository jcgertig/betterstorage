var BetterStorage=function(e){"use strict";function t(e,t,n){var r=n.configurable,o=n.enumerable,i=n.initializer,u=n.value;return{configurable:r,enumerable:o,get:function(){if(this!==e){var n=i?i.call(this):u;return F(this,t,{configurable:r,enumerable:o,writable:!0,value:n}),n}},set:l(t)}}function n(){for(var e=arguments.length,n=Array(e),r=0;r<e;r++)n[r]=arguments[r];return a(t,n)}function r(e,t,n,r){n&&Object.defineProperty(e,t,{enumerable:n.enumerable,configurable:n.configurable,writable:n.writable,value:n.initializer?n.initializer.call(r):void 0})}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t,n,r,o){var i={};return Object.keys(r).forEach(function(e){i[e]=r[e]}),i.enumerable=!!i.enumerable,i.configurable=!!i.configurable,("value"in i||i.initializer)&&(i.writable=!0),i=n.slice().reverse().reduce(function(n,r){return r(e,t,n)||n},i),o&&void 0!==i.initializer&&(i.value=i.initializer?i.initializer.call(o):void 0,i.initializer=void 0),void 0===i.initializer&&(Object.defineProperty(e,t,i),i=null),i}function u(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function s(e){if(!e||!e.hasOwnProperty)return!1;for(var t=["value","initializer","get","set"],n=0,r=t.length;n<r;n++)if(e.hasOwnProperty(t[n]))return!0;return!1}function a(e,t){return s(t[t.length-1])?e.apply(void 0,u(t).concat([[]])):function(){return e.apply(void 0,u(Array.prototype.slice.call(arguments)).concat([t]))}}function c(e){var t={};return A(e).forEach(function(n){return t[n]=j(e,n)}),t}function l(e){return function(t){return Object.defineProperty(this,e,{configurable:!0,writable:!0,enumerable:!0,value:t}),t}}function h(e,t){return e.bind?e.bind(t):function(){return e.apply(t,arguments)}}function f(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function y(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function d(e,t){if("undefined"==typeof WeakMap)throw new Error("Using @autobind on "+t.name+"() requires WeakMap support due to its use of super."+t.name+"()\n      See https://github.com/jayphelps/core-decorators.js/issues/20");H||(H=new WeakMap),!1===H.has(e)&&H.set(e,new WeakMap);var n=H.get(e);return!1===n.has(t)&&n.set(t,h(t,e)),n.get(t)}function v(e){for(var t=c(e.prototype),n=A(t),r=0,o=n.length;r<o;r++){var i=n[r],u=t[i];"function"==typeof u.value&&"constructor"!==i&&N(e.prototype,i,p(e.prototype,i,u))}}function p(e,t,n){var r=n.value,o=n.configurable,i=n.enumerable;if("function"!=typeof r)throw new SyntaxError("@autobind can only be used on functions, not: "+r);var u=e.constructor;return{configurable:o,enumerable:i,get:function(){if(this===e)return r;if(this.constructor!==u&&G(this).constructor===u)return r;if(this.constructor!==u&&t in this.constructor.prototype)return d(this,r);var n=h(r,this);return N(this,t,{configurable:!0,writable:!0,enumerable:!1,value:n}),n},set:l(t)}}function g(e){return 1===e.length?v.apply(void 0,y(e)):p.apply(void 0,y(e))}function m(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return 0===t.length?function(){return g(arguments)}:g(t)}function k(e){return e instanceof Promise?e:new Promise(function(t){return t(e)})}var b,S,w,K,_,P,x,O,F=Object.defineProperty,I="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},j=Object.getOwnPropertyDescriptor,L=Object.getOwnPropertyNames,T=Object.getOwnPropertySymbols,A=(b=function e(){o(this,e),r(this,"debounceTimeoutIds",S,this),r(this,"throttleTimeoutIds",w,this),r(this,"throttlePreviousTimestamps",K,this),r(this,"throttleTrailingArgs",_,this),r(this,"profileLastRan",P,this)},S=i(b.prototype,"debounceTimeoutIds",[n],{enumerable:!0,initializer:function(){return{}}}),w=i(b.prototype,"throttleTimeoutIds",[n],{enumerable:!0,initializer:function(){return{}}}),K=i(b.prototype,"throttlePreviousTimestamps",[n],{enumerable:!0,initializer:function(){return{}}}),_=i(b.prototype,"throttleTrailingArgs",[n],{enumerable:!0,initializer:function(){return null}}),P=i(b.prototype,"profileLastRan",[n],{enumerable:!0,initializer:function(){return null}}),T?function(e){return L(e).concat(T(e))}:L),z="object"===("undefined"==typeof console?"undefined":I(console))&&console&&"function"==typeof console.warn?h(console.warn,console):function(){},E="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},R=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),C=/^function ([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?(\([^\)]*\))[\s\S]+$/,N=(function(){function e(t,n,r,o){f(this,e),this.parentKlass=t,this.childKlass=n,this.parentDescriptor=r,this.childDescriptor=o}R(e,[{key:"_getTopic",value:function(e){return void 0===e?null:"value"in e?e.value:"get"in e?e.get:"set"in e?e.set:void 0}},{key:"_extractTopicSignature",value:function(e){switch(void 0===e?"undefined":E(e)){case"function":return this._extractFunctionSignature(e);default:return this.key}}},{key:"_extractFunctionSignature",value:function(e){var t=this;return e.toString().replace(C,function(e){return(arguments.length>1&&void 0!==arguments[1]?arguments[1]:t.key)+arguments[2]})}},{key:"key",get:function(){return this.childDescriptor.key}},{key:"parentNotation",get:function(){return this.parentKlass.constructor.name+"#"+this.parentPropertySignature}},{key:"childNotation",get:function(){return this.childKlass.constructor.name+"#"+this.childPropertySignature}},{key:"parentTopic",get:function(){return this._getTopic(this.parentDescriptor)}},{key:"childTopic",get:function(){return this._getTopic(this.childDescriptor)}},{key:"parentPropertySignature",get:function(){return this._extractTopicSignature(this.parentTopic)}},{key:"childPropertySignature",get:function(){return this._extractTopicSignature(this.childTopic)}}]),R(e,[{key:"assert",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";!0!==e&&this.error("{child} does not properly override {parent}"+t)}},{key:"error",value:function(e){var t=this;throw e=e.replace("{parent}",function(e){return t.parentNotation}).replace("{child}",function(e){return t.childNotation}),new SyntaxError(e)}}])}(),Object.defineProperty),G=Object.getPrototypeOf,H=void 0,D={},J=(console.time&&console.time.bind(console),console.timeEnd&&console.timeEnd.bind(console),console.profile&&h(console.profile,console),console.profileEnd&&h(console.profileEnd,console),function(){function e(e){this.value=e}function t(t){function n(o,i){try{var u=t[o](i),s=u.value;s instanceof e?Promise.resolve(s.value).then(function(e){n("next",e)},function(e){n("throw",e)}):r(u.done?"return":"normal",u.value)}catch(e){r("throw",e)}}function r(e,t){switch(e){case"return":o.resolve({value:t,done:!0});break;case"throw":o.reject(t);break;default:o.resolve({value:t,done:!1})}(o=o.next)?n(o.key,o.arg):i=null}var o,i;this._invoke=function(e,t){return new Promise(function(r,u){var s={key:e,arg:t,resolve:r,reject:u,next:null};i?i=i.next=s:(o=i=s,n(e,t))})},"function"!=typeof t.return&&(this.return=void 0)}"function"==typeof Symbol&&Symbol.asyncIterator&&(t.prototype[Symbol.asyncIterator]=function(){return this}),t.prototype.next=function(e){return this._invoke("next",e)},t.prototype.throw=function(e){return this._invoke("throw",e)},t.prototype.return=function(e){return this._invoke("return",e)}}(),function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}),M=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),W=m(x=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"local",r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};J(this,e),this.prefix=t,this.kind=n,this.store="string"==typeof n?window[n+"Storage"]:n,this.methods=Object.assign({doSet:this._doSet,doGet:this._doGet,doRemove:this._doRemove,doClear:this._doClear,doLength:this._doLength,doFullLength:this._doFullLength,doKey:this._doKey,doFullKey:this._doFullKey,doHas:this._doHas},r)}return M(e,[{key:"_doSet",value:function(e,t){return k(this.store.setItem(e,JSON.stringify({value:t})))}},{key:"_doGet",value:function(e){var t=this;return new Promise(function(n,r){k(t.store.getItem(e)).then(function(e){try{n(JSON.parse(e).value)}catch(t){n(e)}}).catch(r)})}},{key:"_doRemove",value:function(e){return k(this.store.removeItem(e))}},{key:"_doClear",value:function(){return k(this.store.clear())}},{key:"_doLength",value:function(){var e=this;return new Promise(function(t,n){e.keys.then(function(e){return t(e.length)}).catch(n)})}},{key:"_doFullLength",value:function(){var e=this;return new Promise(function(t,n){e.fullKeys.then(function(e){return t(e.length)}).catch(n)})}},{key:"_doKey",value:function(e){var t=this;return new Promise(function(n,r){t.keys.then(function(t){return n(t[e])}).catch(r)})}},{key:"_doFullKey",value:function(e){var t=this;return new Promise(function(n,r){t.fullKeys.then(function(t){return n(t[e])}).catch(r)})}},{key:"_doHas",value:function(e){var t=this;return new Promise(function(n,r){t.fullKeys.then(function(t){return n(t.indexOf(e)>-1)}).catch(r)})}},{key:"getStoreKey",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments[1];return""===(t=t||this.prefix)?e:t+"-"+e}},{key:"setPrefix",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return new Promise(function(r,o){n&&""!==e.prefix&&e.keys.length>0?e.keys.then(function(n){Promise.all(n.map(function(t){return new Promise(function(n,r){e.store.getItem(e.getStoreKey(t)).then(function(e){return n({key:t,value:e})}).catch(r)})})).then(function(n){Promise.all(n.reduce(function(n,r){return n.push(e.store.removeItem(e.getStoreKey(r.key))),n.push(e.store.setItem(e.getStoreKey(r.key,t),r.value)),n},[])).then(function(){e.prefix=t,r()}).catch(o)}).catch(o)}).catch(o):(e.prefix=t,r())})}},{key:"setKind",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return new Promise(function(r,o){var i="string"==typeof e?window[e+"Storage"]:e;n&&""!==t.prefix&&t.keys.length>0?t.keys.then(function(n){Promise.all(n.map(function(e){return new Promise(function(n,r){t.store.getItem(t.getStoreKey(e)).then(function(t){return n({key:e,value:t})}).catch(r)})})).then(function(n){Promise.all(n.reduce(function(e,n){return e.push(t.store.removeItem(t.getStoreKey(n.key))),e.push(i.setItem(t.getStoreKey(n.key),n.value)),e},[])).then(function(){t.kind=e,t.store=i,r()}).catch(o)}).catch(o)}).catch(o):(t.kind=e,t.store=i,r())})}},{key:"set",value:function(e,t){return this.methods.doSet(this.getStoreKey(e),t)}},{key:"get",value:function(e){return this.methods.doGet(this.getStoreKey(e))}},{key:"remove",value:function(e){return this.methods.doRemove(this.getStoreKey(e))}},{key:"has",value:function(e){return this.methods.doHas(this.getStoreKey(e))}},{key:"clear",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return""===this.prefix||t?this.methods.doClear():new Promise(function(t,n){e.keys.then(function(r){Promise.all(r.map(function(t){return e.methods.doRemove(e.getStoreKey(t))})).then(t).catch(n)}).catch(n)})}},{key:"getLength",value:function(){return this.methods.doLength()}},{key:"getFullLength",value:function(){return this.methods.doFullLength()}},{key:"key",value:function(e){return this.methods.doKey(e)}},{key:"fullKey",value:function(e){return this.methods.doFullKey(e)}},{key:"keys",get:function(){var e=this;return""===this.prefix?this.fullKeys:new Promise(function(t,n){e.fullKeys.then(function(n){t(n.filter(function(t){return 0===t.indexOf(e.prefix+"-")}).map(function(t){return t.replace(e.prefix+"-","")}))}).catch(n)})}},{key:"fullKeys",get:function(){var e=this;return this.store.hasOwnProperty("getAllKeys")?this.store.getAllKeys():new Promise(function(t){return t(Object.keys(e.store))})}}]),e}())||x,$=m(O=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"local",r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};J(this,e),this.prefix=t,this.kind=n,this.store="string"==typeof n?window[n+"Storage"]:n,this.methods=Object.assign({doSet:this._doSet,doGet:this._doGet,doRemove:this._doRemove,doClear:this._doClear,doLength:this._doLength,doFullLength:this._doFullLength,doKey:this._doKey,doFullKey:this._doFullKey,doHas:this._doHas},r)}return M(e,[{key:"_doSet",value:function(e,t){return this.store.setItem(e,JSON.stringify({value:t}))}},{key:"_doGet",value:function(e){try{return JSON.parse(this.store.getItem(e)).value}catch(t){return this.store.getItem(e)}}},{key:"_doRemove",value:function(e){return this.store.removeItem(e)}},{key:"_doClear",value:function(){return this.store.clear()}},{key:"_doLength",value:function(){return this.keys.length}},{key:"_doFullLength",value:function(){return this.store.length}},{key:"_doKey",value:function(e){return this.keys[e]}},{key:"_doFullKey",value:function(e){return this.store.key(e)}},{key:"_doHas",value:function(e){return this.fullKeys.indexOf(e)>-1}},{key:"getStoreKey",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments[1];return""===(t=t||this.prefix)?e:t+"-"+e}},{key:"setPrefix",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";arguments.length>1&&void 0!==arguments[1]&&arguments[1]&&""!==this.prefix&&this.keys.length>0&&this.keys.forEach(function(n){var r=e.store.getItem(e.getStoreKey(n));e.store.removeItem(e.getStoreKey(n)),e.store.setItem(e.getStoreKey(n,t),r)}),this.prefix=t}},{key:"setKind",value:function(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r="string"==typeof e?window[e+"Storage"]:e;n&&""!==this.prefix&&this.keys.length>0&&this.keys.forEach(function(e){var n=t.store.getItem(t.getStoreKey(e));t.store.removeItem(t.getStoreKey(e)),r.setItem(t.getStoreKey(e),n)}),this.kind=e,this.store=r}},{key:"set",value:function(e,t){return this.methods.doSet(this.getStoreKey(e),t)}},{key:"get",value:function(e){return this.methods.doGet(this.getStoreKey(e))}},{key:"remove",value:function(e){return this.methods.doRemove(this.getStoreKey(e))}},{key:"has",value:function(e){return this.methods.doHas(this.getStoreKey(e))}},{key:"clear",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return""===this.prefix||t?this.methods.doClear():Promise.all(this.keys.map(function(t){return e.methods.doRemove(e.getStoreKey(t))}))}},{key:"getLength",value:function(){return this.methods.doLength()}},{key:"getFullLength",value:function(){return this.methods.doFullLength()}},{key:"key",value:function(e){return this.methods.doKey(e)}},{key:"fullKey",value:function(e){return this.methods.doFullKey(e)}},{key:"keys",get:function(){var e=this;return""===this.prefix?this.fullKeys:Object.keys(this.store).filter(function(t){return 0===t.indexOf(e.prefix+"-")}).map(function(t){return t.replace(e.prefix+"-","")})}},{key:"fullKeys",get:function(){return Object.keys(this.store)}}]),e}())||O;return e.BetterStorage=$,e.default=W,e}({});
//# sourceMappingURL=betterstorage.js.map
