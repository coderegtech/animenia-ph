<script lang="ts">
import { defineComponent } from 'vue';

import axios from 'axios';
import Loading from '../components/Loading.vue';
import Pagination from '../components/Pagination.vue';
import SideAnimeList from "../components/SideAnimeList.vue";
import { Anime } from "../types/Anime";

export default defineComponent({
    name: 'Home',
    components: { SideAnimeList, Loading, Pagination },
    data() {
        return {
            animeList: [] as Anime[],
            isLoading: false as boolean,
            page: 1 as number
        }
    },


    async mounted() {
        this.fetchAnime()
    }, methods: {
        async fetchAnime() {
            this.isLoading = true
            await axios.get<Anime[]>(`http://0.0.0.0:3000/recent-release?page=${this.page}`).then(response => {
                console.log(response.data);
                this.animeList = response.data
                this.isLoading = false

            }).catch(err => {
                console.log(err);

            })
        },

        changePage(pageNum: number) {
            this.page = pageNum
            this.fetchAnime()
        }

    }


})


</script>

<template>
    <div class="w-full md:p-5 py-1 flex gap-5 justify-between grow">
        <!-- anime list -->
        <div class="w-full h-full bg-black md:rounded-xl overflow-hidden">
            <header class="bg-[red] w-full flex justify-between items-center">
                <h3 class="text-sm md:text-base  font-semibold text-white px-5 py-2">RECENT RELEASE</h3>

                <Pagination :page="page" :change-page="changePage" :total-page="5" />
            </header>

            <Loading v-if="isLoading" />

            <div class="relative w-full p-5 flex gap-5 flex-wrap justify-center">

                <!-- anime list items -->
                <div v-for="anime in animeList" :key="anime.episodeId"
                    class=" relative max-w-[130px] md:max-w-[200px] md:max-h-96">
                    <!-- image box -->
                    <div class=" anime-img duration-300 relative w-full h-48 md:max-h-72 md:h-full bg-white/20 rounded-md overflow-hidden"
                        @click="$router.push({ name: 'watch-anime', params: { 'episode': anime.animeId } })">
                        <img class="  w-full h-full object-cover duration-300" :src="anime.animeImg" alt="">
                        <span
                            class="absolute bottom-1 left-1 bg-[red] text-white rounded-bl-md rounded-tr-md px-2 text-sm font-semibold font-sans z-10">{{
                                anime.subOrDub
                            }}</span>
                        <span
                            class="play-btn opacity-0 duration-300 absolute top-0 left-0 w-full h-full bg-black/50 grid place-items-center cursor-pointer"><v-icon
                                name="hi-solid-play" scale="2.5" color="red"></v-icon></span>
                    </div>

                    <div class="text-center p-3">
                        <!-- anime title -->
                        <p class="text-[15px] md:text-base font-semibold text-white hover:text-[red] cursor-pointer ">{{
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