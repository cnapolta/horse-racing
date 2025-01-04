import type { Module } from 'vuex'
import type { GameState, RootState } from '@/types'

export const game: Module<GameState, RootState> = {
  namespaced: true,

  state: () => ({
    currentRound: 1,
    totalRounds: 6,
    gameStatus: 'idle',
    isRacing: false,
    countdown: 0,
  }),

  mutations: {
    SET_CURRENT_ROUND(state, round: number) {
      state.currentRound = round
    },
    SET_GAME_STATUS(state, status: 'idle' | 'inProgress' | 'finished') {
      state.gameStatus = status
    },
    SET_COUNTDOWN(state, value: number) {
      state.countdown = value
    },
    RESET_GAME(state) {
      state.currentRound = 1
      state.gameStatus = 'inProgress'
      state.countdown = 0
    },
  },

  actions: {
    startNewGame({ commit, dispatch }) {
      commit('RESET_GAME')
      commit('races/RESET_RACES', null, { root: true })
      dispatch('horses/generateHorses', null, { root: true })
      dispatch('races/createNextRace', null, { root: true })
    },

    advanceRound({ commit, state, dispatch }) {
      if (state.currentRound < state.totalRounds) {
        commit('SET_CURRENT_ROUND', state.currentRound + 1)
        dispatch('races/createNextRace', null, { root: true })
      } else {
        commit('SET_GAME_STATUS', 'finished')
      }
    },
  },
}
