<template>
  <h1>My cards</h1>
  <div class="cards__filters">
    <button
      @click="cardModalRef.changeModalState"
    >
      Add new card
    </button>
    <div
      v-for="(tag, index) in tags"
      :key="index"
    >
      <input
        :id="`tag-input-${index}`"
        v-model="tags[index]"
        placeholder="Enter a tag"
      >
    </div>
    <div class="cards__filters__tags">
      <button
        id="add-tag-button"
        @click="addTagInput"
      >
        +
      </button>
      <button
        v-if="tags.length > 1"
        @click="removeTagInput"
      >
        -
      </button>
      <button
        id="search-by-tag"
        @click="searchByTags"
      >
        Search by tag
      </button>
    </div>
    <div v-if="isLoading">
      Loading...
    </div>
  </div>
  <div
    class="cards__container"
  >
    <div
      v-for="card in cards"
      :key="card.id"
    >
      <CardDetails
        :id="card.id"
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
import { computed, ref, reactive } from 'vue';
import { useCardStore } from '@/stores/cardStore';
import CardDetails from '@/components/CardDetails.vue';
import CardModal from '@/components/CardModal.vue';

const cardStore = useCardStore();
const isLoading = computed(() => cardStore.isCardsLoading);
const cards = computed(() => cardStore.cards);
const cardModalRef = ref(null);

const tags = reactive([ '' ]);

const addTagInput = () => {
  tags.push('');
};

const removeTagInput = () => {
  if (tags.length > 1) {
    tags.pop();
  }
};

const searchByTags = () => {
  cardStore.fetchCards(tags);
};

cardStore.fetchCards();
</script>

<style lang="scss" scoped>
.cards {
  &__filters {
    display: flex;
    flex-direction: column;
    gap: 8px;

    button {
      width: fit-content;
    }

    &__tags {
      display: flex;
      flex-direction: row;
      gap: 8px;
    }
  }
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
