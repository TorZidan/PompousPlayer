
/*! modernizr 3.5.0 (Custom Build) - MIT License - https://modernizr.com/download/?-csstransforms-touchevents-setclasses-testprop !*/
!function(e,n,t){function r(e,n){return typeof e===n}function o(){var e,n,t,o,s,i,a;for(var l in S)if(S.hasOwnProperty(l)){if(e=[],n=S[l],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(o=r(n.fn,"function")?n.fn():n.fn,s=0;s<e.length;s++)i=e[s],a=i.split("."),1===a.length?Modernizr[a[0]]=o:(!Modernizr[a[0]]||Modernizr[a[0]]instanceof Boolean||(Modernizr[a[0]]=new Boolean(Modernizr[a[0]])),Modernizr[a[0]][a[1]]=o),C.push((o?"":"no-")+a.join("-"))}}function s(e){var n=_.className,t=Modernizr._config.classPrefix||"";if(x&&(n=n.baseVal),Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(r,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),x?_.className.baseVal=n:_.className=n)}function i(e,n){return!!~(""+e).indexOf(n)}function a(e){return e.replace(/([a-z])-([a-z])/g,function(e,n,t){return n+t.toUpperCase()}).replace(/^-/,"")}function l(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):x?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function u(e){return e.replace(/([A-Z])/g,function(e,n){return"-"+n.toLowerCase()}).replace(/^ms-/,"-ms-")}function f(n,t,r){var o;if("getComputedStyle"in e){o=getComputedStyle.call(e,n,t);var s=e.console;if(null!==o)r&&(o=o.getPropertyValue(r));else if(s){var i=s.error?"error":"log";s[i].call(s,"getComputedStyle returning null, its possible modernizr test results are inaccurate")}}else o=!t&&n.currentStyle&&n.currentStyle[r];return o}function c(){var e=n.body;return e||(e=l(x?"svg":"body"),e.fake=!0),e}function d(e,t,r,o){var s,i,a,u,f="modernizr",d=l("div"),p=c();if(parseInt(r,10))for(;r--;)a=l("div"),a.id=o?o[r]:f+(r+1),d.appendChild(a);return s=l("style"),s.type="text/css",s.id="s"+f,(p.fake?p:d).appendChild(s),p.appendChild(d),s.styleSheet?s.styleSheet.cssText=e:s.appendChild(n.createTextNode(e)),d.id=f,p.fake&&(p.style.background="",p.style.overflow="hidden",u=_.style.overflow,_.style.overflow="hidden",_.appendChild(p)),i=t(d,e),p.fake?(p.parentNode.removeChild(p),_.style.overflow=u,_.offsetHeight):d.parentNode.removeChild(d),!!i}function p(n,r){var o=n.length;if("CSS"in e&&"supports"in e.CSS){for(;o--;)if(e.CSS.supports(u(n[o]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var s=[];o--;)s.push("("+u(n[o])+":"+r+")");return s=s.join(" or "),d("@supports ("+s+") { #modernizr { position: absolute; } }",function(e){return"absolute"==f(e,null,"position")})}return t}function m(e,n,o,s){function u(){c&&(delete z.style,delete z.modElem)}if(s=r(s,"undefined")?!1:s,!r(o,"undefined")){var f=p(e,o);if(!r(f,"undefined"))return f}for(var c,d,m,v,h,y=["modernizr","tspan","samp"];!z.style&&y.length;)c=!0,z.modElem=l(y.shift()),z.style=z.modElem.style;for(m=e.length,d=0;m>d;d++)if(v=e[d],h=z.style[v],i(v,"-")&&(v=a(v)),z.style[v]!==t){if(s||r(o,"undefined"))return u(),"pfx"==n?v:!0;try{z.style[v]=o}catch(g){}if(z.style[v]!=h)return u(),"pfx"==n?v:!0}return u(),!1}function v(e,n){return function(){return e.apply(n,arguments)}}function h(e,n,t){var o;for(var s in e)if(e[s]in n)return t===!1?e[s]:(o=n[e[s]],r(o,"function")?v(o,t||n):o);return!1}function y(e,n,t,o,s){var i=e.charAt(0).toUpperCase()+e.slice(1),a=(e+" "+j.join(i+" ")+i).split(" ");return r(n,"string")||r(n,"undefined")?m(a,n,o,s):(a=(e+" "+N.join(i+" ")+i).split(" "),h(a,n,t))}function g(e,n,r){return y(e,t,t,n,r)}var C=[],S=[],w={_version:"3.5.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){S.push({name:e,fn:n,options:t})},addAsyncTest:function(e){S.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=w,Modernizr=new Modernizr;var _=n.documentElement,x="svg"===_.nodeName.toLowerCase(),b={elem:l("modernizr")};Modernizr._q.push(function(){delete b.elem});var z={style:b.elem.style};Modernizr._q.unshift(function(){delete z.style});var P=w._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];w._prefixes=P;var T=(w.testProp=function(e,n,r){return m([e],t,n,r)},w.testStyles=d);Modernizr.addTest("touchevents",function(){var t;if("ontouchstart"in e||e.DocumentTouch&&n instanceof DocumentTouch)t=!0;else{var r=["@media (",P.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");T(r,function(e){t=9===e.offsetTop})}return t});var E="Moz O ms Webkit",j=w._config.usePrefixes?E.split(" "):[];w._cssomPrefixes=j;var N=w._config.usePrefixes?E.toLowerCase().split(" "):[];w._domPrefixes=N,w.testAllProps=y,w.testAllProps=g,Modernizr.addTest("csstransforms",function(){return-1===navigator.userAgent.indexOf("Android 2.")&&g("transform","scale(1)",!0)}),o(),s(C),delete w.addTest,delete w.addAsyncTest;for(var A=0;A<Modernizr._q.length;A++)Modernizr._q[A]();e.Modernizr=Modernizr}(window,document);

/* ! Zepto v1.2.0-29-g3172e92 - this is just the core zepto module - zeptojs.com/license 
 * A tiny jquery-like library. Used only by the "skins" JS code. Not used by the pompous player. */
!function(t,e){"function"==typeof define&&define.amd?define(function(){return e(t)}):e(t)}(window,function(t){var e=function(){function Z(t){return null==t?String(t):C[O.call(t)]||"object"}function j(t){return"function"==Z(t)}function M(t){return null!=t&&t==t.window}function z(t){return null!=t&&t.nodeType==t.DOCUMENT_NODE}function B(t){return"object"==Z(t)}function k(t){return B(t)&&!M(t)&&Object.getPrototypeOf(t)==Object.prototype}function q(t){var e=!!t&&"length"in t&&t.length,n=i.type(t);return"function"!=n&&!M(t)&&("array"==n||0===e||"number"==typeof e&&e>0&&e-1 in t)}function V(t){return u.call(t,function(t){return null!=t})}function D(t){return t.length>0?i.fn.concat.apply([],t):t}function F(t){return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function R(t){return t in c?c[t]:c[t]=new RegExp("(^|\\s)"+t+"(\\s|$)")}function H(t,e){return"number"!=typeof e||h[F(t)]?e:e+"px"}function I(t){var e,n;return f[t]||(e=a.createElement(t),a.body.appendChild(e),n=getComputedStyle(e,"").getPropertyValue("display"),e.parentNode.removeChild(e),"none"==n&&(n="block"),f[t]=n),f[t]}function J(t){return"children"in t?l.call(t.children):i.map(t.childNodes,function(t){return 1==t.nodeType?t:void 0})}function U(t,e){var n,i=t?t.length:0;for(n=0;i>n;n++)this[n]=t[n];this.length=i,this.selector=e||""}function _(t,i,r){for(n in i)r&&(k(i[n])||P(i[n]))?(k(i[n])&&!k(t[n])&&(t[n]={}),P(i[n])&&!P(t[n])&&(t[n]=[]),_(t[n],i[n],r)):i[n]!==e&&(t[n]=i[n])}function W(t,e){return null==e?i(t):i(t).filter(e)}function X(t,e,n,i){return j(e)?e.call(t,n,i):e}function Y(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)}function G(t,n){var i=t.className||"",r=i&&i.baseVal!==e;return n===e?r?i.baseVal:i:void(r?i.baseVal=n:t.className=n)}function K(t){try{return t?"true"==t||("false"==t?!1:"null"==t?null:+t+""==t?+t:/^[\[\{]/.test(t)?i.parseJSON(t):t):t}catch(e){return t}}function Q(t,e){e(t);for(var n=0,i=t.childNodes.length;i>n;n++)Q(t.childNodes[n],e)}var e,n,i,r,T,A,s=[],o=s.concat,u=s.filter,l=s.slice,a=t.document,f={},c={},h={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},p=/^\s*<(\w+|!)[^>]*>/,d=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,m=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,g=/^(?:body|html)$/i,y=/([A-Z])/g,v=["val","css","html","text","data","width","height","offset"],b=["after","prepend","before","append"],E=a.createElement("table"),N=a.createElement("tr"),w={tr:a.createElement("tbody"),tbody:E,thead:E,tfoot:E,td:N,th:N,"*":a.createElement("div")},x=/^[\w-]*$/,C={},O=C.toString,S={},L=a.createElement("div"),$={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},P=Array.isArray||function(t){return t instanceof Array};return S.matches=function(t,e){if(!e||!t||1!==t.nodeType)return!1;var n=t.matches||t.webkitMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.matchesSelector;if(n)return n.call(t,e);var i,r=t.parentNode,s=!r;return s&&(r=L).appendChild(t),i=~S.qsa(r,e).indexOf(t),s&&L.removeChild(t),i},T=function(t){return t.replace(/-+(.)?/g,function(t,e){return e?e.toUpperCase():""})},A=function(t){return u.call(t,function(e,n){return t.indexOf(e)==n})},S.fragment=function(t,n,r){var s,o,u;return d.test(t)&&(s=i(a.createElement(RegExp.$1))),s||(t.replace&&(t=t.replace(m,"<$1></$2>")),n===e&&(n=p.test(t)&&RegExp.$1),n in w||(n="*"),u=w[n],u.innerHTML=""+t,s=i.each(l.call(u.childNodes),function(){u.removeChild(this)})),k(r)&&(o=i(s),i.each(r,function(t,e){v.indexOf(t)>-1?o[t](e):o.attr(t,e)})),s},S.Z=function(t,e){return new U(t,e)},S.isZ=function(t){return t instanceof S.Z},S.init=function(t,n){var r;if(!t)return S.Z();if("string"==typeof t)if(t=t.trim(),"<"==t[0]&&p.test(t))r=S.fragment(t,RegExp.$1,n),t=null;else{if(n!==e)return i(n).find(t);r=S.qsa(a,t)}else{if(j(t))return i(a).ready(t);if(S.isZ(t))return t;if(P(t))r=V(t);else if(B(t))r=[t],t=null;else if(p.test(t))r=S.fragment(t.trim(),RegExp.$1,n),t=null;else{if(n!==e)return i(n).find(t);r=S.qsa(a,t)}}return S.Z(r,t)},i=function(t,e){return S.init(t,e)},i.extend=function(t){var e,n=l.call(arguments,1);return"boolean"==typeof t&&(e=t,t=n.shift()),n.forEach(function(n){_(t,n,e)}),t},S.qsa=function(t,e){var n,i="#"==e[0],r=!i&&"."==e[0],s=i||r?e.slice(1):e,o=x.test(s);return t.getElementById&&o&&i?(n=t.getElementById(s))?[n]:[]:1!==t.nodeType&&9!==t.nodeType&&11!==t.nodeType?[]:l.call(o&&!i&&t.getElementsByClassName?r?t.getElementsByClassName(s):t.getElementsByTagName(e):t.querySelectorAll(e))},i.contains=a.documentElement.contains?function(t,e){return t!==e&&t.contains(e)}:function(t,e){for(;e&&(e=e.parentNode);)if(e===t)return!0;return!1},i.type=Z,i.isFunction=j,i.isWindow=M,i.isArray=P,i.isPlainObject=k,i.isEmptyObject=function(t){var e;for(e in t)return!1;return!0},i.isNumeric=function(t){var e=Number(t),n=typeof t;return null!=t&&"boolean"!=n&&("string"!=n||t.length)&&!isNaN(e)&&isFinite(e)||!1},i.inArray=function(t,e,n){return s.indexOf.call(e,t,n)},i.camelCase=T,i.trim=function(t){return null==t?"":String.prototype.trim.call(t)},i.uuid=0,i.support={},i.expr={},i.noop=function(){},i.map=function(t,e){var n,r,s,i=[];if(q(t))for(r=0;r<t.length;r++)n=e(t[r],r),null!=n&&i.push(n);else for(s in t)n=e(t[s],s),null!=n&&i.push(n);return D(i)},i.each=function(t,e){var n,i;if(q(t)){for(n=0;n<t.length;n++)if(e.call(t[n],n,t[n])===!1)return t}else for(i in t)if(e.call(t[i],i,t[i])===!1)return t;return t},i.grep=function(t,e){return u.call(t,e)},t.JSON&&(i.parseJSON=JSON.parse),i.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,e){C["[object "+e+"]"]=e.toLowerCase()}),i.fn={constructor:S.Z,length:0,forEach:s.forEach,reduce:s.reduce,push:s.push,sort:s.sort,splice:s.splice,indexOf:s.indexOf,concat:function(){var t,e,n=[];for(t=0;t<arguments.length;t++)e=arguments[t],n[t]=S.isZ(e)?e.toArray():e;return o.apply(S.isZ(this)?this.toArray():this,n)},map:function(t){return i(i.map(this,function(e,n){return t.call(e,n,e)}))},slice:function(){return i(l.apply(this,arguments))},ready:function(e){if("complete"===a.readyState||"loading"!==a.readyState&&!a.documentElement.doScroll)setTimeout(function(){e(i)},0);else{var n=function(){a.removeEventListener("DOMContentLoaded",n,!1),t.removeEventListener("load",n,!1),e(i)};a.addEventListener("DOMContentLoaded",n,!1),t.addEventListener("load",n,!1)}return this},get:function(t){return t===e?l.call(this):this[t>=0?t:t+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){null!=this.parentNode&&this.parentNode.removeChild(this)})},each:function(t){return s.every.call(this,function(e,n){return t.call(e,n,e)!==!1}),this},filter:function(t){return j(t)?this.not(this.not(t)):i(u.call(this,function(e){return S.matches(e,t)}))},add:function(t,e){return i(A(this.concat(i(t,e))))},is:function(t){return"string"==typeof t?this.length>0&&S.matches(this[0],t):t&&this.selector==t.selector},not:function(t){var n=[];if(j(t)&&t.call!==e)this.each(function(e){t.call(this,e)||n.push(this)});else{var r="string"==typeof t?this.filter(t):q(t)&&j(t.item)?l.call(t):i(t);this.forEach(function(t){r.indexOf(t)<0&&n.push(t)})}return i(n)},has:function(t){return this.filter(function(){return B(t)?i.contains(this,t):i(this).find(t).size()})},eq:function(t){return-1===t?this.slice(t):this.slice(t,+t+1)},first:function(){var t=this[0];return t&&!B(t)?t:i(t)},last:function(){var t=this[this.length-1];return t&&!B(t)?t:i(t)},find:function(t){var e,n=this;return e=t?"object"==typeof t?i(t).filter(function(){var t=this;return s.some.call(n,function(e){return i.contains(e,t)})}):1==this.length?i(S.qsa(this[0],t)):this.map(function(){return S.qsa(this,t)}):i()},closest:function(t,e){var n=[],r="object"==typeof t&&i(t);return this.each(function(i,s){for(;s&&!(r?r.indexOf(s)>=0:S.matches(s,t));)s=s!==e&&!z(s)&&s.parentNode;s&&n.indexOf(s)<0&&n.push(s)}),i(n)},parents:function(t){for(var e=[],n=this;n.length>0;)n=i.map(n,function(t){return(t=t.parentNode)&&!z(t)&&e.indexOf(t)<0?(e.push(t),t):void 0});return W(e,t)},parent:function(t){return W(A(this.pluck("parentNode")),t)},children:function(t){return W(this.map(function(){return J(this)}),t)},contents:function(){return this.map(function(){return this.contentDocument||l.call(this.childNodes)})},siblings:function(t){return W(this.map(function(t,e){return u.call(J(e.parentNode),function(t){return t!==e})}),t)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(t){return i.map(this,function(e){return e[t]})},show:function(){return this.each(function(){"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=I(this.nodeName))})},replaceWith:function(t){return this.before(t).remove()},wrap:function(t){var e=j(t);if(this[0]&&!e)var n=i(t).get(0),r=n.parentNode||this.length>1;return this.each(function(s){i(this).wrapAll(e?t.call(this,s):r?n.cloneNode(!0):n)})},wrapAll:function(t){if(this[0]){i(this[0]).before(t=i(t));for(var e;(e=t.children()).length;)t=e.first();i(t).append(this)}return this},wrapInner:function(t){var e=j(t);return this.each(function(n){var r=i(this),s=r.contents(),o=e?t.call(this,n):t;s.length?s.wrapAll(o):r.append(o)})},unwrap:function(){return this.parent().each(function(){i(this).replaceWith(i(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(t){return this.each(function(){var n=i(this);(t===e?"none"==n.css("display"):t)?n.show():n.hide()})},prev:function(t){return i(this.pluck("previousElementSibling")).filter(t||"*")},next:function(t){return i(this.pluck("nextElementSibling")).filter(t||"*")},html:function(t){return 0 in arguments?this.each(function(e){var n=this.innerHTML;i(this).empty().append(X(this,t,e,n))}):0 in this?this[0].innerHTML:null},text:function(t){return 0 in arguments?this.each(function(e){var n=X(this,t,e,this.textContent);this.textContent=null==n?"":""+n}):0 in this?this.pluck("textContent").join(""):null},attr:function(t,i){var r;return"string"!=typeof t||1 in arguments?this.each(function(e){if(1===this.nodeType)if(B(t))for(n in t)Y(this,n,t[n]);else Y(this,t,X(this,i,e,this.getAttribute(t)))}):0 in this&&1==this[0].nodeType&&null!=(r=this[0].getAttribute(t))?r:e},removeAttr:function(t){return this.each(function(){1===this.nodeType&&t.split(" ").forEach(function(t){Y(this,t)},this)})},prop:function(t,e){return t=$[t]||t,"string"!=typeof t||1 in arguments?this.each(function(i){if(B(t))for(n in t)this[$[n]||n]=t[n];else this[t]=X(this,e,i,this[t])}):this[0]&&this[0][t]},removeProp:function(t){return t=$[t]||t,this.each(function(){delete this[t]})},data:function(t,n){var i="data-"+t.replace(y,"-$1").toLowerCase(),r=1 in arguments?this.attr(i,n):this.attr(i);return null!==r?K(r):e},val:function(t){return 0 in arguments?(null==t&&(t=""),this.each(function(e){this.value=X(this,t,e,this.value)})):this[0]&&(this[0].multiple?i(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value)},offset:function(e){if(e)return this.each(function(t){var n=i(this),r=X(this,e,t,n.offset()),s=n.offsetParent().offset(),o={top:r.top-s.top,left:r.left-s.left};"static"==n.css("position")&&(o.position="relative"),n.css(o)});if(!this.length)return null;if(a.documentElement!==this[0]&&!i.contains(a.documentElement,this[0]))return{top:0,left:0};var n=this[0].getBoundingClientRect();return{left:n.left+t.pageXOffset,top:n.top+t.pageYOffset,width:Math.round(n.width),height:Math.round(n.height)}},css:function(t,e){if(arguments.length<2){var r=this[0];if("string"==typeof t){if(!r)return;return r.style[T(t)]||getComputedStyle(r,"").getPropertyValue(t)}if(P(t)){if(!r)return;var s={},o=getComputedStyle(r,"");return i.each(t,function(t,e){s[e]=r.style[T(e)]||o.getPropertyValue(e)}),s}}var u="";if("string"==Z(t))e||0===e?u=F(t)+":"+H(t,e):this.each(function(){this.style.removeProperty(F(t))});else for(n in t)t[n]||0===t[n]?u+=F(n)+":"+H(n,t[n])+";":this.each(function(){this.style.removeProperty(F(n))});return this.each(function(){this.style.cssText+=";"+u})},index:function(t){return t?this.indexOf(i(t)[0]):this.parent().children().indexOf(this[0])},hasClass:function(t){return t?s.some.call(this,function(t){return this.test(G(t))},R(t)):!1},addClass:function(t){return t?this.each(function(e){if("className"in this){r=[];var n=G(this),s=X(this,t,e,n);s.split(/\s+/g).forEach(function(t){i(this).hasClass(t)||r.push(t)},this),r.length&&G(this,n+(n?" ":"")+r.join(" "))}}):this},removeClass:function(t){return this.each(function(n){if("className"in this){if(t===e)return G(this,"");r=G(this),X(this,t,n,r).split(/\s+/g).forEach(function(t){r=r.replace(R(t)," ")}),G(this,r.trim())}})},toggleClass:function(t,n){return t?this.each(function(r){var s=i(this),o=X(this,t,r,G(this));o.split(/\s+/g).forEach(function(t){(n===e?!s.hasClass(t):n)?s.addClass(t):s.removeClass(t)})}):this},scrollTop:function(t){if(this.length){var n="scrollTop"in this[0];return t===e?n?this[0].scrollTop:this[0].pageYOffset:this.each(n?function(){this.scrollTop=t}:function(){this.scrollTo(this.scrollX,t)})}},scrollLeft:function(t){if(this.length){var n="scrollLeft"in this[0];return t===e?n?this[0].scrollLeft:this[0].pageXOffset:this.each(n?function(){this.scrollLeft=t}:function(){this.scrollTo(t,this.scrollY)})}},position:function(){if(this.length){var t=this[0],e=this.offsetParent(),n=this.offset(),r=g.test(e[0].nodeName)?{top:0,left:0}:e.offset();return n.top-=parseFloat(i(t).css("margin-top"))||0,n.left-=parseFloat(i(t).css("margin-left"))||0,r.top+=parseFloat(i(e[0]).css("border-top-width"))||0,r.left+=parseFloat(i(e[0]).css("border-left-width"))||0,{top:n.top-r.top,left:n.left-r.left}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent||a.body;t&&!g.test(t.nodeName)&&"static"==i(t).css("position");)t=t.offsetParent;return t})}},i.fn.detach=i.fn.remove,["width","height"].forEach(function(t){var n=t.replace(/./,function(t){return t[0].toUpperCase()});i.fn[t]=function(r){var s,o=this[0];return r===e?M(o)?o["inner"+n]:z(o)?o.documentElement["scroll"+n]:(s=this.offset())&&s[t]:this.each(function(e){o=i(this),o.css(t,X(this,r,e,o[t]()))})}}),b.forEach(function(n,r){var s=r%2;i.fn[n]=function(){var n,u,o=i.map(arguments,function(t){var r=[];return n=Z(t),"array"==n?(t.forEach(function(t){return t.nodeType!==e?r.push(t):i.zepto.isZ(t)?r=r.concat(t.get()):void(r=r.concat(S.fragment(t)))}),r):"object"==n||null==t?t:S.fragment(t)}),l=this.length>1;return o.length<1?this:this.each(function(e,n){u=s?n:n.parentNode,n=0==r?n.nextSibling:1==r?n.firstChild:2==r?n:null;var f=i.contains(a.documentElement,u);o.forEach(function(e){if(l)e=e.cloneNode(!0);else if(!u)return i(e).remove();u.insertBefore(e,n),f&&Q(e,function(e){if(!(null==e.nodeName||"SCRIPT"!==e.nodeName.toUpperCase()||e.type&&"text/javascript"!==e.type||e.src)){var n=e.ownerDocument?e.ownerDocument.defaultView:t;n.eval.call(n,e.innerHTML)}})})})},i.fn[s?n+"To":"insert"+(r?"Before":"After")]=function(t){return i(t)[n](this),this}}),S.Z.prototype=U.prototype=i.fn,S.uniq=A,S.deserializeValue=K,i.zepto=S,i}();return t.Zepto=e,void 0===t.$&&(t.$=e),e});

/* ! imagesLoaded PACKAGED v4.1.4 - MIT License - https://github.com/desandro/imagesloaded */
!function(e,t){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",t):"object"==typeof module&&module.exports?module.exports=t():e.EvEmitter=t()}("undefined"!=typeof window?window:this,function(){function e(){}var t=e.prototype;return t.on=function(e,t){if(e&&t){var i=this._events=this._events||{},n=i[e]=i[e]||[];return n.indexOf(t)==-1&&n.push(t),this}},t.once=function(e,t){if(e&&t){this.on(e,t);var i=this._onceEvents=this._onceEvents||{},n=i[e]=i[e]||{};return n[t]=!0,this}},t.off=function(e,t){var i=this._events&&this._events[e];if(i&&i.length){var n=i.indexOf(t);return n!=-1&&i.splice(n,1),this}},t.emitEvent=function(e,t){var i=this._events&&this._events[e];if(i&&i.length){i=i.slice(0),t=t||[];for(var n=this._onceEvents&&this._onceEvents[e],o=0;o<i.length;o++){var r=i[o],s=n&&n[r];s&&(this.off(e,r),delete n[r]),r.apply(this,t)}return this}},t.allOff=function(){delete this._events,delete this._onceEvents},e}),function(e,t){"use strict";"function"==typeof define&&define.amd?define(["ev-emitter/ev-emitter"],function(i){return t(e,i)}):"object"==typeof module&&module.exports?module.exports=t(e,require("ev-emitter")):e.imagesLoaded=t(e,e.EvEmitter)}("undefined"!=typeof window?window:this,function(e,t){function i(e,t){for(var i in t)e[i]=t[i];return e}function n(e){if(Array.isArray(e))return e;var t="object"==typeof e&&"number"==typeof e.length;return t?d.call(e):[e]}function o(e,t,r){if(!(this instanceof o))return new o(e,t,r);var s=e;return"string"==typeof e&&(s=document.querySelectorAll(e)),s?(this.elements=n(s),this.options=i({},this.options),"function"==typeof t?r=t:i(this.options,t),r&&this.on("always",r),this.getImages(),h&&(this.jqDeferred=new h.Deferred),void setTimeout(this.check.bind(this))):void a.error("Bad element for imagesLoaded "+(s||e))}function r(e){this.img=e}function s(e,t){this.url=e,this.element=t,this.img=new Image}var h=e.jQuery,a=e.console,d=Array.prototype.slice;o.prototype=Object.create(t.prototype),o.prototype.options={},o.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)},o.prototype.addElementImages=function(e){"IMG"==e.nodeName&&this.addImage(e),this.options.background===!0&&this.addElementBackgroundImages(e);var t=e.nodeType;if(t&&u[t]){for(var i=e.querySelectorAll("img"),n=0;n<i.length;n++){var o=i[n];this.addImage(o)}if("string"==typeof this.options.background){var r=e.querySelectorAll(this.options.background);for(n=0;n<r.length;n++){var s=r[n];this.addElementBackgroundImages(s)}}}};var u={1:!0,9:!0,11:!0};return o.prototype.addElementBackgroundImages=function(e){var t=getComputedStyle(e);if(t)for(var i=/url\((['"])?(.*?)\1\)/gi,n=i.exec(t.backgroundImage);null!==n;){var o=n&&n[2];o&&this.addBackground(o,e),n=i.exec(t.backgroundImage)}},o.prototype.addImage=function(e){var t=new r(e);this.images.push(t)},o.prototype.addBackground=function(e,t){var i=new s(e,t);this.images.push(i)},o.prototype.check=function(){function e(e,i,n){setTimeout(function(){t.progress(e,i,n)})}var t=this;return this.progressedCount=0,this.hasAnyBroken=!1,this.images.length?void this.images.forEach(function(t){t.once("progress",e),t.check()}):void this.complete()},o.prototype.progress=function(e,t,i){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded,this.emitEvent("progress",[this,e,t]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,e),this.progressedCount==this.images.length&&this.complete(),this.options.debug&&a&&a.log("progress: "+i,e,t)},o.prototype.complete=function(){var e=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(e,[this]),this.emitEvent("always",[this]),this.jqDeferred){var t=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[t](this)}},r.prototype=Object.create(t.prototype),r.prototype.check=function(){var e=this.getIsImageComplete();return e?void this.confirm(0!==this.img.naturalWidth,"naturalWidth"):(this.proxyImage=new Image,this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),void(this.proxyImage.src=this.img.src))},r.prototype.getIsImageComplete=function(){return this.img.complete&&this.img.naturalWidth},r.prototype.confirm=function(e,t){this.isLoaded=e,this.emitEvent("progress",[this,this.img,t])},r.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},r.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},r.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},r.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype=Object.create(r.prototype),s.prototype.check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url;var e=this.getIsImageComplete();e&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},s.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype.confirm=function(e,t){this.isLoaded=e,this.emitEvent("progress",[this,this.element,t])},o.makeJQueryPlugin=function(t){t=t||e.jQuery,t&&(h=t,h.fn.imagesLoaded=function(e,t){var i=new o(this,e,t);return i.jqDeferred.promise(h(this))})},o.makeJQueryPlugin(),o});

