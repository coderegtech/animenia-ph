<script lang="ts">
import { defineComponent } from "vue";

import axios from "axios";
import Loading from "../components/Loading.vue";
import SideAnimeList from "../components/SideAnimeList.vue";
export default defineComponent({
    name: "Watch",
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
                genres: [],
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
        };
    },
    mounted() {
        const fetchAnimeDetails = async () => {
            this.isLoading = true;
            await axios
                .get(`http://0.0.0.0:3000/anime-details/${this.$route.params.episode}`)
                .then((response) => {
                    console.log(response.data)
                    this.animeDetails = { ...response.data };
                    this.isLoading = false;
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        // const fetchWatchAnime = async () => {
        //     this.isLoading = true;
        //     await axios
        //         .get(`https://gogoanime.consumet.stream/vidcdn/watch/${this.animeDetails.episodesList[0].episodeId}`)
        //         .then((response) => {

        //             this.watchAnime.referer = { ...response.data };
        //             this.isLoading = false;
        //         })
        //         .catch((err) => {
        //             console.log(err);
        //         });
        // }

        fetchAnimeDetails()


    }, methods: {

    }

});
</script>

<template>
    <div class="w-full md:p-5 py-1 flex gap-5 justify-between">
        <!-- animes list -->
        <div class="w-full h-full bg-black md:rounded-xl overflow-hidden">
            <header class="bg-[red] w-full">
                <h3 class="text-sm md:text-base font-semibold text-white px-5 py-2">WATCH ANIME - {{ animeDetails.animeTitle
                }}</h3>
            </header>

            <div class="w-full ">
                <!-- image container -->
                <div class="w-full h-full md:p-5">
                    <img class="w-full h-[80vh] object-cover" :src="animeDetails.animeImg" alt="">
                    <!-- <iframe class="w-full h-full" :src="watchAnime.referer" allowfullscreen="true" frameborder="0"></iframe> -->
                </div>

                <!-- anime details -->
                <div class="w-full px-5 pb-5">
                    <h2 class="text-xl text-white font-bold">
                        {{ animeDetails.animeTitle }}
                    </h2>
                    <span class="text-white/90"> {{ animeDetails.otherNames }} </span>
                    <p class="text-white/80 py-1">{{ animeDetails.synopsis }}</p>

                    <ul>
                        <li class="flex gap-2 items-start">
                            <span class="text-white/80  font-semibold text-[15px]">Genres:
                            </span>
                            <span class="flex flex-wrap gap-x-1 " v-for="genres in animeDetails.genres">
                                <p class="text-[red] text-sm">
                                    {{ genres }},
                                </p>

                            </span>


                        </li>
                        <li class="flex gap-2 items-end">
                            <span class="text-white/80  font-semibold text-[15px]">Type:
                            </span>
                            <p class="text-[red] text-sm">
                                TV Series
                            </p>
                        </li>
                        <li class="flex gap-2 items-end">
                            <span class="text-white/80  font-semibold text-[15px]">Status:
                            </span>
                            <p class="text-[red] text-sm">
                                Completed
                            </p>
                        </li>
                        <li class="flex gap-2 items-end">
                            <span class="text-white/80  font-semibold text-[15px]">Episodes:
                            </span>
                            <p class="text-[red] text-sm">
                                220
                            </p>
                        </li>
                        <li class="flex gap-2 items-end">
                            <span class="text-white/80  font-semibold text-[15px]">Released Date:
                            </span>
                            <p class="text-[red] text-sm">
                                2002
                            </p>
                        </li>
                    </ul>

                </div>
            </div>
        </div>


        <!-- side anime list -->
        <SideAnimeList />
    </div>
</template>
