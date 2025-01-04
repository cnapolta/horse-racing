<template>
  <div class="race-track-container">
    <div v-if="countdown > 0" class="race-results">
      <div class="countdown">
        <template v-if="currentRound === totalRounds">Game finished!</template>
        <template v-else>New round starts in {{ countdown }} seconds...</template>
      </div>
      <div class="results-list">
        <h3>Race Results</h3>
        <div v-for="(result, index) in sortedResults" :key="result.horseId" class="result-item">
          <span class="position">{{ index + 1 }}.</span>
          <span class="horse-name" :style="{ color: getHorseById(result.horseId)?.color }">
            {{ getHorseById(result.horseId)?.name }}
          </span>
          <span class="finish-time">{{ result.finishTime.toFixed(2) }}s</span>
        </div>
      </div>
    </div>
    <div class="race-track">
      <div class="finish-line"></div>
      <div v-for="horse in horses" :key="horse.id" class="horse-lane">
        <div
          class="horse-trail"
          :style="{
            color: horse.color,
            width: `${Math.min(getHorsePosition(horse.id), 90)}%`,
          }"
        ></div>
        <div
          class="horse"
          :style="{
            color: horse.color,
            left: `${Math.min(getHorsePosition(horse.id), 90)}%`,
          }"
        >
          <div class="horse-name-fixed" :title="horse.name">
            <span :style="{ color: horse.color, fontWeight: 'bold' }">{{ horse.name }}</span>
          </div>
          🐎
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import type { Horse } from '@/types'
import { useStore } from '@/store'

const props = defineProps<{
  horses: Horse[]
  distance: number
  isRacing: boolean
}>()

const emit = defineEmits<{
  (e: 'race-complete', results: { horseId: string; finishTime: number }[]): void
}>()

const store = useStore()

const horsePositions = ref<Map<string, number>>(new Map())
const raceStartTime = ref<number>(0)
const animationFrame = ref<number | null>(null)
const horseSpeeds = ref<Map<string, number>>(new Map())
const finishResults = ref<Map<string, number>>(new Map())
const countdown = computed(() => store.state.game.countdown)
const currentRound = computed(() => store.state.game.currentRound)
const totalRounds = computed(() => store.state.game.totalRounds)

const sortedResults = computed(() => {
  return Array.from(finishResults.value.entries())
    .map(([horseId, finishTime]) => ({
      horseId,
      finishTime,
    }))
    .sort((a, b) => a.finishTime - b.finishTime)
})

function getHorsePosition(horseId: string): number {
  return horsePositions.value.get(horseId) || 0
}

function calculateInitialSpeeds() {
  const speedMultiplier = 2.5
  props.horses.forEach((horse) => {
    const speed = (20 + horse.condition) * speedMultiplier
    horseSpeeds.value.set(horse.id, speed)
  })
}

function startCountdown() {
  store.commit('game/SET_COUNTDOWN', 5)
  const timer = setInterval(() => {
    store.commit('game/SET_COUNTDOWN', store.state.game.countdown - 1)
    if (store.state.game.countdown <= 0) {
      clearInterval(timer)
    }
  }, 1000)
}

function updateHorsePositions(timestamp: number) {
  if (!raceStartTime.value) {
    raceStartTime.value = timestamp
  }

  const currentTime = (timestamp - raceStartTime.value) / 1000
  let allFinished = true

  props.horses.forEach((horse) => {
    const speed = horseSpeeds.value.get(horse.id) || 0
    const position = (speed * currentTime * 100) / props.distance
    const clampedPosition = Math.min(position, 90)
    horsePositions.value.set(horse.id, clampedPosition)

    if (position >= 90) {
      if (!finishResults.value.has(horse.id)) {
        finishResults.value.set(horse.id, currentTime)
      }
    } else {
      allFinished = false
    }
  })

  if (allFinished) {
    if (animationFrame.value !== null) {
      cancelAnimationFrame(animationFrame.value)
      animationFrame.value = null
    }
    const results = Array.from(finishResults.value.entries()).map(([horseId, finishTime]) => ({
      horseId,
      finishTime,
    }))
    startCountdown()
    setTimeout(() => {
      emit('race-complete', results)
    }, 5000)
  } else {
    animationFrame.value = requestAnimationFrame(updateHorsePositions)
  }
}

function getHorseById(id: string): Horse | undefined {
  return props.horses.find((horse) => horse.id === id)
}

watch(
  () => props.isRacing,
  (newValue) => {
    if (newValue) {
      horsePositions.value.clear()
      horseSpeeds.value.clear()
      finishResults.value.clear()
      calculateInitialSpeeds()
      raceStartTime.value = 0
      if (animationFrame.value !== null) {
        cancelAnimationFrame(animationFrame.value)
      }
      animationFrame.value = requestAnimationFrame(updateHorsePositions)
    } else if (animationFrame.value !== null) {
      cancelAnimationFrame(animationFrame.value)
      animationFrame.value = null
    }
  },
)

onMounted(() => {
  props.horses.forEach((horse) => {
    horsePositions.value.set(horse.id, 0)
  })
})
</script>

<style scoped>
.race-track-container {
  position: relative;
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.countdown {
  text-align: center;
  padding: 10px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  font-weight: bold;
  border-radius: 8px;
  margin-bottom: 10px;
}

.race-track {
  position: relative;
  width: 100%;
  height: 560px;
  background: #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #ddd;
  padding-top: 12px;
}

.horse-lane {
  position: relative;
  height: 50px;
  margin: 5px 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.horse-lane:last-child {
  border-bottom: none;
}

.horse-name-fixed {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  background: rgba(255, 255, 255, 0.8);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  z-index: 2;
  cursor: help;
}

.horse-trail {
  position: absolute;
  height: 30px;
  left: 0;
  background-color: currentColor;
  opacity: 0.5;
}

.horse {
  position: absolute;
  left: 0;
  display: flex;
  align-items: center;
  font-size: 24px;
  transform: translateZ(0);
  will-change: left;
}

.finish-line {
  position: absolute;
  right: 50px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #000;
  z-index: 1;
}

.race-results {
  margin-bottom: 20px;
}

.results-list {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  padding: 15px;
  margin-top: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.results-list h3 {
  color: #2c3e50;
  margin: 0 0 15px 0;
  font-size: 24px;
  font-weight: 600;
}

.result-item {
  display: flex;
  align-items: center;
  padding: 5px 0;
  gap: 10px;
  font-size: 14px;
}

.position {
  font-weight: bold;
  min-width: 30px;
  color: #333;
  font-size: 14px;
}

.horse-name {
  font-weight: bold;
  flex: 1;
}

.finish-time {
  color: #666;
  font-family: monospace;
  font-size: 14px;
}
</style>
