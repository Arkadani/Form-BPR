<template>
  <div class="flex flex-col w-full max-w-screen-lg mx-auto p-4">
    <div class="block text-5xl font-bold text-gray-900 mb-8 mt-5 text-center">
      <h1>Data Pribadi Pemohon</h1>
    </div>

    <div class="w-full max-w-screen-lg mx-auto">
      <div class="mb-5">
        <InputRadio :title="'Status Pemohon'" :radioOptions="radioStatus" v-model="formPemohon.statusPemohon" />
      </div>

      <div class="mb-5">
        <InputRadio :title="'Hubungan dengan BPR'" :radioOptions="radioBpr" v-model="formPemohon.hubunganBpr" />
      </div>

      <div class="grid grid-cols-1 gap-4 mb-5">
        <div v-for="form in namaKtp" :key="form.placeholder" class="w-full">
          <label class="block text-lg font-semibold font-sans text-gray-900 mb-2">Nama (Sesuai KTP):</label>
          <InputText :placeholder="form.placeholder" class="w-full" v-model="formPemohon.namaKtp" />
        </div>
      </div>

      <div class="mb-5">
        <div class="block text-lg font-semibold font-sans text-gray-900 mb-4">Jenis Kelamin:</div>
        <div class="flex flex-col md:flex-row gap-4">
          <div v-for="option in radioGender" :key="option.value" class="flex items-center">
            <input type="radio" :id="option.value" :value="option.value" v-model="formPemohon.selectedGender" class="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out" />
            <label :for="option.value" class="ml-2 text-gray-700">{{ option.label }}</label>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-4 mb-5">
        <div v-for="form in tempatTanggallahir" :key="form.placeholder" class="w-full">
          <label class="block text-lg font-semibold font-sans text-gray-900 mb-2">Tempat Tanggal Lahir:</label>
          <InputText :placeholder="form.placeholder" class="w-full" v-model="formPemohon.tempatTanggalLahir" />
        </div>

        <div>
          <div class="block text-lg font-semibold font-sans text-gray-900 mb-4">Pendidikan Terakhir:</div>
          <div class="flex flex-col md:flex-row gap-4">
            <div v-for="option in radioPendidikan" :key="option.value" class="flex items-center">
              <input type="radio" :id="option.value" :value="option.value" v-model="formPemohon.selectedPendidikan" class="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out" />
              <label :for="option.value" class="ml-2 text-gray-700">{{ option.label }}</label>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-4 mb-5">
        <div v-for="form in noKtp" :key="form.label" class="w-full">
          <InputText :label="form.label" :type="form.type" :placeholder="form.placeholder" class="w-full" v-model="formPemohon.noKtp[form.label]" />
        </div>
      </div>

      <div class="grid grid-cols-1 gap-4 mb-5">
        <div>
          <div class="block text-lg font-semibold font-sans text-gray-900 mb-4">Status Perkawinan:</div>
          <div class="flex flex-col md:flex-row gap-4">
            <div v-for="option in statusPerkawinan" :key="option.value" class="flex items-center">
              <input type="radio" :id="option.value" :value="option.value" v-model="formPemohon.selectedPerkawinan" class="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out" />
              <label :for="option.value" class="ml-2 text-gray-700">{{ option.label }}</label>
            </div>
          </div>
        </div>
        <div>
          <label class="block text-lg font-semibold font-sans text-gray-900 mb-2">Jumlah Tanggungan:</label>
          <InputText :placeholder="jumlahTanggungan[0].placeholder" class="w-full" v-model="formPemohon.jumlahTanggungan" />
        </div>
      </div>

      <div class="mb-4 mt-4">
        <h3 class="mb-4 text-lg font-bold font-sans text-gray-900">Agama:</h3>
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex items-center">
            <input type="radio" id="islam" value="Islam" v-model="formPemohon.selectedAgama" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 mr-2" />
            <label for="islam" class="text-gray-700 text-lg font-sans">Islam</label>
          </div>
          <div class="flex items-center">
            <input type="radio" id="kristen" value="Kristen" v-model="formPemohon.selectedAgama" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 mr-2" />
            <label for="kristen" class="text-gray-700 text-lg font-sans">Kristen</label>
          </div>
          <div class="flex items-center">
            <input type="radio" id="hindu" value="Hindu" v-model="formPemohon.selectedAgama" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 mr-2" />
            <label for="hindu" class="text-gray-700 text-lg font-sans">Hindu</label>
          </div>
          <div class="flex items-center">
            <input type="radio" id="budha" value="Budha" v-model="formPemohon.selectedAgama" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 mr-2" />
            <label for="budha" class="text-gray-700 text-lg font-sans">Budha</label>
          </div>
          <div class="flex items-center">
            <input type="radio" id="lainnya" value="lainnya" v-model="formPemohon.selectedAgama" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 mr-2" />
            <label for="lainnya" class="text-gray-700 text-lg font-sans">Lainnya</label>
            <input v-if="formPemohon.selectedAgama === 'lainnya'" type="text" v-model="formPemohon.otherAgamaText" placeholder="..." class="ml-3 border border-gray-300 rounded-md p-2.5 w-auto" />
          </div>
        </div>
      </div>

      <div class="mb-5">
        <label for="alamattinggal" class="block text-lg font-semibold font-sans text-gray-900 mb-2">Alamat Tinggal:</label>
        <div v-for="form in alamatTinggal" :key="form.label" class="w-full">
          <InputText :placeholder="form.placeholder" class="w-full" v-model="formPemohon.alamatTinggal" />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div v-for="form in alamatTinggal3" :key="form.key" class="w-full">
            <InputText :label="form.label" :placeholder="form.placeholder" class="w-full" v-model="formPemohon[form.key]" />
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-4 mb-5">
        <div v-for="form in teleponRumah" :key="form.label" class="w-full">
          <InputText :label="form.label" :type="form.type" :placeholder="form.placeholder" class="w-full" v-model="formPemohon.teleponRumah[form.label]" />
        </div>
        <div v-for="form in noHp" :key="form.label" class="w-full">
          <label :for="form.label" class="block text-lg font-semibold font-sans text-gray-900 mb-2">{{ form.label }}</label>
          <input
            :type="form.type"
            v-model="formPemohon.phoneNumber"
            @input="formatPhoneNumber"
            :placeholder="form.placeholder"
            class="shadow text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5"
          />
        </div>
      </div>

      <div class="mb-4 mt-8">
        <h3 class="mb-4 text-lg font-bold font-sans text-gray-900">Status tempat tinggal:</h3>
          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex items-center">
              <input type="radio" id="pribadi" value="Pribadi" v-model="formPemohon.statusTempatTinggal" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 mr-2" />
              <label for="pribadi" class="text-gray-700 text-lg font-sans">Pribadi</label>
            </div>
            <div class="flex items-center">
              <input type="radio" id="keluarga" value="Keluarga" v-model="formPemohon.statusTempatTinggal" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 mr-2" />
              <label for="keluarga" class="text-gray-700 text-lg font-sans">Keluarga</label>
            </div>
            <div class="flex items-center">
              <input type="radio" id="sewa/kontrak" value="Sewa/kontrak" v-model="formPemohon.statusTempatTinggal" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 mr-2" />
              <label for="sewa/kontrak" class="text-gray-700 text-lg font-sans">Sewa/kontrak</label>
            </div>
            <div class="flex items-center">
              <input type="radio" id="dinas" value="Dinas" v-model="formPemohon.statusTempatTinggal" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 mr-2" />
              <label for="dinas" class="text-gray-700 text-lg font-sans">Dinas</label>
            </div>
            <div class="flex items-center">
              <input type="radio" id="lainnya" value="lainnya" v-model="formPemohon.statusTempatTinggal" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 mr-2" />
              <label for="lainnya" class="text-gray-700 text-lg font-sans">Lainnya</label>
              <input v-if="formPemohon.statusTempatTinggal === 'lainnya'" type="text" v-model="formPemohon.otherTempatTinggalText" placeholder="..." class="ml-3 border border-gray-300 rounded-md p-2.5 w-auto" />
            </div>
          </div>
      </div>

      <div class="mb-5 mt-7">
        <label class="block text-lg font-semibold font-sans text-gray-900 mb-2">Nama Gadis Ibu Kandung:</label>
        <InputText placeholder="..." class="w-full" v-model="formPemohon.namaGadisIbuKandung" />
      </div>

      <div class="mb-4 mt-6">
        <h3 class="mb-4 text-lg font-semibold block">NPWP:</h3>
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex items-center">
            <input type="radio" id="tidakada" value="Tidak ada" v-model="formPemohon.selectedNpwp" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 mr-2" />
            <label for="tidakada" class="text-gray-700 text-lg font-sans">Tidak ada</label>
          </div>
          <div class="flex items-center">
            <input type="radio" id="ada" value="Ada" v-model="formPemohon.selectedNpwp" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 mr-2" />
            <label for="ada" class="text-gray-700 text-lg font-sans">Ada</label>
            <input v-if="formPemohon.selectedNpwp === 'Ada'" type="number" v-model="formPemohon.npwpNumber" placeholder="..." class="ml-3 border border-gray-300 rounded-md p-2.5 w-auto" />
          </div>
        </div>
      </div>

      <div class="mt-10 flex justify-center">
        <router-link :to="{ path: 'datapekerjaan', query: { id: route.query.id } }">
          <ButtonSubmit class="text-lg font-semibold font-sans text-gray-900" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';  
