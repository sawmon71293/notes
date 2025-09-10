import { defineStore } from "pinia";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  token: string | null | undefined;
  isAuthenticated: boolean;
  loading: boolean;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: true,
  }),

  actions: {
    setUser(user: User) {
      this.user = user;
      this.isAuthenticated = true;
    },

    setToken(token: string) {
      this.token = token;
    },

    // setToken(token: string) {
    //   const cookie = useCookie("auth-token", {
    //     path: "/",
    //     maxAge: 60 * 60 * 24 * 7, // 7 days
    //     secure: true, // set to false on localhost if needed
    //     sameSite: "strict",
    //   });
    //   cookie.value = token;
    //   this.token = cookie;
    // },

    clearAuth() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
    },

    async login(email: string, password: string) {
      try {
        const { token, user } = await $fetch(
          `https://localhost:7055/api/auth/login`,
          {
            method: "POST",
            body: { email, password },
            withCredentials: true,
            credentials: "include",
          }
        );

        this.setToken(token);
        this.setUser(user);
        return true;
      } catch (error) {
        console.error("Login error:", error);
        return false;
      }
    },

    async signup(name: string, email: string, password: string) {
      const config = useRuntimeConfig();
      const baseUrl = config.public.apiBase;
      try {
        const response = await $fetch(`${baseUrl}/auth/register`, {
          method: "POST",
          body: { name, email, password },
        });
        // Automatically log in the user after successful signup
        this.setToken(response.token);
        this.setUser(response.user);
        return { success: true };
      } catch (error: any) {
        return {
          success: false,
          error: error.data?.message || "Signup failed",
        };
      }
    },

    async logout() {
      this.clearAuth();
      await navigateTo("/");
    },

    async checkAuth() {
      const config = useRuntimeConfig();
      const baseUrl = config.public.apiBase;

      try {
        const token = useCookie("auth-token").value;
        if (!token) return false;
        const response = await $fetch(`${baseUrl}/auth/refresh-token`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.setToken(token);
        this.setUser(response.user);
        return true;
      } catch {
        this.clearAuth();
        return false;
      } finally {
        this.loading = false;
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
