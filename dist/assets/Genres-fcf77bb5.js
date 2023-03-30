import{d as g,L as u,b as f,_,c as a,a as t,t as i,e as l,f as x,F as w,r as b,g as r,o as s}from"./index-c116f276.js";import{S as v,P as L}from"./SideAnimeList-d05e8783.js";const y=g({components:{SideAnimeList:v,Loading:u,Pagination:L},data(){return{animeList:[],isLoading:!1,params:this.$route.params.genre,page:1,error:{isError:!1,errMsg:""}}},watch:{"$route.params":{immediate:!0,handler(e){this.params=e.genre,this.fetchAnime(e.genre)}},page:{deep:!0,handler(){this.fetchAnime(this.params)}}},mounted(){this.fetchAnime(this.params)},methods:{async fetchAnime(e){this.isLoading=!0,window.scrollTo({top:0,behavior:"smooth"}),await f.get(`https://webdis-emec.onrender.com/genre/${e}?page=${this.page}`).then(o=>{this.animeList=o.data,this.isLoading=!1}).catch(o=>{this.isLoading=!1,this.error={isError:!0,errMsg:o.message}})},changePage(e){this.page=e}}}),k={class:"w-full md:p-5 py-1 flex gap-5 justify-between"},$={class:"w-full h-full bg-black md:rounded-xl overflow-hidden"},A={class:"bg-[red] w-full flex justify-between items-center"},E={class:"text-sm md:text-base font-semibold text-white px-5 py-2"},P={class:"w-full p-5 flex gap-5 flex-wrap justify-center"},S={key:1,class:"h-[80vh] grid place-content-center text-center"},C={class:"text-[red] text-xl"},N=t("p",{class:"text-white text-lg"},"Please try again later.",-1),j={key:2,class:"text-white text-center"},B=["onClick"],I=["src"],M={class:"play-btn opacity-0 duration-300 absolute top-0 left-0 w-full h-full bg-black/50 grid place-items-center cursor-pointer"},D={class:"text-center p-3"},F={class:"text-[15px] md:text-base font-semibold text-white hover:text-[red] cursor-pointer"},G={class:"text-[13px] md:text-sm text-white/80"};function R(e,o,T,V,U,q){const c=r("Pagination"),d=r("Loading"),h=r("v-icon"),m=r("SideAnimeList");return s(),a("div",k,[t("div",$,[t("header",A,[t("h3",E,"ANIME GENRE "+i(e.params.toString().toUpperCase()),1),l(c,{page:e.page,"change-page":e.changePage,"total-page":5},null,8,["page","change-page"])]),t("div",P,[e.isLoading?(s(),x(d,{key:0})):e.error.isError?(s(),a("span",S,[t("h2",C,i(e.error.errMsg),1),N])):e.animeList.length?(s(!0),a(w,{key:3},b(e.animeList,(n,p)=>(s(),a("div",{key:p,class:"max-w-[130px] md:max-w-[200px] md:max-h-96"},[t("div",{class:"anime-img duration-300 relative w-full h-48 md:max-h-72 md:h-full bg-white/20 rounded-md overflow-hidden",onClick:z=>e.$router.push({name:"anime",params:{animeId:n.animeId}})},[t("img",{class:"w-full h-full object-cover duration-300",src:n.animeImg,alt:""},null,8,I),t("span",M,[l(h,{name:"hi-solid-play",scale:"2.5",color:"red"})])],8,B),t("div",D,[t("p",F,i(n.animeTitle.substring(0,30)+"..."),1),t("span",G,"Released: "+i(n.releasedDate),1)])]))),128)):(s(),a("p",j,"Not found"))])]),l(m)])}const K=_(y,[["render",R]]);export{K as default};
