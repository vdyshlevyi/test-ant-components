import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { AuthProvider } from "./context/AuthContextProvider.tsx"
import App from "./App.tsx"

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </AuthProvider>,
)
