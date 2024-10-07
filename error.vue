<template>
  <div class="flex flex-col items-center justify-center min-h-screen text-center error-bg">
    <div class="shadow-md rounded-lg p-8 w-11/12 md:w-1/2">
      <h1 class="text-8xl font-extrabold text-red-600">{{ error.statusCode }}</h1>
      <h2 class="mt-4 text-3xl font-semibold text-white">
        {{ error.message || 'Oops! Something went wrong.' }}
      </h2>
      <p class="mt-4 text-white">
        We are currently experiencing issues. Please try again later or return to the homepage.
      </p>
      <nuxt-link 
        to="/" 
        class="mt-6 inline-block px-4 py-2 text-white bg-blue-600 rounded-full shadow transition duration-300 hover:bg-blue-700">
        Back to Home
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  error: {
    statusCode: number;
    message: string;
  }
}>();
</script>

<style scoped>
</style>
