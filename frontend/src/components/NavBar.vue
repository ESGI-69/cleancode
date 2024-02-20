<template>
  <nav class="navbar">
    <div class="navbar__links">
      <RouterLink
        id="home-link"
        class="navbar__link"
        to="/"
      >
        Home
      </RouterLink>
      <RouterLink
        v-if="isLogged"
        id="my-cards-link"
        class="navbar__link"
        to="/my-cards"
      >
        My cards
      </RouterLink>
    </div>
    <div class="navbar__profile">
      <RouterLink
        v-if="isLogged"
        id="profile-link"
        class="navbar__link"
        to="#"
      >
        {{ userName }}'s profile
      </RouterLink>
      <RouterLink
        v-else
        id="login-link"
        class="navbar__link"
        to="/login"
      >
        Login
      </RouterLink>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router';

defineProps({
  userName: {
    type: String,
    required: true,
  },
  isLogged: {
    type: Boolean,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.navbar {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #dfe6e9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  color: #000000;

  &__links {
    display: flex;
    gap: 1rem;
  }

  &__profile {
    display: flex;
    gap: 1rem;
  }
}
</style>
