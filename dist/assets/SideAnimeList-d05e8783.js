import{d as g,_ as u,c as r,F as l,r as d,o,n as k,t as n,L as b,b as v,a as t,e as $,f as w,g as h}from"./index-c116f276.js";const C=g({props:["page","changePage","totalPage"]}),L={class:"flex gap-1 px-5"},P=["onClick"];function A(s,_,m,f,x,y){return o(),r("div",L,[(o(!0),r(l,null,d(s.totalPage,i=>(o(),r("span",{onClick:p=>s.changePage(i),class:k([{"bg-black":i===s.page},"px-2 border text-white hover:bg-black cursor-pointer duration-100 rounded-md"])},n(i),11,P))),256))])}const E=u(C,[["render",A]]),j=g({components:{Loading:b,Pagination:E},data(){return{topAiring:[],isLoading:!1,genres:[["action","adventure","cars","comedy","crime","dementia","demons","drama","dub","ecchi","family","fantasy","game","gourmet","harem","historical","horror","josei","kids","magic","martial-arts","mecha","military","Mmusic","mystery","parody"],["police","psychological","romance","samurai","school","sci-fi","seinen","shoujo","shoujo-ai","shounen","shounen-ai","slice-of-Life","space","sports","super-power","supernatural","suspense","thriller","vampire","yaoi","yuri"]],page:1,error:{isError:!1,errMsg:""}}},mounted(){this.fetchAnime()},methods:{async fetchAnime(){this.isLoading=!0,await v.get(`https://webdis-emec.onrender.com/top-airing?page=${this.page}`).then(s=>{this.topAiring=s.data,this.isLoading=!1}).catch(s=>{this.isLoading=!1,this.error={isError:!0,errMsg:s.message}})},changePage(s){this.page=s,this.fetchAnime()}}}),I={class:"hidden lg:flex flex-col gap-5 basis-[550px]"},M={class:"bg-black rounded-xl overflow-hidden"},B={class:"bg-[red] w-full flex justify-between items-center"},S=t("h3",{class:"font-semibold text-white px-3 py-2"},"TOP ANIME",-1),F={key:1,class:"h-[80vh] grid place-content-center text-center"},N={class:"text-[red] text-xl"},T=t("p",{class:"text-white text-lg"},"Please try again later.",-1),U={key:2,class:"p-5 h-full"},V=["onClick"],z=["src"],D={class:""},G={class:"text-white hover:text-[red] text-base cursor-pointer"},O={class:"text-white/80 text-sm"},R={class:"bg-black rounded-xl overflow-hidden"},q=t("header",{class:"bg-[red] w-full"},[t("h3",{class:"font-semibold text-white px-3 py-2"},"GENRES")],-1),H={class:"p-5"},J={class:"grid grid-cols-2"},K=["onClick"],Q=["onClick"];function W(s,_,m,f,x,y){const i=h("Pagination"),p=h("Loading");return o(),r("div",I,[t("div",M,[t("header",B,[S,$(i,{"change-page":s.changePage,page:s.page,"total-page":3},null,8,["change-page","page"])]),s.isLoading?(o(),w(p,{key:0})):s.error.isError?(o(),r("span",F,[t("h2",N,n(s.error.errMsg),1),T])):(o(),r("ul",U,[(o(!0),r(l,null,d(s.topAiring,(e,c)=>{var a;return o(),r("li",{class:"py-2 flex gap-3 hover:scale-105 duration-200",key:e==null?void 0:e.animeId,onClick:X=>s.$router.push({name:"anime",params:{animeId:e==null?void 0:e.animeId}})},[t("img",{class:"min-w-[90px] h-[70px] object-cover rounded-md",src:e==null?void 0:e.animeImg,alt:""},null,8,z),t("div",D,[t("p",G,n((a=e==null?void 0:e.animeTitle)==null?void 0:a.substring(0,50)),1),t("span",O,n(e==null?void 0:e.latestEp),1)])],8,V)}),128))]))]),t("div",R,[q,t("ul",H,[t("li",J,[(o(!0),r(l,null,d(s.genres[0],(e,c)=>(o(),r("p",{onClick:a=>s.$router.push({name:"anime-genres",params:{genre:e}}),key:c,class:"text-white hover:text-[red] text-[15px] cursor-pointer p-1"},n(e.replace(e[0],a=>a.toUpperCase())),9,K))),128)),(o(!0),r(l,null,d(s.genres[1],(e,c)=>(o(),r("p",{onClick:a=>s.$router.push({name:"anime-genres",params:{genre:e}}),key:c,class:"text-white hover:text-[red] text-[15px] cursor-pointer p-1"},n(e.replace(e[0],a=>a.toUpperCase())),9,Q))),128))])])])])}const Z=u(j,[["render",W]]);export{E as P,Z as S};
