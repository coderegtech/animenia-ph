import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes'

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { FaFlag, RiZhihuFill, IoSearch } from "oh-vue-icons/icons"

addIcons(FaFlag, RiZhihuFill, IoSearch);

const app = createApp(App)

app.use(router)
app.component("v-icon", OhVueIcon);
app.mount('#app')