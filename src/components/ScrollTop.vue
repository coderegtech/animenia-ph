<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const showButton = ref(false)

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

const handleScroll = () => {
    showButton.value = window.pageYOffset > 300;
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})




</script>

<template>
    <div :class="[showButton ? 'block' : 'hidden']" class="fixed bottom-5 right-5 cursor-pointer" @click="scrollToTop">
        <v-icon name="bi-arrow-up-circle-fill" scale="2.5" color="white"></v-icon>
    </div>
</template>