<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/store'
import RaceTrack from '@/components/game/race/RaceTrack.vue'
import HorsesList from '@/components/game/horse/HorsesList.vue'
import RaceResults from '@/components/game/race/RaceResults.vue'
import CurrentRaceInfo from '@/components/game/race/CurrentRaceInfo.vue'
import GameControl from '@/components/game/control/GameControl.vue'

const store = useStore()

const currentRace = computed(() => store.getters['races/currentRace'])
const availableHorses = computed(() => store.state.horses.availableHorses)
const raceKey = computed(() => store.state.races.raceKey)
const hasRaces = computed(() => store.state.races.races.length > 0)

function onRaceComplete(results: { horseId: string; finishTime: number }[]) {
  store.dispatch('races/updateRaceResults', results)
  store.dispatch('game/advanceRound')
}
</script>

<template>
  <div class="game-container">
    <GameControl />

    <div class="game-content">
      <HorsesList :horses="availableHorses" v-if="availableHorses.length > 0" />

      <div class="game-main-content">
        <RaceResults v-if="hasRaces" />

        <div class="race-section">
          <RaceTrack
            v-if="currentRace"
            :key="raceKey"
            :horses="currentRace.horses"
            :distance="currentRace.distance"
            :is-racing="currentRace.status === 'inProgress'"
            @race-complete="onRaceComplete"
          />
        </div>

        <CurrentRaceInfo v-if="currentRace" :race="currentRace" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.game-container {
  padding: 20px;
  max-width: 1440px;
  margin: 0 auto;
}

.game-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.game-main-content {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 20px;
  align-items: start;
}

.race-section {
  min-width: 0;
  order: 2;
}

.all-rounds-results {
  order: 1;
}

.race-container {
  order: 3;
}

@media (max-width: 1024px) {
  .game-main-content {
    grid-template-columns: 1fr;
  }

  .race-section {
    order: 1;
  }

  .all-rounds-results {
    order: 2;
  }

  .race-container {
    order: 3;
  }
}

@media (max-width: 1024px) {
  .game-content {
    grid-template-columns: 1fr;
  }
}

.race-section {
  min-width: 0;
}
</style>
