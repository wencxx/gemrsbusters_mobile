<template>
    <div class="w-screen h-screen py-4 bg-gray-100">
        <div class="w-full h-full overflow-y-auto space-y-5">
            <div class="flex items-center justify-between w-full px-4 sticky top-0 bg-gray-100 pb-2">
                <p class="text-gray-500 text-lg">Hi, {{ currentUser?.displayName.split(' ')[0] }}!</p>
                <div class="relative">
                    <!-- <Icon icon="mdi:bell-outline" class="text-3xl" />
                    <div class="bg-red-500 w-2 aspect-square rounded-full absolute top-0 right-0"></div> -->
                    <Icon icon="mdi:logout" class="text-2xl" />
                </div>
            </div>
            <div class="px-4">
                <h1 class="font-bold tracking-wide text-xl w-2/3">Services</h1>
            </div>
            <!-- reservations -->
            <div class="px-4 space-y-3 pb-14">
                <div v-if="!fetching && services.length" class="space-y-3">
                    <router-link :to="{ name: 'serviceDetails', params: { id: service.id } }" v-for="service in services" :key="service.id" class="bg-white w-full h-fit rounded-lg shadow-sm p-4 flex justify-between items-center">
                        <div class="space-y-1">
                            <h1 class="font-semibold text-gray-700 space-x-2 text-sm">
                                <span class="uppercase">{{ service.title }}</span>
                            </h1>
                            <span class="text-primary">{{ formatTotal(service.rate) }}</span>
                        </div>
                        <div class="flex items-center gap-x-3">
                            <router-link :to="{ name: 'home' }">
                                <Icon icon="weui:arrow-filled" class="text-2xl" />
                            </router-link>
                        </div>
                    </router-link>
                </div>
                <div v-if="!fetching && !services.length">
                    <p class="text-center mt-5 text-gray-500">No reservations to show.</p>
                </div>
                <div v-if="fetching" class="space-y-3">
                    <div v-for="i in 5" :key="i" class="bg-gray-200 animate-pulse rounded w-full h-20"></div>
                </div>
            </div>
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
import { computed, onMounted, ref, watchEffect } from 'vue'
import { useDataStore, useAuthStore } from '../store'
import { db } from '../config/firebaseConfig'
import { collection, where, query, getDocs } from 'firebase/firestore'

const authStore = useAuthStore()
const dataStore = useDataStore()

const currentUser = computed(() => authStore.user)

onMounted(() => {
    watchEffect(() => {
        if(currentUser.value){
            getServices()
        }
    })
})

// get reservations
const services = ref([])
const fetching = ref([])

const getServices = async () => {
    try {
        fetching.value = true
        const docRef = collection(db, 'services')

        const snapshots = await getDocs(docRef)

        snapshots.docs.forEach(doc => {
            services.value.push({
                id: doc.id,
                ...doc.data()
            })
        })
    } catch (error) {
        console.log(error)
    } finally {
        fetching.value = false
    }
}

const formatTotal = (total) => {
    return Number(total).toLocaleString('en-US', {
        style: 'currency',
        currency: 'PHP'
    })
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