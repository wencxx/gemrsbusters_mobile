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
          <Icon icon="mdi:logout" class="text-2xl" />
        </div>
      </div>
      <div class="px-4">
        <h1 class="font-bold tracking-wide text-xl w-2/3">Services</h1>
      </div>
      <!-- reservations -->
      <div class="px-4 space-y-3 pb-14">
        <input
          v-model="searchTerm"
          type="text"
          class="w-full border rounded h-10 pl-2"
          placeholder="Search..."
        />

        <select v-model="sortOption" class="w-full border rounded h-10 pl-2">
          <option value="">Sort By</option>
          <option value="az">Title A-Z</option>
          <option value="za">Title Z-A</option>
          <option value="low-price">Price Low to High</option>
          <option value="high-price">Price High to Low</option>
        </select>

        <div v-if="!fetching && filteredServices.length" class="space-y-3">
          <router-link
            v-for="service in filteredServices"
            :key="service.id"
            :to="{ name: 'serviceDetails', params: { id: service.id } }"
            class="block bg-white w-full rounded-xl shadow-md hover:shadow-lg transition-all p-4"
          >
            <div class="flex justify-between items-center">
              <!-- LEFT: Title + Rate + Time -->
              <div class="space-y-1">
                <h1 class="font-semibold text-gray-800 text-base uppercase">
                  {{ service.title }}
                </h1>

                <p class="text-sm text-gray-600">
                  <span class="font-medium text-primary">
                    {{ formatTotal(service.rate) }}
                  </span>
                  &middot;
                  <span>{{ service.time }}</span>
                </p>
              </div>

              <!-- RIGHT: Arrow -->
              <div class="text-gray-400 group-hover:text-primary transition">
                <Icon icon="weui:arrow-filled" class="text-2xl" />
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <!-- bottom navigation -->
    <div
      class="fixed bottom-0 left-0 w-full h-16 border flex items-center justify-center gap-x-12 text-3xl green z-10 bg-gray-100"
    >
      <router-link :to="{ name: 'home' }" class="relative">
        <Icon icon="iconamoon:home" />
        <div
          v-if="$route.name === 'home'"
          class="bg-primary w-1 aspect-square rounded-full absolute -bottom-2 left-1/2 -translate-x-1/2"
        ></div>
      </router-link>
      <router-link :to="{ name: 'reservationLists' }" class="relative">
        <Icon icon="lucide:list" />
        <div
          v-if="$route.name === 'reservationLists'"
          class="bg-primary w-1 aspect-square rounded-full absolute -bottom-2 left-1/2 -translate-x-1/2"
        ></div>
      </router-link>
      <router-link
        :to="{ name: 'serviceLists', params: { id: 1 } }"
        class="relative"
      >
        <Icon icon="hugeicons:cleaning-bucket" />
        <div
          v-if="$route.name === 'serviceLists'"
          class="bg-primary w-1 aspect-square rounded-full absolute -bottom-2 left-1/2 -translate-x-1/2"
        ></div>
      </router-link>
      <router-link
        :to="{ name: 'profile', params: { id: 1 } }"
        class="relative"
      >
        <Icon icon="iconoir:user" />
        <div
          v-if="$route.name === 'profile'"
          class="bg-primary w-1 aspect-square rounded-full absolute -bottom-2 left-1/2 -translate-x-1/2"
        ></div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, watchEffect } from "vue";
import { useDataStore, useAuthStore } from "../store";
import { db } from "../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const authStore = useAuthStore();
const currentUser = computed(() => authStore.user);

const services = ref([]);
const fetching = ref(false);

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
  let result = [...services.value];

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
