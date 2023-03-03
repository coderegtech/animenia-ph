<script lang="ts" >
import { defineComponent } from 'vue';

import axios from 'axios';
import { Search } from '../types/Anime';
import Loading from './Loading.vue';


export default defineComponent({
    components: {Loading},
    props: ['active-navbar'],

    data() {
        return {
            searchValue: "" as string,
            isLoading: false,
            animeList: [] as Search[],
            isActive: false,
        }
    }, 
    methods: {
        handleSearch() {
            this.$router.push({name: 'search-anime', params: {name: this.searchValue}})
            this.searchValue = ""
        }, async searchInput() {
            
            this.isLoading = true
            await axios.get<Search[]>(`https://gogoanime.consumet.stream/search?keyw=${this.searchValue}`).then(response => {
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

<div v-bind:class="{'left-0' : 'active-navbar'}" class=" absolute top-20 -left-full duration-300 w-full  bg-black/90 md:hidden p-3">

     <!-- search bar -->
     <div class="relative pb-5">
            <form @submit.prevent="handleSearch()" class=" bg-white  rounded-lg flex justify-between overflow-hidden">

                <input class="bg-transparent focus:outline-none p-2 px-3" type="text" placeholder="Search..." @keyup="searchInput"  v-model="searchValue">
            <button type="submit" class="bg-[red] px-2 text-white font-bold text-sm" >
             SEARCH
            </button>
            
            </form>

            <div v-if="isActive && searchValue" class="absolute top-12 right-0 w-full max-h-72 py-2 bg-black border border-white/20 rounded-md  overflow-y-auto scrollbar">
                <p class="text-white text-center" v-if="isLoading">loading...</p>

                <p class="text-white text-center" v-else-if="!animeList.length">Not found</p>
                
                <ul v-else>
                    <li v-for="anime in animeList" :key="anime.animeId" class="flex gap-3 p-2">
                        <img :src="anime.animeImg" class="w-10 h-14 object-cover" alt="">

                        <p class="text-white text-sm">{{ anime.animeTitle }}</p>
                    </li>
                </ul>

            </div>

        </div>

 <!-- navbar -->
 <ul class="text-white flex flex-col gap-5 ">
            <li class="cursor-pointer hover:text-[red] border-b border-white/10 py-1"><router-link to="/">HOME</router-link></li>
            <li class="cursor-pointer hover:text-[red] border-b border-white/10 py-1">ANIME LIST</li>
            <li class="cursor-pointer hover:text-[red] border-b border-white/10 py-1">NEW SEASON</li>
            <li class="cursor-pointer hover:text-[red] border-b border-white/10 py-1"><router-link to="/anime-movies">MOVIES</router-link> </li>
            <li class="cursor-pointer hover:text-[red] border-b border-white/10 py-1"><router-link to="/popular">POPULAR</router-link> </li>
        </ul>

</div>


</template>

<style scoped>
.navbar.active {
    left: 0;
}
</style>