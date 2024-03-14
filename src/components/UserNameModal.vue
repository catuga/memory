<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
    <div class="modal bg-white p-8 rounded-lg shadow-lg">
      <input
        type="text"
        v-model="name"
        placeholder="Ingresa tu nombre"
        class="input border border-gray-300 p-2 rounded w-full"
      />
      <button
        @click="submitName"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Enviar
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const name = ref('')
const emit = defineEmits(['save-name'])

const submitName = () => {
  if (name.value.trim()) {
    emit('save-name', name.value)
  }
}
</script>
