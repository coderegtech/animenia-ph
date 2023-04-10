<script lang="ts" >
import axios from 'axios';
import { defineComponent } from 'vue';
import { Search } from '../types/Anime';
import Loading from './Loading.vue';
import Navbar from "./Navbar.vue";



export default defineComponent({
    components: { Loading, Navbar },
    data() {
        return {
            searchValue: "" as string,
            isLoading: false,
            animeList: [] as Search[],
            isActive: false as boolean,
            navbarActive: false as boolean
        }
    },
    methods: {
        handleSearch() {
            this.$router.push({ name: 'search-anime', params: { 'name': this.searchValue } })
            this.searchValue = ""
        }, async searchInput() {

            this.isLoading = true
            await axios.get<Search[]>(`https://webdis-emec.onrender.com/search?keyw=${this.searchValue}`).then(response => {
                this.isActive = true
                this.isLoading = false

                this.animeList = response.data

            }).catch(err => {
                console.log(err);
            })

        },

    },
})





</script>


<template>
    <header
        class="fixed top-0 left-1/2 -translate-x-1/2 max-w-[2080px] w-full mx-auto  min-h-[60px] p-5 lg:py-8 bg-black border-b-4 border-[red] flex gap-5 justify-between items-center z-50">



        <router-link to="/" class="title">
            <h1 class="  text-white text-2xl md:text-3xl font-bold">Animenia.<span class="text-[red]">ph</span></h1>
        </router-link>


        <!-- navbar -->
        <ul class="text-white lg:flex gap-5 hidden">
            <li class="cursor-pointer hover:text-[red]"><router-link to="/">HOME</router-link></li>
            <li class="cursor-pointer hover:text-[red]"><router-link to="/new-season">NEW SEASON</router-link></li>
            <li class="cursor-pointer hover:text-[red]"><router-link to="/anime-movies">MOVIES</router-link> </li>
            <li class="cursor-pointer hover:text-[red]"><router-link to="/popular">POPULAR</router-link> </li>
        </ul>

        <!-- search bar -->
        <div class="xl:w-96 relative hidden lg:block">
            <form @submit.prevent="handleSearch()" class=" bg-white  rounded-lg flex overflow-hidden">

                <input class="w-full bg-transparent focus:outline-none p-2 px-3" type="text" placeholder="Search Anime..."
                    @keypress="searchInput" v-model="searchValue">
                <button type="submit" class="bg-[red] px-2 text-white font-bold text-sm">
                    <v-icon name="io-search" scale="1.5"></v-icon>
                </button>

            </form>

            <div v-if="isActive && searchValue"
                class="absolute top-12 right-0 w-full max-h-80  bg-black border border-white/20 rounded-md  overflow-y-auto scrollbar">
                <p class="text-white text-center" v-if="isLoading">loading...</p>

                <p class="text-white text-center" v-else-if="!animeList.length">Not found</p>

                <ul v-else>
                    <li v-for="anime in animeList" :key="anime.animeId"
                        class="flex gap-3 p-2 cursor-pointer hover:bg-white/10" @click="() => {
                            $router.push({ name: 'anime', params: { 'animeId': anime.animeId } })
                            searchValue = ''
                        }">
                        <img :src="anime.animeImg" class="w-10 h-14 object-cover" alt="">

                        <p class="text-white text-sm">{{ anime.animeTitle }}</p>
                    </li>
                </ul>

            </div>

        </div>

        <!-- toggle menu -->
        <div @click="navbarActive = !navbarActive" :class="{ 'active': navbarActive }"
            class="toggle-menu lg:hidden w-8 h-8 flex flex-col justify-evenly z-50">
            <span class="w-full h-[3px] bg-white rounded-lg"></span>
            <span class="w-full h-[3px] bg-white rounded-lg"></span>
            <span class="w-full h-[3px] bg-white rounded-lg"></span>
        </div>

        <Navbar :active="navbarActive" :close="() => navbarActive = false" />

    </header>
</template>

<style scoped>
.scrollbar::-webkit-scrollbar {
    width: 5px;
}

.scrollbar::-webkit-scrollbar-thumb {
    background-color: red;
}

.scrollbar::-webkit-scrollbar-track {
    background-color: transparent;
}

.router-link-active:not(.title) {
    color: red;
    border-bottom: 2px solid red;
}

.toggle-menu span {
    transition: all 300ms ease-in-out;
}


.toggle-menu.active span:nth-child(1) {
    transform: rotate(40deg) translate(3px, 10px);
    background-color: red;
}

.toggle-menu.active span:nth-child(2) {
    transform: translateX(100%);
    opacity: 0;
}

.toggle-menu.active span:nth-child(3) {
    transform: rotate(-40deg) translate(5px, -10px);
    background-color: red;
}
</style>