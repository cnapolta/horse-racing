import { v4 as uuidv4 } from 'uuid'
import type { Race, Horse } from '../../types'

export function createRace(roundNumber: number, distance: number, horses: Horse[]): Race {
  return {
    id: uuidv4(),
    roundNumber,
    distance,
    horses,
    status: 'pending',
    results: [],
  }
}
