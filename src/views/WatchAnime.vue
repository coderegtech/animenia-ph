<script lang="ts">
import { defineComponent } from "vue";

import axios from "axios";
import Loading from "../components/Loading.vue";
import SideAnimeList from "../components/SideAnimeList.vue";

export default defineComponent({
    name: "WatchAnime",
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
            animeLink: "" as string,
            isLoading: false as boolean,
            animeId: this.$route.params.animeId,
            currentEpisode: this.$route.params.episode
        };
    },
    created() {
        this.fetchAnimeDetails(this.animeId)
        this.fetchWatchAnime()

    },
    watch: {
        currentEpisode: {
            deep: true,
            handler(episode) {
                console.log(episode);
                this.fetchWatchAnime()
            }
        }
    },

    methods: {
        async fetchAnimeDetails(animeId: string | string[]) {
            this.isLoading = true;

            await axios
                .get(`https://gogoanime.consumet.stream/anime-details/${animeId}`)
                .then((response) => {
                    console.log(response.data);

                    this.animeDetails = { ...response.data };
                    this.isLoading = false;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        async fetchWatchAnime() {
            this.isLoading = true;

            await axios
                .get(`https://gogoanime.consumet.stream/vidcdn/watch/${this.currentEpisode}`)
                .then((response) => {
                    console.log(response.data);

                    this.animeLink = response.data.Referer;
                    this.isLoading = false;


                })
                .catch((err) => {
                    console.log(err);
                });
        }



    }

});
</script>

<template>
    <div class="w-full md:p-5 py-1 flex gap-5 justify-between">


        <div class="w-full ">
            <!-- animes list -->
            <div class=" w-full min-h-screen bg-black md:rounded-xl overflow-hidden">
                <header class="bg-[red] w-full">
                    <h3 class="text-sm md:text-base font-semibold text-white px-5 py-2">WATCH ANIME - {{
                        animeDetails.animeTitle
                    }}</h3>
                </header>

                <Loading v-if="isLoading" />


                <div class="relative w-full md:p-5 flex flex-col md:flex-col-reverse gap-3">


                    <div class="w-full h-[260px] xl:min-h-[75vh] relative  overflow-hidden">
                        <iframe class="w-full h-full" :src="animeLink" allowfullscreen="true" marginwidth="0"
                            marginheight="0" scrolling="no" frameborder="0"></iframe>
                    </div>


                    <!-- anime details -->
                    <div class="w-full px-3 md:p-0">
                        <h2 class="text-lg md:text-xl text-white font-bold">
                            {{ animeDetails.animeTitle }} - {{ currentEpisode }}
                        </h2>

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
                            @click="$router.push({ name: 'watch-anime', params: { 'animeid': animeId, 'episode': episode.episodeId } })"
                            class="bg-[red] text-white cursor-pointer w-10 text-center"
                            :class="[currentEpisode === episode.episodeId ? 'bg-black border border-white' : '']">{{
                                episode.episodeNum
                            }}</span>

                    </div>

                </div>
            </div>



        </div>


        <!-- side anime list -->
        <SideAnimeList />
    </div>
</template>
