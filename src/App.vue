<template>
  <div id="app">
    <UserNameModal v-if="!userName" @save-name="saveUserName" />
    <GameBoard v-else @game-won="handleGameWon" ref="gameBoardRef" />
    <WinModal v-if="gameWon" @play-again="resetGame" :userName="userName" />
  </div>
</template>
<script setup>
import { ref } from 'vue'
import UserNameModal from './components/UserNameModal.vue'
import GameBoard from './components/GameBoard.vue'
import WinModal from './components/WinModal.vue'

const userName = ref(localStorage.getItem('userName') || '')
const gameWon = ref(false)
const gameBoardRef = ref(null)

const saveUserName = (name) => {
  localStorage.setItem('userName', name)
  userName.value = name
}

const handleGameWon = () => {
  gameWon.value = true
}

const resetGame = () => {
  gameWon.value = false
  if (gameBoardRef.value) {
    gameBoardRef.value.resetBoard()
  }
}
</script>
