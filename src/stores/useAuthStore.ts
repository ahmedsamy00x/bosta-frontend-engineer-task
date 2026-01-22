import { create } from 'zustand'
import { getAuthToken, setAuthToken, removeAuthToken } from '@/lib/auth'
import type { User } from '@/services/types/auth'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  
  login: (user: User, token: string) => void
  logout: () => void
  initAuth: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  
  login: (user, token) => {
    setAuthToken(token)
    localStorage.setItem('user', JSON.stringify(user))
    set({ user, token, isAuthenticated: true })
  },
  
  logout: () => {
    removeAuthToken()
    localStorage.removeItem('user')
    set({ user: null, token: null, isAuthenticated: false })
  },
  
  initAuth: () => {
    const savedToken = getAuthToken()
    const savedUser = localStorage.getItem('user')
    
    if (savedToken && savedUser) {
      set({
        token: savedToken,
        user: JSON.parse(savedUser),
        isAuthenticated: true
      })
    }
  }
}))
