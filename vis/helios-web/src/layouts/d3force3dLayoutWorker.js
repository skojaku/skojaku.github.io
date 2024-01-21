
// Temporary fix for
// https://github.com/evanw/esbuild/issues/312

let workerFunction = (function (){
	//dummy require
	var require = function(moduleName){};
	// // // https://d3js.org/d3-dispatch/ v3.0.1 Copyright 2010-2021 Mike Bostock
	!function(n,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((n="undefined"!=typeof globalThis?globalThis:n||self).d3=n.d3||{})}(this,(function(n){"use strict";var e={value:()=>{}};function t(){for(var n,e=0,t=arguments.length,o={};e<t;++e){if(!(n=arguments[e]+"")||n in o||/[\s.]/.test(n))throw new Error("illegal type: "+n);o[n]=[]}return new r(o)}function r(n){this._=n}function o(n,e){return n.trim().split(/^|\s+/).map((function(n){var t="",r=n.indexOf(".");if(r>=0&&(t=n.slice(r+1),n=n.slice(0,r)),n&&!e.hasOwnProperty(n))throw new Error("unknown type: "+n);return{type:n,name:t}}))}function i(n,e){for(var t,r=0,o=n.length;r<o;++r)if((t=n[r]).name===e)return t.value}function f(n,t,r){for(var o=0,i=n.length;o<i;++o)if(n[o].name===t){n[o]=e,n=n.slice(0,o).concat(n.slice(o+1));break}return null!=r&&n.push({name:t,value:r}),n}r.prototype=t.prototype={constructor:r,on:function(n,e){var t,r=this._,l=o(n+"",r),a=-1,u=l.length;if(!(arguments.length<2)){if(null!=e&&"function"!=typeof e)throw new Error("invalid callback: "+e);for(;++a<u;)if(t=(n=l[a]).type)r[t]=f(r[t],n.name,e);else if(null==e)for(t in r)r[t]=f(r[t],n.name,null);return this}for(;++a<u;)if((t=(n=l[a]).type)&&(t=i(r[t],n.name)))return t},copy:function(){var n={},e=this._;for(var t in e)n[t]=e[t].slice();return new r(n)},call:function(n,e){if((t=arguments.length-2)>0)for(var t,r,o=new Array(t),i=0;i<t;++i)o[i]=arguments[i+2];if(!this._.hasOwnProperty(n))throw new Error("unknown type: "+n);for(i=0,t=(r=this._[n]).length;i<t;++i)r[i].value.apply(e,o)},apply:function(n,e,t){if(!this._.hasOwnProperty(n))throw new Error("unknown type: "+n);for(var r=this._[n],o=0,i=r.length;o<i;++o)r[o].value.apply(e,t)}},n.dispatch=t,Object.defineProperty(n,"__esModule",{value:!0})}));
	// // // https://d3js.org/d3-quadtree/ v3.0.1 Copyright 2010-2021 Mike Bostock
	!function(t,i){"object"==typeof exports&&"undefined"!=typeof module?i(exports):"function"==typeof define&&define.amd?define(["exports"],i):i((t="undefined"!=typeof globalThis?globalThis:t||self).d3=t.d3||{})}(this,(function(t){"use strict";function i(t,i,e,n){if(isNaN(i)||isNaN(e))return t;var r,s,h,o,a,u,l,_,f,c=t._root,x={data:n},y=t._x0,d=t._y0,p=t._x1,v=t._y1;if(!c)return t._root=x,t;for(;c.length;)if((u=i>=(s=(y+p)/2))?y=s:p=s,(l=e>=(h=(d+v)/2))?d=h:v=h,r=c,!(c=c[_=l<<1|u]))return r[_]=x,t;if(o=+t._x.call(null,c.data),a=+t._y.call(null,c.data),i===o&&e===a)return x.next=c,r?r[_]=x:t._root=x,t;do{r=r?r[_]=new Array(4):t._root=new Array(4),(u=i>=(s=(y+p)/2))?y=s:p=s,(l=e>=(h=(d+v)/2))?d=h:v=h}while((_=l<<1|u)==(f=(a>=h)<<1|o>=s));return r[f]=c,r[_]=x,t}function e(t,i,e,n,r){this.node=t,this.x0=i,this.y0=e,this.x1=n,this.y1=r}function n(t){return t[0]}function r(t){return t[1]}function s(t,i,e){var s=new h(null==i?n:i,null==e?r:e,NaN,NaN,NaN,NaN);return null==t?s:s.addAll(t)}function h(t,i,e,n,r,s){this._x=t,this._y=i,this._x0=e,this._y0=n,this._x1=r,this._y1=s,this._root=void 0}function o(t){for(var i={data:t.data},e=i;t=t.next;)e=e.next={data:t.data};return i}var a=s.prototype=h.prototype;a.copy=function(){var t,i,e=new h(this._x,this._y,this._x0,this._y0,this._x1,this._y1),n=this._root;if(!n)return e;if(!n.length)return e._root=o(n),e;for(t=[{source:n,target:e._root=new Array(4)}];n=t.pop();)for(var r=0;r<4;++r)(i=n.source[r])&&(i.length?t.push({source:i,target:n.target[r]=new Array(4)}):n.target[r]=o(i));return e},a.add=function(t){const e=+this._x.call(null,t),n=+this._y.call(null,t);return i(this.cover(e,n),e,n,t)},a.addAll=function(t){var e,n,r,s,h=t.length,o=new Array(h),a=new Array(h),u=1/0,l=1/0,_=-1/0,f=-1/0;for(n=0;n<h;++n)isNaN(r=+this._x.call(null,e=t[n]))||isNaN(s=+this._y.call(null,e))||(o[n]=r,a[n]=s,r<u&&(u=r),r>_&&(_=r),s<l&&(l=s),s>f&&(f=s));if(u>_||l>f)return this;for(this.cover(u,l).cover(_,f),n=0;n<h;++n)i(this,o[n],a[n],t[n]);return this},a.cover=function(t,i){if(isNaN(t=+t)||isNaN(i=+i))return this;var e=this._x0,n=this._y0,r=this._x1,s=this._y1;if(isNaN(e))r=(e=Math.floor(t))+1,s=(n=Math.floor(i))+1;else{for(var h,o,a=r-e||1,u=this._root;e>t||t>=r||n>i||i>=s;)switch(o=(i<n)<<1|t<e,(h=new Array(4))[o]=u,u=h,a*=2,o){case 0:r=e+a,s=n+a;break;case 1:e=r-a,s=n+a;break;case 2:r=e+a,n=s-a;break;case 3:e=r-a,n=s-a}this._root&&this._root.length&&(this._root=u)}return this._x0=e,this._y0=n,this._x1=r,this._y1=s,this},a.data=function(){var t=[];return this.visit((function(i){if(!i.length)do{t.push(i.data)}while(i=i.next)})),t},a.extent=function(t){return arguments.length?this.cover(+t[0][0],+t[0][1]).cover(+t[1][0],+t[1][1]):isNaN(this._x0)?void 0:[[this._x0,this._y0],[this._x1,this._y1]]},a.find=function(t,i,n){var r,s,h,o,a,u,l,_=this._x0,f=this._y0,c=this._x1,x=this._y1,y=[],d=this._root;for(d&&y.push(new e(d,_,f,c,x)),null==n?n=1/0:(_=t-n,f=i-n,c=t+n,x=i+n,n*=n);u=y.pop();)if(!(!(d=u.node)||(s=u.x0)>c||(h=u.y0)>x||(o=u.x1)<_||(a=u.y1)<f))if(d.length){var p=(s+o)/2,v=(h+a)/2;y.push(new e(d[3],p,v,o,a),new e(d[2],s,v,p,a),new e(d[1],p,h,o,v),new e(d[0],s,h,p,v)),(l=(i>=v)<<1|t>=p)&&(u=y[y.length-1],y[y.length-1]=y[y.length-1-l],y[y.length-1-l]=u)}else{var w=t-+this._x.call(null,d.data),N=i-+this._y.call(null,d.data),g=w*w+N*N;if(g<n){var A=Math.sqrt(n=g);_=t-A,f=i-A,c=t+A,x=i+A,r=d.data}}return r},a.remove=function(t){if(isNaN(s=+this._x.call(null,t))||isNaN(h=+this._y.call(null,t)))return this;var i,e,n,r,s,h,o,a,u,l,_,f,c=this._root,x=this._x0,y=this._y0,d=this._x1,p=this._y1;if(!c)return this;if(c.length)for(;;){if((u=s>=(o=(x+d)/2))?x=o:d=o,(l=h>=(a=(y+p)/2))?y=a:p=a,i=c,!(c=c[_=l<<1|u]))return this;if(!c.length)break;(i[_+1&3]||i[_+2&3]||i[_+3&3])&&(e=i,f=_)}for(;c.data!==t;)if(n=c,!(c=c.next))return this;return(r=c.next)&&delete c.next,n?(r?n.next=r:delete n.next,this):i?(r?i[_]=r:delete i[_],(c=i[0]||i[1]||i[2]||i[3])&&c===(i[3]||i[2]||i[1]||i[0])&&!c.length&&(e?e[f]=c:this._root=c),this):(this._root=r,this)},a.removeAll=function(t){for(var i=0,e=t.length;i<e;++i)this.remove(t[i]);return this},a.root=function(){return this._root},a.size=function(){var t=0;return this.visit((function(i){if(!i.length)do{++t}while(i=i.next)})),t},a.visit=function(t){var i,n,r,s,h,o,a=[],u=this._root;for(u&&a.push(new e(u,this._x0,this._y0,this._x1,this._y1));i=a.pop();)if(!t(u=i.node,r=i.x0,s=i.y0,h=i.x1,o=i.y1)&&u.length){var l=(r+h)/2,_=(s+o)/2;(n=u[3])&&a.push(new e(n,l,_,h,o)),(n=u[2])&&a.push(new e(n,r,_,l,o)),(n=u[1])&&a.push(new e(n,l,s,h,_)),(n=u[0])&&a.push(new e(n,r,s,l,_))}return this},a.visitAfter=function(t){var i,n=[],r=[];for(this._root&&n.push(new e(this._root,this._x0,this._y0,this._x1,this._y1));i=n.pop();){var s=i.node;if(s.length){var h,o=i.x0,a=i.y0,u=i.x1,l=i.y1,_=(o+u)/2,f=(a+l)/2;(h=s[0])&&n.push(new e(h,o,a,_,f)),(h=s[1])&&n.push(new e(h,_,a,u,f)),(h=s[2])&&n.push(new e(h,o,f,_,l)),(h=s[3])&&n.push(new e(h,_,f,u,l))}r.push(i)}for(;i=r.pop();)t(i.node,i.x0,i.y0,i.x1,i.y1);return this},a.x=function(t){return arguments.length?(this._x=t,this):this._x},a.y=function(t){return arguments.length?(this._y=t,this):this._y},t.quadtree=s,Object.defineProperty(t,"__esModule",{value:!0})}));
	// // // https://d3js.org/d3-timer/ v3.0.1 Copyright 2010-2021 Mike Bostock
	!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n((t="undefined"!=typeof globalThis?globalThis:t||self).d3=t.d3||{})}(this,(function(t){"use strict";var n,e,o=0,i=0,r=0,l=0,u=0,a=0,s="object"==typeof performance&&performance.now?performance:Date,c="object"==typeof window&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(t){setTimeout(t,17)};function f(){return u||(c(_),u=s.now()+a)}function _(){u=0}function m(){this._call=this._time=this._next=null}function p(t,n,e){var o=new m;return o.restart(t,n,e),o}function w(){f(),++o;for(var t,e=n;e;)(t=u-e._time)>=0&&e._call.call(void 0,t),e=e._next;--o}function d(){u=(l=s.now())+a,o=i=0;try{w()}finally{o=0,function(){var t,o,i=n,r=1/0;for(;i;)i._call?(r>i._time&&(r=i._time),t=i,i=i._next):(o=i._next,i._next=null,i=t?t._next=o:n=o);e=t,y(r)}(),u=0}}function h(){var t=s.now(),n=t-l;n>1e3&&(a-=n,l=t)}function y(t){o||(i&&(i=clearTimeout(i)),t-u>24?(t<1/0&&(i=setTimeout(d,t-s.now()-a)),r&&(r=clearInterval(r))):(r||(l=s.now(),r=setInterval(h,1e3)),o=1,c(d)))}m.prototype=p.prototype={constructor:m,restart:function(t,o,i){if("function"!=typeof t)throw new TypeError("callback is not a function");i=(null==i?f():+i)+(null==o?0:+o),this._next||e===this||(e?e._next=this:n=this,e=this),this._call=t,this._time=i,y()},stop:function(){this._call&&(this._call=null,this._time=1/0,y())}},t.interval=function(t,n,e){var o=new m,i=n;return null==n?(o.restart(t,n,e),o):(o._restart=o.restart,o.restart=function(t,n,e){n=+n,e=null==e?f():+e,o._restart((function r(l){l+=i,o._restart(r,i+=n,e),t(l)}),n,e)},o.restart(t,n,e),o)},t.now=f,t.timeout=function(t,n,e){var o=new m;return n=null==n?0:+n,o.restart((e=>{o.stop(),t(e+n)}),n,e),o},t.timer=p,t.timerFlush=w,Object.defineProperty(t,"__esModule",{value:!0})}));
	// // // https://d3js.org/d3-force/ v3.0.0 Copyright 2010-2021 Mike Bostock
	!function(n,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("d3-quadtree"),require("d3-dispatch"),require("d3-timer")):"function"==typeof define&&define.amd?define(["exports","d3-quadtree","d3-dispatch","d3-timer"],t):t((n="undefined"!=typeof globalThis?globalThis:n||self).d3=n.d3||{},n.d3,n.d3,n.d3)}(this,(function(n,t,e,r){"use strict";function i(n){return function(){return n}}function u(n){return 1e-6*(n()-.5)}function o(n){return n.x+n.vx}function f(n){return n.y+n.vy}function a(n){return n.index}function c(n,t){var e=n.get(t);if(!e)throw new Error("node not found: "+t);return e}const l=4294967296;function h(n){return n.x}function v(n){return n.y}var y=Math.PI*(3-Math.sqrt(5));n.forceCenter=function(n,t){var e,r=1;function i(){var i,u,o=e.length,f=0,a=0;for(i=0;i<o;++i)f+=(u=e[i]).x,a+=u.y;for(f=(f/o-n)*r,a=(a/o-t)*r,i=0;i<o;++i)(u=e[i]).x-=f,u.y-=a}return null==n&&(n=0),null==t&&(t=0),i.initialize=function(n){e=n},i.x=function(t){return arguments.length?(n=+t,i):n},i.y=function(n){return arguments.length?(t=+n,i):t},i.strength=function(n){return arguments.length?(r=+n,i):r},i},n.forceCollide=function(n){var e,r,a,c=1,l=1;function h(){for(var n,i,h,y,d,g,x,s=e.length,p=0;p<l;++p)for(i=t.quadtree(e,o,f).visitAfter(v),n=0;n<s;++n)h=e[n],g=r[h.index],x=g*g,y=h.x+h.vx,d=h.y+h.vy,i.visit(M);function M(n,t,e,r,i){var o=n.data,f=n.r,l=g+f;if(!o)return t>y+l||r<y-l||e>d+l||i<d-l;if(o.index>h.index){var v=y-o.x-o.vx,s=d-o.y-o.vy,p=v*v+s*s;p<l*l&&(0===v&&(p+=(v=u(a))*v),0===s&&(p+=(s=u(a))*s),p=(l-(p=Math.sqrt(p)))/p*c,h.vx+=(v*=p)*(l=(f*=f)/(x+f)),h.vy+=(s*=p)*l,o.vx-=v*(l=1-l),o.vy-=s*l)}}}function v(n){if(n.data)return n.r=r[n.data.index];for(var t=n.r=0;t<4;++t)n[t]&&n[t].r>n.r&&(n.r=n[t].r)}function y(){if(e){var t,i,u=e.length;for(r=new Array(u),t=0;t<u;++t)i=e[t],r[i.index]=+n(i,t,e)}}return"function"!=typeof n&&(n=i(null==n?1:+n)),h.initialize=function(n,t){e=n,a=t,y()},h.iterations=function(n){return arguments.length?(l=+n,h):l},h.strength=function(n){return arguments.length?(c=+n,h):c},h.radius=function(t){return arguments.length?(n="function"==typeof t?t:i(+t),y(),h):n},h},n.forceLink=function(n){var t,e,r,o,f,l,h=a,v=function(n){return 1/Math.min(o[n.source.index],o[n.target.index])},y=i(30),d=1;function g(r){for(var i=0,o=n.length;i<d;++i)for(var a,c,h,v,y,g,x,s=0;s<o;++s)c=(a=n[s]).source,v=(h=a.target).x+h.vx-c.x-c.vx||u(l),y=h.y+h.vy-c.y-c.vy||u(l),v*=g=((g=Math.sqrt(v*v+y*y))-e[s])/g*r*t[s],y*=g,h.vx-=v*(x=f[s]),h.vy-=y*x,c.vx+=v*(x=1-x),c.vy+=y*x}function x(){if(r){var i,u,a=r.length,l=n.length,v=new Map(r.map(((n,t)=>[h(n,t,r),n])));for(i=0,o=new Array(a);i<l;++i)(u=n[i]).index=i,"object"!=typeof u.source&&(u.source=c(v,u.source)),"object"!=typeof u.target&&(u.target=c(v,u.target)),o[u.source.index]=(o[u.source.index]||0)+1,o[u.target.index]=(o[u.target.index]||0)+1;for(i=0,f=new Array(l);i<l;++i)u=n[i],f[i]=o[u.source.index]/(o[u.source.index]+o[u.target.index]);t=new Array(l),s(),e=new Array(l),p()}}function s(){if(r)for(var e=0,i=n.length;e<i;++e)t[e]=+v(n[e],e,n)}function p(){if(r)for(var t=0,i=n.length;t<i;++t)e[t]=+y(n[t],t,n)}return null==n&&(n=[]),g.initialize=function(n,t){r=n,l=t,x()},g.links=function(t){return arguments.length?(n=t,x(),g):n},g.id=function(n){return arguments.length?(h=n,g):h},g.iterations=function(n){return arguments.length?(d=+n,g):d},g.strength=function(n){return arguments.length?(v="function"==typeof n?n:i(+n),s(),g):v},g.distance=function(n){return arguments.length?(y="function"==typeof n?n:i(+n),p(),g):y},g},n.forceManyBody=function(){var n,e,r,o,f,a=i(-30),c=1,l=1/0,y=.81;function d(r){var i,u=n.length,f=t.quadtree(n,h,v).visitAfter(x);for(o=r,i=0;i<u;++i)e=n[i],f.visit(s)}function g(){if(n){var t,e,r=n.length;for(f=new Array(r),t=0;t<r;++t)e=n[t],f[e.index]=+a(e,t,n)}}function x(n){var t,e,r,i,u,o=0,a=0;if(n.length){for(r=i=u=0;u<4;++u)(t=n[u])&&(e=Math.abs(t.value))&&(o+=t.value,a+=e,r+=e*t.x,i+=e*t.y);n.x=r/a,n.y=i/a}else{(t=n).x=t.data.x,t.y=t.data.y;do{o+=f[t.data.index]}while(t=t.next)}n.value=o}function s(n,t,i,a){if(!n.value)return!0;var h=n.x-e.x,v=n.y-e.y,d=a-t,g=h*h+v*v;if(d*d/y<g)return g<l&&(0===h&&(g+=(h=u(r))*h),0===v&&(g+=(v=u(r))*v),g<c&&(g=Math.sqrt(c*g)),e.vx+=h*n.value*o/g,e.vy+=v*n.value*o/g),!0;if(!(n.length||g>=l)){(n.data!==e||n.next)&&(0===h&&(g+=(h=u(r))*h),0===v&&(g+=(v=u(r))*v),g<c&&(g=Math.sqrt(c*g)));do{n.data!==e&&(d=f[n.data.index]*o/g,e.vx+=h*d,e.vy+=v*d)}while(n=n.next)}}return d.initialize=function(t,e){n=t,r=e,g()},d.strength=function(n){return arguments.length?(a="function"==typeof n?n:i(+n),g(),d):a},d.distanceMin=function(n){return arguments.length?(c=n*n,d):Math.sqrt(c)},d.distanceMax=function(n){return arguments.length?(l=n*n,d):Math.sqrt(l)},d.theta=function(n){return arguments.length?(y=n*n,d):Math.sqrt(y)},d},n.forceRadial=function(n,t,e){var r,u,o,f=i(.1);function a(n){for(var i=0,f=r.length;i<f;++i){var a=r[i],c=a.x-t||1e-6,l=a.y-e||1e-6,h=Math.sqrt(c*c+l*l),v=(o[i]-h)*u[i]*n/h;a.vx+=c*v,a.vy+=l*v}}function c(){if(r){var t,e=r.length;for(u=new Array(e),o=new Array(e),t=0;t<e;++t)o[t]=+n(r[t],t,r),u[t]=isNaN(o[t])?0:+f(r[t],t,r)}}return"function"!=typeof n&&(n=i(+n)),null==t&&(t=0),null==e&&(e=0),a.initialize=function(n){r=n,c()},a.strength=function(n){return arguments.length?(f="function"==typeof n?n:i(+n),c(),a):f},a.radius=function(t){return arguments.length?(n="function"==typeof t?t:i(+t),c(),a):n},a.x=function(n){return arguments.length?(t=+n,a):t},a.y=function(n){return arguments.length?(e=+n,a):e},a},n.forceSimulation=function(n){var t,i=1,u=.001,o=1-Math.pow(u,1/300),f=0,a=.6,c=new Map,h=r.timer(g),v=e.dispatch("tick","end"),d=function(){let n=1;return()=>(n=(1664525*n+1013904223)%l)/l}();function g(){x(),v.call("tick",t),i<u&&(h.stop(),v.call("end",t))}function x(e){var r,u,l=n.length;void 0===e&&(e=1);for(var h=0;h<e;++h)for(i+=(f-i)*o,c.forEach((function(n){n(i)})),r=0;r<l;++r)null==(u=n[r]).fx?u.x+=u.vx*=a:(u.x=u.fx,u.vx=0),null==u.fy?u.y+=u.vy*=a:(u.y=u.fy,u.vy=0);return t}function s(){for(var t,e=0,r=n.length;e<r;++e){if((t=n[e]).index=e,null!=t.fx&&(t.x=t.fx),null!=t.fy&&(t.y=t.fy),isNaN(t.x)||isNaN(t.y)){var i=10*Math.sqrt(.5+e),u=e*y;t.x=i*Math.cos(u),t.y=i*Math.sin(u)}(isNaN(t.vx)||isNaN(t.vy))&&(t.vx=t.vy=0)}}function p(t){return t.initialize&&t.initialize(n,d),t}return null==n&&(n=[]),s(),t={tick:x,restart:function(){return h.restart(g),t},stop:function(){return h.stop(),t},nodes:function(e){return arguments.length?(n=e,s(),c.forEach(p),t):n},alpha:function(n){return arguments.length?(i=+n,t):i},alphaMin:function(n){return arguments.length?(u=+n,t):u},alphaDecay:function(n){return arguments.length?(o=+n,t):+o},alphaTarget:function(n){return arguments.length?(f=+n,t):f},velocityDecay:function(n){return arguments.length?(a=1-n,t):1-a},randomSource:function(n){return arguments.length?(d=n,c.forEach(p),t):d},force:function(n,e){return arguments.length>1?(null==e?c.delete(n):c.set(n,p(e)),t):c.get(n)},find:function(t,e,r){var i,u,o,f,a,c=0,l=n.length;for(null==r?r=1/0:r*=r,c=0;c<l;++c)(o=(i=t-(f=n[c]).x)*i+(u=e-f.y)*u)<r&&(a=f,r=o);return a},on:function(n,e){return arguments.length>1?(v.on(n,e),t):v.on(n)}}},n.forceX=function(n){var t,e,r,u=i(.1);function o(n){for(var i,u=0,o=t.length;u<o;++u)(i=t[u]).vx+=(r[u]-i.x)*e[u]*n}function f(){if(t){var i,o=t.length;for(e=new Array(o),r=new Array(o),i=0;i<o;++i)e[i]=isNaN(r[i]=+n(t[i],i,t))?0:+u(t[i],i,t)}}return"function"!=typeof n&&(n=i(null==n?0:+n)),o.initialize=function(n){t=n,f()},o.strength=function(n){return arguments.length?(u="function"==typeof n?n:i(+n),f(),o):u},o.x=function(t){return arguments.length?(n="function"==typeof t?t:i(+t),f(),o):n},o},n.forceY=function(n){var t,e,r,u=i(.1);function o(n){for(var i,u=0,o=t.length;u<o;++u)(i=t[u]).vy+=(r[u]-i.y)*e[u]*n}function f(){if(t){var i,o=t.length;for(e=new Array(o),r=new Array(o),i=0;i<o;++i)e[i]=isNaN(r[i]=+n(t[i],i,t))?0:+u(t[i],i,t)}}return"function"!=typeof n&&(n=i(null==n?0:+n)),o.initialize=function(n){t=n,f()},o.strength=function(n){return arguments.length?(u="function"==typeof n?n:i(+n),f(),o):u},o.y=function(t){return arguments.length?(n="function"==typeof t?t:i(+t),f(),o):n},o},Object.defineProperty(n,"__esModule",{value:!0})}));
	// // // https://github.com/vasturiano/d3-binarytree v0.2.0 Copyright 2021 Vasco Asturiano
	!function(t,r){"object"==typeof exports&&"undefined"!=typeof module?r(exports):"function"==typeof define&&define.amd?define(["exports"],r):r((t="undefined"!=typeof globalThis?globalThis:t||self).d3=t.d3||{})}(this,(function(t){"use strict";function r(t,r,e){if(isNaN(r))return t;var n,i,o,s,h,u,a=t._root,f={data:e},l=t._x0,x=t._x1;if(!a)return t._root=f,t;for(;a.length;)if((s=r>=(i=(l+x)/2))?l=i:x=i,n=a,!(a=a[h=+s]))return n[h]=f,t;if(r===(o=+t._x.call(null,a.data)))return f.next=a,n?n[h]=f:t._root=f,t;do{n=n?n[h]=new Array(2):t._root=new Array(2),(s=r>=(i=(l+x)/2))?l=i:x=i}while((h=+s)==(u=+(o>=i)));return n[u]=a,n[h]=f,t}function e(t,r,e){this.node=t,this.x0=r,this.x1=e}function n(t){return t[0]}function i(t,r){var e=new o(null==r?n:r,NaN,NaN);return null==t?e:e.addAll(t)}function o(t,r,e){this._x=t,this._x0=r,this._x1=e,this._root=void 0}function s(t){for(var r={data:t.data},e=r;t=t.next;)e=e.next={data:t.data};return r}var h=i.prototype=o.prototype;h.copy=function(){var t,r,e=new o(this._x,this._x0,this._x1),n=this._root;if(!n)return e;if(!n.length)return e._root=s(n),e;for(t=[{source:n,target:e._root=new Array(2)}];n=t.pop();)for(var i=0;i<2;++i)(r=n.source[i])&&(r.length?t.push({source:r,target:n.target[i]=new Array(2)}):n.target[i]=s(r));return e},h.add=function(t){var e=+this._x.call(null,t);return r(this.cover(e),e,t)},h.addAll=function(t){var e,n,i=t.length,o=new Array(i),s=1/0,h=-1/0;for(e=0;e<i;++e)isNaN(n=+this._x.call(null,t[e]))||(o[e]=n,n<s&&(s=n),n>h&&(h=n));if(s>h)return this;for(this.cover(s).cover(h),e=0;e<i;++e)r(this,o[e],t[e]);return this},h.cover=function(t){if(isNaN(t=+t))return this;var r=this._x0,e=this._x1;if(isNaN(r))e=(r=Math.floor(t))+1;else{for(var n,i,o=e-r||1,s=this._root;r>t||t>=e;)switch(i=+(t<r),(n=new Array(2))[i]=s,s=n,o*=2,i){case 0:e=r+o;break;case 1:r=e-o}this._root&&this._root.length&&(this._root=s)}return this._x0=r,this._x1=e,this},h.data=function(){var t=[];return this.visit((function(r){if(!r.length)do{t.push(r.data)}while(r=r.next)})),t},h.extent=function(t){return arguments.length?this.cover(+t[0][0]).cover(+t[1][0]):isNaN(this._x0)?void 0:[[this._x0],[this._x1]]},h.find=function(t,r){var n,i,o,s,h,u=this._x0,a=this._x1,f=[],l=this._root;for(l&&f.push(new e(l,u,a)),null==r?r=1/0:(u=t-r,a=t+r);s=f.pop();)if(!(!(l=s.node)||(i=s.x0)>a||(o=s.x1)<u))if(l.length){var x=(i+o)/2;f.push(new e(l[1],x,o),new e(l[0],i,x)),(h=+(t>=x))&&(s=f[f.length-1],f[f.length-1]=f[f.length-1-h],f[f.length-1-h]=s)}else{var _=Math.abs(t-+this._x.call(null,l.data));_<r&&(r=_,u=t-_,a=t+_,n=l.data)}return n},h.remove=function(t){if(isNaN(o=+this._x.call(null,t)))return this;var r,e,n,i,o,s,h,u,a,f=this._root,l=this._x0,x=this._x1;if(!f)return this;if(f.length)for(;;){if((h=o>=(s=(l+x)/2))?l=s:x=s,r=f,!(f=f[u=+h]))return this;if(!f.length)break;r[u+1&1]&&(e=r,a=u)}for(;f.data!==t;)if(n=f,!(f=f.next))return this;return(i=f.next)&&delete f.next,n?(i?n.next=i:delete n.next,this):r?(i?r[u]=i:delete r[u],(f=r[0]||r[1])&&f===(r[1]||r[0])&&!f.length&&(e?e[a]=f:this._root=f),this):(this._root=i,this)},h.removeAll=function(t){for(var r=0,e=t.length;r<e;++r)this.remove(t[r]);return this},h.root=function(){return this._root},h.size=function(){var t=0;return this.visit((function(r){if(!r.length)do{++t}while(r=r.next)})),t},h.visit=function(t){var r,n,i,o,s=[],h=this._root;for(h&&s.push(new e(h,this._x0,this._x1));r=s.pop();)if(!t(h=r.node,i=r.x0,o=r.x1)&&h.length){var u=(i+o)/2;(n=h[1])&&s.push(new e(n,u,o)),(n=h[0])&&s.push(new e(n,i,u))}return this},h.visitAfter=function(t){var r,n=[],i=[];for(this._root&&n.push(new e(this._root,this._x0,this._x1));r=n.pop();){var o=r.node;if(o.length){var s,h=r.x0,u=r.x1,a=(h+u)/2;(s=o[0])&&n.push(new e(s,h,a)),(s=o[1])&&n.push(new e(s,a,u))}i.push(r)}for(;r=i.pop();)t(r.node,r.x0,r.x1);return this},h.x=function(t){return arguments.length?(this._x=t,this):this._x},t.binarytree=i,Object.defineProperty(t,"__esModule",{value:!0})}));
	// // // https://github.com/vasturiano/d3-octree v0.2.0 Copyright 2021 Vasco Asturiano
	!function(t,i){"object"==typeof exports&&"undefined"!=typeof module?i(exports):"function"==typeof define&&define.amd?define(["exports"],i):i((t="undefined"!=typeof globalThis?globalThis:t||self).d3=t.d3||{})}(this,(function(t){"use strict";function i(t,i,n,e,s){if(isNaN(i)||isNaN(n)||isNaN(e))return t;var h,r,o,a,l,u,_,f,c,y,x,d,p=t._root,w={data:s},z=t._x0,N=t._y0,v=t._z0,g=t._x1,b=t._y1,A=t._z1;if(!p)return t._root=w,t;for(;p.length;)if((f=i>=(r=(z+g)/2))?z=r:g=r,(c=n>=(o=(N+b)/2))?N=o:b=o,(y=e>=(a=(v+A)/2))?v=a:A=a,h=p,!(p=p[x=y<<2|c<<1|f]))return h[x]=w,t;if(l=+t._x.call(null,p.data),u=+t._y.call(null,p.data),_=+t._z.call(null,p.data),i===l&&n===u&&e===_)return w.next=p,h?h[x]=w:t._root=w,t;do{h=h?h[x]=new Array(8):t._root=new Array(8),(f=i>=(r=(z+g)/2))?z=r:g=r,(c=n>=(o=(N+b)/2))?N=o:b=o,(y=e>=(a=(v+A)/2))?v=a:A=a}while((x=y<<2|c<<1|f)==(d=(_>=a)<<2|(u>=o)<<1|l>=r));return h[d]=p,h[x]=w,t}function n(t,i,n,e,s,h,r){this.node=t,this.x0=i,this.y0=n,this.z0=e,this.x1=s,this.y1=h,this.z1=r}function e(t){return t[0]}function s(t){return t[1]}function h(t){return t[2]}function r(t,i,n,r){var a=new o(null==i?e:i,null==n?s:n,null==r?h:r,NaN,NaN,NaN,NaN,NaN,NaN);return null==t?a:a.addAll(t)}function o(t,i,n,e,s,h,r,o,a){this._x=t,this._y=i,this._z=n,this._x0=e,this._y0=s,this._z0=h,this._x1=r,this._y1=o,this._z1=a,this._root=void 0}function a(t){for(var i={data:t.data},n=i;t=t.next;)n=n.next={data:t.data};return i}var l=r.prototype=o.prototype;l.copy=function(){var t,i,n=new o(this._x,this._y,this._z,this._x0,this._y0,this._z0,this._x1,this._y1,this._z1),e=this._root;if(!e)return n;if(!e.length)return n._root=a(e),n;for(t=[{source:e,target:n._root=new Array(8)}];e=t.pop();)for(var s=0;s<8;++s)(i=e.source[s])&&(i.length?t.push({source:i,target:e.target[s]=new Array(8)}):e.target[s]=a(i));return n},l.add=function(t){var n=+this._x.call(null,t),e=+this._y.call(null,t),s=+this._z.call(null,t);return i(this.cover(n,e,s),n,e,s,t)},l.addAll=function(t){var n,e,s,h,r,o=t.length,a=new Array(o),l=new Array(o),u=new Array(o),_=1/0,f=1/0,c=1/0,y=-1/0,x=-1/0,d=-1/0;for(e=0;e<o;++e)isNaN(s=+this._x.call(null,n=t[e]))||isNaN(h=+this._y.call(null,n))||isNaN(r=+this._z.call(null,n))||(a[e]=s,l[e]=h,u[e]=r,s<_&&(_=s),s>y&&(y=s),h<f&&(f=h),h>x&&(x=h),r<c&&(c=r),r>d&&(d=r));if(_>y||f>x||c>d)return this;for(this.cover(_,f,c).cover(y,x,d),e=0;e<o;++e)i(this,a[e],l[e],u[e],t[e]);return this},l.cover=function(t,i,n){if(isNaN(t=+t)||isNaN(i=+i)||isNaN(n=+n))return this;var e=this._x0,s=this._y0,h=this._z0,r=this._x1,o=this._y1,a=this._z1;if(isNaN(e))r=(e=Math.floor(t))+1,o=(s=Math.floor(i))+1,a=(h=Math.floor(n))+1;else{for(var l,u,_=r-e||1,f=this._root;e>t||t>=r||s>i||i>=o||h>n||n>=a;)switch(u=(n<h)<<2|(i<s)<<1|t<e,(l=new Array(8))[u]=f,f=l,_*=2,u){case 0:r=e+_,o=s+_,a=h+_;break;case 1:e=r-_,o=s+_,a=h+_;break;case 2:r=e+_,s=o-_,a=h+_;break;case 3:e=r-_,s=o-_,a=h+_;break;case 4:r=e+_,o=s+_,h=a-_;break;case 5:e=r-_,o=s+_,h=a-_;break;case 6:r=e+_,s=o-_,h=a-_;break;case 7:e=r-_,s=o-_,h=a-_}this._root&&this._root.length&&(this._root=f)}return this._x0=e,this._y0=s,this._z0=h,this._x1=r,this._y1=o,this._z1=a,this},l.data=function(){var t=[];return this.visit((function(i){if(!i.length)do{t.push(i.data)}while(i=i.next)})),t},l.extent=function(t){return arguments.length?this.cover(+t[0][0],+t[0][1],+t[0][2]).cover(+t[1][0],+t[1][1],+t[1][2]):isNaN(this._x0)?void 0:[[this._x0,this._y0,this._z0],[this._x1,this._y1,this._z1]]},l.find=function(t,i,e,s){var h,r,o,a,l,u,_,f,c,y=this._x0,x=this._y0,d=this._z0,p=this._x1,w=this._y1,z=this._z1,N=[],v=this._root;for(v&&N.push(new n(v,y,x,d,p,w,z)),null==s?s=1/0:(y=t-s,x=i-s,d=e-s,p=t+s,w=i+s,z=e+s,s*=s);f=N.pop();)if(!(!(v=f.node)||(r=f.x0)>p||(o=f.y0)>w||(a=f.z0)>z||(l=f.x1)<y||(u=f.y1)<x||(_=f.z1)<d))if(v.length){var g=(r+l)/2,b=(o+u)/2,A=(a+_)/2;N.push(new n(v[7],g,b,A,l,u,_),new n(v[6],r,b,A,g,u,_),new n(v[5],g,o,A,l,b,_),new n(v[4],r,o,A,g,b,_),new n(v[3],g,b,a,l,u,A),new n(v[2],r,b,a,g,u,A),new n(v[1],g,o,a,l,b,A),new n(v[0],r,o,a,g,b,A)),(c=(e>=A)<<2|(i>=b)<<1|t>=g)&&(f=N[N.length-1],N[N.length-1]=N[N.length-1-c],N[N.length-1-c]=f)}else{var k=t-+this._x.call(null,v.data),m=i-+this._y.call(null,v.data),M=e-+this._z.call(null,v.data),j=k*k+m*m+M*M;if(j<s){var T=Math.sqrt(s=j);y=t-T,x=i-T,d=e-T,p=t+T,w=i+T,z=e+T,h=v.data}}return h},l.remove=function(t){if(isNaN(h=+this._x.call(null,t))||isNaN(r=+this._y.call(null,t))||isNaN(o=+this._z.call(null,t)))return this;var i,n,e,s,h,r,o,a,l,u,_,f,c,y,x,d=this._root,p=this._x0,w=this._y0,z=this._z0,N=this._x1,v=this._y1,g=this._z1;if(!d)return this;if(d.length)for(;;){if((_=h>=(a=(p+N)/2))?p=a:N=a,(f=r>=(l=(w+v)/2))?w=l:v=l,(c=o>=(u=(z+g)/2))?z=u:g=u,i=d,!(d=d[y=c<<2|f<<1|_]))return this;if(!d.length)break;(i[y+1&7]||i[y+2&7]||i[y+3&7]||i[y+4&7]||i[y+5&7]||i[y+6&7]||i[y+7&7])&&(n=i,x=y)}for(;d.data!==t;)if(e=d,!(d=d.next))return this;return(s=d.next)&&delete d.next,e?(s?e.next=s:delete e.next,this):i?(s?i[y]=s:delete i[y],(d=i[0]||i[1]||i[2]||i[3]||i[4]||i[5]||i[6]||i[7])&&d===(i[7]||i[6]||i[5]||i[4]||i[3]||i[2]||i[1]||i[0])&&!d.length&&(n?n[x]=d:this._root=d),this):(this._root=s,this)},l.removeAll=function(t){for(var i=0,n=t.length;i<n;++i)this.remove(t[i]);return this},l.root=function(){return this._root},l.size=function(){var t=0;return this.visit((function(i){if(!i.length)do{++t}while(i=i.next)})),t},l.visit=function(t){var i,e,s,h,r,o,a,l,u=[],_=this._root;for(_&&u.push(new n(_,this._x0,this._y0,this._z0,this._x1,this._y1,this._z1));i=u.pop();)if(!t(_=i.node,s=i.x0,h=i.y0,r=i.z0,o=i.x1,a=i.y1,l=i.z1)&&_.length){var f=(s+o)/2,c=(h+a)/2,y=(r+l)/2;(e=_[7])&&u.push(new n(e,f,c,y,o,a,l)),(e=_[6])&&u.push(new n(e,s,c,y,f,a,l)),(e=_[5])&&u.push(new n(e,f,h,y,o,c,l)),(e=_[4])&&u.push(new n(e,s,h,y,f,c,l)),(e=_[3])&&u.push(new n(e,f,c,r,o,a,y)),(e=_[2])&&u.push(new n(e,s,c,r,f,a,y)),(e=_[1])&&u.push(new n(e,f,h,r,o,c,y)),(e=_[0])&&u.push(new n(e,s,h,r,f,c,y))}return this},l.visitAfter=function(t){var i,e=[],s=[];for(this._root&&e.push(new n(this._root,this._x0,this._y0,this._z0,this._x1,this._y1,this._z1));i=e.pop();){var h=i.node;if(h.length){var r,o=i.x0,a=i.y0,l=i.z0,u=i.x1,_=i.y1,f=i.z1,c=(o+u)/2,y=(a+_)/2,x=(l+f)/2;(r=h[0])&&e.push(new n(r,o,a,l,c,y,x)),(r=h[1])&&e.push(new n(r,c,a,l,u,y,x)),(r=h[2])&&e.push(new n(r,o,y,l,c,_,x)),(r=h[3])&&e.push(new n(r,c,y,l,u,_,x)),(r=h[4])&&e.push(new n(r,o,a,x,c,y,f)),(r=h[5])&&e.push(new n(r,c,a,x,u,y,f)),(r=h[6])&&e.push(new n(r,o,y,x,c,_,f)),(r=h[7])&&e.push(new n(r,c,y,x,u,_,f))}s.push(i)}for(;i=s.pop();)t(i.node,i.x0,i.y0,i.z0,i.x1,i.y1,i.z1);return this},l.x=function(t){return arguments.length?(this._x=t,this):this._x},l.y=function(t){return arguments.length?(this._y=t,this):this._y},l.z=function(t){return arguments.length?(this._z=t,this):this._z},t.octree=r,Object.defineProperty(t,"__esModule",{value:!0})}));
	// // // https://github.com/vasturiano/d3-force-3d v3.0.2 Copyright 2021 Vasco Asturiano
	!function(n,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("d3-binarytree"),require("d3-quadtree"),require("d3-octree"),require("d3-dispatch"),require("d3-timer")):"function"==typeof define&&define.amd?define(["exports","d3-binarytree","d3-quadtree","d3-octree","d3-dispatch","d3-timer"],t):t((n="undefined"!=typeof globalThis?globalThis:n||self).d3=n.d3||{},n.d3,n.d3,n.d3,n.d3,n.d3)}(this,(function(n,t,e,r,i,u){"use strict";function o(n){return function(){return n}}function f(n){return 1e-6*(n()-.5)}function a(n){return n.x+n.vx}function c(n){return n.y+n.vy}function l(n){return n.z+n.vz}function h(n){return n.index}function v(n,t){var e=n.get(t);if(!e)throw new Error("node not found: "+t);return e}const d=4294967296;function y(n){return n.x}function s(n){return n.y}function g(n){return n.z}var x=Math.PI*(3-Math.sqrt(5)),z=20*Math.PI/(9+Math.sqrt(221));n.forceCenter=function(n,t,e){var r,i=1;function u(){var u,o,f=r.length,a=0,c=0,l=0;for(u=0;u<f;++u)a+=(o=r[u]).x||0,c+=o.y||0,l+=o.z||0;for(a=(a/f-n)*i,c=(c/f-t)*i,l=(l/f-e)*i,u=0;u<f;++u)o=r[u],a&&(o.x-=a),c&&(o.y-=c),l&&(o.z-=l)}return null==n&&(n=0),null==t&&(t=0),null==e&&(e=0),u.initialize=function(n){r=n},u.x=function(t){return arguments.length?(n=+t,u):n},u.y=function(n){return arguments.length?(t=+n,u):t},u.z=function(n){return arguments.length?(e=+n,u):e},u.strength=function(n){return arguments.length?(i=+n,u):i},u},n.forceCollide=function(n){var i,u,h,v,d=1,y=1;function s(){for(var n,o,s,x,z,p,M,w,q=i.length,N=0;N<y;++N)for(o=(1===u?t.binarytree(i,a):2===u?e.quadtree(i,a,c):3===u?r.octree(i,a,c,l):null).visitAfter(g),n=0;n<q;++n)s=i[n],M=h[s.index],w=M*M,x=s.x+s.vx,u>1&&(z=s.y+s.vy),u>2&&(p=s.z+s.vz),o.visit(m);function m(n,t,e,r,i,o,a){var c=[t,e,r,i,o,a],l=c[0],h=c[1],y=c[2],g=c[u],q=c[u+1],N=c[u+2],m=n.data,A=n.r,b=M+A;if(!m)return l>x+b||g<x-b||u>1&&(h>z+b||q<z-b)||u>2&&(y>p+b||N<p-b);if(m.index>s.index){var k=x-m.x-m.vx,E=u>1?z-m.y-m.vy:0,j=u>2?p-m.z-m.vz:0,D=k*k+E*E+j*j;D<b*b&&(0===k&&(D+=(k=f(v))*k),u>1&&0===E&&(D+=(E=f(v))*E),u>2&&0===j&&(D+=(j=f(v))*j),D=(b-(D=Math.sqrt(D)))/D*d,s.vx+=(k*=D)*(b=(A*=A)/(w+A)),u>1&&(s.vy+=(E*=D)*b),u>2&&(s.vz+=(j*=D)*b),m.vx-=k*(b=1-b),u>1&&(m.vy-=E*b),u>2&&(m.vz-=j*b))}}}function g(n){if(n.data)return n.r=h[n.data.index];for(var t=n.r=0;t<Math.pow(2,u);++t)n[t]&&n[t].r>n.r&&(n.r=n[t].r)}function x(){if(i){var t,e,r=i.length;for(h=new Array(r),t=0;t<r;++t)e=i[t],h[e.index]=+n(e,t,i)}}return"function"!=typeof n&&(n=o(null==n?1:+n)),s.initialize=function(n,...t){i=n,v=t.find((n=>"function"==typeof n))||Math.random,u=t.find((n=>[1,2,3].includes(n)))||2,x()},s.iterations=function(n){return arguments.length?(y=+n,s):y},s.strength=function(n){return arguments.length?(d=+n,s):d},s.radius=function(t){return arguments.length?(n="function"==typeof t?t:o(+t),x(),s):n},s},n.forceLink=function(n){var t,e,r,i,u,a,c,l=h,d=function(n){return 1/Math.min(u[n.source.index],u[n.target.index])},y=o(30),s=1;function g(r){for(var u=0,o=n.length;u<s;++u)for(var l,h,v,d,y,g=0,x=0,z=0,p=0;g<o;++g)h=(l=n[g]).source,x=(v=l.target).x+v.vx-h.x-h.vx||f(c),i>1&&(z=v.y+v.vy-h.y-h.vy||f(c)),i>2&&(p=v.z+v.vz-h.z-h.vz||f(c)),x*=d=((d=Math.sqrt(x*x+z*z+p*p))-e[g])/d*r*t[g],z*=d,p*=d,v.vx-=x*(y=a[g]),i>1&&(v.vy-=z*y),i>2&&(v.vz-=p*y),h.vx+=x*(y=1-y),i>1&&(h.vy+=z*y),i>2&&(h.vz+=p*y)}function x(){if(r){var i,o,f=r.length,c=n.length,h=new Map(r.map(((n,t)=>[l(n,t,r),n])));for(i=0,u=new Array(f);i<c;++i)(o=n[i]).index=i,"object"!=typeof o.source&&(o.source=v(h,o.source)),"object"!=typeof o.target&&(o.target=v(h,o.target)),u[o.source.index]=(u[o.source.index]||0)+1,u[o.target.index]=(u[o.target.index]||0)+1;for(i=0,a=new Array(c);i<c;++i)o=n[i],a[i]=u[o.source.index]/(u[o.source.index]+u[o.target.index]);t=new Array(c),z(),e=new Array(c),p()}}function z(){if(r)for(var e=0,i=n.length;e<i;++e)t[e]=+d(n[e],e,n)}function p(){if(r)for(var t=0,i=n.length;t<i;++t)e[t]=+y(n[t],t,n)}return null==n&&(n=[]),g.initialize=function(n,...t){r=n,c=t.find((n=>"function"==typeof n))||Math.random,i=t.find((n=>[1,2,3].includes(n)))||2,x()},g.links=function(t){return arguments.length?(n=t,x(),g):n},g.id=function(n){return arguments.length?(l=n,g):l},g.iterations=function(n){return arguments.length?(s=+n,g):s},g.strength=function(n){return arguments.length?(d="function"==typeof n?n:o(+n),z(),g):d},g.distance=function(n){return arguments.length?(y="function"==typeof n?n:o(+n),p(),g):y},g},n.forceManyBody=function(){var n,i,u,a,c,l,h=o(-30),v=1,d=1/0,x=.81;function z(o){var f,a=n.length,l=(1===i?t.binarytree(n,y):2===i?e.quadtree(n,y,s):3===i?r.octree(n,y,s,g):null).visitAfter(M);for(c=o,f=0;f<a;++f)u=n[f],l.visit(w)}function p(){if(n){var t,e,r=n.length;for(l=new Array(r),t=0;t<r;++t)e=n[t],l[e.index]=+h(e,t,n)}}function M(n){var t,e,r,u,o,f,a=0,c=0,h=n.length;if(h){for(r=u=o=f=0;f<h;++f)(t=n[f])&&(e=Math.abs(t.value))&&(a+=t.value,c+=e,r+=e*(t.x||0),u+=e*(t.y||0),o+=e*(t.z||0));a*=Math.sqrt(4/h),n.x=r/c,i>1&&(n.y=u/c),i>2&&(n.z=o/c)}else{(t=n).x=t.data.x,i>1&&(t.y=t.data.y),i>2&&(t.z=t.data.z);do{a+=l[t.data.index]}while(t=t.next)}n.value=a}function w(n,t,e,r,o){if(!n.value)return!0;var h=[e,r,o][i-1],y=n.x-u.x,s=i>1?n.y-u.y:0,g=i>2?n.z-u.z:0,z=h-t,p=y*y+s*s+g*g;if(z*z/x<p)return p<d&&(0===y&&(p+=(y=f(a))*y),i>1&&0===s&&(p+=(s=f(a))*s),i>2&&0===g&&(p+=(g=f(a))*g),p<v&&(p=Math.sqrt(v*p)),u.vx+=y*n.value*c/p,i>1&&(u.vy+=s*n.value*c/p),i>2&&(u.vz+=g*n.value*c/p)),!0;if(!(n.length||p>=d)){(n.data!==u||n.next)&&(0===y&&(p+=(y=f(a))*y),i>1&&0===s&&(p+=(s=f(a))*s),i>2&&0===g&&(p+=(g=f(a))*g),p<v&&(p=Math.sqrt(v*p)));do{n.data!==u&&(z=l[n.data.index]*c/p,u.vx+=y*z,i>1&&(u.vy+=s*z),i>2&&(u.vz+=g*z))}while(n=n.next)}}return z.initialize=function(t,...e){n=t,a=e.find((n=>"function"==typeof n))||Math.random,i=e.find((n=>[1,2,3].includes(n)))||2,p()},z.strength=function(n){return arguments.length?(h="function"==typeof n?n:o(+n),p(),z):h},z.distanceMin=function(n){return arguments.length?(v=n*n,z):Math.sqrt(v)},z.distanceMax=function(n){return arguments.length?(d=n*n,z):Math.sqrt(d)},z.theta=function(n){return arguments.length?(x=n*n,z):Math.sqrt(x)},z},n.forceRadial=function(n,t,e,r){var i,u,f,a,c=o(.1);function l(n){for(var o=0,c=i.length;o<c;++o){var l=i[o],h=l.x-t||1e-6,v=(l.y||0)-e||1e-6,d=(l.z||0)-r||1e-6,y=Math.sqrt(h*h+v*v+d*d),s=(a[o]-y)*f[o]*n/y;l.vx+=h*s,u>1&&(l.vy+=v*s),u>2&&(l.vz+=d*s)}}function h(){if(i){var t,e=i.length;for(f=new Array(e),a=new Array(e),t=0;t<e;++t)a[t]=+n(i[t],t,i),f[t]=isNaN(a[t])?0:+c(i[t],t,i)}}return"function"!=typeof n&&(n=o(+n)),null==t&&(t=0),null==e&&(e=0),null==r&&(r=0),l.initialize=function(n,...t){i=n,u=t.find((n=>[1,2,3].includes(n)))||2,h()},l.strength=function(n){return arguments.length?(c="function"==typeof n?n:o(+n),h(),l):c},l.radius=function(t){return arguments.length?(n="function"==typeof t?t:o(+t),h(),l):n},l.x=function(n){return arguments.length?(t=+n,l):t},l.y=function(n){return arguments.length?(e=+n,l):e},l.z=function(n){return arguments.length?(r=+n,l):r},l},n.forceSimulation=function(n,t){t=t||2;var e,r=Math.min(3,Math.max(1,Math.round(t))),o=1,f=.001,a=1-Math.pow(f,1/300),c=0,l=.6,h=new Map,v=u.timer(g),y=i.dispatch("tick","end"),s=function(){let n=1;return()=>(n=(1664525*n+1013904223)%d)/d}();function g(){p(),y.call("tick",e),o<f&&(v.stop(),y.call("end",e))}function p(t){var i,u,f=n.length;void 0===t&&(t=1);for(var v=0;v<t;++v)for(o+=(c-o)*a,h.forEach((function(n){n(o)})),i=0;i<f;++i)null==(u=n[i]).fx?u.x+=u.vx*=l:(u.x=u.fx,u.vx=0),r>1&&(null==u.fy?u.y+=u.vy*=l:(u.y=u.fy,u.vy=0)),r>2&&(null==u.fz?u.z+=u.vz*=l:(u.z=u.fz,u.vz=0));return e}function M(){for(var t,e=0,i=n.length;e<i;++e){if((t=n[e]).index=e,null!=t.fx&&(t.x=t.fx),null!=t.fy&&(t.y=t.fy),null!=t.fz&&(t.z=t.fz),isNaN(t.x)||r>1&&isNaN(t.y)||r>2&&isNaN(t.z)){var u=10*(r>2?Math.cbrt(.5+e):r>1?Math.sqrt(.5+e):e),o=e*x,f=e*z;1===r?t.x=u:2===r?(t.x=u*Math.cos(o),t.y=u*Math.sin(o)):(t.x=u*Math.sin(o)*Math.cos(f),t.y=u*Math.cos(o),t.z=u*Math.sin(o)*Math.sin(f))}(isNaN(t.vx)||r>1&&isNaN(t.vy)||r>2&&isNaN(t.vz))&&(t.vx=0,r>1&&(t.vy=0),r>2&&(t.vz=0))}}function w(t){return t.initialize&&t.initialize(n,s,r),t}return null==n&&(n=[]),M(),e={tick:p,restart:function(){return v.restart(g),e},stop:function(){return v.stop(),e},numDimensions:function(n){return arguments.length?(r=Math.min(3,Math.max(1,Math.round(n))),h.forEach(w),e):r},nodes:function(t){return arguments.length?(n=t,M(),h.forEach(w),e):n},alpha:function(n){return arguments.length?(o=+n,e):o},alphaMin:function(n){return arguments.length?(f=+n,e):f},alphaDecay:function(n){return arguments.length?(a=+n,e):+a},alphaTarget:function(n){return arguments.length?(c=+n,e):c},velocityDecay:function(n){return arguments.length?(l=1-n,e):1-l},randomSource:function(n){return arguments.length?(s=n,h.forEach(w),e):s},force:function(n,t){return arguments.length>1?(null==t?h.delete(n):h.set(n,w(t)),e):h.get(n)},find:function(){var t,e,i,u,o,f,a=Array.prototype.slice.call(arguments),c=a.shift()||0,l=(r>1?a.shift():null)||0,h=(r>2?a.shift():null)||0,v=a.shift()||1/0,d=0,y=n.length;for(v*=v,d=0;d<y;++d)(u=(t=c-(o=n[d]).x)*t+(e=l-(o.y||0))*e+(i=h-(o.z||0))*i)<v&&(f=o,v=u);return f},on:function(n,t){return arguments.length>1?(y.on(n,t),e):y.on(n)}}},n.forceX=function(n){var t,e,r,i=o(.1);function u(n){for(var i,u=0,o=t.length;u<o;++u)(i=t[u]).vx+=(r[u]-i.x)*e[u]*n}function f(){if(t){var u,o=t.length;for(e=new Array(o),r=new Array(o),u=0;u<o;++u)e[u]=isNaN(r[u]=+n(t[u],u,t))?0:+i(t[u],u,t)}}return"function"!=typeof n&&(n=o(null==n?0:+n)),u.initialize=function(n){t=n,f()},u.strength=function(n){return arguments.length?(i="function"==typeof n?n:o(+n),f(),u):i},u.x=function(t){return arguments.length?(n="function"==typeof t?t:o(+t),f(),u):n},u},n.forceY=function(n){var t,e,r,i=o(.1);function u(n){for(var i,u=0,o=t.length;u<o;++u)(i=t[u]).vy+=(r[u]-i.y)*e[u]*n}function f(){if(t){var u,o=t.length;for(e=new Array(o),r=new Array(o),u=0;u<o;++u)e[u]=isNaN(r[u]=+n(t[u],u,t))?0:+i(t[u],u,t)}}return"function"!=typeof n&&(n=o(null==n?0:+n)),u.initialize=function(n){t=n,f()},u.strength=function(n){return arguments.length?(i="function"==typeof n?n:o(+n),f(),u):i},u.y=function(t){return arguments.length?(n="function"==typeof t?t:o(+t),f(),u):n},u},n.forceZ=function(n){var t,e,r,i=o(.1);function u(n){for(var i,u=0,o=t.length;u<o;++u)(i=t[u]).vz+=(r[u]-i.z)*e[u]*n}function f(){if(t){var u,o=t.length;for(e=new Array(o),r=new Array(o),u=0;u<o;++u)e[u]=isNaN(r[u]=+n(t[u],u,t))?0:+i(t[u],u,t)}}return"function"!=typeof n&&(n=o(null==n?0:+n)),u.initialize=function(n){t=n,f()},u.strength=function(n){return arguments.length?(i="function"==typeof n?n:o(+n),f(),u):i},u.z=function(t){return arguments.length?(n="function"==typeof t?t:o(+t),f(),u):n},u},Object.defineProperty(n,"__esModule",{value:!0})}));
	// importScripts("https://cdn.jsdelivr.net/npm/d3-dispatch@3");
	// importScripts("https://cdn.jsdelivr.net/npm/d3-quadtree@3");
	// importScripts("https://cdn.jsdelivr.net/npm/d3-timer@3");
	// importScripts("https://cdn.jsdelivr.net/npm/d3-force@3");
	// importScripts("https://unpkg.com/d3-binarytree");
	// importScripts("https://unpkg.com/d3-octree");
	// importScripts("https://unpkg.com/d3-force-3d");

	"use strict"

	this._handleSetAttribute = (attributeName,value)=>{
		// example attributeName = "simulation.alpha"
		// example this.simulation.attributeName?.(value);
		let attributeNames = attributeName.split(".");
		let attribute = this;
		for(let i=0;i<attributeNames.length;i++){
			attribute = attribute?.[attributeNames[i]];
		}
		attribute?.(value);
	}

	self.onmessage = function (msg) {
		// console.log("RECEIVED:", msg.data.type);
		let use2D = false;
		if (msg.data.type == "pause") {
			// console.log("PAUSING!!!!")
			this.simulation.stop();
		} else if (msg.data.type == "resume") {
			this.simulation.restart();
		} else if (msg.data.type == "setAttribute") {
			this._handleSetAttribute(msg.data.attributeName,msg.data.value);
		} else if (msg.data.type == "start") {
			// let inputNodes = msg.data.nodes;
			let inputNodesPositions = msg.data.positions;
			let inputEdges = msg.data.edges;
			// let inputEdgeWeights = msg.data.weights;
			
			if(msg.data.use2D) {
				use2D = true;
			}

			let nodes = [];
			let links = [];
			for (let nodeIndex = 0; nodeIndex < inputNodesPositions.length/3; nodeIndex++) {
				
				// console.log(entry);
				

				// node.x = 400 * (Math.random() * 1.0 - 0.5);
				// node.y = 400 * (Math.random() * 1.0 - 0.5);
				// node.z = 400 * (Math.random() * 1.0 - 0.5);
				// node.vz = 0;
				
				let x = inputNodesPositions[nodeIndex*3+0]*10;//400 * (Math.random() * 1.0 - 0.5);
				let y = inputNodesPositions[nodeIndex*3+1]*10;//400 * (Math.random() * 1.0 - 0.5);
				let z = inputNodesPositions[nodeIndex*3+2]*10;//400 * (Math.random() * 1.0 - 0.5);
				let vz = 0;
				

				// node.index = network.ID2index[key];
				nodes.push({x,y,z,vz,ID:nodeIndex});
			}

			for (let index = 0; index < inputEdges.length / 2; index++) {
				let edgeFrom = (inputEdges[index * 2]);
				let edgeTo = (inputEdges[index * 2 + 1]);
				let edgeObject = {
					source: edgeFrom,
					target: edgeTo,
				}
				links.push(edgeObject);
			}
			

		function d3gravityForce() {
			// var nodes, strength = 0.20, softening = 0.05;
			var nodes, strength = 0.10, softening = 0.05;
			function force(alpha){
				const totalStrength = Math.sqrt(nodes.length)*alpha * strength;
				for (let i = 0, n = nodes.length, node; i < n; ++i) {
					node = nodes[i];
					let distance = Math.sqrt(node.x * node.x + node.y * node.y + node.z * node.z + softening);
					
					let kinvdistance3 = totalStrength/(distance);
					node.vx -= node.x * kinvdistance3;
					node.vy -= node.y * kinvdistance3;
					node.vz -= node.z * kinvdistance3;
				}
			}
			
			force.initialize = function(_) {
				nodes = _;
			};
			
			force.strength = function(_) {
				return arguments.length ? (strength = +_, force) : strength;
			};

			force.softening = function(_) {
				return arguments.length ? (softening = +_, force) : softening;
			};
			
			return force;
		}




			this.repulsiveforce = d3.forceManyBody();
			this.attractiveforce = d3.forceLink(links);
			this.centralForce = d3.forceCenter();
			// this.gravityForce = d3gravityForce();
			this.simulation = d3.forceSimulation(nodes)
				.numDimensions(use2D?2:3)
				.force("charge", this.repulsiveforce)
				.force("link", this.attractiveforce)
				.force("center", centralForce)
				.force("gravity", this.gravityForce)
				// .force("collide", d3.forceCollide(d => d.size*4))
				.velocityDecay(0.05)
				.on("tick", async () => {
					for (let vertexIndex = 0; vertexIndex < nodes.length; vertexIndex++) {
						const node = nodes[vertexIndex];
						inputNodesPositions[vertexIndex * 3 + 0] = node.x/10;
						inputNodesPositions[vertexIndex * 3 + 1] = node.y/10;
						if(!use2D) {
							inputNodesPositions[vertexIndex * 3 + 2] = node.z/10;
						}else{
							inputNodesPositions[vertexIndex * 3 + 2] = 0;
						}
					}
					self.postMessage({ type: "update", positions: inputNodesPositions });
				}).on("end", () => {
					self.postMessage({ type: "stop" });
				});
		}
	}
})

