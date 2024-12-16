import { createRouter, createWebHistory } from 'vue-router'
import landingPage from '../views/LandingPage.vue'
import { useAuthStore } from '../store'

const routes = [
    {
        path: '/',
        name: 'landing',
        component: landingPage
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/Register.vue')
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/Home.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/service-details/:id',
        name: 'serviceDetails',
        component: () => import('../views/ServiceDetails.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/check-out/:id',
        name: 'checkout',
        component: () => import('../views/Checkout.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/reservation-complete',
        name: 'success',
        component: () => import('../views/SuccessConfirmation.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/reservation-lists',
        name: 'reservationLists',
        component: () => import('../views/ReservationLists.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/reservation-details/:id',
        name: 'reservationDetails',
        component: () => import('../views/ReservationDetails.vue'),
        meta: {
            requiresAuth: true
        }
    },
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    const authenticated = authStore.isAuthenticated

    if(to.meta.requiresAuth && !authenticated){
        next('/login')
    }else if(to.path === '/login' && authenticated || to.path === '/' && authenticated){
        next('/home')
    }else{
        next()
    }
})

export default router