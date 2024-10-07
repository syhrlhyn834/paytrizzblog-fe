<script setup lang="js">
import NewsHome from '../components/NewsHome.vue';
import SliderHome from '../components/SliderHome.vue';
useHead({
    title: "Beranda",
})
</script>

<template>
    <div>
      <!-- Hero Section -->
      <SliderHome />

      <!--Article Section -->
        <NewsHome />
    </div>
  </template>
  