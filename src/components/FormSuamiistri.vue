<template>
  <div class="mt-10">
    <div class="text-3xl font-bold text-gray-900 mb-5 text-center">
      <h1>Data Suami / Istri</h1>
    </div>

    <div class="w-full max-w-screen-lg mx-auto">
      <table class="table-auto w-full bg-white shadow-md rounded-lg">
        <tbody class="divide-y divide-gray-200">
          <tr v-for="(value, key) in formSuamiistri" :key="key">
            <td class="px-6 py-4 font-semibold text-gray-900 capitalize">{{ formatLabel(key) }}:</td>
            <td class="px-6 py-4">{{ formatValue(key, value) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';  

const formSuamiistri = ref({
  namaSuamiIstri: '',
  selectedGender: '',
  tempatTanggalLahir: '',
  selectedPendidikan: '',
  selectedPekerjaan: '',
  tanggalTerbit: '',
  berlakuSD: '',
  teleponPerusahaan: '',
  bidangUsaha: '',
  lamaBekerja: '',
  jabatan: '',
  phoneNumber: '',
  penghasilanBersih: '',
});

const route = useRoute();  
const id = ref(route.query.id || route.params.id);  

const formatLabel = (key) => {
  return key
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z])/g, ' $1')
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
};

const formatPhoneNumber = (phoneNumber) => {
  let cleanNumber = phoneNumber.replace(/[^\d]/g, '');  

  if (cleanNumber.startsWith('62')) {
    return `+62 ${cleanNumber.slice(2).replace(/(\d{3})(\d{4})(\d+)/, '$1-$2-$3')}`;
  } else if (cleanNumber.startsWith('0')) {
    return cleanNumber.replace(/(\d{4})(\d{4})(\d+)/, '$1-$2-$3');
  } else {
    return phoneNumber;  
  }
};

const formatValue = (key, value) => {
  if (key === 'phoneNumber') {
    return formatPhoneNumber(value);  
  }

  return value ? value : '-';
};

const loadFromLocalStorage = () => {
  const storedData = localStorage.getItem('dataArray');
  const dataArray = storedData ? JSON.parse(storedData) : [];

  const entry = dataArray.find((entry) => entry.id === id.value);  

  if (entry && entry.formSuamiistri) {
    formSuamiistri.value = entry.formSuamiistri;
  }
};

const saveToLocalStorage = (newData) => {
  const storedData = localStorage.getItem('dataArray');
  let dataArray = storedData ? JSON.parse(storedData) : [];

  const entryIndex = dataArray.findIndex((entry) => entry.id === id.value);

  if (entryIndex !== -1) {
    dataArray[entryIndex].formSuamiistri = {
      ...dataArray[entryIndex].formSuamiistri,
      ...newData
    };
  } else {
    dataArray.push({
      id: id.value,
      formSuamiistri: newData
    });
  }

  localStorage.setItem('dataArray', JSON.stringify(dataArray));
};

watch(formSuamiistri, (newData) => {
  saveToLocalStorage(newData);
}, { deep: true });

onMounted(() => {
  loadFromLocalStorage();
});
</script>

<style scoped>
.table-auto {
  border-collapse: collapse;
}
td {
  border-bottom: 1px solid #e5e7eb;
}
</style>
