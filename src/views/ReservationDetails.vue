<template>
    <div class="w-screen h-screen py-4 bg-slate-50 font-sans">
        <div class="w-full h-full overflow-y-auto space-y-6 px-4">
            <!-- Header -->
            <div class="flex items-center justify-between w-full sticky top-0 bg-slate-50/80 backdrop-blur-md pb-4 pt-2 z-20">
                <div class="flex items-center gap-x-2">
                    <button @click="router.back()" class="p-2 hover:bg-gray-200/50 active:scale-95 rounded-xl transition-all">
                        <Icon icon="mdi:arrow-left" class="text-xl text-gray-700" />
                    </button>
                    <div>
                        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Welcome back</p>
                        <p class="text-xs font-semibold text-gray-700 -mt-0.5">Hi, {{ currentUser?.displayName?.split(' ')[0] }}!</p>
                    </div>
                </div>
                <button @click="logout" class="p-2 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-xl transition-all active:scale-95" title="Log Out">
                    <Icon icon="mdi:logout" class="text-xl" />
                </button>
            </div>

            <!-- Page Title -->
            <div>
                <h1 class="font-bold tracking-tight text-2xl text-gray-900">Booking Details</h1>
            </div>

            <!-- Service & Status Banner Card -->
            <div class="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
                <div class="flex items-start justify-between">
                    <div class="space-y-1">
                        <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Service Requested</span>
                        <h2 class="text-lg font-bold text-gray-800 leading-tight">
                            {{ getService(reservationDetails.serviceID)?.title }}
                        </h2>
                    </div>
                    <span
                        class="px-2.5 py-1 rounded-full text-xs font-semibold border inline-flex items-center gap-x-1 capitalize shrink-0"
                        :class="{
                            'bg-green-50 text-green-700 border-green-200': reservationDetails.status === 'completed',
                            'bg-yellow-50 text-yellow-700 border-yellow-200': reservationDetails.status === 'pending',
                            'bg-red-50 text-red-700 border-red-200': reservationDetails.status === 'canceled',
                            'bg-rose-50 text-rose-700 border-rose-200': reservationDetails.status === 'rejected'
                        }"
                    >
                        <Icon 
                            :icon="reservationDetails.status === 'completed' ? 'mdi:check-circle-outline' : 
                                   reservationDetails.status === 'pending' ? 'mdi:clock-outline' : 
                                   reservationDetails.status === 'canceled' ? 'mdi:close-circle-outline' : 'mdi:alert-circle-outline'"
                            class="text-sm"
                        />
                        <span>{{ reservationDetails.status }}</span>
                    </span>
                </div>

                <!-- Rejection Reason if applicable -->
                <div v-if="reservationDetails.status === 'rejected'" class="bg-rose-50 border border-rose-100 rounded-xl p-3 text-xs text-rose-700">
                    <p class="font-semibold mb-1">Reason for Rejection:</p>
                    <p class="italic">"{{ reservationDetails.reason }}"</p>
                </div>

                <!-- Assigned Cleaners Info -->
                <div v-if="reservationDetails.assignedEmployees?.length" class="pt-3 border-t border-gray-100 space-y-2">
                    <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Assigned Cleaners</p>
                    <div class="flex flex-wrap gap-2">
                        <span 
                            v-for="employeeID in reservationDetails.assignedEmployees" 
                            :key="employeeID"
                            class="inline-flex items-center gap-x-1.5 px-3 py-1.5 bg-gray-50 text-gray-700 border border-gray-200 rounded-xl text-xs font-semibold"
                        >
                            <span class="w-5 h-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-[9px] font-bold uppercase shrink-0">
                                {{ getEmployeeInitials(getEmployeeDetails(employeeID)?.fullName) }}
                            </span>
                            <span>{{ getEmployeeDetails(employeeID)?.fullName }}</span>
                        </span>
                    </div>
                </div>
            </div>

            <!-- Booking Specifications Card -->
            <div class="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
                <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider">Booking Information</h3>
                
                <div class="space-y-4">
                    <!-- Location -->
                    <div class="flex gap-x-3 items-start">
                        <div class="w-9 h-9 rounded-xl bg-blue-50/80 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
                            <Icon icon="mdi:map-marker-outline" class="text-lg" />
                        </div>
                        <div>
                            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Location</p>
                            <p class="text-sm font-semibold text-gray-800 leading-snug">
                                {{ reservationDetails.block + ', ' + reservationDetails.street + ', ' + reservationDetails.barangay + ', ' + reservationDetails.city }}
                            </p>
                        </div>
                    </div>

                    <!-- Date & Time -->
                    <div class="flex gap-x-3 items-start">
                        <div class="w-9 h-9 rounded-xl bg-orange-50/80 text-orange-600 border border-orange-100 flex items-center justify-center shrink-0">
                            <Icon icon="mdi:calendar-clock-outline" class="text-lg" />
                        </div>
                        <div>
                            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Date & Time</p>
                            <p class="text-sm font-semibold text-gray-800">
                                {{ moment(reservationDetails.date).format('lll') }}
                            </p>
                        </div>
                    </div>

                    <!-- Details Grid -->
                    <div class="grid grid-cols-2 gap-4 pt-2">
                        <!-- Type -->
                        <div class="flex gap-x-3 items-start">
                            <div class="w-9 h-9 rounded-xl bg-purple-50/80 text-purple-600 border border-purple-100 flex items-center justify-center shrink-0">
                                <Icon icon="mdi:run-fast" class="text-lg" />
                            </div>
                            <div>
                                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Type</p>
                                <p class="text-sm font-semibold text-gray-800 capitalize">{{ reservationDetails.type }}</p>
                            </div>
                        </div>

                        <!-- Workers -->
                        <div class="flex gap-x-3 items-start">
                            <div class="w-9 h-9 rounded-xl bg-indigo-50/80 text-indigo-600 border border-indigo-100 flex items-center justify-center shrink-0">
                                <Icon icon="mdi:account-group-outline" class="text-lg" />
                            </div>
                            <div>
                                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Workers</p>
                                <p class="text-sm font-semibold text-gray-800">{{ reservationDetails.noOfWorkers }}</p>
                            </div>
                        </div>

                        <!-- Floor Area -->
                        <div class="flex gap-x-3 items-start">
                            <div class="w-9 h-9 rounded-xl bg-teal-50/80 text-teal-600 border border-teal-100 flex items-center justify-center shrink-0">
                                <Icon icon="mdi:ruler-square" class="text-lg" />
                            </div>
                            <div>
                                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Floor Area</p>
                                <p class="text-sm font-semibold text-gray-800">{{ reservationDetails.floorArea }} sqm</p>
                            </div>
                        </div>
                        <!-- Rate -->
                        <div class="flex gap-x-3 items-start">
                            <div class="w-9 h-9 rounded-xl bg-emerald-50/80 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
                                <Icon icon="mdi:cash" class="text-lg" />
                            </div>
                            <div>
                                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Rate</p>
                                <p class="text-sm font-semibold text-gray-800">₱{{ getService(reservationDetails.serviceID)?.rate }}/sqm</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Total Payment Card -->
            <div class="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-3">
                <div class="flex justify-between items-center">
                    <div>
                        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Amount</p>
                        <p class="text-xs text-gray-400">Calculated based on floor area</p>
                    </div>
                    <span class="text-2xl font-bold text-green-600">{{ formatTotal(reservationDetails.total) }}</span>
                </div>
            </div>

            <!-- Feedback Details Card (If already submitted) -->
            <div v-if="reservationDetails.hasFeedback" class="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-3">
                <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider">Your Review</h3>
                <div class="bg-green-50/60 border border-green-100 rounded-xl p-4 space-y-2.5">
                    <div class="flex items-center justify-between">
                        <span class="text-xs font-semibold text-green-800">Submitted Feedback</span>
                        <div class="flex gap-x-0.5">
                            <Icon 
                                icon="mdi:star" 
                                class="text-lg text-yellow-500" 
                                v-for="star in reservationDetails.rating" 
                                :key="star" 
                            />
                            <Icon 
                                icon="mdi:star-outline" 
                                class="text-lg text-gray-300" 
                                v-for="star in (5 - reservationDetails.rating)" 
                                :key="'empty-' + star" 
                            />
                        </div>
                    </div>
                    <p class="text-sm text-gray-600 italic">"{{ reservationDetails.feedback }}"</p>
                </div>
            </div>

            <!-- Actions -->
            <div class="pt-4 pb-24">
                <p v-if="err" class="bg-red-500 pl-3 text-white rounded-xl py-2 mb-3 text-sm font-semibold shadow-sm">{{ err }}</p>
                
                <button 
                    v-if="!canceling && reservationDetails.status === 'pending'" 
                    class="w-full bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 font-semibold py-3.5 rounded-xl active:scale-95 transition-all text-sm shadow-sm" 
                    @click="showCancelWarning = true"
                >
                    Cancel Booking
                </button>
                <button 
                    v-else-if="canceling && reservationDetails.status === 'pending'" 
                    class="w-full bg-red-50 text-red-600 font-semibold py-3.5 rounded-xl animate-pulse text-sm" 
                    disabled
                >
                    Canceling Reservation...
                </button>
                <button 
                    v-else-if="reservationDetails.status === 'completed' && !reservationDetails.hasFeedback" 
                    class="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3.5 rounded-xl shadow-md active:scale-95 transition-all text-sm flex items-center justify-center gap-x-2" 
                    @click="rate(getService(reservationDetails.serviceID))"
                >
                    <Icon icon="mdi:star-face" class="text-lg" />
                    <span>Write Feedback</span>
                </button>
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
        <cancelWarning v-if="showCancelWarning" @closeModal="showCancelWarning = false" @confirmCancel="cancel" />
        <addFeedback 
            v-if="showRateModal" 
            :serviceDetailsToRate="serviceDetailsToRate" 
            :reservationId="reservationDetails.id"
            @closeModal="showRateModal = false" 
            @feedbackSubmitted="onFeedbackSubmitted"
        />
    </div>
