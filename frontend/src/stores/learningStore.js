import { defineStore } from 'pinia';

import $API from '@/plugins/axios';

export const useLearningStore = defineStore('learningStore', {
  state: () => ({
    quizz: [],
    isQuizzLoading: false,

    isPacthAnswerLoading: false,
  }),

  actions: {
    async fetchQuizz(date = null) {
      this.isQuizzLoading = true;
      try {
        const params = new URLSearchParams();
        if (date) {
          params.append('date', date);
        }
        const { data } = await $API.get('/cards/quizz', { params });
        this.quizz = data;
      } finally {
        this.isQuizzLoading = false;
      }
    },

    async patchAnswer(cardId, payload) {
      this.isPacthAnswerLoading = true;
      try {
        await $API.patch(`cards/${cardId}/answer`, payload);
      } finally {
        this.isPacthAnswerLoading = false;
      }
    },
  },
});
