<script lang="ts">
import { defineComponent } from 'vue';

import axios from 'axios';
import Loading from '../components/Loading.vue';
import Pagination from '../components/Pagination.vue';
import SideAnimeList from "../components/SideAnimeList.vue";
import { NewSeason } from "../types/Anime";

export default defineComponent({
    name: 'Home',
    components: { SideAnimeList, Loading, Pagination },
    data() {
        return {
            animeList: [] as NewSeason[],
            isLoading: false as boolean,
            page: 1 as number
        }
    },
    computed: {
        AnimeData() {
            return this.animeList;
        }
    },

    async mounted() {
        this.fetchAnimes()
    }, methods: {
        async fetchAnimes() {
            this.isLoading = true
            await axios.get<NewSeason[]>(`https://gogoanime.consumet.stream/new-season?page=${this.page}`).then(response => {
                console.log(response.data);
                this.animeList = response.data
                this.isLoading = false

            }).catch(err => {
                console.log(err);

            })
        },

        changePage(pageNum: number) {
            this.page = pageNum
            this.fetchAnimes()
        }

    }


})


</script>

<template>
    <div class="w-full md:p-5 py-1 flex gap-5 justify-between ">
        <!-- animes list -->
        <div class="w-full h-full bg-black md:rounded-xl overflow-hidden">
            <header class="bg-[red] w-full flex justify-between items-center">
                <h3 class="text-sm md:text-base font-semibold text-white px-5 py-2"> NEW SEASON</h3>

                <Pagination :page="page" :change-page="changePage" />
            </header>

            <Loading v-if="isLoading" />

            <div class="w-full p-5 flex gap-5 flex-wrap justify-center">

                <!-- anime list items -->
                <div v-for="anime in AnimeData" :key="anime.animeId" class="max-w-[130px] md:max-w-[200px] md:max-h-96">
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
                        <span class="text-[13px] md:text-sm text-white/80">Released: {{ anime.releasedDate }}</span>
                    </div>

                </div>

            </div>

        </div>

        <!-- side anime list -->
        <SideAnimeList />

    </div>
</template>