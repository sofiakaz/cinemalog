import { 
  createContext, 
  useContext, 
  type ReactNode, 
  useMemo 
} from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"
import type { Movie } from "../types"

interface ViewedContextType {
  viewedList: Movie[]
  addToViewed: (movie: Movie) => void
  removeFromViewed: (title: string) => void
  isViewed: (title: string) => boolean
  toggleViewed: (movie: Movie) => void
  clearViewed: () => void
}

const ViewedContext = createContext<ViewedContextType | undefined>(undefined)

export function ViewedProvider({ children }: { children: ReactNode }) {
  const [viewedList, setViewedList] = useLocalStorage<Movie[]>("cinema-log-viewed", [])

  const addToViewed = (movie: Movie) => {
    if (!isViewed(movie.title)) {
      setViewedList(prev => [movie, ...prev])
    }
  }

  const removeFromViewed = (title: string) => {
    setViewedList(prev => prev.filter(m => m.title !== title))
  }

  const isViewed = (title: string) => {
    return viewedList.some(movie => movie.title === title)
  }

  const toggleViewed = (movie: Movie) => {
    if (isViewed(movie.title)) {
      removeFromViewed(movie.title)
    } else {
      addToViewed(movie)
    }
  }

  const clearViewed = () => {
    setViewedList([])
  }

  const value = useMemo(() => ({
    viewedList,
    addToViewed,
    removeFromViewed,
    isViewed,
    toggleViewed,
    clearViewed
  }), [viewedList])

  return (
    <ViewedContext.Provider value={value}>
      {children}
    </ViewedContext.Provider>
  )
}

export function useViewed() {
  const context = useContext(ViewedContext)
  if (context === undefined) {
    throw new Error('useViewed must be used within a ViewedProvider')
  }
  return context
}