import { createApp } from 'vue';
import App from './App.vue';
import router from './routes';
import './style.css';

import { addIcons, OhVueIcon } from "oh-vue-icons";
import { BiArrowUpCircleFill, BiPlayCircle, IoSearch } from "oh-vue-icons/icons";

addIcons(IoSearch, BiArrowUpCircleFill, BiPlayCircle);

const app = createApp(App)

app.use(router)
app.component("v-icon", OhVueIcon);
app.mount('#app')