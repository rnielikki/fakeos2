(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0fa2992c"],{"466d":function(t,e,n){"use strict";var a=n("d784"),i=n("825a"),r=n("50c4"),o=n("1d80"),u=n("8aa5"),c=n("14c3");a("match",1,(function(t,e,n){return[function(e){var n=o(this),a=void 0==e?void 0:e[t];return void 0!==a?a.call(e,n):new RegExp(e)[t](String(n))},function(t){var a=n(e,t,this);if(a.done)return a.value;var o=i(t),s=String(this);if(!o.global)return c(o,s);var l=o.unicode;o.lastIndex=0;var p,d=[],f=0;while(null!==(p=c(o,s))){var v=String(p[0]);d[f]=v,""===v&&(o.lastIndex=u(s,r(o.lastIndex),l)),f++}return 0===f?null:d}]}))},"58b6":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"root"},[n("h1",[t._v("FakeOS Ver 2.")]),t._m(0),n("p",[t._v(t._s(t.computerName))]),n("p",[t._v(t._s(t.computerInfo.cpu)+" ("+t._s(t.computerInfo.arc)+")")]),n("p",[t._v(t._s(t.computerInfo.memory)+" RAM")]),n("p",[t._v("This operating system is on since "+t._s(t.uptime)+".")]),n("p",[t._v("Created by Mielikki, Owned by "+t._s(t.userName))]),n("ui-button",{attrs:{text:"check update",clicked:t.checkUpdate}}),n("h2",[t._v("Activation state")]),n("p",[t._v("This operating system is not activated and expires within 14 days.")]),n("ui-button",{attrs:{text:"activate",clicked:t.activate}}),n("h2",[t._v("Feedback")]),n("ui-button",{attrs:{text:"help center",clicked:t.feedback}})],1)},i=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("h3",{attrs:{clasS:"normal"}},[t._v("On "),n("span",{staticClass:"highlight"},[t._v("Vue 2.6.11")]),t._v(" Kernel: Written in "),n("span",{staticClass:"highlight"},[t._v("TypeScript 3.9.6")])])}],r=n("2b0e"),o=n("4558"),u=n("7b8f"),c=n("8c0e"),s=n("4777"),l=n("f9aa"),p=r["a"].extend({data:function(){return{title:"Computer information"}},components:{UiButton:u["a"]},computed:{computerInfo:function(){return l["a"].computerInfo},uptime:function(){return o["a"].startDate},userName:function(){return l["a"].user},computerName:function(){return l["a"].computer}},methods:{checkUpdate:function(){var t=this;c["a"].OpenDialog(this,"Found 1 update","We found 1 offical virus as update. Do you want to install?",s["b"],(function(e){e?c["a"].OpenDialog(t,"Cannot find the update","You didn't pay the bitcoin so you cannot update it.\nIf you want to pay it, please send money to me."):c["a"].OpenDialog(t,"lol","I will find you and I will install virus on your computer!")}))},activate:function(){c["a"].OpenDialog(this,"Error","To activate your computer, update your computer first.")},feedback:function(){c["a"].OpenSetting("help")}}}),d=p,f=(n("bd9a"),n("2877")),v=Object(f["a"])(d,a,i,!1,null,"efe9f4e8",null);e["default"]=v.exports},8766:function(t,e,n){},bd9a:function(t,e,n){"use strict";var a=n("8766"),i=n.n(a);i.a},f9aa:function(t,e,n){"use strict";n("baa5"),n("ac1f"),n("466d");var a="system32",i="RooT",r=navigator.userAgent,o=u(r);function u(t){var e;function n(e){var n=t.match(e);return n?n[0]:null}return{arc:n(/x[0-9]+/),cpu:navigator.platform+"/"+t.substring(t.lastIndexOf(" ")+1),memory:(null!==(e=navigator.deviceMemory)&&void 0!==e?e:12)+"GB"}}e["a"]={computer:a,user:i,get computerInfo(){return o}}}}]);
//# sourceMappingURL=chunk-0fa2992c.86e0b105.js.map