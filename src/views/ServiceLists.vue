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
        <h1 class="font-bold tracking-tight text-2xl text-gray-900">Services</h1>
      </div>

      <!-- search and filter -->
      <div class="space-y-4 shrink-0">
        <!-- Search bar with Icon -->
        <div class="relative w-full">
          <Icon icon="mdi:magnify" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            v-model="searchTerm"
            type="text"
            class="w-full border border-gray-150 rounded-2xl h-12 pl-12 pr-4 text-sm focus:outline-none focus:border-primary bg-white shadow-sm transition-all focus:ring-2 focus:ring-green-500/10"
            placeholder="Search services..."
          />
        </div>

        <!-- Horizontal Scrollable Sort Tags -->
        <div class="flex items-center gap-x-2 overflow-x-auto scrollbar-none pb-1 pt-0.5 -mx-4 px-4">
          <button 
            type="button"
            class="px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border shadow-sm"
            :class="sortOption === '' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-500 border-gray-100 hover:bg-gray-50'"
            @click="sortOption = ''"
          >
            All
          </button>
          <button 
            type="button"
            class="px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border shadow-sm"
            :class="sortOption === 'az' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-500 border-gray-100 hover:bg-gray-50'"
            @click="sortOption = 'az'"
          >
            A-Z
          </button>
          <button 
            type="button"
            class="px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border shadow-sm"
            :class="sortOption === 'za' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-500 border-gray-100 hover:bg-gray-50'"
            @click="sortOption = 'za'"
          >
            Z-A
          </button>
          <button 
            type="button"
            class="px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border shadow-sm"
            :class="sortOption === 'low-price' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-500 border-gray-100 hover:bg-gray-50'"
            @click="sortOption = 'low-price'"
          >
            Price: Low-High
          </button>
          <button 
            type="button"
            class="px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border shadow-sm"
            :class="sortOption === 'high-price' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-500 border-gray-100 hover:bg-gray-50'"
            @click="sortOption = 'high-price'"
          >
            Price: High-Low
          </button>
        </div>

        <!-- Services List -->
        <div v-if="!fetching && filteredServices.length" class="space-y-4 pb-28">
          <router-link
            v-for="service in filteredServices"
            :key="service.id"
            :to="{ name: 'serviceDetails', params: { id: service.id } }"
            class="block bg-white w-full border border-gray-100 rounded-3xl shadow-sm hover:shadow-md active:scale-95 transition-all p-5 relative overflow-hidden group"
          >
            <!-- Highlight Accent line -->
            <div class="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-green-400 to-emerald-500 opacity-80"></div>
            
            <div class="flex justify-between items-center gap-x-4 pl-2">
              <div class="flex items-center gap-x-4">
                <!-- Service Icon -->
                <div class="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-primary shrink-0">
                  <Icon 
                    :icon="service.title.toLowerCase().includes('aircon') ? 'mdi:air-conditioner' : 
                           service.title.toLowerCase().includes('deep') ? 'hugeicons:cleaning-bucket' : 
                           service.title.toLowerCase().includes('wrap') ? 'mdi:gift-outline' : 'mdi:sparkles'" 
                    class="text-2xl" 
                  />
                </div>
                
                <div class="space-y-1">
                  <h3 class="font-bold text-gray-800 text-sm tracking-tight group-hover:text-primary transition-colors">
                    {{ service.title }}
                  </h3>
                  <div class="flex items-center gap-x-2">
                    <span class="text-xs font-extrabold text-primary bg-green-50 px-2 py-0.5 rounded-md">
                      {{ formatTotal(service.rate) }}
                    </span>
                    <span class="text-gray-300 text-xs">•</span>
                    <span class="text-xs text-gray-500 font-medium flex items-center gap-x-1">
                      <Icon icon="mdi:clock-outline" class="text-xs" />
                      {{ service.time }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Right Arrow -->
              <div class="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                <Icon icon="mdi:chevron-right" class="text-xl" />
              </div>
            </div>
          </router-link>
        </div>

        <!-- Skeleton Loader -->
        <div v-if="fetching" class="space-y-4 pb-28">
          <div
            v-for="i in 3"
            :key="i"
            class="bg-white border border-gray-100 rounded-3xl p-5 flex justify-between items-center animate-pulse"
          >
            <div class="flex items-center gap-x-4 w-full">
              <div class="w-12 h-12 bg-gray-100 rounded-2xl shrink-0"></div>
              <div class="space-y-2 w-2/3">
                <div class="h-4 bg-gray-100 rounded w-3/4"></div>
                <div class="flex items-center gap-x-2">
                  <div class="h-4 bg-gray-100 rounded w-1/4"></div>
                  <div class="h-4 bg-gray-100 rounded w-1/4"></div>
                </div>
              </div>
            </div>
            <div class="w-8 h-8 rounded-full bg-gray-100 shrink-0"></div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="!fetching && !filteredServices.length" class="flex flex-col items-center justify-center py-20 space-y-3">
          <Icon icon="hugeicons:cleaning-bucket" class="text-6xl text-gray-300 animate-bounce" />
          <p class="text-sm text-gray-500 font-medium">No services found.</p>
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
import { computed, ref, onMounted, watchEffect } from "vue";
import { useDataStore, useAuthStore } from "../store";
import { db } from "../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();
const currentUser = computed(() => authStore.user);
const services = ref([]);
const fetching = ref(false);

const logout = () => {
  authStore.logout();
  router.push("/login");
};

const searchTerm = ref("");
const sortOption = ref("");

// Fetch services once (optional: clear before pushing)
const getServices = async () => {
  try {
    fetching.value = true;
    services.value = []; // prevent duplication if refetched
    const snapshots = await getDocs(collection(db, "services"));

    snapshots.forEach((doc) => {
      services.value.push({
        id: doc.id,
        ...doc.data(),
      });
    });
  } catch (error) {
    console.log(error);
  } finally {
    fetching.value = false;
  }
};

onMounted(() => {
  watchEffect(() => {
    if (currentUser.value) {
      getServices();
    }
  });
});

// ✅ Computed for filtering + sorting
const filteredServices = computed(() => {
  let result = services.value.filter(s => s.isDeleted !== true);

  // 1. FILTER
  if (searchTerm.value.trim() !== "") {
    const term = searchTerm.value.toLowerCase();
    result = result.filter((s) => s.title.toLowerCase().includes(term));
  }

  // 2. SORT
  switch (sortOption.value) {
    case "az":
      result.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "za":
      result.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case "low-price":
      result.sort((a, b) => Number(a.rate) - Number(b.rate));
      break;
    case "high-price":
      result.sort((a, b) => Number(b.rate) - Number(a.rate));
      break;
  }

  return result;
});

const formatTotal = (total) => {
  return Number(total).toLocaleString("en-US", {
    style: "currency",
    currency: "PHP",
  });
};
</script>

<style scoped>
.router-link-active {
  color: #0cb632;
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
