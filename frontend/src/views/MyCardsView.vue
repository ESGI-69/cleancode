<template>
  <h1>My cards</h1>
  <button
    @click="cardModalRef.changeModalState"
  >
    Add new card
  </button>
  <div v-if="isLoading">
    Loading...
  </div>
  <div
    class="cards-container"
  >
    <div
      v-for="card in cards"
      :key="card.id"
    >
      <CardDetails
        :question="card.question"
        :category="card.category"
        :tag="card.tag"
      />
    </div>
  </div>
  <CardModal
    ref="cardModalRef"
  />
</template>

<script setup>
import { computed, ref } from 'vue';
import { useCardStore } from '@/stores/cardStore';
import CardDetails from '@/components/CardDetails.vue';
import CardModal from '@/components/CardModal.vue';

const cardStore = useCardStore();
const isLoading = computed(() => cardStore.isCardsLoading);
const cards = computed(() => cardStore.cards);
const cardModalRef = ref(null);

cardStore.fetchCards();
</script>

<style lang="scss" scoped>
.cards-container {
  margin-top: 20px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: minmax(100px, auto);
  gap: 20px;
}
</style>
