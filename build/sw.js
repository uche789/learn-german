if(!self.define){let s,e={};const i=(i,r)=>(i=new URL(i+".js",r).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(r,n)=>{const l=s||("document"in self?document.currentScript.src:"")||location.href;if(e[l])return;let t={};const o=s=>i(s,l),u={module:{uri:l},exports:t,require:o};e[l]=Promise.all(r.map((s=>u[s]||o(s)))).then((s=>(n(...s),t)))}}define(["./workbox-e3490c72"],(function(s){"use strict";self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"assets/arrowLeft-BpeEJoBC.js",revision:null},{url:"assets/french-_PV8_ZKz.js",revision:null},{url:"assets/german-CT4sk2GX.js",revision:null},{url:"assets/grammar-CvTYcRAP.js",revision:null},{url:"assets/idioms-5Wc5pB1s.js",revision:null},{url:"assets/index-BhI1tFmG.js",revision:null},{url:"assets/index-DAvR2G7y.css",revision:null},{url:"assets/japanese-DgDb0ZYd.js",revision:null},{url:"assets/practice-C18qknU3.js",revision:null},{url:"assets/vocab-Bx33GCQO.js",revision:null},{url:"index.html",revision:"04459831f215c469b89ee1aa2c6916af"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"manifest.webmanifest",revision:"d6cff92510d0664684c81531090afba4"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));