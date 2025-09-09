export default defineEventHandler(async (event) => {
  // Forward the request to your backend
  const config = useRuntimeConfig();
  const baseUrl = config.apiBase;
  try {
    const res = await $fetch(`https://localhost:7055/api/auth/refresh-token`, {
      method: "POST",
      credentials: "include",
    });
    return res; // return backend response to frontend
  } catch (err) {
    console.log("error >>>>", { err });
  }
});
