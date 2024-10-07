<template>
  <div>
    <div class="mx-10 md:mx-20">
      <Navbar />
      <div class="md:mt-32 mb-12">
        <div class="mt-10 mb-10">
          <NuxtPage />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
// Import komponen Footer dan Navbar
import Footer from '../components/Footer.vue';
import Navbar from '../components/Navbar.vue';

// Fetch data untuk header
const { data: headerMedia } = await useAsyncData('headerMedia', () =>
  $fetch('/api/header')
)

// Menggunakan useHead untuk mengatur titleTemplate
useHead({
  titleTemplate: (title) => {
    const header = headerMedia.value?.data[0]; // Ambil data header pertama dari API
    return title ? `${title} - ${header?.title || ''}` : header?.title || 'Default Title';
  }
})

</script>

<style>
</style>
