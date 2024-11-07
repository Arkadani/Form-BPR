<template>
  <div class="p-4">
    <h1 class="block text-3xl font-bold text-gray-900 mb-5 mt-5 text-center">Denah Alamat</h1>

    <div id="map" class="h-96"></div>

    <div class="mt-5 p-4 bg-gray-100 rounded-lg shadow-md" v-if="coordinates.lat !== 0 && coordinates.lng !== 0">
      <p class="font-bold">Coordinates:</p>
      <p>Latitude: {{ coordinates.lat.toFixed(5) }}</p>
      <p>Longitude: {{ coordinates.lng.toFixed(5) }}</p>
      <p><strong>City:</strong> {{ locationData.city || '-' }}</p>
      <p><strong>Village/Desa:</strong> {{ locationData.village || '-' }}</p>
    </div>

    <div v-else class="mt-5 p-4 bg-red-100 text-red-700 rounded-lg">
      <p>No location data found for this ID.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'; 
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const map = ref(null);
const coordinates = ref({ lat: 0, lng: 0 });
const locationData = ref({
  city: null,
  village: null
});

const route = useRoute(); 
const id = ref(route.query.id || route.params.id); 

const loadLocationDataById = () => {
  const storedData = localStorage.getItem('dataArray');
  if (storedData) {
    const dataArray = JSON.parse(storedData);
    const entry = dataArray.find((entry) => entry.id === id.value); 

    if (entry && entry.location) {
      const { lat, lng, city, village } = entry.location;
      coordinates.value = { lat, lng };
      locationData.value = { city, village };

      map.value = L.map('map', {
        center: [lat, lng],
        zoom: 16,
        dragging: false,
        touchZoom: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        keyboard: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map.value);

      L.marker([lat, lng]).addTo(map.value).bindPopup(`Coordinates: ${lat.toFixed(5)}, ${lng.toFixed(5)}`).openPopup();
    } else {
      alert("No location data found for this ID.");
    }
  } else {
    alert("No location data found in local storage.");
  }
};

onMounted(() => {
  loadLocationDataById();
});
</script>

<style>
#map {
  height: 400px;
  width: 100%;
}
</style>
