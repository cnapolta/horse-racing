import type { Module } from 'vuex'
import type { RacesState, RootState, Race, RaceResult } from '@/types'
import { selectRandomHorses } from '@/utils/horse/generator'
import { createRace } from '@/utils/race/generator'
import { ROUND_DISTANCES } from '@/types'

export const races: Module<RacesState, RootState> = {
  namespaced: true,

  state: () => ({
    races: [],
    raceKey: 0,
  }),

  mutations: {
    ADD_RACE(state, race: Race) {
      state.races.push(race)
      state.raceKey++
    },
    SET_RACE_STATUS(state, { raceId, status }: { raceId: string; status: Race['status'] }) {
      const race = state.races.find((r) => r.id === raceId)
      if (race) {
        race.status = status
      }
    },
    UPDATE_RACE_RESULTS(state, { raceId, results }: { raceId: string; results: RaceResult[] }) {
      const race = state.races.find((r) => r.id === raceId)
      if (race) {
        race.results = results
        race.status = 'completed'
      }
    },
    RESET_RACES(state) {
      state.races = []
      state.raceKey = 0
    },
  },

  actions: {
    createNextRace({ commit, rootState }) {
      const currentRound = rootState.game.currentRound
      const distance = ROUND_DISTANCES[currentRound as keyof typeof ROUND_DISTANCES]
      const horses = selectRandomHorses(rootState.horses.availableHorses, 10)

      const race = createRace(currentRound, distance, horses)
      race.status = 'pending'
      commit('ADD_RACE', race)
    },

    updateRaceResults({ commit, getters }, results: { horseId: string; finishTime: number }[]) {
      const currentRace = getters.currentRace
      if (!currentRace) return

      const sortedResults = [...results].sort((a, b) => a.finishTime - b.finishTime)
      const resultsWithPositions = sortedResults.map((result, index) => ({
        ...result,
        position: index + 1,
      }))

      commit('UPDATE_RACE_RESULTS', {
        raceId: currentRace.id,
        results: resultsWithPositions,
      })
    },
  },

  getters: {
    currentRace: (state, _, rootState) => {
      return state.races.find((race) => race.roundNumber === rootState.game.currentRound)
    },
  },
}
