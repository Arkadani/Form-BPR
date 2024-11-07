<template>
  <div class="grid grid-cols-1 md:grid-cols-2 p-6 gap-4 mb-5">
    <div v-for="(field, key) in form" :key="key" class="w-full">
      <label :for="key" class="block text-lg font-bold font-sans text-gray-900 mb-2">{{ key }}</label>
      <input
        v-model="form[key]"
        :type="fieldType(key)"
        :placeholder="getPlaceholder(key)"
        class="w-full text-lg font-sans text-gray-900 p-2.5 rounded-lg border border-gray-300"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { toRefs } from 'vue';

const props = defineProps({
  modelValue: Object
});

const emit = defineEmits(['update:modelValue']);

const { modelValue } = toRefs(props);

const form = computed({
  get() {
    return modelValue.value;
  },
  set(newValue) {
    emit('update:modelValue', newValue);
  }
});

const fieldType = (key) => {
  return key === 'tahun' || key === 'nilaiJaminan' ? 'number' : 'text';
};

const getPlaceholder = (key) => {
  return key === 'tahun' ? '...' : '...';
};
</script>