let workerFunctionString = workerFunction.toString();
let workerURL = URL.createObjectURL(new Blob([`(${workerFunctionString})()`], {type:'text/javascript'}));


class d3ForceLayoutWorker {
	constructor({
		network=null,
		onUpdate=null,
		onStop=null,
		onStart=null,
		use2D=false
	}) {
		this._network = network;
		this._onUpdate = onUpdate;
		this._onStop = onStop;
		this._onStart = onStart;
		this._use2D = use2D;
		this._attributes = {
			"charge": 0.1,
		};
		this._layoutWorker = null;
	}

	start(){
		if(!this._layoutWorker){
			this._layoutWorker = new Worker(workerURL);
			this._layoutWorker.onmessage = (msg) => {
				if (msg.data.type == "update") {
					this._onUpdate?.(msg.data);
				}else if (msg.data.type == "stop") {
					this._onStop?.(msg.data);
					this._layoutRunning = false;
				}else if (msg.data.type == "getAttribute") {
					this._handleReturnAttribute(msg.data);
				}else {
					console.log("Layout received Unknown msg: ", msg);
				}
			};

			this._layoutRunning = true;
			this._onStart?.();
			this._layoutWorker.postMessage({
				 type: "start",
				// network: this.network,
				// nodes:this._network.nodes,
				positions:this._network.positions,
				edges:this._network.indexedEdges, 
				use2D: this._use2D
			});
		}
		return this;
	}

