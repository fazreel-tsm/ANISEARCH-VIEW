export function ratingColor(score?: number | null) {
  if (score === undefined || score === null) return 'text-gray-500'
  if (score < 3.9) return 'text-red-600'
  if (score < 6.9) return 'text-orange-500'
  if (score < 7.9) return 'text-yellow-400'
  if (score < 8.9) return 'text-green-400'
  return 'text-green-700'
}
