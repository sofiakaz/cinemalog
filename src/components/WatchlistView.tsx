import { motion } from "motion/react"
import { Film } from "lucide-react"
import { useFavorites } from "../context/FavoritesContext"
import type { Movie } from "../types"

export function WatchlistView() {
  const { favorites } = useFavorites()

  const getRating = (movie: Movie) => {
    if (movie.rating) return movie.rating.toFixed(1)
    if (movie.vote_average) return movie.vote_average.toFixed(1)
    return "N/A"
  }

  return (
    <>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-black mb-8 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"
      >
        Смотреть позже ({favorites.length})
      </motion.h2>

      {favorites.length === 0 ? (
        <div className="text-center py-32 text-slate-400">
          <Film className="w-24 h-24 mx-auto mb-6 opacity-50" />
          <p className="text-2xl font-light">Пусто</p>
          <p className="text-slate-500 text-sm mt-2">Добавь фильмы в избранное</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {favorites.slice(0, 8).map((movie: Movie) => (
            <motion.div
              key={movie.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="group relative aspect-[2/3] rounded-3xl overflow-hidden bg-gradient-to-b from-slate-800/70 to-slate-900/70 backdrop-blur-xl border border-slate-700/50 hover:border-emerald-500/50 hover:shadow-2xl transition-all duration-500"
            >
              <img 
                src={movie.poster} 
                alt={movie.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute bottom-4 left-4 right-4">
                <h4 className="font-bold text-white text-lg drop-shadow-lg line-clamp-2">{movie.title}</h4>
                <p className="text-emerald-400 text-sm font-medium mt-1 drop-shadow-lg">
                  {movie.year} • {getRating(movie)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </>
  )
}