/* Web Font Loader v1.6.28 - Apache License - https://github.com/typekit/webfontloader - (c) Adobe Systems, Google. License: Apache 2.0 */
(function(){function aa(a,b,c){return a.call.apply(a.bind,arguments)}function ba(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}}function p(a,b,c){p=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?aa:ba;return p.apply(null,arguments)}var q=Date.now||function(){return+new Date};function ca(a,b){this.a=a;this.o=b||a;this.c=this.o.document}var da=!!window.FontFace;function t(a,b,c,d){b=a.c.createElement(b);if(c)for(var e in c)c.hasOwnProperty(e)&&("style"==e?b.style.cssText=c[e]:b.setAttribute(e,c[e]));d&&b.appendChild(a.c.createTextNode(d));return b}function u(a,b,c){a=a.c.getElementsByTagName(b)[0];a||(a=document.documentElement);a.insertBefore(c,a.lastChild)}function v(a){a.parentNode&&a.parentNode.removeChild(a)}
function w(a,b,c){b=b||[];c=c||[];for(var d=a.className.split(/\s+/),e=0;e<b.length;e+=1){for(var f=!1,g=0;g<d.length;g+=1)if(b[e]===d[g]){f=!0;break}f||d.push(b[e])}b=[];for(e=0;e<d.length;e+=1){f=!1;for(g=0;g<c.length;g+=1)if(d[e]===c[g]){f=!0;break}f||b.push(d[e])}a.className=b.join(" ").replace(/\s+/g," ").replace(/^\s+|\s+$/,"")}function y(a,b){for(var c=a.className.split(/\s+/),d=0,e=c.length;d<e;d++)if(c[d]==b)return!0;return!1}
function ea(a){return a.o.location.hostname||a.a.location.hostname}function z(a,b,c){function d(){m&&e&&f&&(m(g),m=null)}b=t(a,"link",{rel:"stylesheet",href:b,media:"all"});var e=!1,f=!0,g=null,m=c||null;da?(b.onload=function(){e=!0;d()},b.onerror=function(){e=!0;g=Error("Stylesheet failed to load");d()}):setTimeout(function(){e=!0;d()},0);u(a,"head",b)}
function A(a,b,c,d){var e=a.c.getElementsByTagName("head")[0];if(e){var f=t(a,"script",{src:b}),g=!1;f.onload=f.onreadystatechange=function(){g||this.readyState&&"loaded"!=this.readyState&&"complete"!=this.readyState||(g=!0,c&&c(null),f.onload=f.onreadystatechange=null,"HEAD"==f.parentNode.tagName&&e.removeChild(f))};e.appendChild(f);setTimeout(function(){g||(g=!0,c&&c(Error("Script load timeout")))},d||5E3);return f}return null};function B(){this.a=0;this.c=null}function C(a){a.a++;return function(){a.a--;D(a)}}function E(a,b){a.c=b;D(a)}function D(a){0==a.a&&a.c&&(a.c(),a.c=null)};function F(a){this.a=a||"-"}F.prototype.c=function(a){for(var b=[],c=0;c<arguments.length;c++)b.push(arguments[c].replace(/[\W_]+/g,"").toLowerCase());return b.join(this.a)};function G(a,b){this.c=a;this.f=4;this.a="n";var c=(b||"n4").match(/^([nio])([1-9])$/i);c&&(this.a=c[1],this.f=parseInt(c[2],10))}function fa(a){return H(a)+" "+(a.f+"00")+" 300px "+I(a.c)}function I(a){var b=[];a=a.split(/,\s*/);for(var c=0;c<a.length;c++){var d=a[c].replace(/['"]/g,"");-1!=d.indexOf(" ")||/^\d/.test(d)?b.push("'"+d+"'"):b.push(d)}return b.join(",")}function J(a){return a.a+a.f}function H(a){var b="normal";"o"===a.a?b="oblique":"i"===a.a&&(b="italic");return b}
function ga(a){var b=4,c="n",d=null;a&&((d=a.match(/(normal|oblique|italic)/i))&&d[1]&&(c=d[1].substr(0,1).toLowerCase()),(d=a.match(/([1-9]00|normal|bold)/i))&&d[1]&&(/bold/i.test(d[1])?b=7:/[1-9]00/.test(d[1])&&(b=parseInt(d[1].substr(0,1),10))));return c+b};function ha(a,b){this.c=a;this.f=a.o.document.documentElement;this.h=b;this.a=new F("-");this.j=!1!==b.events;this.g=!1!==b.classes}function ia(a){a.g&&w(a.f,[a.a.c("wf","loading")]);K(a,"loading")}function L(a){if(a.g){var b=y(a.f,a.a.c("wf","active")),c=[],d=[a.a.c("wf","loading")];b||c.push(a.a.c("wf","inactive"));w(a.f,c,d)}K(a,"inactive")}function K(a,b,c){if(a.j&&a.h[b])if(c)a.h[b](c.c,J(c));else a.h[b]()};function ja(){this.c={}}function ka(a,b,c){var d=[],e;for(e in b)if(b.hasOwnProperty(e)){var f=a.c[e];f&&d.push(f(b[e],c))}return d};function M(a,b){this.c=a;this.f=b;this.a=t(this.c,"span",{"aria-hidden":"true"},this.f)}function N(a){u(a.c,"body",a.a)}function O(a){return"display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:"+I(a.c)+";"+("font-style:"+H(a)+";font-weight:"+(a.f+"00")+";")};function P(a,b,c,d,e,f){this.g=a;this.j=b;this.a=d;this.c=c;this.f=e||3E3;this.h=f||void 0}P.prototype.start=function(){var a=this.c.o.document,b=this,c=q(),d=new Promise(function(d,e){function f(){q()-c>=b.f?e():a.fonts.load(fa(b.a),b.h).then(function(a){1<=a.length?d():setTimeout(f,25)},function(){e()})}f()}),e=null,f=new Promise(function(a,d){e=setTimeout(d,b.f)});Promise.race([f,d]).then(function(){e&&(clearTimeout(e),e=null);b.g(b.a)},function(){b.j(b.a)})};function Q(a,b,c,d,e,f,g){this.v=a;this.B=b;this.c=c;this.a=d;this.s=g||"BESbswy";this.f={};this.w=e||3E3;this.u=f||null;this.m=this.j=this.h=this.g=null;this.g=new M(this.c,this.s);this.h=new M(this.c,this.s);this.j=new M(this.c,this.s);this.m=new M(this.c,this.s);a=new G(this.a.c+",serif",J(this.a));a=O(a);this.g.a.style.cssText=a;a=new G(this.a.c+",sans-serif",J(this.a));a=O(a);this.h.a.style.cssText=a;a=new G("serif",J(this.a));a=O(a);this.j.a.style.cssText=a;a=new G("sans-serif",J(this.a));a=
O(a);this.m.a.style.cssText=a;N(this.g);N(this.h);N(this.j);N(this.m)}var R={D:"serif",C:"sans-serif"},S=null;function T(){if(null===S){var a=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);S=!!a&&(536>parseInt(a[1],10)||536===parseInt(a[1],10)&&11>=parseInt(a[2],10))}return S}Q.prototype.start=function(){this.f.serif=this.j.a.offsetWidth;this.f["sans-serif"]=this.m.a.offsetWidth;this.A=q();U(this)};
function la(a,b,c){for(var d in R)if(R.hasOwnProperty(d)&&b===a.f[R[d]]&&c===a.f[R[d]])return!0;return!1}function U(a){var b=a.g.a.offsetWidth,c=a.h.a.offsetWidth,d;(d=b===a.f.serif&&c===a.f["sans-serif"])||(d=T()&&la(a,b,c));d?q()-a.A>=a.w?T()&&la(a,b,c)&&(null===a.u||a.u.hasOwnProperty(a.a.c))?V(a,a.v):V(a,a.B):ma(a):V(a,a.v)}function ma(a){setTimeout(p(function(){U(this)},a),50)}function V(a,b){setTimeout(p(function(){v(this.g.a);v(this.h.a);v(this.j.a);v(this.m.a);b(this.a)},a),0)};function W(a,b,c){this.c=a;this.a=b;this.f=0;this.m=this.j=!1;this.s=c}var X=null;W.prototype.g=function(a){var b=this.a;b.g&&w(b.f,[b.a.c("wf",a.c,J(a).toString(),"active")],[b.a.c("wf",a.c,J(a).toString(),"loading"),b.a.c("wf",a.c,J(a).toString(),"inactive")]);K(b,"fontactive",a);this.m=!0;na(this)};
W.prototype.h=function(a){var b=this.a;if(b.g){var c=y(b.f,b.a.c("wf",a.c,J(a).toString(),"active")),d=[],e=[b.a.c("wf",a.c,J(a).toString(),"loading")];c||d.push(b.a.c("wf",a.c,J(a).toString(),"inactive"));w(b.f,d,e)}K(b,"fontinactive",a);na(this)};function na(a){0==--a.f&&a.j&&(a.m?(a=a.a,a.g&&w(a.f,[a.a.c("wf","active")],[a.a.c("wf","loading"),a.a.c("wf","inactive")]),K(a,"active")):L(a.a))};function oa(a){this.j=a;this.a=new ja;this.h=0;this.f=this.g=!0}oa.prototype.load=function(a){this.c=new ca(this.j,a.context||this.j);this.g=!1!==a.events;this.f=!1!==a.classes;pa(this,new ha(this.c,a),a)};
function qa(a,b,c,d,e){var f=0==--a.h;(a.f||a.g)&&setTimeout(function(){var a=e||null,m=d||null||{};if(0===c.length&&f)L(b.a);else{b.f+=c.length;f&&(b.j=f);var h,l=[];for(h=0;h<c.length;h++){var k=c[h],n=m[k.c],r=b.a,x=k;r.g&&w(r.f,[r.a.c("wf",x.c,J(x).toString(),"loading")]);K(r,"fontloading",x);r=null;if(null===X)if(window.FontFace){var x=/Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent),xa=/OS X.*Version\/10\..*Safari/.exec(window.navigator.userAgent)&&/Apple/.exec(window.navigator.vendor);
X=x?42<parseInt(x[1],10):xa?!1:!0}else X=!1;X?r=new P(p(b.g,b),p(b.h,b),b.c,k,b.s,n):r=new Q(p(b.g,b),p(b.h,b),b.c,k,b.s,a,n);l.push(r)}for(h=0;h<l.length;h++)l[h].start()}},0)}function pa(a,b,c){var d=[],e=c.timeout;ia(b);var d=ka(a.a,c,a.c),f=new W(a.c,b,e);a.h=d.length;b=0;for(c=d.length;b<c;b++)d[b].load(function(b,d,c){qa(a,f,b,d,c)})};function ra(a,b){this.c=a;this.a=b}
ra.prototype.load=function(a){function b(){if(f["__mti_fntLst"+d]){var c=f["__mti_fntLst"+d](),e=[],h;if(c)for(var l=0;l<c.length;l++){var k=c[l].fontfamily;void 0!=c[l].fontStyle&&void 0!=c[l].fontWeight?(h=c[l].fontStyle+c[l].fontWeight,e.push(new G(k,h))):e.push(new G(k))}a(e)}else setTimeout(function(){b()},50)}var c=this,d=c.a.projectId,e=c.a.version;if(d){var f=c.c.o;A(this.c,(c.a.api||"https://fast.fonts.net/jsapi")+"/"+d+".js"+(e?"?v="+e:""),function(e){e?a([]):(f["__MonotypeConfiguration__"+
d]=function(){return c.a},b())}).id="__MonotypeAPIScript__"+d}else a([])};function sa(a,b){this.c=a;this.a=b}sa.prototype.load=function(a){var b,c,d=this.a.urls||[],e=this.a.families||[],f=this.a.testStrings||{},g=new B;b=0;for(c=d.length;b<c;b++)z(this.c,d[b],C(g));var m=[];b=0;for(c=e.length;b<c;b++)if(d=e[b].split(":"),d[1])for(var h=d[1].split(","),l=0;l<h.length;l+=1)m.push(new G(d[0],h[l]));else m.push(new G(d[0]));E(g,function(){a(m,f)})};function ta(a,b){a?this.c=a:this.c=ua;this.a=[];this.f=[];this.g=b||""}var ua="https://fonts.googleapis.com/css";function va(a,b){for(var c=b.length,d=0;d<c;d++){var e=b[d].split(":");3==e.length&&a.f.push(e.pop());var f="";2==e.length&&""!=e[1]&&(f=":");a.a.push(e.join(f))}}
function wa(a){if(0==a.a.length)throw Error("No fonts to load!");if(-1!=a.c.indexOf("kit="))return a.c;for(var b=a.a.length,c=[],d=0;d<b;d++)c.push(a.a[d].replace(/ /g,"+"));b=a.c+"?family="+c.join("%7C");0<a.f.length&&(b+="&subset="+a.f.join(","));0<a.g.length&&(b+="&text="+encodeURIComponent(a.g));return b};function ya(a){this.f=a;this.a=[];this.c={}}
var za={latin:"BESbswy","latin-ext":"\u00e7\u00f6\u00fc\u011f\u015f",cyrillic:"\u0439\u044f\u0416",greek:"\u03b1\u03b2\u03a3",khmer:"\u1780\u1781\u1782",Hanuman:"\u1780\u1781\u1782"},Aa={thin:"1",extralight:"2","extra-light":"2",ultralight:"2","ultra-light":"2",light:"3",regular:"4",book:"4",medium:"5","semi-bold":"6",semibold:"6","demi-bold":"6",demibold:"6",bold:"7","extra-bold":"8",extrabold:"8","ultra-bold":"8",ultrabold:"8",black:"9",heavy:"9",l:"3",r:"4",b:"7"},Ba={i:"i",italic:"i",n:"n",normal:"n"},
Ca=/^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;
function Da(a){for(var b=a.f.length,c=0;c<b;c++){var d=a.f[c].split(":"),e=d[0].replace(/\+/g," "),f=["n4"];if(2<=d.length){var g;var m=d[1];g=[];if(m)for(var m=m.split(","),h=m.length,l=0;l<h;l++){var k;k=m[l];if(k.match(/^[\w-]+$/)){var n=Ca.exec(k.toLowerCase());if(null==n)k="";else{k=n[2];k=null==k||""==k?"n":Ba[k];n=n[1];if(null==n||""==n)n="4";else var r=Aa[n],n=r?r:isNaN(n)?"4":n.substr(0,1);k=[k,n].join("")}}else k="";k&&g.push(k)}0<g.length&&(f=g);3==d.length&&(d=d[2],g=[],d=d?d.split(","):
g,0<d.length&&(d=za[d[0]])&&(a.c[e]=d))}a.c[e]||(d=za[e])&&(a.c[e]=d);for(d=0;d<f.length;d+=1)a.a.push(new G(e,f[d]))}};function Ea(a,b){this.c=a;this.a=b}var Fa={Arimo:!0,Cousine:!0,Tinos:!0};Ea.prototype.load=function(a){var b=new B,c=this.c,d=new ta(this.a.api,this.a.text),e=this.a.families;va(d,e);var f=new ya(e);Da(f);z(c,wa(d),C(b));E(b,function(){a(f.a,f.c,Fa)})};function Ga(a,b){this.c=a;this.a=b}Ga.prototype.load=function(a){var b=this.a.id,c=this.c.o;b?A(this.c,(this.a.api||"https://use.typekit.net")+"/"+b+".js",function(b){if(b)a([]);else if(c.Typekit&&c.Typekit.config&&c.Typekit.config.fn){b=c.Typekit.config.fn;for(var e=[],f=0;f<b.length;f+=2)for(var g=b[f],m=b[f+1],h=0;h<m.length;h++)e.push(new G(g,m[h]));try{c.Typekit.load({events:!1,classes:!1,async:!0})}catch(l){}a(e)}},2E3):a([])};function Ha(a,b){this.c=a;this.f=b;this.a=[]}Ha.prototype.load=function(a){var b=this.f.id,c=this.c.o,d=this;b?(c.__webfontfontdeckmodule__||(c.__webfontfontdeckmodule__={}),c.__webfontfontdeckmodule__[b]=function(b,c){for(var g=0,m=c.fonts.length;g<m;++g){var h=c.fonts[g];d.a.push(new G(h.name,ga("font-weight:"+h.weight+";font-style:"+h.style)))}a(d.a)},A(this.c,(this.f.api||"https://f.fontdeck.com/s/css/js/")+ea(this.c)+"/"+b+".js",function(b){b&&a([])})):a([])};var Y=new oa(window);Y.a.c.custom=function(a,b){return new sa(b,a)};Y.a.c.fontdeck=function(a,b){return new Ha(b,a)};Y.a.c.monotype=function(a,b){return new ra(b,a)};Y.a.c.typekit=function(a,b){return new Ga(b,a)};Y.a.c.google=function(a,b){return new Ea(b,a)};var Z={load:p(Y.load,Y)};"function"===typeof define&&define.amd?define(function(){return Z}):"undefined"!==typeof module&&module.exports?module.exports=Z:(window.WebFont=Z,window.WebFontConfig&&Y.load(window.WebFontConfig));}());

/* https://github.com/ellisonleao/sharer.js version 0.4.0 - GNU GENERAL PUBLIC LICENSE */
(function(g,r){"use strict";var s=function(t){this.elem=t};s.init=function(){var t=r.querySelectorAll("[data-sharer]"),e,a=t.length;for(e=0;e<a;e++){t[e].addEventListener("click",s.add)}};s.add=function(t){var e=t.currentTarget||t.srcElement;var a=new s(e);a.share()};s.prototype={constructor:s,getValue:function(t){var e=this.elem.getAttribute("data-"+t);if(e&&t==="hashtag"){if(!e.startsWith("#")){e="#"+e}}return e},share:function(){var t=this.getValue("sharer").toLowerCase(),e={facebook:{shareUrl:"https://www.facebook.com/sharer/sharer.php",params:{u:this.getValue("url"),hashtag:this.getValue("hashtag")}},linkedin:{shareUrl:"https://www.linkedin.com/shareArticle",params:{url:this.getValue("url"),mini:true}},twitter:{shareUrl:"https://twitter.com/intent/tweet/",params:{text:this.getValue("title"),url:this.getValue("url"),hashtags:this.getValue("hashtags"),via:this.getValue("via")}},email:{shareUrl:"mailto:"+this.getValue("to")||"",params:{subject:this.getValue("subject"),body:this.getValue("title")+"\n"+this.getValue("url")},isLink:true},whatsapp:{shareUrl:this.getValue("web")!==null?"https://api.whatsapp.com/send":"whatsapp://send",params:{text:this.getValue("title")+" "+this.getValue("url")},isLink:true},telegram:{shareUrl:this.getValue("web")!==null?"https://telegram.me/share":"tg://msg_url",params:{text:this.getValue("title"),url:this.getValue("url"),to:this.getValue("to")},isLink:true},viber:{shareUrl:"viber://forward",params:{text:this.getValue("title")+" "+this.getValue("url")},isLink:true},line:{shareUrl:"http://line.me/R/msg/text/?"+encodeURIComponent(this.getValue("title")+" "+this.getValue("url")),isLink:true},pinterest:{shareUrl:"https://www.pinterest.com/pin/create/button/",params:{url:this.getValue("url"),media:this.getValue("image"),description:this.getValue("description")}},tumblr:{shareUrl:"http://tumblr.com/widgets/share/tool",params:{canonicalUrl:this.getValue("url"),content:this.getValue("url"),posttype:"link",title:this.getValue("title"),caption:this.getValue("caption"),tags:this.getValue("tags")}},hackernews:{shareUrl:"https://news.ycombinator.com/submitlink",params:{u:this.getValue("url"),t:this.getValue("title")}},reddit:{shareUrl:"https://www.reddit.com/submit",params:{url:this.getValue("url")}},vk:{shareUrl:"http://vk.com/share.php",params:{url:this.getValue("url"),title:this.getValue("title"),description:this.getValue("caption"),image:this.getValue("image")}},xing:{shareUrl:"https://www.xing.com/app/user",params:{op:"share",url:this.getValue("url"),title:this.getValue("title")}},buffer:{shareUrl:"https://buffer.com/add",params:{url:this.getValue("url"),title:this.getValue("title"),via:this.getValue("via"),picture:this.getValue("picture")}},instapaper:{shareUrl:"http://www.instapaper.com/edit",params:{url:this.getValue("url"),title:this.getValue("title"),description:this.getValue("description")}},pocket:{shareUrl:"https://getpocket.com/save",params:{url:this.getValue("url")}},digg:{shareUrl:"http://www.digg.com/submit",params:{url:this.getValue("url")}},stumbleupon:{shareUrl:"http://www.stumbleupon.com/submit",params:{url:this.getValue("url"),title:this.getValue("title")}},mashable:{shareUrl:"https://mashable.com/submit",params:{url:this.getValue("url"),title:this.getValue("title")}},mix:{shareUrl:"https://mix.com/add",params:{url:this.getValue("url")}},flipboard:{shareUrl:"https://share.flipboard.com/bookmarklet/popout",params:{v:2,title:this.getValue("title"),url:this.getValue("url"),t:Date.now()}},weibo:{shareUrl:"http://service.weibo.com/share/share.php",params:{url:this.getValue("url"),title:this.getValue("title"),pic:this.getValue("image"),appkey:this.getValue("appkey"),ralateUid:this.getValue("ralateuid"),language:"zh_cn"}},renren:{shareUrl:"http://share.renren.com/share/buttonshare",params:{link:this.getValue("url")}},myspace:{shareUrl:"https://myspace.com/post",params:{u:this.getValue("url"),t:this.getValue("title"),c:this.getValue("description")}},blogger:{shareUrl:"https://www.blogger.com/blog-this.g",params:{u:this.getValue("url"),n:this.getValue("title"),t:this.getValue("description")}},baidu:{shareUrl:"http://cang.baidu.com/do/add",params:{it:this.getValue("title"),iu:this.getValue("url")}},douban:{shareUrl:"https://www.douban.com/share/service",params:{name:this.getValue("title"),href:this.getValue("url"),image:this.getValue("image")}},okru:{shareUrl:"https://connect.ok.ru/dk",params:{"st.cmd":"WidgetSharePreview","st.shareUrl":this.getValue("url"),title:this.getValue("title")}},mailru:{shareUrl:"http://connect.mail.ru/share",params:{share_url:this.getValue("url"),linkname:this.getValue("title"),linknote:this.getValue("description"),type:"page"}},evernote:{shareUrl:"http://www.evernote.com/clip.action",params:{url:this.getValue("url"),title:this.getValue("title")}},skype:{shareUrl:"https://web.skype.com/share",params:{url:this.getValue("url"),title:this.getValue("title")}},quora:{shareUrl:"https://www.quora.com/share",params:{url:this.getValue("url"),title:this.getValue("title")}},delicious:{shareUrl:"https://del.icio.us/post",params:{url:this.getValue("url"),title:this.getValue("title")}},sms:{shareUrl:"sms://",params:{body:this.getValue("body")}},trello:{shareUrl:"https://trello.com/add-card",params:{url:this.getValue("url"),name:this.getValue("title"),desc:this.getValue("description"),mode:"popup"}},messenger:{shareUrl:"fb-messenger://share",params:{link:this.getValue("url")}},odnoklassniki:{shareUrl:"https://connect.ok.ru/dk",params:{st:{cmd:"WidgetSharePreview",deprecated:1,shareUrl:this.getValue("url")}}},meneame:{shareUrl:"https://www.meneame.net/submit",params:{url:this.getValue("url")}},diaspora:{shareUrl:"https://share.diasporafoundation.org",params:{title:this.getValue("title"),url:this.getValue("url")}},googlebookmarks:{shareUrl:"https://www.google.com/bookmarks/mark",params:{op:"edit",bkmk:this.getValue("url"),title:this.getValue("title")}},qzone:{shareUrl:"https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey",params:{url:this.getValue("url")}},refind:{shareUrl:"https://refind.com",params:{url:this.getValue("url")}},surfingbird:{shareUrl:"https://surfingbird.ru/share",params:{url:this.getValue("url"),title:this.getValue("title"),description:this.getValue("description")}},yahoomail:{shareUrl:"http://compose.mail.yahoo.com",params:{to:this.getValue("to"),subject:this.getValue("subject"),body:this.getValue("body")}},wordpress:{shareUrl:"https://wordpress.com/wp-admin/press-this.php",params:{u:this.getValue("url"),t:this.getValue("title"),s:this.getValue("title")}},amazon:{shareUrl:"https://www.amazon.com/gp/wishlist/static-add",params:{u:this.getValue("url"),t:this.getValue("title")}},pinboard:{shareUrl:"https://pinboard.in/add",params:{url:this.getValue("url"),title:this.getValue("title"),description:this.getValue("description")}},threema:{shareUrl:"threema://compose",params:{text:this.getValue("text"),id:this.getValue("id")}}},a=e[t];if(a){a.width=this.getValue("width");a.height=this.getValue("height")}return a!==undefined?this.urlSharer(a):false},urlSharer:function(t){var e=t.params||{},a=Object.keys(e),r,s=a.length>0?"?":"";for(r=0;r<a.length;r++){if(s!=="?"){s+="&"}if(e[a[r]]){s+=a[r]+"="+encodeURIComponent(e[a[r]])}}t.shareUrl+=s;if(!t.isLink){var l=t.width||600,i=t.height||480,h=g.innerWidth/2-l/2+g.screenX,u=g.innerHeight/2-i/2+g.screenY,o="scrollbars=no, width="+l+", height="+i+", top="+u+", left="+h,p=g.open(t.shareUrl,"",o);if(g.focus){p.focus()}}else{g.location.href=t.shareUrl}}};if(r.readyState==="complete"||r.readyState!=="loading"){s.init()}else{r.addEventListener("DOMContentLoaded",s.init)}g.addEventListener("page:load",s.init);g.addEventListener("turbolinks:load",s.init);g.Sharer=s})(window,document);

/**
 * https://github.com/gre/bezier-easing
 * BezierEasing - use bezier curve for transition easing function
 * by Gaëtan Renaudeau 2014 - 2015 – MIT License
 */
var NEWTON_ITERATIONS=4,NEWTON_MIN_SLOPE=.001,SUBDIVISION_PRECISION=1E-7,SUBDIVISION_MAX_ITERATIONS=10,kSplineTableSize=11,kSampleStepSize=1/(kSplineTableSize-1),float32ArraySupported="function"===typeof Float32Array;function A(a,b){return 1-3*b+3*a}function B(a,b){return 3*b-6*a}function C(a){return 3*a}function calcBezier(a,b,c){return((A(b,c)*a+B(b,c))*a+C(b))*a}function getSlope(a,b,c){return 3*A(b,c)*a*a+2*B(b,c)*a+C(b)}
function binarySubdivide(a,b,c,h,g){var e=0;do{var d=b+(c-b)/2;var l=calcBezier(d,h,g)-a;0<l?c=d:b=d}while(Math.abs(l)>SUBDIVISION_PRECISION&&++e<SUBDIVISION_MAX_ITERATIONS);return d}function newtonRaphsonIterate(a,b,c,h){for(var g=0;g<NEWTON_ITERATIONS;++g){var e=getSlope(b,c,h);if(0===e)break;var d=calcBezier(b,c,h)-a;b-=d/e}return b}function LinearEasing(a){return a}
function BezierEasing(a,b,c,h){if(!(0<=a&&1>=a&&0<=c&&1>=c))throw Error("bezier x values must be in [0, 1] range");if(a===b&&c===h)return LinearEasing;for(var g=float32ArraySupported?new Float32Array(kSplineTableSize):Array(kSplineTableSize),e=0;e<kSplineTableSize;++e)g[e]=calcBezier(e*kSampleStepSize,a,c);return function(d){if(0===d)return 0;if(1===d)return 1;for(var e=0,f=1,k=kSplineTableSize-1;f!==k&&g[f]<=d;++f)e+=kSampleStepSize;--f;f=e+(d-g[f])/(g[f+1]-g[f])*kSampleStepSize;k=getSlope(f,a,c);
d=k>=NEWTON_MIN_SLOPE?newtonRaphsonIterate(d,f,a,c):0===k?f:binarySubdivide(d,e,e+kSampleStepSize,a,c);return calcBezier(d,b,h)}};

/**
 * @preserve Pompous Player v26.
 * 
 * @license Copyright (c) 2020 Pompous Media LLC. All rights reserved.
 * Subject to the terms at 
 * https://github.com/TorZidan/PompousPlayer/blob/master/STANDARD_LICENSE 
 * and https://www.pompousphotos.com/commercial_license
 */

function PpUtils() {
}
PpUtils.prototype = {
  constructor: PpUtils,
  ppDocumentReady: function(callback){if(document.readyState!='loading'){callback()} else {document.addEventListener('DOMContentLoaded', callback)}}
  // TODO: Move all functions below into here.
};
var PpUtils = new PpUtils();

function ppDocumentReady(callback){if(document.readyState!='loading'){callback()} else {document.addEventListener('DOMContentLoaded', callback)}}

function isInIframe() {try{return window.self!==window.top}catch(e){return true}}const isInIframeBool = isInIframe();

const pompousUrlParams={};
//Populate the urlParams object with key/value pairs:
window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str,key,value) {pompousUrlParams[decodeURI(key)] = decodeURI(value);});
function getPompousUrlParams() {return pompousUrlParams;}
window['getPompousUrlParams'] = getPompousUrlParams;

