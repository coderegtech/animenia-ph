import{d as h,L as m,b as g,_ as u,c as a,a as t,e as r,f,t as i,F as _,r as x,g as n,o}from"./index-543b117c.js";import{S as b,P as w}from"./SideAnimeList-3c2c2b1c.js";const v=h({name:"Home",components:{SideAnimeList:b,Loading:m,Pagination:w},data(){return{animeList:[],isLoading:!1,error:{isError:!1,errMsg:""},page:1}},watch:{page:{immediate:!0,handler(){this.fetchAnime()}}},mounted(){this.fetchAnime()},methods:{async fetchAnime(){this.isLoading=!0,await g.get(`/api/recent-release?page=${this.page}`).then(e=>{this.animeList=e.data,this.isLoading=!1}).catch(e=>{console.log(e),this.isLoading=!1,this.error={isError:!0,errMsg:e.message}})},changePage(e){this.page=e}}}),L={class:"w-full md:p-5 py-1 flex gap-5 justify-between grow"},y={class:"w-full h-full bg-black md:rounded-xl overflow-hidden"},k={class:"bg-[red] w-full flex justify-between items-center"},E=t("h3",{class:"text-sm md:text-base font-semibold text-white px-5 py-2"},"RECENT RELEASE",-1),A={class:"relative w-full h-full p-5 flex gap-5 flex-wrap justify-center items-start"},P={key:1,class:"h-[80vh] grid place-content-center text-center"},$={class:"text-[red] text-xl"},S=t("p",{class:"text-white text-lg"},"Please try again later.",-1),C=["onClick"],I=["src"],j={class:"absolute bottom-1 left-1 bg-[red] text-white rounded-bl-md rounded-tr-md px-2 text-sm font-semibold font-sans z-10"},B={class:"play-btn opacity-0 duration-300 absolute top-0 left-0 w-full h-full bg-black/50 grid place-items-center cursor-pointer"},N={class:"text-center p-3"},M={class:"text-[15px] md:text-base font-semibold text-white hover:text-[red] cursor-pointer"},D={class:"text-[13px] md:text-sm text-white/80"};function F(e,H,R,T,V,z){const d=n("Pagination"),l=n("Loading"),c=n("v-icon"),p=n("SideAnimeList");return o(),a("div",L,[t("div",y,[t("header",k,[E,r(d,{page:e.page,"change-page":e.changePage,"total-page":5},null,8,["page","change-page"])]),t("div",A,[e.isLoading?(o(),f(l,{key:0})):e.error.isError?(o(),a("span",P,[t("h2",$,i(e.error.errMsg),1),S])):(o(!0),a(_,{key:2},x(e.animeList,s=>(o(),a("div",{key:s.episodeId,class:"relative max-w-[130px] md:max-w-[200px] md:max-h-96"},[t("div",{class:"anime-img duration-300 relative w-full h-48 md:h-72 bg-white/20 rounded-md overflow-hidden",onClick:O=>e.$router.push({name:"watch-anime",params:{animeId:s==null?void 0:s.animeId,episode:s.episodeId}})},[t("img",{class:"w-full h-full object-cover duration-300",src:s.animeImg,alt:""},null,8,I),t("span",j,i(s.subOrDub),1),t("span",B,[r(c,{name:"hi-solid-play",scale:"2.5",color:"red"})])],8,C),t("div",N,[t("p",M,i(s.animeTitle.substring(0,30)+"..."),1),t("span",D,"Episode "+i(s.episodeNum),1)])]))),128))])]),r(p)])}const J=u(v,[["render",F]]);export{J as default};
