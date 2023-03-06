<script lang="ts">
import { defineComponent } from 'vue';
import Footer from './components/Footer.vue';
import Header from "./components/Header.vue";
import ScrollTop from './components/ScrollTop.vue';
export default defineComponent({
  name: 'App',

  components: { Header, Footer, ScrollTop },

})


</script>

<template>
  <div class=" max-w-[2800px] w-full mx-auto overflow-hidden">
    <Header />
    <router-view class="mt-[75px] lg:mt-[110px]"></router-view>
    <ScrollTop />
    <Footer />
  </div>
</template>