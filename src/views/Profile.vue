<template>
    <div class="w-screen h-screen bg-gray-100 flex flex-col">
        <div class="border h-[91dvh] flex flex-col">
            <div class="w-full bg-gray-300 h-36 relative">
                <div class="absolute left-5 -bottom-1/2 -translate-y-4 w-1/3 aspect-square rounded-full bg-white border flex items-center justify-center">
                    <Icon v-if="currentUser.gender === 'Female'" icon="et:profile-female" class="text-6xl" />
                    <Icon v-else icon="et:profile-male" class="text-6xl" />
                </div>
            </div>
            <div class="mt-20 px-8">
                <div class="flex justify-between border-t py-2">
                    <h1 class="font-bold text-gray-700 text-lg">Name</h1>
                    <h1 class="text-gray-700 text-lg">{{ currentUser.fullName }}</h1>
                </div>
                <div class="flex justify-between border-t py-2">
                    <h1 class="font-bold text-gray-700 text-lg">Username</h1>
                    <h1 class="text-gray-700 text-lg">@{{ currentUser.username }}</h1>
                </div>
                <div class="flex justify-between border-t py-2">
                    <h1 class="font-bold text-gray-700 text-lg">Birthday</h1>
                    <h1 class="text-gray-700 text-lg">{{ moment(currentUser.birthday).format('LL') }}</h1>
                </div>
                <div class="flex justify-between border-y py-2">
                    <h1 class="font-bold text-gray-700 text-lg">Gender</h1>
                    <h1 class="text-gray-700 text-lg">{{ currentUser.gender }}</h1>
                </div>
                <div class="flex justify-between border-b py-2">
                    <h1 class="font-bold text-gray-700 text-lg">Address</h1>
                    <h1 class="text-gray-700 text-lg text-end">{{ currentUser.block + ', ' + currentUser.street + ', ' + currentUser.barangay + ', ' + currentUser.city }}</h1>
                </div>
            </div>
            <button class="bg-red-500 w-full mt-auto py-2 text-white text-lg" @click="logout">Logout</button>
        </div>
        <!-- bottom navigation -->
        <div class="fixed bottom-0 left-0 w-full h-16 border flex items-center justify-center gap-x-12 text-3xl green z-10 bg-gray-100">
            <router-link :to="{ name: 'home' }" class="relative">
                <Icon icon="iconamoon:home" />
                <div v-if="$route.name === 'home'" class="bg-primary w-1 aspect-square rounded-full absolute -bottom-2 left-1/2 -translate-x-1/2"></div>
            </router-link>
            <router-link :to="{ name: 'reservationLists' }" class="relative">
                <Icon icon="lucide:list" />
                <div v-if="$route.name === 'reservationLists'" class="bg-primary w-1 aspect-square rounded-full absolute -bottom-2 left-1/2 -translate-x-1/2"></div>
            </router-link>
            <router-link :to="{ name: 'serviceLists', params: { id: 1 } }" class="relative">
                <Icon icon="hugeicons:cleaning-bucket" />
                <div v-if="$route.name === 'serviceLists'" class="bg-primary w-1 aspect-square rounded-full absolute -bottom-2 left-1/2 -translate-x-1/2"></div>
            </router-link>
            <router-link :to="{ name: 'profile', params: { id: 1 } }" class="relative">
                <Icon icon="iconoir:user" />
                <div v-if="$route.name === 'profile'" class="bg-primary w-1 aspect-square rounded-full absolute -bottom-2 left-1/2 -translate-x-1/2"></div>
            </router-link>
        </div>
    </div>
</template>

<script setup>
import moment from 'moment'
import { computed, onMounted, ref, watchEffect } from 'vue'
import { useDataStore, useAuthStore } from '../store'
import { useRouter } from 'vue-router'

const router = useRouter()

const authStore = useAuthStore()
const dataStore = useDataStore()

const currentUser = computed(() => authStore.user)

const logout = () => {
    authStore.logout()
    router.push('/login')
}
</script>

<style scoped>
.router-link-active {
    color: #0cb632
}

.overflow-y-auto::-webkit-scrollbar {
    display: none;
}

#services::-webkit-scrollbar {
    display: none;
}
.filter::-webkit-scrollbar {
    display: none;
}
</style>