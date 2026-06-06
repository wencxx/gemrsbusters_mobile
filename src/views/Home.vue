<template>
  <div class="w-screen h-screen py-4 bg-gray-100">
    <div class="w-full h-full overflow-y-auto space-y-5">
      <div
        class="flex items-center justify-between w-full px-4 sticky top-0 bg-gray-100 pb-2"
      >
        <p class="text-gray-500 text-lg">
          Hi, {{ currentUser?.displayName.split(" ")[0] }}!
        </p>
        <div class="relative">
          <!-- <Icon icon="mdi:bell-outline" class="text-3xl" />
                    <div class="bg-red-500 w-2 aspect-square rounded-full absolute top-0 right-0"></div> -->
          <Icon
            icon="mdi:logout"
            class="text-2xl cursor-pointer"
            @click="logout"
          />
        </div>
      </div>
      <div class="px-4">
        <h1 class="font-bold tracking-wide text-xl w-1/2">
          Which service do you need?
        </h1>
      </div>
      <!-- searchbar -->
      <div class="px-4">
        <div
          class="w-full overflow-hidden rounded-xl h-12 shadow-sm flex items-center bg-white text-gray-500 px-3 gap-x-1"
        >
          <Icon icon="mdi:search" class="text-3xl" />
          <input
            type="text"
            class="h-full w-full bg-transparent focus:outline-none ml-2"
            placeholder="Search for a services..."
          />
          <Icon icon="mingcute:settings-6-line" class="text-3xl" />
        </div>
      </div>
      <!-- image banner -->
      <div class="px-4 w-full overflow-hidden !my-8">
        <img
          src="../assets/rb_9852.png"
          class="object-cover w-full aspect-video"
        />
      </div>
      <!-- services -->
      <div class="space-y-4">
        <div class="flex justify-between items-center px-4">
          <h1 class="font-semibold text-lg">Our services</h1>
          <router-link :to="{ name: 'serviceLists' }" class="text-primary"
            >See All</router-link
          >
        </div>
        <div
          v-if="!fetching && services.length"
          class="flex w-full overflow-x-auto pl-4 gap-x-2"
          id="services"
        >
          <router-link
            v-for="(service, index) in services"
            :key="index"
            :to="{ name: 'serviceDetails', params: { id: service.id } }"
            class="bg-gray-200 text-gray-500 px-4 py-2 rounded-full shrink-0"
          >
            <p>{{ service.title }}</p>
          </router-link>
        </div>
        <div
          v-else-if="!fetching && !services.length"
          class="flex w-full overflow-x-auto pl-4"
          id="services"
        >
          <p>No services to show</p>
        </div>
        <div v-else class="flex w-full overflow-x-auto pl-4" id="services">
          <div class="flex gap-x-4">
            <div
              v-for="i in 5"
              :key="i"
              class="bg-gray-200 text-gray-500 w-32 h-9 py-2 rounded-full animate-pulse shrink-0"
            ></div>
          </div>
        </div>
      </div>
      <!-- popular -->
      <div class="px-4 !mt-8 space-y-4 pb-14">
        <h1 class="font-semibold text-lg">Popular Services</h1>
        <div v-if="!fetching && services.length" class="space-y-3">
          <div
            v-for="(service, index) in services"
            :key="index"
            class="bg-white w-full rounded-xl shadow-sm hover:shadow-md transition-all p-4"
          >
            <router-link
              :to="{ name: 'serviceDetails', params: { id: service.id } }"
              class="flex flex-col space-y-3"
            >
              <!-- Title -->
              <h1 class="font-semibold text-lg text-gray-800 leading-tight">
                {{ service.title }}
              </h1>

              <!-- Description -->
              <p class="line-clamp-2 text-gray-600 text-sm leading-relaxed">
                {{ service.description }}
              </p>

              <!-- Price + Time -->
              <div class="flex items-center gap-x-2 text-gray-700">
                <span class="text-primary text-xl font-bold"
                  >₱{{ service.rate }}</span
                >
                <span class="text-sm text-gray-500">/sqm</span>
                <span class="text-gray-400">•</span>
                <span class="text-sm">{{ service.time }}</span>
              </div>

              <!-- Rating -->
              <div class="flex items-center gap-x-1">
                <Icon icon="mdi:star" class="text-yellow-400 text-xl" />
                <p class="text-sm text-gray-600">{{ ratings(service.id) }}</p>
              </div>
            </router-link>
          </div>
        </div>
        <div
          v-else-if="!fetching && !services.length"
          class="flex w-full overflow-x-auto pl-4"
          id="services"
        >
          <p>No services to show</p>
        </div>
        <div v-else id="services">
          <div class="flex flex-col gap-y-3">
            <div
              v-for="i in 5"
              :key="i"
              class="bg-gray-200 text-gray-500 w-full h-24 py-2 rounded-lg animate-pulse"
            ></div>
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
import { computed, onMounted, ref } from "vue";
import { useDataStore, useAuthStore } from "../store";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const dataStore = useDataStore();

const router = useRouter();

const logout = () => {
  authStore.logout();
  router.push("/login");
};

const currentUser = computed(() => authStore.user);

const fetching = computed(() => dataStore.fetchingServices);
const services = computed(() => dataStore.services.filter(s => s.isDeleted !== true));

const ratings = (serviceID) => {
  const service = services.value.find((service) => service.id === serviceID);

  if (service && service.ratings && service.ratings.length > 0) {
    const totalRating = service.ratings.reduce(
      (acc, rating) => acc + rating.rating,
      0
    );

    // Calculate the average rating
    const averageRating = totalRating / service.ratings.length;

    return averageRating.toFixed(1);
  } else {
    return 0;
  }
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
</style>