// Gets the element's width, similar to jQuery width() method.
// See jQuery source code in https://github.com/jquery/jquery/blob/master/src/dimensions.js
function ppWidth(el){
  // return $(el).width();
  
  //On Chrome for iOS the outerWidth and outerHeight are both 0, hence using the innerWidth, innerHeight.
  // When running in an iframe: use innerWidth, innerHeight, because the "outer" dimensions are bad (on chrome mobile).
  // On other browsers: choose the smaller of (innerWidth, outerWidth). Works nice on Chrome for desktop and android:
  // return (window.outerWidth==0 || isInIframeBool)?  window.innerWidth  : Math.min(window.innerWidth, window.outerWidth);
  
  const styles=getComputedStyle(el);
  // remove the 'px' from the returned values
  const paddingLeft = styles['padding-left'].slice(0,-2);
  const paddingRight= styles['padding-right'].slice(0,-2);
  return el.clientWidth - paddingLeft - paddingRight;
}

function ppHeight(el){
  // May return 0, which is undesirable:
  // return $(el).height();
  
  // return (window.outerHeight==0  || isInIframeBool)? window.innerHeight : Math.min(window.innerHeight, window.outerHeight);

  const styles=getComputedStyle(el);
  const paddingTop = styles['padding-top'].slice(0,-2);
  const paddingBottom= styles['padding-bottom'].slice(0,-2);
  return el.clientHeight - paddingTop - paddingBottom;
}
/**
 * Should be invoked after init and on each window resize / phone orientation flip (it happens even when
 * you scroll/slide down in mobile Chrome to hide the address bar). Scales the
 * stage element to fit BOTH the width and height of the available window/iframe
 * (the way a video does). Note: If someone is directly embedding a presentation
 * on his web page, this may be undesirable. Therefore we recommend to embed
 * the presentation in an iframe. Or you could write your own
 * function to do something else.
 */
