import { describe, it, expect, vi, beforeAll } from 'vitest';
import { useCardStore } from '@/stores/cardStore';
import $API from '@/plugins/axios';
import { setActivePinia, createPinia } from 'pinia';
import { createApp } from 'vue';
import { MOCK_CARDS } from '@/__mocks__/mockData';

let store;
const app = createApp({
  name: 'CardStoreSpec',
});

vi.mock('@/plugins/axios');

describe('cardStore', () => {
  beforeAll(() => {
    const pinia = createPinia();
    app.use(pinia);
    setActivePinia(pinia);
    store = useCardStore();
  });

  describe('fetchCards action', () => {
    it('fetches cards and updates state correctly', async () => {
      $API.get.mockResolvedValue({ data: MOCK_CARDS });

      expect(store.isCardsLoading).toBe(false);
      expect(store.cards).toEqual([]);

      await store.fetchCards();

      expect(store.isCardsLoading).toBe(false);
      expect(store.cards).toEqual(MOCK_CARDS);
    });

    it('sets isCardsLoading to false when an error occurs', async () => {
      $API.get.mockRejectedValue(new Error('API error'));

      expect(store.isCardsLoading).toBe(false);

      try {
        await store.fetchCards();
      } catch (err) {
        expect(err.message).toBe('API error');
      }

      expect(store.isCardsLoading).toBe(false);
    });
  });

  describe('postCard action', () => {
    it('posts a card and fetches cards again', async () => {
      const card = { name: 'Test Card', description: 'Test Description' };
      $API.post.mockResolvedValue({ data: card });
      $API.get.mockResolvedValue({ data: [ card ] });

      expect(store.isPostCardLoading).toBe(false);
      await store.postCard(card);

      expect(store.isPostCardLoading).toBe(false);
      expect(store.cards).toEqual([ card ]);
    });

    it('sets isPostCardLoading to false when an error occurs', async () => {
      const card = { name: 'Test Card', description: 'Test Description' };
      $API.post.mockRejectedValue(new Error('API error'));

      expect(store.isPostCardLoading).toBe(false);

      try {
        await store.postCard(card);
      } catch (err) {
        expect(err.message).toBe('API error');
      }

      expect(store.isPostCardLoading).toBe(false);
    });
  });
});
