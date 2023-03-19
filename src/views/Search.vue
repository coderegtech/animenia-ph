<script lang="ts">
import { defineComponent } from 'vue';

import axios from 'axios';
import Loading from '../components/Loading.vue';
import SideAnimeList from "../components/SideAnimeList.vue";
import { Search } from "../types/Anime";

export default defineComponent({
    components: { SideAnimeList, Loading },
    data() {
        return {
            animeList: [] as Search[],
            isLoading: false as boolean,
            animeName: this.$route.params.name
        }
    }, computed: {
        filteredAnime() {
            return this.fetchAnime()
        }
    }, watch: {
        '$route.params': {
            handler() {
                this.fetchAnime()
            }, immediate: true
        }
    },

    methods: {
        async fetchAnime() {
            this.isLoading = true
            await axios.get<Search[]>(`https://gogoanime.consumet.stream/search?keyw=${this.animeName}`).then(response => {

                this.animeList = response.data
                this.isLoading = false

            }).catch(err => {
                console.log(err);

            })
        }
    }


})


</script>

<template>
    <div class="w-full md:p-5 py-1 flex gap-5 justify-between">
        <!-- animes list -->
        <div class="w-full h-full bg-black md:rounded-xl overflow-hidden">
            <header class="bg-[red] w-full">
                <h3 class="text-sm md:text-base font-semibold text-white px-5 py-2">RESULT ANIME SEARCH</h3>
            </header>

            <div class="w-full p-5 flex gap-5 flex-wrap justify-center">

                <Loading v-if="isLoading" />

                <p class="text-white text-center" v-else-if="!animeList.length">Not found</p>

                <!-- anime list items -->
                <div v-for="anime, index in animeList" :key="index" class="max-w-[130px] md:max-w-[200px] md:max-h-96"
                    v-else>
                    <!-- image box -->
                    <div class=" anime-img duration-300 relative w-full h-48 md:max-h-72 md:h-full bg-white/20 rounded-md overflow-hidden"
                        @click="$router.push({ name: 'anime', params: { 'episode': anime.animeId } })">
                        <img class="  w-full h-full object-cover duration-300" :src="anime.animeImg" alt="">

                        <span
                            class="play-btn opacity-0 duration-300 absolute top-0 left-0 w-full h-full bg-black/50 grid place-items-center cursor-pointer"><v-icon
                                name="hi-solid-play" scale="2.5" color="red"></v-icon></span>
                    </div>

                    <div class="text-center p-3">
                        <!-- anime title -->
                        <p class="text-[15px] md:text-base font-semibold text-white hover:text-[red] cursor-pointer">{{
                            anime.animeTitle.substring(0, 30) + "..."
                        }}</p>


                        <!-- episode -->
                        <span class="text-[13px] md:text-sm text-white/80">{{ anime.status }}</span>
                    </div>

                </div>

            </div>

        </div>

        <!-- side anime list -->
        <SideAnimeList />

    </div>
</template>