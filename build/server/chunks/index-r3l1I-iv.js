import { b, A } from './ssr-w-EXHMF7.js';

const n=[];function h(e,o){return {subscribe:l(e,o).subscribe}}function l(e,o=b){let r;const i=new Set;function u(t){if(A(e,t)&&(e=t,r)){const c=!n.length;for(const s of i)s[1](),n.push(s,e);if(c){for(let s=0;s<n.length;s+=2)n[s][0](n[s+1]);n.length=0;}}}function f(t){u(t(e));}function p(t,c=b){const s=[t,c];return i.add(s),i.size===1&&(r=o(u,f)||b),t(e),()=>{i.delete(s),i.size===0&&r&&(r(),r=null);}}return {set:u,update:f,subscribe:p}}

export { h, l };
//# sourceMappingURL=index-r3l1I-iv.js.map
