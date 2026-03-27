import { useMemo, useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { movies } from "./data/movies"
import { MovieCard } from "./components/MovieCard"
import { Search, Heart, Film, X, Star, Globe, Clock, Info, RefreshCw } from "lucide-react"
import { useFavorites } from "./context/FavoritesContext"
import { useViewed } from "./context/ViewedContext"

export default function App() {
  const [currentTab, setCurrentTab] = useState<"feed" | "favorites">("feed")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMovie, setSelectedMovie] = useState<any>(null)
  const [showInfoInModal, setShowInfoInModal] = useState(false)
  const [randomMovies, setRandomMovies] = useState<any[]>([])
  
  const { favorites, toggleFavorite, isFavorite } = useFavorites()
  const { viewedList, addToViewed, removeFromViewed } = useViewed()

  // Функция для получения случайных 20 фильмов
  const getRandomMovies = () => {
    const shuffled = [...movies]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled.slice(0, 20)
  }

  // Загружаем случайные фильмы при монтировании
  useEffect(() => {
    setRandomMovies(getRandomMovies())
  }, [])

  // Обновить фильмы (загрузить новые 20)
  const refreshMovies = () => {
    setRandomMovies(getRandomMovies())
  }

  const filteredMovies = useMemo(() => {
    return randomMovies.filter(movie => 
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery, randomMovies])

  const handleMovieClick = (movie: any) => {
    addToViewed(movie)
    setSelectedMovie(movie)
    setShowInfoInModal(false)
  }

  const isMovieViewed = (movie: any) => {
    return viewedList.some((viewed: any) => viewed.title === movie.title)
  }

  // Функция для получения рейтинга из vote_average
  const getRating = (movie: any) => {
    if (movie.vote_average) return movie.vote_average.toFixed(1)
    if (movie.rating) return movie.rating.toFixed(1)
    return "N/A"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900/20 to-slate-900 text-white font-sans">
      
      {/* Header */}
      <header className="px-6 pt-8 pb-6 sticky top-0 z-40 bg-slate-900/95 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-black bg-gradient-to-r from-rose-400 via-pink-400 to-orange-400 bg-clip-text text-transparent mb-6 text-center">
            CINEMA LOG
          </h1>
          
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Название фильма"
              className="w-full bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-2xl pl-12 pr-4 py-4 text-white placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-rose-500/30 transition-all duration-300"
            />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-md mx-auto px-6 pb-28">
        <div className="mt-8 space-y-8">
          {currentTab === "feed" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                {filteredMovies.map((movie: any) => (
                  <div 
                    key={movie.title}
                    onClick={() => handleMovieClick(movie)}
                    className="group aspect-[2/3] rounded-3xl overflow-hidden bg-gradient-to-b from-slate-800/70 via-slate-900/50 to-black/60 backdrop-blur-xl border border-slate-700/50 hover:border-emerald-500/50 hover:shadow-2xl transition-all duration-500 cursor-pointer relative"
                  >
                    <img 
                      src={movie.poster} 
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h4 className="font-bold text-white text-lg drop-shadow-2xl line-clamp-2">{movie.title}</h4>
                      <p className="text-emerald-400 font-medium drop-shadow-lg">{movie.year}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Кнопка обновления - теперь под лентой */}
              <div className="flex justify-center pt-2 pb-12">
                <button
                  onClick={refreshMovies}
                  className="flex items-center gap-2 px-6 py-2.5 bg-slate-800/70 backdrop-blur-sm rounded-xl hover:bg-slate-700/70 transition-all border border-slate-700/50"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span className="text-sm font-medium">Новые 20 фильмов</span>
                </button>
              </div>
            </>
          )}

          {currentTab === "favorites" && (
            <>
              {favorites.length === 0 ? (
                <div className="text-center py-32 text-slate-400 space-y-6">
                  <Heart className="w-28 h-28 mx-auto opacity-30" />
                  <div>
                    <p className="text-2xl font-light mb-2">Пока пусто</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 max-h-[60vh] overflow-y-auto pb-4">
                  {favorites.map((movie: any) => (
                    <div 
                      key={movie.title}
                      onClick={() => handleMovieClick(movie)}
                    >
                      <MovieCard 
                        movie={movie} 
                        isFavorite={true} 
                        onRemove={() => toggleFavorite(movie)} 
                        isViewed={isMovieViewed(movie)}
                        onViewed={() => addToViewed(movie)}
                        onUnviewed={() => removeFromViewed(movie.title)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Movie Detail Modal */}
      <AnimatePresence>
        {selectedMovie && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => {
              setSelectedMovie(null)
              setShowInfoInModal(false)
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-[360px] aspect-[4.8/7] rounded-[28px] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {!showInfoInModal ? (
                // Режим показа постера
                <>
                  <img
                    src={selectedMovie.poster}
                    alt={selectedMovie.title}
                    className="absolute inset-0 w-full h-full object-cover object-[center_60%]"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80" />

                  {/* Кнопка закрытия (крестик) */}
                  <button
                    onClick={() => {
                      setSelectedMovie(null)
                      setShowInfoInModal(false)
                    }}
                    className="absolute top-3 right-3 z-20 bg-black/40 backdrop-blur rounded-full p-2 active:scale-90 transition-transform"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>

                  {/* Кнопка информации (i) */}
                  <button
                    onClick={() => setShowInfoInModal(true)}
                    className="absolute top-3 left-3 z-20 bg-black/40 backdrop-blur rounded-full p-2 active:scale-90 transition-transform"
                  >
                    <Info className="w-5 h-5 text-white" />
                  </button>

                  {/* Текстовая информация внизу */}
                  <div className="absolute bottom-24 left-4 right-4 text-white z-10">
                    <h2 className="text-2xl font-bold mb-2 drop-shadow-2xl">
                      {selectedMovie.title}
                    </h2>
                    
                    <div className="flex gap-3 text-sm opacity-90">
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        {getRating(selectedMovie)}
                      </span>
                      <span>{selectedMovie.year}</span>
                      <span className="flex items-center gap-1">
                        <Globe className="w-3.5 h-3.5" />
                        {selectedMovie.country || "Unknown"}
                      </span>
                    </div>
                  </div>

                  {/* Кнопка "В избранное" */}
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <button
                      onClick={() => {
                        toggleFavorite(selectedMovie)
                      }}
                      className={`w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                        isFavorite(selectedMovie.title)
                          ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg"
                          : "bg-white/20 backdrop-blur text-white hover:bg-white/30"
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${isFavorite(selectedMovie.title) ? "fill-current" : ""}`} />
                      {isFavorite(selectedMovie.title) ? "В избранном" : "В избранное"}
                    </button>
                  </div>
                </>
              ) : (
                // Режим показа информации (белая карточка)
                <>
                  <div className="absolute inset-0 bg-white rounded-[28px] flex flex-col">
                    <div className="relative h-14 shrink-0">
                      <button
                        onClick={() => setShowInfoInModal(false)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    <div className="flex-1 overflow-y-auto px-5 pb-6 no-scrollbar">
                      <h2 className="text-xl font-bold mb-3 text-slate-900">
                        {selectedMovie.title}
                      </h2>

                      <div className="flex gap-4 text-sm text-gray-500 mb-5">
                        <span className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded-lg">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-bold text-yellow-700">{getRating(selectedMovie)}</span>
                        </span>
                        <span className="flex items-center gap-1 bg-gray-50 px-2 py-0.5 rounded-lg">
                          <Globe className="w-4 h-4" />
                          {selectedMovie.country || "Unknown"}
                        </span>
                      </div>

                      <p className="text-slate-600 leading-relaxed mb-6 text-sm">
                        {selectedMovie.description}
                      </p>

                      <div className="space-y-3 text-sm text-slate-500 border-t pt-4">
                        <div className="flex items-center gap-3">
                          <Film className="w-4 h-4 text-pink-500" />
                          <span><span className="font-medium text-slate-700">Режиссёр:</span> {selectedMovie.director}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="w-4 h-4 text-pink-500" />
                          <span><span className="font-medium text-slate-700">Длительность:</span> {selectedMovie.duration} мин</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Star className="w-4 h-4 text-pink-500" />
                          <span><span className="font-medium text-slate-700">Жанры:</span> {selectedMovie.genre}</span>
                        </div>
                      </div>

                      {/* Кнопка "В избранное" в информационном режиме */}
                      <div className="mt-6">
                        <button
                          onClick={() => {
                            toggleFavorite(selectedMovie)
                          }}
                          className={`w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                            isFavorite(selectedMovie.title)
                              ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          <Heart className={`w-5 h-5 ${isFavorite(selectedMovie.title) ? "fill-current" : ""}`} />
                          {isFavorite(selectedMovie.title) ? "В избранном" : "В избранное"}
                        </button>
                      </div>
                    </div>
                    
                    <div className="h-8 bg-gradient-to-t from-white to-transparent shrink-0" />
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 max-w-md w-full px-6 z-40">
        <div className="bg-slate-900/95 backdrop-blur-3xl rounded-3xl p-4 border border-slate-800/50 shadow-2xl flex justify-around">
          <button 
            onClick={() => setCurrentTab("feed")}
            className={`p-4 rounded-2xl transition-all group flex flex-col items-center gap-2 ${
              currentTab === "feed"
                ? "bg-gradient-to-br from-emerald-500/30 to-teal-500/30 text-emerald-300 shadow-lg scale-105"
                : "text-slate-400 hover:text-emerald-300 hover:bg-slate-800/40 hover:scale-105"
            }`}
          >
            <Film className="w-6 h-6 group-hover:rotate-6 transition-transform" />
            <span className="text-xs font-bold">Главная</span>
          </button>

          <button 
            onClick={() => setCurrentTab("favorites")}
            className={`p-4 rounded-2xl transition-all group flex flex-col items-center gap-2 relative ${
              currentTab === "favorites"
                ? "bg-gradient-to-br from-pink-500/30 to-rose-500/30 text-pink-300 shadow-lg scale-105"
                : "text-slate-400 hover:text-pink-300 hover:bg-slate-800/40 hover:scale-105"
            }`}
          >
            <Heart className={`w-6 h-6 ${currentTab === "favorites" ? "fill-current" : ""}`} />
            <span className="text-xs font-bold">Избранное</span>
            {favorites.length > 0 && (
              <span className="absolute -top-3 -right-3 bg-pink-500 text-xs px-2 py-1 rounded-full text-white font-bold text-sm">
                {favorites.length}
              </span>
            )}
          </button>
        </div>
      </nav>
    </div>
  )
}