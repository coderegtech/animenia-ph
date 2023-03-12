<script lang="ts">
import axios from 'axios';
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Loading from '../components/Loading.vue';
import Pagination from "../components/Pagination.vue";
import SideAnimeList from "../components/SideAnimeList.vue";
import { Genres } from "../types/Anime";
export default defineComponent({
    components: { SideAnimeList, Loading, Pagination },
    setup() {
        const isLoading = ref<boolean>(false)
        const animeList = ref<Genres[]>([])
        const genre = ref<string>("")
        const router = useRoute()
        const page = ref<number>(1)


        const fetchAnime = async () => {
            isLoading.value = true
            await axios.get<Genres[]>(`http://0.0.0.0:3000/genre/${!genre.value ? router.params.genre : genre.value}?page=${page.value}`).then(response => {

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


        const changePage = (pageNum: number) => {
            page.value = pageNum
            fetchAnime()
        }

        onMounted(fetchAnime)


        return { isLoading, animeList, genre, changeGenre, changePage, page }

    }


})


</script>

<template>
    <div class="w-full md:p-5 py-1 flex gap-5 justify-between">
        <!-- animes list -->
        <div class="w-full h-full bg-black md:rounded-xl overflow-hidden">
            <header class="bg-[red] w-full flex justify-between items-center">
                <h3 class="text-sm md:text-base font-semibold text-white px-5 py-2">ANIME GENRE {{ genre.toUpperCase() }}
                </h3>

                <Pagination :page="page" :change-page="changePage" :total-page="5" />

            </header>

            <div class="w-full p-5 flex gap-5 flex-wrap justify-center">

                <Loading v-if="isLoading" />

                <p class="text-white text-center" v-else-if="!animeList.length">Not found</p>

                <!-- anime list items -->
                <div v-for="anime, index in animeList" :key="index" class="max-w-[130px] md:max-w-[200px] md:max-h-96"
                    v-else>
                    <!-- image box -->
                    <div class=" anime-img duration-300 relative w-full h-48 md:max-h-72 md:h-full bg-white/20 rounded-md overflow-hidden"
                        @click="$router.push({ name: 'watch-anime', params: { 'episode': anime.animeId } })">
                        <img class="  w-full h-full object-cover duration-300" :src="anime.animeImg" alt="">

                        <span
                            class="play-btn opacity-0 duration-300 absolute top-0 left-0 w-full h-full bg-black/50 grid place-items-center cursor-pointer"><v-icon
                                name="hi-solid-play" scale="2.5" color="red"></v-icon></span>
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