import { createStore } from 'vuex'
import type { RootState } from '@/types'
import { game } from './modules/game'
import { horses } from './modules/horse'
import { races } from './modules/race'

export const store = createStore<RootState>({
  modules: {
    game,
    horses,
    races,
  },
  strict: false,
})

export function useStore() {
  return store
}
