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
    async fetchCards(tags = []) {
      this.isCardsLoading = true;
      try {
        const params = new URLSearchParams();
        tags.forEach((tag) => params.append('tags', tag));
        const { data } = await $API.get('/cards', { params });
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
