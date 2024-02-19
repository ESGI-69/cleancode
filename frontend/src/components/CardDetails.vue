<template>
  <p>{{ card.category }}</p>
  <p>{{ card.question }}</p>
  <p>{{ card.answer }}</p>
  <p>{{ card.tag }}</p>
</template>

<script setup>
defineProps({
  card: {
    type: Object,
    required: true,
  },
});
</script>

