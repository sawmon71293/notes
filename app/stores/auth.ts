import { defineStore } from 'pinia'
import { useNuxtApp } from '#app';

interface User {
  id: string
  email: string
  name: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: true
  }),

  actions: {
    setUser(user: User) {
      this.user = user
      this.isAuthenticated = true
    },

    setToken(token: string) {
      this.token = token
      const nuxtApp = useNuxtApp ()
      if (!nuxtApp.ssrContext) {
        localStorage.setItem('token', token)
      }
    },

    clearAuth() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      localStorage.removeItem('token')
    },

    async login(email: string, password: string) {
      try {
        const response = await $fetch('https://localhost:7055/api/auth/login', {
          method: 'POST',
          body: { email, password }
        })
        console.log ("token,", response.token)
        console.log (response.user);
        this.setToken(response.token)
        this.setUser(response.user)
        return true
      } catch (error) {
        console.error('Login error:', error)
        return false
      }
    },

    async signup(name: string, email: string, password: string) {
        try {
          const response = await $fetch('https://localhost:7055/api/auth/register', {
            method: 'POST',
            body: { name, email, password }
          })
          console.log (response)
          // Automatically log in the user after successful signup
          this.setToken(response.token)
          this.setUser(response.user)
          return { success: true }
        } catch (error: any) {
          return {
            success: false,
            error: error.data?.message || 'Signup failed'
          }
        }
      },

    async logout() {
      try {
        const token = localStorage.getItem('token')
        if (!token) return
        await $fetch('https://localhost:7055/logout', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      } finally {
        this.clearAuth()
        await navigateTo('/')
      }
    },

    async checkAuth() {
      try {
        const token = localStorage.getItem('token')
        if (!token) return false

        const response = await $fetch('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        this.setToken(token)
        this.setUser(response.user)
        return true
      } catch {
        this.clearAuth()
        return false
      } finally {
        this.loading = false
      }
    }
  }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
  }
