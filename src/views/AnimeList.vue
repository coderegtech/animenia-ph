<script lang="ts">
import { defineComponent } from 'vue';

import SideAnimeList from "../components/SideAnimeList.vue"
import Loading from '../components/Loading.vue'
import axios from 'axios'
import {Popular} from "../types/Anime"

export default defineComponent({
  components: {SideAnimeList, Loading},
  data() {
    return {
        animeList: [] as Popular[],
        isLoading: false as boolean
    }
  }, async mounted() {
    this.isLoading = true
    await axios.get<Popular[]>("https://gogoanime.consumet.stream/popular").then(response => {
        console.log(response.data);
        this.animeList.push(...response.data)
    this.isLoading = false
        
    }).catch(err => {
        console.log(err);
    
    })
  }


})


</script>

<template>
<div class="bg-black/90 w-full h-full">
    

    
    <div class="max-w-[1290px] mx-auto h-full p-5 flex gap-5 justify-between">

        <!-- animes list -->
        <div class="w-full h-full bg-black rounded-xl overflow-hidden">
            <header class="bg-[red] w-full">
                <h3 class="font-semibold text-white px-3 py-2">ANIME POPULAR</h3>
            </header>

            <div class="w-full p-5 flex gap-5 flex-wrap justify-center">

               <Loading v-if="isLoading"/>

                <!-- anime list items -->
                <div v-for="anime in animeList" :key="anime.animeId" class="w-[200px] min--h-80">
                    <!-- image box -->
                    <div class="w-full h-[250px] bg-white/20 rounded-md overflow-hidden">
                        <img class="w-full h-full object-cover" :src="anime.animeImg" alt="">
                    </div>

                    <div class="text-center p-3">
                        <!-- anime title -->
                    <p class="text-base font-semibold text-white">{{ anime.animeTitle.length > 30 ? anime.animeTitle.substring(0, 30) + "..." : anime.animeTitle }}</p>

                    <!-- episode -->
                    <!-- <span class="text-sm text-white/80">Episode{{ anime.episodeNum }} </span> -->
                    </div>
                    
                </div>

            </div>

        </div>

        <!-- side anime list -->
        <SideAnimeList/>

    </div>




</div>


</template>