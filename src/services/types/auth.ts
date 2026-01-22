export interface User {
  id?: number
  username: string
  email: string
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface SignupData {
  email: string
  username: string
  password: string
  name: {
    firstname: string
    lastname: string
  }
}
