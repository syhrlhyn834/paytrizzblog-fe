// server/api/menu.js
export default defineEventHandler(async(event) => {
    const config = useRuntimeConfig();

    // Ambil parameter halaman dari query string
    const query = getQuery(event);
    const page = query.page || 1; // Default ke halaman 1 jika tidak ada parameter page

    // Sertakan parameter halaman dalam request ke backend
    const response = await $fetch(`${config.public.API_BASE_URL}api/web/posts?page=${page}`);

    return response; // Kembalikan response dari backend
});