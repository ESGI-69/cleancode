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
        id="about-link"
        class="navbar__link"
        to="/about"
      >
        About
      </RouterLink>
    </div>
    <div class="navbar__profile">
      <RouterLink
        v-if="isLogged"
        id="profile-link"
        class="navbar__link"
        to="#"
      >
        {{ props.userName }}'s profile
      </RouterLink>
      <RouterLink
        v-else
        id="login-link"
        class="navbar__link"
        to="#"
      >
        Login
      </RouterLink>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router';

const props = defineProps({
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
  background-color: #f5f5f5;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

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
