export const AUTH_COOKIE_NAME = 'auth_token'

export const setAuthToken = (token: string) => {
  document.cookie = `${AUTH_COOKIE_NAME}=${token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`
}

export const getAuthToken = (): string | null => {
  const cookies = document.cookie.split('; ')
  const authCookie = cookies.find(c => c.startsWith(`${AUTH_COOKIE_NAME}=`))
  return authCookie ? authCookie.split('=')[1] : null
}

export const removeAuthToken = () => {
  document.cookie = `${AUTH_COOKIE_NAME}=; path=/; max-age=0`
}