import InputText from '../components/InputText.vue';
import ButtonSubmit from '../components/ButtonSubmit.vue';
import InputRadio from '@/components/InputRadio.vue';
import { ref, watch, onMounted } from 'vue';

const route = useRoute();
const id = ref(route.query.id || route.params.id); 

const formPemohon = ref({
  statusPemohon: '',
  hubunganBpr: '',
  namaKtp: '',
  selectedGender: '',
  tempatTanggalLahir: '',
  selectedPendidikan: '',
  noKtp: {},
  selectedPerkawinan: '',
  jumlahTanggungan: '',
  selectedAgama: '',
  otherAgamaText: '',
  namaGadisIbuKandung: '',
  alamatTinggal: '',
  statusTempatTinggal: '',
  otherTempatTinggalText: '',
  teleponRumah: {},
  phoneNumber: '',
  npwpNumber: '',
  selectedNpwp: ''
});

const loadFormDataById = () => {
  const storedData = localStorage.getItem('dataArray');
  const dataArray = storedData ? JSON.parse(storedData) : [];

  const entry = dataArray.find((entry) => entry.id === id.value);

  if (entry && entry.formPemohon) {
    formPemohon.value = {
      ...formPemohon.value,
      ...entry.formPemohon
    };
  } else {
    console.log('Data tidak ditemukan untuk id:', id.value);
  }
};

