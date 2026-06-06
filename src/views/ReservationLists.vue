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
        <h1 class="font-bold tracking-tight text-2xl text-gray-900">My Bookings</h1>
      </div>

      <!-- Horizontal Scrollable Filter Chips -->
      <div class="w-full overflow-x-auto flex gap-x-2 pb-2 scrollbar-none shrink-0">
        <button 
          v-for="status in ['all', 'pending', 'accepted', 'completed', 'canceled', 'rejected']"
          :key="status"
          @click="filter(status)"
          class="px-4 py-2 rounded-xl text-xs font-semibold border transition-all shrink-0 capitalize shadow-sm"
          :class="filterQuery === status 
            ? 'bg-primary text-white border-primary' 
            : 'bg-white text-gray-500 border-gray-100 hover:bg-gray-50'"
        >
          {{ status }}
        </button>
      </div>

      <!-- Reservations List -->
      <div class="space-y-4 pb-24">
        <div
          v-if="!fetching && filteredReservations().length"
          class="space-y-3"
        >
          <router-link
            :to="{ name: 'reservationDetails', params: { id: reservation.id } }"
            v-for="reservation in filteredReservations()"
            :key="reservation.id"
            class="bg-white w-full border border-gray-100 rounded-2xl shadow-sm p-5 flex justify-between items-center hover:scale-[1.01] active:scale-95 transition-all block"
          >
            <div class="space-y-2.5">
              <div class="flex items-center gap-x-2">
                <span class="text-[9px] font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded border border-gray-150 uppercase tracking-wide">
                  GB{{ reservation.id.slice(0, 4) }}
                </span>
                <span class="text-xs font-semibold text-gray-400">
                  {{ moment(reservation.date).format('ll') }}
                </span>
              </div>
              
              <h3 class="font-bold text-gray-800 text-sm capitalize leading-tight">
                {{ getService(reservation.serviceID)?.title || 'Loading service...' }}
              </h3>
              
              <span
                class="px-2.5 py-0.5 rounded-full text-[10px] font-semibold border inline-flex items-center gap-x-1 capitalize"
                :class="{
                  'bg-green-50 text-green-700 border-green-200': reservation.status === 'completed',
                  'bg-yellow-50 text-yellow-700 border-yellow-200': reservation.status === 'pending',
                  'bg-blue-50 text-blue-700 border-blue-200': reservation.status === 'accepted',
                  'bg-red-50 text-red-700 border-red-200': reservation.status === 'canceled',
                  'bg-rose-50 text-rose-700 border-rose-200': reservation.status === 'rejected'
                }"
              >
                <Icon 
                  :icon="reservation.status === 'completed' ? 'mdi:check-circle-outline' : 
                         reservation.status === 'pending' ? 'mdi:clock-outline' : 
                         reservation.status === 'canceled' ? 'mdi:close-circle-outline' : 'mdi:alert-circle-outline'"
                  class="text-xs"
                />
                <span>{{ reservation.status }}</span>
              </span>
            </div>
            
            <div class="flex items-center gap-x-3 shrink-0">
              <div class="text-right">
                <p class="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Amount</p>
                <p class="text-sm font-bold text-gray-800">{{ formatTotal(reservation.total) }}</p>
              </div>
              <Icon icon="mdi:chevron-right" class="text-xl text-gray-400" />
            </div>
          </router-link>
        </div>

        <!-- No Bookings -->
        <div v-if="!fetching && !filteredReservations().length" class="flex flex-col items-center justify-center py-16 space-y-3">
          <Icon icon="mdi:calendar-blank-outline" class="text-5xl text-gray-300" />
          <p class="text-sm text-gray-500 font-medium">No bookings found for this status.</p>
        </div>

        <!-- Skeleton Loader -->
        <div v-if="fetching" class="space-y-3">
          <div
            v-for="i in 5"
            :key="i"
            class="bg-white border border-gray-100 rounded-2xl p-5 flex justify-between items-center animate-pulse"
          >
            <div class="space-y-2.5 w-2/3">
              <div class="flex gap-x-2">
                <div class="h-4 bg-gray-100 rounded w-1/4"></div>
                <div class="h-4 bg-gray-100 rounded w-1/3"></div>
              </div>
              <div class="h-5 bg-gray-100 rounded w-5/6"></div>
              <div class="h-5 bg-gray-100 rounded w-1/4 rounded-full"></div>
            </div>
            <div class="h-8 bg-gray-100 rounded w-1/5"></div>
          </div>
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
import { computed, onMounted, ref, watchEffect } from "vue";
import { useDataStore, useAuthStore } from "../store";
import { db } from "../config/firebaseConfig";
import { collection, where, query, getDocs } from "firebase/firestore";
import { useRouter } from "vue-router";
import moment from "moment";

const router = useRouter();
const authStore = useAuthStore();
const dataStore = useDataStore();

const currentUser = computed(() => authStore.user);

onMounted(() => {
  watchEffect(() => {
    if (currentUser.value) {
      getReservations();
    }
  });
});

const logout = () => {
  authStore.logout();
  router.push("/login");
};

// get reservations
const reservations = ref([]);
const fetching = ref([]);

const getReservations = async () => {
  try {
    fetching.value = true;
    const q = query(
      collection(db, "reservations"),
      where("userID", "==", currentUser.value.uid)
    );

    const snapshots = await getDocs(q);

    reservations.value = []; // Reset to avoid duplicates
    snapshots.docs.forEach((doc) => {
      reservations.value.push({
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

// filter reservations
const filterQuery = ref("all");
const filteredReservations = () => {
  if (filterQuery.value === "all") return reservations.value;

  return reservations.value.filter(
    (reservation) => reservation.status === filterQuery.value
  );
};

const filter = (filter) => {
  filterQuery.value = filter;
};

// get service details
const getService = (serviceID) => {
  return dataStore.getSingleService(serviceID);
};

// format currency
const formatTotal = (totalPrice) => {
  return Number(totalPrice).toLocaleString('en-US', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })
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

.scrollbar-none::-webkit-scrollbar {
  display: none;
}

.scrollbar-none {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
