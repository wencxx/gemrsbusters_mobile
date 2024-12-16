<template>
    <div class="w-full h-full bg-gray-100">
        <!-- hero -->
        <div class="w-full h-full relative !pt-10">
            <router-link :to="{ name: 'home' }" class="absolute top-5 left-5 bg-gray-200 px-3 py-1 rounded-lg">
                <Icon icon="weui:arrow-filled" class="text-3xl rotate-180" />
            </router-link>
            <img src="../assets/rb_2151022682.png" class="w-full aspect-auto object-cover">
        </div>
        <!-- details -->
        <div class="absolute left-0 bottom-0 bg-white w-full h-1/2 border rounded-t-[10%] flex flex-col justify-between">
            <hr class="w-16 h-1 bg-gray-200 rounded-full absolute top-3 left-1/2 -translate-x-1/2">
            <div class="w-full h-full p-4 !pt-6 space-y-3">
                <div>
                    <h1 class="text-lg font-bold tracking-wide uppercase">{{ serviceDetails?.title }}</h1>
                    <div class="flex items-center">
                        <Icon 
                            v-for="i in 5" 
                            :key="i" 
                            :icon="i <= Math.floor(ratings()) ? 'mdi:star' : 'mdi:star-outline'" 
                            :class="{ 'text-secondary': i <= Math.floor(ratings()) }" />
                        <p class="text-sm ml-2">{{ ratings() }}</p>
                    </div>
                </div>
                <p class="text-sm text-gray-600 tracking-wide">{{ serviceDetails?.description }}</p>
            </div>
            <!-- bottom buttons -->
            <div class="w-full flex justify-between items-center p-4">
                <h1 class="font-bold text-xl text-gray-600/75"><span class="!text-primary">₱{{ serviceDetails?.rate }}</span>/sqm</h1>
                <router-link :to="{ name: 'checkout', params: { id: serviceDetails?.id } }" class="bg-primary h-12 w-1/2 rounded-2xl flex items-center justify-center">
                    <h1 class="text-white text-lg">Reserve Now</h1>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watchEffect } from 'vue'
import { useDataStore } from '../store'
import { useRoute } from 'vue-router'

const route = useRoute()
const dataStore = useDataStore()

const serviceDetails = ref({})

onMounted(() => {
    watchEffect(() => {
        serviceDetails.value = dataStore.getSingleService(route.params.id)
    })
})

const ratings = () => {
    if (serviceDetails.value && serviceDetails.value.ratings && serviceDetails.value.ratings.length > 0) {
        const totalRating = serviceDetails.value.ratings.reduce((acc, rating) => acc + rating.rating, 0)
        const averageRating = totalRating / serviceDetails.value.ratings.length
        return averageRating
    } else {
        return 0 
    }
}
</script>
