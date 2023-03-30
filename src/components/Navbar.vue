<script lang="ts" >
import { defineComponent } from 'vue';

import axios from 'axios';
import { Search } from '../types/Anime';
import Loading from './Loading.vue';

export default defineComponent({
    name: "Navbar",
    components: { Loading },
    props: ['active', 'close'],
    data() {
        return {
            searchValue: "" as string,
            isLoading: false,
            animeList: [] as Search[],
            isActive: false,
            genres: [["action", "adventure", "cars", "comedy", "crime", "dementia", "demons", "drama",
                "dub", "ecchi", "family", "fantasy", "game", "gourmet", "harem", "historical", "horror", "josei",
                "kids", "magic", "martial-arts", "mecha", "military", "Mmusic", "mystery", "parody",], ["police", "psychological",
                "romance", "samurai", "school", "sci-fi", "seinen", "shoujo", "shoujo-ai", "shounen", "shounen-ai", "slice-of-Life", "space",
                "sports", "super-power", "supernatural", "suspense", "thriller", "vampire", "yaoi", "yuri",]
            ],
        }
    },
    methods: {
        selectedGenre(genre: string) {
            this.$router.push({ name: 'anime-genres', params: { 'genre': genre } })
            this.close()

        },
        handleSearch() {
            this.$router.push({ name: 'search-anime', params: { 'name': this.searchValue } })
            this.searchValue = ""
            this.close()
        }, async searchInput() {

            this.isLoading = true
            await axios.get<Search[]>(`/api/search?keyw=${this.searchValue}`).then(response => {
                this.isActive = true
                this.isLoading = false

                this.animeList = response.data

            }).catch(err => {
                console.log(err);
            })

        }
    },
})



</script>

<template>
    <div :class="{ 'left-0': active }"
        class=" absolute top-[75px] -left-full duration-300 w-full  bg-black/90 lg:hidden p-5 navbar overflow-y-auto scroll-my-20 z-50">

        <!-- search bar -->
        <div class="relative pb-5">
            <form @submit.prevent="handleSearch()" class=" bg-white  rounded-lg flex justify-between overflow-hidden">

                <input class="w-full bg-transparent focus:outline-none p-2 px-3" type="text" placeholder="Search..."
                    @keyup="searchInput" v-model="searchValue">
                <button type="submit" class="bg-[red] px-2 text-white font-bold text-sm">
                    <v-icon name="io-search" scale="1.5"></v-icon>
                </button>

            </form>

            <div v-if="isActive && searchValue"
                class="absolute top-12 right-0 w-full max-h-72 bg-black border border-white/20 rounded-md  overflow-y-auto scrollbar">
                <p class="text-white text-center" v-if="isLoading">loading...</p>

                <p class="text-white text-center" v-else-if="!animeList.length">Not found</p>

                <ul v-else>
                    <li v-for="anime in animeList" :key="anime.animeId" class="flex gap-3 p-2 hover:bg-white/10" @click="() => {
                        $router.push({ name: 'anime', params: { 'animeId': anime.animeId } })
                        searchValue = ''
                        close()
                    }">
                        <img :src="anime.animeImg" class="w-10 h-14 object-cover" alt="">

                        <p class="text-white text-sm">{{ anime.animeTitle }}</p>
                    </li>
                </ul>

            </div>

        </div>

        <!-- navbar -->
        <ul class="text-white flex flex-col gap-5">
            <li class="cursor-pointer hover:text-[red] border-b border-white/10 py-1"><router-link to="/">HOME</router-link>
            </li>
            <li class="cursor-pointer hover:text-[red] border-b border-white/10 py-1"><router-link to="/new-season">NEW
                    SEASON</router-link></li>
            <li class="cursor-pointer hover:text-[red] border-b border-white/10 py-1"><router-link
                    to="/anime-movies">MOVIES</router-link> </li>
            <li class="cursor-pointer hover:text-[red] border-b border-white/10 py-1"><router-link
                    to="/popular">POPULAR</router-link> </li>
        </ul>

        <div class="p-5 w-full h-full ">
            <h2 class=" font-bold text-[red]">GENRES</h2>
            <ul>
                <li class="grid grid-cols-2 ">
                    <p @click="selectedGenre(genre)" v-for="(genre, index) in genres[0]" :key="index"
                        class="text-white hover:text-[red] text-[15px] cursor-pointer p-1">
                        {{ genre.replace(genre[0], (c) => c.toUpperCase()) }}
                    </p>

                    <p @click="selectedGenre(genre)" v-for="(genre, index) in genres[1]" :key="index"
                        class="text-white hover:text-[red] text-[15px] cursor-pointer p-1">
                        {{ genre.replace(genre[0], (c) => c.toUpperCase()) }}
                    </p>
                </li>
            </ul>

        </div>


    </div>
</template>

<style scoped>
.navbar {
    height: calc(100vh - 80px);
}

.navbar::-webkit-scrollbar {
    width: 0;
}
</style>