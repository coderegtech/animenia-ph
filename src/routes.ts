import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { 
        path: '/:pathMatch(.*)*', 
        name: 'NotFound', 
        component: () => import("./views/ErrorPage.vue") 
    },
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
        path: '/new-season',
        name: 'new-season',
        component: () => import("./views/NewSeason.vue")
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
        path: '/:episode',
        name: 'anime',
        component: () => import("./views/Anime.vue"), 
    },  {
        path: '/watch/:episode',
        name: 'watch-anime',
        component: () => import("./views/WatchAnime.vue"), 
    }, 
]


const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router