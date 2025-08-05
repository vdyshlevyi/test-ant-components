import { BrowserRouter } from "react-router-dom"
import "./App.css"
import AppRoutes from "./pages/AppRoutes"

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
