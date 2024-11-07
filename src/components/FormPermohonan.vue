<template>
  <div class="w-full max-w-screen-lg mx-auto">
    <h2 class="text-3xl font-bold text-gray-900 mb-5 text-center">Permohonan Pembiayaan</h2>

    <table class="table-auto w-full bg-white shadow-md rounded-lg">
      <tbody class="divide-y divide-gray-200">
        <tr v-for="(value, key) in formPermohonan" :key="key">
          <td class="px-6 py-4 font-semibold text-gray-900 capitalize">{{ formatLabel(key) }}:</td>
          <td class="px-6 py-4">{{ formatValue(key, value) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';  

const formPermohonan = ref({
  pengajuan: '',
  otherPengajuanText: '',
  rpInput: '',
  jangkaWaktu: '',
  tujuanPenggunaan: '',
  otherTujuanText: '',
  caraPembayaran: '',
  jenisAngsuran: '',
  jenisKredit: ''
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

const formatValue = (key, value) => {
  if (!value) return '-';
  if (key === 'rpInput') {
    return `Rp ${value.replace(/[^\d]/g, '')}`;  
  }
  if (key === 'jangkaWaktu') {
    return `${value.replace(/[^\d]/g, '')} bulan`;  
  }
  return value;
};

const loadFromLocalStorage = () => {
  const storedData = localStorage.getItem('dataArray');
  const dataArray = storedData ? JSON.parse(storedData) : [];

  const entry = dataArray.find((entry) => entry.id === id.value); 
  if (entry && entry.formPermohonan) {
    formPermohonan.value = entry.formPermohonan;
  }
};

const saveToLocalStorage = (newData) => {
  const storedData = localStorage.getItem('dataArray');
  let dataArray = storedData ? JSON.parse(storedData) : [];

  const entryIndex = dataArray.findIndex((entry) => entry.id === id.value);

  if (entryIndex !== -1) {
    dataArray[entryIndex].formPermohonan = {
      ...dataArray[entryIndex].formPermohonan,
      ...newData
    };
  } else {
    dataArray.push({
      id: id.value,
      formPermohonan: newData
    });
  }

  localStorage.setItem('dataArray', JSON.stringify(dataArray));
};

watch(formPermohonan, (newData) => {
  const cleanData = {
    ...newData,
    rpInput: newData.rpInput.replace(/[^\d]/g, ''),  
    jangkaWaktu: newData.jangkaWaktu.replace(/[^\d]/g, '')  
  };
  saveToLocalStorage(cleanData);
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
