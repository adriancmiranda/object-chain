/*!
 *    /     '      /  / 
 *   /__      ___ (  /   
 *   \--`-'-|`---\ |  
 *    |' _/   ` __/ /   
 *    '._  W    ,--'   
 *       |_:_._/         
 *                       
 * ~~ object-chain v1.0.2
 * 
 * @moment Monday, May 7, 2018 10:18 PM
 * @homepage https://github.com/adriancmiranda/object-chain#readme
 * @author Adrian C. Miranda
 * @license (c) 2017-2021
 */
!(function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.objectChain=t()})(this,(function(){"use strict";function e(e){return"function"==typeof e}function t(e){return"string"==typeof e||e instanceof String}function n(e){return (function(e){return null!=e&&e.constructor===Array})(e)||t(e)||!!e&&"object"==typeof e&&"number"==typeof e.length&&(0===e.length||e.length>0&&e.length-1 in e)}function r(e,t,r,u){try{const c=n(r)?r:[];switch(c.length){case 0:return e.call(t);case 1:return e.call(t,c[0]);case 2:return e.call(t,c[0],c[1]);case 3:return e.call(t,c[0],c[1],c[2]);case 4:return e.call(t,c[0],c[1],c[2],c[3]);case 5:return e.call(t,c[0],c[1],c[2],c[3],c[4]);case 6:return e.call(t,c[0],c[1],c[2],c[3],c[4],c[5]);case 7:return e.call(t,c[0],c[1],c[2],c[3],c[4],c[5],c[6]);case 8:return e.call(t,c[0],c[1],c[2],c[3],c[4],c[5],c[6],c[7]);case 9:return e.call(t,c[0],c[1],c[2],c[3],c[4],c[5],c[6],c[7],c[8]);default:return e.apply(t,c)}}catch(e){if(u)return e;throw e}}var u=function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e},c=Function.call.bind(Array.prototype.slice),i=Object.setPrototypeOf,a=Object.defineProperties,o=Object.create,s=Object.keys;return function(n,l){function f(){var u=this,i=this.rules.reduce((function(i,a,o){if(e(n[a])){var s=c(u.args[""+a+o]),l=r(n[a],u,[i].concat(s));if(!t(l))return l;i+=l}else i+=n[a];return i}),"");return l?r(l,this,[i,arguments],!0):i}function h(e,t,n){function u(){return r(f,u,arguments)}return u.rules=e,u.args=t,u.index=n,i(u,g),u}var d=s(n).reduce((function(t,r,c){var i=e(n[r]);return t[r]=u({},i?"value":"get",(function(){return this.index+=1,i&&(this.args[""+r+this.index]=arguments),h(this.rules.concat(r),this.args,this.index)})),t}),o(null)),g=a((function(){}),d);return a({rules:n},s(d).reduce((function(t,r,c){var i=e(n[r]);return t[r]=u({},i?"value":"get",(function(){return void 0===this.args&&(this.args=arguments),i&&(this.args[""+r+0]=arguments),h([r],this.args,0)})),t}),o(null)))}}));
//# sourceMappingURL=index.js.map
