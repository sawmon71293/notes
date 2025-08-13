export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.server) {
    const auth = useAuthStore();
    const user = useState(
      "authUser",
      () => nuxtApp.ssrContext?.event.context.authUser ?? null
    );

    console.log(
      "User here in the event_____>>>",
      nuxtApp.ssrContext?.event.context.authUser
    );
    if (user.value) {
      auth.setUser(user.value);
      auth.isAuthenticated = true;
    }
    auth.loading = false;
  }
});
