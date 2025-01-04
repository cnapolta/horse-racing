export interface GameState {
  currentRound: number
  totalRounds: number
  gameStatus: 'idle' | 'inProgress' | 'finished'
  isRacing: boolean
  countdown: number
}

export const ROUND_DISTANCES = {
  1: 1200,
  2: 1400,
  3: 1600,
  4: 1800,
  5: 2000,
  6: 2200,
} as const
export type RoundNumber = keyof typeof ROUND_DISTANCES