	restart(){
		this.stop();
		this.start();
		return this;
	}

	stop(){
		if(this._layoutRunning){
			this._onStop?.();
		}
		this._layoutWorker?.terminate();
		this._layoutRunning = false;
		delete this._layoutWorker;
		this._layoutWorker = null;
		return this;
	}

	resume() {
		this.start();
		if(!this._layoutRunning){
			this._onStart?.();
		}
		this._layoutWorker.postMessage({ type: "resume" });
		this._layoutRunning=true;
		return this;
	}

	pause(){
		this._layoutWorker.postMessage({ type: "pause"});
		this._layoutRunning=false;
		this._onStop?.();
		return this;
	}

	onUpdate(callback) {
		this._onUpdate = callback;
		return this;
	}
	
	onStop(callback) {
		this._onStop = callback;
		return this;
	}
	
	onStart(callback) {
		this._onStart = callback;
		return this;
	}

	isRunning() {
		return this._layoutRunning;
	}
	
	cleanup() {
		this.stop();
	}

	_handleGetAttribute(){
		//Not implemented yet
	}

	setAttribute(attributeName,value){
		this._layoutWorker.postMessage({
			type: "setAttribute",
			attributeName: attributeName,
			value: value
		});
		return this;
	}

	groups(groups) {
		return this.setAttribute("groups", groups);
	}

	alpha(alphaValue){
		return this.setAttribute("alpha", alphaValue);
	}

	alphaDecay(alphaValue){
		return this.setAttribute("alphaDecay", alphaValue);
	}

	alphaTarget(alphaValue){
		return this.setAttribute("alphaTarget", alphaValue);
	}

	velocityDecay(velocityDecayValue){
		return this.setAttribute("velocityDecay", velocityDecayValue);
	}
}

export {d3ForceLayoutWorker as layoutWorker};