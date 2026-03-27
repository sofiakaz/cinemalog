import { createContext, useContext, type ReactNode, useMemo } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"
import type { Movie } from "../types"

interface FavoritesContextType {
  favorites: Movie[]
  addToFavorites: (movie: Movie) => void
  removeFromFavorites: (title: string) => void
  isFavorite: (title: string) => boolean
  toggleFavorite: (movie: Movie) => void
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useLocalStorage<Movie[]>("cinema-log-favorites", [])

  const addToFavorites = (movie: Movie) => {
    if (!isFavorite(movie.title)) {
      setFavorites(prev => [movie, ...prev])
    }
  }

  const removeFromFavorites = (title: string) => {
    setFavorites(prev => prev.filter(m => m.title !== title))
  }

  const isFavorite = (title: string) => {
    return favorites.some(movie => movie.title === title)
  }

  const toggleFavorite = (movie: Movie) => {
    if (isFavorite(movie.title)) {
      removeFromFavorites(movie.title)
    } else {
      addToFavorites(movie)
    }
  }

  const value = useMemo(() => ({
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite
  }), [favorites])

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}