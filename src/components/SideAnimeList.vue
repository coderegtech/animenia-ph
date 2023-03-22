<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";
import { TopAiring } from "../types/Anime";
import Loading from "./Loading.vue";
import Pagination from "./Pagination.vue";
export default defineComponent({
  components: { Loading, Pagination },
  data() {
    return {
      topAiring: [] as TopAiring[],
      isLoading: false as boolean,
      genres: [["action", "adventure", "cars", "comedy", "crime", "dementia", "demons", "drama",
        "dub", "ecchi", "family", "fantasy", "game", "gourmet", "harem", "historical", "horror", "josei",
        "kids", "magic", "martial-arts", "mecha", "military", "Mmusic", "mystery", "parody",], ["police", "psychological",
        "romance", "samurai", "school", "sci-fi", "seinen", "shoujo", "shoujo-ai", "shounen", "shounen-ai", "slice-of-Life", "space",
        "sports", "super-power", "supernatural", "suspense", "thriller", "vampire", "yaoi", "yuri",]
      ],
      page: 1 as number
    };
  },
  mounted() {
    this.fetchAnime()
  },
  methods: {
    async fetchAnime() {
      this.isLoading = true;
      await axios
        .get<TopAiring[]>(`https://gogoanime.consumet.stream/top-airing?page=${this.page}`)
        .then((response) => {
          this.topAiring = response.data;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changePage(pageNum: number) {
      this.page = pageNum
      this.fetchAnime()
    }
  }
});
</script>

<template>
  <div class=" hidden lg:flex flex-col gap-5 basis-[550px]">
    <div class="bg-black rounded-xl overflow-hidden">
      <header class="bg-[red] w-full flex justify-between items-center">

        <h3 class="font-semibold text-white px-3 py-2">TOP ANIME</h3>

        <Pagination :change-page="changePage" :page="page" :total-page="3" />
      </header>

      <Loading v-if="isLoading" />


      <ul class="p-5 h-full">

        <li class="py-2 flex gap-3 hover:scale-105 duration-200" v-for="(anime, index) in topAiring" :key="anime?.animeId"
          @click="$router.push({ name: 'anime', params: { 'animeId': anime?.animeId } })">
          <img class="min-w-[90px] h-[70px] object-cover rounded-md " :src="anime?.animeImg" alt="">
          <div class="">
            <p class="text-white hover:text-[red] text-base cursor-pointer">
              {{ anime?.animeTitle?.substring(0, 50) }}
            </p>
            <span class="text-white/80 text-sm">{{ anime?.latestEp }}</span>
          </div>

        </li>
      </ul>
    </div>

    <div class="bg-black rounded-xl overflow-hidden">
      <header class="bg-[red] w-full">
        <h3 class="font-semibold text-white px-3 py-2">GENRES</h3>
      </header>

      <ul class="p-5">
        <li class="grid grid-cols-2">
          <p @click="$router.push({ name: 'anime-genres', params: { 'genre': genre } })"
            v-for="(genre, index) in genres[0]" :key="index"
            class="text-white hover:text-[red] text-[15px] cursor-pointer p-1">
            {{ genre.replace(genre[0], (c) => c.toUpperCase()) }}
          </p>

          <p @click="$router.push({ name: 'anime-genres', params: { 'genre': genre } })"
            v-for="(genre, index) in genres[1]" :key="index"
            class="text-white hover:text-[red] text-[15px] cursor-pointer p-1">
            {{ genre.replace(genre[0], (c) => c.toUpperCase()) }}
          </p>
        </li>
      </ul>
    </div>

  </div>
</template>
