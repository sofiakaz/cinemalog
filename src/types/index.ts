export interface Movie {
  title: string
  year: number
  country: string
  poster: string
  vote_average?: number
  description: string
  director: string
  duration: number
  genre: string
}

export type View = "diary" | "watchlist" | "favorites" | "stats"
export type SortBy = "date" | "rating" | "title"
