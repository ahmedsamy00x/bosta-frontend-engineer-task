import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import { BASE_URL } from "@/services/constants/CONSTANTS"
import type { SignupData } from "@/services/types/auth"

const signup = async (data: SignupData) => {
  const response = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  if (!response.ok) throw new Error("Signup failed")
  return response.json()
}

export const useSignupMutation = () => {
  const navigate = useNavigate()
  
  return useMutation({
    mutationKey: ["signup"],
    mutationFn: signup,
    onSuccess: () => {
      toast.success("Account created! Please login")
      navigate("/login")
    },
    onError: () => {
      toast.error("Signup failed")
    }
  })
}
