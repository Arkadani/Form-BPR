<template>
  <div class="mt-10">
    <h2 class="text-3xl font-bold text-gray-900 mb-5 text-center">Tabel Data Penjaminan</h2>
    <table class="table-auto w-full bg-white shadow-md rounded-lg">
      <tbody class="divide-y divide-gray-200">
        <tr v-for="(value, key) in formPenjaminan" :key="key">
          <td class="px-6 py-4 font-semibold text-gray-900 capitalize">{{ formatLabel(key) }}:</td>
          <td class="px-6 py-4">{{ formatValue(key, value) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'; 

const formPenjaminan = ref({
  nama: '',
  tempatLahir: '',
  noKtp: '',
  alamatTinggal: '',
  kota: '',
  kodePos: '',
  lamaTinggal: '',
  teleponRumah: '',
  noHp: '',
  hubunganDebitur: '',
  pekerjaan: '',
  penghasilanBulan: 0,
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
  if (key === 'noHp') {
    return formatPhoneNumber(value);
  }
  return value ? value : '-'; 
};

const loadFromLocalStorage = () => {
  const storedData = localStorage.getItem('dataArray');
  const dataArray = storedData ? JSON.parse(storedData) : [];

  const entry = dataArray.find((entry) => entry.id === id.value);  

  if (entry && entry.formPenjaminan) {
    formPenjaminan.value = entry.formPenjaminan;
  }
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

onMounted(() => {
  loadFromLocalStorage();
});
</script>
