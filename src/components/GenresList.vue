<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    data() {
        return {
            genres: [["action", "adventure", "cars", "comedy", "crime", "dementia", "demons", "drama",
                "dub", "ecchi", "family", "fantasy", "game", "gourmet", "harem", "historical", "horror", "josei",
                "kids", "magic", "martial-arts", "mecha", "military", "Mmusic", "mystery", "parody",], ["police", "psychological",
                "romance", "samurai", "school", "sci-fi", "seinen", "shoujo", "shoujo-ai", "shounen", "shounen-ai", "slice-of-Life", "space",
                "sports", "super-power", "supernatural", "suspense", "thriller", "vampire", "yaoi", "yuri",]
            ],
        };
    },
    methods: {
        selectedGenre(genre: string) {
            this.$router.push({ name: 'anime-genres', params: { 'genre': genre } })
        }
    }
});
</script>
<template>
    <div class="bg-black rounded-xl overflow-hidden">
        <header class="bg-[red] w-full">
            <h3 class="font-semibold text-white px-3 py-2">GENRES</h3>
        </header>

        <ul class="p-5">
            <li class="grid grid-cols-2">
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
</template>