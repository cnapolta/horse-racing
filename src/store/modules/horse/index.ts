import type { Module } from 'vuex'
import type { HorsesState, RootState } from '@/types'
import { generateHorses } from '@/utils/horse/generator'

export const horses: Module<HorsesState, RootState> = {
  namespaced: true,

  state: () => ({
    availableHorses: [],
  }),

  mutations: {
    SET_HORSES(state, horses) {
      state.availableHorses = horses
    },
  },

  actions: {
    generateHorses({ commit }) {
      const horses = generateHorses()
      commit('SET_HORSES', horses)
    },
  },

  getters: {
    allHorses: (state) => state.availableHorses,
  },
}
