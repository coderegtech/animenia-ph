<script lang="ts">
import { defineComponent } from 'vue';
import Header from "./components/Header.vue"
import Footer from './components/Footer.vue'
export default defineComponent({
  name: 'App',
  components: { Header, Footer }
})


</script>

<template>
  <div class=" max-w-[1440px] w-full mx-auto overflow-hidden">
    <Header />
    <router-view class="mt-[75px] lg:mt-[110px]"></router-view>
    <Footer />
  </div>
</template>