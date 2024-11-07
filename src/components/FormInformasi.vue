<template>
  <div class="mt-10">
    <h2 class="text-3xl font-bold text-gray-900 mb-5 text-center">Tabel Informasi</h2>
    <table class="table-auto w-full bg-white shadow-md rounded-lg mb-5">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-6 py-4 font-semibold text-gray-900">Field</th>
          <th class="px-6 py-4 font-semibold text-gray-900">Value</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr>
          <td class="px-6 py-4 font-semibold text-gray-900">Status Pemohon:</td>
          <td class="px-6 py-4">{{ formatValue(selectedValues.statusPemohon) }}</td>
        </tr>
        <tr>
          <td class="px-6 py-4 font-semibold text-gray-900">Hubungan dengan BPR:</td>
          <td class="px-6 py-4">{{ formatValue(selectedValues.hubunganBpr) }}</td>
        </tr>
        <tr>
          <td class="px-6 py-4 font-semibold text-gray-900">Daya Listrik:</td>
          <td class="px-6 py-4">{{ formatValue(selectedValues.dayaListrik) }}</td>
        </tr>
        <tr>
          <td class="px-6 py-4 font-semibold text-gray-900">Hubungan Rek Telepon:</td>
          <td class="px-6 py-4">{{ formatValue(selectedValues.hubunganTelepon) }}</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';  

const route = useRoute();
const id = ref(route.query.id || route.params.id);  
const selectedValues = ref({
  statusPemohon: '',
  hubunganBpr: '',
  dayaListrik: '',
  hubunganTelepon: ''
});

const formatValue = (value) => {
  return value ? value : '-';
};

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
    dataArray[entryIndex].informasiForm = newData;
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
</script>

<style scoped>
.table-auto {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  border: 1px solid #e5e7eb;
  padding: 10px;
  text-align: left;
}

thead th {
  background-color: #f3f4f6;
}
</style>
