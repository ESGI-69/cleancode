<template>
  <div
    v-if="isModalOpen"
    class="modal"
  >
    <div class="modal__container">
      <h2>Add a card</h2>
      <form
        id="cardForm"
        class="modal__container__form"
        @submit.prevent="submitCard"
      >
        <div class="modal__container__form__group">
          <label for="cardQuestion">Card Question:</label>
          <input
            id="cardQuestion"
            v-model="card.question"
            type="text"
            required
          >
        </div>
        <div class="modal__container__form__group">
          <label for="cardAnswer">Card Answer:</label>
          <textarea
            id="cardAnswer"
            v-model="card.answer"
            required
          />
        </div>
        <div class="modal__container__form__group">
          <label for="cardTag">Card tag:</label>
          <input
            id="cardTag"
            v-model="card.tag"
            type="text"
            required
          >
        </div>
        <p v-if="isPostCardLoading">
          Loading...
        </p>
        <button
          id="submitCard"
          type="submit"
          :disabled="isPostCardLoading"
        >
          Submit
        </button>
        <button
          id="closeModal"
          @click="changeModalState"
        >
          Close
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useCardStore } from '@/stores/cardStore';

const cardStore = useCardStore();
const isModalOpen = ref(false);
const card = ref({ question: '', answer: '', tag: '' });
const isPostCardLoading = computed(() => cardStore.isPostCardLoading);
function changeModalState() {
  isModalOpen.value = !isModalOpen.value;
}

const submitCard = async () =>{
  await cardStore.postCard(card.value);
  card.value = { question: '', answer: '', tag: '' };
  changeModalState();
};

defineExpose({
  changeModalState,
});
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  display: flex;
  justify-content: center;
  &__container {
    margin-top: 6rem;
    background-color: white;
    width: 80%;
    height: fit-content;
    padding: 20px;
    border-radius: 10px;
    z-index: 2;
    &__form {
      display: flex;
      flex-direction: column;
      gap: 20px;
      &__group {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
        & label {
          margin-bottom: 5px;
        }
        & input,
        & textarea {
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #dfe6e9;
          max-width: 100%;
          min-width: 100%;
          max-height: 300px;
        }
      }
    }
  }
}
</style>
