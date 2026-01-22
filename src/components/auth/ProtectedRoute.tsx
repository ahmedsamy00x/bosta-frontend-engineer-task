import { Navigate } from "react-router"
import { useAuthStore } from "@/stores/useAuthStore"

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  
  return <>{children}</>
}
