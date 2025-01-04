import type { Horse } from './horse.types'

export interface RaceProgress {
  horseId: string
  position: number
  speed: number
  finishTime?: number
}

export interface RaceResult {
  horseId: string
  finishTime: number
  position?: number
}

export interface Race {
  id: string
  roundNumber: number
  distance: number
  horses: Horse[]
  status: 'pending' | 'inProgress' | 'completed'
  results: RaceResult[]
}
