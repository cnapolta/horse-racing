<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/store'

const store = useStore()

const currentRound = computed(() => store.state.game.currentRound)
const totalRounds = computed(() => store.state.game.totalRounds)
const currentRace = computed(() => store.getters['races/currentRace'])
const countdown = computed(() => store.state.game.countdown)

function startNewGame() {
  store.dispatch('game/startNewGame')
}

function startRace() {
  store.commit('races/SET_RACE_STATUS', {
    raceId: currentRace.value?.id,
    status: 'inProgress',
  })
}
</script>

<template>
  <div class="game-header">
    <h2>Horse Racing Game</h2>
    <div class="game-info" v-if="currentRace">
      <p>Round {{ currentRound }} of {{ totalRounds }}</p>
      <p>Distance: {{ currentRace.distance }}m</p>
    </div>
    <div class="game-controls">
      <button @click="startNewGame" class="new-game-btn" :disabled="countdown > 0">New Game</button>
      <button v-if="currentRace?.status === 'pending'" @click="startRace" class="start-race-btn">
        Start Race
      </button>
    </div>
  </div>
</template>

<style scoped>
.game-header {
  text-align: center;
  margin-bottom: 30px;
}

.game-header h2 {
  color: #2c3e50;
  margin: 0 0 15px 0;
  font-size: 24px;
  font-weight: 600;
}

.game-info {
  margin: 15px 0;
  color: #2c3e50;
  font-weight: 500;
  font-size: 1.1em;
}

.game-info p {
  margin: 5px 0;
}

.game-controls {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 15px;
}

.new-game-btn {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.new-game-btn:hover:not(:disabled) {
  background-color: #45a049;
}

.new-game-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.start-race-btn {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.start-race-btn:hover {
  background-color: #1976d2;
}
</style>
