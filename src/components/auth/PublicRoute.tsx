import { useAuthStore } from "@/stores/useAuthStore"
import { Navigate } from "react-router"

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return (
    <>{children}</>
  )
}

export default PublicRoute