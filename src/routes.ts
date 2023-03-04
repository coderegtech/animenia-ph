import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [
    // {
    //     path: '*',
    //     name: 'error-page',
    //     component: () => import("./views/ErrorPage.vue")
    // },
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
    }, 
    {
        path: '/watch/:episode',
        name: 'watch-anime',
        component: () => import("./views/Watch.vue")
    }, 
]


const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router