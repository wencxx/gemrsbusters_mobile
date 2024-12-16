<template>
    <div class="h-screen w-screen flex flex-col overflow-y-auto">
        <!-- header -->
        <div class="space-y-8 p-4 h-1/5">
            <div class="flex items-center justify-between">
                <div @click="back" class="pr-3 py-1 rounded-lg">
                        <Icon icon="weui:arrow-filled" class="text-3xl rotate-180" />
                </div>
                <h1 class="text-lg text-gray-500">Check out</h1>
                <div class="pl-3">
    
                </div>
            </div>
            <div class="w-full flex justify-between relative">
                <div class="flex flex-col items-center justify-center gap-y-2">
                    <div class="z-10 bg-white w-4 border border-primary aspect-square rounded-full" :class="{ '!bg-primary': currentPage >= 1 }"></div>
                    <h1 class="text-gray-500 text-sm font-medium" :class="{ '!text-gray-300': currentPage > 1 }">Personal Info</h1>
                </div>
                <div class="flex flex-col items-center justify-center gap-y-2">
                    <div class="z-10 bg-white w-4 border border-primary aspect-square rounded-full" :class="{ '!bg-primary': currentPage >= 2 }"></div>
                    <h1 class="text-gray-500 text-sm font-medium" :class="{ '!text-gray-300': currentPage > 2 }">Reservation Info</h1>
                </div>
                <div class="flex flex-col items-center justify-center gap-y-2">
                    <div class="z-10 bg-white w-4 border border-primary aspect-square rounded-full" :class="{ '!bg-primary': currentPage >= 3 }"></div>
                    <h1 class="text-gray-500 text-sm font-medium" :class="{ '!text-gray-300': currentPage > 3 }">Payment</h1>
                </div>
                <hr class="absolute border border-primary w-4/5 top-2 left-10">
            </div>
        </div>
        <div class="px-4 h-full min-h-4/5 pt-6 pb-5">
            <form @submit.prevent="reserve" class="w-full space-y-5">
                <p v-if="hasEmptyFields" class="bg-red-500 pl-2 py-1 rounded text-white">Please fill out all fields.</p>
                <p v-if="err" class="bg-red-500 pl-2 py-1 rounded text-white">{{ err }}</p>
                <div v-if="currentPage === 1" class="space-y-5">
                    <h1 class="uppercase text-gray-500">Personal Information</h1>
                    <div class="space-y-5">
                        <div class="flex flex-col gap-y-2">
                            <label class="font-semibold text-gray-500 uppercase text-sm">Name</label>
                            <input type="text" class="border-b py-1 focus:outline-none" placeholder="Enter full name" v-model="firstPageData.name">
                        </div>
                        <div class="flex flex-col gap-y-2">
                            <label class="font-semibold text-gray-500 uppercase text-sm">Contact Number</label>
                            <input type="number" class="border-b py-1 focus:outline-none" placeholder="Enter contact number" v-model="firstPageData.contactNumber">
                        </div>
                    </div>
                    <h1 class="uppercase text-gray-500">Address</h1>
                    <div class="!my-0 flex items-center gap-x-2">
                        <input type="checkbox" id="currentAddress" @change="useCurrentAddress()">
                        <label for="currentAddress" class="text-gray-500">Use current address</label>
                    </div>
                    <div class="space-y-5">
                        <div class="flex flex-col gap-y-2">
                            <label class="font-semibold text-gray-500 uppercase text-sm">City</label>
                            <input type="text" class="border-b py-1 focus:outline-none" placeholder="Enter full name" readonly v-model="firstPageData.city">
                        </div>
                        <div class="flex flex-col gap-y-2">
                            <label class="font-semibold text-gray-500 uppercase text-sm">Barangay</label>
                            <select class="border-b bg-transparent py-1 focus:outline-none" v-model="firstPageData.barangay">
                                <option value="">Select Barangay</option>
                                <option>Alangilan</option>
                                <option>Alijis</option>
                                <option>Banago</option>
                                <option>Bata</option>
                                <option>Burgos</option>
                                <option>Cabug</option>
                                <option>Estefania</option>
                                <option>Felisa</option>
                                <option>Granada</option>
                                <option>Handumanan</option>
                                <option>Mandalagan</option>
                                <option>Mansilingan</option>
                                <option>Montevista</option>
                                <option>Pahanocoy</option>
                                <option>Punta Taytay</option>
                                <option>Sibucao</option>
                                <option>Singcang-Airport</option>
                                <option>Sum-ag</option>
                                <option>Taculing</option>
                                <option>Tangub</option>
                                <option>Villamonte</option>
                                <option>Vista Alegre</option>
                                <option>Barangay 1</option>
                                <option>Barangay 2</option>
                                <option>Barangay 3</option>
                                <option>Barangay 4</option>
                                <option>Barangay 5</option>
                                <option>Barangay 6</option>
                                <option>Barangay 7</option>
                                <option>Barangay 8</option>
                                <option>Barangay 9</option>
                                <option>Barangay 10</option>
                                <option>Barangay 11</option>
                                <option>Barangay 12</option>
                                <option>Barangay 13</option>
                                <option>Barangay 14</option>
                                <option>Barangay 15</option>
                                <option>Barangay 16</option>
                                <option>Barangay 17</option>
                                <option>Barangay 18</option>
                                <option>Barangay 19</option>
                                <option>Barangay 20</option>
                                <option>Barangay 21</option>
                                <option>Barangay 22</option>
                                <option>Barangay 23</option>
                                <option>Barangay 24</option>
                                <option>Barangay 25</option>
                                <option>Barangay 26</option>
                                <option>Barangay 27</option>
                                <option>Barangay 28</option>
                                <option>Barangay 29</option>
                                <option>Barangay 30</option>
                                <option>Barangay 31</option>
                                <option>Barangay 32</option>
                                <option>Barangay 33</option>
                                <option>Barangay 34</option>
                                <option>Barangay 35</option>
                                <option>Barangay 36</option>
                                <option>Barangay 37</option>
                                <option>Barangay 38</option>
                                <option>Barangay 39</option>
                            </select>
                        </div>
                        <div class="flex flex-col gap-y-2">
                            <label class="font-semibold text-gray-500 uppercase text-sm">Street</label>
                            <input type="text" class="border-b py-1 focus:outline-none" placeholder="Enter street" v-model="firstPageData.street">
                        </div>
                        <div class="flex flex-col gap-y-2">
                            <label class="font-semibold text-gray-500 uppercase text-sm">Block/Lot</label>
                            <input type="text" class="border-b py-1 focus:outline-none" placeholder="Enter block" v-model="firstPageData.block">
                        </div>
                        <div class="flex flex-col gap-y-2">
                            <label class="font-semibold text-gray-500 uppercase text-sm">Landmark</label>
                            <input type="text" class="border-b py-1 focus:outline-none" placeholder="Enter landmark" v-model="firstPageData.landmark">
                        </div>
                    </div>
                </div>
                <div v-if="currentPage === 2" class="space-y-5">
                    <h1 class="uppercase text-gray-500">Reservation Information</h1>
                    <div class="space-y-5">
                        <div class="flex flex-col gap-y-2">
                            <label class="font-semibold text-gray-500 uppercase text-sm">Floor area(sqm)</label>
                            <input type="number" class="border-b py-1 focus:outline-none" placeholder="Enter floor area" v-model="secondPageData.floorArea">
                        </div>
                        <div class="flex flex-col gap-y-2">
                            <label class="font-semibold text-gray-500 uppercase text-sm">Type</label>
                            <select class="border-b py-1 focus:outline-none bg-transparent" v-model="secondPageData.type">
                                <option value="">Select type</option>
                                <option>Rush</option>
                                <option>Non-Rush</option>
                            </select>
                        </div>
                        <div v-if="secondPageData.type === 'Rush'" class="flex flex-col gap-y-2">
                            <label class="font-semibold text-gray-500 uppercase text-sm">No. of workers</label>
                            <select class="border-b py-1 focus:outline-none bg-transparent" v-model="secondPageData.noOfWorkers">
                                <option value="1" disabled>Select number of workers</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <div class="flex flex-col gap-y-2">
                            <label class="font-semibold text-gray-500 uppercase text-sm">Date</label>
                            <input type="datetime-local" class="border-b py-1 w-full bg-transparent text-black" v-model="secondPageData.date">
                        </div>
                    </div>
                </div>
                <div v-if="currentPage === 3" class="space-y-5">
                    <h1 class="uppercase text-gray-500">Payment</h1>
                    <div class="space-y-5">
                        <div class="flex justify-between gap-y-2">
                            <label class="font-semibold text-gray-500 uppercase text-sm">Rate per sqm:</label>
                            <p class="text-gray-500">₱{{ serviceDetails.rate }}</p>
                        </div>
                        <div class="flex justify-between gap-y-2">
                            <label class="font-semibold text-gray-500 uppercase text-sm">Floor area(sqm):</label>
                            <p class="text-gray-500">{{ secondPageData.floorArea }}</p>
                        </div>
                        <hr>
                        <div class="flex justify-between gap-y-2">
                            <label class="font-semibold text-gray-500 uppercase text-sm">Total(rate * floor area):</label>
                            <p class="text-gray-500">{{ formatTotal((serviceDetails.rate * secondPageData.floorArea) * secondPageData.noOfWorkers) }}</p>
                        </div>
                    </div>
                    <h1 class="uppercase text-gray-500">Paymen method</h1>
                    <div class="flex justify-evenly">
                        <label for="gcash" class="border rounded h-20 aspect-square flex flex-col justify-center items-center text-blue-500" :class="{ '!bg-primary !text-white': thirdPageData.paymentMethod === 'gcash' }">
                            <Icon icon="arcticons:gcash" class="text-3xl" />
                            <p class="text-sm">GCASH</p>
                        </label>
                        <input id="gcash" type="checkbox" v-model="thirdPageData.paymentMethod" true-value="gcash" false-value="" class="hidden">
                        <label for="cod" class="border rounded h-20 aspect-square flex flex-col justify-center items-center text-gray-500" :class="{ '!bg-primary !text-white': thirdPageData.paymentMethod === 'cod' }">
                            <Icon icon="solar:hand-money-linear" class="text-3xl" />
                            <p class="text-sm">COD</p>
                        </label>
                        <input id="cod" type="checkbox" v-model="thirdPageData.paymentMethod" true-value="cod" false-value="" class="hidden">
                    </div>
                    <div v-if="thirdPageData.paymentMethod === 'gcash'">
                        <h1 class="uppercase text-gray-500">Scan QR to pay</h1>
                        <img src="../assets/Gcash QR.jpg" alt="qr code" class="w-full aspect-square">
                        <div class="flex flex-col gap-y-2">
                            <label class="font-semibold text-gray-500 uppercase text-sm">Reference Number</label>
                            <input type="text" class="border-b py-1 focus:outline-none" placeholder="Enter reference number" v-model="thirdPageData.referenceNumber">
                        </div>
                    </div>
                </div>
                <div>
                    <button v-if="currentPage < 3" type="button" class="w-full bg-primary py-2 rounded text-white" @click="next">Continue</button>
                    <button v-if="currentPage === 3 && !loading" class="w-full bg-primary py-2 rounded text-white">Reserve</button>
                    <button v-if="currentPage === 3 && loading" class="w-full bg-primary py-2 rounded text-white animate-pulse" disabled>Reserving</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore, useDataStore } from '../store'
