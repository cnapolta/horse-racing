import { v4 as uuidv4 } from 'uuid'
import type { Horse } from '../../types'
import { getUniqueHorseColor } from './colors'

const HORSE_NAMES = [
  'Thunder Bolt',
  'Star Gazer',
  'Wind Runner',
  'Silver Storm',
  'Golden Arrow',
  'Moon Beam',
  'Swift Shadow',
  'Royal Spirit',
  'Lightning Flash',
  'Mountain Echo',
  'Desert Wind',
  'Ocean Wave',
  'Night Rider',
  'Dawn Breaker',
  'Storm Chaser',
  'Fire Spirit',
  'Cloud Dancer',
  'Sun Runner',
  'River Rush',
  'Sky Walker',
]

export function generateHorses(): Horse[] {
  return HORSE_NAMES.map((name, index) => ({
    id: uuidv4(),
    name,
    color: getUniqueHorseColor(index),
    condition: Math.floor(Math.random() * 100) + 1,
  }))
}

export function selectRandomHorses(horses: Horse[], count: number): Horse[] {
  const shuffled = [...horses].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}
