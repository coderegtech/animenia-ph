<script lang="ts">
import axios from "axios";
import { defineComponent } from 'vue';
import { Genres } from "../types/Anime";
import Loading from "./Loading.vue";
export default defineComponent({
    components: { Loading },
    props: {
        genres: {
            required: true,
            type: Array
        }
    },
    data() {
        return {
            animeList: [] as Genres[],
            isLoading: false as boolean,
        }
    },
    watch: {
        genres: {
            immediate: true,
            handler() {
                this.fetchAnime()
            }
        }
    },
    async mounted() {
        this.fetchAnime()
    }, methods: {
        async fetchAnime() {
            this.isLoading = true
            await axios.get(`/api/genre/${this.genres[0]}`).then((response) => {

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
    <div class="w-full bg-black md:rounded-xl overflow-hidden mt-5">
        <header class="bg-[red] w-full flex justify-between items-center">
            <h3 class="text-sm md:text-base font-semibold text-white px-5 py-2">RELATED ANIME</h3>
        </header>

        <div class="w-full p-2 md:p-5 flex gap-8 md:gap-5 flex-wrap justify-center">
            <Loading v-if="isLoading" />

            <p class="text-white text-center" v-else-if="!animeList.length">Not Related found</p>

            <!-- anime list items -->
            <div v-for="anime, index in animeList" :key="index"
                class="max-w-[130px] md:max-w-[200px] md:max-h-96 grid md:grid-cols-2 gap-2 items-start" v-else>
                <!-- image box -->
                <div class=" anime-img duration-300 relative min-w-[50px] w-full h-[100px]  bg-white/20 rounded-md overflow-hidden"
                    @click="$router.push({ name: 'anime', params: { 'animeId': anime.animeId } })">
                    <img class="  w-full h-full object-cover duration-300" :src="anime?.animeImg" alt="">

                    <span
                        class="play-btn opacity-0 duration-300 absolute top-0 left-0 w-full h-full bg-black/50 grid place-items-center cursor-pointer"><v-icon
                            name="hi-solid-play" scale="2.5" color="red"></v-icon></span>
                </div>

                <div class="min-w-[120px]">
                    <!-- anime title -->
                    <p class="text-[13px] md:text-base font-semibold text-white hover:text-[red] cursor-pointer">{{
                        anime.animeTitle?.substring(0, 35) + "..."
                    }}</p>


                    <!-- episode -->
                    <span class="text-[13px] md:text-sm text-white/80">Released: {{ anime?.releasedDate }}</span>
                </div>

            </div>

        </div>

    </div>
</template>