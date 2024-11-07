<template>
  <div class="flex flex-col w-full max-w-screen-lg mx-auto p-4">
    <div class="block text-5xl font-bold text-gray-900 mb-8 mt-5 text-center">
      <h1>Data Penjaminan</h1>
    </div>

    <div class="flex flex-col space-y-4">
      <div v-for="form in dataPenjaminan" :key="form.label" class="w-full">
        <label :for="form.label" class="block text-lg font-semibold font-sans text-gray-900 mb-2">{{ form.label }}</label>
        <InputText v-model="formPenjaminan[form.key]" :type="form.type" :placeholder="form.placeholder" class="w-full" />
      </div>
    </div>
    <div class="mt-4">
      <label for="alamattinggal" class="block text-lg font-semibold font-sans text-gray-900 mb-2">Alamat Tinggal:</label>
      <div v-for="form in alamatTinggal" :key="form.label" class="w-full">
        <InputText v-model="formPenjaminan[form.key]" :placeholder="form.placeholder" class="w-full" />
      </div>
      <div class="flex flex-col space-y-4 mt-4">
        <div v-for="form in alamatTinggal3" :key="form.label" class="w-full">
          <label :for="form.label" class="block text-lg font-semibold font-sans text-gray-900 mb-2">{{ form.label }}</label>
          <InputText v-model="formPenjaminan[form.key]" :placeholder="form.placeholder" class="w-full" />
        </div>
      </div>
    </div>

    <div class="flex flex-col space-y-4 mt-5">
      <div v-for="form in teleponRumah" :key="form.label" class="w-full">
        <label :for="form.label" class="block text-lg font-semibold font-sans text-gray-900 mb-2">{{ form.label }}</label>
        <InputText v-model="formPenjaminan[form.key]" :type="form.type" :placeholder="form.placeholder" class="w-full" />
      </div>
    </div>

    <div class="flex flex-col space-y-4 mt-5">
      <div v-for="form in noHp" :key="form.label" class="w-full">
        <label :for="form.label" class="block text-lg font-semibold font-sans text-gray-900 mb-2">{{ form.label }}</label>
        <input
          v-model="formPenjaminan[form.key]"
          :type="form.type"
          @input="formatPhoneNumber"
          :placeholder="form.placeholder"
          class="shadow text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
        />
      </div>
    </div>

    <div class="mt-5">
      <label for="hubunganDebitur" class="block text-lg font-semibold font-sans text-gray-900 mb-2">Hubungan dengan Debitur:</label>
      <div v-for="form in hubunganDebitur" :key="form.label" class="w-full">
        <InputText v-model="formPenjaminan[form.key]" :placeholder="form.placeholder" class="w-full" />
      </div>
    </div>

    <div class="flex flex-col space-y-4 mt-5">
      <div v-for="form in pekerjaanUsaha" :key="form.label" class="w-full">
        <label :for="form.label" class="block text-lg font-semibold font-sans text-gray-900 mb-2">{{ form.label }}</label>
        <InputText v-model="formPenjaminan[form.key]" :type="form.type" :placeholder="form.placeholder" class="w-full" />
      </div>
    </div>

    <div class="mt-5">
      <label for="penghasilanBulan" class="block text-lg font-semibold font-sans text-gray-900 mb-2">Penghasilan / Bulan:</label>
      <InputText
        v-model="formattedPenghasilanBulan"
        @input="updatePenghasilanBulan"
        placeholder="Rp ..."
        class="w-full"
      />
    </div>

    <div class="mt-10 flex justify-center">
      <router-link :to="{ path: 'jaminankendaraan', query: { id: route.query.id } }">
        <ButtonSubmit class="text-lg font-semibold font-sans text-gray-900" />
      </router-link>
    </div>
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router';
import { ref, watch, onMounted } from 'vue';
import InputText from '../components/InputText.vue';
import ButtonSubmit from '../components/ButtonSubmit.vue';

const route = useRoute();
const id = ref(route.query.id || route.params.id);

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

