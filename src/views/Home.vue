<script lang="ts">
import { defineComponent } from 'vue';

import SideAnimeList from "../components/SideAnimeList.vue"
import Loading from '../components/Loading.vue'
import axios from 'axios'
import { Anime } from "../types/Anime"

export default defineComponent({
    name: 'Home',
    components: { SideAnimeList, Loading },
    data() {
        return {
            animeList: [] as Anime[],
            isLoading: false as boolean
        }
    }, async mounted() {
        this.isLoading = true
        await axios.get<Anime[]>("https://gogoanime.consumet.stream/recent-release").then(response => {
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
    <div class="w-full md:p-5 py-1 flex gap-5 justify-between ">
        <!-- animes list -->
        <div class="w-full h-full bg-black md:rounded-xl overflow-hidden">
            <header class="bg-[red] w-full">
                <h3 class="font-semibold text-white px-5 py-2">RECENT RELEASE</h3>
            </header>

            <div class="w-full p-5 flex gap-5 flex-wrap justify-center">

                <Loading v-if="isLoading" />

                <!-- anime list items -->
                <div v-for="anime in animeList" :key="anime.episodeId" class="max-w-[130px] md:max-w-[200px] md:max-h-96">
                    <!-- image box -->
                    <div class="w-full h-48 md:max-h-72 md:h-full bg-white/20 rounded-md overflow-hidden"
                        @click="$router.push({ name: 'watch-anime', params: { 'episode': anime.animeId } })">
                        <img class="w-full h-full object-cover hover:scale-110 duration-300" :src="anime.animeImg" alt="">
                    </div>

                    <div class="text-center p-3">
                        <!-- anime title -->
                        <p class="text-[15px] md:text-base font-semibold text-white hover:text-[red] cursor-pointer">{{
                            anime.animeTitle.substring(0, 30) + "..."
                        }}</p>


                        <!-- episode -->
                        <span class="text-[13px] md:text-sm text-white/80">Episode {{ anime.episodeNum }}</span>
                    </div>

                </div>

            </div>

        </div>

        <!-- side anime list -->
        <SideAnimeList />

    </div>
</template>