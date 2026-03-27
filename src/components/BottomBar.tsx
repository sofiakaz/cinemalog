import { Heart, Layers, Film } from "lucide-react"

// ✅ ТОЧНЫЕ типы для совместимости
type View = "feed" | "favorites" | "collections"

interface BottomBarProps {
  view: View
  setView: React.Dispatch<React.SetStateAction<View>>  // ✅ ТОЧНЫЙ ТИП
}

export function BottomBar({ view, setView }: BottomBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 h-20 bg-gradient-to-t from-slate-900/95 to-transparent backdrop-blur-xl border-t border-slate-800/50">
      <div className="h-full px-6 flex items-center justify-around">
        
        {/* Коллекции */}
        <button
          onClick={() => setView("collections" as View)}  // ✅ ЯВНОЕ ПРИВЕДЕНИЕ
          className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-all ${
            view === "collections" 
              ? "text-pink-400 bg-slate-800/50 shadow-lg scale-105" 
              : "text-slate-400 hover:text-slate-200 hover:scale-105"
          }`}
        >
          <Layers className="w-6 h-6" />
          <span className="text-xs font-medium">Коллекции</span>
        </button>

        {/* Главная */}
        <button
          onClick={() => setView("feed" as View)}  // ✅ ЯВНОЕ ПРИВЕДЕНИЕ
          className="relative -mt-6 w-16 h-16 rounded-3xl bg-gradient-to-br from-rose-500 via-pink-500 to-orange-500 shadow-2xl ring-4 ring-rose-500/30 hover:scale-110 active:scale-95 transition-all duration-200"
        >
          <Film className="w-8 h-8 text-white drop-shadow-lg" />
        </button>

        {/* Избранное */}
        <button
          onClick={() => setView("favorites" as View)}  // ✅ ЯВНОЕ ПРИВЕДЕНИЕ
          className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-all ${
            view === "favorites" 
              ? "text-rose-400 bg-slate-800/50 shadow-lg scale-105" 
              : "text-slate-400 hover:text-slate-200 hover:scale-105"
          }`}
        >
          <Heart className={`w-6 h-6 ${view === "favorites" ? "fill-current" : ""}`} />
          <span className="text-xs font-medium">Избранное</span>
        </button>
      </div>
    </div>
  )
}