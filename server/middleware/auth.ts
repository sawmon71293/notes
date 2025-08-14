import { ofetch } from "ofetch";
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBase;
  const token = getCookie(event, "auth-token");
  if (!token) return;
  try {
    const response = await ofetch(`${baseUrl}/api/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    event.context.authUser = response.user;
  } catch (error) {
    console.log(error);
  }
});
