<script lang="ts">
import { defineComponent } from "vue";

import SideAnimeList from "../components/SideAnimeList.vue";
import Loading from "../components/Loading.vue";
import axios from "axios";
import { Watch } from "../types/Anime";

export default defineComponent({
    name: "Home",
    components: { SideAnimeList, Loading },
    data() {
        return {
            selectedAnime: [] as Watch[],
            isLoading: false as boolean,
        };
    },
    async mounted() {
        this.isLoading = true;
        await axios
            .get<Watch[]>("https://gogoanime.consumet.stream/anime-details/naruto")
            .then((response) => {
                console.log(response.data);
                this.selectedAnime = response.data;
                this.isLoading = false;
            })
            .catch((err) => {
                console.log(err);
            });
    },
});
</script>

<template>
    <div class="w-full md:p-5 py-1 flex gap-5 justify-between ">
        <!-- animes list -->
        <div class="w-full h-full bg-black md:rounded-xl overflow-hidden">
            <header class="bg-[red] w-full">
                <h3 class="font-semibold text-white px-5 py-2">WATCH ANIME - Naruto

                </h3>
            </header>

            <div class="w-full p-5">
                <div class="w-full flex md:flex-row flex-col gap-5 ">
                    <!-- image container -->
                    <div class="w-[350px] h-[380px] bg-white">

                        <img class="ww-full h-full object-cover" src="https://gogocdn.net/images/anime/N/naruto.jpg" alt="">
                    </div>

                    <!-- anime details -->
                    <div class="w-full">
                        <h2 class="text-xl text-white font-bold">
                            Naruto
                        </h2>
                        <span class="text-white/90"> ナルト </span>
                        <p class="text-white/80 py-1">In a world of mystical and powerful enemies lurk in every nation,
                            a
                            legendary Nine-Tailed
                            Demon Fox attacked the ninja village Konoha, killing many innocent people. In response of a
                            desperate measure from the people, the leader of the village – the Fourth Hokage –
                            sacrificed his life to defeat the demon fox. By sacrificing his own life, he sealed the
                            demon fox into a very young boy named, Naruto Uzumaki. Naruto has lost his parents during
                            the attack. He grew up in the village and was mistreated badly by everyone in town.\n\nWith
                            his loud mouth and careless attitude, he is determined to become the greatest ninja, hokage,
                            in his village. Along with friends, and hope, Naruto trains to become a better ninja than
                            expected.</p>

                        <ul>
                            <li class="flex gap-2 items-start">
                                <span class="text-white/80  font-semibold text-[15px]">Genres:
                                </span>
                                <span class="flex flex-wrap gap-x-1 ">
                                    <p class="text-[red] text-sm">
                                        Action,
                                    </p>
                                    <p class="text-[red] text-sm">
                                        Comedy,
                                    </p>
                                    <p class="text-[red] text-sm">
                                        Martial,
                                    </p>
                                    <p class="text-[red] text-sm">
                                        Arts,
                                    </p>
                                    <p class="text-[red] text-sm">
                                        Shounen,
                                    </p>
                                    <p class="text-[red] text-sm">
                                        Super Power,
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
        </div>

        <!-- side anime list -->
        <SideAnimeList />
    </div>
</template>