function updateStageScaleToFitWidthAndHeight(pompousPlayer, optionalMaxWidthInPixels) {
  if(pompousPlayer.isInFullScreen()) {
    // Do nothing in full screen.It's handled by the player code.
    return;
  }
  
  // On Chrome for iOS the outerWidth and outerHeight are both 0, hence using the innerWidth, innerHeight.
  // When running in an iframe: use innerWidth, innerHeight, because the "outer" dimensions are bad (on chrome mobile).
  // On other browsers: choose the smaller of (innerWidth, outerWidth). Works nice on Chrome for desktop and android:
  const ww = (window.outerWidth==0 || isInIframeBool)?  window.innerWidth  : Math.min(window.innerWidth, window.outerWidth);
  const wh = (window.outerHeight==0  || isInIframeBool)? window.innerHeight : Math.min(window.innerHeight, window.outerHeight);  
  const options = pompousPlayer.getOptions();
  
  if(optionalMaxWidthInPixels!==undefined && ww>=(optionalMaxWidthInPixels+options["stage-border-size"]*2)) {
    // The browser window is larger than the desired size. No need to scale anything. Apply a fixed scale:
    var newScale = (optionalMaxWidthInPixels+options["stage-border-size"]*2)/options["design-width"];    
    newScale = Math.round(newScale * 100) / 100;
    pompousPlayer.scaleStage(newScale);
  } else {
    // The common use case:
    var newScale;
    if(ww/wh < options["design-width"]/options["design-height"]) { 
      // tall ratio
      newScale = (ww-options["stage-border-size"]*2) / options["design-width"];
    } else { 
      // wide ratio
      newScale = (wh-options["stage-border-size"]*2) / options["design-height"];
    }
    newScale = Math.round(newScale * 100) / 100;
    console.warn("ww="+ww+", wh="+wh+" newScale="+newScale);
    pompousPlayer.scaleStage(newScale);
  }
}

