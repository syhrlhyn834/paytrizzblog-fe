<template>
    <div class="flex flex-col md:flex-row">
      <Sidebar />
      <div class="max-w-full mx-auto">
        <NuxtPage />
      </div>
    </div>
  </template>
  
  <script setup>
  // Import komponen Sidebar
  import Sidebar from '~/components/Sidebar.vue'
  </script>
  
  <style scoped>
  /* Add custom styles here if needed */
  </style>
  