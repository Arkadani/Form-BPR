<template>
  <div class="flex flex-col w-full max-w-screen-lg mx-auto p-4">
    <FormPermohonan />
    <FormPemohon />
    <FormPekerjaan/>
    <FormSuamiistri/>
    <FormPenjaminan/>
    <FormKendaraan/>
    <FormTanah/>
    <FormBilyet/>
    <FormInformasi/>
    <FormReferensi/>
    <FormDenah/>
    <div class="mt-10 flex justify-center">
      <router-link to="/">
        <ButtonSubmit label="Go home" class="text-lg font-semibold font-sans text-gray-900" />
      </router-link>
    </div>
  </div>
</template>

<script setup>
import FormPermohonan from '../components/FormPermohonan.vue';
import FormPemohon from '../components/FormPemohon.vue';
import FormPekerjaan from '../components/FormPekerjaan.vue';
import FormSuamiistri from '../components/FormSuamiistri.vue';
import FormPenjaminan from '../components/FormPenjaminan.vue';
import FormKendaraan from '../components/FormKendaraan.vue';
import FormTanah from '../components/FormTanah.vue';
import FormBilyet from '../components/FormBilyet.vue';
import FormInformasi from '../components/FormInformasi.vue';
import FormReferensi from '../components/FormReferensi.vue';
import FormDenah from '../components/FormDenah.vue';
import ButtonSubmit from '../components/ButtonSubmit.vue';
</script>
