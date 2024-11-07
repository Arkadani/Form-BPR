<template>
  <div class="flex flex-col w-full max-w-screen-lg mx-auto p-4">
    <div class="block text-5xl font-bold text-gray-900 mb-8 mt-5 text-center">
      <h1>Data Suami / Istri</h1>
    </div>
    <div class="w-full">
      <div v-for="form in namaSuamiistri" class="w-full mb-4">
        <label class="block text-lg font-semibold font-sans text-gray-900 mb-2">Nama suami / istri:</label>
        <InputText v-model="formSuamiistri.namaSuamiIstri" :placeholder="form.placeholder" class="w-full" />
      </div>

      <div>
        <label class="block text-lg font-semibold font-sans text-gray-900 mb-4">Jenis Kelamin</label>
        <div class="flex flex-col md:flex-row gap-4">
          <div v-for="option in radioGender" :key="option.value" class="flex items-center">
            <input type="radio" :id="option.value" :value="option.value" v-model="formSuamiistri.selectedGender" class="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out" />
            <label :for="option.value" class="ml-2 text-base font-normal text-gray-700">{{ option.label }}</label>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full mt-5">
      <div v-for="form in tempatTanggallahir" class="w-full mb-4">
        <label class="block text-lg font-semibold font-sans text-gray-900 mb-2">Tempat tanggal lahir:</label>
        <InputText v-model="formSuamiistri.tempatTanggalLahir" :placeholder="form.placeholder" class="w-full" />
      </div>

      <div>
        <label class="block text-lg font-semibold font-sans text-gray-900 mb-4">Pendidikan Terakhir</label>
        <div class="flex flex-col md:flex-row gap-4 mb-5">
          <div v-for="option in radioPendidikan" :key="option.value" class="flex items-center">
            <input type="radio" :id="option.value" :value="option.value" v-model="formSuamiistri.selectedPendidikan" class="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out" />
            <label :for="option.value" class="ml-2 text-base font-normal text-gray-700">{{ option.label }}</label>
          </div>
        </div>
      </div>
    </div>

    <div v-for="(form, index) in noKtp" :key="`noKtp-${index}`" class="w-full mb-4">
      <label class="block text-lg font-semibold font-sans text-gray-900 mb-2">{{ form.label }}:</label>
      <InputText v-model="formSuamiistri[form.model]" :type="form.type" :placeholder="form.placeholder" class="w-full" />
    </div>

    <div class="w-full mt-5">
      <label class="block text-lg font-semibold font-sans text-gray-900 mb-4">Pekerjaan:</label>
      <div class="flex flex-col gap-3 md:flex-row mb-3">
        <div v-for="option in radioPekerjaan" :key="option.value" class="flex items-center">
          <input type="radio" :id="option.value" :value="option.value" v-model="formSuamiistri.selectedPekerjaan" class="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out" />
          <label :for="option.value" class="ml-2 text-base font-normal text-gray-700">{{ option.label }}</label>
        </div>
      </div>
    </div>

    <div class="w-full mt-5">
      <div v-for="(form, index) in dataPerusahaan" :key="`dataPerusahaan-${index}`" class="w-full mb-4">
        <label class="block text-lg font-semibold font-sans text-gray-900 mb-2">{{ form.label }}:</label> 
        <InputText v-model="formSuamiistri[form.model]" :type="form.type" :placeholder="form.placeholder" class="w-full" />
      </div>
    </div>

    <div class="w-full mt-3">
      <label for="jabatan" class="block text-lg font-semibold font-sans text-gray-900 mb-2">Jabatan:</label>
      <InputText v-model="formSuamiistri.jabatan" :type="jabatan[0].type" :placeholder="jabatan[0].placeholder" class="w-full" />
    </div>

    <div class="w-full mt-5">
      <div v-for="form in teleponPerusahaan" :key="form.label" class="w-full mb-4">
        <label class="block text-lg font-semibold font-sans text-gray-900 mb-2">{{ form.label }}</label>
        <InputText v-model="formSuamiistri.teleponPerusahaan" :type="form.type" :placeholder="form.placeholder" class="w-full" />
      </div>
    </div>

    <div class="mb-5">
      <label class="block text-lg font-semibold font-sans text-gray-900 mb-2">No HP:</label>
      <input
        type="text"
        v-model="formSuamiistri.phoneNumber"
        @input="formatPhoneNumber"
        placeholder="+62..."
        class="shadow text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
      />
    </div>

    <div class="w-full mt-2">
      <label class="block text-lg font-semibold font-sans text-gray-900 mb-2">Penghasilan Bersih</label>
      <InputText v-model="formSuamiistri.penghasilanBersih" placeholder="..." class="w-full" />
    </div>

    <div class="mt-10 flex justify-center">
      <router-link :to="{ path: 'datapenjaminan', query: { id: route.query.id } }">
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

