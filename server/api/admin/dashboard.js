// server/api/admin/dashboard.js
export default defineEventHandler(async(event) => {
    const config = useRuntimeConfig();

    // Use the API_BASE_URL from runtime config to fetch dashboard
    const response = await $fetch(`${config.public.API_BASE_URL}api/admin/dashboard`);

    return response; // Return the response from the backend
});