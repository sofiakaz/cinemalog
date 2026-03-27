import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { FavoritesProvider } from "./context/FavoritesContext"
import { ViewedProvider } from "./context/ViewedContext"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FavoritesProvider>
      <ViewedProvider>
        <App />
      </ViewedProvider>
    </FavoritesProvider>
  </React.StrictMode>,
)