/**
 * Similar to updateStageScaleToFitWidthAndHeight() above, but fits the window width only.
 * If the window is not tall enough, a vertical scroll bar will appear .
 */
function updateStageScaleToFitWidth(pompousPlayer, optionalMaxWidthInPixels) {
  if(pompousPlayer.isInFullScreen()) {
    // Do nothing in full screen.It's handled by the player code.
    return;
  }
  
  const ww = ppWidth(document.documentElement);
  const wh = ppHeight(document.documentElement);
  const options = pompousPlayer.getOptions();
  
  if(optionalMaxWidthInPixels!==undefined && ww>=(optionalMaxWidthInPixels+options["stage-border-size"]*2)) {
    // The browser window is larger than the desired size. No need to scale anything. Apply a fixed scale:
    var newScale = (optionalMaxWidthInPixels+options["stage-border-size"]*2)/options["design-width"];    
    pompousPlayer.scaleStage(newScale);
  } else {
    // The common use case:
    newScale = (ww-options["stage-border-size"]*2) / options["design-width"];
    pompousPlayer.scaleStage(newScale);
  }
}

//See https://easings.net/ and https://dbaron.org/css/timing-function-graphs and https://developer.mozilla.org/en-US/docs/Web/CSS/timing-function for graphs:
//The value of t should be between 0 and 1 for these to work well:
const ease           = BezierEasing(0.25, 0.1,  0.25, 1.0 );
const easeIn         = BezierEasing(0.42, 0.0,  1.0,  1.0 );
const easeOut        = BezierEasing(0.0 , 0.0,  0.58, 1.0 );
const easeInOut      = BezierEasing(0.42, 0.0,  0.58, 1.0 );
const easeInSine     = BezierEasing(0.47, 0, 0.745, 0.715);
const easeOutSine    = BezierEasing(0.39, 0.575, 0.565, 1);
const easeInOutSine  = BezierEasing(0.445, 0.05, 0.55, 0.95);
const easeInQuad     = BezierEasing(0.55, 0.085, 0.68, 0.53);
const easeOutQuad    = BezierEasing(0.25, 0.46, 0.45, 0.94);
const easeInOutQuad  = BezierEasing(0.455, 0.03, 0.515, 0.955);
const easeInCubic    = BezierEasing(0.55, 0.055, 0.675, 0.19);
const easeOutCubic   = BezierEasing(0.215, 0.61, 0.355, 1);   // see it at http://cubic-bezier.com/#.215,.61,.355,1
const easeInOutCubic = BezierEasing(0.645, 0.045, 0.355, 1);
const easeInQuart    = BezierEasing(0.895, 0.03, 0.685, 0.22);
const easeOutQuart   = BezierEasing(0.165, 0.84, 0.44, 1);
const easeInOutQuart = BezierEasing(0.77, 0, 0.175, 1);
const easeInQuint    = BezierEasing(0.755, 0.05, 0.855, 0.06);
const easeOutQuint   = BezierEasing(0.23, 1, 0.32, 1);
const easeInOutQuint = BezierEasing(0.86, 0, 0.07, 1);
const easeInExpo     = BezierEasing(0.95, 0.05, 0.795, 0.035);
const easeOutExpo    = BezierEasing(0.19, 1, 0.22, 1);
const easeInOutExpo  = BezierEasing(1, 0, 0, 1);
const easeInCirc     = BezierEasing(0.6, 0.04, 0.98, 0.335);
const easeOutCirc    = BezierEasing(0.075, 0.82, 0.165, 1);
const easeInOutCirc  = BezierEasing(0.785, 0.135, 0.15, 0.86);

