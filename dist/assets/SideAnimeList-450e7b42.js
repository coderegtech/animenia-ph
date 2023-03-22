import{d as g,_ as u,c as a,F as l,r as d,o,n as k,t as r,L as v,b as y,a as t,e as $,f as w,g as C,h}from"./index-ee6daa9e.js";const L=g({props:["page","changePage","totalPage"]}),P={class:"flex gap-1 px-5"},A=["onClick"];function j(e,m,_,f,x,b){return o(),a("div",P,[(o(!0),a(l,null,d(e.totalPage,i=>(o(),a("span",{onClick:p=>e.changePage(i),class:k([{"bg-black":i===e.page},"px-2 border text-white hover:bg-black cursor-pointer duration-100 rounded-md"])},r(i),11,A))),256))])}const E=u(L,[["render",j]]),I=g({components:{Loading:v,Pagination:E},data(){return{topAiring:[],isLoading:!1,genres:[["action","adventure","cars","comedy","crime","dementia","demons","drama","dub","ecchi","family","fantasy","game","gourmet","harem","historical","horror","josei","kids","magic","martial-arts","mecha","military","Mmusic","mystery","parody"],["police","psychological","romance","samurai","school","sci-fi","seinen","shoujo","shoujo-ai","shounen","shounen-ai","slice-of-Life","space","sports","super-power","supernatural","suspense","thriller","vampire","yaoi","yuri"]],page:1}},mounted(){this.fetchAnime()},methods:{async fetchAnime(){this.isLoading=!0,await y.get(`https://gogoanime.consumet.stream/top-airing?page=${this.page}`).then(e=>{this.topAiring=e.data,this.isLoading=!1}).catch(e=>{console.log(e)})},changePage(e){this.page=e,this.fetchAnime()}}}),B={class:"hidden lg:flex flex-col gap-5 basis-[550px]"},S={class:"bg-black rounded-xl overflow-hidden"},N={class:"bg-[red] w-full flex justify-between items-center"},V=t("h3",{class:"font-semibold text-white px-3 py-2"},"TOP ANIME",-1),F={class:"p-5 h-full"},M=["onClick"],T=["src"],U={class:""},z={class:"text-white hover:text-[red] text-base cursor-pointer"},D={class:"text-white/80 text-sm"},G={class:"bg-black rounded-xl overflow-hidden"},O=t("header",{class:"bg-[red] w-full"},[t("h3",{class:"font-semibold text-white px-3 py-2"},"GENRES")],-1),R={class:"p-5"},q={class:"grid grid-cols-2"},H=["onClick"],J=["onClick"];function K(e,m,_,f,x,b){const i=h("Pagination"),p=h("Loading");return o(),a("div",B,[t("div",S,[t("header",N,[V,$(i,{"change-page":e.changePage,page:e.page,"total-page":3},null,8,["change-page","page"])]),e.isLoading?(o(),w(p,{key:0})):C("",!0),t("ul",F,[(o(!0),a(l,null,d(e.topAiring,(s,c)=>(o(),a("li",{class:"py-2 flex gap-3 hover:scale-105 duration-200",key:s.animeId,onClick:n=>e.$router.push({name:"anime",params:{animeId:s.animeId}})},[t("img",{class:"min-w-[90px] h-[70px] object-cover rounded-md",src:s.animeImg,alt:""},null,8,T),t("div",U,[t("p",z,r(s.animeTitle.substring(0,50)),1),t("span",D,r(s.latestEp),1)])],8,M))),128))])]),t("div",G,[O,t("ul",R,[t("li",q,[(o(!0),a(l,null,d(e.genres[0],(s,c)=>(o(),a("p",{onClick:n=>e.$router.push({name:"anime-genres",params:{genre:s}}),key:c,class:"text-white hover:text-[red] text-[15px] cursor-pointer p-1"},r(s.replace(s[0],n=>n.toUpperCase())),9,H))),128)),(o(!0),a(l,null,d(e.genres[1],(s,c)=>(o(),a("p",{onClick:n=>e.$router.push({name:"anime-genres",params:{genre:s}}),key:c,class:"text-white hover:text-[red] text-[15px] cursor-pointer p-1"},r(s.replace(s[0],n=>n.toUpperCase())),9,J))),128))])])])])}const W=u(I,[["render",K]]);export{E as P,W as S};
