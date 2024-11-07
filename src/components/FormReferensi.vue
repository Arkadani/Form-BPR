<template>
  <div class="mt-10">
    <h2 class="text-3xl font-bold text-gray-900 text-center">Tabel Data Referensi</h2>
    <p class="text-center mb-5 font-bold text-gray-900">Keluarga atau Kawan terdekat yang bukan serumah (Wajib diisi)</p>
    
    <table class="table-auto w-full bg-white shadow-md rounded-lg mb-5">
      <tbody class="divide-y divide-gray-200">
        <tr>
          <td class="px-6 py-4 font-semibold text-gray-900">Nama (Sesuai KTP):</td>
          <td class="px-6 py-4">{{ formatValue(formData.namaKtp) }}</td>
        </tr>
        <tr>
          <td class="px-6 py-4 font-semibold text-gray-900">Alamat Tinggal:</td>
          <td class="px-6 py-4">{{ formatValue(formData.alamatTinggal) }}</td>
        </tr>
        <tr>
          <td class="px-6 py-4 font-semibold text-gray-900">Kota:</td>
          <td class="px-6 py-4">{{ formatValue(formData.kota) }}</td>
        </tr>
        <tr>
          <td class="px-6 py-4 font-semibold text-gray-900">Kode Pos:</td>
          <td class="px-6 py-4">{{ formatValue(formData.kodePos) }}</td>
        </tr>
        <tr>
          <td class="px-6 py-4 font-semibold text-gray-900">Lama Tinggal di Alamat Ini:</td>
          <td class="px-6 py-4">{{ formatValue(formData.lamaTinggalDiAlamatIni) }}</td>
        </tr>
        <tr>
          <td class="px-6 py-4 font-semibold text-gray-900">Telepon Rumah:</td>
          <td class="px-6 py-4">{{ formatValue(formData.teleponRumah) }}</td>
        </tr>
        <tr>
          <td class="px-6 py-4 font-semibold text-gray-900">No HP:</td>
          <td class="px-6 py-4">{{ formatValue(formData.noHp) }}</td>
        </tr>
        <tr>
          <td class="px-6 py-4 font-semibold text-gray-900">Jumlah Tanggungan:</td>
          <td class="px-6 py-4">{{ formatValue(formData.jumlahTanggungan) }}</td>
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

const formData = ref({
  namaKtp: '',
  alamatTinggal: '',
  kota: '',
  kodePos: '',
  lamaTinggalDiAlamatIni: '',
  teleponRumah: '',
  noHp: '',
  jumlahTanggungan: ''
});

const formatValue = (value) => {
  return value ? value : '-';
};

const loadFormDataById = () => {
  const storedData = localStorage.getItem('dataArray');
  const dataArray = storedData ? JSON.parse(storedData) : [];

  const entry = dataArray.find((entry) => entry.id === id.value);

  if (entry && entry.formReferensi) {
    formData.value = {
      ...formData.value,
      ...entry.formReferensi
    };
  }
};

const saveFormDataById = (newData) => {
  const storedData = localStorage.getItem('dataArray');
  let dataArray = storedData ? JSON.parse(storedData) : [];

  const entryIndex = dataArray.findIndex((entry) => entry.id === id.value);

  if (entryIndex !== -1) {
    dataArray[entryIndex].formReferensi = newData;
  } else {
    dataArray.push({
      id: id.value,
      formReferensi: newData,
    });
  }

  localStorage.setItem('dataArray', JSON.stringify(dataArray));
};

watch(formData, (newData) => {
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

td {
  border-bottom: 1px solid #e5e7eb;
  padding: 10px;
}

thead th {
  background-color: #f3f4f6;
}
</style>
