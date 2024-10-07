<script setup>
import { useAsyncData } from 'nuxt/app'

// Fetch data untuk sosial media
const { data: socialMedia } = await useAsyncData('socialMedia', () =>
  $fetch('/api/sosmed')
)

// Fetch data untuk header
const { data: headerMedia } = await useAsyncData('headerMedia', () =>
  $fetch('/api/header')
)

const { data: footerMedia } = await useAsyncData('footerMedia', () =>
  $fetch('/api/footer')
)
</script>

<template>
  <footer class="bg-[#F3F3F3] text-gray-400 py-12 mt-auto w-full">
    <div class="md:px-28">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
        <!-- Iterasi untuk headerMedia -->
        <div v-for="(headers, index) in headerMedia?.data" :key="index">
          <h4 class="text-black font-bold flex items-center">
            <v-img 
              :src="headers.image" 
              :alt="headers.name" 
              class="w-8 h-8 mr-2" 
              max-width="32" 
              max-height="32"
              cover
              :lazy-src="headers.image"
            />
            {{ headers.name }}
          </h4>
          <p class="mt-4 text-black" v-for="(footers, index) in footerMedia?.data" :key="index">{{ footers.address }}</p>
        </div>

        <div>
          <h4 class="text-black font-bold">Support</h4>
          <ul class="mt-4 space-y-2 text-black">
            <li><a href="#" class="hover:underline">Contact</a></li>
            <li><a href="#" class="hover:underline">FAQ's</a></li>
            <li><a href="#" class="hover:underline">Email</a></li>
          </ul>
        </div>

        <!-- Iterasi untuk socialMedia -->
        <div>
          <h4 class="text-black font-bold">Follow us</h4>
          <ul class="mt-4 space-y-2 text-black">
            <li v-for="(media, index) in socialMedia?.data" :key="index">
              <a :href="`${media.url}/${media.username}`" class="flex items-center hover:underline">
                <Icon :name="media.logo" class="text-black w-4 h-4 mr-2" />
                {{ media.name }}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-black font-bold">Legal</h4>
          <ul class="mt-4 space-y-2 text-black">
            <li><a href="#" class="hover:underline">Privacy Policy</a></li>
            <li><a href="#" class="hover:underline">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <!-- Copyright Section -->
       <div class="text-start px-4">
    <div class="md:text-center mt-8">
      <p class="mt-4 text-black" v-for="(footers, index) in footerMedia?.data" :key="index">{{ footers.copyright }}</p>
    </div>
  </div>
    </div>

  </footer>
</template>
