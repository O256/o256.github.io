<script setup>
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <!-- <main>
    <TheWelcome />
  </main> -->

  <div>
    <router-link :to="{ path: '/docs' }">Go to Docs</router-link>
  </div>
</template>
