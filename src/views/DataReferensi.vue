<template>
  <div class="flex flex-col w-full max-w-screen-lg mx-auto p-4">
    <div class="block text-5xl font-bold text-gray-900 mb-3 mt-5 text-center">
      <h1>Data Referensi</h1>
      <p class="text-sm">Keluarga atau Kawan terdekat yang bukan serumah (wajib diisi)</p>
    </div>

    <div class="flex flex-col mb-5">
      <div v-for="(form, index) in dataReferensi" :key="`dataReferensi-${index}-${form.label}`" class="w-full">
        <label :for="form.label" class="block text-lg font-bold font-sans text-gray-900 mb-2">{{ form.label }}</label>
        <InputText v-model="formData.namaKtp" :type="form.type" :placeholder="form.placeholder" class="w-full" />
      </div>
    </div>

    <div class="flex flex-col">
      <label for="alamattinggal" class="block text-lg font-bold font-sans text-gray-900 mb-2">Alamat Tinggal:</label>
      <div v-for="(form, index) in alamatTinggal" :key="`alamatTinggal-${index}-${form.placeholder}`" class="w-full">
        <InputText v-model="formData.alamatTinggal" :placeholder="form.placeholder" class="w-full" />
      </div>

      <div v-for="(form, index) in alamatTinggal3" :key="`alamatTinggal3-${index}-${form.label}`" class="w-full mt-4">
        <label :for="form.label" class="block text-lg font-bold font-sans text-gray-900 mb-2">{{ form.label }}</label>
        <InputText v-model="formData[cleanLabel(form.label)]" :placeholder="form.placeholder" class="w-full" />
      </div>
    </div>

    <div class="flex flex-col mb-2 mt-4">
      <div v-for="(form, index) in teleponRumah" :key="`teleponRumah-${index}-${form.label}`" class="w-full">
        <label :for="form.label" class="block text-lg font-bold font-sans text-gray-900 mb-2">{{ form.label }}</label>
        <InputText v-model="formData[cleanLabel(form.label)]" :type="form.type" :placeholder="form.placeholder" class="w-full mb-4"/>
      </div>
    </div>

    <div class="flex flex-col">
      <label for="hubunganDebitur" class="block text-lg font-bold font-sans text-gray-900 mb-2">Hubungan dengan Debitur:</label>
      <div v-for="(form, index) in hubunganDebitur" :key="`hubunganDebitur-${index}-${form.placeholder}`" class="w-full">
        <InputText v-model="formData[cleanLabel(form.label)]" :placeholder="form.placeholder" class="w-full" />
      </div>
    </div>

    <div class="mt-10 flex justify-center">
      <router-link :to="{ path: 'denahalamat', query: { id: route.query.id } }">
        <ButtonSubmit class="text-lg font-semibold font-sans text-gray-900" />
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router'; 
import InputText from '../components/InputText.vue';
import ButtonSubmit from '../components/ButtonSubmit.vue';

const route = useRoute();
const id = ref(route.query.id || route.params.id);

const formData = ref({
  namaKtp: '',
  alamatTinggal: ''
});

const cleanLabel = (label) => {
  return label
    .toLowerCase()
    .replace(/ /g, '_')  
    .replace(/:/g, '')   
    .trim();             
};

const loadFormDataById = () => {
  const storedData = localStorage.getItem('dataArray');
  const dataArray = storedData ? JSON.parse(storedData) : [];

  const entry = dataArray.find((entry) => entry.id === id.value);

  if (entry && entry.formReferensi) {
    formData.value = entry.formReferensi;
  }
};

const saveFormDataById = (newData) => {
  const storedData = localStorage.getItem('dataArray');
  let dataArray = storedData ? JSON.parse(storedData) : [];

  const entryIndex = dataArray.findIndex((entry) => entry.id === id.value);

  if (entryIndex !== -1) {
    dataArray[entryIndex] = {
      ...dataArray[entryIndex],
      formReferensi: newData,
    };
  } else {
    dataArray.push({
      id: id.value,
      formReferensi: newData,
    });
  }

  localStorage.setItem('dataArray', JSON.stringify(dataArray));
};

watch(formData, (newFormData) => {
  saveFormDataById(newFormData);
}, { deep: true });

onMounted(() => {
  loadFormDataById();
});

const dataReferensi = [
  { label: 'Nama (Sesuai KTP):', type: 'text', placeholder: '...' }
];

const alamatTinggal = [
  { label: '', type: 'text', placeholder: '...' }
];

const alamatTinggal3 = [
  { label: 'Kota:', type: 'text', placeholder: '...' },
  { label: 'Kode pos:', type: 'text', placeholder: '...' },
  { label: 'Lama tinggal di alamat ini:', type: 'text', placeholder: '...' }
];

const teleponRumah = [
  { label: 'Telepon rumah:', type: 'text', placeholder: '...' },
  { label: 'No HP:', type: 'text', placeholder: '...' }
];

const hubunganDebitur = [
  { label: 'Jumlah tanggungan:', type: 'text', placeholder: '...' }
];
</script>
