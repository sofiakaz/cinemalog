import { motion } from "motion/react"
import { Heart } from "lucide-react"
import { useFavorites } from "../context/FavoritesContext"
import { MovieCard } from "./MovieCard"
import type { Movie } from "../types"

export function FavoritesView({ favorites }: { favorites: Movie[] }) {
  const { removeFromFavorites } = useFavorites()

  return (
    <>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-black mb-8 bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent"
      >
        Избранное ({favorites.length})
      </motion.h2>

      {favorites.length === 0 ? (
        <div className="text-center py-32 text-slate-400">
          <Heart className="w-24 h-24 mx-auto mb-6 opacity-50" fill="currentColor" />
          <p className="text-2xl font-light">Пусто</p>
          <p className="text-slate-500 text-sm mt-2">Сохрани любимые фильмы</p>
        </div>
      ) : (
        <div className="space-y-6 max-h-[70vh] overflow-y-auto no-scrollbar pb-8">
          {favorites.map((movie) => (
            <MovieCard
              key={movie.title}
              movie={movie}
              isFavorite
              onRemove={() => removeFromFavorites(movie.title)}
              isViewed={false}
            />
          ))}
        </div>
      )}
    </>
  )
}