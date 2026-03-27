import { X } from "lucide-react"
import type { SortBy } from "../types"

interface Props {
  isOpen: boolean
  onClose: () => void
  sortBy: SortBy
  onSortChange: (sortBy: SortBy) => void
}

export function FilterModal({ isOpen, onClose, sortBy, onSortChange }: Props) {
  if (!isOpen) return null

  const sortOptions = [
    { value: "date" as SortBy, label: "Сначала новые" },
    { value: "rating" as SortBy, label: "По рейтингу" },
    { value: "title" as SortBy, label: "По названию" }
  ]

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end p-6">
      <div className="bg-slate-900/95 backdrop-blur-3xl rounded-3xl p-6 w-full max-w-md max-h-[70vh] shadow-2xl border border-slate-700/50 overflow-y-auto">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-700/50">
          <h3 className="text-2xl font-bold text-white">Фильтры</h3>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-800/50 transition-all">
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        <div className="space-y-4 mb-8">
          <h4 className="font-semibold text-slate-300 mb-3">Сортировка</h4>
          {sortOptions.map(option => (
            <button
              key={option.value}
              onClick={() => onSortChange(option.value)}
              className={`w-full p-4 rounded-xl text-left transition-all ${
                sortBy === option.value
                  ? "bg-rose-500/20 border-2 border-rose-500/50 text-rose-200 shadow-lg"
                  : "border border-slate-700/50 text-slate-400 hover:border-slate-600 hover:bg-slate-800/30"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <button 
          onClick={onClose}
          className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all"
        >
          Готово
        </button>
      </div>
    </div>
  )
}