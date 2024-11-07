<template>
  <div class="flex flex-col w-full max-w-screen-lg mx-auto p-4">
    <div class="block text-5xl font-bold text-gray-900 mb-5 mt-5 text-center">
      <h1>Data Jaminan Tanah</h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
      <div class="flex items-center">
        <div class="w-36">
          <input 
            v-model.number="unitValue" 
            placeholder=" jumlah Sertifikat..." 
            type="number"
            min="1" 
            max="5" 
            class="shadow text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <label for="unit" class="block text-lg font-bold text-gray-900 mt-3 ml-3">Jumlah Sertifikat</label>
      </div>
    </div>

    <div v-for="(form, index) in formData" :key="index" class="mb-5 p-5 border border-gray-300 rounded-lg shadow-md bg-white">
      <h2 class="text-2xl font-bold mb-3">Sertifikat {{ index + 1 }}</h2>
      <div class="p-5">
        <div class="mb-4">
        <label class="block text-lg font-bold text-gray-900 mb-2">Nomor Sertifikat</label>
        <input v-model="form.nomorSertifikat" type="text" placeholder="..." class="w-full text-lg font-sans text-gray-900 p-2.5 rounded-lg border border-gray-300" />
        </div>

      <div class="mb-4">
        <label class="block text-lg font-bold text-gray-900 mb-2">Status Sertifikat</label>
        <select v-model="form.statusSertifikat" class="w-full text-lg font-sans text-gray-900 p-2.5 rounded-lg border border-gray-300">
          <option value="SHM">SHM</option>
          <option value="HGB">HGB</option>
          <option value="lainnya">Lainnya</option>
        </select>
        <div v-if="form.statusSertifikat === 'lainnya'" class="mt-2">
          <input v-model="form.statusSertifikatLainnya" type="text" placeholder="..." class="w-full text-lg font-sans text-gray-900 p-2.5 rounded-lg border border-gray-300" />
        </div>
      </div>

      <div class="mb-4">
        <label class="block text-lg font-bold text-gray-900 mb-2">IMB</label>
        <select v-model="form.imbStatus" class="w-full text-lg font-sans text-gray-900 p-2.5 rounded-lg border border-gray-300">
          <option value="Ada">Ada</option>
          <option value="Tidak ada">Tidak ada</option>
        </select>
        <div v-if="form.imbStatus === 'Ada'" class="mt-2">
          <input v-model="form.imbNumber" type="text" placeholder="..." class="w-full text-lg font-sans text-gray-900 p-2.5 rounded-lg border border-gray-300" />
        </div>
      </div>

      <div class="mb-4">
        <label class="block text-lg font-bold text-gray-900 mb-2">Lokasi</label>
        <input v-model="form.lokasi" type="text" placeholder="..." class="w-full text-lg font-sans text-gray-900 p-2.5 rounded-lg border border-gray-300" />
      </div>

      <div class="mb-4">
        <label class="block text-lg font-bold text-gray-900 mb-2">Desa / Kelurahan</label>
        <input v-model="form.desaKelurahan" type="text" placeholder="..." class="w-full text-lg font-sans text-gray-900 p-2.5 rounded-lg border border-gray-300" />
      </div>

      <div class="mb-4">
        <label class="block text-lg font-bold text-gray-900 mb-2">Kecamatan</label>
        <input v-model="form.kecamatan" type="text" placeholder="..." class="w-full text-lg font-sans text-gray-900 p-2.5 rounded-lg border border-gray-300" />
      </div>

      <div class="mb-4">
        <label class="block text-lg font-bold text-gray-900 mb-2">Kota</label>
        <input v-model="form.kota" type="text" placeholder="..." class="w-full text-lg font-sans text-gray-900 p-2.5 rounded-lg border border-gray-300" />
      </div>

      <div class="mb-4">
        <label class="block text-lg font-bold text-gray-900 mb-2">Atas Nama</label>
        <input v-model="form.atasNama" type="text" placeholder="..." class="w-full text-lg font-sans text-gray-900 p-2.5 rounded-lg border border-gray-300" />
      </div>

      <div class="mb-4">
        <label class="block text-lg font-bold text-gray-900 mb-2">Nilai Jaminan</label>
        <input v-model="form.nilaiJaminan" type="number" placeholder="..." class="w-full text-lg font-sans text-gray-900 p-2.5 rounded-lg border border-gray-300" />
      </div>

      <div class="mb-4">
        <label class="block text-lg font-bold text-gray-900 mb-2">Luas Tanah</label>
        <input v-model="form.luasTanah" type="text" placeholder="..." class="w-full text-lg font-sans text-gray-900 p-2.5 rounded-lg border border-gray-300" />
      </div>

      <div class="mb-4">
        <label class="block text-lg font-bold text-gray-900 mb-2">Luas Bangunan</label>
        <input v-model="form.luasBangunan" type="text" placeholder="..." class="w-full text-lg font-sans text-gray-900 p-2.5 rounded-lg border border-gray-300" />
      </div>
    </div>
    </div>
    <div class="mt-10 flex justify-center">
      <router-link :to="{ path: 'jaminanbilyet', query: { id: route.query.id } }">
        <ButtonSubmit class="text-lg font-semibold font-sans text-gray-900" />
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
    nomorSertifikat: '',
    statusSertifikat: '',
    statusSertifikatLainnya: '',
    imbStatus: '',
    imbNumber: '',
    lokasi: '',
    desaKelurahan: '',
    kecamatan: '',
    kota: '',
    atasNama: '',
    nilaiJaminan: '',
    luasTanah: '',
    luasBangunan: ''
  }));
};

watch(unitValue, (newValue) => {
  const diff = newValue - formData.value.length;

  if (diff > 0) {

    for (let i = 0; i < diff; i++) {
      formData.value.push({
        nomorSertifikat: '',
        statusSertifikat: '',
        statusSertifikatLainnya: '',
        imbStatus: '',
        imbNumber: '',
        lokasi: '',
        desaKelurahan: '',
        kecamatan: '',
        kota: '',
        atasNama: '',
        nilaiJaminan: '',
        luasTanah: '',
        luasBangunan: ''
      });
    }
  } else if (diff < 0) {
    formData.value.splice(diff);
  }
});

const saveToLocalStorage = () => {
  const storedData = localStorage.getItem('dataArray');
  let dataArray = storedData ? JSON.parse(storedData) : [];

  const entryIndex = dataArray.findIndex((entry) => entry.id === id.value);

  if (entryIndex !== -1) {
    dataArray[entryIndex] = {
      ...dataArray[entryIndex],
      formJaminanTanah: formData.value,
    };
  } else {
    dataArray.push({
      id: id.value,
      formJaminanTanah: formData.value,
    });
  }

  localStorage.setItem('dataArray', JSON.stringify(dataArray));
};

const loadFromLocalStorage = () => {
  const storedData = localStorage.getItem('dataArray');
  if (storedData) {
    const dataArray = JSON.parse(storedData);
    const entry = dataArray.find((entry) => entry.id === id.value);

    if (entry && entry.formJaminanTanah) {
      formData.value = entry.formJaminanTanah;
      unitValue.value = formData.value.length;  
    } else {
      initializeFormData();  
    }
  } else {
    initializeFormData();  
  }
};

watch(formData, saveToLocalStorage, { deep: true });

onMounted(() => {
  loadFromLocalStorage();
});
</script>
