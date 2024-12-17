<template>
    <div class="w-screen h-screen py-4 bg-gray-100">
        <div class="w-full h-full overflow-y-auto space-y-5">
            <div class="flex items-center justify-between w-full px-4 sticky top-0 bg-gray-100 pb-2">
                <p class="text-gray-500 text-lg">Hi, {{ currentUser?.displayName.split(' ')[0] }}!</p>
                <div class="relative">
                    <!-- <Icon icon="mdi:bell-outline" class="text-3xl" />
                    <div class="bg-red-500 w-2 aspect-square rounded-full absolute top-0 right-0"></div> -->
                    <Icon icon="mdi:logout" class="text-2xl cursor-pointer" @click="logout" />
                </div>
            </div>
            <div class="px-4">
                <h1 class="font-bold tracking-wide text-xl w-1/2">Which service do you need?</h1>
            </div>
            <!-- searchbar -->
            <div class="px-4">
                <div class="w-full overflow-hidden rounded-xl h-12 shadow-sm flex items-center bg-white text-gray-500 px-3 gap-x-1">
                    <Icon icon="mdi:search" class="text-3xl" />
                    <input type="text" class="h-full w-full bg-transparent focus:outline-none ml-2" placeholder="Search for a services...">
                    <Icon icon="mingcute:settings-6-line" class="text-3xl" />
                </div>
            </div>
            <!-- image banner -->
            <div class="px-4 w-full overflow-hidden !my-8">
                <img src="../assets/rb_9852.png" class="object-cover w-full aspect-video">
            </div>
            <!-- services -->
            <div class="space-y-4">
                <div class="flex justify-between items-center px-4">
                    <h1 class="font-semibold text-lg">Our services</h1>
                    <router-link :to="{ name: 'serviceLists' }" class="text-primary">See All</router-link>
                </div>
                <div v-if="!fetching && services.length" class="flex w-full overflow-x-auto pl-4 gap-x-2" id="services">
                        <router-link v-for="(service, index) in services" :key="index" :to="{ name: 'serviceDetails', params: { id: service.id } }" class="bg-gray-200 text-gray-500 px-4 py-2 rounded-full">
                            <p>{{ service.title }} </p>
                        </router-link>
                </div>
                <div v-else-if="!fetching && !services.length" class="flex w-full overflow-x-auto pl-4" id="services">
                    <p>No services to show</p>
                </div>
                <div v-else class="flex w-full overflow-x-auto pl-4" id="services">
                    <div class="flex gap-x-4">
                        <div v-for="i in 5" :key="i" class="bg-gray-200 text-gray-500 w-32 h-9 py-2 rounded-full animate-pulse">
                        </div>
                    </div>
                </div>
            </div>
            <!-- popular -->
            <div class="px-4 !mt-8 space-y-4 pb-14">
                <h1 class="font-semibold text-lg">Popular Services</h1>
                <div v-if="!fetching && services.length" class="space-y-3">
                    <div v-for="(service, index) in services" :key="index" class="bg-white w-full h-fit rounded-2xl border p-4">
                        <router-link :to="{ name: 'serviceDetails', params: { id: service.id } }" class=" space-y-2">
                            <h1 class="font-bold text-lg">{{ service.title }}</h1>
                            <p class="line-clamp-3 font-semibold text-gray-600">{{ service.description   }}</p>
                            <p class="font-bold text-lg text-gray-600/75"><span class="!text-primary">₱{{ service.rate }}</span>/sqm</p>
                            <div class="flex gap-x-1 items-center">
                                <Icon icon="mdi:star" class="text-2xl text-secondary" />
                                <p class="mt-1 text-gray-500">{{ ratings(service.id) }}</p>
                            </div>
                        </router-link>
                    </div>
                </div>
                <div v-else-if="!fetching && !services.length" class="flex w-full overflow-x-auto pl-4" id="services">
                    <p>No services to show</p>
                </div>
                <div v-else id="services">
                    <div class="flex flex-col gap-y-3">
                        <div v-for="i in 5" :key="i" class="bg-gray-200 text-gray-500 w-full h-24 py-2 rounded-lg animate-pulse">
                        </div>
                    </div>
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
import { computed, onMounted, ref } from 'vue'
import { useDataStore, useAuthStore } from '../store'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const dataStore = useDataStore()

const router = useRouter()

const logout = () => {
    authStore.logout()
    router.push('/login')
}

const currentUser = computed(() => authStore.user)

const fetching = computed(() => dataStore.fetchingServices)
const services = computed(() => dataStore.services)


const ratings = (serviceID) => {
    const service = services.value.find(service => service.id === serviceID)

    if (service && service.ratings && service.ratings.length > 0) {
        const totalRating = service.ratings.reduce((acc, rating) => acc + rating.rating, 0)

        // Calculate the average rating
        const averageRating = totalRating / service.ratings.length

        return averageRating.toFixed(1)
    } else {
        return 0 
    }
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
</style>