const easeOutBack2   = BezierEasing(0.15, 1.52, 0.86, 1.08); // see it at http://cubic-bezier.com/#.15,1.52,.57,1.22
const easeOutBack3   = BezierEasing(1   , 1.86, 1,    1.94); // see it at http://cubic-bezier.com/#1,1.86,1,1.94


/**
 * Defines easing functions that can be used in the "--pp-transition-timing-function" CSS style.
 * The value of "t" is always between 0..1, and comes from animationProgressMs/totalAnimationProgressMs. 
 * Most of the functions here have f(0)=0, f(1)=1, which is essential, expected behavior for sane animations: it guarantees 
 * that     the transformed value at start is equal to the initial value (set in CSS style "--pp-transform-from"), 
 * and that the transformed value at end   is equal to the final   value (set in CSS style "transform").
 * Only the last 5 functions (e.g. "EaseGoBack") do not conform to that: they have f(0)=0, f(1)=0.
 */
const transitionTimingFunctions = {
 "linear":         (t) => {return t;},
 "ease-in-out":    (t) => {return easeInOut(t)},     // alternative function :{return (t *= 2) < 1 ? 1 / 2 * t * t : -1 / 2 * (--t * (t - 2) - 1);},
 "ease-in":        (t) => {return easeIn(t)},        // {return 5*t*t + t; }, 
 "ease-out":       (t) => {return easeOut(t)},       // {return -0.8*t*t + 2*t;},
 "ease":           (t) => {return ease(t)},
 "easeInSine":     (t) => {return easeInSine(t)},    // {return 1 - Math.cos(t * Math.PI / 2);},
 "easeOutSine":    (t) => {return easeOutSine(t)},
 "easeInOutSine":  (t) => {return easeInOutSine(t)},
 "easeInQuad":     (t) => {return easeInQuad(t)},    // {return t * t;},
 "easeOutQuad":    (t) => {return easeOutQuad(t)},   // {return -t * (t - 2);},
 "easeInOutQuad":  (t) => {return easeInOutQuad(t)}, // {return (t *= 2) < 1 ? 1 / 2 * t * t : -1 / 2 * (--t * (t - 2) - 1);},
 "easeInCubic":    (t) => {return easeInCubic(t)},   // {return t * t * t;},
 "easeOutCubic":   (t) => {return easeOutCubic(t)},  // {return (t -= 1) * t * t + 1;},
 "easeInOutCubic": (t) => {return easeInOutCubic(t)},// {return (t *= 2) < 1 ? 1 / 2 * t * t * t : 1 / 2 * ((t -= 2) * t * t + 2);},
 "easeInQuart":    (t) => {return easeInQuart(t)},   // {return t * t * t * t;},
 "easeOutQuart":   (t) => {return easeOutQuart(t)},  // (t) => {return -((t -= 1) * t * t * t - 1);},
 "easeInOutQuart": (t) => {return easeInOutQuart(t)},// {return (t *= 2) < 1 ? 1 / 2 * t * t * t * t : -1 / 2 * ((t -= 2) * t * t * t - 2);},
 "easeInQuint":    (t) => {return easeInQuint(t)},   // {return t * t * t * t * t;},
 "easeOutQuint":   (t) => {return easeOutQuint(t)},  // {return (t -= 1) * t * t * t * t + 1;},
 "easeInOutQuint": (t) => {return easeInOutQuint(t)},// {return (t *= 2) < 1 ? 1 / 2 * t * t * t * t * t : 1 / 2 * ((t -= 2) * t * t * t * t + 2);},
 "easeInExpo":     (t) => {return easeInExpo(t)},    // {return t == 0 ? 0 : Math.pow(2, 10 * (t - 1));},
 "easeOutExpo":    (t) => {return easeOutExpo(t)},   // {return t == 1 ? 1 : -Math.pow(2, -10 * t) + 1;},
 "easeInOutExpo":  (t) => {return easeInOutExpo(t)}, // (t) => {return t == 0 || t == 1 ? t : (t *= 2) < 1 ? 1 / 2 * Math.pow(2, 10 * (t - 1)) : 1 / 2 * (-Math.pow(2, -10 * --t) + 2);},
 "easeInCirc":     (t) => {return easeInCirc(t)},    // {return -(Math.sqrt(1 - t * t) - 1);},
 "easeOutCirc":    (t) => {return easeOutCirc(t)},   // {return Math.sqrt(1 - (t -= 1) * t);},
 "easeInOutCirc":  (t) => {return easeInOutCirc(t)}, // {return (t *= 2) < 1 ? -1 / 2 * (Math.sqrt(1 - t * t) - 1) : 1 / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1);},
 // more exotic functions:
 "easeSwing":      (t) => {return -Math.cos(t * Math.PI) / 2 + .5;},
 "easeOutSine":    (t) => {return Math.sin(t * Math.PI / 2);},
 "easeInOutSine":  (t) => {return -1 / 2 * (Math.cos(Math.PI * t) - 1);}, 
 "easeInElastic":  (t) => {
   if (!t || t == 1)
       return t;
   const p = .3, s = .075;
   return -(Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * 2 * Math.PI / p));
 },
 "easeOutElastic": (t) => {
   if (!t || t == 1)
       return t;
   const p = .3, s = .075;
   return Math.pow(2, -10 * t) * Math.sin((t - s) * 2 * Math.PI / p) + 1;
 },
 "easeInOutElastic": (t) => {
   if (!t || t == 1)
       return t;
   const p = .45, s = .1125;
   return (t *= 2) < 1 ? -.5 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * 2 * Math.PI / p) : Math.pow(2, -10 * (t -= 1)) * Math.sin((t - s) * 2 * Math.PI / p) * .5 + 1;
 },
 // Originally s was 1.70158. A smaller number(1.0) makes the to-back bounce shorter:
 "easeInBack":     (t) => {const s = 1; return t * t * ((s + 1) * t - s);},
 // Originally s was 1.70158. A smaller number(1.0) makes the to-back bounce shorter:
 "easeOutBack":    (t) => {const s = 1; t -= 1; return t * t * ((s + 1) * t + s) + 1;},
 "easeOutBack2":   (t) => {return easeOutBack2(t);},
 "easeOutBack3":   (t) => {return easeOutBack3(t);},
 // Most change happens from t = 0.8 to 1; at t=0.9 the output is 1.3 (the max). Used for "Light speed in" text transition. 
 // Use https://mycurvefit.com/ to get the formula for each individual line
 "easeOutBack4":   (t) => {if (t<0.8) return 0; else if(t>=0.8 && t<=0.9) return 13*t - 10.4; else return -3*t + 4;},
 "easeInOutBack":  (t) => {var s = 1.70158; t *= 2; return t < 1 ? 1 / 2 * t * t * (((s *= 1.525) + 1) * t - s) : 1 / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2);},
 "easeInBounce":   (t) => {return 1 - transitionTimingFunctions["EaseOutBounce"](1 - t)},
 "easeOutBounce":  (t) => {return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;},
 "easeInOutBounce":(t) => {return t < 1 / 2 ? transitionTimingFunctions["easeInBounce"](t * 2) * .5 : transitionTimingFunctions["easeOutBounce"](t * 2 - 1) * .5 + .5;},
 "swing":          (t) => {return 0.5 - Math.cos(percentComplete * Math.PI)/2;},
 "spring":         (t) => {return 1 - (Math.cos(t * 4.5 * Math.PI) * Math.exp(-t * 6));},
}

