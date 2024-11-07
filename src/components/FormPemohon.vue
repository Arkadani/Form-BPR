<template>
  <div class="mt-10">
    <h2 class="text-3xl font-bold text-gray-900 mb-5 text-center">Data Pemohon</h2>

    <table class="table-auto w-full bg-white shadow-md rounded-lg">
      <tbody class="divide-y divide-gray-200">
        <tr v-for="(value, key) in formPemohon" :key="key">
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

const formPemohon = ref({
  statusPemohon: '',
  hubunganBpr: '',
  namaKtp: '',
  selectedGender: '',
  tempatTanggalLahir: '',
  selectedPendidikan: '',
  noKtp: {},
  selectedPerkawinan: '',
  jumlahTanggungan: '',
  selectedAgama: '',
  otherAgamaText: '',
  alamatTinggal: '',
  statusTempatTinggal: '',
  teleponRumah: '',
  phoneNumber: '',
  namaGadisIbuKandung: '',
  npwpNumber: '',
  selectedNpwp: ''
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

  if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
    return Object.values(value).join(', ');
  }

  return value ? value : '-';
};

const loadFromLocalStorage = () => {
  const storedData = localStorage.getItem('dataArray');
  const dataArray = storedData ? JSON.parse(storedData) : [];

  const entry = dataArray.find((entry) => entry.id === id.value);  
  if (entry && entry.formPemohon) {
    formPemohon.value = entry.formPemohon;
  }
};

const saveToLocalStorage = (newData) => {
  const storedData = localStorage.getItem('dataArray');
  let dataArray = storedData ? JSON.parse(storedData) : [];

  const entryIndex = dataArray.findIndex((entry) => entry.id === id.value);

  if (entryIndex !== -1) {
    dataArray[entryIndex].formPemohon = {
      ...dataArray[entryIndex].formPemohon,
      ...newData
    };
  } else {
    dataArray.push({
      id: id.value,
      formPemohon: newData
    });
  }

  localStorage.setItem('dataArray', JSON.stringify(dataArray));
};

watch(formPemohon, (newData) => {
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
