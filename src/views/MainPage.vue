<template>
  <div class="flex justify-center">
    <div class="container mx-5 sm:mx-10 my-5 p-5 bg-gray-50 border border-gray-400 rounded-2xl w-full max-w-screen-xl h-screen">
      <div class="flex flex-col md:flex-row h-full justify-between">

        <div class="md:hidden p-5 flex justify-between items-center">
          <h1 class="text-xl sm:text-2xl font-bold text-gray-900">Navigasi</h1>
          <button @click="toggleSidebar" class="p-2 bg-gray-800 text-white rounded-md focus:outline-none hover:bg-gray-700">
            <i class="fas fa-bars w-6 h-6"></i>
          </button>
        </div>

        <div
          :class="[
            'fixed md:static inset-y-0 left-0 bg-gray-100 w-64 p-5 z-50 transform transition-transform duration-300',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full',
            'md:translate-x-0 md:relative md:w-1/4'
          ]"
          class="h-full md:h-auto md:overflow-y-auto overflow-y-auto">
          <div class="nav-column bg-gray-100 pr-7 w-full">
            <label class="block text-2xl sm:text-3xl font-bold text-gray-800 mb-5 mt-5" for="navigation">Navigasi</label>

            <router-link :to="{ path: 'permohonan', query: { id: route.query.id } }" custom v-slot="{ navigate, isActive }">
              <button
                :class="[
                  isActive ? 'bg-gray-300 text-gray-900' : 'bg-gray-200 text-gray-800',
                  'p-3 sm:p-4 mb-2 flex items-center space-x-3 rounded-2xl w-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200'
                ]"
                @click="navigateAndCloseSidebar(navigate)">
                <i class="fas fa-file-alt h-6 w-6"></i>
                <span>PERMOHONAN</span>
              </button>
            </router-link>

            <router-link :to="{ path: 'datapemohon', query: { id: route.query.id } }" custom v-slot="{ navigate, isActive }">
              <button
                :class="[
                  isActive ? 'bg-gray-300 text-gray-900' : 'bg-gray-200 text-gray-800',
                  'p-3 sm:p-4 mb-2 flex items-center space-x-3 rounded-2xl w-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200'
                ]"
                @click="navigateAndCloseSidebar(navigate)">
                <i class="fas fa-user h-6 w-6"></i>
                <span>DATA PRIBADI PEMOHON</span>
              </button>
            </router-link>

            <router-link :to="{ path: 'datapekerjaan', query: { id: route.query.id } }" custom v-slot="{ navigate, isActive }">
              <button
                :class="[
                  isActive ? 'bg-gray-300 text-gray-900' : 'bg-gray-200 text-gray-800',
                  'p-3 sm:p-4 mb-2 flex items-center space-x-3 rounded-2xl w-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200'
                ]"
                @click="navigateAndCloseSidebar(navigate)">
                <i class="fas fa-briefcase h-6 w-6"></i>
                <span>DATA PEKERJAAN / USAHA</span>
              </button>
            </router-link>

            <router-link :to="{ path: 'datasuamiistri', query: { id: route.query.id } }" custom v-slot="{ navigate, isActive }">
              <button
                :class="[
                  isActive ? 'bg-gray-300 text-gray-900' : 'bg-gray-200 text-gray-800',
                  'p-3 sm:p-4 mb-2 flex items-center space-x-3 rounded-2xl w-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200'
                ]"
                @click="navigateAndCloseSidebar(navigate)">
                <i class="fas fa-users h-6 w-6"></i>
                <span>DATA SUAMI / ISTRI</span>
              </button>
            </router-link>

            <router-link :to="{ path: 'datapenjaminan', query: { id: route.query.id } }" custom v-slot="{ navigate, isActive }">
              <button
                :class="[
                  isActive || isJaminanActive ? 'bg-gray-300 text-gray-900' : 'bg-gray-200 text-gray-800',
                  'p-3 sm:p-4 mb-2 flex items-center space-x-3 rounded-2xl w-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200'
                ]"
                @click="navigateAndCloseSidebar(navigate)">
                <i class="fas fa-shield-alt h-6 w-6"></i>
                <span>DATA PENJAMINAN</span>
              </button>
            </router-link>

            <div>
              <button @click="toggleDropdown" :class="['p-3 sm:p-4 mb-2 flex items-center space-x-3 rounded-2xl w-full', isJaminanActive ? 'bg-gray-300' : 'bg-gray-200 text-gray-800', 'hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200']">
                <i class="fas fa-lock h-6 w-6"></i>
                <span>DATA JAMINAN</span>
              </button>

              <div v-if="isDropdownOpen" class="pl-5">
                <router-link :to="{ path: 'jaminankendaraan', query: { id: route.query.id } }" custom v-slot="{ navigate, isActive }">
                  <button
                    :class="[
                      isActive ? 'bg-gray-300 text-gray-900' : 'bg-gray-200 text-gray-800',
                      'p-3 sm:p-4 mb-2 flex items-center space-x-3 rounded-2xl w-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200'
                    ]"
                    @click="navigateAndCloseSidebar(navigate)">
                    <i class="fas fa-car h-6 w-6"></i>
                    <span>JAMINAN KENDARAAN</span>
                  </button>
                </router-link>

                <router-link :to="{ path: 'jaminantanah', query: { id: route.query.id } }" custom v-slot="{ navigate, isActive }">
                  <button
                    :class="[
                      isActive ? 'bg-gray-300 text-gray-900' : 'bg-gray-200 text-gray-800',
                      'p-3 sm:p-4 mb-2 flex items-center space-x-3 rounded-2xl w-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200'
                    ]"
                    @click="navigateAndCloseSidebar(navigate)">
                    <i class="fas fa-landmark h-6 w-6"></i>
                    <span>JAMINAN TANAH</span>
                  </button>
                </router-link>

                <router-link :to="{ path: 'jaminanbilyet', query: { id: route.query.id } }" custom v-slot="{ navigate, isActive }">
                  <button
                    :class="[
                      isActive ? 'bg-gray-300 text-gray-900' : 'bg-gray-200 text-gray-800',
                      'p-3 sm:p-4 mb-2 flex items-center space-x-3 rounded-2xl w-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200'
                    ]"
                    @click="navigateAndCloseSidebar(navigate)">
                    <i class="fas fa-file-invoice h-6 w-6"></i>
                    <span>JAMINAN BILYET</span>
                  </button>
                </router-link>
              </div>
            </div>

            <router-link :to="{ path: 'informasipemohon', query: { id: route.query.id } }" custom v-slot="{ navigate, isActive }">
              <button
                :class="[
                  isActive ? 'bg-gray-300 text-gray-900' : 'bg-gray-200 text-gray-800',
                  'p-3 sm:p-4 mb-2 flex items-center space-x-3 rounded-2xl w-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200'
                ]"
                @click="navigateAndCloseSidebar(navigate)">
                <i class="fas fa-info-circle h-6 w-6"></i>
                <span>INFORMASI</span>
              </button>
            </router-link>

            <router-link :to="{ path: 'datareferensi', query: { id: route.query.id } }" custom v-slot="{ navigate, isActive }">
              <button
                :class="[
                  isActive ? 'bg-gray-300 text-gray-900' : 'bg-gray-200 text-gray-800',
                  'p-3 sm:p-4 mb-2 flex items-center space-x-3 rounded-2xl w-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200'
                ]"
                @click="navigateAndCloseSidebar(navigate)">
                <i class="fas fa-address-book h-6 w-6"></i>
                <span>DATA REFERENSI</span>
              </button>
            </router-link>

            <router-link :to="{ path: 'denahalamat', query: { id: route.query.id } }" custom v-slot="{ navigate, isActive }">
              <button
                :class="[
                  isActive ? 'bg-gray-300 text-gray-900' : 'bg-gray-200 text-gray-800',
                  'p-3 sm:p-4 mb-2 flex items-center space-x-3 rounded-2xl w-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200'
                ]"
                @click="navigateAndCloseSidebar(navigate)">
                <i class="fas fa-map-marker-alt h-6 w-6"></i>
                <span>DENAH ALAMAT RUMAH</span>
              </button>
            </router-link>
          </div>
        </div>

        <div class="activities-column bg-gray-50 p-7 flex-grow rounded-2xl shadow-lg overflow-y-auto h-full">
          <RouterView/>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, watch, onMounted } from 'vue'; 
import { useRoute } from 'vue-router'; 

const sidebarOpen = ref(false);
const isDropdownOpen = ref(false);

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const route = useRoute(); 

const navigateAndCloseSidebar = (navigate) => {
  navigate();
  if (window.innerWidth < 768) {
    sidebarOpen.value = false;
  }
};

const isJaminanActive = computed(() => {
  return route.path.startsWith('/datapenjaminan/jaminan');
});

watch(route, () => {
  if (window.innerWidth < 768) {
    sidebarOpen.value = false;
  }
});
</script>

<style>
#map {
  z-index: 0; 
  height: 100%; 
  width: 100%; 
}
</style>
