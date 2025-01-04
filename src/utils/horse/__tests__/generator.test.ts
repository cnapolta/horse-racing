import { describe, it, expect } from 'vitest'
import { generateHorses, selectRandomHorses } from '../generator'

describe('Horse Generator', () => {
  describe('generateHorses', () => {
    it('should generate 20 horses', () => {
      const horses = generateHorses()
      expect(horses).toHaveLength(20)
    })

    it('should generate horses with valid properties', () => {
      const horses = generateHorses()
      const horse = horses[0]

      expect(horse).toHaveProperty('id')
      expect(horse).toHaveProperty('name')
      expect(horse).toHaveProperty('color')
      expect(horse).toHaveProperty('condition')
      expect(horse.condition).toBeGreaterThanOrEqual(1)
      expect(horse.condition).toBeLessThanOrEqual(100)
    })

    it('should generate horses with unique IDs', () => {
      const horses = generateHorses()
      const ids = horses.map((h) => h.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(horses.length)
    })
  })

  describe('selectRandomHorses', () => {
    it('should select specified number of horses', () => {
      const horses = generateHorses()
      const selected = selectRandomHorses(horses, 5)
      expect(selected).toHaveLength(5)
    })

    it('should return empty array if count is 0', () => {
      const horses = generateHorses()
      const selected = selectRandomHorses(horses, 0)
      expect(selected).toHaveLength(0)
    })

    it('should return all horses if count exceeds array length', () => {
      const horses = generateHorses()
      const selected = selectRandomHorses(horses, 25)
      expect(selected).toHaveLength(horses.length)
    })

    it('should return random subset of horses', () => {
      const horses = generateHorses()
      const selected1 = selectRandomHorses(horses, 5)
      const selected2 = selectRandomHorses(horses, 5)

      expect(selected1.every((h1) => selected2.some((h2) => h2.id === h1.id))).toBeFalsy()
    })
  })
})
