<template>
    <div class="h-screen w-screen bg-gray-100 flex flex-col items-center py-20 overflow-y-auto">
        <div>
            <img src="../assets/logo.png" alt="app logo" class="w-28 aspect-square">
        </div>
        <div class="flex flex-col items-center gap-y-1 w-full">
            <h1 class="text-3xl font-bold tracking-wide text-gray-800 text-start w-3/4">Sign Up</h1>
            <p class="text-start text-sm w-3/4 text-gray-500 font-medium">Please fill the details to sign up.</p>
            <form @submit.prevent="register" class="flex flex-col gap-y-3 w-3/4 mt-5">
                <h1 v-if="hasEmptyFields" class="bg-red-500 pl-2 py-1 text-white rounded">Please fill out all fields.</h1>
                <h1 v-if="err" class="bg-red-500 pl-2 py-1 text-white rounded">{{ err }}</h1>
                <input type="text" placeholder="Fullname" class="pl-2 bg-transparent rounded border border-gray-300 h-10" v-model="userData.fullName">
                <select class="pl-2 bg-transparent rounded border border-gray-300 h-10" v-model="userData.gender">
                    <option value="" disabled>Select gender</option>
                    <option>Male</option>
                    <option>Female</option>
                </select>
                <input  type="text" placeholder="Select birthday" onfocus="(this.type='date')" onblur="(this.type='text')" class="pl-2 bg-transparent rounded border border-gray-300 h-10 w-full" v-model="userData.birthday">
                <input type="text" placeholder="City" readonly value="Bacolod City" class="pl-2 bg-transparent rounded border border-gray-300 h-10" v-model="userData.city">
                <select class="pl-2 bg-transparent rounded border border-gray-300 h-10" v-model="userData.barangay">
                    <option value="" disabled>Select Barangay</option>
                    <option>Alangilan</option>
                    <option>Alijis</option>
                    <option>Banago</option>
                    <option>Bata</option>
                    <option>Burgos</option>
                    <option>Cabug</option>
                    <option>Estefania</option>
                    <option>Felisa</option>
                    <option>Granada</option>
                    <option>Handumanan</option>
                    <option>Mandalagan</option>
                    <option>Mansilingan</option>
                    <option>Montevista</option>
                    <option>Pahanocoy</option>
                    <option>Punta Taytay</option>
                    <option>Sibucao</option>
                    <option>Singcang-Airport</option>
                    <option>Sum-ag</option>
                    <option>Taculing</option>
                    <option>Tangub</option>
                    <option>Villamonte</option>
                    <option>Vista Alegre</option>
                    <option>Barangay 1</option>
                    <option>Barangay 2</option>
                    <option>Barangay 3</option>
                    <option>Barangay 4</option>
                    <option>Barangay 5</option>
                    <option>Barangay 6</option>
                    <option>Barangay 7</option>
                    <option>Barangay 8</option>
                    <option>Barangay 9</option>
                    <option>Barangay 10</option>
                    <option>Barangay 11</option>
                    <option>Barangay 12</option>
                    <option>Barangay 13</option>
                    <option>Barangay 14</option>
                    <option>Barangay 15</option>
                    <option>Barangay 16</option>
                    <option>Barangay 17</option>
                    <option>Barangay 18</option>
                    <option>Barangay 19</option>
                    <option>Barangay 20</option>
                    <option>Barangay 21</option>
                    <option>Barangay 22</option>
                    <option>Barangay 23</option>
                    <option>Barangay 24</option>
                    <option>Barangay 25</option>
                    <option>Barangay 26</option>
                    <option>Barangay 27</option>
                    <option>Barangay 28</option>
                    <option>Barangay 29</option>
                    <option>Barangay 30</option>
                    <option>Barangay 31</option>
                    <option>Barangay 32</option>
                    <option>Barangay 33</option>
                    <option>Barangay 34</option>
                    <option>Barangay 35</option>
                    <option>Barangay 36</option>
                    <option>Barangay 37</option>
                    <option>Barangay 38</option>
                    <option>Barangay 39</option>
                </select>
                <input type="text" placeholder="Street" class="pl-2 bg-transparent rounded border border-gray-300 h-10" v-model="userData.street">
                <input type="text" placeholder="Block/Lot" class="pl-2 bg-transparent rounded border border-gray-300 h-10" v-model="userData.block">
                <input type="text" placeholder="Username" class="pl-2 bg-transparent rounded border border-gray-300 h-10" v-model="userData.username">
                <div class="space-y-1 w-full">
                    <input type="password" placeholder="Password" class="pl-2 bg-transparent rounded border border-gray-300 h-10 w-full" v-model="userData.password">
                    <p class="text-sm">Already have an account? <router-link :to="{ name: 'login' }" class="text-blue-500 underline">Sign in</router-link></p>
                </div>
                <button v-if="!signingIn" class="bg-primary py-2 rounded text-white mt-1">Sign Up</button>
                <button v-else class="bg-primary py-2 rounded text-white mt-1 animate-pulse" disabled>Signing Up</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import {  ref } from 'vue'
import { db, auth } from '../config/firebaseConfig'
import { collection, addDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

const userData = ref({
    fullName: '',
    gender: '',
    birthday: '',
    city: 'Bacolod City',
    barangay: '',
    street: '',
    block: '',
    username: '',
    password: '',
    role: 'client',
})

const usersRef = collection(db, 'users')
const hasEmptyFields = ref(false)
const err = ref('')
const signingIn = ref(false)

const register = async () => {
    hasEmptyFields.value = false
    if(Object.values(userData.value).some(value => !value)) return hasEmptyFields.value = true

    try {
        signingIn.value = true
        const userCredential = await createUserWithEmailAndPassword(auth, `${userData.value.username}@gmail.com`, userData.value.password)
        const user = userCredential.user

        if(!user) return err.value = 'Failed to create user'

        await updateProfile(user, {
            displayName: userData.value.fullName
        })

        const res = await addDoc(usersRef, {
            ...userData.value,
            userID: user.uid
        })

        if(!res.empty) {
            router.push({
                path: '/login',
                query: {
                    registered: true
                }
            })
        }else{
            err.value = 'Failed to create user'
        }


    } catch (error) {
        console.log(error)
        err.value = error.message
    } finally {
        signingIn.value = false
    }
}
</script>