const formSuamiistri = ref({
  namaSuamiIstri: '',
  selectedGender: '',
  tempatTanggalLahir: '',
  selectedPendidikan: '',
  selectedPekerjaan: '',
  teleponPerusahaan: '',
  jabatan: '',
  phoneNumber: '',
  penghasilanBersih: '',
});

const teleponPerusahaan = [
  { label: 'Telepon perusahaan:', model: 'teleponPerusahaan', type: 'text', placeholder: '...' }
];

const jabatan = [{ type: 'text', placeholder: '...' }];

const dataPerusahaan = [
  { label: 'Nama perusahaan', model: 'namaPerusahaan', type: 'text', placeholder: '...' },
  { label: 'Bidang usaha', model: 'bidangUsaha', type: 'text', placeholder: '...' },
  { label: 'Lama bekerja / usaha', model: 'lamaBekerja', type: 'text', placeholder: '...' },
];

const radioPekerjaan = [
  { label: 'Pegawai negeri', value: 'Pegawai negeri' },
  { label: 'Pegawai swasta', value: 'Pegawai swasta' },
  { label: 'Wiraswasta', value: 'Wiraswasta' },
  { label: 'Profesional', value: 'Profesional' },
  { label: 'Tidak bekerja', value: 'Tidak bekerja' },
];

const noKtp = [
  { label: 'No KTP / SIM', model: 'noKtp', type: 'number', placeholder: '...' },
  { label: 'Tanggal terbit', model: 'tanggalTerbit', type: 'date', placeholder: '...' },
  { label: 'Berlaku S/D', model: 'berlakuSd', type: 'date', placeholder: '...' },
];

const radioPendidikan = [
  { label: 'SD', value: 'SD' },
  { label: 'SMP', value: 'SMP' },
  { label: 'SMA', value: 'SMA' },
  { label: 'D3', value: 'D3' },
  { label: 'S1', value: 'S1' },
];

const tempatTanggallahir = [{ placeholder: '...' }];
const namaSuamiistri = [{ placeholder: '...' }];

const radioGender = [
  { label: 'Pria', value: 'Pria' },
  { label: 'Wanita', value: 'Wanita' },
];

const formatPhoneNumber = (e) => {
  let value = e.target.value.replace(/\D/g, '');
  if (!value.startsWith('62')) {
    value = '62' + value;
  }
  formSuamiistri.value.phoneNumber = '+' + value;
};

const saveToLocalStorage = () => {
  const storedData = localStorage.getItem('dataArray');
  let dataArray = storedData ? JSON.parse(storedData) : [];

  const entryIndex = dataArray.findIndex((entry) => entry.id === id.value);

  if (entryIndex !== -1) {
    dataArray[entryIndex] = {
      ...dataArray[entryIndex],
      formSuamiistri: formSuamiistri.value,
    };
  } else {
    dataArray.push({
      id: id.value,
      formSuamiistri: formSuamiistri.value,
    });
  }

  localStorage.setItem('dataArray', JSON.stringify(dataArray));
};

const loadFromLocalStorage = () => {
  const storedData = localStorage.getItem('dataArray');
  if (storedData) {
    const dataArray = JSON.parse(storedData);
    const entry = dataArray.find((entry) => entry.id === id.value);
    if (entry && entry.formSuamiistri) {
      formSuamiistri.value = entry.formSuamiistri;
    }
  }
};

watch(formSuamiistri, saveToLocalStorage, { deep: true });

onMounted(() => {
  loadFromLocalStorage();
});
</script>
