<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
    <div class="modal bg-white p-8 rounded-lg shadow-lg">
      <p class="text-lg font-bold mb-4">¡Felicidades {{ userName }}! Gastate el juego.</p>
      <button
        @click="playAgain"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        Jugar otra vez
      </button>
    </div>
  </div>
</template>
<script setup>
import { defineEmits } from 'vue'

defineProps({
  userName: String
})

const emit = defineEmits(['play-again'])

const playAgain = () => {
  emit('play-again')
}
</script>
