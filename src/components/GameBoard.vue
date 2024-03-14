<template>
  <div class="container mx-auto max-h-screen overflow-hidden flex flex-col">
    <div class="p-4 flex flex-col flex-grow">
      <div class="flex justify-between items-center mb-4 shrink-0">
        <h1 class="text-xl lg:text-2xl font-bold">Juego de Memoria</h1>
        <div v-if="!gameStarted" class="flex justify-center items-center">
          <h2 class="text-center font-bold">
            Memoriza las cartas, el juego comenzará en:
            <span class="text-red-500">{{ countdown }}</span>
          </h2>
        </div>
        <div class="bg-green-100 text-green-800 p-2 rounded-lg">
          <span class="font-bold">Errores: {{ score.misses }}</span> -
          <span class="font-bold">Aciertos: {{ score.hits }}</span>
        </div>
      </div>
      <div class="grid grid-cols-5 gap-4 my-4 flex-grow">
        <div
          v-for="(card, index) in cards"
          :key="index"
          class="card bg-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105"
        >
          <div class="relative w-full pb-[56.25%]">
            <img
              v-if="card.flipped"
              :src="card.image"
              alt="Animal"
              class="absolute top-0 left-0 w-full h-full object-cover"
            />
            <div
              v-else
              @click="flipCard(index)"
              :class="{ 'cursor-pointer': !card.flipped }"
              class="absolute inset-0 flex justify-center items-center p-3"
            >
              <img alt="Signo de pregunta" :src="questionMarkImage" class="max-h-full max-v-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import questionMarkImage from '@/assets/images/question-mark.png'

const cards = ref([])
const score = ref({ hits: 0, misses: 0 })
const gameStarted = ref(false)
const countdown = ref(5)
const emit = defineEmits(['game-won'])
let cardToCheck = null
let lockBoard = false

const fetchCards = async () => {
  try {
    const response = await axios.get(
      'https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=10'
    )
    const fetchedCards = response.data.entries.map((entry, index) => ({
      id: index,
      image: entry.fields.image.url,
      flipped: false,
      matched: false
    }))
    const duplicatedCards = fetchedCards.map((card, index) => ({
      ...card,
      id: fetchedCards.length + index
    }))
    cards.value = shuffleCards([...fetchedCards, ...duplicatedCards])
  } catch (error) {
    console.error(error)
  }
}

const shuffleCards = (cards) => {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[cards[i], cards[j]] = [cards[j], cards[i]]
  }
  return cards
}

const flipCard = (index) => {
  if (lockBoard || cards.value[index].flipped) return
  const card = cards.value[index]

  if (card.matched) {
    return
  }

  card.flipped = true

  if (!cardToCheck) {
    cardToCheck = card
  } else {
    if (cardToCheck.image === card.image && cardToCheck.id !== card.id) {
      card.matched = true
      cardToCheck.matched = true
      score.value.hits++
      cardToCheck = null

      checkForWin()
    } else {
      lockBoard = true
      setTimeout(() => {
        card.flipped = false
        cardToCheck.flipped = false
        cardToCheck = null
        score.value.misses++
        lockBoard = false
      }, 1000)
    }
  }
}

const countdownInterval = () => {
  const interval = setInterval(() => {
    countdown.value--
    if (countdown.value === 0) {
      clearInterval(interval)
      gameStarted.value = true
      cards.value.forEach((card) => (card.flipped = false))
    }
  }, 1000)
}

const checkForWin = () => {
  const allMatched = cards.value.every((card) => card.matched)
  if (allMatched) {
    emit('game-won')
  }
}

const resetBoard = async () => {
  score.value = { hits: 0, misses: 0 }
  gameStarted.value = false
  countdown.value = 5
  await fetchCards()

  startGame()
}

const startGame = () => {
  gameStarted.value = false
  countdown.value = 5

  setTimeout(() => {
    cards.value.forEach((card) => (card.flipped = true))
    setTimeout(() => {
      countdownInterval()
    }, 1000)
  }, 0)
}

onMounted(async () => {
  await fetchCards()
  cards.value.forEach((card) => (card.flipped = true))

  setTimeout(() => {
    countdownInterval()
  }, 1000)
})

defineExpose({
  resetBoard
})
</script>
