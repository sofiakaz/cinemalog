import { BarChart3, Star, Clock, TrendingUp } from "lucide-react"
import { motion } from "motion/react"
import { useFavorites } from "../context/FavoritesContext"
import { useViewed } from "../context/ViewedContext"  // ✅ Импорт

export function StatsView() {
  const { favorites } = useFavorites()
  const { viewedList } = useViewed()

  const totalMovies = viewedList.length
  // ✅ Фикс типизации
  const avgRating = viewedList.reduce((sum: number, m) => sum + (m.rating || 0), 0) / totalMovies || 0
  const totalHours = viewedList.reduce((sum: number, m) => sum + (m.duration || 0), 0) / 60

  const stats = [
    { icon: BarChart3, label: "Всего фильмов", value: totalMovies.toString(), color: "rose" },
    { icon: Star, label: "Средний рейтинг", value: avgRating.toFixed(1), color: "amber" },
    { icon: Clock, label: "Общее время", value: `${Math.floor(totalHours)}ч`, color: "emerald" },
    { icon: TrendingUp, label: "В избранном", value: favorites.length.toString(), color: "pink" }
  ]

  return (
    <div className="space-y-8">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-black bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent"
      >
        Статистика
      </motion.h2>

      <div className="grid grid-cols-2 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="group p-6 rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-slate-700/50 hover:border-sky-500/50 hover:shadow-2xl transition-all duration-300"
          >
            <div className={`w-12 h-12 bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600 rounded-2xl flex items-center justify-center mb-4 shadow-xl`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-black text-white mb-1">{stat.value}</p>
              <p className="text-slate-400 text-sm">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}