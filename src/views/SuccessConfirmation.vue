<template>
    <div class="h-screen w-screen flex flex-col items-center justify-center gap-y-10">
        <Icon icon="simple-line-icons:check" class="text-7xl text-primary" />
        <div class="w-full flex flex-col items-center gap-y-1">
            <h1 class="text-xl text-gray-500 font-semibold">Reservation Complete!</h1>
            <p class="text-sm w-4/5 text-gray-500 text-center">Thank you! Your booking has been submitted and is under review. You will be notified once it is confirmed.</p>
        </div>
        <router-link :to="{ name: 'home' }" class="bg-primary w-1/3 text-center text-white py-1 rounded">HOME</router-link>
    </div>
</template>

<script setup>

</script>