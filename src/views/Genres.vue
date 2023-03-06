<script lang="ts">
import axios from 'axios';
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Loading from '../components/Loading.vue';
import SideAnimeList from "../components/SideAnimeList.vue";
import { Genres } from "../types/Anime";
export default defineComponent({
    components: { SideAnimeList, Loading, },
    setup() {
        const isLoading = ref<boolean>(false)
        const animeList = ref<Genres[]>([])
        const genre = ref<string>("")
        const router = useRoute()


        const fetchAnime = async () => {
            isLoading.value = true
            await axios.get<Genres[]>(`https://gogoanime.consumet.stream/genre/${!genre.value ? router.params.genre : genre.value}`).then(response => {

                animeList.value = response.data
                isLoading.value = false
            }).catch(err => {
                console.log(err);

            })
        }

        // Change different genres
        const changeGenre = (selectedGenre: string) => {
            genre.value = selectedGenre
            fetchAnime()
        }

        onMounted(fetchAnime)


        return { isLoading, animeList, genre, changeGenre }

    }


})


</script>

<template>
    <div class="w-full md:p-5 py-1 flex gap-5 justify-between">
        <!-- animes list -->
        <div class="w-full h-full bg-black md:rounded-xl overflow-hidden">
            <header class="bg-[red] w-full">
                <h3 class="text-sm md:text-base font-semibold text-white px-5 py-2">ANIME GENRE {{ genre.toUpperCase() }}
                </h3>
            </header>

            <div class="w-full p-5 flex gap-5 flex-wrap justify-center">

                <Loading v-if="isLoading" />

                <p class="text-white text-center" v-else-if="!animeList.length">Not found</p>

                <!-- anime list items -->
                <div v-for="anime, index in animeList" :key="index" class="max-w-[130px] md:max-w-[200px] md:max-h-96"
                    v-else>
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
                        <span class="text-[13px] md:text-sm text-white/80">Episode {{ anime.releasedDate }}</span>
                    </div>

                </div>

            </div>

        </div>

        <!-- side anime list -->
        <SideAnimeList :change-genre="changeGenre" />

    </div>
</template>