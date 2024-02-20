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
});
