<template>
  <div class="mt-10">
    <h2 class="text-3xl font-bold text-gray-900 mb-5 text-center">Tabel Data Jaminan Tanah</h2>
    <table class="table-auto w-full bg-white shadow-md rounded-lg mb-5">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-6 py-4 font-semibold text-gray-900">Field</th>
          <th v-for="(form, index) in formData" :key="'header-' + index" class="px-6 py-4 font-semibold text-gray-900">
            Sertifikat {{ index + 1 }}
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr>
          <td class="px-6 py-4 font-semibold text-gray-900">Nomor Sertifikat</td>
          <td v-for="(form, index) in formData" :key="'nomorSertifikat-' + index" class="px-6 py-4">{{ formatValue(form.nomorSertifikat) }}</td>
        </tr>
        <tr>
          <td class="px-6 py-4 font-semibold text-gray-900">Status Sertifikat</td>
          <td v-for="(form, index) in formData" :key="'statusSertifikat-' + index" class="px-6 py-4">{{ formatValue(form.statusSertifikat) }}</td>
        </tr>
        <tr v-if="formData.some(form => form.statusSertifikat === 'lainnya')">
          <td class="px-6 py-4 font-semibold text-gray-900">Status Sertifikat Lainnya</td>
          <td v-for="(form, index) in formData" :key="'statusSertifikatLainnya-' + index" class="px-6 py-4">
            {{ form.statusSertifikat === 'lainnya' ? formatValue(form.statusSertifikatLainnya) : '-' }}
          </td>
        </tr>
        <tr>
          <td class="px-6 py-4 font-semibold text-gray-900">IMB</td>
          <td v-for="(form, index) in formData" :key="'imbStatus-' + index" class="px-6 py-4">{{ formatValue(form.imbStatus) }}</td>
        </tr>
        <tr v-if="formData.some(form => form.imbStatus === 'Ada')">
          <td class="px-6 py-4 font-semibold text-gray-900">Nomor IMB</td>
          <td v-for="(form, index) in formData" :key="'imbNumber-' + index" class="px-6 py-4">
            {{ form.imbStatus === 'Ada' ? formatValue(form.imbNumber) : '-' }}
          </td>
        </tr>
        <tr>
          <td class="px-6 py-4 font-semibold text-gray-900">Lokasi</td>
          <td v-for="(form, index) in formData" :key="'lokasi-' + index" class="px-6 py-4">{{ formatValue(form.lokasi) }}</td>
        </tr>
        <tr>
          <td class="px-6 py-4 font-semibold text-gray-900">Desa / Kelurahan</td>
          <td v-for="(form, index) in formData" :key="'desaKelurahan-' + index" class="px-6 py-4">{{ formatValue(form.desaKelurahan) }}</td>
        </tr>
        <tr>
          <td class="px-6 py-4 font-semibold text-gray-900">Kecamatan</td>
          <td v-for="(form, index) in formData" :key="'kecamatan-' + index" class="px-6 py-4">{{ formatValue(form.kecamatan) }}</td>
        </tr>
        <tr>
          <td class="px-6 py-4 font-semibold text-gray-900">Kota</td>
          <td v-for="(form, index) in formData" :key="'kota-' + index" class="px-6 py-4">{{ formatValue(form.kota) }}</td>
        </tr>
        <tr>
          <td class="px-6 py-4 font-semibold text-gray-900">Atas Nama</td>
          <td v-for="(form, index) in formData" :key="'atasNama-' + index" class="px-6 py-4">{{ formatValue(form.atasNama) }}</td>
        </tr>
        <tr>
          <td class="px-6 py-4 font-semibold text-gray-900">Nilai Jaminan</td>
          <td v-for="(form, index) in formData" :key="'nilaiJaminan-' + index" class="px-6 py-4">{{ formatValue(form.nilaiJaminan) }}</td>
        </tr>
        <tr>
          <td class="px-6 py-4 font-semibold text-gray-900">Luas Tanah</td>
          <td v-for="(form, index) in formData" :key="'luasTanah-' + index" class="px-6 py-4">{{ formatValue(form.luasTanah) }}</td>
        </tr>
        <tr>
          <td class="px-6 py-4 font-semibold text-gray-900">Luas Bangunan</td>
          <td v-for="(form, index) in formData" :key="'luasBangunan-' + index" class="px-6 py-4">{{ formatValue(form.luasBangunan) }}</td>
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

  if (entry && entry.formJaminanTanah) {
    formData.value = entry.formJaminanTanah;
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
