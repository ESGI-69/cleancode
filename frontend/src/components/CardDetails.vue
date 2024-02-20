<template>
  <div class="card">
    <p class="card__category">
      Category: {{ category }}
    </p>
    <p class="card__question">
      {{ question }}
    </p>
    <p class="card__tag">
      {{ tag }}
    </p>
    <div
      v-if="quizzMode"
      class="card__quizz"
    >
      <p v-if="isAnswerShowed">
        The answer is : {{ answer }}
      </p>
      <input
        v-model="userAnswer"
        type="text"
        placeholder="Type your answer"
      >
      <button
        v-if="!isAnswerShowed"
        @click="checkAnswer"
      >
        Submit Answer
      </button>
      <div
        v-if="isAnswerShowed"
      >
        <p v-if="isPacthAnswerLoading">
          Loading...
        </p>
        <div
          class="card__quizz__submit"
        >
          <button
            :disabled="isPacthAnswerLoading"
            @click="submitAnswer(true)"
          >
            I'm right
          </button>
          <button
            :disabled="isPacthAnswerLoading"
            @click="submitAnswer(false)"
          >
            I'm wrong
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, computed } from 'vue';
import { useLearningStore } from '@/stores/learningStore';

const learningStore = useLearningStore();

const isPacthAnswerLoading = computed(() => learningStore.isPacthAnswerLoading);

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: false,
    default: '',
  },
  quizzMode: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const userAnswer = ref('');
const isAnswerShowed = ref(false);

const checkAnswer = async () => {
  isAnswerShowed.value = true;
};

const submitAnswer = async (isValid) => {
  await learningStore.patchAnswer(props.id, {
    isValid,
  });
  await learningStore.fetchQuizz();
  isAnswerShowed.value = false;
  userAnswer.value = '';

};
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 400px;
  justify-content: space-between;
  background-color: #dfe6e9;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  color: #000000;

  &__question,
  &__category,
  &__tag {
    margin: 0;
  }

  &__category {
    font-weight: bold;
  }

  &__tag {
    background-color: #a29bfe;
    color: white;
    padding: 5px;
    border-radius: 5px;
  }
  &__quizz {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;

    input {
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #dfe6e9;
      width: 100%;
    }
    button {
      background-color: #181818;
      color: white;
      &:hover {
        background-color: #373737;
      }
    }
    &__submit {
      display: flex;
      flex-direction: row;
      gap: 4px;
      justify-content: center;
      align-content: center;
    }
  }
}
</style>

