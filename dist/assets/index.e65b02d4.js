var pr=Object.defineProperty,mr=Object.defineProperties;var hr=Object.getOwnPropertyDescriptors;var ye=Object.getOwnPropertySymbols;var gr=Object.prototype.hasOwnProperty,Er=Object.prototype.propertyIsEnumerable;var be=(r,e,t)=>e in r?pr(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,F=(r,e)=>{for(var t in e||(e={}))gr.call(e,t)&&be(r,t,e[t]);if(ye)for(var t of ye(e))Er.call(e,t)&&be(r,t,e[t]);return r},z=(r,e)=>mr(r,hr(e));const yr=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerpolicy&&(s.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?s.credentials="include":a.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(a){if(a.ep)return;a.ep=!0;const s=t(a);fetch(a.href,s)}};yr();var ce={exports:{}},Me=function(e,t){return function(){for(var a=new Array(arguments.length),s=0;s<a.length;s++)a[s]=arguments[s];return e.apply(t,a)}},br=Me,ue=Object.prototype.toString,fe=function(r){return function(e){var t=ue.call(e);return r[t]||(r[t]=t.slice(8,-1).toLowerCase())}}(Object.create(null));function B(r){return r=r.toLowerCase(),function(t){return fe(t)===r}}function de(r){return Array.isArray(r)}function K(r){return typeof r=="undefined"}function vr(r){return r!==null&&!K(r)&&r.constructor!==null&&!K(r.constructor)&&typeof r.constructor.isBuffer=="function"&&r.constructor.isBuffer(r)}var $e=B("ArrayBuffer");function Sr(r){var e;return typeof ArrayBuffer!="undefined"&&ArrayBuffer.isView?e=ArrayBuffer.isView(r):e=r&&r.buffer&&$e(r.buffer),e}function Or(r){return typeof r=="string"}function wr(r){return typeof r=="number"}function He(r){return r!==null&&typeof r=="object"}function k(r){if(fe(r)!=="object")return!1;var e=Object.getPrototypeOf(r);return e===null||e===Object.prototype}var Ar=B("Date"),Cr=B("File"),Rr=B("Blob"),xr=B("FileList");function pe(r){return ue.call(r)==="[object Function]"}function Tr(r){return He(r)&&pe(r.pipe)}function Fr(r){var e="[object FormData]";return r&&(typeof FormData=="function"&&r instanceof FormData||ue.call(r)===e||pe(r.toString)&&r.toString()===e)}var Pr=B("URLSearchParams");function Dr(r){return r.trim?r.trim():r.replace(/^\s+|\s+$/g,"")}function Nr(){return typeof navigator!="undefined"&&(navigator.product==="ReactNative"||navigator.product==="NativeScript"||navigator.product==="NS")?!1:typeof window!="undefined"&&typeof document!="undefined"}function me(r,e){if(!(r===null||typeof r=="undefined"))if(typeof r!="object"&&(r=[r]),de(r))for(var t=0,n=r.length;t<n;t++)e.call(null,r[t],t,r);else for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&e.call(null,r[a],a,r)}function ie(){var r={};function e(a,s){k(r[s])&&k(a)?r[s]=ie(r[s],a):k(a)?r[s]=ie({},a):de(a)?r[s]=a.slice():r[s]=a}for(var t=0,n=arguments.length;t<n;t++)me(arguments[t],e);return r}function Lr(r,e,t){return me(e,function(a,s){t&&typeof a=="function"?r[s]=br(a,t):r[s]=a}),r}function Br(r){return r.charCodeAt(0)===65279&&(r=r.slice(1)),r}function _r(r,e,t,n){r.prototype=Object.create(e.prototype,n),r.prototype.constructor=r,t&&Object.assign(r.prototype,t)}function Ur(r,e,t){var n,a,s,o={};e=e||{};do{for(n=Object.getOwnPropertyNames(r),a=n.length;a-- >0;)s=n[a],o[s]||(e[s]=r[s],o[s]=!0);r=Object.getPrototypeOf(r)}while(r&&(!t||t(r,e))&&r!==Object.prototype);return e}function jr(r,e,t){r=String(r),(t===void 0||t>r.length)&&(t=r.length),t-=e.length;var n=r.indexOf(e,t);return n!==-1&&n===t}function Ir(r){if(!r)return null;var e=r.length;if(K(e))return null;for(var t=new Array(e);e-- >0;)t[e]=r[e];return t}var Mr=function(r){return function(e){return r&&e instanceof r}}(typeof Uint8Array!="undefined"&&Object.getPrototypeOf(Uint8Array)),w={isArray:de,isArrayBuffer:$e,isBuffer:vr,isFormData:Fr,isArrayBufferView:Sr,isString:Or,isNumber:wr,isObject:He,isPlainObject:k,isUndefined:K,isDate:Ar,isFile:Cr,isBlob:Rr,isFunction:pe,isStream:Tr,isURLSearchParams:Pr,isStandardBrowserEnv:Nr,forEach:me,merge:ie,extend:Lr,trim:Dr,stripBOM:Br,inherits:_r,toFlatObject:Ur,kindOf:fe,kindOfTest:B,endsWith:jr,toArray:Ir,isTypedArray:Mr,isFileList:xr},U=w;function ve(r){return encodeURIComponent(r).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var qe=function(e,t,n){if(!t)return e;var a;if(n)a=n(t);else if(U.isURLSearchParams(t))a=t.toString();else{var s=[];U.forEach(t,function(m,g){m===null||typeof m=="undefined"||(U.isArray(m)?g=g+"[]":m=[m],U.forEach(m,function(h){U.isDate(h)?h=h.toISOString():U.isObject(h)&&(h=JSON.stringify(h)),s.push(ve(g)+"="+ve(h))}))}),a=s.join("&")}if(a){var o=e.indexOf("#");o!==-1&&(e=e.slice(0,o)),e+=(e.indexOf("?")===-1?"?":"&")+a}return e},$r=w;function Y(){this.handlers=[]}Y.prototype.use=function(e,t,n){return this.handlers.push({fulfilled:e,rejected:t,synchronous:n?n.synchronous:!1,runWhen:n?n.runWhen:null}),this.handlers.length-1};Y.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)};Y.prototype.forEach=function(e){$r.forEach(this.handlers,function(n){n!==null&&e(n)})};var Hr=Y,qr=w,Vr=function(e,t){qr.forEach(e,function(a,s){s!==t&&s.toUpperCase()===t.toUpperCase()&&(e[t]=a,delete e[s])})},Ve=w;function M(r,e,t,n,a){Error.call(this),this.message=r,this.name="AxiosError",e&&(this.code=e),t&&(this.config=t),n&&(this.request=n),a&&(this.response=a)}Ve.inherits(M,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code,status:this.response&&this.response.status?this.response.status:null}}});var Ge=M.prototype,Je={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED"].forEach(function(r){Je[r]={value:r}});Object.defineProperties(M,Je);Object.defineProperty(Ge,"isAxiosError",{value:!0});M.from=function(r,e,t,n,a,s){var o=Object.create(Ge);return Ve.toFlatObject(r,o,function(m){return m!==Error.prototype}),M.call(o,r.message,e,t,n,a),o.name=r.name,s&&Object.assign(o,s),o};var q=M,ze={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},T=w;function Gr(r,e){e=e||new FormData;var t=[];function n(s){return s===null?"":T.isDate(s)?s.toISOString():T.isArrayBuffer(s)||T.isTypedArray(s)?typeof Blob=="function"?new Blob([s]):Buffer.from(s):s}function a(s,o){if(T.isPlainObject(s)||T.isArray(s)){if(t.indexOf(s)!==-1)throw Error("Circular reference detected in "+o);t.push(s),T.forEach(s,function(m,g){if(!T.isUndefined(m)){var l=o?o+"."+g:g,h;if(m&&!o&&typeof m=="object"){if(T.endsWith(g,"{}"))m=JSON.stringify(m);else if(T.endsWith(g,"[]")&&(h=T.toArray(m))){h.forEach(function(y){!T.isUndefined(y)&&e.append(l,n(y))});return}}a(m,l)}}),t.pop()}else e.append(o,n(s))}return a(r),e}var We=Gr,te=q,Jr=function(e,t,n){var a=n.config.validateStatus;!n.status||!a||a(n.status)?e(n):t(new te("Request failed with status code "+n.status,[te.ERR_BAD_REQUEST,te.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))},W=w,zr=W.isStandardBrowserEnv()?function(){return{write:function(t,n,a,s,o,d){var m=[];m.push(t+"="+encodeURIComponent(n)),W.isNumber(a)&&m.push("expires="+new Date(a).toGMTString()),W.isString(s)&&m.push("path="+s),W.isString(o)&&m.push("domain="+o),d===!0&&m.push("secure"),document.cookie=m.join("; ")},read:function(t){var n=document.cookie.match(new RegExp("(^|;\\s*)("+t+")=([^;]*)"));return n?decodeURIComponent(n[3]):null},remove:function(t){this.write(t,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}(),Wr=function(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)},kr=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e},Xr=Wr,Kr=kr,ke=function(e,t){return e&&!Xr(t)?Kr(e,t):t},ne=w,Qr=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"],Yr=function(e){var t={},n,a,s;return e&&ne.forEach(e.split(`
`),function(d){if(s=d.indexOf(":"),n=ne.trim(d.substr(0,s)).toLowerCase(),a=ne.trim(d.substr(s+1)),n){if(t[n]&&Qr.indexOf(n)>=0)return;n==="set-cookie"?t[n]=(t[n]?t[n]:[]).concat([a]):t[n]=t[n]?t[n]+", "+a:a}}),t},Se=w,Zr=Se.isStandardBrowserEnv()?function(){var e=/(msie|trident)/i.test(navigator.userAgent),t=document.createElement("a"),n;function a(s){var o=s;return e&&(t.setAttribute("href",o),o=t.href),t.setAttribute("href",o),{href:t.href,protocol:t.protocol?t.protocol.replace(/:$/,""):"",host:t.host,search:t.search?t.search.replace(/^\?/,""):"",hash:t.hash?t.hash.replace(/^#/,""):"",hostname:t.hostname,port:t.port,pathname:t.pathname.charAt(0)==="/"?t.pathname:"/"+t.pathname}}return n=a(window.location.href),function(o){var d=Se.isString(o)?a(o):o;return d.protocol===n.protocol&&d.host===n.host}}():function(){return function(){return!0}}(),oe=q,et=w;function Xe(r){oe.call(this,r==null?"canceled":r,oe.ERR_CANCELED),this.name="CanceledError"}et.inherits(Xe,oe,{__CANCEL__:!0});var Z=Xe,rt=function(e){var t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""},V=w,tt=Jr,nt=zr,at=qe,st=ke,it=Yr,ot=Zr,lt=ze,P=q,ct=Z,ut=rt,Oe=function(e){return new Promise(function(n,a){var s=e.data,o=e.headers,d=e.responseType,m;function g(){e.cancelToken&&e.cancelToken.unsubscribe(m),e.signal&&e.signal.removeEventListener("abort",m)}V.isFormData(s)&&V.isStandardBrowserEnv()&&delete o["Content-Type"];var l=new XMLHttpRequest;if(e.auth){var h=e.auth.username||"",y=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";o.Authorization="Basic "+btoa(h+":"+y)}var b=st(e.baseURL,e.url);l.open(e.method.toUpperCase(),at(b,e.params,e.paramsSerializer),!0),l.timeout=e.timeout;function N(){if(!!l){var A="getAllResponseHeaders"in l?it(l.getAllResponseHeaders()):null,i=!d||d==="text"||d==="json"?l.responseText:l.response,c={data:i,status:l.status,statusText:l.statusText,headers:A,config:e,request:l};tt(function(u){n(u),g()},function(u){a(u),g()},c),l=null}}if("onloadend"in l?l.onloadend=N:l.onreadystatechange=function(){!l||l.readyState!==4||l.status===0&&!(l.responseURL&&l.responseURL.indexOf("file:")===0)||setTimeout(N)},l.onabort=function(){!l||(a(new P("Request aborted",P.ECONNABORTED,e,l)),l=null)},l.onerror=function(){a(new P("Network Error",P.ERR_NETWORK,e,l,l)),l=null},l.ontimeout=function(){var i=e.timeout?"timeout of "+e.timeout+"ms exceeded":"timeout exceeded",c=e.transitional||lt;e.timeoutErrorMessage&&(i=e.timeoutErrorMessage),a(new P(i,c.clarifyTimeoutError?P.ETIMEDOUT:P.ECONNABORTED,e,l)),l=null},V.isStandardBrowserEnv()){var L=(e.withCredentials||ot(b))&&e.xsrfCookieName?nt.read(e.xsrfCookieName):void 0;L&&(o[e.xsrfHeaderName]=L)}"setRequestHeader"in l&&V.forEach(o,function(i,c){typeof s=="undefined"&&c.toLowerCase()==="content-type"?delete o[c]:l.setRequestHeader(c,i)}),V.isUndefined(e.withCredentials)||(l.withCredentials=!!e.withCredentials),d&&d!=="json"&&(l.responseType=e.responseType),typeof e.onDownloadProgress=="function"&&l.addEventListener("progress",e.onDownloadProgress),typeof e.onUploadProgress=="function"&&l.upload&&l.upload.addEventListener("progress",e.onUploadProgress),(e.cancelToken||e.signal)&&(m=function(A){!l||(a(!A||A&&A.type?new ct:A),l.abort(),l=null)},e.cancelToken&&e.cancelToken.subscribe(m),e.signal&&(e.signal.aborted?m():e.signal.addEventListener("abort",m))),s||(s=null);var _=ut(b);if(_&&["http","https","file"].indexOf(_)===-1){a(new P("Unsupported protocol "+_+":",P.ERR_BAD_REQUEST,e));return}l.send(s)})},ft=null,O=w,we=Vr,Ae=q,dt=ze,pt=We,mt={"Content-Type":"application/x-www-form-urlencoded"};function Ce(r,e){!O.isUndefined(r)&&O.isUndefined(r["Content-Type"])&&(r["Content-Type"]=e)}function ht(){var r;return(typeof XMLHttpRequest!="undefined"||typeof process!="undefined"&&Object.prototype.toString.call(process)==="[object process]")&&(r=Oe),r}function gt(r,e,t){if(O.isString(r))try{return(e||JSON.parse)(r),O.trim(r)}catch(n){if(n.name!=="SyntaxError")throw n}return(t||JSON.stringify)(r)}var ee={transitional:dt,adapter:ht(),transformRequest:[function(e,t){if(we(t,"Accept"),we(t,"Content-Type"),O.isFormData(e)||O.isArrayBuffer(e)||O.isBuffer(e)||O.isStream(e)||O.isFile(e)||O.isBlob(e))return e;if(O.isArrayBufferView(e))return e.buffer;if(O.isURLSearchParams(e))return Ce(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString();var n=O.isObject(e),a=t&&t["Content-Type"],s;if((s=O.isFileList(e))||n&&a==="multipart/form-data"){var o=this.env&&this.env.FormData;return pt(s?{"files[]":e}:e,o&&new o)}else if(n||a==="application/json")return Ce(t,"application/json"),gt(e);return e}],transformResponse:[function(e){var t=this.transitional||ee.transitional,n=t&&t.silentJSONParsing,a=t&&t.forcedJSONParsing,s=!n&&this.responseType==="json";if(s||a&&O.isString(e)&&e.length)try{return JSON.parse(e)}catch(o){if(s)throw o.name==="SyntaxError"?Ae.from(o,Ae.ERR_BAD_RESPONSE,this,null,this.response):o}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:ft},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};O.forEach(["delete","get","head"],function(e){ee.headers[e]={}});O.forEach(["post","put","patch"],function(e){ee.headers[e]=O.merge(mt)});var he=ee,Et=w,yt=he,bt=function(e,t,n){var a=this||yt;return Et.forEach(n,function(o){e=o.call(a,e,t)}),e},Ke=function(e){return!!(e&&e.__CANCEL__)},Re=w,ae=bt,vt=Ke,St=he,Ot=Z;function se(r){if(r.cancelToken&&r.cancelToken.throwIfRequested(),r.signal&&r.signal.aborted)throw new Ot}var wt=function(e){se(e),e.headers=e.headers||{},e.data=ae.call(e,e.data,e.headers,e.transformRequest),e.headers=Re.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),Re.forEach(["delete","get","head","post","put","patch","common"],function(a){delete e.headers[a]});var t=e.adapter||St.adapter;return t(e).then(function(a){return se(e),a.data=ae.call(e,a.data,a.headers,e.transformResponse),a},function(a){return vt(a)||(se(e),a&&a.response&&(a.response.data=ae.call(e,a.response.data,a.response.headers,e.transformResponse))),Promise.reject(a)})},x=w,Qe=function(e,t){t=t||{};var n={};function a(l,h){return x.isPlainObject(l)&&x.isPlainObject(h)?x.merge(l,h):x.isPlainObject(h)?x.merge({},h):x.isArray(h)?h.slice():h}function s(l){if(x.isUndefined(t[l])){if(!x.isUndefined(e[l]))return a(void 0,e[l])}else return a(e[l],t[l])}function o(l){if(!x.isUndefined(t[l]))return a(void 0,t[l])}function d(l){if(x.isUndefined(t[l])){if(!x.isUndefined(e[l]))return a(void 0,e[l])}else return a(void 0,t[l])}function m(l){if(l in t)return a(e[l],t[l]);if(l in e)return a(void 0,e[l])}var g={url:o,method:o,data:o,baseURL:d,transformRequest:d,transformResponse:d,paramsSerializer:d,timeout:d,timeoutMessage:d,withCredentials:d,adapter:d,responseType:d,xsrfCookieName:d,xsrfHeaderName:d,onUploadProgress:d,onDownloadProgress:d,decompress:d,maxContentLength:d,maxBodyLength:d,beforeRedirect:d,transport:d,httpAgent:d,httpsAgent:d,cancelToken:d,socketPath:d,responseEncoding:d,validateStatus:m};return x.forEach(Object.keys(e).concat(Object.keys(t)),function(h){var y=g[h]||s,b=y(h);x.isUndefined(b)&&y!==m||(n[h]=b)}),n},Ye={version:"0.27.2"},At=Ye.version,D=q,ge={};["object","boolean","number","function","string","symbol"].forEach(function(r,e){ge[r]=function(n){return typeof n===r||"a"+(e<1?"n ":" ")+r}});var xe={};ge.transitional=function(e,t,n){function a(s,o){return"[Axios v"+At+"] Transitional option '"+s+"'"+o+(n?". "+n:"")}return function(s,o,d){if(e===!1)throw new D(a(o," has been removed"+(t?" in "+t:"")),D.ERR_DEPRECATED);return t&&!xe[o]&&(xe[o]=!0,console.warn(a(o," has been deprecated since v"+t+" and will be removed in the near future"))),e?e(s,o,d):!0}};function Ct(r,e,t){if(typeof r!="object")throw new D("options must be an object",D.ERR_BAD_OPTION_VALUE);for(var n=Object.keys(r),a=n.length;a-- >0;){var s=n[a],o=e[s];if(o){var d=r[s],m=d===void 0||o(d,s,r);if(m!==!0)throw new D("option "+s+" must be "+m,D.ERR_BAD_OPTION_VALUE);continue}if(t!==!0)throw new D("Unknown option "+s,D.ERR_BAD_OPTION)}}var Rt={assertOptions:Ct,validators:ge},Ze=w,xt=qe,Te=Hr,Fe=wt,re=Qe,Tt=ke,er=Rt,j=er.validators;function $(r){this.defaults=r,this.interceptors={request:new Te,response:new Te}}$.prototype.request=function(e,t){typeof e=="string"?(t=t||{},t.url=e):t=e||{},t=re(this.defaults,t),t.method?t.method=t.method.toLowerCase():this.defaults.method?t.method=this.defaults.method.toLowerCase():t.method="get";var n=t.transitional;n!==void 0&&er.assertOptions(n,{silentJSONParsing:j.transitional(j.boolean),forcedJSONParsing:j.transitional(j.boolean),clarifyTimeoutError:j.transitional(j.boolean)},!1);var a=[],s=!0;this.interceptors.request.forEach(function(b){typeof b.runWhen=="function"&&b.runWhen(t)===!1||(s=s&&b.synchronous,a.unshift(b.fulfilled,b.rejected))});var o=[];this.interceptors.response.forEach(function(b){o.push(b.fulfilled,b.rejected)});var d;if(!s){var m=[Fe,void 0];for(Array.prototype.unshift.apply(m,a),m=m.concat(o),d=Promise.resolve(t);m.length;)d=d.then(m.shift(),m.shift());return d}for(var g=t;a.length;){var l=a.shift(),h=a.shift();try{g=l(g)}catch(y){h(y);break}}try{d=Fe(g)}catch(y){return Promise.reject(y)}for(;o.length;)d=d.then(o.shift(),o.shift());return d};$.prototype.getUri=function(e){e=re(this.defaults,e);var t=Tt(e.baseURL,e.url);return xt(t,e.params,e.paramsSerializer)};Ze.forEach(["delete","get","head","options"],function(e){$.prototype[e]=function(t,n){return this.request(re(n||{},{method:e,url:t,data:(n||{}).data}))}});Ze.forEach(["post","put","patch"],function(e){function t(n){return function(s,o,d){return this.request(re(d||{},{method:e,headers:n?{"Content-Type":"multipart/form-data"}:{},url:s,data:o}))}}$.prototype[e]=t(),$.prototype[e+"Form"]=t(!0)});var Ft=$,Pt=Z;function H(r){if(typeof r!="function")throw new TypeError("executor must be a function.");var e;this.promise=new Promise(function(a){e=a});var t=this;this.promise.then(function(n){if(!!t._listeners){var a,s=t._listeners.length;for(a=0;a<s;a++)t._listeners[a](n);t._listeners=null}}),this.promise.then=function(n){var a,s=new Promise(function(o){t.subscribe(o),a=o}).then(n);return s.cancel=function(){t.unsubscribe(a)},s},r(function(a){t.reason||(t.reason=new Pt(a),e(t.reason))})}H.prototype.throwIfRequested=function(){if(this.reason)throw this.reason};H.prototype.subscribe=function(e){if(this.reason){e(this.reason);return}this._listeners?this._listeners.push(e):this._listeners=[e]};H.prototype.unsubscribe=function(e){if(!!this._listeners){var t=this._listeners.indexOf(e);t!==-1&&this._listeners.splice(t,1)}};H.source=function(){var e,t=new H(function(a){e=a});return{token:t,cancel:e}};var Dt=H,Nt=function(e){return function(n){return e.apply(null,n)}},Lt=w,Bt=function(e){return Lt.isObject(e)&&e.isAxiosError===!0},Pe=w,_t=Me,X=Ft,Ut=Qe,jt=he;function rr(r){var e=new X(r),t=_t(X.prototype.request,e);return Pe.extend(t,X.prototype,e),Pe.extend(t,e),t.create=function(a){return rr(Ut(r,a))},t}var C=rr(jt);C.Axios=X;C.CanceledError=Z;C.CancelToken=Dt;C.isCancel=Ke;C.VERSION=Ye.version;C.toFormData=We;C.AxiosError=q;C.Cancel=C.CanceledError;C.all=function(e){return Promise.all(e)};C.spread=Nt;C.isAxiosError=Bt;ce.exports=C;ce.exports.default=C;var It=ce.exports,tr={},Mt=r=>encodeURIComponent(r).replace(/[!'()*]/g,e=>`%${e.charCodeAt(0).toString(16).toUpperCase()}`),nr="%[a-f0-9]{2}",De=new RegExp(nr,"gi"),Ne=new RegExp("("+nr+")+","gi");function le(r,e){try{return decodeURIComponent(r.join(""))}catch{}if(r.length===1)return r;e=e||1;var t=r.slice(0,e),n=r.slice(e);return Array.prototype.concat.call([],le(t),le(n))}function $t(r){try{return decodeURIComponent(r)}catch{for(var e=r.match(De),t=1;t<e.length;t++)r=le(e,t).join(""),e=r.match(De);return r}}function Ht(r){for(var e={"%FE%FF":"\uFFFD\uFFFD","%FF%FE":"\uFFFD\uFFFD"},t=Ne.exec(r);t;){try{e[t[0]]=decodeURIComponent(t[0])}catch{var n=$t(t[0]);n!==t[0]&&(e[t[0]]=n)}t=Ne.exec(r)}e["%C2"]="\uFFFD";for(var a=Object.keys(e),s=0;s<a.length;s++){var o=a[s];r=r.replace(new RegExp(o,"g"),e[o])}return r}var qt=function(r){if(typeof r!="string")throw new TypeError("Expected `encodedURI` to be of type `string`, got `"+typeof r+"`");try{return r=r.replace(/\+/g," "),decodeURIComponent(r)}catch{return Ht(r)}},Vt=(r,e)=>{if(!(typeof r=="string"&&typeof e=="string"))throw new TypeError("Expected the arguments to be of type `string`");if(e==="")return[r];const t=r.indexOf(e);return t===-1?[r]:[r.slice(0,t),r.slice(t+e.length)]},Gt=function(r,e){for(var t={},n=Object.keys(r),a=Array.isArray(e),s=0;s<n.length;s++){var o=n[s],d=r[o];(a?e.indexOf(o)!==-1:e(o,d,r))&&(t[o]=d)}return t};(function(r){const e=Mt,t=qt,n=Vt,a=Gt,s=i=>i==null,o=Symbol("encodeFragmentIdentifier");function d(i){switch(i.arrayFormat){case"index":return c=>(f,u)=>{const p=f.length;return u===void 0||i.skipNull&&u===null||i.skipEmptyString&&u===""?f:u===null?[...f,[l(c,i),"[",p,"]"].join("")]:[...f,[l(c,i),"[",l(p,i),"]=",l(u,i)].join("")]};case"bracket":return c=>(f,u)=>u===void 0||i.skipNull&&u===null||i.skipEmptyString&&u===""?f:u===null?[...f,[l(c,i),"[]"].join("")]:[...f,[l(c,i),"[]=",l(u,i)].join("")];case"colon-list-separator":return c=>(f,u)=>u===void 0||i.skipNull&&u===null||i.skipEmptyString&&u===""?f:u===null?[...f,[l(c,i),":list="].join("")]:[...f,[l(c,i),":list=",l(u,i)].join("")];case"comma":case"separator":case"bracket-separator":{const c=i.arrayFormat==="bracket-separator"?"[]=":"=";return f=>(u,p)=>p===void 0||i.skipNull&&p===null||i.skipEmptyString&&p===""?u:(p=p===null?"":p,u.length===0?[[l(f,i),c,l(p,i)].join("")]:[[u,l(p,i)].join(i.arrayFormatSeparator)])}default:return c=>(f,u)=>u===void 0||i.skipNull&&u===null||i.skipEmptyString&&u===""?f:u===null?[...f,l(c,i)]:[...f,[l(c,i),"=",l(u,i)].join("")]}}function m(i){let c;switch(i.arrayFormat){case"index":return(f,u,p)=>{if(c=/\[(\d*)\]$/.exec(f),f=f.replace(/\[\d*\]$/,""),!c){p[f]=u;return}p[f]===void 0&&(p[f]={}),p[f][c[1]]=u};case"bracket":return(f,u,p)=>{if(c=/(\[\])$/.exec(f),f=f.replace(/\[\]$/,""),!c){p[f]=u;return}if(p[f]===void 0){p[f]=[u];return}p[f]=[].concat(p[f],u)};case"colon-list-separator":return(f,u,p)=>{if(c=/(:list)$/.exec(f),f=f.replace(/:list$/,""),!c){p[f]=u;return}if(p[f]===void 0){p[f]=[u];return}p[f]=[].concat(p[f],u)};case"comma":case"separator":return(f,u,p)=>{const v=typeof u=="string"&&u.includes(i.arrayFormatSeparator),E=typeof u=="string"&&!v&&h(u,i).includes(i.arrayFormatSeparator);u=E?h(u,i):u;const R=v||E?u.split(i.arrayFormatSeparator).map(dr=>h(dr,i)):u===null?u:h(u,i);p[f]=R};case"bracket-separator":return(f,u,p)=>{const v=/(\[\])$/.test(f);if(f=f.replace(/\[\]$/,""),!v){p[f]=u&&h(u,i);return}const E=u===null?[]:u.split(i.arrayFormatSeparator).map(R=>h(R,i));if(p[f]===void 0){p[f]=E;return}p[f]=[].concat(p[f],E)};default:return(f,u,p)=>{if(p[f]===void 0){p[f]=u;return}p[f]=[].concat(p[f],u)}}}function g(i){if(typeof i!="string"||i.length!==1)throw new TypeError("arrayFormatSeparator must be single character string")}function l(i,c){return c.encode?c.strict?e(i):encodeURIComponent(i):i}function h(i,c){return c.decode?t(i):i}function y(i){return Array.isArray(i)?i.sort():typeof i=="object"?y(Object.keys(i)).sort((c,f)=>Number(c)-Number(f)).map(c=>i[c]):i}function b(i){const c=i.indexOf("#");return c!==-1&&(i=i.slice(0,c)),i}function N(i){let c="";const f=i.indexOf("#");return f!==-1&&(c=i.slice(f)),c}function L(i){i=b(i);const c=i.indexOf("?");return c===-1?"":i.slice(c+1)}function _(i,c){return c.parseNumbers&&!Number.isNaN(Number(i))&&typeof i=="string"&&i.trim()!==""?i=Number(i):c.parseBooleans&&i!==null&&(i.toLowerCase()==="true"||i.toLowerCase()==="false")&&(i=i.toLowerCase()==="true"),i}function A(i,c){c=Object.assign({decode:!0,sort:!0,arrayFormat:"none",arrayFormatSeparator:",",parseNumbers:!1,parseBooleans:!1},c),g(c.arrayFormatSeparator);const f=m(c),u=Object.create(null);if(typeof i!="string"||(i=i.trim().replace(/^[?#&]/,""),!i))return u;for(const p of i.split("&")){if(p==="")continue;let[v,E]=n(c.decode?p.replace(/\+/g," "):p,"=");E=E===void 0?null:["comma","separator","bracket-separator"].includes(c.arrayFormat)?E:h(E,c),f(h(v,c),E,u)}for(const p of Object.keys(u)){const v=u[p];if(typeof v=="object"&&v!==null)for(const E of Object.keys(v))v[E]=_(v[E],c);else u[p]=_(v,c)}return c.sort===!1?u:(c.sort===!0?Object.keys(u).sort():Object.keys(u).sort(c.sort)).reduce((p,v)=>{const E=u[v];return Boolean(E)&&typeof E=="object"&&!Array.isArray(E)?p[v]=y(E):p[v]=E,p},Object.create(null))}r.extract=L,r.parse=A,r.stringify=(i,c)=>{if(!i)return"";c=Object.assign({encode:!0,strict:!0,arrayFormat:"none",arrayFormatSeparator:","},c),g(c.arrayFormatSeparator);const f=E=>c.skipNull&&s(i[E])||c.skipEmptyString&&i[E]==="",u=d(c),p={};for(const E of Object.keys(i))f(E)||(p[E]=i[E]);const v=Object.keys(p);return c.sort!==!1&&v.sort(c.sort),v.map(E=>{const R=i[E];return R===void 0?"":R===null?l(E,c):Array.isArray(R)?R.length===0&&c.arrayFormat==="bracket-separator"?l(E,c)+"[]":R.reduce(u(E),[]).join("&"):l(E,c)+"="+l(R,c)}).filter(E=>E.length>0).join("&")},r.parseUrl=(i,c)=>{c=Object.assign({decode:!0},c);const[f,u]=n(i,"#");return Object.assign({url:f.split("?")[0]||"",query:A(L(i),c)},c&&c.parseFragmentIdentifier&&u?{fragmentIdentifier:h(u,c)}:{})},r.stringifyUrl=(i,c)=>{c=Object.assign({encode:!0,strict:!0,[o]:!0},c);const f=b(i.url).split("?")[0]||"",u=r.extract(i.url),p=r.parse(u,{sort:!1}),v=Object.assign(p,i.query);let E=r.stringify(v,c);E&&(E=`?${E}`);let R=N(i.url);return i.fragmentIdentifier&&(R=`#${c[o]?l(i.fragmentIdentifier,c):i.fragmentIdentifier}`),`${f}${E}${R}`},r.pick=(i,c,f)=>{f=Object.assign({parseFragmentIdentifier:!0,[o]:!1},f);const{url:u,query:p,fragmentIdentifier:v}=r.parseUrl(i,f);return r.stringifyUrl({url:u,query:a(p,c),fragmentIdentifier:v},f)},r.exclude=(i,c,f)=>{const u=Array.isArray(c)?p=>!c.includes(p):(p,v)=>!c(p,v);return r.pick(i,u,f)}})(tr);let Le,Be;function Jt(){Be=Object.assign({},S.graphicParameters);const r=new Map(Object.entries(F({},I)));let e=new Map(Object.entries(Be));return Ee(e,r),sr(e)}function ar(r){return Object.entries(r).reduce((e,[t,n])=>(n!==!1&&(n==null||n=="")||(e[t]=n),e),{})}function zt(){let r=`<pre>
<span class='c'>&lt;!-- c\xF3digo HTML donde ubicar un div con una tarjeta --&gt;</span>
<span class='p'>&lt;</span><span class='nt'>div</span> <span class='na'>id</span><span class='o'>=</span><span class='s'>'tmi'</span><span class='p'>&gt;&lt;/</span> <span class='nt'>div</span><span class='p'>&gt;</span>

<span class='c'>&lt;!-- JS que genera la tarjeta en el div --&gt;</span>
<span class='p'>&lt;</span><span class='nt'>script</span><span class='p'>&gt;</span>
    <span class='nb'>window</span><span class='p'>.</span><span class='nx'>onload</span> <span class='o'>=</span> <span class='kd'>function</span><span class='p'>()</span> <span class='p'>{</span>
        <span class='nx'>TSComponents</span><span class='p'>.</span><span class='nx'>Card</span><span class='p'>.</span><span class='nx'>render</span><span class='p'>(</span><span class='s1'>'tmi'</span><span class='p'>,</span> <span class='p'>{</span>
            `+kt()+`<span class='p'>})</span>
    <span class='p'>}</span>
<span class='p'>&lt;/</span><span class='nt'>script</span><span class='p'>&gt;</span>
</pre>`,e=document.getElementById("codeTagCard");e&&(e.innerHTML=r)}function Wt(){let r=`<pre>
<span class='c'>&lt;!-- c\xF3digo HTML donde ubicar un div con un Graphic --&gt;</span>
<span class='p'>&lt;</span><span class='nt'>div</span> <span class='na'>id</span><span class='o'>=</span><span class='s'>'tmi'</span><span class='p'>&gt;&lt;/</span> <span class='nt'>div</span><span class='p'>&gt;</span>

<span class='c'>&lt;!-- JS que genera el Graph en el div --&gt;</span>
<span class='p'>&lt;</span><span class='nt'>script</span><span class='p'>&gt;</span>
    <span class='nb'>window</span><span class='p'>.</span><span class='nx'>onload</span> <span class='o'>=</span> <span class='kd'>function</span><span class='p'>()</span> <span class='p'>{</span>
        <span class='nx'>TSComponents</span><span class='p'>.</span><span class='nx'>Graphic</span><span class='p'>.</span><span class='nx'>render</span><span class='p'>(</span><span class='s1'>'tmi'</span><span class='p'>,</span> <span class='p'>{</span>
            `+Jt()+`<span class='p'>})</span>
    <span class='p'>}</span>
<span class='p'>&lt;/</span><span class='nt'>script</span><span class='p'>&gt;</span>
</pre>`,e=document.getElementById("codeTagGraph");e&&(e.innerHTML=r)}function kt(){Le=Object.assign({},S.cardParameters);const r=new Map(Object.entries(z(F({},Q),{numbersAbbreviate:!0})));let e=new Map(Object.entries(Le));return Ee(e,r),sr(e)}function Ee(r,e){r.forEach((t,n,a)=>{e.get(n)==t&&a.delete(n)})}function sr(r){let e="";return console.log(r),r.forEach((t,n)=>{let a=t!=!0&&t!=!1?"'":" ",s=a;if(n.toString().includes("chartOptions")&&(t=JSON.stringify(t),s="",a=""),n.toString().includes("colors")){let d=t.map((m,g)=>g%2?'"'+m+'"':m);a="[",s="]",t=d}e+="<span class='nx'>"+n+"</span><span class='o'>:</span><span class='s1'>"+a+t.toString()+s+`,</span>
            `}),e}function Xt(r){let e=new Map;e.set("line","L\xEDnea").set("area","\xC1rea").set("column","Columna"),ir(r,"chartTypeBySeries",e,"Tipo de gr\xE1fico para la serie:")}function Kt(r){let e=new Map;e.set("right","Derecha").set("left","Izquierda"),ir(r,"seriesAxisBySeries",e,"Ubicaci\xF3n del eje para la serie:")}function ir(r,e,t,n){let a=document.getElementById(e),s=(g,l)=>'<option value="'+g+'">'+l+"</option>",o=s("","");t.forEach((g,l)=>o+=s(l,g));let d=g=>"<label for='"+e+"'>"+n+g+' </label><br><select name="'+e+g+'" class="format form-control">'+o+"</select>",m="";r.forEach(g=>{m+=d(g)}),a&&(a.innerHTML=m)}function Qt(r){or(r,"decimalTooltipsBySeries","number","Cantidad de decimales en tooltip para la serie:")}function Yt(r){or(r,"legendLabelBySeries","text","Texto en leyenda para la serie:")}function or(r,e,t,n){let a=document.getElementById(e),s=d=>"<label for='"+e+"'>"+n+" "+d+' </label><br><input type="'+t+'" class="form-control" name="'+e+d+'" >',o="";r.forEach(d=>{o+=s(d)}),a&&(a.innerHTML=o)}function _e(r){let e=document.getElementById("card-error-container");e&&(e.textContent=r)}function Ue(r){let e=document.getElementById("graph-error-container");e&&(e.textContent=r)}function je(){let r=document.getElementById("card_example");r&&(r.innerHTML="")}function Ie(){let r=document.getElementById("graph_example");r&&(r.innerHTML="")}const Zt=Intl.DateTimeFormat;let en=new Zt("fr-ca");const rn=window,lr=rn.TSComponents,tn="https://apis.datos.gob.ar/series/api/series/";let S,Q={apiBaseUrl:"http://apis.datos.gob.ar/series/api",collapse:"",color:"#0072bb",decimals:2,decimalsBillion:2,decimalsMillion:2,explicitSign:!1,hasChart:"small",hasColorBar:!1,hasFrame:!1,isPercentage:!1,links:"full",locale:"AR",numbersAbbreviate:!0,serieId:"",source:"",title:"",units:""},cr=new Map().set(0,"#0072bb").set(1,"#2e7d33").set(2,"#c62828").set(3,"#f9a822").set(4,"#6a1b99").set(5,"#ec407a").set(6,"#c2185b").set(7,"#039be5").set(8,"#6ea100"),I={aggregationSelector:!1,backgroundColor:"#ffffff",chartOptions:void 0,chartType:"line",chartTypeSelector:!1,chartTypes:{},colors:Array.from(cr).flatMap(r=>r),datePickerEnabled:!1,decimalLeftAxis:void 0,decimalRightAxis:void 0,decimalTooltip:void 0,decimalTooltips:{},decimalsBillion:2,decimalsMillion:2,displayUnits:!1,endDate:"",exportable:!1,frequencySelector:!1,graphicUrl:"",legendField:"title",legendLabel:void 0,locale:"AR",navigator:!1,numbersAbbreviate:!0,seriesAxis:void 0,source:"",startDate:"",title:"",unitsSelector:!1,zoom:!1},G=1,J=1;function nn(){console.log("entre en reload components: estos son los cardParameters agraficar"),console.log(S.cardParameters);let r=document.getElementById("card_example_"+G.toString());G=G+1,r&&(r.outerHTML='<div id="card_example_'+G.toString()+'"></div>'),lr.Card.render("card_example_"+G.toString(),S.cardParameters)}function an(){console.log("entre en reload components: estos son los graphParam agraficar");let r=Object.assign({},S.graphicParameters);const e=new Map(Object.entries(F({},I)));let t=new Map(Object.entries(r));Ee(t,e),r=Object.fromEntries(t),console.log(r);let n=document.getElementById("graph_example_"+J.toString());J=J+1,n&&(n.outerHTML='<div id="graph_example_'+J.toString()+'"></div>'),lr.Graphic.render("graph_example_"+J.toString(),r)}function ur(){S.cardErrorMap=[]}function sn(){var s,o;const r=document.getElementById("form-card"),e=new FormData(r);var t={};e.forEach((d,m)=>{t[m]=d,d.toString().includes("Disabled")?t[m]=!1:d.toString().includes("Enabled")&&(t[m]=!0)});let n=z(F(F({},Q),t),{apiBaseUrl:t.apiBaseUrl?t.apiBaseUrl:Q.apiBaseUrl});S.cardParameters=ar(n);let a=new Array;a.push((s=S.cardParameters)==null?void 0:s.serieId),fr(a,(o=S.cardParameters)==null?void 0:o.collapse).then(()=>{je(),nn(),_e(""),ur()}).catch(d=>{S.cardErrorMap=d.response.data.errors;let m="";S.cardErrorMap.forEach(g=>{m+=`
`+g.error}),_e(m),je()})}function on(){var l;const r=document.getElementById("form-graph"),e=new FormData(r);let t=new Map(cr);var n={};let a={};e.forEach((h,y)=>{if(h.toString().includes("Disabled"))n[y]=!1;else if(h.toString().includes("Enabled"))n[y]=!0;else if(y.toString().includes("colorPalette")){let b=parseInt(y.substring(y.length-1,y.length));t.set(b,h.toString())}else if(y.toString().includes("chartTypes")&&h!=I.chartType)a[y.toString().split("chartTypes")[1]]=h;else if(y.toString().includes("BySeries")&&h){let[b,N]=y.split("BySeries");n[b]||(n[b]={[N]:{}});let L=n[b];L[N]=b.includes("decimal")?parseInt(h.toString()):h}else if(y.toString().includes("Date")&&h){let b=en.format(Date.parse(h.toString()));n[y]=b}else!n[y]&&h&&h!=I[y]&&(n[y]=h)}),n.colors=Array.from(t).flatMap(h=>h);let s=F(F({},I),n);S.graphicParameters=ar(s);let o=tr.parseUrl((l=S.graphicParameters)!=null&&l.graphicUrl?S.graphicParameters.graphicUrl:""),m=o==null?void 0:o.query,g=Array.from(m.ids?m.ids.split(","):"");S.seriesIdGraph=Array.from(g),S.seriesIdGraph.forEach(h=>({})),fr(g,"").then(()=>{Ie(),Yt(g),Xt(g),Kt(g),Qt(g),an(),Ue(""),ur()}).catch(h=>{h.response?S.graphErrorMap=h.response.data.errors:S.graphErrorMap.push(h.message);let y="";S.graphErrorMap.forEach(b=>{y+=`
`+b.error}),Ue(y),Ie()})}function ln(){if(!S){S={cardParameters:Q,graphicParameters:I,cardErrorMap:new Array,graphErrorMap:new Array,seriesIdGraph:new Array};const r=document.getElementById("previewButtonCard");r==null||r.addEventListener("click",sn);const e=document.getElementById("generateCardHTML");e==null||e.addEventListener("click",zt);const t=document.getElementById("previewButtonGraph");t==null||t.addEventListener("click",on);const n=document.getElementById("generateGraphHTML");n==null||n.addEventListener("click",Wt)}}function fr(r,e){let t={ids:r.join(",")},n=z(F({},t),{collapse:e,collapse_aggregation:"sum"}),s={params:e?n:t};return console.log(s),It.get(tn,s)}window.onload=ln;
