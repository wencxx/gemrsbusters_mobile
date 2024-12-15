<template>
    <div class="h-screen w-screen bg-black/10 fixed top-0 left-0 z-20 flex items-center justify-center">
        <div class="bg-white w-full max-w-72 h-fit rounded-lg border shadow-sm flex flex-col items-center justify-center gap-y-8 py-5">
            <Icon icon="mdi:warning" class="text-orange-500 text-7xl" />
            <div class="w-full flex flex-col items-center gap-y-1">
                <p class="w-3/4 bg-red-500 py-1 text-xs text-white rounded pl-2">If you cancel this reservation, no refunds will be issued.</p>
                <h1 class="w-3/4 text-center font-semibold text-lg text-gray-500">Do you want to proceed?</h1>
            </div>
            <div class="flex items-center justify-center w-full gap-x-2">
                <button class="w-1/4 bg-red-500 text-white py-1 rounded" @click="emit('closeModal')">No</button>
                <button class="w-1/4 bg-green-500 text-white py-1 rounded" @click="emit('confirmCancel')">Yes</button>
            </div>
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits('closeModal', 'confirmCancel')
</script>