<template>
  <div class="flex flex-col w-full max-w-screen-lg mx-auto p-4">
    <div class="block text-5xl font-bold text-gray-900 mt-5 mb-8 text-center">
      <h1>Permohonan Pembiayaan</h1>
    </div>

    <div class="w-full max-w-screen-lg mx-auto">
      <div class="flex flex-col gap-4">

        <InputRadio
          :title="'Pengajuan'"
          :radioOptions="radioList"
          v-model="formPermohonan.pengajuan"
          :otherText="formPermohonan.otherPengajuanText"
          @update:otherText="formPermohonan.otherPengajuanText = $event"
        />

        <div>
          <label for="jumlahyangdiajukan" class="block text-lg font-semibold font-sans text-gray-900 mb-2">Jumlah Yang Diajukan:</label>
          <input v-model="formPermohonan.rpInput" @input="onInput" placeholder="..." type="text" class="shadow text-gray-900 text-lg rounded-lg w-full p-2.5" />
        </div>

        <div>
          <label for="jangkaWaktu" class="block text-lg font-semibold font-sans text-gray-900 mb-2">Jangka Waktu:</label>
          <input v-model="formPermohonan.jangkaWaktu" @input="onJangkaWaktuInput" placeholder="..." type="text" class="shadow text-gray-900 text-lg rounded-lg w-full p-2.5" />
        </div>

        <div v-for="(form, index) in formJumlahajuan" :key="index" class="w-full">
          <InputText :label="form.label" :type="form.type" :placeholder="form.placeholder" v-model="formPermohonan[form.key]" />
        </div>

        <InputRadio
          :title="'Tujuan Penggunaan'"
          :radioOptions="radioOptions"
          v-model="formPermohonan.tujuanPenggunaan"
          :otherText="formPermohonan.otherTujuanText"
          @update:otherText="formPermohonan.otherTujuanText = $event"
        />

        <InputRadio
          :title="'Cara Pembayaran'"
          :radioOptions="radioPembayaran"
          v-model="formPermohonan.caraPembayaran"
        />

        <InputRadio
          :title="'Jenis Angsuran'"
          :radioOptions="radioAngsuran"
          v-model="formPermohonan.jenisAngsuran"
        />

        <div class="mt-10 flex justify-center">
          <router-link :to="{ path: 'datapemohon', query: { id: route.query.id } }" >
            <ButtonSubmit class="text-lg font-semibold font-sans text-gray-900" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import InputText from '../components/InputText.vue';
import InputRadio from '../components/InputRadio.vue';
import ButtonSubmit from '../components/ButtonSubmit.vue';
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = ref(route.query.id); 

const formPermohonan = ref({
  pengajuan: '',
  otherPengajuanText: '',  
  rpInput: '',
  jangkaWaktu: '',
  tujuanPenggunaan: '',
  otherTujuanText: '',  
  caraPembayaran: '',
  jenisAngsuran: '',
  jenisKredit: ''
});

const formJumlahajuan = [
  { label: 'Jenis Kredit:', key: 'jenisKredit', type: 'text', placeholder: '...' }  
];

const radioOptions = [
  { label: 'Modal kerja', value: 'modalkerja' },
  { label: 'Investasi', value: 'investasi' },
  { label: 'Konsumsi', value: 'konsumsi' },
  { label: 'Lainnya', value: 'lainnya' }
];

const radioList = [
  { label: 'Baru', value: 'Baru' },
  { label: 'RO', value: 'RO' },
  { label: 'Lainnya', value: 'lainnya' }
];

const radioAngsuran = [
  { label: 'Arrear', value: 'Arrear' },
  { label: 'Advance', value: 'Advance' }
];

const radioPembayaran = [
  { label: 'Diangsur', value: 'Diangsur' },
  { label: 'Sekaligus', value: 'Sekaligus' }
];

const onInput = (e) => {
  formPermohonan.value.rpInput = formatRupiah(e.target.value);
};

const onJangkaWaktuInput = (e) => {
  const cleanedValue = e.target.value.replace(/\D/g, '');  
  formPermohonan.value.jangkaWaktu = cleanedValue ? `${cleanedValue} bulan` : '';
};

const formatRupiah = (value) => {
  const numberString = value.replace(/\D/g, '');
  const sisa = numberString.length % 3;
  let rupiah = numberString.substr(0, sisa);
  const ribuan = numberString.substr(sisa).match(/\d{3}/g);

  if (ribuan) {
    const separator = sisa ? '.' : '';
    rupiah += separator + ribuan.join('.');
  }

  return rupiah ? `Rp ${rupiah}` : '';
};

const saveFormDataById = (newData) => {
  const storedData = localStorage.getItem('dataArray');
  let dataArray = storedData ? JSON.parse(storedData) : [];

  const entryIndex = dataArray.findIndex((entry) => entry.id === id.value);

  if (entryIndex !== -1) {
    dataArray[entryIndex] = {
      ...dataArray[entryIndex],
      formPermohonan: {
        ...dataArray[entryIndex].formPermohonan,
        ...newData,
      }
    };
  } else {
    dataArray.push({
      id: id.value,
      formPermohonan: newData
    });
  }

  localStorage.setItem('dataArray', JSON.stringify(dataArray));
};

const loadFormDataById = () => {
  const storedData = localStorage.getItem('dataArray');
  const dataArray = storedData ? JSON.parse(storedData) : [];
  
  const entry = dataArray.find((entry) => entry.id === id.value);

  if (entry && entry.formPermohonan) {
    formPermohonan.value = {
      ...formPermohonan.value,
      ...entry.formPermohonan,
      rpInput: entry.formPermohonan.rpInput ? formatRupiah(entry.formPermohonan.rpInput) : '',
      jangkaWaktu: entry.formPermohonan.jangkaWaktu ? `${entry.formPermohonan.jangkaWaktu} bulan` : ''
    };
  }
};
watch
watch(formPermohonan, () => {
  saveFormDataById(formPermohonan.value);
}, { deep: true });

onMounted(() => {
  loadFormDataById();
});
</script>
