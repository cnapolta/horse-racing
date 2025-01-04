import type { GameState } from './game.types'
import type { Horse } from './horse.types'
import type { Race } from './race.types'

export interface HorsesState {
  availableHorses: Horse[]
}

export interface RacesState {
  races: Race[]
  raceKey: number
}

export interface RootState {
  game: GameState
  horses: HorsesState
  races: RacesState
}