</template>

<script setup>
import { computed, onMounted, ref, watchEffect } from 'vue'
import { useDataStore, useAuthStore } from '../store'
import { useRoute, useRouter } from 'vue-router'
import { db } from '../config/firebaseConfig'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import moment from 'moment'
import cancelWarning from '../components/cancelWarning.vue'
import addFeedback from '../components/addFeedback.vue'

const route = useRoute()
const router = useRouter()

const authStore = useAuthStore()
const dataStore = useDataStore()

const currentUser = computed(() => authStore.user)

onMounted(() => {
    watchEffect(() => {
        if(route){
            getReservation()
        }
    })
})

const logout = () => {
    authStore.logout()
    router.push('/login')
}

// get reservations
const reservationDetails = ref({})
const fetching = ref([])

const getReservation = async () => {
    try {
        fetching.value = true
        const docRef = doc(db, 'reservations', route.params.id)

        const snapshot = await getDoc(docRef)

        reservationDetails.value = {
            id: snapshot.id,
            ...snapshot.data()
        }
    } catch (error) {
        console.log(error)
    } finally {
        fetching.value = false
    }
}

// get service details
const getService = (serviceID) => {
    return dataStore.getSingleService(serviceID)
}

// format currency
const formatTotal = (totalPrice) => {
    return Number(totalPrice).toLocaleString('en-US', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    })
}

// cancel reservation
const showCancelWarning = ref(false)
const err = ref('')
const canceling = ref(false)

const cancel = async () => {
    err.value = ''
    try {
        canceling.value = true
        const docRef = doc(db, 'reservations', route.params.id)

        await updateDoc(docRef, {
            status: 'canceled'
        })
        
        reservationDetails.value.status = 'canceled'
        showCancelWarning.value = false
    } catch (error) {
        console.log(error)
        err.value = 'Failed canceling reservation'
    } finally {
        canceling.value = false
    }
}

// get employeeDetails
const getEmployeeDetails = (employeeID) => {
    return dataStore.getEmployeeDetails(employeeID)
}

// rate 
const showRateModal = ref(false)
const serviceDetailsToRate = ref({})

const rate = (serviceDetails) => {
    showRateModal.value = true
    serviceDetailsToRate.value = serviceDetails
}

const onFeedbackSubmitted = (ratingVal, feedbackVal) => {
    reservationDetails.value.hasFeedback = true
    reservationDetails.value.rating = ratingVal
    reservationDetails.value.feedback = feedbackVal
}

const getEmployeeInitials = (fullName) => {
    if (!fullName) return 'U';
    return fullName.split(' ').map(name => name[0]).join('').slice(0, 2);
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