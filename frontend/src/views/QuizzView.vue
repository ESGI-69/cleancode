<template>
  <h1>Quizz</h1>
  <div
    v-if="isQuizzLoading"
  >
    Loading...
  </div>
  <input
    v-model="date"
    type="date"
  >
  <div
    class="cards__container"
  >
    <div
      v-for="card in quizz"
      :key="card.id"
    >
      <CardDetails
        :id="card.id"
        :question="card.question"
        :category="card.category"
        :tag="card.tag"
        :answer="card.answer"
        :quizz-mode="true"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useLearningStore } from '@/stores/learningStore';
import CardDetails from '@/components/CardDetails.vue';

const learningStore = useLearningStore();
const isQuizzLoading = computed(() => learningStore.isQuizzLoading);
const quizz = computed(() => learningStore.quizz);

const date = ref(new Date().toISOString().split('T')[0]);

learningStore.fetchQuizz(date.value);

watch(date, () => {
  learningStore.fetchQuizz(date.value);
});
</script>

<style lang="scss" scoped>
.cards {
  &__container {
    margin-top: 20px;
    margin-bottom: 20px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-auto-rows: minmax(100px, auto);
    gap: 20px;
  }
}
</style>
