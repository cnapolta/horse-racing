<script setup lang="ts">
import type { Horse } from '@/types'

defineProps<{
  horses: Horse[]
}>()
</script>

<template>
  <div class="horses-list">
    <h3>Available Horses</h3>
    <div class="horse-grid">
      <div v-for="horse in horses" :key="horse.id" class="horse-card">
        <span class="horse-emoji" :style="{ color: horse.color }">🐎</span>
        <span
          class="horse-name"
          :style="{
            color: horse.color,
            fontWeight: 'bold',
            textShadow: '1px 1px 1px rgba(0,0,0,0.2)',
          }"
        >
          {{ horse.name }}
        </span>
        <span class="horse-score">Score: {{ horse.condition }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.horses-list {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
}

.horse-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 10px;
  margin-top: 10px;
  max-height: 200px;
  overflow-y: auto;
}

.horse-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.horse-emoji {
  font-size: 24px;
  filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.2));
}

.horse-name {
  font-weight: 500;
}

.horse-score {
  margin-left: auto;
  color: #666;
}
</style>
