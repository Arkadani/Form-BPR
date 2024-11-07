<template>
  <div class="mt-10">
    <h2 class="text-3xl font-bold text-gray-900 mb-5 text-center">Tabel Data Jaminan Bilyet</h2>
    <table class="table-auto w-full bg-white shadow-md rounded-lg mb-5">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-6 py-4 font-semibold text-gray-900">Field</th>
          <th v-for="(form, index) in formData" :key="'header-' + index" class="px-6 py-4 font-semibold text-gray-900">
            Bilyet {{ index + 1 }}
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr>
          <td class="px-6 py-4 font-semibold text-gray-900">Nomor Bilyet</td>
          <td v-for="(form, index) in formData" :key="'nomorBilyet-' + index" class="px-6 py-4">{{ formatValue(form.nomorBilyet) }}</td>
        </tr>
        <tr>
          <td class="px-6 py-4 font-semibold text-gray-900">Tanggal Valuta</td>
          <td v-for="(form, index) in formData" :key="'tanggalValuta-' + index" class="px-6 py-4">{{ formatValue(form.tanggalValuta) }}</td>
        </tr>
        <tr>
          <td class="px-6 py-4 font-semibold text-gray-900">Jangka Waktu</td>
          <td v-for="(form, index) in formData" :key="'jangkaWaktu-' + index" class="px-6 py-4">{{ formatValue(form.jangkaWaktu) }}</td>
        </tr>
        <tr>
          <td class="px-6 py-4 font-semibold text-gray-900">Nominal</td>
          <td v-for="(form, index) in formData" :key="'nominal-' + index" class="px-6 py-4">{{ formatValue(form.nominal) }}</td>
        </tr>
        <tr>
          <td class="px-6 py-4 font-semibold text-gray-900">Atas Nama</td>
          <td v-for="(form, index) in formData" :key="'atasNama-' + index" class="px-6 py-4">{{ formatValue(form.atasNama) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';  
const formData = ref([]);
const route = useRoute();
const id = ref(route.query.id || route.params.id);  
const formatValue = (value) => {
  return value ? value : '-';
};

const loadFormDataById = () => {
  const storedData = localStorage.getItem('dataArray');
  const dataArray = storedData ? JSON.parse(storedData) : [];

  const entry = dataArray.find((entry) => entry.id === id.value);

  if (entry && entry.formBilyet) {
    formData.value = entry.formBilyet;
  }
};

const saveFormDataById = (newData) => {
  const storedData = localStorage.getItem('dataArray');
  let dataArray = storedData ? JSON.parse(storedData) : [];

  const entryIndex = dataArray.findIndex((entry) => entry.id === id.value);

  if (entryIndex !== -1) {
    dataArray[entryIndex].formBilyet = newData;
  } else {
    dataArray.push({
      id: id.value,
      formBilyet: newData,
    });
  }

  localStorage.setItem('dataArray', JSON.stringify(dataArray));
};

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
