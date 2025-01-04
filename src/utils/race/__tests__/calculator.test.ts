import { describe, it, expect } from 'vitest'
import { calculateHorseSpeed, calculateRaceProgress } from '../calculator'
import { GAME_CONSTANTS } from '../../../constants/game.constants'

describe('Race Calculator', () => {
  describe('calculateHorseSpeed', () => {
    it('should calculate speed based on condition', () => {
      const speed1 = calculateHorseSpeed(100)
      const speed2 = calculateHorseSpeed(50)
      const speed3 = calculateHorseSpeed(1)
      expect(speed1).toBeGreaterThan(speed2)
      expect(speed2).toBeGreaterThan(speed3)
    })

    it('should return speed within reasonable range', () => {
      const condition = 75
      const speed = calculateHorseSpeed(condition)

      const minExpectedSpeed = GAME_CONSTANTS.BASE_SPEED * 0.4
      const maxExpectedSpeed = GAME_CONSTANTS.BASE_SPEED * 1.1

      expect(speed).toBeGreaterThan(minExpectedSpeed)
      expect(speed).toBeLessThan(maxExpectedSpeed)
    })
  })

  describe('calculateRaceProgress', () => {
    it('should calculate correct progress percentage', () => {
      const currentTime = 5
      const speed = 10
      const distance = 100

      const progress = calculateRaceProgress(currentTime, speed, distance)

      expect(progress).toBe(50)
    })

    it('should not exceed 90% progress', () => {
      const currentTime = 20
      const speed = 100
      const distance = 100

      const progress = calculateRaceProgress(currentTime, speed, distance)
      expect(progress).toBe(90)
    })

    it('should handle zero distance', () => {
      const progress = calculateRaceProgress(5, 10, 0)
      expect(progress).toBe(90)
    })

    it('should handle zero time', () => {
      const progress = calculateRaceProgress(0, 10, 100)
      expect(progress).toBe(0)
    })
  })
})
