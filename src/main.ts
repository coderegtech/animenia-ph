import { createApp } from 'vue';
import App from './App.vue';
import router from './routes';
import './style.css';

import { addIcons, OhVueIcon } from "oh-vue-icons";
import { BiArrowUpCircleFill, HiSolidPlay, IoSearch } from "oh-vue-icons/icons";

addIcons(IoSearch, BiArrowUpCircleFill, HiSolidPlay);

const app = createApp(App)

app.use(router)
app.component("v-icon", OhVueIcon);
app.mount('#app')