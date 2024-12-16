<template>
    <div class="h-screen w-screen bg-gray-100 flex flex-col items-center justify-evenly">
        <div>
            <img src="../assets/logo.png" alt="app logo" class="w-28 aspect-square">
        </div>
        <div class="flex flex-col items-center gap-y-1">
            <h1 class="text-3xl font-bold tracking-wide text-gray-800">Welcome</h1>
            <p class="text-center text-sm w-3/4 text-gray-500 font-medium">Cleaning & disinfection services in Bacolod. Sparkling spaces, germ-free & safe.</p>
            <div class="flex flex-col gap-y-3 w-3/4 mt-8">
                <router-link :to="{ name: 'register' }" class="w-full py-2 rounded border border-gray-300 text-center">Sign Up</router-link>
                <router-link :to="{ name: 'login' }" class="bg-primary w-full py-2 rounded text-white border text-center">Sign In</router-link>
            </div>
        </div>
    </div>
</template>