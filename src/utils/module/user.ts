import { ref } from 'vue'

const USER = ref<user>()

export const TOKEN = ref<string | null>()

export const setToken = (token: string) => {
  localStorage.setItem('token', token)
  TOKEN.value = token
}

export type user = {
  email: string
  name?: string
  password: string
}

export const logout = () => {
  USER.value = undefined
  TOKEN.value = undefined
  localStorage.removeItem('token')
}
