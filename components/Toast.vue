<template>
  <div v-show="visible" class="toast" :class="type">
    {{ message }}
    <button @click="close">X</button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  message: String,
  type: {
    type: String,
    default: 'success',
  },
  duration: {
    type: Number,
    default: 3000,
  },
});

const visible = ref(false);

const close = () => {
  visible.value = false;
};

// Awasi perubahan prop message dan tampilkan toast ketika ada perubahan
watch(() => props.message, (newMessage) => {
  if (newMessage) {
    visible.value = true;
    setTimeout(close, props.duration);
  }
});
</script>

<style scoped>
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  border-radius: 5px;
  color: white;
  z-index: 1000;
}
.success {
  background-color: green;
}
.error {
  background-color: red;
}
</style>
