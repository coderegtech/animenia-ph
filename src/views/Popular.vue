<script lang="ts">
import { defineComponent } from 'vue';

import axios from 'axios';
import Loading from '../components/Loading.vue';
import Pagination from '../components/Pagination.vue';
import SideAnimeList from "../components/SideAnimeList.vue";
import { Popular } from "../types/Anime";

export default defineComponent({
    components: { SideAnimeList, Loading, Pagination },
    data() {
        return {
            animeList: [] as Popular[],
            isLoading: false as boolean,
            page: 1 as number,
            error: {
                isError: false as boolean,
                errMsg: "" as string
            },
        }
    }, async mounted() {
        this.fetchAnime()
    }, methods: {
        async fetchAnime() {
            this.isLoading = true
            await axios.get<Popular[]>(`https://webdis-emec.onrender.com/popular?page=${this.page}`).then(response => {
                this.animeList = response.data
                this.isLoading = false

            }).catch(err => {
                console.log(err);
                this.isLoading = false;
                this.error = {
                    isError: true,
                    errMsg: err.message
                }
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
    <div class="w-full md:p-5 py-1 flex gap-5 justify-between">
        <!-- animes list -->
        <div class="w-full h-full bg-black md:rounded-xl overflow-hidden">
            <header class="bg-[red] w-full flex justify-between items-center">

                <h3 class="text-sm md:text-base font-semibold text-white px-5 py-2">POPULAR ANIME</h3>

                <Pagination :page="page" :change-page="changePage" :total-page="5" />
            </header>

            <Loading v-if="isLoading" />


            <span class="h-[80vh] grid place-content-center text-center" v-else-if="error.isError">
                <h2 class="text-[red] text-xl">
                    {{ error.errMsg }}
                </h2>
                <p class="text-white text-lg">Please try again later.</p>
            </span>

            <div class="w-full p-5 flex gap-5 flex-wrap justify-center" v-else>


                <!-- anime list items -->
                <div v-for="anime, index in animeList" :key="index"
                    class="relative max-w-[150px] md:max-w-[190px] md:max-h-96"
                    @click="$router.push({ name: 'anime', params: { 'animeId': anime.animeId } })">
                    <!-- image box -->
                    <div
                        class=" anime-img duration-300 relative w-full h-48 md:max-h-72 md:h-full bg-white/20 rounded-md overflow-hidden">
                        <img class="  w-full h-full object-cover duration-300" :src="anime.animeImg" alt="">

                        <span
                            class="play-btn opacity-0 duration-300 absolute top-0 left-0 w-full h-full bg-black/50 grid place-items-center cursor-pointer"><v-icon
                                name="bi-play-circle" scale="2.5" color="red"></v-icon></span>
                    </div>

                    <div class="text-center p-3">
                        <!-- anime title -->
                        <p class="text-[15px] md:text-base font-semibold text-white hover:text-[red] cursor-pointer">{{
                            anime.animeTitle.length > 30 ? anime.animeTitle.substring(0, 30) + "..." : anime.animeTitle
                        }}</p>


                        <!-- episode -->
                        <span class="text-[13px] md:text-sm text-white/80">Released: {{ anime.releasedDate }}</span>
                    </div>

                </div>

            </div>

        </div>

        <!-- side anime list -->
        <SideAnimeList />

    </div>
</template>