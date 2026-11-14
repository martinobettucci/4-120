var K_=Object.defineProperty;var Z_=(t,e,n)=>e in t?K_(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var at=(t,e,n)=>Z_(t,typeof e!="symbol"?e+"":e,n);function Q_(t,e){for(var n=0;n<e.length;n++){const i=e[n];if(typeof i!="string"&&!Array.isArray(i)){for(const r in i)if(r!=="default"&&!(r in t)){const s=Object.getOwnPropertyDescriptor(i,r);s&&Object.defineProperty(t,r,s.get?s:{enumerable:!0,get:()=>i[r]})}}}return Object.freeze(Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}))}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();function J_(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var w0={exports:{}},jc={},T0={exports:{}},He={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var za=Symbol.for("react.element"),ey=Symbol.for("react.portal"),ty=Symbol.for("react.fragment"),ny=Symbol.for("react.strict_mode"),iy=Symbol.for("react.profiler"),ry=Symbol.for("react.provider"),sy=Symbol.for("react.context"),oy=Symbol.for("react.forward_ref"),ay=Symbol.for("react.suspense"),ly=Symbol.for("react.memo"),cy=Symbol.for("react.lazy"),Bp=Symbol.iterator;function uy(t){return t===null||typeof t!="object"?null:(t=Bp&&t[Bp]||t["@@iterator"],typeof t=="function"?t:null)}var b0={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},A0=Object.assign,C0={};function Eo(t,e,n){this.props=t,this.context=e,this.refs=C0,this.updater=n||b0}Eo.prototype.isReactComponent={};Eo.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Eo.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function R0(){}R0.prototype=Eo.prototype;function ff(t,e,n){this.props=t,this.context=e,this.refs=C0,this.updater=n||b0}var pf=ff.prototype=new R0;pf.constructor=ff;A0(pf,Eo.prototype);pf.isPureReactComponent=!0;var Hp=Array.isArray,P0=Object.prototype.hasOwnProperty,mf={current:null},L0={key:!0,ref:!0,__self:!0,__source:!0};function D0(t,e,n){var i,r={},s=null,o=null;if(e!=null)for(i in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)P0.call(e,i)&&!L0.hasOwnProperty(i)&&(r[i]=e[i]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var l=Array(a),c=0;c<a;c++)l[c]=arguments[c+2];r.children=l}if(t&&t.defaultProps)for(i in a=t.defaultProps,a)r[i]===void 0&&(r[i]=a[i]);return{$$typeof:za,type:t,key:s,ref:o,props:r,_owner:mf.current}}function dy(t,e){return{$$typeof:za,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function gf(t){return typeof t=="object"&&t!==null&&t.$$typeof===za}function hy(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Vp=/\/+/g;function pu(t,e){return typeof t=="object"&&t!==null&&t.key!=null?hy(""+t.key):e.toString(36)}function jl(t,e,n,i,r){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case za:case ey:o=!0}}if(o)return o=t,r=r(o),t=i===""?"."+pu(o,0):i,Hp(r)?(n="",t!=null&&(n=t.replace(Vp,"$&/")+"/"),jl(r,e,n,"",function(c){return c})):r!=null&&(gf(r)&&(r=dy(r,n+(!r.key||o&&o.key===r.key?"":(""+r.key).replace(Vp,"$&/")+"/")+t)),e.push(r)),1;if(o=0,i=i===""?".":i+":",Hp(t))for(var a=0;a<t.length;a++){s=t[a];var l=i+pu(s,a);o+=jl(s,e,n,l,r)}else if(l=uy(t),typeof l=="function")for(t=l.call(t),a=0;!(s=t.next()).done;)s=s.value,l=i+pu(s,a++),o+=jl(s,e,n,l,r);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function Ka(t,e,n){if(t==null)return t;var i=[],r=0;return jl(t,i,"","",function(s){return e.call(n,s,r++)}),i}function fy(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var ln={current:null},Gl={transition:null},py={ReactCurrentDispatcher:ln,ReactCurrentBatchConfig:Gl,ReactCurrentOwner:mf};function I0(){throw Error("act(...) is not supported in production builds of React.")}He.Children={map:Ka,forEach:function(t,e,n){Ka(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return Ka(t,function(){e++}),e},toArray:function(t){return Ka(t,function(e){return e})||[]},only:function(t){if(!gf(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};He.Component=Eo;He.Fragment=ty;He.Profiler=iy;He.PureComponent=ff;He.StrictMode=ny;He.Suspense=ay;He.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=py;He.act=I0;He.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var i=A0({},t.props),r=t.key,s=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=mf.current),e.key!==void 0&&(r=""+e.key),t.type&&t.type.defaultProps)var a=t.type.defaultProps;for(l in e)P0.call(e,l)&&!L0.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&a!==void 0?a[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){a=Array(l);for(var c=0;c<l;c++)a[c]=arguments[c+2];i.children=a}return{$$typeof:za,type:t.type,key:r,ref:s,props:i,_owner:o}};He.createContext=function(t){return t={$$typeof:sy,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:ry,_context:t},t.Consumer=t};He.createElement=D0;He.createFactory=function(t){var e=D0.bind(null,t);return e.type=t,e};He.createRef=function(){return{current:null}};He.forwardRef=function(t){return{$$typeof:oy,render:t}};He.isValidElement=gf;He.lazy=function(t){return{$$typeof:cy,_payload:{_status:-1,_result:t},_init:fy}};He.memo=function(t,e){return{$$typeof:ly,type:t,compare:e===void 0?null:e}};He.startTransition=function(t){var e=Gl.transition;Gl.transition={};try{t()}finally{Gl.transition=e}};He.unstable_act=I0;He.useCallback=function(t,e){return ln.current.useCallback(t,e)};He.useContext=function(t){return ln.current.useContext(t)};He.useDebugValue=function(){};He.useDeferredValue=function(t){return ln.current.useDeferredValue(t)};He.useEffect=function(t,e){return ln.current.useEffect(t,e)};He.useId=function(){return ln.current.useId()};He.useImperativeHandle=function(t,e,n){return ln.current.useImperativeHandle(t,e,n)};He.useInsertionEffect=function(t,e){return ln.current.useInsertionEffect(t,e)};He.useLayoutEffect=function(t,e){return ln.current.useLayoutEffect(t,e)};He.useMemo=function(t,e){return ln.current.useMemo(t,e)};He.useReducer=function(t,e,n){return ln.current.useReducer(t,e,n)};He.useRef=function(t){return ln.current.useRef(t)};He.useState=function(t){return ln.current.useState(t)};He.useSyncExternalStore=function(t,e,n){return ln.current.useSyncExternalStore(t,e,n)};He.useTransition=function(){return ln.current.useTransition()};He.version="18.3.1";T0.exports=He;var te=T0.exports;const N0=J_(te),my=Q_({__proto__:null,default:N0},[te]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var gy=te,vy=Symbol.for("react.element"),xy=Symbol.for("react.fragment"),_y=Object.prototype.hasOwnProperty,yy=gy.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Sy={key:!0,ref:!0,__self:!0,__source:!0};function U0(t,e,n){var i,r={},s=null,o=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(i in e)_y.call(e,i)&&!Sy.hasOwnProperty(i)&&(r[i]=e[i]);if(t&&t.defaultProps)for(i in e=t.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:vy,type:t,key:s,ref:o,props:r,_owner:yy.current}}jc.Fragment=xy;jc.jsx=U0;jc.jsxs=U0;w0.exports=jc;var m=w0.exports,k0={exports:{}},Pn={},F0={exports:{}},O0={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(D,W){var Q=D.length;D.push(W);e:for(;0<Q;){var ae=Q-1>>>1,ye=D[ae];if(0<r(ye,W))D[ae]=W,D[Q]=ye,Q=ae;else break e}}function n(D){return D.length===0?null:D[0]}function i(D){if(D.length===0)return null;var W=D[0],Q=D.pop();if(Q!==W){D[0]=Q;e:for(var ae=0,ye=D.length,Ye=ye>>>1;ae<Ye;){var X=2*(ae+1)-1,re=D[X],ge=X+1,le=D[ge];if(0>r(re,Q))ge<ye&&0>r(le,re)?(D[ae]=le,D[ge]=Q,ae=ge):(D[ae]=re,D[X]=Q,ae=X);else if(ge<ye&&0>r(le,Q))D[ae]=le,D[ge]=Q,ae=ge;else break e}}return W}function r(D,W){var Q=D.sortIndex-W.sortIndex;return Q!==0?Q:D.id-W.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var o=Date,a=o.now();t.unstable_now=function(){return o.now()-a}}var l=[],c=[],u=1,d=null,f=3,p=!1,x=!1,v=!1,g=typeof setTimeout=="function"?setTimeout:null,h=typeof clearTimeout=="function"?clearTimeout:null,_=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function y(D){for(var W=n(c);W!==null;){if(W.callback===null)i(c);else if(W.startTime<=D)i(c),W.sortIndex=W.expirationTime,e(l,W);else break;W=n(c)}}function S(D){if(v=!1,y(D),!x)if(n(l)!==null)x=!0,O(C);else{var W=n(c);W!==null&&$(S,W.startTime-D)}}function C(D,W){x=!1,v&&(v=!1,h(P),P=-1),p=!0;var Q=f;try{for(y(W),d=n(l);d!==null&&(!(d.expirationTime>W)||D&&!L());){var ae=d.callback;if(typeof ae=="function"){d.callback=null,f=d.priorityLevel;var ye=ae(d.expirationTime<=W);W=t.unstable_now(),typeof ye=="function"?d.callback=ye:d===n(l)&&i(l),y(W)}else i(l);d=n(l)}if(d!==null)var Ye=!0;else{var X=n(c);X!==null&&$(S,X.startTime-W),Ye=!1}return Ye}finally{d=null,f=Q,p=!1}}var A=!1,b=null,P=-1,T=5,M=-1;function L(){return!(t.unstable_now()-M<T)}function j(){if(b!==null){var D=t.unstable_now();M=D;var W=!0;try{W=b(!0,D)}finally{W?z():(A=!1,b=null)}}else A=!1}var z;if(typeof _=="function")z=function(){_(j)};else if(typeof MessageChannel<"u"){var q=new MessageChannel,Z=q.port2;q.port1.onmessage=j,z=function(){Z.postMessage(null)}}else z=function(){g(j,0)};function O(D){b=D,A||(A=!0,z())}function $(D,W){P=g(function(){D(t.unstable_now())},W)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(D){D.callback=null},t.unstable_continueExecution=function(){x||p||(x=!0,O(C))},t.unstable_forceFrameRate=function(D){0>D||125<D?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):T=0<D?Math.floor(1e3/D):5},t.unstable_getCurrentPriorityLevel=function(){return f},t.unstable_getFirstCallbackNode=function(){return n(l)},t.unstable_next=function(D){switch(f){case 1:case 2:case 3:var W=3;break;default:W=f}var Q=f;f=W;try{return D()}finally{f=Q}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(D,W){switch(D){case 1:case 2:case 3:case 4:case 5:break;default:D=3}var Q=f;f=D;try{return W()}finally{f=Q}},t.unstable_scheduleCallback=function(D,W,Q){var ae=t.unstable_now();switch(typeof Q=="object"&&Q!==null?(Q=Q.delay,Q=typeof Q=="number"&&0<Q?ae+Q:ae):Q=ae,D){case 1:var ye=-1;break;case 2:ye=250;break;case 5:ye=1073741823;break;case 4:ye=1e4;break;default:ye=5e3}return ye=Q+ye,D={id:u++,callback:W,priorityLevel:D,startTime:Q,expirationTime:ye,sortIndex:-1},Q>ae?(D.sortIndex=Q,e(c,D),n(l)===null&&D===n(c)&&(v?(h(P),P=-1):v=!0,$(S,Q-ae))):(D.sortIndex=ye,e(l,D),x||p||(x=!0,O(C))),D},t.unstable_shouldYield=L,t.unstable_wrapCallback=function(D){var W=f;return function(){var Q=f;f=W;try{return D.apply(this,arguments)}finally{f=Q}}}})(O0);F0.exports=O0;var My=F0.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ey=te,Rn=My;function ie(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var z0=new Set,_a={};function rs(t,e){oo(t,e),oo(t+"Capture",e)}function oo(t,e){for(_a[t]=e,t=0;t<e.length;t++)z0.add(e[t])}var Ii=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Ed=Object.prototype.hasOwnProperty,wy=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,jp={},Gp={};function Ty(t){return Ed.call(Gp,t)?!0:Ed.call(jp,t)?!1:wy.test(t)?Gp[t]=!0:(jp[t]=!0,!1)}function by(t,e,n,i){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function Ay(t,e,n,i){if(e===null||typeof e>"u"||by(t,e,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function cn(t,e,n,i,r,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var Xt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){Xt[t]=new cn(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];Xt[e]=new cn(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){Xt[t]=new cn(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){Xt[t]=new cn(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){Xt[t]=new cn(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){Xt[t]=new cn(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){Xt[t]=new cn(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){Xt[t]=new cn(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){Xt[t]=new cn(t,5,!1,t.toLowerCase(),null,!1,!1)});var vf=/[\-:]([a-z])/g;function xf(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(vf,xf);Xt[e]=new cn(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(vf,xf);Xt[e]=new cn(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(vf,xf);Xt[e]=new cn(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){Xt[t]=new cn(t,1,!1,t.toLowerCase(),null,!1,!1)});Xt.xlinkHref=new cn("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){Xt[t]=new cn(t,1,!1,t.toLowerCase(),null,!0,!0)});function _f(t,e,n,i){var r=Xt.hasOwnProperty(e)?Xt[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(Ay(e,n,r,i)&&(n=null),i||r===null?Ty(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):r.mustUseProperty?t[r.propertyName]=n===null?r.type===3?!1:"":n:(e=r.attributeName,i=r.attributeNamespace,n===null?t.removeAttribute(e):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,i?t.setAttributeNS(i,e,n):t.setAttribute(e,n))))}var Oi=Ey.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Za=Symbol.for("react.element"),Is=Symbol.for("react.portal"),Ns=Symbol.for("react.fragment"),yf=Symbol.for("react.strict_mode"),wd=Symbol.for("react.profiler"),B0=Symbol.for("react.provider"),H0=Symbol.for("react.context"),Sf=Symbol.for("react.forward_ref"),Td=Symbol.for("react.suspense"),bd=Symbol.for("react.suspense_list"),Mf=Symbol.for("react.memo"),Ki=Symbol.for("react.lazy"),V0=Symbol.for("react.offscreen"),Wp=Symbol.iterator;function No(t){return t===null||typeof t!="object"?null:(t=Wp&&t[Wp]||t["@@iterator"],typeof t=="function"?t:null)}var Mt=Object.assign,mu;function ta(t){if(mu===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);mu=e&&e[1]||""}return`
`+mu+t}var gu=!1;function vu(t,e){if(!t||gu)return"";gu=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var i=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){i=c}t.call(e.prototype)}else{try{throw Error()}catch(c){i=c}t()}}catch(c){if(c&&i&&typeof c.stack=="string"){for(var r=c.stack.split(`
`),s=i.stack.split(`
`),o=r.length-1,a=s.length-1;1<=o&&0<=a&&r[o]!==s[a];)a--;for(;1<=o&&0<=a;o--,a--)if(r[o]!==s[a]){if(o!==1||a!==1)do if(o--,a--,0>a||r[o]!==s[a]){var l=`
`+r[o].replace(" at new "," at ");return t.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",t.displayName)),l}while(1<=o&&0<=a);break}}}finally{gu=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?ta(t):""}function Cy(t){switch(t.tag){case 5:return ta(t.type);case 16:return ta("Lazy");case 13:return ta("Suspense");case 19:return ta("SuspenseList");case 0:case 2:case 15:return t=vu(t.type,!1),t;case 11:return t=vu(t.type.render,!1),t;case 1:return t=vu(t.type,!0),t;default:return""}}function Ad(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Ns:return"Fragment";case Is:return"Portal";case wd:return"Profiler";case yf:return"StrictMode";case Td:return"Suspense";case bd:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case H0:return(t.displayName||"Context")+".Consumer";case B0:return(t._context.displayName||"Context")+".Provider";case Sf:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Mf:return e=t.displayName||null,e!==null?e:Ad(t.type)||"Memo";case Ki:e=t._payload,t=t._init;try{return Ad(t(e))}catch{}}return null}function Ry(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Ad(e);case 8:return e===yf?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function _r(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function j0(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function Py(t){var e=j0(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),i=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(o){i=""+o,s.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(o){i=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function Qa(t){t._valueTracker||(t._valueTracker=Py(t))}function G0(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=j0(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function cc(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function Cd(t,e){var n=e.checked;return Mt({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function Xp(t,e){var n=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;n=_r(e.value!=null?e.value:n),t._wrapperState={initialChecked:i,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function W0(t,e){e=e.checked,e!=null&&_f(t,"checked",e,!1)}function Rd(t,e){W0(t,e);var n=_r(e.value),i=e.type;if(n!=null)i==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(i==="submit"||i==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?Pd(t,e.type,n):e.hasOwnProperty("defaultValue")&&Pd(t,e.type,_r(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function qp(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function Pd(t,e,n){(e!=="number"||cc(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var na=Array.isArray;function $s(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+_r(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function Ld(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(ie(91));return Mt({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function $p(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(ie(92));if(na(n)){if(1<n.length)throw Error(ie(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:_r(n)}}function X0(t,e){var n=_r(e.value),i=_r(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),i!=null&&(t.defaultValue=""+i)}function Yp(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function q0(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Dd(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?q0(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var Ja,$0=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,i,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,i,r)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(Ja=Ja||document.createElement("div"),Ja.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=Ja.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function ya(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var la={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Ly=["Webkit","ms","Moz","O"];Object.keys(la).forEach(function(t){Ly.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),la[e]=la[t]})});function Y0(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||la.hasOwnProperty(t)&&la[t]?(""+e).trim():e+"px"}function K0(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var i=n.indexOf("--")===0,r=Y0(n,e[n],i);n==="float"&&(n="cssFloat"),i?t.setProperty(n,r):t[n]=r}}var Dy=Mt({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Id(t,e){if(e){if(Dy[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(ie(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(ie(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(ie(61))}if(e.style!=null&&typeof e.style!="object")throw Error(ie(62))}}function Nd(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ud=null;function Ef(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var kd=null,Ys=null,Ks=null;function Kp(t){if(t=Va(t)){if(typeof kd!="function")throw Error(ie(280));var e=t.stateNode;e&&(e=$c(e),kd(t.stateNode,t.type,e))}}function Z0(t){Ys?Ks?Ks.push(t):Ks=[t]:Ys=t}function Q0(){if(Ys){var t=Ys,e=Ks;if(Ks=Ys=null,Kp(t),e)for(t=0;t<e.length;t++)Kp(e[t])}}function J0(t,e){return t(e)}function ev(){}var xu=!1;function tv(t,e,n){if(xu)return t(e,n);xu=!0;try{return J0(t,e,n)}finally{xu=!1,(Ys!==null||Ks!==null)&&(ev(),Q0())}}function Sa(t,e){var n=t.stateNode;if(n===null)return null;var i=$c(n);if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(ie(231,e,typeof n));return n}var Fd=!1;if(Ii)try{var Uo={};Object.defineProperty(Uo,"passive",{get:function(){Fd=!0}}),window.addEventListener("test",Uo,Uo),window.removeEventListener("test",Uo,Uo)}catch{Fd=!1}function Iy(t,e,n,i,r,s,o,a,l){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(u){this.onError(u)}}var ca=!1,uc=null,dc=!1,Od=null,Ny={onError:function(t){ca=!0,uc=t}};function Uy(t,e,n,i,r,s,o,a,l){ca=!1,uc=null,Iy.apply(Ny,arguments)}function ky(t,e,n,i,r,s,o,a,l){if(Uy.apply(this,arguments),ca){if(ca){var c=uc;ca=!1,uc=null}else throw Error(ie(198));dc||(dc=!0,Od=c)}}function ss(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function nv(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Zp(t){if(ss(t)!==t)throw Error(ie(188))}function Fy(t){var e=t.alternate;if(!e){if(e=ss(t),e===null)throw Error(ie(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===n)return Zp(r),t;if(s===i)return Zp(r),e;s=s.sibling}throw Error(ie(188))}if(n.return!==i.return)n=r,i=s;else{for(var o=!1,a=r.child;a;){if(a===n){o=!0,n=r,i=s;break}if(a===i){o=!0,i=r,n=s;break}a=a.sibling}if(!o){for(a=s.child;a;){if(a===n){o=!0,n=s,i=r;break}if(a===i){o=!0,i=s,n=r;break}a=a.sibling}if(!o)throw Error(ie(189))}}if(n.alternate!==i)throw Error(ie(190))}if(n.tag!==3)throw Error(ie(188));return n.stateNode.current===n?t:e}function iv(t){return t=Fy(t),t!==null?rv(t):null}function rv(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=rv(t);if(e!==null)return e;t=t.sibling}return null}var sv=Rn.unstable_scheduleCallback,Qp=Rn.unstable_cancelCallback,Oy=Rn.unstable_shouldYield,zy=Rn.unstable_requestPaint,Ct=Rn.unstable_now,By=Rn.unstable_getCurrentPriorityLevel,wf=Rn.unstable_ImmediatePriority,ov=Rn.unstable_UserBlockingPriority,hc=Rn.unstable_NormalPriority,Hy=Rn.unstable_LowPriority,av=Rn.unstable_IdlePriority,Gc=null,mi=null;function Vy(t){if(mi&&typeof mi.onCommitFiberRoot=="function")try{mi.onCommitFiberRoot(Gc,t,void 0,(t.current.flags&128)===128)}catch{}}var ni=Math.clz32?Math.clz32:Wy,jy=Math.log,Gy=Math.LN2;function Wy(t){return t>>>=0,t===0?32:31-(jy(t)/Gy|0)|0}var el=64,tl=4194304;function ia(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function fc(t,e){var n=t.pendingLanes;if(n===0)return 0;var i=0,r=t.suspendedLanes,s=t.pingedLanes,o=n&268435455;if(o!==0){var a=o&~r;a!==0?i=ia(a):(s&=o,s!==0&&(i=ia(s)))}else o=n&~r,o!==0?i=ia(o):s!==0&&(i=ia(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=i;0<e;)n=31-ni(e),r=1<<n,i|=t[n],e&=~r;return i}function Xy(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function qy(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,s=t.pendingLanes;0<s;){var o=31-ni(s),a=1<<o,l=r[o];l===-1?(!(a&n)||a&i)&&(r[o]=Xy(a,e)):l<=e&&(t.expiredLanes|=a),s&=~a}}function zd(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function lv(){var t=el;return el<<=1,!(el&4194240)&&(el=64),t}function _u(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Ba(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-ni(e),t[e]=n}function $y(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var i=t.eventTimes;for(t=t.expirationTimes;0<n;){var r=31-ni(n),s=1<<r;e[r]=0,i[r]=-1,t[r]=-1,n&=~s}}function Tf(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-ni(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}var tt=0;function cv(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var uv,bf,dv,hv,fv,Bd=!1,nl=[],ar=null,lr=null,cr=null,Ma=new Map,Ea=new Map,Ji=[],Yy="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Jp(t,e){switch(t){case"focusin":case"focusout":ar=null;break;case"dragenter":case"dragleave":lr=null;break;case"mouseover":case"mouseout":cr=null;break;case"pointerover":case"pointerout":Ma.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ea.delete(e.pointerId)}}function ko(t,e,n,i,r,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=Va(e),e!==null&&bf(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function Ky(t,e,n,i,r){switch(e){case"focusin":return ar=ko(ar,t,e,n,i,r),!0;case"dragenter":return lr=ko(lr,t,e,n,i,r),!0;case"mouseover":return cr=ko(cr,t,e,n,i,r),!0;case"pointerover":var s=r.pointerId;return Ma.set(s,ko(Ma.get(s)||null,t,e,n,i,r)),!0;case"gotpointercapture":return s=r.pointerId,Ea.set(s,ko(Ea.get(s)||null,t,e,n,i,r)),!0}return!1}function pv(t){var e=Vr(t.target);if(e!==null){var n=ss(e);if(n!==null){if(e=n.tag,e===13){if(e=nv(n),e!==null){t.blockedOn=e,fv(t.priority,function(){dv(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Wl(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Hd(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);Ud=i,n.target.dispatchEvent(i),Ud=null}else return e=Va(n),e!==null&&bf(e),t.blockedOn=n,!1;e.shift()}return!0}function em(t,e,n){Wl(t)&&n.delete(e)}function Zy(){Bd=!1,ar!==null&&Wl(ar)&&(ar=null),lr!==null&&Wl(lr)&&(lr=null),cr!==null&&Wl(cr)&&(cr=null),Ma.forEach(em),Ea.forEach(em)}function Fo(t,e){t.blockedOn===e&&(t.blockedOn=null,Bd||(Bd=!0,Rn.unstable_scheduleCallback(Rn.unstable_NormalPriority,Zy)))}function wa(t){function e(r){return Fo(r,t)}if(0<nl.length){Fo(nl[0],t);for(var n=1;n<nl.length;n++){var i=nl[n];i.blockedOn===t&&(i.blockedOn=null)}}for(ar!==null&&Fo(ar,t),lr!==null&&Fo(lr,t),cr!==null&&Fo(cr,t),Ma.forEach(e),Ea.forEach(e),n=0;n<Ji.length;n++)i=Ji[n],i.blockedOn===t&&(i.blockedOn=null);for(;0<Ji.length&&(n=Ji[0],n.blockedOn===null);)pv(n),n.blockedOn===null&&Ji.shift()}var Zs=Oi.ReactCurrentBatchConfig,pc=!0;function Qy(t,e,n,i){var r=tt,s=Zs.transition;Zs.transition=null;try{tt=1,Af(t,e,n,i)}finally{tt=r,Zs.transition=s}}function Jy(t,e,n,i){var r=tt,s=Zs.transition;Zs.transition=null;try{tt=4,Af(t,e,n,i)}finally{tt=r,Zs.transition=s}}function Af(t,e,n,i){if(pc){var r=Hd(t,e,n,i);if(r===null)Ru(t,e,i,mc,n),Jp(t,i);else if(Ky(r,t,e,n,i))i.stopPropagation();else if(Jp(t,i),e&4&&-1<Yy.indexOf(t)){for(;r!==null;){var s=Va(r);if(s!==null&&uv(s),s=Hd(t,e,n,i),s===null&&Ru(t,e,i,mc,n),s===r)break;r=s}r!==null&&i.stopPropagation()}else Ru(t,e,i,null,n)}}var mc=null;function Hd(t,e,n,i){if(mc=null,t=Ef(i),t=Vr(t),t!==null)if(e=ss(t),e===null)t=null;else if(n=e.tag,n===13){if(t=nv(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return mc=t,null}function mv(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(By()){case wf:return 1;case ov:return 4;case hc:case Hy:return 16;case av:return 536870912;default:return 16}default:return 16}}var nr=null,Cf=null,Xl=null;function gv(){if(Xl)return Xl;var t,e=Cf,n=e.length,i,r="value"in nr?nr.value:nr.textContent,s=r.length;for(t=0;t<n&&e[t]===r[t];t++);var o=n-t;for(i=1;i<=o&&e[n-i]===r[s-i];i++);return Xl=r.slice(t,1<i?1-i:void 0)}function ql(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function il(){return!0}function tm(){return!1}function Ln(t){function e(n,i,r,s,o){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var a in t)t.hasOwnProperty(a)&&(n=t[a],this[a]=n?n(s):s[a]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?il:tm,this.isPropagationStopped=tm,this}return Mt(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=il)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=il)},persist:function(){},isPersistent:il}),e}var wo={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Rf=Ln(wo),Ha=Mt({},wo,{view:0,detail:0}),eS=Ln(Ha),yu,Su,Oo,Wc=Mt({},Ha,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Pf,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Oo&&(Oo&&t.type==="mousemove"?(yu=t.screenX-Oo.screenX,Su=t.screenY-Oo.screenY):Su=yu=0,Oo=t),yu)},movementY:function(t){return"movementY"in t?t.movementY:Su}}),nm=Ln(Wc),tS=Mt({},Wc,{dataTransfer:0}),nS=Ln(tS),iS=Mt({},Ha,{relatedTarget:0}),Mu=Ln(iS),rS=Mt({},wo,{animationName:0,elapsedTime:0,pseudoElement:0}),sS=Ln(rS),oS=Mt({},wo,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),aS=Ln(oS),lS=Mt({},wo,{data:0}),im=Ln(lS),cS={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},uS={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},dS={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function hS(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=dS[t])?!!e[t]:!1}function Pf(){return hS}var fS=Mt({},Ha,{key:function(t){if(t.key){var e=cS[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=ql(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?uS[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Pf,charCode:function(t){return t.type==="keypress"?ql(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?ql(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),pS=Ln(fS),mS=Mt({},Wc,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),rm=Ln(mS),gS=Mt({},Ha,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Pf}),vS=Ln(gS),xS=Mt({},wo,{propertyName:0,elapsedTime:0,pseudoElement:0}),_S=Ln(xS),yS=Mt({},Wc,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),SS=Ln(yS),MS=[9,13,27,32],Lf=Ii&&"CompositionEvent"in window,ua=null;Ii&&"documentMode"in document&&(ua=document.documentMode);var ES=Ii&&"TextEvent"in window&&!ua,vv=Ii&&(!Lf||ua&&8<ua&&11>=ua),sm=" ",om=!1;function xv(t,e){switch(t){case"keyup":return MS.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function _v(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Us=!1;function wS(t,e){switch(t){case"compositionend":return _v(e);case"keypress":return e.which!==32?null:(om=!0,sm);case"textInput":return t=e.data,t===sm&&om?null:t;default:return null}}function TS(t,e){if(Us)return t==="compositionend"||!Lf&&xv(t,e)?(t=gv(),Xl=Cf=nr=null,Us=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return vv&&e.locale!=="ko"?null:e.data;default:return null}}var bS={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function am(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!bS[t.type]:e==="textarea"}function yv(t,e,n,i){Z0(i),e=gc(e,"onChange"),0<e.length&&(n=new Rf("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var da=null,Ta=null;function AS(t){Lv(t,0)}function Xc(t){var e=Os(t);if(G0(e))return t}function CS(t,e){if(t==="change")return e}var Sv=!1;if(Ii){var Eu;if(Ii){var wu="oninput"in document;if(!wu){var lm=document.createElement("div");lm.setAttribute("oninput","return;"),wu=typeof lm.oninput=="function"}Eu=wu}else Eu=!1;Sv=Eu&&(!document.documentMode||9<document.documentMode)}function cm(){da&&(da.detachEvent("onpropertychange",Mv),Ta=da=null)}function Mv(t){if(t.propertyName==="value"&&Xc(Ta)){var e=[];yv(e,Ta,t,Ef(t)),tv(AS,e)}}function RS(t,e,n){t==="focusin"?(cm(),da=e,Ta=n,da.attachEvent("onpropertychange",Mv)):t==="focusout"&&cm()}function PS(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Xc(Ta)}function LS(t,e){if(t==="click")return Xc(e)}function DS(t,e){if(t==="input"||t==="change")return Xc(e)}function IS(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var ri=typeof Object.is=="function"?Object.is:IS;function ba(t,e){if(ri(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!Ed.call(e,r)||!ri(t[r],e[r]))return!1}return!0}function um(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function dm(t,e){var n=um(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=um(n)}}function Ev(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?Ev(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function wv(){for(var t=window,e=cc();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=cc(t.document)}return e}function Df(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function NS(t){var e=wv(),n=t.focusedElem,i=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&Ev(n.ownerDocument.documentElement,n)){if(i!==null&&Df(n)){if(e=i.start,t=i.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var r=n.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!t.extend&&s>i&&(r=i,i=s,s=r),r=dm(n,s);var o=dm(n,i);r&&o&&(t.rangeCount!==1||t.anchorNode!==r.node||t.anchorOffset!==r.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),t.removeAllRanges(),s>i?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var US=Ii&&"documentMode"in document&&11>=document.documentMode,ks=null,Vd=null,ha=null,jd=!1;function hm(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;jd||ks==null||ks!==cc(i)||(i=ks,"selectionStart"in i&&Df(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),ha&&ba(ha,i)||(ha=i,i=gc(Vd,"onSelect"),0<i.length&&(e=new Rf("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=ks)))}function rl(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var Fs={animationend:rl("Animation","AnimationEnd"),animationiteration:rl("Animation","AnimationIteration"),animationstart:rl("Animation","AnimationStart"),transitionend:rl("Transition","TransitionEnd")},Tu={},Tv={};Ii&&(Tv=document.createElement("div").style,"AnimationEvent"in window||(delete Fs.animationend.animation,delete Fs.animationiteration.animation,delete Fs.animationstart.animation),"TransitionEvent"in window||delete Fs.transitionend.transition);function qc(t){if(Tu[t])return Tu[t];if(!Fs[t])return t;var e=Fs[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in Tv)return Tu[t]=e[n];return t}var bv=qc("animationend"),Av=qc("animationiteration"),Cv=qc("animationstart"),Rv=qc("transitionend"),Pv=new Map,fm="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Er(t,e){Pv.set(t,e),rs(e,[t])}for(var bu=0;bu<fm.length;bu++){var Au=fm[bu],kS=Au.toLowerCase(),FS=Au[0].toUpperCase()+Au.slice(1);Er(kS,"on"+FS)}Er(bv,"onAnimationEnd");Er(Av,"onAnimationIteration");Er(Cv,"onAnimationStart");Er("dblclick","onDoubleClick");Er("focusin","onFocus");Er("focusout","onBlur");Er(Rv,"onTransitionEnd");oo("onMouseEnter",["mouseout","mouseover"]);oo("onMouseLeave",["mouseout","mouseover"]);oo("onPointerEnter",["pointerout","pointerover"]);oo("onPointerLeave",["pointerout","pointerover"]);rs("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));rs("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));rs("onBeforeInput",["compositionend","keypress","textInput","paste"]);rs("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));rs("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));rs("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ra="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),OS=new Set("cancel close invalid load scroll toggle".split(" ").concat(ra));function pm(t,e,n){var i=t.type||"unknown-event";t.currentTarget=n,ky(i,e,void 0,t),t.currentTarget=null}function Lv(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var o=i.length-1;0<=o;o--){var a=i[o],l=a.instance,c=a.currentTarget;if(a=a.listener,l!==s&&r.isPropagationStopped())break e;pm(r,a,c),s=l}else for(o=0;o<i.length;o++){if(a=i[o],l=a.instance,c=a.currentTarget,a=a.listener,l!==s&&r.isPropagationStopped())break e;pm(r,a,c),s=l}}}if(dc)throw t=Od,dc=!1,Od=null,t}function mt(t,e){var n=e[$d];n===void 0&&(n=e[$d]=new Set);var i=t+"__bubble";n.has(i)||(Dv(e,t,2,!1),n.add(i))}function Cu(t,e,n){var i=0;e&&(i|=4),Dv(n,t,i,e)}var sl="_reactListening"+Math.random().toString(36).slice(2);function Aa(t){if(!t[sl]){t[sl]=!0,z0.forEach(function(n){n!=="selectionchange"&&(OS.has(n)||Cu(n,!1,t),Cu(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[sl]||(e[sl]=!0,Cu("selectionchange",!1,e))}}function Dv(t,e,n,i){switch(mv(e)){case 1:var r=Qy;break;case 4:r=Jy;break;default:r=Af}n=r.bind(null,e,n,t),r=void 0,!Fd||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function Ru(t,e,n,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var o=i.tag;if(o===3||o===4){var a=i.stateNode.containerInfo;if(a===r||a.nodeType===8&&a.parentNode===r)break;if(o===4)for(o=i.return;o!==null;){var l=o.tag;if((l===3||l===4)&&(l=o.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;o=o.return}for(;a!==null;){if(o=Vr(a),o===null)return;if(l=o.tag,l===5||l===6){i=s=o;continue e}a=a.parentNode}}i=i.return}tv(function(){var c=s,u=Ef(n),d=[];e:{var f=Pv.get(t);if(f!==void 0){var p=Rf,x=t;switch(t){case"keypress":if(ql(n)===0)break e;case"keydown":case"keyup":p=pS;break;case"focusin":x="focus",p=Mu;break;case"focusout":x="blur",p=Mu;break;case"beforeblur":case"afterblur":p=Mu;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=nm;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=nS;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=vS;break;case bv:case Av:case Cv:p=sS;break;case Rv:p=_S;break;case"scroll":p=eS;break;case"wheel":p=SS;break;case"copy":case"cut":case"paste":p=aS;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=rm}var v=(e&4)!==0,g=!v&&t==="scroll",h=v?f!==null?f+"Capture":null:f;v=[];for(var _=c,y;_!==null;){y=_;var S=y.stateNode;if(y.tag===5&&S!==null&&(y=S,h!==null&&(S=Sa(_,h),S!=null&&v.push(Ca(_,S,y)))),g)break;_=_.return}0<v.length&&(f=new p(f,x,null,n,u),d.push({event:f,listeners:v}))}}if(!(e&7)){e:{if(f=t==="mouseover"||t==="pointerover",p=t==="mouseout"||t==="pointerout",f&&n!==Ud&&(x=n.relatedTarget||n.fromElement)&&(Vr(x)||x[Ni]))break e;if((p||f)&&(f=u.window===u?u:(f=u.ownerDocument)?f.defaultView||f.parentWindow:window,p?(x=n.relatedTarget||n.toElement,p=c,x=x?Vr(x):null,x!==null&&(g=ss(x),x!==g||x.tag!==5&&x.tag!==6)&&(x=null)):(p=null,x=c),p!==x)){if(v=nm,S="onMouseLeave",h="onMouseEnter",_="mouse",(t==="pointerout"||t==="pointerover")&&(v=rm,S="onPointerLeave",h="onPointerEnter",_="pointer"),g=p==null?f:Os(p),y=x==null?f:Os(x),f=new v(S,_+"leave",p,n,u),f.target=g,f.relatedTarget=y,S=null,Vr(u)===c&&(v=new v(h,_+"enter",x,n,u),v.target=y,v.relatedTarget=g,S=v),g=S,p&&x)t:{for(v=p,h=x,_=0,y=v;y;y=hs(y))_++;for(y=0,S=h;S;S=hs(S))y++;for(;0<_-y;)v=hs(v),_--;for(;0<y-_;)h=hs(h),y--;for(;_--;){if(v===h||h!==null&&v===h.alternate)break t;v=hs(v),h=hs(h)}v=null}else v=null;p!==null&&mm(d,f,p,v,!1),x!==null&&g!==null&&mm(d,g,x,v,!0)}}e:{if(f=c?Os(c):window,p=f.nodeName&&f.nodeName.toLowerCase(),p==="select"||p==="input"&&f.type==="file")var C=CS;else if(am(f))if(Sv)C=DS;else{C=PS;var A=RS}else(p=f.nodeName)&&p.toLowerCase()==="input"&&(f.type==="checkbox"||f.type==="radio")&&(C=LS);if(C&&(C=C(t,c))){yv(d,C,n,u);break e}A&&A(t,f,c),t==="focusout"&&(A=f._wrapperState)&&A.controlled&&f.type==="number"&&Pd(f,"number",f.value)}switch(A=c?Os(c):window,t){case"focusin":(am(A)||A.contentEditable==="true")&&(ks=A,Vd=c,ha=null);break;case"focusout":ha=Vd=ks=null;break;case"mousedown":jd=!0;break;case"contextmenu":case"mouseup":case"dragend":jd=!1,hm(d,n,u);break;case"selectionchange":if(US)break;case"keydown":case"keyup":hm(d,n,u)}var b;if(Lf)e:{switch(t){case"compositionstart":var P="onCompositionStart";break e;case"compositionend":P="onCompositionEnd";break e;case"compositionupdate":P="onCompositionUpdate";break e}P=void 0}else Us?xv(t,n)&&(P="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(P="onCompositionStart");P&&(vv&&n.locale!=="ko"&&(Us||P!=="onCompositionStart"?P==="onCompositionEnd"&&Us&&(b=gv()):(nr=u,Cf="value"in nr?nr.value:nr.textContent,Us=!0)),A=gc(c,P),0<A.length&&(P=new im(P,t,null,n,u),d.push({event:P,listeners:A}),b?P.data=b:(b=_v(n),b!==null&&(P.data=b)))),(b=ES?wS(t,n):TS(t,n))&&(c=gc(c,"onBeforeInput"),0<c.length&&(u=new im("onBeforeInput","beforeinput",null,n,u),d.push({event:u,listeners:c}),u.data=b))}Lv(d,e)})}function Ca(t,e,n){return{instance:t,listener:e,currentTarget:n}}function gc(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=Sa(t,n),s!=null&&i.unshift(Ca(t,s,r)),s=Sa(t,e),s!=null&&i.push(Ca(t,s,r))),t=t.return}return i}function hs(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function mm(t,e,n,i,r){for(var s=e._reactName,o=[];n!==null&&n!==i;){var a=n,l=a.alternate,c=a.stateNode;if(l!==null&&l===i)break;a.tag===5&&c!==null&&(a=c,r?(l=Sa(n,s),l!=null&&o.unshift(Ca(n,l,a))):r||(l=Sa(n,s),l!=null&&o.push(Ca(n,l,a)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var zS=/\r\n?/g,BS=/\u0000|\uFFFD/g;function gm(t){return(typeof t=="string"?t:""+t).replace(zS,`
`).replace(BS,"")}function ol(t,e,n){if(e=gm(e),gm(t)!==e&&n)throw Error(ie(425))}function vc(){}var Gd=null,Wd=null;function Xd(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var qd=typeof setTimeout=="function"?setTimeout:void 0,HS=typeof clearTimeout=="function"?clearTimeout:void 0,vm=typeof Promise=="function"?Promise:void 0,VS=typeof queueMicrotask=="function"?queueMicrotask:typeof vm<"u"?function(t){return vm.resolve(null).then(t).catch(jS)}:qd;function jS(t){setTimeout(function(){throw t})}function Pu(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(i===0){t.removeChild(r),wa(e);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=r}while(n);wa(e)}function ur(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function xm(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var To=Math.random().toString(36).slice(2),ci="__reactFiber$"+To,Ra="__reactProps$"+To,Ni="__reactContainer$"+To,$d="__reactEvents$"+To,GS="__reactListeners$"+To,WS="__reactHandles$"+To;function Vr(t){var e=t[ci];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Ni]||n[ci]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=xm(t);t!==null;){if(n=t[ci])return n;t=xm(t)}return e}t=n,n=t.parentNode}return null}function Va(t){return t=t[ci]||t[Ni],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function Os(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(ie(33))}function $c(t){return t[Ra]||null}var Yd=[],zs=-1;function wr(t){return{current:t}}function gt(t){0>zs||(t.current=Yd[zs],Yd[zs]=null,zs--)}function dt(t,e){zs++,Yd[zs]=t.current,t.current=e}var yr={},en=wr(yr),pn=wr(!1),Yr=yr;function ao(t,e){var n=t.type.contextTypes;if(!n)return yr;var i=t.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in n)r[s]=e[s];return i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=r),r}function mn(t){return t=t.childContextTypes,t!=null}function xc(){gt(pn),gt(en)}function _m(t,e,n){if(en.current!==yr)throw Error(ie(168));dt(en,e),dt(pn,n)}function Iv(t,e,n){var i=t.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(ie(108,Ry(t)||"Unknown",r));return Mt({},n,i)}function _c(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||yr,Yr=en.current,dt(en,t),dt(pn,pn.current),!0}function ym(t,e,n){var i=t.stateNode;if(!i)throw Error(ie(169));n?(t=Iv(t,e,Yr),i.__reactInternalMemoizedMergedChildContext=t,gt(pn),gt(en),dt(en,t)):gt(pn),dt(pn,n)}var Ai=null,Yc=!1,Lu=!1;function Nv(t){Ai===null?Ai=[t]:Ai.push(t)}function XS(t){Yc=!0,Nv(t)}function Tr(){if(!Lu&&Ai!==null){Lu=!0;var t=0,e=tt;try{var n=Ai;for(tt=1;t<n.length;t++){var i=n[t];do i=i(!0);while(i!==null)}Ai=null,Yc=!1}catch(r){throw Ai!==null&&(Ai=Ai.slice(t+1)),sv(wf,Tr),r}finally{tt=e,Lu=!1}}return null}var Bs=[],Hs=0,yc=null,Sc=0,Un=[],kn=0,Kr=null,Ci=1,Ri="";function Ur(t,e){Bs[Hs++]=Sc,Bs[Hs++]=yc,yc=t,Sc=e}function Uv(t,e,n){Un[kn++]=Ci,Un[kn++]=Ri,Un[kn++]=Kr,Kr=t;var i=Ci;t=Ri;var r=32-ni(i)-1;i&=~(1<<r),n+=1;var s=32-ni(e)+r;if(30<s){var o=r-r%5;s=(i&(1<<o)-1).toString(32),i>>=o,r-=o,Ci=1<<32-ni(e)+r|n<<r|i,Ri=s+t}else Ci=1<<s|n<<r|i,Ri=t}function If(t){t.return!==null&&(Ur(t,1),Uv(t,1,0))}function Nf(t){for(;t===yc;)yc=Bs[--Hs],Bs[Hs]=null,Sc=Bs[--Hs],Bs[Hs]=null;for(;t===Kr;)Kr=Un[--kn],Un[kn]=null,Ri=Un[--kn],Un[kn]=null,Ci=Un[--kn],Un[kn]=null}var An=null,bn=null,vt=!1,ei=null;function kv(t,e){var n=zn(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function Sm(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,An=t,bn=ur(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,An=t,bn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Kr!==null?{id:Ci,overflow:Ri}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=zn(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,An=t,bn=null,!0):!1;default:return!1}}function Kd(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Zd(t){if(vt){var e=bn;if(e){var n=e;if(!Sm(t,e)){if(Kd(t))throw Error(ie(418));e=ur(n.nextSibling);var i=An;e&&Sm(t,e)?kv(i,n):(t.flags=t.flags&-4097|2,vt=!1,An=t)}}else{if(Kd(t))throw Error(ie(418));t.flags=t.flags&-4097|2,vt=!1,An=t}}}function Mm(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;An=t}function al(t){if(t!==An)return!1;if(!vt)return Mm(t),vt=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Xd(t.type,t.memoizedProps)),e&&(e=bn)){if(Kd(t))throw Fv(),Error(ie(418));for(;e;)kv(t,e),e=ur(e.nextSibling)}if(Mm(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(ie(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){bn=ur(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}bn=null}}else bn=An?ur(t.stateNode.nextSibling):null;return!0}function Fv(){for(var t=bn;t;)t=ur(t.nextSibling)}function lo(){bn=An=null,vt=!1}function Uf(t){ei===null?ei=[t]:ei.push(t)}var qS=Oi.ReactCurrentBatchConfig;function zo(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(ie(309));var i=n.stateNode}if(!i)throw Error(ie(147,t));var r=i,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var a=r.refs;o===null?delete a[s]:a[s]=o},e._stringRef=s,e)}if(typeof t!="string")throw Error(ie(284));if(!n._owner)throw Error(ie(290,t))}return t}function ll(t,e){throw t=Object.prototype.toString.call(e),Error(ie(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function Em(t){var e=t._init;return e(t._payload)}function Ov(t){function e(h,_){if(t){var y=h.deletions;y===null?(h.deletions=[_],h.flags|=16):y.push(_)}}function n(h,_){if(!t)return null;for(;_!==null;)e(h,_),_=_.sibling;return null}function i(h,_){for(h=new Map;_!==null;)_.key!==null?h.set(_.key,_):h.set(_.index,_),_=_.sibling;return h}function r(h,_){return h=pr(h,_),h.index=0,h.sibling=null,h}function s(h,_,y){return h.index=y,t?(y=h.alternate,y!==null?(y=y.index,y<_?(h.flags|=2,_):y):(h.flags|=2,_)):(h.flags|=1048576,_)}function o(h){return t&&h.alternate===null&&(h.flags|=2),h}function a(h,_,y,S){return _===null||_.tag!==6?(_=Ou(y,h.mode,S),_.return=h,_):(_=r(_,y),_.return=h,_)}function l(h,_,y,S){var C=y.type;return C===Ns?u(h,_,y.props.children,S,y.key):_!==null&&(_.elementType===C||typeof C=="object"&&C!==null&&C.$$typeof===Ki&&Em(C)===_.type)?(S=r(_,y.props),S.ref=zo(h,_,y),S.return=h,S):(S=ec(y.type,y.key,y.props,null,h.mode,S),S.ref=zo(h,_,y),S.return=h,S)}function c(h,_,y,S){return _===null||_.tag!==4||_.stateNode.containerInfo!==y.containerInfo||_.stateNode.implementation!==y.implementation?(_=zu(y,h.mode,S),_.return=h,_):(_=r(_,y.children||[]),_.return=h,_)}function u(h,_,y,S,C){return _===null||_.tag!==7?(_=$r(y,h.mode,S,C),_.return=h,_):(_=r(_,y),_.return=h,_)}function d(h,_,y){if(typeof _=="string"&&_!==""||typeof _=="number")return _=Ou(""+_,h.mode,y),_.return=h,_;if(typeof _=="object"&&_!==null){switch(_.$$typeof){case Za:return y=ec(_.type,_.key,_.props,null,h.mode,y),y.ref=zo(h,null,_),y.return=h,y;case Is:return _=zu(_,h.mode,y),_.return=h,_;case Ki:var S=_._init;return d(h,S(_._payload),y)}if(na(_)||No(_))return _=$r(_,h.mode,y,null),_.return=h,_;ll(h,_)}return null}function f(h,_,y,S){var C=_!==null?_.key:null;if(typeof y=="string"&&y!==""||typeof y=="number")return C!==null?null:a(h,_,""+y,S);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case Za:return y.key===C?l(h,_,y,S):null;case Is:return y.key===C?c(h,_,y,S):null;case Ki:return C=y._init,f(h,_,C(y._payload),S)}if(na(y)||No(y))return C!==null?null:u(h,_,y,S,null);ll(h,y)}return null}function p(h,_,y,S,C){if(typeof S=="string"&&S!==""||typeof S=="number")return h=h.get(y)||null,a(_,h,""+S,C);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case Za:return h=h.get(S.key===null?y:S.key)||null,l(_,h,S,C);case Is:return h=h.get(S.key===null?y:S.key)||null,c(_,h,S,C);case Ki:var A=S._init;return p(h,_,y,A(S._payload),C)}if(na(S)||No(S))return h=h.get(y)||null,u(_,h,S,C,null);ll(_,S)}return null}function x(h,_,y,S){for(var C=null,A=null,b=_,P=_=0,T=null;b!==null&&P<y.length;P++){b.index>P?(T=b,b=null):T=b.sibling;var M=f(h,b,y[P],S);if(M===null){b===null&&(b=T);break}t&&b&&M.alternate===null&&e(h,b),_=s(M,_,P),A===null?C=M:A.sibling=M,A=M,b=T}if(P===y.length)return n(h,b),vt&&Ur(h,P),C;if(b===null){for(;P<y.length;P++)b=d(h,y[P],S),b!==null&&(_=s(b,_,P),A===null?C=b:A.sibling=b,A=b);return vt&&Ur(h,P),C}for(b=i(h,b);P<y.length;P++)T=p(b,h,P,y[P],S),T!==null&&(t&&T.alternate!==null&&b.delete(T.key===null?P:T.key),_=s(T,_,P),A===null?C=T:A.sibling=T,A=T);return t&&b.forEach(function(L){return e(h,L)}),vt&&Ur(h,P),C}function v(h,_,y,S){var C=No(y);if(typeof C!="function")throw Error(ie(150));if(y=C.call(y),y==null)throw Error(ie(151));for(var A=C=null,b=_,P=_=0,T=null,M=y.next();b!==null&&!M.done;P++,M=y.next()){b.index>P?(T=b,b=null):T=b.sibling;var L=f(h,b,M.value,S);if(L===null){b===null&&(b=T);break}t&&b&&L.alternate===null&&e(h,b),_=s(L,_,P),A===null?C=L:A.sibling=L,A=L,b=T}if(M.done)return n(h,b),vt&&Ur(h,P),C;if(b===null){for(;!M.done;P++,M=y.next())M=d(h,M.value,S),M!==null&&(_=s(M,_,P),A===null?C=M:A.sibling=M,A=M);return vt&&Ur(h,P),C}for(b=i(h,b);!M.done;P++,M=y.next())M=p(b,h,P,M.value,S),M!==null&&(t&&M.alternate!==null&&b.delete(M.key===null?P:M.key),_=s(M,_,P),A===null?C=M:A.sibling=M,A=M);return t&&b.forEach(function(j){return e(h,j)}),vt&&Ur(h,P),C}function g(h,_,y,S){if(typeof y=="object"&&y!==null&&y.type===Ns&&y.key===null&&(y=y.props.children),typeof y=="object"&&y!==null){switch(y.$$typeof){case Za:e:{for(var C=y.key,A=_;A!==null;){if(A.key===C){if(C=y.type,C===Ns){if(A.tag===7){n(h,A.sibling),_=r(A,y.props.children),_.return=h,h=_;break e}}else if(A.elementType===C||typeof C=="object"&&C!==null&&C.$$typeof===Ki&&Em(C)===A.type){n(h,A.sibling),_=r(A,y.props),_.ref=zo(h,A,y),_.return=h,h=_;break e}n(h,A);break}else e(h,A);A=A.sibling}y.type===Ns?(_=$r(y.props.children,h.mode,S,y.key),_.return=h,h=_):(S=ec(y.type,y.key,y.props,null,h.mode,S),S.ref=zo(h,_,y),S.return=h,h=S)}return o(h);case Is:e:{for(A=y.key;_!==null;){if(_.key===A)if(_.tag===4&&_.stateNode.containerInfo===y.containerInfo&&_.stateNode.implementation===y.implementation){n(h,_.sibling),_=r(_,y.children||[]),_.return=h,h=_;break e}else{n(h,_);break}else e(h,_);_=_.sibling}_=zu(y,h.mode,S),_.return=h,h=_}return o(h);case Ki:return A=y._init,g(h,_,A(y._payload),S)}if(na(y))return x(h,_,y,S);if(No(y))return v(h,_,y,S);ll(h,y)}return typeof y=="string"&&y!==""||typeof y=="number"?(y=""+y,_!==null&&_.tag===6?(n(h,_.sibling),_=r(_,y),_.return=h,h=_):(n(h,_),_=Ou(y,h.mode,S),_.return=h,h=_),o(h)):n(h,_)}return g}var co=Ov(!0),zv=Ov(!1),Mc=wr(null),Ec=null,Vs=null,kf=null;function Ff(){kf=Vs=Ec=null}function Of(t){var e=Mc.current;gt(Mc),t._currentValue=e}function Qd(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function Qs(t,e){Ec=t,kf=Vs=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(fn=!0),t.firstContext=null)}function Gn(t){var e=t._currentValue;if(kf!==t)if(t={context:t,memoizedValue:e,next:null},Vs===null){if(Ec===null)throw Error(ie(308));Vs=t,Ec.dependencies={lanes:0,firstContext:t}}else Vs=Vs.next=t;return e}var jr=null;function zf(t){jr===null?jr=[t]:jr.push(t)}function Bv(t,e,n,i){var r=e.interleaved;return r===null?(n.next=n,zf(e)):(n.next=r.next,r.next=n),e.interleaved=n,Ui(t,i)}function Ui(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var Zi=!1;function Bf(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Hv(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Li(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function dr(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,$e&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,Ui(t,n)}return r=i.interleaved,r===null?(e.next=e,zf(i)):(e.next=r.next,r.next=e),i.interleaved=e,Ui(t,n)}function $l(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,Tf(t,n)}}function wm(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?r=s=o:s=s.next=o,n=n.next}while(n!==null);s===null?r=s=e:s=s.next=e}else r=s=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function wc(t,e,n,i){var r=t.updateQueue;Zi=!1;var s=r.firstBaseUpdate,o=r.lastBaseUpdate,a=r.shared.pending;if(a!==null){r.shared.pending=null;var l=a,c=l.next;l.next=null,o===null?s=c:o.next=c,o=l;var u=t.alternate;u!==null&&(u=u.updateQueue,a=u.lastBaseUpdate,a!==o&&(a===null?u.firstBaseUpdate=c:a.next=c,u.lastBaseUpdate=l))}if(s!==null){var d=r.baseState;o=0,u=c=l=null,a=s;do{var f=a.lane,p=a.eventTime;if((i&f)===f){u!==null&&(u=u.next={eventTime:p,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var x=t,v=a;switch(f=e,p=n,v.tag){case 1:if(x=v.payload,typeof x=="function"){d=x.call(p,d,f);break e}d=x;break e;case 3:x.flags=x.flags&-65537|128;case 0:if(x=v.payload,f=typeof x=="function"?x.call(p,d,f):x,f==null)break e;d=Mt({},d,f);break e;case 2:Zi=!0}}a.callback!==null&&a.lane!==0&&(t.flags|=64,f=r.effects,f===null?r.effects=[a]:f.push(a))}else p={eventTime:p,lane:f,tag:a.tag,payload:a.payload,callback:a.callback,next:null},u===null?(c=u=p,l=d):u=u.next=p,o|=f;if(a=a.next,a===null){if(a=r.shared.pending,a===null)break;f=a,a=f.next,f.next=null,r.lastBaseUpdate=f,r.shared.pending=null}}while(!0);if(u===null&&(l=d),r.baseState=l,r.firstBaseUpdate=c,r.lastBaseUpdate=u,e=r.shared.interleaved,e!==null){r=e;do o|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);Qr|=o,t.lanes=o,t.memoizedState=d}}function Tm(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var i=t[e],r=i.callback;if(r!==null){if(i.callback=null,i=n,typeof r!="function")throw Error(ie(191,r));r.call(i)}}}var ja={},gi=wr(ja),Pa=wr(ja),La=wr(ja);function Gr(t){if(t===ja)throw Error(ie(174));return t}function Hf(t,e){switch(dt(La,e),dt(Pa,t),dt(gi,ja),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Dd(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=Dd(e,t)}gt(gi),dt(gi,e)}function uo(){gt(gi),gt(Pa),gt(La)}function Vv(t){Gr(La.current);var e=Gr(gi.current),n=Dd(e,t.type);e!==n&&(dt(Pa,t),dt(gi,n))}function Vf(t){Pa.current===t&&(gt(gi),gt(Pa))}var yt=wr(0);function Tc(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Du=[];function jf(){for(var t=0;t<Du.length;t++)Du[t]._workInProgressVersionPrimary=null;Du.length=0}var Yl=Oi.ReactCurrentDispatcher,Iu=Oi.ReactCurrentBatchConfig,Zr=0,St=null,Nt=null,Bt=null,bc=!1,fa=!1,Da=0,$S=0;function $t(){throw Error(ie(321))}function Gf(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!ri(t[n],e[n]))return!1;return!0}function Wf(t,e,n,i,r,s){if(Zr=s,St=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Yl.current=t===null||t.memoizedState===null?QS:JS,t=n(i,r),fa){s=0;do{if(fa=!1,Da=0,25<=s)throw Error(ie(301));s+=1,Bt=Nt=null,e.updateQueue=null,Yl.current=eM,t=n(i,r)}while(fa)}if(Yl.current=Ac,e=Nt!==null&&Nt.next!==null,Zr=0,Bt=Nt=St=null,bc=!1,e)throw Error(ie(300));return t}function Xf(){var t=Da!==0;return Da=0,t}function ai(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Bt===null?St.memoizedState=Bt=t:Bt=Bt.next=t,Bt}function Wn(){if(Nt===null){var t=St.alternate;t=t!==null?t.memoizedState:null}else t=Nt.next;var e=Bt===null?St.memoizedState:Bt.next;if(e!==null)Bt=e,Nt=t;else{if(t===null)throw Error(ie(310));Nt=t,t={memoizedState:Nt.memoizedState,baseState:Nt.baseState,baseQueue:Nt.baseQueue,queue:Nt.queue,next:null},Bt===null?St.memoizedState=Bt=t:Bt=Bt.next=t}return Bt}function Ia(t,e){return typeof e=="function"?e(t):e}function Nu(t){var e=Wn(),n=e.queue;if(n===null)throw Error(ie(311));n.lastRenderedReducer=t;var i=Nt,r=i.baseQueue,s=n.pending;if(s!==null){if(r!==null){var o=r.next;r.next=s.next,s.next=o}i.baseQueue=r=s,n.pending=null}if(r!==null){s=r.next,i=i.baseState;var a=o=null,l=null,c=s;do{var u=c.lane;if((Zr&u)===u)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),i=c.hasEagerState?c.eagerState:t(i,c.action);else{var d={lane:u,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(a=l=d,o=i):l=l.next=d,St.lanes|=u,Qr|=u}c=c.next}while(c!==null&&c!==s);l===null?o=i:l.next=a,ri(i,e.memoizedState)||(fn=!0),e.memoizedState=i,e.baseState=o,e.baseQueue=l,n.lastRenderedState=i}if(t=n.interleaved,t!==null){r=t;do s=r.lane,St.lanes|=s,Qr|=s,r=r.next;while(r!==t)}else r===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function Uu(t){var e=Wn(),n=e.queue;if(n===null)throw Error(ie(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,s=e.memoizedState;if(r!==null){n.pending=null;var o=r=r.next;do s=t(s,o.action),o=o.next;while(o!==r);ri(s,e.memoizedState)||(fn=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function jv(){}function Gv(t,e){var n=St,i=Wn(),r=e(),s=!ri(i.memoizedState,r);if(s&&(i.memoizedState=r,fn=!0),i=i.queue,qf(qv.bind(null,n,i,t),[t]),i.getSnapshot!==e||s||Bt!==null&&Bt.memoizedState.tag&1){if(n.flags|=2048,Na(9,Xv.bind(null,n,i,r,e),void 0,null),Ht===null)throw Error(ie(349));Zr&30||Wv(n,e,r)}return r}function Wv(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=St.updateQueue,e===null?(e={lastEffect:null,stores:null},St.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function Xv(t,e,n,i){e.value=n,e.getSnapshot=i,$v(e)&&Yv(t)}function qv(t,e,n){return n(function(){$v(e)&&Yv(t)})}function $v(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!ri(t,n)}catch{return!0}}function Yv(t){var e=Ui(t,1);e!==null&&ii(e,t,1,-1)}function bm(t){var e=ai();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Ia,lastRenderedState:t},e.queue=t,t=t.dispatch=ZS.bind(null,St,t),[e.memoizedState,t]}function Na(t,e,n,i){return t={tag:t,create:e,destroy:n,deps:i,next:null},e=St.updateQueue,e===null?(e={lastEffect:null,stores:null},St.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t)),t}function Kv(){return Wn().memoizedState}function Kl(t,e,n,i){var r=ai();St.flags|=t,r.memoizedState=Na(1|e,n,void 0,i===void 0?null:i)}function Kc(t,e,n,i){var r=Wn();i=i===void 0?null:i;var s=void 0;if(Nt!==null){var o=Nt.memoizedState;if(s=o.destroy,i!==null&&Gf(i,o.deps)){r.memoizedState=Na(e,n,s,i);return}}St.flags|=t,r.memoizedState=Na(1|e,n,s,i)}function Am(t,e){return Kl(8390656,8,t,e)}function qf(t,e){return Kc(2048,8,t,e)}function Zv(t,e){return Kc(4,2,t,e)}function Qv(t,e){return Kc(4,4,t,e)}function Jv(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function ex(t,e,n){return n=n!=null?n.concat([t]):null,Kc(4,4,Jv.bind(null,e,t),n)}function $f(){}function tx(t,e){var n=Wn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&Gf(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function nx(t,e){var n=Wn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&Gf(e,i[1])?i[0]:(t=t(),n.memoizedState=[t,e],t)}function ix(t,e,n){return Zr&21?(ri(n,e)||(n=lv(),St.lanes|=n,Qr|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,fn=!0),t.memoizedState=n)}function YS(t,e){var n=tt;tt=n!==0&&4>n?n:4,t(!0);var i=Iu.transition;Iu.transition={};try{t(!1),e()}finally{tt=n,Iu.transition=i}}function rx(){return Wn().memoizedState}function KS(t,e,n){var i=fr(t);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},sx(t))ox(e,n);else if(n=Bv(t,e,n,i),n!==null){var r=an();ii(n,t,i,r),ax(n,e,i)}}function ZS(t,e,n){var i=fr(t),r={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(sx(t))ox(e,r);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,a=s(o,n);if(r.hasEagerState=!0,r.eagerState=a,ri(a,o)){var l=e.interleaved;l===null?(r.next=r,zf(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}n=Bv(t,e,r,i),n!==null&&(r=an(),ii(n,t,i,r),ax(n,e,i))}}function sx(t){var e=t.alternate;return t===St||e!==null&&e===St}function ox(t,e){fa=bc=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function ax(t,e,n){if(n&4194240){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,Tf(t,n)}}var Ac={readContext:Gn,useCallback:$t,useContext:$t,useEffect:$t,useImperativeHandle:$t,useInsertionEffect:$t,useLayoutEffect:$t,useMemo:$t,useReducer:$t,useRef:$t,useState:$t,useDebugValue:$t,useDeferredValue:$t,useTransition:$t,useMutableSource:$t,useSyncExternalStore:$t,useId:$t,unstable_isNewReconciler:!1},QS={readContext:Gn,useCallback:function(t,e){return ai().memoizedState=[t,e===void 0?null:e],t},useContext:Gn,useEffect:Am,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,Kl(4194308,4,Jv.bind(null,e,t),n)},useLayoutEffect:function(t,e){return Kl(4194308,4,t,e)},useInsertionEffect:function(t,e){return Kl(4,2,t,e)},useMemo:function(t,e){var n=ai();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var i=ai();return e=n!==void 0?n(e):e,i.memoizedState=i.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},i.queue=t,t=t.dispatch=KS.bind(null,St,t),[i.memoizedState,t]},useRef:function(t){var e=ai();return t={current:t},e.memoizedState=t},useState:bm,useDebugValue:$f,useDeferredValue:function(t){return ai().memoizedState=t},useTransition:function(){var t=bm(!1),e=t[0];return t=YS.bind(null,t[1]),ai().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var i=St,r=ai();if(vt){if(n===void 0)throw Error(ie(407));n=n()}else{if(n=e(),Ht===null)throw Error(ie(349));Zr&30||Wv(i,e,n)}r.memoizedState=n;var s={value:n,getSnapshot:e};return r.queue=s,Am(qv.bind(null,i,s,t),[t]),i.flags|=2048,Na(9,Xv.bind(null,i,s,n,e),void 0,null),n},useId:function(){var t=ai(),e=Ht.identifierPrefix;if(vt){var n=Ri,i=Ci;n=(i&~(1<<32-ni(i)-1)).toString(32)+n,e=":"+e+"R"+n,n=Da++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=$S++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},JS={readContext:Gn,useCallback:tx,useContext:Gn,useEffect:qf,useImperativeHandle:ex,useInsertionEffect:Zv,useLayoutEffect:Qv,useMemo:nx,useReducer:Nu,useRef:Kv,useState:function(){return Nu(Ia)},useDebugValue:$f,useDeferredValue:function(t){var e=Wn();return ix(e,Nt.memoizedState,t)},useTransition:function(){var t=Nu(Ia)[0],e=Wn().memoizedState;return[t,e]},useMutableSource:jv,useSyncExternalStore:Gv,useId:rx,unstable_isNewReconciler:!1},eM={readContext:Gn,useCallback:tx,useContext:Gn,useEffect:qf,useImperativeHandle:ex,useInsertionEffect:Zv,useLayoutEffect:Qv,useMemo:nx,useReducer:Uu,useRef:Kv,useState:function(){return Uu(Ia)},useDebugValue:$f,useDeferredValue:function(t){var e=Wn();return Nt===null?e.memoizedState=t:ix(e,Nt.memoizedState,t)},useTransition:function(){var t=Uu(Ia)[0],e=Wn().memoizedState;return[t,e]},useMutableSource:jv,useSyncExternalStore:Gv,useId:rx,unstable_isNewReconciler:!1};function Qn(t,e){if(t&&t.defaultProps){e=Mt({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function Jd(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:Mt({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Zc={isMounted:function(t){return(t=t._reactInternals)?ss(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var i=an(),r=fr(t),s=Li(i,r);s.payload=e,n!=null&&(s.callback=n),e=dr(t,s,r),e!==null&&(ii(e,t,r,i),$l(e,t,r))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=an(),r=fr(t),s=Li(i,r);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=dr(t,s,r),e!==null&&(ii(e,t,r,i),$l(e,t,r))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=an(),i=fr(t),r=Li(n,i);r.tag=2,e!=null&&(r.callback=e),e=dr(t,r,i),e!==null&&(ii(e,t,i,n),$l(e,t,i))}};function Cm(t,e,n,i,r,s,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,o):e.prototype&&e.prototype.isPureReactComponent?!ba(n,i)||!ba(r,s):!0}function lx(t,e,n){var i=!1,r=yr,s=e.contextType;return typeof s=="object"&&s!==null?s=Gn(s):(r=mn(e)?Yr:en.current,i=e.contextTypes,s=(i=i!=null)?ao(t,r):yr),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=Zc,t.stateNode=e,e._reactInternals=t,i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=s),e}function Rm(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&Zc.enqueueReplaceState(e,e.state,null)}function eh(t,e,n,i){var r=t.stateNode;r.props=n,r.state=t.memoizedState,r.refs={},Bf(t);var s=e.contextType;typeof s=="object"&&s!==null?r.context=Gn(s):(s=mn(e)?Yr:en.current,r.context=ao(t,s)),r.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(Jd(t,e,s,n),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&Zc.enqueueReplaceState(r,r.state,null),wc(t,n,r,i),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308)}function ho(t,e){try{var n="",i=e;do n+=Cy(i),i=i.return;while(i);var r=n}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:r,digest:null}}function ku(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function th(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var tM=typeof WeakMap=="function"?WeakMap:Map;function cx(t,e,n){n=Li(-1,n),n.tag=3,n.payload={element:null};var i=e.value;return n.callback=function(){Rc||(Rc=!0,dh=i),th(t,e)},n}function ux(t,e,n){n=Li(-1,n),n.tag=3;var i=t.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;n.payload=function(){return i(r)},n.callback=function(){th(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){th(t,e),typeof i!="function"&&(hr===null?hr=new Set([this]):hr.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function Pm(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new tM;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(r.add(n),t=mM.bind(null,t,e,n),e.then(t,t))}function Lm(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function Dm(t,e,n,i,r){return t.mode&1?(t.flags|=65536,t.lanes=r,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=Li(-1,1),e.tag=2,dr(n,e,1))),n.lanes|=1),t)}var nM=Oi.ReactCurrentOwner,fn=!1;function sn(t,e,n,i){e.child=t===null?zv(e,null,n,i):co(e,t.child,n,i)}function Im(t,e,n,i,r){n=n.render;var s=e.ref;return Qs(e,r),i=Wf(t,e,n,i,s,r),n=Xf(),t!==null&&!fn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,ki(t,e,r)):(vt&&n&&If(e),e.flags|=1,sn(t,e,i,r),e.child)}function Nm(t,e,n,i,r){if(t===null){var s=n.type;return typeof s=="function"&&!np(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,dx(t,e,s,i,r)):(t=ec(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&r)){var o=s.memoizedProps;if(n=n.compare,n=n!==null?n:ba,n(o,i)&&t.ref===e.ref)return ki(t,e,r)}return e.flags|=1,t=pr(s,i),t.ref=e.ref,t.return=e,e.child=t}function dx(t,e,n,i,r){if(t!==null){var s=t.memoizedProps;if(ba(s,i)&&t.ref===e.ref)if(fn=!1,e.pendingProps=i=s,(t.lanes&r)!==0)t.flags&131072&&(fn=!0);else return e.lanes=t.lanes,ki(t,e,r)}return nh(t,e,n,i,r)}function hx(t,e,n){var i=e.pendingProps,r=i.children,s=t!==null?t.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},dt(Gs,En),En|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,dt(Gs,En),En|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:n,dt(Gs,En),En|=i}else s!==null?(i=s.baseLanes|n,e.memoizedState=null):i=n,dt(Gs,En),En|=i;return sn(t,e,r,n),e.child}function fx(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function nh(t,e,n,i,r){var s=mn(n)?Yr:en.current;return s=ao(e,s),Qs(e,r),n=Wf(t,e,n,i,s,r),i=Xf(),t!==null&&!fn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,ki(t,e,r)):(vt&&i&&If(e),e.flags|=1,sn(t,e,n,r),e.child)}function Um(t,e,n,i,r){if(mn(n)){var s=!0;_c(e)}else s=!1;if(Qs(e,r),e.stateNode===null)Zl(t,e),lx(e,n,i),eh(e,n,i,r),i=!0;else if(t===null){var o=e.stateNode,a=e.memoizedProps;o.props=a;var l=o.context,c=n.contextType;typeof c=="object"&&c!==null?c=Gn(c):(c=mn(n)?Yr:en.current,c=ao(e,c));var u=n.getDerivedStateFromProps,d=typeof u=="function"||typeof o.getSnapshotBeforeUpdate=="function";d||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==i||l!==c)&&Rm(e,o,i,c),Zi=!1;var f=e.memoizedState;o.state=f,wc(e,i,o,r),l=e.memoizedState,a!==i||f!==l||pn.current||Zi?(typeof u=="function"&&(Jd(e,n,u,i),l=e.memoizedState),(a=Zi||Cm(e,n,a,i,f,l,c))?(d||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),o.props=i,o.state=l,o.context=c,i=a):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{o=e.stateNode,Hv(t,e),a=e.memoizedProps,c=e.type===e.elementType?a:Qn(e.type,a),o.props=c,d=e.pendingProps,f=o.context,l=n.contextType,typeof l=="object"&&l!==null?l=Gn(l):(l=mn(n)?Yr:en.current,l=ao(e,l));var p=n.getDerivedStateFromProps;(u=typeof p=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==d||f!==l)&&Rm(e,o,i,l),Zi=!1,f=e.memoizedState,o.state=f,wc(e,i,o,r);var x=e.memoizedState;a!==d||f!==x||pn.current||Zi?(typeof p=="function"&&(Jd(e,n,p,i),x=e.memoizedState),(c=Zi||Cm(e,n,c,i,f,x,l)||!1)?(u||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(i,x,l),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(i,x,l)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&f===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&f===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=x),o.props=i,o.state=x,o.context=l,i=c):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&f===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&f===t.memoizedState||(e.flags|=1024),i=!1)}return ih(t,e,n,i,s,r)}function ih(t,e,n,i,r,s){fx(t,e);var o=(e.flags&128)!==0;if(!i&&!o)return r&&ym(e,n,!1),ki(t,e,s);i=e.stateNode,nM.current=e;var a=o&&typeof n.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,t!==null&&o?(e.child=co(e,t.child,null,s),e.child=co(e,null,a,s)):sn(t,e,a,s),e.memoizedState=i.state,r&&ym(e,n,!0),e.child}function px(t){var e=t.stateNode;e.pendingContext?_m(t,e.pendingContext,e.pendingContext!==e.context):e.context&&_m(t,e.context,!1),Hf(t,e.containerInfo)}function km(t,e,n,i,r){return lo(),Uf(r),e.flags|=256,sn(t,e,n,i),e.child}var rh={dehydrated:null,treeContext:null,retryLane:0};function sh(t){return{baseLanes:t,cachePool:null,transitions:null}}function mx(t,e,n){var i=e.pendingProps,r=yt.current,s=!1,o=(e.flags&128)!==0,a;if((a=o)||(a=t!==null&&t.memoizedState===null?!1:(r&2)!==0),a?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(r|=1),dt(yt,r&1),t===null)return Zd(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=i.children,t=i.fallback,s?(i=e.mode,s=e.child,o={mode:"hidden",children:o},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=eu(o,i,0,null),t=$r(t,i,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=sh(n),e.memoizedState=rh,t):Yf(e,o));if(r=t.memoizedState,r!==null&&(a=r.dehydrated,a!==null))return iM(t,e,o,i,a,r,n);if(s){s=i.fallback,o=e.mode,r=t.child,a=r.sibling;var l={mode:"hidden",children:i.children};return!(o&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=pr(r,l),i.subtreeFlags=r.subtreeFlags&14680064),a!==null?s=pr(a,s):(s=$r(s,o,n,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,o=t.child.memoizedState,o=o===null?sh(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=t.childLanes&~n,e.memoizedState=rh,i}return s=t.child,t=s.sibling,i=pr(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=n),i.return=e,i.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=i,e.memoizedState=null,i}function Yf(t,e){return e=eu({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function cl(t,e,n,i){return i!==null&&Uf(i),co(e,t.child,null,n),t=Yf(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function iM(t,e,n,i,r,s,o){if(n)return e.flags&256?(e.flags&=-257,i=ku(Error(ie(422))),cl(t,e,o,i)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=eu({mode:"visible",children:i.children},r,0,null),s=$r(s,r,o,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&co(e,t.child,null,o),e.child.memoizedState=sh(o),e.memoizedState=rh,s);if(!(e.mode&1))return cl(t,e,o,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var a=i.dgst;return i=a,s=Error(ie(419)),i=ku(s,i,void 0),cl(t,e,o,i)}if(a=(o&t.childLanes)!==0,fn||a){if(i=Ht,i!==null){switch(o&-o){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|o)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,Ui(t,r),ii(i,t,r,-1))}return tp(),i=ku(Error(ie(421))),cl(t,e,o,i)}return r.data==="$?"?(e.flags|=128,e.child=t.child,e=gM.bind(null,t),r._reactRetry=e,null):(t=s.treeContext,bn=ur(r.nextSibling),An=e,vt=!0,ei=null,t!==null&&(Un[kn++]=Ci,Un[kn++]=Ri,Un[kn++]=Kr,Ci=t.id,Ri=t.overflow,Kr=e),e=Yf(e,i.children),e.flags|=4096,e)}function Fm(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),Qd(t.return,e,n)}function Fu(t,e,n,i,r){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=n,s.tailMode=r)}function gx(t,e,n){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if(sn(t,e,i.children,n),i=yt.current,i&2)i=i&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Fm(t,n,e);else if(t.tag===19)Fm(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}i&=1}if(dt(yt,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&Tc(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),Fu(e,!1,r,n,s);break;case"backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&Tc(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}Fu(e,!0,n,null,s);break;case"together":Fu(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function Zl(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function ki(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Qr|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(ie(153));if(e.child!==null){for(t=e.child,n=pr(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=pr(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function rM(t,e,n){switch(e.tag){case 3:px(e),lo();break;case 5:Vv(e);break;case 1:mn(e.type)&&_c(e);break;case 4:Hf(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;dt(Mc,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(dt(yt,yt.current&1),e.flags|=128,null):n&e.child.childLanes?mx(t,e,n):(dt(yt,yt.current&1),t=ki(t,e,n),t!==null?t.sibling:null);dt(yt,yt.current&1);break;case 19:if(i=(n&e.childLanes)!==0,t.flags&128){if(i)return gx(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),dt(yt,yt.current),i)break;return null;case 22:case 23:return e.lanes=0,hx(t,e,n)}return ki(t,e,n)}var vx,oh,xx,_x;vx=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};oh=function(){};xx=function(t,e,n,i){var r=t.memoizedProps;if(r!==i){t=e.stateNode,Gr(gi.current);var s=null;switch(n){case"input":r=Cd(t,r),i=Cd(t,i),s=[];break;case"select":r=Mt({},r,{value:void 0}),i=Mt({},i,{value:void 0}),s=[];break;case"textarea":r=Ld(t,r),i=Ld(t,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(t.onclick=vc)}Id(n,i);var o;n=null;for(c in r)if(!i.hasOwnProperty(c)&&r.hasOwnProperty(c)&&r[c]!=null)if(c==="style"){var a=r[c];for(o in a)a.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(_a.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in i){var l=i[c];if(a=r!=null?r[c]:void 0,i.hasOwnProperty(c)&&l!==a&&(l!=null||a!=null))if(c==="style")if(a){for(o in a)!a.hasOwnProperty(o)||l&&l.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in l)l.hasOwnProperty(o)&&a[o]!==l[o]&&(n||(n={}),n[o]=l[o])}else n||(s||(s=[]),s.push(c,n)),n=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,a=a?a.__html:void 0,l!=null&&a!==l&&(s=s||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(_a.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&mt("scroll",t),s||a===l||(s=[])):(s=s||[]).push(c,l))}n&&(s=s||[]).push("style",n);var c=s;(e.updateQueue=c)&&(e.flags|=4)}};_x=function(t,e,n,i){n!==i&&(e.flags|=4)};function Bo(t,e){if(!vt)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function Yt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function sM(t,e,n){var i=e.pendingProps;switch(Nf(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Yt(e),null;case 1:return mn(e.type)&&xc(),Yt(e),null;case 3:return i=e.stateNode,uo(),gt(pn),gt(en),jf(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(al(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,ei!==null&&(ph(ei),ei=null))),oh(t,e),Yt(e),null;case 5:Vf(e);var r=Gr(La.current);if(n=e.type,t!==null&&e.stateNode!=null)xx(t,e,n,i,r),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(ie(166));return Yt(e),null}if(t=Gr(gi.current),al(e)){i=e.stateNode,n=e.type;var s=e.memoizedProps;switch(i[ci]=e,i[Ra]=s,t=(e.mode&1)!==0,n){case"dialog":mt("cancel",i),mt("close",i);break;case"iframe":case"object":case"embed":mt("load",i);break;case"video":case"audio":for(r=0;r<ra.length;r++)mt(ra[r],i);break;case"source":mt("error",i);break;case"img":case"image":case"link":mt("error",i),mt("load",i);break;case"details":mt("toggle",i);break;case"input":Xp(i,s),mt("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},mt("invalid",i);break;case"textarea":$p(i,s),mt("invalid",i)}Id(n,s),r=null;for(var o in s)if(s.hasOwnProperty(o)){var a=s[o];o==="children"?typeof a=="string"?i.textContent!==a&&(s.suppressHydrationWarning!==!0&&ol(i.textContent,a,t),r=["children",a]):typeof a=="number"&&i.textContent!==""+a&&(s.suppressHydrationWarning!==!0&&ol(i.textContent,a,t),r=["children",""+a]):_a.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&mt("scroll",i)}switch(n){case"input":Qa(i),qp(i,s,!0);break;case"textarea":Qa(i),Yp(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=vc)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{o=r.nodeType===9?r:r.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=q0(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof i.is=="string"?t=o.createElement(n,{is:i.is}):(t=o.createElement(n),n==="select"&&(o=t,i.multiple?o.multiple=!0:i.size&&(o.size=i.size))):t=o.createElementNS(t,n),t[ci]=e,t[Ra]=i,vx(t,e,!1,!1),e.stateNode=t;e:{switch(o=Nd(n,i),n){case"dialog":mt("cancel",t),mt("close",t),r=i;break;case"iframe":case"object":case"embed":mt("load",t),r=i;break;case"video":case"audio":for(r=0;r<ra.length;r++)mt(ra[r],t);r=i;break;case"source":mt("error",t),r=i;break;case"img":case"image":case"link":mt("error",t),mt("load",t),r=i;break;case"details":mt("toggle",t),r=i;break;case"input":Xp(t,i),r=Cd(t,i),mt("invalid",t);break;case"option":r=i;break;case"select":t._wrapperState={wasMultiple:!!i.multiple},r=Mt({},i,{value:void 0}),mt("invalid",t);break;case"textarea":$p(t,i),r=Ld(t,i),mt("invalid",t);break;default:r=i}Id(n,r),a=r;for(s in a)if(a.hasOwnProperty(s)){var l=a[s];s==="style"?K0(t,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&$0(t,l)):s==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&ya(t,l):typeof l=="number"&&ya(t,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(_a.hasOwnProperty(s)?l!=null&&s==="onScroll"&&mt("scroll",t):l!=null&&_f(t,s,l,o))}switch(n){case"input":Qa(t),qp(t,i,!1);break;case"textarea":Qa(t),Yp(t);break;case"option":i.value!=null&&t.setAttribute("value",""+_r(i.value));break;case"select":t.multiple=!!i.multiple,s=i.value,s!=null?$s(t,!!i.multiple,s,!1):i.defaultValue!=null&&$s(t,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(t.onclick=vc)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return Yt(e),null;case 6:if(t&&e.stateNode!=null)_x(t,e,t.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(ie(166));if(n=Gr(La.current),Gr(gi.current),al(e)){if(i=e.stateNode,n=e.memoizedProps,i[ci]=e,(s=i.nodeValue!==n)&&(t=An,t!==null))switch(t.tag){case 3:ol(i.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&ol(i.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[ci]=e,e.stateNode=i}return Yt(e),null;case 13:if(gt(yt),i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(vt&&bn!==null&&e.mode&1&&!(e.flags&128))Fv(),lo(),e.flags|=98560,s=!1;else if(s=al(e),i!==null&&i.dehydrated!==null){if(t===null){if(!s)throw Error(ie(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(ie(317));s[ci]=e}else lo(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Yt(e),s=!1}else ei!==null&&(ph(ei),ei=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(i=i!==null,i!==(t!==null&&t.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(t===null||yt.current&1?Ut===0&&(Ut=3):tp())),e.updateQueue!==null&&(e.flags|=4),Yt(e),null);case 4:return uo(),oh(t,e),t===null&&Aa(e.stateNode.containerInfo),Yt(e),null;case 10:return Of(e.type._context),Yt(e),null;case 17:return mn(e.type)&&xc(),Yt(e),null;case 19:if(gt(yt),s=e.memoizedState,s===null)return Yt(e),null;if(i=(e.flags&128)!==0,o=s.rendering,o===null)if(i)Bo(s,!1);else{if(Ut!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=Tc(t),o!==null){for(e.flags|=128,Bo(s,!1),i=o.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=n,n=e.child;n!==null;)s=n,t=i,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,t=o.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return dt(yt,yt.current&1|2),e.child}t=t.sibling}s.tail!==null&&Ct()>fo&&(e.flags|=128,i=!0,Bo(s,!1),e.lanes=4194304)}else{if(!i)if(t=Tc(o),t!==null){if(e.flags|=128,i=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),Bo(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!vt)return Yt(e),null}else 2*Ct()-s.renderingStartTime>fo&&n!==1073741824&&(e.flags|=128,i=!0,Bo(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(n=s.last,n!==null?n.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=Ct(),e.sibling=null,n=yt.current,dt(yt,i?n&1|2:n&1),e):(Yt(e),null);case 22:case 23:return ep(),i=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?En&1073741824&&(Yt(e),e.subtreeFlags&6&&(e.flags|=8192)):Yt(e),null;case 24:return null;case 25:return null}throw Error(ie(156,e.tag))}function oM(t,e){switch(Nf(e),e.tag){case 1:return mn(e.type)&&xc(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return uo(),gt(pn),gt(en),jf(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return Vf(e),null;case 13:if(gt(yt),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(ie(340));lo()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return gt(yt),null;case 4:return uo(),null;case 10:return Of(e.type._context),null;case 22:case 23:return ep(),null;case 24:return null;default:return null}}var ul=!1,Qt=!1,aM=typeof WeakSet=="function"?WeakSet:Set,me=null;function js(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){wt(t,e,i)}else n.current=null}function ah(t,e,n){try{n()}catch(i){wt(t,e,i)}}var Om=!1;function lM(t,e){if(Gd=pc,t=wv(),Df(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var o=0,a=-1,l=-1,c=0,u=0,d=t,f=null;t:for(;;){for(var p;d!==n||r!==0&&d.nodeType!==3||(a=o+r),d!==s||i!==0&&d.nodeType!==3||(l=o+i),d.nodeType===3&&(o+=d.nodeValue.length),(p=d.firstChild)!==null;)f=d,d=p;for(;;){if(d===t)break t;if(f===n&&++c===r&&(a=o),f===s&&++u===i&&(l=o),(p=d.nextSibling)!==null)break;d=f,f=d.parentNode}d=p}n=a===-1||l===-1?null:{start:a,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(Wd={focusedElem:t,selectionRange:n},pc=!1,me=e;me!==null;)if(e=me,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,me=t;else for(;me!==null;){e=me;try{var x=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(x!==null){var v=x.memoizedProps,g=x.memoizedState,h=e.stateNode,_=h.getSnapshotBeforeUpdate(e.elementType===e.type?v:Qn(e.type,v),g);h.__reactInternalSnapshotBeforeUpdate=_}break;case 3:var y=e.stateNode.containerInfo;y.nodeType===1?y.textContent="":y.nodeType===9&&y.documentElement&&y.removeChild(y.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(ie(163))}}catch(S){wt(e,e.return,S)}if(t=e.sibling,t!==null){t.return=e.return,me=t;break}me=e.return}return x=Om,Om=!1,x}function pa(t,e,n){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&t)===t){var s=r.destroy;r.destroy=void 0,s!==void 0&&ah(e,n,s)}r=r.next}while(r!==i)}}function Qc(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var i=n.create;n.destroy=i()}n=n.next}while(n!==e)}}function lh(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function yx(t){var e=t.alternate;e!==null&&(t.alternate=null,yx(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[ci],delete e[Ra],delete e[$d],delete e[GS],delete e[WS])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function Sx(t){return t.tag===5||t.tag===3||t.tag===4}function zm(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||Sx(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function ch(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=vc));else if(i!==4&&(t=t.child,t!==null))for(ch(t,e,n),t=t.sibling;t!==null;)ch(t,e,n),t=t.sibling}function uh(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(t=t.child,t!==null))for(uh(t,e,n),t=t.sibling;t!==null;)uh(t,e,n),t=t.sibling}var jt=null,Jn=!1;function Hi(t,e,n){for(n=n.child;n!==null;)Mx(t,e,n),n=n.sibling}function Mx(t,e,n){if(mi&&typeof mi.onCommitFiberUnmount=="function")try{mi.onCommitFiberUnmount(Gc,n)}catch{}switch(n.tag){case 5:Qt||js(n,e);case 6:var i=jt,r=Jn;jt=null,Hi(t,e,n),jt=i,Jn=r,jt!==null&&(Jn?(t=jt,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):jt.removeChild(n.stateNode));break;case 18:jt!==null&&(Jn?(t=jt,n=n.stateNode,t.nodeType===8?Pu(t.parentNode,n):t.nodeType===1&&Pu(t,n),wa(t)):Pu(jt,n.stateNode));break;case 4:i=jt,r=Jn,jt=n.stateNode.containerInfo,Jn=!0,Hi(t,e,n),jt=i,Jn=r;break;case 0:case 11:case 14:case 15:if(!Qt&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&ah(n,e,o),r=r.next}while(r!==i)}Hi(t,e,n);break;case 1:if(!Qt&&(js(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(a){wt(n,e,a)}Hi(t,e,n);break;case 21:Hi(t,e,n);break;case 22:n.mode&1?(Qt=(i=Qt)||n.memoizedState!==null,Hi(t,e,n),Qt=i):Hi(t,e,n);break;default:Hi(t,e,n)}}function Bm(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new aM),e.forEach(function(i){var r=vM.bind(null,t,i);n.has(i)||(n.add(i),i.then(r,r))})}}function $n(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i];try{var s=t,o=e,a=o;e:for(;a!==null;){switch(a.tag){case 5:jt=a.stateNode,Jn=!1;break e;case 3:jt=a.stateNode.containerInfo,Jn=!0;break e;case 4:jt=a.stateNode.containerInfo,Jn=!0;break e}a=a.return}if(jt===null)throw Error(ie(160));Mx(s,o,r),jt=null,Jn=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(c){wt(r,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)Ex(e,t),e=e.sibling}function Ex(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if($n(e,t),oi(t),i&4){try{pa(3,t,t.return),Qc(3,t)}catch(v){wt(t,t.return,v)}try{pa(5,t,t.return)}catch(v){wt(t,t.return,v)}}break;case 1:$n(e,t),oi(t),i&512&&n!==null&&js(n,n.return);break;case 5:if($n(e,t),oi(t),i&512&&n!==null&&js(n,n.return),t.flags&32){var r=t.stateNode;try{ya(r,"")}catch(v){wt(t,t.return,v)}}if(i&4&&(r=t.stateNode,r!=null)){var s=t.memoizedProps,o=n!==null?n.memoizedProps:s,a=t.type,l=t.updateQueue;if(t.updateQueue=null,l!==null)try{a==="input"&&s.type==="radio"&&s.name!=null&&W0(r,s),Nd(a,o);var c=Nd(a,s);for(o=0;o<l.length;o+=2){var u=l[o],d=l[o+1];u==="style"?K0(r,d):u==="dangerouslySetInnerHTML"?$0(r,d):u==="children"?ya(r,d):_f(r,u,d,c)}switch(a){case"input":Rd(r,s);break;case"textarea":X0(r,s);break;case"select":var f=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var p=s.value;p!=null?$s(r,!!s.multiple,p,!1):f!==!!s.multiple&&(s.defaultValue!=null?$s(r,!!s.multiple,s.defaultValue,!0):$s(r,!!s.multiple,s.multiple?[]:"",!1))}r[Ra]=s}catch(v){wt(t,t.return,v)}}break;case 6:if($n(e,t),oi(t),i&4){if(t.stateNode===null)throw Error(ie(162));r=t.stateNode,s=t.memoizedProps;try{r.nodeValue=s}catch(v){wt(t,t.return,v)}}break;case 3:if($n(e,t),oi(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{wa(e.containerInfo)}catch(v){wt(t,t.return,v)}break;case 4:$n(e,t),oi(t);break;case 13:$n(e,t),oi(t),r=t.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(Qf=Ct())),i&4&&Bm(t);break;case 22:if(u=n!==null&&n.memoizedState!==null,t.mode&1?(Qt=(c=Qt)||u,$n(e,t),Qt=c):$n(e,t),oi(t),i&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!u&&t.mode&1)for(me=t,u=t.child;u!==null;){for(d=me=u;me!==null;){switch(f=me,p=f.child,f.tag){case 0:case 11:case 14:case 15:pa(4,f,f.return);break;case 1:js(f,f.return);var x=f.stateNode;if(typeof x.componentWillUnmount=="function"){i=f,n=f.return;try{e=i,x.props=e.memoizedProps,x.state=e.memoizedState,x.componentWillUnmount()}catch(v){wt(i,n,v)}}break;case 5:js(f,f.return);break;case 22:if(f.memoizedState!==null){Vm(d);continue}}p!==null?(p.return=f,me=p):Vm(d)}u=u.sibling}e:for(u=null,d=t;;){if(d.tag===5){if(u===null){u=d;try{r=d.stateNode,c?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(a=d.stateNode,l=d.memoizedProps.style,o=l!=null&&l.hasOwnProperty("display")?l.display:null,a.style.display=Y0("display",o))}catch(v){wt(t,t.return,v)}}}else if(d.tag===6){if(u===null)try{d.stateNode.nodeValue=c?"":d.memoizedProps}catch(v){wt(t,t.return,v)}}else if((d.tag!==22&&d.tag!==23||d.memoizedState===null||d===t)&&d.child!==null){d.child.return=d,d=d.child;continue}if(d===t)break e;for(;d.sibling===null;){if(d.return===null||d.return===t)break e;u===d&&(u=null),d=d.return}u===d&&(u=null),d.sibling.return=d.return,d=d.sibling}}break;case 19:$n(e,t),oi(t),i&4&&Bm(t);break;case 21:break;default:$n(e,t),oi(t)}}function oi(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(Sx(n)){var i=n;break e}n=n.return}throw Error(ie(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(ya(r,""),i.flags&=-33);var s=zm(t);uh(t,s,r);break;case 3:case 4:var o=i.stateNode.containerInfo,a=zm(t);ch(t,a,o);break;default:throw Error(ie(161))}}catch(l){wt(t,t.return,l)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function cM(t,e,n){me=t,wx(t)}function wx(t,e,n){for(var i=(t.mode&1)!==0;me!==null;){var r=me,s=r.child;if(r.tag===22&&i){var o=r.memoizedState!==null||ul;if(!o){var a=r.alternate,l=a!==null&&a.memoizedState!==null||Qt;a=ul;var c=Qt;if(ul=o,(Qt=l)&&!c)for(me=r;me!==null;)o=me,l=o.child,o.tag===22&&o.memoizedState!==null?jm(r):l!==null?(l.return=o,me=l):jm(r);for(;s!==null;)me=s,wx(s),s=s.sibling;me=r,ul=a,Qt=c}Hm(t)}else r.subtreeFlags&8772&&s!==null?(s.return=r,me=s):Hm(t)}}function Hm(t){for(;me!==null;){var e=me;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:Qt||Qc(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!Qt)if(n===null)i.componentDidMount();else{var r=e.elementType===e.type?n.memoizedProps:Qn(e.type,n.memoizedProps);i.componentDidUpdate(r,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&Tm(e,s,i);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}Tm(e,o,n)}break;case 5:var a=e.stateNode;if(n===null&&e.flags&4){n=a;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var u=c.memoizedState;if(u!==null){var d=u.dehydrated;d!==null&&wa(d)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(ie(163))}Qt||e.flags&512&&lh(e)}catch(f){wt(e,e.return,f)}}if(e===t){me=null;break}if(n=e.sibling,n!==null){n.return=e.return,me=n;break}me=e.return}}function Vm(t){for(;me!==null;){var e=me;if(e===t){me=null;break}var n=e.sibling;if(n!==null){n.return=e.return,me=n;break}me=e.return}}function jm(t){for(;me!==null;){var e=me;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{Qc(4,e)}catch(l){wt(e,n,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){wt(e,r,l)}}var s=e.return;try{lh(e)}catch(l){wt(e,s,l)}break;case 5:var o=e.return;try{lh(e)}catch(l){wt(e,o,l)}}}catch(l){wt(e,e.return,l)}if(e===t){me=null;break}var a=e.sibling;if(a!==null){a.return=e.return,me=a;break}me=e.return}}var uM=Math.ceil,Cc=Oi.ReactCurrentDispatcher,Kf=Oi.ReactCurrentOwner,Vn=Oi.ReactCurrentBatchConfig,$e=0,Ht=null,Lt=null,Wt=0,En=0,Gs=wr(0),Ut=0,Ua=null,Qr=0,Jc=0,Zf=0,ma=null,hn=null,Qf=0,fo=1/0,bi=null,Rc=!1,dh=null,hr=null,dl=!1,ir=null,Pc=0,ga=0,hh=null,Ql=-1,Jl=0;function an(){return $e&6?Ct():Ql!==-1?Ql:Ql=Ct()}function fr(t){return t.mode&1?$e&2&&Wt!==0?Wt&-Wt:qS.transition!==null?(Jl===0&&(Jl=lv()),Jl):(t=tt,t!==0||(t=window.event,t=t===void 0?16:mv(t.type)),t):1}function ii(t,e,n,i){if(50<ga)throw ga=0,hh=null,Error(ie(185));Ba(t,n,i),(!($e&2)||t!==Ht)&&(t===Ht&&(!($e&2)&&(Jc|=n),Ut===4&&er(t,Wt)),gn(t,i),n===1&&$e===0&&!(e.mode&1)&&(fo=Ct()+500,Yc&&Tr()))}function gn(t,e){var n=t.callbackNode;qy(t,e);var i=fc(t,t===Ht?Wt:0);if(i===0)n!==null&&Qp(n),t.callbackNode=null,t.callbackPriority=0;else if(e=i&-i,t.callbackPriority!==e){if(n!=null&&Qp(n),e===1)t.tag===0?XS(Gm.bind(null,t)):Nv(Gm.bind(null,t)),VS(function(){!($e&6)&&Tr()}),n=null;else{switch(cv(i)){case 1:n=wf;break;case 4:n=ov;break;case 16:n=hc;break;case 536870912:n=av;break;default:n=hc}n=Dx(n,Tx.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function Tx(t,e){if(Ql=-1,Jl=0,$e&6)throw Error(ie(327));var n=t.callbackNode;if(Js()&&t.callbackNode!==n)return null;var i=fc(t,t===Ht?Wt:0);if(i===0)return null;if(i&30||i&t.expiredLanes||e)e=Lc(t,i);else{e=i;var r=$e;$e|=2;var s=Ax();(Ht!==t||Wt!==e)&&(bi=null,fo=Ct()+500,qr(t,e));do try{fM();break}catch(a){bx(t,a)}while(!0);Ff(),Cc.current=s,$e=r,Lt!==null?e=0:(Ht=null,Wt=0,e=Ut)}if(e!==0){if(e===2&&(r=zd(t),r!==0&&(i=r,e=fh(t,r))),e===1)throw n=Ua,qr(t,0),er(t,i),gn(t,Ct()),n;if(e===6)er(t,i);else{if(r=t.current.alternate,!(i&30)&&!dM(r)&&(e=Lc(t,i),e===2&&(s=zd(t),s!==0&&(i=s,e=fh(t,s))),e===1))throw n=Ua,qr(t,0),er(t,i),gn(t,Ct()),n;switch(t.finishedWork=r,t.finishedLanes=i,e){case 0:case 1:throw Error(ie(345));case 2:kr(t,hn,bi);break;case 3:if(er(t,i),(i&130023424)===i&&(e=Qf+500-Ct(),10<e)){if(fc(t,0)!==0)break;if(r=t.suspendedLanes,(r&i)!==i){an(),t.pingedLanes|=t.suspendedLanes&r;break}t.timeoutHandle=qd(kr.bind(null,t,hn,bi),e);break}kr(t,hn,bi);break;case 4:if(er(t,i),(i&4194240)===i)break;for(e=t.eventTimes,r=-1;0<i;){var o=31-ni(i);s=1<<o,o=e[o],o>r&&(r=o),i&=~s}if(i=r,i=Ct()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*uM(i/1960))-i,10<i){t.timeoutHandle=qd(kr.bind(null,t,hn,bi),i);break}kr(t,hn,bi);break;case 5:kr(t,hn,bi);break;default:throw Error(ie(329))}}}return gn(t,Ct()),t.callbackNode===n?Tx.bind(null,t):null}function fh(t,e){var n=ma;return t.current.memoizedState.isDehydrated&&(qr(t,e).flags|=256),t=Lc(t,e),t!==2&&(e=hn,hn=n,e!==null&&ph(e)),t}function ph(t){hn===null?hn=t:hn.push.apply(hn,t)}function dM(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var r=n[i],s=r.getSnapshot;r=r.value;try{if(!ri(s(),r))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function er(t,e){for(e&=~Zf,e&=~Jc,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-ni(e),i=1<<n;t[n]=-1,e&=~i}}function Gm(t){if($e&6)throw Error(ie(327));Js();var e=fc(t,0);if(!(e&1))return gn(t,Ct()),null;var n=Lc(t,e);if(t.tag!==0&&n===2){var i=zd(t);i!==0&&(e=i,n=fh(t,i))}if(n===1)throw n=Ua,qr(t,0),er(t,e),gn(t,Ct()),n;if(n===6)throw Error(ie(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,kr(t,hn,bi),gn(t,Ct()),null}function Jf(t,e){var n=$e;$e|=1;try{return t(e)}finally{$e=n,$e===0&&(fo=Ct()+500,Yc&&Tr())}}function Jr(t){ir!==null&&ir.tag===0&&!($e&6)&&Js();var e=$e;$e|=1;var n=Vn.transition,i=tt;try{if(Vn.transition=null,tt=1,t)return t()}finally{tt=i,Vn.transition=n,$e=e,!($e&6)&&Tr()}}function ep(){En=Gs.current,gt(Gs)}function qr(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,HS(n)),Lt!==null)for(n=Lt.return;n!==null;){var i=n;switch(Nf(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&xc();break;case 3:uo(),gt(pn),gt(en),jf();break;case 5:Vf(i);break;case 4:uo();break;case 13:gt(yt);break;case 19:gt(yt);break;case 10:Of(i.type._context);break;case 22:case 23:ep()}n=n.return}if(Ht=t,Lt=t=pr(t.current,null),Wt=En=e,Ut=0,Ua=null,Zf=Jc=Qr=0,hn=ma=null,jr!==null){for(e=0;e<jr.length;e++)if(n=jr[e],i=n.interleaved,i!==null){n.interleaved=null;var r=i.next,s=n.pending;if(s!==null){var o=s.next;s.next=r,i.next=o}n.pending=i}jr=null}return t}function bx(t,e){do{var n=Lt;try{if(Ff(),Yl.current=Ac,bc){for(var i=St.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}bc=!1}if(Zr=0,Bt=Nt=St=null,fa=!1,Da=0,Kf.current=null,n===null||n.return===null){Ut=1,Ua=e,Lt=null;break}e:{var s=t,o=n.return,a=n,l=e;if(e=Wt,a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,u=a,d=u.tag;if(!(u.mode&1)&&(d===0||d===11||d===15)){var f=u.alternate;f?(u.updateQueue=f.updateQueue,u.memoizedState=f.memoizedState,u.lanes=f.lanes):(u.updateQueue=null,u.memoizedState=null)}var p=Lm(o);if(p!==null){p.flags&=-257,Dm(p,o,a,s,e),p.mode&1&&Pm(s,c,e),e=p,l=c;var x=e.updateQueue;if(x===null){var v=new Set;v.add(l),e.updateQueue=v}else x.add(l);break e}else{if(!(e&1)){Pm(s,c,e),tp();break e}l=Error(ie(426))}}else if(vt&&a.mode&1){var g=Lm(o);if(g!==null){!(g.flags&65536)&&(g.flags|=256),Dm(g,o,a,s,e),Uf(ho(l,a));break e}}s=l=ho(l,a),Ut!==4&&(Ut=2),ma===null?ma=[s]:ma.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var h=cx(s,l,e);wm(s,h);break e;case 1:a=l;var _=s.type,y=s.stateNode;if(!(s.flags&128)&&(typeof _.getDerivedStateFromError=="function"||y!==null&&typeof y.componentDidCatch=="function"&&(hr===null||!hr.has(y)))){s.flags|=65536,e&=-e,s.lanes|=e;var S=ux(s,a,e);wm(s,S);break e}}s=s.return}while(s!==null)}Rx(n)}catch(C){e=C,Lt===n&&n!==null&&(Lt=n=n.return);continue}break}while(!0)}function Ax(){var t=Cc.current;return Cc.current=Ac,t===null?Ac:t}function tp(){(Ut===0||Ut===3||Ut===2)&&(Ut=4),Ht===null||!(Qr&268435455)&&!(Jc&268435455)||er(Ht,Wt)}function Lc(t,e){var n=$e;$e|=2;var i=Ax();(Ht!==t||Wt!==e)&&(bi=null,qr(t,e));do try{hM();break}catch(r){bx(t,r)}while(!0);if(Ff(),$e=n,Cc.current=i,Lt!==null)throw Error(ie(261));return Ht=null,Wt=0,Ut}function hM(){for(;Lt!==null;)Cx(Lt)}function fM(){for(;Lt!==null&&!Oy();)Cx(Lt)}function Cx(t){var e=Lx(t.alternate,t,En);t.memoizedProps=t.pendingProps,e===null?Rx(t):Lt=e,Kf.current=null}function Rx(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=oM(n,e),n!==null){n.flags&=32767,Lt=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Ut=6,Lt=null;return}}else if(n=sM(n,e,En),n!==null){Lt=n;return}if(e=e.sibling,e!==null){Lt=e;return}Lt=e=t}while(e!==null);Ut===0&&(Ut=5)}function kr(t,e,n){var i=tt,r=Vn.transition;try{Vn.transition=null,tt=1,pM(t,e,n,i)}finally{Vn.transition=r,tt=i}return null}function pM(t,e,n,i){do Js();while(ir!==null);if($e&6)throw Error(ie(327));n=t.finishedWork;var r=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(ie(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if($y(t,s),t===Ht&&(Lt=Ht=null,Wt=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||dl||(dl=!0,Dx(hc,function(){return Js(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=Vn.transition,Vn.transition=null;var o=tt;tt=1;var a=$e;$e|=4,Kf.current=null,lM(t,n),Ex(n,t),NS(Wd),pc=!!Gd,Wd=Gd=null,t.current=n,cM(n),zy(),$e=a,tt=o,Vn.transition=s}else t.current=n;if(dl&&(dl=!1,ir=t,Pc=r),s=t.pendingLanes,s===0&&(hr=null),Vy(n.stateNode),gn(t,Ct()),e!==null)for(i=t.onRecoverableError,n=0;n<e.length;n++)r=e[n],i(r.value,{componentStack:r.stack,digest:r.digest});if(Rc)throw Rc=!1,t=dh,dh=null,t;return Pc&1&&t.tag!==0&&Js(),s=t.pendingLanes,s&1?t===hh?ga++:(ga=0,hh=t):ga=0,Tr(),null}function Js(){if(ir!==null){var t=cv(Pc),e=Vn.transition,n=tt;try{if(Vn.transition=null,tt=16>t?16:t,ir===null)var i=!1;else{if(t=ir,ir=null,Pc=0,$e&6)throw Error(ie(331));var r=$e;for($e|=4,me=t.current;me!==null;){var s=me,o=s.child;if(me.flags&16){var a=s.deletions;if(a!==null){for(var l=0;l<a.length;l++){var c=a[l];for(me=c;me!==null;){var u=me;switch(u.tag){case 0:case 11:case 15:pa(8,u,s)}var d=u.child;if(d!==null)d.return=u,me=d;else for(;me!==null;){u=me;var f=u.sibling,p=u.return;if(yx(u),u===c){me=null;break}if(f!==null){f.return=p,me=f;break}me=p}}}var x=s.alternate;if(x!==null){var v=x.child;if(v!==null){x.child=null;do{var g=v.sibling;v.sibling=null,v=g}while(v!==null)}}me=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,me=o;else e:for(;me!==null;){if(s=me,s.flags&2048)switch(s.tag){case 0:case 11:case 15:pa(9,s,s.return)}var h=s.sibling;if(h!==null){h.return=s.return,me=h;break e}me=s.return}}var _=t.current;for(me=_;me!==null;){o=me;var y=o.child;if(o.subtreeFlags&2064&&y!==null)y.return=o,me=y;else e:for(o=_;me!==null;){if(a=me,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:Qc(9,a)}}catch(C){wt(a,a.return,C)}if(a===o){me=null;break e}var S=a.sibling;if(S!==null){S.return=a.return,me=S;break e}me=a.return}}if($e=r,Tr(),mi&&typeof mi.onPostCommitFiberRoot=="function")try{mi.onPostCommitFiberRoot(Gc,t)}catch{}i=!0}return i}finally{tt=n,Vn.transition=e}}return!1}function Wm(t,e,n){e=ho(n,e),e=cx(t,e,1),t=dr(t,e,1),e=an(),t!==null&&(Ba(t,1,e),gn(t,e))}function wt(t,e,n){if(t.tag===3)Wm(t,t,n);else for(;e!==null;){if(e.tag===3){Wm(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(hr===null||!hr.has(i))){t=ho(n,t),t=ux(e,t,1),e=dr(e,t,1),t=an(),e!==null&&(Ba(e,1,t),gn(e,t));break}}e=e.return}}function mM(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),e=an(),t.pingedLanes|=t.suspendedLanes&n,Ht===t&&(Wt&n)===n&&(Ut===4||Ut===3&&(Wt&130023424)===Wt&&500>Ct()-Qf?qr(t,0):Zf|=n),gn(t,e)}function Px(t,e){e===0&&(t.mode&1?(e=tl,tl<<=1,!(tl&130023424)&&(tl=4194304)):e=1);var n=an();t=Ui(t,e),t!==null&&(Ba(t,e,n),gn(t,n))}function gM(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),Px(t,n)}function vM(t,e){var n=0;switch(t.tag){case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;default:throw Error(ie(314))}i!==null&&i.delete(e),Px(t,n)}var Lx;Lx=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||pn.current)fn=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return fn=!1,rM(t,e,n);fn=!!(t.flags&131072)}else fn=!1,vt&&e.flags&1048576&&Uv(e,Sc,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;Zl(t,e),t=e.pendingProps;var r=ao(e,en.current);Qs(e,n),r=Wf(null,e,i,t,r,n);var s=Xf();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,mn(i)?(s=!0,_c(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,Bf(e),r.updater=Zc,e.stateNode=r,r._reactInternals=e,eh(e,i,t,n),e=ih(null,e,i,!0,s,n)):(e.tag=0,vt&&s&&If(e),sn(null,e,r,n),e=e.child),e;case 16:i=e.elementType;e:{switch(Zl(t,e),t=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=_M(i),t=Qn(i,t),r){case 0:e=nh(null,e,i,t,n);break e;case 1:e=Um(null,e,i,t,n);break e;case 11:e=Im(null,e,i,t,n);break e;case 14:e=Nm(null,e,i,Qn(i.type,t),n);break e}throw Error(ie(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Qn(i,r),nh(t,e,i,r,n);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Qn(i,r),Um(t,e,i,r,n);case 3:e:{if(px(e),t===null)throw Error(ie(387));i=e.pendingProps,s=e.memoizedState,r=s.element,Hv(t,e),wc(e,i,null,n);var o=e.memoizedState;if(i=o.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=ho(Error(ie(423)),e),e=km(t,e,i,n,r);break e}else if(i!==r){r=ho(Error(ie(424)),e),e=km(t,e,i,n,r);break e}else for(bn=ur(e.stateNode.containerInfo.firstChild),An=e,vt=!0,ei=null,n=zv(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(lo(),i===r){e=ki(t,e,n);break e}sn(t,e,i,n)}e=e.child}return e;case 5:return Vv(e),t===null&&Zd(e),i=e.type,r=e.pendingProps,s=t!==null?t.memoizedProps:null,o=r.children,Xd(i,r)?o=null:s!==null&&Xd(i,s)&&(e.flags|=32),fx(t,e),sn(t,e,o,n),e.child;case 6:return t===null&&Zd(e),null;case 13:return mx(t,e,n);case 4:return Hf(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=co(e,null,i,n):sn(t,e,i,n),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Qn(i,r),Im(t,e,i,r,n);case 7:return sn(t,e,e.pendingProps,n),e.child;case 8:return sn(t,e,e.pendingProps.children,n),e.child;case 12:return sn(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,o=r.value,dt(Mc,i._currentValue),i._currentValue=o,s!==null)if(ri(s.value,o)){if(s.children===r.children&&!pn.current){e=ki(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var a=s.dependencies;if(a!==null){o=s.child;for(var l=a.firstContext;l!==null;){if(l.context===i){if(s.tag===1){l=Li(-1,n&-n),l.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var u=c.pending;u===null?l.next=l:(l.next=u.next,u.next=l),c.pending=l}}s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),Qd(s.return,n,e),a.lanes|=n;break}l=l.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(ie(341));o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),Qd(o,n,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}sn(t,e,r.children,n),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,Qs(e,n),r=Gn(r),i=i(r),e.flags|=1,sn(t,e,i,n),e.child;case 14:return i=e.type,r=Qn(i,e.pendingProps),r=Qn(i.type,r),Nm(t,e,i,r,n);case 15:return dx(t,e,e.type,e.pendingProps,n);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:Qn(i,r),Zl(t,e),e.tag=1,mn(i)?(t=!0,_c(e)):t=!1,Qs(e,n),lx(e,i,r),eh(e,i,r,n),ih(null,e,i,!0,t,n);case 19:return gx(t,e,n);case 22:return hx(t,e,n)}throw Error(ie(156,e.tag))};function Dx(t,e){return sv(t,e)}function xM(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function zn(t,e,n,i){return new xM(t,e,n,i)}function np(t){return t=t.prototype,!(!t||!t.isReactComponent)}function _M(t){if(typeof t=="function")return np(t)?1:0;if(t!=null){if(t=t.$$typeof,t===Sf)return 11;if(t===Mf)return 14}return 2}function pr(t,e){var n=t.alternate;return n===null?(n=zn(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function ec(t,e,n,i,r,s){var o=2;if(i=t,typeof t=="function")np(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case Ns:return $r(n.children,r,s,e);case yf:o=8,r|=8;break;case wd:return t=zn(12,n,e,r|2),t.elementType=wd,t.lanes=s,t;case Td:return t=zn(13,n,e,r),t.elementType=Td,t.lanes=s,t;case bd:return t=zn(19,n,e,r),t.elementType=bd,t.lanes=s,t;case V0:return eu(n,r,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case B0:o=10;break e;case H0:o=9;break e;case Sf:o=11;break e;case Mf:o=14;break e;case Ki:o=16,i=null;break e}throw Error(ie(130,t==null?t:typeof t,""))}return e=zn(o,n,e,r),e.elementType=t,e.type=i,e.lanes=s,e}function $r(t,e,n,i){return t=zn(7,t,i,e),t.lanes=n,t}function eu(t,e,n,i){return t=zn(22,t,i,e),t.elementType=V0,t.lanes=n,t.stateNode={isHidden:!1},t}function Ou(t,e,n){return t=zn(6,t,null,e),t.lanes=n,t}function zu(t,e,n){return e=zn(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function yM(t,e,n,i,r){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=_u(0),this.expirationTimes=_u(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=_u(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function ip(t,e,n,i,r,s,o,a,l){return t=new yM(t,e,n,a,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=zn(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Bf(s),t}function SM(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Is,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}function Ix(t){if(!t)return yr;t=t._reactInternals;e:{if(ss(t)!==t||t.tag!==1)throw Error(ie(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(mn(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(ie(171))}if(t.tag===1){var n=t.type;if(mn(n))return Iv(t,n,e)}return e}function Nx(t,e,n,i,r,s,o,a,l){return t=ip(n,i,!0,t,r,s,o,a,l),t.context=Ix(null),n=t.current,i=an(),r=fr(n),s=Li(i,r),s.callback=e??null,dr(n,s,r),t.current.lanes=r,Ba(t,r,i),gn(t,i),t}function tu(t,e,n,i){var r=e.current,s=an(),o=fr(r);return n=Ix(n),e.context===null?e.context=n:e.pendingContext=n,e=Li(s,o),e.payload={element:t},i=i===void 0?null:i,i!==null&&(e.callback=i),t=dr(r,e,o),t!==null&&(ii(t,r,o,s),$l(t,r,o)),o}function Dc(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Xm(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function rp(t,e){Xm(t,e),(t=t.alternate)&&Xm(t,e)}function MM(){return null}var Ux=typeof reportError=="function"?reportError:function(t){console.error(t)};function sp(t){this._internalRoot=t}nu.prototype.render=sp.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(ie(409));tu(t,e,null,null)};nu.prototype.unmount=sp.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Jr(function(){tu(null,t,null,null)}),e[Ni]=null}};function nu(t){this._internalRoot=t}nu.prototype.unstable_scheduleHydration=function(t){if(t){var e=hv();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Ji.length&&e!==0&&e<Ji[n].priority;n++);Ji.splice(n,0,t),n===0&&pv(t)}};function op(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function iu(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function qm(){}function EM(t,e,n,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var c=Dc(o);s.call(c)}}var o=Nx(e,i,t,0,null,!1,!1,"",qm);return t._reactRootContainer=o,t[Ni]=o.current,Aa(t.nodeType===8?t.parentNode:t),Jr(),o}for(;r=t.lastChild;)t.removeChild(r);if(typeof i=="function"){var a=i;i=function(){var c=Dc(l);a.call(c)}}var l=ip(t,0,!1,null,null,!1,!1,"",qm);return t._reactRootContainer=l,t[Ni]=l.current,Aa(t.nodeType===8?t.parentNode:t),Jr(function(){tu(e,l,n,i)}),l}function ru(t,e,n,i,r){var s=n._reactRootContainer;if(s){var o=s;if(typeof r=="function"){var a=r;r=function(){var l=Dc(o);a.call(l)}}tu(e,o,t,r)}else o=EM(n,e,t,r,i);return Dc(o)}uv=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=ia(e.pendingLanes);n!==0&&(Tf(e,n|1),gn(e,Ct()),!($e&6)&&(fo=Ct()+500,Tr()))}break;case 13:Jr(function(){var i=Ui(t,1);if(i!==null){var r=an();ii(i,t,1,r)}}),rp(t,1)}};bf=function(t){if(t.tag===13){var e=Ui(t,134217728);if(e!==null){var n=an();ii(e,t,134217728,n)}rp(t,134217728)}};dv=function(t){if(t.tag===13){var e=fr(t),n=Ui(t,e);if(n!==null){var i=an();ii(n,t,e,i)}rp(t,e)}};hv=function(){return tt};fv=function(t,e){var n=tt;try{return tt=t,e()}finally{tt=n}};kd=function(t,e,n){switch(e){case"input":if(Rd(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=$c(i);if(!r)throw Error(ie(90));G0(i),Rd(i,r)}}}break;case"textarea":X0(t,n);break;case"select":e=n.value,e!=null&&$s(t,!!n.multiple,e,!1)}};J0=Jf;ev=Jr;var wM={usingClientEntryPoint:!1,Events:[Va,Os,$c,Z0,Q0,Jf]},Ho={findFiberByHostInstance:Vr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},TM={bundleType:Ho.bundleType,version:Ho.version,rendererPackageName:Ho.rendererPackageName,rendererConfig:Ho.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Oi.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=iv(t),t===null?null:t.stateNode},findFiberByHostInstance:Ho.findFiberByHostInstance||MM,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var hl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!hl.isDisabled&&hl.supportsFiber)try{Gc=hl.inject(TM),mi=hl}catch{}}Pn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=wM;Pn.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!op(e))throw Error(ie(200));return SM(t,e,null,n)};Pn.createRoot=function(t,e){if(!op(t))throw Error(ie(299));var n=!1,i="",r=Ux;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=ip(t,1,!1,null,null,n,!1,i,r),t[Ni]=e.current,Aa(t.nodeType===8?t.parentNode:t),new sp(e)};Pn.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(ie(188)):(t=Object.keys(t).join(","),Error(ie(268,t)));return t=iv(e),t=t===null?null:t.stateNode,t};Pn.flushSync=function(t){return Jr(t)};Pn.hydrate=function(t,e,n){if(!iu(e))throw Error(ie(200));return ru(null,t,e,!0,n)};Pn.hydrateRoot=function(t,e,n){if(!op(t))throw Error(ie(405));var i=n!=null&&n.hydratedSources||null,r=!1,s="",o=Ux;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=Nx(e,null,t,1,n??null,r,!1,s,o),t[Ni]=e.current,Aa(t),i)for(t=0;t<i.length;t++)n=i[t],r=n._getVersion,r=r(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,r]:e.mutableSourceEagerHydrationData.push(n,r);return new nu(e)};Pn.render=function(t,e,n){if(!iu(e))throw Error(ie(200));return ru(null,t,e,!1,n)};Pn.unmountComponentAtNode=function(t){if(!iu(t))throw Error(ie(40));return t._reactRootContainer?(Jr(function(){ru(null,null,t,!1,function(){t._reactRootContainer=null,t[Ni]=null})}),!0):!1};Pn.unstable_batchedUpdates=Jf;Pn.unstable_renderSubtreeIntoContainer=function(t,e,n,i){if(!iu(n))throw Error(ie(200));if(t==null||t._reactInternals===void 0)throw Error(ie(38));return ru(t,e,n,!1,i)};Pn.version="18.3.1-next-f1338f8080-20240426";function kx(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(kx)}catch(t){console.error(t)}}kx(),k0.exports=Pn;var bM=k0.exports,Fx,$m=bM;Fx=$m.createRoot,$m.hydrateRoot;/**
 * @remix-run/router v1.23.4
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function ka(){return ka=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)({}).hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},ka.apply(null,arguments)}var rr;(function(t){t.Pop="POP",t.Push="PUSH",t.Replace="REPLACE"})(rr||(rr={}));const Ym="popstate";function AM(t){t===void 0&&(t={});function e(r,s){let{pathname:o="/",search:a="",hash:l=""}=os(r.location.hash.substr(1));return!o.startsWith("/")&&!o.startsWith(".")&&(o="/"+o),mh("",{pathname:o,search:a,hash:l},s.state&&s.state.usr||null,s.state&&s.state.key||"default")}function n(r,s){let o=r.document.querySelector("base"),a="";if(o&&o.getAttribute("href")){let l=r.location.href,c=l.indexOf("#");a=c===-1?l:l.slice(0,c)}return a+"#"+(typeof s=="string"?s:Ic(s))}function i(r,s){ap(r.pathname.charAt(0)==="/","relative pathnames are not supported in hash history.push("+JSON.stringify(s)+")")}return RM(e,n,i,t)}function bt(t,e){if(t===!1||t===null||typeof t>"u")throw new Error(e)}function ap(t,e){if(!t){typeof console<"u"&&console.warn(e);try{throw new Error(e)}catch{}}}function CM(){return Math.random().toString(36).substr(2,8)}function Km(t,e){return{usr:t.state,key:t.key,idx:e}}function mh(t,e,n,i){return n===void 0&&(n=null),ka({pathname:typeof t=="string"?t:t.pathname,search:"",hash:""},typeof e=="string"?os(e):e,{state:n,key:e&&e.key||i||CM()})}function Ic(t){let{pathname:e="/",search:n="",hash:i=""}=t;return n&&n!=="?"&&(e+=n.charAt(0)==="?"?n:"?"+n),i&&i!=="#"&&(e+=i.charAt(0)==="#"?i:"#"+i),e}function os(t){let e={};if(t){let n=t.indexOf("#");n>=0&&(e.hash=t.substr(n),t=t.substr(0,n));let i=t.indexOf("?");i>=0&&(e.search=t.substr(i),t=t.substr(0,i)),t&&(e.pathname=t)}return e}function RM(t,e,n,i){i===void 0&&(i={});let{window:r=document.defaultView,v5Compat:s=!1}=i,o=r.history,a=rr.Pop,l=null,c=u();c==null&&(c=0,o.replaceState(ka({},o.state,{idx:c}),""));function u(){return(o.state||{idx:null}).idx}function d(){a=rr.Pop;let g=u(),h=g==null?null:g-c;c=g,l&&l({action:a,location:v.location,delta:h})}function f(g,h){a=rr.Push;let _=mh(v.location,g,h);n&&n(_,g),c=u()+1;let y=Km(_,c),S=v.createHref(_);try{o.pushState(y,"",S)}catch(C){if(C instanceof DOMException&&C.name==="DataCloneError")throw C;r.location.assign(S)}s&&l&&l({action:a,location:v.location,delta:1})}function p(g,h){a=rr.Replace;let _=mh(v.location,g,h);n&&n(_,g),c=u();let y=Km(_,c),S=v.createHref(_);o.replaceState(y,"",S),s&&l&&l({action:a,location:v.location,delta:0})}function x(g){let h=r.location.origin!=="null"?r.location.origin:r.location.href,_=typeof g=="string"?g:Ic(g);return _=_.replace(/ $/,"%20"),bt(h,"No window.location.(origin|href) available to create URL for href: "+_),new URL(_,h)}let v={get action(){return a},get location(){return t(r,o)},listen(g){if(l)throw new Error("A history only accepts one active listener");return r.addEventListener(Ym,d),l=g,()=>{r.removeEventListener(Ym,d),l=null}},createHref(g){return e(r,g)},createURL:x,encodeLocation(g){let h=x(g);return{pathname:h.pathname,search:h.search,hash:h.hash}},push:f,replace:p,go(g){return o.go(g)}};return v}var Zm;(function(t){t.data="data",t.deferred="deferred",t.redirect="redirect",t.error="error"})(Zm||(Zm={}));function PM(t,e,n){return n===void 0&&(n="/"),LM(t,e,n)}function LM(t,e,n,i){let r=typeof e=="string"?os(e):e,s=po(r.pathname||"/",n);if(s==null)return null;let o=Ox(t);DM(o);let a=null,l=jM(s);for(let c=0;a==null&&c<o.length;++c)a=HM(o[c],l);return a}function Ox(t,e,n,i){e===void 0&&(e=[]),n===void 0&&(n=[]),i===void 0&&(i="");let r=(s,o,a)=>{let l={relativePath:a===void 0?s.path||"":a,caseSensitive:s.caseSensitive===!0,childrenIndex:o,route:s};l.relativePath.startsWith("/")&&(bt(l.relativePath.startsWith(i),'Absolute route path "'+l.relativePath+'" nested under path '+('"'+i+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),l.relativePath=l.relativePath.slice(i.length));let c=mr([i,l.relativePath]),u=n.concat(l);s.children&&s.children.length>0&&(bt(s.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+c+'".')),Ox(s.children,e,u,c)),!(s.path==null&&!s.index)&&e.push({path:c,score:zM(c,s.index),routesMeta:u})};return t.forEach((s,o)=>{var a;if(s.path===""||!((a=s.path)!=null&&a.includes("?")))r(s,o);else for(let l of zx(s.path))r(s,o,l)}),e}function zx(t){let e=t.split("/");if(e.length===0)return[];let[n,...i]=e,r=n.endsWith("?"),s=n.replace(/\?$/,"");if(i.length===0)return r?[s,""]:[s];let o=zx(i.join("/")),a=[];return a.push(...o.map(l=>l===""?s:[s,l].join("/"))),r&&a.push(...o),a.map(l=>t.startsWith("/")&&l===""?"/":l)}function DM(t){t.sort((e,n)=>e.score!==n.score?n.score-e.score:BM(e.routesMeta.map(i=>i.childrenIndex),n.routesMeta.map(i=>i.childrenIndex)))}const IM=/^:[\w-]+$/,NM=3,UM=2,kM=1,FM=10,OM=-2,Qm=t=>t==="*";function zM(t,e){let n=t.split("/"),i=n.length;return n.some(Qm)&&(i+=OM),e&&(i+=UM),n.filter(r=>!Qm(r)).reduce((r,s)=>r+(IM.test(s)?NM:s===""?kM:FM),i)}function BM(t,e){return t.length===e.length&&t.slice(0,-1).every((i,r)=>i===e[r])?t[t.length-1]-e[e.length-1]:0}function HM(t,e,n){let{routesMeta:i}=t,r={},s="/",o=[];for(let a=0;a<i.length;++a){let l=i[a],c=a===i.length-1,u=s==="/"?e:e.slice(s.length)||"/",d=gh({path:l.relativePath,caseSensitive:l.caseSensitive,end:c},u),f=l.route;if(!d)return null;Object.assign(r,d.params),o.push({params:r,pathname:mr([s,d.pathname]),pathnameBase:XM(mr([s,d.pathnameBase])),route:f}),d.pathnameBase!=="/"&&(s=mr([s,d.pathnameBase]))}return o}function gh(t,e){typeof t=="string"&&(t={path:t,caseSensitive:!1,end:!0});let[n,i]=VM(t.path,t.caseSensitive,t.end),r=e.match(n);if(!r)return null;let s=r[0],o=s.replace(/(.)\/+$/,"$1"),a=r.slice(1);return{params:i.reduce((c,u,d)=>{let{paramName:f,isOptional:p}=u;if(f==="*"){let v=a[d]||"";o=s.slice(0,s.length-v.length).replace(/(.)\/+$/,"$1")}const x=a[d];return p&&!x?c[f]=void 0:c[f]=(x||"").replace(/%2F/g,"/"),c},{}),pathname:s,pathnameBase:o,pattern:t}}function VM(t,e,n){e===void 0&&(e=!1),n===void 0&&(n=!0),ap(t==="*"||!t.endsWith("*")||t.endsWith("/*"),'Route path "'+t+'" will be treated as if it were '+('"'+t.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+t.replace(/\*$/,"/*")+'".'));let i=[],r="^"+t.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(o,a,l)=>(i.push({paramName:a,isOptional:l!=null}),l?"/?([^\\/]+)?":"/([^\\/]+)"));return t.endsWith("*")?(i.push({paramName:"*"}),r+=t==="*"||t==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?r+="\\/*$":t!==""&&t!=="/"&&(r+="(?:(?=\\/|$))"),[new RegExp(r,e?void 0:"i"),i]}function jM(t){try{return t.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(e){return ap(!1,'The URL path "'+t+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+e+").")),t}}function po(t,e){if(e==="/")return t;if(!t.toLowerCase().startsWith(e.toLowerCase()))return null;let n=e.endsWith("/")?e.length-1:e.length,i=t.charAt(n);return i&&i!=="/"?null:t.slice(n)||"/"}function GM(t,e){e===void 0&&(e="/");let{pathname:n,search:i="",hash:r=""}=typeof t=="string"?os(t):t,s;return n?(n=Vx(n),n.startsWith("/")?s=Jm(n.substring(1),"/"):s=Jm(n,e)):s=e,{pathname:s,search:qM(i),hash:$M(r)}}function Jm(t,e){let n=e.replace(/\/+$/,"").split("/");return t.split("/").forEach(r=>{r===".."?n.length>1&&n.pop():r!=="."&&n.push(r)}),n.length>1?n.join("/"):"/"}function Bu(t,e,n,i){return"Cannot include a '"+t+"' character in a manually specified "+("`to."+e+"` field ["+JSON.stringify(i)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function WM(t){return t.filter((e,n)=>n===0||e.route.path&&e.route.path.length>0)}function Bx(t,e){let n=WM(t);return e?n.map((i,r)=>r===n.length-1?i.pathname:i.pathnameBase):n.map(i=>i.pathnameBase)}function Hx(t,e,n,i){i===void 0&&(i=!1);let r;typeof t=="string"?r=os(t):(r=ka({},t),bt(!r.pathname||!r.pathname.includes("?"),Bu("?","pathname","search",r)),bt(!r.pathname||!r.pathname.includes("#"),Bu("#","pathname","hash",r)),bt(!r.search||!r.search.includes("#"),Bu("#","search","hash",r)));let s=t===""||r.pathname==="",o=s?"/":r.pathname,a;if(o==null)a=n;else{let d=e.length-1;if(!i&&o.startsWith("..")){let f=o.split("/");for(;f[0]==="..";)f.shift(),d-=1;r.pathname=f.join("/")}a=d>=0?e[d]:"/"}let l=GM(r,a),c=o&&o!=="/"&&o.endsWith("/"),u=(s||o===".")&&n.endsWith("/");return!l.pathname.endsWith("/")&&(c||u)&&(l.pathname+="/"),l}const Vx=t=>t.replace(/\/\/+/g,"/"),mr=t=>Vx(t.join("/")),XM=t=>t.replace(/\/+$/,"").replace(/^\/*/,"/"),qM=t=>!t||t==="?"?"":t.startsWith("?")?t:"?"+t,$M=t=>!t||t==="#"?"":t.startsWith("#")?t:"#"+t;function YM(t){return t!=null&&typeof t.status=="number"&&typeof t.statusText=="string"&&typeof t.internal=="boolean"&&"data"in t}const jx=["post","put","patch","delete"];new Set(jx);const KM=["get",...jx];new Set(KM);/**
 * React Router v6.30.6
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Fa(){return Fa=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)({}).hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},Fa.apply(null,arguments)}const su=te.createContext(null),Gx=te.createContext(null),br=te.createContext(null),ou=te.createContext(null),Ar=te.createContext({outlet:null,matches:[],isDataRoute:!1}),Wx=te.createContext(null);function ZM(t,e){let{relative:n}=e===void 0?{}:e;Ga()||bt(!1);let{basename:i,navigator:r}=te.useContext(br),{hash:s,pathname:o,search:a}=au(t,{relative:n}),l=o;return i!=="/"&&(l=o==="/"?i:mr([i,o])),r.createHref({pathname:l,search:a,hash:s})}function Ga(){return te.useContext(ou)!=null}function bo(){return Ga()||bt(!1),te.useContext(ou).location}function Xx(t){te.useContext(br).static||te.useLayoutEffect(t)}function QM(){let{isDataRoute:t}=te.useContext(Ar);return t?hE():JM()}function JM(){Ga()||bt(!1);let t=te.useContext(su),{basename:e,future:n,navigator:i}=te.useContext(br),{matches:r}=te.useContext(Ar),{pathname:s}=bo(),o=JSON.stringify(Bx(r,n.v7_relativeSplatPath)),a=te.useRef(!1);return Xx(()=>{a.current=!0}),te.useCallback(function(c,u){if(u===void 0&&(u={}),!a.current)return;if(typeof c=="number"){i.go(c);return}let d=Hx(c,JSON.parse(o),s,u.relative==="path");t==null&&e!=="/"&&(d.pathname=d.pathname==="/"?e:mr([e,d.pathname])),(u.replace?i.replace:i.push)(d,u.state,u)},[e,i,o,s,t])}function eE(){let{matches:t}=te.useContext(Ar),e=t[t.length-1];return e?e.params:{}}function au(t,e){let{relative:n}=e===void 0?{}:e,{future:i}=te.useContext(br),{matches:r}=te.useContext(Ar),{pathname:s}=bo(),o=JSON.stringify(Bx(r,i.v7_relativeSplatPath));return te.useMemo(()=>Hx(t,JSON.parse(o),s,n==="path"),[t,o,s,n])}function tE(t,e){return nE(t,e)}function nE(t,e,n,i){Ga()||bt(!1);let{navigator:r}=te.useContext(br),{matches:s}=te.useContext(Ar),o=s[s.length-1],a=o?o.params:{};o&&o.pathname;let l=o?o.pathnameBase:"/";o&&o.route;let c=bo(),u;if(e){var d;let g=typeof e=="string"?os(e):e;l==="/"||(d=g.pathname)!=null&&d.startsWith(l)||bt(!1),u=g}else u=c;let f=u.pathname||"/",p=f;if(l!=="/"){let g=l.replace(/^\//,"").split("/");p="/"+f.replace(/^\//,"").split("/").slice(g.length).join("/")}let x=PM(t,{pathname:p}),v=aE(x&&x.map(g=>Object.assign({},g,{params:Object.assign({},a,g.params),pathname:mr([l,r.encodeLocation?r.encodeLocation(g.pathname).pathname:g.pathname]),pathnameBase:g.pathnameBase==="/"?l:mr([l,r.encodeLocation?r.encodeLocation(g.pathnameBase).pathname:g.pathnameBase])})),s,n,i);return e&&v?te.createElement(ou.Provider,{value:{location:Fa({pathname:"/",search:"",hash:"",state:null,key:"default"},u),navigationType:rr.Pop}},v):v}function iE(){let t=dE(),e=YM(t)?t.status+" "+t.statusText:t instanceof Error?t.message:JSON.stringify(t),n=t instanceof Error?t.stack:null,r={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return te.createElement(te.Fragment,null,te.createElement("h2",null,"Unexpected Application Error!"),te.createElement("h3",{style:{fontStyle:"italic"}},e),n?te.createElement("pre",{style:r},n):null,null)}const rE=te.createElement(iE,null);class sE extends te.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,n){return n.location!==e.location||n.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:n.error,location:n.location,revalidation:e.revalidation||n.revalidation}}componentDidCatch(e,n){console.error("React Router caught the following error during render",e,n)}render(){return this.state.error!==void 0?te.createElement(Ar.Provider,{value:this.props.routeContext},te.createElement(Wx.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function oE(t){let{routeContext:e,match:n,children:i}=t,r=te.useContext(su);return r&&r.static&&r.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=n.route.id),te.createElement(Ar.Provider,{value:e},i)}function aE(t,e,n,i){var r;if(e===void 0&&(e=[]),n===void 0&&(n=null),i===void 0&&(i=null),t==null){var s;if(!n)return null;if(n.errors)t=n.matches;else if((s=i)!=null&&s.v7_partialHydration&&e.length===0&&!n.initialized&&n.matches.length>0)t=n.matches;else return null}let o=t,a=(r=n)==null?void 0:r.errors;if(a!=null){let u=o.findIndex(d=>d.route.id&&(a==null?void 0:a[d.route.id])!==void 0);u>=0||bt(!1),o=o.slice(0,Math.min(o.length,u+1))}let l=!1,c=-1;if(n&&i&&i.v7_partialHydration)for(let u=0;u<o.length;u++){let d=o[u];if((d.route.HydrateFallback||d.route.hydrateFallbackElement)&&(c=u),d.route.id){let{loaderData:f,errors:p}=n,x=d.route.loader&&f[d.route.id]===void 0&&(!p||p[d.route.id]===void 0);if(d.route.lazy||x){l=!0,c>=0?o=o.slice(0,c+1):o=[o[0]];break}}}return o.reduceRight((u,d,f)=>{let p,x=!1,v=null,g=null;n&&(p=a&&d.route.id?a[d.route.id]:void 0,v=d.route.errorElement||rE,l&&(c<0&&f===0?(fE("route-fallback"),x=!0,g=null):c===f&&(x=!0,g=d.route.hydrateFallbackElement||null)));let h=e.concat(o.slice(0,f+1)),_=()=>{let y;return p?y=v:x?y=g:d.route.Component?y=te.createElement(d.route.Component,null):d.route.element?y=d.route.element:y=u,te.createElement(oE,{match:d,routeContext:{outlet:u,matches:h,isDataRoute:n!=null},children:y})};return n&&(d.route.ErrorBoundary||d.route.errorElement||f===0)?te.createElement(sE,{location:n.location,revalidation:n.revalidation,component:v,error:p,children:_(),routeContext:{outlet:null,matches:h,isDataRoute:!0}}):_()},null)}var qx=function(t){return t.UseBlocker="useBlocker",t.UseRevalidator="useRevalidator",t.UseNavigateStable="useNavigate",t}(qx||{}),$x=function(t){return t.UseBlocker="useBlocker",t.UseLoaderData="useLoaderData",t.UseActionData="useActionData",t.UseRouteError="useRouteError",t.UseNavigation="useNavigation",t.UseRouteLoaderData="useRouteLoaderData",t.UseMatches="useMatches",t.UseRevalidator="useRevalidator",t.UseNavigateStable="useNavigate",t.UseRouteId="useRouteId",t}($x||{});function lE(t){let e=te.useContext(su);return e||bt(!1),e}function cE(t){let e=te.useContext(Gx);return e||bt(!1),e}function uE(t){let e=te.useContext(Ar);return e||bt(!1),e}function Yx(t){let e=uE(),n=e.matches[e.matches.length-1];return n.route.id||bt(!1),n.route.id}function dE(){var t;let e=te.useContext(Wx),n=cE(),i=Yx();return e!==void 0?e:(t=n.errors)==null?void 0:t[i]}function hE(){let{router:t}=lE(qx.UseNavigateStable),e=Yx($x.UseNavigateStable),n=te.useRef(!1);return Xx(()=>{n.current=!0}),te.useCallback(function(r,s){s===void 0&&(s={}),n.current&&(typeof r=="number"?t.navigate(r):t.navigate(r,Fa({fromRouteId:e},s)))},[t,e])}const eg={};function fE(t,e,n){eg[t]||(eg[t]=!0)}function pE(t,e){t==null||t.v7_startTransition,t==null||t.v7_relativeSplatPath}function $i(t){bt(!1)}function mE(t){let{basename:e="/",children:n=null,location:i,navigationType:r=rr.Pop,navigator:s,static:o=!1,future:a}=t;Ga()&&bt(!1);let l=e.replace(/^\/*/,"/"),c=te.useMemo(()=>({basename:l,navigator:s,static:o,future:Fa({v7_relativeSplatPath:!1},a)}),[l,a,s,o]);typeof i=="string"&&(i=os(i));let{pathname:u="/",search:d="",hash:f="",state:p=null,key:x="default"}=i,v=te.useMemo(()=>{let g=po(u,l);return g==null?null:{location:{pathname:g,search:d,hash:f,state:p,key:x},navigationType:r}},[l,u,d,f,p,x,r]);return v==null?null:te.createElement(br.Provider,{value:c},te.createElement(ou.Provider,{children:n,value:v}))}function gE(t){let{children:e,location:n}=t;return tE(vh(e),n)}new Promise(()=>{});function vh(t,e){e===void 0&&(e=[]);let n=[];return te.Children.forEach(t,(i,r)=>{if(!te.isValidElement(i))return;let s=[...e,r];if(i.type===te.Fragment){n.push.apply(n,vh(i.props.children,s));return}i.type!==$i&&bt(!1),!i.props.index||!i.props.children||bt(!1);let o={id:i.props.id||s.join("-"),caseSensitive:i.props.caseSensitive,element:i.props.element,Component:i.props.Component,index:i.props.index,path:i.props.path,loader:i.props.loader,action:i.props.action,errorElement:i.props.errorElement,ErrorBoundary:i.props.ErrorBoundary,hasErrorBoundary:i.props.ErrorBoundary!=null||i.props.errorElement!=null,shouldRevalidate:i.props.shouldRevalidate,handle:i.props.handle,lazy:i.props.lazy};i.props.children&&(o.children=vh(i.props.children,s)),n.push(o)}),n}/**
 * React Router DOM v6.30.6
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Nc(){return Nc=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)({}).hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},Nc.apply(null,arguments)}function Kx(t,e){if(t==null)return{};var n={};for(var i in t)if({}.hasOwnProperty.call(t,i)){if(e.indexOf(i)!==-1)continue;n[i]=t[i]}return n}function vE(t){return!!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)}function xE(t,e){return t.button===0&&(!e||e==="_self")&&!vE(t)}const _E=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],yE=["aria-current","caseSensitive","className","end","style","to","viewTransition","children"],SE="6";try{window.__reactRouterVersion=SE}catch{}const ME=te.createContext({isTransitioning:!1}),EE="startTransition",tg=my[EE];function wE(t){let{basename:e,children:n,future:i,window:r}=t,s=te.useRef();s.current==null&&(s.current=AM({window:r,v5Compat:!0}));let o=s.current,[a,l]=te.useState({action:o.action,location:o.location}),{v7_startTransition:c}=i||{},u=te.useCallback(d=>{c&&tg?tg(()=>l(d)):l(d)},[l,c]);return te.useLayoutEffect(()=>o.listen(u),[o,u]),te.useEffect(()=>pE(i),[i]),te.createElement(mE,{basename:e,children:n,location:a.location,navigationType:a.action,navigator:o,future:i})}const TE=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",bE=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,sr=te.forwardRef(function(e,n){let{onClick:i,relative:r,reloadDocument:s,replace:o,state:a,target:l,to:c,preventScrollReset:u,viewTransition:d}=e,f=Kx(e,_E),{basename:p}=te.useContext(br),x,v=!1;if(typeof c=="string"&&bE.test(c)&&(x=c,TE))try{let y=new URL(window.location.href),S=c.startsWith("//")?new URL(y.protocol+c):new URL(c),C=po(S.pathname,p);S.origin===y.origin&&C!=null?c=C+S.search+S.hash:v=!0}catch{}let g=ZM(c,{relative:r}),h=CE(c,{replace:o,state:a,target:l,preventScrollReset:u,relative:r,viewTransition:d});function _(y){i&&i(y),y.defaultPrevented||h(y)}return te.createElement("a",Nc({},f,{href:x||g,onClick:v||s?i:_,ref:n,target:l}))}),fs=te.forwardRef(function(e,n){let{"aria-current":i="page",caseSensitive:r=!1,className:s="",end:o=!1,style:a,to:l,viewTransition:c,children:u}=e,d=Kx(e,yE),f=au(l,{relative:d.relative}),p=bo(),x=te.useContext(Gx),{navigator:v,basename:g}=te.useContext(br),h=x!=null&&RE(f)&&c===!0,_=v.encodeLocation?v.encodeLocation(f).pathname:f.pathname,y=p.pathname,S=x&&x.navigation&&x.navigation.location?x.navigation.location.pathname:null;r||(y=y.toLowerCase(),S=S?S.toLowerCase():null,_=_.toLowerCase()),S&&g&&(S=po(S,g)||S);const C=_!=="/"&&_.endsWith("/")?_.length-1:_.length;let A=y===_||!o&&y.startsWith(_)&&y.charAt(C)==="/",b=S!=null&&(S===_||!o&&S.startsWith(_)&&S.charAt(_.length)==="/"),P={isActive:A,isPending:b,isTransitioning:h},T=A?i:void 0,M;typeof s=="function"?M=s(P):M=[s,A?"active":null,b?"pending":null,h?"transitioning":null].filter(Boolean).join(" ");let L=typeof a=="function"?a(P):a;return te.createElement(sr,Nc({},d,{"aria-current":T,className:M,ref:n,style:L,to:l,viewTransition:c}),typeof u=="function"?u(P):u)});var xh;(function(t){t.UseScrollRestoration="useScrollRestoration",t.UseSubmit="useSubmit",t.UseSubmitFetcher="useSubmitFetcher",t.UseFetcher="useFetcher",t.useViewTransitionState="useViewTransitionState"})(xh||(xh={}));var ng;(function(t){t.UseFetcher="useFetcher",t.UseFetchers="useFetchers",t.UseScrollRestoration="useScrollRestoration"})(ng||(ng={}));function AE(t){let e=te.useContext(su);return e||bt(!1),e}function CE(t,e){let{target:n,replace:i,state:r,preventScrollReset:s,relative:o,viewTransition:a}=e===void 0?{}:e,l=QM(),c=bo(),u=au(t,{relative:o});return te.useCallback(d=>{if(xE(d,n)){d.preventDefault();let f=i!==void 0?i:Ic(c)===Ic(u);l(t,{replace:f,state:r,preventScrollReset:s,relative:o,viewTransition:a})}},[c,l,u,i,r,n,t,s,o,a])}function RE(t,e){e===void 0&&(e={});let n=te.useContext(ME);n==null&&bt(!1);let{basename:i}=AE(xh.useViewTransitionState),r=au(t,{relative:e.relative});if(!n.isTransitioning)return!1;let s=po(n.currentLocation.pathname,i)||n.currentLocation.pathname,o=po(n.nextLocation.pathname,i)||n.nextLocation.pathname;return gh(r.pathname,o)!=null||gh(r.pathname,s)!=null}const eo=[{n:1,jour:1,horaire:"9 h 00 à 11 h 00",titre:"Solutions IA pour la prise de décision",court:"Règles, réseaux bayésiens, apprentissage supervisé",notebook:"01_solutions_ia_decision",probleme:"Le superviseur d'une flotte de robots reçoit des mesures (batterie, température, vibrations, distance aux obstacles) et doit décider : continuer, ralentir, arrêter ou envoyer en maintenance. Quelle famille de solutions IA choisir, et sur quels critères ?",syllabus:["Exploration des approches basées sur des règles, réseaux bayésiens et apprentissage supervisé","Analyse des limites et avantages des différentes solutions IA","Étude de cas : systèmes de recommandation et diagnostic médical"],tp:"Identifier et comparer des solutions IA adaptées à un problème donné.",notebookPoints:["Système décisionnel à règles, avec trace des règles déclenchées","Réseau bayésien et inférence exacte par énumération","Classifieur supervisé PyTorch, entraîné sur GPU si disponible","Matrices de confusion, comportement hors distribution","Études de cas : diagnostic médical (effet de la prévalence) et recommandation (factorisation de matrice)"],scene:null,synthese:["Les règles sont lisibles et vérifiables, mais leurs seuils sont figés.","Un réseau bayésien raisonne sous incertitude et explique ses probabilités, au prix d'un modèle à construire.","Un modèle supervisé capte des régularités non écrites, à condition de disposer de données représentatives.","Le choix dépend des données disponibles, du besoin d'explication et du coût d'une erreur."]},{n:2,jour:1,horaire:"11 h 15 à 13 h 15",titre:"Concept des agents intelligents et interactions avec l'environnement",court:"Capteurs, effecteurs, boucle perception, décision, action",notebook:"02_agent_environnement",probleme:"Un robot doit rejoindre une zone de livraison dans un entrepôt. Que perçoit-il réellement ? Comment ses actions modifient-elles l'environnement ? Et que se passe-t-il quand ses capteurs se trompent ?",syllabus:["Définition et caractéristiques d'un agent intelligent","Modèles d'interaction avec l'environnement via capteurs et effecteurs","Exemples d'applications en robotique et domotique"],tp:"Simuler les interactions d'un agent avec son environnement dans un scénario donné.",notebookPoints:["Construction d'un environnement simulé, d'abord à la main puis avec le simulateur","Définition des observations (lidar à 8 rayons) et des actions","Exécution pas à pas de la boucle","État réel contre état observé : bruit et rayons perdus","Export d'une trace rejouable dans la scène 3D"],scene:{traces:["m2_reactif_ouvert","m2_reactif_bruit","m2_hybride_entrepot"],a:"m2_hybride_entrepot",b:"",consigne:"Activez « Vue éclatée du robot » pour isoler capteurs, calculateur et effecteurs. Avancez étape par étape et comparez les rayons du lidar aux obstacles réels. Chargez ensuite « lidar bruité » : l'anneau rouge et les rayons ne correspondent plus exactement à la réalité."},synthese:["Un agent se définit par ce qu'il perçoit, ce qu'il décide et ce qu'il fait.","L'observation n'est jamais l'état réel : elle est partielle et bruitée.","La boucle perception, décision, action se répète à chaque pas de temps.","Une trace complète (état, observation, décision, action, résultat) rend un comportement analysable."]},{n:3,jour:1,horaire:"14 h 15 à 16 h 15",titre:"Architecture des agents intelligents",court:"Modèles réactifs, délibératifs et hybrides",notebook:"03_architectures_agents",probleme:"Le même robot, le même entrepôt, trois façons d'organiser perception, décision et action. Laquelle sort d'un cul-de-sac ? Laquelle survit à une palette déposée sur son trajet ?",syllabus:["Modèles réactifs, délibératifs et hybrides","Intégration des modules de perception, décision et action","Discussion sur les défis d'implémentation en environnements réels"],tp:"Concevoir l'architecture d'un agent pour un cas pratique spécifique.",notebookPoints:["Trois contrôleurs écrits dans le notebook, dont A* pour la planification","Mêmes scénarios et mêmes graines pour les trois architectures","Trajectoires, temps de décision, collisions, taux de réussite","Complexité croissante sur des entrepôts aléatoires","Exercice de conception guidé"],scene:{traces:["m3_reactif_piege","m3_deliberatif_piege","m3_hybride_piege","m3_reactif_entrepot","m3_deliberatif_entrepot","m3_hybride_entrepot"],a:"m3_hybride_entrepot",b:"m3_deliberatif_entrepot",consigne:"Deux robots partent du même point : l'hybride en bleu, le délibératif en orange. À l'étape 6, une palette est déposée sur le trajet prévu. Mettez en pause à cet instant et lisez les deux décisions dans le panneau de droite."},synthese:["L'architecture réactive est rapide et simple, mais sans mémoire ni anticipation.","L'architecture délibérative optimise un plan sur un modèle qui peut devenir faux.","L'architecture hybride combine un plan à long terme et une garde réactive à court terme.","En environnement réel, la difficulté vient de l'écart entre le modèle et le monde."]},{n:4,jour:2,horaire:"9 h 00 à 11 h 00",titre:"Techniques d'optimisation pour les agents",court:"Programmation sous contraintes, recuit simulé",notebook:"04_optimisation",probleme:"Le robot doit collecter des colis dans neuf stations. Certaines collectes doivent précéder d'autres, certaines stations ne sont ouvertes que pendant une fenêtre de temps. Dans quel ordre les visiter pour parcourir la plus courte distance ?",syllabus:["Programmation sous contraintes : principes et applications","Recuit simulé : concept et implémentation","Comparaison des approches selon les contraintes de performance"],tp:"Résoudre un problème d'optimisation avec programmation sous contraintes et recuit simulé.",notebookPoints:["Modélisation : variables, domaines, contraintes, objectif","Retour arrière avec propagation écrit à la main, puis CP-SAT (OR-Tools)","Recuit simulé : voisinage, critère de Metropolis, refroidissement","Effet de la température, du nombre d'itérations et des contraintes","Chaînes de recuit parallèles en PyTorch, sur GPU si disponible"],scene:null,synthese:["La programmation sous contraintes sépare le modèle (quoi) du solveur (comment) et peut prouver l'optimalité.","Le recuit simulé accepte temporairement de dégrader la solution pour quitter les minimums locaux.","Le réglage de la température pilote le compromis entre exploration et exploitation.","Le choix dépend de la taille du problème, du temps disponible et du besoin de garantie."]},{n:5,jour:2,horaire:"11 h 15 à 13 h 15",titre:"Autonomie des systèmes robotisés",court:"Incertitudes, obstacles dynamiques, apprentissage",notebook:"05_autonomie_robotique",probleme:"Les roues glissent, le lidar est bruité, la localisation dérive et une palette tombe sur le trajet. Comment le robot peut-il rester autonome quand ni ses capteurs ni ses actions ne sont fiables ?",syllabus:["Boucle perception-décision-action : structure et fonctionnement","Gestion des incertitudes dans un environnement dynamique","Intégration des algorithmes d'apprentissage pour l'autonomie des systèmes"],tp:"Implémenter un algorithme simple d'autonomie pour un robot simulé.",notebookPoints:["Boucle perception, décision, action écrite explicitement","Filtre bayésien discret : prédiction et correction","Politique simple contre politique améliorée, sur plusieurs graines","Q-learning vectorisé : des centaines de robots apprennent en parallèle","Agent appris protégé par une garde réactive"],scene:{traces:["m5_naif","m5_robuste"],a:"m5_robuste",b:"m5_naif",consigne:"Les tuiles orange représentent la croyance du robot bleu sur sa propre position, l'anneau rouge la position mesurée, l'anneau vert la position estimée par le filtre. Le robot orange fait confiance à la mesure brute. Comparez le nombre d'étapes nécessaires."},synthese:["L'autonomie repose sur une boucle fermée : chaque action est suivie d'une nouvelle perception.","Une croyance probabiliste absorbe le bruit des capteurs et les glissements.","Décider sur une estimation filtrée évite les replanifications inutiles.","Une politique apprise gagne à être encadrée par une couche de sécurité réactive."]},{n:6,jour:2,horaire:"14 h 15 à 16 h 15",titre:"Tests et validation des systèmes",court:"Scénarios de test, robustesse, rapport de validation",notebook:"06_tests_validation",probleme:"L'agent réussit sa mission en démonstration. Est-il prêt pour autant ? Combien de simulations faut-il, dans quelles conditions, et avec quels critères d'acceptation, avant d'envisager un déploiement réel ?",syllabus:["Conception de scénarios de test pour agents intelligents","Évaluation des performances et robustesse en conditions simulées","Documentation et bonnes pratiques pour déploiement réel"],tp:"Tester et analyser les performances d'un agent autonome dans un environnement simulé.",notebookPoints:["Scénarios nominal, dégradé et limite","Campagne de milliers de simulations parallèles (GPU si disponible)","Taux de réussite avec intervalle de confiance, collisions, longueur des trajectoires","Test de non-régression par seuils d'acceptation","Rejeu d'un échec et génération d'un rapport de validation"],scene:{traces:["m6_nominal_naif","m6_nominal_robuste","m6_degrade_naif","m6_degrade_robuste","m6_limite_naif","m6_limite_robuste"],a:"m6_limite_robuste",b:"m6_limite_naif",consigne:"Scénario limite : capteurs très bruités et roues qui glissent. L'agent corrigé est en bleu, l'agent d'origine en orange. Repérez les collisions (le châssis devient rouge) et rejouez-les étape par étape."},synthese:["Une exécution réussie ne valide rien : il faut une distribution de résultats.","Les scénarios de test couvrent le nominal, le dégradé et les limites.","Un taux de réussite s'accompagne toujours d'un intervalle de confiance.","Tout échec doit être rejouable : graine, paramètres et trace sont conservés."]}],PE="martinobettucci/4-120",LE="ccr-bec48111-ubv88o",DE=t=>`https://colab.research.google.com/github/${PE}/blob/${LE}/notebooks/${t}.ipynb`;/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const lp="170",to={ROTATE:0,DOLLY:1,PAN:2},Ws={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},IE=0,ig=1,NE=2,Zx=1,Qx=2,Ti=3,Sr=0,vn=1,ui=2,gr=0,no=1,rg=2,sg=3,og=4,UE=5,Or=100,kE=101,FE=102,OE=103,zE=104,BE=200,HE=201,VE=202,jE=203,_h=204,yh=205,GE=206,WE=207,XE=208,qE=209,$E=210,YE=211,KE=212,ZE=213,QE=214,Sh=0,Mh=1,Eh=2,mo=3,wh=4,Th=5,bh=6,Ah=7,Jx=0,JE=1,e1=2,vr=0,t1=1,n1=2,i1=3,r1=4,s1=5,o1=6,a1=7,e_=300,go=301,vo=302,Ch=303,Rh=304,lu=306,Ph=1e3,Wr=1001,Lh=1002,Cn=1003,l1=1004,fl=1005,hi=1006,Hu=1007,Xr=1008,Fi=1009,t_=1010,n_=1011,Oa=1012,cp=1013,es=1014,fi=1015,Wa=1016,up=1017,dp=1018,xo=1020,i_=35902,r_=1021,s_=1022,ti=1023,o_=1024,a_=1025,io=1026,_o=1027,hp=1028,fp=1029,l_=1030,pp=1031,mp=1033,tc=33776,nc=33777,ic=33778,rc=33779,Dh=35840,Ih=35841,Nh=35842,Uh=35843,kh=36196,Fh=37492,Oh=37496,zh=37808,Bh=37809,Hh=37810,Vh=37811,jh=37812,Gh=37813,Wh=37814,Xh=37815,qh=37816,$h=37817,Yh=37818,Kh=37819,Zh=37820,Qh=37821,sc=36492,Jh=36494,ef=36495,c_=36283,tf=36284,nf=36285,rf=36286,c1=3200,u1=3201,u_=0,d1=1,tr="",wn="srgb",Ao="srgb-linear",cu="linear",nt="srgb",ps=7680,ag=519,h1=512,f1=513,p1=514,d_=515,m1=516,g1=517,v1=518,x1=519,sf=35044,lg="300 es",Pi=2e3,Uc=2001;class as{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const Kt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],oc=Math.PI/180,of=180/Math.PI;function xr(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Kt[t&255]+Kt[t>>8&255]+Kt[t>>16&255]+Kt[t>>24&255]+"-"+Kt[e&255]+Kt[e>>8&255]+"-"+Kt[e>>16&15|64]+Kt[e>>24&255]+"-"+Kt[n&63|128]+Kt[n>>8&255]+"-"+Kt[n>>16&255]+Kt[n>>24&255]+Kt[i&255]+Kt[i>>8&255]+Kt[i>>16&255]+Kt[i>>24&255]).toLowerCase()}function on(t,e,n){return Math.max(e,Math.min(n,t))}function _1(t,e){return(t%e+e)%e}function Vu(t,e,n){return(1-n)*t+n*e}function di(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function it(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}const y1={DEG2RAD:oc};class be{constructor(e=0,n=0){be.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(on(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ke{constructor(e,n,i,r,s,o,a,l,c){ke.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,c)}set(e,n,i,r,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=n,u[4]=s,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],d=i[7],f=i[2],p=i[5],x=i[8],v=r[0],g=r[3],h=r[6],_=r[1],y=r[4],S=r[7],C=r[2],A=r[5],b=r[8];return s[0]=o*v+a*_+l*C,s[3]=o*g+a*y+l*A,s[6]=o*h+a*S+l*b,s[1]=c*v+u*_+d*C,s[4]=c*g+u*y+d*A,s[7]=c*h+u*S+d*b,s[2]=f*v+p*_+x*C,s[5]=f*g+p*y+x*A,s[8]=f*h+p*S+x*b,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return n*o*u-n*a*c-i*s*u+i*a*l+r*s*c-r*o*l}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=u*o-a*c,f=a*l-u*s,p=c*s-o*l,x=n*d+i*f+r*p;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/x;return e[0]=d*v,e[1]=(r*c-u*i)*v,e[2]=(a*i-r*o)*v,e[3]=f*v,e[4]=(u*n-r*l)*v,e[5]=(r*s-a*n)*v,e[6]=p*v,e[7]=(i*l-c*n)*v,e[8]=(o*n-i*s)*v,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+n,0,0,1),this}scale(e,n){return this.premultiply(ju.makeScale(e,n)),this}rotate(e){return this.premultiply(ju.makeRotation(-e)),this}translate(e,n){return this.premultiply(ju.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ju=new ke;function h_(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function kc(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function S1(){const t=kc("canvas");return t.style.display="block",t}const cg={};function sa(t){t in cg||(cg[t]=!0,console.warn(t))}function M1(t,e,n){return new Promise(function(i,r){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:r();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}function E1(t){const e=t.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function w1(t){const e=t.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const qe={enabled:!0,workingColorSpace:Ao,spaces:{},convert:function(t,e,n){return this.enabled===!1||e===n||!e||!n||(this.spaces[e].transfer===nt&&(t.r=Di(t.r),t.g=Di(t.g),t.b=Di(t.b)),this.spaces[e].primaries!==this.spaces[n].primaries&&(t.applyMatrix3(this.spaces[e].toXYZ),t.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===nt&&(t.r=ro(t.r),t.g=ro(t.g),t.b=ro(t.b))),t},fromWorkingColorSpace:function(t,e){return this.convert(t,this.workingColorSpace,e)},toWorkingColorSpace:function(t,e){return this.convert(t,e,this.workingColorSpace)},getPrimaries:function(t){return this.spaces[t].primaries},getTransfer:function(t){return t===tr?cu:this.spaces[t].transfer},getLuminanceCoefficients:function(t,e=this.workingColorSpace){return t.fromArray(this.spaces[e].luminanceCoefficients)},define:function(t){Object.assign(this.spaces,t)},_getMatrix:function(t,e,n){return t.copy(this.spaces[e].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(t){return this.spaces[t].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(t=this.workingColorSpace){return this.spaces[t].workingColorSpaceConfig.unpackColorSpace}};function Di(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function ro(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}const ug=[.64,.33,.3,.6,.15,.06],dg=[.2126,.7152,.0722],hg=[.3127,.329],fg=new ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),pg=new ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);qe.define({[Ao]:{primaries:ug,whitePoint:hg,transfer:cu,toXYZ:fg,fromXYZ:pg,luminanceCoefficients:dg,workingColorSpaceConfig:{unpackColorSpace:wn},outputColorSpaceConfig:{drawingBufferColorSpace:wn}},[wn]:{primaries:ug,whitePoint:hg,transfer:nt,toXYZ:fg,fromXYZ:pg,luminanceCoefficients:dg,outputColorSpaceConfig:{drawingBufferColorSpace:wn}}});let ms;class T1{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ms===void 0&&(ms=kc("canvas")),ms.width=e.width,ms.height=e.height;const i=ms.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=ms}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=kc("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Di(s[o]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Di(n[i]/255)*255):n[i]=Di(n[i]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let b1=0;class f_{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:b1++}),this.uuid=xr(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Gu(r[o].image)):s.push(Gu(r[o]))}else s=Gu(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function Gu(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?T1.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let A1=0;class Jt extends as{constructor(e=Jt.DEFAULT_IMAGE,n=Jt.DEFAULT_MAPPING,i=Wr,r=Wr,s=hi,o=Xr,a=ti,l=Fi,c=Jt.DEFAULT_ANISOTROPY,u=tr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:A1++}),this.uuid=xr(),this.name="",this.source=new f_(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new be(0,0),this.repeat=new be(1,1),this.center=new be(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==e_)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ph:e.x=e.x-Math.floor(e.x);break;case Wr:e.x=e.x<0?0:1;break;case Lh:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ph:e.y=e.y-Math.floor(e.y);break;case Wr:e.y=e.y<0?0:1;break;case Lh:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Jt.DEFAULT_IMAGE=null;Jt.DEFAULT_MAPPING=e_;Jt.DEFAULT_ANISOTROPY=1;class Tt{constructor(e=0,n=0,i=0,r=1){Tt.prototype.isVector4=!0,this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*n+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*n+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*n+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*n+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const l=e.elements,c=l[0],u=l[4],d=l[8],f=l[1],p=l[5],x=l[9],v=l[2],g=l[6],h=l[10];if(Math.abs(u-f)<.01&&Math.abs(d-v)<.01&&Math.abs(x-g)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+v)<.1&&Math.abs(x+g)<.1&&Math.abs(c+p+h-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const y=(c+1)/2,S=(p+1)/2,C=(h+1)/2,A=(u+f)/4,b=(d+v)/4,P=(x+g)/4;return y>S&&y>C?y<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(y),r=A/i,s=b/i):S>C?S<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(S),i=A/r,s=P/r):C<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(C),i=b/s,r=P/s),this.set(i,r,s,n),this}let _=Math.sqrt((g-x)*(g-x)+(d-v)*(d-v)+(f-u)*(f-u));return Math.abs(_)<.001&&(_=1),this.x=(g-x)/_,this.y=(d-v)/_,this.z=(f-u)/_,this.w=Math.acos((c+p+h-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this.w=Math.max(e.w,Math.min(n.w,this.w)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this.w=Math.max(e,Math.min(n,this.w)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class C1 extends as{constructor(e=1,n=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=1,this.scissor=new Tt(0,0,e,n),this.scissorTest=!1,this.viewport=new Tt(0,0,e,n);const r={width:e,height:n,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:hi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new Jt(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=n,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const n=Object.assign({},e.texture.image);return this.texture.source=new f_(n),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ts extends C1{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class p_ extends Jt{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Cn,this.minFilter=Cn,this.wrapR=Wr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class R1 extends Jt{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Cn,this.minFilter=Cn,this.wrapR=Wr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ns{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,o,a){let l=i[r+0],c=i[r+1],u=i[r+2],d=i[r+3];const f=s[o+0],p=s[o+1],x=s[o+2],v=s[o+3];if(a===0){e[n+0]=l,e[n+1]=c,e[n+2]=u,e[n+3]=d;return}if(a===1){e[n+0]=f,e[n+1]=p,e[n+2]=x,e[n+3]=v;return}if(d!==v||l!==f||c!==p||u!==x){let g=1-a;const h=l*f+c*p+u*x+d*v,_=h>=0?1:-1,y=1-h*h;if(y>Number.EPSILON){const C=Math.sqrt(y),A=Math.atan2(C,h*_);g=Math.sin(g*A)/C,a=Math.sin(a*A)/C}const S=a*_;if(l=l*g+f*S,c=c*g+p*S,u=u*g+x*S,d=d*g+v*S,g===1-a){const C=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=C,c*=C,u*=C,d*=C}}e[n]=l,e[n+1]=c,e[n+2]=u,e[n+3]=d}static multiplyQuaternionsFlat(e,n,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],u=i[r+3],d=s[o],f=s[o+1],p=s[o+2],x=s[o+3];return e[n]=a*x+u*d+l*p-c*f,e[n+1]=l*x+u*f+c*d-a*p,e[n+2]=c*x+u*p+a*f-l*d,e[n+3]=u*x-a*d-l*f-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(r/2),d=a(s/2),f=l(i/2),p=l(r/2),x=l(s/2);switch(o){case"XYZ":this._x=f*u*d+c*p*x,this._y=c*p*d-f*u*x,this._z=c*u*x+f*p*d,this._w=c*u*d-f*p*x;break;case"YXZ":this._x=f*u*d+c*p*x,this._y=c*p*d-f*u*x,this._z=c*u*x-f*p*d,this._w=c*u*d+f*p*x;break;case"ZXY":this._x=f*u*d-c*p*x,this._y=c*p*d+f*u*x,this._z=c*u*x+f*p*d,this._w=c*u*d-f*p*x;break;case"ZYX":this._x=f*u*d-c*p*x,this._y=c*p*d+f*u*x,this._z=c*u*x-f*p*d,this._w=c*u*d+f*p*x;break;case"YZX":this._x=f*u*d+c*p*x,this._y=c*p*d+f*u*x,this._z=c*u*x-f*p*d,this._w=c*u*d-f*p*x;break;case"XZY":this._x=f*u*d-c*p*x,this._y=c*p*d-f*u*x,this._z=c*u*x+f*p*d,this._w=c*u*d+f*p*x;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],o=n[1],a=n[5],l=n[9],c=n[2],u=n[6],d=n[10],f=i+a+d;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(u-l)*p,this._y=(s-c)*p,this._z=(o-r)*p}else if(i>a&&i>d){const p=2*Math.sqrt(1+i-a-d);this._w=(u-l)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+c)/p}else if(a>d){const p=2*Math.sqrt(1+a-i-d);this._w=(s-c)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+d-i-a);this._w=(o-r)/p,this._x=(s+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(on(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,o=e._w,a=n._x,l=n._y,c=n._z,u=n._w;return this._x=i*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-i*c,this._z=s*u+o*c+i*l-r*a,this._w=o*u-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-n;return this._w=p*o+n*this._w,this._x=p*i+n*this._x,this._y=p*r+n*this._y,this._z=p*s+n*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),d=Math.sin((1-n)*u)/c,f=Math.sin(n*u)/c;return this._w=o*d+this._w*f,this._x=i*d+this._x*f,this._y=r*d+this._y*f,this._z=s*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class N{constructor(e=0,n=0,i=0){N.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(mg.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(mg.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),u=2*(a*n-s*r),d=2*(s*i-o*n);return this.x=n+l*c+o*d-a*u,this.y=i+l*u+a*c-s*d,this.z=r+l*d+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Math.max(e.x,Math.min(n.x,this.x)),this.y=Math.max(e.y,Math.min(n.y,this.y)),this.z=Math.max(e.z,Math.min(n.z,this.z)),this}clampScalar(e,n){return this.x=Math.max(e,Math.min(n,this.x)),this.y=Math.max(e,Math.min(n,this.y)),this.z=Math.max(e,Math.min(n,this.z)),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,o=n.x,a=n.y,l=n.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Wu.copy(this).projectOnVector(e),this.sub(Wu)}reflect(e){return this.sub(Wu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(on(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Wu=new N,mg=new ns;class ls{constructor(e=new N(1/0,1/0,1/0),n=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(Yn.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(Yn.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=Yn.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Yn):Yn.fromBufferAttribute(s,o),Yn.applyMatrix4(e.matrixWorld),this.expandByPoint(Yn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),pl.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),pl.copy(i.boundingBox)),pl.applyMatrix4(e.matrixWorld),this.union(pl)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Yn),Yn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Vo),ml.subVectors(this.max,Vo),gs.subVectors(e.a,Vo),vs.subVectors(e.b,Vo),xs.subVectors(e.c,Vo),Vi.subVectors(vs,gs),ji.subVectors(xs,vs),Rr.subVectors(gs,xs);let n=[0,-Vi.z,Vi.y,0,-ji.z,ji.y,0,-Rr.z,Rr.y,Vi.z,0,-Vi.x,ji.z,0,-ji.x,Rr.z,0,-Rr.x,-Vi.y,Vi.x,0,-ji.y,ji.x,0,-Rr.y,Rr.x,0];return!Xu(n,gs,vs,xs,ml)||(n=[1,0,0,0,1,0,0,0,1],!Xu(n,gs,vs,xs,ml))?!1:(gl.crossVectors(Vi,ji),n=[gl.x,gl.y,gl.z],Xu(n,gs,vs,xs,ml))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Yn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Yn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(yi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),yi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),yi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),yi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),yi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),yi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),yi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),yi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(yi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const yi=[new N,new N,new N,new N,new N,new N,new N,new N],Yn=new N,pl=new ls,gs=new N,vs=new N,xs=new N,Vi=new N,ji=new N,Rr=new N,Vo=new N,ml=new N,gl=new N,Pr=new N;function Xu(t,e,n,i,r){for(let s=0,o=t.length-3;s<=o;s+=3){Pr.fromArray(t,s);const a=r.x*Math.abs(Pr.x)+r.y*Math.abs(Pr.y)+r.z*Math.abs(Pr.z),l=e.dot(Pr),c=n.dot(Pr),u=i.dot(Pr);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const P1=new ls,jo=new N,qu=new N;class Co{constructor(e=new N,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):P1.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;jo.subVectors(e,this.center);const n=jo.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(jo,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(qu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(jo.copy(e.center).add(qu)),this.expandByPoint(jo.copy(e.center).sub(qu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Si=new N,$u=new N,vl=new N,Gi=new N,Yu=new N,xl=new N,Ku=new N;class gp{constructor(e=new N,n=new N(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Si)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=Si.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(Si.copy(this.origin).addScaledVector(this.direction,n),Si.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){$u.copy(e).add(n).multiplyScalar(.5),vl.copy(n).sub(e).normalize(),Gi.copy(this.origin).sub($u);const s=e.distanceTo(n)*.5,o=-this.direction.dot(vl),a=Gi.dot(this.direction),l=-Gi.dot(vl),c=Gi.lengthSq(),u=Math.abs(1-o*o);let d,f,p,x;if(u>0)if(d=o*l-a,f=o*a-l,x=s*u,d>=0)if(f>=-x)if(f<=x){const v=1/u;d*=v,f*=v,p=d*(d+o*f+2*a)+f*(o*d+f+2*l)+c}else f=s,d=Math.max(0,-(o*f+a)),p=-d*d+f*(f+2*l)+c;else f=-s,d=Math.max(0,-(o*f+a)),p=-d*d+f*(f+2*l)+c;else f<=-x?(d=Math.max(0,-(-o*s+a)),f=d>0?-s:Math.min(Math.max(-s,-l),s),p=-d*d+f*(f+2*l)+c):f<=x?(d=0,f=Math.min(Math.max(-s,-l),s),p=f*(f+2*l)+c):(d=Math.max(0,-(o*s+a)),f=d>0?s:Math.min(Math.max(-s,-l),s),p=-d*d+f*(f+2*l)+c);else f=o>0?-s:s,d=Math.max(0,-(o*f+a)),p=-d*d+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy($u).addScaledVector(vl,f),p}intersectSphere(e,n){Si.subVectors(e.center,this.origin);const i=Si.dot(this.direction),r=Si.dot(Si)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,n):this.at(a,n)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,r=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,r=(e.min.x-f.x)*c),u>=0?(s=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),d>=0?(a=(e.min.z-f.z)*d,l=(e.max.z-f.z)*d):(a=(e.max.z-f.z)*d,l=(e.min.z-f.z)*d),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,Si)!==null}intersectTriangle(e,n,i,r,s){Yu.subVectors(n,e),xl.subVectors(i,e),Ku.crossVectors(Yu,xl);let o=this.direction.dot(Ku),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Gi.subVectors(this.origin,e);const l=a*this.direction.dot(xl.crossVectors(Gi,xl));if(l<0)return null;const c=a*this.direction.dot(Yu.cross(Gi));if(c<0||l+c>o)return null;const u=-a*Gi.dot(Ku);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class st{constructor(e,n,i,r,s,o,a,l,c,u,d,f,p,x,v,g){st.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,c,u,d,f,p,x,v,g)}set(e,n,i,r,s,o,a,l,c,u,d,f,p,x,v,g){const h=this.elements;return h[0]=e,h[4]=n,h[8]=i,h[12]=r,h[1]=s,h[5]=o,h[9]=a,h[13]=l,h[2]=c,h[6]=u,h[10]=d,h[14]=f,h[3]=p,h[7]=x,h[11]=v,h[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new st().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,i=e.elements,r=1/_s.setFromMatrixColumn(e,0).length(),s=1/_s.setFromMatrixColumn(e,1).length(),o=1/_s.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*o,n[9]=i[9]*o,n[10]=i[10]*o,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const f=o*u,p=o*d,x=a*u,v=a*d;n[0]=l*u,n[4]=-l*d,n[8]=c,n[1]=p+x*c,n[5]=f-v*c,n[9]=-a*l,n[2]=v-f*c,n[6]=x+p*c,n[10]=o*l}else if(e.order==="YXZ"){const f=l*u,p=l*d,x=c*u,v=c*d;n[0]=f+v*a,n[4]=x*a-p,n[8]=o*c,n[1]=o*d,n[5]=o*u,n[9]=-a,n[2]=p*a-x,n[6]=v+f*a,n[10]=o*l}else if(e.order==="ZXY"){const f=l*u,p=l*d,x=c*u,v=c*d;n[0]=f-v*a,n[4]=-o*d,n[8]=x+p*a,n[1]=p+x*a,n[5]=o*u,n[9]=v-f*a,n[2]=-o*c,n[6]=a,n[10]=o*l}else if(e.order==="ZYX"){const f=o*u,p=o*d,x=a*u,v=a*d;n[0]=l*u,n[4]=x*c-p,n[8]=f*c+v,n[1]=l*d,n[5]=v*c+f,n[9]=p*c-x,n[2]=-c,n[6]=a*l,n[10]=o*l}else if(e.order==="YZX"){const f=o*l,p=o*c,x=a*l,v=a*c;n[0]=l*u,n[4]=v-f*d,n[8]=x*d+p,n[1]=d,n[5]=o*u,n[9]=-a*u,n[2]=-c*u,n[6]=p*d+x,n[10]=f-v*d}else if(e.order==="XZY"){const f=o*l,p=o*c,x=a*l,v=a*c;n[0]=l*u,n[4]=-d,n[8]=c*u,n[1]=f*d+v,n[5]=o*u,n[9]=p*d-x,n[2]=x*d-p,n[6]=a*u,n[10]=v*d+f}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(L1,e,D1)}lookAt(e,n,i){const r=this.elements;return yn.subVectors(e,n),yn.lengthSq()===0&&(yn.z=1),yn.normalize(),Wi.crossVectors(i,yn),Wi.lengthSq()===0&&(Math.abs(i.z)===1?yn.x+=1e-4:yn.z+=1e-4,yn.normalize(),Wi.crossVectors(i,yn)),Wi.normalize(),_l.crossVectors(yn,Wi),r[0]=Wi.x,r[4]=_l.x,r[8]=yn.x,r[1]=Wi.y,r[5]=_l.y,r[9]=yn.y,r[2]=Wi.z,r[6]=_l.z,r[10]=yn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],d=i[5],f=i[9],p=i[13],x=i[2],v=i[6],g=i[10],h=i[14],_=i[3],y=i[7],S=i[11],C=i[15],A=r[0],b=r[4],P=r[8],T=r[12],M=r[1],L=r[5],j=r[9],z=r[13],q=r[2],Z=r[6],O=r[10],$=r[14],D=r[3],W=r[7],Q=r[11],ae=r[15];return s[0]=o*A+a*M+l*q+c*D,s[4]=o*b+a*L+l*Z+c*W,s[8]=o*P+a*j+l*O+c*Q,s[12]=o*T+a*z+l*$+c*ae,s[1]=u*A+d*M+f*q+p*D,s[5]=u*b+d*L+f*Z+p*W,s[9]=u*P+d*j+f*O+p*Q,s[13]=u*T+d*z+f*$+p*ae,s[2]=x*A+v*M+g*q+h*D,s[6]=x*b+v*L+g*Z+h*W,s[10]=x*P+v*j+g*O+h*Q,s[14]=x*T+v*z+g*$+h*ae,s[3]=_*A+y*M+S*q+C*D,s[7]=_*b+y*L+S*Z+C*W,s[11]=_*P+y*j+S*O+C*Q,s[15]=_*T+y*z+S*$+C*ae,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],d=e[6],f=e[10],p=e[14],x=e[3],v=e[7],g=e[11],h=e[15];return x*(+s*l*d-r*c*d-s*a*f+i*c*f+r*a*p-i*l*p)+v*(+n*l*p-n*c*f+s*o*f-r*o*p+r*c*u-s*l*u)+g*(+n*c*d-n*a*p-s*o*d+i*o*p+s*a*u-i*c*u)+h*(-r*a*u-n*l*d+n*a*f+r*o*d-i*o*f+i*l*u)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=e[9],f=e[10],p=e[11],x=e[12],v=e[13],g=e[14],h=e[15],_=d*g*c-v*f*c+v*l*p-a*g*p-d*l*h+a*f*h,y=x*f*c-u*g*c-x*l*p+o*g*p+u*l*h-o*f*h,S=u*v*c-x*d*c+x*a*p-o*v*p-u*a*h+o*d*h,C=x*d*l-u*v*l-x*a*f+o*v*f+u*a*g-o*d*g,A=n*_+i*y+r*S+s*C;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const b=1/A;return e[0]=_*b,e[1]=(v*f*s-d*g*s-v*r*p+i*g*p+d*r*h-i*f*h)*b,e[2]=(a*g*s-v*l*s+v*r*c-i*g*c-a*r*h+i*l*h)*b,e[3]=(d*l*s-a*f*s-d*r*c+i*f*c+a*r*p-i*l*p)*b,e[4]=y*b,e[5]=(u*g*s-x*f*s+x*r*p-n*g*p-u*r*h+n*f*h)*b,e[6]=(x*l*s-o*g*s-x*r*c+n*g*c+o*r*h-n*l*h)*b,e[7]=(o*f*s-u*l*s+u*r*c-n*f*c-o*r*p+n*l*p)*b,e[8]=S*b,e[9]=(x*d*s-u*v*s-x*i*p+n*v*p+u*i*h-n*d*h)*b,e[10]=(o*v*s-x*a*s+x*i*c-n*v*c-o*i*h+n*a*h)*b,e[11]=(u*a*s-o*d*s-u*i*c+n*d*c+o*i*p-n*a*p)*b,e[12]=C*b,e[13]=(u*v*r-x*d*r+x*i*f-n*v*f-u*i*g+n*d*g)*b,e[14]=(x*a*r-o*v*r-x*i*l+n*v*l+o*i*g-n*a*g)*b,e[15]=(o*d*r-u*a*r+u*i*l-n*d*l-o*i*f+n*a*f)*b,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+i,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,o=n._y,a=n._z,l=n._w,c=s+s,u=o+o,d=a+a,f=s*c,p=s*u,x=s*d,v=o*u,g=o*d,h=a*d,_=l*c,y=l*u,S=l*d,C=i.x,A=i.y,b=i.z;return r[0]=(1-(v+h))*C,r[1]=(p+S)*C,r[2]=(x-y)*C,r[3]=0,r[4]=(p-S)*A,r[5]=(1-(f+h))*A,r[6]=(g+_)*A,r[7]=0,r[8]=(x+y)*b,r[9]=(g-_)*b,r[10]=(1-(f+v))*b,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;let s=_s.set(r[0],r[1],r[2]).length();const o=_s.set(r[4],r[5],r[6]).length(),a=_s.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Kn.copy(this);const c=1/s,u=1/o,d=1/a;return Kn.elements[0]*=c,Kn.elements[1]*=c,Kn.elements[2]*=c,Kn.elements[4]*=u,Kn.elements[5]*=u,Kn.elements[6]*=u,Kn.elements[8]*=d,Kn.elements[9]*=d,Kn.elements[10]*=d,n.setFromRotationMatrix(Kn),i.x=s,i.y=o,i.z=a,this}makePerspective(e,n,i,r,s,o,a=Pi){const l=this.elements,c=2*s/(n-e),u=2*s/(i-r),d=(n+e)/(n-e),f=(i+r)/(i-r);let p,x;if(a===Pi)p=-(o+s)/(o-s),x=-2*o*s/(o-s);else if(a===Uc)p=-o/(o-s),x=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,n,i,r,s,o,a=Pi){const l=this.elements,c=1/(n-e),u=1/(i-r),d=1/(o-s),f=(n+e)*c,p=(i+r)*u;let x,v;if(a===Pi)x=(o+s)*d,v=-2*d;else if(a===Uc)x=s*d,v=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=v,l[14]=-x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}}const _s=new N,Kn=new st,L1=new N(0,0,0),D1=new N(1,1,1),Wi=new N,_l=new N,yn=new N,gg=new st,vg=new ns;class vi{constructor(e=0,n=0,i=0,r=vi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],d=r[2],f=r[6],p=r[10];switch(n){case"XYZ":this._y=Math.asin(on(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-on(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(on(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-on(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(on(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-on(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return gg.makeRotationFromQuaternion(e),this.setFromRotationMatrix(gg,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return vg.setFromEuler(this),this.setFromQuaternion(vg,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}vi.DEFAULT_ORDER="XYZ";class m_{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let I1=0;const xg=new N,ys=new ns,Mi=new st,yl=new N,Go=new N,N1=new N,U1=new ns,_g=new N(1,0,0),yg=new N(0,1,0),Sg=new N(0,0,1),Mg={type:"added"},k1={type:"removed"},Ss={type:"childadded",child:null},Zu={type:"childremoved",child:null};class kt extends as{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:I1++}),this.uuid=xr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=kt.DEFAULT_UP.clone();const e=new N,n=new vi,i=new ns,r=new N(1,1,1);function s(){i.setFromEuler(n,!1)}function o(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new st},normalMatrix:{value:new ke}}),this.matrix=new st,this.matrixWorld=new st,this.matrixAutoUpdate=kt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=kt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new m_,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return ys.setFromAxisAngle(e,n),this.quaternion.multiply(ys),this}rotateOnWorldAxis(e,n){return ys.setFromAxisAngle(e,n),this.quaternion.premultiply(ys),this}rotateX(e){return this.rotateOnAxis(_g,e)}rotateY(e){return this.rotateOnAxis(yg,e)}rotateZ(e){return this.rotateOnAxis(Sg,e)}translateOnAxis(e,n){return xg.copy(e).applyQuaternion(this.quaternion),this.position.add(xg.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(_g,e)}translateY(e){return this.translateOnAxis(yg,e)}translateZ(e){return this.translateOnAxis(Sg,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Mi.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?yl.copy(e):yl.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Go.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Mi.lookAt(Go,yl,this.up):Mi.lookAt(yl,Go,this.up),this.quaternion.setFromRotationMatrix(Mi),r&&(Mi.extractRotation(r.matrixWorld),ys.setFromRotationMatrix(Mi),this.quaternion.premultiply(ys.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Mg),Ss.child=e,this.dispatchEvent(Ss),Ss.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(k1),Zu.child=e,this.dispatchEvent(Zu),Zu.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Mi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Mi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Mi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Mg),Ss.child=e,this.dispatchEvent(Ss),Ss.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,n);if(o!==void 0)return o}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Go,e,N1),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Go,U1,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(n){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),d=o(e.shapes),f=o(e.skeletons),p=o(e.animations),x=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),x.length>0&&(i.nodes=x)}return i.object=r,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}kt.DEFAULT_UP=new N(0,1,0);kt.DEFAULT_MATRIX_AUTO_UPDATE=!0;kt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Zn=new N,Ei=new N,Qu=new N,wi=new N,Ms=new N,Es=new N,Eg=new N,Ju=new N,ed=new N,td=new N,nd=new Tt,id=new Tt,rd=new Tt;class On{constructor(e=new N,n=new N,i=new N){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),Zn.subVectors(e,n),r.cross(Zn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){Zn.subVectors(r,n),Ei.subVectors(i,n),Qu.subVectors(e,n);const o=Zn.dot(Zn),a=Zn.dot(Ei),l=Zn.dot(Qu),c=Ei.dot(Ei),u=Ei.dot(Qu),d=o*c-a*a;if(d===0)return s.set(0,0,0),null;const f=1/d,p=(c*l-a*u)*f,x=(o*u-a*l)*f;return s.set(1-p-x,x,p)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,wi)===null?!1:wi.x>=0&&wi.y>=0&&wi.x+wi.y<=1}static getInterpolation(e,n,i,r,s,o,a,l){return this.getBarycoord(e,n,i,r,wi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,wi.x),l.addScaledVector(o,wi.y),l.addScaledVector(a,wi.z),l)}static getInterpolatedAttribute(e,n,i,r,s,o){return nd.setScalar(0),id.setScalar(0),rd.setScalar(0),nd.fromBufferAttribute(e,n),id.fromBufferAttribute(e,i),rd.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(nd,s.x),o.addScaledVector(id,s.y),o.addScaledVector(rd,s.z),o}static isFrontFacing(e,n,i,r){return Zn.subVectors(i,n),Ei.subVectors(e,n),Zn.cross(Ei).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Zn.subVectors(this.c,this.b),Ei.subVectors(this.a,this.b),Zn.cross(Ei).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return On.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return On.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,r,s){return On.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return On.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return On.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let o,a;Ms.subVectors(r,i),Es.subVectors(s,i),Ju.subVectors(e,i);const l=Ms.dot(Ju),c=Es.dot(Ju);if(l<=0&&c<=0)return n.copy(i);ed.subVectors(e,r);const u=Ms.dot(ed),d=Es.dot(ed);if(u>=0&&d<=u)return n.copy(r);const f=l*d-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),n.copy(i).addScaledVector(Ms,o);td.subVectors(e,s);const p=Ms.dot(td),x=Es.dot(td);if(x>=0&&p<=x)return n.copy(s);const v=p*c-l*x;if(v<=0&&c>=0&&x<=0)return a=c/(c-x),n.copy(i).addScaledVector(Es,a);const g=u*x-p*d;if(g<=0&&d-u>=0&&p-x>=0)return Eg.subVectors(s,r),a=(d-u)/(d-u+(p-x)),n.copy(r).addScaledVector(Eg,a);const h=1/(g+v+f);return o=v*h,a=f*h,n.copy(i).addScaledVector(Ms,o).addScaledVector(Es,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const g_={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Xi={h:0,s:0,l:0},Sl={h:0,s:0,l:0};function sd(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class Be{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=wn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,qe.toWorkingColorSpace(this,n),this}setRGB(e,n,i,r=qe.workingColorSpace){return this.r=e,this.g=n,this.b=i,qe.toWorkingColorSpace(this,r),this}setHSL(e,n,i,r=qe.workingColorSpace){if(e=_1(e,1),n=on(n,0,1),i=on(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,o=2*i-s;this.r=sd(o,s,e+1/3),this.g=sd(o,s,e),this.b=sd(o,s,e-1/3)}return qe.toWorkingColorSpace(this,r),this}setStyle(e,n=wn){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(o===6)return this.setHex(parseInt(s,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=wn){const i=g_[e.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Di(e.r),this.g=Di(e.g),this.b=Di(e.b),this}copyLinearToSRGB(e){return this.r=ro(e.r),this.g=ro(e.g),this.b=ro(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=wn){return qe.fromWorkingColorSpace(Zt.copy(this),e),Math.round(on(Zt.r*255,0,255))*65536+Math.round(on(Zt.g*255,0,255))*256+Math.round(on(Zt.b*255,0,255))}getHexString(e=wn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=qe.workingColorSpace){qe.fromWorkingColorSpace(Zt.copy(this),n);const i=Zt.r,r=Zt.g,s=Zt.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=u<=.5?d/(o+a):d/(2-o-a),o){case i:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-i)/d+2;break;case s:l=(i-r)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,n=qe.workingColorSpace){return qe.fromWorkingColorSpace(Zt.copy(this),n),e.r=Zt.r,e.g=Zt.g,e.b=Zt.b,e}getStyle(e=wn){qe.fromWorkingColorSpace(Zt.copy(this),e);const n=Zt.r,i=Zt.g,r=Zt.b;return e!==wn?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(Xi),this.setHSL(Xi.h+e,Xi.s+n,Xi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(Xi),e.getHSL(Sl);const i=Vu(Xi.h,Sl.h,n),r=Vu(Xi.s,Sl.s,n),s=Vu(Xi.l,Sl.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Zt=new Be;Be.NAMES=g_;let F1=0;class cs extends as{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:F1++}),this.uuid=xr(),this.name="",this.blending=no,this.side=Sr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=_h,this.blendDst=yh,this.blendEquation=Or,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Be(0,0,0),this.blendAlpha=0,this.depthFunc=mo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ag,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ps,this.stencilZFail=ps,this.stencilZPass=ps,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==no&&(i.blending=this.blending),this.side!==Sr&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==_h&&(i.blendSrc=this.blendSrc),this.blendDst!==yh&&(i.blendDst=this.blendDst),this.blendEquation!==Or&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==mo&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ag&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ps&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ps&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ps&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(n){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class zr extends cs{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new Be(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vi,this.combine=Jx,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Pt=new N,Ml=new be;class jn{constructor(e,n,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=sf,this.updateRanges=[],this.gpuType=fi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)Ml.fromBufferAttribute(this,n),Ml.applyMatrix3(e),this.setXY(n,Ml.x,Ml.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Pt.fromBufferAttribute(this,n),Pt.applyMatrix3(e),this.setXYZ(n,Pt.x,Pt.y,Pt.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)Pt.fromBufferAttribute(this,n),Pt.applyMatrix4(e),this.setXYZ(n,Pt.x,Pt.y,Pt.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)Pt.fromBufferAttribute(this,n),Pt.applyNormalMatrix(e),this.setXYZ(n,Pt.x,Pt.y,Pt.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)Pt.fromBufferAttribute(this,n),Pt.transformDirection(e),this.setXYZ(n,Pt.x,Pt.y,Pt.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=di(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=it(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=di(n,this.array)),n}setX(e,n){return this.normalized&&(n=it(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=di(n,this.array)),n}setY(e,n){return this.normalized&&(n=it(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=di(n,this.array)),n}setZ(e,n){return this.normalized&&(n=it(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=di(n,this.array)),n}setW(e,n){return this.normalized&&(n=it(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=it(n,this.array),i=it(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=it(n,this.array),i=it(i,this.array),r=it(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=it(n,this.array),i=it(i,this.array),r=it(r,this.array),s=it(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==sf&&(e.usage=this.usage),e}}class v_ extends jn{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class x_ extends jn{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class Rt extends jn{constructor(e,n,i){super(new Float32Array(e),n,i)}}let O1=0;const Nn=new st,od=new kt,ws=new N,Sn=new ls,Wo=new ls,zt=new N;class xn extends as{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:O1++}),this.uuid=xr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(h_(e)?x_:v_)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new ke().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Nn.makeRotationFromQuaternion(e),this.applyMatrix4(Nn),this}rotateX(e){return Nn.makeRotationX(e),this.applyMatrix4(Nn),this}rotateY(e){return Nn.makeRotationY(e),this.applyMatrix4(Nn),this}rotateZ(e){return Nn.makeRotationZ(e),this.applyMatrix4(Nn),this}translate(e,n,i){return Nn.makeTranslation(e,n,i),this.applyMatrix4(Nn),this}scale(e,n,i){return Nn.makeScale(e,n,i),this.applyMatrix4(Nn),this}lookAt(e){return od.lookAt(e),od.updateMatrix(),this.applyMatrix4(od.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ws).negate(),this.translate(ws.x,ws.y,ws.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Rt(i,3))}else{for(let i=0,r=n.count;i<r;i++){const s=e[i];n.setXYZ(i,s.x,s.y,s.z||0)}e.length>n.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ls);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];Sn.setFromBufferAttribute(s),this.morphTargetsRelative?(zt.addVectors(this.boundingBox.min,Sn.min),this.boundingBox.expandByPoint(zt),zt.addVectors(this.boundingBox.max,Sn.max),this.boundingBox.expandByPoint(zt)):(this.boundingBox.expandByPoint(Sn.min),this.boundingBox.expandByPoint(Sn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Co);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(e){const i=this.boundingSphere.center;if(Sn.setFromBufferAttribute(e),n)for(let s=0,o=n.length;s<o;s++){const a=n[s];Wo.setFromBufferAttribute(a),this.morphTargetsRelative?(zt.addVectors(Sn.min,Wo.min),Sn.expandByPoint(zt),zt.addVectors(Sn.max,Wo.max),Sn.expandByPoint(zt)):(Sn.expandByPoint(Wo.min),Sn.expandByPoint(Wo.max))}Sn.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)zt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(zt));if(n)for(let s=0,o=n.length;s<o;s++){const a=n[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)zt.fromBufferAttribute(a,c),l&&(ws.fromBufferAttribute(e,c),zt.add(ws)),r=Math.max(r,i.distanceToSquared(zt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,s=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new jn(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let P=0;P<i.count;P++)a[P]=new N,l[P]=new N;const c=new N,u=new N,d=new N,f=new be,p=new be,x=new be,v=new N,g=new N;function h(P,T,M){c.fromBufferAttribute(i,P),u.fromBufferAttribute(i,T),d.fromBufferAttribute(i,M),f.fromBufferAttribute(s,P),p.fromBufferAttribute(s,T),x.fromBufferAttribute(s,M),u.sub(c),d.sub(c),p.sub(f),x.sub(f);const L=1/(p.x*x.y-x.x*p.y);isFinite(L)&&(v.copy(u).multiplyScalar(x.y).addScaledVector(d,-p.y).multiplyScalar(L),g.copy(d).multiplyScalar(p.x).addScaledVector(u,-x.x).multiplyScalar(L),a[P].add(v),a[T].add(v),a[M].add(v),l[P].add(g),l[T].add(g),l[M].add(g))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let P=0,T=_.length;P<T;++P){const M=_[P],L=M.start,j=M.count;for(let z=L,q=L+j;z<q;z+=3)h(e.getX(z+0),e.getX(z+1),e.getX(z+2))}const y=new N,S=new N,C=new N,A=new N;function b(P){C.fromBufferAttribute(r,P),A.copy(C);const T=a[P];y.copy(T),y.sub(C.multiplyScalar(C.dot(T))).normalize(),S.crossVectors(A,T);const L=S.dot(l[P])<0?-1:1;o.setXYZW(P,y.x,y.y,y.z,L)}for(let P=0,T=_.length;P<T;++P){const M=_[P],L=M.start,j=M.count;for(let z=L,q=L+j;z<q;z+=3)b(e.getX(z+0)),b(e.getX(z+1)),b(e.getX(z+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new jn(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);const r=new N,s=new N,o=new N,a=new N,l=new N,c=new N,u=new N,d=new N;if(e)for(let f=0,p=e.count;f<p;f+=3){const x=e.getX(f+0),v=e.getX(f+1),g=e.getX(f+2);r.fromBufferAttribute(n,x),s.fromBufferAttribute(n,v),o.fromBufferAttribute(n,g),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),a.fromBufferAttribute(i,x),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,g),a.add(u),l.add(u),c.add(u),i.setXYZ(x,a.x,a.y,a.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let f=0,p=n.count;f<p;f+=3)r.fromBufferAttribute(n,f+0),s.fromBufferAttribute(n,f+1),o.fromBufferAttribute(n,f+2),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)zt.fromBufferAttribute(e,n),zt.normalize(),e.setXYZ(n,zt.x,zt.y,zt.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,d=a.normalized,f=new c.constructor(l.length*u);let p=0,x=0;for(let v=0,g=l.length;v<g;v++){a.isInterleavedBufferAttribute?p=l[v]*a.data.stride+a.offset:p=l[v]*u;for(let h=0;h<u;h++)f[x++]=c[p++]}return new jn(f,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new xn,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,i);n.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,d=c.length;u<d;u++){const f=c[u],p=e(f,i);l.push(p)}n.morphAttributes[a]=l}n.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,f=c.length;d<f;d++){const p=c[d];u.push(p.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(n));const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(n))}const s=e.morphAttributes;for(const c in s){const u=[],d=s[c];for(let f=0,p=d.length;f<p;f++)u.push(d[f].clone(n));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const wg=new st,Lr=new gp,El=new Co,Tg=new N,wl=new N,Tl=new N,bl=new N,ad=new N,Al=new N,bg=new N,Cl=new N;class lt extends kt{constructor(e=new xn,n=new zr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){Al.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],d=s[l];u!==0&&(ad.fromBufferAttribute(d,e),o?Al.addScaledVector(ad,u):Al.addScaledVector(ad.sub(n),u))}n.add(Al)}return n}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),El.copy(i.boundingSphere),El.applyMatrix4(s),Lr.copy(e.ray).recast(e.near),!(El.containsPoint(Lr.origin)===!1&&(Lr.intersectSphere(El,Tg)===null||Lr.origin.distanceToSquared(Tg)>(e.far-e.near)**2))&&(wg.copy(s).invert(),Lr.copy(e.ray).applyMatrix4(wg),!(i.boundingBox!==null&&Lr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,Lr)))}_computeIntersections(e,n,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,f=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let x=0,v=f.length;x<v;x++){const g=f[x],h=o[g.materialIndex],_=Math.max(g.start,p.start),y=Math.min(a.count,Math.min(g.start+g.count,p.start+p.count));for(let S=_,C=y;S<C;S+=3){const A=a.getX(S),b=a.getX(S+1),P=a.getX(S+2);r=Rl(this,h,e,i,c,u,d,A,b,P),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=g.materialIndex,n.push(r))}}else{const x=Math.max(0,p.start),v=Math.min(a.count,p.start+p.count);for(let g=x,h=v;g<h;g+=3){const _=a.getX(g),y=a.getX(g+1),S=a.getX(g+2);r=Rl(this,o,e,i,c,u,d,_,y,S),r&&(r.faceIndex=Math.floor(g/3),n.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let x=0,v=f.length;x<v;x++){const g=f[x],h=o[g.materialIndex],_=Math.max(g.start,p.start),y=Math.min(l.count,Math.min(g.start+g.count,p.start+p.count));for(let S=_,C=y;S<C;S+=3){const A=S,b=S+1,P=S+2;r=Rl(this,h,e,i,c,u,d,A,b,P),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=g.materialIndex,n.push(r))}}else{const x=Math.max(0,p.start),v=Math.min(l.count,p.start+p.count);for(let g=x,h=v;g<h;g+=3){const _=g,y=g+1,S=g+2;r=Rl(this,o,e,i,c,u,d,_,y,S),r&&(r.faceIndex=Math.floor(g/3),n.push(r))}}}}function z1(t,e,n,i,r,s,o,a){let l;if(e.side===vn?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===Sr,a),l===null)return null;Cl.copy(a),Cl.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo(Cl);return c<n.near||c>n.far?null:{distance:c,point:Cl.clone(),object:t}}function Rl(t,e,n,i,r,s,o,a,l,c){t.getVertexPosition(a,wl),t.getVertexPosition(l,Tl),t.getVertexPosition(c,bl);const u=z1(t,e,n,i,wl,Tl,bl,bg);if(u){const d=new N;On.getBarycoord(bg,wl,Tl,bl,d),r&&(u.uv=On.getInterpolatedAttribute(r,a,l,c,d,new be)),s&&(u.uv1=On.getInterpolatedAttribute(s,a,l,c,d,new be)),o&&(u.normal=On.getInterpolatedAttribute(o,a,l,c,d,new N),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new N,materialIndex:0};On.getNormal(wl,Tl,bl,f.normal),u.face=f,u.barycoord=d}return u}class Gt extends xn{constructor(e=1,n=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],d=[];let f=0,p=0;x("z","y","x",-1,-1,i,n,e,o,s,0),x("z","y","x",1,-1,i,n,-e,o,s,1),x("x","z","y",1,1,e,i,n,r,o,2),x("x","z","y",1,-1,e,i,-n,r,o,3),x("x","y","z",1,-1,e,n,i,r,s,4),x("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Rt(c,3)),this.setAttribute("normal",new Rt(u,3)),this.setAttribute("uv",new Rt(d,2));function x(v,g,h,_,y,S,C,A,b,P,T){const M=S/b,L=C/P,j=S/2,z=C/2,q=A/2,Z=b+1,O=P+1;let $=0,D=0;const W=new N;for(let Q=0;Q<O;Q++){const ae=Q*L-z;for(let ye=0;ye<Z;ye++){const Ye=ye*M-j;W[v]=Ye*_,W[g]=ae*y,W[h]=q,c.push(W.x,W.y,W.z),W[v]=0,W[g]=0,W[h]=A>0?1:-1,u.push(W.x,W.y,W.z),d.push(ye/b),d.push(1-Q/P),$+=1}}for(let Q=0;Q<P;Q++)for(let ae=0;ae<b;ae++){const ye=f+ae+Z*Q,Ye=f+ae+Z*(Q+1),X=f+(ae+1)+Z*(Q+1),re=f+(ae+1)+Z*Q;l.push(ye,Ye,re),l.push(Ye,X,re),D+=6}a.addGroup(p,D,T),p+=D,f+=$}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function yo(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone():Array.isArray(r)?e[n][i]=r.slice():e[n][i]=r}}return e}function nn(t){const e={};for(let n=0;n<t.length;n++){const i=yo(t[n]);for(const r in i)e[r]=i[r]}return e}function B1(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function __(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:qe.workingColorSpace}const H1={clone:yo,merge:nn};var V1=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,j1=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Mr extends cs{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=V1,this.fragmentShader=j1,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=yo(e.uniforms),this.uniformsGroups=B1(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?n.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?n.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?n.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?n.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?n.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?n.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?n.uniforms[r]={type:"m4",value:o.toArray()}:n.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class y_ extends kt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new st,this.projectionMatrix=new st,this.projectionMatrixInverse=new st,this.coordinateSystem=Pi}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const qi=new N,Ag=new be,Cg=new be;class Fn extends y_{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=of*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(oc*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return of*2*Math.atan(Math.tan(oc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){qi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(qi.x,qi.y).multiplyScalar(-e/qi.z),qi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(qi.x,qi.y).multiplyScalar(-e/qi.z)}getViewSize(e,n){return this.getViewBounds(e,Ag,Cg),n.subVectors(Cg,Ag)}setViewOffset(e,n,i,r,s,o){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(oc*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,n-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const Ts=-90,bs=1;class G1 extends kt{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Fn(Ts,bs,e,n);r.layers=this.layers,this.add(r);const s=new Fn(Ts,bs,e,n);s.layers=this.layers,this.add(s);const o=new Fn(Ts,bs,e,n);o.layers=this.layers,this.add(o);const a=new Fn(Ts,bs,e,n);a.layers=this.layers,this.add(a);const l=new Fn(Ts,bs,e,n);l.layers=this.layers,this.add(l);const c=new Fn(Ts,bs,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,o,a,l]=n;for(const c of n)this.remove(c);if(e===Pi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Uc)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(n,s),e.setRenderTarget(i,1,r),e.render(n,o),e.setRenderTarget(i,2,r),e.render(n,a),e.setRenderTarget(i,3,r),e.render(n,l),e.setRenderTarget(i,4,r),e.render(n,c),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,r),e.render(n,u),e.setRenderTarget(d,f,p),e.xr.enabled=x,i.texture.needsPMREMUpdate=!0}}class S_ extends Jt{constructor(e,n,i,r,s,o,a,l,c,u){e=e!==void 0?e:[],n=n!==void 0?n:go,super(e,n,i,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class W1 extends ts{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new S_(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:hi}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Gt(5,5,5),s=new Mr({name:"CubemapFromEquirect",uniforms:yo(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:vn,blending:gr});s.uniforms.tEquirect.value=n;const o=new lt(r,s),a=n.minFilter;return n.minFilter===Xr&&(n.minFilter=hi),new G1(1,10,this).update(e,o),n.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,n,i,r){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(n,i,r);e.setRenderTarget(s)}}const ld=new N,X1=new N,q1=new ke;class Qi{constructor(e=new N(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=ld.subVectors(i,n).cross(X1.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const i=e.delta(ld),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:n.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||q1.getNormalMatrix(e),r=this.coplanarPoint(ld).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Dr=new Co,Pl=new N;class vp{constructor(e=new Qi,n=new Qi,i=new Qi,r=new Qi,s=new Qi,o=new Qi){this.planes=[e,n,i,r,s,o]}set(e,n,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(n),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=Pi){const i=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],l=r[3],c=r[4],u=r[5],d=r[6],f=r[7],p=r[8],x=r[9],v=r[10],g=r[11],h=r[12],_=r[13],y=r[14],S=r[15];if(i[0].setComponents(l-s,f-c,g-p,S-h).normalize(),i[1].setComponents(l+s,f+c,g+p,S+h).normalize(),i[2].setComponents(l+o,f+u,g+x,S+_).normalize(),i[3].setComponents(l-o,f-u,g-x,S-_).normalize(),i[4].setComponents(l-a,f-d,g-v,S-y).normalize(),n===Pi)i[5].setComponents(l+a,f+d,g+v,S+y).normalize();else if(n===Uc)i[5].setComponents(a,d,v,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Dr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Dr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Dr)}intersectsSprite(e){return Dr.center.set(0,0,0),Dr.radius=.7071067811865476,Dr.applyMatrix4(e.matrixWorld),this.intersectsSphere(Dr)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(Pl.x=r.normal.x>0?e.max.x:e.min.x,Pl.y=r.normal.y>0?e.max.y:e.min.y,Pl.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Pl)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function M_(){let t=null,e=!1,n=null,i=null;function r(s,o){n(s,o),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function $1(t){const e=new WeakMap;function n(a,l){const c=a.array,u=a.usage,d=c.byteLength,f=t.createBuffer();t.bindBuffer(l,f),t.bufferData(l,c,u),a.onUploadCallback();let p;if(c instanceof Float32Array)p=t.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=t.HALF_FLOAT:p=t.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=t.SHORT;else if(c instanceof Uint32Array)p=t.UNSIGNED_INT;else if(c instanceof Int32Array)p=t.INT;else if(c instanceof Int8Array)p=t.BYTE;else if(c instanceof Uint8Array)p=t.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,l,c){const u=l.array,d=l.updateRanges;if(t.bindBuffer(c,a),d.length===0)t.bufferSubData(c,0,u);else{d.sort((p,x)=>p.start-x.start);let f=0;for(let p=1;p<d.length;p++){const x=d[f],v=d[p];v.start<=x.start+x.count+1?x.count=Math.max(x.count,v.start+v.count-x.start):(++f,d[f]=v)}d.length=f+1;for(let p=0,x=d.length;p<x;p++){const v=d[p];t.bufferSubData(c,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(t.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,n(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}class uu extends xn{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,o=n/2,a=Math.floor(i),l=Math.floor(r),c=a+1,u=l+1,d=e/a,f=n/l,p=[],x=[],v=[],g=[];for(let h=0;h<u;h++){const _=h*f-o;for(let y=0;y<c;y++){const S=y*d-s;x.push(S,-_,0),v.push(0,0,1),g.push(y/a),g.push(1-h/l)}}for(let h=0;h<l;h++)for(let _=0;_<a;_++){const y=_+c*h,S=_+c*(h+1),C=_+1+c*(h+1),A=_+1+c*h;p.push(y,S,A),p.push(S,C,A)}this.setIndex(p),this.setAttribute("position",new Rt(x,3)),this.setAttribute("normal",new Rt(v,3)),this.setAttribute("uv",new Rt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new uu(e.width,e.height,e.widthSegments,e.heightSegments)}}var Y1=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,K1=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Z1=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Q1=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,J1=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ew=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,tw=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,nw=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,iw=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,rw=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,sw=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ow=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,aw=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,lw=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,cw=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,uw=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,dw=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,hw=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,fw=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,pw=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,mw=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,gw=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,vw=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,xw=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,_w=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,yw=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Sw=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Mw=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ew=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ww=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Tw="gl_FragColor = linearToOutputTexel( gl_FragColor );",bw=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Aw=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Cw=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Rw=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Pw=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Lw=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Dw=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Iw=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Nw=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Uw=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,kw=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Fw=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ow=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,zw=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Bw=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Hw=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Vw=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,jw=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Gw=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Ww=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Xw=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,qw=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,$w=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Yw=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Kw=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Zw=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Qw=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Jw=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,eT=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,tT=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,nT=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,iT=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,rT=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,sT=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,oT=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,aT=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,lT=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,cT=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,uT=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,dT=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,hT=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,fT=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,pT=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mT=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gT=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,vT=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,xT=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,_T=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,yT=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ST=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,MT=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ET=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,wT=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,TT=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,bT=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,AT=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,CT=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,RT=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,PT=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,LT=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,DT=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,IT=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,NT=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,UT=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,kT=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,FT=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,OT=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,zT=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,BT=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,HT=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,VT=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,jT=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,GT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,WT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,XT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,qT=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const $T=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,YT=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,KT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ZT=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,QT=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,JT=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,eb=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,tb=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,nb=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,ib=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,rb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,sb=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ob=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ab=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,lb=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,cb=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ub=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,db=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hb=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,fb=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,pb=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,mb=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,gb=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,vb=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xb=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,_b=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yb=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Sb=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Mb=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Eb=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,wb=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Tb=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,bb=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ab=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Oe={alphahash_fragment:Y1,alphahash_pars_fragment:K1,alphamap_fragment:Z1,alphamap_pars_fragment:Q1,alphatest_fragment:J1,alphatest_pars_fragment:ew,aomap_fragment:tw,aomap_pars_fragment:nw,batching_pars_vertex:iw,batching_vertex:rw,begin_vertex:sw,beginnormal_vertex:ow,bsdfs:aw,iridescence_fragment:lw,bumpmap_pars_fragment:cw,clipping_planes_fragment:uw,clipping_planes_pars_fragment:dw,clipping_planes_pars_vertex:hw,clipping_planes_vertex:fw,color_fragment:pw,color_pars_fragment:mw,color_pars_vertex:gw,color_vertex:vw,common:xw,cube_uv_reflection_fragment:_w,defaultnormal_vertex:yw,displacementmap_pars_vertex:Sw,displacementmap_vertex:Mw,emissivemap_fragment:Ew,emissivemap_pars_fragment:ww,colorspace_fragment:Tw,colorspace_pars_fragment:bw,envmap_fragment:Aw,envmap_common_pars_fragment:Cw,envmap_pars_fragment:Rw,envmap_pars_vertex:Pw,envmap_physical_pars_fragment:Hw,envmap_vertex:Lw,fog_vertex:Dw,fog_pars_vertex:Iw,fog_fragment:Nw,fog_pars_fragment:Uw,gradientmap_pars_fragment:kw,lightmap_pars_fragment:Fw,lights_lambert_fragment:Ow,lights_lambert_pars_fragment:zw,lights_pars_begin:Bw,lights_toon_fragment:Vw,lights_toon_pars_fragment:jw,lights_phong_fragment:Gw,lights_phong_pars_fragment:Ww,lights_physical_fragment:Xw,lights_physical_pars_fragment:qw,lights_fragment_begin:$w,lights_fragment_maps:Yw,lights_fragment_end:Kw,logdepthbuf_fragment:Zw,logdepthbuf_pars_fragment:Qw,logdepthbuf_pars_vertex:Jw,logdepthbuf_vertex:eT,map_fragment:tT,map_pars_fragment:nT,map_particle_fragment:iT,map_particle_pars_fragment:rT,metalnessmap_fragment:sT,metalnessmap_pars_fragment:oT,morphinstance_vertex:aT,morphcolor_vertex:lT,morphnormal_vertex:cT,morphtarget_pars_vertex:uT,morphtarget_vertex:dT,normal_fragment_begin:hT,normal_fragment_maps:fT,normal_pars_fragment:pT,normal_pars_vertex:mT,normal_vertex:gT,normalmap_pars_fragment:vT,clearcoat_normal_fragment_begin:xT,clearcoat_normal_fragment_maps:_T,clearcoat_pars_fragment:yT,iridescence_pars_fragment:ST,opaque_fragment:MT,packing:ET,premultiplied_alpha_fragment:wT,project_vertex:TT,dithering_fragment:bT,dithering_pars_fragment:AT,roughnessmap_fragment:CT,roughnessmap_pars_fragment:RT,shadowmap_pars_fragment:PT,shadowmap_pars_vertex:LT,shadowmap_vertex:DT,shadowmask_pars_fragment:IT,skinbase_vertex:NT,skinning_pars_vertex:UT,skinning_vertex:kT,skinnormal_vertex:FT,specularmap_fragment:OT,specularmap_pars_fragment:zT,tonemapping_fragment:BT,tonemapping_pars_fragment:HT,transmission_fragment:VT,transmission_pars_fragment:jT,uv_pars_fragment:GT,uv_pars_vertex:WT,uv_vertex:XT,worldpos_vertex:qT,background_vert:$T,background_frag:YT,backgroundCube_vert:KT,backgroundCube_frag:ZT,cube_vert:QT,cube_frag:JT,depth_vert:eb,depth_frag:tb,distanceRGBA_vert:nb,distanceRGBA_frag:ib,equirect_vert:rb,equirect_frag:sb,linedashed_vert:ob,linedashed_frag:ab,meshbasic_vert:lb,meshbasic_frag:cb,meshlambert_vert:ub,meshlambert_frag:db,meshmatcap_vert:hb,meshmatcap_frag:fb,meshnormal_vert:pb,meshnormal_frag:mb,meshphong_vert:gb,meshphong_frag:vb,meshphysical_vert:xb,meshphysical_frag:_b,meshtoon_vert:yb,meshtoon_frag:Sb,points_vert:Mb,points_frag:Eb,shadow_vert:wb,shadow_frag:Tb,sprite_vert:bb,sprite_frag:Ab},ce={common:{diffuse:{value:new Be(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ke}},envmap:{envMap:{value:null},envMapRotation:{value:new ke},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ke},normalScale:{value:new be(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Be(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Be(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0},uvTransform:{value:new ke}},sprite:{diffuse:{value:new Be(16777215)},opacity:{value:1},center:{value:new be(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}}},li={basic:{uniforms:nn([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.fog]),vertexShader:Oe.meshbasic_vert,fragmentShader:Oe.meshbasic_frag},lambert:{uniforms:nn([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new Be(0)}}]),vertexShader:Oe.meshlambert_vert,fragmentShader:Oe.meshlambert_frag},phong:{uniforms:nn([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new Be(0)},specular:{value:new Be(1118481)},shininess:{value:30}}]),vertexShader:Oe.meshphong_vert,fragmentShader:Oe.meshphong_frag},standard:{uniforms:nn([ce.common,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.roughnessmap,ce.metalnessmap,ce.fog,ce.lights,{emissive:{value:new Be(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag},toon:{uniforms:nn([ce.common,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.gradientmap,ce.fog,ce.lights,{emissive:{value:new Be(0)}}]),vertexShader:Oe.meshtoon_vert,fragmentShader:Oe.meshtoon_frag},matcap:{uniforms:nn([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,{matcap:{value:null}}]),vertexShader:Oe.meshmatcap_vert,fragmentShader:Oe.meshmatcap_frag},points:{uniforms:nn([ce.points,ce.fog]),vertexShader:Oe.points_vert,fragmentShader:Oe.points_frag},dashed:{uniforms:nn([ce.common,ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Oe.linedashed_vert,fragmentShader:Oe.linedashed_frag},depth:{uniforms:nn([ce.common,ce.displacementmap]),vertexShader:Oe.depth_vert,fragmentShader:Oe.depth_frag},normal:{uniforms:nn([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,{opacity:{value:1}}]),vertexShader:Oe.meshnormal_vert,fragmentShader:Oe.meshnormal_frag},sprite:{uniforms:nn([ce.sprite,ce.fog]),vertexShader:Oe.sprite_vert,fragmentShader:Oe.sprite_frag},background:{uniforms:{uvTransform:{value:new ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Oe.background_vert,fragmentShader:Oe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ke}},vertexShader:Oe.backgroundCube_vert,fragmentShader:Oe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Oe.cube_vert,fragmentShader:Oe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Oe.equirect_vert,fragmentShader:Oe.equirect_frag},distanceRGBA:{uniforms:nn([ce.common,ce.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Oe.distanceRGBA_vert,fragmentShader:Oe.distanceRGBA_frag},shadow:{uniforms:nn([ce.lights,ce.fog,{color:{value:new Be(0)},opacity:{value:1}}]),vertexShader:Oe.shadow_vert,fragmentShader:Oe.shadow_frag}};li.physical={uniforms:nn([li.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ke},clearcoatNormalScale:{value:new be(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ke},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ke},sheen:{value:0},sheenColor:{value:new Be(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ke},transmissionSamplerSize:{value:new be},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ke},attenuationDistance:{value:0},attenuationColor:{value:new Be(0)},specularColor:{value:new Be(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ke},anisotropyVector:{value:new be},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ke}}]),vertexShader:Oe.meshphysical_vert,fragmentShader:Oe.meshphysical_frag};const Ll={r:0,b:0,g:0},Ir=new vi,Cb=new st;function Rb(t,e,n,i,r,s,o){const a=new Be(0);let l=s===!0?0:1,c,u,d=null,f=0,p=null;function x(_){let y=_.isScene===!0?_.background:null;return y&&y.isTexture&&(y=(_.backgroundBlurriness>0?n:e).get(y)),y}function v(_){let y=!1;const S=x(_);S===null?h(a,l):S&&S.isColor&&(h(S,1),y=!0);const C=t.xr.getEnvironmentBlendMode();C==="additive"?i.buffers.color.setClear(0,0,0,1,o):C==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(t.autoClear||y)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function g(_,y){const S=x(y);S&&(S.isCubeTexture||S.mapping===lu)?(u===void 0&&(u=new lt(new Gt(1,1,1),new Mr({name:"BackgroundCubeMaterial",uniforms:yo(li.backgroundCube.uniforms),vertexShader:li.backgroundCube.vertexShader,fragmentShader:li.backgroundCube.fragmentShader,side:vn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(C,A,b){this.matrixWorld.copyPosition(b.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),Ir.copy(y.backgroundRotation),Ir.x*=-1,Ir.y*=-1,Ir.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Ir.y*=-1,Ir.z*=-1),u.material.uniforms.envMap.value=S,u.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Cb.makeRotationFromEuler(Ir)),u.material.toneMapped=qe.getTransfer(S.colorSpace)!==nt,(d!==S||f!==S.version||p!==t.toneMapping)&&(u.material.needsUpdate=!0,d=S,f=S.version,p=t.toneMapping),u.layers.enableAll(),_.unshift(u,u.geometry,u.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new lt(new uu(2,2),new Mr({name:"BackgroundMaterial",uniforms:yo(li.background.uniforms),vertexShader:li.background.vertexShader,fragmentShader:li.background.fragmentShader,side:Sr,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=qe.getTransfer(S.colorSpace)!==nt,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(d!==S||f!==S.version||p!==t.toneMapping)&&(c.material.needsUpdate=!0,d=S,f=S.version,p=t.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null))}function h(_,y){_.getRGB(Ll,__(t)),i.buffers.color.setClear(Ll.r,Ll.g,Ll.b,y,o)}return{getClearColor:function(){return a},setClearColor:function(_,y=1){a.set(_),l=y,h(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(_){l=_,h(a,l)},render:v,addToRenderList:g}}function Pb(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},r=f(null);let s=r,o=!1;function a(M,L,j,z,q){let Z=!1;const O=d(z,j,L);s!==O&&(s=O,c(s.object)),Z=p(M,z,j,q),Z&&x(M,z,j,q),q!==null&&e.update(q,t.ELEMENT_ARRAY_BUFFER),(Z||o)&&(o=!1,S(M,L,j,z),q!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(q).buffer))}function l(){return t.createVertexArray()}function c(M){return t.bindVertexArray(M)}function u(M){return t.deleteVertexArray(M)}function d(M,L,j){const z=j.wireframe===!0;let q=i[M.id];q===void 0&&(q={},i[M.id]=q);let Z=q[L.id];Z===void 0&&(Z={},q[L.id]=Z);let O=Z[z];return O===void 0&&(O=f(l()),Z[z]=O),O}function f(M){const L=[],j=[],z=[];for(let q=0;q<n;q++)L[q]=0,j[q]=0,z[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:j,attributeDivisors:z,object:M,attributes:{},index:null}}function p(M,L,j,z){const q=s.attributes,Z=L.attributes;let O=0;const $=j.getAttributes();for(const D in $)if($[D].location>=0){const Q=q[D];let ae=Z[D];if(ae===void 0&&(D==="instanceMatrix"&&M.instanceMatrix&&(ae=M.instanceMatrix),D==="instanceColor"&&M.instanceColor&&(ae=M.instanceColor)),Q===void 0||Q.attribute!==ae||ae&&Q.data!==ae.data)return!0;O++}return s.attributesNum!==O||s.index!==z}function x(M,L,j,z){const q={},Z=L.attributes;let O=0;const $=j.getAttributes();for(const D in $)if($[D].location>=0){let Q=Z[D];Q===void 0&&(D==="instanceMatrix"&&M.instanceMatrix&&(Q=M.instanceMatrix),D==="instanceColor"&&M.instanceColor&&(Q=M.instanceColor));const ae={};ae.attribute=Q,Q&&Q.data&&(ae.data=Q.data),q[D]=ae,O++}s.attributes=q,s.attributesNum=O,s.index=z}function v(){const M=s.newAttributes;for(let L=0,j=M.length;L<j;L++)M[L]=0}function g(M){h(M,0)}function h(M,L){const j=s.newAttributes,z=s.enabledAttributes,q=s.attributeDivisors;j[M]=1,z[M]===0&&(t.enableVertexAttribArray(M),z[M]=1),q[M]!==L&&(t.vertexAttribDivisor(M,L),q[M]=L)}function _(){const M=s.newAttributes,L=s.enabledAttributes;for(let j=0,z=L.length;j<z;j++)L[j]!==M[j]&&(t.disableVertexAttribArray(j),L[j]=0)}function y(M,L,j,z,q,Z,O){O===!0?t.vertexAttribIPointer(M,L,j,q,Z):t.vertexAttribPointer(M,L,j,z,q,Z)}function S(M,L,j,z){v();const q=z.attributes,Z=j.getAttributes(),O=L.defaultAttributeValues;for(const $ in Z){const D=Z[$];if(D.location>=0){let W=q[$];if(W===void 0&&($==="instanceMatrix"&&M.instanceMatrix&&(W=M.instanceMatrix),$==="instanceColor"&&M.instanceColor&&(W=M.instanceColor)),W!==void 0){const Q=W.normalized,ae=W.itemSize,ye=e.get(W);if(ye===void 0)continue;const Ye=ye.buffer,X=ye.type,re=ye.bytesPerElement,ge=X===t.INT||X===t.UNSIGNED_INT||W.gpuType===cp;if(W.isInterleavedBufferAttribute){const le=W.data,Pe=le.stride,Ie=W.offset;if(le.isInstancedInterleavedBuffer){for(let ze=0;ze<D.locationSize;ze++)h(D.location+ze,le.meshPerAttribute);M.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let ze=0;ze<D.locationSize;ze++)g(D.location+ze);t.bindBuffer(t.ARRAY_BUFFER,Ye);for(let ze=0;ze<D.locationSize;ze++)y(D.location+ze,ae/D.locationSize,X,Q,Pe*re,(Ie+ae/D.locationSize*ze)*re,ge)}else{if(W.isInstancedBufferAttribute){for(let le=0;le<D.locationSize;le++)h(D.location+le,W.meshPerAttribute);M.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=W.meshPerAttribute*W.count)}else for(let le=0;le<D.locationSize;le++)g(D.location+le);t.bindBuffer(t.ARRAY_BUFFER,Ye);for(let le=0;le<D.locationSize;le++)y(D.location+le,ae/D.locationSize,X,Q,ae*re,ae/D.locationSize*le*re,ge)}}else if(O!==void 0){const Q=O[$];if(Q!==void 0)switch(Q.length){case 2:t.vertexAttrib2fv(D.location,Q);break;case 3:t.vertexAttrib3fv(D.location,Q);break;case 4:t.vertexAttrib4fv(D.location,Q);break;default:t.vertexAttrib1fv(D.location,Q)}}}}_()}function C(){P();for(const M in i){const L=i[M];for(const j in L){const z=L[j];for(const q in z)u(z[q].object),delete z[q];delete L[j]}delete i[M]}}function A(M){if(i[M.id]===void 0)return;const L=i[M.id];for(const j in L){const z=L[j];for(const q in z)u(z[q].object),delete z[q];delete L[j]}delete i[M.id]}function b(M){for(const L in i){const j=i[L];if(j[M.id]===void 0)continue;const z=j[M.id];for(const q in z)u(z[q].object),delete z[q];delete j[M.id]}}function P(){T(),o=!0,s!==r&&(s=r,c(s.object))}function T(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:P,resetDefaultState:T,dispose:C,releaseStatesOfGeometry:A,releaseStatesOfProgram:b,initAttributes:v,enableAttribute:g,disableUnusedAttributes:_}}function Lb(t,e,n){let i;function r(c){i=c}function s(c,u){t.drawArrays(i,c,u),n.update(u,i,1)}function o(c,u,d){d!==0&&(t.drawArraysInstanced(i,c,u,d),n.update(u,i,d))}function a(c,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,d);let p=0;for(let x=0;x<d;x++)p+=u[x];n.update(p,i,1)}function l(c,u,d,f){if(d===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let x=0;x<c.length;x++)o(c[x],u[x],f[x]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,u,0,f,0,d);let x=0;for(let v=0;v<d;v++)x+=u[v]*f[v];n.update(x,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Db(t,e,n,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const b=e.get("EXT_texture_filter_anisotropic");r=t.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(b){return!(b!==ti&&i.convert(b)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(b){const P=b===Wa&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(b!==Fi&&i.convert(b)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&b!==fi&&!P)}function l(b){if(b==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=n.logarithmicDepthBuffer===!0,f=n.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),p=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),x=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=t.getParameter(t.MAX_TEXTURE_SIZE),g=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),h=t.getParameter(t.MAX_VERTEX_ATTRIBS),_=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),y=t.getParameter(t.MAX_VARYING_VECTORS),S=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),C=x>0,A=t.getParameter(t.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:f,maxTextures:p,maxVertexTextures:x,maxTextureSize:v,maxCubemapSize:g,maxAttributes:h,maxVertexUniforms:_,maxVaryings:y,maxFragmentUniforms:S,vertexTextures:C,maxSamples:A}}function Ib(t){const e=this;let n=null,i=0,r=!1,s=!1;const o=new Qi,a=new ke,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const p=d.length!==0||f||i!==0||r;return r=f,i=d.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,f){n=u(d,f,0)},this.setState=function(d,f,p){const x=d.clippingPlanes,v=d.clipIntersection,g=d.clipShadows,h=t.get(d);if(!r||x===null||x.length===0||s&&!g)s?u(null):c();else{const _=s?0:i,y=_*4;let S=h.clippingState||null;l.value=S,S=u(x,f,y,p);for(let C=0;C!==y;++C)S[C]=n[C];h.clippingState=S,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=_}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,f,p,x){const v=d!==null?d.length:0;let g=null;if(v!==0){if(g=l.value,x!==!0||g===null){const h=p+v*4,_=f.matrixWorldInverse;a.getNormalMatrix(_),(g===null||g.length<h)&&(g=new Float32Array(h));for(let y=0,S=p;y!==v;++y,S+=4)o.copy(d[y]).applyMatrix4(_,a),o.normal.toArray(g,S),g[S+3]=o.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,g}}function Nb(t){let e=new WeakMap;function n(o,a){return a===Ch?o.mapping=go:a===Rh&&(o.mapping=vo),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Ch||a===Rh)if(e.has(o)){const l=e.get(o).texture;return n(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new W1(l.height);return c.fromEquirectangularTexture(t,o),e.set(o,c),o.addEventListener("dispose",r),n(c.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class E_ extends y_{constructor(e=-1,n=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+n,l=r-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const Xs=4,Rg=[.125,.215,.35,.446,.526,.582],Br=20,cd=new E_,Pg=new Be;let ud=null,dd=0,hd=0,fd=!1;const Fr=(1+Math.sqrt(5))/2,As=1/Fr,Lg=[new N(-Fr,As,0),new N(Fr,As,0),new N(-As,0,Fr),new N(As,0,Fr),new N(0,Fr,-As),new N(0,Fr,As),new N(-1,1,-1),new N(1,1,-1),new N(-1,1,1),new N(1,1,1)];class Dg{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,i=.1,r=100){ud=this._renderer.getRenderTarget(),dd=this._renderer.getActiveCubeFace(),hd=this._renderer.getActiveMipmapLevel(),fd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),n>0&&this._blur(s,0,0,n),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ug(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ng(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ud,dd,hd),this._renderer.xr.enabled=fd,e.scissorTest=!1,Dl(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===go||e.mapping===vo?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ud=this._renderer.getRenderTarget(),dd=this._renderer.getActiveCubeFace(),hd=this._renderer.getActiveMipmapLevel(),fd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:hi,minFilter:hi,generateMipmaps:!1,type:Wa,format:ti,colorSpace:Ao,depthBuffer:!1},r=Ig(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ig(e,n,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Ub(s)),this._blurMaterial=kb(s,e,n)}return r}_compileMaterial(e){const n=new lt(this._lodPlanes[0],e);this._renderer.compile(n,cd)}_sceneToCubeUV(e,n,i,r){const a=new Fn(90,1,n,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Pg),u.toneMapping=vr,u.autoClear=!1;const p=new zr({name:"PMREM.Background",side:vn,depthWrite:!1,depthTest:!1}),x=new lt(new Gt,p);let v=!1;const g=e.background;g?g.isColor&&(p.color.copy(g),e.background=null,v=!0):(p.color.copy(Pg),v=!0);for(let h=0;h<6;h++){const _=h%3;_===0?(a.up.set(0,l[h],0),a.lookAt(c[h],0,0)):_===1?(a.up.set(0,0,l[h]),a.lookAt(0,c[h],0)):(a.up.set(0,l[h],0),a.lookAt(0,0,c[h]));const y=this._cubeSize;Dl(r,_*y,h>2?y:0,y,y),u.setRenderTarget(r),v&&u.render(x,a),u.render(e,a)}x.geometry.dispose(),x.material.dispose(),u.toneMapping=f,u.autoClear=d,e.background=g}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===go||e.mapping===vo;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ug()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ng());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new lt(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;Dl(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(o,cd)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Lg[(r-s-1)%Lg.length];this._blur(e,s-1,s,o,a)}n.autoClear=i}_blur(e,n,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,n,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,n,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new lt(this._lodPlanes[r],c),f=c.uniforms,p=this._sizeLods[i]-1,x=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Br-1),v=s/x,g=isFinite(s)?1+Math.floor(u*v):Br;g>Br&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Br}`);const h=[];let _=0;for(let b=0;b<Br;++b){const P=b/v,T=Math.exp(-P*P/2);h.push(T),b===0?_+=T:b<g&&(_+=2*T)}for(let b=0;b<h.length;b++)h[b]=h[b]/_;f.envMap.value=e.texture,f.samples.value=g,f.weights.value=h,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:y}=this;f.dTheta.value=x,f.mipInt.value=y-i;const S=this._sizeLods[r],C=3*S*(r>y-Xs?r-y+Xs:0),A=4*(this._cubeSize-S);Dl(n,C,A,3*S,2*S),l.setRenderTarget(n),l.render(d,cd)}}function Ub(t){const e=[],n=[],i=[];let r=t;const s=t-Xs+1+Rg.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);n.push(a);let l=1/a;o>t-Xs?l=Rg[o-t+Xs-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),u=-c,d=1+c,f=[u,u,d,u,d,d,u,u,d,d,u,d],p=6,x=6,v=3,g=2,h=1,_=new Float32Array(v*x*p),y=new Float32Array(g*x*p),S=new Float32Array(h*x*p);for(let A=0;A<p;A++){const b=A%3*2/3-1,P=A>2?0:-1,T=[b,P,0,b+2/3,P,0,b+2/3,P+1,0,b,P,0,b+2/3,P+1,0,b,P+1,0];_.set(T,v*x*A),y.set(f,g*x*A);const M=[A,A,A,A,A,A];S.set(M,h*x*A)}const C=new xn;C.setAttribute("position",new jn(_,v)),C.setAttribute("uv",new jn(y,g)),C.setAttribute("faceIndex",new jn(S,h)),e.push(C),r>Xs&&r--}return{lodPlanes:e,sizeLods:n,sigmas:i}}function Ig(t,e,n){const i=new ts(t,e,n);return i.texture.mapping=lu,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Dl(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function kb(t,e,n){const i=new Float32Array(Br),r=new N(0,1,0);return new Mr({name:"SphericalGaussianBlur",defines:{n:Br,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:xp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:gr,depthTest:!1,depthWrite:!1})}function Ng(){return new Mr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:xp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:gr,depthTest:!1,depthWrite:!1})}function Ug(){return new Mr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:xp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:gr,depthTest:!1,depthWrite:!1})}function xp(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Fb(t){let e=new WeakMap,n=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===Ch||l===Rh,u=l===go||l===vo;if(c||u){let d=e.get(a);const f=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return n===null&&(n=new Dg(t)),d=c?n.fromEquirectangular(a,d):n.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{const p=a.image;return c&&p&&p.height>0||u&&p&&r(p)?(n===null&&(n=new Dg(t)),d=c?n.fromEquirectangular(a):n.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",s),d.texture):null}}}return a}function r(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:o}}function Ob(t){const e={};function n(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=t.getExtension("WEBGL_depth_texture")||t.getExtension("MOZ_WEBGL_depth_texture")||t.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=t.getExtension("EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=t.getExtension("WEBGL_compressed_texture_s3tc")||t.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=t.getExtension("WEBGL_compressed_texture_pvrtc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=t.getExtension(i)}return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&sa("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function zb(t,e,n,i){const r={},s=new WeakMap;function o(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const x in f.attributes)e.remove(f.attributes[x]);for(const x in f.morphAttributes){const v=f.morphAttributes[x];for(let g=0,h=v.length;g<h;g++)e.remove(v[g])}f.removeEventListener("dispose",o),delete r[f.id];const p=s.get(f);p&&(e.remove(p),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,n.memory.geometries--}function a(d,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,n.memory.geometries++),f}function l(d){const f=d.attributes;for(const x in f)e.update(f[x],t.ARRAY_BUFFER);const p=d.morphAttributes;for(const x in p){const v=p[x];for(let g=0,h=v.length;g<h;g++)e.update(v[g],t.ARRAY_BUFFER)}}function c(d){const f=[],p=d.index,x=d.attributes.position;let v=0;if(p!==null){const _=p.array;v=p.version;for(let y=0,S=_.length;y<S;y+=3){const C=_[y+0],A=_[y+1],b=_[y+2];f.push(C,A,A,b,b,C)}}else if(x!==void 0){const _=x.array;v=x.version;for(let y=0,S=_.length/3-1;y<S;y+=3){const C=y+0,A=y+1,b=y+2;f.push(C,A,A,b,b,C)}}else return;const g=new(h_(f)?x_:v_)(f,1);g.version=v;const h=s.get(d);h&&e.remove(h),s.set(d,g)}function u(d){const f=s.get(d);if(f){const p=d.index;p!==null&&f.version<p.version&&c(d)}else c(d);return s.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function Bb(t,e,n){let i;function r(f){i=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function l(f,p){t.drawElements(i,p,s,f*o),n.update(p,i,1)}function c(f,p,x){x!==0&&(t.drawElementsInstanced(i,p,s,f*o,x),n.update(p,i,x))}function u(f,p,x){if(x===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,s,f,0,x);let g=0;for(let h=0;h<x;h++)g+=p[h];n.update(g,i,1)}function d(f,p,x,v){if(x===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let h=0;h<f.length;h++)c(f[h]/o,p[h],v[h]);else{g.multiDrawElementsInstancedWEBGL(i,p,0,s,f,0,v,0,x);let h=0;for(let _=0;_<x;_++)h+=p[_]*v[_];n.update(h,i,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function Hb(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(n.calls++,o){case t.TRIANGLES:n.triangles+=a*(s/3);break;case t.LINES:n.lines+=a*(s/2);break;case t.LINE_STRIP:n.lines+=a*(s-1);break;case t.LINE_LOOP:n.lines+=a*s;break;case t.POINTS:n.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function Vb(t,e,n){const i=new WeakMap,r=new Tt;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0;let f=i.get(a);if(f===void 0||f.count!==d){let M=function(){P.dispose(),i.delete(a),a.removeEventListener("dispose",M)};var p=M;f!==void 0&&f.texture.dispose();const x=a.morphAttributes.position!==void 0,v=a.morphAttributes.normal!==void 0,g=a.morphAttributes.color!==void 0,h=a.morphAttributes.position||[],_=a.morphAttributes.normal||[],y=a.morphAttributes.color||[];let S=0;x===!0&&(S=1),v===!0&&(S=2),g===!0&&(S=3);let C=a.attributes.position.count*S,A=1;C>e.maxTextureSize&&(A=Math.ceil(C/e.maxTextureSize),C=e.maxTextureSize);const b=new Float32Array(C*A*4*d),P=new p_(b,C,A,d);P.type=fi,P.needsUpdate=!0;const T=S*4;for(let L=0;L<d;L++){const j=h[L],z=_[L],q=y[L],Z=C*A*4*L;for(let O=0;O<j.count;O++){const $=O*T;x===!0&&(r.fromBufferAttribute(j,O),b[Z+$+0]=r.x,b[Z+$+1]=r.y,b[Z+$+2]=r.z,b[Z+$+3]=0),v===!0&&(r.fromBufferAttribute(z,O),b[Z+$+4]=r.x,b[Z+$+5]=r.y,b[Z+$+6]=r.z,b[Z+$+7]=0),g===!0&&(r.fromBufferAttribute(q,O),b[Z+$+8]=r.x,b[Z+$+9]=r.y,b[Z+$+10]=r.z,b[Z+$+11]=q.itemSize===4?r.w:1)}}f={count:d,texture:P,size:new be(C,A)},i.set(a,f),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",o.morphTexture,n);else{let x=0;for(let g=0;g<c.length;g++)x+=c[g];const v=a.morphTargetsRelative?1:1-x;l.getUniforms().setValue(t,"morphTargetBaseInfluence",v),l.getUniforms().setValue(t,"morphTargetInfluences",c)}l.getUniforms().setValue(t,"morphTargetsTexture",f.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",f.size)}return{update:s}}function jb(t,e,n,i){let r=new WeakMap;function s(l){const c=i.render.frame,u=l.geometry,d=e.get(l,u);if(r.get(d)!==c&&(e.update(d),r.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(n.update(l.instanceMatrix,t.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,t.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;r.get(f)!==c&&(f.update(),r.set(f,c))}return d}function o(){r=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),n.remove(c.instanceMatrix),c.instanceColor!==null&&n.remove(c.instanceColor)}return{update:s,dispose:o}}class w_ extends Jt{constructor(e,n,i,r,s,o,a,l,c,u=io){if(u!==io&&u!==_o)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===io&&(i=es),i===void 0&&u===_o&&(i=xo),super(null,r,s,o,a,l,u,i,c),this.isDepthTexture=!0,this.image={width:e,height:n},this.magFilter=a!==void 0?a:Cn,this.minFilter=l!==void 0?l:Cn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}const T_=new Jt,kg=new w_(1,1),b_=new p_,A_=new R1,C_=new S_,Fg=[],Og=[],zg=new Float32Array(16),Bg=new Float32Array(9),Hg=new Float32Array(4);function Ro(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=Fg[r];if(s===void 0&&(s=new Float32Array(r),Fg[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=n,t[o].toArray(s,a)}return s}function Ft(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function Ot(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function du(t,e){let n=Og[e];n===void 0&&(n=new Int32Array(e),Og[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function Gb(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function Wb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ft(n,e))return;t.uniform2fv(this.addr,e),Ot(n,e)}}function Xb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Ft(n,e))return;t.uniform3fv(this.addr,e),Ot(n,e)}}function qb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ft(n,e))return;t.uniform4fv(this.addr,e),Ot(n,e)}}function $b(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Ft(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),Ot(n,e)}else{if(Ft(n,i))return;Hg.set(i),t.uniformMatrix2fv(this.addr,!1,Hg),Ot(n,i)}}function Yb(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Ft(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),Ot(n,e)}else{if(Ft(n,i))return;Bg.set(i),t.uniformMatrix3fv(this.addr,!1,Bg),Ot(n,i)}}function Kb(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Ft(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),Ot(n,e)}else{if(Ft(n,i))return;zg.set(i),t.uniformMatrix4fv(this.addr,!1,zg),Ot(n,i)}}function Zb(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function Qb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ft(n,e))return;t.uniform2iv(this.addr,e),Ot(n,e)}}function Jb(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Ft(n,e))return;t.uniform3iv(this.addr,e),Ot(n,e)}}function eA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ft(n,e))return;t.uniform4iv(this.addr,e),Ot(n,e)}}function tA(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function nA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ft(n,e))return;t.uniform2uiv(this.addr,e),Ot(n,e)}}function iA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Ft(n,e))return;t.uniform3uiv(this.addr,e),Ot(n,e)}}function rA(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ft(n,e))return;t.uniform4uiv(this.addr,e),Ot(n,e)}}function sA(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);let s;this.type===t.SAMPLER_2D_SHADOW?(kg.compareFunction=d_,s=kg):s=T_,n.setTexture2D(e||s,r)}function oA(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||A_,r)}function aA(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||C_,r)}function lA(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||b_,r)}function cA(t){switch(t){case 5126:return Gb;case 35664:return Wb;case 35665:return Xb;case 35666:return qb;case 35674:return $b;case 35675:return Yb;case 35676:return Kb;case 5124:case 35670:return Zb;case 35667:case 35671:return Qb;case 35668:case 35672:return Jb;case 35669:case 35673:return eA;case 5125:return tA;case 36294:return nA;case 36295:return iA;case 36296:return rA;case 35678:case 36198:case 36298:case 36306:case 35682:return sA;case 35679:case 36299:case 36307:return oA;case 35680:case 36300:case 36308:case 36293:return aA;case 36289:case 36303:case 36311:case 36292:return lA}}function uA(t,e){t.uniform1fv(this.addr,e)}function dA(t,e){const n=Ro(e,this.size,2);t.uniform2fv(this.addr,n)}function hA(t,e){const n=Ro(e,this.size,3);t.uniform3fv(this.addr,n)}function fA(t,e){const n=Ro(e,this.size,4);t.uniform4fv(this.addr,n)}function pA(t,e){const n=Ro(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function mA(t,e){const n=Ro(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function gA(t,e){const n=Ro(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function vA(t,e){t.uniform1iv(this.addr,e)}function xA(t,e){t.uniform2iv(this.addr,e)}function _A(t,e){t.uniform3iv(this.addr,e)}function yA(t,e){t.uniform4iv(this.addr,e)}function SA(t,e){t.uniform1uiv(this.addr,e)}function MA(t,e){t.uniform2uiv(this.addr,e)}function EA(t,e){t.uniform3uiv(this.addr,e)}function wA(t,e){t.uniform4uiv(this.addr,e)}function TA(t,e,n){const i=this.cache,r=e.length,s=du(n,r);Ft(i,s)||(t.uniform1iv(this.addr,s),Ot(i,s));for(let o=0;o!==r;++o)n.setTexture2D(e[o]||T_,s[o])}function bA(t,e,n){const i=this.cache,r=e.length,s=du(n,r);Ft(i,s)||(t.uniform1iv(this.addr,s),Ot(i,s));for(let o=0;o!==r;++o)n.setTexture3D(e[o]||A_,s[o])}function AA(t,e,n){const i=this.cache,r=e.length,s=du(n,r);Ft(i,s)||(t.uniform1iv(this.addr,s),Ot(i,s));for(let o=0;o!==r;++o)n.setTextureCube(e[o]||C_,s[o])}function CA(t,e,n){const i=this.cache,r=e.length,s=du(n,r);Ft(i,s)||(t.uniform1iv(this.addr,s),Ot(i,s));for(let o=0;o!==r;++o)n.setTexture2DArray(e[o]||b_,s[o])}function RA(t){switch(t){case 5126:return uA;case 35664:return dA;case 35665:return hA;case 35666:return fA;case 35674:return pA;case 35675:return mA;case 35676:return gA;case 5124:case 35670:return vA;case 35667:case 35671:return xA;case 35668:case 35672:return _A;case 35669:case 35673:return yA;case 5125:return SA;case 36294:return MA;case 36295:return EA;case 36296:return wA;case 35678:case 36198:case 36298:case 36306:case 35682:return TA;case 35679:case 36299:case 36307:return bA;case 35680:case 36300:case 36308:case 36293:return AA;case 36289:case 36303:case 36311:case 36292:return CA}}class PA{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=cA(n.type)}}class LA{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=RA(n.type)}}class DA{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,n[a.id],i)}}}const pd=/(\w+)(\])?(\[|\.)?/g;function Vg(t,e){t.seq.push(e),t.map[e.id]=e}function IA(t,e,n){const i=t.name,r=i.length;for(pd.lastIndex=0;;){const s=pd.exec(i),o=pd.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){Vg(n,c===void 0?new PA(a,t,e):new LA(a,t,e));break}else{let d=n.map[a];d===void 0&&(d=new DA(a),Vg(n,d)),n=d}}}class ac{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(n,r),o=e.getUniformLocation(n,s.name);IA(s,o,this)}}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,o=n.length;s!==o;++s){const a=n[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in n&&i.push(o)}return i}}function jg(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const NA=37297;let UA=0;function kA(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${n[o]}`)}return i.join(`
`)}const Gg=new ke;function FA(t){qe._getMatrix(Gg,qe.workingColorSpace,t);const e=`mat3( ${Gg.elements.map(n=>n.toFixed(4))} )`;switch(qe.getTransfer(t)){case cu:return[e,"LinearTransferOETF"];case nt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",t),[e,"LinearTransferOETF"]}}function Wg(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),r=t.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return n.toUpperCase()+`

`+r+`

`+kA(t.getShaderSource(e),o)}else return r}function OA(t,e){const n=FA(e);return[`vec4 ${t}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}function zA(t,e){let n;switch(e){case t1:n="Linear";break;case n1:n="Reinhard";break;case i1:n="Cineon";break;case r1:n="ACESFilmic";break;case o1:n="AgX";break;case a1:n="Neutral";break;case s1:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const Il=new N;function BA(){qe.getLuminanceCoefficients(Il);const t=Il.x.toFixed(4),e=Il.y.toFixed(4),n=Il.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function HA(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(oa).join(`
`)}function VA(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function jA(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),o=s.name;let a=1;s.type===t.FLOAT_MAT2&&(a=2),s.type===t.FLOAT_MAT3&&(a=3),s.type===t.FLOAT_MAT4&&(a=4),n[o]={type:s.type,location:t.getAttribLocation(e,o),locationSize:a}}return n}function oa(t){return t!==""}function Xg(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function qg(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const GA=/^[ \t]*#include +<([\w\d./]+)>/gm;function af(t){return t.replace(GA,XA)}const WA=new Map;function XA(t,e){let n=Oe[e];if(n===void 0){const i=WA.get(e);if(i!==void 0)n=Oe[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return af(n)}const qA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function $g(t){return t.replace(qA,$A)}function $A(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Yg(t){let e=`precision ${t.precision} float;
	precision ${t.precision} int;
	precision ${t.precision} sampler2D;
	precision ${t.precision} samplerCube;
	precision ${t.precision} sampler3D;
	precision ${t.precision} sampler2DArray;
	precision ${t.precision} sampler2DShadow;
	precision ${t.precision} samplerCubeShadow;
	precision ${t.precision} sampler2DArrayShadow;
	precision ${t.precision} isampler2D;
	precision ${t.precision} isampler3D;
	precision ${t.precision} isamplerCube;
	precision ${t.precision} isampler2DArray;
	precision ${t.precision} usampler2D;
	precision ${t.precision} usampler3D;
	precision ${t.precision} usamplerCube;
	precision ${t.precision} usampler2DArray;
	`;return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function YA(t){let e="SHADOWMAP_TYPE_BASIC";return t.shadowMapType===Zx?e="SHADOWMAP_TYPE_PCF":t.shadowMapType===Qx?e="SHADOWMAP_TYPE_PCF_SOFT":t.shadowMapType===Ti&&(e="SHADOWMAP_TYPE_VSM"),e}function KA(t){let e="ENVMAP_TYPE_CUBE";if(t.envMap)switch(t.envMapMode){case go:case vo:e="ENVMAP_TYPE_CUBE";break;case lu:e="ENVMAP_TYPE_CUBE_UV";break}return e}function ZA(t){let e="ENVMAP_MODE_REFLECTION";if(t.envMap)switch(t.envMapMode){case vo:e="ENVMAP_MODE_REFRACTION";break}return e}function QA(t){let e="ENVMAP_BLENDING_NONE";if(t.envMap)switch(t.combine){case Jx:e="ENVMAP_BLENDING_MULTIPLY";break;case JE:e="ENVMAP_BLENDING_MIX";break;case e1:e="ENVMAP_BLENDING_ADD";break}return e}function JA(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function eC(t,e,n,i){const r=t.getContext(),s=n.defines;let o=n.vertexShader,a=n.fragmentShader;const l=YA(n),c=KA(n),u=ZA(n),d=QA(n),f=JA(n),p=HA(n),x=VA(s),v=r.createProgram();let g,h,_=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(g=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,x].filter(oa).join(`
`),g.length>0&&(g+=`
`),h=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,x].filter(oa).join(`
`),h.length>0&&(h+=`
`)):(g=[Yg(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,x,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+u:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(oa).join(`
`),h=[Yg(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,x,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+u:"",n.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==vr?"#define TONE_MAPPING":"",n.toneMapping!==vr?Oe.tonemapping_pars_fragment:"",n.toneMapping!==vr?zA("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Oe.colorspace_pars_fragment,OA("linearToOutputTexel",n.outputColorSpace),BA(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(oa).join(`
`)),o=af(o),o=Xg(o,n),o=qg(o,n),a=af(a),a=Xg(a,n),a=qg(a,n),o=$g(o),a=$g(a),n.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,g=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,h=["#define varying in",n.glslVersion===lg?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===lg?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const y=_+g+o,S=_+h+a,C=jg(r,r.VERTEX_SHADER,y),A=jg(r,r.FRAGMENT_SHADER,S);r.attachShader(v,C),r.attachShader(v,A),n.index0AttributeName!==void 0?r.bindAttribLocation(v,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v);function b(L){if(t.debug.checkShaderErrors){const j=r.getProgramInfoLog(v).trim(),z=r.getShaderInfoLog(C).trim(),q=r.getShaderInfoLog(A).trim();let Z=!0,O=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(Z=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,v,C,A);else{const $=Wg(r,C,"vertex"),D=Wg(r,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+j+`
`+$+`
`+D)}else j!==""?console.warn("THREE.WebGLProgram: Program Info Log:",j):(z===""||q==="")&&(O=!1);O&&(L.diagnostics={runnable:Z,programLog:j,vertexShader:{log:z,prefix:g},fragmentShader:{log:q,prefix:h}})}r.deleteShader(C),r.deleteShader(A),P=new ac(r,v),T=jA(r,v)}let P;this.getUniforms=function(){return P===void 0&&b(this),P};let T;this.getAttributes=function(){return T===void 0&&b(this),T};let M=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=r.getProgramParameter(v,NA)),M},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=UA++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=C,this.fragmentShader=A,this}let tC=0;class nC{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new iC(e),n.set(e,i)),i}}class iC{constructor(e){this.id=tC++,this.code=e,this.usedTimes=0}}function rC(t,e,n,i,r,s,o){const a=new m_,l=new nC,c=new Set,u=[],d=r.logarithmicDepthBuffer,f=r.vertexTextures;let p=r.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(T){return c.add(T),T===0?"uv":`uv${T}`}function g(T,M,L,j,z){const q=j.fog,Z=z.geometry,O=T.isMeshStandardMaterial?j.environment:null,$=(T.isMeshStandardMaterial?n:e).get(T.envMap||O),D=$&&$.mapping===lu?$.image.height:null,W=x[T.type];T.precision!==null&&(p=r.getMaxPrecision(T.precision),p!==T.precision&&console.warn("THREE.WebGLProgram.getParameters:",T.precision,"not supported, using",p,"instead."));const Q=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,ae=Q!==void 0?Q.length:0;let ye=0;Z.morphAttributes.position!==void 0&&(ye=1),Z.morphAttributes.normal!==void 0&&(ye=2),Z.morphAttributes.color!==void 0&&(ye=3);let Ye,X,re,ge;if(W){const Je=li[W];Ye=Je.vertexShader,X=Je.fragmentShader}else Ye=T.vertexShader,X=T.fragmentShader,l.update(T),re=l.getVertexShaderID(T),ge=l.getFragmentShaderID(T);const le=t.getRenderTarget(),Pe=t.state.buffers.depth.getReversed(),Ie=z.isInstancedMesh===!0,ze=z.isBatchedMesh===!0,_t=!!T.map,We=!!T.matcap,At=!!$,F=!!T.aoMap,Dn=!!T.lightMap,Ve=!!T.bumpMap,je=!!T.normalMap,Ce=!!T.displacementMap,ht=!!T.emissiveMap,Ae=!!T.metalnessMap,R=!!T.roughnessMap,E=T.anisotropy>0,B=T.clearcoat>0,J=T.dispersion>0,ne=T.iridescence>0,K=T.sheen>0,we=T.transmission>0,de=E&&!!T.anisotropyMap,ve=B&&!!T.clearcoatMap,Xe=B&&!!T.clearcoatNormalMap,se=B&&!!T.clearcoatRoughnessMap,xe=ne&&!!T.iridescenceMap,Re=ne&&!!T.iridescenceThicknessMap,Le=K&&!!T.sheenColorMap,_e=K&&!!T.sheenRoughnessMap,Ge=!!T.specularMap,Fe=!!T.specularColorMap,ct=!!T.specularIntensityMap,I=we&&!!T.transmissionMap,ue=we&&!!T.thicknessMap,G=!!T.gradientMap,ee=!!T.alphaMap,pe=T.alphaTest>0,he=!!T.alphaHash,Ne=!!T.extensions;let Et=vr;T.toneMapped&&(le===null||le.isXRRenderTarget===!0)&&(Et=t.toneMapping);const qt={shaderID:W,shaderType:T.type,shaderName:T.name,vertexShader:Ye,fragmentShader:X,defines:T.defines,customVertexShaderID:re,customFragmentShaderID:ge,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:p,batching:ze,batchingColor:ze&&z._colorsTexture!==null,instancing:Ie,instancingColor:Ie&&z.instanceColor!==null,instancingMorph:Ie&&z.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:le===null?t.outputColorSpace:le.isXRRenderTarget===!0?le.texture.colorSpace:Ao,alphaToCoverage:!!T.alphaToCoverage,map:_t,matcap:We,envMap:At,envMapMode:At&&$.mapping,envMapCubeUVHeight:D,aoMap:F,lightMap:Dn,bumpMap:Ve,normalMap:je,displacementMap:f&&Ce,emissiveMap:ht,normalMapObjectSpace:je&&T.normalMapType===d1,normalMapTangentSpace:je&&T.normalMapType===u_,metalnessMap:Ae,roughnessMap:R,anisotropy:E,anisotropyMap:de,clearcoat:B,clearcoatMap:ve,clearcoatNormalMap:Xe,clearcoatRoughnessMap:se,dispersion:J,iridescence:ne,iridescenceMap:xe,iridescenceThicknessMap:Re,sheen:K,sheenColorMap:Le,sheenRoughnessMap:_e,specularMap:Ge,specularColorMap:Fe,specularIntensityMap:ct,transmission:we,transmissionMap:I,thicknessMap:ue,gradientMap:G,opaque:T.transparent===!1&&T.blending===no&&T.alphaToCoverage===!1,alphaMap:ee,alphaTest:pe,alphaHash:he,combine:T.combine,mapUv:_t&&v(T.map.channel),aoMapUv:F&&v(T.aoMap.channel),lightMapUv:Dn&&v(T.lightMap.channel),bumpMapUv:Ve&&v(T.bumpMap.channel),normalMapUv:je&&v(T.normalMap.channel),displacementMapUv:Ce&&v(T.displacementMap.channel),emissiveMapUv:ht&&v(T.emissiveMap.channel),metalnessMapUv:Ae&&v(T.metalnessMap.channel),roughnessMapUv:R&&v(T.roughnessMap.channel),anisotropyMapUv:de&&v(T.anisotropyMap.channel),clearcoatMapUv:ve&&v(T.clearcoatMap.channel),clearcoatNormalMapUv:Xe&&v(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:se&&v(T.clearcoatRoughnessMap.channel),iridescenceMapUv:xe&&v(T.iridescenceMap.channel),iridescenceThicknessMapUv:Re&&v(T.iridescenceThicknessMap.channel),sheenColorMapUv:Le&&v(T.sheenColorMap.channel),sheenRoughnessMapUv:_e&&v(T.sheenRoughnessMap.channel),specularMapUv:Ge&&v(T.specularMap.channel),specularColorMapUv:Fe&&v(T.specularColorMap.channel),specularIntensityMapUv:ct&&v(T.specularIntensityMap.channel),transmissionMapUv:I&&v(T.transmissionMap.channel),thicknessMapUv:ue&&v(T.thicknessMap.channel),alphaMapUv:ee&&v(T.alphaMap.channel),vertexTangents:!!Z.attributes.tangent&&(je||E),vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!Z.attributes.uv&&(_t||ee),fog:!!q,useFog:T.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:T.flatShading===!0,sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:Pe,skinning:z.isSkinnedMesh===!0,morphTargets:Z.morphAttributes.position!==void 0,morphNormals:Z.morphAttributes.normal!==void 0,morphColors:Z.morphAttributes.color!==void 0,morphTargetsCount:ae,morphTextureStride:ye,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:T.dithering,shadowMapEnabled:t.shadowMap.enabled&&L.length>0,shadowMapType:t.shadowMap.type,toneMapping:Et,decodeVideoTexture:_t&&T.map.isVideoTexture===!0&&qe.getTransfer(T.map.colorSpace)===nt,decodeVideoTextureEmissive:ht&&T.emissiveMap.isVideoTexture===!0&&qe.getTransfer(T.emissiveMap.colorSpace)===nt,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===ui,flipSided:T.side===vn,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:Ne&&T.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ne&&T.extensions.multiDraw===!0||ze)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return qt.vertexUv1s=c.has(1),qt.vertexUv2s=c.has(2),qt.vertexUv3s=c.has(3),c.clear(),qt}function h(T){const M=[];if(T.shaderID?M.push(T.shaderID):(M.push(T.customVertexShaderID),M.push(T.customFragmentShaderID)),T.defines!==void 0)for(const L in T.defines)M.push(L),M.push(T.defines[L]);return T.isRawShaderMaterial===!1&&(_(M,T),y(M,T),M.push(t.outputColorSpace)),M.push(T.customProgramCacheKey),M.join()}function _(T,M){T.push(M.precision),T.push(M.outputColorSpace),T.push(M.envMapMode),T.push(M.envMapCubeUVHeight),T.push(M.mapUv),T.push(M.alphaMapUv),T.push(M.lightMapUv),T.push(M.aoMapUv),T.push(M.bumpMapUv),T.push(M.normalMapUv),T.push(M.displacementMapUv),T.push(M.emissiveMapUv),T.push(M.metalnessMapUv),T.push(M.roughnessMapUv),T.push(M.anisotropyMapUv),T.push(M.clearcoatMapUv),T.push(M.clearcoatNormalMapUv),T.push(M.clearcoatRoughnessMapUv),T.push(M.iridescenceMapUv),T.push(M.iridescenceThicknessMapUv),T.push(M.sheenColorMapUv),T.push(M.sheenRoughnessMapUv),T.push(M.specularMapUv),T.push(M.specularColorMapUv),T.push(M.specularIntensityMapUv),T.push(M.transmissionMapUv),T.push(M.thicknessMapUv),T.push(M.combine),T.push(M.fogExp2),T.push(M.sizeAttenuation),T.push(M.morphTargetsCount),T.push(M.morphAttributeCount),T.push(M.numDirLights),T.push(M.numPointLights),T.push(M.numSpotLights),T.push(M.numSpotLightMaps),T.push(M.numHemiLights),T.push(M.numRectAreaLights),T.push(M.numDirLightShadows),T.push(M.numPointLightShadows),T.push(M.numSpotLightShadows),T.push(M.numSpotLightShadowsWithMaps),T.push(M.numLightProbes),T.push(M.shadowMapType),T.push(M.toneMapping),T.push(M.numClippingPlanes),T.push(M.numClipIntersection),T.push(M.depthPacking)}function y(T,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),T.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),T.push(a.mask)}function S(T){const M=x[T.type];let L;if(M){const j=li[M];L=H1.clone(j.uniforms)}else L=T.uniforms;return L}function C(T,M){let L;for(let j=0,z=u.length;j<z;j++){const q=u[j];if(q.cacheKey===M){L=q,++L.usedTimes;break}}return L===void 0&&(L=new eC(t,M,T,s),u.push(L)),L}function A(T){if(--T.usedTimes===0){const M=u.indexOf(T);u[M]=u[u.length-1],u.pop(),T.destroy()}}function b(T){l.remove(T)}function P(){l.dispose()}return{getParameters:g,getProgramCacheKey:h,getUniforms:S,acquireProgram:C,releaseProgram:A,releaseShaderCache:b,programs:u,dispose:P}}function sC(){let t=new WeakMap;function e(o){return t.has(o)}function n(o){let a=t.get(o);return a===void 0&&(a={},t.set(o,a)),a}function i(o){t.delete(o)}function r(o,a,l){t.get(o)[a]=l}function s(){t=new WeakMap}return{has:e,get:n,remove:i,update:r,dispose:s}}function oC(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.z!==e.z?t.z-e.z:t.id-e.id}function Kg(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function Zg(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function o(d,f,p,x,v,g){let h=t[e];return h===void 0?(h={id:d.id,object:d,geometry:f,material:p,groupOrder:x,renderOrder:d.renderOrder,z:v,group:g},t[e]=h):(h.id=d.id,h.object=d,h.geometry=f,h.material=p,h.groupOrder=x,h.renderOrder=d.renderOrder,h.z=v,h.group=g),e++,h}function a(d,f,p,x,v,g){const h=o(d,f,p,x,v,g);p.transmission>0?i.push(h):p.transparent===!0?r.push(h):n.push(h)}function l(d,f,p,x,v,g){const h=o(d,f,p,x,v,g);p.transmission>0?i.unshift(h):p.transparent===!0?r.unshift(h):n.unshift(h)}function c(d,f){n.length>1&&n.sort(d||oC),i.length>1&&i.sort(f||Kg),r.length>1&&r.sort(f||Kg)}function u(){for(let d=e,f=t.length;d<f;d++){const p=t[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:u,sort:c}}function aC(){let t=new WeakMap;function e(i,r){const s=t.get(i);let o;return s===void 0?(o=new Zg,t.set(i,[o])):r>=s.length?(o=new Zg,s.push(o)):o=s[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}function lC(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new N,color:new Be};break;case"SpotLight":n={position:new N,direction:new N,color:new Be,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new N,color:new Be,distance:0,decay:0};break;case"HemisphereLight":n={direction:new N,skyColor:new Be,groundColor:new Be};break;case"RectAreaLight":n={color:new Be,position:new N,halfWidth:new N,halfHeight:new N};break}return t[e.id]=n,n}}}function cC(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new be};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new be};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new be,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let uC=0;function dC(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function hC(t){const e=new lC,n=cC(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new N);const r=new N,s=new st,o=new st;function a(c){let u=0,d=0,f=0;for(let T=0;T<9;T++)i.probe[T].set(0,0,0);let p=0,x=0,v=0,g=0,h=0,_=0,y=0,S=0,C=0,A=0,b=0;c.sort(dC);for(let T=0,M=c.length;T<M;T++){const L=c[T],j=L.color,z=L.intensity,q=L.distance,Z=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)u+=j.r*z,d+=j.g*z,f+=j.b*z;else if(L.isLightProbe){for(let O=0;O<9;O++)i.probe[O].addScaledVector(L.sh.coefficients[O],z);b++}else if(L.isDirectionalLight){const O=e.get(L);if(O.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const $=L.shadow,D=n.get(L);D.shadowIntensity=$.intensity,D.shadowBias=$.bias,D.shadowNormalBias=$.normalBias,D.shadowRadius=$.radius,D.shadowMapSize=$.mapSize,i.directionalShadow[p]=D,i.directionalShadowMap[p]=Z,i.directionalShadowMatrix[p]=L.shadow.matrix,_++}i.directional[p]=O,p++}else if(L.isSpotLight){const O=e.get(L);O.position.setFromMatrixPosition(L.matrixWorld),O.color.copy(j).multiplyScalar(z),O.distance=q,O.coneCos=Math.cos(L.angle),O.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),O.decay=L.decay,i.spot[v]=O;const $=L.shadow;if(L.map&&(i.spotLightMap[C]=L.map,C++,$.updateMatrices(L),L.castShadow&&A++),i.spotLightMatrix[v]=$.matrix,L.castShadow){const D=n.get(L);D.shadowIntensity=$.intensity,D.shadowBias=$.bias,D.shadowNormalBias=$.normalBias,D.shadowRadius=$.radius,D.shadowMapSize=$.mapSize,i.spotShadow[v]=D,i.spotShadowMap[v]=Z,S++}v++}else if(L.isRectAreaLight){const O=e.get(L);O.color.copy(j).multiplyScalar(z),O.halfWidth.set(L.width*.5,0,0),O.halfHeight.set(0,L.height*.5,0),i.rectArea[g]=O,g++}else if(L.isPointLight){const O=e.get(L);if(O.color.copy(L.color).multiplyScalar(L.intensity),O.distance=L.distance,O.decay=L.decay,L.castShadow){const $=L.shadow,D=n.get(L);D.shadowIntensity=$.intensity,D.shadowBias=$.bias,D.shadowNormalBias=$.normalBias,D.shadowRadius=$.radius,D.shadowMapSize=$.mapSize,D.shadowCameraNear=$.camera.near,D.shadowCameraFar=$.camera.far,i.pointShadow[x]=D,i.pointShadowMap[x]=Z,i.pointShadowMatrix[x]=L.shadow.matrix,y++}i.point[x]=O,x++}else if(L.isHemisphereLight){const O=e.get(L);O.skyColor.copy(L.color).multiplyScalar(z),O.groundColor.copy(L.groundColor).multiplyScalar(z),i.hemi[h]=O,h++}}g>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ce.LTC_FLOAT_1,i.rectAreaLTC2=ce.LTC_FLOAT_2):(i.rectAreaLTC1=ce.LTC_HALF_1,i.rectAreaLTC2=ce.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=f;const P=i.hash;(P.directionalLength!==p||P.pointLength!==x||P.spotLength!==v||P.rectAreaLength!==g||P.hemiLength!==h||P.numDirectionalShadows!==_||P.numPointShadows!==y||P.numSpotShadows!==S||P.numSpotMaps!==C||P.numLightProbes!==b)&&(i.directional.length=p,i.spot.length=v,i.rectArea.length=g,i.point.length=x,i.hemi.length=h,i.directionalShadow.length=_,i.directionalShadowMap.length=_,i.pointShadow.length=y,i.pointShadowMap.length=y,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=_,i.pointShadowMatrix.length=y,i.spotLightMatrix.length=S+C-A,i.spotLightMap.length=C,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=b,P.directionalLength=p,P.pointLength=x,P.spotLength=v,P.rectAreaLength=g,P.hemiLength=h,P.numDirectionalShadows=_,P.numPointShadows=y,P.numSpotShadows=S,P.numSpotMaps=C,P.numLightProbes=b,i.version=uC++)}function l(c,u){let d=0,f=0,p=0,x=0,v=0;const g=u.matrixWorldInverse;for(let h=0,_=c.length;h<_;h++){const y=c[h];if(y.isDirectionalLight){const S=i.directional[d];S.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(g),d++}else if(y.isSpotLight){const S=i.spot[p];S.position.setFromMatrixPosition(y.matrixWorld),S.position.applyMatrix4(g),S.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(g),p++}else if(y.isRectAreaLight){const S=i.rectArea[x];S.position.setFromMatrixPosition(y.matrixWorld),S.position.applyMatrix4(g),o.identity(),s.copy(y.matrixWorld),s.premultiply(g),o.extractRotation(s),S.halfWidth.set(y.width*.5,0,0),S.halfHeight.set(0,y.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),x++}else if(y.isPointLight){const S=i.point[f];S.position.setFromMatrixPosition(y.matrixWorld),S.position.applyMatrix4(g),f++}else if(y.isHemisphereLight){const S=i.hemi[v];S.direction.setFromMatrixPosition(y.matrixWorld),S.direction.transformDirection(g),v++}}}return{setup:a,setupView:l,state:i}}function Qg(t){const e=new hC(t),n=[],i=[];function r(u){c.camera=u,n.length=0,i.length=0}function s(u){n.push(u)}function o(u){i.push(u)}function a(){e.setup(n)}function l(u){e.setupView(n,u)}const c={lightsArray:n,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function fC(t){let e=new WeakMap;function n(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new Qg(t),e.set(r,[a])):s>=o.length?(a=new Qg(t),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:n,dispose:i}}class pC extends cs{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=c1,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class mC extends cs{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const gC=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,vC=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function xC(t,e,n){let i=new vp;const r=new be,s=new be,o=new Tt,a=new pC({depthPacking:u1}),l=new mC,c={},u=n.maxTextureSize,d={[Sr]:vn,[vn]:Sr,[ui]:ui},f=new Mr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new be},radius:{value:4}},vertexShader:gC,fragmentShader:vC}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const x=new xn;x.setAttribute("position",new jn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new lt(x,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Zx;let h=this.type;this.render=function(A,b,P){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||A.length===0)return;const T=t.getRenderTarget(),M=t.getActiveCubeFace(),L=t.getActiveMipmapLevel(),j=t.state;j.setBlending(gr),j.buffers.color.setClear(1,1,1,1),j.buffers.depth.setTest(!0),j.setScissorTest(!1);const z=h!==Ti&&this.type===Ti,q=h===Ti&&this.type!==Ti;for(let Z=0,O=A.length;Z<O;Z++){const $=A[Z],D=$.shadow;if(D===void 0){console.warn("THREE.WebGLShadowMap:",$,"has no shadow.");continue}if(D.autoUpdate===!1&&D.needsUpdate===!1)continue;r.copy(D.mapSize);const W=D.getFrameExtents();if(r.multiply(W),s.copy(D.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/W.x),r.x=s.x*W.x,D.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/W.y),r.y=s.y*W.y,D.mapSize.y=s.y)),D.map===null||z===!0||q===!0){const ae=this.type!==Ti?{minFilter:Cn,magFilter:Cn}:{};D.map!==null&&D.map.dispose(),D.map=new ts(r.x,r.y,ae),D.map.texture.name=$.name+".shadowMap",D.camera.updateProjectionMatrix()}t.setRenderTarget(D.map),t.clear();const Q=D.getViewportCount();for(let ae=0;ae<Q;ae++){const ye=D.getViewport(ae);o.set(s.x*ye.x,s.y*ye.y,s.x*ye.z,s.y*ye.w),j.viewport(o),D.updateMatrices($,ae),i=D.getFrustum(),S(b,P,D.camera,$,this.type)}D.isPointLightShadow!==!0&&this.type===Ti&&_(D,P),D.needsUpdate=!1}h=this.type,g.needsUpdate=!1,t.setRenderTarget(T,M,L)};function _(A,b){const P=e.update(v);f.defines.VSM_SAMPLES!==A.blurSamples&&(f.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new ts(r.x,r.y)),f.uniforms.shadow_pass.value=A.map.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,t.setRenderTarget(A.mapPass),t.clear(),t.renderBufferDirect(b,null,P,f,v,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value=A.mapSize,p.uniforms.radius.value=A.radius,t.setRenderTarget(A.map),t.clear(),t.renderBufferDirect(b,null,P,p,v,null)}function y(A,b,P,T){let M=null;const L=P.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(L!==void 0)M=L;else if(M=P.isPointLight===!0?l:a,t.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0){const j=M.uuid,z=b.uuid;let q=c[j];q===void 0&&(q={},c[j]=q);let Z=q[z];Z===void 0&&(Z=M.clone(),q[z]=Z,b.addEventListener("dispose",C)),M=Z}if(M.visible=b.visible,M.wireframe=b.wireframe,T===Ti?M.side=b.shadowSide!==null?b.shadowSide:b.side:M.side=b.shadowSide!==null?b.shadowSide:d[b.side],M.alphaMap=b.alphaMap,M.alphaTest=b.alphaTest,M.map=b.map,M.clipShadows=b.clipShadows,M.clippingPlanes=b.clippingPlanes,M.clipIntersection=b.clipIntersection,M.displacementMap=b.displacementMap,M.displacementScale=b.displacementScale,M.displacementBias=b.displacementBias,M.wireframeLinewidth=b.wireframeLinewidth,M.linewidth=b.linewidth,P.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const j=t.properties.get(M);j.light=P}return M}function S(A,b,P,T,M){if(A.visible===!1)return;if(A.layers.test(b.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&M===Ti)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,A.matrixWorld);const z=e.update(A),q=A.material;if(Array.isArray(q)){const Z=z.groups;for(let O=0,$=Z.length;O<$;O++){const D=Z[O],W=q[D.materialIndex];if(W&&W.visible){const Q=y(A,W,T,M);A.onBeforeShadow(t,A,b,P,z,Q,D),t.renderBufferDirect(P,null,z,Q,A,D),A.onAfterShadow(t,A,b,P,z,Q,D)}}}else if(q.visible){const Z=y(A,q,T,M);A.onBeforeShadow(t,A,b,P,z,Z,null),t.renderBufferDirect(P,null,z,Z,A,null),A.onAfterShadow(t,A,b,P,z,Z,null)}}const j=A.children;for(let z=0,q=j.length;z<q;z++)S(j[z],b,P,T,M)}function C(A){A.target.removeEventListener("dispose",C);for(const P in c){const T=c[P],M=A.target.uuid;M in T&&(T[M].dispose(),delete T[M])}}}const _C={[Sh]:Mh,[Eh]:bh,[wh]:Ah,[mo]:Th,[Mh]:Sh,[bh]:Eh,[Ah]:wh,[Th]:mo};function yC(t,e){function n(){let I=!1;const ue=new Tt;let G=null;const ee=new Tt(0,0,0,0);return{setMask:function(pe){G!==pe&&!I&&(t.colorMask(pe,pe,pe,pe),G=pe)},setLocked:function(pe){I=pe},setClear:function(pe,he,Ne,Et,qt){qt===!0&&(pe*=Et,he*=Et,Ne*=Et),ue.set(pe,he,Ne,Et),ee.equals(ue)===!1&&(t.clearColor(pe,he,Ne,Et),ee.copy(ue))},reset:function(){I=!1,G=null,ee.set(-1,0,0,0)}}}function i(){let I=!1,ue=!1,G=null,ee=null,pe=null;return{setReversed:function(he){if(ue!==he){const Ne=e.get("EXT_clip_control");ue?Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.ZERO_TO_ONE_EXT):Ne.clipControlEXT(Ne.LOWER_LEFT_EXT,Ne.NEGATIVE_ONE_TO_ONE_EXT);const Et=pe;pe=null,this.setClear(Et)}ue=he},getReversed:function(){return ue},setTest:function(he){he?le(t.DEPTH_TEST):Pe(t.DEPTH_TEST)},setMask:function(he){G!==he&&!I&&(t.depthMask(he),G=he)},setFunc:function(he){if(ue&&(he=_C[he]),ee!==he){switch(he){case Sh:t.depthFunc(t.NEVER);break;case Mh:t.depthFunc(t.ALWAYS);break;case Eh:t.depthFunc(t.LESS);break;case mo:t.depthFunc(t.LEQUAL);break;case wh:t.depthFunc(t.EQUAL);break;case Th:t.depthFunc(t.GEQUAL);break;case bh:t.depthFunc(t.GREATER);break;case Ah:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}ee=he}},setLocked:function(he){I=he},setClear:function(he){pe!==he&&(ue&&(he=1-he),t.clearDepth(he),pe=he)},reset:function(){I=!1,G=null,ee=null,pe=null,ue=!1}}}function r(){let I=!1,ue=null,G=null,ee=null,pe=null,he=null,Ne=null,Et=null,qt=null;return{setTest:function(Je){I||(Je?le(t.STENCIL_TEST):Pe(t.STENCIL_TEST))},setMask:function(Je){ue!==Je&&!I&&(t.stencilMask(Je),ue=Je)},setFunc:function(Je,Xn,xi){(G!==Je||ee!==Xn||pe!==xi)&&(t.stencilFunc(Je,Xn,xi),G=Je,ee=Xn,pe=xi)},setOp:function(Je,Xn,xi){(he!==Je||Ne!==Xn||Et!==xi)&&(t.stencilOp(Je,Xn,xi),he=Je,Ne=Xn,Et=xi)},setLocked:function(Je){I=Je},setClear:function(Je){qt!==Je&&(t.clearStencil(Je),qt=Je)},reset:function(){I=!1,ue=null,G=null,ee=null,pe=null,he=null,Ne=null,Et=null,qt=null}}}const s=new n,o=new i,a=new r,l=new WeakMap,c=new WeakMap;let u={},d={},f=new WeakMap,p=[],x=null,v=!1,g=null,h=null,_=null,y=null,S=null,C=null,A=null,b=new Be(0,0,0),P=0,T=!1,M=null,L=null,j=null,z=null,q=null;const Z=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let O=!1,$=0;const D=t.getParameter(t.VERSION);D.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(D)[1]),O=$>=1):D.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(D)[1]),O=$>=2);let W=null,Q={};const ae=t.getParameter(t.SCISSOR_BOX),ye=t.getParameter(t.VIEWPORT),Ye=new Tt().fromArray(ae),X=new Tt().fromArray(ye);function re(I,ue,G,ee){const pe=new Uint8Array(4),he=t.createTexture();t.bindTexture(I,he),t.texParameteri(I,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(I,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let Ne=0;Ne<G;Ne++)I===t.TEXTURE_3D||I===t.TEXTURE_2D_ARRAY?t.texImage3D(ue,0,t.RGBA,1,1,ee,0,t.RGBA,t.UNSIGNED_BYTE,pe):t.texImage2D(ue+Ne,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,pe);return he}const ge={};ge[t.TEXTURE_2D]=re(t.TEXTURE_2D,t.TEXTURE_2D,1),ge[t.TEXTURE_CUBE_MAP]=re(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),ge[t.TEXTURE_2D_ARRAY]=re(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),ge[t.TEXTURE_3D]=re(t.TEXTURE_3D,t.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),le(t.DEPTH_TEST),o.setFunc(mo),Ve(!1),je(ig),le(t.CULL_FACE),F(gr);function le(I){u[I]!==!0&&(t.enable(I),u[I]=!0)}function Pe(I){u[I]!==!1&&(t.disable(I),u[I]=!1)}function Ie(I,ue){return d[I]!==ue?(t.bindFramebuffer(I,ue),d[I]=ue,I===t.DRAW_FRAMEBUFFER&&(d[t.FRAMEBUFFER]=ue),I===t.FRAMEBUFFER&&(d[t.DRAW_FRAMEBUFFER]=ue),!0):!1}function ze(I,ue){let G=p,ee=!1;if(I){G=f.get(ue),G===void 0&&(G=[],f.set(ue,G));const pe=I.textures;if(G.length!==pe.length||G[0]!==t.COLOR_ATTACHMENT0){for(let he=0,Ne=pe.length;he<Ne;he++)G[he]=t.COLOR_ATTACHMENT0+he;G.length=pe.length,ee=!0}}else G[0]!==t.BACK&&(G[0]=t.BACK,ee=!0);ee&&t.drawBuffers(G)}function _t(I){return x!==I?(t.useProgram(I),x=I,!0):!1}const We={[Or]:t.FUNC_ADD,[kE]:t.FUNC_SUBTRACT,[FE]:t.FUNC_REVERSE_SUBTRACT};We[OE]=t.MIN,We[zE]=t.MAX;const At={[BE]:t.ZERO,[HE]:t.ONE,[VE]:t.SRC_COLOR,[_h]:t.SRC_ALPHA,[$E]:t.SRC_ALPHA_SATURATE,[XE]:t.DST_COLOR,[GE]:t.DST_ALPHA,[jE]:t.ONE_MINUS_SRC_COLOR,[yh]:t.ONE_MINUS_SRC_ALPHA,[qE]:t.ONE_MINUS_DST_COLOR,[WE]:t.ONE_MINUS_DST_ALPHA,[YE]:t.CONSTANT_COLOR,[KE]:t.ONE_MINUS_CONSTANT_COLOR,[ZE]:t.CONSTANT_ALPHA,[QE]:t.ONE_MINUS_CONSTANT_ALPHA};function F(I,ue,G,ee,pe,he,Ne,Et,qt,Je){if(I===gr){v===!0&&(Pe(t.BLEND),v=!1);return}if(v===!1&&(le(t.BLEND),v=!0),I!==UE){if(I!==g||Je!==T){if((h!==Or||S!==Or)&&(t.blendEquation(t.FUNC_ADD),h=Or,S=Or),Je)switch(I){case no:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case rg:t.blendFunc(t.ONE,t.ONE);break;case sg:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case og:t.blendFuncSeparate(t.ZERO,t.SRC_COLOR,t.ZERO,t.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case no:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case rg:t.blendFunc(t.SRC_ALPHA,t.ONE);break;case sg:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case og:t.blendFunc(t.ZERO,t.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}_=null,y=null,C=null,A=null,b.set(0,0,0),P=0,g=I,T=Je}return}pe=pe||ue,he=he||G,Ne=Ne||ee,(ue!==h||pe!==S)&&(t.blendEquationSeparate(We[ue],We[pe]),h=ue,S=pe),(G!==_||ee!==y||he!==C||Ne!==A)&&(t.blendFuncSeparate(At[G],At[ee],At[he],At[Ne]),_=G,y=ee,C=he,A=Ne),(Et.equals(b)===!1||qt!==P)&&(t.blendColor(Et.r,Et.g,Et.b,qt),b.copy(Et),P=qt),g=I,T=!1}function Dn(I,ue){I.side===ui?Pe(t.CULL_FACE):le(t.CULL_FACE);let G=I.side===vn;ue&&(G=!G),Ve(G),I.blending===no&&I.transparent===!1?F(gr):F(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),o.setFunc(I.depthFunc),o.setTest(I.depthTest),o.setMask(I.depthWrite),s.setMask(I.colorWrite);const ee=I.stencilWrite;a.setTest(ee),ee&&(a.setMask(I.stencilWriteMask),a.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),a.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),ht(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?le(t.SAMPLE_ALPHA_TO_COVERAGE):Pe(t.SAMPLE_ALPHA_TO_COVERAGE)}function Ve(I){M!==I&&(I?t.frontFace(t.CW):t.frontFace(t.CCW),M=I)}function je(I){I!==IE?(le(t.CULL_FACE),I!==L&&(I===ig?t.cullFace(t.BACK):I===NE?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):Pe(t.CULL_FACE),L=I}function Ce(I){I!==j&&(O&&t.lineWidth(I),j=I)}function ht(I,ue,G){I?(le(t.POLYGON_OFFSET_FILL),(z!==ue||q!==G)&&(t.polygonOffset(ue,G),z=ue,q=G)):Pe(t.POLYGON_OFFSET_FILL)}function Ae(I){I?le(t.SCISSOR_TEST):Pe(t.SCISSOR_TEST)}function R(I){I===void 0&&(I=t.TEXTURE0+Z-1),W!==I&&(t.activeTexture(I),W=I)}function E(I,ue,G){G===void 0&&(W===null?G=t.TEXTURE0+Z-1:G=W);let ee=Q[G];ee===void 0&&(ee={type:void 0,texture:void 0},Q[G]=ee),(ee.type!==I||ee.texture!==ue)&&(W!==G&&(t.activeTexture(G),W=G),t.bindTexture(I,ue||ge[I]),ee.type=I,ee.texture=ue)}function B(){const I=Q[W];I!==void 0&&I.type!==void 0&&(t.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function J(){try{t.compressedTexImage2D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ne(){try{t.compressedTexImage3D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function K(){try{t.texSubImage2D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function we(){try{t.texSubImage3D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function de(){try{t.compressedTexSubImage2D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ve(){try{t.compressedTexSubImage3D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Xe(){try{t.texStorage2D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function se(){try{t.texStorage3D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function xe(){try{t.texImage2D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Re(){try{t.texImage3D.apply(t,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Le(I){Ye.equals(I)===!1&&(t.scissor(I.x,I.y,I.z,I.w),Ye.copy(I))}function _e(I){X.equals(I)===!1&&(t.viewport(I.x,I.y,I.z,I.w),X.copy(I))}function Ge(I,ue){let G=c.get(ue);G===void 0&&(G=new WeakMap,c.set(ue,G));let ee=G.get(I);ee===void 0&&(ee=t.getUniformBlockIndex(ue,I.name),G.set(I,ee))}function Fe(I,ue){const ee=c.get(ue).get(I);l.get(ue)!==ee&&(t.uniformBlockBinding(ue,ee,I.__bindingPointIndex),l.set(ue,ee))}function ct(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),o.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),u={},W=null,Q={},d={},f=new WeakMap,p=[],x=null,v=!1,g=null,h=null,_=null,y=null,S=null,C=null,A=null,b=new Be(0,0,0),P=0,T=!1,M=null,L=null,j=null,z=null,q=null,Ye.set(0,0,t.canvas.width,t.canvas.height),X.set(0,0,t.canvas.width,t.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:le,disable:Pe,bindFramebuffer:Ie,drawBuffers:ze,useProgram:_t,setBlending:F,setMaterial:Dn,setFlipSided:Ve,setCullFace:je,setLineWidth:Ce,setPolygonOffset:ht,setScissorTest:Ae,activeTexture:R,bindTexture:E,unbindTexture:B,compressedTexImage2D:J,compressedTexImage3D:ne,texImage2D:xe,texImage3D:Re,updateUBOMapping:Ge,uniformBlockBinding:Fe,texStorage2D:Xe,texStorage3D:se,texSubImage2D:K,texSubImage3D:we,compressedTexSubImage2D:de,compressedTexSubImage3D:ve,scissor:Le,viewport:_e,reset:ct}}function Jg(t,e,n,i){const r=SC(i);switch(n){case r_:return t*e;case o_:return t*e;case a_:return t*e*2;case hp:return t*e/r.components*r.byteLength;case fp:return t*e/r.components*r.byteLength;case l_:return t*e*2/r.components*r.byteLength;case pp:return t*e*2/r.components*r.byteLength;case s_:return t*e*3/r.components*r.byteLength;case ti:return t*e*4/r.components*r.byteLength;case mp:return t*e*4/r.components*r.byteLength;case tc:case nc:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case ic:case rc:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Ih:case Uh:return Math.max(t,16)*Math.max(e,8)/4;case Dh:case Nh:return Math.max(t,8)*Math.max(e,8)/2;case kh:case Fh:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case Oh:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case zh:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Bh:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case Hh:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case Vh:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case jh:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case Gh:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case Wh:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case Xh:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case qh:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case $h:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case Yh:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case Kh:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case Zh:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case Qh:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case sc:case Jh:case ef:return Math.ceil(t/4)*Math.ceil(e/4)*16;case c_:case tf:return Math.ceil(t/4)*Math.ceil(e/4)*8;case nf:case rf:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function SC(t){switch(t){case Fi:case t_:return{byteLength:1,components:1};case Oa:case n_:case Wa:return{byteLength:2,components:1};case up:case dp:return{byteLength:2,components:4};case es:case cp:case fi:return{byteLength:4,components:1};case i_:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${t}.`)}function MC(t,e,n,i,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new be,u=new WeakMap;let d;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(R,E){return p?new OffscreenCanvas(R,E):kc("canvas")}function v(R,E,B){let J=1;const ne=Ae(R);if((ne.width>B||ne.height>B)&&(J=B/Math.max(ne.width,ne.height)),J<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const K=Math.floor(J*ne.width),we=Math.floor(J*ne.height);d===void 0&&(d=x(K,we));const de=E?x(K,we):d;return de.width=K,de.height=we,de.getContext("2d").drawImage(R,0,0,K,we),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ne.width+"x"+ne.height+") to ("+K+"x"+we+")."),de}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ne.width+"x"+ne.height+")."),R;return R}function g(R){return R.generateMipmaps}function h(R){t.generateMipmap(R)}function _(R){return R.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?t.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?t.TEXTURE_2D_ARRAY:t.TEXTURE_2D}function y(R,E,B,J,ne=!1){if(R!==null){if(t[R]!==void 0)return t[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let K=E;if(E===t.RED&&(B===t.FLOAT&&(K=t.R32F),B===t.HALF_FLOAT&&(K=t.R16F),B===t.UNSIGNED_BYTE&&(K=t.R8)),E===t.RED_INTEGER&&(B===t.UNSIGNED_BYTE&&(K=t.R8UI),B===t.UNSIGNED_SHORT&&(K=t.R16UI),B===t.UNSIGNED_INT&&(K=t.R32UI),B===t.BYTE&&(K=t.R8I),B===t.SHORT&&(K=t.R16I),B===t.INT&&(K=t.R32I)),E===t.RG&&(B===t.FLOAT&&(K=t.RG32F),B===t.HALF_FLOAT&&(K=t.RG16F),B===t.UNSIGNED_BYTE&&(K=t.RG8)),E===t.RG_INTEGER&&(B===t.UNSIGNED_BYTE&&(K=t.RG8UI),B===t.UNSIGNED_SHORT&&(K=t.RG16UI),B===t.UNSIGNED_INT&&(K=t.RG32UI),B===t.BYTE&&(K=t.RG8I),B===t.SHORT&&(K=t.RG16I),B===t.INT&&(K=t.RG32I)),E===t.RGB_INTEGER&&(B===t.UNSIGNED_BYTE&&(K=t.RGB8UI),B===t.UNSIGNED_SHORT&&(K=t.RGB16UI),B===t.UNSIGNED_INT&&(K=t.RGB32UI),B===t.BYTE&&(K=t.RGB8I),B===t.SHORT&&(K=t.RGB16I),B===t.INT&&(K=t.RGB32I)),E===t.RGBA_INTEGER&&(B===t.UNSIGNED_BYTE&&(K=t.RGBA8UI),B===t.UNSIGNED_SHORT&&(K=t.RGBA16UI),B===t.UNSIGNED_INT&&(K=t.RGBA32UI),B===t.BYTE&&(K=t.RGBA8I),B===t.SHORT&&(K=t.RGBA16I),B===t.INT&&(K=t.RGBA32I)),E===t.RGB&&B===t.UNSIGNED_INT_5_9_9_9_REV&&(K=t.RGB9_E5),E===t.RGBA){const we=ne?cu:qe.getTransfer(J);B===t.FLOAT&&(K=t.RGBA32F),B===t.HALF_FLOAT&&(K=t.RGBA16F),B===t.UNSIGNED_BYTE&&(K=we===nt?t.SRGB8_ALPHA8:t.RGBA8),B===t.UNSIGNED_SHORT_4_4_4_4&&(K=t.RGBA4),B===t.UNSIGNED_SHORT_5_5_5_1&&(K=t.RGB5_A1)}return(K===t.R16F||K===t.R32F||K===t.RG16F||K===t.RG32F||K===t.RGBA16F||K===t.RGBA32F)&&e.get("EXT_color_buffer_float"),K}function S(R,E){let B;return R?E===null||E===es||E===xo?B=t.DEPTH24_STENCIL8:E===fi?B=t.DEPTH32F_STENCIL8:E===Oa&&(B=t.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===es||E===xo?B=t.DEPTH_COMPONENT24:E===fi?B=t.DEPTH_COMPONENT32F:E===Oa&&(B=t.DEPTH_COMPONENT16),B}function C(R,E){return g(R)===!0||R.isFramebufferTexture&&R.minFilter!==Cn&&R.minFilter!==hi?Math.log2(Math.max(E.width,E.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?E.mipmaps.length:1}function A(R){const E=R.target;E.removeEventListener("dispose",A),P(E),E.isVideoTexture&&u.delete(E)}function b(R){const E=R.target;E.removeEventListener("dispose",b),M(E)}function P(R){const E=i.get(R);if(E.__webglInit===void 0)return;const B=R.source,J=f.get(B);if(J){const ne=J[E.__cacheKey];ne.usedTimes--,ne.usedTimes===0&&T(R),Object.keys(J).length===0&&f.delete(B)}i.remove(R)}function T(R){const E=i.get(R);t.deleteTexture(E.__webglTexture);const B=R.source,J=f.get(B);delete J[E.__cacheKey],o.memory.textures--}function M(R){const E=i.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),i.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(E.__webglFramebuffer[J]))for(let ne=0;ne<E.__webglFramebuffer[J].length;ne++)t.deleteFramebuffer(E.__webglFramebuffer[J][ne]);else t.deleteFramebuffer(E.__webglFramebuffer[J]);E.__webglDepthbuffer&&t.deleteRenderbuffer(E.__webglDepthbuffer[J])}else{if(Array.isArray(E.__webglFramebuffer))for(let J=0;J<E.__webglFramebuffer.length;J++)t.deleteFramebuffer(E.__webglFramebuffer[J]);else t.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&t.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&t.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let J=0;J<E.__webglColorRenderbuffer.length;J++)E.__webglColorRenderbuffer[J]&&t.deleteRenderbuffer(E.__webglColorRenderbuffer[J]);E.__webglDepthRenderbuffer&&t.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const B=R.textures;for(let J=0,ne=B.length;J<ne;J++){const K=i.get(B[J]);K.__webglTexture&&(t.deleteTexture(K.__webglTexture),o.memory.textures--),i.remove(B[J])}i.remove(R)}let L=0;function j(){L=0}function z(){const R=L;return R>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+r.maxTextures),L+=1,R}function q(R){const E=[];return E.push(R.wrapS),E.push(R.wrapT),E.push(R.wrapR||0),E.push(R.magFilter),E.push(R.minFilter),E.push(R.anisotropy),E.push(R.internalFormat),E.push(R.format),E.push(R.type),E.push(R.generateMipmaps),E.push(R.premultiplyAlpha),E.push(R.flipY),E.push(R.unpackAlignment),E.push(R.colorSpace),E.join()}function Z(R,E){const B=i.get(R);if(R.isVideoTexture&&Ce(R),R.isRenderTargetTexture===!1&&R.version>0&&B.__version!==R.version){const J=R.image;if(J===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{X(B,R,E);return}}n.bindTexture(t.TEXTURE_2D,B.__webglTexture,t.TEXTURE0+E)}function O(R,E){const B=i.get(R);if(R.version>0&&B.__version!==R.version){X(B,R,E);return}n.bindTexture(t.TEXTURE_2D_ARRAY,B.__webglTexture,t.TEXTURE0+E)}function $(R,E){const B=i.get(R);if(R.version>0&&B.__version!==R.version){X(B,R,E);return}n.bindTexture(t.TEXTURE_3D,B.__webglTexture,t.TEXTURE0+E)}function D(R,E){const B=i.get(R);if(R.version>0&&B.__version!==R.version){re(B,R,E);return}n.bindTexture(t.TEXTURE_CUBE_MAP,B.__webglTexture,t.TEXTURE0+E)}const W={[Ph]:t.REPEAT,[Wr]:t.CLAMP_TO_EDGE,[Lh]:t.MIRRORED_REPEAT},Q={[Cn]:t.NEAREST,[l1]:t.NEAREST_MIPMAP_NEAREST,[fl]:t.NEAREST_MIPMAP_LINEAR,[hi]:t.LINEAR,[Hu]:t.LINEAR_MIPMAP_NEAREST,[Xr]:t.LINEAR_MIPMAP_LINEAR},ae={[h1]:t.NEVER,[x1]:t.ALWAYS,[f1]:t.LESS,[d_]:t.LEQUAL,[p1]:t.EQUAL,[v1]:t.GEQUAL,[m1]:t.GREATER,[g1]:t.NOTEQUAL};function ye(R,E){if(E.type===fi&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===hi||E.magFilter===Hu||E.magFilter===fl||E.magFilter===Xr||E.minFilter===hi||E.minFilter===Hu||E.minFilter===fl||E.minFilter===Xr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(R,t.TEXTURE_WRAP_S,W[E.wrapS]),t.texParameteri(R,t.TEXTURE_WRAP_T,W[E.wrapT]),(R===t.TEXTURE_3D||R===t.TEXTURE_2D_ARRAY)&&t.texParameteri(R,t.TEXTURE_WRAP_R,W[E.wrapR]),t.texParameteri(R,t.TEXTURE_MAG_FILTER,Q[E.magFilter]),t.texParameteri(R,t.TEXTURE_MIN_FILTER,Q[E.minFilter]),E.compareFunction&&(t.texParameteri(R,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(R,t.TEXTURE_COMPARE_FUNC,ae[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===Cn||E.minFilter!==fl&&E.minFilter!==Xr||E.type===fi&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||i.get(E).__currentAnisotropy){const B=e.get("EXT_texture_filter_anisotropic");t.texParameterf(R,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,r.getMaxAnisotropy())),i.get(E).__currentAnisotropy=E.anisotropy}}}function Ye(R,E){let B=!1;R.__webglInit===void 0&&(R.__webglInit=!0,E.addEventListener("dispose",A));const J=E.source;let ne=f.get(J);ne===void 0&&(ne={},f.set(J,ne));const K=q(E);if(K!==R.__cacheKey){ne[K]===void 0&&(ne[K]={texture:t.createTexture(),usedTimes:0},o.memory.textures++,B=!0),ne[K].usedTimes++;const we=ne[R.__cacheKey];we!==void 0&&(ne[R.__cacheKey].usedTimes--,we.usedTimes===0&&T(E)),R.__cacheKey=K,R.__webglTexture=ne[K].texture}return B}function X(R,E,B){let J=t.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(J=t.TEXTURE_2D_ARRAY),E.isData3DTexture&&(J=t.TEXTURE_3D);const ne=Ye(R,E),K=E.source;n.bindTexture(J,R.__webglTexture,t.TEXTURE0+B);const we=i.get(K);if(K.version!==we.__version||ne===!0){n.activeTexture(t.TEXTURE0+B);const de=qe.getPrimaries(qe.workingColorSpace),ve=E.colorSpace===tr?null:qe.getPrimaries(E.colorSpace),Xe=E.colorSpace===tr||de===ve?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,E.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,E.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Xe);let se=v(E.image,!1,r.maxTextureSize);se=ht(E,se);const xe=s.convert(E.format,E.colorSpace),Re=s.convert(E.type);let Le=y(E.internalFormat,xe,Re,E.colorSpace,E.isVideoTexture);ye(J,E);let _e;const Ge=E.mipmaps,Fe=E.isVideoTexture!==!0,ct=we.__version===void 0||ne===!0,I=K.dataReady,ue=C(E,se);if(E.isDepthTexture)Le=S(E.format===_o,E.type),ct&&(Fe?n.texStorage2D(t.TEXTURE_2D,1,Le,se.width,se.height):n.texImage2D(t.TEXTURE_2D,0,Le,se.width,se.height,0,xe,Re,null));else if(E.isDataTexture)if(Ge.length>0){Fe&&ct&&n.texStorage2D(t.TEXTURE_2D,ue,Le,Ge[0].width,Ge[0].height);for(let G=0,ee=Ge.length;G<ee;G++)_e=Ge[G],Fe?I&&n.texSubImage2D(t.TEXTURE_2D,G,0,0,_e.width,_e.height,xe,Re,_e.data):n.texImage2D(t.TEXTURE_2D,G,Le,_e.width,_e.height,0,xe,Re,_e.data);E.generateMipmaps=!1}else Fe?(ct&&n.texStorage2D(t.TEXTURE_2D,ue,Le,se.width,se.height),I&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,se.width,se.height,xe,Re,se.data)):n.texImage2D(t.TEXTURE_2D,0,Le,se.width,se.height,0,xe,Re,se.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Fe&&ct&&n.texStorage3D(t.TEXTURE_2D_ARRAY,ue,Le,Ge[0].width,Ge[0].height,se.depth);for(let G=0,ee=Ge.length;G<ee;G++)if(_e=Ge[G],E.format!==ti)if(xe!==null)if(Fe){if(I)if(E.layerUpdates.size>0){const pe=Jg(_e.width,_e.height,E.format,E.type);for(const he of E.layerUpdates){const Ne=_e.data.subarray(he*pe/_e.data.BYTES_PER_ELEMENT,(he+1)*pe/_e.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,G,0,0,he,_e.width,_e.height,1,xe,Ne)}E.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,G,0,0,0,_e.width,_e.height,se.depth,xe,_e.data)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,G,Le,_e.width,_e.height,se.depth,0,_e.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Fe?I&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,G,0,0,0,_e.width,_e.height,se.depth,xe,Re,_e.data):n.texImage3D(t.TEXTURE_2D_ARRAY,G,Le,_e.width,_e.height,se.depth,0,xe,Re,_e.data)}else{Fe&&ct&&n.texStorage2D(t.TEXTURE_2D,ue,Le,Ge[0].width,Ge[0].height);for(let G=0,ee=Ge.length;G<ee;G++)_e=Ge[G],E.format!==ti?xe!==null?Fe?I&&n.compressedTexSubImage2D(t.TEXTURE_2D,G,0,0,_e.width,_e.height,xe,_e.data):n.compressedTexImage2D(t.TEXTURE_2D,G,Le,_e.width,_e.height,0,_e.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Fe?I&&n.texSubImage2D(t.TEXTURE_2D,G,0,0,_e.width,_e.height,xe,Re,_e.data):n.texImage2D(t.TEXTURE_2D,G,Le,_e.width,_e.height,0,xe,Re,_e.data)}else if(E.isDataArrayTexture)if(Fe){if(ct&&n.texStorage3D(t.TEXTURE_2D_ARRAY,ue,Le,se.width,se.height,se.depth),I)if(E.layerUpdates.size>0){const G=Jg(se.width,se.height,E.format,E.type);for(const ee of E.layerUpdates){const pe=se.data.subarray(ee*G/se.data.BYTES_PER_ELEMENT,(ee+1)*G/se.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,ee,se.width,se.height,1,xe,Re,pe)}E.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,se.width,se.height,se.depth,xe,Re,se.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,Le,se.width,se.height,se.depth,0,xe,Re,se.data);else if(E.isData3DTexture)Fe?(ct&&n.texStorage3D(t.TEXTURE_3D,ue,Le,se.width,se.height,se.depth),I&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,se.width,se.height,se.depth,xe,Re,se.data)):n.texImage3D(t.TEXTURE_3D,0,Le,se.width,se.height,se.depth,0,xe,Re,se.data);else if(E.isFramebufferTexture){if(ct)if(Fe)n.texStorage2D(t.TEXTURE_2D,ue,Le,se.width,se.height);else{let G=se.width,ee=se.height;for(let pe=0;pe<ue;pe++)n.texImage2D(t.TEXTURE_2D,pe,Le,G,ee,0,xe,Re,null),G>>=1,ee>>=1}}else if(Ge.length>0){if(Fe&&ct){const G=Ae(Ge[0]);n.texStorage2D(t.TEXTURE_2D,ue,Le,G.width,G.height)}for(let G=0,ee=Ge.length;G<ee;G++)_e=Ge[G],Fe?I&&n.texSubImage2D(t.TEXTURE_2D,G,0,0,xe,Re,_e):n.texImage2D(t.TEXTURE_2D,G,Le,xe,Re,_e);E.generateMipmaps=!1}else if(Fe){if(ct){const G=Ae(se);n.texStorage2D(t.TEXTURE_2D,ue,Le,G.width,G.height)}I&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,xe,Re,se)}else n.texImage2D(t.TEXTURE_2D,0,Le,xe,Re,se);g(E)&&h(J),we.__version=K.version,E.onUpdate&&E.onUpdate(E)}R.__version=E.version}function re(R,E,B){if(E.image.length!==6)return;const J=Ye(R,E),ne=E.source;n.bindTexture(t.TEXTURE_CUBE_MAP,R.__webglTexture,t.TEXTURE0+B);const K=i.get(ne);if(ne.version!==K.__version||J===!0){n.activeTexture(t.TEXTURE0+B);const we=qe.getPrimaries(qe.workingColorSpace),de=E.colorSpace===tr?null:qe.getPrimaries(E.colorSpace),ve=E.colorSpace===tr||we===de?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,E.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,E.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,ve);const Xe=E.isCompressedTexture||E.image[0].isCompressedTexture,se=E.image[0]&&E.image[0].isDataTexture,xe=[];for(let ee=0;ee<6;ee++)!Xe&&!se?xe[ee]=v(E.image[ee],!0,r.maxCubemapSize):xe[ee]=se?E.image[ee].image:E.image[ee],xe[ee]=ht(E,xe[ee]);const Re=xe[0],Le=s.convert(E.format,E.colorSpace),_e=s.convert(E.type),Ge=y(E.internalFormat,Le,_e,E.colorSpace),Fe=E.isVideoTexture!==!0,ct=K.__version===void 0||J===!0,I=ne.dataReady;let ue=C(E,Re);ye(t.TEXTURE_CUBE_MAP,E);let G;if(Xe){Fe&&ct&&n.texStorage2D(t.TEXTURE_CUBE_MAP,ue,Ge,Re.width,Re.height);for(let ee=0;ee<6;ee++){G=xe[ee].mipmaps;for(let pe=0;pe<G.length;pe++){const he=G[pe];E.format!==ti?Le!==null?Fe?I&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,pe,0,0,he.width,he.height,Le,he.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,pe,Ge,he.width,he.height,0,he.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Fe?I&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,pe,0,0,he.width,he.height,Le,_e,he.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,pe,Ge,he.width,he.height,0,Le,_e,he.data)}}}else{if(G=E.mipmaps,Fe&&ct){G.length>0&&ue++;const ee=Ae(xe[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,ue,Ge,ee.width,ee.height)}for(let ee=0;ee<6;ee++)if(se){Fe?I&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,xe[ee].width,xe[ee].height,Le,_e,xe[ee].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,Ge,xe[ee].width,xe[ee].height,0,Le,_e,xe[ee].data);for(let pe=0;pe<G.length;pe++){const Ne=G[pe].image[ee].image;Fe?I&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,pe+1,0,0,Ne.width,Ne.height,Le,_e,Ne.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,pe+1,Ge,Ne.width,Ne.height,0,Le,_e,Ne.data)}}else{Fe?I&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,Le,_e,xe[ee]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,Ge,Le,_e,xe[ee]);for(let pe=0;pe<G.length;pe++){const he=G[pe];Fe?I&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,pe+1,0,0,Le,_e,he.image[ee]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,pe+1,Ge,Le,_e,he.image[ee])}}}g(E)&&h(t.TEXTURE_CUBE_MAP),K.__version=ne.version,E.onUpdate&&E.onUpdate(E)}R.__version=E.version}function ge(R,E,B,J,ne,K){const we=s.convert(B.format,B.colorSpace),de=s.convert(B.type),ve=y(B.internalFormat,we,de,B.colorSpace),Xe=i.get(E),se=i.get(B);if(se.__renderTarget=E,!Xe.__hasExternalTextures){const xe=Math.max(1,E.width>>K),Re=Math.max(1,E.height>>K);ne===t.TEXTURE_3D||ne===t.TEXTURE_2D_ARRAY?n.texImage3D(ne,K,ve,xe,Re,E.depth,0,we,de,null):n.texImage2D(ne,K,ve,xe,Re,0,we,de,null)}n.bindFramebuffer(t.FRAMEBUFFER,R),je(E)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,J,ne,se.__webglTexture,0,Ve(E)):(ne===t.TEXTURE_2D||ne>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&ne<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,J,ne,se.__webglTexture,K),n.bindFramebuffer(t.FRAMEBUFFER,null)}function le(R,E,B){if(t.bindRenderbuffer(t.RENDERBUFFER,R),E.depthBuffer){const J=E.depthTexture,ne=J&&J.isDepthTexture?J.type:null,K=S(E.stencilBuffer,ne),we=E.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,de=Ve(E);je(E)?a.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,de,K,E.width,E.height):B?t.renderbufferStorageMultisample(t.RENDERBUFFER,de,K,E.width,E.height):t.renderbufferStorage(t.RENDERBUFFER,K,E.width,E.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,we,t.RENDERBUFFER,R)}else{const J=E.textures;for(let ne=0;ne<J.length;ne++){const K=J[ne],we=s.convert(K.format,K.colorSpace),de=s.convert(K.type),ve=y(K.internalFormat,we,de,K.colorSpace),Xe=Ve(E);B&&je(E)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,Xe,ve,E.width,E.height):je(E)?a.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,Xe,ve,E.width,E.height):t.renderbufferStorage(t.RENDERBUFFER,ve,E.width,E.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function Pe(R,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(t.FRAMEBUFFER,R),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const J=i.get(E.depthTexture);J.__renderTarget=E,(!J.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),Z(E.depthTexture,0);const ne=J.__webglTexture,K=Ve(E);if(E.depthTexture.format===io)je(E)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,ne,0,K):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,ne,0);else if(E.depthTexture.format===_o)je(E)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,ne,0,K):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,ne,0);else throw new Error("Unknown depthTexture format")}function Ie(R){const E=i.get(R),B=R.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==R.depthTexture){const J=R.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),J){const ne=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,J.removeEventListener("dispose",ne)};J.addEventListener("dispose",ne),E.__depthDisposeCallback=ne}E.__boundDepthTexture=J}if(R.depthTexture&&!E.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");Pe(E.__webglFramebuffer,R)}else if(B){E.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(n.bindFramebuffer(t.FRAMEBUFFER,E.__webglFramebuffer[J]),E.__webglDepthbuffer[J]===void 0)E.__webglDepthbuffer[J]=t.createRenderbuffer(),le(E.__webglDepthbuffer[J],R,!1);else{const ne=R.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,K=E.__webglDepthbuffer[J];t.bindRenderbuffer(t.RENDERBUFFER,K),t.framebufferRenderbuffer(t.FRAMEBUFFER,ne,t.RENDERBUFFER,K)}}else if(n.bindFramebuffer(t.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=t.createRenderbuffer(),le(E.__webglDepthbuffer,R,!1);else{const J=R.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,ne=E.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,ne),t.framebufferRenderbuffer(t.FRAMEBUFFER,J,t.RENDERBUFFER,ne)}n.bindFramebuffer(t.FRAMEBUFFER,null)}function ze(R,E,B){const J=i.get(R);E!==void 0&&ge(J.__webglFramebuffer,R,R.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),B!==void 0&&Ie(R)}function _t(R){const E=R.texture,B=i.get(R),J=i.get(E);R.addEventListener("dispose",b);const ne=R.textures,K=R.isWebGLCubeRenderTarget===!0,we=ne.length>1;if(we||(J.__webglTexture===void 0&&(J.__webglTexture=t.createTexture()),J.__version=E.version,o.memory.textures++),K){B.__webglFramebuffer=[];for(let de=0;de<6;de++)if(E.mipmaps&&E.mipmaps.length>0){B.__webglFramebuffer[de]=[];for(let ve=0;ve<E.mipmaps.length;ve++)B.__webglFramebuffer[de][ve]=t.createFramebuffer()}else B.__webglFramebuffer[de]=t.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){B.__webglFramebuffer=[];for(let de=0;de<E.mipmaps.length;de++)B.__webglFramebuffer[de]=t.createFramebuffer()}else B.__webglFramebuffer=t.createFramebuffer();if(we)for(let de=0,ve=ne.length;de<ve;de++){const Xe=i.get(ne[de]);Xe.__webglTexture===void 0&&(Xe.__webglTexture=t.createTexture(),o.memory.textures++)}if(R.samples>0&&je(R)===!1){B.__webglMultisampledFramebuffer=t.createFramebuffer(),B.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let de=0;de<ne.length;de++){const ve=ne[de];B.__webglColorRenderbuffer[de]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,B.__webglColorRenderbuffer[de]);const Xe=s.convert(ve.format,ve.colorSpace),se=s.convert(ve.type),xe=y(ve.internalFormat,Xe,se,ve.colorSpace,R.isXRRenderTarget===!0),Re=Ve(R);t.renderbufferStorageMultisample(t.RENDERBUFFER,Re,xe,R.width,R.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+de,t.RENDERBUFFER,B.__webglColorRenderbuffer[de])}t.bindRenderbuffer(t.RENDERBUFFER,null),R.depthBuffer&&(B.__webglDepthRenderbuffer=t.createRenderbuffer(),le(B.__webglDepthRenderbuffer,R,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(K){n.bindTexture(t.TEXTURE_CUBE_MAP,J.__webglTexture),ye(t.TEXTURE_CUBE_MAP,E);for(let de=0;de<6;de++)if(E.mipmaps&&E.mipmaps.length>0)for(let ve=0;ve<E.mipmaps.length;ve++)ge(B.__webglFramebuffer[de][ve],R,E,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+de,ve);else ge(B.__webglFramebuffer[de],R,E,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+de,0);g(E)&&h(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(we){for(let de=0,ve=ne.length;de<ve;de++){const Xe=ne[de],se=i.get(Xe);n.bindTexture(t.TEXTURE_2D,se.__webglTexture),ye(t.TEXTURE_2D,Xe),ge(B.__webglFramebuffer,R,Xe,t.COLOR_ATTACHMENT0+de,t.TEXTURE_2D,0),g(Xe)&&h(t.TEXTURE_2D)}n.unbindTexture()}else{let de=t.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(de=R.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(de,J.__webglTexture),ye(de,E),E.mipmaps&&E.mipmaps.length>0)for(let ve=0;ve<E.mipmaps.length;ve++)ge(B.__webglFramebuffer[ve],R,E,t.COLOR_ATTACHMENT0,de,ve);else ge(B.__webglFramebuffer,R,E,t.COLOR_ATTACHMENT0,de,0);g(E)&&h(de),n.unbindTexture()}R.depthBuffer&&Ie(R)}function We(R){const E=R.textures;for(let B=0,J=E.length;B<J;B++){const ne=E[B];if(g(ne)){const K=_(R),we=i.get(ne).__webglTexture;n.bindTexture(K,we),h(K),n.unbindTexture()}}}const At=[],F=[];function Dn(R){if(R.samples>0){if(je(R)===!1){const E=R.textures,B=R.width,J=R.height;let ne=t.COLOR_BUFFER_BIT;const K=R.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,we=i.get(R),de=E.length>1;if(de)for(let ve=0;ve<E.length;ve++)n.bindFramebuffer(t.FRAMEBUFFER,we.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ve,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,we.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+ve,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,we.__webglMultisampledFramebuffer),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,we.__webglFramebuffer);for(let ve=0;ve<E.length;ve++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(ne|=t.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(ne|=t.STENCIL_BUFFER_BIT)),de){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,we.__webglColorRenderbuffer[ve]);const Xe=i.get(E[ve]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,Xe,0)}t.blitFramebuffer(0,0,B,J,0,0,B,J,ne,t.NEAREST),l===!0&&(At.length=0,F.length=0,At.push(t.COLOR_ATTACHMENT0+ve),R.depthBuffer&&R.resolveDepthBuffer===!1&&(At.push(K),F.push(K),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,F)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,At))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),de)for(let ve=0;ve<E.length;ve++){n.bindFramebuffer(t.FRAMEBUFFER,we.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ve,t.RENDERBUFFER,we.__webglColorRenderbuffer[ve]);const Xe=i.get(E[ve]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,we.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+ve,t.TEXTURE_2D,Xe,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,we.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){const E=R.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[E])}}}function Ve(R){return Math.min(r.maxSamples,R.samples)}function je(R){const E=i.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function Ce(R){const E=o.render.frame;u.get(R)!==E&&(u.set(R,E),R.update())}function ht(R,E){const B=R.colorSpace,J=R.format,ne=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||B!==Ao&&B!==tr&&(qe.getTransfer(B)===nt?(J!==ti||ne!==Fi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),E}function Ae(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=z,this.resetTextureUnits=j,this.setTexture2D=Z,this.setTexture2DArray=O,this.setTexture3D=$,this.setTextureCube=D,this.rebindTextures=ze,this.setupRenderTarget=_t,this.updateRenderTargetMipmap=We,this.updateMultisampleRenderTarget=Dn,this.setupDepthRenderbuffer=Ie,this.setupFrameBufferTexture=ge,this.useMultisampledRTT=je}function EC(t,e){function n(i,r=tr){let s;const o=qe.getTransfer(r);if(i===Fi)return t.UNSIGNED_BYTE;if(i===up)return t.UNSIGNED_SHORT_4_4_4_4;if(i===dp)return t.UNSIGNED_SHORT_5_5_5_1;if(i===i_)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===t_)return t.BYTE;if(i===n_)return t.SHORT;if(i===Oa)return t.UNSIGNED_SHORT;if(i===cp)return t.INT;if(i===es)return t.UNSIGNED_INT;if(i===fi)return t.FLOAT;if(i===Wa)return t.HALF_FLOAT;if(i===r_)return t.ALPHA;if(i===s_)return t.RGB;if(i===ti)return t.RGBA;if(i===o_)return t.LUMINANCE;if(i===a_)return t.LUMINANCE_ALPHA;if(i===io)return t.DEPTH_COMPONENT;if(i===_o)return t.DEPTH_STENCIL;if(i===hp)return t.RED;if(i===fp)return t.RED_INTEGER;if(i===l_)return t.RG;if(i===pp)return t.RG_INTEGER;if(i===mp)return t.RGBA_INTEGER;if(i===tc||i===nc||i===ic||i===rc)if(o===nt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===tc)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===nc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ic)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===rc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===tc)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===nc)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ic)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===rc)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Dh||i===Ih||i===Nh||i===Uh)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Dh)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Ih)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Nh)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Uh)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===kh||i===Fh||i===Oh)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===kh||i===Fh)return o===nt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Oh)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===zh||i===Bh||i===Hh||i===Vh||i===jh||i===Gh||i===Wh||i===Xh||i===qh||i===$h||i===Yh||i===Kh||i===Zh||i===Qh)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===zh)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Bh)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Hh)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Vh)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===jh)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Gh)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Wh)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Xh)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===qh)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===$h)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Yh)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Kh)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Zh)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Qh)return o===nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===sc||i===Jh||i===ef)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===sc)return o===nt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Jh)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===ef)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===c_||i===tf||i===nf||i===rf)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===sc)return s.COMPRESSED_RED_RGTC1_EXT;if(i===tf)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===nf)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===rf)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===xo?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}class wC extends Fn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class pi extends kt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const TC={type:"move"};class md{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new pi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new pi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new pi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const v of e.hand.values()){const g=n.getJointPose(v,i),h=this._getHandJoint(c,v);g!==null&&(h.matrix.fromArray(g.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=g.radius),h.visible=g!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=u.position.distanceTo(d.position),p=.02,x=.005;c.inputState.pinching&&f>p+x?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=p-x&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(TC)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new pi;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const bC=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,AC=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class CC{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n,i){if(this.texture===null){const r=new Jt,s=e.properties.get(r);s.__webglTexture=n.texture,(n.depthNear!=i.depthNear||n.depthFar!=i.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new Mr({vertexShader:bC,fragmentShader:AC,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new lt(new uu(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class RC extends as{constructor(e,n){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,d=null,f=null,p=null,x=null;const v=new CC,g=n.getContextAttributes();let h=null,_=null;const y=[],S=[],C=new be;let A=null;const b=new Fn;b.viewport=new Tt;const P=new Fn;P.viewport=new Tt;const T=[b,P],M=new wC;let L=null,j=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let re=y[X];return re===void 0&&(re=new md,y[X]=re),re.getTargetRaySpace()},this.getControllerGrip=function(X){let re=y[X];return re===void 0&&(re=new md,y[X]=re),re.getGripSpace()},this.getHand=function(X){let re=y[X];return re===void 0&&(re=new md,y[X]=re),re.getHandSpace()};function z(X){const re=S.indexOf(X.inputSource);if(re===-1)return;const ge=y[re];ge!==void 0&&(ge.update(X.inputSource,X.frame,c||o),ge.dispatchEvent({type:X.type,data:X.inputSource}))}function q(){r.removeEventListener("select",z),r.removeEventListener("selectstart",z),r.removeEventListener("selectend",z),r.removeEventListener("squeeze",z),r.removeEventListener("squeezestart",z),r.removeEventListener("squeezeend",z),r.removeEventListener("end",q),r.removeEventListener("inputsourceschange",Z);for(let X=0;X<y.length;X++){const re=S[X];re!==null&&(S[X]=null,y[X].disconnect(re))}L=null,j=null,v.reset(),e.setRenderTarget(h),p=null,f=null,d=null,r=null,_=null,Ye.stop(),i.isPresenting=!1,e.setPixelRatio(A),e.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){s=X,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){a=X,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(X){c=X},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return d},this.getFrame=function(){return x},this.getSession=function(){return r},this.setSession=async function(X){if(r=X,r!==null){if(h=e.getRenderTarget(),r.addEventListener("select",z),r.addEventListener("selectstart",z),r.addEventListener("selectend",z),r.addEventListener("squeeze",z),r.addEventListener("squeezestart",z),r.addEventListener("squeezeend",z),r.addEventListener("end",q),r.addEventListener("inputsourceschange",Z),g.xrCompatible!==!0&&await n.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(C),r.renderState.layers===void 0){const re={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,n,re),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),_=new ts(p.framebufferWidth,p.framebufferHeight,{format:ti,type:Fi,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let re=null,ge=null,le=null;g.depth&&(le=g.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,re=g.stencil?_o:io,ge=g.stencil?xo:es);const Pe={colorFormat:n.RGBA8,depthFormat:le,scaleFactor:s};d=new XRWebGLBinding(r,n),f=d.createProjectionLayer(Pe),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),_=new ts(f.textureWidth,f.textureHeight,{format:ti,type:Fi,depthTexture:new w_(f.textureWidth,f.textureHeight,ge,void 0,void 0,void 0,void 0,void 0,void 0,re),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),Ye.setContext(r),Ye.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function Z(X){for(let re=0;re<X.removed.length;re++){const ge=X.removed[re],le=S.indexOf(ge);le>=0&&(S[le]=null,y[le].disconnect(ge))}for(let re=0;re<X.added.length;re++){const ge=X.added[re];let le=S.indexOf(ge);if(le===-1){for(let Ie=0;Ie<y.length;Ie++)if(Ie>=S.length){S.push(ge),le=Ie;break}else if(S[Ie]===null){S[Ie]=ge,le=Ie;break}if(le===-1)break}const Pe=y[le];Pe&&Pe.connect(ge)}}const O=new N,$=new N;function D(X,re,ge){O.setFromMatrixPosition(re.matrixWorld),$.setFromMatrixPosition(ge.matrixWorld);const le=O.distanceTo($),Pe=re.projectionMatrix.elements,Ie=ge.projectionMatrix.elements,ze=Pe[14]/(Pe[10]-1),_t=Pe[14]/(Pe[10]+1),We=(Pe[9]+1)/Pe[5],At=(Pe[9]-1)/Pe[5],F=(Pe[8]-1)/Pe[0],Dn=(Ie[8]+1)/Ie[0],Ve=ze*F,je=ze*Dn,Ce=le/(-F+Dn),ht=Ce*-F;if(re.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(ht),X.translateZ(Ce),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),Pe[10]===-1)X.projectionMatrix.copy(re.projectionMatrix),X.projectionMatrixInverse.copy(re.projectionMatrixInverse);else{const Ae=ze+Ce,R=_t+Ce,E=Ve-ht,B=je+(le-ht),J=We*_t/R*Ae,ne=At*_t/R*Ae;X.projectionMatrix.makePerspective(E,B,J,ne,Ae,R),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function W(X,re){re===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(re.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(r===null)return;let re=X.near,ge=X.far;v.texture!==null&&(v.depthNear>0&&(re=v.depthNear),v.depthFar>0&&(ge=v.depthFar)),M.near=P.near=b.near=re,M.far=P.far=b.far=ge,(L!==M.near||j!==M.far)&&(r.updateRenderState({depthNear:M.near,depthFar:M.far}),L=M.near,j=M.far),b.layers.mask=X.layers.mask|2,P.layers.mask=X.layers.mask|4,M.layers.mask=b.layers.mask|P.layers.mask;const le=X.parent,Pe=M.cameras;W(M,le);for(let Ie=0;Ie<Pe.length;Ie++)W(Pe[Ie],le);Pe.length===2?D(M,b,P):M.projectionMatrix.copy(b.projectionMatrix),Q(X,M,le)};function Q(X,re,ge){ge===null?X.matrix.copy(re.matrixWorld):(X.matrix.copy(ge.matrixWorld),X.matrix.invert(),X.matrix.multiply(re.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(re.projectionMatrix),X.projectionMatrixInverse.copy(re.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=of*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(X){l=X,f!==null&&(f.fixedFoveation=X),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=X)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(M)};let ae=null;function ye(X,re){if(u=re.getViewerPose(c||o),x=re,u!==null){const ge=u.views;p!==null&&(e.setRenderTargetFramebuffer(_,p.framebuffer),e.setRenderTarget(_));let le=!1;ge.length!==M.cameras.length&&(M.cameras.length=0,le=!0);for(let Ie=0;Ie<ge.length;Ie++){const ze=ge[Ie];let _t=null;if(p!==null)_t=p.getViewport(ze);else{const At=d.getViewSubImage(f,ze);_t=At.viewport,Ie===0&&(e.setRenderTargetTextures(_,At.colorTexture,f.ignoreDepthValues?void 0:At.depthStencilTexture),e.setRenderTarget(_))}let We=T[Ie];We===void 0&&(We=new Fn,We.layers.enable(Ie),We.viewport=new Tt,T[Ie]=We),We.matrix.fromArray(ze.transform.matrix),We.matrix.decompose(We.position,We.quaternion,We.scale),We.projectionMatrix.fromArray(ze.projectionMatrix),We.projectionMatrixInverse.copy(We.projectionMatrix).invert(),We.viewport.set(_t.x,_t.y,_t.width,_t.height),Ie===0&&(M.matrix.copy(We.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),le===!0&&M.cameras.push(We)}const Pe=r.enabledFeatures;if(Pe&&Pe.includes("depth-sensing")){const Ie=d.getDepthInformation(ge[0]);Ie&&Ie.isValid&&Ie.texture&&v.init(e,Ie,r.renderState)}}for(let ge=0;ge<y.length;ge++){const le=S[ge],Pe=y[ge];le!==null&&Pe!==void 0&&Pe.update(le,re,c||o)}ae&&ae(X,re),re.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:re}),x=null}const Ye=new M_;Ye.setAnimationLoop(ye),this.setAnimationLoop=function(X){ae=X},this.dispose=function(){}}}const Nr=new vi,PC=new st;function LC(t,e){function n(g,h){g.matrixAutoUpdate===!0&&g.updateMatrix(),h.value.copy(g.matrix)}function i(g,h){h.color.getRGB(g.fogColor.value,__(t)),h.isFog?(g.fogNear.value=h.near,g.fogFar.value=h.far):h.isFogExp2&&(g.fogDensity.value=h.density)}function r(g,h,_,y,S){h.isMeshBasicMaterial||h.isMeshLambertMaterial?s(g,h):h.isMeshToonMaterial?(s(g,h),d(g,h)):h.isMeshPhongMaterial?(s(g,h),u(g,h)):h.isMeshStandardMaterial?(s(g,h),f(g,h),h.isMeshPhysicalMaterial&&p(g,h,S)):h.isMeshMatcapMaterial?(s(g,h),x(g,h)):h.isMeshDepthMaterial?s(g,h):h.isMeshDistanceMaterial?(s(g,h),v(g,h)):h.isMeshNormalMaterial?s(g,h):h.isLineBasicMaterial?(o(g,h),h.isLineDashedMaterial&&a(g,h)):h.isPointsMaterial?l(g,h,_,y):h.isSpriteMaterial?c(g,h):h.isShadowMaterial?(g.color.value.copy(h.color),g.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function s(g,h){g.opacity.value=h.opacity,h.color&&g.diffuse.value.copy(h.color),h.emissive&&g.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(g.map.value=h.map,n(h.map,g.mapTransform)),h.alphaMap&&(g.alphaMap.value=h.alphaMap,n(h.alphaMap,g.alphaMapTransform)),h.bumpMap&&(g.bumpMap.value=h.bumpMap,n(h.bumpMap,g.bumpMapTransform),g.bumpScale.value=h.bumpScale,h.side===vn&&(g.bumpScale.value*=-1)),h.normalMap&&(g.normalMap.value=h.normalMap,n(h.normalMap,g.normalMapTransform),g.normalScale.value.copy(h.normalScale),h.side===vn&&g.normalScale.value.negate()),h.displacementMap&&(g.displacementMap.value=h.displacementMap,n(h.displacementMap,g.displacementMapTransform),g.displacementScale.value=h.displacementScale,g.displacementBias.value=h.displacementBias),h.emissiveMap&&(g.emissiveMap.value=h.emissiveMap,n(h.emissiveMap,g.emissiveMapTransform)),h.specularMap&&(g.specularMap.value=h.specularMap,n(h.specularMap,g.specularMapTransform)),h.alphaTest>0&&(g.alphaTest.value=h.alphaTest);const _=e.get(h),y=_.envMap,S=_.envMapRotation;y&&(g.envMap.value=y,Nr.copy(S),Nr.x*=-1,Nr.y*=-1,Nr.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Nr.y*=-1,Nr.z*=-1),g.envMapRotation.value.setFromMatrix4(PC.makeRotationFromEuler(Nr)),g.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=h.reflectivity,g.ior.value=h.ior,g.refractionRatio.value=h.refractionRatio),h.lightMap&&(g.lightMap.value=h.lightMap,g.lightMapIntensity.value=h.lightMapIntensity,n(h.lightMap,g.lightMapTransform)),h.aoMap&&(g.aoMap.value=h.aoMap,g.aoMapIntensity.value=h.aoMapIntensity,n(h.aoMap,g.aoMapTransform))}function o(g,h){g.diffuse.value.copy(h.color),g.opacity.value=h.opacity,h.map&&(g.map.value=h.map,n(h.map,g.mapTransform))}function a(g,h){g.dashSize.value=h.dashSize,g.totalSize.value=h.dashSize+h.gapSize,g.scale.value=h.scale}function l(g,h,_,y){g.diffuse.value.copy(h.color),g.opacity.value=h.opacity,g.size.value=h.size*_,g.scale.value=y*.5,h.map&&(g.map.value=h.map,n(h.map,g.uvTransform)),h.alphaMap&&(g.alphaMap.value=h.alphaMap,n(h.alphaMap,g.alphaMapTransform)),h.alphaTest>0&&(g.alphaTest.value=h.alphaTest)}function c(g,h){g.diffuse.value.copy(h.color),g.opacity.value=h.opacity,g.rotation.value=h.rotation,h.map&&(g.map.value=h.map,n(h.map,g.mapTransform)),h.alphaMap&&(g.alphaMap.value=h.alphaMap,n(h.alphaMap,g.alphaMapTransform)),h.alphaTest>0&&(g.alphaTest.value=h.alphaTest)}function u(g,h){g.specular.value.copy(h.specular),g.shininess.value=Math.max(h.shininess,1e-4)}function d(g,h){h.gradientMap&&(g.gradientMap.value=h.gradientMap)}function f(g,h){g.metalness.value=h.metalness,h.metalnessMap&&(g.metalnessMap.value=h.metalnessMap,n(h.metalnessMap,g.metalnessMapTransform)),g.roughness.value=h.roughness,h.roughnessMap&&(g.roughnessMap.value=h.roughnessMap,n(h.roughnessMap,g.roughnessMapTransform)),h.envMap&&(g.envMapIntensity.value=h.envMapIntensity)}function p(g,h,_){g.ior.value=h.ior,h.sheen>0&&(g.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),g.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(g.sheenColorMap.value=h.sheenColorMap,n(h.sheenColorMap,g.sheenColorMapTransform)),h.sheenRoughnessMap&&(g.sheenRoughnessMap.value=h.sheenRoughnessMap,n(h.sheenRoughnessMap,g.sheenRoughnessMapTransform))),h.clearcoat>0&&(g.clearcoat.value=h.clearcoat,g.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(g.clearcoatMap.value=h.clearcoatMap,n(h.clearcoatMap,g.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,n(h.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(g.clearcoatNormalMap.value=h.clearcoatNormalMap,n(h.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===vn&&g.clearcoatNormalScale.value.negate())),h.dispersion>0&&(g.dispersion.value=h.dispersion),h.iridescence>0&&(g.iridescence.value=h.iridescence,g.iridescenceIOR.value=h.iridescenceIOR,g.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(g.iridescenceMap.value=h.iridescenceMap,n(h.iridescenceMap,g.iridescenceMapTransform)),h.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=h.iridescenceThicknessMap,n(h.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),h.transmission>0&&(g.transmission.value=h.transmission,g.transmissionSamplerMap.value=_.texture,g.transmissionSamplerSize.value.set(_.width,_.height),h.transmissionMap&&(g.transmissionMap.value=h.transmissionMap,n(h.transmissionMap,g.transmissionMapTransform)),g.thickness.value=h.thickness,h.thicknessMap&&(g.thicknessMap.value=h.thicknessMap,n(h.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=h.attenuationDistance,g.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(g.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(g.anisotropyMap.value=h.anisotropyMap,n(h.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=h.specularIntensity,g.specularColor.value.copy(h.specularColor),h.specularColorMap&&(g.specularColorMap.value=h.specularColorMap,n(h.specularColorMap,g.specularColorMapTransform)),h.specularIntensityMap&&(g.specularIntensityMap.value=h.specularIntensityMap,n(h.specularIntensityMap,g.specularIntensityMapTransform))}function x(g,h){h.matcap&&(g.matcap.value=h.matcap)}function v(g,h){const _=e.get(h).light;g.referencePosition.value.setFromMatrixPosition(_.matrixWorld),g.nearDistance.value=_.shadow.camera.near,g.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function DC(t,e,n,i){let r={},s={},o=[];const a=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,y){const S=y.program;i.uniformBlockBinding(_,S)}function c(_,y){let S=r[_.id];S===void 0&&(x(_),S=u(_),r[_.id]=S,_.addEventListener("dispose",g));const C=y.program;i.updateUBOMapping(_,C);const A=e.render.frame;s[_.id]!==A&&(f(_),s[_.id]=A)}function u(_){const y=d();_.__bindingPointIndex=y;const S=t.createBuffer(),C=_.__size,A=_.usage;return t.bindBuffer(t.UNIFORM_BUFFER,S),t.bufferData(t.UNIFORM_BUFFER,C,A),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,y,S),S}function d(){for(let _=0;_<a;_++)if(o.indexOf(_)===-1)return o.push(_),_;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(_){const y=r[_.id],S=_.uniforms,C=_.__cache;t.bindBuffer(t.UNIFORM_BUFFER,y);for(let A=0,b=S.length;A<b;A++){const P=Array.isArray(S[A])?S[A]:[S[A]];for(let T=0,M=P.length;T<M;T++){const L=P[T];if(p(L,A,T,C)===!0){const j=L.__offset,z=Array.isArray(L.value)?L.value:[L.value];let q=0;for(let Z=0;Z<z.length;Z++){const O=z[Z],$=v(O);typeof O=="number"||typeof O=="boolean"?(L.__data[0]=O,t.bufferSubData(t.UNIFORM_BUFFER,j+q,L.__data)):O.isMatrix3?(L.__data[0]=O.elements[0],L.__data[1]=O.elements[1],L.__data[2]=O.elements[2],L.__data[3]=0,L.__data[4]=O.elements[3],L.__data[5]=O.elements[4],L.__data[6]=O.elements[5],L.__data[7]=0,L.__data[8]=O.elements[6],L.__data[9]=O.elements[7],L.__data[10]=O.elements[8],L.__data[11]=0):(O.toArray(L.__data,q),q+=$.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,j,L.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function p(_,y,S,C){const A=_.value,b=y+"_"+S;if(C[b]===void 0)return typeof A=="number"||typeof A=="boolean"?C[b]=A:C[b]=A.clone(),!0;{const P=C[b];if(typeof A=="number"||typeof A=="boolean"){if(P!==A)return C[b]=A,!0}else if(P.equals(A)===!1)return P.copy(A),!0}return!1}function x(_){const y=_.uniforms;let S=0;const C=16;for(let b=0,P=y.length;b<P;b++){const T=Array.isArray(y[b])?y[b]:[y[b]];for(let M=0,L=T.length;M<L;M++){const j=T[M],z=Array.isArray(j.value)?j.value:[j.value];for(let q=0,Z=z.length;q<Z;q++){const O=z[q],$=v(O),D=S%C,W=D%$.boundary,Q=D+W;S+=W,Q!==0&&C-Q<$.storage&&(S+=C-Q),j.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),j.__offset=S,S+=$.storage}}}const A=S%C;return A>0&&(S+=C-A),_.__size=S,_.__cache={},this}function v(_){const y={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(y.boundary=4,y.storage=4):_.isVector2?(y.boundary=8,y.storage=8):_.isVector3||_.isColor?(y.boundary=16,y.storage=12):_.isVector4?(y.boundary=16,y.storage=16):_.isMatrix3?(y.boundary=48,y.storage=48):_.isMatrix4?(y.boundary=64,y.storage=64):_.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",_),y}function g(_){const y=_.target;y.removeEventListener("dispose",g);const S=o.indexOf(y.__bindingPointIndex);o.splice(S,1),t.deleteBuffer(r[y.id]),delete r[y.id],delete s[y.id]}function h(){for(const _ in r)t.deleteBuffer(r[_]);o=[],r={},s={}}return{bind:l,update:c,dispose:h}}class IC{constructor(e={}){const{canvas:n=S1(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=o;const x=new Uint32Array(4),v=new Int32Array(4);let g=null,h=null;const _=[],y=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=wn,this.toneMapping=vr,this.toneMappingExposure=1;const S=this;let C=!1,A=0,b=0,P=null,T=-1,M=null;const L=new Tt,j=new Tt;let z=null;const q=new Be(0);let Z=0,O=n.width,$=n.height,D=1,W=null,Q=null;const ae=new Tt(0,0,O,$),ye=new Tt(0,0,O,$);let Ye=!1;const X=new vp;let re=!1,ge=!1;const le=new st,Pe=new st,Ie=new N,ze=new Tt,_t={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let We=!1;function At(){return P===null?D:1}let F=i;function Dn(w,U){return n.getContext(w,U)}try{const w={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${lp}`),n.addEventListener("webglcontextlost",ee,!1),n.addEventListener("webglcontextrestored",pe,!1),n.addEventListener("webglcontextcreationerror",he,!1),F===null){const U="webgl2";if(F=Dn(U,w),F===null)throw Dn(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let Ve,je,Ce,ht,Ae,R,E,B,J,ne,K,we,de,ve,Xe,se,xe,Re,Le,_e,Ge,Fe,ct,I;function ue(){Ve=new Ob(F),Ve.init(),Fe=new EC(F,Ve),je=new Db(F,Ve,e,Fe),Ce=new yC(F,Ve),je.reverseDepthBuffer&&f&&Ce.buffers.depth.setReversed(!0),ht=new Hb(F),Ae=new sC,R=new MC(F,Ve,Ce,Ae,je,Fe,ht),E=new Nb(S),B=new Fb(S),J=new $1(F),ct=new Pb(F,J),ne=new zb(F,J,ht,ct),K=new jb(F,ne,J,ht),Le=new Vb(F,je,R),se=new Ib(Ae),we=new rC(S,E,B,Ve,je,ct,se),de=new LC(S,Ae),ve=new aC,Xe=new fC(Ve),Re=new Rb(S,E,B,Ce,K,p,l),xe=new xC(S,K,je),I=new DC(F,ht,je,Ce),_e=new Lb(F,Ve,ht),Ge=new Bb(F,Ve,ht),ht.programs=we.programs,S.capabilities=je,S.extensions=Ve,S.properties=Ae,S.renderLists=ve,S.shadowMap=xe,S.state=Ce,S.info=ht}ue();const G=new RC(S,F);this.xr=G,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const w=Ve.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=Ve.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return D},this.setPixelRatio=function(w){w!==void 0&&(D=w,this.setSize(O,$,!1))},this.getSize=function(w){return w.set(O,$)},this.setSize=function(w,U,H=!0){if(G.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}O=w,$=U,n.width=Math.floor(w*D),n.height=Math.floor(U*D),H===!0&&(n.style.width=w+"px",n.style.height=U+"px"),this.setViewport(0,0,w,U)},this.getDrawingBufferSize=function(w){return w.set(O*D,$*D).floor()},this.setDrawingBufferSize=function(w,U,H){O=w,$=U,D=H,n.width=Math.floor(w*H),n.height=Math.floor(U*H),this.setViewport(0,0,w,U)},this.getCurrentViewport=function(w){return w.copy(L)},this.getViewport=function(w){return w.copy(ae)},this.setViewport=function(w,U,H,V){w.isVector4?ae.set(w.x,w.y,w.z,w.w):ae.set(w,U,H,V),Ce.viewport(L.copy(ae).multiplyScalar(D).round())},this.getScissor=function(w){return w.copy(ye)},this.setScissor=function(w,U,H,V){w.isVector4?ye.set(w.x,w.y,w.z,w.w):ye.set(w,U,H,V),Ce.scissor(j.copy(ye).multiplyScalar(D).round())},this.getScissorTest=function(){return Ye},this.setScissorTest=function(w){Ce.setScissorTest(Ye=w)},this.setOpaqueSort=function(w){W=w},this.setTransparentSort=function(w){Q=w},this.getClearColor=function(w){return w.copy(Re.getClearColor())},this.setClearColor=function(){Re.setClearColor.apply(Re,arguments)},this.getClearAlpha=function(){return Re.getClearAlpha()},this.setClearAlpha=function(){Re.setClearAlpha.apply(Re,arguments)},this.clear=function(w=!0,U=!0,H=!0){let V=0;if(w){let k=!1;if(P!==null){const oe=P.texture.format;k=oe===mp||oe===pp||oe===fp}if(k){const oe=P.texture.type,fe=oe===Fi||oe===es||oe===Oa||oe===xo||oe===up||oe===dp,Se=Re.getClearColor(),Me=Re.getClearAlpha(),De=Se.r,Ue=Se.g,Ee=Se.b;fe?(x[0]=De,x[1]=Ue,x[2]=Ee,x[3]=Me,F.clearBufferuiv(F.COLOR,0,x)):(v[0]=De,v[1]=Ue,v[2]=Ee,v[3]=Me,F.clearBufferiv(F.COLOR,0,v))}else V|=F.COLOR_BUFFER_BIT}U&&(V|=F.DEPTH_BUFFER_BIT),H&&(V|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",ee,!1),n.removeEventListener("webglcontextrestored",pe,!1),n.removeEventListener("webglcontextcreationerror",he,!1),ve.dispose(),Xe.dispose(),Ae.dispose(),E.dispose(),B.dispose(),K.dispose(),ct.dispose(),I.dispose(),we.dispose(),G.dispose(),G.removeEventListener("sessionstart",Dp),G.removeEventListener("sessionend",Ip),Cr.stop()};function ee(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function pe(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const w=ht.autoReset,U=xe.enabled,H=xe.autoUpdate,V=xe.needsUpdate,k=xe.type;ue(),ht.autoReset=w,xe.enabled=U,xe.autoUpdate=H,xe.needsUpdate=V,xe.type=k}function he(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function Ne(w){const U=w.target;U.removeEventListener("dispose",Ne),Et(U)}function Et(w){qt(w),Ae.remove(w)}function qt(w){const U=Ae.get(w).programs;U!==void 0&&(U.forEach(function(H){we.releaseProgram(H)}),w.isShaderMaterial&&we.releaseShaderCache(w))}this.renderBufferDirect=function(w,U,H,V,k,oe){U===null&&(U=_t);const fe=k.isMesh&&k.matrixWorld.determinant()<0,Se=q_(w,U,H,V,k);Ce.setMaterial(V,fe);let Me=H.index,De=1;if(V.wireframe===!0){if(Me=ne.getWireframeAttribute(H),Me===void 0)return;De=2}const Ue=H.drawRange,Ee=H.attributes.position;let Ke=Ue.start*De,ut=(Ue.start+Ue.count)*De;oe!==null&&(Ke=Math.max(Ke,oe.start*De),ut=Math.min(ut,(oe.start+oe.count)*De)),Me!==null?(Ke=Math.max(Ke,0),ut=Math.min(ut,Me.count)):Ee!=null&&(Ke=Math.max(Ke,0),ut=Math.min(ut,Ee.count));const ft=ut-Ke;if(ft<0||ft===1/0)return;ct.setup(k,V,Se,H,Me);let un,Ze=_e;if(Me!==null&&(un=J.get(Me),Ze=Ge,Ze.setIndex(un)),k.isMesh)V.wireframe===!0?(Ce.setLineWidth(V.wireframeLinewidth*At()),Ze.setMode(F.LINES)):Ze.setMode(F.TRIANGLES);else if(k.isLine){let Te=V.linewidth;Te===void 0&&(Te=1),Ce.setLineWidth(Te*At()),k.isLineSegments?Ze.setMode(F.LINES):k.isLineLoop?Ze.setMode(F.LINE_LOOP):Ze.setMode(F.LINE_STRIP)}else k.isPoints?Ze.setMode(F.POINTS):k.isSprite&&Ze.setMode(F.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)Ze.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(Ve.get("WEBGL_multi_draw"))Ze.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const Te=k._multiDrawStarts,_i=k._multiDrawCounts,Qe=k._multiDrawCount,qn=Me?J.get(Me).bytesPerElement:1,ds=Ae.get(V).currentProgram.getUniforms();for(let _n=0;_n<Qe;_n++)ds.setValue(F,"_gl_DrawID",_n),Ze.render(Te[_n]/qn,_i[_n])}else if(k.isInstancedMesh)Ze.renderInstances(Ke,ft,k.count);else if(H.isInstancedBufferGeometry){const Te=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,_i=Math.min(H.instanceCount,Te);Ze.renderInstances(Ke,ft,_i)}else Ze.render(Ke,ft)};function Je(w,U,H){w.transparent===!0&&w.side===ui&&w.forceSinglePass===!1?(w.side=vn,w.needsUpdate=!0,Ya(w,U,H),w.side=Sr,w.needsUpdate=!0,Ya(w,U,H),w.side=ui):Ya(w,U,H)}this.compile=function(w,U,H=null){H===null&&(H=w),h=Xe.get(H),h.init(U),y.push(h),H.traverseVisible(function(k){k.isLight&&k.layers.test(U.layers)&&(h.pushLight(k),k.castShadow&&h.pushShadow(k))}),w!==H&&w.traverseVisible(function(k){k.isLight&&k.layers.test(U.layers)&&(h.pushLight(k),k.castShadow&&h.pushShadow(k))}),h.setupLights();const V=new Set;return w.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;const oe=k.material;if(oe)if(Array.isArray(oe))for(let fe=0;fe<oe.length;fe++){const Se=oe[fe];Je(Se,H,k),V.add(Se)}else Je(oe,H,k),V.add(oe)}),y.pop(),h=null,V},this.compileAsync=function(w,U,H=null){const V=this.compile(w,U,H);return new Promise(k=>{function oe(){if(V.forEach(function(fe){Ae.get(fe).currentProgram.isReady()&&V.delete(fe)}),V.size===0){k(w);return}setTimeout(oe,10)}Ve.get("KHR_parallel_shader_compile")!==null?oe():setTimeout(oe,10)})};let Xn=null;function xi(w){Xn&&Xn(w)}function Dp(){Cr.stop()}function Ip(){Cr.start()}const Cr=new M_;Cr.setAnimationLoop(xi),typeof self<"u"&&Cr.setContext(self),this.setAnimationLoop=function(w){Xn=w,G.setAnimationLoop(w),w===null?Cr.stop():Cr.start()},G.addEventListener("sessionstart",Dp),G.addEventListener("sessionend",Ip),this.render=function(w,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),G.enabled===!0&&G.isPresenting===!0&&(G.cameraAutoUpdate===!0&&G.updateCamera(U),U=G.getCamera()),w.isScene===!0&&w.onBeforeRender(S,w,U,P),h=Xe.get(w,y.length),h.init(U),y.push(h),Pe.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),X.setFromProjectionMatrix(Pe),ge=this.localClippingEnabled,re=se.init(this.clippingPlanes,ge),g=ve.get(w,_.length),g.init(),_.push(g),G.enabled===!0&&G.isPresenting===!0){const oe=S.xr.getDepthSensingMesh();oe!==null&&fu(oe,U,-1/0,S.sortObjects)}fu(w,U,0,S.sortObjects),g.finish(),S.sortObjects===!0&&g.sort(W,Q),We=G.enabled===!1||G.isPresenting===!1||G.hasDepthSensing()===!1,We&&Re.addToRenderList(g,w),this.info.render.frame++,re===!0&&se.beginShadows();const H=h.state.shadowsArray;xe.render(H,w,U),re===!0&&se.endShadows(),this.info.autoReset===!0&&this.info.reset();const V=g.opaque,k=g.transmissive;if(h.setupLights(),U.isArrayCamera){const oe=U.cameras;if(k.length>0)for(let fe=0,Se=oe.length;fe<Se;fe++){const Me=oe[fe];Up(V,k,w,Me)}We&&Re.render(w);for(let fe=0,Se=oe.length;fe<Se;fe++){const Me=oe[fe];Np(g,w,Me,Me.viewport)}}else k.length>0&&Up(V,k,w,U),We&&Re.render(w),Np(g,w,U);P!==null&&(R.updateMultisampleRenderTarget(P),R.updateRenderTargetMipmap(P)),w.isScene===!0&&w.onAfterRender(S,w,U),ct.resetDefaultState(),T=-1,M=null,y.pop(),y.length>0?(h=y[y.length-1],re===!0&&se.setGlobalState(S.clippingPlanes,h.state.camera)):h=null,_.pop(),_.length>0?g=_[_.length-1]:g=null};function fu(w,U,H,V){if(w.visible===!1)return;if(w.layers.test(U.layers)){if(w.isGroup)H=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(U);else if(w.isLight)h.pushLight(w),w.castShadow&&h.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||X.intersectsSprite(w)){V&&ze.setFromMatrixPosition(w.matrixWorld).applyMatrix4(Pe);const fe=K.update(w),Se=w.material;Se.visible&&g.push(w,fe,Se,H,ze.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||X.intersectsObject(w))){const fe=K.update(w),Se=w.material;if(V&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),ze.copy(w.boundingSphere.center)):(fe.boundingSphere===null&&fe.computeBoundingSphere(),ze.copy(fe.boundingSphere.center)),ze.applyMatrix4(w.matrixWorld).applyMatrix4(Pe)),Array.isArray(Se)){const Me=fe.groups;for(let De=0,Ue=Me.length;De<Ue;De++){const Ee=Me[De],Ke=Se[Ee.materialIndex];Ke&&Ke.visible&&g.push(w,fe,Ke,H,ze.z,Ee)}}else Se.visible&&g.push(w,fe,Se,H,ze.z,null)}}const oe=w.children;for(let fe=0,Se=oe.length;fe<Se;fe++)fu(oe[fe],U,H,V)}function Np(w,U,H,V){const k=w.opaque,oe=w.transmissive,fe=w.transparent;h.setupLightsView(H),re===!0&&se.setGlobalState(S.clippingPlanes,H),V&&Ce.viewport(L.copy(V)),k.length>0&&$a(k,U,H),oe.length>0&&$a(oe,U,H),fe.length>0&&$a(fe,U,H),Ce.buffers.depth.setTest(!0),Ce.buffers.depth.setMask(!0),Ce.buffers.color.setMask(!0),Ce.setPolygonOffset(!1)}function Up(w,U,H,V){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;h.state.transmissionRenderTarget[V.id]===void 0&&(h.state.transmissionRenderTarget[V.id]=new ts(1,1,{generateMipmaps:!0,type:Ve.has("EXT_color_buffer_half_float")||Ve.has("EXT_color_buffer_float")?Wa:Fi,minFilter:Xr,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:qe.workingColorSpace}));const oe=h.state.transmissionRenderTarget[V.id],fe=V.viewport||L;oe.setSize(fe.z,fe.w);const Se=S.getRenderTarget();S.setRenderTarget(oe),S.getClearColor(q),Z=S.getClearAlpha(),Z<1&&S.setClearColor(16777215,.5),S.clear(),We&&Re.render(H);const Me=S.toneMapping;S.toneMapping=vr;const De=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),h.setupLightsView(V),re===!0&&se.setGlobalState(S.clippingPlanes,V),$a(w,H,V),R.updateMultisampleRenderTarget(oe),R.updateRenderTargetMipmap(oe),Ve.has("WEBGL_multisampled_render_to_texture")===!1){let Ue=!1;for(let Ee=0,Ke=U.length;Ee<Ke;Ee++){const ut=U[Ee],ft=ut.object,un=ut.geometry,Ze=ut.material,Te=ut.group;if(Ze.side===ui&&ft.layers.test(V.layers)){const _i=Ze.side;Ze.side=vn,Ze.needsUpdate=!0,kp(ft,H,V,un,Ze,Te),Ze.side=_i,Ze.needsUpdate=!0,Ue=!0}}Ue===!0&&(R.updateMultisampleRenderTarget(oe),R.updateRenderTargetMipmap(oe))}S.setRenderTarget(Se),S.setClearColor(q,Z),De!==void 0&&(V.viewport=De),S.toneMapping=Me}function $a(w,U,H){const V=U.isScene===!0?U.overrideMaterial:null;for(let k=0,oe=w.length;k<oe;k++){const fe=w[k],Se=fe.object,Me=fe.geometry,De=V===null?fe.material:V,Ue=fe.group;Se.layers.test(H.layers)&&kp(Se,U,H,Me,De,Ue)}}function kp(w,U,H,V,k,oe){w.onBeforeRender(S,U,H,V,k,oe),w.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),k.onBeforeRender(S,U,H,V,w,oe),k.transparent===!0&&k.side===ui&&k.forceSinglePass===!1?(k.side=vn,k.needsUpdate=!0,S.renderBufferDirect(H,U,V,k,w,oe),k.side=Sr,k.needsUpdate=!0,S.renderBufferDirect(H,U,V,k,w,oe),k.side=ui):S.renderBufferDirect(H,U,V,k,w,oe),w.onAfterRender(S,U,H,V,k,oe)}function Ya(w,U,H){U.isScene!==!0&&(U=_t);const V=Ae.get(w),k=h.state.lights,oe=h.state.shadowsArray,fe=k.state.version,Se=we.getParameters(w,k.state,oe,U,H),Me=we.getProgramCacheKey(Se);let De=V.programs;V.environment=w.isMeshStandardMaterial?U.environment:null,V.fog=U.fog,V.envMap=(w.isMeshStandardMaterial?B:E).get(w.envMap||V.environment),V.envMapRotation=V.environment!==null&&w.envMap===null?U.environmentRotation:w.envMapRotation,De===void 0&&(w.addEventListener("dispose",Ne),De=new Map,V.programs=De);let Ue=De.get(Me);if(Ue!==void 0){if(V.currentProgram===Ue&&V.lightsStateVersion===fe)return Op(w,Se),Ue}else Se.uniforms=we.getUniforms(w),w.onBeforeCompile(Se,S),Ue=we.acquireProgram(Se,Me),De.set(Me,Ue),V.uniforms=Se.uniforms;const Ee=V.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Ee.clippingPlanes=se.uniform),Op(w,Se),V.needsLights=Y_(w),V.lightsStateVersion=fe,V.needsLights&&(Ee.ambientLightColor.value=k.state.ambient,Ee.lightProbe.value=k.state.probe,Ee.directionalLights.value=k.state.directional,Ee.directionalLightShadows.value=k.state.directionalShadow,Ee.spotLights.value=k.state.spot,Ee.spotLightShadows.value=k.state.spotShadow,Ee.rectAreaLights.value=k.state.rectArea,Ee.ltc_1.value=k.state.rectAreaLTC1,Ee.ltc_2.value=k.state.rectAreaLTC2,Ee.pointLights.value=k.state.point,Ee.pointLightShadows.value=k.state.pointShadow,Ee.hemisphereLights.value=k.state.hemi,Ee.directionalShadowMap.value=k.state.directionalShadowMap,Ee.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Ee.spotShadowMap.value=k.state.spotShadowMap,Ee.spotLightMatrix.value=k.state.spotLightMatrix,Ee.spotLightMap.value=k.state.spotLightMap,Ee.pointShadowMap.value=k.state.pointShadowMap,Ee.pointShadowMatrix.value=k.state.pointShadowMatrix),V.currentProgram=Ue,V.uniformsList=null,Ue}function Fp(w){if(w.uniformsList===null){const U=w.currentProgram.getUniforms();w.uniformsList=ac.seqWithValue(U.seq,w.uniforms)}return w.uniformsList}function Op(w,U){const H=Ae.get(w);H.outputColorSpace=U.outputColorSpace,H.batching=U.batching,H.batchingColor=U.batchingColor,H.instancing=U.instancing,H.instancingColor=U.instancingColor,H.instancingMorph=U.instancingMorph,H.skinning=U.skinning,H.morphTargets=U.morphTargets,H.morphNormals=U.morphNormals,H.morphColors=U.morphColors,H.morphTargetsCount=U.morphTargetsCount,H.numClippingPlanes=U.numClippingPlanes,H.numIntersection=U.numClipIntersection,H.vertexAlphas=U.vertexAlphas,H.vertexTangents=U.vertexTangents,H.toneMapping=U.toneMapping}function q_(w,U,H,V,k){U.isScene!==!0&&(U=_t),R.resetTextureUnits();const oe=U.fog,fe=V.isMeshStandardMaterial?U.environment:null,Se=P===null?S.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:Ao,Me=(V.isMeshStandardMaterial?B:E).get(V.envMap||fe),De=V.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,Ue=!!H.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Ee=!!H.morphAttributes.position,Ke=!!H.morphAttributes.normal,ut=!!H.morphAttributes.color;let ft=vr;V.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(ft=S.toneMapping);const un=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,Ze=un!==void 0?un.length:0,Te=Ae.get(V),_i=h.state.lights;if(re===!0&&(ge===!0||w!==M)){const In=w===M&&V.id===T;se.setState(V,w,In)}let Qe=!1;V.version===Te.__version?(Te.needsLights&&Te.lightsStateVersion!==_i.state.version||Te.outputColorSpace!==Se||k.isBatchedMesh&&Te.batching===!1||!k.isBatchedMesh&&Te.batching===!0||k.isBatchedMesh&&Te.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&Te.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&Te.instancing===!1||!k.isInstancedMesh&&Te.instancing===!0||k.isSkinnedMesh&&Te.skinning===!1||!k.isSkinnedMesh&&Te.skinning===!0||k.isInstancedMesh&&Te.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Te.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Te.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Te.instancingMorph===!1&&k.morphTexture!==null||Te.envMap!==Me||V.fog===!0&&Te.fog!==oe||Te.numClippingPlanes!==void 0&&(Te.numClippingPlanes!==se.numPlanes||Te.numIntersection!==se.numIntersection)||Te.vertexAlphas!==De||Te.vertexTangents!==Ue||Te.morphTargets!==Ee||Te.morphNormals!==Ke||Te.morphColors!==ut||Te.toneMapping!==ft||Te.morphTargetsCount!==Ze)&&(Qe=!0):(Qe=!0,Te.__version=V.version);let qn=Te.currentProgram;Qe===!0&&(qn=Ya(V,U,k));let ds=!1,_n=!1,Do=!1;const pt=qn.getUniforms(),si=Te.uniforms;if(Ce.useProgram(qn.program)&&(ds=!0,_n=!0,Do=!0),V.id!==T&&(T=V.id,_n=!0),ds||M!==w){Ce.buffers.depth.getReversed()?(le.copy(w.projectionMatrix),E1(le),w1(le),pt.setValue(F,"projectionMatrix",le)):pt.setValue(F,"projectionMatrix",w.projectionMatrix),pt.setValue(F,"viewMatrix",w.matrixWorldInverse);const zi=pt.map.cameraPosition;zi!==void 0&&zi.setValue(F,Ie.setFromMatrixPosition(w.matrixWorld)),je.logarithmicDepthBuffer&&pt.setValue(F,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&pt.setValue(F,"isOrthographic",w.isOrthographicCamera===!0),M!==w&&(M=w,_n=!0,Do=!0)}if(k.isSkinnedMesh){pt.setOptional(F,k,"bindMatrix"),pt.setOptional(F,k,"bindMatrixInverse");const In=k.skeleton;In&&(In.boneTexture===null&&In.computeBoneTexture(),pt.setValue(F,"boneTexture",In.boneTexture,R))}k.isBatchedMesh&&(pt.setOptional(F,k,"batchingTexture"),pt.setValue(F,"batchingTexture",k._matricesTexture,R),pt.setOptional(F,k,"batchingIdTexture"),pt.setValue(F,"batchingIdTexture",k._indirectTexture,R),pt.setOptional(F,k,"batchingColorTexture"),k._colorsTexture!==null&&pt.setValue(F,"batchingColorTexture",k._colorsTexture,R));const Io=H.morphAttributes;if((Io.position!==void 0||Io.normal!==void 0||Io.color!==void 0)&&Le.update(k,H,qn),(_n||Te.receiveShadow!==k.receiveShadow)&&(Te.receiveShadow=k.receiveShadow,pt.setValue(F,"receiveShadow",k.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(si.envMap.value=Me,si.flipEnvMap.value=Me.isCubeTexture&&Me.isRenderTargetTexture===!1?-1:1),V.isMeshStandardMaterial&&V.envMap===null&&U.environment!==null&&(si.envMapIntensity.value=U.environmentIntensity),_n&&(pt.setValue(F,"toneMappingExposure",S.toneMappingExposure),Te.needsLights&&$_(si,Do),oe&&V.fog===!0&&de.refreshFogUniforms(si,oe),de.refreshMaterialUniforms(si,V,D,$,h.state.transmissionRenderTarget[w.id]),ac.upload(F,Fp(Te),si,R)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(ac.upload(F,Fp(Te),si,R),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&pt.setValue(F,"center",k.center),pt.setValue(F,"modelViewMatrix",k.modelViewMatrix),pt.setValue(F,"normalMatrix",k.normalMatrix),pt.setValue(F,"modelMatrix",k.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){const In=V.uniformsGroups;for(let zi=0,Bi=In.length;zi<Bi;zi++){const zp=In[zi];I.update(zp,qn),I.bind(zp,qn)}}return qn}function $_(w,U){w.ambientLightColor.needsUpdate=U,w.lightProbe.needsUpdate=U,w.directionalLights.needsUpdate=U,w.directionalLightShadows.needsUpdate=U,w.pointLights.needsUpdate=U,w.pointLightShadows.needsUpdate=U,w.spotLights.needsUpdate=U,w.spotLightShadows.needsUpdate=U,w.rectAreaLights.needsUpdate=U,w.hemisphereLights.needsUpdate=U}function Y_(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(w,U,H){Ae.get(w.texture).__webglTexture=U,Ae.get(w.depthTexture).__webglTexture=H;const V=Ae.get(w);V.__hasExternalTextures=!0,V.__autoAllocateDepthBuffer=H===void 0,V.__autoAllocateDepthBuffer||Ve.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),V.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,U){const H=Ae.get(w);H.__webglFramebuffer=U,H.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(w,U=0,H=0){P=w,A=U,b=H;let V=!0,k=null,oe=!1,fe=!1;if(w){const Me=Ae.get(w);if(Me.__useDefaultFramebuffer!==void 0)Ce.bindFramebuffer(F.FRAMEBUFFER,null),V=!1;else if(Me.__webglFramebuffer===void 0)R.setupRenderTarget(w);else if(Me.__hasExternalTextures)R.rebindTextures(w,Ae.get(w.texture).__webglTexture,Ae.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const Ee=w.depthTexture;if(Me.__boundDepthTexture!==Ee){if(Ee!==null&&Ae.has(Ee)&&(w.width!==Ee.image.width||w.height!==Ee.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");R.setupDepthRenderbuffer(w)}}const De=w.texture;(De.isData3DTexture||De.isDataArrayTexture||De.isCompressedArrayTexture)&&(fe=!0);const Ue=Ae.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Ue[U])?k=Ue[U][H]:k=Ue[U],oe=!0):w.samples>0&&R.useMultisampledRTT(w)===!1?k=Ae.get(w).__webglMultisampledFramebuffer:Array.isArray(Ue)?k=Ue[H]:k=Ue,L.copy(w.viewport),j.copy(w.scissor),z=w.scissorTest}else L.copy(ae).multiplyScalar(D).floor(),j.copy(ye).multiplyScalar(D).floor(),z=Ye;if(Ce.bindFramebuffer(F.FRAMEBUFFER,k)&&V&&Ce.drawBuffers(w,k),Ce.viewport(L),Ce.scissor(j),Ce.setScissorTest(z),oe){const Me=Ae.get(w.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+U,Me.__webglTexture,H)}else if(fe){const Me=Ae.get(w.texture),De=U||0;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,Me.__webglTexture,H||0,De)}T=-1},this.readRenderTargetPixels=function(w,U,H,V,k,oe,fe){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Se=Ae.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&fe!==void 0&&(Se=Se[fe]),Se){Ce.bindFramebuffer(F.FRAMEBUFFER,Se);try{const Me=w.texture,De=Me.format,Ue=Me.type;if(!je.textureFormatReadable(De)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!je.textureTypeReadable(Ue)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=w.width-V&&H>=0&&H<=w.height-k&&F.readPixels(U,H,V,k,Fe.convert(De),Fe.convert(Ue),oe)}finally{const Me=P!==null?Ae.get(P).__webglFramebuffer:null;Ce.bindFramebuffer(F.FRAMEBUFFER,Me)}}},this.readRenderTargetPixelsAsync=async function(w,U,H,V,k,oe,fe){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Se=Ae.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&fe!==void 0&&(Se=Se[fe]),Se){const Me=w.texture,De=Me.format,Ue=Me.type;if(!je.textureFormatReadable(De))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!je.textureTypeReadable(Ue))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=w.width-V&&H>=0&&H<=w.height-k){Ce.bindFramebuffer(F.FRAMEBUFFER,Se);const Ee=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,Ee),F.bufferData(F.PIXEL_PACK_BUFFER,oe.byteLength,F.STREAM_READ),F.readPixels(U,H,V,k,Fe.convert(De),Fe.convert(Ue),0);const Ke=P!==null?Ae.get(P).__webglFramebuffer:null;Ce.bindFramebuffer(F.FRAMEBUFFER,Ke);const ut=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await M1(F,ut,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,Ee),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,oe),F.deleteBuffer(Ee),F.deleteSync(ut),oe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(w,U=null,H=0){w.isTexture!==!0&&(sa("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,w=arguments[1]);const V=Math.pow(2,-H),k=Math.floor(w.image.width*V),oe=Math.floor(w.image.height*V),fe=U!==null?U.x:0,Se=U!==null?U.y:0;R.setTexture2D(w,0),F.copyTexSubImage2D(F.TEXTURE_2D,H,0,0,fe,Se,k,oe),Ce.unbindTexture()},this.copyTextureToTexture=function(w,U,H=null,V=null,k=0){w.isTexture!==!0&&(sa("WebGLRenderer: copyTextureToTexture function signature has changed."),V=arguments[0]||null,w=arguments[1],U=arguments[2],k=arguments[3]||0,H=null);let oe,fe,Se,Me,De,Ue,Ee,Ke,ut;const ft=w.isCompressedTexture?w.mipmaps[k]:w.image;H!==null?(oe=H.max.x-H.min.x,fe=H.max.y-H.min.y,Se=H.isBox3?H.max.z-H.min.z:1,Me=H.min.x,De=H.min.y,Ue=H.isBox3?H.min.z:0):(oe=ft.width,fe=ft.height,Se=ft.depth||1,Me=0,De=0,Ue=0),V!==null?(Ee=V.x,Ke=V.y,ut=V.z):(Ee=0,Ke=0,ut=0);const un=Fe.convert(U.format),Ze=Fe.convert(U.type);let Te;U.isData3DTexture?(R.setTexture3D(U,0),Te=F.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(R.setTexture2DArray(U,0),Te=F.TEXTURE_2D_ARRAY):(R.setTexture2D(U,0),Te=F.TEXTURE_2D),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,U.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,U.unpackAlignment);const _i=F.getParameter(F.UNPACK_ROW_LENGTH),Qe=F.getParameter(F.UNPACK_IMAGE_HEIGHT),qn=F.getParameter(F.UNPACK_SKIP_PIXELS),ds=F.getParameter(F.UNPACK_SKIP_ROWS),_n=F.getParameter(F.UNPACK_SKIP_IMAGES);F.pixelStorei(F.UNPACK_ROW_LENGTH,ft.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,ft.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Me),F.pixelStorei(F.UNPACK_SKIP_ROWS,De),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Ue);const Do=w.isDataArrayTexture||w.isData3DTexture,pt=U.isDataArrayTexture||U.isData3DTexture;if(w.isRenderTargetTexture||w.isDepthTexture){const si=Ae.get(w),Io=Ae.get(U),In=Ae.get(si.__renderTarget),zi=Ae.get(Io.__renderTarget);Ce.bindFramebuffer(F.READ_FRAMEBUFFER,In.__webglFramebuffer),Ce.bindFramebuffer(F.DRAW_FRAMEBUFFER,zi.__webglFramebuffer);for(let Bi=0;Bi<Se;Bi++)Do&&F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ae.get(w).__webglTexture,k,Ue+Bi),w.isDepthTexture?(pt&&F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ae.get(U).__webglTexture,k,ut+Bi),F.blitFramebuffer(Me,De,oe,fe,Ee,Ke,oe,fe,F.DEPTH_BUFFER_BIT,F.NEAREST)):pt?F.copyTexSubImage3D(Te,k,Ee,Ke,ut+Bi,Me,De,oe,fe):F.copyTexSubImage2D(Te,k,Ee,Ke,ut+Bi,Me,De,oe,fe);Ce.bindFramebuffer(F.READ_FRAMEBUFFER,null),Ce.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else pt?w.isDataTexture||w.isData3DTexture?F.texSubImage3D(Te,k,Ee,Ke,ut,oe,fe,Se,un,Ze,ft.data):U.isCompressedArrayTexture?F.compressedTexSubImage3D(Te,k,Ee,Ke,ut,oe,fe,Se,un,ft.data):F.texSubImage3D(Te,k,Ee,Ke,ut,oe,fe,Se,un,Ze,ft):w.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,k,Ee,Ke,oe,fe,un,Ze,ft.data):w.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,k,Ee,Ke,ft.width,ft.height,un,ft.data):F.texSubImage2D(F.TEXTURE_2D,k,Ee,Ke,oe,fe,un,Ze,ft);F.pixelStorei(F.UNPACK_ROW_LENGTH,_i),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Qe),F.pixelStorei(F.UNPACK_SKIP_PIXELS,qn),F.pixelStorei(F.UNPACK_SKIP_ROWS,ds),F.pixelStorei(F.UNPACK_SKIP_IMAGES,_n),k===0&&U.generateMipmaps&&F.generateMipmap(Te),Ce.unbindTexture()},this.copyTextureToTexture3D=function(w,U,H=null,V=null,k=0){return w.isTexture!==!0&&(sa("WebGLRenderer: copyTextureToTexture3D function signature has changed."),H=arguments[0]||null,V=arguments[1]||null,w=arguments[2],U=arguments[3],k=arguments[4]||0),sa('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(w,U,H,V,k)},this.initRenderTarget=function(w){Ae.get(w).__webglFramebuffer===void 0&&R.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?R.setTextureCube(w,0):w.isData3DTexture?R.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?R.setTexture2DArray(w,0):R.setTexture2D(w,0),Ce.unbindTexture()},this.resetState=function(){A=0,b=0,P=null,Ce.reset(),ct.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Pi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorspace=qe._getDrawingBufferColorSpace(e),n.unpackColorSpace=qe._getUnpackColorSpace()}}class NC extends kt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new vi,this.environmentIntensity=1,this.environmentRotation=new vi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}class UC{constructor(e,n){this.isInterleavedBuffer=!0,this.array=e,this.stride=n,this.count=e!==void 0?e.length/n:0,this.usage=sf,this.updateRanges=[],this.version=0,this.uuid=xr()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,n,i){e*=this.stride,i*=n.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=n.array[i+r];return this}set(e,n=0){return this.array.set(e,n),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=xr()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const n=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(n,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=xr()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const tn=new N;class Fc{constructor(e,n,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=n,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let n=0,i=this.data.count;n<i;n++)tn.fromBufferAttribute(this,n),tn.applyMatrix4(e),this.setXYZ(n,tn.x,tn.y,tn.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)tn.fromBufferAttribute(this,n),tn.applyNormalMatrix(e),this.setXYZ(n,tn.x,tn.y,tn.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)tn.fromBufferAttribute(this,n),tn.transformDirection(e),this.setXYZ(n,tn.x,tn.y,tn.z);return this}getComponent(e,n){let i=this.array[e*this.data.stride+this.offset+n];return this.normalized&&(i=di(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=it(i,this.array)),this.data.array[e*this.data.stride+this.offset+n]=i,this}setX(e,n){return this.normalized&&(n=it(n,this.array)),this.data.array[e*this.data.stride+this.offset]=n,this}setY(e,n){return this.normalized&&(n=it(n,this.array)),this.data.array[e*this.data.stride+this.offset+1]=n,this}setZ(e,n){return this.normalized&&(n=it(n,this.array)),this.data.array[e*this.data.stride+this.offset+2]=n,this}setW(e,n){return this.normalized&&(n=it(n,this.array)),this.data.array[e*this.data.stride+this.offset+3]=n,this}getX(e){let n=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(n=di(n,this.array)),n}getY(e){let n=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(n=di(n,this.array)),n}getZ(e){let n=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(n=di(n,this.array)),n}getW(e){let n=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(n=di(n,this.array)),n}setXY(e,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(n=it(n,this.array),i=it(i,this.array)),this.data.array[e+0]=n,this.data.array[e+1]=i,this}setXYZ(e,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(n=it(n,this.array),i=it(i,this.array),r=it(r,this.array)),this.data.array[e+0]=n,this.data.array[e+1]=i,this.data.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(n=it(n,this.array),i=it(i,this.array),r=it(r,this.array),s=it(s,this.array)),this.data.array[e+0]=n,this.data.array[e+1]=i,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const n=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)n.push(this.data.array[r+s])}return new jn(new this.array.constructor(n),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Fc(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const n=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)n.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:n,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class R_ extends cs{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new Be(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Cs;const Xo=new N,Rs=new N,Ps=new N,Ls=new be,qo=new be,P_=new st,Nl=new N,$o=new N,Ul=new N,e0=new be,gd=new be,t0=new be;class kC extends kt{constructor(e=new R_){if(super(),this.isSprite=!0,this.type="Sprite",Cs===void 0){Cs=new xn;const n=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new UC(n,5);Cs.setIndex([0,1,2,0,2,3]),Cs.setAttribute("position",new Fc(i,3,0,!1)),Cs.setAttribute("uv",new Fc(i,2,3,!1))}this.geometry=Cs,this.material=e,this.center=new be(.5,.5)}raycast(e,n){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Rs.setFromMatrixScale(this.matrixWorld),P_.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Ps.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Rs.multiplyScalar(-Ps.z);const i=this.material.rotation;let r,s;i!==0&&(s=Math.cos(i),r=Math.sin(i));const o=this.center;kl(Nl.set(-.5,-.5,0),Ps,o,Rs,r,s),kl($o.set(.5,-.5,0),Ps,o,Rs,r,s),kl(Ul.set(.5,.5,0),Ps,o,Rs,r,s),e0.set(0,0),gd.set(1,0),t0.set(1,1);let a=e.ray.intersectTriangle(Nl,$o,Ul,!1,Xo);if(a===null&&(kl($o.set(-.5,.5,0),Ps,o,Rs,r,s),gd.set(0,1),a=e.ray.intersectTriangle(Nl,Ul,$o,!1,Xo),a===null))return;const l=e.ray.origin.distanceTo(Xo);l<e.near||l>e.far||n.push({distance:l,point:Xo.clone(),uv:On.getInterpolation(Xo,Nl,$o,Ul,e0,gd,t0,new be),face:null,object:this})}copy(e,n){return super.copy(e,n),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function kl(t,e,n,i,r,s){Ls.subVectors(t,n).addScalar(.5).multiply(i),r!==void 0?(qo.x=s*Ls.x-r*Ls.y,qo.y=r*Ls.x+s*Ls.y):qo.copy(Ls),t.copy(e),t.x+=qo.x,t.y+=qo.y,t.applyMatrix4(P_)}class FC extends Jt{constructor(e=null,n=1,i=1,r,s,o,a,l,c=Cn,u=Cn,d,f){super(null,o,a,l,c,u,r,s,d,f),this.isDataTexture=!0,this.image={data:e,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class n0 extends jn{constructor(e,n,i,r=1){super(e,n,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Ds=new st,i0=new st,Fl=[],r0=new ls,OC=new st,Yo=new lt,Ko=new Co;class vd extends lt{constructor(e,n,i){super(e,n),this.isInstancedMesh=!0,this.instanceMatrix=new n0(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,OC)}computeBoundingBox(){const e=this.geometry,n=this.count;this.boundingBox===null&&(this.boundingBox=new ls),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<n;i++)this.getMatrixAt(i,Ds),r0.copy(e.boundingBox).applyMatrix4(Ds),this.boundingBox.union(r0)}computeBoundingSphere(){const e=this.geometry,n=this.count;this.boundingSphere===null&&(this.boundingSphere=new Co),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<n;i++)this.getMatrixAt(i,Ds),Ko.copy(e.boundingSphere).applyMatrix4(Ds),this.boundingSphere.union(Ko)}copy(e,n){return super.copy(e,n),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,n){n.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,n){n.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,n){const i=n.morphTargetInfluences,r=this.morphTexture.source.data.data,s=i.length+1,o=e*s+1;for(let a=0;a<i.length;a++)i[a]=r[o+a]}raycast(e,n){const i=this.matrixWorld,r=this.count;if(Yo.geometry=this.geometry,Yo.material=this.material,Yo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ko.copy(this.boundingSphere),Ko.applyMatrix4(i),e.ray.intersectsSphere(Ko)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Ds),i0.multiplyMatrices(i,Ds),Yo.matrixWorld=i0,Yo.raycast(e,Fl);for(let o=0,a=Fl.length;o<a;o++){const l=Fl[o];l.instanceId=s,l.object=this,n.push(l)}Fl.length=0}}setColorAt(e,n){this.instanceColor===null&&(this.instanceColor=new n0(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),n.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,n){n.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,n){const i=n.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new FC(new Float32Array(r*this.count),r,this.count,hp,fi));const s=this.morphTexture.source.data.data;let o=0;for(let c=0;c<i.length;c++)o+=i[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=r*e;s[l]=a,s.set(i,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class L_ extends cs{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new Be(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Oc=new N,zc=new N,s0=new st,Zo=new gp,Ol=new Co,xd=new N,o0=new N;class zC extends kt{constructor(e=new xn,n=new L_){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[0];for(let r=1,s=n.count;r<s;r++)Oc.fromBufferAttribute(n,r-1),zc.fromBufferAttribute(n,r),i[r]=i[r-1],i[r]+=Oc.distanceTo(zc);e.setAttribute("lineDistance",new Rt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,n){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ol.copy(i.boundingSphere),Ol.applyMatrix4(r),Ol.radius+=s,e.ray.intersectsSphere(Ol)===!1)return;s0.copy(r).invert(),Zo.copy(e.ray).applyMatrix4(s0);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=i.index,f=i.attributes.position;if(u!==null){const p=Math.max(0,o.start),x=Math.min(u.count,o.start+o.count);for(let v=p,g=x-1;v<g;v+=c){const h=u.getX(v),_=u.getX(v+1),y=zl(this,e,Zo,l,h,_);y&&n.push(y)}if(this.isLineLoop){const v=u.getX(x-1),g=u.getX(p),h=zl(this,e,Zo,l,v,g);h&&n.push(h)}}else{const p=Math.max(0,o.start),x=Math.min(f.count,o.start+o.count);for(let v=p,g=x-1;v<g;v+=c){const h=zl(this,e,Zo,l,v,v+1);h&&n.push(h)}if(this.isLineLoop){const v=zl(this,e,Zo,l,x-1,p);v&&n.push(v)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function zl(t,e,n,i,r,s){const o=t.geometry.attributes.position;if(Oc.fromBufferAttribute(o,r),zc.fromBufferAttribute(o,s),n.distanceSqToSegment(Oc,zc,xd,o0)>i)return;xd.applyMatrix4(t.matrixWorld);const l=e.ray.origin.distanceTo(xd);if(!(l<e.near||l>e.far))return{distance:l,point:o0.clone().applyMatrix4(t.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:t}}const a0=new N,l0=new N;class BC extends zC{constructor(e,n){super(e,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[];for(let r=0,s=n.count;r<s;r+=2)a0.fromBufferAttribute(n,r),l0.fromBufferAttribute(n,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+a0.distanceTo(l0);e.setAttribute("lineDistance",new Rt(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class HC extends Jt{constructor(e,n,i,r,s,o,a,l,c){super(e,n,i,r,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class _p extends xn{constructor(e=1,n=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:n,thetaStart:i,thetaLength:r},n=Math.max(3,n);const s=[],o=[],a=[],l=[],c=new N,u=new be;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let d=0,f=3;d<=n;d++,f+=3){const p=i+d/n*r;c.x=e*Math.cos(p),c.y=e*Math.sin(p),o.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(o[f]/e+1)/2,u.y=(o[f+1]/e+1)/2,l.push(u.x,u.y)}for(let d=1;d<=n;d++)s.push(d,d+1,0);this.setIndex(s),this.setAttribute("position",new Rt(o,3)),this.setAttribute("normal",new Rt(a,3)),this.setAttribute("uv",new Rt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new _p(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class so extends xn{constructor(e=1,n=1,i=1,r=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:n,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],d=[],f=[],p=[];let x=0;const v=[],g=i/2;let h=0;_(),o===!1&&(e>0&&y(!0),n>0&&y(!1)),this.setIndex(u),this.setAttribute("position",new Rt(d,3)),this.setAttribute("normal",new Rt(f,3)),this.setAttribute("uv",new Rt(p,2));function _(){const S=new N,C=new N;let A=0;const b=(n-e)/i;for(let P=0;P<=s;P++){const T=[],M=P/s,L=M*(n-e)+e;for(let j=0;j<=r;j++){const z=j/r,q=z*l+a,Z=Math.sin(q),O=Math.cos(q);C.x=L*Z,C.y=-M*i+g,C.z=L*O,d.push(C.x,C.y,C.z),S.set(Z,b,O).normalize(),f.push(S.x,S.y,S.z),p.push(z,1-M),T.push(x++)}v.push(T)}for(let P=0;P<r;P++)for(let T=0;T<s;T++){const M=v[T][P],L=v[T+1][P],j=v[T+1][P+1],z=v[T][P+1];(e>0||T!==0)&&(u.push(M,L,z),A+=3),(n>0||T!==s-1)&&(u.push(L,j,z),A+=3)}c.addGroup(h,A,0),h+=A}function y(S){const C=x,A=new be,b=new N;let P=0;const T=S===!0?e:n,M=S===!0?1:-1;for(let j=1;j<=r;j++)d.push(0,g*M,0),f.push(0,M,0),p.push(.5,.5),x++;const L=x;for(let j=0;j<=r;j++){const q=j/r*l+a,Z=Math.cos(q),O=Math.sin(q);b.x=T*O,b.y=g*M,b.z=T*Z,d.push(b.x,b.y,b.z),f.push(0,M,0),A.x=Z*.5+.5,A.y=O*.5*M+.5,p.push(A.x,A.y),x++}for(let j=0;j<r;j++){const z=C+j,q=L+j;S===!0?u.push(q,q+1,z):u.push(q+1,q,z),P+=3}c.addGroup(h,P,S===!0?1:2),h+=P}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new so(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class yp extends xn{constructor(e=.5,n=1,i=32,r=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:n,thetaSegments:i,phiSegments:r,thetaStart:s,thetaLength:o},i=Math.max(3,i),r=Math.max(1,r);const a=[],l=[],c=[],u=[];let d=e;const f=(n-e)/r,p=new N,x=new be;for(let v=0;v<=r;v++){for(let g=0;g<=i;g++){const h=s+g/i*o;p.x=d*Math.cos(h),p.y=d*Math.sin(h),l.push(p.x,p.y,p.z),c.push(0,0,1),x.x=(p.x/n+1)/2,x.y=(p.y/n+1)/2,u.push(x.x,x.y)}d+=f}for(let v=0;v<r;v++){const g=v*(i+1);for(let h=0;h<i;h++){const _=h+g,y=_,S=_+i+1,C=_+i+2,A=_+1;a.push(y,S,A),a.push(S,C,A)}}this.setIndex(a),this.setAttribute("position",new Rt(l,3)),this.setAttribute("normal",new Rt(c,3)),this.setAttribute("uv",new Rt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new yp(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Sp extends xn{constructor(e=1,n=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:n,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const u=[],d=new N,f=new N,p=[],x=[],v=[],g=[];for(let h=0;h<=i;h++){const _=[],y=h/i;let S=0;h===0&&o===0?S=.5/n:h===i&&l===Math.PI&&(S=-.5/n);for(let C=0;C<=n;C++){const A=C/n;d.x=-e*Math.cos(r+A*s)*Math.sin(o+y*a),d.y=e*Math.cos(o+y*a),d.z=e*Math.sin(r+A*s)*Math.sin(o+y*a),x.push(d.x,d.y,d.z),f.copy(d).normalize(),v.push(f.x,f.y,f.z),g.push(A+S,1-y),_.push(c++)}u.push(_)}for(let h=0;h<i;h++)for(let _=0;_<n;_++){const y=u[h][_+1],S=u[h][_],C=u[h+1][_],A=u[h+1][_+1];(h!==0||o>0)&&p.push(y,S,A),(h!==i-1||l<Math.PI)&&p.push(S,C,A)}this.setIndex(p),this.setAttribute("position",new Rt(x,3)),this.setAttribute("normal",new Rt(v,3)),this.setAttribute("uv",new Rt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Sp(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Yi extends cs{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Be(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Be(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=u_,this.normalScale=new be(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new vi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class D_ extends kt{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new Be(e),this.intensity=n}dispose(){}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,this.groundColor!==void 0&&(n.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(n.object.distance=this.distance),this.angle!==void 0&&(n.object.angle=this.angle),this.decay!==void 0&&(n.object.decay=this.decay),this.penumbra!==void 0&&(n.object.penumbra=this.penumbra),this.shadow!==void 0&&(n.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(n.object.target=this.target.uuid),n}}class VC extends D_{constructor(e,n,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(kt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Be(n)}copy(e,n){return super.copy(e,n),this.groundColor.copy(e.groundColor),this}}const _d=new st,c0=new N,u0=new N;class jC{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new be(512,512),this.map=null,this.mapPass=null,this.matrix=new st,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new vp,this._frameExtents=new be(1,1),this._viewportCount=1,this._viewports=[new Tt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera,i=this.matrix;c0.setFromMatrixPosition(e.matrixWorld),n.position.copy(c0),u0.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(u0),n.updateMatrixWorld(),_d.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(_d),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(_d)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class GC extends jC{constructor(){super(new E_(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class WC extends D_{constructor(e,n){super(e,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(kt.DEFAULT_UP),this.updateMatrix(),this.target=new kt,this.shadow=new GC}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class d0{constructor(e=1,n=0,i=0){return this.radius=e,this.phi=n,this.theta=i,this}set(e,n,i){return this.radius=e,this.phi=n,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,n,i){return this.radius=Math.sqrt(e*e+n*n+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(on(n/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class XC extends as{constructor(e,n=null){super(),this.object=e,this.domElement=n,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:lp}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=lp);const h0={type:"change"},Mp={type:"start"},I_={type:"end"},Bl=new gp,f0=new Qi,qC=Math.cos(70*y1.DEG2RAD),Dt=new N,dn=2*Math.PI,rt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},yd=1e-6;class $C extends XC{constructor(e,n=null){super(e,n),this.state=rt.NONE,this.enabled=!0,this.target=new N,this.cursor=new N,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:to.ROTATE,MIDDLE:to.DOLLY,RIGHT:to.PAN},this.touches={ONE:Ws.ROTATE,TWO:Ws.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new N,this._lastQuaternion=new ns,this._lastTargetPosition=new N,this._quat=new ns().setFromUnitVectors(e.up,new N(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new d0,this._sphericalDelta=new d0,this._scale=1,this._panOffset=new N,this._rotateStart=new be,this._rotateEnd=new be,this._rotateDelta=new be,this._panStart=new be,this._panEnd=new be,this._panDelta=new be,this._dollyStart=new be,this._dollyEnd=new be,this._dollyDelta=new be,this._dollyDirection=new N,this._mouse=new be,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=KC.bind(this),this._onPointerDown=YC.bind(this),this._onPointerUp=ZC.bind(this),this._onContextMenu=rR.bind(this),this._onMouseWheel=eR.bind(this),this._onKeyDown=tR.bind(this),this._onTouchStart=nR.bind(this),this._onTouchMove=iR.bind(this),this._onMouseDown=QC.bind(this),this._onMouseMove=JC.bind(this),this._interceptControlDown=sR.bind(this),this._interceptControlUp=oR.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(h0),this.update(),this.state=rt.NONE}update(e=null){const n=this.object.position;Dt.copy(n).sub(this.target),Dt.applyQuaternion(this._quat),this._spherical.setFromVector3(Dt),this.autoRotate&&this.state===rt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(i)&&isFinite(r)&&(i<-Math.PI?i+=dn:i>Math.PI&&(i-=dn),r<-Math.PI?r+=dn:r>Math.PI&&(r-=dn),i<=r?this._spherical.theta=Math.max(i,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+r)/2?Math.max(i,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=o!=this._spherical.radius}if(Dt.setFromSpherical(this._spherical),Dt.applyQuaternion(this._quatInverse),n.copy(this.target).add(Dt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Dt.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){const a=new N(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;const c=new N(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Dt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Bl.origin.copy(this.object.position),Bl.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Bl.direction))<qC?this.object.lookAt(this.target):(f0.setFromNormalAndCoplanarPoint(this.object.up,this.target),Bl.intersectPlane(f0,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>yd||8*(1-this._lastQuaternion.dot(this.object.quaternion))>yd||this._lastTargetPosition.distanceToSquared(this.target)>yd?(this.dispatchEvent(h0),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?dn/60*this.autoRotateSpeed*e:dn/60/60*this.autoRotateSpeed}_getZoomScale(e){const n=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*n)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,n){Dt.setFromMatrixColumn(n,0),Dt.multiplyScalar(-e),this._panOffset.add(Dt)}_panUp(e,n){this.screenSpacePanning===!0?Dt.setFromMatrixColumn(n,1):(Dt.setFromMatrixColumn(n,0),Dt.crossVectors(this.object.up,Dt)),Dt.multiplyScalar(e),this._panOffset.add(Dt)}_pan(e,n){const i=this.domElement;if(this.object.isPerspectiveCamera){const r=this.object.position;Dt.copy(r).sub(this.target);let s=Dt.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/i.clientHeight,this.object.matrix),this._panUp(2*n*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(n*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,n){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),r=e-i.left,s=n-i.top,o=i.width,a=i.height;this._mouse.x=r/o*2-1,this._mouse.y=-(s/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(dn*this._rotateDelta.x/n.clientHeight),this._rotateUp(dn*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let n=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(dn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),n=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(-dn*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),n=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(dn*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),n=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(-dn*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),n=!0;break}n&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateStart.set(i,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._panStart.set(i,r)}}_handleTouchStartDolly(e){const n=this._getSecondPointerPosition(e),i=e.pageX-n.x,r=e.pageY-n.y,s=Math.sqrt(i*i+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),r=.5*(e.pageX+i.x),s=.5*(e.pageY+i.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const n=this.domElement;this._rotateLeft(dn*this._rotateDelta.x/n.clientHeight),this._rotateUp(dn*this._rotateDelta.y/n.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._panEnd.set(i,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const n=this._getSecondPointerPosition(e),i=e.pageX-n.x,r=e.pageY-n.y,s=Math.sqrt(i*i+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(e.pageX+n.x)*.5,a=(e.pageY+n.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==e.pointerId){this._pointers.splice(n,1);return}}_isTrackingPointer(e){for(let n=0;n<this._pointers.length;n++)if(this._pointers[n]==e.pointerId)return!0;return!1}_trackPointer(e){let n=this._pointerPositions[e.pointerId];n===void 0&&(n=new be,this._pointerPositions[e.pointerId]=n),n.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const n=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[n]}_customWheelEvent(e){const n=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(n){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function YC(t){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(t.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(t)&&(this._addPointer(t),t.pointerType==="touch"?this._onTouchStart(t):this._onMouseDown(t)))}function KC(t){this.enabled!==!1&&(t.pointerType==="touch"?this._onTouchMove(t):this._onMouseMove(t))}function ZC(t){switch(this._removePointer(t),this._pointers.length){case 0:this.domElement.releasePointerCapture(t.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(I_),this.state=rt.NONE;break;case 1:const e=this._pointers[0],n=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:n.x,pageY:n.y});break}}function QC(t){let e;switch(t.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case to.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(t),this.state=rt.DOLLY;break;case to.ROTATE:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=rt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=rt.ROTATE}break;case to.PAN:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(t),this.state=rt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(t),this.state=rt.PAN}break;default:this.state=rt.NONE}this.state!==rt.NONE&&this.dispatchEvent(Mp)}function JC(t){switch(this.state){case rt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(t);break;case rt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(t);break;case rt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(t);break}}function eR(t){this.enabled===!1||this.enableZoom===!1||this.state!==rt.NONE||(t.preventDefault(),this.dispatchEvent(Mp),this._handleMouseWheel(this._customWheelEvent(t)),this.dispatchEvent(I_))}function tR(t){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(t)}function nR(t){switch(this._trackPointer(t),this._pointers.length){case 1:switch(this.touches.ONE){case Ws.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(t),this.state=rt.TOUCH_ROTATE;break;case Ws.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(t),this.state=rt.TOUCH_PAN;break;default:this.state=rt.NONE}break;case 2:switch(this.touches.TWO){case Ws.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(t),this.state=rt.TOUCH_DOLLY_PAN;break;case Ws.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(t),this.state=rt.TOUCH_DOLLY_ROTATE;break;default:this.state=rt.NONE}break;default:this.state=rt.NONE}this.state!==rt.NONE&&this.dispatchEvent(Mp)}function iR(t){switch(this._trackPointer(t),this.state){case rt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(t),this.update();break;case rt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(t),this.update();break;case rt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(t),this.update();break;case rt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(t),this.update();break;default:this.state=rt.NONE}}function rR(t){this.enabled!==!1&&t.preventDefault()}function sR(t){t.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function oR(t){t.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const It={bleu:2311820,vert:2329651,jaune:14274378,rouge:15876417,sol:15133168,mur:2764605,rayonnage:9081766,compare:14711578},Hl={N:[0,-1],NE:[1,-1],E:[1,0],SE:[1,1],S:[0,1],SO:[-1,1],O:[-1,0],NO:[-1,-1]};function Hr(t,e="#0D0D0D",n=.62){const i=document.createElement("canvas"),r=i.getContext("2d"),s="600 44px system-ui, sans-serif";r.font=s;const o=Math.ceil(r.measureText(t).width)+48;i.width=o,i.height=76,r.font=s,r.fillStyle="rgba(255,255,255,0.94)",r.beginPath(),r.roundRect(0,0,o,76,18),r.fill(),r.fillStyle=e,r.textBaseline="middle",r.fillText(t,24,40);const a=new HC(i);a.colorSpace=wn;const l=new kC(new R_({map:a,depthTest:!1,transparent:!0}));return l.scale.set(o/76*n,n,1),l.userData.partage=!0,l.renderOrder=10,l}function aR(t){const e=new pi,n=(c,u={})=>new Yi({color:c,roughness:.55,metalness:.15,...u}),i={};i.chassis=new lt(new Gt(.72,.16,.56),n(t)),i.chassis.position.y=.2,i.roues=new pi;for(const[c,u]of[[-.25,-.3],[.25,-.3],[-.25,.3],[.25,.3]]){const d=new lt(new so(.11,.11,.07,20),n(1842985));d.rotation.x=Math.PI/2,d.position.set(c,.11,u),i.roues.add(d)}i.batterie=new lt(new Gt(.3,.1,.4),n(It.vert)),i.batterie.position.set(-.17,.33,0),i.calculateur=new lt(new Gt(.26,.1,.34),n(16777215)),i.calculateur.position.set(.19,.33,0),i.lidar=new pi;const r=new lt(new so(.1,.12,.08,24),n(1842985)),s=new lt(new so(.09,.09,.07,24),n(It.jaune,{emissive:It.jaune,emissiveIntensity:.35}));s.position.y=.075,i.lidar.add(r,s),i.lidar.position.set(.05,.44,0);const o=new lt(new Gt(.06,.06,.3),n(It.jaune));o.position.set(.36,.2,0),i.chassis.add(o),o.position.set(.36,0,0);const a={};for(const[c,u]of Object.entries(i))u.traverse(d=>{d.isMesh&&(d.castShadow=!0)}),a[c]=u.position.clone(),e.add(u);const l={lidar:Hr("Capteur : lidar","#7a6f00",.16),calculateur:Hr("Décision : calculateur","#23468C",.16),batterie:Hr("Énergie : batterie","#238C33",.16),chassis:Hr("Châssis","#0D0D0D",.16),roues:Hr("Effecteurs : roues","#0D0D0D",.16)};for(const[c,u]of Object.entries(l))u.visible=!1,e.add(u);return e.userData={pieces:i,base:a,labels:l,eclat:0},e}const lR={roues:-.02,chassis:.25,batterie:.6,calculateur:.95,lidar:1.3};class cR{constructor(e){this.conteneur=e,this.renderer=new IC({antialias:!0,preserveDrawingBuffer:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Qx,e.appendChild(this.renderer.domElement),this.scene=new NC,this.scene.background=new Be(1054759),this.camera=new Fn(42,1,.1,200),this.controls=new $C(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.maxPolarAngle=Math.PI/2.05,this.controls.minDistance=3,this.controls.maxDistance=60,this.scene.add(new VC(16777215,5333114,1.15));const n=new WC(16777215,1.6);n.position.set(8,18,6),n.castShadow=!0,n.shadow.mapSize.set(2048,2048),Object.assign(n.shadow.camera,{left:-16,right:16,top:16,bottom:-16,near:1,far:50}),this.scene.add(n),this.statique=new pi,this.dynamique=new pi,this.scene.add(this.statique,this.dynamique),this.couches={capteurs:!0,plan:!0,trajectoire:!0,croyance:!0,observation:!0,eclate:!1,suivre:!1},this.traces=[],this.robots=[],this.t=0,this.eclatCible=0,this._boucle=this._boucle.bind(this),this._ro=new ResizeObserver(()=>this._taille()),this._ro.observe(e),this._taille(),this._raf=requestAnimationFrame(this._boucle)}_taille(){const e=this.conteneur.clientWidth||800,n=this.conteneur.clientHeight||500;this.renderer.setSize(e,n,!1),this.renderer.domElement.style.width="100%",this.renderer.domElement.style.height="100%",this.camera.aspect=e/n,this.camera.updateProjectionMatrix()}_tube(e,n,i,r=.03,s=1){const o=n.clone().sub(e),a=o.length()||1e-4,l=new lt(new so(r,r,a,6),new zr({color:i,transparent:s<1,opacity:s}));return l.position.copy(e).addScaledVector(o,.5),l.quaternion.setFromUnitVectors(new N(0,1,0),o.normalize()),l}_vider(e){e.traverse(n=>{var i,r;n.userData.partage||((i=n.geometry)==null||i.dispose(),(r=n.material)==null||r.dispose())}),e.clear()}pos(e,n=0){return new N(e[0]-this.L/2+.5,n,e[1]-this.H/2+.5)}chargerMonde(e){this.statique.clear(),this.L=e.largeur,this.H=e.hauteur,this.portee=e.portee_lidar||5;const n=new lt(new Gt(this.L,.1,this.H),new Yi({color:It.sol,roughness:.9}));n.position.y=-.05,n.receiveShadow=!0,this.statique.add(n);const i=[];for(let p=0;p<=this.L;p++)i.push(new N(p-this.L/2,.003,-this.H/2),new N(p-this.L/2,.003,this.H/2));for(let p=0;p<=this.H;p++)i.push(new N(-this.L/2,.003,p-this.H/2),new N(this.L/2,.003,p-this.H/2));this.statique.add(new BC(new xn().setFromPoints(i),new L_({color:12831190})));const r=new Gt(1,.9,1),s=new Yi({color:It.mur,roughness:.8}),o=new vd(r,s,e.murs.length),a=new st;e.murs.forEach((p,x)=>{a.setPosition(this.pos(p,.45)),o.setMatrixAt(x,a)}),o.castShadow=!0,o.receiveShadow=!0,this.statique.add(o);const l=new vd(new Gt(.9,1.5,.9),new Yi({color:It.rayonnage,roughness:.7,transparent:!0,opacity:.55}),e.rayonnages.length),c=new vd(new Gt(.62,.3,.62),new Yi({roughness:.8}),e.rayonnages.length*3),u=[13214571,2311820,14274378,11887901,8358563],d=new Be;e.rayonnages.forEach((p,x)=>{a.setPosition(this.pos(p,.75)),l.setMatrixAt(x,a);for(let v=0;v<3;v++)a.setPosition(this.pos(p,.22+v*.48)),c.setMatrixAt(x*3+v,a),c.setColorAt(x*3+v,d.setHex(u[(p[0]*7+p[1]*3+v)%u.length]))}),l.castShadow=!0,c.castShadow=!0,this.statique.add(l,c);const f=(p,x,v)=>{const g=new lt(new Gt(.92,.03,.92),new Yi({color:x,emissive:x,emissiveIntensity:.25}));g.position.copy(this.pos(p,.016));const h=Hr(v,"#"+new Be(x).getHexString());h.position.copy(this.pos(p,1.25)),this.statique.add(g,h)};f(e.depart,It.bleu,"Départ"),f(e.objectif,It.vert,"Objectif"),this.vue("trois-quarts")}vue(e){const n=Math.max(this.L,this.H);if(e==="dessus")this.camera.position.set(0,n*1.25,.01);else if(e==="robot"&&this.robots[0]){const i=this.robots[0].position;this.camera.position.set(i.x+2.6,3.2,i.z+5.2),this.controls.target.set(i.x+.5,.9,i.z);return}else this.camera.position.set(n*.1,n*.82,n*.72);this.controls.target.set(0,0,0)}definirTraces(e){this.traces=e.filter(Boolean),this._vider(this.dynamique),this.robots=[],this.calques=[],this.traces.length&&(this.chargerMonde(this.traces[0].monde),this.traces.forEach((n,i)=>{const r=i===0?It.bleu:It.compare,s=aR(r);this.dynamique.add(s),this.robots.push(s);const o={groupe:new pi,couleur:r};this.dynamique.add(o.groupe),this.calques.push(o)}),this.afficher(0))}_etat(e,n){const i=e.etapes.length;return n<i?e.etapes[n].etat:{robot:e.bilan.position_finale,chariots:e.bilan.chariots_finaux||[],palettes:e.bilan.palettes_finales||[]}}afficher(e){this.t=e,this.traces.forEach((n,i)=>{const r=n.etapes.length,s=Math.max(0,Math.min(e,r)),o=Math.min(Math.floor(s),r),a=s-o,l=this._etat(n,o),c=this._etat(n,Math.min(o+1,r)),u=(C,A)=>[C[0]+(A[0]-C[0])*a,C[1]+(A[1]-C[1])*a],d=this.robots[i],f=u(l.robot,c.robot);d.position.copy(this.pos(f));const p=c.robot[0]-l.robot[0],x=c.robot[1]-l.robot[1];if(p||x)d.userData.cap=Math.atan2(-x,p);else if(o<r){const C=n.etapes[o].action;Hl[C]&&(d.userData.cap=Math.atan2(-Hl[C][1],Hl[C][0]))}d.rotation.y=d.userData.cap||0;const v=n.etapes[Math.min(o,r-1)],g=o<r&&v.resultat.collision;d.userData.pieces.chassis.material.emissive.setHex(g?It.rouge:0),d.userData.pieces.chassis.material.emissiveIntensity=g?.9:0;const h=this.calques[i].groupe;this._vider(h);const _=this.calques[i].couleur;if(i===0&&(l.chariots.forEach((C,A)=>{const b=u(C,(c.chariots||[])[A]||C),P=new lt(new Gt(.7,.5,.7),new Yi({color:It.rouge,roughness:.6}));P.position.copy(this.pos(b,.3)),P.castShadow=!0,h.add(P)}),l.palettes.forEach(C=>{const A=new lt(new Gt(.8,.45,.8),new Yi({color:11887901,roughness:.9}));A.position.copy(this.pos(C,.225)),A.castShadow=!0,this._etiquettePalette||(this._etiquettePalette=Hr("Palette imprévue","#b5651d"));const b=this._etiquettePalette.clone();b.userData.partage=!0,b.position.copy(this.pos(C,1.1)),h.add(A,b)})),this.couches.trajectoire){const C=[];for(let A=0;A<=o;A++)C.push(this.pos(this._etat(n,A).robot,.05+i*.02));C.push(this.pos(f,.05+i*.02));for(let A=0;A<C.length-1;A++)C[A].distanceToSquared(C[A+1])>1e-6&&h.add(this._tube(C[A],C[A+1],_,.045))}if(o>=r)return;const y=v.observation,S=v.decision;if(this.couches.plan&&S.plan&&S.plan.length&&S.plan.forEach((C,A)=>{if(A===0)return;const b=new lt(new _p(.16,16),new zr({color:It.vert,transparent:!0,opacity:.85}));b.rotation.x=-Math.PI/2,b.position.copy(this.pos(C,.03)),h.add(b)}),this.couches.capteurs&&y.lidar){const C=this.pos(l.robot,.5);for(const[A,b]of Object.entries(y.lidar)){const[P,T]=Hl[A],M=b<=this.portee,L=Math.min(b,this.portee)-(M?.5:0),j=C.clone().add(new N(P*L,0,T*L));if(h.add(this._tube(C,j,It.jaune,.022,M?.95:.3)),M){const z=new lt(new Sp(.085,10,10),new zr({color:b<=1?It.rouge:It.jaune}));z.position.copy(j),h.add(z)}}}if(this.couches.croyance&&y.croyance&&y.croyance.forEach(([C,A,b])=>{const P=new lt(new Gt(.94,.02+b*.12,.94),new zr({color:16747039,transparent:!0,opacity:.25+.6*Math.min(1,b*1.5)}));P.position.copy(this.pos([C,A],.01+(.02+b*.12)/2)),h.add(P)}),this.couches.observation){const C=(A,b,P)=>{const T=new lt(new yp(.34,.44,28),new zr({color:b,side:ui}));T.rotation.x=-Math.PI/2,T.position.copy(this.pos(A,P)),h.add(T)};y.position&&(y.position[0]!==l.robot[0]||y.position[1]!==l.robot[1])&&C(y.position,It.rouge,.07),y.position_estimee&&C(y.position_estimee,It.vert,.09)}})}definirCouches(e){Object.assign(this.couches,e),this.eclatCible=this.couches.eclate?1:0,this.afficher(this.t)}_boucle(){this._raf=requestAnimationFrame(this._boucle);for(const e of this.robots){const n=e.userData;n.eclat+=(this.eclatCible-n.eclat)*.12;for(const[r,s]of Object.entries(n.pieces)){s.position.y=n.base[r].y+lR[r]*n.eclat;const o=n.labels[r];o.visible=n.eclat>.5&&e===this.robots[0],o.position.set(.75,s.position.y+.05,.16)}n.pieces.lidar.children[1].rotation.y+=.15;const i=1.2+n.eclat*.2;e.scale.setScalar(i)}if(this.couches.suivre&&this.robots[0]){const e=this.robots[0].position;this.controls.target.lerp(new N(e.x,.4,e.z),.08)}this.controls.update(),this.renderer.render(this.scene,this.camera)}dispose(){cancelAnimationFrame(this._raf),this._ro.disconnect(),this.controls.dispose(),this.renderer.dispose(),this.renderer.domElement.remove()}}const uR=[["capteurs","Capteurs (lidar)"],["plan","Plan courant"],["trajectoire","Trajectoire"],["observation","Position observée"],["croyance","Croyance"],["eclate","Vue éclatée du robot"],["suivre","Suivre le robot"]],dR={reactive:"réactive",deliberative:"délibérative",apprise:"apprise"},Sd=new Map;async function p0(t){return Sd.has(t)||Sd.set(t,fetch(`traces/${t}.json`).then(e=>{if(!e.ok)throw new Error(`Trace introuvable : ${t}`);return e.json()})),Sd.get(t)}function m0({trace:t,i:e,titre:n,couleur:i}){if(!t)return null;const r=t.etapes.length,s=e>=r,o=t.etapes[Math.min(e,r-1)],a=t.bilan;return m.jsxs("div",{className:"decision",style:{borderColor:i},children:[m.jsxs("div",{className:"decision-titre",children:[m.jsx("span",{className:"pastille",style:{background:i}}),n]}),s?m.jsxs("p",{className:"raison",children:[a.succes?"Objectif atteint.":"Objectif non atteint dans le temps imparti."," ",a.etapes," étapes, ",a.collisions," collision(s)."]}):m.jsxs(m.Fragment,{children:[m.jsx("p",{className:"raison",children:o.decision.raison||"Décision sans commentaire"}),m.jsxs("dl",{children:[m.jsx("dt",{children:"Couche active"}),m.jsxs("dd",{children:[dR[o.decision.couche]||o.decision.couche||"n.c.",o.decision.regle?`, règle ${o.decision.regle}`:""]}),m.jsx("dt",{children:"Action"}),m.jsxs("dd",{children:[m.jsx("b",{children:o.action}),o.resultat.glissement?" (glissement : non exécutée)":"",o.resultat.collision?" (collision)":""]}),m.jsx("dt",{children:"Position réelle"}),m.jsxs("dd",{children:["(",o.etat.robot.join(", "),")"]}),m.jsx("dt",{children:"Position observée"}),m.jsxs("dd",{children:["(",o.observation.position.join(", "),")",o.observation.position_estimee?`, estimée (${o.observation.position_estimee.join(", ")})`:""]}),o.decision.entropie_bits!==void 0&&m.jsxs(m.Fragment,{children:[m.jsx("dt",{children:"Incertitude"}),m.jsxs("dd",{children:[o.decision.entropie_bits," bit(s)"]})]}),m.jsx("dt",{children:"Lidar N, E, S, O"}),m.jsx("dd",{children:["N","E","S","O"].map(l=>o.observation.lidar[l]).join(" · ")}),m.jsx("dt",{children:"Collisions"}),m.jsx("dd",{children:o.metriques.collisions}),m.jsx("dt",{children:"Reste à parcourir"}),m.jsxs("dd",{children:[o.metriques.distance_objectif," cellule(s) à vol d'oiseau"]})]})]})]})}function Ep({catalogue:t,initialA:e,initialB:n="",hauteur:i=520,importer:r=!1}){var z,q,Z;const s=te.useRef(null),o=te.useRef(null),[a,l]=te.useState(e||((z=t[0])==null?void 0:z.id)),[c,u]=te.useState(n),[d,f]=te.useState(null),[p,x]=te.useState([null,null]),[v,g]=te.useState(0),[h,_]=te.useState(!1),[y,S]=te.useState(3),[C,A]=te.useState({capteurs:!0,plan:!0,trajectoire:!0,croyance:!0,observation:!0,eclate:!1,suivre:!1}),[b,P]=te.useState("");te.useEffect(()=>{try{o.current=new cR(s.current)}catch{P("La scène 3D demande WebGL, indisponible dans ce navigateur. Les animations et les notebooks restent accessibles.");return}return()=>{var O;(O=o.current)==null||O.dispose(),o.current=null}},[]),te.useEffect(()=>{let O=!1;return o.current&&P(""),Promise.all([a==="__import"?d:p0(a),c?p0(c):null]).then(([$,D])=>{var W,Q;O||(x([$,D]),(W=o.current)==null||W.definirTraces([$,D]),(Q=o.current)==null||Q.definirCouches(C),g(0),_(!1))}).catch($=>P($.message)),()=>{O=!0}},[a,c,d]);const T=te.useMemo(()=>Math.max(...p.filter(Boolean).map(O=>O.etapes.length),0),[p]);te.useEffect(()=>{var O;(O=o.current)==null||O.afficher(v)},[v]),te.useEffect(()=>{var O;(O=o.current)==null||O.definirCouches(C)},[C]),te.useEffect(()=>{if(!h)return;let O=performance.now(),$;const D=W=>{const Q=Math.max(0,(W-O)/1e3);O=W,g(ae=>{const ye=ae+Q*y;return ye>=T?(_(!1),T):ye}),$=requestAnimationFrame(D)};return $=requestAnimationFrame(D),()=>cancelAnimationFrame($)},[h,y,T]);const M=Math.max(0,Math.floor(v+1e-6)),L=O=>{_(!1),g($=>Math.max(0,Math.min(T,O>0?Math.floor($+1e-6)+1:Math.ceil($-1e-6)-1)))},j=async O=>{var D;const $=(D=O.target.files)==null?void 0:D[0];if($)try{const W=JSON.parse(await $.text());if(W.schema!=="ascent-4130-trace/1")throw new Error("Ce fichier ne suit pas le format ascent-4130-trace/1.");f(W),l("__import"),u("")}catch(W){P(W.message)}};return m.jsxs("div",{className:"lecteur",children:[m.jsxs("div",{className:"lecteur-barre",children:[m.jsxs("label",{children:["Exécution A",m.jsxs("select",{value:a,onChange:O=>l(O.target.value),"data-testid":"choix-a",children:[t.map(O=>m.jsx("option",{value:O.id,children:O.titre},O.id)),d&&m.jsxs("option",{value:"__import",children:["Trace importée : ",d.meta.titre]})]})]}),m.jsxs("label",{children:["Comparer avec B",m.jsxs("select",{value:c,onChange:O=>u(O.target.value),"data-testid":"choix-b",children:[m.jsx("option",{value:"",children:"Aucune"}),t.filter(O=>O.id!==a).map(O=>m.jsx("option",{value:O.id,children:O.titre},O.id))]})]}),r&&m.jsxs("label",{className:"bouton secondaire import",children:["Importer une trace JSON",m.jsx("input",{type:"file",accept:"application/json,.json",onChange:j,hidden:!0})]})]}),b&&m.jsx("p",{className:"erreur",children:b}),m.jsxs("div",{className:"lecteur-corps",children:[m.jsxs("div",{className:"vue3d",ref:s,style:{minHeight:i},"data-testid":"vue3d",children:[m.jsxs("div",{className:"vues",children:[m.jsx("button",{onClick:()=>{var O;return(O=o.current)==null?void 0:O.vue("trois-quarts")},children:"Vue d'ensemble"}),m.jsx("button",{onClick:()=>{var O;return(O=o.current)==null?void 0:O.vue("dessus")},children:"Vue de dessus"}),m.jsx("button",{onClick:()=>{var O;return(O=o.current)==null?void 0:O.vue("robot")},children:"Près du robot"})]}),m.jsx("div",{className:"aide3d",children:"Glisser pour tourner, molette pour zoomer, clic droit pour déplacer"})]}),m.jsxs("aside",{className:"panneau",children:[m.jsx("h4",{children:"Pourquoi cette décision ?"}),m.jsx(m0,{trace:p[0],i:M,titre:(q=p[0])==null?void 0:q.meta.titre,couleur:"#23468C"}),m.jsx(m0,{trace:p[1],i:M,titre:(Z=p[1])==null?void 0:Z.meta.titre,couleur:"#E07B1A"}),m.jsx("h4",{children:"Couches affichées"}),m.jsx("div",{className:"couches",children:uR.map(([O,$])=>m.jsxs("label",{children:[m.jsx("input",{type:"checkbox",checked:C[O],onChange:D=>A({...C,[O]:D.target.checked})}),$]},O))}),m.jsxs("p",{className:"legende3d",children:[m.jsx("span",{style:{color:"#b9ae1c"},children:"■"})," rayons du lidar ",m.jsx("span",{style:{color:"#238C33"},children:"●"})," plan ",m.jsx("span",{style:{color:"#F24141"},children:"◯"})," position mesurée ",m.jsx("span",{style:{color:"#238C33"},children:"◯"})," position estimée ",m.jsx("span",{style:{color:"#ff8a1f"},children:"■"})," croyance"]})]})]}),m.jsxs("div",{className:"transport",children:[m.jsx("button",{onClick:()=>{_(!1),g(0)},title:"Retour à l'état initial","data-testid":"reinit",children:"⏮ Réinitialiser"}),m.jsx("button",{onClick:()=>L(-1),title:"Étape précédente",children:"◀ Étape"}),m.jsx("button",{className:"principal",onClick:()=>{v>=T&&g(0),_(!h)},"data-testid":"lecture",children:h?"⏸ Pause":"▶ Lecture"}),m.jsx("button",{onClick:()=>L(1),title:"Étape suivante","data-testid":"pas",children:"Étape ▶"}),m.jsx("input",{type:"range",min:"0",max:T,step:"0.01",value:v,onChange:O=>{_(!1),g(Number(O.target.value))},"aria-label":"Position dans la trace"}),m.jsxs("span",{className:"compteur",children:["Étape ",Math.min(M,T)," / ",T]}),m.jsxs("label",{className:"vitesse",children:["Vitesse",m.jsxs("select",{value:y,onChange:O=>S(Number(O.target.value)),children:[m.jsx("option",{value:"1",children:"lente"}),m.jsx("option",{value:"3",children:"normale"}),m.jsx("option",{value:"8",children:"rapide"})]})]})]})]})}const hR=["Problème","Animation explicative","Décomposition 3D","Algorithme et code","Notebook","Simulation","Paramètres","Résultats","Synthèse"],fR=[{id:"m3_hybride_entrepot",titre:"Agent hybride, palette imprévue"},{id:"m5_robuste",titre:"Agent robuste, capteurs bruités"},{id:"m3_reactif_piege",titre:"Agent réactif, cul-de-sac en U"}];function g0(){return m.jsxs("div",{className:"page",children:[m.jsx("section",{className:"hero",children:m.jsxs("div",{children:[m.jsx("p",{className:"surtitre",children:"ASCENT, Lot 4, référence 4-130 · 16 et 17 novembre 2026 · 12 heures"}),m.jsxs("h1",{children:["Les agents autonomes",m.jsx("br",{}),"et aide à la décision"]}),m.jsx("p",{className:"chapo",children:"Deux jours pour concevoir, optimiser et valider des agents intelligents, autour d'un fil rouge : un robot autonome dans un entrepôt logistique simulé. Chaque concept est expliqué par une animation, décomposé dans une scène 3D, puis expérimenté dans un notebook Python."}),m.jsxs("div",{className:"actions",children:[m.jsx(sr,{className:"bouton",to:"/module/1",children:"Commencer le jour 1"}),m.jsx(sr,{className:"bouton secondaire",to:"/syllabus",children:"Lire le syllabus officiel"})]}),m.jsxs("ul",{className:"chiffres",children:[m.jsxs("li",{children:[m.jsx("b",{children:"6"})," modules de 2 heures"]}),m.jsxs("li",{children:[m.jsx("b",{children:"62,5 %"})," de travaux pratiques"]}),m.jsxs("li",{children:[m.jsx("b",{children:"6"})," notebooks GPU et CPU"]}),m.jsxs("li",{children:[m.jsx("b",{children:"17"})," traces rejouables en 3D"]})]})]})}),m.jsxs("section",{children:[m.jsx("h2",{children:"Le fil rouge en action"}),m.jsx("p",{className:"intro",children:"Le robot perçoit par son lidar (rayons jaunes), suit un plan (pastilles vertes) et le révise quand un obstacle imprévu apparaît. Lancez la lecture, mettez en pause, avancez étape par étape : le panneau de droite explique chaque décision."}),m.jsx(Ep,{catalogue:fR,initialA:"m3_hybride_entrepot",hauteur:460})]}),m.jsxs("section",{children:[m.jsx("h2",{children:"Programme"}),[1,2].map(t=>m.jsxs("div",{children:[m.jsxs("h3",{className:"jour",children:["Jour ",t," : ",t===1?"Introduction aux agents intelligents et solutions IA":"Optimisation et autonomie des systèmes robotisés"," ",m.jsx("small",{children:"6 heures"})]}),m.jsx("div",{className:"cartes",children:eo.filter(e=>e.jour===t).map(e=>m.jsxs(sr,{to:`/module/${e.n}`,className:"carte module",children:[m.jsxs("span",{className:"numero",children:["Module ",e.n]}),m.jsx("h4",{children:e.titre}),m.jsx("p",{children:e.court}),m.jsx("span",{className:"horaire",children:e.horaire})]},e.n))})]},t))]}),m.jsxs("section",{children:[m.jsx("h2",{children:"Le cycle de chaque module"}),m.jsx("p",{className:"intro",children:"Chaque module dure 2 heures : 45 minutes d'explications et de démonstrations, puis 75 minutes de travaux pratiques. Tous suivent le même cycle."}),m.jsx("ol",{className:"cycle",children:hR.map((t,e)=>m.jsxs("li",{children:[m.jsx("span",{children:e+1}),t]},t))})]}),m.jsxs("section",{className:"deux-colonnes",children:[m.jsxs("div",{className:"carte",children:[m.jsx("h3",{children:"Trois supports synchronisés"}),m.jsxs("p",{children:["Notebooks, animations et scènes 3D partagent les mêmes exemples et un format commun de traces. Une expérience lancée dans un notebook produit un fichier JSON que l'",m.jsx(sr,{to:"/atelier",children:"atelier 3D"})," rejoue étape par étape."]})]}),m.jsxs("div",{className:"carte",children:[m.jsx("h3",{children:"GPU quand il sert, CPU toujours"}),m.jsx("p",{children:"Les notebooks détectent le GPU et l'utilisent pour l'apprentissage, l'inférence et les simulations parallèles. Tout reste exécutable sur CPU, et les résultats pré-calculés sont embarqués dans chaque notebook."})]})]})]})}function Po(t){const[e,n]=te.useState({donnees:null,erreur:null});return te.useEffect(()=>{let i=!1;return fetch(t).then(r=>{if(!r.ok)throw new Error(`${t} : ${r.status}`);return r.json()}).then(r=>{i||n({donnees:r,erreur:null})}).catch(r=>{i||n({donnees:null,erreur:r.message})}),()=>{i=!0}},[t]),e}function pR({monde:t,x:e=0,y:n=0,c:i=20,children:r}){return m.jsxs("g",{transform:`translate(${e} ${n})`,children:[m.jsx("rect",{width:t.largeur*i,height:t.hauteur*i,fill:"var(--plan-sol)",rx:"4"}),t.murs.map(([s,o])=>m.jsx("rect",{x:s*i,y:o*i,width:i,height:i,fill:"var(--plan-mur)"},`m${s}-${o}`)),t.rayonnages.map(([s,o])=>m.jsx("rect",{x:s*i+1.5,y:o*i+1.5,width:i-3,height:i-3,rx:"2",fill:"#8A93A6"},`r${s}-${o}`)),r]})}const aa=(t,e=20)=>[t[0]*e+e/2,t[1]*e+e/2],mR=(t,e=20)=>t.map(n=>aa(n,e).join(",")).join(" ");function N_({nb:t}){return m.jsxs("div",{className:"actions",children:[m.jsx("a",{className:"bouton",href:`notebooks/${t}.html`,target:"_blank",rel:"noreferrer",children:"Lire le notebook exécuté"}),m.jsx("a",{className:"bouton secondaire",href:`notebooks/${t}.ipynb`,download:!0,children:"Télécharger le fichier .ipynb"}),m.jsx("a",{className:"bouton secondaire",href:DE(t),target:"_blank",rel:"noreferrer",children:"Ouvrir dans Colab"})]})}function gR(){return m.jsxs("div",{className:"page",children:[m.jsx("p",{className:"surtitre",children:"Travaux pratiques"}),m.jsx("h1",{children:"Notebooks"}),m.jsx("p",{className:"intro",children:"Six notebooks Jupyter, un par module. Chacun s'exécute du début à la fin, détecte le GPU, fonctionne aussi sur CPU, fixe ses graines aléatoires et embarque ses résultats pré-calculés."}),m.jsxs("div",{className:"carte",children:[m.jsx("h3",{children:"Installation"}),m.jsxs("p",{children:["Sur un poste équipé de Docker, depuis le dépôt : ",m.jsx("code",{children:"./runDev.sh"})," lance JupyterLab sur le port 8888 et ce site sur le port 5173, sans aucune autre installation."]}),m.jsx("p",{children:"Sur Colab ou un autre environnement, la première cellule de chaque notebook installe la bibliothèque de la formation :"}),m.jsx("pre",{children:m.jsx("code",{children:'pip install "ascent-agents[complet] @ https://martinobettucci.github.io/4-120/dist/ascent_agents-1.0.0-py3-none-any.whl"'})}),m.jsxs("p",{children:["Dépendances : Python 3.10 ou plus, NumPy, Matplotlib, PyTorch, OR-Tools, SciPy, pandas. Les versions exactes sont figées dans ",m.jsx("code",{children:"docker/requirements.txt"}),"."]})]}),eo.map(t=>m.jsxs("div",{className:"carte notebook",children:[m.jsxs("span",{className:"numero",children:["Module ",t.n," · Jour ",t.jour]}),m.jsx("h3",{children:t.titre}),m.jsx("ul",{children:t.notebookPoints.map(e=>m.jsx("li",{children:e},e))}),m.jsx(N_,{nb:t.notebook})]},t.n))]})}function Lo({titre:t,etapes:e,duree:n=5,children:i,hauteur:r}){const[s,o]=te.useState(0),[a,l]=te.useState(0),[c,u]=te.useState(!1),d=te.useRef(null),f=te.useRef({etape:0,p:0});f.current={etape:s,p:a},te.useEffect(()=>{if(!c)return;let v=performance.now(),g;const h=_=>{const y=Math.max(0,(_-v)/1e3);v=_;const S=e[f.current.etape].duree||n;let C=f.current.p+y/S;C>=1&&(f.current.etape<e.length-1?C>=1.25&&(o(f.current.etape+1),C=0):(C=1,u(!1))),l(C),g=requestAnimationFrame(h)};return g=requestAnimationFrame(h),()=>cancelAnimationFrame(g)},[c,e,n]);const p=v=>{o(Math.max(0,Math.min(e.length-1,v))),l(0)},x=v=>{v.key==="ArrowRight"&&(u(!1),p(s+1),l(1)),v.key==="ArrowLeft"&&(u(!1),p(s-1),l(1)),v.key===" "&&(v.preventDefault(),u(g=>!g))};return m.jsxs("figure",{className:"animation",tabIndex:0,onKeyDown:x,ref:d,children:[m.jsxs("figcaption",{children:[m.jsx("span",{className:"etiquette-anim",children:"Animation"}),m.jsx("strong",{children:t}),m.jsxs("span",{className:"anim-etape",children:[s+1," / ",e.length]})]}),m.jsx("div",{className:"anim-scene",style:r?{minHeight:r}:void 0,children:i(s,Math.min(a,1))}),m.jsxs("div",{className:"anim-texte",children:[m.jsx("h5",{children:e[s].titre}),m.jsx("p",{children:e[s].texte})]}),m.jsxs("div",{className:"anim-commandes",children:[m.jsx("button",{onClick:()=>{u(!1),p(0)},title:"Rejouer depuis le début",children:"⏮"}),m.jsx("button",{onClick:()=>{u(!1),p(s-1),l(1)},disabled:s===0,children:"◀"}),m.jsx("button",{className:"principal",onClick:()=>{s===e.length-1&&a>=1?p(0):a>=1&&p(s+1),u(!c)},children:c?"⏸ Pause":"▶ Lecture"}),m.jsx("button",{onClick:()=>{u(!1),p(s+1),l(1)},disabled:s===e.length-1,children:"▶"}),m.jsx("div",{className:"anim-points",children:e.map((v,g)=>m.jsx("button",{className:g===s?"actif":g<s?"vu":"",onClick:()=>{u(!1),p(g),l(1)},title:v.titre,"aria-label":v.titre},v.titre))})]})]})}const xt=(t,e,n)=>Math.max(0,Math.min(1,(t-e)/(n-e))),So=t=>t*t*(3-2*t),Y={bleu:"#23468C",vert:"#238C33",jaune:"#D9CF4A",rouge:"#F24141",noir:"#0D0D0D",gris:"#8A93A6",orange:"#E07B1A"};function or({points:t,p:e,couleur:n=Y.jaune,r:i=7}){if(e<=0||e>=1)return null;const r=t.slice(1).map((a,l)=>Math.hypot(a[0]-t[l][0],a[1]-t[l][1])),s=r.reduce((a,l)=>a+l,0);let o=e*s;for(let a=0;a<r.length;a++){if(o<=r[a]){const l=o/r[a];return m.jsx("circle",{cx:t[a][0]+(t[a+1][0]-t[a][0])*l,cy:t[a][1]+(t[a+1][1]-t[a][1])*l,r:i,fill:n,stroke:"#0D0D0D",strokeWidth:"1.5"})}o-=r[a]}return null}function rn({x:t,y:e,w:n,h:i,texte:r,sous:s,couleur:o=Y.bleu,actif:a=!0,plein:l=!1}){return m.jsxs("g",{opacity:a?1:.22,style:{transition:"opacity .4s"},children:[m.jsx("rect",{x:t,y:e,width:n,height:i,rx:"10",fill:l?o:"var(--carte)",stroke:o,strokeWidth:"2.5"}),m.jsx("text",{x:t+n/2,y:e+i/2+(s?-4:5),textAnchor:"middle",fontSize:"15",fontWeight:"700",fill:l?"#fff":"var(--texte)",children:r}),s&&m.jsx("text",{x:t+n/2,y:e+i/2+15,textAnchor:"middle",fontSize:"11.5",fill:l?"#fff":"var(--texte-doux)",children:s})]})}function Vt({de:t,a:e,couleur:n=Y.gris,actif:i=!0,pointille:r=!1}){const s=`f${n.replace("#","")}`;return m.jsxs("g",{opacity:i?1:.2,style:{transition:"opacity .4s"},children:[m.jsx("defs",{children:m.jsx("marker",{id:s,viewBox:"0 0 10 10",refX:"9",refY:"5",markerWidth:"7",markerHeight:"7",orient:"auto-start-reverse",children:m.jsx("path",{d:"M0 0 L10 5 L0 10 z",fill:n})})}),m.jsx("line",{x1:t[0],y1:t[1],x2:e[0],y2:e[1],stroke:n,strokeWidth:"2.5",markerEnd:`url(#${s})`,strokeDasharray:r?"6 5":void 0})]})}const vR=[{titre:"Un même problème, trois approches",texte:"Le superviseur du robot doit choisir une action à partir de quelques mesures. Les trois approches du module reçoivent exactement la même entrée : choisissez un cas dans la liste pour la faire varier."},{titre:"Système à base de règles",texte:"Des règles écrites par un expert sont évaluées dans l'ordre. La première règle déclenchée fixe la décision. Le raisonnement est entièrement lisible, mais chaque seuil est figé à l'écriture."},{titre:"Réseau bayésien",texte:"Les mesures sont des indices qui modifient la probabilité de causes cachées (usure, capteur encrassé, panne). L'inférence propage l'information le long des arcs : la décision repose sur des probabilités, pas sur des seuils."},{titre:"Apprentissage supervisé",texte:"Un réseau de neurones entraîné sur des exemples étiquetés associe directement les mesures à une décision. Il capte des régularités que personne n'a écrites, au prix d'une explication moins directe."},{titre:"Comparer avant de choisir",texte:"Sur ce cas, les trois approches sont confrontées à la décision de référence. L'exactitude globale, mesurée sur le jeu de test du notebook 01, complète la comparaison."}],xR={temperature:"température",distance_obstacle:"distance obstacle",bruit_capteur:"bruit capteur"},lf=t=>t==null?"n.c.":String(t);function _R({cas:t,variables:e}){const n=Object.keys(t.entree);return m.jsxs("g",{children:[m.jsxs("text",{x:"20",y:"34",fontSize:"14",fontWeight:"700",fill:"var(--texte)",children:["Entrée : ",t.libelle]}),n.map((i,r)=>{const s=e.find(c=>c.nom===i)||{min:0,max:100,unite:""},o=Number(t.entree[i]),a=Math.max(0,Math.min(1,(o-s.min)/(s.max-s.min||1))),l=62+r*46;return m.jsxs("g",{children:[m.jsx("text",{x:"20",y:l,fontSize:"12.5",fill:"var(--texte-doux)",children:xR[i]||i.replaceAll("_"," ")}),m.jsx("rect",{x:"20",y:l+7,width:"190",height:"10",rx:"5",fill:"var(--plan-sol)"}),m.jsx("rect",{x:"20",y:l+7,width:190*a,height:"10",rx:"5",fill:Y.bleu}),m.jsxs("text",{x:"218",y:l+17,fontSize:"12.5",fontWeight:"700",fill:"var(--texte)",children:[Number.isInteger(o)?o:o.toFixed(1)," ",s.unite||""]})]},i)})]})}function wp({titre:t,decision:e,reference:n,x:i,y:r,visible:s=1}){const o=e===n;return m.jsxs("g",{opacity:s,children:[m.jsx("rect",{x:i,y:r,width:"560",height:"44",rx:"10",fill:o?Y.vert:Y.rouge}),m.jsxs("text",{x:i+16,y:r+28,fontSize:"15",fontWeight:"700",fill:"#fff",children:[t," : ",lf(e)]})]})}function yR({donnees:t,cas:e,p:n}){const i=t.regles.slice(0,7),r=e.regles.declenchees||[];return m.jsxs("g",{children:[i.map((s,o)=>{const a=xt(n,o*.1,o*.1+.08),l=r.includes(s.id);return m.jsxs("g",{opacity:.25+.75*a,children:[m.jsx("rect",{x:"310",y:30+o*44,width:"560",height:"36",rx:"8",fill:l&&a>.9?Y.jaune:"var(--carte)",stroke:l&&a>.9?Y.noir:"var(--bord)",strokeWidth:"1.5"}),m.jsxs("text",{x:"324",y:53+o*44,fontSize:"12.5",fill:l&&a>.9?"#0D0D0D":"var(--texte)",children:[m.jsx("tspan",{fontWeight:"700",children:s.id}),"  si ",s.condition," → ",s.decision]})]},s.id)}),m.jsx(wp,{titre:"Décision des règles",decision:e.regles.decision,reference:e.regles.decision,x:310,y:360,visible:xt(n,.8,.95)})]})}function SR({donnees:t,cas:e,p:n}){const{noeuds:i,arcs:r}=t.reseau,s={},o=(u,d=0)=>{if(s[u]!==void 0||d>20)return s[u]||0;const f=r.filter(p=>p[1]===u).map(p=>p[0]);return s[u]=f.length?1+Math.max(...f.map(p=>o(p,d+1))):0,s[u]};i.forEach(u=>o(u.id));const a=Math.max(...Object.values(s))+1,l={};for(let u=0;u<a;u++){const d=i.filter(f=>s[f.id]===u);d.forEach((f,p)=>{l[f.id]=[310+(p+.5)*560/d.length,60+u*250/Math.max(1,a-1)]})}const c=e.bayes.posterieurs||{};return m.jsxs("g",{children:[r.map(([u,d],f)=>{const p=xt(n,.1+f*.04,.3+f*.04);return m.jsx("line",{x1:l[u][0],y1:l[u][1]+22,x2:l[u][0]+(l[d][0]-l[u][0])*p,y2:l[u][1]+22+(l[d][1]-22-l[u][1]-22)*p,stroke:Y.gris,strokeWidth:"2"},`${u}-${d}`)}),i.map(u=>{const d=c[u.id],f=So(xt(n,.35,.8));return m.jsxs("g",{children:[m.jsx("rect",{x:l[u.id][0]-62,y:l[u.id][1]-22,width:"124",height:"44",rx:"22",fill:"var(--carte)",stroke:Y.bleu,strokeWidth:"2"}),m.jsx("text",{x:l[u.id][0],y:l[u.id][1]-3,textAnchor:"middle",fontSize:"11.5",fontWeight:"700",fill:"var(--texte)",children:u.libelle}),d!==void 0&&m.jsxs(m.Fragment,{children:[m.jsx("rect",{x:l[u.id][0]-46,y:l[u.id][1]+5,width:"92",height:"7",rx:"3.5",fill:"var(--plan-sol)"}),m.jsx("rect",{x:l[u.id][0]-46,y:l[u.id][1]+5,width:92*d*f,height:"7",rx:"3.5",fill:d>.5?Y.rouge:Y.orange}),m.jsxs("text",{x:l[u.id][0]+70,y:l[u.id][1]+5,fontSize:"11.5",fontWeight:"700",fill:"var(--texte)",opacity:f,children:[Math.round(d*100)," %"]})]})]},u.id)}),m.jsx(wp,{titre:"Décision bayésienne",decision:e.bayes.decision,reference:e.bayes.decision,x:310,y:360,visible:xt(n,.8,.95)})]})}function MR({cas:t,p:e}){const n=Object.entries(t.supervise.probabilites||{}),r=[Object.keys(t.entree).length,6,6,n.length],s=[330,430,530,630],o=(a,l)=>190+(l-(a-1)/2)*42;return m.jsxs("g",{children:[r.slice(0,-1).map((a,l)=>Array.from({length:a},(c,u)=>Array.from({length:r[l+1]},(d,f)=>m.jsx("line",{x1:s[l],y1:o(a,u),x2:s[l+1],y2:o(r[l+1],f),stroke:Y.gris,strokeWidth:"1",opacity:.12+.5*xt(e,l*.2,l*.2+.2)*((u*7+f*3+l)%5/5)},`${l}-${u}-${f}`)))),r.map((a,l)=>Array.from({length:a},(c,u)=>m.jsx("circle",{cx:s[l],cy:o(a,u),r:"11",fill:xt(e,l*.2-.05,l*.2+.1)>.5?Y.bleu:"var(--carte)",stroke:Y.bleu,strokeWidth:"2"},`${l}-${u}`))),n.map(([a,l],c)=>{const u=So(xt(e,.6,.9));return m.jsxs("g",{children:[m.jsx("text",{x:"662",y:o(n.length,c)-6,fontSize:"12",fill:"var(--texte)",children:a}),m.jsx("rect",{x:"662",y:o(n.length,c),width:"150",height:"9",rx:"4.5",fill:"var(--plan-sol)"}),m.jsx("rect",{x:"662",y:o(n.length,c),width:150*l*u,height:"9",rx:"4.5",fill:a===t.supervise.decision?Y.vert:Y.gris}),m.jsxs("text",{x:"820",y:o(n.length,c)+9,fontSize:"12",fontWeight:"700",fill:"var(--texte)",opacity:u,children:[Math.round(l*100)," %"]})]},a)}),m.jsx(wp,{titre:"Décision du modèle",decision:t.supervise.decision,reference:t.supervise.decision,x:310,y:360,visible:xt(e,.85,.97)})]})}function ER({donnees:t,cas:e,p:n}){const i=[["Règles",e.regles.decision,t.scores.regles],["Réseau bayésien",e.bayes.decision,t.scores.bayes],["Apprentissage supervisé",e.supervise.decision,t.scores.supervise]];return m.jsxs("g",{children:[m.jsxs("text",{x:"310",y:"52",fontSize:"14",fill:"var(--texte)",children:["Décision de référence : ",m.jsx("tspan",{fontWeight:"700",children:lf(e.reference)})]}),i.map(([r,s,o],a)=>{const l=xt(n,a*.2,a*.2+.2),c=s===e.reference;return m.jsxs("g",{opacity:l,children:[m.jsx("rect",{x:"310",y:80+a*84,width:"560",height:"66",rx:"10",fill:"var(--carte)",stroke:c?Y.vert:Y.rouge,strokeWidth:"2.5"}),m.jsx("text",{x:"326",y:108+a*84,fontSize:"15",fontWeight:"700",fill:"var(--texte)",children:r}),m.jsxs("text",{x:"326",y:130+a*84,fontSize:"13",fill:c?Y.vert:Y.rouge,children:[lf(s)," (",c?"conforme à la référence":"différent de la référence",")"]}),m.jsx("text",{x:"854",y:118+a*84,textAnchor:"end",fontSize:"13",fill:"var(--texte-doux)",children:"exactitude globale"}),m.jsx("text",{x:"854",y:136+a*84,textAnchor:"end",fontSize:"15",fontWeight:"700",fill:"var(--texte)",children:o?`${Math.round(o.exactitude*100)} %`:"n.c."})]},r)})]})}function wR(){const{donnees:t,erreur:e}=Po("data/m1_decision.json"),[n,i]=te.useState(0);if(e)return m.jsxs("p",{className:"erreur",children:["Données de l'animation indisponibles (",e,")."]});if(!t)return m.jsx("p",{children:"Chargement…"});const r=t.cas[n];return m.jsxs("div",{children:[m.jsxs("label",{className:"choix-cas",children:["Cas étudié",m.jsx("select",{value:n,onChange:s=>i(Number(s.target.value)),children:t.cas.map((s,o)=>m.jsx("option",{value:o,children:s.libelle},s.id))})]}),m.jsx(Lo,{titre:"Trois façons de décider",etapes:vR,duree:7,children:(s,o)=>m.jsxs("svg",{viewBox:"0 0 900 430",role:"img","aria-label":"Comparaison de trois approches de décision",children:[m.jsx(_R,{cas:r,variables:t.variables}),m.jsx("line",{x1:"290",y1:"20",x2:"290",y2:"410",stroke:"var(--bord)"}),s===0&&m.jsx("text",{x:"590",y:"210",textAnchor:"middle",fontSize:"16",fill:"var(--texte-doux)",children:"Règles, réseau bayésien, apprentissage supervisé"}),s===1&&m.jsx(yR,{donnees:t,cas:r,p:o}),s===2&&m.jsx(SR,{donnees:t,cas:r,p:o}),s===3&&m.jsx(MR,{cas:r,p:o}),s===4&&m.jsx(ER,{donnees:t,cas:r,p:o})]})})]})}const TR=[{titre:"Un agent, un environnement",texte:"Un agent intelligent est un système qui perçoit son environnement par des capteurs et agit sur lui par des effecteurs. Ici, le robot de l'entrepôt : son environnement contient des rayonnages, des chariots et un objectif."},{titre:"Percevoir : les capteurs",texte:"Le lidar mesure huit distances autour du robot. Cette observation est tout ce que l'agent connaît du monde à cet instant : il ne voit ni la carte complète ni ce qui se trouve derrière un rayonnage."},{titre:"Décider",texte:"Le module de décision transforme l'observation en action. Sa forme varie : table de règles, planificateur, politique apprise. C'est le sujet du module 3."},{titre:"Agir : les effecteurs",texte:"L'action choisie est transmise aux roues. L'environnement change : le robot avance d'une cellule, les chariots se déplacent aussi."},{titre:"État réel et état observé",texte:"L'agent ne décide jamais sur l'état réel, seulement sur ce que ses capteurs rapportent. Un rayon perdu ou une distance bruitée suffit à créer un écart : ici le lidar annonce un obstacle une cellule trop loin."},{titre:"La boucle se répète",texte:"Perception, décision, action : la boucle tourne à chaque pas de temps. La qualité d'un agent se mesure sur la durée, pas sur une décision isolée."}],Mn={envH:[260,170],cap:[600,110],dec:[710,215],act:[600,320],envB:[260,290]};function bR({robotX:t,obstacleObserve:e}){return m.jsxs("g",{transform:"translate(62 150)",children:[[0,1,2,3,4].map(i=>[0,1,2].map(r=>m.jsx("rect",{x:i*36,y:r*36,width:34,height:34,rx:"4",fill:"var(--plan-sol)"},`${i}-${r}`))),m.jsx("rect",{x:3*36,y:36,width:34,height:34,rx:"4",fill:Y.gris}),e!==null&&m.jsx("rect",{x:(3+e)*36,y:36,width:34,height:34,rx:"4",fill:"none",stroke:Y.rouge,strokeWidth:"3",strokeDasharray:"5 4"}),m.jsx("rect",{x:4*36+6,y:2*36+6,width:22,height:22,rx:"4",fill:Y.vert}),m.jsx("line",{x1:t*36+36/2,y1:36+36/2,x2:3*36,y2:36+36/2,stroke:Y.jaune,strokeWidth:"3"}),m.jsx("circle",{cx:t*36+36/2-1,cy:36+36/2-1,r:"12",fill:Y.bleu,stroke:"#fff",strokeWidth:"2"})]})}function AR(){return m.jsx(Lo,{titre:"La boucle perception, décision, action",etapes:TR,duree:6,children:(t,e)=>{const n=s=>t>=s,i=t===5?e*2%1:0,r=t===3?So(xt(e,.55,.95)):t>3?1:0;return m.jsxs("svg",{viewBox:"0 0 900 430",role:"img","aria-label":"Schéma de la boucle perception, décision, action",children:[m.jsx(rn,{x:40,y:110,w:240,h:220,texte:"",couleur:Y.noir}),m.jsx("text",{x:"160",y:"136",textAnchor:"middle",fontWeight:"700",fontSize:"15",fill:"var(--texte)",children:"Environnement (état réel)"}),m.jsx(bR,{robotX:r,obstacleObserve:t===4?So(xt(e,.2,.6)):null}),m.jsx(rn,{x:500,y:60,w:360,h:320,texte:"",couleur:Y.bleu}),m.jsx("text",{x:"680",y:"52",textAnchor:"middle",fontWeight:"700",fontSize:"15",fill:Y.bleu,children:"Agent"}),m.jsx(rn,{x:530,y:80,w:150,h:60,texte:"Capteurs",sous:"lidar, 8 rayons",couleur:"#9a8f00",actif:n(1)}),m.jsx(rn,{x:640,y:185,w:190,h:60,texte:"Décision",sous:"règles, plan ou politique",couleur:Y.bleu,actif:n(2),plein:t===2}),m.jsx(rn,{x:530,y:290,w:150,h:60,texte:"Effecteurs",sous:"roues motrices",couleur:Y.vert,actif:n(3)}),m.jsx(Vt,{de:[282,170],a:[528,110],couleur:"#9a8f00",actif:n(1)}),m.jsx("text",{x:"400",y:"122",textAnchor:"middle",fontSize:"13",fill:"var(--texte-doux)",opacity:n(1)?1:.2,children:"observation"}),m.jsx(Vt,{de:[682,118],a:[720,183],couleur:Y.bleu,actif:n(2)}),m.jsx(Vt,{de:[720,247],a:[682,310],couleur:Y.bleu,actif:n(3)}),m.jsx(Vt,{de:[528,320],a:[282,290],couleur:Y.vert,actif:n(3)}),m.jsx("text",{x:"400",y:"328",textAnchor:"middle",fontSize:"13",fill:"var(--texte-doux)",opacity:n(3)?1:.2,children:"action"}),t===1&&m.jsx(or,{points:[Mn.envH,Mn.cap],p:e}),t===2&&m.jsx(or,{points:[Mn.cap,Mn.dec],p:e,couleur:Y.bleu}),t===3&&m.jsx(or,{points:[Mn.dec,Mn.act,Mn.envB],p:xt(e,0,.55),couleur:Y.vert}),t===5&&m.jsx(or,{points:[Mn.envH,Mn.cap,Mn.dec,Mn.act,Mn.envB,Mn.envH],p:Math.max(.001,Math.min(.999,i))}),t===1&&m.jsx("text",{x:"605",y:"165",textAnchor:"middle",fontSize:"13",fill:"#7a6f00",opacity:xt(e,.6,.9),children:"N 2 · E 3 · S 1 · O 6 …"}),t===2&&m.jsx("text",{x:"735",y:"272",textAnchor:"middle",fontSize:"13",fill:Y.bleu,opacity:xt(e,.6,.9),children:"« voie libre à l'est : avancer »"}),t===4&&m.jsxs("g",{opacity:xt(e,.5,.9),children:[m.jsx("text",{x:"160",y:"368",textAnchor:"middle",fontSize:"13",fill:Y.rouge,children:"pointillés : obstacle tel que le capteur le situe"}),m.jsx("text",{x:"160",y:"388",textAnchor:"middle",fontSize:"13",fill:"var(--texte-doux)",children:"gris : obstacle réel"})]})]})}})}const CR=[{titre:"Architecture réactive",texte:"Les capteurs sont reliés aux effecteurs par des règles stimulus, réponse. Aucune carte, aucun plan : la réaction est immédiate et peu coûteuse, mais l'agent reste prisonnier des minimums locaux, comme un cul-de-sac."},{titre:"Architecture délibérative",texte:"L'agent entretient un modèle du monde, calcule un plan complet (ici avec A*) puis l'exécute. Il anticipe et trouve le chemin optimal, à condition que le monde ressemble encore au modèle au moment d'agir."},{titre:"Architecture hybride",texte:"Deux couches coopèrent. La couche délibérative fixe le cap à long terme, la couche réactive garde le dernier mot à court terme : si le lidar contredit le plan, elle bloque le mouvement et demande une replanification."},{titre:"Mêmes scénarios, trois comportements",texte:"Les trois architectures ont été exécutées sur les mêmes scénarios, avec les mêmes graines aléatoires. Ces chiffres proviennent des traces rejouables dans la scène 3D ci-dessous et du notebook 03."}];function RR({index:t}){const e=["reactif","deliberatif","hybride"],n={reactif:"Réactive",deliberatif:"Délibérative",hybride:"Hybride"},i=r=>{const s=t.find(o=>o.id===r);return s?m.jsxs("td",{className:s.succes?"ok":"ko",children:[s.succes?"réussite":"échec",", ",s.etapes," étapes, ",s.collisions," collision(s)"]}):m.jsx("td",{children:"n.c."})};return m.jsxs("table",{className:"tableau compact",children:[m.jsx("thead",{children:m.jsxs("tr",{children:[m.jsx("th",{children:"Architecture"}),m.jsx("th",{children:"Cul-de-sac en U"}),m.jsx("th",{children:"Entrepôt avec palette imprévue"})]})}),m.jsx("tbody",{children:e.map(r=>m.jsxs("tr",{children:[m.jsx("th",{children:n[r]}),i(`m3_${r}_piege`),i(`m3_${r}_entrepot`)]},r))})]})}function PR(){const{donnees:t}=Po("traces/index.json");return m.jsx(Lo,{titre:"Trois architectures d'agents",etapes:CR,duree:7,children:(e,n)=>{if(e===3)return m.jsx("div",{className:"anim-html",children:t?m.jsx(RR,{index:t}):m.jsx("p",{children:"Chargement des résultats…"})});const i=n*2.2%1,r=Math.max(.001,Math.min(.999,i));return m.jsxs("svg",{viewBox:"0 0 900 430",role:"img","aria-label":"Flux de traitement des architectures d'agents",children:[m.jsx(rn,{x:30,y:185,w:130,h:60,texte:"Capteurs",couleur:"#9a8f00"}),m.jsx(rn,{x:740,y:185,w:130,h:60,texte:"Effecteurs",couleur:Y.vert}),e===0&&m.jsxs(m.Fragment,{children:[m.jsx(rn,{x:340,y:175,w:220,h:80,texte:"Règles",sous:"si obstacle devant, contourner",couleur:Y.rouge,plein:!0}),m.jsx(Vt,{de:[162,215],a:[338,215],couleur:Y.rouge}),m.jsx(Vt,{de:[562,215],a:[738,215],couleur:Y.rouge}),m.jsx(or,{points:[[160,215],[740,215]],p:r,couleur:Y.rouge}),m.jsx("text",{x:"450",y:"300",textAnchor:"middle",fontSize:"14",fill:"var(--texte-doux)",children:"Temps de réaction : minimal. Mémoire : aucune."})]}),e===1&&m.jsxs(m.Fragment,{children:[m.jsx(rn,{x:210,y:70,w:150,h:60,texte:"Modèle du monde",sous:"carte de l'entrepôt",couleur:Y.bleu,actif:n>.05}),m.jsx(rn,{x:390,y:70,w:150,h:60,texte:"Planification",sous:"A* vers l'objectif",couleur:Y.bleu,plein:!0,actif:n>.2}),m.jsx(rn,{x:570,y:70,w:150,h:60,texte:"Exécution",sous:"suivi du plan",couleur:Y.bleu,actif:n>.35}),m.jsx(Vt,{de:[95,183],a:[240,132],couleur:Y.bleu}),m.jsx(Vt,{de:[362,100],a:[388,100],couleur:Y.bleu}),m.jsx(Vt,{de:[542,100],a:[568,100],couleur:Y.bleu}),m.jsx(Vt,{de:[690,132],a:[805,183],couleur:Y.bleu}),m.jsx(or,{points:[[95,185],[285,100],[465,100],[645,100],[805,185]],p:Math.max(.001,Math.min(.999,n*1.1%1)),couleur:Y.bleu}),m.jsx("text",{x:"450",y:"300",textAnchor:"middle",fontSize:"14",fill:"var(--texte-doux)",children:"Chemin optimal, mais décision plus lente et plan fragile face à l'imprévu."})]}),e===2&&m.jsxs(m.Fragment,{children:[m.jsx("rect",{x:195,y:45,width:540,height:110,rx:"14",fill:"none",stroke:Y.bleu,strokeDasharray:"6 5",strokeWidth:"2"}),m.jsx("text",{x:"210",y:"38",fontSize:"13",fontWeight:"700",fill:Y.bleu,children:"Couche délibérative (lente, voit loin)"}),m.jsx(rn,{x:215,y:70,w:150,h:60,texte:"Modèle",couleur:Y.bleu}),m.jsx(rn,{x:390,y:70,w:150,h:60,texte:"Planification",couleur:Y.bleu,plein:!0}),m.jsx(rn,{x:565,y:70,w:150,h:60,texte:"Plan courant",couleur:Y.bleu}),m.jsx("rect",{x:195,y:275,width:540,height:110,rx:"14",fill:"none",stroke:Y.rouge,strokeDasharray:"6 5",strokeWidth:"2"}),m.jsx("text",{x:"210",y:"405",fontSize:"13",fontWeight:"700",fill:Y.rouge,children:"Couche réactive (rapide, voit près)"}),m.jsx(rn,{x:340,y:300,w:250,h:60,texte:"Garde de sécurité",sous:"le lidar confirme ou bloque",couleur:Y.rouge,plein:xt(n,.45,.5)>0&&n<.8}),m.jsx(Vt,{de:[95,183],a:[240,132],couleur:Y.bleu}),m.jsx(Vt,{de:[367,100],a:[388,100],couleur:Y.bleu}),m.jsx(Vt,{de:[542,100],a:[563,100],couleur:Y.bleu}),m.jsx(Vt,{de:[640,132],a:[500,298],couleur:Y.bleu}),m.jsx(Vt,{de:[95,247],a:[338,325],couleur:Y.rouge}),m.jsx(Vt,{de:[592,330],a:[790,247],couleur:Y.vert}),m.jsx(Vt,{de:[420,298],a:[450,132],couleur:Y.rouge,pointille:!0,actif:n>.5}),m.jsx("text",{x:"350",y:"222",fontSize:"12.5",fill:Y.rouge,opacity:n>.5?1:.15,children:"obstacle imprévu : replanifier"}),m.jsx(or,{points:[[95,185],[290,100],[640,100],[470,330],[805,245]],p:xt(n,0,.45)*.998+.001,couleur:Y.bleu}),m.jsx(or,{points:[[430,300],[455,130]],p:xt(n,.5,.8)*.998+.001,couleur:Y.rouge})]})]})}})}const LR=[{titre:"Un espace de recherche",texte:"Le robot doit visiter toutes les stations de collecte puis revenir au dépôt. Chaque ordre de visite est une solution candidate : avec 9 stations, il en existe 9! = 362 880. Voici un ordre pris au hasard."},{titre:"Des contraintes",texte:"Toutes les solutions ne sont pas admissibles. Certaines stations doivent être visitées avant d'autres (flèches rouges) et d'autres dans une fenêtre de temps (horloges). Une solution courte mais qui ne respecte pas ces contraintes est inutilisable."},{titre:"Le recuit simulé",texte:"À chaque itération, une modification locale est proposée. Si elle améliore le coût, elle est acceptée. Sinon, elle l'est avec la probabilité exp(-Δ / T). Tant que la température T est haute, l'algorithme accepte de dégrader la solution pour sortir des minimums locaux."},{titre:"La convergence",texte:"La température baisse, les dégradations sont de plus en plus rarement acceptées et la tournée se stabilise. La courbe bleue est le coût courant, la verte le meilleur coût rencontré. Ces données sortent du notebook 04."},{titre:"Deux approches, deux garanties",texte:"La programmation sous contraintes (CP-SAT) explore l'espace de façon systématique et peut prouver l'optimalité. Le recuit simulé ne prouve rien mais fournit vite une bonne solution et passe mieux à l'échelle."}],qs=21;function Qo({d:t,ordre:e,couleur:n,chemin:i,opacite:r=1}){const s=Object.fromEntries(t.probleme.stations.map(a=>[a.id,a.pos])),o=i&&i.length?i:[t.probleme.depot,...e.map(a=>s[a]),t.probleme.depot];return m.jsx("polyline",{points:mR(o,qs),fill:"none",stroke:n,strokeWidth:"3",strokeLinejoin:"round",opacity:r})}function DR({d:t,contraintes:e}){const n=Object.fromEntries(t.probleme.stations.map(s=>[s.id,s.pos])),[i,r]=aa(t.probleme.depot,qs);return m.jsxs("g",{children:[e&&t.probleme.precedences.map(([s,o])=>{const[a,l]=aa(n[s],qs),[c,u]=aa(n[o],qs);return m.jsx("line",{x1:a,y1:l,x2:c,y2:u,stroke:Y.rouge,strokeWidth:"2",strokeDasharray:"5 4",markerEnd:"url(#prec)"},`${s}-${o}`)}),m.jsx("rect",{x:i-9,y:r-9,width:"18",height:"18",rx:"3",fill:Y.noir}),m.jsx("text",{x:i+14,y:r+4,fontSize:"11",fontWeight:"700",fill:"#0D0D0D",stroke:"#fff",strokeWidth:"3",paintOrder:"stroke",children:"dépôt"}),t.probleme.stations.map(s=>{const[o,a]=aa(s.pos,qs);return m.jsxs("g",{children:[m.jsx("circle",{cx:o,cy:a,r:"10",fill:Y.jaune,stroke:Y.noir,strokeWidth:"1.5"}),m.jsx("text",{x:o,y:a+4,textAnchor:"middle",fontSize:"11",fontWeight:"700",fill:"#0D0D0D",children:s.id}),e&&s.fenetre&&m.jsxs("text",{x:o+13,y:a-9,fontSize:"10.5",fontWeight:"700",fill:Y.bleu,stroke:"#fff",strokeWidth:"3",paintOrder:"stroke",children:["⏱ ",s.fenetre[0]," à ",s.fenetre[1]]})]},s.id)})]})}function IR({h:t,p:e,x:n=470,y:i=40,w:r=400,ht:s=250}){const o=t[t.length-1].it||1,a=t.flatMap(v=>[v.cout_courant,v.meilleur_cout]),l=Math.min(...a),c=Math.max(...a),u=v=>n+v/o*r,d=v=>i+s-(v-l)/(c-l||1)*s,f=Math.max(2,Math.round(e*t.length)),p=t.slice(0,f),x=Math.max(...t.map(v=>v.temperature));return m.jsxs("g",{children:[m.jsx("rect",{x:n,y:i,width:r,height:s,fill:"var(--carte)",stroke:"var(--bord)"}),m.jsx("polyline",{points:p.map(v=>`${u(v.it)},${i+s-v.temperature/x*s}`).join(" "),fill:"none",stroke:Y.rouge,strokeWidth:"1.5",strokeDasharray:"4 4"}),m.jsx("polyline",{points:p.map(v=>`${u(v.it)},${d(v.cout_courant)}`).join(" "),fill:"none",stroke:Y.bleu,strokeWidth:"1.5"}),m.jsx("polyline",{points:p.map(v=>`${u(v.it)},${d(v.meilleur_cout)}`).join(" "),fill:"none",stroke:Y.vert,strokeWidth:"3"}),m.jsxs("text",{x:n,y:i-10,fontSize:"12.5",fill:"var(--texte)",children:[m.jsx("tspan",{fill:Y.bleu,fontWeight:"700",children:"▬"})," coût courant  ",m.jsx("tspan",{fill:Y.vert,fontWeight:"700",children:"▬"})," meilleur coût  ",m.jsx("tspan",{fill:Y.rouge,fontWeight:"700",children:"┅"})," température"]}),m.jsxs("text",{x:n+r,y:i+s+18,textAnchor:"end",fontSize:"12",fill:"var(--texte-doux)",children:["itération ",p[p.length-1].it," sur ",o]}),m.jsxs("text",{x:n,y:i+s+18,fontSize:"12",fill:"var(--texte-doux)",children:["meilleur coût : ",Math.round(p[p.length-1].meilleur_cout)]})]})}const v0=t=>.55+.3*Math.sin(t*9)*Math.cos(t*2.3)+.35*(t-.7)**2;function NR({p:t}){const s=Array.from({length:101},(l,c)=>`${470+c/100*400},${60+v0(c/100)*210}`).join(" "),o=1-t,a=.12+.6*xt(t,0,.75)+.16*o*Math.sin(t*40);return m.jsxs("g",{children:[m.jsx("polyline",{points:s,fill:"none",stroke:"var(--texte)",strokeWidth:"2.5"}),m.jsx("circle",{cx:470+a*400,cy:60+v0(a)*210-11,r:"10",fill:Y.jaune,stroke:Y.noir,strokeWidth:"2"}),m.jsx("text",{x:470,y:38,fontSize:"12.5",fill:"var(--texte)",children:"Coût des solutions (plus bas : meilleur)"}),m.jsx("rect",{x:470,y:320,width:400,height:"12",rx:"6",fill:"var(--plan-sol)"}),m.jsx("rect",{x:470,y:320,width:400*o,height:"12",rx:"6",fill:Y.rouge}),m.jsxs("text",{x:470,y:312,fontSize:"12.5",fill:"var(--texte)",children:["Température T : ",o.toFixed(2)," (probabilité d'accepter une dégradation Δ = 0,2 : ",Math.round(Math.exp(-.2/Math.max(o,.01))*100)," %)"]})]})}function UR(){const{donnees:t,erreur:e}=Po("data/m4_optimisation.json");if(e)return m.jsxs("p",{className:"erreur",children:["Données de l'animation indisponibles (",e,")."]});if(!t)return m.jsx("p",{children:"Chargement…"});const n=t.recuit.instantanes;return m.jsx(Lo,{titre:"Optimiser une tournée : contraintes et recuit simulé",etapes:LR,duree:8,children:(i,r)=>{const s=Math.min(n.length-1,Math.floor(r*n.length)),o=n[0];return m.jsxs("svg",{viewBox:"0 0 900 430",role:"img","aria-label":"Optimisation de la tournée du robot",children:[m.jsx("defs",{children:m.jsx("marker",{id:"prec",viewBox:"0 0 10 10",refX:"9",refY:"5",markerWidth:"6",markerHeight:"6",orient:"auto",children:m.jsx("path",{d:"M0 0 L10 5 L0 10 z",fill:Y.rouge})})}),m.jsxs(pR,{monde:t.monde,x:20,y:40,c:qs,children:[i<=1&&m.jsx(Qo,{d:t,ordre:o.ordre,couleur:Y.gris}),i===2&&m.jsx(Qo,{d:t,ordre:n[Math.min(n.length-1,Math.floor(r*4))].ordre,couleur:Y.bleu}),i===3&&m.jsx(Qo,{d:t,ordre:n[s].ordre,couleur:Y.bleu}),i===4&&m.jsxs(m.Fragment,{children:[m.jsx(Qo,{d:t,ordre:t.cp_sat.ordre,chemin:t.cp_sat.chemin,couleur:Y.vert}),m.jsx(Qo,{d:t,ordre:t.recuit.ordre,couleur:Y.bleu,opacite:.75})]}),m.jsx(DR,{d:t,contraintes:i>=1})]}),i===0&&m.jsxs("text",{x:"470",y:"180",fontSize:"15",fill:"var(--texte)",children:["Coût de cet ordre aléatoire : ",m.jsx("tspan",{fontWeight:"700",children:Math.round(o.cout)})," pas"]}),i===1&&m.jsxs("g",{fontSize:"14",fill:"var(--texte)",children:[m.jsxs("text",{x:"470",y:"150",children:[t.probleme.precedences.length," précédence(s), ",t.probleme.stations.filter(a=>a.fenetre).length," fenêtre(s) de temps"]}),m.jsxs("text",{x:"470",y:"180",children:["Contraintes non respectées par cet ordre : ",m.jsx("tspan",{fontWeight:"700",fill:Y.rouge,children:o.non_respectees??"n.c."})]})]}),i===2&&m.jsx(NR,{p:r}),i===3&&m.jsx(IR,{h:t.recuit.historique,p:r}),i===3&&m.jsxs("text",{x:"470",y:"352",fontSize:"13",fill:"var(--texte)",children:["Tournée courante : coût ",Math.round(n[s].cout),", contraintes non respectées : ",n[s].non_respectees??0]}),i===4&&m.jsxs("g",{fontSize:"14",fill:"var(--texte)",children:[m.jsx("rect",{x:"470",y:"70",width:"400",height:"92",rx:"10",fill:"var(--carte)",stroke:Y.vert,strokeWidth:"2.5"}),m.jsx("text",{x:"486",y:"98",fontWeight:"700",children:"Programmation sous contraintes (CP-SAT)"}),m.jsxs("text",{x:"486",y:"122",children:["coût ",Math.round(t.cp_sat.cout),", statut ",t.cp_sat.statut]}),m.jsxs("text",{x:"486",y:"144",children:["temps de calcul : ",Number(t.cp_sat.duree_s).toFixed(2)," s"]}),m.jsx("rect",{x:"470",y:"186",width:"400",height:"92",rx:"10",fill:"var(--carte)",stroke:Y.bleu,strokeWidth:"2.5"}),m.jsx("text",{x:"486",y:"214",fontWeight:"700",children:"Recuit simulé"}),m.jsxs("text",{x:"486",y:"238",children:["coût ",Math.round(t.recuit.cout),", sans preuve d'optimalité"]}),m.jsxs("text",{x:"486",y:"260",children:["temps de calcul : ",Number(t.recuit.duree_s).toFixed(2)," s"]})]}),m.jsx("text",{x:"20",y:"28",fontSize:"13",fontWeight:"700",fill:"var(--texte)",children:"Entrepôt vu de dessus"})]})}})}const Mo=10,U_=[1,3,8],kR=t=>{const e=t.reduce((n,i)=>n+i,0);return t.map(n=>n/e)},k_=(t,e)=>kR(t.map((n,i)=>n*(U_.includes(i)===e?.85:.15))),FR=(t,e)=>{const n=new Array(Mo).fill(0);return t.forEach((i,r)=>{const s=(o,a)=>{n[Math.max(0,Math.min(Mo-1,o))]+=i*a};s(r+e,.8),s(r+e-1,.1),s(r+e+1,.1)}),n},lc=new Array(Mo).fill(1/Mo),cf=k_(lc,!0),uf=FR(cf,2),Md=k_(uf,!0),OR=[{avant:lc,apres:lc,robot:[1,1]},{avant:lc,apres:cf,robot:[1,1]},{avant:cf,apres:uf,robot:[1,3]},{avant:uf,apres:Md,robot:[3,3]},{avant:Md,apres:Md,robot:[3,3]}],zR=[{titre:"Le robot ne sait pas où il est",texte:"Au démarrage, toutes les cellules du couloir sont également probables. La croyance est une distribution de probabilité sur les positions possibles : ici, elle est uniforme."},{titre:"Correction : une première mesure",texte:"Le capteur détecte une porte. Chaque cellule est multipliée par la vraisemblance de cette mesure, P(mesure | position), puis la croyance est normalisée. Trois hypothèses subsistent : les trois portes."},{titre:"Prédiction : un déplacement",texte:"Le robot avance de deux cellules. La croyance se décale avec lui et s'étale, parce que les roues glissent parfois : le mouvement ajoute de l'incertitude."},{titre:"Correction : une seconde mesure",texte:"Le capteur détecte de nouveau une porte. Une seule hypothèse est compatible avec « porte, deux cellules, porte ». La croyance se concentre sur la bonne cellule."},{titre:"Décider à partir d'une croyance",texte:"L'agent amélioré du module décide sur la position la plus probable, et attend lorsque la croyance est trop dispersée. Dans la scène 3D, les tuiles orange représentent cette croyance en deux dimensions."}];function BR(){return m.jsx(Lo,{titre:"Gérer l'incertitude : le filtre bayésien discret",etapes:zR,duree:6,children:(t,e)=>{const n=OR[t],i=So(e),r=78,s=60,o=n.robot[0]+(n.robot[1]-n.robot[0])*i;return m.jsxs("svg",{viewBox:"0 0 900 430",role:"img","aria-label":"Croyance du robot dans un couloir",children:[m.jsx("text",{x:s,y:"34",fontSize:"14",fontWeight:"700",fill:"var(--texte)",children:"Croyance : P(position)"}),n.avant.map((a,l)=>{const c=a+(n.apres[l]-a)*i,u=c*270;return m.jsxs("g",{children:[m.jsx("rect",{x:s+l*r+8,y:250-u,width:r-16,height:u,rx:"5",fill:Y.orange,opacity:"0.9"}),m.jsx("text",{x:s+l*r+r/2,y:242-u,textAnchor:"middle",fontSize:"12.5",fill:"var(--texte)",children:c.toFixed(2)})]},l)}),m.jsx("line",{x1:s,y1:"250",x2:s+Mo*r,y2:"250",stroke:"var(--texte-doux)"}),Array.from({length:Mo},(a,l)=>m.jsxs("g",{children:[m.jsx("rect",{x:s+l*r+2,y:"270",width:r-4,height:"74",rx:"6",fill:"var(--plan-sol)",stroke:"var(--bord)"}),U_.includes(l)&&m.jsx("rect",{x:s+l*r+22,y:"262",width:r-44,height:"16",rx:"3",fill:Y.vert}),m.jsx("text",{x:s+l*r+r/2,y:"366",textAnchor:"middle",fontSize:"12",fill:"var(--texte-doux)",children:l})]},l)),m.jsx("circle",{cx:s+o*r+r/2,cy:"312",r:"19",fill:Y.bleu,stroke:"#fff",strokeWidth:"3"}),(t===1||t===3)&&m.jsx("line",{x1:s+o*r+r/2,y1:"293",x2:s+o*r+r/2,y2:"280",stroke:Y.jaune,strokeWidth:"5",opacity:e<.6?1:.3}),m.jsxs("text",{x:s,y:"402",fontSize:"13",fill:"var(--texte-doux)",children:[m.jsx("tspan",{fill:Y.vert,fontWeight:"700",children:"■"})," porte détectable par le capteur   ",m.jsx("tspan",{fill:Y.bleu,fontWeight:"700",children:"●"})," position réelle du robot, inconnue de lui"]})]})}})}const HR=[{titre:"Valider un comportement, pas un résultat",texte:"Un agent autonome ne se valide pas sur une exécution réussie. Ses décisions dépendent d'aléas (bruit des capteurs, glissement, obstacles mobiles) : il faut mesurer une distribution de résultats sur un grand nombre de simulations."},{titre:"La robustesse",texte:"Un agent est robuste si ses performances se dégradent progressivement, et non brutalement, quand les conditions s'éloignent du nominal. Les scénarios de test sont donc organisés par niveaux de perturbation croissants."},{titre:"Une campagne de simulations",texte:"Chaque carré est un environnement simulé. Des milliers d'environnements s'exécutent en parallèle sous forme de tenseurs : c'est ici que le GPU apporte un gain réel. Vert : objectif atteint. Rouge : échec."},{titre:"Avant et après correction",texte:"Le taux de réussite est donné avec son intervalle de confiance à 95 %. La politique corrigée (verte) évite les cellules perçues comme occupées. L'écart entre les deux courbes mesure l'effet de la correction, niveau par niveau."},{titre:"Les principaux scénarios d'échec",texte:"Les échecs se rangent en familles : collision avec un obstacle non perçu, face à face sans issue avec un chariot, dépassement du temps imparti. Chaque échec doit pouvoir être rejoué étape par étape : c'est le rôle des traces et de la scène 3D."}],VR={leger:"léger",degrade:"dégradé",severe:"sévère"},df=t=>VR[t]||t,jR=t=>df(typeof t=="string"?t:t==null?void 0:t.nom);function GR(){const{donnees:t,erreur:e}=Po("data/m6_validation.json");if(e)return m.jsxs("p",{className:"erreur",children:["Données de l'animation indisponibles (",e,")."]});if(!t)return m.jsx("p",{children:"Chargement…"});const n=t.niveaux,i=(o,a)=>t.resultats.find(l=>(l.niveau===o.nom||l.niveau===n.indexOf(o))&&l.prudence===a),r=o=>110+o*700/Math.max(1,n.length-1),s=o=>330-o*250;return m.jsx(Lo,{titre:"Tester et valider un agent autonome",etapes:HR,duree:7,children:(o,a)=>m.jsxs("svg",{viewBox:"0 0 900 430",role:"img","aria-label":"Validation d'un agent autonome par campagne de simulations",children:[o===0&&m.jsxs("g",{children:[Array.from({length:9},(l,c)=>{const u=xt(a,c*.08,c*.08+.15),d=[0,1,2,4,5,7,8].includes(c);return m.jsxs("g",{opacity:u,children:[m.jsx("rect",{x:90+c%3*250,y:50+Math.floor(c/3)*110,width:"220",height:"86",rx:"10",fill:"var(--carte)",stroke:d?Y.vert:Y.rouge,strokeWidth:"2.5"}),m.jsx("polyline",{points:Array.from({length:8},(f,p)=>`${105+c%3*250+p*27},${95+Math.floor(c/3)*110+Math.sin(p*(1+c*.37)+c)*22}`).join(" "),fill:"none",stroke:d?Y.bleu:Y.rouge,strokeWidth:"2.5"}),m.jsxs("text",{x:100+c%3*250,y:70+Math.floor(c/3)*110,fontSize:"12",fill:"var(--texte-doux)",children:["graine ",c+1," : ",d?"réussite":"échec"]})]},c)}),m.jsx("text",{x:"450",y:"405",textAnchor:"middle",fontSize:"14",fill:"var(--texte)",children:"Même agent, même carte, neuf graines aléatoires : sept réussites, deux échecs."})]}),o===1&&m.jsxs("g",{children:[m.jsx("text",{x:"60",y:"50",fontSize:"14",fontWeight:"700",fill:"var(--texte)",children:"Niveaux de perturbation de la campagne"}),n.map((l,c)=>{const u=xt(a,c*.12,c*.12+.15),d=780/n.length;return m.jsxs("g",{opacity:u,children:[m.jsx("rect",{x:60+c*d,y:80,width:d-12,height:230,rx:"10",fill:"var(--carte)",stroke:Y.bleu,strokeWidth:"2"}),m.jsx("rect",{x:60+c*d,y:80,width:d-12,height:8,rx:"4",fill:c<n.length/3?Y.vert:c<2*n.length/3?Y.orange:Y.rouge}),m.jsx("text",{x:60+c*d+(d-12)/2,y:"120",textAnchor:"middle",fontSize:"14",fontWeight:"700",fill:"var(--texte)",children:df(l.nom)}),m.jsx("text",{x:72+c*d,y:"165",fontSize:"12",fill:"var(--texte-doux)",children:"glissement"}),m.jsxs("text",{x:72+c*d,y:"184",fontSize:"15",fontWeight:"700",fill:"var(--texte)",children:[Math.round(l.glissement*100)," %"]}),m.jsx("text",{x:72+c*d,y:"215",fontSize:"12",fill:"var(--texte-doux)",children:"obstacle non perçu"}),m.jsxs("text",{x:72+c*d,y:"234",fontSize:"15",fontWeight:"700",fill:"var(--texte)",children:[Math.round(l.rate_perception*100)," %"]}),m.jsx("text",{x:72+c*d,y:"265",fontSize:"12",fill:"var(--texte-doux)",children:"obstacles mobiles"}),m.jsx("text",{x:72+c*d,y:"284",fontSize:"15",fontWeight:"700",fill:"var(--texte)",children:l.n_obstacles})]},l.nom)}),m.jsxs("text",{x:"450",y:"360",textAnchor:"middle",fontSize:"13.5",fill:"var(--texte-doux)",children:["Chaque niveau est simulé ",t.lot," fois, limité à ",t.max_etapes," étapes."]})]}),o===2&&(()=>{const l=n[n.length-1],c=i(l,!1)||t.resultats[t.resultats.length-1],u=400,d=Math.round(a*u);return m.jsxs("g",{children:[m.jsxs("text",{x:"60",y:"44",fontSize:"14",fontWeight:"700",fill:"var(--texte)",children:["Niveau « ",jR(l)," », politique avant correction : ",d*Math.round(t.lot/u)," simulations sur ",t.lot]}),Array.from({length:d},(f,p)=>{const x=p*2654435761%1e3/1e3;return m.jsx("rect",{x:60+p%40*19.5,y:64+Math.floor(p/40)*19.5,width:"16",height:"16",rx:"3",fill:x<c.taux_succes?Y.vert:Y.rouge},p)}),m.jsxs("text",{x:"60",y:"290",fontSize:"14",fill:"var(--texte)",children:["Taux de réussite mesuré : ",m.jsxs("tspan",{fontWeight:"700",children:[(c.taux_succes*100).toFixed(1)," %"]}),", collisions moyennes par exécution : ",m.jsx("tspan",{fontWeight:"700",children:Number(c.collisions_moyennes).toFixed(2)})]})]})})(),o===3&&m.jsxs("g",{children:[[0,.25,.5,.75,1].map(l=>m.jsxs("g",{children:[m.jsx("line",{x1:"90",x2:"830",y1:s(l),y2:s(l),stroke:"var(--bord)"}),m.jsxs("text",{x:"80",y:s(l)+4,textAnchor:"end",fontSize:"12",fill:"var(--texte-doux)",children:[l*100," %"]})]},l)),n.map((l,c)=>m.jsx("text",{x:r(c),y:"356",textAnchor:"middle",fontSize:"12.5",fill:"var(--texte)",children:df(l.nom)},l.nom)),[[!1,Y.rouge,"avant correction"],[!0,Y.vert,"après correction"]].map(([l,c,u],d)=>{const f=n.map((v,g)=>({i:g,r:i(v,l)})).filter(v=>v.r),p=So(xt(a,d*.35,d*.35+.45)),x=Math.max(1,Math.ceil(p*f.length));return m.jsxs("g",{opacity:p>0?1:0,children:[m.jsx("polyline",{points:f.slice(0,x).map(v=>`${r(v.i)},${s(v.r.taux_succes)}`).join(" "),fill:"none",stroke:c,strokeWidth:"3"}),f.slice(0,x).map(v=>m.jsxs("g",{children:[v.r.ic&&m.jsx("line",{x1:r(v.i),x2:r(v.i),y1:s(v.r.ic[0]),y2:s(v.r.ic[1]),stroke:c,strokeWidth:"6",opacity:"0.35",strokeLinecap:"round"}),m.jsx("circle",{cx:r(v.i),cy:s(v.r.taux_succes),r:"6",fill:c,stroke:"#fff",strokeWidth:"1.5"}),m.jsxs("text",{x:r(v.i)+(d?-10:10),y:s(v.r.taux_succes)+(d?-10:20),textAnchor:d?"end":"start",fontSize:"12",fontWeight:"700",fill:c,children:[Math.round(v.r.taux_succes*100)," %"]})]},v.i)),m.jsxs("text",{x:110+d*190,y:"398",fontSize:"13",fill:"var(--texte)",children:[m.jsx("tspan",{fill:c,fontWeight:"700",children:"●"})," ",u]})]},u)}),m.jsx("text",{x:"90",y:"28",fontSize:"14",fontWeight:"700",fill:"var(--texte)",children:"Taux de réussite par niveau de perturbation"})]}),o===4&&m.jsx("g",{children:[["Obstacle non perçu","La perception rate un chariot : le robot avance et le heurte.",Y.rouge],["Face à face sans issue","Le robot et un chariot attendent chacun que l'autre libère le passage.",Y.orange],["Temps imparti dépassé","Glissements et replanifications s'accumulent : la mission dure trop longtemps.",Y.bleu]].map(([l,c,u],d)=>m.jsxs("g",{opacity:xt(a,d*.2,d*.2+.2),children:[m.jsx("rect",{x:"90",y:50+d*112,width:"720",height:"90",rx:"12",fill:"var(--carte)",stroke:u,strokeWidth:"2.5"}),m.jsx("rect",{x:"90",y:50+d*112,width:"10",height:"90",rx:"5",fill:u}),m.jsx("text",{x:"122",y:88+d*112,fontSize:"16",fontWeight:"700",fill:"var(--texte)",children:l}),m.jsx("text",{x:"122",y:114+d*112,fontSize:"13.5",fill:"var(--texte-doux)",children:c})]},l))})]})})}const WR={1:wR,2:AR,3:PR,4:UR,5:BR,6:GR};function XR(){const{n:t}=eE(),e=eo.find(s=>String(s.n)===t)||eo[0],n=WR[e.n],{donnees:i}=Po("traces/index.json"),r=e.scene&&i?i.filter(s=>e.scene.traces.includes(s.id)):null;return m.jsxs("div",{className:"page large",children:[m.jsxs("p",{className:"surtitre",children:["Jour ",e.jour," · Module ",e.n," · ",e.horaire," · 2 heures"]}),m.jsx("h1",{children:e.titre}),m.jsxs("div",{className:"deux-colonnes",children:[m.jsxs("section",{className:"carte probleme",children:[m.jsxs("h3",{children:[m.jsx("span",{className:"etape-cycle",children:"1"})," Le problème"]}),m.jsx("p",{children:e.probleme})]}),m.jsxs("section",{className:"carte",children:[m.jsx("h3",{children:"Contenu du syllabus"}),m.jsx("ul",{children:e.syllabus.map(s=>m.jsx("li",{children:s},s))}),m.jsxs("p",{className:"tp",children:[m.jsx("b",{children:"Travaux pratiques :"})," ",e.tp]})]})]}),m.jsxs("section",{children:[m.jsxs("h2",{children:[m.jsx("span",{className:"etape-cycle",children:"2"})," Animation explicative"]}),m.jsx("p",{className:"intro",children:"Séquences courtes, à commenter en direct. Espace : lecture ou pause. Flèches gauche et droite : étape précédente ou suivante."}),m.jsx(n,{})]}),e.scene&&m.jsxs("section",{children:[m.jsxs("h2",{children:[m.jsx("span",{className:"etape-cycle",children:"3"})," Décomposition dans la scène 3D"]}),m.jsx("p",{className:"intro",children:e.scene.consigne}),r?m.jsx(Ep,{catalogue:r,initialA:e.scene.a,initialB:e.scene.b}):m.jsx("p",{children:"Chargement…"})]}),m.jsxs("section",{children:[m.jsxs("h2",{children:[m.jsx("span",{className:"etape-cycle",children:e.scene?4:3})," Travaux pratiques : le notebook"]}),m.jsxs("div",{className:"carte notebook",children:[m.jsxs("span",{className:"numero",children:["75 minutes · notebook ",e.notebook,".ipynb"]}),m.jsx("ul",{children:e.notebookPoints.map(s=>m.jsx("li",{children:s},s))}),m.jsx(N_,{nb:e.notebook})]})]}),m.jsxs("section",{children:[m.jsxs("h2",{children:[m.jsx("span",{className:"etape-cycle",children:e.scene?5:4})," Synthèse"]}),m.jsx("ul",{className:"synthese",children:e.synthese.map(s=>m.jsx("li",{children:s},s))})]}),m.jsxs("nav",{className:"suite",children:[e.n>1?m.jsxs(sr,{to:`/module/${e.n-1}`,children:["← Module ",e.n-1]}):m.jsx("span",{}),e.n<6?m.jsxs(sr,{className:"bouton",to:`/module/${e.n+1}`,children:["Module ",e.n+1," : ",eo[e.n].titre," →"]}):m.jsx(sr,{className:"bouton",to:"/atelier",children:"Atelier 3D →"})]})]},e.n)}function qR(){const{donnees:t}=Po("traces/index.json");return m.jsxs("div",{className:"page large",children:[m.jsx("p",{className:"surtitre",children:"Scène 3D explorable"}),m.jsx("h1",{children:"Atelier 3D"}),m.jsxs("p",{className:"intro",children:["Toutes les traces de référence de la formation, et les vôtres : toute trace exportée depuis un notebook avec ",m.jsx("code",{children:'trace.enregistrer("ma_trace.json")'})," se rejoue ici. Comparez deux exécutions, isolez les capteurs, ouvrez la vue éclatée du robot."]}),t?m.jsx(Ep,{catalogue:t,initialA:"m5_robuste",hauteur:600,importer:!0}):m.jsx("p",{children:"Chargement du catalogue…"}),m.jsxs("div",{className:"carte",children:[m.jsx("h3",{children:"Format commun des traces"}),m.jsxs("p",{children:["Chaque étape d'une trace ",m.jsx("code",{children:"ascent-4130-trace/1"})," contient : le numéro d'étape ",m.jsx("code",{children:"t"}),", l'état de l'environnement ",m.jsx("code",{children:"etat"}),", les ",m.jsx("code",{children:"observation"}),"s de l'agent, sa ",m.jsx("code",{children:"decision"})," (raison, couche active, plan), l'",m.jsx("code",{children:"action"})," exécutée, le ",m.jsx("code",{children:"resultat"})," (collision, glissement, arrivée) et les ",m.jsx("code",{children:"metriques"})," de performance."]})]})]})}function Tp(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}let us=Tp();function F_(t){us=t}const O_=/[&<>"']/,$R=new RegExp(O_.source,"g"),z_=/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,YR=new RegExp(z_.source,"g"),KR={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},x0=t=>KR[t];function Tn(t,e){if(e){if(O_.test(t))return t.replace($R,x0)}else if(z_.test(t))return t.replace(YR,x0);return t}const ZR=/(^|[^\[])\^/g;function ot(t,e){let n=typeof t=="string"?t:t.source;e=e||"";const i={replace:(r,s)=>{let o=typeof s=="string"?s:s.source;return o=o.replace(ZR,"$1"),n=n.replace(r,o),i},getRegex:()=>new RegExp(n,e)};return i}function _0(t){try{t=encodeURI(t).replace(/%25/g,"%")}catch{return null}return t}const va={exec:()=>null};function y0(t,e){const n=t.replace(/\|/g,(s,o,a)=>{let l=!1,c=o;for(;--c>=0&&a[c]==="\\";)l=!l;return l?"|":" |"}),i=n.split(/ \|/);let r=0;if(i[0].trim()||i.shift(),i.length>0&&!i[i.length-1].trim()&&i.pop(),e)if(i.length>e)i.splice(e);else for(;i.length<e;)i.push("");for(;r<i.length;r++)i[r]=i[r].trim().replace(/\\\|/g,"|");return i}function Jo(t,e,n){const i=t.length;if(i===0)return"";let r=0;for(;r<i&&t.charAt(i-r-1)===e;)r++;return t.slice(0,i-r)}function QR(t,e){if(t.indexOf(e[1])===-1)return-1;let n=0;for(let i=0;i<t.length;i++)if(t[i]==="\\")i++;else if(t[i]===e[0])n++;else if(t[i]===e[1]&&(n--,n<0))return i;return-1}function S0(t,e,n,i){const r=e.href,s=e.title?Tn(e.title):null,o=t[1].replace(/\\([\[\]])/g,"$1");if(t[0].charAt(0)!=="!"){i.state.inLink=!0;const a={type:"link",raw:n,href:r,title:s,text:o,tokens:i.inlineTokens(o)};return i.state.inLink=!1,a}return{type:"image",raw:n,href:r,title:s,text:Tn(o)}}function JR(t,e){const n=t.match(/^(\s+)(?:```)/);if(n===null)return e;const i=n[1];return e.split(`
`).map(r=>{const s=r.match(/^\s+/);if(s===null)return r;const[o]=s;return o.length>=i.length?r.slice(i.length):r}).join(`
`)}class Bc{constructor(e){at(this,"options");at(this,"rules");at(this,"lexer");this.options=e||us}space(e){const n=this.rules.block.newline.exec(e);if(n&&n[0].length>0)return{type:"space",raw:n[0]}}code(e){const n=this.rules.block.code.exec(e);if(n){const i=n[0].replace(/^(?: {1,4}| {0,3}\t)/gm,"");return{type:"code",raw:n[0],codeBlockStyle:"indented",text:this.options.pedantic?i:Jo(i,`
`)}}}fences(e){const n=this.rules.block.fences.exec(e);if(n){const i=n[0],r=JR(i,n[3]||"");return{type:"code",raw:i,lang:n[2]?n[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):n[2],text:r}}}heading(e){const n=this.rules.block.heading.exec(e);if(n){let i=n[2].trim();if(/#$/.test(i)){const r=Jo(i,"#");(this.options.pedantic||!r||/ $/.test(r))&&(i=r.trim())}return{type:"heading",raw:n[0],depth:n[1].length,text:i,tokens:this.lexer.inline(i)}}}hr(e){const n=this.rules.block.hr.exec(e);if(n)return{type:"hr",raw:Jo(n[0],`
`)}}blockquote(e){const n=this.rules.block.blockquote.exec(e);if(n){let i=Jo(n[0],`
`).split(`
`),r="",s="";const o=[];for(;i.length>0;){let a=!1;const l=[];let c;for(c=0;c<i.length;c++)if(/^ {0,3}>/.test(i[c]))l.push(i[c]),a=!0;else if(!a)l.push(i[c]);else break;i=i.slice(c);const u=l.join(`
`),d=u.replace(/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,`
    $1`).replace(/^ {0,3}>[ \t]?/gm,"");r=r?`${r}
${u}`:u,s=s?`${s}
${d}`:d;const f=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,o,!0),this.lexer.state.top=f,i.length===0)break;const p=o[o.length-1];if((p==null?void 0:p.type)==="code")break;if((p==null?void 0:p.type)==="blockquote"){const x=p,v=x.raw+`
`+i.join(`
`),g=this.blockquote(v);o[o.length-1]=g,r=r.substring(0,r.length-x.raw.length)+g.raw,s=s.substring(0,s.length-x.text.length)+g.text;break}else if((p==null?void 0:p.type)==="list"){const x=p,v=x.raw+`
`+i.join(`
`),g=this.list(v);o[o.length-1]=g,r=r.substring(0,r.length-p.raw.length)+g.raw,s=s.substring(0,s.length-x.raw.length)+g.raw,i=v.substring(o[o.length-1].raw.length).split(`
`);continue}}return{type:"blockquote",raw:r,tokens:o,text:s}}}list(e){let n=this.rules.block.list.exec(e);if(n){let i=n[1].trim();const r=i.length>1,s={type:"list",raw:"",ordered:r,start:r?+i.slice(0,-1):"",loose:!1,items:[]};i=r?`\\d{1,9}\\${i.slice(-1)}`:`\\${i}`,this.options.pedantic&&(i=r?i:"[*+-]");const o=new RegExp(`^( {0,3}${i})((?:[	 ][^\\n]*)?(?:\\n|$))`);let a=!1;for(;e;){let l=!1,c="",u="";if(!(n=o.exec(e))||this.rules.block.hr.test(e))break;c=n[0],e=e.substring(c.length);let d=n[2].split(`
`,1)[0].replace(/^\t+/,h=>" ".repeat(3*h.length)),f=e.split(`
`,1)[0],p=!d.trim(),x=0;if(this.options.pedantic?(x=2,u=d.trimStart()):p?x=n[1].length+1:(x=n[2].search(/[^ ]/),x=x>4?1:x,u=d.slice(x),x+=n[1].length),p&&/^[ \t]*$/.test(f)&&(c+=f+`
`,e=e.substring(f.length+1),l=!0),!l){const h=new RegExp(`^ {0,${Math.min(3,x-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),_=new RegExp(`^ {0,${Math.min(3,x-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),y=new RegExp(`^ {0,${Math.min(3,x-1)}}(?:\`\`\`|~~~)`),S=new RegExp(`^ {0,${Math.min(3,x-1)}}#`),C=new RegExp(`^ {0,${Math.min(3,x-1)}}<(?:[a-z].*>|!--)`,"i");for(;e;){const A=e.split(`
`,1)[0];let b;if(f=A,this.options.pedantic?(f=f.replace(/^ {1,4}(?=( {4})*[^ ])/g,"  "),b=f):b=f.replace(/\t/g,"    "),y.test(f)||S.test(f)||C.test(f)||h.test(f)||_.test(f))break;if(b.search(/[^ ]/)>=x||!f.trim())u+=`
`+b.slice(x);else{if(p||d.replace(/\t/g,"    ").search(/[^ ]/)>=4||y.test(d)||S.test(d)||_.test(d))break;u+=`
`+f}!p&&!f.trim()&&(p=!0),c+=A+`
`,e=e.substring(A.length+1),d=b.slice(x)}}s.loose||(a?s.loose=!0:/\n[ \t]*\n[ \t]*$/.test(c)&&(a=!0));let v=null,g;this.options.gfm&&(v=/^\[[ xX]\] /.exec(u),v&&(g=v[0]!=="[ ] ",u=u.replace(/^\[[ xX]\] +/,""))),s.items.push({type:"list_item",raw:c,task:!!v,checked:g,loose:!1,text:u,tokens:[]}),s.raw+=c}s.items[s.items.length-1].raw=s.items[s.items.length-1].raw.trimEnd(),s.items[s.items.length-1].text=s.items[s.items.length-1].text.trimEnd(),s.raw=s.raw.trimEnd();for(let l=0;l<s.items.length;l++)if(this.lexer.state.top=!1,s.items[l].tokens=this.lexer.blockTokens(s.items[l].text,[]),!s.loose){const c=s.items[l].tokens.filter(d=>d.type==="space"),u=c.length>0&&c.some(d=>/\n.*\n/.test(d.raw));s.loose=u}if(s.loose)for(let l=0;l<s.items.length;l++)s.items[l].loose=!0;return s}}html(e){const n=this.rules.block.html.exec(e);if(n)return{type:"html",block:!0,raw:n[0],pre:n[1]==="pre"||n[1]==="script"||n[1]==="style",text:n[0]}}def(e){const n=this.rules.block.def.exec(e);if(n){const i=n[1].toLowerCase().replace(/\s+/g," "),r=n[2]?n[2].replace(/^<(.*)>$/,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=n[3]?n[3].substring(1,n[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):n[3];return{type:"def",tag:i,raw:n[0],href:r,title:s}}}table(e){const n=this.rules.block.table.exec(e);if(!n||!/[:|]/.test(n[2]))return;const i=y0(n[1]),r=n[2].replace(/^\||\| *$/g,"").split("|"),s=n[3]&&n[3].trim()?n[3].replace(/\n[ \t]*$/,"").split(`
`):[],o={type:"table",raw:n[0],header:[],align:[],rows:[]};if(i.length===r.length){for(const a of r)/^ *-+: *$/.test(a)?o.align.push("right"):/^ *:-+: *$/.test(a)?o.align.push("center"):/^ *:-+ *$/.test(a)?o.align.push("left"):o.align.push(null);for(let a=0;a<i.length;a++)o.header.push({text:i[a],tokens:this.lexer.inline(i[a]),header:!0,align:o.align[a]});for(const a of s)o.rows.push(y0(a,o.header.length).map((l,c)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:o.align[c]})));return o}}lheading(e){const n=this.rules.block.lheading.exec(e);if(n)return{type:"heading",raw:n[0],depth:n[2].charAt(0)==="="?1:2,text:n[1],tokens:this.lexer.inline(n[1])}}paragraph(e){const n=this.rules.block.paragraph.exec(e);if(n){const i=n[1].charAt(n[1].length-1)===`
`?n[1].slice(0,-1):n[1];return{type:"paragraph",raw:n[0],text:i,tokens:this.lexer.inline(i)}}}text(e){const n=this.rules.block.text.exec(e);if(n)return{type:"text",raw:n[0],text:n[0],tokens:this.lexer.inline(n[0])}}escape(e){const n=this.rules.inline.escape.exec(e);if(n)return{type:"escape",raw:n[0],text:Tn(n[1])}}tag(e){const n=this.rules.inline.tag.exec(e);if(n)return!this.lexer.state.inLink&&/^<a /i.test(n[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&/^<\/a>/i.test(n[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(n[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(n[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:n[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:n[0]}}link(e){const n=this.rules.inline.link.exec(e);if(n){const i=n[2].trim();if(!this.options.pedantic&&/^</.test(i)){if(!/>$/.test(i))return;const o=Jo(i.slice(0,-1),"\\");if((i.length-o.length)%2===0)return}else{const o=QR(n[2],"()");if(o>-1){const l=(n[0].indexOf("!")===0?5:4)+n[1].length+o;n[2]=n[2].substring(0,o),n[0]=n[0].substring(0,l).trim(),n[3]=""}}let r=n[2],s="";if(this.options.pedantic){const o=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(r);o&&(r=o[1],s=o[3])}else s=n[3]?n[3].slice(1,-1):"";return r=r.trim(),/^</.test(r)&&(this.options.pedantic&&!/>$/.test(i)?r=r.slice(1):r=r.slice(1,-1)),S0(n,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},n[0],this.lexer)}}reflink(e,n){let i;if((i=this.rules.inline.reflink.exec(e))||(i=this.rules.inline.nolink.exec(e))){const r=(i[2]||i[1]).replace(/\s+/g," "),s=n[r.toLowerCase()];if(!s){const o=i[0].charAt(0);return{type:"text",raw:o,text:o}}return S0(i,s,i[0],this.lexer)}}emStrong(e,n,i=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!r||r[3]&&i.match(/[\p{L}\p{N}]/u))return;if(!(r[1]||r[2]||"")||!i||this.rules.inline.punctuation.exec(i)){const o=[...r[0]].length-1;let a,l,c=o,u=0;const d=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,n=n.slice(-1*e.length+o);(r=d.exec(n))!=null;){if(a=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!a)continue;if(l=[...a].length,r[3]||r[4]){c+=l;continue}else if((r[5]||r[6])&&o%3&&!((o+l)%3)){u+=l;continue}if(c-=l,c>0)continue;l=Math.min(l,l+c+u);const f=[...r[0]][0].length,p=e.slice(0,o+r.index+f+l);if(Math.min(o,l)%2){const v=p.slice(1,-1);return{type:"em",raw:p,text:v,tokens:this.lexer.inlineTokens(v)}}const x=p.slice(2,-2);return{type:"strong",raw:p,text:x,tokens:this.lexer.inlineTokens(x)}}}}codespan(e){const n=this.rules.inline.code.exec(e);if(n){let i=n[2].replace(/\n/g," ");const r=/[^ ]/.test(i),s=/^ /.test(i)&&/ $/.test(i);return r&&s&&(i=i.substring(1,i.length-1)),i=Tn(i,!0),{type:"codespan",raw:n[0],text:i}}}br(e){const n=this.rules.inline.br.exec(e);if(n)return{type:"br",raw:n[0]}}del(e){const n=this.rules.inline.del.exec(e);if(n)return{type:"del",raw:n[0],text:n[2],tokens:this.lexer.inlineTokens(n[2])}}autolink(e){const n=this.rules.inline.autolink.exec(e);if(n){let i,r;return n[2]==="@"?(i=Tn(n[1]),r="mailto:"+i):(i=Tn(n[1]),r=i),{type:"link",raw:n[0],text:i,href:r,tokens:[{type:"text",raw:i,text:i}]}}}url(e){var i;let n;if(n=this.rules.inline.url.exec(e)){let r,s;if(n[2]==="@")r=Tn(n[0]),s="mailto:"+r;else{let o;do o=n[0],n[0]=((i=this.rules.inline._backpedal.exec(n[0]))==null?void 0:i[0])??"";while(o!==n[0]);r=Tn(n[0]),n[1]==="www."?s="http://"+n[0]:s=n[0]}return{type:"link",raw:n[0],text:r,href:s,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(e){const n=this.rules.inline.text.exec(e);if(n){let i;return this.lexer.state.inRawBlock?i=n[0]:i=Tn(n[0]),{type:"text",raw:n[0],text:i}}}}const e2=/^(?:[ \t]*(?:\n|$))+/,t2=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,n2=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Xa=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,i2=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,B_=/(?:[*+-]|\d{1,9}[.)])/,H_=ot(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g,B_).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).getRegex(),bp=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,r2=/^[^\n]+/,Ap=/(?!\s*\])(?:\\.|[^\[\]\\])+/,s2=ot(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Ap).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),o2=ot(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,B_).getRegex(),hu="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Cp=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,a2=ot("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Cp).replace("tag",hu).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),V_=ot(bp).replace("hr",Xa).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",hu).getRegex(),l2=ot(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",V_).getRegex(),Rp={blockquote:l2,code:t2,def:s2,fences:n2,heading:i2,hr:Xa,html:a2,lheading:H_,list:o2,newline:e2,paragraph:V_,table:va,text:r2},M0=ot("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Xa).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",hu).getRegex(),c2={...Rp,table:M0,paragraph:ot(bp).replace("hr",Xa).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",M0).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",hu).getRegex()},u2={...Rp,html:ot(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Cp).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:va,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:ot(bp).replace("hr",Xa).replace("heading",` *#{1,6} *[^
]`).replace("lheading",H_).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},j_=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,d2=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,G_=/^( {2,}|\\)\n(?!\s*$)/,h2=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,qa="\\p{P}\\p{S}",f2=ot(/^((?![*_])[\spunctuation])/,"u").replace(/punctuation/g,qa).getRegex(),p2=/\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g,m2=ot(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/,"u").replace(/punct/g,qa).getRegex(),g2=ot("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])","gu").replace(/punct/g,qa).getRegex(),v2=ot("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])","gu").replace(/punct/g,qa).getRegex(),x2=ot(/\\([punct])/,"gu").replace(/punct/g,qa).getRegex(),_2=ot(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),y2=ot(Cp).replace("(?:-->|$)","-->").getRegex(),S2=ot("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",y2).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Hc=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,M2=ot(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label",Hc).replace("href",/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),W_=ot(/^!?\[(label)\]\[(ref)\]/).replace("label",Hc).replace("ref",Ap).getRegex(),X_=ot(/^!?\[(ref)\](?:\[\])?/).replace("ref",Ap).getRegex(),E2=ot("reflink|nolink(?!\\()","g").replace("reflink",W_).replace("nolink",X_).getRegex(),Pp={_backpedal:va,anyPunctuation:x2,autolink:_2,blockSkip:p2,br:G_,code:d2,del:va,emStrongLDelim:m2,emStrongRDelimAst:g2,emStrongRDelimUnd:v2,escape:j_,link:M2,nolink:X_,punctuation:f2,reflink:W_,reflinkSearch:E2,tag:S2,text:h2,url:va},w2={...Pp,link:ot(/^!?\[(label)\]\((.*?)\)/).replace("label",Hc).getRegex(),reflink:ot(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Hc).getRegex()},hf={...Pp,escape:ot(j_).replace("])","~|])").getRegex(),url:ot(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,"i").replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},T2={...hf,br:ot(G_).replace("{2,}","*").getRegex(),text:ot(hf.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Vl={normal:Rp,gfm:c2,pedantic:u2},ea={normal:Pp,gfm:hf,breaks:T2,pedantic:w2};class Bn{constructor(e){at(this,"tokens");at(this,"options");at(this,"state");at(this,"tokenizer");at(this,"inlineQueue");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||us,this.options.tokenizer=this.options.tokenizer||new Bc,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};const n={block:Vl.normal,inline:ea.normal};this.options.pedantic?(n.block=Vl.pedantic,n.inline=ea.pedantic):this.options.gfm&&(n.block=Vl.gfm,this.options.breaks?n.inline=ea.breaks:n.inline=ea.gfm),this.tokenizer.rules=n}static get rules(){return{block:Vl,inline:ea}}static lex(e,n){return new Bn(n).lex(e)}static lexInline(e,n){return new Bn(n).inlineTokens(e)}lex(e){e=e.replace(/\r\n|\r/g,`
`),this.blockTokens(e,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){const i=this.inlineQueue[n];this.inlineTokens(i.src,i.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,n=[],i=!1){this.options.pedantic&&(e=e.replace(/\t/g,"    ").replace(/^ +$/gm,""));let r,s,o;for(;e;)if(!(this.options.extensions&&this.options.extensions.block&&this.options.extensions.block.some(a=>(r=a.call({lexer:this},e,n))?(e=e.substring(r.raw.length),n.push(r),!0):!1))){if(r=this.tokenizer.space(e)){e=e.substring(r.raw.length),r.raw.length===1&&n.length>0?n[n.length-1].raw+=`
`:n.push(r);continue}if(r=this.tokenizer.code(e)){e=e.substring(r.raw.length),s=n[n.length-1],s&&(s.type==="paragraph"||s.type==="text")?(s.raw+=`
`+r.raw,s.text+=`
`+r.text,this.inlineQueue[this.inlineQueue.length-1].src=s.text):n.push(r);continue}if(r=this.tokenizer.fences(e)){e=e.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.heading(e)){e=e.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.hr(e)){e=e.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.blockquote(e)){e=e.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.list(e)){e=e.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.html(e)){e=e.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.def(e)){e=e.substring(r.raw.length),s=n[n.length-1],s&&(s.type==="paragraph"||s.type==="text")?(s.raw+=`
`+r.raw,s.text+=`
`+r.raw,this.inlineQueue[this.inlineQueue.length-1].src=s.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title});continue}if(r=this.tokenizer.table(e)){e=e.substring(r.raw.length),n.push(r);continue}if(r=this.tokenizer.lheading(e)){e=e.substring(r.raw.length),n.push(r);continue}if(o=e,this.options.extensions&&this.options.extensions.startBlock){let a=1/0;const l=e.slice(1);let c;this.options.extensions.startBlock.forEach(u=>{c=u.call({lexer:this},l),typeof c=="number"&&c>=0&&(a=Math.min(a,c))}),a<1/0&&a>=0&&(o=e.substring(0,a+1))}if(this.state.top&&(r=this.tokenizer.paragraph(o))){s=n[n.length-1],i&&(s==null?void 0:s.type)==="paragraph"?(s.raw+=`
`+r.raw,s.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=s.text):n.push(r),i=o.length!==e.length,e=e.substring(r.raw.length);continue}if(r=this.tokenizer.text(e)){e=e.substring(r.raw.length),s=n[n.length-1],s&&s.type==="text"?(s.raw+=`
`+r.raw,s.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=s.text):n.push(r);continue}if(e){const a="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,n}inline(e,n=[]){return this.inlineQueue.push({src:e,tokens:n}),n}inlineTokens(e,n=[]){let i,r,s,o=e,a,l,c;if(this.tokens.links){const u=Object.keys(this.tokens.links);if(u.length>0)for(;(a=this.tokenizer.rules.inline.reflinkSearch.exec(o))!=null;)u.includes(a[0].slice(a[0].lastIndexOf("[")+1,-1))&&(o=o.slice(0,a.index)+"["+"a".repeat(a[0].length-2)+"]"+o.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(a=this.tokenizer.rules.inline.blockSkip.exec(o))!=null;)o=o.slice(0,a.index)+"["+"a".repeat(a[0].length-2)+"]"+o.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;(a=this.tokenizer.rules.inline.anyPunctuation.exec(o))!=null;)o=o.slice(0,a.index)+"++"+o.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;e;)if(l||(c=""),l=!1,!(this.options.extensions&&this.options.extensions.inline&&this.options.extensions.inline.some(u=>(i=u.call({lexer:this},e,n))?(e=e.substring(i.raw.length),n.push(i),!0):!1))){if(i=this.tokenizer.escape(e)){e=e.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.tag(e)){e=e.substring(i.raw.length),r=n[n.length-1],r&&i.type==="text"&&r.type==="text"?(r.raw+=i.raw,r.text+=i.text):n.push(i);continue}if(i=this.tokenizer.link(e)){e=e.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(i.raw.length),r=n[n.length-1],r&&i.type==="text"&&r.type==="text"?(r.raw+=i.raw,r.text+=i.text):n.push(i);continue}if(i=this.tokenizer.emStrong(e,o,c)){e=e.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.codespan(e)){e=e.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.br(e)){e=e.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.del(e)){e=e.substring(i.raw.length),n.push(i);continue}if(i=this.tokenizer.autolink(e)){e=e.substring(i.raw.length),n.push(i);continue}if(!this.state.inLink&&(i=this.tokenizer.url(e))){e=e.substring(i.raw.length),n.push(i);continue}if(s=e,this.options.extensions&&this.options.extensions.startInline){let u=1/0;const d=e.slice(1);let f;this.options.extensions.startInline.forEach(p=>{f=p.call({lexer:this},d),typeof f=="number"&&f>=0&&(u=Math.min(u,f))}),u<1/0&&u>=0&&(s=e.substring(0,u+1))}if(i=this.tokenizer.inlineText(s)){e=e.substring(i.raw.length),i.raw.slice(-1)!=="_"&&(c=i.raw.slice(-1)),l=!0,r=n[n.length-1],r&&r.type==="text"?(r.raw+=i.raw,r.text+=i.text):n.push(i);continue}if(e){const u="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(u);break}else throw new Error(u)}}return n}}class Vc{constructor(e){at(this,"options");at(this,"parser");this.options=e||us}space(e){return""}code({text:e,lang:n,escaped:i}){var o;const r=(o=(n||"").match(/^\S*/))==null?void 0:o[0],s=e.replace(/\n$/,"")+`
`;return r?'<pre><code class="language-'+Tn(r)+'">'+(i?s:Tn(s,!0))+`</code></pre>
`:"<pre><code>"+(i?s:Tn(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}heading({tokens:e,depth:n}){return`<h${n}>${this.parser.parseInline(e)}</h${n}>
`}hr(e){return`<hr>
`}list(e){const n=e.ordered,i=e.start;let r="";for(let a=0;a<e.items.length;a++){const l=e.items[a];r+=this.listitem(l)}const s=n?"ol":"ul",o=n&&i!==1?' start="'+i+'"':"";return"<"+s+o+`>
`+r+"</"+s+`>
`}listitem(e){let n="";if(e.task){const i=this.checkbox({checked:!!e.checked});e.loose?e.tokens.length>0&&e.tokens[0].type==="paragraph"?(e.tokens[0].text=i+" "+e.tokens[0].text,e.tokens[0].tokens&&e.tokens[0].tokens.length>0&&e.tokens[0].tokens[0].type==="text"&&(e.tokens[0].tokens[0].text=i+" "+e.tokens[0].tokens[0].text)):e.tokens.unshift({type:"text",raw:i+" ",text:i+" "}):n+=i+" "}return n+=this.parser.parse(e.tokens,!!e.loose),`<li>${n}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox">'}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let n="",i="";for(let s=0;s<e.header.length;s++)i+=this.tablecell(e.header[s]);n+=this.tablerow({text:i});let r="";for(let s=0;s<e.rows.length;s++){const o=e.rows[s];i="";for(let a=0;a<o.length;a++)i+=this.tablecell(o[a]);r+=this.tablerow({text:i})}return r&&(r=`<tbody>${r}</tbody>`),`<table>
<thead>
`+n+`</thead>
`+r+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){const n=this.parser.parseInline(e.tokens),i=e.header?"th":"td";return(e.align?`<${i} align="${e.align}">`:`<${i}>`)+n+`</${i}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${e}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:n,tokens:i}){const r=this.parser.parseInline(i),s=_0(e);if(s===null)return r;e=s;let o='<a href="'+e+'"';return n&&(o+=' title="'+n+'"'),o+=">"+r+"</a>",o}image({href:e,title:n,text:i}){const r=_0(e);if(r===null)return i;e=r;let s=`<img src="${e}" alt="${i}"`;return n&&(s+=` title="${n}"`),s+=">",s}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):e.text}}class Lp{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}}class Hn{constructor(e){at(this,"options");at(this,"renderer");at(this,"textRenderer");this.options=e||us,this.options.renderer=this.options.renderer||new Vc,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Lp}static parse(e,n){return new Hn(n).parse(e)}static parseInline(e,n){return new Hn(n).parseInline(e)}parse(e,n=!0){let i="";for(let r=0;r<e.length;r++){const s=e[r];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[s.type]){const a=s,l=this.options.extensions.renderers[a.type].call({parser:this},a);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(a.type)){i+=l||"";continue}}const o=s;switch(o.type){case"space":{i+=this.renderer.space(o);continue}case"hr":{i+=this.renderer.hr(o);continue}case"heading":{i+=this.renderer.heading(o);continue}case"code":{i+=this.renderer.code(o);continue}case"table":{i+=this.renderer.table(o);continue}case"blockquote":{i+=this.renderer.blockquote(o);continue}case"list":{i+=this.renderer.list(o);continue}case"html":{i+=this.renderer.html(o);continue}case"paragraph":{i+=this.renderer.paragraph(o);continue}case"text":{let a=o,l=this.renderer.text(a);for(;r+1<e.length&&e[r+1].type==="text";)a=e[++r],l+=`
`+this.renderer.text(a);n?i+=this.renderer.paragraph({type:"paragraph",raw:l,text:l,tokens:[{type:"text",raw:l,text:l}]}):i+=l;continue}default:{const a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return i}parseInline(e,n){n=n||this.renderer;let i="";for(let r=0;r<e.length;r++){const s=e[r];if(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[s.type]){const a=this.options.extensions.renderers[s.type].call({parser:this},s);if(a!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(s.type)){i+=a||"";continue}}const o=s;switch(o.type){case"escape":{i+=n.text(o);break}case"html":{i+=n.html(o);break}case"link":{i+=n.link(o);break}case"image":{i+=n.image(o);break}case"strong":{i+=n.strong(o);break}case"em":{i+=n.em(o);break}case"codespan":{i+=n.codespan(o);break}case"br":{i+=n.br(o);break}case"del":{i+=n.del(o);break}case"text":{i+=n.text(o);break}default:{const a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return i}}class xa{constructor(e){at(this,"options");at(this,"block");this.options=e||us}preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}provideLexer(){return this.block?Bn.lex:Bn.lexInline}provideParser(){return this.block?Hn.parse:Hn.parseInline}}at(xa,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens"]));class b2{constructor(...e){at(this,"defaults",Tp());at(this,"options",this.setOptions);at(this,"parse",this.parseMarkdown(!0));at(this,"parseInline",this.parseMarkdown(!1));at(this,"Parser",Hn);at(this,"Renderer",Vc);at(this,"TextRenderer",Lp);at(this,"Lexer",Bn);at(this,"Tokenizer",Bc);at(this,"Hooks",xa);this.use(...e)}walkTokens(e,n){var r,s;let i=[];for(const o of e)switch(i=i.concat(n.call(this,o)),o.type){case"table":{const a=o;for(const l of a.header)i=i.concat(this.walkTokens(l.tokens,n));for(const l of a.rows)for(const c of l)i=i.concat(this.walkTokens(c.tokens,n));break}case"list":{const a=o;i=i.concat(this.walkTokens(a.items,n));break}default:{const a=o;(s=(r=this.defaults.extensions)==null?void 0:r.childTokens)!=null&&s[a.type]?this.defaults.extensions.childTokens[a.type].forEach(l=>{const c=a[l].flat(1/0);i=i.concat(this.walkTokens(c,n))}):a.tokens&&(i=i.concat(this.walkTokens(a.tokens,n)))}}return i}use(...e){const n=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(i=>{const r={...i};if(r.async=this.defaults.async||r.async||!1,i.extensions&&(i.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){const o=n.renderers[s.name];o?n.renderers[s.name]=function(...a){let l=s.renderer.apply(this,a);return l===!1&&(l=o.apply(this,a)),l}:n.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");const o=n[s.level];o?o.unshift(s.tokenizer):n[s.level]=[s.tokenizer],s.start&&(s.level==="block"?n.startBlock?n.startBlock.push(s.start):n.startBlock=[s.start]:s.level==="inline"&&(n.startInline?n.startInline.push(s.start):n.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(n.childTokens[s.name]=s.childTokens)}),r.extensions=n),i.renderer){const s=this.defaults.renderer||new Vc(this.defaults);for(const o in i.renderer){if(!(o in s))throw new Error(`renderer '${o}' does not exist`);if(["options","parser"].includes(o))continue;const a=o,l=i.renderer[a],c=s[a];s[a]=(...u)=>{let d=l.apply(s,u);return d===!1&&(d=c.apply(s,u)),d||""}}r.renderer=s}if(i.tokenizer){const s=this.defaults.tokenizer||new Bc(this.defaults);for(const o in i.tokenizer){if(!(o in s))throw new Error(`tokenizer '${o}' does not exist`);if(["options","rules","lexer"].includes(o))continue;const a=o,l=i.tokenizer[a],c=s[a];s[a]=(...u)=>{let d=l.apply(s,u);return d===!1&&(d=c.apply(s,u)),d}}r.tokenizer=s}if(i.hooks){const s=this.defaults.hooks||new xa;for(const o in i.hooks){if(!(o in s))throw new Error(`hook '${o}' does not exist`);if(["options","block"].includes(o))continue;const a=o,l=i.hooks[a],c=s[a];xa.passThroughHooks.has(o)?s[a]=u=>{if(this.defaults.async)return Promise.resolve(l.call(s,u)).then(f=>c.call(s,f));const d=l.call(s,u);return c.call(s,d)}:s[a]=(...u)=>{let d=l.apply(s,u);return d===!1&&(d=c.apply(s,u)),d}}r.hooks=s}if(i.walkTokens){const s=this.defaults.walkTokens,o=i.walkTokens;r.walkTokens=function(a){let l=[];return l.push(o.call(this,a)),s&&(l=l.concat(s.call(this,a))),l}}this.defaults={...this.defaults,...r}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,n){return Bn.lex(e,n??this.defaults)}parser(e,n){return Hn.parse(e,n??this.defaults)}parseMarkdown(e){return(i,r)=>{const s={...r},o={...this.defaults,...s},a=this.onError(!!o.silent,!!o.async);if(this.defaults.async===!0&&s.async===!1)return a(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof i>"u"||i===null)return a(new Error("marked(): input parameter is undefined or null"));if(typeof i!="string")return a(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(i)+", string expected"));o.hooks&&(o.hooks.options=o,o.hooks.block=e);const l=o.hooks?o.hooks.provideLexer():e?Bn.lex:Bn.lexInline,c=o.hooks?o.hooks.provideParser():e?Hn.parse:Hn.parseInline;if(o.async)return Promise.resolve(o.hooks?o.hooks.preprocess(i):i).then(u=>l(u,o)).then(u=>o.hooks?o.hooks.processAllTokens(u):u).then(u=>o.walkTokens?Promise.all(this.walkTokens(u,o.walkTokens)).then(()=>u):u).then(u=>c(u,o)).then(u=>o.hooks?o.hooks.postprocess(u):u).catch(a);try{o.hooks&&(i=o.hooks.preprocess(i));let u=l(i,o);o.hooks&&(u=o.hooks.processAllTokens(u)),o.walkTokens&&this.walkTokens(u,o.walkTokens);let d=c(u,o);return o.hooks&&(d=o.hooks.postprocess(d)),d}catch(u){return a(u)}}}onError(e,n){return i=>{if(i.message+=`
Please report this to https://github.com/markedjs/marked.`,e){const r="<p>An error occurred:</p><pre>"+Tn(i.message+"",!0)+"</pre>";return n?Promise.resolve(r):r}if(n)return Promise.reject(i);throw i}}}const is=new b2;function et(t,e){return is.parse(t,e)}et.options=et.setOptions=function(t){return is.setOptions(t),et.defaults=is.defaults,F_(et.defaults),et};et.getDefaults=Tp;et.defaults=us;et.use=function(...t){return is.use(...t),et.defaults=is.defaults,F_(et.defaults),et};et.walkTokens=function(t,e){return is.walkTokens(t,e)};et.parseInline=is.parseInline;et.Parser=Hn;et.parser=Hn.parse;et.Renderer=Vc;et.TextRenderer=Lp;et.Lexer=Bn;et.lexer=Bn.lex;et.Tokenizer=Bc;et.Hooks=xa;et.parse=et;et.options;et.setOptions;et.use;et.walkTokens;et.parseInline;Hn.parse;Bn.lex;function E0({source:t,surtitre:e}){const n=te.useMemo(()=>et.parse(t),[t]);return m.jsxs("article",{className:"page prose",children:[m.jsx("p",{className:"surtitre",children:e}),m.jsx("div",{dangerouslySetInnerHTML:{__html:n}})]})}const A2=`# Les agents autonomes et aide à la décision

**Lot 4, Gestion et analyse des données, Intelligence Artificielle. Référence 4-130.**

Session : lundi 16 et mardi 17 novembre 2026, pour le ministère de la Transition écologique.

**Objectif général de la formation :** à l'issue de la formation, les participants seront capables de concevoir et de mettre en œuvre des agents intelligents autonomes, tout en maîtrisant les approches d'optimisation et les principes de prise de décision en environnement dynamique.

**Niveau SAME visé :** Application (A)

**Durée :** 12 heures (2 jours)

## Compétences visées

- Identifier les solutions d'IA adaptées à la prise de décision en environnement complexe.
- Concevoir des agents intelligents capables d'interagir avec leur environnement.
- Appliquer des techniques d'optimisation (programmation sous contraintes, recuit simulé).
- Implémenter des fonctions d'autonomie pour les systèmes robotisés.

## Profils des stagiaires

- Ingénieurs en intelligence artificielle.
- Développeurs et concepteurs de systèmes intelligents.
- Responsables techniques dans des projets d'automatisation ou de robotique.

## Prérequis

- Connaissances en algorithmique et programmation.
- Notions de base en intelligence artificielle et en robotique.

## Objectifs pédagogiques

- Comprendre les solutions IA dédiées à la prise de décision et leurs applications.
- Concevoir des agents intelligents capables d'interagir dynamiquement avec leur environnement.
- Appliquer des techniques d'optimisation dans des contextes complexes.
- Maîtriser les principes d'autonomie dans les systèmes robotisés.

## Contenu de la formation

### Jour 1 : Introduction aux agents intelligents et solutions IA (6 heures)

**Solutions IA pour la prise de décision (2 heures)**

- Exploration des approches basées sur des règles, réseaux bayésiens et apprentissage supervisé.
- Analyse des limites et avantages des différentes solutions IA.
- Étude de cas : systèmes de recommandation et diagnostic médical.
- Travaux pratiques : identifier et comparer des solutions IA adaptées à un problème donné.

**Concept des agents intelligents et interactions avec l'environnement (2 heures)**

- Définition et caractéristiques d'un agent intelligent.
- Modèles d'interaction avec l'environnement via capteurs et effecteurs.
- Exemples d'applications en robotique et domotique.
- Travaux pratiques : simuler les interactions d'un agent avec son environnement dans un scénario donné.

**Architecture des agents intelligents (2 heures)**

- Modèles réactifs, délibératifs et hybrides.
- Intégration des modules de perception, décision et action.
- Discussion sur les défis d'implémentation en environnements réels.
- Travaux pratiques : concevoir l'architecture d'un agent pour un cas pratique spécifique.

### Jour 2 : Optimisation et autonomie des systèmes robotisés (6 heures)

**Techniques d'optimisation pour les agents (2 heures)**

- Programmation sous contraintes : principes et applications.
- Recuit simulé : concept et implémentation.
- Comparaison des approches selon les contraintes de performance.
- Travaux pratiques : résoudre un problème d'optimisation avec programmation sous contraintes et recuit simulé.

**Autonomie des systèmes robotisés (2 heures)**

- Boucle perception-décision-action : structure et fonctionnement.
- Gestion des incertitudes dans un environnement dynamique.
- Intégration des algorithmes d'apprentissage pour l'autonomie des systèmes.
- Travaux pratiques : implémenter un algorithme simple d'autonomie pour un robot simulé.

**Tests et validation des systèmes (2 heures)**

- Conception de scénarios de test pour agents intelligents.
- Évaluation des performances et robustesse en conditions simulées.
- Documentation et bonnes pratiques pour déploiement réel.
- Travaux pratiques : tester et analyser les performances d'un agent autonome dans un environnement simulé.

## Organisation de la formation

### Équipe pédagogique

Professionnel expert technique et pédagogique.

### Moyens pédagogiques et techniques, outils

- Espace numérique de travail
- Documents supports de formation projetés
- Exposés théoriques
- Étude de cas concrets
- Quiz en salle
- Mise à disposition en ligne de documents supports à la suite de la formation
- Travaux pratiques (minimum 60 % du temps de formation)
- Outils utilisés (listes non exhaustives) :
  - Logiciels : Python, bibliothèques IA (TensorFlow, PyTorch), simulateurs robotiques (Gazebo, V-REP).
  - Matériel : simulateurs d'agents virtuels.
  - Plateformes : frameworks pour la robotique et l'intelligence artificielle.

### Dispositif de suivi de l'exécution et d'évaluation des résultats de la formation

- Feuilles de présence
- Questions orales ou écrites (QCM)
- Mises en situation
- Formulaires d'évaluation de la formation
- Certificat de réalisation de l'action de formation

### Indicateurs de résultats

- Taux de satisfaction des apprenants
- Nombre d'apprenants
- Taux et causes des abandons
- Taux de retour des enquêtes
- Taux d'interruption en cours de prestation

> Le syllabus officiel reste la référence contractuelle. La mise en page de l'extrait a été normalisée (puces et titres), sans modification de son contenu.
`,C2=`# Consignes de production pédagogique

**ASCENT 4-130, Les agents autonomes et aide à la décision**

## 1. Objectif

Concevoir une expérience pédagogique de 12 heures sur deux jours, fidèle au syllabus officiel 4-130. La formation articule :

1. des présentations techniques animées en motion design ;
2. des visualisations 3D interactives et décomposables ;
3. des notebooks Python exécutables, compatibles GPU ;
4. des simulations d'agents et d'environnements dynamiques ;
5. des travaux pratiques avec paramètres modifiables ;
6. des comparaisons expérimentales et des mesures de performance.

L'approche est démonstrative, interactive, reproductible et techniquement rigoureuse.

## 2. Principe narratif

Un même scénario de référence sert sur les deux jours : un robot autonome évoluant dans un environnement logistique simulé. Il doit observer son environnement, identifier les obstacles, estimer son état et les incertitudes, choisir ses actions, planifier ses déplacements, optimiser son parcours, réagir à des événements imprévus et mesurer sa performance.

Ce scénario évolue à mesure que les apprenants découvrent les concepts. Les cas du diagnostic médical et des systèmes de recommandation, mentionnés dans le syllabus, sont traités comme exemples de comparaison des approches décisionnelles (module 1).

## 3. Structure de chaque module

Chaque module du syllabus dure 2 heures.

| Phase | Durée | Contenu |
| --- | --- | --- |
| Explications | 45 minutes | Motion design, démonstrations 3D, commentaires techniques |
| Travaux pratiques | 75 minutes | Notebooks, simulations, modification des paramètres, analyse des résultats |

Pour six modules : 4 h 30 de théorie et de démonstrations, 7 h 30 de travaux pratiques, soit 62,5 % de pratique. Le minimum contractuel de 60 % est respecté.

Chaque module suit le même cycle : problème, animation explicative, décomposition visuelle 3D, algorithme et code Python, exécution en notebook, simulation, modification des paramètres, observation des résultats, synthèse.

## 4. Jour 1, agents et décision

**Module 1, Solutions IA pour la décision.** Motion design : une décision prise par un système de règles, la circulation des probabilités dans un réseau bayésien, le fonctionnement d'un modèle supervisé, la comparaison des trois approches sur un même problème. Notebook 01 : système à règles, inférence bayésienne, petit modèle supervisé, modification des données d'entrée, visualisation des décisions, probabilités et erreurs, comparaison des résultats.

**Module 2, Interactions agent et environnement.** Motion design : la boucle perception, décision, action, puis capteurs, observations, décisions et effecteurs, enfin la différence entre état réel et état observé. Scène 3D : le robot dans son environnement, ses capteurs isolés, leurs champs de perception, les obstacles et le cycle complet d'une action. Notebook 02 : environnement simulé, agent simple, observations et actions, exécution étape par étape, modification des obstacles, trajectoires.

**Module 3, Architectures d'agents intelligents.** Motion design : architectures réactive, délibérative et hybride, comparaison des flux de traitement. Scène 3D : le même robot contrôlé successivement par les trois architectures, décisions et trajectoires. Notebook 03 : trois contrôleurs simples, mêmes scénarios, comparaison des trajectoires, délais, collisions et réussite, variation de la complexité, limites de chaque architecture.

## 5. Jour 2, optimisation et autonomie

**Module 4, Optimisation des décisions.** Motion design : espace de recherche, contraintes, fonctionnement du recuit simulé, recherche progressive d'une meilleure solution, évolution des scores. Notebook 04 : problème d'optimisation, programmation sous contraintes, recuit simulé, variation de la température, des itérations et des contraintes, convergence, comparaison de la qualité et du temps de calcul.

**Module 5, Autonomie robotique.** Motion design : incertitudes de perception, stratégies de correction, usage d'un modèle appris. Scène 3D : capteurs et effecteurs isolés, obstacle imprévu, pause, explication de chaque nouvelle décision, reprise. Notebook 05 : robot simulé, politique de navigation, obstacles dynamiques, bruit des capteurs, politique simple contre politique améliorée, conséquences sur la navigation.

**Module 6, Tests et validation.** Motion design : robustesse, validation d'un comportement autonome, principaux scénarios d'échec. Scène 3D : plusieurs scénarios de test, perturbations variables, rejeu des erreurs étape par étape, comparaison avant et après correction. Notebook 06 : campagne de simulations, taux de réussite, collisions, temps de décision, longueur des trajectoires, niveaux de perturbation, distribution des performances, rapport de validation.

## 6. Exigences des notebooks

Tous les notebooks :

- sont des fichiers Jupyter \`.ipynb\` qui fonctionnent du début à la fin ;
- détectent le GPU, utilisent CUDA lorsque le calcul s'y prête et gardent une alternative CPU fonctionnelle ;
- documentent leurs dépendances et leurs versions ;
- fixent les graines aléatoires pour des démonstrations reproductibles ;
- proposent des paramètres facilement modifiables et des visualisations interprétables ;
- séparent explications, code et exercices ;
- embarquent des résultats pré-calculés comme solution de repli.

Le GPU accélère les calculs qui s'y prêtent réellement : traitements tensoriels, inférences, apprentissage et simulations parallèles. Les algorithmes séquentiels (A*, CP-SAT, recuit simple) restent sur CPU, et les notebooks le disent.

## 7. Consignes de motion design

Les animations sont scientifiques et non décoratives. Chacune illustre un seul mécanisme principal, introduit les éléments progressivement, affiche les flux d'informations, distingue observations, décisions et actions, permet de s'arrêter sur les étapes importantes, présente des légendes lisibles et peut être commentée en direct. Les segments sont courts, de 30 à 90 secondes.

## 8. Consignes pour les scènes 3D

Les scènes sont explicatives et explorables : rotation et zoom de la caméra, isolation des composants, vue éclatée de l'architecture fonctionnelle du robot, affichage des capteurs, des plans et des trajectoires, états internes, pause, reprise et lecture étape par étape, retour à l'état initial, comparaison de deux exécutions. Elles permettent de comprendre pourquoi le robot prend une décision donnée, pas seulement de le voir bouger.

## 9. Synchronisation des supports

Notebooks, animations et simulations utilisent les mêmes exemples. Une même expérimentation peut être expliquée par une animation, exécutée dans un notebook, visualisée dans la scène 3D, modifiée par les apprenants, puis réexécutée et comparée.

Le format commun de traces (\`ascent-4130-trace/1\`) contient, pour chaque étape : le numéro d'étape, l'état de l'environnement, les observations, la décision de l'agent, l'action exécutée, le résultat et les métriques de performance. Une trace exportée depuis un notebook se rejoue dans l'atelier 3D du site.

## 10. Validation

Avant utilisation en formation, vérifier : l'exécution intégrale des notebooks, la compatibilité GPU et CPU, la stabilité des simulations, la reproductibilité des démonstrations, le fonctionnement des commandes 3D, la cohérence entre animations et algorithmes, l'exécution des supports sans dépendance réseau non maîtrisée, le respect des 12 heures et du minimum de 60 % de travaux pratiques, l'absence de données réelles sensibles, la conformité aux six modules du syllabus 4-130.

## 11. Technologies retenues

| Composant | Technologie | Fonction |
| --- | --- | --- |
| Notebooks | JupyterLab, PyTorch, CUDA avec repli CPU | Exécution des algorithmes, accélération tensorielle |
| Optimisation | OR-Tools (CP-SAT), recuit simulé écrit en Python et en PyTorch | Programmation sous contraintes, recuit simulé |
| Simulation | Simulateur d'entrepôt du paquet \`ascent_agents\`, version par lots en PyTorch | Environnements reproductibles, milliers de simulations parallèles |
| Motion design | Animations SVG programmées en React, pilotables étape par étape | Algorithmes, probabilités, architectures |
| Scènes 3D | Three.js (WebGL) | Exploration dans le navigateur, décomposition étape par étape |
| Graphiques | Matplotlib dans les notebooks, SVG sur le site | Métriques et distributions |
| Publication | Vite, GitHub Actions, GitHub Pages | Site statique, notebooks rendus en HTML |

Deux écarts assumés par rapport aux pistes initiales : les animations sont programmées dans le navigateur plutôt que rendues en vidéo avec Manim, afin de pouvoir être mises en pause, parcourues et alimentées par les données des notebooks ; le simulateur maison remplace NVIDIA Isaac Lab, dont l'environnement technique dédié ne s'installe pas sur un poste de formation standard ni sur un notebook hébergé.
`;function R2(){const{pathname:t}=bo();return te.useEffect(()=>{window.scrollTo(0,0)},[t]),null}function P2(){return m.jsxs(m.Fragment,{children:[m.jsx(R2,{}),m.jsxs("header",{className:"entete",children:[m.jsxs(fs,{to:"/",className:"marque",children:[m.jsx("span",{className:"logo",children:"4-130"}),m.jsxs("span",{children:["Agents autonomes",m.jsx("br",{}),m.jsx("small",{children:"et aide à la décision"})]})]}),m.jsxs("nav",{children:[m.jsx(fs,{to:"/syllabus",children:"Syllabus"}),m.jsxs("div",{className:"menu-modules",children:[m.jsx("span",{children:"Modules"}),m.jsx("div",{className:"sous-menu",children:eo.map(t=>m.jsxs(fs,{to:`/module/${t.n}`,children:[m.jsx("b",{children:t.n})," ",t.titre]},t.n))})]}),m.jsx(fs,{to:"/notebooks",children:"Notebooks"}),m.jsx(fs,{to:"/atelier",children:"Atelier 3D"}),m.jsx(fs,{to:"/consignes",children:"Conception"})]})]}),m.jsx("main",{children:m.jsxs(gE,{children:[m.jsx($i,{path:"/",element:m.jsx(g0,{})}),m.jsx($i,{path:"/syllabus",element:m.jsx(E0,{source:A2,surtitre:"Référentiel officiel ASCENT, Lot 4"})}),m.jsx($i,{path:"/consignes",element:m.jsx(E0,{source:C2,surtitre:"Cahier de conception pédagogique"})}),m.jsx($i,{path:"/module/:n",element:m.jsx(XR,{})}),m.jsx($i,{path:"/notebooks",element:m.jsx(gR,{})}),m.jsx($i,{path:"/atelier",element:m.jsx(qR,{})}),m.jsx($i,{path:"*",element:m.jsx(g0,{})})]})}),m.jsxs("footer",{className:"pied",children:[m.jsxs("div",{children:[m.jsx("strong",{children:"ASCENT 4-130"}),", Les agents autonomes et aide à la décision. Session des 16 et 17 novembre 2026."]}),m.jsxs("div",{children:["Formation conçue et animée par Martino Bettucci, P2Enjoy SAS. ",m.jsx("a",{href:"https://p2enjoy.studio",target:"_blank",rel:"noreferrer",children:"https://p2enjoy.studio"})]})]})]})}Fx(document.getElementById("root")).render(m.jsx(N0.StrictMode,{children:m.jsx(wE,{children:m.jsx(P2,{})})}));
