import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import("./views/Home.vue")
    },
    {
        path: '/anime-list',
        name: 'anime-list',
        component: () => import("./views/AnimeList.vue")
    },
    {
        path: '/anime-movies',
        name: 'anime-movies',
        component: () => import("./views/Movies.vue")
    },
    {
        path: '/popular',
        name: 'popular-anime',
        component: () => import("./views/Popular.vue")
    },
    {
        path: '/search/:name',
        name: 'search-anime',
        component: () => import("./views/Search.vue")
    },
    {
        path: '/genre/:genre',
        name: 'anime-genres',
        component: () => import("./views/Genres.vue")
    }
]


const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router