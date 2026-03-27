import { motion } from "motion/react"
import { Calendar, Star, MapPin, Clock } from "lucide-react"
import { useViewed } from "../context/ViewedContext"
import type { Movie } from "../types"

export function DiaryView() { // убрали пропс movies
  const { viewedList } = useViewed()

  return (
    <>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-black mb-8 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent"
      >
        Дневник
      </motion.h2>

      {viewedList.length === 0 ? (
        <div className="text-center py-32 text-slate-400 space-y-4">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-24 h-24 mx-auto bg-slate-800/50 rounded-3xl flex items-center justify-center"
          >
            <Calendar className="w-12 h-12 opacity-50" />
          </motion.div>
          <div>
            <p className="text-2xl font-light mb-2">Пока пусто</p>
            <p className="text-slate-500 text-sm">Добавь фильм в избранное и отметь как просмотренный</p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {viewedList.slice(0, 10).map((movie: Movie, index: number) => (
            <motion.div
              key={`${movie.title}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="group"
            >
              <div className="bg-slate-800/40 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/40 hover:border-rose-500/50 hover:bg-slate-800/60 transition-all duration-500">
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-700/30">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-500/80 to-pink-500/80 rounded-2xl flex items-center justify-center shadow-2xl">
                    <span className="text-xl font-black text-white">#{viewedList.length - index}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 bg-amber-500/20 px-3 py-1 rounded-xl">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="font-bold">{movie.rating?.toFixed(1) || movie.vote_average?.toFixed(1) || "N/A"}</span>
                    </div>
                    <span className="text-slate-400">{movie.year}</span>
                  </div>
                </div>

                <div className="flex gap-6">
                  <img 
                    src={movie.poster} 
                    alt={movie.title}
                    className="w-28 h-40 rounded-2xl object-cover shadow-2xl border-4 border-slate-900/50 group-hover:border-rose-500/50"
                  />
                  <div className="flex-1 space-y-3">
                    <h3 className="text-2xl font-bold leading-tight">{movie.title}</h3>
                    <p className="text-slate-400 leading-relaxed text-sm line-clamp-3">{movie.description}</p>
                    <div className="flex items-center gap-6 text-xs text-slate-500 pt-2 border-t border-slate-700/30">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {movie.country}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {movie.duration} мин
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </>
  )
}
