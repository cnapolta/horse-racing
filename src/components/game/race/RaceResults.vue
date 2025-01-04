<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/store'

const store = useStore()
const races = computed(() => store.state.races.races)
const currentRound = computed(() => store.state.game.currentRound)

const sortedRaces = computed(() => [...races.value].reverse())
</script>

<template>
  <div class="all-rounds-results">
    <h3>All Rounds Results</h3>
    <div class="rounds-grid">
      <div
        v-for="race in sortedRaces"
        :key="race.id"
        class="round-card"
        :class="{ 'current-round': race.roundNumber === currentRound }"
      >
        <div class="round-header">
          <h4>Round {{ race.roundNumber }}</h4>
          <span class="distance">{{ race.distance }}m</span>
        </div>
        <div class="round-status" v-if="race.status !== 'completed'">
          {{ race.status === 'pending' ? 'Waiting to Start' : 'Race in Progress' }}
        </div>
        <div class="round-results" v-else>
          <div
            v-for="result in race.results"
            :key="result.horseId"
            class="round-result-item"
            :class="{ 'top-three': result.position && result.position <= 3 }"
          >
            <span class="position">{{ result.position }}</span>
            <span
              class="horse-name"
              :style="{
                color: race.horses.find((h) => h.id === result.horseId)?.color,
                fontWeight: 'bold',
                textShadow: '1px 1px 1px rgba(0,0,0,0.2)',
              }"
            >
              {{ race.horses.find((h) => h.id === result.horseId)?.name }}
            </span>
            <span class="finish-time">{{ result.finishTime.toFixed(2) }}s</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.all-rounds-results {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.rounds-grid {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 15px;
  max-height: 600px;
  overflow-y: auto;
}

.round-card {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 15px;
  border: 1px solid #e9ecef;
}

.current-round {
  border: 2px solid #2196f3;
  background: #e3f2fd;
}

.round-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #dee2e6;
}

.round-header h4 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.1em;
}

.distance {
  color: #666;
  font-weight: 500;
}

.round-status {
  color: #666;
  font-style: italic;
  text-align: center;
  padding: 10px;
}

.round-results {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.round-result-item {
  display: grid;
  grid-template-columns: 30px 1fr 80px;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-radius: 4px;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.top-three {
  font-weight: 600;
  background: #fff8e1;
  border: 1px solid rgba(245, 127, 23, 0.2);
}

.top-three .position {
  color: #f57f17;
  font-size: 1.1em;
}

.position {
  font-weight: 600;
  color: #666;
}

.horse-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.finish-time {
  text-align: right;
  color: #666;
}

.all-rounds-results h3 {
  color: #2c3e50;
  margin: 0 0 15px 0;
  font-size: 24px;
  font-weight: 600;
}
</style>
