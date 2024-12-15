<template>
    <div class="w-screen h-screen py-4 bg-gray-100">
        <div class="w-full h-full overflow-y-auto space-y-5">
            <div class="flex items-center justify-between w-full px-4 sticky top-0 bg-gray-100 pb-2">
                <p class="text-gray-500 text-lg">Hi, {{ currentUser?.displayName.split(' ')[0] }}!</p>
                <div class="relative">
                    <!-- <Icon icon="mdi:bell-outline" class="text-3xl" /><:
                    <div class="bg-red-500 w-2 aspect-square rounded-full absolute top-0 right-0"></div> -->
                    <Icon icon="mdi:logout" class="text-2xl cursor-pointer" @click="logout" />
                </div>
            </div>
            <div class="px-4">
                <h1 class="font-bold tracking-wide text-xl w-2/3">Reservations Details</h1>
            </div>
            <!-- reservations -->
            <div class="px-4 flex flex-col gap-y-4 pb-14">
                <div class="flex gap-x-2">
                    <Icon v-if="reservationDetails.status === 'pending'" icon="pepicons-pencil:dots-x-circle" class="text-3xl"/>
                    <Icon v-else-if="reservationDetails.status === 'canceled'" icon="pepicons-pencil:times-circle" class="text-3xl"/>
                    <Icon v-else  icon="pepicons-pencil:checkmark-circle" class="text-3xl"/>
                    <div>
                        <h1 class="text-lg text-gray-500 font-medium">Status</h1>
                        <h1 class="text-lg -mt-2 text-gray-700 font-bold capitalize">{{ reservationDetails.status }}</h1>
                    </div>
                </div>
                <div v-if="reservationDetails.status === 'rejected'" class="flex gap-x-2">
                    <Icon icon="ph:question-light" class="text-3xl"/>
                    <div>
                        <h1 class="text-lg text-gray-500 font-medium">Reason for rejection</h1>
                        <h1 class="text-lg -mt-2 text-gray-700 font-bold">{{ reservationDetails.reason }}</h1>
                    </div>
                </div>
                <div v-if="reservationDetails.assignedEmployees?.length" class="flex gap-x-2">
                    <Icon icon="healthicons:domestic-worker-alt-outline" class="text-3xl"/>
                    <div>
                        <h1 class="text-lg text-gray-500 font-medium">Assigned Employee</h1>
                        <h1 class="text-lg -mt-2 text-gray-700 font-bold flex flex-wrap gap-x-1">
                            <span v-for="employeeID in reservationDetails.assignedEmployees" :key="employeeID">{{ getEmployeeDetails(employeeID).fullName + ' -' }}</span>
                        </h1>
                    </div>
                </div>
                <div class="flex gap-x-2">
                    <Icon icon="hugeicons:cleaning-bucket" class="text-3xl"/>
                    <div>
                        <h1 class="text-lg text-gray-500 font-medium">Service</h1>
                        <h1 class="text-lg -mt-2 text-gray-700 font-bold">{{ getService(reservationDetails.serviceID)?.title }}</h1>
                    </div>
                </div>
                <div class="flex gap-x-2">
                    <Icon icon="lsicon:location-outline" class="text-3xl"/>
                    <div>
                        <h1 class="text-lg text-gray-500 font-medium">Location</h1>
                        <h1 class="text-lg -mt-2 text-gray-700 font-bold">{{ reservationDetails.block + ', ' + reservationDetails.street + ', ' + reservationDetails.barangay + ', ' + reservationDetails.city }}</h1>
                    </div>
                </div>
                <div class="flex gap-x-2">
                    <Icon icon="stash:data-date-light" class="text-3xl"/>
                    <div>
                        <h1 class="text-lg text-gray-500 font-medium">Date</h1>
                        <h1 class="text-lg -mt-2 text-gray-700 font-bold">{{ moment(reservationDetails.date).format('lll') }}</h1>
                    </div>
                </div>
                <div class="flex gap-x-2">
                    <Icon icon="tdesign:user-time" class="text-3xl"/>
                    <div>
                        <h1 class="text-lg text-gray-500 font-medium">Type</h1>
                        <h1 class="text-lg -mt-2 text-gray-700 font-bold">{{ reservationDetails.type }}</h1>
                    </div>
                </div>
                <div class="flex gap-x-2">
                    <Icon icon="formkit:people" class="text-3xl"/>
                    <div>
                        <h1 class="text-lg text-gray-500 font-medium">No. of workers</h1>
                        <h1 class="text-lg -mt-2 text-gray-700 font-bold">{{ reservationDetails.noOfWorkers }}</h1>
                    </div>
                </div>
                <div class="flex gap-x-2">
                    <Icon icon="lsicon:house-outline" class="text-3xl"/>
                    <div>
                        <h1 class="text-lg text-gray-500 font-medium">Floor area</h1>
                        <h1 class="text-lg -mt-2 text-gray-700 font-bold">{{ reservationDetails.floorArea }}sqm</h1>
                    </div>
                </div>
                <div class="flex gap-x-2">
                    <Icon icon="ph:money-thin" class="text-3xl"/>
                    <div>
                        <h1 class="text-lg text-gray-500 font-medium">Rate</h1>
                        <h1 class="text-lg -mt-2 text-gray-700 font-bold">₱{{ getService(reservationDetails.serviceID)?.rate }}(per sqm)</h1>
                    </div>
                </div>
                <hr class="border-gray-4 00">
                <div class="flex justify-between items-center">
                    <h1 class="text-lg text-gray-500 font-medium">Total</h1>
                    <h1 class="text-lg -mt-2 text-gray-700 font-bold">{{ formatTotal(reservationDetails.total) }}</h1>
                </div>
                <p v-if="err" class="bg-red-500 pl-2 text-white rounded py-1">{{ err }}</p>
                <button v-if="!canceling && reservationDetails.status === 'pending'" class="w-full !mt-auto bg-red-500 py-2 text-white rounded-lg" @click="showCancelWarning = true">Cancel</button>
                <button v-else-if="canceling && reservationDetails.status === 'pending'" class="w-full !mt-auto bg-red-500 py-2 text-white rounded-lg animate-pulse" disabled>Canceling</button>
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

        <cancelWarning v-if="showCancelWarning" @closeModal="showCancelWarning = false" @confirmCancel="cancel" />
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