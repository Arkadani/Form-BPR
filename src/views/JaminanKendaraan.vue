<template>
  <div class="flex flex-col w-full max-w-screen-lg mx-auto p-4">
    <div class="block text-5xl font-bold text-gray-900 mb-5 mt-5 text-center">
      <h1>Data Jaminan Kendaraan</h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
      <div class="flex items-center">
        <div class="w-36">
          <input
            v-model.number="unitValue"
            placeholder="..."
            type="number"
            min="1"
            max="5"
            class="shadow text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <label for="unit" class="block text-lg font-bold font-sans text-gray-900 mt-3 ml-3">Unit</label>
      </div>
    </div>

    <div v-for="(unit, index) in formData" :key="index" class=" mb-5">

      <div class="p-5 border border-gray-300 rounded-lg shadow-md bg-white">
        <h2 class="text-2xl font-bold mb-3">Kendaraan {{ index + 1 }}</h2>
        <JaminanKendaraan v-model="formData[index]" />
      </div>
    </div>

    <div class="mt-5 flex justify-center">
      <router-link :to="{ path: 'jaminantanah', query: { id: route.query.id } }">
        <ButtonSubmit class="text-lg font-semibold font-sans text-gray-900" />
      </router-link>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router'; 
import JaminanKendaraan from '../components/KendaraanComponents.vue';
import ButtonSubmit from '../components/ButtonSubmit.vue';

const route = useRoute();
const id = ref(route.query.id || route.params.id); 

const unitValue = ref(1); 
const formData = ref([]); 

const initializeFormData = () => {
  formData.value = Array.from({ length: unitValue.value }, () => ({
    Merk: '',
    Tipe: '',
    Tahun: '',
    Warna: '',
    AtasNama: '',
    NoPolisi: '',
    NoRangka: '',
    NoMesin: '',
    NoBKPB: '',
    NilaiJaminan: ''
  }));
};

watch(unitValue, (newValue) => {
  if (newValue < 1) unitValue.value = 1;
  if (newValue > 5) unitValue.value = 5;

  const diff = newValue - formData.value.length;
  
  if (diff > 0) {
    for (let i = 0; i < diff; i++) {
      formData.value.push({
        Merk: '',
        Tipe: '',
        Tahun: '',
        Warna: '',
        AtasNama: '',
        NoPolisi: '',
        NoRangka: '',
        NoMesin: '',
        NoBKPB: '',
        NilaiJaminan: ''
      });
    }
  } else if (diff < 0) {
    formData.value.splice(diff);
  }
});

const saveToLocalStorage = () => {
  try {
    const storedData = localStorage.getItem('dataArray');
    let dataArray = storedData ? JSON.parse(storedData) : [];

    const entryIndex = dataArray.findIndex((entry) => entry.id === id.value);

    if (entryIndex !== -1) {
      dataArray[entryIndex] = {
        ...dataArray[entryIndex],
        formJaminanKendaraan: formData.value,
      };
    } else {
      dataArray.push({
        id: id.value,
        formJaminanKendaraan: formData.value,
      });
    }

    localStorage.setItem('dataArray', JSON.stringify(dataArray));
    console.log("Data saved successfully for ID:", id.value);
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

const loadFromLocalStorage = () => {
  try {
    const storedData = localStorage.getItem('dataArray');
    if (storedData) {
      const dataArray = JSON.parse(storedData);
      const entry = dataArray.find((entry) => entry.id === id.value);

      if (entry && entry.formJaminanKendaraan) {
        formData.value = entry.formJaminanKendaraan;
        unitValue.value = formData.value.length; 
      } else {
        initializeFormData(); 
      }
    } else {
      initializeFormData(); 
    }
  } catch (error) {
    console.error("Error loading from localStorage:", error);
  }
};

watch(formData, saveToLocalStorage, { deep: true });

onMounted(() => {
  loadFromLocalStorage();
});
</script>
