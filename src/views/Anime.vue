<script lang="ts">
import { defineComponent } from "vue";

import axios from "axios";
import Loading from "../components/Loading.vue";
import RelatedAnime from "../components/RelatedAnime.vue";
import SideAnimeList from "../components/SideAnimeList.vue";

export default defineComponent({
    name: "Anime",
    components: { SideAnimeList, Loading, RelatedAnime },
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
            isLoading: false as boolean,
            params: this.$route.params.animeId,
            page: 1,
        };
    },
    mounted() {
        this.fetchAnimeDetails(this.params)
    },
    watch: {
        '$route.params': {
            immediate: true,
            handler(params) {
                this.fetchAnimeDetails(params.animeId)
            }
        }
    },

    methods: {
        async fetchAnimeDetails(animeId: string | string[]) {
            this.isLoading = true;
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })

            await axios
                .get(`/api/anime-details/${animeId}`)
                .then((response) => {

                    this.animeDetails = { ...response.data };
                    this.isLoading = false;

                })
                .catch((err) => {
                    console.log(err);
                });
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


                <div class="relative w-full flex justify-start items-start flex-col  xl:flex-row gap-5 p-5">

                    <!-- image container -->
                    <img class=" max-h-72 lg:max-w-[300px] md:max-h-96 object-contain" :src="animeDetails.animeImg" alt="">
                    <!-- anime details -->
                    <div class="w-full">
                        <h2 class="text-xl text-white font-bold">
                            {{ animeDetails.animeTitle }}
                        </h2>
                        <span class="text-white/90"> {{ animeDetails.otherNames }} </span>
                        <p class="text-white/80 py-1">{{ animeDetails.synopsis }}</p>

                        <ul>
                            <li class="flex flex-wrap gap-x-2 items-start">
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

            <RelatedAnime :genres="animeDetails.genres" />

        </div>


        <!-- side anime list -->
        <SideAnimeList />
    </div>
</template>
