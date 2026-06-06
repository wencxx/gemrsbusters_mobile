<template>
    <div class="w-screen h-screen bg-slate-50 font-sans flex flex-col overflow-hidden">
        <div class="flex-1 overflow-y-auto pb-28">
            <!-- Cover Banner -->
            <div class="relative w-full h-44 bg-gradient-to-tr from-green-500 to-emerald-600 rounded-b-[2.5rem] shadow-sm flex items-center justify-center">
                <div class="text-center text-white pb-4">
                    <h2 class="text-xl font-bold tracking-wide">My Profile</h2>
                    <p class="text-xs opacity-80 mt-1">Manage your account details</p>
                </div>
            </div>

            <!-- Avatar -->
            <div class="relative flex justify-center -mt-16 mb-6">
                <div class="w-32 h-32 rounded-full bg-white p-1.5 shadow-lg flex items-center justify-center border border-gray-100">
                    <div class="w-full h-full rounded-full bg-slate-50 flex items-center justify-center text-gray-600">
                        <Icon v-if="currentUser.gender === 'Female'" icon="et:profile-female" class="text-6xl text-primary" />
                        <Icon v-else icon="et:profile-male" class="text-6xl text-primary" />
                    </div>
                </div>
            </div>

            <!-- Info Section -->
            <div class="px-5 space-y-4" v-if="currentUser">
                <!-- Personal Details Card -->
                <div class="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 space-y-4">
                    <h3 class="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Personal Details</h3>
                    
                    <div class="flex items-center justify-between py-1 border-b border-gray-50 pb-3">
                        <div class="flex items-center gap-x-3">
                            <div class="p-2.5 bg-slate-50 rounded-xl text-gray-500">
                                <Icon icon="mdi:account-outline" class="text-xl text-primary" />
                            </div>
                            <div>
                                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Full Name</p>
                                <p class="text-sm font-semibold text-gray-800">{{ currentUser.fullName }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center justify-between py-1 border-b border-gray-50 pb-3">
                        <div class="flex items-center gap-x-3">
                            <div class="p-2.5 bg-slate-50 rounded-xl text-gray-500">
                                <Icon icon="mdi:at" class="text-xl text-primary" />
                            </div>
                            <div>
                                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Username</p>
                                <p class="text-sm font-semibold text-gray-800">@{{ currentUser.username }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center justify-between py-1 border-b border-gray-50 pb-3">
                        <div class="flex items-center gap-x-3">
                            <div class="p-2.5 bg-slate-50 rounded-xl text-gray-500">
                                <Icon icon="mdi:cake-variant-outline" class="text-xl text-primary" />
                            </div>
                            <div>
                                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Birthday</p>
                                <p class="text-sm font-semibold text-gray-800">{{ moment(currentUser.birthday).format('LL') }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center justify-between py-1 pb-1">
                        <div class="flex items-center gap-x-3">
                            <div class="p-2.5 bg-slate-50 rounded-xl text-gray-500">
                                <Icon icon="mdi:gender-male-female" class="text-xl text-primary" />
                            </div>
                            <div>
                                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Gender</p>
                                <p class="text-sm font-semibold text-gray-800">{{ currentUser.gender }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Address Card -->
                <div class="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 space-y-4">
                    <h3 class="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Address Details</h3>
                    <div class="flex items-start gap-x-3">
                        <div class="p-2.5 bg-slate-50 rounded-xl text-gray-500 shrink-0">
                            <Icon icon="mdi:map-marker-outline" class="text-xl text-primary" />
                        </div>
                        <div>
                            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Address</p>
                            <p class="text-sm font-semibold text-gray-800 mt-1 leading-relaxed">
                                {{ currentUser.block }}, {{ currentUser.street }}, {{ currentUser.barangay }}, {{ currentUser.city }}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Logout Button -->
                <div class="pt-4 px-1">
                    <button 
                        @click="logout" 
                        class="w-full bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 font-semibold py-4 rounded-2xl active:scale-95 transition-all text-sm flex items-center justify-center gap-x-2 shadow-sm"
                    >
                        <Icon icon="mdi:logout" class="text-lg" />
                        <span>Log Out Account</span>
                    </button>
                </div>
            </div>
        </div>
        <!-- Bottom Navigation -->
        <div class="fixed bottom-0 left-0 w-full h-20 border-t border-gray-100 flex items-center justify-around text-2xl z-20 bg-white/95 backdrop-blur-md pb-4 pt-2">
            <router-link 
                :to="{ name: 'home' }" 
                class="relative flex flex-col items-center gap-y-0.5 text-gray-400 transition-colors"
                :class="{ 'text-primary': $route.name === 'home' }"
            >
                <Icon icon="iconamoon:home" />
                <span class="text-[9px] font-bold uppercase tracking-wider">Home</span>
                <div v-if="$route.name === 'home'" class="bg-primary w-1.5 h-1.5 rounded-full absolute -bottom-1.5 left-1/2 -translate-x-1/2"></div>
            </router-link>
            <router-link 
                :to="{ name: 'reservationLists' }" 
                class="relative flex flex-col items-center gap-y-0.5 text-gray-400 transition-colors"
                :class="{ 'text-primary': $route.name === 'reservationLists' || $route.name === 'reservationDetails' }"
            >
                <Icon icon="lucide:list" />
                <span class="text-[9px] font-bold uppercase tracking-wider">Bookings</span>
                <div v-if="$route.name === 'reservationLists' || $route.name === 'reservationDetails'" class="bg-primary w-1.5 h-1.5 rounded-full absolute -bottom-1.5 left-1/2 -translate-x-1/2"></div>
            </router-link>
            <router-link 
                :to="{ name: 'serviceLists' }" 
                class="relative flex flex-col items-center gap-y-0.5 text-gray-400 transition-colors"
                :class="{ 'text-primary': $route.name === 'serviceLists' || $route.name === 'serviceDetails' }"
            >
                <Icon icon="hugeicons:cleaning-bucket" />
                <span class="text-[9px] font-bold uppercase tracking-wider">Services</span>
                <div v-if="$route.name === 'serviceLists' || $route.name === 'serviceDetails'" class="bg-primary w-1.5 h-1.5 rounded-full absolute -bottom-1.5 left-1/2 -translate-x-1/2"></div>
            </router-link>
            <router-link 
                :to="{ name: 'profile' }" 
                class="relative flex flex-col items-center gap-y-0.5 text-gray-400 transition-colors"
                :class="{ 'text-primary': $route.name === 'profile' }"
            >
                <Icon icon="iconoir:user" />
                <span class="text-[9px] font-bold uppercase tracking-wider">Profile</span>
                <div v-if="$route.name === 'profile'" class="bg-primary w-1.5 h-1.5 rounded-full absolute -bottom-1.5 left-1/2 -translate-x-1/2"></div>
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
    color: #0cb632 !important;
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