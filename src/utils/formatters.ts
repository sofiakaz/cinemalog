

export function formatRating(rating: number): string {
  return rating.toFixed(1)
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return hours ? `${hours}ч ${mins}м` : `${minutes}м`
}

export function formatGenres(genres: string[]): string {
  if (genres.length === 1) return genres[0]
  if (genres.length === 2) return `${genres[0]} + ${genres[1]}`
  return `${genres.slice(0, 2).join(", ")} +${genres.length - 2}`
}
