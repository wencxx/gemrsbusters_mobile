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
                <h1 class="font-bold tracking-wide text-xl w-2/3">My Reservations</h1>
            </div>
            <!-- reservations -->
            <div class="px-4 space-y-3 pb-14">
                <div class="flex items-center gap-x-3 w-full overflow-x-auto filter">
                    <button class="text-gray-400 font-bold" :class="{ '!text-black': filterQuery === 'all' }" @click="filter('all')">All</button>
                    <button class="text-gray-400 font-bold" :class="{ '!text-black': filterQuery === 'pending' }" @click="filter('pending')">Pending</button>
                    <button class="text-gray-400 font-bold" :class="{ '!text-black': filterQuery === 'accepted' }" @click="filter('accepted')">Accepted</button>
                    <button class="text-gray-400 font-bold" :class="{ '!text-black': filterQuery === 'completed' }" @click="filter('completed')">Completed</button>
                    <button class="text-gray-400 font-bold" :class="{ '!text-black': filterQuery === 'canceled' }" @click="filter('canceled')">Canceled</button>
                    <button class="text-gray-400 font-bold" :class="{ '!text-black': filterQuery === 'rejected' }" @click="filter('rejected')">Rejected</button>
                </div>
                <div v-if="!fetching && filteredReservations().length" class="space-y-3">
                    <router-link :to="{ name: 'reservationDetails', params: { id: reservation.id } }" v-for="reservation in filteredReservations()" :key="reservation.id" class="bg-white w-full h-fit rounded-lg shadow-sm p-4 flex justify-between items-center">
                        <div class="space-y-1">
                            <h1 class="font-semibold text-gray-700 space-x-2 text-sm">
                                <span class="uppercase">GB{{ reservation.id.slice(0, 4) }}</span>
                                <span class="text-primary">{{ getService(reservation.serviceID)?.title }}</span>
                            </h1>
                            <p class="text-xs capitalize text-white font-semibold bg-orange-500 w-fit px-3 py-1 rounded" :class="{ '!bg-red-500': reservation.status === 'canceled' || reservation.status === 'rejected', '!bg-gray-500': reservation.status === 'completed' || reservation.status === 'accepted' }">{{ reservation.status }}</p>
                        </div>
                        <div class="flex items-center gap-x-3">
                            <router-link :to="{ name: 'home' }">
                                <Icon icon="weui:arrow-filled" class="text-2xl" />
                            </router-link>
                        </div>
                    </router-link>
                </div>
                <div v-if="!fetching && !filteredReservations().length">
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
            <router-link :to="{ name: 'serviceDetails', params: { id: 1 } }" class="relative">
                <Icon icon="iconamoon:home" />
                <div v-if="$route.name === 'serviceDetails'" class="bg-primary w-1 aspect-square rounded-full absolute -bottom-2 left-1/2 -translate-x-1/2"></div>
            </router-link>
            <router-link :to="{ name: 'serviceDetails', params: { id: 1 } }" class="relative">
                <Icon icon="iconoir:user" />
                <div v-if="$route.name === 'serviceDetails'" class="bg-primary w-1 aspect-square rounded-full absolute -bottom-2 left-1/2 -translate-x-1/2"></div>
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
            getReservations()
        }
    })
})

// get reservations
const reservations = ref([])
const fetching = ref([])

const getReservations = async () => {
    try {
        fetching.value = true
        const q = query(
            collection(db, 'reservations'),
            where('userID', '==', currentUser.value.uid)
        )

        const snapshots = await getDocs(q)

        snapshots.docs.forEach(doc => {
            reservations.value.push({
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

// filter reservations
const filterQuery = ref('all')
const filteredReservations = () => {
    if(filterQuery.value === 'all') return reservations.value

    return reservations.value.filter(reservation => reservation.status === filterQuery.value)
}

const filter = (filter) => {
    filterQuery.value = filter
}

// get service details
const getService = (serviceID) => {
    return dataStore.getSingleService(serviceID)
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