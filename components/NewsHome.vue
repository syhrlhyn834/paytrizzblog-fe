<script setup lang="ts">
import { ref, onMounted, nextTick, onBeforeUnmount, watch } from 'vue';
import { useAsyncData } from 'nuxt/app'; 
import { useRouter } from 'vue-router'; 

const router = useRouter();
const currentPage = ref(1);
const searchQuery = ref('');
const observer = ref<IntersectionObserver | null>(null);
const loadMoreElement = ref(null);
const loading = ref(false);

const { data: news, refresh } = useAsyncData(async () => {
  const queryParam = searchQuery.value ? `&q=${searchQuery.value}` : '';
  const response = await $fetch(`/api/post?page=${currentPage.value}${queryParam}`);
  return response.data;
});

const fetchMoreNews = async () => {
  // Jangan muat lebih jika masih loading atau halaman saat ini sudah pada halaman terakhir
  if (loading.value || currentPage.value >= news.value.last_page) return;

  loading.value = true; // Set status loading agar tidak bisa menambah data lagi selama masih memuat

  try {
    currentPage.value++;
    const queryParam = searchQuery.value ? `&q=${searchQuery.value}` : '';
    const response = await $fetch(`/api/post?page=${currentPage.value}${queryParam}`);
    
    news.value.data.push(...response.data.data); // Tambahkan data baru ke yang sudah ada

    await nextTick(); // Tunggu sampai DOM selesai di-update
    // Hanya scroll ke loadMoreElement jika memang sudah sampai akhir halaman
    if (loadMoreElement.value && currentPage.value < news.value.last_page) {
      loadMoreElement.value.scrollIntoView({ behavior: 'smooth' });
    }
  } catch (error) {
    console.error("Failed to fetch more news:", error);
  } finally {
    loading.value = false; // Set status loading ke false setelah selesai
  }
};


watch(searchQuery, async () => {
  currentPage.value = 1;
  await refresh();

  if (observer.value && loadMoreElement.value) {
    observer.value.disconnect();
    nextTick(setupObserver);
  }
});

const setupObserver = () => {
  if (observer.value && loadMoreElement.value) {
    observer.value.disconnect(); // Putuskan koneksi observer yang lama sebelum membuat yang baru
  }

  observer.value = new IntersectionObserver((entries) => {
    if (loading.value) return; // Cegah observer memanggil ulang saat loading
    if (entries[0].isIntersecting) {
      fetchMoreNews(); // Panggil fetchMoreNews hanya saat elemen terlihat di viewport
    }
  });

  if (loadMoreElement.value) {
    observer.value.observe(loadMoreElement.value); // Amati elemen loadMoreElement
  }
};


onMounted(() => {
  nextTick(setupObserver);

  const handleSearchEvent = (event: CustomEvent) => {
    searchQuery.value = event.detail;
  };

  window.addEventListener('search', handleSearchEvent);

  onBeforeUnmount(() => {
    window.removeEventListener('search', handleSearchEvent);
    if (observer.value) observer.value.disconnect();
  });
});

// Fungsi untuk memotong deskripsi agar total judul + deskripsi tidak lebih dari 100 karakter
const truncateDescription = (title, description) => {
  const maxTotalLength = 100;
  const totalLength = title.length + description.length;

  // Jika total panjang lebih dari 100, potong deskripsi
  if (totalLength > maxTotalLength) {
    const availableLength = maxTotalLength - title.length;
    return description.substring(0, availableLength) + '...';
  }
  
  return description;
};

// Navigate to article detail page
const navigateToArticle = (slug) => {
  router.push(`/news/${slug}`);
};
</script>

<template>
  <div>
    <div class="md:mx-28">
      <section class="container mx-auto py-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="article in news?.data" :key="article.id" class="rounded-lg shadow-lg flex flex-col h-full">
            <v-img
              :lazy-src="article.image"
              :src="article.image"
              alt="Article Image"
              class="mx-auto rounded-xl"
              width="400"
              height="533"
              cover
            />
            <div class="mt-6 p-1 flex flex-col flex-grow">
              <router-link :to="`/news/${article.slug}`" class="text-xl text-white font-semibold">
                {{ article.title }}
              </router-link>
              <p class="text-white mt-4 flex-grow">
                {{ truncateDescription(article.title, article.description) }}
              </p>
              <hr class="my-4">
              <div class="flex items-center justify-between mt-6 text-white">
                <span><Icon name="fa-solid:calendar-alt" style="color: white" /> {{ article.created_at }}</span>
                <span><Icon name="fa-solid:eye" style="color: white" /> {{ article.views }} Viewers</span>
              </div>
              <button 
                @click="navigateToArticle(article.slug)" 
                class="mt-4 text-white border-2 border-white outline outline-1 outline-white px-4 py-2 rounded-full w-full transition duration-300 hover:bg-yellow-300 hover:text-black"
              >
                Read More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Scroll untuk memuat lebih banyak berita -->
    <div v-if="currentPage < news?.last_page" class="md:mx-48" ref="loadMoreElement">
      <div class="flex items-center mx-4">
        <hr class="flex-grow border-t-2 border-gray-300">
        <span class="mx-4 text-white">Scroll for more...</span>
        <hr class="flex-grow border-t-2 border-gray-300">
      </div>
    </div>
  </div>
</template>
<style></style>