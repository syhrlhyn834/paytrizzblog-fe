<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useAsyncData } from 'nuxt/app';

const isMenuOpen = ref(false);
const isScrolled = ref(false);
const searchQuery = ref('');

// Toggle menu for mobile
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// Close the menu when selecting an item
const closeMenu = () => {
  isMenuOpen.value = false;
};

// Handle scroll event to change navbar background
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

// Attach scroll listener on client-side
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

// Fetch navbar data from the API using useAsyncData
const { data: navbarData, error } = await useAsyncData('navbar', () =>
$fetch('/api/menu')
);

if (error.value) {
  console.error('Error fetching navbar:', error.value);
}

const navbar = computed(() => {
  return navbarData.value?.data || []; // Access the `data` property inside the response
});

const navbarClasses = computed(() =>
  isScrolled.value || isMenuOpen.value ? 'bg-[#141414]' : 'bg-transparent'
);

// Emit search query to parent component (NewsHome.vue)
const searchNews = () => {
  const event = new CustomEvent('search', { detail: searchQuery.value });
  window.dispatchEvent(event);
};

// Fetch data untuk header
const { data: headerMedia } = await useAsyncData('headerMedia', () =>
  $fetch('/api/header')
)
</script>


<template>
    <div class="mb-4">
      <header :class="navbarClasses" class="text-white fixed w-full z-20 top-0 start-0 transition-all duration-300">
        <div class="container mx-auto p-5">
          <!-- Logo Section -->
          <div class="flex items-center justify-between mb-6 md:mx-44">
            <div class="flex items-center space-x-2 mt-4" v-for="(headers, index) in headerMedia?.data" :key="index">
              <v-img 
              :src="headers.image" 
              :alt="headers.name"
                class="w-8 h-8" 
                max-width="32" 
                max-height="32"
                cover
                :lazy-src="headers.image"
              />
              <div class="text-2xl font-bold">{{ headers.name }}</div>
            </div>
  
            <button @click="toggleMenu" class="lg:hidden text-white focus:outline-none" ref="hamburger">
              <span v-if="!isMenuOpen" class="text-3xl">&#9776;</span>
              <span v-else class="text-6xl">&times;</span>
            </button>
          </div>
  
          <!-- Desktop Menu -->
          <div class="lg:flex items-center justify-start mt-10 mx-44 hidden">
            <div class="flex-grow max-w-sm">
              <div class="relative">
                <input 
                  v-model="searchQuery" 
                  @input="searchNews" 
                  class="bg-gray-800 text-gray-300 px-4 py-2 rounded-full w-full focus:outline-none" 
                  type="text" 
                  placeholder="Search..."
                />
                <Icon name="uil:search-alt" class="absolute top-2 right-4 text-white w-5 h-5" />
              </div>
            </div>
            
            <nav class="flex space-x-4 ml-4"> 
              <NuxtLink 
                v-for="(menuItem, index) in navbar" 
                :key="index" 
                :to="menuItem.url"  
                class="text-gray-300 px-4 py-2 rounded-full hover:bg-yellow-300 hover:text-black transition duration-300 focus:outline-none"
              >
                {{ menuItem.name }}
              </NuxtLink>
            </nav>
          </div>
  
          <!-- Mobile Menu -->
          <div v-show="isMenuOpen" class="lg:hidden mt-4 space-y-4" ref="menu">
            <div class="relative">
              <input 
                v-model="searchQuery" 
                @input="searchNews" 
                class="bg-gray-800 text-gray-300 px-4 py-2 rounded-full w-full focus:outline-none" 
                type="text" 
                placeholder="Search..."
              />
              <Icon name="uil:search-alt" class="absolute top-2 right-4 text-white w-5 h-5" />
            </div>
            <nav class="space-y-2">
              <NuxtLink 
                v-for="(menuItem, index) in navbar" 
                :key="index" 
                :to="menuItem.url"  
                class="block text-gray-300 px-4 py-2 rounded-full hover:bg-yellow-300 hover:text-black transition duration-300 focus:outline-none" 
                @click="closeMenu"
              >
                {{ menuItem.name }}
              </NuxtLink>
            </nav>
          </div>
        </div>
      </header>
    </div>
  </template>
  