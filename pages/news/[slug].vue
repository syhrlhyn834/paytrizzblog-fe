<template>
  <div class="md:mx-28">
    <div class="container mx-auto py-12">
      <div v-if="article" class="rounded-lg shadow-lg p-6">
        <!-- Detail artikel utama -->
        <h1 class="text-3xl font-bold text-white">{{ article.title }}</h1>
        <div class="flex items-center justify-between mt-6 text-gray-600">
          <span class="text-white">
            <Icon name="fa-solid:calendar-alt" style="color: white" /> {{ timeAgo(article.created_at) }}
          </span>
          <span class="flex items-center">
            <Icon name="fa6-solid:share-nodes" style="color: white" @click="toggleShareOptions" class="cursor-pointer mr-2" />
            <div v-if="showShareOptions" class="ml-4 flex space-x-2">
              <a :href="facebookShareUrl" target="_blank" class="text-white flex items-center">
                <Icon name="bxl:facebook-circle" style="color: white" />
              </a>
              <a :href="twitterShareUrl" target="_blank" class="text-white flex items-center">
                <Icon name="bxl:twitter" style="color: white" />
              </a>
              <a :href="whatsappShareUrl" target="_blank" class="text-white flex items-center">
                <Icon name="bxl:whatsapp" style="color: white" />
              </a>
              <a :href="instagramShareUrl" target="_blank" class="text-white flex items-center">
                <Icon name="bxl:instagram" style="color: white" />
              </a>
            </div>
          </span>
        </div>

        <!-- Gambar artikel -->
        <v-img :src="article.image" alt="Article Image" class="mx-auto rounded-xl mt-4" width="1200" height="600" cover />
        <div class="text-white mt-4" v-html="article.content"></div>
      </div>
      <hr>
      <div v-if="posts && posts.length > 0" class="mt-10">
        <h2 class="text-2xl font-bold text-white">More</h2>

        <!-- Grid untuk menampilkan postingan -->
        <div class="grid grid-cols-1 md:grid-cols-1 gap-6 mt-6">
          <div v-for="post in posts" :key="post.id" class="p-4 rounded-lg shadow-md flex">
            
            <!-- Bagian kiri: Tanggal -->
            <div class="flex flex-col justify-start w-1/6">
              <span class="block text-sm text-white">{{ timeAgo(post.created_at) }}</span>
            </div>

            <!-- Bagian tengah: Judul dan deskripsi -->
            <div class="flex flex-col justify-start w-3/6 px-4">
              <h3 class="text-lg font-semibold text-white">
                <router-link :to="`/posts/${post.slug}`" class="hover:underline">
                  {{ post.title }}
                </router-link>
              </h3>
              <!-- Deskripsi -->
              <p class="text-white mt-2">
                <!-- Potong deskripsi setelah 100 karakter -->
                {{ post.description.length > 100 ? post.description.substring(0, 100) + '...' : post.description }}
              </p>
            </div>

            <!-- Bagian kanan: Gambar -->
            <div class="w-2/6">
              <v-img
                :src="post.image"
                alt="Post Image"
                class="rounded-md"
                width="100%"
                height="auto"
                aspect-ratio="1/1"
                cover
              />
            </div>

          </div>
        </div>
      </div>

      <!-- Jika tidak ada postingan, tampilkan pesan Loading -->
      <div v-else class="text-center text-gray-500">Loading posts...</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAsyncData } from 'nuxt/app';

// Time-ago function for formatting date
const timeAgo = (dateString) => {
  const now = new Date();
  const articleDate = new Date(dateString);
  const seconds = Math.floor((now - articleDate) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) return `${interval} tahun lalu`;
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) return `${interval} bulan lalu`;
  interval = Math.floor(seconds / 86400);
  if (interval > 1) return `${interval} hari lalu`;
  interval = Math.floor(seconds / 3600);
  if (interval > 1) return `${interval} jam lalu`;
  interval = Math.floor(seconds / 60);
  if (interval > 1) return `${interval} menit lalu`;
  return `${seconds} detik lalu`;
};

const route = useRoute();
const slug = route.params.slug;

// Reactive share URLs and sidebar toggle
const facebookShareUrl = ref('');
const twitterShareUrl = ref('');
const whatsappShareUrl = ref('');
const instagramShareUrl = ref('');
const showShareOptions = ref(false);

// Fetch single article data
const { data: article, refresh: refreshArticle } = useAsyncData(async () => {
  const response = await $fetch(`/api/post/slug/${slug}`);
  return response.data;
});

// Fetch sidebar posts data
const { data: posts, refresh: refreshPosts } = useAsyncData(async () => {
  const response = await $fetch(`/api/post/sidebar`);
  return response.data;
});

// On mounted, set up sharing URLs
onMounted(() => {
  const currentUrl = window.location.href;
  const title = article.value?.title || 'Check this out!';
  const description = article.value?.description || '';

  facebookShareUrl.value = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(description)}`;
  twitterShareUrl.value = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(`${title} - ${description}`)}`;
  whatsappShareUrl.value = `https://wa.me/?text=${encodeURIComponent(`${title} - ${description} %0A${currentUrl}`)}`;
  instagramShareUrl.value = `https://www.instagram.com/?url=${encodeURIComponent(currentUrl)}`;
});

// Function to toggle share options
const toggleShareOptions = () => {
  showShareOptions.value = !showShareOptions.value;
};
</script>
