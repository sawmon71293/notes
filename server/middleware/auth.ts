import { ofetch } from "ofetch";
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBase;
  
  try {
    const response = await ofetch(`${baseUrl}/api/auth/refresh-token`, {
      method: "POST",
      credentials: "include",
    });
    console.log(response.accessToken);
  } catch (error) {
    console.log(error);
  }
});
