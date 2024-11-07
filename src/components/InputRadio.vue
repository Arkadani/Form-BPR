<template>
  <div class="mb-4">
    <div class="block text-lg font-semibold font-sans text-gray-900 mb-3">
      {{ title }}:
    </div>

    <div class="flex flex-col gap-2">
      <div v-for="(option, index) in radioOptions" :key="index" class="flex items-center gap-2">
        <input
          :id="option.value"
          type="radio"
          :value="option.value"
          v-model="internalValue"
          @change="$emit('update:modelValue', $event.target.value)"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
        />
        <label :for="option.value" class="text-base font-normal text-gray-700">
          {{ option.label }}
        </label>
      </div>

      <div v-if="internalValue === 'lainnya'" class="mt-2">
        <input
          type="text"
          v-model="otherText"
          @input="$emit('update:otherText', otherText)"
          placeholder="Masukkan pilihan lain"
          class="border border-gray-300 rounded-md p-2.5 w-full"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  modelValue: String,
  otherText: String,
  title: String,
  radioOptions: Array
});

const emit = defineEmits(['update:modelValue', 'update:otherText']);

const internalValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
    if (value !== 'lainnya') {
      emit('update:otherText', '');
    }
  }
});

const otherText = ref(props.otherText || '');

watch(() => props.otherText, (newVal) => {
  otherText.value = newVal || '';
});
</script>
