"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[713],{8550:function(n,e,i){i.r(e),i.d(e,{default:function(){return V}});var t,r=i(168),c=i(2791),s=i(5751),d=i(5861),a=i(885),l=i(7757),h=i.n(l),o=i(3504),x=i(184);var p=function(n){var e=n.className,i=n.statics,t=Object.keys(i)[0],r=i[t],c=i.percent||"47";return(0,x.jsxs)(v,{className:e,children:[(0,x.jsxs)("div",{children:[(0,x.jsxs)("p",{children:[" ",t," "]}),(0,x.jsxs)("h1",{children:[" ",r," "]})]}),(0,x.jsxs)("p",{children:[" ","".concat(c,"%")," "]})]})},v=s.ZP.div(t||(t=(0,r.Z)(["\n  min-width: 180px;\n  height: 120px;\n  display: flex;\n  padding: 20px;\n  border: solid 1px black;\n  margin: 1rem 1rem 1rem 0;\n\n  &.small {\n    height: 90px !important;\n    padding: 10px 20px;\n  }\n\n  div {\n    width: 50%;\n    border-right: solid 1px rgba(0, 0, 0, 0.5);\n    display: flex;\n    flex-direction: column;\n\n    p {\n      margin: 0 0 10px 0;\n    }\n  }\n\n  & > p {\n    flex: 1;\n    display: flex;\n    justify-content: flex-end;\n    align-items: center;\n  }\n"]))),m=i(9995),f={maintainAspectRatio:!1,scales:{yAxes:[{ticks:{beginAtZero:!0}}]}};var u,g,w,j=function(){return(0,x.jsx)(m.x1,{options:f,height:300,data:{labels:["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"],datasets:[{label:"# profit per week",data:[12,19,3,5,2,3,2,2,2,2,2,2,24,9,5],backgroundColor:["rgba(255, 99, 132, 1)"],borderColor:["rgba(0, 0, 0, 1)"],borderWidth:1}]}})};var b,Z,z=function(){var n=(0,c.useState)([]),e=(0,a.Z)(n,2),i=e[0],t=e[1];return(0,c.useEffect)((function(){function n(){return(n=(0,d.Z)(h().mark((function n(){var e,i;return h().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,fetch("/api/statics/profits");case 2:return e=n.sent,n.next=5,e.json();case 5:i=n.sent,t(i),console.log(i);case 8:case"end":return n.stop()}}),n)})))).apply(this,arguments)}!function(){n.apply(this,arguments)}()}),[]),(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)(M,{children:[(0,x.jsx)("h1",{children:" Dashboard "}),(0,x.jsx)(o.rU,{to:"/",children:(0,x.jsx)("svg",{"aria-hidden":"true",role:"img",width:"25",height:"25",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 1024 1024",children:(0,x.jsx)("path",{d:"M946.5 505L534.6 93.4a31.93 31.93 0 0 0-45.2 0L77.5 505c-12 12-18.8 28.3-18.8 45.3c0 35.3 28.7 64 64 64h43.4V908c0 17.7 14.3 32 32 32H448V716h112v224h265.9c17.7 0 32-14.3 32-32V614.3h43.4c17 0 33.3-6.7 45.3-18.8c24.9-25 24.9-65.5-.1-90.5z",fill:"black"})})})]}),(0,x.jsx)(k,{children:i.map((function(n,e){return(0,x.jsx)(p,{statics:n},e)}))}),(0,x.jsx)(y,{children:(0,x.jsx)(j,{})})]})},M=s.ZP.div(u||(u=(0,r.Z)(["\n  width: 100%;\n  height: 120px;\n  padding: 3rem;\n  position: relative;\n\n  svg {\n    position: absolute;\n    right: 1rem;\n    top: 1rem;\n  }\n\n  h1 {\n    font-weight: 200;\n    font-size: 2.5rem;\n  }\n"]))),k=s.ZP.div(g||(g=(0,r.Z)(["\n  padding: 2vw 3rem;\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-between;\n\n  div:not(:first-child) {\n    margin-left: 1rem;\n  }\n\n  @media screen and (max-width: 900px) {\n    div {\n      margin-left: 1rem;\n    }\n  }\n"]))),y=s.ZP.div(w||(w=(0,r.Z)(["\n  @media screen and (max-width: 900px) {\n    padding: 0;\n  }\n  padding: 0 3rem;\n"]))),C=i(5374);var V=function(){return(0,x.jsxs)(A,{children:[(0,x.jsx)(C.Z,{selectedId:0}),(0,x.jsx)(R,{children:(0,x.jsx)(z,{})})]})},A=s.ZP.div(b||(b=(0,r.Z)(["\n  @media screen and (max-width: 900px) {\n    flex-direction: column;\n  }\n  min-width: 100vw;\n  min-height: 100vh;\n  display: flex;\n  font-family: Roboto, sans-serif;\n"]))),R=s.ZP.div(Z||(Z=(0,r.Z)(["\n  @media screen and (max-width: 900px) {\n    width: 100vw;\n    left: 0px;\n  }\n  width: calc(100vw - 60px);\n  position: relative;\n  left: 60px;\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n"])))},5374:function(n,e,i){var t,r=i(168),c=i(885),s=i(2791),d=i(5751),a=i(6871),l=i(184);e.Z=function(n){var e=n.selectedId,i=(0,s.useRef)(),t=(0,a.s0)(),r=(0,s.useState)(0),d=(0,c.Z)(r,2),o=d[0],x=d[1];(0,s.useEffect)((function(){var n=i.current.children;x(n[e].children[0]);for(var t=0;t<n.length;t++)n[t].className=" ";n[e].className="selected"}),[]);var p=function(n,e){var i=void 0===o.current?o:o.current,r="svg"===n.tagName?n:n.parentElement;i.parentElement.className="",r.parentElement.className="selected",x(r),t("/dashboard/"+e)};return(0,l.jsx)(h,{children:(0,l.jsxs)("div",{ref:i,children:[(0,l.jsx)("div",{id:"0",children:(0,l.jsx)("svg",{id:"general",onClick:function(n){return p(n.target,"")},"aria-hidden":"true",role:"img",width:"35",height:"35",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 1024 1024",children:(0,l.jsx)("path",{d:"M888 792H200V168c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h752c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm-600-80h56c4.4 0 8-3.6 8-8V560c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v144c0 4.4 3.6 8 8 8zm152 0h56c4.4 0 8-3.6 8-8V384c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v320c0 4.4 3.6 8 8 8zm152 0h56c4.4 0 8-3.6 8-8V462c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v242c0 4.4 3.6 8 8 8zm152 0h56c4.4 0 8-3.6 8-8V304c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v400c0 4.4 3.6 8 8 8z"})})},"1"),(0,l.jsx)("div",{id:"1",children:(0,l.jsx)("svg",{onClick:function(n){return p(n.target,"products")},"aria-hidden":"true",id:"products",role:"img",width:"30",height:"30",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 20 20",children:(0,l.jsx)("path",{d:"M17 8h1v11H2V8h1V6c0-2.76 2.24-5 5-5c.71 0 1.39.15 2 .42A4.94 4.94 0 0 1 12 1c2.76 0 5 2.24 5 5v2zM5 6v2h2V6c0-1.13.39-2.16 1.02-3H8C6.35 3 5 4.35 5 6zm10 2V6c0-1.65-1.35-3-3-3h-.02A4.98 4.98 0 0 1 13 6v2h2zm-5-4.22C9.39 4.33 9 5.12 9 6v2h2V6c0-.88-.39-1.67-1-2.22z"})})},"2"),(0,l.jsx)("div",{id:"2",children:(0,l.jsx)("svg",{onClick:function(n){return p(n.target,"user")},"aria-hidden":"true",id:"users",role:"img",width:"30",height:"30",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 24 24",children:(0,l.jsx)("path",{d:"M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2S7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"})})},"3"),(0,l.jsx)("div",{id:"3",children:(0,l.jsx)("svg",{onClick:function(n){return p(n.target,"order")},"aria-hidden":"true",id:"order",role:"img",width:"35",height:"35",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 24 24",children:(0,l.jsx)("path",{d:"M4 7h11v2H4zm0 4h11v2H4zm0 4h7v2H4zm15.299-2.708l-4.3 4.291l-1.292-1.291l-1.414 1.415l2.706 2.704l5.712-5.703z"})})},"4"),(0,l.jsx)("div",{id:"4",children:(0,l.jsxs)("svg",{fill:"#606A76",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 50 50",width:"30px",height:"30px",onClick:function(n){return p(n.target,"settings")},id:"settings",children:[" ",(0,l.jsx)("path",{d:"M47.16,21.221l-5.91-0.966c-0.346-1.186-0.819-2.326-1.411-3.405l3.45-4.917c0.279-0.397,0.231-0.938-0.112-1.282 l-3.889-3.887c-0.347-0.346-0.893-0.391-1.291-0.104l-4.843,3.481c-1.089-0.602-2.239-1.08-3.432-1.427l-1.031-5.886 C28.607,2.35,28.192,2,27.706,2h-5.5c-0.49,0-0.908,0.355-0.987,0.839l-0.956,5.854c-1.2,0.345-2.352,0.818-3.437,1.412l-4.83-3.45 c-0.399-0.285-0.942-0.239-1.289,0.106L6.82,10.648c-0.343,0.343-0.391,0.883-0.112,1.28l3.399,4.863 c-0.605,1.095-1.087,2.254-1.438,3.46l-5.831,0.971c-0.482,0.08-0.836,0.498-0.836,0.986v5.5c0,0.485,0.348,0.9,0.825,0.985 l5.831,1.034c0.349,1.203,0.831,2.362,1.438,3.46l-3.441,4.813c-0.284,0.397-0.239,0.942,0.106,1.289l3.888,3.891 c0.343,0.343,0.884,0.391,1.281,0.112l4.87-3.411c1.093,0.601,2.248,1.078,3.445,1.424l0.976,5.861C21.3,47.647,21.717,48,22.206,48 h5.5c0.485,0,0.9-0.348,0.984-0.825l1.045-5.89c1.199-0.353,2.348-0.833,3.43-1.435l4.905,3.441 c0.398,0.281,0.938,0.232,1.282-0.111l3.888-3.891c0.346-0.347,0.391-0.894,0.104-1.292l-3.498-4.857 c0.593-1.08,1.064-2.222,1.407-3.408l5.918-1.039c0.479-0.084,0.827-0.5,0.827-0.985v-5.5C47.999,21.718,47.644,21.3,47.16,21.221z M25,32c-3.866,0-7-3.134-7-7c0-3.866,3.134-7,7-7s7,3.134,7,7C32,28.866,28.866,32,25,32z"})]})},"5")]},5465345)})};var h=d.ZP.div(t||(t=(0,r.Z)(["\n  & > div {\n    @media screen and (max-width: 960px) {\n      width: 100%;\n      max-height: 60px;\n      position: relative;\n      flex-direction: row;\n      align-items: center;\n    }\n    width: 60px;\n    height: 100vh;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    background: #354555;\n    flex-direction: column;\n    transition: 0.4s;\n    position: fixed;\n\n    div:not(:first-child) {\n      margin: 25px 0 0 0;\n    }\n\n    div {\n      @media screen and (max-width: 960px) {\n        height: 100%;\n        padding: 2rem 1rem;\n        margin: 0 !important;\n        align-items: center;\n        justify-content: center;\n      }\n      display: flex;\n      width: 100%;\n      justify-content: center;\n      padding: 1rem 0;\n      cursor: pointer;\n      transition: 0.4s;\n      fill: #606a76;\n\n      &.selected {\n        background: #256fc5;\n        svg {\n          fill: #fff;\n        }\n      }\n    }\n  }\n"])))}}]);
//# sourceMappingURL=713.98dec140.chunk.js.map