import { db } from '../config/firebaseConfig'
import { collection, addDoc } from 'firebase/firestore'

const authStore = useAuthStore()
const dataStore = useDataStore()

const currentUser = computed(() => authStore.user)

const route = useRoute()
const router = useRouter()

const serviceDetails = ref({})

const firstPageData = ref({
    name: '',
    contactNumber: '',
    city: 'Bacolod City',
    barangay: '',
    street: '',
    block: '',
    landmark: '',
})

const secondPageData = ref({
    floorArea: '',
    type: '',
    noOfWorkers: '1',
    date: '',
})

const thirdPageData = ref({
    paymentMethod: '',
    referenceNumber: '',
})

const useCurrentAddress = () => {
    const isChecked = event.target.checked

    if(isChecked){
        firstPageData.value.barangay = currentUser.value.barangay
        firstPageData.value.street = currentUser.value.street
        firstPageData.value.block = currentUser.value.block
    }else{
        firstPageData.value.barangay = ''
        firstPageData.value.street = ''
        firstPageData.value.block = ''
    }
}

const currentPage = ref(Number(route.query.page) || 1) 

const hasEmptyFields = ref(false)

const next = () => {
    if(currentPage.value === 1 && Object.values(firstPageData.value).some(value => !value)) return hasEmptyFields.value = true
    if(currentPage.value === 2 && Object.values(secondPageData.value).some(value => !value)) return hasEmptyFields.value = true
    if(currentPage.value === 3 && Object.values(thirdPageData.value).some(value => !value)) return hasEmptyFields.value = true

    hasEmptyFields.value = false
    currentPage.value++ 
    router.push({
        query: { 
            page: currentPage.value
        }
    })
}

