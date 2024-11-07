<template>
  <div class="mt-10">
    <h2 class="text-3xl font-bold text-gray-900 mb-5 text-center">Tabel Data Jaminan Kendaraan</h2>
    <table class="table-auto w-full bg-white shadow-md rounded-lg">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-6 py-4 font-semibold text-gray-900">Field</th>
          <th v-for="(unit, index) in formData" :key="'header-' + index" class="px-6 py-4 font-semibold text-gray-900">
            Kendaraan {{ index + 1 }}
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr>
          <td class="px-6 py-4 font-semibold text-gray-900">Merk</td>
          <td v-for="(unit, index) in formData" :key="'merk-' + index" class="px-6 py-4">{{ formatValue(unit.Merk) }}</td>
        </tr>
        <tr>
          <td class="px-6 py-4 font-semibold text-gray-900">Tipe</td>
          <td v-for="(unit, index) in formData" :key="'tipe-' + index" class="px-6 py-4">{{ formatValue(unit.Tipe) }}</td>
        </tr>
        <tr>
          <td class="px-6 py-4 font-semibold text-gray-900">Tahun</td>
          <td v-for="(unit, index) in formData" :key="'tahun-' + index" class="px-6 py-4">{{ formatValue(unit.Tahun) }}</td>
        </tr>
        <tr>
          <td class="px-6 py-4 font-semibold text-gray-900">Warna</td>
          <td v-for="(unit, index) in formData" :key="'warna-' + index" class="px-6 py-4">{{ formatValue(unit.Warna) }}</td>
        </tr>
        <tr>
          <td class="px-6 py-4 font-semibold text-gray-900">Atas Nama</td>
          <td v-for="(unit, index) in formData" :key="'atasNama-' + index" class="px-6 py-4">{{ formatValue(unit.AtasNama) }}</td>
        </tr>
        <tr>
          <td class="px-6 py-4 font-semibold text-gray-900">No Polisi</td>
          <td v-for="(unit, index) in formData" :key="'noPolisi-' + index" class="px-6 py-4">{{ formatValue(unit.NoPolisi) }}</td>
        </tr>
        <tr>
          <td class="px-6 py-4 font-semibold text-gray-900">No Rangka</td>
          <td v-for="(unit, index) in formData" :key="'noRangka-' + index" class="px-6 py-4">{{ formatValue(unit.NoRangka) }}</td>
        </tr>
        <tr>
          <td class="px-6 py-4 font-semibold text-gray-900">No Mesin</td>
          <td v-for="(unit, index) in formData" :key="'noMesin-' + index" class="px-6 py-4">{{ formatValue(unit.NoMesin) }}</td>
        </tr>
        <tr>
          <td class="px-6 py-4 font-semibold text-gray-900">No BKPB</td>
          <td v-for="(unit, index) in formData" :key="'noBkpb-' + index" class="px-6 py-4">{{ formatValue(unit.NoBKPB) }}</td>
        </tr>
        <tr>
          <td class="px-6 py-4 font-semibold text-gray-900">Nilai Jaminan</td>
          <td v-for="(unit, index) in formData" :key="'nilaiJaminan-' + index" class="px-6 py-4">{{ formatValue(unit.NilaiJaminan) }}</td>
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

const loadFromLocalStorage = () => {
  const storedData = localStorage.getItem('dataArray');
  const dataArray = storedData ? JSON.parse(storedData) : [];
  
  const entry = dataArray.find((entry) => entry.id === id.value);

  if (entry && entry.formJaminanKendaraan) {
    formData.value = entry.formJaminanKendaraan;
  }
};

onMounted(() => {
  loadFromLocalStorage();
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
