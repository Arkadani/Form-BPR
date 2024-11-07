<template>
  <div class="flex flex-col w-full max-w-screen-lg mx-auto p-4">
      <div class="text-center">
          <h1 class="text-5xl font-bold text-gray-900 mb-5 mt-5">Data Jaminan Bilyet</h1>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <div class="flex items-center">
              <div class="w-36">
                  <input 
                      v-model.number="unitValue" 
                      placeholder="Jumlah Bilyet..." 
                      type="number" 
                      min="1" 
                      max="5" 
                      class="shadow text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
              </div>
              <label for="unit" class="text-lg font-sans text-gray-900 mt-3 ml-3">Lembar</label>
          </div>
      </div>

      <div v-for="(form, index) in formData" :key="index" class="mb-5 p-5 border border-gray-300 rounded-lg shadow-md bg-white">
          <h2 class="text-2xl font-bold mb-3">Bilyet {{ index + 1 }}</h2>
          <div class="p-5">
            <div class="mb-4">
              <label for="nomorBilyet" class="block text-lg font-bold mb-2">Nomor Bilyet</label>
              <input v-model="form.nomorBilyet" type="number" placeholder="..." class="w-full text-lg font-sans text-gray-900 p-2.5 rounded-lg border border-gray-300" />
          </div>

          <div class="mb-4">
              <label for="tanggalValuta" class="block text-lg font-bold mb-2">Tanggal Valuta</label>
              <input v-model="form.tanggalValuta" type="date" placeholder="..." class="w-full text-lg font-sans text-gray-900 p-2.5 rounded-lg border border-gray-300" />
          </div>

          <div class="mb-4">
              <label for="jangkaWaktu" class="block text-lg font-bold mb-2">Jangka Waktu</label>
              <input v-model="form.jangkaWaktu" type="text" placeholder="..." class="w-full text-lg font-sans text-gray-900 p-2.5 rounded-lg border border-gray-300" />
          </div>

          <div class="mb-4">
              <label for="nominal" class="block text-lg font-bold mb-2">Nominal</label>
              <input v-model="form.nominal" type="number" placeholder="..." class="w-full text-lg font-sans text-gray-900 p-2.5 rounded-lg border border-gray-300" />
          </div>

          <div class="mb-4">
              <label for="atasNama" class="block text-lg font-bold mb-2">Atas Nama</label>
              <input v-model="form.atasNama" type="text" placeholder="..." class="w-full text-lg font-sans text-gray-900 p-2.5 rounded-lg border border-gray-300" />
          </div>
          </div>
      </div>

      <div class="mt-10 flex justify-center">
          <router-link :to="{ path: 'informasipemohon', query: { id: route.query.id } }">
              <ButtonSubmit class="text-lg font-semibold font-sans text-gray-900"/>
          </router-link>
      </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router'; 
import ButtonSubmit from '../components/ButtonSubmit.vue';

const route = useRoute();
const id = ref(route.query.id || route.params.id);

const unitValue = ref(1);
const formData = ref([]);

const initializeFormData = () => {
formData.value = Array.from({ length: unitValue.value }, () => ({
  nomorBilyet: '',
  tanggalValuta: '',
  jangkaWaktu: '',
  nominal: '',
  atasNama: ''
}));
};

const loadFormDataById = () => {
const storedData = localStorage.getItem('dataArray');
const dataArray = storedData ? JSON.parse(storedData) : [];

const entry = dataArray.find((entry) => entry.id === id.value);

if (entry && entry.formBilyet) {
  formData.value = entry.formBilyet;
  unitValue.value = formData.value.length; 
} else {
  initializeFormData(); 
}
};

const saveFormDataById = (newData) => {
const storedData = localStorage.getItem('dataArray');
let dataArray = storedData ? JSON.parse(storedData) : [];

const entryIndex = dataArray.findIndex((entry) => entry.id === id.value);

if (entryIndex !== -1) {
  dataArray[entryIndex] = {
    ...dataArray[entryIndex],
    formBilyet: newData,
  };
} else {
  dataArray.push({
    id: id.value,
    formBilyet: newData,
  });
}

localStorage.setItem('dataArray', JSON.stringify(dataArray));
};

watch(unitValue, (newValue) => {
const diff = newValue - formData.value.length;

if (diff > 0) {
  for (let i = 0; i < diff; i++) {
    formData.value.push({
      nomorBilyet: '',
      tanggalValuta: '',
      jangkaWaktu: '',
      nominal: '',
      atasNama: ''
    });
  }
} else if (diff < 0) {
  formData.value.splice(diff);
}
});

watch(formData, (newData) => {
saveFormDataById(newData);
}, { deep: true });

onMounted(() => {
loadFormDataById();
});
</script>
