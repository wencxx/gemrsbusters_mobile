<template>
    <div class="w-screen h-screen py-4 bg-gray-100">
        <div class="w-full h-full overflow-y-auto space-y-5">
            <div class="flex items-center justify-between w-full px-4">
                <p class="text-gray-500 text-lg">Hi, Wency!</p>
                <div class="relative">
                    <Icon icon="mdi:bell-outline" class="text-3xl" />
                    <div class="bg-red-500 w-2 aspect-square rounded-full absolute top-0 right-0"></div>
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
                    <h1 class="font-semibold text-lg">Our Services</h1>
                    <router-link class="text-primary">See All</router-link>
                </div>
                <div class="flex gap-x-4 w-full overflow-x-auto pl-4" id="services">
                    <router-link :to="{ name: 'serviceDetails', params: { id: 1 } }" v-for="i in 5" :key="i" class="bg-gray-200 text-gray-500 px-4 py-2 rounded-full">
                        <p>Cleaning</p>
                    </router-link>
                </div>
            </div>
            <!-- popular -->
            <div class="px-4 !mt-8 space-y-4 pb-14">
                <h1 class="font-semibold text-lg">Popular Services</h1>
                <div class="space-y-3">
                    <div v-for="i in 4" :key="i" class="bg-white w-full h-fit rounded-2xl border p-4 space-y-2">
                        <h1 class="font-bold text-lg">Deep Cleaning</h1>
                        <p class="line-clamp-3 font-semibold text-gray-600">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
                        <p class="font-bold text-lg text-gray-600/75"><span class="!text-primary">₱100</span>/sqm</p>
                        <div class="flex gap-x-1 items-center">
                            <Icon icon="mdi:star" class="text-2xl text-secondary" />
                            <p class="mt-1 text-gray-500">4.8</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- bottom navigation -->
        <div class="fixed bottom-0 left-0 w-full h-16 border flex items-center justify-center gap-x-12 text-3xl green z-10 bg-gray-100">
            <router-link :to="{ name: 'home' }" class="relative">
                <Icon icon="iconamoon:home" />
                <div v-if="$route.name === 'home'" class="bg-primary w-2 aspect-square rounded-full absolute -bottom-2 left-1/2 -translate-x-1/2"></div>
            </router-link>
            <router-link class="relative">
                <Icon icon="lucide:list" />
                <div v-if="$route.name === 'reservations'" class="bg-primary w-2 aspect-square rounded-full absolute -bottom-2 left-1/2 -translate-x-1/2"></div>
            </router-link>
            <router-link class="relative">
                <Icon icon="iconamoon:home" />
                <div v-if="$route.name === 'home'" class="bg-primary w-2 aspect-square rounded-full absolute -bottom-2 left-1/2 -translate-x-1/2"></div>
            </router-link>
            <router-link class="relative">
                <Icon icon="iconoir:user" />
                <div v-if="$route.name === 'profile'" class="bg-primary w-2 aspect-square rounded-full absolute -bottom-2 left-1/2 -translate-x-1/2"></div>
            </router-link>
        </div>
    </div>
</template>

<script setup>

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