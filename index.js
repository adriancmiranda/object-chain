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
 * @moment Sunday, May 6, 2018 7:15 PM
 * @homepage https://github.com/adriancmiranda/object-chain#readme
 * @author Adrian C. Miranda
 * @license (c) 2017-2021
 */
!(function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.objectChain=t()})(this,(function(){"use strict";function e(e){return"function"==typeof e}function t(e){return"string"==typeof e||e instanceof String}function n(e){return (function(e){return null!=e&&e.constructor===Array})(e)||t(e)||!!e&&"object"==typeof e&&"number"==typeof e.length&&(0===e.length||e.length>0&&e.length-1 in e)}function r(e,t,r,u){try{const c=n(r)?r:[];switch(c.length){case 0:return e.call(t);case 1:return e.call(t,c[0]);case 2:return e.call(t,c[0],c[1]);case 3:return e.call(t,c[0],c[1],c[2]);case 4:return e.call(t,c[0],c[1],c[2],c[3]);case 5:return e.call(t,c[0],c[1],c[2],c[3],c[4]);case 6:return e.call(t,c[0],c[1],c[2],c[3],c[4],c[5]);case 7:return e.call(t,c[0],c[1],c[2],c[3],c[4],c[5],c[6]);case 8:return e.call(t,c[0],c[1],c[2],c[3],c[4],c[5],c[6],c[7]);case 9:return e.call(t,c[0],c[1],c[2],c[3],c[4],c[5],c[6],c[7],c[8]);default:return e.apply(t,c)}}catch(e){if(u)return e;throw e}}var u=function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e},c=Function.call.bind(Array.prototype.slice),i=Object.setPrototypeOf,a=Object.defineProperties,l=Object.create,o=Object.keys;return function(n,s){function f(){var u=this,i=this.rules.reduce((function(i,a){if(e(n[a])){var l=r(n[a],u,[i].concat(c(u.args[a])));if(!t(l))return l;i+=l}else i+=n[a];return i}),"");return s?r(s,this,[i,arguments],!0):i}function h(e,t){function n(){return r(f,n,arguments)}return n.rules=e,n.args=t,i(n,d),n}var p=o(n).reduce((function(t,r){var c=e(n[r]);return t[r]=u({},c?"value":"get",(function(){return!1===c?h(this.rules.concat(r),this.args):(this.args[r]=arguments,h(this.rules.concat(r),this.args))})),t}),l(null)),d=a((function(){}),p);return a({rules:n},o(p).reduce((function(t,r){var c=e(n[r]);return t[r]=u({},c?"value":"get",(function(){return h([r],arguments)})),t}),l(null)))}}));
//# sourceMappingURL=index.js.map
