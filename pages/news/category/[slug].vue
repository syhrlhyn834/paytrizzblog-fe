<template>
    <div>
      <div class="md:mx-28">
        <section class="container mx-auto py-12">
          <h1 class="text-3xl text-white mb-6">{{ categoryName }}</h1>
  
          <div v-if="articles.length === 0">
            <p class="text-white">No articles found for this category.</p>
          </div>
  
          <div v-if="articles.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="article in articles" :key="article.id" class="rounded-lg shadow-lg">
              <v-img
                :lazy-src="article.image"
                :src="article.image"
                alt="Article Image"
                class="mx-auto rounded-xl"
                width="400"
                height="533"
                cover
              />
              <div class="mt-6 p-1">
                <h3 class="text-xl text-white font-semibold">{{ article.title }}</h3>
                <p class="text-white mt-4">{{ article.description }}</p>
                <hr class="my-4">
                <div class="flex items-center justify-between mt-6 text-white">
                  <span><Icon name="fa-solid:calendar-alt" style="color: white" /> {{ article.created_at }}</span>
                  <span><Icon name="fa-solid:eye" style="color: white" /> {{ article.views }} Viewers</span>
                </div>
                <button 
                  @click="navigateToArticle(article.slug)" 
                  class="mt-4 text-white border-2 border-white outline outline-1 outline-white px-4 py-2 rounded-full w-full transition duration-300 hover:bg-yellow-300 hover:text-black">
                  Read More
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
  
      <div v-if="currentPage < lastPage" class="md:mx-48" ref="loadMoreElement">
        <div class="flex items-center mx-4">
          <hr class="flex-grow border-t-2 border-gray-300">
          <span class="mx-4 text-white">Scroll for more...</span>
          <hr class="flex-grow border-t-2 border-gray-300">
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="js">
  import { ref, onMounted } from 'vue';
  import { useAsyncData, useRoute } from 'nuxt/app'; 
  
  const route = useRoute(); 
  
  const currentPage = ref(1);
  const articles = ref([]);
  const categoryName = ref('No Articles Found'); // Default category name
  const lastPage = ref(0);
  
  // Fetch articles based on category slug
  const { data: fetchedData } = useAsyncData(async () => {
    const slug = route.params.slug; 
    console.log("Fetching articles for slug:", slug); // Debugging line
    const response = await $fetch(`/api/category/slug/${slug}?page=${currentPage.value}`); 
  
    // Handle missing categories
    if (!response || !response.success) {
      console.error("Error fetching articles for category:", slug);
      return []; // Return an empty array to avoid showing cards
    }
  
    categoryName.value = response.data.current_page; // Update category name based on your structure
    lastPage.value = response.data.last_page; 
    return response.data.data; // Access the articles from response.data.data
  });
  
  onMounted(() => {
    articles.value = fetchedData.value; 
  });
  </script>
  
  <style scoped>
  /* Add any additional styles here */
  </style>
  