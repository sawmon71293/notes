import { useAuthStore } from "~/stores/auth";
export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();
  const token = useCookie<string>("auth-token").value;
  // If user is not authenticated and trying to access a protected route
  if (!token) return;
});
