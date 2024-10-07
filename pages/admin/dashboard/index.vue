<script setup>
definePageMeta({
  layout: 'admin',
  middleware: 'auth',
});

// Setup untuk mengambil data dashboard
const { data: dashboardData, error } = await useAsyncData('dashboard', () =>
  $fetch('/api/admin/dashboard')
);

const cards = computed(() => {
  if (!dashboardData.value || !dashboardData.value.data) return [];

  return [
    {
      title: 'Total Postingan',
      value: dashboardData.value.data.posts,
      iconClass: 'w-8 h-8 text-gray-900 dark:text-white',
      iconPath: 'M9 5v14l7-7-7-7z'
    },
    {
      title: 'Total Category',
      value: dashboardData.value.data.categories,
      iconClass: 'w-8 h-8 text-gray-900 dark:text-white',
      iconPath: 'M3 7v10l7-5-7-5zm0 0h18M3 7l7 5-7 5m0 0h18'
    },
    {
      title: 'Total Menu',
      value: dashboardData.value.data.menus,
      iconClass: 'w-8 h-8 text-gray-900 dark:text-white',
      iconPath: 'M3 7v10l7-5-7-5zm0 0h18M3 7l7 5-7 5m0 0h18'
    }
  ];
});

</script>

<template>
  <div class="flex flex-wrap justify-center p-4">
    <Title :pageTitle="'Dashboard'" />
    <div v-for="(item, index) in cards" :key="index" class="flex items-center justify-center rounded bg-gray-50 h-36 w-full sm:w-80 m-2 dark:bg-gray-800">
      <a href="#" class="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div class="flex items-center space-x-2">
          <svg v-if="item.icon" :class="item.iconClass" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path :d="item.iconPath"></path>
          </svg>
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ item.title }}</h5>
        </div>
        <p class="font-normal text-gray-700 dark:text-gray-400 text-4xl">{{ item.value }}</p>
      </a>
    </div>
  </div>
</template>

<style scoped>
/* CSS tambahan dapat ditambahkan di sini jika diperlukan */
</style>
