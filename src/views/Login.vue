<template>
    <div class="h-screen w-screen bg-gray-100 flex flex-col items-center justify-around">
        <div>
            <img src="../assets/logo.png" alt="app logo" class="w-28 aspect-square">
        </div>
        <div class="flex flex-col items-center gap-y-1 w-full">
            <h1 class="text-3xl font-bold tracking-wide text-gray-800 text-start w-3/4">Login</h1>
            <p class="text-start text-sm w-3/4 text-gray-500 font-medium">Please login to your account.</p>
            <form @submit.prevent="signin" class="flex flex-col gap-y-3 w-3/4 mt-8">
                <p v-if="$route.query.registered" class="bg-green-500 pl-2 rounded text-white py-1">Registered Successfully.</p>
                <p v-if="err" class="bg-red-500 pl-2 rounded text-white py-1">{{ err }}</p>
                <input type="text" placeholder="Username" class="pl-2 bg-transparent rounded border border-gray-300 h-10" v-model="username">
                <div class="space-y-1 w-full">
                    <input type="password" placeholder="Password" class="pl-2 bg-transparent rounded border border-gray-300 h-10 w-full" v-model="password">
                    <p class="text-sm">Don't have an account? <router-link :to="{ name: 'register' }" class="text-blue-500 underline">Sign up</router-link></p>
                </div>
                <button v-if="!signingIn" class="bg-primary py-2 rounded text-white mt-1">Sign In</button>
                <button v-else class="bg-primary py-2 rounded text-white mt-1 animate-pulse" disabled>Signing In</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { auth, db } from '../config/firebaseConfig'
import { collection, getDocs, query, where, limit } from 'firebase/firestore'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')

// sign in
const userRef = collection(db, 'users')
const err = ref('')
const signingIn = ref(false)

const signin = async () => {
    router.push({
        query: {}
    })

    try {
        signingIn.value = true
        const userCredential = await signInWithEmailAndPassword(auth, `${username.value}@gmail.com`, password.value)
        const user = userCredential.user

        if(!user) return err.value = 'Failed to login.'

        const docRef = query(
            userRef,
            where('userID', '==', user.uid),
            limit(1)
        )

        const snapshot = await getDocs(docRef)
        if(snapshot.docs[0].data().role !== 'client') return err.value = 'Invalid Credentials.'

        const userData = {
            ...user,
            ...snapshot.docs[0].data()
        }

        authStore.login(userData, user.accessToken)

        router.push('/home')
    } catch (error) {
        err.value = error.message
    } finally {
        signingIn.value = false
    }
}
</script>