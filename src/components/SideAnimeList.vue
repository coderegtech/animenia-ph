<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { TopAiring } from "../types/Anime";
import GenresList from "./GenresList.vue";
export default defineComponent({
  components: { GenresList },
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
    };
  },
  async mounted() {
    this.isLoading = true;
    await axios
      .get<TopAiring[]>("https://gogoanime.consumet.stream/top-airing")
      .then((response) => {
        console.log(response.data);
        this.topAiring.push(...response.data);
        this.isLoading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    selectedGenre(genre: string) {
      this.$router.push({ name: 'anime-genres', params: { 'genre': genre } })
    }
  }
});
</script>

<template>
  <div class="hidden lg:flex flex-col gap-5 min-w-[300px] h-full">
    <div class="bg-black rounded-xl overflow-hidden">
      <header class="bg-[red] w-full">
        <h3 class="font-semibold text-white px-3 py-2">TOP ANIME</h3>
      </header>

      <ul class="p-5">
        <li class="py-2" v-for="(anime, index) in topAiring" :key="anime.animeId">
          <p class="text-white hover:text-[red] text-base cursor-pointer">
            {{ index + 1 }}. {{ anime.animeTitle.substring(0, 50) }}
          </p>
          <span class="text-white/80 text-sm px-3">{{ anime.latestEp }}</span>
        </li>
      </ul>
    </div>

    <GenresList />

  </div>
</template>
