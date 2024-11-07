<template>
  <div class="flex flex-col w-full max-w-screen-lg mx-auto p-4">
    <h1 class="block text-5xl font-bold text-gray-900 mb-5 mt-5 text-center">Denah Alamat</h1>

    <div id="map" class="h-96"></div>

    <div v-if="clickedCoordinates" class="mt-5 p-4 bg-gray-100 rounded-lg shadow-md">
      <p class="font-bold">Clicked Coordinates:</p>
      <p>Latitude: {{ clickedCoordinates.lat.toFixed(5) }}</p>
      <p>Longitude: {{ clickedCoordinates.lng.toFixed(5) }}</p>

      <p v-if="city" class="mt-2"><strong>City:</strong> {{ city }}</p>
      <p v-if="suburb" class="mt-2"><strong>Kelurahan/Suburb:</strong> {{ suburb }}</p>
      <p v-if="village" class="mt-2"><strong>Village/Desa:</strong> {{ village }}</p>
      <p v-else-if="areaInfo" class="mt-2">Area: {{ areaInfo }}</p>
      <p v-else class="mt-2">Loading area information...</p>
    </div>

    <div v-if="errorMessage" class="mt-5 p-4 bg-red-100 text-red-700 rounded-lg">
      <p>{{ errorMessage }}</p>
    </div>

    <button @click="findCurrentLocation" class="mt-5 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50">
      Find My Current Location
    </button>

    <div class="mt-10 flex justify-center">
      <router-link :to="{ path: 'result', query: { id: route.query.id } }">
        <ButtonSubmit class="text-lg font-semibold font-sans text-gray-900" />
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'; 
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import ButtonSubmit from '../components/ButtonSubmit.vue';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerRetina,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const map = ref(null);
const marker = ref(null);
const clickedCoordinates = ref(null);
const city = ref(null);
const suburb = ref(null);
const village = ref(null);
const areaInfo = ref(null);
const errorMessage = ref(null); 
const route = useRoute();
const id = ref(route.query.id || route.params.id);

const getAreaInfo = async (lat, lng) => {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`);
    if (!response.ok) throw new Error('Failed to fetch area information');
    
    const data = await response.json();
    if (data && data.address) {
      const { city: cityData, town, village: villageData, suburb: suburbData, state, country } = data.address;
      city.value = cityData || town || null;
      suburb.value = suburbData || null;
      village.value = villageData || null;
      areaInfo.value = state || country || 'Unknown area';

      saveLocationToLocalStorage(lat, lng, city.value, village.value);
    } else {
      areaInfo.value = 'Area not found';
    }
  } catch (error) {
    areaInfo.value = 'Error retrieving area information';
    console.error(error);
  }
};

const saveLocationToLocalStorage = (lat, lng, city, village) => {
  const storedData = localStorage.getItem('dataArray');
  let dataArray = storedData ? JSON.parse(storedData) : [];

  const entryIndex = dataArray.findIndex((entry) => entry.id === id.value);

  if (entryIndex !== -1) {
    dataArray[entryIndex].location = { lat, lng, city, village };
  } else {
    dataArray.push({
      id: id.value,
      location: { lat, lng, city, village },
    });
  }

  localStorage.setItem('dataArray', JSON.stringify(dataArray));
};

const onMapClick = async (event) => {
  const { lat, lng } = event.latlng;
  clickedCoordinates.value = { lat, lng };

  city.value = null;
  suburb.value = null;
  village.value = null;
  areaInfo.value = null;

  await getAreaInfo(lat, lng);

  if (marker.value) {
    marker.value.setLatLng([lat, lng]);
  } else {
    marker.value = L.marker([lat, lng]).addTo(map.value);
  }
  marker.value.bindPopup(`Coordinates: ${lat.toFixed(5)}, ${lng.toFixed(5)}`).openPopup();
};

const findCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        map.value.setView([latitude, longitude], 16);
        onMapClick({ latlng: { lat: latitude, lng: longitude } });
        errorMessage.value = null; 
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage.value = "User denied the request for Geolocation.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage.value = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage.value = "The request to get user location timed out.";
            break;
          default:
            errorMessage.value = "An unknown error occurred.";
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  } else {
    errorMessage.value = "Geolocation is not supported by this browser.";
  }
};

onMounted(() => {
  const initialCoordinates = [-6.7320, 108.5523];
  const zoomLevel = 13;

  map.value = L.map('map').setView(initialCoordinates, zoomLevel);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map.value);

  findCurrentLocation();
  map.value.on('click', onMapClick);

  const storedData = localStorage.getItem('dataArray');
  if (storedData) {
    const dataArray = JSON.parse(storedData);
    const entry = dataArray.find((entry) => entry.id === id.value);
    if (entry && entry.location) {
      const { lat, lng, city: savedCity, village: savedVillage } = entry.location;
      map.value.setView([lat, lng], 16);
      clickedCoordinates.value = { lat, lng };
      city.value = savedCity;
      village.value = savedVillage;
      marker.value = L.marker([lat, lng]).addTo(map.value);
      marker.value.bindPopup(`Coordinates: ${lat.toFixed(5)}, ${lng.toFixed(5)}`).openPopup();
    }
  }
});
</script>

<style>
#map {
  height: 400px;
  width: 100%;
}
</style>
