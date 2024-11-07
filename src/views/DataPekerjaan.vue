<template>
  <div class="flex flex-col w-full max-w-screen-lg mx-auto p-4">
    <div class="block text-5xl font-bold text-gray-900 mb-8 mt-5 text-center">
      <h1>Data Pekerjaan / Usaha</h1>
    </div>

    <div class="mb-8">
      <div class="block text-lg font-semibold font-sans text-gray-900 mb-4">Pekerjaan</div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="option in radioPekerjaan" :key="option.value" class="flex items-center space-x-3">
          <input
            type="radio"
            :id="option.value"
            :value="option.value"
            v-model="formPekerjaan.selectedPekerjaan"
            class="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
          />
          <label :for="option.value" class="text-gray-700 text-lg">{{ option.label }}</label>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div v-for="form in dataPerusahaan" :key="form.key" class="w-full">
        <InputText :label="form.label" :type="form.type" :placeholder="form.placeholder" :labelClass="form.labelClass" v-model="formPekerjaan[form.key]" class="w-full" />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div v-for="form in teleponPerusahaan" :key="form.key" class="w-full">
        <InputText :label="form.label" :type="form.type" :placeholder="form.placeholder" :labelClass="form.labelClass" v-model="formPekerjaan[form.key]" class="w-full" />
      </div>
      <div class="mb-5">
        <label class="block text-lg font-semibold font-sans text-gray-900 mb-2">No HP:</label>
        <input
          type="text"
          v-model="formattedPhoneNumber"
          @input="onPhoneNumberInput"
          placeholder="+62..."
          class="shadow text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
        />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div class="w-full">
        <label class="block text-lg font-semibold text-gray-900 mb-2">{{ penghasilanBersih[0].label }}</label>
        <input
          type="text"
          :placeholder="penghasilanBersih[0].placeholder"
          class="w-full p-2.5 shadow text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500"
          :value="formattedPenghasilanBersih"
          @input="updatePenghasilanBersih($event)"
        />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div v-for="form in usahaSampingan" :key="form.key" class="w-full">
        <InputText :label="form.label" :type="form.type" :placeholder="form.placeholder" :labelClass="form.labelClass" v-model="formPekerjaan[form.key]" class="w-full" />
      </div>
    </div>

    <div class="flex justify-center mt-10">
      <router-link :to="{ path: 'datasuamiistri', query: { id: route.query.id } }">
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

// Data arrays for the form
const dataPerusahaan = [
  { label: 'Nama perusahaan', key: 'namaPerusahaan', type: 'text', placeholder: '...', labelClass: 'text-slate-900 text-lg' },
  { label: 'Bidang usaha', key: 'bidangUsaha', type: 'text', placeholder: '...', labelClass: 'text-slate-900 text-lg' },
  { label: 'Jabatan', key: 'jabatan', type: 'text', placeholder: '...', labelClass: 'text-slate-900 text-lg' },
  { label: 'Alamat perusahaan', key: 'alamatPerusahaan', type: 'text', placeholder: '...', labelClass: 'text-slate-900 text-lg' },
];

const teleponPerusahaan = [
  { label: 'Telepon perusahaan', key: 'teleponPerusahaan', type: 'text', placeholder: '...', labelClass: 'text-slate-900 text-lg' },
];

const penghasilanBersih = [
  { label: 'Penghasilan bersih', key: 'penghasilanBersih', type: 'number', placeholder: '...' },
];

const usahaSampingan = [
  { label: 'Usaha sampingan', key: 'usahaSampingan', type: 'text', placeholder: '...', labelClass: 'text-slate-900 text-lg' },
  { label: 'Lama bekerja / usaha', key: 'lamaBekerjaUsaha', type: 'text', placeholder: '...', labelClass: 'text-slate-900 text-lg' },
];

const radioPekerjaan = [
  { label: 'Pegawai negeri', value: 'Pegawai negeri' },
  { label: 'Pegawai swasta', value: 'Pegawai swasta' },
  { label: 'Wiraswasta', value: 'Wiraswasta' },
  { label: 'Profesional', value: 'Profesional' },
  { label: 'Tidak bekerja', value: 'Tidak bekerja' },
];

const initializeFormPekerjaan = () => {
  const form = {};
  
  [...dataPerusahaan, ...teleponPerusahaan, ...penghasilanBersih, ...usahaSampingan].forEach(field => {
    form[field.key] = ''; 
  });

  return form;
};

const formPekerjaan = ref(initializeFormPekerjaan());

const loadFormDataById = () => {
  const storedData = localStorage.getItem('dataArray');
  const dataArray = storedData ? JSON.parse(storedData) : [];

  const entry = dataArray.find((entry) => entry.id === id.value);

  if (entry && entry.formPekerjaan) {
    formPekerjaan.value = {
      ...formPekerjaan.value,
      ...entry.formPekerjaan
    };
  } else {
    console.log('Data not found for id:', id.value);
  }
};

const saveFormDataById = (newData) => {
  const storedData = localStorage.getItem('dataArray');
  let dataArray = storedData ? JSON.parse(storedData) : [];

  const entryIndex = dataArray.findIndex((entry) => entry.id === id.value);

  if (entryIndex !== -1) {
    dataArray[entryIndex] = {
      ...dataArray[entryIndex],
      formPekerjaan: {
        ...dataArray[entryIndex].formPekerjaan,
        ...newData,
      },
    };
  } else {
    dataArray.push({
      id: id.value,
      formPekerjaan: newData,
    });
  }

  localStorage.setItem('dataArray', JSON.stringify(dataArray));
};

watch(formPekerjaan, (newData) => {
  saveFormDataById(newData);
}, { deep: true });

onMounted(() => {
  loadFormDataById();
});

const formattedPhoneNumber = ref('');
const formattedPenghasilanBersih = ref('');

const onPhoneNumberInput = (e) => {
  const rawValue = e.target.value.replace(/\D/g, '');
  formPekerjaan.value.phoneNumber = rawValue;
  formattedPhoneNumber.value = formatPhoneNumber(rawValue);
};

const formatPhoneNumber = (value) => {
  value = value.replace(/\D/g, '');
  if (!value.startsWith('62')) {
    value = '62' + value;
  }
  return '+' + value;
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
  return rupiah ? `Rp ${rupiah}` : 'Rp 0';
};

const updatePenghasilanBersih = (event) => {
  const rawValue = event.target.value.replace(/[^0-9]/g, '');
  formPekerjaan.value.penghasilanBersih = rawValue ? parseInt(rawValue, 10) : 0;
  formattedPenghasilanBersih.value = formatRupiah(formPekerjaan.value.penghasilanBersih);
};

</script>
