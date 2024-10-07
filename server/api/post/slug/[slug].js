// server/api/post/slug/[slug].js
export default defineEventHandler(async(event) => {
    // Mengambil slug dari parameter rute
    const slug = event.context.params.slug;

    // Menggunakan API_BASE_URL dari konfigurasi runtime untuk mengambil postingan berdasarkan slug
    const config = useRuntimeConfig();
    const response = await $fetch(`${config.public.API_BASE_URL}api/web/posts/${slug}`);

    // Mengembalikan respons dari backend
    return response;
});