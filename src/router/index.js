import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/service-details/:id',
        name: 'serviceDetails',
        component: () => import('../views/ServiceDetails.vue')
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router