onMounted(() => {
  loadFormDataById();
});

const saveFormDataById = (newData) => {
  const storedData = localStorage.getItem('dataArray');
  let dataArray = storedData ? JSON.parse(storedData) : [];

  const entryIndex = dataArray.findIndex((entry) => entry.id === id.value);

  if (entryIndex !== -1) {
    dataArray[entryIndex] = {
      ...dataArray[entryIndex],
      formPemohon: {
        ...dataArray[entryIndex].formPemohon,
        ...newData,
      }
    };
  } else {
    dataArray.push({
      id: id.value,
      formPemohon: newData
    });
  }

  localStorage.setItem('dataArray', JSON.stringify(dataArray));
};

watch(formPemohon, (newData) => {
  saveFormDataById(newData);
}, { deep: true });

const formatPhoneNumber = (e) => {
  let value = e.target.value.replace(/\D/g, '');
  if (!value.startsWith('62')) {
    value = '62' + value;
  }
  formPemohon.value.phoneNumber = '+' + value;
};

const noHp = [
  { label: 'No HP:', type: 'text', placeholder: '+62...' },
];

const radioStatus = [
  { label: 'Perorangan', value: 'Perorangan' },
  { label: 'PT', value: 'PT' },
  { label: 'Lainnya', value: 'Lainnya' },
];

const radioBpr = [
  { label: 'Pihak terkait', value: 'Pihak terkait' },
  { label: 'Pihak tidak terkait', value: 'Pihak tidak terkait' },
];

const radioGender = [
  { label: 'Pria', value: 'Pria' },
  { label: 'Wanita', value: 'Wanita' },
];

const radioPendidikan = [
  { label: 'SD', value: 'SD' },
  { label: 'SMP', value: 'SMP' },
  { label: 'SMA', value: 'SMA' },
  { label: 'D3', value: 'D3' },
  { label: 'S1', value: 'S1' },
];

const tempatTanggallahir = [
  { placeholder: '...' },
];

const namaKtp = [
  { placeholder: '...' },
];

const noKtp = [
  { label: 'No KTP / SIM:', type: 'number', placeholder: '...' },
  { label: 'Tanggal terbit:', type: 'date', placeholder: '...' },
  { label: 'Berlaku S/D:', type: 'date', placeholder: '...' },
];

const statusPerkawinan = [
  { label: 'Belum kawin', value: 'Belum kawin' },
  { label: 'Kawin', value: 'Kawin' },
  { label: 'Janda/Duda', value: 'Janda/Duda' },
];

const jumlahTanggungan = [
  { placeholder: '...' },
];

const alamatTinggal = [
  { label: 'Alamat:', type: 'text', placeholder: '...' },
];

const alamatTinggal3 = [
  { key: 'kota', label: 'Kota', type: 'text', placeholder: '...' },          
  { key: 'kodePos', label: 'Kode pos', type: 'text', placeholder: '...' },   
  { key: 'lamaTinggal', label: 'Lama tinggal di alamat ini', type: 'text', placeholder: '...' }
];


const teleponRumah = [
  { label: 'Telepon rumah:', type: 'text', placeholder: '...' },
];

</script>
