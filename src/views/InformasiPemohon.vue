<template>
  <div class="flex flex-col w-full max-w-screen-lg mx-auto p-4">
    <div class="block text-5xl font-bold text-gray-900 mt-5 mb-4">
      <center><h1>Informasi</h1></center>
    </div>
    <div class="w-full max-w-screen-lg mx-auto p-4">
      
      <div class="mb-6 flex flex-col sm:flex-row gap-3">
        <InputRadio 
          :title="'Status pemohon'" 
          :radioOptions="radioPbb" 
          class="w-full" 
          v-model="selectedValues.statusPemohon" 
        />
      </div>

      <div class="mb-6 flex flex-col sm:flex-row gap-3">
        <InputRadio 
          :title="'Hubungan dengan BPR'" 
          :radioOptions="radioRek" 
          class="w-full" 
          v-model="selectedValues.hubunganBpr" 
        />
      </div>

      <div class="mb-6 flex flex-col sm:flex-row gap-3">
        <InputRadio 
          :title="'Daya Listrik'" 
          :radioOptions="radioDayalistrik" 
          class="w-full" 
          v-model="selectedValues.dayaListrik" 
        />
      </div>

      <div class="mb-6 flex flex-col sm:flex-row gap-3">
        <InputRadio 
          :title="'Rek telepon atas nama'" 
          :radioOptions="radioTelepon" 
          class="w-full" 
          v-model="selectedValues.hubunganTelepon" 
        />
      </div>

      <div class="mt-10 flex justify-center">
        <router-link :to="{ path: 'datareferensi', query: { id: route.query.id } }">
          <ButtonSubmit class="text-lg font-semibold font-sans text-gray-900"/>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router'; // Import the route to access the id
import InputRadio from '../components/InputRadio.vue';
import ButtonSubmit from '../components/ButtonSubmit.vue';

const route = useRoute();
const id = ref(route.query.id || route.params.id); // Get the id from route params or query

// Data structure for form values
const selectedValues = ref({
  statusPemohon: '',
  hubunganBpr: '',
  dayaListrik: '',
  hubunganTelepon: ''
});

const loadFormDataById = () => {
  const storedData = localStorage.getItem('dataArray');
  const dataArray = storedData ? JSON.parse(storedData) : [];

  const entry = dataArray.find((entry) => entry.id === id.value);

  if (entry && entry.informasiForm) {
    selectedValues.value = entry.informasiForm;
  }
};

const saveFormDataById = (newData) => {
  const storedData = localStorage.getItem('dataArray');
  let dataArray = storedData ? JSON.parse(storedData) : [];

  const entryIndex = dataArray.findIndex((entry) => entry.id === id.value);

  if (entryIndex !== -1) {
    dataArray[entryIndex] = {
      ...dataArray[entryIndex],
      informasiForm: newData,
    };
  } else {
    dataArray.push({
      id: id.value,
      informasiForm: newData,
    });
  }

  localStorage.setItem('dataArray', JSON.stringify(dataArray));
};

watch(selectedValues, (newData) => {
  saveFormDataById(newData);
}, { deep: true });

onMounted(() => {
  loadFormDataById();
});

const radioDayalistrik = [
  { label: '450W', value: '450W' },
  { label: '900W', value: '900W' },
  { label: '1300W', value: '1300W' },
  { label: '2200W', value: '2200W' },
  { label: '> 2200W', value: '> 2200W' },
];

const radioPbb = [
  { label: 'Sendiri/pasangan', value: 'Sendiri/pasangan' },
  { label: 'Orangtua/keluarga', value: 'Orangtua/keluarga' },
  { label: 'Orang lain', value: 'Orang lain' },
  { label: 'Tidak ada', value: 'Tidak ada' },
];

const radioRek = [
  { label: 'Sendiri/pasangan', value: 'Sendiri/pasangan' },
  { label: 'Orangtua/keluarga', value: 'Orangtua/keluarga' },
  { label: 'Orang lain', value: 'Orang lain' },
  { label: 'Tidak ada', value: 'Tidak ada' },
];

const radioTelepon = [
  { label: 'Sendiri/pasangan', value: 'Sendiri/pasangan' },
  { label: 'Orangtua/keluarga', value: 'Orangtua/keluarga' },
  { label: 'Orang lain', value: 'Orang lain' },
  { label: 'Tidak ada', value: 'Tidak ada' },
];
</script>