const back = () => {
    if (window.history.length > 1) {
        history.back()
        if(currentPage.value > 1){
            currentPage.value--
            router.push({
                query: { 
                    page: currentPage.value
                }
            })
        }
    } else {
        router.push({ query: { page: currentPage.value - 1 } }) 
    }
}

const formatTotal = (totalPrice) => {
    return Number(totalPrice).toLocaleString('en-US', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    })
}

onMounted(() => {
    watchEffect(() => {
        if(currentUser.value){
            firstPageData.value.name = currentUser.value?.displayName
        }
        serviceDetails.value = dataStore.getSingleService(route.params.id)
    })
    router.push({
        query: {}
    })
})


// reserve cleaning
const reservationReferene = collection(db, 'reservations')
const err = ref('')
const loading = ref(false)

const reserve = async () => {
    err.value = ''
    const checkoutData = {
        ...firstPageData.value,
        ...secondPageData.value,
        ...thirdPageData.value,
        total: (serviceDetails.value.rate * secondPageData.value.floorArea) * secondPageData.value.noOfWorkers,
        status: 'pending',
        serviceID: serviceDetails.value.id,
        userID: currentUser.value.uid
    }

    try {
        loading.value = true
        const res = await addDoc(reservationReferene, checkoutData)

        if(res.empty) return err.value = 'Reservation failed. Try again later'

        router.push('/reservation-complete')
    } catch (error) {
        console.log(error)
        err.value = error.message
    } finally {
        loading.value = false
    }
}
</script>
