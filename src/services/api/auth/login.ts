import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import { BASE_URL } from "@/services/constants/CONSTANTS"
import { useAuthStore } from "@/stores/useAuthStore"
import type { LoginCredentials, User } from "@/services/types/auth"

const login = async (credentials: LoginCredentials) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials)
  })
  if (!response.ok) throw new Error("Login failed")
  return response.json()
}

export const useLoginMutation = () => {
  const navigate = useNavigate()
  const loginToStore = useAuthStore(state => state.login)
  
  return useMutation({
    mutationFn: login,
    onSuccess: (data, variables) => {
      const user: User = {
        username: variables.username,
        email: ""
      }
      loginToStore(user, data.token)
      toast.success("Login successful")
      navigate("/")
    },
    onError: () => {
      toast.error("Invalid credentials")
    }
  })
}