// The code below is part of the "Zero Javascript code" option. It allows defining presentations without having to write any JS code.
ppDocumentReady( () => {
  const stageElems = document.querySelectorAll("[data-pompous-player-stage]"); // or querySelectorAll("[data-pompous-player-stage='']");
  for (const stageElem of stageElems) {
    
    var pompousEventNotifier;
    const skinName = stageElem.getAttribute("data-skin");
    switch(skinName) {
      case "video-like":
        pompousEventNotifier = new PompousVideoLikeNavigation({"stage-id":stageElem, "hide-share-button":false, "hide-audio-button":false, "hide-full-screen-button":false});
        break;
      case "carousel":
        pompousEventNotifier = new PompousCarouselNavigation({"stage-id":stageElem, "hide-share-button":false, "hide-audio-button":false, "hide-full-screen-button":false});
        break;
      case "none":
      case "blank":
        pompousEventNotifier = new PompousBlankNavigation({"stage-id":stageElem});
        break;
      case "derive-from-html":
      default:
        if(stageElem.querySelectorAll(".pp-selector-video-like-splash").length >0) {
          pompousEventNotifier = new PompousVideoLikeNavigation({"stage-id":stageElem, "hide-share-button":false, "hide-audio-button":false, "hide-full-screen-button":false});
        } else if(stageElem.querySelectorAll(".pp-selector-carousel-splash").length >0) {
          pompousEventNotifier = new PompousCarouselNavigation({"stage-id":stageElem, "hide-share-button":false, "hide-audio-button":false, "hide-full-screen-button":false});
        } else if(stageElem.querySelectorAll(".pp-selector-no-navigation-splash").length >0) {
          pompousEventNotifier = new PompousBlankNavigation({"stage-id":stageElem});
        } else {
          console.warn("Found stage attribute data-skin=\"derive-from-html\", but could not derive the skin from the html within the stage element! Will use a \"blank\" skin.");
          pompousEventNotifier = new PompousBlankNavigation({"stage-id":stageElem});
        }
    }
    
    const webfontsStr = stageElem.getAttribute("data-web-fonts") || "{}";
    var webfontsObj;
    try{
      webfontsObj = JSON.parse(webfontsStr);
    } catch(e) {
      console.warn("Could not parse value in attribute data-web-fonts=\""+webfontsStr+"\"! Will use {} (an empty set of webfonts) instead. The error is: "+e);
      webfontsObj = {};
    }
    
    // TODO: add documentation, copy from pp-player.js
    // implement different skins and their attributes (e.g. "hide-share-button")
    const pompousOptions = {
        "stage-id": stageElem, 
        "auto-start": stageElem.getAttribute("data-auto-start") || true,
        "auto-start-audio-muted": stageElem.getAttribute("data-auto-start-audio-muted") || true,
        "auto-restart-at-end": stageElem.getAttribute("data-auto-restart-at-end") || false,
        "auto-restart-at-start": stageElem.getAttribute("data-auto-restart-at-start") || false,
        "design-width": parseInt(stageElem.getAttribute("data-design-width")) || 1920,
        "design-height": parseInt(stageElem.getAttribute("data-design-height")) || 1080,
        "stage-border-size": parseInt(stageElem.getAttribute("data-stage-border-size")) || 0,
        "load-images-ahead": parseInt(stageElem.getAttribute("data-load-images-ahead")) || 5,
        "web-fonts": webfontsObj,
        "player-event-listener": pompousEventNotifier,
        "log-level": parseInt(stageElem.getAttribute("data-log-level")) || 2,
     };
    const pompousPlayer = new PompousPlayer(pompousOptions);
    
    pompousPlayer.init();
    
    const fitMode = stageElem.getAttribute("data-auto-resize") || "width-and-height";
    if(fitMode==="width-and-height") {
      //Scale the stage div element to fit the window width and height
      updateStageScaleToFitWidthAndHeight(pompousPlayer);
      
      // On each window resize: resize the stage div element to fit the window/iframe width AND height:
      window.addEventListener("resize", () => {updateStageScaleToFitWidthAndHeight(pompousPlayer)});
      
      setTimeout(() => {
        // Do another scale after 10ms, as a workaround of a Chrome bug on desktop:
        updateStageScaleToFitWidthAndHeight(pompousPlayer);
      }, 10);
    } else if(fitMode==="width") {
      //Scale the stage div element to fit the window width
      updateStageScaleToFitWidth(pompousPlayer);
      
      // On each window resize: resize the stage div element to fit the window/iframe width:
      window.addEventListener("resize", () => {updateStageScaleToFitWidth(pompousPlayer)});
      
      setTimeout(() => {
        // Do another scale after 10ms, as a workaround of a Chrome bug on desktop:
        updateStageScaleToFitWidth(pompousPlayer);
      }, 10);
    } else if(fitMode==="none") {
      // do nothing 
    } else {
      console.warn("Unknown value in stage attribute 'data-auto-resize':'"+fitMode+"'! Will use 'none'.");
    }

    // Setup mobile swipe/touch actions:
    if(pompousEventNotifier instanceof PompousVideoLikeNavigation) {
      /** Listen for touch events on mobile devices: */
      new PompousMobileTouchListener(
        document,
        (swipeDirection) => {
          if(swipeDirection==="right") {
            pompousPlayer.playPreviousAnimation();
          } else if(swipeDirection==="left") {
            pompousPlayer.playNextAnimation();
          }
        }
      );
    } else if(pompousEventNotifier instanceof PompousCarouselNavigation) {
      /** 
       * Listens for touch events on mobile devices (actually on all devices, and that's ok). 
       * The 1st argument is the "player" instance.
       * Limitations/ requirements:
       *  - Each carousel "slide" animation should be marked as non-skippable (should not have the data-class?-skippable attribute); this way the left/right swipe will get to the next/previous "slide".
       *  - There should be some (>0 millis) "pause" before next "slide" animation (does not need to be the same for all images).
       *  - It works best with the following easing functions: "linear", "ease", "ease-in", "ease-out", "ease-in-out".
       * For more info, see the PompousCarouselMobileTouchListener code in file js/pp-skins.js.
       */
       new PompousCarouselMobileTouchListener(pompousPlayer);
    }
  }  
});
