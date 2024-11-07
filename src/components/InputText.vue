<template>
    <div>
      <label :for="label" class="block text-lg font-semibold text-gray-900 mb-2">{{ label }}</label>
      <input
        :id="label"
        :type="type"
        :placeholder="placeholder"
        v-model="internalValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="shadow text-gray-900 text-lg rounded-lg w-full p-2.5"
      />
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    modelValue: String,
    label: String,
    type: String,
    placeholder: String
  });
  
  const emit = defineEmits(['update:modelValue']);
  
  const internalValue = computed({
    get() {
      return props.modelValue;
    },
    set(value) {
      emit('update:modelValue', value);
    }
  });
  </script>
  