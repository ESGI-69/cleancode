import { defineStore } from 'pinia';

import $API from '@/plugins/axios';

export const useCardStore = defineStore('cardStore', {
  state: () => ({
    cards: [],
    isCardsLoading: false,
  }),

  getters: {
  },

  actions: {
    async fetchCards() {
      this.isCardsLoading = true;
      try {
        const { data } = await $API.get('/cards');
        this.cards = data;
      } finally {
        this.isCardsLoading = false;
      }
    },
  },
});
