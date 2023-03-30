import{d as m,L as p,b as h,_ as u,c as a,a as e,f,F as g,r as _,o,e as x,t as i,g as r}from"./index-b87ddb69.js";const w=m({components:{Loading:p},props:{genres:{required:!0,type:Array}},data(){return{animeList:[],isLoading:!1}},watch:{genres:{immediate:!0,handler(){this.fetchAnime()}}},async mounted(){this.fetchAnime()},methods:{async fetchAnime(){this.isLoading=!0,await h.get(`https://webdis-emec.onrender.com/genre/${this.genres[0]}`).then(t=>{this.animeList=t.data,this.isLoading=!1}).catch(t=>{console.log(t)})}}}),b={class:"w-full bg-black md:rounded-xl overflow-hidden mt-5"},y=e("header",{class:"bg-[red] w-full flex justify-between items-center"},[e("h3",{class:"text-sm md:text-base font-semibold text-white px-5 py-2"},"RELATED ANIME")],-1),v={class:"w-full p-2 md:p-5 flex gap-8 md:gap-5 flex-wrap justify-center"},L={key:1,class:"text-white text-center"},k=["onClick"],A=["src"],$={class:"play-btn opacity-0 duration-300 absolute top-0 left-0 w-full h-full bg-black/50 grid place-items-center cursor-pointer"},R={class:"min-w-[120px]"},B={class:"text-[13px] md:text-base font-semibold text-white hover:text-[red] cursor-pointer"},C={class:"text-[13px] md:text-sm text-white/80"};function E(t,I,N,j,D,F){const d=r("Loading"),c=r("v-icon");return o(),a("div",b,[y,e("div",v,[t.isLoading?(o(),f(d,{key:0})):t.animeList.length?(o(!0),a(g,{key:2},_(t.animeList,(s,l)=>{var n;return o(),a("div",{key:l,class:"max-w-[130px] md:max-w-[200px] md:max-h-96 grid md:grid-cols-2 gap-2 items-start"},[e("div",{class:"anime-img duration-300 relative min-w-[50px] w-full h-[100px] bg-white/20 rounded-md overflow-hidden",onClick:T=>t.$router.push({name:"anime",params:{animeId:s.animeId}})},[e("img",{class:"w-full h-full object-cover duration-300",src:s==null?void 0:s.animeImg,alt:""},null,8,A),e("span",$,[x(c,{name:"hi-solid-play",scale:"2.5",color:"red"})])],8,k),e("div",R,[e("p",B,i(((n=s.animeTitle)==null?void 0:n.substring(0,35))+"..."),1),e("span",C,"Released: "+i(s==null?void 0:s.releasedDate),1)])])}),128)):(o(),a("p",L,"Not Related found"))])])}const q=u(w,[["render",E]]);export{q as R};
