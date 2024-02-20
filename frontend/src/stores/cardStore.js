import { defineStore } from 'pinia';

import $API from '@/plugins/axios';

export const useCardStore = defineStore('cardStore', {
  state: () => ({
    cards: [],
    isCardsLoading: false,
    isPostCardLoading: false,
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

    async postCard(card) {
      this.isPostCardLoading = true;
      try {
        await $API.post('/cards', card);
        await this.fetchCards();
      } finally {
        this.isPostCardLoading = false;
      }
    },
  },
});
