import { describe, it, expect, vi, beforeAll } from 'vitest';
import { useLearningStore } from '@/stores/learningStore';
import $API from '@/plugins/axios';
import { setActivePinia, createPinia } from 'pinia';
import { createApp } from 'vue';
import { MOCK_QUIZZ } from '@/__mocks__/mockData';

let store;
const app = createApp({
  name: 'LearningStoreSpec',
});

vi.mock('@/plugins/axios');

describe('learningStore', () => {
  beforeAll(() => {
    const pinia = createPinia();
    app.use(pinia);
    setActivePinia(pinia);
    store = useLearningStore();
  });

  describe('fetchQuizz action', () => {
    it('fetches quizz and updates state correctly', async () => {
      $API.get.mockResolvedValue({ data: MOCK_QUIZZ });

      expect(store.isQuizzLoading).toBe(false);
      expect(store.quizz).toEqual([]);

      await store.fetchQuizz();

      expect(store.isQuizzLoading).toBe(false);
      expect(store.quizz).toEqual(MOCK_QUIZZ);
    });

    it('sets isQuizzLoading to false when an error occurs', async () => {
      $API.get.mockRejectedValue(new Error('API error'));

      expect(store.isQuizzLoading).toBe(false);

      try {
        await store.fetchQuizz();
      } catch (err) {
        expect(err.message).toBe('API error');
      }

      expect(store.isQuizzLoading).toBe(false);
    });
  });

  describe('patchAnswer action', () => {
    it('patches an answer and does not throw an error', async () => {
      const cardId = '1';
      const payload = { answer: 'Test Answer' };
      $API.patch.mockResolvedValue({});

      expect(store.isPacthAnswerLoading).toBe(false);
      await store.patchAnswer(cardId, payload);

      expect(store.isPacthAnswerLoading).toBe(false);
    });

    it('sets isPacthAnswerLoading to false when an error occurs', async () => {
      const cardId = '1';
      const payload = { answer: 'Test Answer' };
      $API.patch.mockRejectedValue(new Error('API error'));

      expect(store.isPacthAnswerLoading).toBe(false);

      try {
        await store.patchAnswer(cardId, payload);
      } catch (err) {
        expect(err.message).toBe('API error');
      }

      expect(store.isPacthAnswerLoading).toBe(false);
    });
  });
});
