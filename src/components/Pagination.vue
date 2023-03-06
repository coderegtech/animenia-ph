<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: ['page', 'changePage'],
    data() {
        return {
            totalPage: 5 as number
        }
    }
})

</script>
<template>
    <div class="flex gap-1 px-5">
        <span v-for="pageNum in totalPage" @click="changePage(pageNum)" :class="{ 'bg-black': pageNum === page }"
            class="px-2 border border-white text-white hover:bg-black cursor-pointer duration-100 rounded-lg">{{ pageNum
            }}</span>

    </div>
</template>