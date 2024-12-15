import { defineStore } from "pinia";

const useAuthStore = defineStore('authStore', {
    state: () => ({
        user: null,
        token: localStorage.getItem('token') || null
    }),
    actions: {
        async login(user, token){
            this.user = user
            this.token = token

            localStorage.setItem('token', token)
        },
        async logout(){
            this.user = null
            this.token = null

            localStorage.removeItem('token')
        }
    },
    getters: {
        isAuthenticated: (state) => !!state.token
    }
})

export default useAuthStore