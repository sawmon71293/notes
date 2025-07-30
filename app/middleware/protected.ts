
import { useAuthStore } from "~/stores/auth"
export default defineNuxtRouteMiddleware(async (to) => {
    if (import.meta.client) return
    const authStore =  useAuthStore()
    

    // If user is not authenticated and trying to access a protected route
    if (!authStore.user) {
      const ok = await authStore.checkAuth()
      if(!ok) {
        return navigateTo('/login')
      }
    }
})
