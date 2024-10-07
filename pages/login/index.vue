<script setup>
// meta page
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/admin/dashboard',
  }
});

// define state
const email = ref('');
const password = ref('');
const errors = ref({});

// destruct signIn from useAuth
const { signIn } = useAuth();

// method login
const login = async () => {
  try {
    await signIn(
      {
        email: email.value,
        password: password.value,
      },
      {
        callbackUrl: '/admin/dashboard',
        external: false,
      }
    );
  } catch (error) {
    if (error.response) {
      // Jika ada error dari Laravel
      if (error.response.status === 422) {
        // Ambil error validasi
        errors.value = error.response.data;
      } else if (error.response.status === 401) {
        // Ambil error login tidak valid
        errors.value = { message: 'Email atau Password salah.' };
      } else {
        // Pesan error umum
        errors.value = { message: 'Login gagal. Silakan coba lagi.' };
      }
    } else {
      // Pesan error jika tidak ada response
      errors.value = { message: 'Login gagal. Silakan coba lagi.' };
    }
  }
};

</script>

<template>
  <div>
    <section class="">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"></a>
        <div
          class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <div v-if="errors.message"
              class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert">
              {{ errors.message }}
            </div>
            <form @submit.prevent="login" class="space-y-4 md:space-y-6">
              <div class="mb-4">
                <label for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" name="email" id="email" v-model="email"
                  :class="{ 'border-red-500': errors.email }"
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@arlchoose.id" required>
                <div v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email[0] }}</div>
              </div>
              <div class="mb-4">
                <label for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" name="password" id="password" v-model="password"
                  :class="{ 'border-red-500': errors.password }"
                  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="••••••••" required>
                <div v-if="errors.password" class="text-red-500 text-xs mt-1">{{ errors.password[0] }}</div>
              </div>
              <button type="submit"
                class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<style>
/* CSS tambahan dapat ditambahkan di sini jika diperlukan */
</style>