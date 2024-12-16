<template>
    <div class="fixed top-0 left-0 w-screen h-screen bg-black/10 z-20 flex items-center justify-center">
        <div class="flex flex-col items-center w-full max-w-xs h-fit bg-white rounded-lg shadow-sm p-4 space-y-5">
            <h1 class="text-gray-600 font-semibold text-lg">Tell Us What You Think!</h1>
            <div class="w-full space-y-1">
                <p class="text-gray-600 font-medium text-lg">Rate service</p>
                <div class="flex gap-x-2">
                    <Icon 
                        :icon="star <= rating ? 'mdi:star' : 'mdi:star-outline'" 
                        class="text-3xl text-gray-600 cursor-pointer" 
                        v-for="star in 5" 
                        :key="star"
                        :class="{'text-yellow-500': star <= rating}" 
                        @click="setRating(star)" 
                    />
                </div>
            </div>
            <div class="w-full space-y-1">
                <p class="text-gray-600 font-medium text-lg">Feedback</p>
                <textarea 
                    class="border w-full min-h-16 rounded p-1" 
                    v-model="feedback"
                ></textarea>
            </div>
            <div class="w-full flex justify-end gap-x-3">
                <button class="w-1/3 bg-red-500 rounded text-white" @click="closeModal">Close</button>
                <button v-if="!submitting" class="w-1/3 bg-green-500 rounded text-white" @click="submitFeedback">Submit</button>
                <button v-else class="w-1/3 bg-green-500 rounded text-white animate-pulse" disabled>Submitting</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { db } from '../config/firebaseConfig'
import { doc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore'

const emit = defineEmits(['closeModal'])

const { serviceDetailsToRate } = defineProps({
    serviceDetailsToRate: Object
})

const rating = ref(0)
const feedback = ref('')

const docRef = doc(db, 'services', serviceDetailsToRate.id)

const setRating = (star) => {
    rating.value = star
}

const closeModal = () => {
    emit('closeModal')
}

const submitting = ref(false)

const submitFeedback = async () => {
    if (rating.value === 0 || feedback.value.trim() === '') {
        alert('Please provide a rating and feedback.')
        return
    }

    try {
        submitting.value = true
        await updateDoc(docRef, {
            ratings: arrayUnion({ rating: rating.value, feedback: feedback.value, timestamp: new Date() })
        })

        closeModal()
    } catch (error) {
        console.error("Error submitting feedback: ", error)
    } finally {
        submitting.value = false
    }
}
</script>
