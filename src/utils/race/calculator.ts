import { GAME_CONSTANTS } from '../../constants/game.constants'

export function calculateHorseSpeed(condition: number): number {
  const conditionFactor = (condition * 0.6 + 40) / 100
  const speedVariation = Math.random() * 0.1 + 0.95
  return GAME_CONSTANTS.BASE_SPEED * conditionFactor * speedVariation
}

export function calculateRaceProgress(
  currentTime: number,
  speed: number,
  distance: number,
): number {
  return Math.min((speed * currentTime * 100) / distance, 90)
}
