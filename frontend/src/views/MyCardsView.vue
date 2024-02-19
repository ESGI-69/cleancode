<template>
  <h1>My cards</h1>
  <div v-if="isLoading">
    Loading...
  </div>
  <div
    v-for="card in cards"
    :key="card.id"
  >
    <CardDetails :card="card" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useCardStore } from '@/stores/cardStore';
import CardDetails from '@/components/CardDetails.vue';

const cardStore = useCardStore();
const isLoading = computed(() => cardStore.isCardsLoading);
const cards = computed(() => cardStore.cards);


cardStore.fetchCards();
</script>
