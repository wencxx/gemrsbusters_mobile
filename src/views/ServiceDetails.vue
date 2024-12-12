<template>
    <div class="w-full h-full bg-gray-100">
        <!-- hero -->
        <div class="w-full h-full relative !pt-10">
            <router-link :to="{ name: 'home' }" class="absolute top-5 left-5 bg-gray-200 px-3 py-1 rounded-md">
                <Icon icon="weui:arrow-filled" class="text-3xl rotate-180" />
            </router-link>
            <img src="../assets/rb_2151022682.png" class="w-full aspect-auto object-cover">
        </div>
        <!-- details -->
        <div class="absolute left-0 bottom-0 bg-white w-full h-1/2 border rounded-t-[10%] flex flex-col justify-between">
            <hr class="w-16 h-1 bg-gray-200 rounded-full absolute top-3 left-1/2 -translate-x-1/2">
            <div class="w-full h-full p-4 !pt-6 space-y-3">
                <div>
                    <h1 class="text-lg font-bold tracking-wide">Deep Cleaning</h1>
                    <div class="flex items-center">
                        <Icon icon="mdi:star" class="text-secondary" v-for="i in 5" :key="i" />
                        <p class="text-sm ml-2">5.0</p>
                    </div>
                </div>
                <p class="text-sm text-gray-600 tracking-wide">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
            </div>
            <!-- bottom buttons -->
            <div class="w-full flex justify-between items-center p-4">
                <h1 class="font-bold text-xl text-gray-600/75"><span class="!text-primary">₱100</span>/sqm</h1>
                <div class="bg-primary h-12 w-1/2 rounded-2xl flex items-center justify-center">
                    <h1 class="text-white text-lg">Reserve Now</h1>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>