const formattedPenghasilanBulan = ref('');

const formatPhoneNumber = () => {
  let value = formPenjaminan.value.noHp.replace(/\D/g, ''); 
  if (!value.startsWith('62')) {
    value = '62' + value; 
  }
  formPenjaminan.value.noHp = '+' + value;
};

const formatRupiah = (value) => {
  if (!value) return 'Rp 0';
  const numberString = value.toString().replace(/\D/g, '');
  const sisa = numberString.length % 3;
  let rupiah = numberString.substr(0, sisa);
  const ribuan = numberString.substr(sisa).match(/\d{3}/g);
  
  if (ribuan) {
    const separator = sisa ? '.' : '';
    rupiah += separator + ribuan.join('.');
  }
  return `Rp ${rupiah}`;
};

const updatePenghasilanBulan = (event) => {
  const rawValue = event.target.value.replace(/[^0-9]/g, ''); 
  formPenjaminan.value.penghasilanBulan = rawValue ? parseInt(rawValue, 10) : 0; 
  formattedPenghasilanBulan.value = formatRupiah(formPenjaminan.value.penghasilanBulan); 
};

const saveToLocalStorage = () => {
  const cleanedData = { ...formPenjaminan.value };
  cleanedData.noHp = cleanedData.noHp.replace(/\D/g, ''); 

  const storedData = localStorage.getItem('dataArray');
  let dataArray = storedData ? JSON.parse(storedData) : [];

  const entryIndex = dataArray.findIndex((entry) => entry.id === id.value);

  if (entryIndex !== -1) {
    dataArray[entryIndex] = {
      ...dataArray[entryIndex],
      formPenjaminan: cleanedData,
    };
  } else {
    dataArray.push({
      id: id.value,
      formPenjaminan: cleanedData,
    });
  }

  localStorage.setItem('dataArray', JSON.stringify(dataArray));
};

const loadFromLocalStorage = () => {
  const storedData = localStorage.getItem('dataArray');
  if (storedData) {
    const dataArray = JSON.parse(storedData);
    const entry = dataArray.find((entry) => entry.id === id.value);
    if (entry && entry.formPenjaminan) {
      formPenjaminan.value = entry.formPenjaminan;
      formattedPenghasilanBulan.value = formatRupiah(formPenjaminan.value.penghasilanBulan);

      if (formPenjaminan.value.noHp) {
        formatPhoneNumber(); 
      }
    }
  }
};

watch(formPenjaminan, saveToLocalStorage, { deep: true });

onMounted(() => {
  loadFromLocalStorage();
});

const dataPenjaminan = [
  { label: 'Nama (Sesuai KTP):', key: 'nama', type: 'text', placeholder: '...' },
  { label: 'Tempat / Tanggal lahir:', key: 'tempatLahir', type: 'text', placeholder: '...' },
  { label: 'No KTP / SIM:', key: 'noKtp', type: 'number', placeholder: '...' },
];

const alamatTinggal = [
  { label: 'Alamat lengkap:', key: 'alamatTinggal', type: 'text', placeholder: '...' },
];

const alamatTinggal3 = [
  { label: 'Kota:', key: 'kota', type: 'text', placeholder: '...' },
  { label: 'Kode pos:', key: 'kodePos', type: 'text', placeholder: '...' },
  { label: 'Lama tinggal di alamat ini:', key: 'lamaTinggal', type: 'text', placeholder: '...' },
];

const teleponRumah = [
  { label: 'Telepon rumah:', key: 'teleponRumah', type: 'text', placeholder: '...' },
];

const noHp = [
  { label: 'No HP:', key: 'noHp', type: 'text', placeholder: '+62...' },
];

const hubunganDebitur = [
  { label: 'Hubungan dengan Debitur:', key: 'hubunganDebitur', type: 'text', placeholder: '...' },
];

const pekerjaanUsaha = [
  { label: 'Pekerjaan / Usaha:', key: 'pekerjaan', type: 'text', placeholder: '...' },
];
</script>
