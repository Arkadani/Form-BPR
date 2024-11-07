<template>
    <button 
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl"
    >
      {{ label }}
    </button>
  </template>
  
  <script setup>
  const props = defineProps({
    label: {
      type: String,
      default: 'Submit',
    }
  });
  </script>
  