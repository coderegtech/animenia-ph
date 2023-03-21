<script lang="ts">
import { defineComponent } from "vue";

import axios from "axios";
import Loading from "../components/Loading.vue";
import SideAnimeList from "../components/SideAnimeList.vue";
import { Genres } from "../types/Anime";


export default defineComponent({
    name: "Anime",
    components: { SideAnimeList, Loading },
    data() {
        return {
            animeDetails: {
                animeTitle: "",
                type: "",
                releasedDate: "",
                status: "",
                animeImg: "",
                synopsis: "",
                otherNames: "",
                totalEpisodes: "",
                genres: [""],
                episodesList: [
                    {
                        episodeId: "",
                        episodeNum: "",
                        episodeUrl: ""
                    }
                ]

            },
            watchAnime: {
                referer: ""
            },
            animeList: [] as Genres[],
            isLoading: false as boolean,
            page: 1,
            params: this.$route.params.episode
        };
    },
    mounted() {
        this.fetchAnimeDetails(this.params)
    },
    watch: {
        '$route.params': {
            immediate: true,
            handler(params) {
                this.fetchAnimeDetails(params)
            }
        }
    },

    methods: {
        async fetchAnimeDetails(id: string | string[]) {
            this.isLoading = true;
            await axios
                .get(`https://gogoanime.consumet.stream/anime-details/${id}`)
                .then((response) => {
                    console.log(response.data);

                    this.animeDetails = { ...response.data };
                    this.isLoading = false;

                    this.fetchAnime(response.data.genres)

                })
                .catch((err) => {
                    console.log(err);
                });
        },

        async fetchAnime(genres: [string]) {
            this.isLoading = true

            await axios.get(`https://gogoanime.consumet.stream/genre/${genres[0]}`).then((response) => {

                this.animeList = response.data
                this.isLoading = false

            }).catch(err => {
                console.log(err);

            })
        },


    }

});
</script>

<template>
    <div class="w-full md:p-5 py-1 flex gap-5 justify-between">


        <div class="w-full ">
            <!-- animes list -->
            <div class=" w-full  bg-black md:rounded-xl overflow-hidden">
                <header class="bg-[red] w-full">
                    <h3 class="text-sm md:text-base font-semibold text-white px-5 py-2">WATCH ANIME - {{
                        animeDetails.animeTitle
                    }}</h3>
                </header>

                <Loading v-if="isLoading" />


                <div class="relative w-full flex flex-col xl:flex-row gap-5 p-5">

                    <!-- image container -->
                    <img class="w-full lg:max-w-[300px] max-h-96 object-cover" :src="animeDetails.animeImg" alt="">
                    <!-- anime details -->
                    <div class="w-full">
                        <h2 class="text-xl text-white font-bold">
                            {{ animeDetails.animeTitle }}
                        </h2>
                        <!-- <span class="text-white/90"> {{ animeDetails.otherNames }} </span> -->
                        <p class="text-white/80 py-1">{{ animeDetails.synopsis }}</p>

                        <ul>
                            <li class="flex gap-2 items-start">
                                <span class="text-white/80  font-semibold text-[15px]">Genres:
                                </span>
                                <span class="flex flex-wrap gap-x-1 " v-for="genres, index in animeDetails.genres"
                                    :key="index">
                                    <p class="text-[red] text-sm">
                                        {{ genres }},
                                    </p>

                                </span>


                            </li>
                            <li class="flex gap-2 items-end">
                                <span class="text-white/80  font-semibold text-[15px]">Type:
                                </span>
                                <p class="text-[red] text-sm">
                                    {{ animeDetails.type }}
                                </p>
                            </li>
                            <li class="flex gap-2 items-end">
                                <span class="text-white/80  font-semibold text-[15px]">Status:
                                </span>
                                <p class="text-[red] text-sm">
                                    {{ animeDetails.status }}
                                </p>
                            </li>
                            <li class="flex gap-2 items-end">
                                <span class="text-white/80  font-semibold text-[15px]">Episodes:
                                </span>
                                <p class="text-[red] text-sm">
                                    {{ animeDetails.totalEpisodes }}
                                </p>
                            </li>
                            <li class="flex gap-2 items-end">
                                <span class="text-white/80  font-semibold text-[15px]">Released Date:
                                </span>
                                <p class="text-[red] text-sm">
                                    {{ animeDetails.releasedDate }}
                                </p>
                            </li>
                        </ul>



                    </div>


                </div>

                <div class="p-5">

                    <p class="text-white text-lg text-bold py-1">Episode List:</p>
                    <div class=" flex flex-wrap gap-2">
                        <span v-for="episode in animeDetails.episodesList" :key="episode.episodeNum"
                            @click="$router.push({ name: 'watch-anime', params: { 'animeId': params, 'episode': episode.episodeId } })"
                            class="bg-[red] text-white cursor-pointer w-10 text-center">{{
                                episode.episodeNum
                            }}</span>

                    </div>

                </div>
            </div>

            <div class="w-full bg-black md:rounded-xl overflow-hidden mt-5">
                <header class="bg-[red] w-full flex justify-between items-center">
                    <h3 class="text-sm md:text-base font-semibold text-white px-5 py-2">RELATED ANIME</h3>
                </header>
                <Loading v-if="isLoading" />

                <div class="w-full p-2 md:p-5 flex gap-8 md:gap-5 flex-wrap justify-center">

                    <!-- anime list items -->
                    <div v-for="anime, index in animeList" :key="index"
                        class="max-w-[130px] md:max-w-[200px] md:max-h-96 grid md:grid-cols-2 gap-2 items-start">
                        <!-- image box -->
                        <div class=" anime-img duration-300 relative min-w-[50px] w-full h-[100px]  bg-white/20 rounded-md overflow-hidden"
                            @click="$router.push({ name: 'anime', params: { 'episode': anime.animeId } })">
                            <img class="  w-full h-full object-cover duration-300" :src="anime.animeImg" alt="">

                            <span
                                class="play-btn opacity-0 duration-300 absolute top-0 left-0 w-full h-full bg-black/50 grid place-items-center cursor-pointer"><v-icon
                                    name="hi-solid-play" scale="2.5" color="red"></v-icon></span>
                        </div>

                        <div class="min-w-[120px]">
                            <!-- anime title -->
                            <p class="text-[13px] md:text-base font-semibold text-white hover:text-[red] cursor-pointer">{{
                                anime.animeTitle.substring(0, 35) + "..."
                            }}</p>


                            <!-- episode -->
                            <span class="text-[13px] md:text-sm text-white/80">Released: {{ anime.releasedDate }}</span>
                        </div>

                    </div>

                </div>

            </div>

        </div>


        <!-- side anime list -->
        <SideAnimeList />
    </div>
</template>
