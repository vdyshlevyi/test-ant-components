import { BrowserRouter } from "react-router-dom"
import "./App.css"
import AppRoutes from "./pages/AppRoutes"
import { AuthEventHandler } from "./events/AuthEventHandler"

export default function App() {
  return (
    <BrowserRouter>
      <AuthEventHandler />
      <AppRoutes />
    </BrowserRouter>
  )
}
