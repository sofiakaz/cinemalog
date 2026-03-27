export const GENRES = [
  "драма", "комедия", "фантастика", "ужасы", 
  "триллер", "детектив", "семейный", "боевик"
] as const

export const SORT_OPTIONS = [
  { value: "date", label: "Сначала новые" },
  { value: "rating", label: "По рейтингу" },
  { value: "title", label: "По названию" }
]