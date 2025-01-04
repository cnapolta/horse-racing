export const HORSE_COLORS = [
  '#F44336',
  '#3F51B5',
  '#FF9800',
  '#CDDC39',
  '#E91E63',
  '#795548',
  '#009688',
  '#FFEB3B',
  '#9C27B0',
  '#00BCD4',
  '#8BC34A',
  '#FFC107',
  '#607D8B',
  '#FF5722',
  '#673AB7',
  '#03A9F4',
  '#DAA520',
  '#4682B4',
  '#20B2AA',
  '#FFD700',
]

export function getUniqueHorseColor(index: number): string {
  return HORSE_COLORS[index % HORSE_COLORS.length]
}
