/*!
 *    /     '      /  / 
 *   /__      ___ (  /   
 *   \--`-'-|`---\ |  
 *    |' _/   ` __/ /   
 *    '._  W    ,--'   
 *       |_:_._/         
 *                       
 * ~~ object-chain v1.0.0
 * 
 * @moment Monday, May 7, 2018 7:11 AM
 * @homepage https://github.com/adriancmiranda/object-chain#readme
 * @author Adrian C. Miranda
 * @license (c) 2017-2021
 */
!(function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.objectChain=e()})(this,(function(){"use strict";function t(t){return"function"==typeof t}function e(t){return"string"==typeof t||t instanceof String}function r(t){return void 0===t}function n(t){return (function(t){return null!=t&&t.constructor===Array})(t)||e(t)||!!t&&"object"==typeof t&&"number"==typeof t.length&&(0===t.length||t.length>0&&t.length-1 in t)}function u(t,e,r,u){try{const c=n(r)?r:[];switch(c.length){case 0:return t.call(e);case 1:return t.call(e,c[0]);case 2:return t.call(e,c[0],c[1]);case 3:return t.call(e,c[0],c[1],c[2]);case 4:return t.call(e,c[0],c[1],c[2],c[3]);case 5:return t.call(e,c[0],c[1],c[2],c[3],c[4]);case 6:return t.call(e,c[0],c[1],c[2],c[3],c[4],c[5]);case 7:return t.call(e,c[0],c[1],c[2],c[3],c[4],c[5],c[6]);case 8:return t.call(e,c[0],c[1],c[2],c[3],c[4],c[5],c[6],c[7]);case 9:return t.call(e,c[0],c[1],c[2],c[3],c[4],c[5],c[6],c[7],c[8]);default:return t.apply(e,c)}}catch(t){if(u)return t;throw t}}var c=function(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t},i=Function.call.bind(Array.prototype.slice),a=Object.setPrototypeOf,o=Object.defineProperties,s=Object.create,l=Object.keys;return function(n,f){function h(){var r=this,c=this.rules.reduce((function(c,a){if(t(n[a])){var o=i(r.args[a]),s=u(n[a],r,[c].concat(o));if(!e(s))return s;c+=s}else c+=n[a];return c}),"");return f?u(f,this,[c,arguments],!0):c}function g(t,e){function r(){return u(h,r,arguments)}return r.rules=t,r.args=e,a(r,p),r}var d=l(n).reduce((function(e,u){var i=t(n[u]);return e[u]=c({},i?"value":"get",(function(){return r(this.args)&&(this.args=[]),i&&(this.args[u]=arguments),g(this.rules.concat(u),this.args)})),e}),s(null)),p=o((function(){}),d);return o({rules:n},l(d).reduce((function(e,u){var i=t(n[u]);return e[u]=c({},i?"value":"get",(function(){return r(this.args)&&(this.args=[]),i&&(this.args[u]=arguments),g([u],this.args)})),e}),s(null)))}}));
//# sourceMappingURL=index.js.map
