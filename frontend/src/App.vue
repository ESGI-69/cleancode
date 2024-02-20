<template>
  <NavBar
    user-name="Username"
    :is-logged="true"
  />
  <div class="main-wrapper">
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import NavBar from './components/NavBar.vue';
</script>

<style scoped>
.main-wrapper {
  padding: 1rem
}
</style>
