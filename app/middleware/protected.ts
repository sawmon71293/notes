export default defineNuxtRouteMiddleware(async (to, from) => {
  const token = useCookie<string>("auth-token").value;
  // If user is not authenticated and trying to access a protected route
  if (!token) {
    return navigateTo("/");
  }
});
