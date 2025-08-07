import { BrowserRouter } from "react-router-dom"
import "./App.css"
import AppRoutes from "./pages/app-routes"
import { AuthEventHandler } from "./events/auth-event-handler"

export default function App() {
  return (
    <BrowserRouter>
      <AuthEventHandler />
      <AppRoutes />
    </BrowserRouter>
  )
}
