<script setup lang="ts">
import type { Race } from '@/types'

defineProps<{
  race: Race
}>()
</script>

<template>
  <div class="race-container">
    <h3>Current Race</h3>
    <div class="race-info">
      <p>Selected Horses:</p>
      <div class="horses">
        <div v-for="horse in race.horses" :key="horse.id" class="participant">
          <span class="horse-emoji" :style="{ color: horse.color }">🐎</span>
          <span
            :style="{
              color: horse.color,
              fontWeight: 'bold',
              textShadow: '1px 1px 1px rgba(0,0,0,0.2)',
            }"
          >
            {{ horse.name }} ({{ horse.condition }})
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.race-container {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.race-container h3 {
  color: #2c3e50;
  margin: 0 0 15px 0;
  font-size: 24px;
  font-weight: 600;
}

.race-info {
  margin: 15px 0;
}

.race-info p {
  color: #2c3e50;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 10px;
}

.horses {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
  margin-top: 10px;
}

.participant {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  background: #f8f9fa;
  border-radius: 4px;
}

.horse-emoji {
  font-size: 24px;
  filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.2));
}
</style>
